import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import TemplateDB from '@/models/TemplateDB';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const newTemplate = await TemplateDB.create(body);

    return NextResponse.json({ success: true, data: newTemplate }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
