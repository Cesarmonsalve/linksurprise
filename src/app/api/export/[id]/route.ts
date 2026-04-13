import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import CustomTemplate from '@/models/CustomTemplate';
import { generateHTML, ProjectData } from '@/lib/generateHTML';

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const params = await props.params;
    const id = params.id;

    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    const isPaid = project.status === 'paid';

    let customTemplateConfig = undefined;
    if (project.template.startsWith('custom_') || !project.template.match(/^[a-z_]+$/)) {
      customTemplateConfig = await CustomTemplate.findOne({ id: project.template });
    }

    const data: ProjectData = {
      ...project.config,
      template: project.template,
      title: project.title,
      customTemplateConfig: customTemplateConfig || undefined
    };

    // Use the unified template engine — VIP for paid, basic for free
    const mode = isPaid ? 'vip' : 'basic';
    const html = generateHTML(data, isPaid, mode);

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
      },
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
