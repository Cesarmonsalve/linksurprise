'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Cesar2001.') {
      // In a real production app, this should be done via an API Route that sets an HttpOnly cookie.
      // For this implementation, we set standard cookie the middleware can read.
      document.cookie = "admin_token=auth_cesar_2001; path=/; max-age=86400";
      router.push('/admin');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: '100%', maxWidth: 400, padding: '2rem', background: '#0a0a0a', borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '3rem' }}>🔐</span>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '1rem' }}>Acceso Administrativo</h1>
          <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.5rem' }}>LinkSurprise Hub</p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: 12,
                background: 'rgba(255,255,255,0.05)',
                border: error ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                outline: 'none',
                transition: 'all 0.3s'
              }}
              placeholder="••••••••"
            />
            {error && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.5rem', display: 'block' }}>Contraseña incorrecta</span>}
          </div>

          <button 
            type="submit"
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: 12,
              background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
              color: '#fff',
              border: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Entrar
          </button>
        </form>
      </motion.div>
    </div>
  );
}
