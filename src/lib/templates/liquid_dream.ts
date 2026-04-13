// ═══════════════════════════════════════════════════════════════
// STYLE #16: LIQUID DREAM — Morphing Gradient Blobs
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput } from './index';

export function renderLiquidDream(d: TemplateRenderData): TemplateOutput {
  const css = `
    body { background: #0a0a1a; overflow-x: hidden; }
    
    /* Animated gradient blobs */
    .blob-container { position: fixed; inset: 0; z-index: 0; overflow: hidden; filter: blur(80px); }
    .blob {
      position: absolute; border-radius: 50%;
      animation: blobFloat 8s ease-in-out infinite alternate;
    }
    .blob-1 { width: 400px; height: 400px; background: ${d.accentColor}40; top: -10%; left: -10%; animation-delay: 0s; }
    .blob-2 { width: 350px; height: 350px; background: #ff006640; bottom: -10%; right: -10%; animation-delay: 2s; }
    .blob-3 { width: 300px; height: 300px; background: #00ccff30; top: 40%; left: 50%; animation-delay: 4s; }
    @keyframes blobFloat {
      0% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(30px, -30px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(10px, -10px) scale(1.05); }
    }
    
    .liquid-shell {
      position: relative; z-index: 10; min-height: 100vh;
      display: flex; align-items: center; justify-content: center; padding: 2rem;
    }
    .liquid-card {
      background: rgba(255,255,255,0.05);
      backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 32px; padding: 3rem 2rem;
      max-width: 460px; width: 100%; text-align: center;
      opacity: 0; animation: liquidIn 1.5s cubic-bezier(0.22,1,0.36,1) 0.5s forwards;
    }
    @keyframes liquidIn { to { opacity: 1; } }
    
    .liquid-label { font-size: 0.7rem; letter-spacing: 0.3em; color: ${d.accentColor}; text-transform: uppercase; margin-bottom: 0.5rem; }
    .liquid-title {
      font-size: clamp(1.6rem,5vw,2.4rem); font-weight: 700;
      color: #fff; line-height: 1.3; margin-bottom: 1.5rem;
      background: linear-gradient(135deg, #fff, ${d.accentColor});
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .liquid-msg { font-size: 1rem; line-height: 1.8; color: #fff; opacity: 0.7; margin: 1.5rem 0; }
    .liquid-photo {
      width: 100%; max-width: 280px; border-radius: 24px; margin: 1.5rem auto; display: block;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    .liquid-divider { width: 50px; height: 3px; background: linear-gradient(90deg, ${d.accentColor}, #ff006680); margin: 1.5rem auto; border-radius: 3px; }
    .liquid-sender { font-size: 0.85rem; color: #ffffff50; }
    .liquid-sender strong { color: ${d.accentColor}; }
    
    @media (max-width: 480px) { .liquid-card { padding: 2rem 1.5rem; } }
  `;

  const html = `
    <div class="blob-container">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
    </div>
    <div class="liquid-shell">
      <div class="liquid-card">
        <p class="liquid-label">Para ${d.recipientName || 'ti'}</p>
        <h1 class="liquid-title" id="type-target"></h1>
        <div class="liquid-divider"></div>
        ${d.imageUrl ? `<img class="liquid-photo" src="${d.imageUrl}" alt="Momento" />` : ''}
        <div class="liquid-divider"></div>
        <p class="liquid-sender">De <strong>${d.senderName || 'Alguien'}</strong></p>
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
    setTimeout(type, 1500);
    document.body.addEventListener('click', () => { const a = document.getElementById('bg-music'); if(a){a.play();} }, {once:true});
  `;

  return { css, html, js };
}
