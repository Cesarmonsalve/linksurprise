import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const { status } = await req.json();
    
    // params.id gives the Project ID
    const project = await Project.findByIdAndUpdate(params.id, { status }, { new: true });
    
    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: project });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
