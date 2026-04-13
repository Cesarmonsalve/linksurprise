// ═══════════════════════════════════════════════════════════════
// STYLE #9: VELVET DARK — Rich Dramatic Luxury
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput } from './index';

export function renderVelvetDark(d: TemplateRenderData): TemplateOutput {
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500&display=swap');
    body { background: #0a0608; overflow-x: hidden; }
    
    .velvet-ambient {
      position: fixed; inset: 0; z-index: 0;
      background:
        radial-gradient(ellipse at 20% 80%, ${d.accentColor}12 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, ${d.accentColor}08 0%, transparent 50%);
    }
    
    .velvet-shell {
      position: relative; z-index: 10; min-height: 100vh;
      display: flex; align-items: center; justify-content: center; padding: 2rem;
    }
    .velvet-card {
      max-width: 460px; width: 100%; text-align: center; padding: 3rem 2rem;
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 32px;
      box-shadow: 0 60px 120px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05);
      opacity: 0; animation: velvetIn 2s cubic-bezier(0.22,1,0.36,1) 0.5s forwards;
    }
    @keyframes velvetIn { to { opacity: 1; } }
    
    .velvet-emoji { font-size: 4rem; margin-bottom: 1.5rem; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.4)); }
    .velvet-label {
      font-family: 'DM Sans', sans-serif; font-weight: 300;
      font-size: 0.75rem; letter-spacing: 0.3em; color: ${d.accentColor};
      text-transform: uppercase; margin-bottom: 0.5rem;
    }
    .velvet-title {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(1.8rem, 6vw, 2.8rem); color: ${d.textColor}; line-height: 1.2;
      margin-bottom: 1.5rem;
    }
    .velvet-msg {
      font-family: 'DM Sans', sans-serif; font-weight: 300;
      font-size: 1rem; line-height: 1.9; color: ${d.textColor}; opacity: 0.7;
    }
    .velvet-divider {
      width: 40px; height: 3px; background: ${d.accentColor}; margin: 2rem auto; border-radius: 3px;
      box-shadow: 0 0 10px ${d.accentColor}40;
    }
    .velvet-photo {
      width: 100%; max-width: 280px; border-radius: 24px; margin: 2rem auto; display: block;
      box-shadow: 0 30px 60px rgba(0,0,0,0.5);
    }
    .velvet-sender {
      font-family: 'DM Sans', sans-serif; font-weight: 300;
      font-size: 0.85rem; color: ${d.textColor}50;
    }
    .velvet-sender strong { color: ${d.accentColor}; font-weight: 500; }
    
    @media (max-width: 480px) { .velvet-card { padding: 2rem 1.5rem; border-radius: 24px; } }
  `;

  const html = `
    <div class="velvet-ambient"></div>
    <div class="velvet-shell">
      <div class="velvet-card">
        <div class="velvet-emoji">🌹</div>
        <p class="velvet-label">Para ${d.recipientName || 'ti'}</p>
        <h1 class="velvet-title" id="type-target"></h1>
        <div class="velvet-divider"></div>
        ${d.imageUrl ? `<img class="velvet-photo" src="${d.imageUrl}" alt="Recuerdo" />` : ''}
        <div class="velvet-divider"></div>
        <p class="velvet-sender">Siempre, <strong>${d.senderName || 'Alguien especial'}</strong></p>
      </div>
    </div>
  `;

  const js = `
    const target = document.getElementById('type-target');
    const txt = "${d.escapedMessage}";
    let i = 0;
    function type() {
      if (i < txt.length) {
        if(txt.substring(i,i+5)==='<br/>'){target.innerHTML+='<br/>';i+=5;}
        else{target.innerHTML+=txt.charAt(i);i++;}
        setTimeout(type, 40);
      }
    }
    setTimeout(type, 1500);
    document.body.addEventListener('click', () => { const a = document.getElementById('bg-music'); if(a){a.play();} }, {once:true});
  `;

  return { css, html, js };
}
