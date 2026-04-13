'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// ═══════════════════════════════════════════════════════════════
// LINKSURPRISE — AWWWARDS-LEVEL LANDING PAGE
// Premium, immersive, conversion-optimized
// ═══════════════════════════════════════════════════════════════

const TEMPLATES_SHOWCASE = [
  { emoji: '🌌', name: 'Nebula Glass', tag: 'FUTURISTA', gradient: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)' },
  { emoji: '🎬', name: 'Cinema Noir', tag: 'CINEMATOGRÁFICO', gradient: 'linear-gradient(135deg, #0c0c0c, #1a1a2e, #16213e)' },
  { emoji: '🧊', name: 'Crystal Bento', tag: 'MINIMALISTA', gradient: 'linear-gradient(135deg, #0a0a0a, #1a1a1a, #0d0d0d)' },
  { emoji: '🎨', name: 'Acuarela Mágica', tag: 'ARTÍSTICO', gradient: 'linear-gradient(135deg, #1a0533, #2d1b69, #11001c)' },
  { emoji: '💫', name: 'Cosmic Void', tag: 'FUTURISTA', gradient: 'linear-gradient(135deg, #000428, #004e92, #000428)' },
  { emoji: '🔥', name: 'Neon Pulse', tag: 'CYBERPUNK', gradient: 'linear-gradient(135deg, #0a0a0a, #1a0a2e, #2a0a1e)' },
];

const TESTIMONIALS = [
  { text: '"Le hice una sorpresa a mi novia por nuestro aniversario y lloró de la emoción. ¡Increíble!"', name: 'Carlos M.', initials: 'CM', role: 'Aniversario 💕' },
  { text: '"Mi mamá no paraba de ver la página. La música, las fotos... todo perfecto para su cumpleaños."', name: 'Valentina R.', initials: 'VR', role: 'Cumpleaños 🎂' },
  { text: '"Era escéptico, pero la plantilla 3D dejó sin palabras a mi mejor amigo. Vale cada centavo."', name: 'Diego L.', initials: 'DL', role: 'Amistad ✨' },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Intersection Observer for reveal animations — runs AFTER mounted content renders
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    // Small delay to ensure DOM is painted
    const timer = setTimeout(() => {
      document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [mounted]);

  if (!mounted) return <div style={{ minHeight: '100vh', background: '#050505' }} />;

  const isVisible = (id: string) => visibleSections.has(id);

  return (
    <div style={{
      backgroundColor: '#050505',
      color: '#f0eeff',
      minHeight: '100vh',
      fontFamily: "'Inter', sans-serif",
      overflowX: 'hidden',
      position: 'relative',
    }}>

      {/* ═══ AMBIENT BACKGROUND EFFECTS ═══ */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}>
        <div style={{
          position: 'absolute', top: '-20%', left: '-15%',
          width: '60vw', height: '60vw',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 70%)',
          filter: 'blur(100px)',
          transform: `translate(${scrollY * 0.02}px, ${scrollY * 0.01}px)`,
        }} />
        <div style={{
          position: 'absolute', top: '30%', right: '-20%',
          width: '70vw', height: '70vw',
          background: 'radial-gradient(circle, rgba(244, 114, 182, 0.08) 0%, transparent 70%)',
          filter: 'blur(120px)',
          transform: `translate(${-scrollY * 0.015}px, ${scrollY * 0.02}px)`,
        }} />
        <div style={{
          position: 'absolute', bottom: '-30%', left: '30%',
          width: '50vw', height: '50vw',
          background: 'radial-gradient(circle, rgba(129, 140, 248, 0.06) 0%, transparent 70%)',
          filter: 'blur(100px)',
          transform: `translate(0, ${-scrollY * 0.01}px)`,
        }} />
      </div>

      {/* ═══ NAVIGATION ═══ */}
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 100,
        background: scrollY > 50 ? 'rgba(5, 5, 5, 0.85)' : 'transparent',
        backdropFilter: scrollY > 50 ? 'blur(20px)' : 'none',
        borderBottom: scrollY > 50 ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
        transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
      }}>
        <div style={{
          maxWidth: 1300, margin: '0 auto', padding: '1.2rem 2rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{
            fontWeight: 800, fontSize: '1.3rem', letterSpacing: '-0.04em',
            display: 'flex', alignItems: 'center', gap: '0.1rem',
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #fff, #c084fc)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Link</span>
            <span style={{
              background: 'linear-gradient(135deg, #c084fc, #f472b6)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Surprise</span>
            <span style={{ fontSize: '1.5rem', WebkitTextFillColor: 'initial' }}>✨</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <a href="#como-funciona" style={{ color: '#888', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500, transition: 'color 0.2s', letterSpacing: '0.02em' }}>
              ¿Cómo funciona?
            </a>
            <a href="#plantillas" style={{ color: '#888', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500, transition: 'color 0.2s', letterSpacing: '0.02em' }}>
              Plantillas
            </a>
            <a href="#precios" style={{ color: '#888', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500, transition: 'color 0.2s', letterSpacing: '0.02em' }}>
              Precios
            </a>
            <Link href="/crear/nebula_glass" style={{
              background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
              color: '#fff', padding: '0.6rem 1.5rem', borderRadius: '40px',
              fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(124, 58, 237, 0.35)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}>
              Crear Sorpresa
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══ HERO SECTION ═══ */}
      <section ref={heroRef} style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', position: 'relative',
        zIndex: 1, padding: '2rem', textAlign: 'center',
      }}>
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: 4 + i * 2, height: 4 + i * 2,
            borderRadius: '50%',
            background: i % 2 === 0 ? 'rgba(192, 132, 252, 0.4)' : 'rgba(244, 114, 182, 0.3)',
            top: `${15 + i * 13}%`,
            left: `${10 + i * 14}%`,
            animation: `floatParticle ${6 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.8}s`,
            filter: 'blur(1px)',
          }} />
        ))}

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          border: '1px solid rgba(192, 132, 252, 0.25)',
          padding: '0.5rem 1.25rem', borderRadius: '40px',
          fontSize: '0.8rem', fontWeight: 600, color: '#c084fc',
          background: 'rgba(192, 132, 252, 0.05)',
          marginBottom: '2.5rem',
          backdropFilter: 'blur(10px)',
          animation: 'fadeSlideUp 0.8s ease-out',
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: '#10b981',
            boxShadow: '0 0 8px #10b981',
            animation: 'pulse 2s ease-in-out infinite',
          }} />
          +500 sorpresas creadas este mes
        </div>

        {/* Main Heading */}
        <h1 style={{
          fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
          fontWeight: 800, lineHeight: 1.05,
          letterSpacing: '-0.03em',
          marginBottom: '1.5rem',
          maxWidth: 900,
          animation: 'fadeSlideUp 0.8s ease-out 0.15s both',
        }}>
          <span style={{ display: 'block' }}>Sorprende con una</span>
          <span style={{
            display: 'block',
            background: 'linear-gradient(135deg, #c084fc, #f472b6, #818cf8)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundSize: '200% 200%',
            animation: 'gradientShift 4s ease infinite',
          }}>
            experiencia mágica.
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
          color: '#a1a1aa', maxWidth: 550,
          lineHeight: 1.7, marginBottom: '3rem',
          animation: 'fadeSlideUp 0.8s ease-out 0.3s both',
        }}>
          Crea páginas interactivas con música, fotos y efectos cinematográficos. 
          Envía el link por WhatsApp y haz llorar de emoción a esa persona especial.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center',
          animation: 'fadeSlideUp 0.8s ease-out 0.45s both',
        }}>
          <Link href="/crear/nebula_glass" className="hero-cta-primary" style={{
            background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
            color: '#fff', padding: '1.1rem 2.8rem', borderRadius: '50px',
            fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none',
            boxShadow: '0 10px 40px -10px rgba(124, 58, 237, 0.5), inset 0 1px 0 rgba(255,255,255,0.15)',
            transition: 'transform 0.3s, box-shadow 0.3s',
            position: 'relative', overflow: 'hidden',
          }}>
            Empezar Gratis →
          </Link>
          <a href="#como-funciona" style={{
            color: '#ccc', padding: '1.1rem 2.5rem', borderRadius: '50px',
            fontWeight: 600, fontSize: '1rem', textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.12)',
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s',
          }}>
            Ver cómo funciona
          </a>
        </div>

        {/* Social Proof */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '1rem',
          marginTop: '4rem',
          animation: 'fadeSlideUp 0.8s ease-out 0.6s both',
        }}>
          {/* Stacked Avatars */}
          <div style={{ display: 'flex' }}>
            {['🥰', '😍', '💕', '🤩'].map((emoji, i) => (
              <div key={i} style={{
                width: 36, height: 36, borderRadius: '50%',
                background: `linear-gradient(135deg, ${['#7c3aed', '#ec4899', '#818cf8', '#10b981'][i]}, ${['#6d28d9', '#db2777', '#6366f1', '#059669'][i]})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem',
                border: '2px solid #050505',
                marginLeft: i > 0 ? '-10px' : '0',
                zIndex: 4 - i,
              }}>{emoji}</div>
            ))}
          </div>
          <div>
            <div style={{ display: 'flex', gap: '2px', marginBottom: '2px' }}>
              {[1,2,3,4,5].map(i => (
                <span key={i} style={{ color: '#fbbf24', fontSize: '0.85rem' }}>★</span>
              ))}
            </div>
            <span style={{ color: '#888', fontSize: '0.8rem' }}>
              <strong style={{ color: '#e4e4e7' }}>4.9/5</strong> — Miles de sonrisas creadas
            </span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '2rem',
          animation: 'bounce 2s ease-in-out infinite',
          opacity: 0.3,
        }}>
          <div style={{
            width: 24, height: 40, borderRadius: 12,
            border: '2px solid rgba(255,255,255,0.3)',
            display: 'flex', justifyContent: 'center', paddingTop: 8,
          }}>
            <div style={{
              width: 3, height: 8, borderRadius: 3,
              background: '#c084fc',
              animation: 'scrollDot 2s ease-in-out infinite',
            }} />
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE SECTION ═══ */}
      <div style={{
        padding: '1.5rem 0', overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{
          display: 'flex', width: 'max-content',
          animation: 'marquee 30s linear infinite',
        }}>
          {[...Array(2)].map((_, rep) => (
            <React.Fragment key={rep}>
              {['CARTAS DE AMOR', 'CUMPLEAÑOS', 'ANIVERSARIOS', 'AMISTADES', 'SORPRESAS', 'DEDICATORIAS', 'REGALOS DIGITALES', 'EXPERIENCIAS'].map((text, i) => (
                <span key={`${rep}-${i}`} style={{
                  fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                  fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.05em', whiteSpace: 'nowrap',
                  padding: '0 1.5rem',
                  color: 'rgba(255, 255, 255, 0.05)',
                }}>
                  {text} <span style={{
                    display: 'inline-block', width: 6, height: 6,
                    background: '#c084fc', borderRadius: '50%',
                    margin: '0 1rem', verticalAlign: 'middle', opacity: 0.5,
                  }} />
                </span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="como-funciona" data-reveal style={{
        padding: 'clamp(80px, 12vw, 160px) 2rem',
        position: 'relative', zIndex: 1,
        maxWidth: 1200, margin: '0 auto',
        opacity: isVisible('como-funciona') ? 1 : 0,
        transform: isVisible('como-funciona') ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
      }}>
        <div style={{ marginBottom: '4rem' }}>
          <div style={{
            fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.3em',
            textTransform: 'uppercase', color: '#c084fc', marginBottom: '1rem',
          }}>
            PROCESO
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1,
            maxWidth: 600, marginBottom: '1rem',
          }}>
            Tres pasos para crear <span style={{
              background: 'linear-gradient(135deg, #c084fc, #f472b6)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>algo inolvidable.</span>
          </h2>
          <p style={{ color: '#888', fontSize: '1.05rem', maxWidth: 500 }}>
            No necesitas saber programar. Solo tu creatividad y tus sentimientos.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
        }}>
          {[
            {
              num: '01',
              title: 'Elige tu plantilla',
              desc: 'Explora más de 20 diseños profesionales: futuristas, cinematográficos, minimalistas, artísticos y cyberpunk.',
              icon: '🎭',
            },
            {
              num: '02',
              title: 'Personaliza todo',
              desc: 'Sube tu música favorita en MP3, añade fotos, escribe tu dedicatoria y elige efectos visuales espectaculares.',
              icon: '✨',
            },
            {
              num: '03',
              title: 'Comparte y emociona',
              desc: 'Recibe un link mágico listo para enviar por WhatsApp. Se ve perfecto en cualquier celular.',
              icon: '💌',
            },
          ].map((step, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 24, padding: '2.5rem',
              position: 'relative', overflow: 'hidden',
              transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
              opacity: isVisible('como-funciona') ? 1 : 0,
              transform: isVisible('como-funciona') ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: `${0.15 * i}s`,
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(192, 132, 252, 0.2)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              }}
            >
              {/* Top accent line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: 'linear-gradient(90deg, #7c3aed, #ec4899)',
                opacity: 0, transition: 'opacity 0.4s',
              }} className="top-accent" />

              <div style={{
                display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem',
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 16,
                  background: 'rgba(124, 58, 237, 0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem',
                }}>
                  {step.icon}
                </div>
                <span style={{
                  fontSize: '2.5rem', fontWeight: 800,
                  background: 'linear-gradient(135deg, rgba(192, 132, 252, 0.3), transparent)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  lineHeight: 1,
                }}>
                  {step.num}
                </span>
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>
                {step.title}
              </h3>
              <p style={{ color: '#888', lineHeight: 1.7, fontSize: '0.95rem' }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ TEMPLATES SHOWCASE ═══ */}
      <section id="plantillas" data-reveal style={{
        padding: 'clamp(60px, 10vw, 140px) 2rem',
        position: 'relative', zIndex: 1,
        maxWidth: 1300, margin: '0 auto',
        opacity: isVisible('plantillas') ? 1 : 0,
        transform: isVisible('plantillas') ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.3em',
            textTransform: 'uppercase', color: '#f472b6', marginBottom: '1rem',
          }}>
            GALERÍA
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem',
          }}>
            Plantillas que <span style={{
              background: 'linear-gradient(135deg, #f472b6, #818cf8)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>dejan sin aliento.</span>
          </h2>
          <p style={{ color: '#888', fontSize: '1.05rem', maxWidth: 500, margin: '0 auto' }}>
            Cada una diseñada para generar emociones reales. Interactivas, inmersivas, únicas.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {TEMPLATES_SHOWCASE.map((tmpl, i) => (
            <Link
              href={`/crear/${tmpl.name.toLowerCase().replace(/ /g, '_')}`}
              key={i}
              style={{
                textDecoration: 'none', color: '#fff',
                borderRadius: 20, overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.06)',
                background: tmpl.gradient,
                aspectRatio: '4/5',
                display: 'flex', flexDirection: 'column',
                justifyContent: 'flex-end', padding: '2rem',
                position: 'relative',
                transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                opacity: isVisible('plantillas') ? 1 : 0,
                transform: isVisible('plantillas') ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)',
                transitionDelay: `${0.08 * i}s`,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-8px) scale(1.02)';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(192, 132, 252, 0.3)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0) scale(1)';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.06)';
              }}
            >
              {/* Large emoji center */}
              <div style={{
                position: 'absolute', top: '30%', left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '5rem', filter: 'drop-shadow(0 0 30px rgba(0,0,0,0.5))',
                transition: 'transform 0.5s',
              }}>
                {tmpl.emoji}
              </div>

              {/* Bottom gradient overlay */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase',
                  color: '#c084fc', fontWeight: 700, marginBottom: '0.4rem',
                }}>
                  {tmpl.tag}
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
                  {tmpl.name}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/crear/nebula_glass" style={{
            color: '#c084fc', textDecoration: 'none', fontSize: '0.95rem',
            fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.8rem 2rem', borderRadius: 40,
            border: '1px solid rgba(192, 132, 252, 0.2)',
            background: 'rgba(192, 132, 252, 0.05)',
            transition: 'all 0.3s',
          }}>
            Ver todas las plantillas →
          </Link>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section id="testimonios" data-reveal style={{
        padding: 'clamp(60px, 10vw, 120px) 2rem',
        position: 'relative', zIndex: 1,
        maxWidth: 1100, margin: '0 auto',
        opacity: isVisible('testimonios') ? 1 : 0,
        transform: isVisible('testimonios') ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.3em',
            textTransform: 'uppercase', color: '#10b981', marginBottom: '1rem',
          }}>
            TESTIMONIOS
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800, letterSpacing: '-0.03em',
          }}>
            Historias que <span style={{
              background: 'linear-gradient(135deg, #10b981, #818cf8)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>emocionan.</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 20, padding: '2rem',
              transition: 'all 0.4s',
              opacity: isVisible('testimonios') ? 1 : 0,
              transform: isVisible('testimonios') ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: `${0.12 * i}s`,
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(16, 185, 129, 0.2)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              }}
            >
              {/* Stars */}
              <div style={{ marginBottom: '1rem', display: 'flex', gap: '2px' }}>
                {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#fbbf24', fontSize: '0.9rem' }}>★</span>)}
              </div>
              <p style={{
                color: '#a1a1aa', lineHeight: 1.7, fontSize: '0.95rem',
                fontStyle: 'italic', marginBottom: '1.5rem',
              }}>
                {t.text}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '0.75rem',
                }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#888' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="precios" data-reveal style={{
        padding: 'clamp(80px, 12vw, 160px) 2rem',
        position: 'relative', zIndex: 1,
        maxWidth: 1100, margin: '0 auto',
        opacity: isVisible('precios') ? 1 : 0,
        transform: isVisible('precios') ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.3em',
            textTransform: 'uppercase', color: '#818cf8', marginBottom: '1rem',
          }}>
            PRECIOS
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem',
          }}>
            Simple y <span style={{
              background: 'linear-gradient(135deg, #818cf8, #c084fc)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>transparente.</span>
          </h2>
          <p style={{ color: '#888', fontSize: '1.05rem', maxWidth: 480, margin: '0 auto' }}>
            Comienza gratis. Paga solo si quieres la experiencia completa y permanente.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem', alignItems: 'start',
        }}>
          {/* Free Tier */}
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 28, padding: '3rem 2.5rem',
            transition: 'all 0.4s',
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
              (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.15)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)';
            }}
          >
            <div style={{
              fontSize: '0.8rem', fontWeight: 600, color: '#888',
              textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem',
            }}>Básico</div>
            <div style={{
              fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-0.04em',
              display: 'flex', alignItems: 'baseline', gap: '0.3rem', marginBottom: '0.5rem',
            }}>
              <span style={{ color: '#c084fc', fontSize: '1.2rem', verticalAlign: 'top' }}>$</span>
              0
              <span style={{ fontSize: '1rem', color: '#555', fontWeight: 400 }}>/ gratis</span>
            </div>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: 1.5 }}>
              Perfecto para probar la plataforma y crear tu primera sorpresa.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem' }}>
              {[
                { text: 'Todas las plantillas disponibles', active: true },
                { text: 'Colores, texto y fuentes personalizables', active: true },
                { text: 'Exportar como archivo HTML', active: true },
                { text: 'El link caduca en 7 días', active: false },
                { text: 'Marca de agua visible', active: false },
              ].map((f, i) => (
                <li key={i} style={{
                  padding: '0.6rem 0', fontSize: '0.9rem',
                  color: f.active ? '#a1a1aa' : '#555',
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                }}>
                  <span style={{ color: f.active ? '#c084fc' : '#444', fontSize: '0.7rem' }}>
                    {f.active ? '✦' : '○'}
                  </span>
                  {f.text}
                </li>
              ))}
            </ul>
            <Link href="/crear/nebula_glass" style={{
              display: 'block', textAlign: 'center',
              padding: '1rem', borderRadius: 14,
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#fff', fontWeight: 600, textDecoration: 'none',
              fontSize: '0.9rem', letterSpacing: '0.03em',
              transition: 'all 0.3s',
            }}>
              Probar Gratis
            </Link>
          </div>

          {/* VIP Tier */}
          <div style={{
            background: 'linear-gradient(160deg, rgba(124, 58, 237, 0.08) 0%, rgba(5,5,5,0.95) 40%)',
            border: '1px solid rgba(192, 132, 252, 0.3)',
            borderRadius: 28, padding: '3rem 2.5rem',
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 20px 60px -15px rgba(124, 58, 237, 0.2)',
            transition: 'all 0.4s',
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 25px 70px -15px rgba(124, 58, 237, 0.3)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 60px -15px rgba(124, 58, 237, 0.2)';
            }}
          >
            {/* Popular badge */}
            <div style={{
              position: 'absolute', top: '1.5rem', right: '-1px',
              background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
              padding: '0.35rem 1.2rem', borderRadius: '8px 0 0 8px',
              fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em',
            }}>
              MÁS ELEGIDO ⚡
            </div>

            <div style={{
              fontSize: '0.8rem', fontWeight: 600, color: '#c084fc',
              textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem',
            }}>Premium VIP</div>
            <div style={{
              fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-0.04em',
              display: 'flex', alignItems: 'baseline', gap: '0.3rem', marginBottom: '0.5rem',
            }}>
              <span style={{ color: '#c084fc', fontSize: '1.2rem', verticalAlign: 'top' }}>$</span>
              3
              <span style={{ fontSize: '1rem', color: '#888', fontWeight: 400 }}>USD / único</span>
            </div>
            <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: 1.5 }}>
              La experiencia completa, sin límites, para siempre. El regalo perfecto.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem' }}>
              {[
                '💖 Hosting permanente (nunca caduca)',
                '🎧 Sube tu propia música y fotos',
                '✨ Efectos 3D, parallax y cinematográficos',
                '🎊 Lluvia de corazones, confeti y destellos',
                '🚫 Sin marca de agua',
                '⚡ Soporte prioritario por WhatsApp',
              ].map((f, i) => (
                <li key={i} style={{
                  padding: '0.55rem 0', fontSize: '0.9rem',
                  color: '#e4e4e7', display: 'flex', gap: '0.5rem',
                }}>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/crear/nebula_glass" style={{
              display: 'block', textAlign: 'center',
              padding: '1.1rem', borderRadius: 14,
              background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
              color: '#fff', fontWeight: 700, textDecoration: 'none',
              fontSize: '0.95rem', letterSpacing: '0.03em',
              boxShadow: '0 8px 25px rgba(124, 58, 237, 0.35)',
              transition: 'all 0.3s',
            }}>
              Crear Link VIP →
            </Link>
          </div>
        </div>

        <div style={{
          textAlign: 'center', marginTop: '3rem',
          color: '#666', fontSize: '0.9rem',
        }}>
          Pagos seguros mediante <strong style={{ color: '#e4e4e7' }}>Binance Pay</strong>, <strong style={{ color: '#e4e4e7' }}>Zinli</strong> y <strong style={{ color: '#e4e4e7' }}>PagoMóvil</strong>. Confirmación vía WhatsApp.
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section data-reveal id="cta-final" style={{
        padding: 'clamp(80px, 12vw, 160px) 2rem',
        textAlign: 'center', position: 'relative', zIndex: 1,
        opacity: isVisible('cta-final') ? 1 : 0,
        transform: isVisible('cta-final') ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
      }}>
        {/* Glow */}
        <div style={{
          position: 'absolute', width: '40vw', height: '40vw',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, transparent 70%)',
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          filter: 'blur(100px)', pointerEvents: 'none',
        }} />

        <h2 style={{
          fontSize: 'clamp(2.2rem, 5vw, 4rem)',
          fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1,
          maxWidth: 700, margin: '0 auto 1.5rem',
          position: 'relative',
        }}>
          ¿Listo para crear algo <span style={{
            background: 'linear-gradient(135deg, #c084fc, #f472b6, #818cf8)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>extraordinario</span>?
        </h2>
        <p style={{
          color: '#888', fontSize: '1.1rem', maxWidth: 450,
          margin: '0 auto 3rem', lineHeight: 1.6, position: 'relative',
        }}>
          Miles de personas ya sorprendieron a alguien especial. Es tu turno.
        </p>
        <Link href="/crear/nebula_glass" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
          background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
          color: '#fff', padding: '1.2rem 3rem', borderRadius: '50px',
          fontWeight: 700, fontSize: '1.1rem', textDecoration: 'none',
          boxShadow: '0 10px 40px -10px rgba(124, 58, 237, 0.5)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          position: 'relative',
        }}>
          Crear Mi Sorpresa ✨
        </Link>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '4rem 2rem 2rem',
        position: 'relative', zIndex: 1,
        overflow: 'hidden',
      }}>
        {/* Big watermark text */}
        <div style={{
          fontSize: 'clamp(4rem, 15vw, 12rem)',
          fontWeight: 900, letterSpacing: '-0.05em',
          textTransform: 'uppercase', textAlign: 'center',
          lineHeight: 0.9,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          userSelect: 'none', marginBottom: '3rem',
        }}>
          LINK<br/>SURPRISE
        </div>

        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          flexWrap: 'wrap', gap: '2rem', paddingBottom: '2rem',
        }}>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <a href="#como-funciona" style={{ color: '#555', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'color 0.3s' }}>
              Proceso
            </a>
            <a href="#plantillas" style={{ color: '#555', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'color 0.3s' }}>
              Plantillas
            </a>
            <a href="#precios" style={{ color: '#555', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'color 0.3s' }}>
              Precios
            </a>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.15)' }}>
            © 2026 LinkSurprise. Dedicatorias y Experiencias Digitales.
          </div>
        </div>
      </footer>

      {/* ═══ CSS ANIMATIONS ═══ */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes floatParticle {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
          25% { transform: translate(20px, -30px) scale(1.3); opacity: 0.7; }
          50% { transform: translate(-15px, -60px) scale(0.8); opacity: 0.3; }
          75% { transform: translate(25px, -20px) scale(1.1); opacity: 0.6; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        @keyframes scrollDot {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Smooth scroll */
        html { scroll-behavior: smooth; }

        /* Hide scrollbar on mobile for quick actions */
        .quick-scroll::-webkit-scrollbar { display: none; }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          nav > div > div:first-child + div > a:not(:last-child) {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
