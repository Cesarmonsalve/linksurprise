import { NextResponse } from 'next/server';
import { TEMPLATES } from '@/lib/templates';

export async function GET() {
  try {
    // Always start with the 20 static templates as the base
    const merged: Record<string, any> = { ...TEMPLATES };

    // Try to fetch custom templates from DB (non-blocking)
    try {
      const dbConnect = (await import('@/lib/mongodb')).default;
      const CustomTemplate = (await import('@/models/CustomTemplate')).default;

      await dbConnect();
      const customTemplates = await CustomTemplate.find({ isActive: true });

      const formattedCustom = customTemplates.map((t: any) => ({
        id: t.id,
        name: t.name,
        emoji: t.emoji,
        gradient: t.gradient,
        pillar: t.pillar,
        pillarLabel: t.pillarLabel,
        defaultBg: t.defaultBg,
        defaultText: t.defaultText,
        defaultAccent: t.defaultAccent,
        defaultMessage: t.defaultMessage,
        effect: t.effect,
        isCustom: true,
        htmlTemplate: t.htmlTemplate,
        cssTemplate: t.cssTemplate,
        jsTemplate: t.jsTemplate,
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
