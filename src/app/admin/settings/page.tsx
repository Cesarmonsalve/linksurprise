'use client';

import { useState, useEffect } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    whatsappNumber: '',
    binancePayId: '',
    zinliEmail: '',
    priceInfo: '$3 USD',
    premiumTemplateIds: [] as string[],
    groqApiKey: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [templates, setTemplates] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([fetchSettings(), fetchTemplates()]).then(() => setLoading(false));
  }, []);

  const fetchTemplates = async () => {
    try {
      const res = await fetch('/api/templates');
      const data = await res.json();
      if (data.success && data.data) {
        setTemplates(Object.values(data.data));
      }
    } catch (e) {
      console.error('Failed to load templates');
    }
  };

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
          premiumTemplateIds: data.data.premiumTemplateIds || [],
          groqApiKey: data.data.groqApiKey || '',
        });
      }
    } catch (e) {
      console.error('Failed to load settings');
    }
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

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Groq API Key (Laboratorio IA)</label>
          <input 
            type="password" 
            value={settings.groqApiKey}
            onChange={(e) => setSettings({...settings, groqApiKey: e.target.value})}
            style={{ width: '100%', padding: '1rem', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid #10b981', color: '#fff', outline: 'none' }}
            placeholder="gsk_xxxxxxxx..."
          />
          <p style={{ fontSize: '0.75rem', color: '#10b981', margin: '0.5rem 0' }}>Obligatorio para usar el Laboratorio de Inteligencia Artificial (Llama-3).</p>
        </div>

        <button 
          type="submit"
          disabled={saving}
          style={{ padding: '1rem 2rem', borderRadius: 12, background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: '#fff', border: 'none', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer' }}
        >
          {saving ? 'Guardando...' : 'Guardar Configuraciones'}
        </button>

      </form>

      <div style={{ background: '#0a0a0a', padding: '2rem', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>🔐 Gestión Freemium (Muros de Pago)</h2>
        <p style={{ color: '#888', marginBottom: '1.5rem' }}>Selecciona cuáles plantillas exigen pago obligatorio. Las que marques como Premium tendrán un candado de descarga y cobrarán para compartirse.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
          {templates.map(t => {
            const isPremium = settings.premiumTemplateIds.includes(t.id);
            return (
              <div key={t.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.02)', border: isPremium ? '1px solid rgba(192,132,252,0.4)' : '1px solid rgba(255,255,255,0.05)', borderRadius: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>{t.emoji}</span>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: isPremium ? '#c084fc' : '#e2e8f0' }}>{t.name}</div>
                    <div style={{ fontSize: '0.7rem', color: '#888' }}>{t.isCustom ? 'Personalizada' : t.pillarLabel}</div>
                  </div>
                </div>
                
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <div style={{
                    width: 44, height: 24, background: isPremium ? '#7c3aed' : 'rgba(255,255,255,0.1)',
                    borderRadius: 20, position: 'relative', transition: 'all 0.3s'
                  }}>
                    <div style={{
                      width: 18, height: 18, background: '#fff', borderRadius: '50%',
                      position: 'absolute', top: 3, left: isPremium ? 22 : 3, transition: 'all 0.3s'
                    }} />
                  </div>
                  <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', fontWeight: 600, color: isPremium ? '#c084fc' : '#888' }}>
                    {isPremium ? 'VIP 👑' : 'Gratis 🎁'}
                  </span>
                  <input 
                    type="checkbox" 
                    checked={isPremium}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSettings({...settings, premiumTemplateIds: [...settings.premiumTemplateIds, t.id]});
                      } else {
                        setSettings({...settings, premiumTemplateIds: settings.premiumTemplateIds.filter(id => id !== t.id)});
                      }
                    }}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
