import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import CustomTemplate from '@/models/CustomTemplate';
import Settings from '@/models/Settings';
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
    
    if (project.status === 'pending_payment') {
      const settings = await Settings.findOne({ key: 'global' });
      const price = settings?.priceInfo || '$3 USD';
      
      const frozenHTML = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sorpresa VIP - Bóveda Protegida</title>
        <style>
          body { margin: 0; padding: 0; min-height: 100vh; background: #050510; color: #fff; font-family: system-ui, -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; text-align: center; overflow: hidden; }
          .glass { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); padding: 3rem; border-radius: 24px; max-width: 400px; width: 90%; box-shadow: 0 30px 60px rgba(0,0,0,0.6); position: relative; z-index: 10; }
          .icon { font-size: 4rem; margin-bottom: 1rem; filter: drop-shadow(0 0 20px rgba(192,132,252,0.5)); animation: float 3s ease-in-out infinite; }
          @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
          h1 { font-size: 1.5rem; margin: 0 0 1rem; background: linear-gradient(135deg, #c084fc, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
          p { color: #a1a1aa; line-height: 1.6; font-size: 1rem; margin-bottom: 2rem; }
          .badge { background: rgba(192,132,252,0.15); color: #c084fc; padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.8rem; font-weight: bold; border: 1px solid rgba(192,132,252,0.3); display: inline-block; margin-bottom: 1.5rem; }
          .btn { background: linear-gradient(135deg, #c084fc, #db2777); border: none; padding: 1rem 2rem; border-radius: 12px; color: white; font-weight: bold; font-size: 1rem; cursor: pointer; display: block; width: 100%; text-decoration: none; box-sizing: border-box; transition: transform 0.2s; }
          .btn:active { transform: scale(0.95); }
          .bg-glow { position: absolute; width: 300px; height: 300px; background: #c084fc; filter: blur(150px); opacity: 0.15; z-index: 1; }
        </style>
      </head>
      <body>
        <div class="bg-glow"></div>
        <div class="glass">
          <div class="badge">👑 EXPERIENCIA PREMIUM</div>
          <div class="icon">🔒</div>
          <h1>Bóveda Protegida</h1>
          <p>Esta sorpresa VIP está protegida. El remitente ha encapsulado este recuerdo. Debe realizar el aporte de <strong>${price}</strong> para descongelar su contenido.</p>
          <a href="/" class="btn">Crear mi propia sorpresa</a>
        </div>
      </body>
      </html>
      `;
      return new NextResponse(frozenHTML, { status: 403, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }
    
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

    // Generate pure standalone HTML using our engine in VIP mode
    const html = generateHTML(data, isPaid, 'vip');

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
