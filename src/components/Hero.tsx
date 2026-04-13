'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.8 });

    // Stagger reveal lines
    tl.to([line1Ref.current, line2Ref.current, line3Ref.current], {
      y: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out',
    })
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.4'
      )
      .to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.5'
      );

    return () => {
      tl.kill();
    };
  }, []);

  // Magnetic button effect
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  return (
    <section className="hero" ref={heroRef}>
      {/* Ambient glow orbs */}
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />
      <div className="hero-glow hero-glow-3" />

      <h1 className="hero-title">
        <span className="line">
          <span className="line-inner" ref={line1Ref}>
            Sorpresas
          </span>
        </span>
        <span className="line">
          <span className="line-inner" ref={line2Ref} style={{ color: '#c084fc' }}>
            Digitales
          </span>
        </span>
        <span className="line">
          <span className="line-inner" ref={line3Ref}>
            Únicas
          </span>
        </span>
      </h1>

      <p className="hero-subtitle" ref={subtitleRef}>
        Crea páginas interactivas llenas de emoción. Cartas de amor, sorpresas de cumpleaños,
        mensajes secretos — todo en un link que puedes compartir por WhatsApp.
      </p>

      <div className="hero-cta-wrapper" ref={ctaRef}>
        <a
          href="/crear"
          className="magnetic-btn"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <span>Crear mi sorpresa</span>
          <span className="arrow">→</span>
        </a>
      </div>
    </section>
  );
}
