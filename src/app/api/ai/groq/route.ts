import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Settings from '@/models/Settings';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json({ success: false, error: 'Se requiere un prompt.' }, { status: 400 });
    }

    const settings = await Settings.findOne({ key: 'global' });
    if (!settings || !settings.groqApiKey) {
      return NextResponse.json({ success: false, error: 'No se ha configurado la API Key de Groq en la sección de Ajustes.' }, { status: 403 });
    }

    const groqKey = settings.groqApiKey;

    // Conectarse a Groq (Llama-3-70B es veloz e inteligente para código)
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: `Eres un desarrollador Frontend experto. El usuario te pedirá crear o modificar una "Plantilla de Sorpresa Digital". 
Debes devolver UNICAMENTE un objeto JSON válido con los siguientes campos:
{
  "name": "Nombre creativo",
  "emoji": "✨",
  "description": "Corta descripción",
  "html": "El código HTML central sin <html> ni <body>, solo el contenido. Usa <strong> para destacar e incluye divs estilizados. Opcional: usa d.recipientName o d.message dentro del HTML para variables dinámicas (poniendo las variables como \${d.recipientName} etc).",
  "css": "El CSS específico para esta plantilla. (Ej. .container { background: #000; })",
  "js": "Lógica JS requerida si la hay. Se inyectará al final."
}
No devuelvas NADA MÁS que el JSON válido.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2, // Mantenerlo preciso para JSON
        response_format: { type: "json_object" } // Llama 3 en Groq soporta json mode
      })
    });

    if (!groqResponse.ok) {
      const errorData = await groqResponse.json();
      throw new Error(`Groq API Error: ${errorData.error?.message || 'Error desconocido'}`);
    }

    const data = await groqResponse.json();
    const content = data.choices[0].message.content;
    
    // Parse JSON
    const parsedTemplate = JSON.parse(content);

    return NextResponse.json({ success: true, data: parsedTemplate });
  } catch (error: any) {
    console.error('Groq Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
