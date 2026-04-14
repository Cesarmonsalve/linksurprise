'use client';

import { useState, useEffect } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>({
    whatsappNumber: '',
    binancePayId: '',
    zinliEmail: '',
    priceInfo: '$3.00 USD',
    premiumTemplateIds: [],
    groqApiKey: '',
    landingContent: {
      hero: {
        badge: 'LO NUEVO EN SORPRESAS',
        title1: 'Crea Experiencias',
        title2: 'Digitales',
        title3: 'Inolvidables',
        desc: 'Transforma tus mensajes en momentos mágicos con nuestras plantillas premium e interactivas.'
      },
      stats: {
        active: '+1,200',
        templates: '20+',
        satisfaction: '99%'
      }
    }
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
          ...settings,
          ...data.data,
          landingContent: {
            ...settings.landingContent,
            ...(data.data.landingContent || {})
          }
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

  if (loading) return <div style={{ padding: '2rem', color: '#888' }}>Cargando configuración...</div>;

  return (
    <div style={{ padding: '0 1rem 4rem 1rem', maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', fontFamily: 'var(--font-montserrat)' }}>AJUSTES <span className="highlight">GLOBALES</span></h1>
        <p style={{ color: 'var(--text-muted)' }}>Gestiona los precios, pagos y el contenido de toda tu plataforma.</p>
      </div>

      <form onSubmit={handleSave}>
        
        {/* MAIN SETTINGS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
           <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: 20, border: '1px solid var(--border)' }}>
             <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>💰 PAGOS Y PRECIOS</h3>
             
             <div style={{ marginBottom: '1.25rem' }}>
               <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#666', marginBottom: 8, display: 'block' }}>WHATSAPP (REDES)</label>
               <input 
                 type="text" 
                 className="editor-input"
                 value={settings.whatsappNumber}
                 onChange={(e) => setSettings({...settings, whatsappNumber: e.target.value})}
                 placeholder="Ej: 521..."
                 style={{ width: '100%', background: 'rgba(255,255,255,0.03)' }}
               />
             </div>

             <div style={{ marginBottom: '1.25rem' }}>
               <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#666', marginBottom: 8, display: 'block' }}>PRECIO PREMIUM (MOSTRAR)</label>
               <input 
                 type="text" 
                 className="editor-input"
                 value={settings.priceInfo}
                 onChange={(e) => setSettings({...settings, priceInfo: e.target.value})}
                 placeholder="Ej: $3.00 USD"
                 style={{ width: '100%', background: 'rgba(255,255,255,0.03)' }}
               />
             </div>

             <div>
               <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#666', marginBottom: 8, display: 'block' }}>GROQ API KEY (IA)</label>
               <input 
                 type="password" 
                 className="editor-input"
                 value={settings.groqApiKey}
                 onChange={(e) => setSettings({...settings, groqApiKey: e.target.value})}
                 placeholder="gsk_..."
                 style={{ width: '100%', background: 'rgba(16,185,129,0.05)', borderColor: 'rgba(16,185,129,0.2)' }}
               />
             </div>
           </div>

           <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: 20, border: '1px solid var(--border)' }}>
             <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>🚀 LANDING: HERO SECTION</h3>
             
             <div style={{ marginBottom: '1.25rem' }}>
               <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#666', marginBottom: 8, display: 'block' }}>BADGE (ETIQUETA SUPERIOR)</label>
               <input 
                 type="text" 
                 className="editor-input"
                 value={settings.landingContent.hero.badge}
                 onChange={(e) => setSettings({
                   ...settings, 
                   landingContent: { ...settings.landingContent, hero: { ...settings.landingContent.hero, badge: e.target.value } }
                 })}
                 style={{ width: '100%', background: 'rgba(255,255,255,0.03)' }}
               />
             </div>

             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: '1.25rem' }}>
                <div>
                   <label style={{ fontSize: '0.65rem', fontWeight: 700, color: '#666' }}>TÍTULO 1</label>
                   <input 
                     type="text" className="editor-input"
                     value={settings.landingContent.hero.title1}
                     onChange={(e) => setSettings({
                       ...settings, 
                       landingContent: { ...settings.landingContent, hero: { ...settings.landingContent.hero, title1: e.target.value } }
                     })}
                     style={{ width: '100%', padding: 8, fontSize: 12 }}
                   />
                </div>
                <div>
                   <label style={{ fontSize: '0.65rem', fontWeight: 700, color: '#666' }}>TÍTULO 2 (ROSA)</label>
                   <input 
                     type="text" className="editor-input"
                     value={settings.landingContent.hero.title2}
                     onChange={(e) => setSettings({
                       ...settings, 
                       landingContent: { ...settings.landingContent, hero: { ...settings.landingContent.hero, title2: e.target.value } }
                     })}
                     style={{ width: '100%', padding: 8, fontSize: 12, borderColor: 'var(--pink)' }}
                   />
                </div>
                <div>
                   <label style={{ fontSize: '0.65rem', fontWeight: 700, color: '#666' }}>TÍTULO 3</label>
                   <input 
                     type="text" className="editor-input"
                     value={settings.landingContent.hero.title3}
                     onChange={(e) => setSettings({
                       ...settings, 
                       landingContent: { ...settings.landingContent, hero: { ...settings.landingContent.hero, title3: e.target.value } }
                     })}
                     style={{ width: '100%', padding: 8, fontSize: 12 }}
                   />
                </div>
             </div>

             <div>
               <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#666', marginBottom: 8, display: 'block' }}>DESCRIPCIÓN (SUBHEAD)</label>
               <textarea 
                 className="editor-input"
                 value={settings.landingContent.hero.desc}
                 onChange={(e) => setSettings({
                   ...settings, 
                   landingContent: { ...settings.landingContent, hero: { ...settings.landingContent.hero, desc: e.target.value } }
                 })}
                 style={{ width: '100%', background: 'rgba(255,255,255,0.03)', height: 80, resize: 'none' }}
               />
             </div>
           </div>
        </div>

        {/* STATS EDITING */}
        <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: 20, border: '1px solid var(--border)', marginBottom: '3rem' }}>
           <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1.5rem' }}>📊 LANDING: ESTADÍSTICAS</h3>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              <div>
                 <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#666', marginBottom: 8, display: 'block' }}>VISITAS / ACTIVOS</label>
                 <input 
                   type="text" className="editor-input"
                   value={settings.landingContent.stats.active}
                   onChange={(e) => setSettings({
                     ...settings, 
                     landingContent: { ...settings.landingContent, stats: { ...settings.landingContent.stats, active: e.target.value } }
                   })}
                   style={{ width: '100%' }}
                 />
              </div>
              <div>
                 <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#666', marginBottom: 8, display: 'block' }}>PLANTILLAS</label>
                 <input 
                   type="text" className="editor-input"
                   value={settings.landingContent.stats.templates}
                   onChange={(e) => setSettings({
                     ...settings, 
                     landingContent: { ...settings.landingContent, stats: { ...settings.landingContent.stats, templates: e.target.value } }
                   })}
                   style={{ width: '100%' }}
                 />
              </div>
              <div>
                 <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#666', marginBottom: 8, display: 'block' }}>SATISFACCIÓN</label>
                 <input 
                   type="text" className="editor-input"
                   value={settings.landingContent.stats.satisfaction}
                   onChange={(e) => setSettings({
                     ...settings, 
                     landingContent: { ...settings.landingContent, stats: { ...settings.landingContent.stats, satisfaction: e.target.value } }
                   })}
                   style={{ width: '100%' }}
                 />
              </div>
           </div>
        </div>

        {/* PREMIUM STATUS */}
        <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: 20, border: '1px solid var(--border)', marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.5rem' }}>👑 GESTIÓN DE CATÁLOGO (PREMIUM)</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: '2rem' }}>Selecciona qué plantillas requieren el pago de {settings.priceInfo} para publicarse.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
            {templates.map(t => {
              const isPremium = settings.premiumTemplateIds.includes(t.id);
              return (
                <div key={t.id} 
                  onClick={() => {
                    const ids = isPremium 
                      ? settings.premiumTemplateIds.filter((id: any) => id !== t.id)
                      : [...settings.premiumTemplateIds, t.id];
                    setSettings({...settings, premiumTemplateIds: ids});
                  }}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', 
                    background: isPremium ? 'var(--pink-dim)' : 'rgba(255,255,255,0.02)', 
                    border: '1px solid', 
                    borderColor: isPremium ? 'var(--pink)' : 'var(--border)', 
                    borderRadius: 16, cursor: 'pointer', transition: 'all 0.2s'
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{t.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: isPremium ? 'var(--pink)' : '#fff' }}>{t.name}</div>
                    <div style={{ fontSize: '0.65rem', color: isPremium ? 'var(--pink)' : '#666', fontWeight: 600 }}>{isPremium ? 'PREMIUM' : 'GRATIS'}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SAVE BAR */}
        <div style={{ 
          position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%) translateX(120px)', 
          background: 'rgba(5,5,5,0.8)', backdropFilter: 'blur(20px)', padding: '12px 32px', 
          borderRadius: 100, border: '1px solid var(--border-pink)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', gap: 24, zIndex: 100
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)' }}>¿Has terminado los cambios?</div>
          <button 
            type="submit"
            disabled={saving}
            className="editor-btn publish"
            style={{ padding: '10px 30px', margin: 0 }}
          >
            {saving ? 'GUARDANDO...' : 'GUARDAR TODO'}
          </button>
        </div>

      </form>
    </div>
  );
}
