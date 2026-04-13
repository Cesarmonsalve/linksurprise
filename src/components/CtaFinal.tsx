'use client';

import { gsap } from 'gsap';

export default function CtaFinal() {
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
  };

  return (
    <section className="cta-section">
      <div className="cta-glow" />
      <span className="section-label">✦ ¿Listo?</span>
      <h2 className="section-heading" style={{ textAlign: 'center', margin: '0 auto 1.5rem' }}>
        Haz que alguien <span className="highlight">sonría hoy</span>
      </h2>
      <p
        style={{
          fontSize: '1rem',
          color: '#888',
          maxWidth: 420,
          margin: '0 auto 2.5rem',
          lineHeight: 1.7,
          textAlign: 'center',
        }}
      >
        Crea tu primera sorpresa en menos de 5 minutos. Sin registrarte. Sin complicaciones.
      </p>
      <a
        href="#templates"
        className="magnetic-btn"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ margin: '0 auto', display: 'inline-flex' }}
      >
        <span>Empezar ahora</span>
        <span className="arrow">→</span>
      </a>
    </section>
  );
}
