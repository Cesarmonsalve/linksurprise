// ═══════════════════════════════════════════════════════════════
// STYLE #12: MONO GRID — Monochrome Systematic
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput } from './index';

export function renderMonoGrid(d: TemplateRenderData): TemplateOutput {
  const css = `
    body { background: #111; overflow-x: hidden; }
    
    .mono-shell {
      min-height: 100vh; padding: 2rem;
      display: flex; align-items: center; justify-content: center;
    }
    .mono-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 2px;
      max-width: 460px; width: 100%; background: #222;
      border: 1px solid #333;
      opacity: 0; animation: monoIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s forwards;
    }
    @keyframes monoIn { to { opacity: 1; } }
    
    .mono-cell {
      background: #111; padding: 1.5rem;
      transition: background 0.3s;
    }
    .mono-cell:hover { background: #1a1a1a; }
    .mono-wide { grid-column: 1 / -1; }
    
    .mono-num { font-size: 3rem; font-weight: 900; color: #333; line-height: 1; margin-bottom: 0.3rem; font-family: monospace; }
    .mono-label { font-size: 0.6rem; letter-spacing: 0.3em; color: #666; text-transform: uppercase; font-weight: 600; }
    .mono-title {
      font-size: clamp(1.5rem, 5vw, 2rem); font-weight: 800; color: #fff;
      letter-spacing: -0.03em; line-height: 1.2;
    }
    .mono-msg { font-size: 0.95rem; line-height: 1.8; color: #aaa; }
    .mono-photo {
      width: 100%; display: block; filter: grayscale(100%);
      transition: filter 0.5s;
      aspect-ratio: 1; object-fit: cover;
    }
    .mono-photo:hover { filter: grayscale(0%); }
    .mono-accent-bar { height: 4px; background: ${d.accentColor}; }
    .mono-sender { font-size: 0.75rem; color: #666; font-family: monospace; }
    .mono-sender strong { color: #fff; }
    
    @media (max-width: 380px) {
      .mono-grid { grid-template-columns: 1fr; }
      .mono-cell { padding: 1.2rem; }
    }
  `;

  const html = `
    <div class="mono-shell">
      <div class="mono-grid">
        <div class="mono-cell mono-wide">
          <div class="mono-accent-bar" style="margin-bottom:1.5rem;width:40px;"></div>
          <p class="mono-label">Para</p>
          <h1 class="mono-title">${d.recipientName || 'Ti'}</h1>
        </div>
        ${d.imageUrl ? `
        <div class="mono-cell" style="padding:0;">
          <img class="mono-photo" src="${d.imageUrl}" alt="Foto" />
        </div>
        <div class="mono-cell" style="display:flex;align-items:center;">
          <p class="mono-msg" id="type-target"></p>
        </div>
        ` : `
        <div class="mono-cell mono-wide">
          <p class="mono-msg" id="type-target"></p>
        </div>
        `}
        <div class="mono-cell mono-wide" style="border-top:2px solid #333;">
          <p class="mono-sender">SRC: <strong>${d.senderName || 'Anónimo'}</strong></p>
        </div>
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
        setTimeout(type, 25);
      }
    }
    setTimeout(type, 1000);
    document.body.addEventListener('click', () => { const a = document.getElementById('bg-music'); if(a){a.play();} }, {once:true});
  `;

  return { css, html, js };
}
