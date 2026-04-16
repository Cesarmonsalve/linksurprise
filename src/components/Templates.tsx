'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TEMPLATES, PILLARS } from '@/lib/templates';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Group templates by pillar
const templatesByPillar = PILLARS.map((pillar) => ({
  ...pillar,
  templates: Object.values(TEMPLATES).filter((t) => t.pillar === pillar.id),
}));

export default function Templates() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on scroll with stagger
      const cards = document.querySelectorAll('.template-card');
      
      gsap.fromTo(
        cards,
        { 
          opacity: 0, 
          y: 100, 
          scale: 0.9,
          rotationY: 15,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 1,
          stagger: 0.08,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Add parallax effect to VIP cards
      const vipCards = document.querySelectorAll('.template-card.vip');
      vipCards.forEach((card) => {
        gsap.to(card, {
          y: -20,
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="templates-section" id="templates" ref={sectionRef}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
        <span className="section-label">✦ 20 Estilos Premium</span>
        <h2 className="section-heading">
          Elige un estilo visual,{' '}
          <span className="highlight">hazla única</span>
        </h2>
        <p className="section-desc" style={{ marginTop: '20px' }}>
          Desde diseños minimalistas hasta experiencias cinematográficas con efectos avanzados
        </p>
      </div>

      {templatesByPillar.map((pillar) => (
        <div key={pillar.id} style={{ marginBottom: '4rem', marginTop: '3rem' }}>
          <div
            style={{
              maxWidth: 1200,
              margin: '0 auto 2rem',
              padding: '0 20px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '8px',
              }}
            >
              <span style={{ fontSize: '1.8rem', filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))' }}>{pillar.emoji}</span>
              <h3
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  color: '#fff',
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                }}
              >
                {pillar.label}
              </h3>
            </div>
            <p
              style={{
                fontSize: '0.95rem',
                color: 'var(--text-muted)',
                fontWeight: 400,
                maxWidth: '600px',
              }}
            >
              {pillar.description}
            </p>
          </div>

          <div className="templates-grid">
            {pillar.templates.map((t, index) => {
              const isVip = ['nebula_glass', 'quantum_rift', 'film_noir', 'ethereal_dream', 'watercolor_bliss', 'neon_nights', 'pixel_pop', 'galaxy_sweep'].includes(t.id);
              
              return (
                <div
                  className={`template-card ${isVip ? 'vip' : ''}`}
                  key={t.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <div
                    className="template-card-image"
                    style={{
                      background: isVip 
                        ? `${t.gradient}, url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                        : t.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '5rem',
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    <span style={{ 
                      filter: isVip ? 'drop-shadow(0 0 30px rgba(255,255,255,0.5))' : 'none',
                      transform: 'scale(1)',
                      transition: 'transform 0.5s',
                    }}>{t.emoji}</span>
                  </div>
                  <div className="template-card-overlay">
                    <span className="template-card-tag">{t.pillarLabel}</span>
                    <h3 className="template-card-title">{t.name}</h3>
                    <p className="template-card-desc">{t.defaultMessage.substring(0, 90)}...</p>
                    <div className="template-card-price">
                      <span className="from">{isVip ? 'Premium' : 'Desde'}</span>
                      <span className="price">{isVip ? '$9' : '$3'}</span>
                    </div>
                  </div>
                  {isVip && (
                    <div style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      right: '0',
                      bottom: '0',
                      background: 'radial-gradient(circle at 50% 0%, rgba(255,215,0,0.15), transparent 70%)',
                      pointerEvents: 'none',
                      opacity: 0,
                      transition: 'opacity 0.3s',
                    }} className="vip-glow" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
