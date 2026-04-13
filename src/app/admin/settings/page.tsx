'use client';

import { useState, useEffect } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    whatsappNumber: '',
    binancePayId: '',
    zinliEmail: '',
    priceInfo: '$3 USD',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      const data = await res.json();
      if (data.success && data.data) {
        setSettings({
          whatsappNumber: data.data.whatsappNumber || '',
          binancePayId: data.data.binancePayId || '',
          zinliEmail: data.data.zinliEmail || '',
          priceInfo: data.data.priceInfo || '$3 USD',
        });
      }
    } catch (e) {
      console.error('Failed to load settings');
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (data.success) {
        alert('Configuraciones guardadas correctamente.');
      }
    } catch (e) {
      alert('Error guardando configuraciones.');
    }
    setSaving(false);
  };

  if (loading) return <div style={{ padding: '2rem' }}>Cargando...</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: 800 }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Ajustes de Pago</h1>
      <p style={{ color: '#888', marginBottom: '2rem' }}>Define los datos a donde tus clientes enviarán los reportes y pagos.</p>
      
      <form onSubmit={handleSave} style={{ background: '#0a0a0a', padding: '2rem', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Número de WhatsApp</label>
          <p style={{ fontSize: '0.75rem', color: '#555', marginBottom: '0.5rem' }}>Incluye el código de país sin el signo más (ej: 521234567890)</p>
          <input 
            type="text" 
            value={settings.whatsappNumber}
            onChange={(e) => setSettings({...settings, whatsappNumber: e.target.value})}
            style={{ width: '100%', padding: '1rem', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none' }}
            placeholder="Ej: 584120000000"
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Precio Oficial / Promo</label>
          <input 
            type="text" 
            value={settings.priceInfo}
            onChange={(e) => setSettings({...settings, priceInfo: e.target.value})}
            style={{ width: '100%', padding: '1rem', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none' }}
            placeholder="Ej: $3 USD"
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>ID de Binance Pay (Opcional)</label>
          <input 
            type="text" 
            value={settings.binancePayId}
            onChange={(e) => setSettings({...settings, binancePayId: e.target.value})}
            style={{ width: '100%', padding: '1rem', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none' }}
            placeholder="Tu ID numérico de Binance"
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Correo de Zinli (Opcional)</label>
          <input 
            type="email" 
            value={settings.zinliEmail}
            onChange={(e) => setSettings({...settings, zinliEmail: e.target.value})}
            style={{ width: '100%', padding: '1rem', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none' }}
            placeholder="correo@ejemplo.com"
          />
        </div>

        <button 
          type="submit"
          disabled={saving}
          style={{ padding: '1rem 2rem', borderRadius: 12, background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: '#fff', border: 'none', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer' }}
        >
          {saving ? 'Guardando...' : 'Guardar Configuraciones'}
        </button>

      </form>
    </div>
  );
}
