'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { t, language, setLanguage } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setIsAuthenticated(true);
      return;
    }
    
    // Check if the auth cookie exists
    if (!document.cookie.includes('admin_token=auth_cesar_2001')) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Prevent flashing the dashboard before redirect
  if (!isAuthenticated) return null;

  const handleLogout = () => {
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push('/admin/login');
  };


  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  const navItems = [
    { label: t.admin.sidebarProjects, path: '/admin', icon: '📊' },
    { label: 'LinkBot AI', path: '/admin/ai', icon: '🤖' },
    { label: t.nav.templates, path: '/admin/templates', icon: '🎨' },
    { label: t.admin.sidebarSettings, path: '/admin/settings', icon: '⚙️' },
  ];

  return (
    <div className="admin-layout-container" style={{ background: 'var(--bg)' }}>
      <div className="editor-shell">
        <div className="editor-topbar">
          <div className="editor-dots">
            <div className="dot dot-red"></div>
            <div className="dot dot-yellow"></div>
            <div className="dot dot-green"></div>
          </div>
          <div className="editor-title">LINKSURPRISE STUDIO 2.0</div>
          <div className="editor-actions-bar">
            <button className="editor-btn" onClick={toggleLanguage}>
              {language === "es" ? "EN" : "ES"}
            </button>
            <Link href="/" className="editor-btn publish">{t.nav.brand}</Link>
          </div>
        </div>

        <div className="editor-body" style={{ minHeight: 'calc(100vh - 150px)' }}>
          <div className="editor-sidebar">
             <div className="sidebar-section-title">ADMINISTRACIÓN</div>
             {navItems.map(item => {
               const isActive = pathname === item.path || (item.path !== '/admin' && pathname.startsWith(item.path));
               return (
                 <Link
                   key={item.path}
                   href={item.path}
                   className={`sidebar-item ${isActive ? 'active' : ''}`}
                 >
                   <div className="sidebar-icon">{item.icon}</div>
                   {item.label}
                 </Link>
               )
             })}

             <div className="sidebar-section-title" style={{ marginTop: 40}}>SISTEMA</div>
             <button 
               className="sidebar-item" 
               onClick={handleLogout}
               style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'left', color: '#ff5f57' }}
             >
               <div className="sidebar-icon" style={{ background: 'rgba(255,95,87,0.1)' }}>🚪</div>
               {language === 'es' ? 'CERRAR SESIÓN' : 'LOGOUT'}
             </button>
          </div>

          <div style={{ position: 'relative' }}>
             {/* The canvas/main area */}
             <div className="canvas-grid" style={{ pointerEvents: 'none' }}></div>
             <div style={{ position: 'relative', zIndex: 1, padding: 32, height: '100%', overflowY: 'auto' }}>
               {children}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
