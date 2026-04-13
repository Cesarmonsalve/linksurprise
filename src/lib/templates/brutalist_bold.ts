// ═══════════════════════════════════════════════════════════════
// STYLE #18: BRUTALIST BOLD — Raw Oversized Typography
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput } from './index';

export function renderBrutalistBold(d: TemplateRenderData): TemplateOutput {
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=Bebas+Neue&display=swap');
    body { background: #f5f5f0; overflow-x: hidden; }
    
    .brut-shell {
      min-height: 100vh; padding: 2rem;
      display: flex; flex-direction: column;
      align-items: flex-start; justify-content: center;
      max-width: 600px; margin: 0 auto;
    }
    
    .brut-mega {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(5rem, 20vw, 12rem); color: #111;
      line-height: 0.85; letter-spacing: -0.05em;
      margin-bottom: 1rem;
      opacity: 0; animation: brutSlide 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s forwards;
    }
    @keyframes brutSlide { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
    
    .brut-bar {
      width: 100%; height: 8px; background: #111; margin: 1rem 0;
    }
    .brut-accent-bar {
      width: 120px; height: 8px; background: ${d.accentColor}; margin: 0.5rem 0;
    }
    
    .brut-label {
      font-family: 'Space Grotesk', sans-serif; font-weight: 700;
      font-size: 0.75rem; letter-spacing: 0.2em; color: #111;
      text-transform: uppercase; margin-bottom: 0.5rem;
      border: 2px solid #111; padding: 4px 12px; display: inline-block;
    }
    
    .brut-msg {
      font-family: 'Space Grotesk', sans-serif; font-weight: 400;
      font-size: 1.1rem; line-height: 1.8; color: #333;
      max-width: 450px; margin: 1.5rem 0;
    }
    
    .brut-photo {
      width: 100%; max-width: 400px; margin: 1rem 0; display: block;
      border: 4px solid #111;
      filter: contrast(1.1);
    }
    
    .brut-sender {
      font-family: 'Space Grotesk', sans-serif; font-weight: 700;
      font-size: 0.85rem; color: #111; text-transform: uppercase;
      letter-spacing: 0.1em; margin-top: 1.5rem;
    }
    .brut-sender-name {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 2.5rem; color: ${d.accentColor}; line-height: 1;
    }
    
    .brut-footer {
      margin-top: 3rem; padding-top: 1rem;
      border-top: 4px solid #111; width: 100%;
      font-family: monospace; font-size: 0.65rem; color: #999;
      text-transform: uppercase; letter-spacing: 0.2em;
    }
    
    @media (max-width: 480px) {
      .brut-shell { padding: 1.5rem; }
      .brut-mega { font-size: clamp(4rem, 18vw, 8rem); }
    }
  `;

  const html = `
    <div class="brut-shell">
      <span class="brut-label">PARA</span>
      <h1 class="brut-mega">${(d.recipientName || 'TI').toUpperCase()}</h1>
      <div class="brut-bar"></div>
      <div class="brut-accent-bar"></div>
      <p class="brut-msg" id="type-target"></p>
      ${d.imageUrl ? `<img class="brut-photo" src="${d.imageUrl}" alt="Foto" />` : ''}
      <div class="brut-bar"></div>
      <p class="brut-sender">DE:</p>
      <p class="brut-sender-name">${(d.senderName || 'ANÓNIMO').toUpperCase()}</p>
      <div class="brut-footer">LinkSurprise™ / Dedicatoria Digital</div>
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
        setTimeout(type, 20);
      }
    }
    setTimeout(type, 800);
    document.body.addEventListener('click', () => { const a = document.getElementById('bg-music'); if(a){a.play();} }, {once:true});
  `;

  return { css, html, js };
}
