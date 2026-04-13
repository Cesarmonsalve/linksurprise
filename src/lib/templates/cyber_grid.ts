// ═══════════════════════════════════════════════════════════════
// STYLE #2: CYBER GRID — eSports Neon Grid
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput } from './index';

export function renderCyberGrid(d: TemplateRenderData): TemplateOutput {
  const css = `
    body { background: #0a0a12; overflow-x: hidden; }
    
    /* Perspective neon grid floor */
    .cyber-grid-bg {
      position: fixed; inset: 0; z-index: 0;
      background:
        linear-gradient(to bottom, transparent 60%, ${d.accentColor}08 100%),
        repeating-linear-gradient(90deg, ${d.accentColor}10 0px, transparent 1px, transparent 80px),
        repeating-linear-gradient(0deg, ${d.accentColor}10 0px, transparent 1px, transparent 80px);
      transform: perspective(400px) rotateX(40deg);
      transform-origin: center bottom;
      animation: gridScroll 4s linear infinite;
    }
    @keyframes gridScroll { to { background-position: 0 80px; } }
    
    /* Scan lines CRT */
    .crt-lines {
      position: fixed; inset: 0; z-index: 1; pointer-events: none;
      background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px);
    }
    
    /* HUD container */
    .hud-shell {
      position: relative; z-index: 10; min-height: 100vh;
      display: flex; align-items: center; justify-content: center;
      padding: 2rem;
    }
    
    .hud-card {
      background: rgba(0,0,0,0.7);
      border: 1px solid ${d.accentColor}40;
      border-radius: 4px; padding: 3rem 2rem;
      max-width: 480px; width: 100%; text-align: center;
      position: relative;
      clip-path: polygon(0 12px, 12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px));
      box-shadow: 0 0 40px ${d.accentColor}15;
      opacity: 0; animation: hudSlideIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards;
    }
    @keyframes hudSlideIn { to { opacity: 1; } }
    
    /* Corner HUD brackets */
    .hud-card::before, .hud-card::after {
      content: ''; position: absolute; width: 30px; height: 30px;
      border-color: ${d.accentColor}; border-style: solid;
    }
    .hud-card::before { top: 4px; left: 4px; border-width: 2px 0 0 2px; }
    .hud-card::after { bottom: 4px; right: 4px; border-width: 0 2px 2px 0; }
    
    /* Glitch text */
    .glitch-title {
      font-size: clamp(2rem, 6vw, 3rem); font-weight: 900;
      color: ${d.textColor}; text-transform: uppercase;
      letter-spacing: 0.1em; position: relative;
      animation: glitch 3s infinite;
    }
    @keyframes glitch {
      0%, 95%, 100% { text-shadow: none; }
      96% { text-shadow: -3px 0 ${d.accentColor}, 3px 0 #ff004440; }
      97% { text-shadow: 3px 0 #00ffff40, -3px 0 ${d.accentColor}; }
      98% { text-shadow: -2px 0 ${d.accentColor}, 2px 0 #ff004440; }
    }
    
    .cyber-label { font-size: 0.65rem; letter-spacing: 0.4em; color: ${d.accentColor}; text-transform: uppercase; font-weight: 700; margin-bottom: 1rem; }
    .cyber-status { display: inline-block; padding: 4px 14px; background: ${d.accentColor}15; border: 1px solid ${d.accentColor}30; border-radius: 2px; font-size: 0.7rem; color: ${d.accentColor}; letter-spacing: 0.15em; margin-bottom: 1.5rem; animation: blink 2s infinite; }
    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    .cyber-msg { font-size: 1rem; line-height: 1.8; color: ${d.textColor}; opacity: 0.8; margin: 1.5rem 0; font-family: 'Courier New', monospace; }
    .cyber-photo { width: 100%; max-width: 280px; border-radius: 4px; border: 1px solid ${d.accentColor}40; margin: 1.5rem auto; display: block; box-shadow: 0 0 20px ${d.accentColor}20; }
    .cyber-divider { width: 100%; height: 1px; background: linear-gradient(90deg, transparent, ${d.accentColor}60, transparent); margin: 1.5rem 0; }
    .cyber-sender { font-size: 0.8rem; color: ${d.textColor}60; font-family: monospace; }
    .cyber-sender strong { color: ${d.accentColor}; }
    
    @media (max-width: 480px) { .hud-card { padding: 2rem 1.5rem; } }
  `;

  const html = `
    <div class="cyber-grid-bg"></div>
    <div class="crt-lines"></div>
    <div class="hud-shell">
      <div class="hud-card">
        <div class="cyber-status">● ENLACE ACTIVO</div>
        <p class="cyber-label">// Transmisión para ${d.recipientName || 'DESTINO'}</p>
        <h1 class="glitch-title" id="type-target"></h1>
        <div class="cyber-divider"></div>
        ${d.imageUrl ? `<img class="cyber-photo" src="${d.imageUrl}" alt="Data" />` : ''}
        <div class="cyber-divider"></div>
        <p class="cyber-sender">REMITENTE: <strong>${d.senderName || 'ANÓNIMO'}</strong></p>
      </div>
    </div>
  `;

  const js = `
    // Typewriter
    const target = document.getElementById('type-target');
    const txt = "${d.escapedMessage}";
    let i = 0;
    function type() {
      if (i < txt.length) {
        if (txt.substring(i, i+5) === '<br/>') { target.innerHTML += '<br/>'; i += 5; }
        else { target.innerHTML += txt.charAt(i); i++; }
        setTimeout(type, 30);
      }
    }
    setTimeout(type, 1200);
    
    // Music
    document.body.addEventListener('click', () => {
      const a = document.getElementById('bg-music');
      if (a) { a.volume = 0.5; a.play(); }
    }, { once: true });
  `;

  return { css, html, js };
}
