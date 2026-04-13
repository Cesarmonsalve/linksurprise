'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TemplatesList() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const res = await fetch('/api/admin/templates');
      const data = await res.json();
      if (data.success) {
        setTemplates(data.data);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Plantillas Personalizadas</h1>
          <p style={{ color: '#888' }}>Crea plantillas con tu propio HTML/CSS que luego podrán ser elegidas por los usuarios.</p>
        </div>
        <Link href="/admin/templates/new" style={{ padding: '0.8rem 1.5rem', background: '#7c3aed', color: '#fff', borderRadius: 12, textDecoration: 'none', fontWeight: 600 }}>
          + Nueva Plantilla
        </Link>
      </div>

      {loading ? (
        <p style={{ color: '#888' }}>Cargando...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {templates.length === 0 ? (
            <div style={{ padding: '3rem', background: '#0a0a0a', borderRadius: 16, border: '1px dashed rgba(255,255,255,0.2)', textAlign: 'center', gridColumn: '1 / -1' }}>
              <p style={{ color: '#888', marginBottom: '1rem' }}>No has creado ninguna plantilla personalizada todavía.</p>
              <Link href="/admin/templates/new" style={{ color: '#c084fc', textDecoration: 'none' }}>Crear la primera →</Link>
            </div>
          ) : (
            templates.map((t: any) => (
              <div key={t._id} style={{ background: '#0a0a0a', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                <div style={{ height: 100, background: t.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                  {t.emoji}
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ fontSize: '0.7rem', color: '#c084fc', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{t.pillarLabel}</div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>{t.name}</h3>
                  <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '1rem' }}>ID: {t.id}</div>
                  
                  {/* Actions normally go here, e.g. edit */}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.8rem', color: t.isActive ? '#10b981' : '#ef4444' }}>{t.isActive ? 'Activa' : 'Inactiva'}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
