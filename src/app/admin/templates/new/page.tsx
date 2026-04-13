'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewTemplate() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    emoji: '✨',
    gradient: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
    pillar: 'custom',
    pillarLabel: 'Custom',
    defaultBg: '#050510',
    defaultText: '#f0eeff',
    defaultAccent: '#7c3aed',
    htmlTemplate: '<div class="custom-surprise" style="display:none; opacity:0; text-align:center;">\n  <h1 class="target-name">${recipientName}</h1>\n  <p class="target-message">${escapedMessage}</p>\n</div>',
    cssTemplate: '.custom-surprise {\n  padding: 2rem;\n}',
    jsTemplate: 'gsap.to(".custom-surprise", { display: "block", opacity: 1, duration: 1 });',
    htmlBasicTemplate: '',
    cssBasicTemplate: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        alert('Plantilla creada correctamente');
        router.push('/admin/templates');
      } else {
        alert('Error: ' + data.error);
      }
    } catch (err) {
      alert('Error en red');
    }
    setSaving(false);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/admin/templates" style={{ color: '#888', textDecoration: 'none', fontSize: '0.9rem' }}>← Volver</Link>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginTop: '1rem' }}>Crear Nueva Plantilla</h1>
        <p style={{ color: '#888' }}>Configura los metadatos y pega el HTML/CSS/JS base que servirá de motor renderizador.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '2rem' }}>
        
        {/* Basic Info */}
        <div style={{ background: '#0a0a0a', padding: '2rem', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: '#c084fc' }}>Información Básica</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={labelStyle}>ID Único (ej: mi_template_1)</label>
              <input required name="id" value={formData.id} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Nombre de Plantilla</label>
              <input required name="name" value={formData.name} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Emoji Icon</label>
              <input required name="emoji" value={formData.emoji} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Gradiente (Tarjetas Creador)</label>
              <input required name="gradient" value={formData.gradient} onChange={handleChange} style={inputStyle} />
            </div>
          </div>
        </div>

        {/* Code Editors */}
        <div style={{ background: '#0a0a0a', padding: '2rem', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#c084fc' }}>Código Dinámico</h2>
          <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '1.5rem' }}>Variables disponibles: {'${recipientName}'}, {'${senderName}'}, {'${escapedMessage}'}, {'${imageUrl}'}, {'${backgroundColor}'}, {'${textColor}'}, {'${accentColor}'}</p>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Estructura HTML</label>
            <textarea required name="htmlTemplate" value={formData.htmlTemplate} onChange={handleChange} style={{...inputStyle, height: 200, fontFamily: 'monospace', fontSize: '0.85rem', whiteSpace: 'pre'}} />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Estilos CSS</label>
            <textarea name="cssTemplate" value={formData.cssTemplate} onChange={handleChange} style={{...inputStyle, height: 200, fontFamily: 'monospace', fontSize: '0.85rem', whiteSpace: 'pre'}} />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Lógica JavaScript (GSAP ya está inyectado en la página general)</label>
            <textarea name="jsTemplate" value={formData.jsTemplate} onChange={handleChange} style={{...inputStyle, height: 200, fontFamily: 'monospace', fontSize: '0.85rem', whiteSpace: 'pre'}} />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>HTML Versión Básica (Opcional - Reemplaza el VIP si descargas la versión Gratis)</label>
            <textarea name="htmlBasicTemplate" placeholder="Si dejas esto vacío, el sistema usará una Tarjeta Universal simple por defecto." value={formData.htmlBasicTemplate} onChange={handleChange} style={{...inputStyle, height: 100, fontFamily: 'monospace', fontSize: '0.85rem', whiteSpace: 'pre'}} />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>CSS Versión Básica (Opcional)</label>
            <textarea name="cssBasicTemplate" value={formData.cssBasicTemplate} onChange={handleChange} style={{...inputStyle, height: 100, fontFamily: 'monospace', fontSize: '0.85rem', whiteSpace: 'pre'}} />
          </div>
        </div>

        <button type="submit" disabled={saving} style={{ padding: '1.2rem', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: 12, fontSize: '1.1rem', fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer' }}>
          {saving ? 'Guardando...' : 'Crear Plantilla e Inyectar en Sistema'}
        </button>

      </form>
    </div>
  );
}

const labelStyle = { display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem', textTransform: 'uppercase' as const, letterSpacing: '0.1em' };
const inputStyle = { width: '100%', padding: '1rem', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none' };
