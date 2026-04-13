import { NextResponse } from 'next/server';

const DEFAULT_SETTINGS = {
  key: 'global',
  whatsappNumber: '',
  binancePayId: '',
  zinliEmail: '',
  priceInfo: '$3 USD',
};

export async function GET() {
  try {
    const dbConnect = (await import('@/lib/mongodb')).default;
    const Settings = (await import('@/models/Settings')).default;

    await dbConnect();
    let settings = await Settings.findOne({ key: 'global' });

    if (!settings) {
      settings = await Settings.create({ key: 'global' });
    }

    return NextResponse.json({ success: true, data: settings });
  } catch (error: any) {
    // Return defaults if DB is not configured
    console.warn('[/api/admin/settings] DB unavailable:', error.message);
    return NextResponse.json({ success: true, data: DEFAULT_SETTINGS });
  }
}

export async function POST(req: Request) {
  try {
    const dbConnect = (await import('@/lib/mongodb')).default;
    const Settings = (await import('@/models/Settings')).default;

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
