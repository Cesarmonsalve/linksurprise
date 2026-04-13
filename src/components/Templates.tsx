'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TEMPLATES, PILLARS } from '@/lib/templates';

// Group templates by pillar
const templatesByPillar = PILLARS.map((pillar) => ({
  ...pillar,
  templates: Object.values(TEMPLATES).filter((t) => t.pillar === pillar.id),
}));

export default function Templates() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.template-card');
            gsap.fromTo(
              cards,
              { opacity: 0, y: 80, scale: 0.95 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.9,
                stagger: 0.08,
                ease: 'power3.out',
              }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="templates-section" id="templates" ref={sectionRef}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <span className="section-label">✦ 20 Estilos Premium</span>
        <h2 className="section-heading">
          Elige un estilo visual,{' '}
          <span className="highlight">hazla única</span>
        </h2>
      </div>

      {templatesByPillar.map((pillar) => (
        <div key={pillar.id} style={{ marginBottom: '3rem' }}>
          <div
            style={{
              maxWidth: 1200,
              margin: '0 auto 1.5rem',
              padding: '0 1rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.3rem',
              }}
            >
              <span style={{ fontSize: '1.3rem' }}>{pillar.emoji}</span>
              <h3
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: '#fff',
                  letterSpacing: '-0.02em',
                }}
              >
                {pillar.label}
              </h3>
            </div>
            <p
              style={{
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.5)',
                fontWeight: 300,
              }}
            >
              {pillar.description}
            </p>
          </div>

          <div className="templates-grid">
            {pillar.templates.map((t) => (
              <div
                className="template-card"
                key={t.id}
                style={{ opacity: 0 }}
              >
                <div
                  className="template-card-image"
                  style={{
                    background: t.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4rem',
                  }}
                >
                  {t.emoji}
                </div>
                <div className="template-card-overlay">
                  <span className="template-card-tag">{t.pillarLabel}</span>
                  <h3 className="template-card-title">{t.name}</h3>
                  <p className="template-card-desc">{t.defaultMessage.substring(0, 80)}...</p>
                  <div className="template-card-price">
                    <span className="from">Desde</span>
                    <span className="price">$3</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
