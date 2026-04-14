'use client';

import { useState, useMemo, useCallback, useEffect, use } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { generateHTML, ProjectData } from '@/lib/generateHTML';
import PaymentModal from '@/components/PaymentModal';

const FONTS = ['Inter', 'Playfair Display', 'Poppins', 'Dancing Script', 'Outfit', 'Caveat', 'Montserrat'];
const EFFECTS = [
  { id: 'typewriter', label: '⌨️ Máquina de escribir', desc: 'El texto aparece letra por letra (Clásico)', isVip: false },
  { id: 'fadeUp', label: '✨ Desvanecer (Fade Up)', desc: 'El texto aparece suavemente desde abajo', isVip: false },
  { id: 'bounceIn', label: '🪀 Rebote Divertido', desc: 'Aparece dando un salto', isVip: false },
  { id: 'zoomOut', label: '🔍 Alejar Enfoque', desc: 'Se posiciona haciendo un efecto de zoom inverso', isVip: false },
  { id: 'confetti', label: '🎊 Lluvia de Confeti', desc: 'Lluvia de colores al abrir', isVip: true },
  { id: 'reveal', label: '🔮 Cortina Teatral', desc: 'Aparición dramática levantando un telón oscuro', isVip: false },
  { id: 'heartRain', label: '❤️ Lluvia de Corazones', desc: 'Lluvia infinita de corazoncitos flotantes', isVip: true },
  { id: 'sparkles', label: '✨ Destellos Mágicos', desc: 'Magia que sigue tu dedo/cursor por la pantalla', isVip: true },
];

interface EditorProps {
  params: Promise<{ template: string }>;
}

export default function EditorPage({ params }: EditorProps) {
  const { template: templateId } = use(params);
  
  const [tmpl, setTmpl] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<any>({});
  
  // Mobile UI States
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [createdProjectId, setCreatedProjectId] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  const [clientPhone, setClientPhone] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [bgColor, setBgColor] = useState('');
  const [textColor, setTextColor] = useState('');
  const [accentColor, setAccentColor] = useState('');
  const [fontFamily, setFontFamily] = useState('Inter');
  const [effect, setEffect] = useState('fadeUp');
  const [musicUrl, setMusicUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'effects'>('content');

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch('/api/templates');
        const data = await res.json();
        if (data.success && data.data) {
          const fetchedTmpl = data.data[templateId];
          if (fetchedTmpl) {
            setTmpl(fetchedTmpl);
            setMessage(fetchedTmpl.defaultMessage || '');
            setBgColor(fetchedTmpl.defaultBg || '#000000');
            setTextColor(fetchedTmpl.defaultText || '#ffffff');
            setAccentColor(fetchedTmpl.defaultAccent || '#7c3aed');
            setEffect(fetchedTmpl.effect || 'fadeUp');
          }
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchTemplates();

    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/admin/settings');
        const data = await res.json();
        if (data.success) {
          setSettings(data.data);
        }
      } catch (err) {}
    };
    fetchSettings();
  }, [templateId]);

  const projectData: ProjectData = useMemo(() => ({
    recipientName,
    senderName,
    message,
    backgroundColor: bgColor,
    textColor,
    accentColor,
    fontFamily,
    effect,
    musicUrl,
    imageUrl,
    template: templateId,
    title,
    password,
    customTemplateConfig: tmpl?.isCustom ? tmpl : undefined
  }), [recipientName, senderName, message, bgColor, textColor, accentColor, fontFamily, effect, musicUrl, imageUrl, templateId, title, password, tmpl]);

  const [previewMode, setPreviewMode] = useState<'vip' | 'basic'>('vip');
  
  const previewHTML = useMemo(() => generateHTML(projectData, true, previewMode), [projectData, previewMode]);

  const isPremiumTemplate = settings?.premiumTemplateIds?.includes(templateId);
  const selectedEffectData = EFFECTS.find(e => e.id === effect);
  const hasPremiumEffect = selectedEffectData?.isVip || false;
  
  // A project is premium if the template is premium OR if a premium effect has been used.
  const isPremium = isPremiumTemplate || hasPremiumEffect;

  const handleDownload = () => {
    if (isPremium) {
      handleSaveProject();
      return;
    }
    const html = generateHTML(projectData, false, 'basic'); // false = con watermark, basic = no GSAP/ThreeJS
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sorpresa-${recipientName || 'especial'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');

  const handleSaveProject = async () => {
    if (isPremium && !clientPhone.trim()) {
      showToast('❌ OBLIGATORIO: Ingresa tu número de WhatsApp para poder asociar tu pago.');
      return;
    }
    setIsSaving(true);
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title || 'Una sorpresa para ti 💝',
          template: templateId,
          config: projectData,
          status: isPremium ? 'pending_payment' : 'free',
          clientPhone: isPremium ? clientPhone : ''
        })
      });
      
      let data;
      try {
        data = await res.json();
      } catch (e) {
        throw new Error('Error al conectar con el servidor.');
      }

      if (res.ok && data.success) {
        setCreatedProjectId(data.data._id);
        const url = `${window.location.origin}/s/${data.data._id}`;
        setGeneratedLink(url);
        navigator.clipboard.writeText(url);
        if (isPremium) {
          setShowModal(true); // Open the Payment Modal
        } else {
          showToast('¡Link copiado al portapapeles! 🎁✨');
        }
      } else {
        throw new Error(data.error || 'Error al guardar el proyecto en la base de datos.');
      }
    } catch (err: any) {
      console.error(err);
      showToast(`❌ Error: ${err.message || 'Error desconocido'}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Styles
  const styles = {
    page: { minHeight: '100vh', background: '#050505', color: '#f5f5f0', display: 'flex', flexDirection: 'column' as const, overflow: 'hidden' },
    nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', flexWrap: 'wrap' as const, gap: '1rem' },
    editorBody: { display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' as const },
    
    // Sidebar dynamic width based on mobile
    sidebar: { 
      width: '100%', 
      maxWidth: 440, 
      borderRight: '1px solid rgba(255,255,255,0.06)', 
      overflowY: 'auto' as const, 
      padding: '1.8rem', 
      background: 'rgba(5,5,5,0.8)', 
      backdropFilter: 'blur(24px)',
      zIndex: 20
    },
    
    preview: { 
      flex: 1, 
      display: 'flex', 
      flexDirection: 'column' as const,
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '2rem', 
      background: 'radial-gradient(circle at 50% 50%, #15151a 0%, #050505 100%)', 
      position: 'relative' as const,
      overflow: 'hidden'
    },
    
    input: { width: '100%', padding: '0.85rem 1.2rem', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: '#f5f5f0', fontSize: '0.95rem', outline: 'none', transition: 'all 0.3s' },
    label: { display: 'block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: '#999', marginBottom: '0.6rem' },
    tab: (active: boolean) => ({ padding: '0.7rem 1.2rem', borderRadius: 12, border: '1px solid', borderColor: active ? 'rgba(192,132,252,0.5)' : 'transparent', background: active ? 'linear-gradient(135deg, rgba(192,132,252,0.15), rgba(244,114,182,0.15))' : 'transparent', color: active ? '#fff' : '#888', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s' }),
    phone: { width: 'min(375px, 90vw)', height: 'min(667px, 70vh)', borderRadius: 40, overflow: 'hidden', border: '8px solid #1a1a1a', background: '#000', position: 'relative' as const, boxShadow: '0 30px 60px rgba(0,0,0,0.6)' },
    phoneNotch: { position: 'absolute' as const, top: 0, left: '50%', transform: 'translateX(-50%)', width: 140, height: 28, background: '#1a1a1a', borderRadius: '0 0 20px 20px', zIndex: 10 },
    actionBtn: (primary: boolean, green: boolean = false) => ({ padding: '0.85rem 1.8rem', borderRadius: 14, border: primary ? 'none' : '1px solid rgba(255,255,255,0.15)', background: primary ? (green ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #c084fc, #f472b6)') : 'rgba(255,255,255,0.03)', color: '#fff', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s', textAlign: 'center' as const, boxShadow: primary ? '0 10px 20px rgba(0,0,0,0.3)' : 'none' }),
  };

  return (
    <div style={styles.page}>
      {/* Navbar con Adaptación Mobile */}
      <nav style={styles.nav}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/crear" style={{ textDecoration: 'none', color: '#888', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: 10, fontSize: '0.85rem' }}>←</Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.2rem' }}>{tmpl?.emoji}</span>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>{tmpl?.name}</span>
          </div>
        </div>

        {/* Buttons - Hidden or condensed on small screens handled by CSS */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={handleSaveProject} disabled={isSaving} style={styles.actionBtn(true, !isPremium)}>
            {isSaving ? '⏳' : (isPremium ? '👑 VIP' : '🎁 LISTO')}
          </button>
        </div>
      </nav>

      {loading ? (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando Editor...</div>
      ) : (
        <div style={styles.editorBody}>
          
          {/* MOBILE TABS (Only visible on small screens via CSS) */}
          <div className="mobile-view-toggle">
            <button className={mobileView === 'editor' ? 'active' : ''} onClick={() => setMobileView('editor')}>🛠️ EDITAR</button>
            <button className={mobileView === 'preview' ? 'active' : ''} onClick={() => setMobileView('preview')}>👁️ PREVIA</button>
          </div>

          {/* SIDEBAR */}
          <aside style={styles.sidebar} className={`editor-sidebar-container ${mobileView === 'editor' ? 'mobile-visible' : 'mobile-hidden'}`}>
             <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '2rem', background: '#000', padding: '0.4rem', borderRadius: 14 }}>
                <button style={{...styles.tab(activeTab === 'content'), flex: 1}} onClick={() => setActiveTab('content')}>TEXTO</button>
                <button style={{...styles.tab(activeTab === 'style'), flex: 1}} onClick={() => setActiveTab('style')}>DISEÑO</button>
                <button style={{...styles.tab(activeTab === 'effects'), flex: 1}} onClick={() => setActiveTab('effects')}>MAGIA</button>
             </div>

             <AnimatePresence mode="wait">
               {activeTab === 'content' && (
                 <motion.div key="content" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                   <div style={{ marginBottom: '1.2rem' }}>
                     <label style={styles.label}>Título de Pestaña</label>
                     <input style={styles.input} value={title} onChange={e => setTitle(e.target.value)} />
                   </div>
                   <div style={{ marginBottom: '1.2rem' }}>
                     <label style={styles.label}>Para:</label>
                     <input style={styles.input} value={recipientName} onChange={e => setRecipientName(e.target.value)} />
                   </div>
                   <div style={{ marginBottom: '1.2rem' }}>
                     <label style={styles.label}>De:</label>
                     <input style={styles.input} value={senderName} onChange={e => setSenderName(e.target.value)} />
                   </div>
                   <div style={{ marginBottom: '1.2rem' }}>
                     <label style={styles.label}>Mensaje Especial</label>
                     <textarea style={{ ...styles.input, height: 120, resize: 'none' }} value={message} onChange={e => setMessage(e.target.value)} />
                   </div>
                   <div style={{ marginBottom: '1.2rem' }}>
                      <label style={styles.label}>🖼️ Foto Sorpresa</label>
                      <input style={styles.input} placeholder="URL de imagen o sube una..." value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
                   </div>
                 </motion.div>
               )}
               {activeTab === 'style' && (
                 <motion.div key="style" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                      <div>
                        <label style={styles.label}>Fondo</label>
                        <input type="color" style={{ width: '100%', height: 40, borderRadius: 8, border: 'none' }} value={bgColor} onChange={e => setBgColor(e.target.value)} />
                      </div>
                      <div>
                        <label style={styles.label}>Acento</label>
                        <input type="color" style={{ width: '100%', height: 40, borderRadius: 8, border: 'none' }} value={accentColor} onChange={e => setAccentColor(e.target.value)} />
                      </div>
                   </div>
                   <div style={{ marginBottom: '1.2rem' }}>
                     <label style={styles.label}>Tipografía</label>
                     <select style={styles.input} value={fontFamily} onChange={e => setFontFamily(e.target.value)}>
                        {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                     </select>
                   </div>
                 </motion.div>
               )}
               {activeTab === 'effects' && (
                 <motion.div key="effects" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                     {EFFECTS.map(e => (
                       <button 
                         key={e.id} 
                         onClick={() => setEffect(e.id)}
                         style={{
                           padding: '1rem', 
                           borderRadius: 12, 
                           border: '1px solid',
                           borderColor: effect === e.id ? 'var(--pink)' : 'rgba(255,255,255,0.05)',
                           background: effect === e.id ? 'var(--pink-dim)' : 'rgba(255,255,255,0.02)',
                           textAlign: 'left',
                           color: '#fff',
                           cursor: 'pointer'
                         }}
                       >
                         <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: 4 }}>{e.label} {e.isVip && '👑'}</div>
                         <div style={{ fontSize: '0.75rem', color: '#888' }}>{e.desc}</div>
                       </button>
                     ))}
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </aside>

          {/* PREVIEW CONTAINER */}
          <main style={styles.preview} className={`editor-preview-container ${mobileView === 'preview' ? 'mobile-visible' : 'mobile-hidden'}`}>
             <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                <button 
                  style={{ background: previewMode === 'basic' ? '#fff' : 'transparent', color: previewMode === 'basic' ? '#000' : '#fff', border: '1px solid #fff', padding: '0.4rem 1rem', borderRadius: 20, fontSize: '0.7rem', fontWeight: 800 }}
                  onClick={() => setPreviewMode('basic')}
                >BÁSICO</button>
                <button 
                  style={{ background: previewMode === 'vip' ? 'var(--pink)' : 'transparent', color: '#fff', border: '1px solid var(--pink)', padding: '0.4rem 1rem', borderRadius: 20, fontSize: '0.7rem', fontWeight: 800 }}
                  onClick={() => setPreviewMode('vip')}
                >VIP LIVE</button>
             </div>
             
             <div style={styles.phone}>
                <div style={styles.phoneNotch} />
                <iframe 
                  srcDoc={previewHTML}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  title="Editor Preview"
                />
             </div>
          </main>

        </div>
      )}

      <PaymentModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        projectId={createdProjectId}
        projectUrl={generatedLink}
        settings={settings}
      />

      {toastMsg && (
        <div className="toast">{toastMsg}</div>
      )}

      <style jsx global>{`
        .mobile-view-toggle {
          display: none;
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(20px);
          padding: 6px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.1);
          z-index: 1000;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        
        .mobile-view-toggle button {
          padding: 10px 24px;
          border-radius: 100px;
          border: none;
          background: transparent;
          color: #666;
          font-weight: 800;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.3s;
        }

        .mobile-view-toggle button.active {
          background: #fff;
          color: #000;
        }

        @media (max-width: 900px) {
          .mobile-view-toggle {
            display: flex;
            gap: 4px;
          }
          .mobile-hidden {
            display: none !important;
          }
          .mobile-visible {
            display: flex !important;
            width: 100% !important;
            max-width: none !important;
          }
          .editor-sidebar-container {
            padding-bottom: 80px !important;
          }
        }

        .toast {
          position: fixed;
          top: 2rem;
          left: 50%;
          transform: translateX(-50%);
          background: #fff;
          color: #000;
          padding: 12px 24px;
          border-radius: 100px;
          font-weight: 800;
          font-size: 0.85rem;
          z-index: 10000;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          animation: slideDown 0.4s ease;
        }

        @keyframes slideDown {
          from { transform: translate(-50%, -20px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
