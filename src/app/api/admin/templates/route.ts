import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CustomTemplate from '@/models/CustomTemplate';

export async function GET() {
  try {
    await dbConnect();
    const templates = await CustomTemplate.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: templates });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    
    // Ensure id is unique
    if (!body.id) {
      body.id = 'custom_' + Date.now();
    }
    
    const template = await CustomTemplate.create(body);
    return NextResponse.json({ success: true, data: template }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
