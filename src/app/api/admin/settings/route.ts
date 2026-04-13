import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Settings from '@/models/Settings';

export async function GET() {
  try {
    await dbConnect();
    let settings = await Settings.findOne({ key: 'global' });
    
    // Create defaults if not exists
    if (!settings) {
      settings = await Settings.create({ key: 'global' });
    }
    
    return NextResponse.json({ success: true, data: settings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    
    const settings = await Settings.findOneAndUpdate(
      { key: 'global' },
      { ...body, updatedAt: Date.now() },
      { new: true, upsert: true }
    );
    
    return NextResponse.json({ success: true, data: settings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
