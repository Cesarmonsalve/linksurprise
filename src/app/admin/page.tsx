'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AdminDashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        // Refresh local list
        setProjects(projects.map((p: any) => p._id === id ? { ...p, status: newStatus } : p));
      }
    } catch (e) {
      alert('Error updating status');
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'paid') return <span style={{ padding: '0.3rem 0.6rem', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600 }}>Aprobado / Pagado</span>;
    if (status === 'pending_payment') return <span style={{ padding: '0.3rem 0.6rem', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600 }}>Pago Pendiente</span>;
    if (status === 'free') return <span style={{ padding: '0.3rem 0.6rem', background: 'rgba(96, 165, 250, 0.15)', color: '#60a5fa', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600 }}>Gratuito</span>;
    return <span style={{ padding: '0.3rem 0.6rem', background: 'rgba(255, 255, 255, 0.1)', color: '#aaa', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600 }}>Borrador</span>;
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Dashboard General</h1>
      <p style={{ color: '#888', marginBottom: '2rem' }}>Administra y aprueba las sorpresas creadas por tus usuarios.</p>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
        <div style={{ background: '#0a0a0a', padding: '1.5rem', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ color: '#888', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Proyectos Totales</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '0.5rem', color: '#c084fc' }}>{projects.length}</div>
        </div>
        <div style={{ background: '#0a0a0a', padding: '1.5rem', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ color: '#888', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Pagos Pendientes</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '0.5rem', color: '#f59e0b' }}>
            {projects.filter((p: any) => p.status === 'pending_payment').length}
          </div>
        </div>
        <div style={{ background: '#0a0a0a', padding: '1.5rem', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ color: '#888', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Aprobados</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '0.5rem', color: '#10b981' }}>
            {projects.filter((p: any) => p.status === 'paid').length}
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem' }}>Últimas Sorpresas Creadas</h2>
      
      {loading ? (
        <p style={{ color: '#888' }}>Cargando datos...</p>
      ) : (
        <div style={{ background: '#0a0a0a', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: 'rgba(255,255,255,0.02)' }}>
              <tr>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Fecha</th>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Para / De</th>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Plantilla</th>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Cliente / IP</th>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Estado</th>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>No hay proyectos todavía.</td></tr>
              ) : (
                projects.map((p: any) => (
                  <tr key={p._id} style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem', color: '#aaa' }}>
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ fontWeight: 600 }}>{p.config?.recipientName || 'Sin nombre'}</div>
                      <div style={{ fontSize: '0.8rem', color: '#888' }}>De: {p.config?.senderName || 'Anónimo'}</div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem', color: '#c084fc' }}>
                      {p.template}
                    </td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.8rem' }}>
                      <div style={{ color: '#10b981', fontWeight: 'bold' }}>{p.clientPhone || 'N/A'}</div>
                      <div style={{ color: '#555', fontSize: '0.7rem' }}>IP: {p.ipAddress || 'unknown'}</div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      {getStatusBadge(p.status)}
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <a href={`/s/${p._id}`} target="_blank" style={{ padding: '0.4rem 0.8rem', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 8, textDecoration: 'none', fontSize: '0.8rem' }}>Ver URL</a>
                        {p.status !== 'paid' && (
                          <button onClick={() => updateStatus(p._id, 'paid')} style={{ padding: '0.4rem 0.8rem', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: 8, fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}>
                            ✓ Aprobar Pago
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
