'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const testimonials = [
  {
    text: '"Le mandé la carta de amor a mi novia por WhatsApp y se puso a llorar. La mejor inversión de $3 en mi vida."',
    name: 'Carlos M.',
    role: 'Bogotá, Colombia',
    initials: 'CM',
  },
  {
    text: '"Mi mamá no paraba de ver la sorpresa de cumpleaños. La música y las fotos quedaron perfectas. ¡Gracias!"',
    name: 'Andrea L.',
    role: 'Caracas, Venezuela',
    initials: 'AL',
  },
  {
    text: '"Usé la del mensaje secreto con contraseña para pedirle que sea mi novia. Dijo que sí. 10/10."',
    name: 'Luis R.',
    role: 'Lima, Perú',
    initials: 'LR',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.testimonial-card');
            gsap.fromTo(
              cards,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.15,
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
    <section className="testimonials-section" ref={sectionRef}>
      <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        <span className="section-label">✦ Testimonios</span>
        <h2 className="section-heading" style={{ margin: '0 auto 4rem' }}>
          Miles ya <span className="highlight">emocionaron</span> a alguien
        </h2>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <div className="testimonial-card" key={i} style={{ opacity: 0 }}>
            <p className="testimonial-text">{t.text}</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">{t.initials}</div>
              <div>
                <div className="testimonial-name">{t.name}</div>
                <div className="testimonial-role">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
