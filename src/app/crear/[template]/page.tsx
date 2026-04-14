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
  
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [showModal, setShowModal] = useState(false);
  const [createdProjectId, setCreatedProjectId] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [clientPhone, setClientPhone] = useState('');

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

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

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
    recipientName, senderName, message, backgroundColor: bgColor, textColor, accentColor,
    fontFamily, effect, musicUrl, imageUrl, template: templateId, title, password,
    customTemplateConfig: tmpl?.isCustom ? tmpl : undefined
  }), [recipientName, senderName, message, bgColor, textColor, accentColor, fontFamily, effect, musicUrl, imageUrl, templateId, title, password, tmpl]);

  const [previewMode, setPreviewMode] = useState<'vip' | 'basic'>('vip');
  const previewHTML = useMemo(() => generateHTML(projectData, true, previewMode), [projectData, previewMode]);

  const isPremiumTemplate = settings?.premiumTemplateIds?.includes(templateId);
  const selectedEffectData = EFFECTS.find(e => e.id === effect);
  const hasPremiumEffect = selectedEffectData?.isVip || false;
  const isPremium = isPremiumTemplate || hasPremiumEffect;

  const [isSaving, setIsSaving] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');

  const handleSaveProject = async () => {
    if (isPremium && !clientPhone.trim()) {
      showToast('❌ OBLIGATORIO: Ingresa tu WhatsApp para vincular el pago.');
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
      const data = await res.json();
      if (res.ok && data.success) {
        setCreatedProjectId(data.data._id);
        const url = `${window.location.origin}/s/${data.data._id}`;
        setGeneratedLink(url);
        navigator.clipboard.writeText(url);
        if (isPremium) setShowModal(true);
        else showToast('¡Link copiado al portapapeles! 🎁✨');
      } else {
        throw new Error(data.error || 'Error al guardar.');
      }
    } catch (err: any) {
       showToast(`❌ Error: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Styles
  const styles = {
    page: { minHeight: '100vh', background: '#050505', color: '#f5f5f0', display: 'flex', flexDirection: 'column' as const, overflow: 'hidden' },
    nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', flexWrap: 'wrap' as const, gap: '1rem', position: 'relative' as const, zIndex: 100, background: '#050505' },
    editorBody: { display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' as const },
    sidebar: { width: '100%', maxWidth: 440, borderRight: '1px solid rgba(255,255,255,0.06)', overflowY: 'auto' as const, padding: '2.5rem 1.8rem 1.8rem 1.8rem', background: 'rgba(5,5,5,0.8)', backdropFilter: 'blur(24px)', zIndex: 20 },
    preview: { flex: 1, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '2rem', background: 'radial-gradient(circle at 50% 50%, #15151a 0%, #050505 100%)', position: 'relative' as const, overflow: 'hidden' },
    input: { width: '100%', padding: '0.85rem 1.2rem', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: '#f5f5f0', fontSize: '0.95rem', outline: 'none', transition: 'all 0.3s' },
    label: { display: 'block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: '#999', marginBottom: '0.6rem' },
    tab: (active: boolean) => ({ padding: '0.7rem 1.2rem', borderRadius: 12, border: '1px solid', borderColor: active ? 'rgba(192,132,252,0.5)' : 'transparent', background: active ? 'linear-gradient(135deg, rgba(192,132,252,0.15), rgba(244,114,182,0.15))' : 'transparent', color: active ? '#fff' : '#888', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.3s' }),
    uploadBox: { display: 'block', padding: '1.2rem', border: '2px dashed rgba(255,255,255,0.1)', borderRadius: 16, background: 'rgba(0,0,0,0.2)', cursor: 'pointer', textAlign: 'center' as const, transition: 'all 0.3s' },
    phone: { width: 'min(375px, 90vw)', height: 'min(667px, 70vh)', borderRadius: 40, overflow: 'hidden', border: '8px solid #1a1a1a', background: '#000', position: 'relative' as const, boxShadow: '0 30px 60px rgba(0,0,0,0.6)' },
    phoneNotch: { position: 'absolute' as const, top: 0, left: '50%', transform: 'translateX(-50%)', width: 140, height: 28, background: '#1a1a1a', borderRadius: '0 0 20px 20px', zIndex: 10 },
  };

  return (
    <div style={styles.page}>
      <nav style={styles.nav}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/crear" style={{ textDecoration: 'none', color: '#888', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: 10, fontSize: '0.85rem' }}>←</Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.2rem' }}>{tmpl?.emoji}</span>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>{tmpl?.name}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={handleSaveProject} disabled={isSaving} style={{ padding: '0.85rem 1.8rem', borderRadius: 14, border: 'none', background: isPremium ? 'linear-gradient(135deg, #c084fc, #f472b6)' : 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}>
            {isSaving ? '⏳' : (isPremium ? '👑 VIP' : '🎁 LISTO')}
          </button>
        </div>
      </nav>

      {loading ? (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando Editor...</div>
      ) : (
        <div style={styles.editorBody}>
          <div className="mobile-view-toggle">
            <button className={mobileView === 'editor' ? 'active' : ''} onClick={() => setMobileView('editor')}>🛠️ EDITAR</button>
            <button className={mobileView === 'preview' ? 'active' : ''} onClick={() => setMobileView('preview')}>👁️ PREVIA</button>
          </div>

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
                     <input style={styles.input} value={title} onChange={e => setTitle(e.target.value)} placeholder="Una sorpresa para ti 💝" />
                   </div>
                   <div style={{ marginBottom: '1.2rem' }}>
                     <label style={styles.label}>Para:</label>
                     <input style={styles.input} value={recipientName} onChange={e => setRecipientName(e.target.value)} placeholder="Nombre de destinatario" />
                   </div>
                   <div style={{ marginBottom: '1.2rem' }}>
                     <label style={styles.label}>De:</label>
                     <input style={styles.input} value={senderName} onChange={e => setSenderName(e.target.value)} placeholder="Tu nombre" />
                   </div>
                   <div style={{ marginBottom: '1.2rem' }}>
                     <label style={styles.label}>Mensaje Especial</label>
                     <textarea style={{ ...styles.input, height: 100, resize: 'none' }} value={message} onChange={e => setMessage(e.target.value)} placeholder="Escribe algo lindo..." />
                   </div>
                   
                   {/* IMAGE UPLOAD */}
                   <div style={{ marginBottom: '1.5rem' }}>
                      <label style={styles.label}>🖼️ Foto Sorpresa</label>
                      <label style={{ ...styles.uploadBox, border: imageUrl ? '2px solid #10b981' : '2px dashed rgba(255,255,255,0.1)' }}>
                         <input type="file" accept="image/*" style={{ display: 'none' }} 
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setImageUrl('Subiendo...');
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  const img = new Image();
                                  img.onload = async () => {
                                    const canvas = document.createElement('canvas');
                                    const width = Math.min(800, img.width);
                                    const height = img.height * (width / img.width);
                                    canvas.width = width; canvas.height = height;
                                    canvas.getContext('2d')?.drawImage(img, 0, 0, width, height);
                                    const base64 = canvas.toDataURL('image/jpeg', 0.8);
                                    const res = await fetch('/api/upload', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ file: base64, folder: 'linksurprise' }) });
                                    const data = await res.json();
                                    if (data.success) setImageUrl(data.url);
                                    else { alert('Error: ' + data.error); setImageUrl(''); }
                                  };
                                  img.src = event.target?.result as string;
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                         />
                         <div style={{ fontSize: '1.2rem', marginBottom: 4 }}>📸</div>
                         <div style={{ fontSize: '0.8rem', fontWeight: 700, color: imageUrl ? '#10b981' : '#fff' }}>
                            {imageUrl === 'Subiendo...' ? 'SUBIENDO...' : (imageUrl ? 'FOTO LISTA ✓' : 'SUBIR FOTO')}
                         </div>
                      </label>
                   </div>

                   {/* MUSIC UPLOAD */}
                   <div style={{ marginBottom: '1.5rem' }}>
                      <label style={styles.label}>🎵 Música de Fondo</label>
                      <label style={{ ...styles.uploadBox, border: musicUrl ? '2px solid #7c3aed' : '2px dashed rgba(255,255,255,0.1)' }}>
                         <input type="file" accept="audio/*" style={{ display: 'none' }} 
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                if (file.size > 5 * 1024 * 1024) { alert('Máximo 5MB'); return; }
                                setMusicUrl('Subiendo...');
                                const reader = new FileReader();
                                reader.onload = async (event) => {
                                  const res = await fetch('/api/upload', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ file: event.target?.result, folder: 'audio' }) });
                                  const data = await res.json();
                                  if (data.success) setMusicUrl(data.url);
                                  else { alert('Error: ' + data.error); setMusicUrl(''); }
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                         />
                         <div style={{ fontSize: '1.2rem', marginBottom: 4 }}>🎧</div>
                         <div style={{ fontSize: '0.8rem', fontWeight: 700, color: musicUrl ? '#7c3aed' : '#fff' }}>
                            {musicUrl === 'Subiendo...' ? 'SUBIENDO...' : (musicUrl ? 'MÚSICA LISTA ✓' : 'SUBIR MP3')}
                         </div>
                      </label>
                   </div>

                   {/* PASSWORD */}
                   <div style={{ marginBottom: '1.2rem' }}>
                      <label style={styles.label}>🔐 Contraseña (Opcional)</label>
                      <input style={styles.input} type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="Ej: 1234" />
                   </div>

                   {/* WHATSAPP (Only if VIP) */}
                   {isPremium && (
                      <div style={{ padding: '1.2rem', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 16 }}>
                         <label style={{ ...styles.label, color: '#10b981' }}>Tu WhatsApp (Requerido para VIP)</label>
                         <input style={{ ...styles.input, borderColor: 'rgba(16,185,129,0.3)' }} value={clientPhone} onChange={e => setClientPhone(e.target.value)} placeholder="+52..." />
                      </div>
                   )}
                 </motion.div>
               )}
               {activeTab === 'style' && (
                 <motion.div key="style" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                      <div>
                        <label style={styles.label}>Fondo</label>
                        <input type="color" style={{ width: '100%', height: 40, borderRadius: 8, border: 'none', background: 'none', cursor: 'pointer' }} value={bgColor} onChange={e => setBgColor(e.target.value)} />
                      </div>
                      <div>
                        <label style={styles.label}>Acento</label>
                        <input type="color" style={{ width: '100%', height: 40, borderRadius: 8, border: 'none', background: 'none', cursor: 'pointer' }} value={accentColor} onChange={e => setAccentColor(e.target.value)} />
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
                       <button key={e.id} onClick={() => setEffect(e.id)} style={{ padding: '1rem', borderRadius: 12, border: '1px solid', borderColor: effect === e.id ? 'var(--pink)' : 'rgba(255,255,255,0.05)', background: effect === e.id ? 'var(--pink-dim)' : 'rgba(255,255,255,0.02)', textAlign: 'left', color: '#fff', cursor: 'pointer' }}>
                         <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: 4 }}>{e.label} {e.isVip && '👑'}</div>
                         <div style={{ fontSize: '0.75rem', color: '#888' }}>{e.desc}</div>
                       </button>
                     ))}
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </aside>

          <main style={styles.preview} className={`editor-preview-container ${mobileView === 'preview' ? 'mobile-visible' : 'mobile-hidden'}`}>
             <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                <button 
                  style={{ background: previewMode === 'basic' ? '#fff' : 'transparent', color: previewMode === 'basic' ? '#000' : '#fff', border: '1px solid #fff', padding: '0.4rem 1rem', borderRadius: 20, fontSize: '0.7rem', fontWeight: 800 }} 
                  onClick={() => setPreviewMode('basic')}
                >VISTA GRATUITA</button>
                <button 
                  style={{ background: previewMode === 'vip' ? 'var(--pink)' : 'transparent', color: '#fff', border: '1px solid var(--pink)', padding: '0.4rem 1rem', borderRadius: 20, fontSize: '0.7rem', fontWeight: 800 }} 
                  onClick={() => setPreviewMode('vip')}
                >VIP LIVE</button>
             </div>
             
             {previewMode === 'vip' && (
               <div style={{ marginBottom: '1.2rem', padding: '0.6rem 1rem', background: 'rgba(192,132,252,0.1)', border: '1px solid rgba(192,132,252,0.3)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: '0.5rem', maxWidth: 375, textAlign: 'center' }}>
                 <span style={{ fontSize: '0.9rem' }}>👑</span>
                 <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#c084fc', letterSpacing: '0.05em' }}>
                    ESTA ES LA EXPERIENCIA PREMIUM QUE RECIBIRÁS AL ACTIVAR EL VIP
                 </span>
               </div>
             )}

             {previewMode === 'basic' && (
               <div style={{ marginBottom: '1.2rem', padding: '0.6rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: '0.5rem', maxWidth: 375 }}>
                 <span style={{ fontSize: '0.9rem' }}>🎁</span>
                 <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#888' }}>
                    VISTA BÁSICA (SIN ANIMACIONES NI EFECTOS)
                 </span>
               </div>
             )}             </div>
             <div style={styles.phone}>
                <div style={styles.phoneNotch} />
                <iframe srcDoc={previewHTML} style={{ width: '100%', height: '100%', border: 'none' }} title="Editor Preview" />
             </div>
          </main>
        </div>
      )}

      <PaymentModal isOpen={showModal} onClose={() => setShowModal(false)} projectId={createdProjectId} projectUrl={generatedLink} settings={settings} />
      {toastMsg && <div className="toast">{toastMsg}</div>}

      <style jsx global>{`
        .mobile-view-toggle { display: none; position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.8); backdrop-filter: blur(20px); padding: 6px; border-radius: 100px; border: 1px solid rgba(255,255,255,0.1); z-index: 1000; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .mobile-view-toggle button { padding: 10px 24px; border-radius: 100px; border: none; background: transparent; color: #666; font-weight: 800; font-size: 0.75rem; cursor: pointer; transition: all 0.3s; }
        .mobile-view-toggle button.active { background: #fff; color: #000; }
        @media (max-width: 900px) { 
          .mobile-view-toggle { display: flex; gap: 4px; } 
          .mobile-hidden { display: none !important; } 
          .mobile-visible { display: flex !important; width: 100% !important; max-width: none !important; } 
          .editor-sidebar-container { padding-bottom: 80px !important; } 
        }
        
        /* Fix for select options in dark mode */
        select option {
          background-color: #1a1a1a !important;
          color: #ffffff !important;
        }

        .editor-sidebar-container {
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.1) transparent;
        }

        .toast { position: fixed; top: 2rem; left: 50%; transform: translateX(-50%); background: #fff; color: #000; padding: 12px 24px; border-radius: 100px; font-weight: 800; font-size: 0.85rem; z-index: 10000; box-shadow: 0 10px 30px rgba(0,0,0,0.5); animation: slideDown 0.4s ease; }
        @keyframes slideDown { from { transform: translate(-50%, -20px); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }
      `}</style>
    </div>
  );
}
