// ═══════════════════════════════════════════════════════════════
// STYLE #8: CINEMATIC SCROLL — Deep Parallax Storytelling
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput } from './index';

export function renderCinematicScroll(d: TemplateRenderData): TemplateOutput {
  const isBasic = d.renderMode === 'basic';
  const paragraphs = d.escapedMessage.split('<br/>').filter((p: string) => p.trim() !== '');

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');
    body { background: #050505; margin: 0; overflow-x: hidden; font-family: 'Playfair Display', serif; }
    
    .letterbox-top, .letterbox-bottom { position: fixed; left: 0; width: 100%; height: 50px; background: #000; z-index: 50; }
    .letterbox-top { top: 0; } .letterbox-bottom { bottom: 0; }
    .cine-noise { position: fixed; inset: 0; z-index: 40; pointer-events: none; opacity: 0.03; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
    
    ${isBasic ? `
    .cine-panel { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 80px 2rem; }
    .cine-inner { max-width: 500px; width: 100%; text-align: center; opacity: 0; transform: translateY(60px); transition: all 1.2s; }
    .cine-inner.visible { opacity: 1; transform: translateY(0); }
    .cine-label { font-size: 0.7rem; letter-spacing: 0.3em; color: ${d.accentColor}; text-transform: uppercase; margin-bottom: 1rem; }
    .cine-title { font-weight: 900; font-size: clamp(2rem, 7vw, 3.5rem); color: ${d.textColor}; line-height: 1.15; margin-bottom: 1rem; }
    .cine-text { font-size: 1.3rem; line-height: 1.9; color: ${d.textColor}; opacity: 0.75; }
    .cine-divider { width: 60px; height: 2px; background: ${d.accentColor}; margin: 2rem auto; }
    .cine-photo { width: 100%; max-width: 350px; border-radius: 12px; margin: 2rem auto; display: block; }
    .cine-sender { font-style: italic; font-size: 1rem; color: ${d.textColor}60; }
    .cine-sender strong { color: ${d.accentColor}; font-style: normal; }
    .cine-scroll-hint { position: fixed; bottom: 60px; left: 50%; transform: translateX(-50%); font-size: 0.7rem; letter-spacing: 0.2em; color: ${d.accentColor}; z-index: 45; animation: cineFloat 2s infinite; }
    @keyframes cineFloat { 0%,100% { transform: translateX(-50%); } 50% { transform: translateX(-50%) translateY(10px); } }
    `: `
    /* VIP MODE */
    .pin-container { width: 100%; overflow: hidden; }
    .cine-panel { height: 100vh; width: 100vw; display: flex; align-items: center; justify-content: center; position: relative; }
    .cine-inner { max-width: 600px; width: 100%; text-align: center; padding: 0 2rem; position: relative; z-index: 10; }
    
    .cine-label { font-size: 0.8rem; letter-spacing: 0.4em; color: ${d.accentColor}; text-transform: uppercase; margin-bottom: 1rem; }
    .cine-title { font-weight: 900; font-size: clamp(3rem, 10vw, 5rem); color: ${d.textColor}; line-height: 1; margin-bottom: 1rem; text-shadow: 0 10px 30px rgba(0,0,0,0.8); }
    .cine-text { font-size: clamp(1.5rem, 5vw, 2.5rem); line-height: 1.6; color: ${d.textColor}; text-shadow: 0 5px 15px rgba(0,0,0,0.8); }
    .cine-photo-cont { perspective: 1000px; width: 100%; max-width: 400px; margin: 0 auto; }
    .cine-photo { width: 100%; border-radius: 4px; box-shadow: 0 30px 60px rgba(0,0,0,0.8); border: 1px solid ${d.textColor}30; }
    
    .cine-sender { font-size: 2rem; color: ${d.accentColor}; margin-top: 2rem; }
    .cine-fin { font-size: 5rem; font-weight: 900; letter-spacing: 10px; color: transparent; -webkit-text-stroke: 2px ${d.accentColor}; margin-top: 5rem; }
    
    .scroll-progress { position: fixed; top: 50px; left: 0; height: 3px; background: ${d.accentColor}; z-index: 60; width: 0%; }
    .cine-scroll-hint { position: fixed; bottom: 60px; left: 50%; transform: translateX(-50%); font-size: 0.7rem; letter-spacing: 0.2em; color: ${d.accentColor}; z-index: 45; animation: cineFloat 2s infinite; font-family: sans-serif; }
    @keyframes cineFloat { 0%,100% { transform: translateX(-50%); } 50% { transform: translateX(-50%) translateY(10px); } }
    
    .bg-image { position: absolute; inset: -10%; background-size: cover; background-position: center; filter: blur(20px) brightness(0.2) grayscale(50%); z-index: 0; }
    `}
    @media (max-width: 480px) { .letterbox-top, .letterbox-bottom { height: 30px; } }
  `;

  let html = '';
  if (isBasic) {
    let panelsHTML = `
      <section class="cine-panel">
        <div class="cine-inner">
          <p class="cine-label">Para ${d.recipientName || 'ti'}</p>
          <h1 class="cine-title">${paragraphs[0] || d.escapedMessage}</h1>
        </div>
      </section>
    `;
    if (d.imageUrl) {
      panelsHTML += `
        <section class="cine-panel">
          <div class="cine-inner">
            <img class="cine-photo" src="${d.imageUrl}" />
            ${paragraphs[1] ? `<p class="cine-text" style="margin-top:2rem;">${paragraphs[1]}</p>` : ''}
          </div>
        </section>
      `;
    }
    const startIdx = d.imageUrl ? 2 : 1;
    for (let i = startIdx; i < paragraphs.length; i++) {
      panelsHTML += `<section class="cine-panel"><div class="cine-inner"><p class="cine-text">${paragraphs[i]}</p></div></section>`;
    }
    panelsHTML += `<section class="cine-panel"><div class="cine-inner"><div class="cine-divider"></div><p class="cine-sender">Con cariño, <strong>${d.senderName || 'Alguien'}</strong></p></div></section>`;
    
    html = `<div class="letterbox-top"></div><div class="letterbox-bottom"></div><div class="cine-noise"></div><div class="cine-scroll-hint">DESLIZA ↓</div>${panelsHTML}`;
  } else {
    // VIP HTML - optimized for ScrollTrigger pin
    html = `
      <div class="letterbox-top"></div><div class="letterbox-bottom"></div>
      <div class="cine-noise"></div>
      <div class="scroll-progress" id="progress-bar"></div>
      <div class="cine-scroll-hint" id="scrim">DESLIZA HACIA ABAJO</div>
      
      <div class="pin-container" id="pin-container">
        ${d.imageUrl ? `<div class="bg-image" style="background-image:url('${d.imageUrl}')"></div>` : ''}
        
        <section class="cine-panel panel-1">
          <div class="cine-inner gs-elem">
            <p class="cine-label">PRESENTANDO A ${d.recipientName || 'TI'}</p>
            <h1 class="cine-title">${d.title}</h1>
          </div>
        </section>
        
        ${d.imageUrl ? `
        <section class="cine-panel panel-img">
          <div class="cine-inner">
            <div class="cine-photo-cont gs-img"><img class="cine-photo" src="${d.imageUrl}" /></div>
          </div>
        </section>` : ''}
    `;
    
    paragraphs.forEach((p, i) => {
      html += `<section class="cine-panel panel-txt"><div class="cine-inner gs-txt"><p class="cine-text">${p}</p></div></section>`;
    });
    
    html += `
        <section class="cine-panel panel-end">
          <div class="cine-inner gs-end">
            <p class="cine-sender">Dirigido y Producido por<br/><strong>${d.senderName || 'Anónimo'}</strong></p>
            <div class="cine-fin">FIN</div>
          </div>
        </section>
      </div>
    `;
  }

  const js = isBasic ? `
    const panels = document.querySelectorAll('.cine-inner');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.3 });
    panels.forEach(p => obs.observe(p));
    
    let scrolled = false;
    window.addEventListener('scroll', () => {
      if(!scrolled) { document.querySelector('.cine-scroll-hint').style.opacity = '0'; scrolled = true; }
    });
    document.body.addEventListener('click', () => { const a = document.getElementById('bg-music'); if(a){a.play();} }, {once:true});
  ` : `
    // VIP GSAP Engine
    gsap.registerPlugin(ScrollTrigger);
    
    // Progress Bar
    gsap.to('#progress-bar', { width: '100%', ease: 'none', scrollTrigger: { trigger: '#pin-container', start: 'top top', end: 'bottom bottom', scrub: true } });
    
    // Hide hint
    ScrollTrigger.create({ trigger: 'body', start: '100px top', onEnter: () => gsap.to('#scrim', {opacity:0}), onLeaveBack: () => gsap.to('#scrim',{opacity:1}) });

    // Panel 1 Intro
    gsap.from('.panel-1 .gs-elem', { y: 100, opacity: 0, duration: 1.5, scrollTrigger: { trigger: '.panel-1', start: 'top center' } });
    gsap.to('.panel-1 .gs-elem', { y: -100, opacity: 0, scrollTrigger: { trigger: '.panel-1', start: 'center top', scrub: true } });
    
    // Image Parallax Effect
    if(document.querySelector('.panel-img')) {
       gsap.from('.gs-img', { rotationX: 45, scale: 0.5, opacity: 0, scrollTrigger: { trigger: '.panel-img', start: 'top 80%', end: 'center center', scrub: 1 } });
       gsap.to('.gs-img', { y: -200, opacity: 0, scrollTrigger: { trigger: '.panel-img', start: 'center top', scrub: true } });
    }
    
    // Text blocks fly in
    document.querySelectorAll('.panel-txt').forEach(panel => {
      const txt = panel.querySelector('.gs-txt');
      gsap.fromTo(txt, 
        { autoAlpha: 0, scale: 2, filter: 'blur(10px)' },
        { autoAlpha: 1, scale: 1, filter: 'blur(0px)', scrollTrigger: { trigger: panel, start: 'top 70%', end: 'center center', scrub: 1 } }
      );
      gsap.to(txt, { autoAlpha: 0, y: -100, scrollTrigger: { trigger: panel, start: 'center top', scrub: true } });
    });
    
    // Finale
    gsap.from('.panel-end .gs-end', { scale: 0.5, opacity: 0, scrollTrigger: { trigger: '.panel-end', start: 'top 70%', end: 'center center', scrub: 1 } });
    
    // Parallax BG
    gsap.to('.bg-image', { yPercent: 20, ease: 'none', scrollTrigger: { trigger: '#pin-container', start: 'top top', end: 'bottom bottom', scrub: true } });

    document.body.addEventListener('click', () => { const a = document.getElementById('bg-music'); if(a){a.play(); gsap.to(a,{volume:0.8, duration:5})} }, {once:true});
  `;

  return { css, html, js };
}
