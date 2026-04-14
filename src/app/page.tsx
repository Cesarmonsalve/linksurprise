"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t, language, setLanguage } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("TODAS");
  const [settings, setSettings] = useState<any>(null);
  const [dbTemplates, setDbTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [settingsRes, templatesRes] = await Promise.all([
          fetch('/api/admin/settings'),
          fetch('/api/templates')
        ]);
        
        const settingsData = await settingsRes.json();
        const templatesData = await templatesRes.json();

        if (settingsData.success) setSettings(settingsData.data);
        
        if (templatesData.success) {
          const templArray = Object.values(templatesData.data).map((tmpl: any) => ({
            id: tmpl.id,
            name: tmpl.name,
            price: settingsData.data?.premiumTemplateIds?.includes(tmpl.id) ? "3.00" : "0",
            free: !settingsData.data?.premiumTemplateIds?.includes(tmpl.id),
            tags: [tmpl.pillarLabel || "SPECIAL"],
            category: settingsData.data?.premiumTemplateIds?.includes(tmpl.id) ? "PREMIUM" : "GRATIS",
            pillar: tmpl.pillar || 'futuristic'
          }));
          setDbTemplates(templArray);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredTemplates = activeFilter === "TODAS"
    ? dbTemplates
    : activeFilter === "GRATIS"
    ? dbTemplates.filter(t => t.free)
    : dbTemplates.filter(t => !t.free);

  // Dynamic Content with Fallbacks
  const heroContent = settings?.landingContent?.hero || {
    badge: t.hero.badge,
    title1: t.hero.title1,
    title2: t.hero.title2,
    title3: t.hero.title3,
    desc: t.hero.desc
  };

  const statsContent = settings?.landingContent?.stats || {
    active: t.stats.stat1Num,
    templates: t.stats.stat2Num,
    satisfaction: t.stats.stat3Num
  };

  return (
    <>
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>
      <div className="bg-blob blob-3"></div>

      <nav>
        <Link href="/" className="nav-brand">
          <div className="nav-logo">LS</div>
          <span className="nav-name">LINKSURPRISE</span>
        </Link>
        <ul className="nav-links">
          <li>
             <button className="nav-link" onClick={() => document.getElementById('gallery')?.scrollIntoView({behavior: 'smooth'})}>
               {t.nav.templates}
             </button>
          </li>
          <li>
             <button className="nav-link" onClick={() => document.getElementById('method')?.scrollIntoView({behavior: 'smooth'})}>
               {t.nav.howItWorks}
             </button>
          </li>
          <li>
             <button className="nav-link" onClick={() => document.getElementById('pricing')?.scrollIntoView({behavior: 'smooth'})}>
               {t.nav.pricing}
             </button>
          </li>
        </ul>
        <div className="nav-cta">
          <button className="lang-switch" onClick={toggleLanguage}>
            {language === "es" ? "EN" : "ES"}
          </button>
          {/* Admin links hidden as requested */}
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-bg-img"></div>
        <div className="hero-grid"></div>

        <div className="hero-badge">
          <div className="badge-dot"></div>
          {heroContent.badge}
        </div>

        <h1>
          {heroContent.title1} <span className="highlight">{heroContent.title2}</span> {heroContent.title3}
        </h1>

        <p className="hero-sub">{heroContent.desc}</p>

        <div className="hero-actions">
          <Link href="/crear" className="btn-hero" style={{ textDecoration: 'none' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
            {t.hero.btnPrimary}
          </Link>
          <button onClick={() => document.getElementById('gallery')?.scrollIntoView()} className="btn-hero-ghost">
            {t.hero.btnGhost}
          </button>
        </div>

        <div className="stats-strip">
          <div className="stat-item">
            <div className="stat-num">{statsContent.active}</div>
            <div className="stat-label">{t.stats.stat1Label}</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">{statsContent.templates}</div>
            <div className="stat-label">{t.stats.stat2Label}</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">{statsContent.satisfaction}</div>
            <div className="stat-label">{t.stats.stat3Label}</div>
          </div>
        </div>
      </section>

      {/* MARQUEE SECTION */}
      <section className="marquee-section">
        <div className="marquee-track">
          <div className="marquee-item">{t.marquee.text1} <div className="marquee-sep"></div></div>
          <div className="marquee-item">{t.marquee.text2} <div className="marquee-sep"></div></div>
          <div className="marquee-item">{t.marquee.text3} <div className="marquee-sep"></div></div>
          <div className="marquee-item">{t.marquee.text4} <div className="marquee-sep"></div></div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="gallery-section" style={{ padding: '100px 40px', maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="section-header">
          <span className="section-label">{t.gallery.label}</span>
          <h2 className="section-title">{t.gallery.title} <span className="highlight">{t.gallery.titleHighlight}</span></h2>
          <p className="section-desc">{t.gallery.desc}</p>
        </div>

        <div className="filter-tabs" style={{ display: 'flex', gap: 6, marginBottom: 52, padding: 6, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, width: 'fit-content', margin: '0 auto 52px' }}>
          {["TODAS", "GRATIS", "PREMIUM"].map(filter => (
            <button
              key={filter}
              className={`filter-tab ${activeFilter === filter ? 'active' : ''}`}
              style={{ background: activeFilter === filter ? 'linear-gradient(135deg, var(--pink), #c4006e)' : 'none', color: activeFilter === filter ? '#fff' : 'var(--text-muted)', border: 'none', padding: '9px 20px', borderRadius: 8, cursor: 'pointer', fontFamily: 'var(--font-montserrat)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}
              onClick={() => setActiveFilter(filter)}
            >
              {filter === "TODAS" ? t.gallery.filterAll : filter === "GRATIS" ? t.gallery.filterFree : t.gallery.filterPremium}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px', color: 'var(--text-muted)' }}>Cargando catálogo...</div>
        ) : (
          <div className="gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
            {filteredTemplates.map((template) => (
              <Link href={`/crear?template=${template.id}`} key={template.id} className="template-card" style={{ textDecoration: 'none', position: 'relative', borderRadius: 20, overflow: 'hidden', border: '1px solid var(--border)', display: 'block', transition: 'all 0.3s ease' }}>
                <div className="card-visual" style={{ 
                  position: 'relative', overflow: 'hidden', height: 420, 
                  background: template.pillar === 'futuristic' ? 'linear-gradient(160deg, #1a0515 0%, #050510 100%)' : 'linear-gradient(160deg, #050505 0%, #1a1a2e 100%)'
                }}>
                  {/* Decorative Background for Previews */}
                  <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,31,142,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,31,142,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 1}}></div>
                  <div style={{ position: 'absolute', top: '20%', left: '10%', width: '150px', height: '150px', background: 'var(--pink)', filter: 'blur(80px)', opacity: 0.15 }}></div>
                  
                  {/* Glass Card Placeholder */}
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '70%', height: '60%', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: 40, opacity: 0.3 }}>✨</div>
                  </div>

                  <div className="card-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(10,0,8,0.85)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, opacity: 0, transition: 'opacity 0.3s ease', padding: 24}}>
                    <span className="overlay-tag" style={{ fontSize: 10, color: 'var(--pink)', textTransform: 'uppercase', background: 'var(--pink-dim)', border: '1px solid var(--border-pink)', padding: '5px 12px', borderRadius: 100}}>{template.tags[0]}</span>
                    <h3 className="overlay-title" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 24, fontWeight: 900, color: 'var(--text)', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '-0.02em'}}>{template.name}</h3>
                    <button className="btn-design-now" style={{ background: 'linear-gradient(135deg, var(--pink), var(--orange))', color: '#fff', border: 'none', padding: '14px 28px', borderRadius: 10, fontFamily: 'var(--font-montserrat)', fontSize: 12, fontWeight: 800, cursor: 'pointer', display: 'flex', gap: 8, alignItems: 'center', boxShadow: '0 8px 20px var(--pink-glow)'}}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                      PERSONALIZAR
                    </button>
                  </div>
                </div>
                <div className="card-footer" style={{ padding: '16px 20px', background: '#0a0a0c', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)'}}>
                  <div>
                    <div className="card-name" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 14, fontWeight: 800, color: 'var(--text)', textTransform: 'uppercase'}}>{template.name}</div>
                    <div className="card-edition" style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, marginTop: 2, letterSpacing: '0.05em' }}>{template.category} EDITION</div>
                  </div>
                  {template.free ? (
                    <div className="card-free" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, fontWeight: 800, color: '#00e5a0', background: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.25)', padding: '5px 12px', borderRadius: 8 }}>GRATIS</div>
                  ) : (
                    <div className="card-price" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, fontWeight: 900, color: 'var(--pink)', background: 'var(--pink-dim)', border: '1px solid var(--border-pink)', padding: '5px 12px', borderRadius: 8 }}>${template.price}</div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* METHODOLOGY SECTION */}
      <section id="method" className="method-section" style={{ padding: '100px 40px', maxWidth: 1200, margin: '80px auto', position: 'relative', zIndex: 1 }}>
        <div className="method-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 80, alignItems: 'center' }}>
          <div className="method-visual" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', inset: -40, background: 'radial-gradient(circle, var(--pink-dim) 0%, transparent 70%)', filter: 'blur(60px)', opacity: 0.3 }}></div>
            <div className="method-mockup" style={{ background: '#080808', border: '1px solid var(--border)', borderRadius: 40, padding: 12, boxShadow: '0 40px 100px rgba(0,0,0,0.8)' }}>
               <div style={{ background: '#000', border: '4px solid #1a1a1a', borderRadius: 32, overflow: 'hidden', aspectRatio: '9/19', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: 24, background: '#000', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)', width: 60, height: 12, background: '#0a0a0a', borderRadius: 10 }}></div>
                  </div>
                  <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
                      <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, var(--pink), var(--orange))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900 }}>A</div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 800 }}>Sorpresa de Andrea</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Para ti de Luis</div>
                      </div>
                    </div>
                    <div style={{ flex: 1, background: 'var(--surface)', borderRadius: 20, border: '1px solid var(--border)', padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                       <div style={{ width: '100%', height: 150, borderRadius: 12, background: 'var(--pink-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>💝</div>
                       <div style={{ width: '80%', height: 8, background: 'var(--border)', borderRadius: 10 }}></div>
                       <div style={{ width: '100%', height: 8, background: 'var(--border)', borderRadius: 10 }}></div>
                       <div style={{ width: '60%', height: 8, background: 'var(--border)', borderRadius: 10 }}></div>
                    </div>
                    <div style={{ marginTop: 32, width: '100%', height: 50, borderRadius: 14, background: 'linear-gradient(135deg, var(--pink), var(--orange))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, color: '#fff', letterSpacing: '0.05em' }}>ABRIR REGALO</div>
                  </div>
               </div>
            </div>
          </div>

          <div className="method-content">
            <span className="section-label">{t.method.label}</span>
            <h2 className="section-title" style={{ fontSize: 52, lineHeight: 1, marginBottom: 24 }}>{t.method.title} <span className="highlight">{t.method.titleHighlight}</span></h2>
            <p className="section-desc" style={{ marginLeft: 0, textAlign: 'left', fontSize: 18, color: 'var(--text-muted)', marginBottom: 48 }}>{t.method.desc}</p>

            <div className="method-steps" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { num: "01", title: t.method.step1, desc: t.method.step1Desc },
                { num: "02", title: t.method.step2, desc: t.method.step2Desc },
                { num: "03", title: t.method.step3, desc: t.method.step3Desc }
              ].map(step => (
                <div key={step.num} className="method-step" style={{ display: 'flex', gap: 20, alignItems: 'center', padding: '24px 32px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, transition: 'transform 0.3s ease' }}>
                  <div className="step-num" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 32, fontWeight: 900, background: 'linear-gradient(135deg, var(--pink), var(--orange))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', width: 45, flexShrink: 0}}>{step.num}</div>
                  <div className="step-content">
                    <div className="step-title" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 16, fontWeight: 800, textTransform: 'uppercase', marginBottom: 4, letterSpacing: '0.05em'}}>{step.title}</div>
                    <div className="step-desc" style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5}}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="pricing-section" style={{ padding: '120px 40px', maxWidth: 1000, margin: '80px auto', position: 'relative', zIndex: 1 }}>
        <div className="section-header">
           <span className="section-label">{t.pricing.label}</span>
           <h2 className="section-title">{t.pricing.title} <span className="highlight">{t.pricing.titleHighlight}</span></h2>
           <p className="section-desc">{t.pricing.desc}</p>
        </div>
        <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
           
           <div className="pricing-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 28, padding: 48, transition: 'all 0.3s ease' }}>
             <div style={{ color: 'var(--text-muted)', fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>BÁSICO</div>
             <div className="pricing-name" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 32, fontWeight: 900, color: 'var(--text)', marginBottom: 12, lineHeight: 1, textTransform: 'uppercase'}}>{t.pricing.freemium}</div>
             <div className="pricing-price" style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 32}}>
                <span style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-muted)'}}>$</span>
                <span style={{ fontSize: 64, fontWeight: 900, background: 'linear-gradient(135deg, var(--pink), var(--orange))', inlineSize: 'fit-content', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{t.pricing.freemiumPrice}</span>
             </div>
             <ul className="pricing-features" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 48 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: 'var(--text-muted)'}}>
                   <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#00e5a0', fontWeight: 900}}>✓</div>
                   {t.pricing.freemiumDesc}
                </li>
             </ul>
             <Link href="/crear" style={{ display: 'block', width: '100%', padding: 18, borderRadius: 14, fontFamily: 'var(--font-montserrat)', fontSize: 14, fontWeight: 800, textAlign: 'center', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text)', textTransform: 'uppercase', transition: 'background 0.3s ease' }}>
               {t.pricing.btnChoose}
             </Link>
           </div>
           
           <div className="pricing-card featured" style={{ background: 'linear-gradient(160deg, rgba(255,31,142,0.08) 0%, #0a0a0c 100%)', border: '1px solid var(--border-pink)', borderRadius: 28, padding: 48, position: 'relative', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.6)' }}>
             <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, var(--pink), var(--orange))', boxShadow: '0 0 20px var(--pink)'}}></div>
             <div className="featured-badge" style={{ position: 'absolute', top: 24, right: 24, background: 'linear-gradient(135deg, var(--pink), var(--orange))', color: '#fff', fontFamily: 'var(--font-montserrat)', fontSize: 10, fontWeight: 900, padding: '6px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.05em' }} >MÁS POPULAR</div>
             
             <div style={{ color: 'var(--pink)', fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>VIP EXPERIENCE</div>
             <div className="pricing-name" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 32, fontWeight: 900, color: 'var(--text)', marginBottom: 12, lineHeight: 1, textTransform: 'uppercase'}}>{t.pricing.premium}</div>
             <div className="pricing-price" style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 32}}>
                <span style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-muted)'}}>$</span>
                <span style={{ fontSize: 64, fontWeight: 900, background: 'linear-gradient(135deg, var(--pink), var(--orange))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{t.pricing.premiumPrice}</span>
             </div>
             <ul className="pricing-features" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 48 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: 'var(--text-muted)'}}>
                   <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--pink-dim)', border: '1px solid var(--border-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'var(--pink)', fontWeight: 900}}>✓</div>
                   {t.pricing.premiumDesc}
                </li>
             </ul>
             <Link href="/crear" style={{ display: 'block', width: '100%', padding: 18, borderRadius: 14, fontFamily: 'var(--font-montserrat)', fontSize: 14, fontWeight: 800, textAlign: 'center', textDecoration: 'none', background: 'linear-gradient(135deg, var(--pink), var(--orange))', color: '#fff', textTransform: 'uppercase', boxShadow: '0 10px 30px var(--pink-glow)', transition: 'transform 0.3s ease' }}>
               {t.pricing.btnChoose}
             </Link>
           </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '60px 40px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1, flexWrap: 'wrap', gap: 20 }}>
        <div className="footer-brand" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em'}}>
          © 2026 <strong>LINKSURPRISE</strong>
        </div>
        
        {/* HIDDEN ADMIN LINK: The dot next to "Términos" */}
        <ul className="footer-links" style={{ display: 'flex', gap: 32, listStyle: 'none', alignItems: 'center'}}>
           <li><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Privacidad</a></li>
           <li style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
             <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Términos</a>
             <Link href="/admin/login" style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--border)', display: 'block', textDecoration: 'none', opacity: 0.5 }} title="."></Link>
           </li>
        </ul>
      </footer>

      <style jsx>{`
        .template-card:hover .card-overlay {
          opacity: 1 !important;
        }
        .template-card:hover {
          transform: translateY(-8px);
          border-color: var(--pink) !important;
          box-shadow: 0 20px 40px rgba(255, 31, 142, 0.1);
        }
        .method-step:hover {
          transform: translateX(10px);
          background: var(--surface2) !important;
          border-color: var(--pink-dim) !important;
        }
        .pricing-card:hover {
          transform: translateY(-5px);
          border-color: var(--pink-dim);
        }
      `}</style>
    </>
  );
}
