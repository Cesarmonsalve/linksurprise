// ═══════════════════════════════════════════════════════════════
// STYLE #7: GOLDEN AGE — Vintage Film Warm
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput } from './index';

export function renderGoldenAge(d: TemplateRenderData): TemplateOutput {
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap');
    body { background: #1a1408; overflow-x: hidden; }
    
    .golden-grain {
      position: fixed; inset: 0; z-index: 100; pointer-events: none; opacity: 0.04;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }
    
    .golden-glow {
      position: fixed; inset: 0; z-index: 0;
      background: radial-gradient(ellipse at 50% 30%, #d4af3715, transparent 60%);
    }
    
    .golden-shell {
      position: relative; z-index: 10; min-height: 100vh;
      display: flex; align-items: center; justify-content: center; padding: 2rem;
    }
    .golden-card {
      max-width: 460px; width: 100%; text-align: center; padding: 3rem 2rem;
      border: 1px solid #d4af3720; border-radius: 8px;
      background: rgba(26,20,8,0.6); backdrop-filter: blur(10px);
      position: relative;
      opacity: 0; animation: goldenReveal 2s cubic-bezier(0.22,1,0.36,1) 0.5s forwards;
    }
    @keyframes goldenReveal { to { opacity: 1; } }
    
    /* Gold corner ornaments */
    .golden-card::before, .golden-card::after {
      content: '✦'; position: absolute; font-size: 1.2rem; color: #d4af3740;
    }
    .golden-card::before { top: 12px; left: 16px; }
    .golden-card::after { bottom: 12px; right: 16px; }
    
    .golden-year { font-size: 0.7rem; letter-spacing: 0.4em; color: #d4af37; text-transform: uppercase; margin-bottom: 1rem; }
    .golden-label {
      font-family: 'Cormorant Garamond', serif; font-style: italic;
      font-size: 1.1rem; color: #fdfbf7; opacity: 0.6; margin-bottom: 0.5rem;
    }
    .golden-title {
      font-family: 'Cormorant Garamond', serif; font-weight: 700;
      font-size: clamp(1.8rem,6vw,2.8rem); color: #fdfbf7; line-height: 1.2; margin-bottom: 1.5rem;
    }
    .golden-divider {
      width: 100px; margin: 1.5rem auto;
      display: flex; align-items: center; justify-content: center; gap: 8px;
    }
    .golden-divider span { flex: 1; height: 1px; background: #d4af3730; }
    .golden-divider em { color: #d4af37; font-size: 0.8rem; }
    .golden-msg {
      font-family: 'Cormorant Garamond', serif; font-size: 1.1rem;
      line-height: 2; color: #fdfbf7; opacity: 0.8;
    }
    .golden-photo {
      width: 100%; max-width: 280px; border-radius: 6px; margin: 2rem auto; display: block;
      border: 4px solid #d4af3730; box-shadow: 0 20px 50px rgba(0,0,0,0.5);
      filter: sepia(20%) contrast(1.05);
    }
    .golden-sender {
      font-family: 'Cormorant Garamond', serif; font-style: italic;
      font-size: 0.95rem; color: #fdfbf760; margin-top: 1.5rem;
    }
    .golden-sender strong { color: #d4af37; font-style: normal; }
    
    @media (max-width: 480px) { .golden-card { padding: 2rem 1.5rem; } }
  `;

  const html = `
    <div class="golden-grain"></div>
    <div class="golden-glow"></div>
    <div class="golden-shell">
      <div class="golden-card">
        <p class="golden-year">✦ Momento Especial ✦</p>
        <p class="golden-label">Para ${d.recipientName || 'ti'}</p>
        <h1 class="golden-title" id="type-target"></h1>
        <div class="golden-divider"><span></span><em>✦</em><span></span></div>
        ${d.imageUrl ? `<img class="golden-photo" src="${d.imageUrl}" alt="Recuerdo" />` : ''}
        <div class="golden-divider"><span></span><em>✦</em><span></span></div>
        <p class="golden-sender">Con todo mi amor, <strong>${d.senderName || 'Alguien especial'}</strong></p>
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
        setTimeout(type, 45);
      }
    }
    setTimeout(type, 1500);
    document.body.addEventListener('click', () => { const a = document.getElementById('bg-music'); if(a){a.play();} }, {once:true});
  `;

  return { css, html, js };
}
