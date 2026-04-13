'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{ minHeight: '100vh', background: '#050510' }} />;

  return (
    <div style={{ backgroundColor: '#050510', color: '#f0eeff', minHeight: '100vh', fontFamily: 'Inter, sans-serif', overflowX: 'hidden' }}>
      
      {/* 🔮 Background Effects */}
      <div style={{ position: 'fixed', top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(80px)', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '-20%', right: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(244, 114, 182, 0.1) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(100px)', zIndex: 0 }} />

      {/* 🚀 Navbar */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50, background: 'rgba(5, 5, 16, 0.7)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.03em', background: 'linear-gradient(135deg, #fff, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            LinkSurprise✨
          </div>
          <Link href="/crear/nebula_glass" style={{ background: '#fff', color: '#000', padding: '0.5rem 1.5rem', borderRadius: '40px', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', transition: 'transform 0.2s', boxShadow: '0 4px 14px rgba(255,255,255,0.1)' }}>
            Crear Sorpresa
          </Link>
        </div>
      </nav>

      {/* 🌟 Hero Section */}
      <main style={{ position: 'relative', zIndex: 1, paddingTop: '160px', paddingBottom: '80px', textAlign: 'center', maxWidth: 900, margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <div style={{ display: 'inline-block', border: '1px solid rgba(192, 132, 252, 0.3)', padding: '0.4rem 1rem', borderRadius: '40px', fontSize: '0.8rem', fontWeight: 600, color: '#c084fc', marginBottom: '2rem', background: 'rgba(192, 132, 252, 0.05)' }}>
            Regalos digitales mágicos
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
            Sorprende a esa persona especial con una <span style={{ color: '#f472b6' }}>experiencia interactiva.</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#a1a1aa', maxWidth: 600, margin: '0 auto 3rem', lineHeight: 1.6 }}>
            Envíales un enlance mágico por WhatsApp con tu dedicatoria, música, fotos y efectos de entrada espectaculares. El regalo perfecto a distancia.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/crear/nebula_glass" style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)', color: '#fff', padding: '1rem 2.5rem', borderRadius: '40px', fontWeight: 700, fontSize: '1.1rem', textDecoration: 'none', border: 'none', cursor: 'pointer', transition: 'transform 0.2s', boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.5)' }}>
              Empezar mi sorpresa →
            </Link>
          </div>
        </motion.div>
      </main>

      {/* 🛠️ How it Works */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 2rem', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>¿Cómo funciona?</h2>
            <p style={{ color: '#a1a1aa', fontSize: '1.1rem' }}>Es tan sencillo como llenar un formulario, nosotros hacemos la magia.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { step: '1', title: 'Explora Plantillas', desc: 'Contamos con decenas de diseños profesionales: minimalistas, románticos, cinematográficos y 3D.' },
              { step: '2', title: 'Personaliza a tu gusto', desc: 'Sube tu canción en MP3, añade tus propias fotos y escribe la dedicatoria perfecta.' },
              { step: '3', title: 'Comparte el Link', desc: 'Te entregamos un enlace que puedes copiar y enviar por WhatsApp. Se adapta a cualquier celular.' }
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ background: '#0a0a14', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '2.5rem' }}>
                <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'rgba(124, 58, 237, 0.1)', color: '#c084fc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>
                  {s.step}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>{s.title}</h3>
                <p style={{ color: '#888', lineHeight: 1.6 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 💰 Pricing */}
      <section style={{ position: 'relative', zIndex: 1, padding: '100px 2rem 120px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Precios Justos y Claros</h2>
            <p style={{ color: '#a1a1aa', fontSize: '1.1rem' }}>Usa nuestra plataforma 100% gratis, o vuélvete VIP si quieres almacenamiento de por vida.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            {/* Free */}
            <div style={{ background: '#0a0a14', border: '1px solid rgba(255,255,255,0.1)', padding: '3rem 2.5rem', borderRadius: '32px' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Básico</div>
              <div style={{ fontSize: '3rem', fontWeight: 800, display: 'flex', alignItems: 'baseline', gap: '0.2rem', marginBottom: '1.5rem' }}>
                $0 <span style={{ fontSize: '1rem', color: '#555', fontWeight: 400 }}>/ gratis</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', color: '#a1a1aa', fontSize: '0.95rem' }}>
                <li style={{ marginBottom: '1rem', display: 'flex', gap: '8px' }}>✅ <span>Todas las plantillas disponibles</span></li>
                <li style={{ marginBottom: '1rem', display: 'flex', gap: '8px' }}>✅ <span>Modifica textos y colores</span></li>
                <li style={{ marginBottom: '1rem', display: 'flex', gap: '8px' }}>✅ <span>Exporta como archivo HTML</span></li>
                <li style={{ marginBottom: '1rem', display: 'flex', gap: '8px', color: '#666' }}>❌ <span>Link caduca a los 7 días</span></li>
                <li style={{ marginBottom: '1rem', display: 'flex', gap: '8px', color: '#666' }}>❌ <span>Marca de agua en su interior</span></li>
              </ul>
              <Link href="/crear/nebula_glass" style={{ display: 'block', textAlign: 'center', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '1rem', borderRadius: '16px', fontWeight: 600, textDecoration: 'none' }}>
                Probar Gratis
              </Link>
            </div>

            {/* VIP */}
            <div style={{ background: 'linear-gradient(180deg, #110e1f, #050510)', border: '1px solid rgba(192, 132, 252, 0.4)', padding: '3.5rem 2.5rem', borderRadius: '32px', position: 'relative', boxShadow: '0 20px 40px -10px rgba(124, 58, 237, 0.2)' }}>
              <div style={{ position: 'absolute', top: '-15px', right: '30px', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', padding: '0.3rem 1rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>MÁS ELEGIDO</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#c084fc', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Premium VIP</div>
              <div style={{ fontSize: '3rem', fontWeight: 800, display: 'flex', alignItems: 'baseline', gap: '0.2rem', marginBottom: '1.5rem', color: '#fff' }}>
                $3 <span style={{ fontSize: '1rem', color: '#888', fontWeight: 400 }}>USD / pago único</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem', color: '#e4e4e7', fontSize: '0.95rem' }}>
                <li style={{ marginBottom: '1rem', display: 'flex', gap: '8px' }}>💖 <span><b>Hosting de por vida</b> (nunca caduca)</span></li>
                <li style={{ marginBottom: '1rem', display: 'flex', gap: '8px' }}>🎧 <span>Sube tu propia música y fotos</span></li>
                <li style={{ marginBottom: '1rem', display: 'flex', gap: '8px' }}>✨ <span>Efectos de entrada (LLuvia de corazones, etc)</span></li>
                <li style={{ marginBottom: '1rem', display: 'flex', gap: '8px' }}>🚫 <span><b>Sin marca de agua</b> de la plataforma</span></li>
                <li style={{ marginBottom: '1rem', display: 'flex', gap: '8px' }}>⏱️ <span>Soporte prioritario</span></li>
              </ul>
              <Link href="/crear/nebula_glass" style={{ display: 'block', textAlign: 'center', background: '#fff', color: '#000', padding: '1rem', borderRadius: '16px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 14px rgba(255,255,255,0.1)' }}>
                Crear Link VIP
              </Link>
            </div>
          </div>

          {/* Payment Methods */}
          <div style={{ textAlign: 'center', marginTop: '3rem', color: '#888', fontSize: '0.9rem' }}>
            Pagos seguros mediante: <strong style={{ color: '#e4e4e7' }}>Binance Pay</strong>, <strong style={{ color: '#e4e4e7' }}>Zinli</strong> y <strong style={{ color: '#e4e4e7' }}>PagoMóvil</strong>. Confirmación manual vía WhatsApp.
          </div>
        </div>
      </section>

      {/* 🏁 Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '3rem 2rem', textAlign: 'center', color: '#555', fontSize: '0.85rem' }}>
        <div style={{ fontWeight: 700, fontSize: '1.2rem', color: '#888', marginBottom: '1rem' }}>LinkSurprise</div>
        <p>© 2026 LinkSurprise. Dedicatorias y Experiencias Digitales.</p>
      </footer>
    </div>
  );
}
