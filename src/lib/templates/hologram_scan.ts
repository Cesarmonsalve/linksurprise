// ═══════════════════════════════════════════════════════════════
// STYLE #4: HOLOGRAM SCAN — Holographic Reveal
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput } from './index';

export function renderHologramScan(d: TemplateRenderData): TemplateOutput {
  const css = `
    body { background: #030308; overflow-x: hidden; }
    
    .holo-bg {
      position: fixed; inset: 0; z-index: 0;
      background: radial-gradient(ellipse at 50% 50%, ${d.accentColor}08, transparent 70%);
    }
    
    /* Scanning line */
    .scan-line {
      position: fixed; left: 0; width: 100%; height: 3px; z-index: 50;
      background: linear-gradient(90deg, transparent 10%, ${d.accentColor} 50%, transparent 90%);
      box-shadow: 0 0 30px ${d.accentColor}, 0 0 60px ${d.accentColor}40;
      animation: scanRepeat 3s ease-in-out infinite;
    }
    @keyframes scanRepeat { 0% { top: 0%; } 50% { top: 100%; } 100% { top: 0%; } }
    
    .holo-shell {
      position: relative; z-index: 10; min-height: 100vh;
      display: flex; align-items: center; justify-content: center; padding: 2rem;
    }
    
    .holo-card {
      background: rgba(255,255,255,0.02);
      border: 1px solid ${d.accentColor}25;
      border-radius: 20px; padding: 3rem 2rem;
      max-width: 460px; width: 100%; text-align: center;
      backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
      position: relative; overflow: hidden;
      opacity: 0; animation: holoReveal 1.2s cubic-bezier(0.22,1,0.36,1) 0.5s forwards;
    }
    @keyframes holoReveal { to { opacity: 1; } }
    
    /* Holographic shimmer overlay */
    .holo-card::before {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(
        105deg,
        transparent 40%,
        ${d.accentColor}10 45%,
        ${d.accentColor}15 50%,
        transparent 55%
      );
      animation: holoShimmer 3s ease-in-out infinite;
      pointer-events: none;
    }
    @keyframes holoShimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(200%); }
    }
    
    /* RGB Split effect on title */
    .holo-title {
      font-size: clamp(1.6rem,5vw,2.4rem); font-weight: 800;
      color: ${d.textColor}; letter-spacing: -0.02em; line-height: 1.25;
      position: relative; margin-bottom: 1.5rem;
    }
    .holo-title::before {
      content: attr(data-text); position: absolute; left: 2px; top: 0;
      color: #ff000040; z-index: -1;
      animation: rgbShift 4s ease-in-out infinite;
    }
    @keyframes rgbShift { 0%,100% { transform: translate(0); } 50% { transform: translate(-2px, 1px); } }
    
    .holo-label { font-size: 0.65rem; letter-spacing: 0.4em; color: ${d.accentColor}; text-transform: uppercase; margin-bottom: 1rem; }
    .holo-status { display: inline-flex; align-items: center; gap: 6px; padding: 6px 16px; border: 1px solid ${d.accentColor}30; border-radius: 20px; font-size: 0.7rem; color: ${d.accentColor}; margin-bottom: 1.5rem; }
    .holo-status-dot { width: 6px; height: 6px; border-radius: 50%; background: ${d.accentColor}; animation: blink 1.5s infinite; }
    @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
    .holo-msg { font-size: 1rem; line-height: 1.8; color: ${d.textColor}cc; margin: 1.5rem 0; }
    .holo-photo { width: 100%; max-width: 280px; border-radius: 16px; margin: 1.5rem auto; display: block; box-shadow: 0 0 30px ${d.accentColor}15; border: 1px solid ${d.accentColor}15; }
    .holo-divider { width: 60px; height: 1px; background: ${d.accentColor}50; margin: 1.5rem auto; }
    .holo-sender { font-size: 0.85rem; color: ${d.textColor}60; }
    .holo-sender strong { color: ${d.accentColor}; }
    
    @media (max-width: 480px) { .holo-card { padding: 2rem 1.5rem; } }
  `;

  const html = `
    <div class="holo-bg"></div>
    <div class="scan-line"></div>
    <div class="holo-shell">
      <div class="holo-card">
        <div class="holo-status"><span class="holo-status-dot"></span> ESCANEANDO</div>
        <p class="holo-label">Sujeto: ${d.recipientName || 'Desconocido'}</p>
        <h1 class="holo-title" id="type-target" data-text=""></h1>
        <div class="holo-divider"></div>
        ${d.imageUrl ? `<img class="holo-photo" src="${d.imageUrl}" alt="Holograma" />` : ''}
        <div class="holo-divider"></div>
        <p class="holo-sender">Origen: <strong>${d.senderName || 'Clasificado'}</strong></p>
      </div>
    </div>
  `;

  const js = `
    const target = document.getElementById('type-target');
    const txt = "${d.escapedMessage}";
    let i = 0;
    function type() {
      if (i < txt.length) {
        if (txt.substring(i,i+5)==='<br/>'){target.innerHTML+='<br/>';i+=5;}
        else{target.innerHTML+=txt.charAt(i);i++;}
        target.setAttribute('data-text', target.textContent);
        setTimeout(type, 30);
      }
    }
    setTimeout(type, 1500);
    
    document.body.addEventListener('click', () => { const a = document.getElementById('bg-music'); if(a){a.play();} }, {once:true});
  `;

  return { css, html, js };
}
