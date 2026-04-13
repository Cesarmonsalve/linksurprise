'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push('/admin/login');
  };

  const navItems = [
    { label: '📊 Dashboard', path: '/admin' },
    { label: '🎨 Plantillas Propias', path: '/admin/templates' },
    { label: '⚙️ Ajustes / Pagos', path: '/admin/settings' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#050505', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ width: 280, borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <Link href="/" style={{ textDecoration: 'none', color: '#fff', fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
            LinkSurprise<span style={{ color: '#7c3aed' }}>.</span>
          </Link>
          <div style={{ fontSize: '0.7rem', color: '#888', marginTop: '0.3rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Admin Panel
          </div>
        </div>

        <nav style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/admin' && pathname.startsWith(item.path));
            return (
              <Link 
                key={item.path} 
                href={item.path}
                style={{
                  textDecoration: 'none',
                  padding: '0.8rem 1rem',
                  borderRadius: 12,
                  background: isActive ? 'rgba(124, 58, 237, 0.1)' : 'transparent',
                  color: isActive ? '#c084fc' : '#888',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.9rem',
                  transition: 'all 0.2s',
                  border: isActive ? '1px solid rgba(124, 58, 237, 0.2)' : '1px solid transparent'
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: '1.5rem' }}>
          <button 
            onClick={handleLogout}
            style={{ width: '100%', padding: '0.8rem', borderRadius: 10, background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', cursor: 'pointer', fontWeight: 600 }}
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
