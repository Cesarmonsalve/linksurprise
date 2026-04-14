import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Settings from '@/models/Settings';
import Project from '@/models/Project';
import TemplateDB from '@/models/TemplateDB';

// ═══════════════════════════════════════════════════════════════
// LINKBOT — CONVERSATIONAL AI ADMIN ASSISTANT
// Powered by Groq / Llama-3
// ═══════════════════════════════════════════════════════════════

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface BotAction {
  type: string;
  [key: string]: any;
}

interface BotResponse {
  message: string;
  actions?: BotAction[];
}

// ═══ Execute actions returned by the LLM ═══
async function executeActions(actions: BotAction[]): Promise<string[]> {
  const results: string[] = [];

  for (const action of actions) {
    try {
      switch (action.type) {
        case 'approve_project': {
          const project = await Project.findByIdAndUpdate(
            action.projectId,
            { status: 'paid' },
            { new: true }
          );
          if (project) {
            results.push(`✅ Proyecto "${project.config?.recipientName || project._id}" aprobado como pagado.`);
          } else {
            results.push(`❌ No se encontró el proyecto con ID: ${action.projectId}`);
          }
          break;
        }

        case 'update_settings': {
          const updateData: any = {};
          if (action.field && action.value !== undefined) {
            updateData[action.field] = action.value;
          }
          if (Object.keys(updateData).length > 0) {
            await Settings.findOneAndUpdate(
              { key: 'global' },
              { ...updateData, updatedAt: new Date() },
              { upsert: true }
            );
            results.push(`✅ Configuración actualizada: ${action.field} = ${action.value}`);
          }
          break;
        }

        case 'toggle_premium': {
          const settings = await Settings.findOne({ key: 'global' });
          if (settings) {
            let ids = settings.premiumTemplateIds || [];
            if (action.makePremium) {
              if (!ids.includes(action.templateId)) ids.push(action.templateId);
            } else {
              ids = ids.filter((id: string) => id !== action.templateId);
            }
            await Settings.findOneAndUpdate(
              { key: 'global' },
              { premiumTemplateIds: ids, updatedAt: new Date() }
            );
            results.push(`✅ Plantilla "${action.templateId}" ahora es ${action.makePremium ? 'Premium 👑' : 'Gratuita 🎁'}.`);
          }
          break;
        }

        case 'delete_template': {
          const deleted = await TemplateDB.findOneAndDelete({ id: action.templateId });
          if (deleted) {
            results.push(`✅ Plantilla "${deleted.name}" eliminada del catálogo.`);
          } else {
            results.push(`❌ No se encontró la plantilla "${action.templateId}".`);
          }
          break;
        }

        case 'generate_template': {
          results.push(`✨ ¡Lista! He generado la plantilla en el panel visual adjunto.`);
          break;
        }

        case 'delete_all_projects': {
          const result = await Project.deleteMany({});
          results.push(`✅ Se han eliminado permanentemente TODOS los proyectos (${result.deletedCount}).`);
          break;
        }

        default:
          results.push(`⚠️ Acción desconocida: ${action.type}`);
      }
    } catch (err: any) {
      results.push(`❌ Error ejecutando ${action.type}: ${err.message}`);
    }
  }

  return results;
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { message, history } = body as { message: string; history: ChatMessage[] };

    if (!message?.trim()) {
      return NextResponse.json({ success: false, error: 'Se requiere un mensaje.' }, { status: 400 });
    }

    // ═══ Fetch API Key ═══
    const settings = await Settings.findOne({ key: 'global' });
    if (!settings || !settings.groqApiKey) {
      return NextResponse.json({
        success: true,
        data: {
          message: '⚠️ No tengo acceso a mi cerebro todavía. Ve a **Ajustes** y configura tu API Key de Groq para activarme.',
          actions: []
        }
      });
    }

    // ═══ Gather Real-Time Context ═══
    const [projects, templates] = await Promise.all([
      Project.find({}).sort({ createdAt: -1 }).limit(50).lean(),
      TemplateDB.find({}).lean(),
    ]);

    const totalProjects = projects.length;
    const pendingPayment = projects.filter((p: any) => p.status === 'pending_payment');
    const paidProjects = projects.filter((p: any) => p.status === 'paid');
    const freeProjects = projects.filter((p: any) => p.status === 'free' || p.status === 'draft');
    const premiumIds = settings.premiumTemplateIds || [];

    // Build context strings
    const projectsList = projects.slice(0, 20).map((p: any, i: number) =>
      `${i + 1}. ID:${p._id} | Para:"${p.config?.recipientName || 'N/A'}" | De:"${p.config?.senderName || 'N/A'}" | Template:${p.template} | Estado:${p.status} | Tel:${p.clientPhone || 'N/A'} | Fecha:${new Date(p.createdAt).toLocaleDateString('es')}`
    ).join('\n');

    const templatesList = templates.map((t: any, i: number) =>
      `${i + 1}. ID:"${t.id}" | Nombre:"${t.name}" | ${t.emoji} | Premium:${premiumIds.includes(t.id) ? 'Sí' : 'No'} | Activa:${t.isActive !== false ? 'Sí' : 'No'}`
    ).join('\n');

    // ═══ System Prompt — The Brain of LinkBot ═══
    const systemPrompt = `Eres LinkBot 🤖, el asistente inteligente de administración de la plataforma LinkSurprise.
Tu personalidad es: amigable, conciso, profesional pero cercano. Usas emojis con moderación para dar vida.
Respondes SIEMPRE en español.

═══ TU PLATAFORMA ═══
LinkSurprise es una plataforma donde los usuarios crean "sorpresas digitales" (páginas HTML interactivas) para regalar a alguien especial. Pueden elegir plantillas, personalizar colores, subir fotos/música, y compartir por WhatsApp.

═══ DATOS EN TIEMPO REAL ═══
📊 Proyectos totales: ${totalProjects}
⏳ Pendientes de pago: ${pendingPayment.length}
✅ Pagados/VIP: ${paidProjects.length}
🎁 Gratuitos/Borradores: ${freeProjects.length}
🎨 Plantillas personalizadas en BD: ${templates.length}
📱 WhatsApp configurado: ${settings.whatsappNumber || 'No configurado'}
💰 Precio actual: ${settings.priceInfo || 'No configurado'}
🔑 Groq API Key: ${settings.groqApiKey ? 'Configurada ✅' : 'No configurada ❌'}

═══ ÚLTIMOS PROYECTOS ═══
${projectsList || 'No hay proyectos aún.'}

═══ PLANTILLAS PERSONALIZADAS (BD) ═══
${templatesList || 'No hay plantillas personalizadas.'}

═══ ACCIONES QUE PUEDES EJECUTAR ═══
Puedes ejecutar acciones reales en la plataforma. Para hacerlo, incluye un campo "actions" en tu respuesta JSON.

Acciones disponibles:
1. Aprobar pago: { "type": "approve_project", "projectId": "<id>" }
2. Actualizar settings: { "type": "update_settings", "field": "<campo>", "value": "<valor>" }
   Campos válidos: whatsappNumber, priceInfo, binancePayId, zinliEmail
3. Toggle premium: { "type": "toggle_premium", "templateId": "<id>", "makePremium": true/false }
4. Eliminar plantilla: { "type": "delete_template", "templateId": "<id>" }
5. Crear/Modificar plantilla visual: Manda esta acción si el usuario te pide crear o modificar una plantilla web.
   { "type": "generate_template", "template": { "html": "...", "css": "...", "js": "..." } }
   * En "html", devuelve SOLO el contenido central (sin html, head, body). Puedes usar ${recipientName}, ${senderName}, \${escapedMessage}, \${imageUrl}.
6. Eliminar todos los pedidos/proyectos: { "type": "delete_all_projects" }
   * Usa esto SOLO si el usuario pide explícitamente limpiar o borrar todos los proyectos/pedidos.

═══ FORMATO DE RESPUESTA ═══
DEBES responder ÚNICAMENTE con un JSON válido con esta estructura:
{
  "message": "Tu respuesta conversacional aquí (puede usar **markdown** básico para negritas)",
  "actions": []
}

El campo "actions" es un array. Si no hay acciones, devuelve [].
Si el usuario pide algo que requiere una acción, inclúyela en el array.

═══ REGLAS IMPORTANTES ═══
- NUNCA inventes datos de estado o estadística. Usa SOLO los datos reales proporcionados arriba.
- Eres capaz de crear CÓDIGO para plantillas impresionantes. Si el usuario pide una mejora visual de una plantilla existente o una nueva, siéntete libre de retornar la acción "generate_template" rellenando HTML, CSS avanzado (glows, glassmorphism) y JS.
- En la acción de generate_template, NO agregues markdown (\`\`\`html) dentro de las propiedades html/css/js del JSON.
- Si te piden aprobar un proyecto, busca el ID correcto en la lista de proyectos.
- Sé conciso: no más de 3-4 líneas por respuesta a menos que listen datos.
- Para listar datos, usa formato con emojis y estructura clara.
- Si el usuario saluda, responde amigablemente y ofrece ayuda.`;

    // ═══ Build conversation messages ═══
    const messages: any[] = [
      { role: 'system', content: systemPrompt }
    ];

    // Add conversation history (last 10 messages max)
    if (history && Array.isArray(history)) {
      const recentHistory = history.slice(-10);
      for (const msg of recentHistory) {
        messages.push({
          role: msg.role,
          content: msg.role === 'assistant'
            ? JSON.stringify({ message: msg.content, actions: [] })
            : msg.content
        });
      }
    }

    // Add current message
    messages.push({ role: 'user', content: message });

    // ═══ Call Groq ═══
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${settings.groqApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages,
        temperature: 0.3,
        max_tokens: 1500,
        response_format: { type: 'json_object' }
      })
    });

    if (!groqResponse.ok) {
      const errorData = await groqResponse.json();
      throw new Error(`Groq API Error: ${errorData.error?.message || 'Error desconocido'}`);
    }

    const data = await groqResponse.json();
    const content = data.choices[0].message.content;

    // ═══ Parse Response ═══
    let botResponse: BotResponse;
    try {
      botResponse = JSON.parse(content);
    } catch {
      // If JSON parsing fails, treat as plain text
      botResponse = { message: content, actions: [] };
    }

    // ═══ Execute Actions ═══
    let actionResults: string[] = [];
    if (botResponse.actions && botResponse.actions.length > 0) {
      actionResults = await executeActions(botResponse.actions);
    }

    // Append action results to message
    let finalMessage = botResponse.message;
    if (actionResults.length > 0) {
      finalMessage += '\n\n' + actionResults.join('\n');
    }

    return NextResponse.json({
      success: true,
      data: {
        message: finalMessage,
        actionsExecuted: actionResults.length,
        actions: botResponse.actions || []
      }
    });

  } catch (error: any) {
    console.error('LinkBot Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
