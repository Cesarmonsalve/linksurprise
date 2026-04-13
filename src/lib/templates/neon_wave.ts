// ═══════════════════════════════════════════════════════════════
// STYLE #19: NEON WAVE — Synthwave Retro
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput } from './index';

export function renderNeonWave(d: TemplateRenderData): TemplateOutput {
  const css = `
    body { background: #0a001a; overflow-x: hidden; }
    
    /* Synthwave sunset */
    .synth-sunset {
      position: fixed; bottom: 0; left: 0; width: 100%; height: 50%;
      background: linear-gradient(to top,
        #ff006640 0%,
        #ff660020 30%,
        transparent 100%
      );
      z-index: 0;
    }
    
    /* Retro grid perspective */
    .retro-grid {
      position: fixed; bottom: 0; left: -50%; width: 200%; height: 50%; z-index: 1;
      background:
        repeating-linear-gradient(90deg, ${d.accentColor}15 0px, transparent 1px, transparent 60px),
        repeating-linear-gradient(0deg, ${d.accentColor}15 0px, transparent 1px, transparent 60px);
      transform: perspective(300px) rotateX(50deg);
      transform-origin: center bottom;
      animation: retroGridScroll 3s linear infinite;
    }
    @keyframes retroGridScroll { to { background-position: 0 60px; } }
    
    /* Sun */
    .neon-sun {
      position: fixed; bottom: 20%; left: 50%; transform: translateX(-50%);
      width: 200px; height: 200px; border-radius: 50%; z-index: 0;
      background: linear-gradient(to bottom, #ff006680, #ff990060);
      box-shadow: 0 0 80px #ff006640, 0 0 120px #ff990020;
      mask-image: repeating-linear-gradient(0deg, #000 0px, #000 4px, transparent 4px, transparent 8px);
      -webkit-mask-image: repeating-linear-gradient(0deg, #000 0px, #000 4px, transparent 4px, transparent 8px);
    }
    
    .neon-shell {
      position: relative; z-index: 10; min-height: 100vh;
      display: flex; align-items: center; justify-content: center; padding: 2rem;
    }
    .neon-card {
      max-width: 460px; width: 100%; text-align: center; padding: 3rem 2rem;
      background: rgba(10,0,26,0.7);
      backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
      border: 1px solid ${d.accentColor}30;
      border-radius: 4px;
      box-shadow: 0 0 50px ${d.accentColor}10;
      opacity: 0; animation: neonIn 1s cubic-bezier(0.22,1,0.36,1) 0.5s forwards;
    }
    @keyframes neonIn { to { opacity: 1; } }
    
    .neon-glow-text {
      font-size: clamp(2rem, 7vw, 3rem); font-weight: 900;
      color: #fff; text-transform: uppercase; letter-spacing: 0.05em;
      text-shadow: 0 0 10px ${d.accentColor}, 0 0 30px ${d.accentColor}80, 0 0 60px ${d.accentColor}40;
      line-height: 1.2; margin-bottom: 1.5rem;
    }
    .neon-label { font-size: 0.65rem; letter-spacing: 0.4em; color: ${d.accentColor}; text-transform: uppercase; margin-bottom: 1rem; text-shadow: 0 0 10px ${d.accentColor}; }
    .neon-msg { font-size: 0.95rem; line-height: 1.8; color: #fff; opacity: 0.7; margin: 1.5rem 0; }
    .neon-photo {
      width: 100%; max-width: 280px; border-radius: 4px; margin: 1.5rem auto; display: block;
      border: 2px solid ${d.accentColor}40;
      box-shadow: 0 0 20px ${d.accentColor}20;
    }
    .neon-divider { width: 100%; height: 1px; background: linear-gradient(90deg, transparent, ${d.accentColor}60, transparent); margin: 1.5rem 0; }
    .neon-sender { font-size: 0.8rem; color: #ffffff50; font-family: monospace; }
    .neon-sender strong { color: ${d.accentColor}; text-shadow: 0 0 10px ${d.accentColor}80; }
    
    @media (max-width: 480px) {
      .neon-card { padding: 2rem 1.5rem; }
      .neon-sun { width: 150px; height: 150px; }
    }
  `;

  const html = `
    <div class="synth-sunset"></div>
    <div class="neon-sun"></div>
    <div class="retro-grid"></div>
    <div class="neon-shell">
      <div class="neon-card">
        <p class="neon-label">// TRANSMISIÓN PARA</p>
        <h1 class="neon-glow-text">${d.recipientName || 'TI'}</h1>
        <div class="neon-divider"></div>
        <p class="neon-msg" id="type-target"></p>
        ${d.imageUrl ? `<img class="neon-photo" src="${d.imageUrl}" alt="Neon" />` : ''}
        <div class="neon-divider"></div>
        <p class="neon-sender">FROM: <strong>${d.senderName || 'UNKNOWN'}</strong></p>
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
        setTimeout(type, 30);
      }
    }
    setTimeout(type, 1200);
    document.body.addEventListener('click', () => { const a = document.getElementById('bg-music'); if(a){a.play();} }, {once:true});
  `;

  return { css, html, js };
}
