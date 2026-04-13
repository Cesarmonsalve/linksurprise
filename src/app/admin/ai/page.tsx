'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

// ═══════════════════════════════════════════════════════════════
// LINKBOT IDE — PREMIUM CONVERSATIONAL & VISUAL TEMPLATE BUILDER
// ═══════════════════════════════════════════════════════════════

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actionsExecuted?: number;
}

interface TemplateCode {
  html: string;
  css: string;
  js: string;
}

const QUICK_ACTIONS = [
  { label: '✨ Crear nueva plantilla (Ej: Romántica oscura)', prompt: 'Crea una plantilla premium oscura y romántica con efectos de cristal y animaciones suaves.' },
  { label: '📊 Ver estadísticas', prompt: '¿Cuántos proyectos hay pendientes de pago?' },
  { label: '🎨 Ver plantillas', prompt: 'Lista todas mis plantillas personalizadas' },
  { label: '⚙️ Ver configuración', prompt: '¿Cuál es la configuración actual?' },
];

function formatBotMessage(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

export default function LinkBotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  
  // IDE State
  const [activeTemplate, setActiveTemplate] = useState<TemplateCode | null>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'html' | 'css' | 'js'>('preview');
  const [isSaving, setIsSaving] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isTyping) return;

    setShowWelcome(false);
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), history })
      });

      const data = await res.json();

      let newlyGeneratedTemplate: TemplateCode | null = null;

      // Intercept generate_template action
      if (data.success && data.data.actions && data.data.actions.length > 0) {
        for (const action of data.data.actions) {
          if (action.type === 'generate_template' && action.template) {
            newlyGeneratedTemplate = {
              html: action.template.html || '',
              css: action.template.css || '',
              js: action.template.js || '',
            };
          }
        }
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.success
          ? data.data.message
          : `❌ Error: ${data.error || 'No pude procesar tu solicitud.'}`,
        timestamp: new Date(),
        actionsExecuted: data.data?.actionsExecuted || 0,
      };

      setMessages(prev => [...prev, botMsg]);

      // If a template was generated, show the IDE pane
      if (newlyGeneratedTemplate) {
        setActiveTemplate(newlyGeneratedTemplate);
        setActiveTab('preview');
      }

    } catch (err: any) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '❌ Error de conexión. Verifica que la API Key de Groq esté configurada en Ajustes.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  }, [isTyping, messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setShowWelcome(true);
    setActiveTemplate(null);
  };

  const handleCodeChange = (field: keyof TemplateCode, value: string) => {
    if (!activeTemplate) return;
    setActiveTemplate({
      ...activeTemplate,
      [field]: value
    });
  };

  const saveTemplate = async () => {
    if (!activeTemplate) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/templates/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: 'ai_' + Date.now().toString().slice(-6),
          templateData: {
            name: 'Plantilla AI ' + new Date().toLocaleDateString('es-ES'),
            description: 'Creada con LinkBot',
            emoji: '🤖',
            html: activeTemplate.html,
            css: activeTemplate.css,
            js: activeTemplate.js,
            isActive: true
          }
        })
      });
      if (!res.ok) throw new Error('Error al guardar');
      
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: `✅ ¡Plantilla guardada con éxito en tu base de datos! Ya puedes usarla al crear sorpresas.`,
        timestamp: new Date()
      }]);
    } catch(e) {
      alert("Error al guardar");
    } finally {
      setIsSaving(false);
    }
  };

  // Generate live iframe content
  const previewIframeSrcDoc = activeTemplate ? `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
      <style>
        body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; min-height: 100vh; overflow-x: hidden; background: #000; color: #fff; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        ${activeTemplate.css}
      </style>
    </head>
    <body style="background: linear-gradient(135deg, #0f172a, #000)">
      ${activeTemplate.html
          .replace(/\\$\\{recipientName\\}/g, 'Andrea')
          .replace(/\\$\\{senderName\\}/g, 'Alejandro')
          .replace(/\\$\\{escapedMessage\\}/g, '¡Feliz día! Espero que te encante esta sorpresa.')
          .replace(/\\$\\{imageUrl\\}/g, 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&q=80')}
      
      <script>
        try {
          ${activeTemplate.js}
        } catch(e) {
          console.error("Template JS Error:", e);
        }
      </script>
    </body>
    </html>
  ` : '';

  return (
    <div style={{
      display: 'flex',
      width: '100%',
      height: '100vh',
      background: '#050505',
      overflow: 'hidden',
    }}>
      {/* ═══════════════════════════════════════════════════════ */}
      {/* LEFT COLUMN — CHAT                                    */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: activeTemplate ? '450px' : '100%',
        minWidth: '400px',
        height: '100%',
        position: 'relative',
        transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        borderRight: activeTemplate ? '1px solid rgba(255,255,255,0.06)' : 'none',
        flexShrink: 0
      }}>
        {/* Background Glows */}
        {!activeTemplate && (
          <div style={{
            position: 'absolute', top: '-10%', left: '20%', width: '40vw', height: '40vw',
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)',
            filter: 'blur(100px)', pointerEvents: 'none',
          }} />
        )}

        {/* Header */}
        <div style={{
          padding: '1.25rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          backdropFilter: 'blur(20px)', background: 'rgba(5,5,5,0.8)', zIndex: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'linear-gradient(135deg, #7c3aed, #10b981)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem',
              boxShadow: '0 0 15px rgba(124, 58, 237, 0.2)',
            }}>🤖</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>LinkBot <b style={{fontSize:'0.6rem', color:'#10b981'}}>● ONLINE</b></div>
              <div style={{ fontSize: '0.75rem', color: '#666' }}>IDE Modalidad Activa</div>
            </div>
          </div>
          <button onClick={clearChat} style={{
            background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#888',
            padding: '0.4rem 0.8rem', borderRadius: 8, fontSize: '0.8rem', cursor: 'pointer'
          }}>🗑️</button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {showWelcome && messages.length === 0 && (
             <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '1.5rem' }}>
               <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>🤖</div>
               <div>
                 <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0, color: '#fff' }}>Hablemos.</h1>
                 <p style={{ color: '#888', fontSize: '0.9rem', maxWidth: 300, margin: '10px auto' }}>Pídeme estadísticas, aprobar pagos, o <b>generar una nueva plantilla visual.</b></p>
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', maxWidth: '300px' }}>
                 {QUICK_ACTIONS.map((a, i) => (
                   <button key={i} onClick={() => sendMessage(a.prompt)} style={{
                     background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#ccc',
                     padding: '0.75rem', borderRadius: 12, fontSize: '0.8rem', cursor: 'pointer', textAlign: 'left'
                   }}>
                     {a.label}
                   </button>
                 ))}
               </div>
             </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: '0.75rem' }}>
              {msg.role === 'assistant' && (
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>🤖</div>
              )}
              <div style={{
                maxWidth: '78%', padding: '1rem',
                borderRadius: msg.role === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                background: msg.role === 'user' ? '#7c3aed' : 'rgba(255,255,255,0.05)',
                color: '#fff', fontSize: '0.85rem', lineHeight: 1.6, wordBreak: 'break-word', border: msg.role === 'assistant' ? '1px solid rgba(255,255,255,0.05)' : 'none'
              }}>
                <div dangerouslySetInnerHTML={{ __html: formatBotMessage(msg.content) }} />
                {msg.actionsExecuted && msg.actionsExecuted > 0 ? (
                  <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.65rem', color: '#10b981' }}>⚡ {msg.actionsExecuted} acciones</div>
                ) : null}
              </div>
            </div>
          ))}

          {isTyping && (
             <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem' }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>🤖</div>
                <div style={{ padding: '1rem', borderRadius: '16px 16px 16px 2px', background: 'rgba(255,255,255,0.05)', display: 'flex', gap: '4px' }}>
                  <span style={{width: 6, height: 6, background: '#7c3aed', borderRadius: '50%'}}></span>
                  <span style={{width: 6, height: 6, background: '#7c3aed', borderRadius: '50%'}}></span>
                  <span style={{width: 6, height: 6, background: '#7c3aed', borderRadius: '50%'}}></span>
                </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{ padding: '1.25rem', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '0.25rem 0.25rem 0.25rem 1rem' }}>
            <input
              ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
              placeholder="Habla con LinkBot..." disabled={isTyping}
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '0.9rem' }}
            />
            <button onClick={() => sendMessage(input)} disabled={isTyping || !input.trim()} style={{
              width: 38, height: 38, borderRadius: 10, border: 'none',
              background: isTyping || !input.trim() ? 'transparent' : '#7c3aed',
              color: isTyping || !input.trim() ? '#555' : '#fff', cursor: isTyping || !input.trim() ? 'default' : 'pointer'
            }}>➤</button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* RIGHT COLUMN — VISUAL IDE PANE                          */}
      {/* ═══════════════════════════════════════════════════════ */}
      {activeTemplate && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0a0a0c', animation: 'fadeIn 0.5s ease' }}>
          
          {/* IDE Toolbar */}
          <div style={{ 
            height: '60px', borderBottom: '1px solid rgba(255,255,255,0.08)', 
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', background: '#050505'
          }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['preview', 'html', 'css', 'js'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab as any)} style={{
                  background: activeTab === tab ? '#1e1e24' : 'transparent',
                  color: activeTab === tab ? '#fff' : '#666',
                  border: '1px solid',
                  borderColor: activeTab === tab ? 'rgba(255,255,255,0.1)' : 'transparent',
                  padding: '0.4rem 1rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer', transition: 'all 0.2s'
                }}>
                  {tab === 'preview' ? '👁️ ' : '📝 '} {tab}
                </button>
              ))}
            </div>

            <button onClick={saveTemplate} disabled={isSaving} style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: '#fff', border: 'none', padding: '0.5rem 1.2rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700,
              cursor: isSaving ? 'not-allowed' : 'pointer', opacity: isSaving ? 0.7 : 1, display: 'flex', alignItems: 'center', gap: '0.5rem'
            }}>
              {isSaving ? 'Guardando...' : '💾 Guardar en DB'}
            </button>
          </div>

          {/* IDE Workspace (Editor or Preview) */}
          <div style={{ flex: 1, position: 'relative' }}>
            
            {/* Live Preview Embed */}
            {activeTab === 'preview' && (
              <div style={{ 
                width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'repeating-conic-gradient(#111 0% 25%, #050505 0% 50%) 50% / 40px 40px'
              }}>
                <div style={{ 
                  width: '375px', height: '667px', borderRadius: '36px', overflow: 'hidden', 
                  boxShadow: '0 25px 50px rgba(0,0,0,0.5), 0 0 0 10px #1a1a1a', 
                  border: '1px solid #333'
                }}>
                  <iframe 
                    title="Live Preview" 
                    sandbox="allow-scripts allow-same-origin"
                    srcDoc={previewIframeSrcDoc}
                    style={{ width: '100%', height: '100%', border: 'none', background: '#000' }}
                  />
                </div>
              </div>
            )}

            {/* Code Editors */}
            {activeTab !== 'preview' && (
              <textarea
                value={activeTemplate[activeTab]}
                onChange={e => handleCodeChange(activeTab, e.target.value)}
                spellCheck="false"
                style={{
                  width: '100%', height: '100%', padding: '2rem', background: '#0a0a0c', color: '#a78bfa',
                  fontFamily: '"Fira Code", "Consolas", monospace', fontSize: '0.9rem', lineHeight: 1.6,
                  border: 'none', outline: 'none', resize: 'none'
                }}
              />
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </div>
  );
}
