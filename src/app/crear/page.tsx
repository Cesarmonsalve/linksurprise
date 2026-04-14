"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CrearPage() {
  const { t, language, setLanguage } = useLanguage();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [templates, setTemplates] = useState<any[]>([]);
  const [premiumIds, setPremiumIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  useEffect(() => {
    Promise.all([fetchTemplates(), fetchSettings()]).then(() =>
      setLoading(false)
    );
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.success && data.data && data.data.premiumTemplateIds) {
        setPremiumIds(data.data.premiumTemplateIds);
      }
    } catch (e) {
      console.error("Failed to load settings", e);
    }
  };

  const fetchTemplates = async () => {
    try {
      const res = await fetch("/api/templates");
      const data = await res.json();
      if (data.success && data.data) {
        const arr = Object.values(data.data).map((template: any) => ({
          id: template.id,
          tag: template.pillarLabel,
          title: template.name,
          desc: template.defaultMessage || "",
          gradient: template.gradient,
          emoji: template.emoji,
          features: [template.pillarLabel, "Personalizable"],
        }));
        setTemplates(arr);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--text)",
        fontFamily: "var(--font-inter), sans-serif",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Background Blobs */}
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>
      <div className="bg-blob blob-3"></div>

      {/* Nav */}
      <nav>
        <Link href="/" className="nav-brand">
          <div className="nav-logo">LS</div>
          <span className="nav-name">LINKSURPRISE</span>
        </Link>
        <div className="nav-cta">
          <button className="lang-switch" onClick={toggleLanguage}>
            {language === "es" ? "EN" : "ES"}
          </button>
          <Link href="/admin/login" className="btn-ghost">
            {t.nav.login}
          </Link>
          <Link
            href="/"
            className="btn-primary"
            style={{ textDecoration: "none" }}
          >
            {t.nav.brand}
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "120px 40px 80px",
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        <header className="section-header" style={{ textAlign: "left", marginBottom: 80 }}>
          <span className="section-label">{t.gallery.label}</span>
          <h1 className="section-title" style={{ fontSize: "clamp(40px, 8vw, 80px)", lineHeight: 1.1 }}>
            {t.gallery.title} <span className="highlight">{t.gallery.titleHighlight}</span>
          </h1>
          <p className="section-desc" style={{ marginLeft: 0, textAlign: "left", maxWidth: 600 }}>
            {t.gallery.desc}
          </p>
        </header>

        {/* Gallery Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "30px",
            alignItems: "start",
          }}
        >
          {loading ? (
            <div
              style={{
                gridColumn: "1 / -1",
                padding: "100px 0",
                textAlign: "center",
                color: "var(--text-muted)",
                fontSize: "24px",
                fontFamily: "var(--font-montserrat)",
              }}
            >
              LOADING STUDIO...
            </div>
          ) : (
            templates.map((template, i) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onMouseEnter={() => setHoveredId(template.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="template-card"
                style={{
                  background: "var(--bg2)",
                  border: "1px solid var(--border)",
                  borderRadius: "20px",
                  overflow: "hidden",
                  position: "relative",
                  transition: "all 0.3s",
                }}
              >
                <div
                  style={{
                    height: "300px",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: template.gradient || "var(--pink-dim)",
                      filter: "blur(60px)",
                      opacity: hoveredId === template.id ? 0.2 : 0.05,
                      transition: "opacity 0.6s",
                    }}
                  />
                  <div
                    style={{
                      fontSize: "100px",
                      zIndex: 1,
                      transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                      transform: hoveredId === template.id ? 'scale(1.2)' : 'scale(1)'
                    }}
                  >
                    {template.emoji || "✨"}
                  </div>
                </div>

                <div style={{ padding: "24px", position: "relative", background: "rgba(10,0,8,0.8)" }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <span style={{ fontSize: '10px', color: 'var(--pink)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                         {template.tag || "STUDIO"}
                      </span>
                      {premiumIds.includes(template.id) && (
                        <div style={{ fontSize: '9px', background: 'linear-gradient(135deg, var(--pink), var(--orange))', color: '#fff', padding: '2px 8px', borderRadius: '100px', fontWeight: 800 }}>PREMIUM</div>
                      )}
                   </div>
                   
                   <h3 style={{ 
                     fontFamily: "var(--font-montserrat)", 
                     fontSize: "20px", 
                     fontWeight: 900, 
                     color: "var(--text)", 
                     marginBottom: "8px",
                     textTransform: "uppercase" 
                   }}>
                     {template.title}
                   </h3>
                   
                   <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "24px", height: "40px", overflow: "hidden" }}>
                     {template.desc}
                   </p>

                   <Link href={`/crear/${template.id}`} style={{ textDecoration: "none" }}>
                      <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                        {t.hero.btnPrimary}
                      </button>
                   </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ padding: 40, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1400, margin: '100px auto 0', position: 'relative', zIndex: 1, flexWrap: 'wrap' }}>
        <div className="footer-brand" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase'}}>
          © 2026 <strong>LINKSURPRISE</strong>
        </div>
        <ul className="footer-links" style={{ display: 'flex', gap: 24, listStyle: 'none'}}>
           <li><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 12, fontWeight: 600, textTransform: 'uppercase' }}>PRIVACIDAD</a></li>
           <li><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 12, fontWeight: 600, textTransform: 'uppercase' }}>TÉRMINOS</a></li>
        </ul>
      </footer>
    </div>
  );
}
