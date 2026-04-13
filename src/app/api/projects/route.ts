import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    
    // Create a new project draft
    const project = await Project.create(body);
    
    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    // In a real app we would protect this or filter by user
    const projects = await Project.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: projects });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
