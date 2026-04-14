'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AdminDashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

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
        setProjects(projects.map((p: any) => p._id === id ? { ...p, status: newStatus } : p));
      }
    } catch (e) {
      alert('Error updating status');
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'paid') return <span className="status-badge approved">{t.admin.statusApproved}</span>;
    if (status === 'pending_payment') return <span className="status-badge pending">{t.admin.statusPending}</span>;
    if (status === 'free') return <span className="status-badge approved" style={{ background: 'rgba(0, 229, 255, 0.1)', color: 'var(--cyan)', borderColor: 'rgba(0, 229, 255, 0.3)' }}>GRATUITO</span>;
    return <span className="status-badge" style={{ background: 'rgba(255,255,255,0.1)', color: '#aaa', borderColor: 'transparent' }}>BORRADOR</span>;
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <h1 className="section-title" style={{ fontSize: 32, textAlign: 'left', margin: 0 }}>
          {t.admin.projectsTitle.split(' ')[0]} <span className="highlight">{t.admin.projectsTitle.split(' ').slice(1).join(' ')}</span>
        </h1>
        <button 
          onClick={async () => {
            if (window.confirm('¿ESTÁS COMPLETAMENTE SEGURO? Esta acción eliminará TODOS los pedidos y proyectos de la base de datos de forma permanente.')) {
              const res = await fetch('/api/admin/projects/all', { method: 'DELETE' });
              const data = await res.json();
              if (data.success) {
                alert(data.message);
                setProjects([]);
              } else {
                alert('Error: ' + data.error);
              }
            }
          }}
          className="editor-btn" 
          style={{ background: 'rgba(255,95,87,0.1)', color: '#ff5f57', borderColor: 'rgba(255,95,87,0.2)', fontSize: 11, fontWeight: 800 }}
        >
          🗑️ ELIMINAR TODO
        </button>
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: 32, fontSize: 13 }}>{t.admin.projectsDesc}</p>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
        <div style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: 16, border: '1px solid var(--border)' }}>
          <div className="sidebar-section-title" style={{ margin: 0 }}>TOTAL</div>
          <div style={{ fontFamily: 'var(--font-montserrat)', fontSize: '2.5rem', fontWeight: 800, marginTop: '0.5rem', color: 'var(--purple-light)' }}>{projects.length}</div>
        </div>
        <div style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: 16, border: '1px solid var(--border)' }}>
          <div className="sidebar-section-title" style={{ margin: 0 }}>{t.admin.statusPending}</div>
          <div style={{ fontFamily: 'var(--font-montserrat)', fontSize: '2.5rem', fontWeight: 800, marginTop: '0.5rem', color: '#febc2e' }}>
            {projects.filter((p: any) => p.status === 'pending_payment').length}
          </div>
        </div>
        <div style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: 16, border: '1px solid var(--border)' }}>
          <div className="sidebar-section-title" style={{ margin: 0 }}>{t.admin.statusApproved}</div>
          <div style={{ fontFamily: 'var(--font-montserrat)', fontSize: '2.5rem', fontWeight: 800, marginTop: '0.5rem', color: '#28c840' }}>
            {projects.filter((p: any) => p.status === 'paid').length}
          </div>
        </div>
      </div>
      
      {loading ? (
        <p style={{ color: 'var(--text-muted)' }}>Cargando datos...</p>
      ) : (
        <div style={{ overflowX: 'auto', background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border)' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>FECHA</th>
                <th>PARA / DE</th>
                <th>PLANTILLA</th>
                <th>CLIENTE</th>
                <th>ESTADO</th>
                <th>{t.admin.actions}</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr><td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>No hay proyectos todavía.</td></tr>
              ) : (
                projects.map((p: any) => (
                  <tr key={p._id}>
                    <td style={{ color: 'var(--text-muted)' }}>
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <div style={{ fontWeight: 800, fontFamily: 'var(--font-montserrat)', textTransform: 'uppercase', fontSize: 11 }}>{p.config?.recipientName || 'Sin nombre'}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>De: {p.config?.senderName || 'Anónimo'}</div>
                    </td>
                    <td style={{ color: 'var(--pink)', fontWeight: 600, fontSize: 12 }}>
                      {p.template}
                    </td>
                    <td>
                      <div style={{ color: '#00e5a0', fontWeight: 'bold' }}>{p.clientPhone || 'N/A'}</div>
                    </td>
                    <td>
                      {getStatusBadge(p.status)}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <a href={`/s/${p._id}`} target="_blank" className="editor-btn" style={{ background: 'var(--surface2)'}}>{t.admin.previewBtn}</a>
                        {p.status !== 'paid' && (
                          <button onClick={() => updateStatus(p._id, 'paid')} className="editor-btn" style={{ borderColor: 'rgba(40, 200, 64, 0.4)', color: '#28c840', background: 'rgba(40, 200, 64, 0.05)' }}>
                            {t.admin.approveBtn}
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
    </>
  );
}
