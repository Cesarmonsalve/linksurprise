'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AILab() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const generateTemplate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/ai/groq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      
      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.error || 'Error al conectar con Groq');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const saveToCatalog = async () => {
    if (!result) return;
    setSaving(true);
    try {
      const dbId = 'ai_' + Math.random().toString(36).substr(2, 9);
      
      const payload = {
        id: dbId,
        name: result.name,
        emoji: result.emoji || '🤖',
        description: result.description,
        isPremium: true,
        html: result.html,
        css: result.css,
        js: result.js
      };

      const res = await fetch('/api/admin/templates/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (data.success) {
        alert('✨ Plantilla guardada exitosamente en la Base de Datos.');
      } else {
        alert('Error: ' + data.error);
      }
    } catch (err: any) {
      alert('Error de conexión');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Laboratorio IA</h1>
        <div style={{ background: '#7c3aed', fontSize: '0.7rem', padding: '0.3rem 0.6rem', borderRadius: 20, fontWeight: 800 }}>BETA</div>
      </div>
      <p style={{ color: '#888', marginBottom: '2rem' }}>
        Crea o personaliza plantillas usando inteligencia artificial ultra rápida (Groq / Llama-3).
      </p>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '1rem', borderRadius: 12, color: '#ef4444', marginBottom: '2rem' }}>
          {error}
        </div>
      )}

      <div style={{ background: '#0a0a0a', padding: '1.5rem', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', marginBottom: '2rem' }}>
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Ej: Crea una plantilla de matrix con lluvia de letras verdes y estilo hacker..."
          style={{ width: '100%', minHeight: 120, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '1rem', color: '#fff', outline: 'none', resize: 'vertical', fontFamily: 'inherit', fontSize: '0.9rem' }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <button
            onClick={generateTemplate}
            disabled={loading || !prompt.trim()}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem', background: loading ? '#333' : '#10b981', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 600, cursor: loading || !prompt.trim() ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Generando código...' : '✨ Generar Plantilla'}
          </button>
        </div>
      </div>

      {result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: '#111', borderRadius: 16, border: '1px solid rgba(16, 185, 129, 0.3)', overflow: 'hidden' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(16, 185, 129, 0.05)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{result.emoji}</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{result.name}</h3>
              </div>
              <p style={{ color: '#888', fontSize: '0.85rem' }}>{result.description}</p>
            </div>
            <button 
              onClick={saveToCatalog}
              disabled={saving}
              style={{ background: '#7c3aed', color: '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: 10, fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer' }}
            >
              {saving ? 'Guardando...' : '💾 Guardar en Catálogo'}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(255,255,255,0.05)' }}>
            <div style={{ background: '#0a0a0a', padding: '1.5rem' }}>
              <div style={{ fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>HTML</div>
              <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.8rem', whiteSpace: 'pre-wrap', maxHeight: 300, overflowY: 'auto' }}>
                {result.html}
              </pre>
            </div>
            <div style={{ background: '#0a0a0a', padding: '1.5rem' }}>
              <div style={{ fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>CSS</div>
              <pre style={{ margin: 0, color: '#a78bfa', fontSize: '0.8rem', whiteSpace: 'pre-wrap', maxHeight: 300, overflowY: 'auto' }}>
                {result.css}
              </pre>
            </div>
          </div>
          
          {result.js && (
            <div style={{ background: '#0a0a0a', padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>JavaScript</div>
              <pre style={{ margin: 0, color: '#fcd34d', fontSize: '0.8rem', whiteSpace: 'pre-wrap', maxHeight: 200, overflowY: 'auto' }}>
                {result.js}
              </pre>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
