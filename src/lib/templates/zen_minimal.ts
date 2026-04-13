// ═══════════════════════════════════════════════════════════════
// STYLE #13: ZEN MINIMAL — Breathing Whitespace
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput } from './index';

export function renderZenMinimal(d: TemplateRenderData): TemplateOutput {
  const css = `
    body { background: #fefefe; overflow-x: hidden; }
    
    .zen-shell {
      min-height: 100vh; padding: 3rem 2rem;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      text-align: center;
    }
    
    /* Breathing circle */
    .zen-circle {
      width: 80px; height: 80px; border-radius: 50%;
      border: 2px solid ${d.accentColor}30;
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 3rem;
      animation: breathe 4s ease-in-out infinite;
    }
    @keyframes breathe {
      0%, 100% { transform: scale(1); opacity: 0.6; }
      50% { transform: scale(1.15); opacity: 1; }
    }
    .zen-dot {
      width: 8px; height: 8px; border-radius: 50%; background: ${d.accentColor};
    }
    
    .zen-label {
      font-size: 0.65rem; letter-spacing: 0.4em; color: #999;
      text-transform: uppercase; margin-bottom: 2rem; font-weight: 500;
    }
    .zen-title {
      font-size: clamp(1.5rem, 5vw, 2rem); font-weight: 300;
      color: #1a1a1a; line-height: 1.7; max-width: 420px;
      letter-spacing: -0.01em;
    }
    .zen-divider {
      width: 1px; height: 60px; background: ${d.accentColor}40;
      margin: 3rem auto;
    }
    .zen-photo {
      max-width: 260px; width: 90%; border-radius: 200px;
      aspect-ratio: 1; object-fit: cover;
      box-shadow: 0 20px 40px rgba(0,0,0,0.06);
    }
    .zen-sender {
      font-size: 0.8rem; color: #999; font-weight: 300; margin-top: 3rem;
    }
    .zen-sender strong { color: ${d.accentColor}; font-weight: 500; }
    
    /* Fade reveal on load */
    .zen-reveal {
      opacity: 0; transform: translateY(20px);
      animation: zenFade 1.5s cubic-bezier(0.22,1,0.36,1) forwards;
    }
    .zen-reveal:nth-child(2) { animation-delay: 0.2s; }
    .zen-reveal:nth-child(3) { animation-delay: 0.4s; }
    .zen-reveal:nth-child(4) { animation-delay: 0.6s; }
    .zen-reveal:nth-child(5) { animation-delay: 0.8s; }
    .zen-reveal:nth-child(6) { animation-delay: 1s; }
    .zen-reveal:nth-child(7) { animation-delay: 1.2s; }
    @keyframes zenFade { to { opacity: 1; transform: translateY(0); } }
  `;

  const html = `
    <div class="zen-shell">
      <div class="zen-circle zen-reveal"><div class="zen-dot"></div></div>
      <p class="zen-label zen-reveal">Para ${d.recipientName || 'ti'}</p>
      <h1 class="zen-title zen-reveal" id="type-target"></h1>
      <div class="zen-divider zen-reveal"></div>
      ${d.imageUrl ? `<img class="zen-photo zen-reveal" src="${d.imageUrl}" alt="Momento" />` : ''}
      <div class="zen-divider zen-reveal"></div>
      <p class="zen-sender zen-reveal">De <strong>${d.senderName || 'alguien'}</strong></p>
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
        setTimeout(type, 45);
      }
    }
    setTimeout(type, 1500);
    document.body.addEventListener('click', () => { const a = document.getElementById('bg-music'); if(a){a.play();} }, {once:true});
  `;

  return { css, html, js };
}
