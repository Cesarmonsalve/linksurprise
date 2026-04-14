'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CrearPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [templates, setTemplates] = useState<any[]>([]);
  const [premiumIds, setPremiumIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchTemplates(), fetchSettings()]).then(() => setLoading(false));
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      const data = await res.json();
      if (data.success && data.data && data.data.premiumTemplateIds) {
        setPremiumIds(data.data.premiumTemplateIds);
      }
    } catch (e) {
      console.error('Failed to load settings', e);
    }
  };
    const fetchTemplates = async () => {
      try {
        const res = await fetch('/api/templates');
        const data = await res.json();
        if (data.success && data.data) {
          const arr = Object.values(data.data).map((t: any) => ({
            id: t.id,
            tag: t.pillarLabel,
            title: t.name,
            desc: t.defaultMessage?.length > 60 ? t.defaultMessage.substring(0, 60) + '...' : (t.defaultMessage || ''),
            price: '$3',
            gradient: t.gradient,
            emoji: t.emoji,
            features: [t.pillarLabel, 'Personalizable'],
          }));
          setTemplates(arr);
        }
      } catch (err) {
        console.error(err);
      }
    };

  return (
    <div style={{ minHeight: '100vh', background: '#050505', color: '#f5f5f0', padding: '2rem' }}>
      {/* Header */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', maxWidth: 1200, margin: '0 auto 3rem' }}>
        <Link href="/" style={{ textDecoration: 'none', color: '#a1a1aa', fontSize: '1.1rem', fontWeight: 600, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color='#fff'} onMouseLeave={e => e.currentTarget.style.color='#a1a1aa'}>
          <span style={{ fontSize: '1.3rem' }}>←</span> Volver al inicio
        </Link>
      </nav>

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span style={{ display: 'inline-block', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff', background: 'linear-gradient(90deg, #c084fc, #f472b6)', padding: '0.4rem 1rem', borderRadius: 20, marginBottom: '1rem', boxShadow: '0 4px 15px rgba(244,114,182,0.3)' }}>
            ✦ PASO 1
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0.5rem 0' }}>
            Crea magia visual. <br/><span style={{ background: 'linear-gradient(135deg, #c084fc, #db2777)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Regala emociones.</span>
          </h1>
          <p style={{ color: '#a1a1aa', fontSize: '1.1rem', maxWidth: 600, lineHeight: 1.6, marginTop: '1rem' }}>
            Selecciona una plantilla base. Podrás convertirla en una experiencia premium 👑 añadiendo efectos especiales VIP durante la edición.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1.5rem',
          marginTop: '3rem',
        }}>
          {loading ? (
            <p style={{ color: '#888' }}>Cargando plantillas...</p>
          ) : templates.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div
                style={{
                  borderRadius: 24,
                  border: hoveredId === t.id ? '1px solid rgba(192,132,252,0.5)' : '1px solid rgba(255,255,255,0.08)',
                  overflow: 'hidden',
                  background: 'linear-gradient(180deg, rgba(20,20,22,0.8) 0%, rgba(10,10,12,0.9) 100%)',
                  backdropFilter: 'blur(20px)',
                  transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  transform: hoveredId === t.id ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: hoveredId === t.id ? '0 20px 40px rgba(0,0,0,0.6), 0 0 40px rgba(192,132,252,0.1)' : '0 10px 30px rgba(0,0,0,0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
                onMouseEnter={() => setHoveredId(t.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Visual Header */}
                <div style={{
                  height: 160,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4.5rem',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'radial-gradient(circle at center, rgba(192,132,252,0.1) 0%, transparent 70%)',
                  borderBottom: '1px solid rgba(255,255,255,0.03)'
                }}>
                  {/* Glowing background behind emoji */}
                  <div style={{ position: 'absolute', width: 100, height: 100, background: t.gradient, filter: 'blur(40px)', opacity: 0.4, borderRadius: '50%' }} />
                  
                  <span style={{
                    transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transform: hoveredId === t.id ? 'scale(1.15) rotate(-5deg)' : 'scale(1) rotate(0)',
                    filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))',
                    position: 'relative',
                    zIndex: 2
                  }}>
                    {t.emoji}
                  </span>
                  
                  {/* Price badge */}
                  {premiumIds.includes(t.id) ? (
                    <div style={{
                      position: 'absolute', top: 16, right: 16,
                      background: 'rgba(219, 39, 119, 0.1)', border: '1px solid rgba(219, 39, 119, 0.3)',
                      backdropFilter: 'blur(10px)', padding: '0.4rem 0.8rem',
                      borderRadius: 20, fontSize: '0.7rem', fontWeight: 700, color: '#f472b6',
                      letterSpacing: '0.1em'
                    }}>
                      👑 VIP BASE
                    </div>
                  ) : (
                    <div style={{
                      position: 'absolute', top: 16, right: 16,
                      background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)',
                      backdropFilter: 'blur(10px)', padding: '0.4rem 0.8rem',
                      borderRadius: 20, fontSize: '0.7rem', fontWeight: 700, color: '#10b981',
                      letterSpacing: '0.1em'
                    }}>
                      🎁 GRATIS
                    </div>
                  )}
                </div>
                
                {/* Card Info */}
                <div style={{ padding: '1.8rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.8rem', flexWrap: 'wrap' }}>
                    {t.features.slice(0, 2).map((f: string, j: number) => (
                      <span key={j} style={{
                        fontSize: '0.65rem', padding: '0.3rem 0.6rem', borderRadius: 6,
                        background: 'rgba(255,255,255,0.04)', color: '#a1a1aa', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase'
                      }}>
                        {f}
                      </span>
                    ))}
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem 0', letterSpacing: '-0.02em', color: '#fff' }}>{t.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: '#888', lineHeight: 1.6, marginBottom: '2rem', flex: 1 }}>{t.desc}</p>
                  
                  {/* Action Buttons */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem', marginTop: 'auto' }}>
                    <Link href={`/crear/${t.id}`} style={{ textDecoration: 'none' }}>
                      <button style={{
                        width: '100%', padding: '0.8rem', borderRadius: 12,
                        background: hoveredId === t.id ? 'linear-gradient(135deg, #c084fc, #db2777)' : 'rgba(255,255,255,0.05)',
                        color: hoveredId === t.id ? '#fff' : '#e2e8f0',
                        border: hoveredId === t.id ? 'none' : '1px solid rgba(255,255,255,0.1)',
                        fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
                        transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                      }}>
                        <span>✏️</span> Crear con esta Plantilla {hoveredId === t.id && '→'}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
