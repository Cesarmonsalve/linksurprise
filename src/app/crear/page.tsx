'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function CrearPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [templates, setTemplates] = useState<any[]>([]);
  const [premiumIds, setPremiumIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Injecting font for the premium feel
    if (typeof document !== 'undefined') {
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;600;700&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

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
          desc: t.defaultMessage || '',
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
    <div style={{ 
      minHeight: '100vh', 
      background: '#080808', 
      color: '#d1d1d1', 
      fontFamily: "'Inter', sans-serif",
      position: 'relative',
      overflowX: 'hidden'
    }}>
      {/* Dynamic Noise Texture */}
      <div style={{
        position: 'fixed',
        inset: 0,
        opacity: 0.04,
        pointerEvents: 'none',
        zIndex: 1,
        background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 2, padding: '5rem 3rem', maxWidth: 1600, margin: '0 auto' }}>
        
        {/* Minimalist Heading Section */}
        <header style={{ marginBottom: '10rem', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6rem' }}>
            <Link href="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
              LS STUDIO —
            </Link>
            <div style={{ display: 'flex', gap: '4rem', fontSize: '0.75rem', fontWeight: 600, color: '#666', letterSpacing: '0.15em' }}>
              <span>CATÁLOGO 2026</span>
              <span>INDEX: 01-20</span>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '6rem', alignItems: 'end' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 style={{ 
                fontSize: 'clamp(3.5rem, 9vw, 8rem)', 
                lineHeight: 0.85, 
                fontWeight: 400, 
                letterSpacing: '-0.05em',
                margin: 0,
                fontFamily: "'Instrument Serif', serif",
                color: '#fff'
              }}>
                Diseña para <br/>la <i style={{ fontWeight: 300 }}>emoción.</i>
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              style={{ paddingBottom: '1rem' }}
            >
              <p style={{ fontSize: '1.1rem', color: '#888', maxWidth: '440px', lineHeight: 1.6, margin: 0 }}>
                Explora nuestra selección de arquitecturas visuales. <br/>Cada plantilla es una base neutral esperando tu toque personal.
              </p>
            </motion.div>
          </div>
        </header>

        {/* Gallery Grid (The "Studio" Layout) */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(12, 1fr)', 
          gap: '3rem',
          alignItems: 'start'
        }}>
          {loading ? (
            <div style={{ gridColumn: 'span 12', padding: '10rem 0', textAlign: 'left', color: '#222', fontSize: '5vw', fontFamily: 'serif' }}>ARCHITECTURE LOADING...</div>
          ) : templates.map((t, i) => {
            // Asymmetric calculation for 12-col grid
            const spanMap = [7, 5, 4, 8, 12, 6, 6];
            const span = spanMap[i % spanMap.length];
            const hasMargin = i % 2 !== 0;

            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: (i % 3) * 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{ 
                  gridColumn: `span ${span}`,
                  marginTop: hasMargin ? '6rem' : '0',
                  position: 'relative'
                }}
                onMouseEnter={() => setHoveredId(t.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div style={{
                  position: 'relative',
                  aspectRatio: span > 8 ? '21/9' : span > 6 ? '16/10' : '10/13',
                  background: '#0e0e0f',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.04)',
                  transition: 'border-color 0.4s',
                  borderColor: hoveredId === t.id ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.04)'
                }}>
                  {/* Abstract Focal Visual */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: t.gradient,
                    filter: 'blur(100px) saturate(1.5)',
                    transition: 'opacity 0.6s',
                    opacity: hoveredId === t.id ? 0.2 : 0.08
                  }} />

                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: span > 6 ? '10vw' : '15vw',
                    filter: 'grayscale(1) brightness(0.7)',
                    opacity: 0.3,
                    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: hoveredId === t.id ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0)'
                  }}>
                    {t.emoji}
                  </div>

                  {/* Metadata Overlay */}
                  <div style={{ position: 'absolute', padding: '2.5rem', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                        <span style={{ fontSize: '0.65rem', color: '#fff', fontWeight: 600, letterSpacing: '0.1em' }}>0{i+1}</span>
                        <span style={{ fontSize: '0.6rem', color: '#555', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em' }}>{t.tag}</span>
                      </div>
                      {premiumIds.includes(t.id) && (
                        <div style={{ fontSize: '0.55rem', border: '1px solid rgba(255,255,255,0.15)', color: '#aaa', padding: '0.3rem 0.6rem', letterSpacing: '0.2em' }}>VIP RELEASE</div>
                      )}
                    </div>

                    <div style={{ transition: 'transform 0.5s', transform: hoveredId === t.id ? 'translateY(-10px)' : 'translateY(0)' }}>
                      <h3 style={{ 
                        fontSize: 'clamp(1.5rem, 3vw, 3.5rem)', 
                        fontWeight: 300, 
                        margin: '0 0 0.5rem', 
                        fontFamily: "'Instrument Serif', serif", 
                        color: '#fff',
                        lineHeight: 1
                      }}>
                        {t.title}
                      </h3>
                      <AnimatePresence>
                        {hoveredId === t.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{ overflow: 'hidden' }}
                          >
                            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '2rem', maxWidth: '300px' }}>{t.desc}</p>
                            <Link href={`/crear/${t.id}`} style={{ textDecoration: 'none' }}>
                              <button style={{
                                width: '100%',
                                padding: '1.2rem',
                                background: '#fff',
                                color: '#000',
                                border: 'none',
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                letterSpacing: '0.2em',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.background = '#e2e2e2')}
                              onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
                              >
                                COMENZAR DISEÑO
                              </button>
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Studio Footer */}
        <footer style={{ marginTop: '20rem', padding: '4rem 0', borderTop: '1px solid rgba(255,255,255,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#333', letterSpacing: '0.05em' }}>
              &copy; 2026 LINK SURPRISE STUDIO <br/>
              DESIGNED IN BUENOS AIRES
            </div>
            <div style={{ display: 'flex', gap: '3rem', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', color: '#666' }}>
              <span>PRIVACY</span>
              <span>TERMS</span>
              <span>GITHUB</span>
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        body {
          margin: 0;
          cursor: crosshair;
        }
        
        ::selection {
          background: #fff;
          color: #000;
        }
      `}</style>
    </div>
  );
}
