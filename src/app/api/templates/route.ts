import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CustomTemplate from '@/models/CustomTemplate';
import { TEMPLATES } from '@/lib/templates';

export async function GET() {
  try {
    await dbConnect();
    const customTemplates = await CustomTemplate.find({ isActive: true });
    
    const formattedCustom = customTemplates.map(t => ({
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
      jsTemplate: t.jsTemplate
    }));

    const merged: Record<string, any> = { ...TEMPLATES };
    formattedCustom.forEach(t => {
      merged[t.id] = t;
    });

    return NextResponse.json({ success: true, data: merged });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
