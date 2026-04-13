'use client';

import { useState, useMemo, useCallback, useEffect, use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { generateHTML, ProjectData } from '@/lib/generateHTML';
import PaymentModal from '@/components/PaymentModal';

const FONTS = ['Inter', 'Playfair Display', 'Poppins', 'Dancing Script', 'Outfit', 'Caveat', 'Montserrat'];
const EFFECTS = [
  { id: 'typewriter', label: '⌨️ Máquina de escribir', desc: 'El texto aparece letra por letra' },
  { id: 'fadeUp', label: '✨ Fade Up', desc: 'El contenido aparece suavemente' },
  { id: 'confetti', label: '🎊 Confeti', desc: 'Lluvia de confeti al abrir' },
  { id: 'reveal', label: '🔮 Reveal', desc: 'Aparición dramática' },
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

  const previewHTML = useMemo(() => generateHTML(projectData, true), [projectData]);

  const handleDownload = useCallback(() => {
    const html = generateHTML(projectData, false); // false = con watermark (free)
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sorpresa-${recipientName || 'especial'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [projectData, recipientName]);

  const [isSaving, setIsSaving] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');

  const handleSaveProject = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title || 'Una sorpresa para ti 💝',
          template: templateId,
          config: projectData,
          status: 'pending_payment' // Set initial status to pending instead of draft directly
        })
      });
      const data = await res.json();
      if (data.success) {
        setCreatedProjectId(data.data._id);
        const url = `${window.location.origin}/s/${data.data._id}`;
        setGeneratedLink(url);
        navigator.clipboard.writeText(url);
        setShowModal(true); // Open the Modal
      }
    } catch (err) {
      alert('Error al guardar el proyecto');
    }
    setIsSaving(false);
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
    sidebar: { width: 420, minWidth: 420, borderRight: '1px solid rgba(255,255,255,0.06)', overflowY: 'auto' as const, padding: '1.5rem' },
    preview: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: '#080808', position: 'relative' as const },
    input: { width: '100%', padding: '0.75rem 1rem', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: '#f5f5f0', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.3s' },
    label: { display: 'block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#888', marginBottom: '0.5rem' },
    fieldGroup: { marginBottom: '1.25rem' },
    colorRow: { display: 'flex', gap: '0.75rem', alignItems: 'center' },
    colorInput: { width: 40, height: 40, borderRadius: 10, border: '2px solid rgba(255,255,255,0.1)', cursor: 'pointer', background: 'none', padding: 0 },
    tab: (active: boolean) => ({ padding: '0.6rem 1rem', borderRadius: 8, border: 'none', background: active ? 'rgba(192,132,252,0.15)' : 'transparent', color: active ? '#c084fc' : '#888', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s' }),
    phone: { width: 375, height: 667, borderRadius: 40, overflow: 'hidden', border: '3px solid rgba(255,255,255,0.1)', background: '#000', position: 'relative' as const, boxShadow: '0 25px 80px rgba(0,0,0,0.5)' },
    phoneNotch: { position: 'absolute' as const, top: 0, left: '50%', transform: 'translateX(-50%)', width: 150, height: 30, background: '#000', borderRadius: '0 0 20px 20px', zIndex: 10 },
    actionBtn: (primary: boolean, green: boolean = false) => ({ padding: '0.8rem 1.5rem', borderRadius: 12, border: primary ? 'none' : '1px solid rgba(255,255,255,0.15)', background: primary ? (green ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #c084fc, #f472b6)') : 'transparent', color: '#fff', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s', textAlign: 'center' as const }),
  };

  return (
    <div style={styles.page}>
      {/* Nav */}
      <nav style={styles.nav}>
        <Link href="/crear" style={{ textDecoration: 'none', color: '#f5f5f0', fontSize: '0.95rem', fontWeight: 600 }}>
          ← Volver
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.2rem' }}>{tmpl?.emoji || '⏳'}</span>
          <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{tmpl?.name || 'Cargando...'}</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {generatedLink && (
            <input 
              readOnly 
              value={generatedLink} 
              style={{...styles.input, width: '200px', padding: '0.5rem', borderColor: '#10b981'}} 
              onClick={(e) => { (e.target as HTMLInputElement).select(); navigator.clipboard.writeText(generatedLink); }}
            />
          )}
          <button onClick={handleSaveProject} disabled={isSaving} style={styles.actionBtn(true, true)}>
            {isSaving ? 'Guardando...' : '💾 Generar Link'}
          </button>
          <button onClick={handleDownload} style={styles.actionBtn(true)}>⬇ Descargar HTML</button>
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
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', background: 'rgba(255,255,255,0.03)', padding: '0.3rem', borderRadius: 10 }}>
              <button style={styles.tab(activeTab === 'content')} onClick={() => setActiveTab('content')}>📝 Contenido</button>
              <button style={styles.tab(activeTab === 'style')} onClick={() => setActiveTab('style')}>🎨 Estilo</button>
              <button style={styles.tab(activeTab === 'effects')} onClick={() => setActiveTab('effects')}>✨ Efectos</button>
            </div>

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
                  <label style={styles.label}>🎬 Efecto de entrada</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {EFFECTS.map(e => (
                      <button key={e.id} onClick={() => setEffect(e.id)}
                        style={{
                          padding: '1rem',
                          borderRadius: 12,
                          border: effect === e.id ? '1px solid rgba(192,132,252,0.4)' : '1px solid rgba(255,255,255,0.06)',
                          background: effect === e.id ? 'rgba(192,132,252,0.08)' : 'rgba(255,255,255,0.02)',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.3s',
                        }}
                      >
                        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: effect === e.id ? '#c084fc' : '#f5f5f0', marginBottom: '0.25rem' }}>
                          {e.label}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#888' }}>{e.desc}</div>
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
            <p style={{ fontSize: '0.7rem', color: '#555', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              Vista previa en vivo
            </p>
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
      )}

      {/* Payment Modal */}
      <PaymentModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        projectId={createdProjectId}
        projectUrl={generatedLink}
        settings={settings}
      />
    </div>
  );
}
