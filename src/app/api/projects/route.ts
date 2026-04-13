import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    
    // IP Capture
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    body.ipAddress = ip;

    // Anti-spam barrier: Maximum 1 pending VIP project per IP every 24 hours
    if (body.status === 'pending_payment' && ip !== 'unknown') {
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const pendingCount = await Project.countDocuments({
        ipAddress: ip,
        status: 'pending_payment',
        createdAt: { $gt: yesterday }
      });

      if (pendingCount >= 2) {
        return NextResponse.json({ 
          success: false, 
          error: 'Ya tienes varias sorpresas VIP pendientes de pago. Por favor, reporta el pago de una antes de crear más, o usa la versión gratuita.' 
        }, { status: 429 });
      }
    }

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
