'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const steps = [
  {
    num: '01',
    title: 'Elige una plantilla',
    desc: 'Escoge entre cartas de amor, cumpleaños, mensajes secretos y más. Todas diseñadas para emocionar.',
  },
  {
    num: '02',
    title: 'Personalízala',
    desc: 'Cambia el mensaje, los colores, sube tu música favorita y añade efectos como máquina de escribir o confeti.',
  },
  {
    num: '03',
    title: 'Comparte la magia',
    desc: 'Descarga tu archivo HTML o comparte un link único por WhatsApp, Instagram o donde quieras.',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.step-card');
            gsap.fromTo(
              cards,
              { opacity: 0, y: 60 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
              }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="how-section" ref={sectionRef}>
      <span className="section-label">✦ Cómo funciona</span>
      <h2 className="section-heading" style={{ margin: '0 auto 4rem', textAlign: 'center' }}>
        Tres pasos para crear <span className="highlight">algo inolvidable</span>
      </h2>

      <div className="steps-grid">
        {steps.map((s, i) => (
          <div className="step-card" key={i} style={{ opacity: 0 }}>
            <div className="step-number">{s.num}</div>
            <h3 className="step-title">{s.title}</h3>
            <p className="step-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
