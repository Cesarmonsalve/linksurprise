'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const plans = [
  {
    name: 'Básico',
    price: '2',
    desc: 'Perfecto para un detalle sencillo y bonito.',
    features: [
      '1 plantilla básica',
      'Personalizar texto y colores',
      'Link compartible',
      'Descarga HTML',
    ],
    featured: false,
  },
  {
    name: 'Premium',
    price: '5',
    desc: 'El más elegido. Efectos emocionales que impresionan.',
    features: [
      'Todas las plantillas',
      'Efectos: typewriter, confeti, sobre',
      'Subir música y fotos',
      'Sin marca de agua',
      'Link compartible premium',
      'Protección con contraseña',
    ],
    featured: true,
  },
  {
    name: 'Ilimitado',
    price: '10',
    desc: 'Sorpresas infinitas. Ideal para quienes aman sorprender.',
    features: [
      'Todo del plan Premium',
      'Páginas ilimitadas por 30 días',
      'Plantillas exclusivas',
      'Soporte prioritario por WhatsApp',
      'Autodestrucción programada',
      'Analíticas de visitas',
    ],
    featured: false,
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.pricing-card');
            gsap.fromTo(
              cards,
              { opacity: 0, y: 60 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
              }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="pricing-section" id="pricing" ref={sectionRef}>
      <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        <span className="section-label">✦ Precios</span>
        <h2 className="section-heading" style={{ margin: '0 auto 4rem' }}>
          Invierte poco, <span className="highlight">emociona mucho</span>
        </h2>
      </div>

      <div className="pricing-grid">
        {plans.map((plan, i) => (
          <div
            className={`pricing-card ${plan.featured ? 'featured' : ''}`}
            key={i}
            style={{ opacity: 0 }}
          >
            <span className="pricing-name">{plan.name}</span>
            <div className="pricing-price">
              <span className="currency">$</span>
              {plan.price}
              <span className="period"> USD</span>
            </div>
            <p className="pricing-desc">{plan.desc}</p>
            <ul className="pricing-features">
              {plan.features.map((f, j) => (
                <li key={j}>{f}</li>
              ))}
            </ul>
            <a href="#" className="pricing-btn">
              {plan.featured ? 'Empezar ahora' : 'Elegir plan'}
            </a>
          </div>
        ))}
      </div>

      {/* LatAm payment note */}
      <div
        style={{
          textAlign: 'center',
          marginTop: '3rem',
          maxWidth: 500,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <p style={{ fontSize: '0.85rem', color: '#888', lineHeight: 1.7 }}>
          💳 Aceptamos tarjetas internacionales, <strong style={{ color: '#c084fc' }}>Binance Pay</strong>,{' '}
          <strong style={{ color: '#c084fc' }}>Zinli</strong>,{' '}
          <strong style={{ color: '#c084fc' }}>Nequi</strong> y{' '}
          <strong style={{ color: '#c084fc' }}>PagoMóvil</strong>.
          <br />
          ¿No puedes pagar online? Escríbenos por WhatsApp y te ayudamos.
        </p>
      </div>
    </section>
  );
}
