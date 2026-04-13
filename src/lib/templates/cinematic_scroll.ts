// ═══════════════════════════════════════════════════════════════
// STYLE #8: CINEMATIC SCROLL — Deep Parallax Storytelling
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput } from './index';

export function renderCinematicScroll(d: TemplateRenderData): TemplateOutput {
  const paragraphs = d.escapedMessage.split('<br/>').filter((p: string) => p.trim() !== '');

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');
    body { background: #050505; margin: 0; overflow-x: hidden; }
    
    /* Letterbox bars */
    .letterbox-top, .letterbox-bottom {
      position: fixed; left: 0; width: 100%; height: 50px; background: #000; z-index: 50;
    }
    .letterbox-top { top: 0; }
    .letterbox-bottom { bottom: 0; }
    
    .cine-noise {
      position: fixed; inset: 0; z-index: 40; pointer-events: none; opacity: 0.03;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }
    
    .cine-panel {
      min-height: 100vh; display: flex; align-items: center; justify-content: center;
      padding: 80px 2rem; position: relative;
    }
    .cine-inner {
      max-width: 500px; width: 100%; text-align: center;
      opacity: 0; transform: translateY(60px);
      transition: all 1.2s cubic-bezier(0.22,1,0.36,1);
    }
    .cine-inner.visible { opacity: 1; transform: translateY(0); }
    
    .cine-label { font-size: 0.7rem; letter-spacing: 0.3em; color: ${d.accentColor}; text-transform: uppercase; margin-bottom: 1rem; }
    .cine-title {
      font-family: 'Playfair Display', serif; font-weight: 900;
      font-size: clamp(2rem, 7vw, 3.5rem); color: ${d.textColor};
      line-height: 1.15; margin-bottom: 1rem;
    }
    .cine-text {
      font-family: 'Playfair Display', serif;
      font-size: 1.3rem; line-height: 1.9; color: ${d.textColor}; opacity: 0.75;
    }
    .cine-divider { width: 60px; height: 2px; background: ${d.accentColor}; margin: 2rem auto; border-radius: 2px; }
    .cine-photo {
      width: 100%; max-width: 350px; border-radius: 12px; margin: 2rem auto; display: block;
      box-shadow: 0 30px 80px rgba(0,0,0,0.6);
    }
    .cine-sender {
      font-family: 'Playfair Display', serif; font-style: italic;
      font-size: 1rem; color: ${d.textColor}60;
    }
    .cine-sender strong { color: ${d.accentColor}; font-style: normal; }
    .cine-scroll-hint {
      position: fixed; bottom: 60px; left: 50%; transform: translateX(-50%);
      font-size: 0.7rem; letter-spacing: 0.2em; color: ${d.accentColor};
      z-index: 45; animation: cineFloat 2s infinite;
    }
    @keyframes cineFloat { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(10px); } }
    
    @media (max-width: 480px) {
      .letterbox-top, .letterbox-bottom { height: 30px; }
      .cine-panel { padding: 50px 1.5rem; }
    }
  `;

  let panelsHTML = '';
  // Panel 1: Hero
  panelsHTML += `
    <section class="cine-panel">
      <div class="cine-inner">
        <p class="cine-label">Para ${d.recipientName || 'ti'}</p>
        <h1 class="cine-title">${paragraphs[0] || d.escapedMessage}</h1>
      </div>
    </section>
  `;
  // Panel 2: Photo
  if (d.imageUrl) {
    panelsHTML += `
      <section class="cine-panel">
        <div class="cine-inner">
          <img class="cine-photo" src="${d.imageUrl}" alt="Momento" />
          ${paragraphs[1] ? `<p class="cine-text" style="margin-top:2rem;">${paragraphs[1]}</p>` : ''}
        </div>
      </section>
    `;
  }
  // Remaining panels
  const startIdx = d.imageUrl ? 2 : 1;
  for (let i = startIdx; i < paragraphs.length; i++) {
    panelsHTML += `
      <section class="cine-panel">
        <div class="cine-inner">
          <p class="cine-text">${paragraphs[i]}</p>
        </div>
      </section>
    `;
  }
  // Final panel
  panelsHTML += `
    <section class="cine-panel">
      <div class="cine-inner">
        <div class="cine-divider"></div>
        <p class="cine-sender">Con cariño, <strong>${d.senderName || 'Alguien especial'}</strong></p>
      </div>
    </section>
  `;

  const html = `
    <div class="letterbox-top"></div>
    <div class="letterbox-bottom"></div>
    <div class="cine-noise"></div>
    <div class="cine-scroll-hint">DESLIZA ↓</div>
    ${panelsHTML}
  `;

  const js = `
    // Fade-in-on-scroll
    const panels = document.querySelectorAll('.cine-inner');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.3 });
    panels.forEach(p => obs.observe(p));
    
    // Hide scroll hint after first scroll
    let scrolled = false;
    window.addEventListener('scroll', () => {
      if (!scrolled) {
        document.querySelector('.cine-scroll-hint').style.opacity = '0';
        scrolled = true;
      }
    });
    
    document.body.addEventListener('click', () => { const a = document.getElementById('bg-music'); if(a){a.play();} }, {once:true});
  `;

  return { css, html, js };
}
