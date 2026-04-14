import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PaymentModal({ 
  isOpen, 
  onClose, 
  projectId, 
  projectUrl,
  settings 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  projectId: string,
  projectUrl: string,
  settings: any
}) {
  if (!isOpen) return null;

  const defaultWhatsapp = '584120000000'; // Fallback
  const whatsappNumber = settings?.whatsappNumber || defaultWhatsapp;
  const price = settings?.priceInfo || '$3 USD';

  const message = `🚀 ¡Hola! Quiero activar mi sorpresa VIP.\n\n*Código de Proyecto:* ${projectId}\n*Enlace Generado:* ${projectUrl}\n\nTe envío mi comprobante de pago por el monto único de ${price} para activar mi link de por vida, sin marcas de agua y con todo incluido. ✨`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
        background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 9999, padding: '1rem',
        animation: 'fadeIn 0.4s ease-out'
      }}>
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          style={{
            background: 'linear-gradient(180deg, #0f0b14 0%, #050505 100%)', 
            border: '1px solid rgba(192, 132, 252, 0.2)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.8), inset 0 2px 20px rgba(192,132,252,0.1)',
            borderRadius: 32, padding: '2.5rem', maxWidth: 480, width: '100%',
            textAlign: 'center', color: '#fff', position: 'relative', overflow: 'hidden'
          }}
        >
          {/* Subtle light effect top */}
          <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: 250, height: 200, background: 'radial-gradient(ellipse at center, rgba(192,132,252,0.2) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

          <button 
            onClick={onClose}
            style={{ position: 'absolute', top: 15, right: 20, background: 'rgba(255,255,255,0.05)', border: 'none', color: '#888', fontSize: '1.2rem', cursor: 'pointer', zIndex: 10, width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          >
            ✕
          </button>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ rotate: -10, scale: 0.8 }} animate={{ rotate: 0, scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} style={{ fontSize: '4rem', marginBottom: '0.5rem', filter: 'drop-shadow(0 0 20px rgba(192,132,252,0.5))' }}>
              💎
            </motion.div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', background: 'linear-gradient(to right, #c084fc, #f472b6, #fb7185)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.02em' }}>
              Inmortaliza tu Sorpresa
            </h2>
            <p style={{ color: '#a1a1aa', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.6 }}>
              Has añadido la magia. Ahora, asegura tu enlace de por vida y brinda una experiencia inolvidable por solo <strong style={{ color: '#f472b6', fontSize: '1.1rem' }}>{price}</strong>.
            </p>

            {/* Benefits List (High Conversion UX) */}
            <div style={{ textAlign: 'left', marginBottom: '2rem', background: 'rgba(255,255,255,0.02)', padding: '1.2rem', borderRadius: 20, border: '1px solid rgba(255,255,255,0.05)' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', fontSize: '0.9rem', color: '#e2e8f0' }}><span style={{ color: '#10b981', fontSize: '1.2rem' }}>✅</span> <strong>Hosting Vitalicio:</strong> Tu link vivirá para siempre.</li>
                <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', fontSize: '0.9rem', color: '#e2e8f0' }}><span style={{ color: '#10b981', fontSize: '1.2rem' }}>✅</span> <strong>Cero Anuncios:</strong> Sin marcas de agua.</li>
                <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', fontSize: '0.9rem', color: '#e2e8f0' }}><span style={{ color: '#10b981', fontSize: '1.2rem' }}>✅</span> <strong>Privacidad Ultra:</strong> Archivos e imágenes seguras.</li>
                <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', fontSize: '0.9rem', color: '#e2e8f0' }}><span style={{ color: '#10b981', fontSize: '1.2rem' }}>✅</span> <strong>Animaciones Premium:</strong> Exclusivos efectos HD.</li>
              </ul>
            </div>

            <div style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.05), rgba(16,185,129,0.01))', padding: '1.5rem', borderRadius: 20, marginBottom: '2rem', textAlign: 'center', border: '1px solid rgba(16,185,129,0.15)' }}>
              <h3 style={{ fontSize: '0.85rem', marginBottom: '1.5rem', color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.1em' }}>MÉTODOS DE PAGO AUTOMÁTICO</h3>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                {settings?.binancePayId && (
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.8rem', borderRadius: 12, border: '1px solid rgba(245, 158, 11, 0.2)', width: '45%', minWidth: '140px' }}>
                    <span style={{ fontSize: '0.7rem', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.2rem' }}>🔶 Binance Pay</span>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>{settings.binancePayId}</div>
                  </div>
                )}
                
                {settings?.zinliEmail && (
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.8rem', borderRadius: 12, border: '1px solid rgba(192, 132, 252, 0.2)', width: '45%', minWidth: '140px' }}>
                    <span style={{ fontSize: '0.7rem', color: '#c084fc', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.2rem' }}>🟣 Zinli</span>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>{settings.zinliEmail}</div>
                  </div>
                )}
              </div>

              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '0.6rem', borderRadius: 12 }}>
                <span style={{ fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Código de Reserva (Poner en concepto de pago)</span>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#f472b6', userSelect: 'all' }}>{projectId}</div>
              </div>
            </div>

            <a 
              href={whatsappUrl} target="_blank" rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                width: '100%', padding: '1.2rem', borderRadius: 16,
                background: 'linear-gradient(135deg, #25D366, #128C7E)', color: '#fff', fontWeight: 800, textDecoration: 'none',
                fontSize: '1.1rem', marginBottom: '1.5rem', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 10px 25px rgba(37, 211, 102, 0.3)', border: '1px solid rgba(255,255,255,0.2)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 15px 35px rgba(37, 211, 102, 0.4)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(37, 211, 102, 0.3)'; }}
            >
              Confirmar Acceso VIP por WhatsApp <span style={{fontSize: '1.3rem'}}>📲</span>
            </a>

            <button 
              onClick={onClose}
              style={{ background: 'none', border: 'none', color: '#666', textDecoration: 'none', cursor: 'pointer', fontSize: '0.85rem', transition: 'color 0.2s', borderBottom: '1px dashed #444', paddingBottom: 2 }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
            >
              Quizás luego. Continuar con la versión gratuita con límites.
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
