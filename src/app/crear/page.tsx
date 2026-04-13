'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CrearPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      setLoading(false);
    };
    fetchTemplates();
  }, []);

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
          <span style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c084fc' }}>
            ✦ Paso 1
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, margin: '1rem 0 0.5rem' }}>
            ¿Qué tipo de sorpresa quieres crear?
          </h1>
          <p style={{ color: '#888', fontSize: '1rem', maxWidth: 500, lineHeight: 1.6 }}>
            Elige una plantilla y luego personalízala con tu mensaje, colores, fotos y música.
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
                    <span style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      background: 'rgba(0,0,0,0.5)',
                      backdropFilter: 'blur(10px)',
                      padding: '0.3rem 0.8rem',
                      borderRadius: 20,
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#fff',
                    }}>
                      Desde {t.price}
                    </span>
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
