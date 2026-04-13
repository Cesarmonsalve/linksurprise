import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

export async function POST(req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    
    // In a real application, you MUST verify that the user requesting this
    // has admin privileges (e.g. comparing session email to an array of admin emails).
    
    const params = await props.params;
    const id = params.id;
    const body = await req.json();
    
    // Set status to paid to remove watermark and unlock downloads
    const project = await Project.findByIdAndUpdate(
      id,
      { 
        status: 'paid',
        paymentMethod: body.paymentMethod || 'manual',
        referenceNumber: body.referenceNumber || 'N/A'
      },
      { new: true }
    );

    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: project });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
