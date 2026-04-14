"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t, language, setLanguage } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("TODAS");

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  const templates = [
    { id: 1, name: t.templates.heartBox, previewUrl: "/mockup1.jpg", price: "9.99", free: false, tags: ["INTERACTIVO", "3D"], category: "PREMIUM" },
    { id: 2, name: t.templates.loveLetter, previewUrl: "/mockup2.jpg", price: "0", free: true, tags: ["ROMANCE", "ANIMADO"], category: "GRATIF" },
    { id: 3, name: t.templates.parallax, previewUrl: "/mockup3.jpg", price: "14.99", free: false, tags: ["ESPECIAL", "EFECTOS"], category: "PREMIUM" },
    { id: 4, name: t.templates.birthday, previewUrl: "/mockup4.jpg", price: "0", free: true, tags: ["CELEBRACIÓN", "NEÓN"], category: "GRATIF" },
  ];

  const filteredTemplates = activeFilter === "TODAS"
    ? templates
    : activeFilter === "GRATIS"
    ? templates.filter(t => t.free)
    : templates.filter(t => !t.free);

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
          <Link href="/admin" className="btn-ghost">{t.nav.login}</Link>
          <Link href="/admin" className="btn-primary" style={{  textDecoration: 'none' }}>{t.nav.dashboard}</Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-bg-img"></div>
        <div className="hero-grid"></div>

        <div className="hero-badge">
          <div className="badge-dot"></div>
          {t.hero.badge}
        </div>

        <h1>
          {t.hero.title1} <span className="highlight">{t.hero.title2}</span> {t.hero.title3}
        </h1>

        <p className="hero-sub">{t.hero.desc}</p>

        <div className="hero-actions">
          <Link href="/admin" className="btn-hero" style={{ textDecoration: 'none' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
            {t.hero.btnPrimary}
          </Link>
          <button onClick={() => document.getElementById('gallery')?.scrollIntoView()} className="btn-hero-ghost">
            {t.hero.btnGhost}
          </button>
        </div>

        <div className="stats-strip">
          <div className="stat-item">
            <div className="stat-num">{t.stats.stat1Num}</div>
            <div className="stat-label">{t.stats.stat1Label}</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">{t.stats.stat2Num}</div>
            <div className="stat-label">{t.stats.stat2Label}</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">{t.stats.stat3Num}</div>
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
          <div className="marquee-item">{t.marquee.text1} <div className="marquee-sep"></div></div>
          <div className="marquee-item">{t.marquee.text2} <div className="marquee-sep"></div></div>
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

        <div className="gallery-grid" style={{ columns: '3 300px', gap: 20 }}>
          {filteredTemplates.map((template) => (
            <Link href="/admin" key={template.id} className="template-card" style={{ textDecoration: 'none', breakInside: 'avoid', marginBottom: 20, position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)', display: 'block' }}>
              <div className="card-visual" style={{ position: 'relative', overflow: 'hidden', height: 400, background: 'var(--surface)'}}>
                {/* Fallback pattern for mockup */}
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,31,142,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.5}}></div>
                
                <div className="card-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(10,0,8,0.85)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, opacity: 0, transition: 'opacity 0.3s ease', padding: 24}}>
                  <span className="overlay-tag" style={{ fontSize: 10, color: 'var(--pink)', textTransform: 'uppercase', background: 'var(--pink-dim)', border: '1px solid var(--border-pink)', padding: '5px 12px', borderRadius: 100}}>{template.tags[0]}</span>
                  <h3 className="overlay-title" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 22, fontWeight: 900, color: 'var(--text)', textAlign: 'center', textTransform: 'uppercase'}}>{template.name}</h3>
                  <button className="btn-design-now" style={{ background: 'linear-gradient(135deg, var(--pink), var(--orange))', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: 8, fontFamily: 'var(--font-montserrat)', fontSize: 12, fontWeight: 800, cursor: 'pointer', display: 'flex', gap: 6, alignItems: 'center'}}>
                    VER
                  </button>
                </div>
              </div>
              <div className="card-footer" style={{ padding: '14px 16px', background: 'rgba(10,0,8,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)'}}>
                <div>
                  <div className="card-name" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, fontWeight: 800, color: 'var(--text)', textTransform: 'uppercase'}}>{template.name}</div>
                  <div className="card-edition" style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500, marginTop: 2 }}>{template.category} EDITION</div>
                </div>
                {template.free ? (
                  <div className="card-free" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, fontWeight: 700, color: '#00e5a0', background: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.25)', padding: '4px 10px', borderRadius: 6 }}>GRATIS</div>
                ) : (
                  <div className="card-price" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, fontWeight: 900, color: 'var(--pink)', background: 'var(--pink-dim)', border: '1px solid var(--border-pink)', padding: '4px 10px', borderRadius: 6 }}>${template.price}</div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* METHODOLOGY SECTION */}
      <section id="method" className="method-section" style={{ padding: '100px 40px', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="method-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', gap: 60, alignItems: 'center' }}>
          <div className="method-visual" style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', border: '1px solid var(--border-pink)', boxShadow: '0 0 60px rgba(255,31,142,0.15)' }}>
            <div className="method-mockup" style={{ background: 'linear-gradient(160deg, #1a0015 0%, #0d000c 60%)', padding: 32, minHeight: 380, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden'}}>
               <div className="mockup-phone" style={{ background: 'var(--surface2)', border: '1px solid var(--border-pink)', borderRadius: 20, padding: 24, maxWidth: 280, margin: '0 auto', position: 'relative', zIndex: 1, boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
                  <div className="phone-header" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, paddingBottom: 14, borderBottom: '1px solid var(--border)'}}>
                    <div className="phone-avatar" style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, var(--pink), var(--orange))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-montserrat)', fontSize: 14, fontWeight: 900, color: '#fff'}} >L</div>
                    <div className="phone-name-block" style={{ flex: 1 }}>
                      <div className="phone-name" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, fontWeight: 800 }}>Luis A.</div>
                      <div className="phone-handle" style={{ fontSize: 11, color: 'var(--text-muted)'}}>@luis</div>
                    </div>
                  </div>
                  <div className="phone-msg" style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.5, marginBottom: 18, fontStyle: 'italic' }}>
                    &quot;¡Mira esta sorpresa interactiva que te preparé!&quot;
                  </div>
                  <button className="phone-cta" style={{ width: '100%', padding: 12, background: 'linear-gradient(135deg, var(--pink), var(--orange))', color: '#fff', border: 'none', borderRadius: 10, fontFamily: 'var(--font-montserrat)', fontSize: 12, fontWeight: 800, cursor: 'pointer', textTransform: 'uppercase' }}>
                    ABRIR SORPRESA
                  </button>
               </div>
            </div>
          </div>

          <div className="method-content">
            <span className="section-label">{t.method.label}</span>
            <h2 className="section-title" style={{ fontSize: 48, marginBottom: 16 }}>{t.method.title} <span className="highlight">{t.method.titleHighlight}</span></h2>
            <p className="section-desc" style={{ marginLeft: 0, textAlign: 'left' }}>{t.method.desc}</p>

            <div className="method-steps" style={{ display: 'flex', flexDirection: 'column', gap: 28, marginTop: 40}}>
              {[
                { num: "01", title: t.method.step1, desc: t.method.step1Desc },
                { num: "02", title: t.method.step2, desc: t.method.step2Desc },
                { num: "03", title: t.method.step3, desc: t.method.step3Desc }
              ].map(step => (
                <div key={step.num} className="method-step" style={{ display: 'flex', gap: 20, alignItems: 'flex-start', padding: 24, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14 }}>
                  <div className="step-num" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 28, fontWeight: 900, background: 'linear-gradient(135deg, var(--pink), var(--orange))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', width: 40, flexShrink: 0}}>{step.num}</div>
                  <div className="step-content">
                    <div className="step-title" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 15, fontWeight: 800, textTransform: 'uppercase', marginBottom: 4}}>{step.title}</div>
                    <div className="step-desc" style={{ fontSize: 13, color: 'var(--text-muted)'}}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROOF/TESTIMONIALS */}
      <section className="proof-section" style={{ padding: '80px 40px', position: 'relative', zIndex: 1, background: 'rgba(255,31,142,0.03)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="section-header">
           <span className="section-label">{t.proof.label}</span>
           <h2 className="section-title">{t.proof.title} <span className="highlight">{t.proof.titleHighlight}</span></h2>
           <p className="section-desc">{t.proof.desc}</p>
        </div>
        <div className="proof-inner" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20}}>
          {[
            { quote: t.proof.quote1, author: t.proof.author1, role: t.proof.role1, l: "C" },
            { quote: t.proof.quote2, author: t.proof.author2, role: t.proof.role2, l: "C" },
            { quote: t.proof.quote3, author: t.proof.author3, role: t.proof.role3, l: "L" },
          ].map((item, i) => (
             <div key={i} className="proof-item" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 32 }}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                   {'★★★★★'.split('').map((s, idx) => <span key={idx} style={{ color: 'var(--pink)'}}>{s}</span>)}
                </div>
                <div className="proof-quote" style={{ fontSize: 15, fontStyle: 'italic', color: 'var(--text)', lineHeight: 1.6, marginBottom: 20 }}>{item.quote}</div>
                <div className="proof-author" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                   <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, var(--pink), var(--orange))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-montserrat)', fontSize: 13, fontWeight: 900, color: '#fff'}} >{item.l}</div>
                   <div>
                     <div style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, fontWeight: 800, textTransform: 'uppercase' }}>{item.author}</div>
                     <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.role}</div>
                   </div>
                </div>
             </div>
          ))}
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="pricing-section" style={{ padding: '100px 40px', maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="section-header">
           <span className="section-label">{t.pricing.label}</span>
           <h2 className="section-title">{t.pricing.title} <span className="highlight">{t.pricing.titleHighlight}</span></h2>
           <p className="section-desc">{t.pricing.desc}</p>
        </div>
        <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) minmax(280px, 1fr)', gap: 20}}>
           
           <div className="pricing-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: 36, position: 'relative' }}>
             <div className="pricing-num" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 20}}>01</div>
             <div className="pricing-name" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 28, fontWeight: 900, color: 'var(--text)', marginBottom: 10, lineHeight: 1, textTransform: 'uppercase'}}>{t.pricing.freemium}</div>
             <div className="pricing-price" style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 28}}>
                <span className="price-currency" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 22, fontWeight: 900, color: 'var(--text-muted)'}}>$</span>
                <span className="price-amount" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 56, fontWeight: 900, background: 'linear-gradient(135deg, var(--pink), var(--orange))', inlineSize: 'fit-content', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{t.pricing.freemiumPrice}</span>
             </div>
             <ul className="pricing-features" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--text-muted)'}}>
                   <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#00e5a0', fontWeight: 700}}>✓</div>
                   {t.pricing.freemiumDesc}
                </li>
             </ul>
             <Link href="/admin" style={{ display: 'block', width: '100%', padding: 14, borderRadius: 10, fontFamily: 'var(--font-montserrat)', fontSize: 13, fontWeight: 800, textAlign: 'center', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--text)', textTransform: 'uppercase' }}>
               {t.pricing.btnChoose}
             </Link>
           </div>
           
           <div className="pricing-card featured" style={{ background: 'linear-gradient(160deg, rgba(255,31,142,0.06) 0%, var(--surface) 100%)', border: '1px solid var(--border-pink)', borderRadius: 20, padding: 36, position: 'relative', overflow: 'hidden' }}>
             <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--pink), var(--orange))', boxShadow: '0 0 20px var(--pink-glow)'}}></div>
             <div className="featured-badge" style={{ position: 'absolute', top: 20, right: 20, background: 'linear-gradient(135deg, var(--pink), var(--orange))', color: '#fff', fontFamily: 'var(--font-montserrat)', fontSize: 10, fontWeight: 800, padding: '5px 12px', borderRadius: 100, textTransform: 'uppercase'}} >PRO</div>
             
             <div className="pricing-num" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 20}}>02</div>
             <div className="pricing-name" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 28, fontWeight: 900, color: 'var(--text)', marginBottom: 10, lineHeight: 1, textTransform: 'uppercase'}}>{t.pricing.premium}</div>
             <div className="pricing-price" style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 28}}>
                <span className="price-currency" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 22, fontWeight: 900, color: 'var(--text-muted)'}}>$</span>
                <span className="price-amount" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 56, fontWeight: 900, background: 'linear-gradient(135deg, var(--pink), var(--orange))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{t.pricing.premiumPrice}</span>
             </div>
             <ul className="pricing-features" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--text-muted)'}}>
                   <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--pink-dim)', border: '1px solid var(--border-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: 'var(--pink)', fontWeight: 700}}>✓</div>
                   {t.pricing.premiumDesc}
                </li>
             </ul>
             <Link href="/admin" style={{ display: 'block', width: '100%', padding: 14, borderRadius: 10, fontFamily: 'var(--font-montserrat)', fontSize: 13, fontWeight: 800, textAlign: 'center', textDecoration: 'none', background: 'linear-gradient(135deg, var(--pink), var(--orange))', color: '#fff', textTransform: 'uppercase', boxShadow: '0 6px 24px var(--pink-glow)' }}>
               {t.pricing.btnChoose}
             </Link>
           </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: 40, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1, flexWrap: 'wrap' }}>
        <div className="footer-brand" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase'}}>
          © 2026 <strong>LINKSURPRISE</strong>
        </div>
        <ul className="footer-links" style={{ display: 'flex', gap: 24, listStyle: 'none'}}>
           <li><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 12, fontWeight: 600, textTransform: 'uppercase' }}>Privacidad</a></li>
           <li><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 12, fontWeight: 600, textTransform: 'uppercase' }}>Términos</a></li>
        </ul>
      </footer>
    </>
  );
}
