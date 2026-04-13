// ═══════════════════════════════════════════════════════════════
// STYLE #15: SOFT STACK — Stacked Cards with Depth
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput } from './index';

export function renderSoftStack(d: TemplateRenderData): TemplateOutput {
  const css = `
    body { background: #f0eee8; overflow-x: hidden; }
    
    .stack-shell {
      min-height: 100vh; padding: 2rem;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 16px;
    }
    
    .stack-card {
      width: 100%; max-width: 400px;
      background: #fff; border-radius: 24px;
      padding: 2rem; box-shadow: 0 4px 16px rgba(0,0,0,0.04);
      transition: transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s;
      opacity: 0; transform: translateY(30px);
    }
    .stack-card:hover {
      transform: translateY(-4px) !important;
      box-shadow: 0 16px 40px rgba(0,0,0,0.08);
    }
    .stack-card.visible { opacity: 1; transform: translateY(0); }
    
    .stack-pill {
      display: inline-block; padding: 6px 16px;
      background: ${d.accentColor}15; color: ${d.accentColor};
      border-radius: 100px; font-size: 0.7rem; font-weight: 600;
      letter-spacing: 0.1em; margin-bottom: 1rem;
    }
    .stack-name {
      font-size: 2rem; font-weight: 800; color: #1a1a1a;
      letter-spacing: -0.03em; margin-bottom: 0.5rem;
    }
    .stack-msg {
      font-size: 0.95rem; line-height: 1.8; color: #555;
    }
    .stack-photo {
      width: 100%; border-radius: 18px; display: block;
      aspect-ratio: 4/3; object-fit: cover;
    }
    .stack-photo-card { padding: 0; overflow: hidden; }
    .stack-sender { font-size: 0.8rem; color: #999; }
    .stack-sender strong { color: ${d.accentColor}; }
    .stack-emoji { font-size: 3.5rem; display: block; margin-bottom: 0.5rem; }
    
    /* Gradient card */
    .stack-gradient {
      background: linear-gradient(135deg, ${d.accentColor}, ${d.accentColor}cc);
      color: #fff;
    }
    .stack-gradient .stack-msg { color: #ffffffcc; }
    .stack-gradient .stack-sender { color: #ffffff80; }
    .stack-gradient .stack-sender strong { color: #fff; }
    
    @media (max-width: 380px) {
      .stack-card { padding: 1.5rem; border-radius: 20px; }
    }
  `;

  const html = `
    <div class="stack-shell">
      <div class="stack-card">
        <span class="stack-emoji">💝</span>
        <span class="stack-pill">Dedicatoria</span>
        <h1 class="stack-name">${d.recipientName || 'Para ti'}</h1>
      </div>
      
      ${d.imageUrl ? `
      <div class="stack-card stack-photo-card">
        <img class="stack-photo" src="${d.imageUrl}" alt="Foto" />
      </div>
      ` : ''}
      
      <div class="stack-card">
        <p class="stack-msg" id="type-target"></p>
      </div>
      
      <div class="stack-card stack-gradient" style="text-align:center;">
        <p class="stack-sender">Con cariño, <strong>${d.senderName || 'Alguien'}</strong></p>
      </div>
    </div>
  `;

  const js = `
    // Staggered reveal
    const cards = document.querySelectorAll('.stack-card');
    cards.forEach((card, idx) => {
      setTimeout(() => card.classList.add('visible'), 200 + idx * 200);
    });
    
    // Typewriter
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
    setTimeout(type, 1000);
    document.body.addEventListener('click', () => { const a = document.getElementById('bg-music'); if(a){a.play();} }, {once:true});
  `;

  return { css, html, js };
}
