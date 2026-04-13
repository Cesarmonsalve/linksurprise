import { NextResponse } from 'next/server';
import { TEMPLATES } from '@/lib/templates';

export async function GET() {
  try {
    // Always start with the 20 static templates as the base
    const merged: Record<string, any> = { ...TEMPLATES };

    // Try to fetch custom templates from DB (non-blocking)
    try {
      const dbConnect = (await import('@/lib/mongodb')).default;
      const TemplateDB = (await import('@/models/TemplateDB')).default;

      await dbConnect();
      const aiTemplates = await TemplateDB.find({});

      const formattedCustom = aiTemplates.map((t: any) => ({
        id: t.id,
        name: t.name,
        emoji: t.emoji,
        gradient: 'linear-gradient(135deg, #10b981, #06b6d4)', // Default AI gradient
        pillar: 'artistic',
        pillarLabel: '🤖 Generada por IA',
        defaultBg: '#050510',
        defaultText: '#fff',
        defaultAccent: '#10b981',
        defaultMessage: 'Plantilla mágica creada por Inteligencia Artificial.',
        effect: 'fadeUp',
        isCustom: true,
      }));

      formattedCustom.forEach((t: any) => {
        merged[t.id] = t;
      });
    } catch (dbError) {
      // DB not configured or failed → silently ignore, return static templates
      console.warn('[/api/templates] DB unavailable, returning static templates only:', (dbError as Error).message);
    }

    return NextResponse.json({ success: true, data: merged });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
