'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

// ═══════════════════════════════════════════════════════════════
// LINKBOT — PREMIUM CONVERSATIONAL AI ADMIN INTERFACE
// ═══════════════════════════════════════════════════════════════

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actionsExecuted?: number;
}

const QUICK_ACTIONS = [
  { label: '📊 Ver estadísticas', prompt: '¿Cuántos proyectos hay y cuántos están pendientes de pago?' },
  { label: '⏳ Pendientes de pago', prompt: 'Muéstrame los proyectos que están pendientes de pago' },
  { label: '🎨 Ver plantillas', prompt: 'Lista todas las plantillas personalizadas que tengo' },
  { label: '⚙️ Ver configuración', prompt: '¿Cuál es la configuración actual de la plataforma?' },
  { label: '💡 ¿Qué puedes hacer?', prompt: '¿Qué cosas puedes hacer por mí?' },
];

function formatBotMessage(text: string): string {
  // Convert **bold** to <strong>
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

export default function LinkBotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
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
      // Build history from existing messages
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
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: '#050505',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* ═══ Background Glow Effects ═══ */}
      <div style={{
        position: 'absolute', top: '-20%', left: '-10%',
        width: '40vw', height: '40vw',
        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)',
        filter: 'blur(100px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-20%', right: '-10%',
        width: '50vw', height: '50vw',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%)',
        filter: 'blur(120px)', pointerEvents: 'none',
      }} />

      {/* ═══ Header Bar ═══ */}
      <div style={{
        padding: '1.25rem 2rem',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backdropFilter: 'blur(20px)',
        background: 'rgba(5,5,5,0.8)',
        zIndex: 10,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Bot Avatar */}
          <div style={{
            width: 42, height: 42, borderRadius: '50%',
            background: 'linear-gradient(135deg, #7c3aed, #10b981)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.3rem',
            boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)',
            animation: 'botPulse 3s ease-in-out infinite',
          }}>
            🤖
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
              LinkBot
              <span style={{
                marginLeft: '0.5rem',
                fontSize: '0.6rem',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10b981',
                padding: '0.15rem 0.5rem',
                borderRadius: 20,
                fontWeight: 600,
                verticalAlign: 'middle',
              }}>
                ● ONLINE
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.15rem' }}>
              Tu asistente de administración con IA
            </div>
          </div>
        </div>

        <button
          onClick={clearChat}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#888',
            padding: '0.5rem 1rem',
            borderRadius: 10,
            fontSize: '0.8rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            (e.target as HTMLButtonElement).style.background = 'rgba(239, 68, 68, 0.1)';
            (e.target as HTMLButtonElement).style.color = '#ef4444';
            (e.target as HTMLButtonElement).style.borderColor = 'rgba(239, 68, 68, 0.3)';
          }}
          onMouseLeave={e => {
            (e.target as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)';
            (e.target as HTMLButtonElement).style.color = '#888';
            (e.target as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)';
          }}
        >
          🗑️ Limpiar
        </button>
      </div>

      {/* ═══ Messages Area ═══ */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        zIndex: 1,
      }}>

        {/* ═══ Welcome Screen ═══ */}
        {showWelcome && messages.length === 0 && (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: '2rem',
            padding: '2rem',
          }}>
            {/* Big Bot Icon */}
            <div style={{
              width: 90, height: 90, borderRadius: '50%',
              background: 'linear-gradient(135deg, #7c3aed, #10b981)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2.8rem',
              boxShadow: '0 0 60px rgba(124, 58, 237, 0.25), 0 0 120px rgba(16, 185, 129, 0.1)',
              animation: 'botPulse 3s ease-in-out infinite',
            }}>
              🤖
            </div>
            <div>
              <h1 style={{
                fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em',
                marginBottom: '0.75rem',
                background: 'linear-gradient(135deg, #fff, #a78bfa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Hola, soy LinkBot
              </h1>
              <p style={{ color: '#888', fontSize: '1rem', maxWidth: 450, lineHeight: 1.6 }}>
                Tu asistente inteligente para gestionar toda la plataforma. Pregúntame lo que necesites o usa las sugerencias rápidas.
              </p>
            </div>

            {/* Quick Action Chips */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              justifyContent: 'center',
              maxWidth: 600,
            }}>
              {QUICK_ACTIONS.map((action, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(action.prompt)}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#ccc',
                    padding: '0.65rem 1.2rem',
                    borderRadius: 40,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.25s',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={e => {
                    (e.target as HTMLButtonElement).style.background = 'rgba(124, 58, 237, 0.1)';
                    (e.target as HTMLButtonElement).style.borderColor = 'rgba(124, 58, 237, 0.3)';
                    (e.target as HTMLButtonElement).style.color = '#c084fc';
                  }}
                  onMouseLeave={e => {
                    (e.target as HTMLButtonElement).style.background = 'rgba(255,255,255,0.03)';
                    (e.target as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)';
                    (e.target as HTMLButtonElement).style.color = '#ccc';
                  }}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ═══ Message Bubbles ═══ */}
        {messages.map((msg, index) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              alignItems: 'flex-end',
              gap: '0.75rem',
              animation: 'messageSlide 0.35s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
          >
            {/* Bot Avatar (left side) */}
            {msg.role === 'assistant' && (
              <div style={{
                width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #7c3aed, #10b981)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem',
                boxShadow: '0 0 12px rgba(124, 58, 237, 0.2)',
              }}>
                🤖
              </div>
            )}

            {/* Message Bubble */}
            <div style={{
              maxWidth: '70%',
              padding: '1rem 1.25rem',
              borderRadius: msg.role === 'user'
                ? '20px 20px 4px 20px'
                : '20px 20px 20px 4px',
              background: msg.role === 'user'
                ? 'linear-gradient(135deg, #7c3aed, #6d28d9)'
                : 'rgba(255,255,255,0.04)',
              border: msg.role === 'user'
                ? 'none'
                : '1px solid rgba(255,255,255,0.08)',
              color: msg.role === 'user' ? '#fff' : '#e4e4e7',
              fontSize: '0.9rem',
              lineHeight: 1.65,
              backdropFilter: msg.role === 'assistant' ? 'blur(10px)' : 'none',
              boxShadow: msg.role === 'user'
                ? '0 4px 20px rgba(124, 58, 237, 0.25)'
                : '0 2px 10px rgba(0,0,0,0.2)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}>
              <div dangerouslySetInnerHTML={{
                __html: formatBotMessage(msg.content)
              }} />

              {/* Action badge */}
              {msg.actionsExecuted && msg.actionsExecuted > 0 ? (
                <div style={{
                  marginTop: '0.75rem',
                  paddingTop: '0.5rem',
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  fontSize: '0.7rem',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}>
                  ⚡ {msg.actionsExecuted} {msg.actionsExecuted === 1 ? 'acción ejecutada' : 'acciones ejecutadas'}
                </div>
              ) : null}
            </div>

            {/* Timestamp */}
            <div style={{
              fontSize: '0.65rem',
              color: '#444',
              flexShrink: 0,
              alignSelf: 'flex-end',
              marginBottom: '0.2rem',
            }}>
              {msg.timestamp.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}

        {/* ═══ Typing Indicator ═══ */}
        {isTyping && (
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '0.75rem',
            animation: 'messageSlide 0.3s ease-out',
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, #7c3aed, #10b981)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1rem',
            }}>
              🤖
            </div>
            <div style={{
              padding: '1rem 1.5rem',
              borderRadius: '20px 20px 20px 4px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              gap: '0.3rem',
              alignItems: 'center',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#7c3aed', animation: 'typingDot 1.4s ease-in-out infinite', animationDelay: '0s' }} />
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#7c3aed', animation: 'typingDot 1.4s ease-in-out infinite', animationDelay: '0.2s' }} />
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#7c3aed', animation: 'typingDot 1.4s ease-in-out infinite', animationDelay: '0.4s' }} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ═══ Quick Actions (shown after conversation starts) ═══ */}
      {messages.length > 0 && !isTyping && (
        <div style={{
          padding: '0 2rem',
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'nowrap',
          overflowX: 'auto',
          zIndex: 10,
          paddingBottom: '0.75rem',
        }}>
          {QUICK_ACTIONS.slice(0, 3).map((action, i) => (
            <button
              key={i}
              onClick={() => sendMessage(action.prompt)}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#888',
                padding: '0.4rem 0.9rem',
                borderRadius: 20,
                fontSize: '0.75rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                (e.target as HTMLButtonElement).style.background = 'rgba(124, 58, 237, 0.1)';
                (e.target as HTMLButtonElement).style.color = '#c084fc';
              }}
              onMouseLeave={e => {
                (e.target as HTMLButtonElement).style.background = 'rgba(255,255,255,0.03)';
                (e.target as HTMLButtonElement).style.color = '#888';
              }}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}

      {/* ═══ Input Bar ═══ */}
      <div style={{
        padding: '1.25rem 2rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(5,5,5,0.9)',
        backdropFilter: 'blur(20px)',
        zIndex: 10,
        flexShrink: 0,
      }}>
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 16,
          padding: '0.25rem 0.25rem 0.25rem 1.25rem',
          transition: 'border-color 0.3s',
        }}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escríbeme lo que necesites..."
            disabled={isTyping}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontSize: '0.95rem',
              fontFamily: 'inherit',
            }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={isTyping || !input.trim()}
            style={{
              width: 44, height: 44,
              borderRadius: 12,
              border: 'none',
              background: isTyping || !input.trim()
                ? 'rgba(255,255,255,0.05)'
                : 'linear-gradient(135deg, #7c3aed, #10b981)',
              color: '#fff',
              fontSize: '1.2rem',
              cursor: isTyping || !input.trim() ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s',
              flexShrink: 0,
              boxShadow: isTyping || !input.trim()
                ? 'none'
                : '0 4px 15px rgba(124, 58, 237, 0.3)',
            }}
          >
            ➤
          </button>
        </div>
        <div style={{
          textAlign: 'center',
          fontSize: '0.65rem',
          color: '#444',
          marginTop: '0.6rem',
        }}>
          LinkBot usa Llama-3 vía Groq • Las respuestas pueden no ser perfectas
        </div>
      </div>

      {/* ═══ CSS Animations ═══ */}
      <style>{`
        @keyframes botPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(124, 58, 237, 0.3); }
          50% { box-shadow: 0 0 35px rgba(124, 58, 237, 0.5), 0 0 60px rgba(16, 185, 129, 0.2); }
        }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes messageSlide {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Custom scrollbar */
        div::-webkit-scrollbar { width: 4px; }
        div::-webkit-scrollbar-track { background: transparent; }
        div::-webkit-scrollbar-thumb { background: rgba(124, 58, 237, 0.2); border-radius: 4px; }
        div::-webkit-scrollbar-thumb:hover { background: rgba(124, 58, 237, 0.4); }
      `}</style>
    </div>
  );
}
