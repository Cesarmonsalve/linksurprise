import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

export async function DELETE(req: Request) {
  try {
    // Basic auth check via cookie (could be improved with JWT but keeping it consistent with the cesar_2001 pattern)
    const cookie = req.headers.get('cookie') || '';
    if (!cookie.includes('admin_token=auth_cesar_2001')) {
      return NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 });
    }

    await dbConnect();
    
    // Delete all projects
    const result = await Project.deleteMany({});
    
    return NextResponse.json({ 
      success: true, 
      message: `Se han eliminado ${result.deletedCount} proyectos correctamente.` 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
