'use client';

import { useState, useMemo, useCallback, useEffect, use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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

  const handlePreviewNewTab = useCallback(() => {
    const html = generateHTML(projectData, true);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  }, [projectData]);

  // Inline styles as objects for performance
  const styles = {
    page: { minHeight: '100vh', background: '#050505', color: '#f5f5f0', display: 'flex', flexDirection: 'column' as const },
    nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)' },
    editor: { display: 'flex', flex: 1, overflow: 'hidden' } as React.CSSProperties,
    sidebar: { width: 440, minWidth: 440, borderRight: '1px solid rgba(255,255,255,0.06)', overflowY: 'auto' as const, padding: '1.8rem', background: 'rgba(10,10,12,0.85)', backdropFilter: 'blur(24px)' },
    preview: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: 'radial-gradient(circle at 50% 50%, #15151a 0%, #050505 100%)', position: 'relative' as const },
    input: { width: '100%', padding: '0.85rem 1.2rem', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: '#f5f5f0', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)' },
    label: { display: 'block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: '#999', marginBottom: '0.6rem' },
    fieldGroup: { marginBottom: '1.5rem' },
    colorRow: { display: 'flex', gap: '0.75rem', alignItems: 'center' },
    colorInput: { width: 44, height: 44, borderRadius: 12, border: '2px solid rgba(255,255,255,0.1)', cursor: 'pointer', background: 'none', padding: 0, transition: 'transform 0.2s' },
    tab: (active: boolean) => ({ padding: '0.7rem 1.2rem', borderRadius: 12, border: '1px solid', borderColor: active ? 'rgba(192,132,252,0.5)' : 'transparent', background: active ? 'linear-gradient(135deg, rgba(192,132,252,0.15), rgba(244,114,182,0.15))' : 'transparent', color: active ? '#fff' : '#888', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s', boxShadow: active ? '0 4px 15px rgba(192,132,252,0.1)' : 'none' }),
    phone: { width: 375, height: 667, borderRadius: 45, overflow: 'hidden', border: '6px solid #1a1a1a', background: '#000', position: 'relative' as const, boxShadow: '0 30px 60px rgba(0,0,0,0.6), inset 0 0 0 2px rgba(255,255,255,0.05)' },
    phoneNotch: { position: 'absolute' as const, top: 0, left: '50%', transform: 'translateX(-50%)', width: 140, height: 28, background: '#1a1a1a', borderRadius: '0 0 20px 20px', zIndex: 10 },
    linkInput: { width: '100%', padding: '0.7rem 1.2rem', borderRadius: 12, border: '1px solid rgba(16,185,129,0.4)', background: 'rgba(16,185,129,0.1)', color: '#10b981', fontSize: '0.85rem', outline: 'none', fontFamily: 'monospace', transition: 'all 0.3s', boxShadow: '0 4px 15px rgba(16,185,129,0.1)' },
    actionBtn: (primary: boolean, green: boolean = false) => ({ padding: '0.85rem 1.8rem', borderRadius: 14, border: primary ? 'none' : '1px solid rgba(255,255,255,0.15)', background: primary ? (green ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #c084fc, #f472b6)') : 'rgba(255,255,255,0.03)', color: '#fff', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s', textAlign: 'center' as const, boxShadow: primary ? (green ? '0 8px 20px rgba(16,185,129,0.3)' : '0 8px 20px rgba(192,132,252,0.3)') : 'none', letterSpacing: '0.02em', backdropFilter: 'blur(10px)' }),
  };

  return (
    <div style={styles.page}>
      {/* Nav */}
      <nav style={styles.nav}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/crear" style={{ textDecoration: 'none', color: '#888', fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#888'}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.4rem', borderRadius: 8 }}>←</div> Volver al Loby
          </Link>
        </motion.div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span style={{ fontSize: '1.4rem' }}>{tmpl?.emoji || '⏳'}</span>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.02em' }}>{tmpl?.name || 'Cargando...'}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.7rem', color: isPremium ? '#f472b6' : '#10b981', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
               {isPremium ? <span>👑 Modo VIP Activado</span> : <span>🎁 Versión Gratuita</span>}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
          {generatedLink && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ position: 'relative', width: '100%', minWidth: '300px' }}>
              <input 
                readOnly 
                value={generatedLink} 
                className="link-glitch-hover"
                style={{ ...styles.linkInput, width: '100%', paddingRight: '40px', cursor: 'pointer' }}
                title="Clic para copiar"
                onClick={(e) => { 
                  (e.target as HTMLInputElement).select(); 
                  navigator.clipboard.writeText(generatedLink); 
                  showToast('¡Copiado! 📋 Envíalo a esa persona especial.');
                }}
              />
              <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>📋</span>
            </motion.div>
          )}
          <button onClick={handleSaveProject} disabled={isSaving} style={styles.actionBtn(true, !isPremium)}>
            {isSaving ? 'Guardando...' : (isPremium ? '👑 Comprar Link VIP' : '🎁 Generar Link Gratis')}
          </button>
          <button onClick={handleDownload} style={styles.actionBtn(false)} title={isPremium ? 'Las funciones VIP requieren crear el link premium' : 'Descargar HTML Básico'}>
            {isPremium ? '🔒 Solo VIP (En línea)' : '⬇ Descargar HTML'}
          </button>
        </div>
      </nav>

      {loading || !tmpl ? (
         <div style={{ padding: '4rem', textAlign: 'center', color: '#888' }}>Cargando editor y recursos...</div>
      ) : (
        <div style={styles.editor}>
          {/* Left Sidebar - Controls */}
        <aside style={styles.sidebar}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', background: 'rgba(0,0,0,0.4)', padding: '0.4rem', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
              <button style={{...styles.tab(activeTab === 'content'), flex: 1}} onClick={() => setActiveTab('content')}>📝 Textos</button>
              <button style={{...styles.tab(activeTab === 'style'), flex: 1}} onClick={() => setActiveTab('style')}>🎨 Diseño</button>
              <button style={{...styles.tab(activeTab === 'effects'), flex: 1, position: 'relative'}} onClick={() => setActiveTab('effects')}>
                 ✨ Magia
                 {hasPremiumEffect && <span style={{position:'absolute', top:-5, right:-5, background:'#db2777', width:10, height:10, borderRadius:'50%', boxShadow:'0 0 10px #db2777'}}/>}
              </button>
            </div>

            {/* Banner Dinámico VIP */}
            {hasPremiumEffect && !isPremiumTemplate && (
               <motion.div initial={{opacity: 0, height: 0, marginBottom: 0}} animate={{opacity: 1, height: 'auto', marginBottom: '1.5rem'}} style={{ background: 'linear-gradient(90deg, rgba(192,132,252,0.1), rgba(244,114,182,0.1))', padding: '1rem', borderRadius: 12, borderLeft: '4px solid #c084fc' }}>
                 <p style={{fontSize: '0.8rem', color: '#e2e8f0', margin: 0, lineHeight: 1.5}}>
                   <strong style={{color: '#c084fc'}}>🔮 ¡Has desbloqueado Magia VIP!</strong> Al seleccionar efectos Premium, este enlace será para toda la vida.
                 </p>
               </motion.div>
            )}

            {/* ═══ CONTENT TAB ═══ */}
            {activeTab === 'content' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>📌 Título de la página</label>
                  <input style={styles.input} placeholder="Una sorpresa para ti 💝" value={title} onChange={e => setTitle(e.target.value)} />
                </div>

                <div style={styles.fieldGroup}>
                  <label style={styles.label}>💝 ¿Para quién es?</label>
                  <input style={styles.input} placeholder="Nombre de la persona" value={recipientName} onChange={e => setRecipientName(e.target.value)} />
                </div>

                <div style={styles.fieldGroup}>
                  <label style={styles.label}>✍️ Tu nombre (remitente)</label>
                  <input style={styles.input} placeholder="Tu nombre" value={senderName} onChange={e => setSenderName(e.target.value)} />
                </div>

                <div style={styles.fieldGroup}>
                  <label style={styles.label}>💌 Tu mensaje</label>
                  <textarea
                    style={{ ...styles.input, minHeight: 140, resize: 'vertical' as const, lineHeight: 1.7 }}
                    placeholder="Escribe tu mensaje emocional aquí..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                  />
                  <span style={{ fontSize: '0.7rem', color: '#666', marginTop: '0.3rem', display: 'block' }}>
                    {message.length} caracteres
                  </span>
                </div>

                <div style={styles.fieldGroup}>
                  <label style={styles.label}>🖼 Foto Especial (Tu Galería)</label>
                  <label style={{
                    display: 'block',
                    padding: '1.5rem',
                    border: '2px dashed rgba(192,132,252,0.4)',
                    borderRadius: 16,
                    background: 'rgba(0,0,0,0.2)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.3s'
                  }}>
                    <input 
                      type="file" 
                      accept="image/*" 
                      style={{ display: 'none' }} 
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // Mostrar estado temporal
                          setImageUrl('Subiendo...');
                          
                          // Compresión "Mobile First" via Canvas
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const img = new Image();
                            img.onload = async () => {
                              const canvas = document.createElement('canvas');
                              const MAX_WIDTH = 800; // Optimal for mobile performance
                              const scaleSize = Object.isExtensible(MAX_WIDTH) ? MAX_WIDTH / img.width : 1; 
                              const width = Math.min(MAX_WIDTH, img.width);
                              const height = img.height * (width / img.width);
                              
                              canvas.width = width;
                              canvas.height = height;
                              const ctx = canvas.getContext('2d');
                              ctx?.drawImage(img, 0, 0, width, height);
                              
                              const base64Data = canvas.toDataURL('image/jpeg', 0.82); // 82% quality
                              
                              try {
                                const res = await fetch('/api/upload', {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ file: base64Data, folder: 'linksurprise_images' })
                                });
                                const data = await res.json();
                                if (data.success) {
                                  setImageUrl(data.url);
                                } else {
                                  alert('Error subiendo imagen: ' + data.error);
                                  setImageUrl('');
                                }
                              } catch (err) {
                                alert('Error de red subiendo imagen');
                                setImageUrl('');
                              }
                            };
                            img.src = event.target?.result as string;
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📸</div>
                    <div style={{ color: '#c084fc', fontWeight: 600, fontSize: '0.9rem' }}>
                      {imageUrl === 'Subiendo...' ? 'Subiendo a la nube... ⌛' : (imageUrl ? 'Foto Subida Exitosamente ✅ (Clic para cambiar)' : 'Toca aquí para subir desde tu celular')}
                    </div>
                    {imageUrl && imageUrl !== 'Subiendo...' && <div style={{marginTop: '0.5rem', fontSize: '0.7rem', color: '#888', wordBreak: 'break-all'}}>Link actual: {imageUrl.substring(0, 40)}...</div>}
                  </label>
                  <div style={{ background: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid #ef4444', padding: '0.8rem', marginTop: '0.8rem', borderRadius: '0 8px 8px 0' }}>
                    <span style={{ fontSize: '0.75rem', color: '#fca5a5', display: 'block', lineHeight: 1.4 }}>
                      <strong>Plan Gratis:</strong> Las imágenes se autodestruyen en 7 días por seguridad. <br/>
                      <strong>VIP Plus:</strong> Hosting de por vida al generar tu Link Premium.
                    </span>
                  </div>
                </div>

                <div style={styles.fieldGroup}>
                  <label style={styles.label}>🎵 Tu Canción MP3 (Opcional)</label>
                  <label style={{
                    display: 'block',
                    padding: '1.2rem',
                    border: '2px dashed rgba(255,255,255,0.1)',
                    borderRadius: 16,
                    background: 'rgba(0,0,0,0.2)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.3s'
                  }}>
                    <input 
                      type="file" 
                      accept="audio/mp3, audio/mpeg, audio/wav" 
                      style={{ display: 'none' }} 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 5 * 1024 * 1024) {
                            alert("Para velocidad extrema en celular, la canción debe pesar menos de 5MB.");
                            return;
                          }
                          setMusicUrl('Subiendo...');
                          const reader = new FileReader();
                          reader.onload = async (event) => {
                            const base64Audio = event.target?.result as string;
                            try {
                              const res = await fetch('/api/upload', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ file: base64Audio, folder: 'linksurprise_audio' })
                              });
                              const data = await res.json();
                              if (data.success) {
                                setMusicUrl(data.url);
                              } else {
                                alert('Error subiendo audio: ' + data.error);
                                setMusicUrl('');
                              }
                            } catch (err) {
                              alert('Error de red al subir audio');
                              setMusicUrl('');
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎧</div>
                    <div style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.85rem' }}>
                      {musicUrl === 'Subiendo...' ? 'Subiendo Canción... ⌛' : (musicUrl ? 'Canción Subida ✅ (Clic para cambiar)' : 'Seleccionar MP3')}
                    </div>
                  </label>
                </div>

                <div style={styles.fieldGroup}>
                  <label style={styles.label}>🔐 Contraseña (opcional)</label>
                  <input style={styles.input} placeholder="Deja vacío si no quieres contraseña" value={password} onChange={e => setPassword(e.target.value)} />
                </div>

                {isPremium && (
                  <div style={{ ...styles.fieldGroup, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
                    <label style={{ ...styles.label, color: '#10b981' }}>📱 TU WHATSAPP (OBLIGATORIO PARA VIP)</label>
                    <input style={{ ...styles.input, borderColor: 'rgba(16,185,129,0.5)', background: 'rgba(16,185,129,0.05)' }} placeholder="+58412..." value={clientPhone} onChange={e => setClientPhone(e.target.value)} />
                    <p style={{ fontSize: '0.7rem', color: '#888', marginTop: '0.5rem' }}>Lo necesitamos para vincular tu comprobante de pago con este enlace protegido.</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* ═══ STYLE TAB ═══ */}
            {activeTab === 'style' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>🎨 Color de fondo</label>
                  <div style={styles.colorRow}>
                    <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} style={styles.colorInput} />
                    <input style={{ ...styles.input, flex: 1 }} value={bgColor} onChange={e => setBgColor(e.target.value)} />
                  </div>
                </div>

                <div style={styles.fieldGroup}>
                  <label style={styles.label}>📝 Color del texto</label>
                  <div style={styles.colorRow}>
                    <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} style={styles.colorInput} />
                    <input style={{ ...styles.input, flex: 1 }} value={textColor} onChange={e => setTextColor(e.target.value)} />
                  </div>
                </div>

                <div style={styles.fieldGroup}>
                  <label style={styles.label}>✨ Color acento</label>
                  <div style={styles.colorRow}>
                    <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} style={styles.colorInput} />
                    <input style={{ ...styles.input, flex: 1 }} value={accentColor} onChange={e => setAccentColor(e.target.value)} />
                  </div>
                </div>

                {/* Quick palettes */}
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>🎭 Paletas rápidas</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                    {[
                      { bg: '#1a0a1e', text: '#f8d7e8', accent: '#e91e63', name: 'Rosa' },
                      { bg: '#0a0a1e', text: '#e8d7f8', accent: '#7c4dff', name: 'Violeta' },
                      { bg: '#0a1a16', text: '#d7f8e8', accent: '#00e676', name: 'Esmeralda' },
                      { bg: '#1a1a0a', text: '#f8f0d7', accent: '#ffc107', name: 'Dorado' },
                      { bg: '#1a0a0a', text: '#f8d7d7', accent: '#ff5252', name: 'Pasión' },
                      { bg: '#0d1117', text: '#c9d1d9', accent: '#58a6ff', name: 'Noche' },
                    ].map((p, i) => (
                      <button key={i} onClick={() => { setBgColor(p.bg); setTextColor(p.text); setAccentColor(p.accent); }}
                        style={{
                          padding: '0.6rem',
                          borderRadius: 10,
                          border: '1px solid rgba(255,255,255,0.08)',
                          background: p.bg,
                          cursor: 'pointer',
                          textAlign: 'center',
                          transition: 'transform 0.2s',
                        }}
                      >
                        <div style={{ display: 'flex', gap: 3, justifyContent: 'center', marginBottom: 4 }}>
                          <div style={{ width: 12, height: 12, borderRadius: '50%', background: p.accent }} />
                          <div style={{ width: 12, height: 12, borderRadius: '50%', background: p.text }} />
                        </div>
                        <span style={{ fontSize: '0.65rem', color: p.text }}>{p.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div style={styles.fieldGroup}>
                  <label style={styles.label}>🔤 Tipografía</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                    {FONTS.map(f => (
                      <button key={f} onClick={() => setFontFamily(f)}
                        style={{
                          padding: '0.6rem',
                          borderRadius: 10,
                          border: fontFamily === f ? `1px solid ${accentColor}` : '1px solid rgba(255,255,255,0.08)',
                          background: fontFamily === f ? `${accentColor}15` : 'transparent',
                          color: fontFamily === f ? '#c084fc' : '#888',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          fontFamily: f,
                          transition: 'all 0.3s',
                        }}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ═══ EFFECTS TAB ═══ */}
            {activeTab === 'effects' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>🎬 Efecto de entrada y animaciones</label>
                  <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: '1rem' }}>Desbloquea emociones ilimitadas seleccionando efectos VIP. Sorprende a niveles estratosféricos.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {EFFECTS.map(e => (
                      <button key={e.id} onClick={() => setEffect(e.id)}
                        style={{
                          padding: '1.2rem',
                          borderRadius: 16,
                          border: effect === e.id ? '2px solid rgba(192,132,252,0.6)' : '1px solid rgba(255,255,255,0.06)',
                          background: effect === e.id ? 'linear-gradient(135deg, rgba(192,132,252,0.1), rgba(244,114,182,0.05))' : 'rgba(0,0,0,0.3)',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                          position: 'relative',
                          overflow: 'hidden',
                          boxShadow: effect === e.id ? '0 10px 30px rgba(192,132,252,0.15)' : 'none'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: effect === e.id ? '#fff' : '#e2e8f0', marginBottom: '0.3rem' }}>
                            {e.label}
                          </div>
                          {e.isVip ? (
                            <span style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)', fontSize: '0.65rem', padding: '0.2rem 0.5rem', borderRadius: 20, color: '#fff', fontWeight: 800, letterSpacing: '0.05em', boxShadow: '0 2px 10px rgba(219,39,119,0.3)' }}>👑 VIP</span>
                          ) : (
                            <span style={{ background: 'rgba(255,255,255,0.1)', fontSize: '0.65rem', padding: '0.2rem 0.5rem', borderRadius: 20, color: '#aaa', fontWeight: 600 }}>GRATIS</span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: effect === e.id ? '#cbd5e1' : '#888', lineHeight: 1.4, paddingRight: '1rem' }}>{e.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </aside>

        {/* Right Side - Live Preview in Phone Mockup */}
        <div style={styles.preview}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '0.7rem', color: '#555', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Vista previa en vivo
            </p>
            {/* Visual Toggle Mode */}
            <div style={{ display: 'inline-flex', gap: '0.5rem', marginBottom: '1.5rem', background: '#0a0a0a', padding: '0.4rem', borderRadius: 30, border: '1px solid rgba(255,255,255,0.05)' }}>
              <button 
                onClick={() => setPreviewMode('basic')} 
                style={{ cursor: 'pointer', padding: '0.6rem 1.2rem', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600, border: 'none', transition: 'all 0.3s',
                  background: previewMode === 'basic' ? 'rgba(255,255,255,0.1)' : 'transparent', 
                  color: previewMode === 'basic' ? '#fff' : '#666' 
                }}
              >
                🎁 Básica (Grab)
              </button>
              <button 
                onClick={() => setPreviewMode('vip')} 
                style={{ cursor: 'pointer', padding: '0.6rem 1.2rem', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600, border: 'none', transition: 'all 0.3s',
                  background: previewMode === 'vip' ? 'linear-gradient(135deg, #7c3aed, #db2777)' : 'transparent', 
                  color: previewMode === 'vip' ? '#fff' : '#666' 
                }}
              >
                👑 Modo VIP Live
              </button>
            </div>
            <motion.div
              style={styles.phone}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div style={styles.phoneNotch} />
              <iframe
                srcDoc={previewHTML}
                style={{ width: '100%', height: '100%', border: 'none', borderRadius: 40 }}
                title="Preview"
                sandbox="allow-scripts"
              />
            </motion.div>
          </div>
        </div>
      </div>
      )}

      {/* Payment Modal */}
      <PaymentModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        projectId={createdProjectId}
        projectUrl={generatedLink}
        settings={settings}
      />

      {/* Global Toast Notification */}
      {toastMsg && (
        <div style={{
          position: 'fixed', bottom: 30, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(255,255,255,0.95)', color: '#000', padding: '1rem 2rem',
          borderRadius: 30, fontWeight: 700, zIndex: 999999,
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
          animation: 'toastFade 0.3s ease-out'
        }}>
          {toastMsg}
          <style>{`@keyframes toastFade { from { opacity: 0; transform: translate(-50%, 20px); } to { opacity: 1; transform: translate(-50%, 0); } }`}</style>
        </div>
      )}
    </div>
  );
}
