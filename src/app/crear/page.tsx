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
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem', maxWidth: 1200, margin: '0 auto 4rem' }}>
        <Link href="/" style={{ textDecoration: 'none', color: '#f5f5f0', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
          ← LinkSurprise
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
              <Link
                href={`/crear/${t.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
                onMouseEnter={() => setHoveredId(t.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div style={{
                  borderRadius: 20,
                  border: hoveredId === t.id ? '1px solid rgba(192,132,252,0.4)' : '1px solid rgba(255,255,255,0.06)',
                  overflow: 'hidden',
                  background: '#0a0a0a',
                  transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                  transform: hoveredId === t.id ? 'translateY(-6px)' : 'translateY(0)',
                }}>
                  {/* Card Visual */}
                  <div style={{
                    background: t.gradient,
                    height: 180,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4rem',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    <span style={{
                      transition: 'transform 0.5s',
                      transform: hoveredId === t.id ? 'scale(1.2)' : 'scale(1)',
                    }}>
                      {t.emoji}
                    </span>
                    {/* Price badge */}
                    {premiumIds.includes(t.id) ? (
                      <span style={{
                        position: 'absolute', top: 12, right: 12,
                        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.95), rgba(219, 39, 119, 0.95))',
                        backdropFilter: 'blur(10px)', padding: '0.4rem 0.8rem',
                        borderRadius: 20, fontSize: '0.75rem', fontWeight: 800, color: '#fff',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.4)', letterSpacing: '0.05em'
                      }}>
                        👑 VIP EXCLUSIVO
                      </span>
                    ) : (
                      <span style={{
                        position: 'absolute', top: 12, right: 12,
                        background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.5)',
                        backdropFilter: 'blur(10px)', padding: '0.4rem 0.8rem',
                        borderRadius: 20, fontSize: '0.75rem', fontWeight: 800, color: '#10b981',
                        letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.3rem'
                      }}>
                        🎁 GRATIS <span style={{fontSize: '0.6rem', opacity: 0.8}}>(Mejorable)</span>
                      </span>
                    )}
                  </div>
                  {/* Card Info */}
                  <div style={{ padding: '1.5rem' }}>
                    <span style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c084fc', fontWeight: 600 }}>
                      {t.tag}
                    </span>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '0.4rem 0' }}>{t.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: '#888', lineHeight: 1.5, marginBottom: '1rem' }}>{t.desc}</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {t.features.map((f: string, j: number) => (
                        <span key={j} style={{
                          fontSize: '0.7rem',
                          padding: '0.25rem 0.6rem',
                          borderRadius: 20,
                          background: 'rgba(192,132,252,0.1)',
                          color: '#c084fc',
                          border: '1px solid rgba(192,132,252,0.15)',
                        }}>
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
