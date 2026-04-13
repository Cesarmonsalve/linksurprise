// ═══════════════════════════════════════════════════════════════
// STYLE #20: AURORA FLOW — Northern Lights Gradient
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput } from './index';

export function renderAuroraFlow(d: TemplateRenderData): TemplateOutput {
  const css = `
    body { background: #020810; overflow-x: hidden; }
    
    /* Aurora gradient bands */
    .aurora-bg {
      position: fixed; inset: 0; z-index: 0; overflow: hidden;
    }
    .aurora-band {
      position: absolute; width: 200%; height: 40%;
      filter: blur(60px); opacity: 0.3;
    }
    .aurora-1 {
      top: 10%; left: -50%;
      background: linear-gradient(90deg, transparent, #00ff8840, ${d.accentColor}50, #00ccff40, transparent);
      animation: auroraWave 8s ease-in-out infinite;
    }
    .aurora-2 {
      top: 30%; left: -30%;
      background: linear-gradient(90deg, transparent, ${d.accentColor}30, #ff66cc30, transparent);
      animation: auroraWave 12s ease-in-out infinite reverse;
    }
    .aurora-3 {
      top: 5%; left: -20%;
      background: linear-gradient(90deg, transparent, #66ffcc30, ${d.accentColor}20, transparent);
      animation: auroraWave 10s ease-in-out infinite 2s;
    }
    @keyframes auroraWave {
      0% { transform: translateX(-20%) skewX(-5deg); }
      50% { transform: translateX(20%) skewX(5deg); }
      100% { transform: translateX(-20%) skewX(-5deg); }
    }
    
    /* Stars */
    .aurora-stars {
      position: fixed; inset: 0; z-index: 0;
      background-image:
        radial-gradient(1px 1px at 20% 30%, #fff8, transparent),
        radial-gradient(1px 1px at 40% 70%, #fff6, transparent),
        radial-gradient(1px 1px at 60% 20%, #fff4, transparent),
        radial-gradient(1px 1px at 80% 50%, #fff6, transparent),
        radial-gradient(1px 1px at 10% 80%, #fff4, transparent),
        radial-gradient(1px 1px at 70% 90%, #fff3, transparent),
        radial-gradient(1px 1px at 30% 10%, #fff5, transparent),
        radial-gradient(1px 1px at 90% 40%, #fff4, transparent),
        radial-gradient(1px 1px at 50% 60%, #fff6, transparent),
        radial-gradient(1px 1px at 15% 45%, #fff3, transparent);
    }
    
    .aurora-shell {
      position: relative; z-index: 10; min-height: 100vh;
      display: flex; align-items: center; justify-content: center; padding: 2rem;
    }
    .aurora-card {
      background: rgba(255,255,255,0.03);
      backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 28px; padding: 3rem 2rem;
      max-width: 460px; width: 100%; text-align: center;
      box-shadow: 0 40px 80px rgba(0,0,0,0.3);
      opacity: 0; animation: auroraCardIn 1.8s cubic-bezier(0.22,1,0.36,1) 0.5s forwards;
    }
    @keyframes auroraCardIn { to { opacity: 1; } }
    
    .aurora-label { font-size: 0.7rem; letter-spacing: 0.3em; color: ${d.accentColor}; text-transform: uppercase; margin-bottom: 0.5rem; }
    .aurora-title {
      font-size: clamp(1.6rem,5vw,2.4rem); font-weight: 700;
      background: linear-gradient(135deg, #00ff88, ${d.accentColor}, #00ccff);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      line-height: 1.3; margin-bottom: 1.5rem;
    }
    .aurora-msg { font-size: 1rem; line-height: 1.8; color: #fff; opacity: 0.75; margin: 1.5rem 0; }
    .aurora-photo {
      width: 100%; max-width: 280px; border-radius: 20px; margin: 1.5rem auto; display: block;
      box-shadow: 0 20px 50px rgba(0,0,0,0.4), 0 0 20px ${d.accentColor}10;
    }
    .aurora-divider {
      width: 60px; height: 2px; margin: 1.5rem auto;
      background: linear-gradient(90deg, #00ff8880, ${d.accentColor}, #00ccff80);
      border-radius: 2px;
    }
    .aurora-sender { font-size: 0.85rem; color: #ffffff50; }
    .aurora-sender strong { color: ${d.accentColor}; }
    
    /* Floating particles */
    .aurora-particle {
      position: fixed; border-radius: 50%; pointer-events: none; z-index: 1;
      background: ${d.accentColor}; filter: blur(1px);
      animation: auroraFloat linear infinite;
    }
    @keyframes auroraFloat {
      0% { transform: translateY(100vh) scale(0); opacity: 0; }
      10% { opacity: 0.6; }
      90% { opacity: 0.6; }
      100% { transform: translateY(-20vh) scale(1); opacity: 0; }
    }
    
    @media (max-width: 480px) { .aurora-card { padding: 2rem 1.5rem; } }
  `;

  // Generate floating particles
  let particlesHTML = '';
  for (let i = 0; i < 15; i++) {
    const left = Math.random() * 100;
    const size = Math.random() * 3 + 1;
    const delay = Math.random() * 8;
    const duration = Math.random() * 6 + 6;
    particlesHTML += `<div class="aurora-particle" style="left:${left}%;width:${size}px;height:${size}px;animation-duration:${duration}s;animation-delay:${delay}s;"></div>`;
  }

  const html = `
    <div class="aurora-bg">
      <div class="aurora-band aurora-1"></div>
      <div class="aurora-band aurora-2"></div>
      <div class="aurora-band aurora-3"></div>
    </div>
    <div class="aurora-stars"></div>
    ${particlesHTML}
    <div class="aurora-shell">
      <div class="aurora-card">
        <p class="aurora-label">Para ${d.recipientName || 'ti'}</p>
        <h1 class="aurora-title" id="type-target"></h1>
        <div class="aurora-divider"></div>
        ${d.imageUrl ? `<img class="aurora-photo" src="${d.imageUrl}" alt="Momento" />` : ''}
        <div class="aurora-divider"></div>
        <p class="aurora-sender">De <strong>${d.senderName || 'Alguien especial'}</strong></p>
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
        setTimeout(type, 35);
      }
    }
    setTimeout(type, 1800);
    document.body.addEventListener('click', () => { const a = document.getElementById('bg-music'); if(a){a.play();} }, {once:true});
  `;

  return { css, html, js };
}
