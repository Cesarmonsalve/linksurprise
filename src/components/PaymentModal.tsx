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

  const message = `Hola! Acabo de crear una dedicatoria premium.\n*Código:* ${projectId}\n*Enlace:* ${projectUrl}\n\nAquí está el comprobante de mi pago de ${price} para activar el VIP de por vida.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
        background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 9999, padding: '1rem'
      }}>
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          style={{
            background: '#0a0a0a', border: '1px solid rgba(192, 132, 252, 0.3)',
            borderRadius: 24, padding: '2rem', maxWidth: 500, width: '100%',
            textAlign: 'center', color: '#fff', position: 'relative'
          }}
        >
          <button 
            onClick={onClose}
            style={{ position: 'absolute', top: 15, right: 15, background: 'none', border: 'none', color: '#888', fontSize: '1.5rem', cursor: 'pointer' }}
          >
            ×
          </button>

          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💎</div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem', background: 'linear-gradient(135deg, #c084fc, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Activa tu Link Premium
          </h2>
          <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: 1.5 }}>
            Has creado tu dedicatoria. Para quitar la marca de agua y alojar tus fotos y música para siempre, realiza un pago único de <strong>{price}</strong>.
          </p>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: 16, marginBottom: '2rem', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#c084fc' }}>Métodos de Pago</h3>
            
            {settings?.binancePayId && (
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>🔶 Binance Pay ID</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>{settings.binancePayId}</div>
              </div>
            )}
            
            {settings?.zinliEmail && (
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>🟣 Zinli</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>{settings.zinliEmail}</div>
              </div>
            )}

            <div>
              <span style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>💳 Código de Ref. (Poner en concepto)</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#f472b6' }}>{projectId}</div>
            </div>
          </div>

          <a 
            href={whatsappUrl} target="_blank" rel="noreferrer"
            style={{
              display: 'block', width: '100%', padding: '1rem', borderRadius: 12,
              background: '#25D366', color: '#000', fontWeight: 700, textDecoration: 'none',
              fontSize: '1.1rem', marginBottom: '1rem', transition: 'transform 0.2s'
            }}
          >
            Enviar Comprobante por WhatsApp 📱
          </a>

          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#888', textDecoration: 'underline', cursor: 'pointer' }}
          >
            Mejor lo dejo en la versión gratis (caduca en 7 días)
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
