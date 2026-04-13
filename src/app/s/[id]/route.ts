import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import CustomTemplate from '@/models/CustomTemplate';
import { generateHTML, ProjectData } from '@/lib/generateHTML';

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const params = await props.params;

    // Fetch the project configuration
    const project = await Project.findById(params.id);
    if (!project) {
      return new NextResponse('Sorpresa no encontrada', { status: 404 });
    }

    // Determine config and payment status
    const isPaid = project.status === 'paid';
    
    // Check if it's a custom template
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

    // Generate pure standalone HTML using our engine
    const html = generateHTML(data, isPaid);

    // Return it as a live web page!
    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=300'
      },
    });
  } catch (error: any) {
    console.error('Error fetching project:', error);
    return new NextResponse('Error interno del servidor', { status: 500 });
  }
}
