// ═══════════════════════════════════════════════════════════════
// STYLE #11: BENTO PASTEL — Modular Bento Grid
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput } from './index';

export function renderBentoPastel(d: TemplateRenderData): TemplateOutput {
  const css = `
    body { background: #faf8f5; overflow-x: hidden; }
    
    .bento-shell {
      min-height: 100vh; padding: 2rem;
      display: flex; align-items: center; justify-content: center;
    }
    
    .bento-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto;
      gap: 12px;
      max-width: 440px; width: 100%;
      opacity: 0; animation: bentoIn 1s cubic-bezier(0.22,1,0.36,1) 0.3s forwards;
    }
    @keyframes bentoIn { to { opacity: 1; } }
    
    .bento-cell {
      background: #fff;
      border-radius: 22px;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s;
      cursor: default;
    }
    .bento-cell:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 30px rgba(0,0,0,0.08);
    }
    
    /* Span full width */
    .bento-wide { grid-column: 1 / -1; }
    
    /* Color accents */
    .bento-accent { background: ${d.accentColor}15; }
    .bento-dark { background: #1a1a1a; color: #fff; }
    
    .bento-emoji { font-size: 3rem; margin-bottom: 0.5rem; }
    .bento-label {
      font-size: 0.65rem; letter-spacing: 0.25em; text-transform: uppercase;
      color: ${d.accentColor}; font-weight: 600; margin-bottom: 0.3rem;
    }
    .bento-name {
      font-size: 1.8rem; font-weight: 800; color: #1a1a1a;
      letter-spacing: -0.03em; line-height: 1.1;
    }
    .bento-msg {
      font-size: 0.95rem; line-height: 1.7; color: #1a1a1a; opacity: 0.7;
    }
    .bento-dark .bento-msg { color: #fff; opacity: 0.7; }
    .bento-photo {
      width: 100%; border-radius: 16px; display: block;
      aspect-ratio: 1; object-fit: cover;
    }
    .bento-sender {
      font-size: 0.8rem; color: #1a1a1a; opacity: 0.4;
    }
    .bento-sender strong { color: ${d.accentColor}; opacity: 1; }
    
    /* Pastel tints */
    .bento-pink { background: #fce4ec; }
    .bento-blue { background: #e3f2fd; }
    .bento-mint { background: #e8f5e9; }
    .bento-peach { background: #fff3e0; }
    
    @media (max-width: 380px) {
      .bento-grid { grid-template-columns: 1fr; gap: 10px; }
      .bento-cell { padding: 1.2rem; }
    }
  `;

  const html = `
    <div class="bento-shell">
      <div class="bento-grid">
        <div class="bento-cell bento-wide bento-accent" style="text-align:center;">
          <div class="bento-emoji">💝</div>
          <p class="bento-label">Dedicatoria especial</p>
          <h1 class="bento-name">${d.recipientName || 'Para ti'}</h1>
        </div>
        
        ${d.imageUrl ? `
        <div class="bento-cell" style="padding:0;overflow:hidden;">
          <img class="bento-photo" src="${d.imageUrl}" alt="Foto" />
        </div>
        <div class="bento-cell bento-mint" style="display:flex;align-items:center;">
          <p class="bento-msg" id="type-target"></p>
        </div>
        ` : `
        <div class="bento-cell bento-wide bento-mint">
          <p class="bento-msg" id="type-target"></p>
        </div>
        `}
        
        <div class="bento-cell bento-dark bento-wide" style="text-align:center;">
          <p class="bento-sender">Con amor, <strong>${d.senderName || 'Alguien'}</strong></p>
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
        setTimeout(type, 30);
      }
    }
    setTimeout(type, 800);
    
    // Staggered cell reveal
    const cells = document.querySelectorAll('.bento-cell');
    cells.forEach((cell, idx) => {
      cell.style.opacity = '0';
      cell.style.transform = 'translateY(20px)';
      setTimeout(() => {
        cell.style.transition = 'all 0.6s cubic-bezier(0.22,1,0.36,1)';
        cell.style.opacity = '1';
        cell.style.transform = 'translateY(0)';
      }, 300 + idx * 150);
    });
    
    document.body.addEventListener('click', () => { const a = document.getElementById('bg-music'); if(a){a.play();} }, {once:true});
  `;

  return { css, html, js };
}
