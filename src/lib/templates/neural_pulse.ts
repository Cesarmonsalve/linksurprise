// ═══════════════════════════════════════════════════════════════
// STYLE #3: NEURAL PULSE — Neural Network Connections
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput } from './index';

export function renderNeuralPulse(d: TemplateRenderData): TemplateOutput {
  const css = `
    body { background: #060612; overflow-x: hidden; }
    #neural-canvas { position: fixed; inset: 0; z-index: 0; }
    
    .neural-shell {
      position: relative; z-index: 10; min-height: 100vh;
      display: flex; align-items: center; justify-content: center; padding: 2rem;
    }
    .neural-card {
      background: rgba(10,10,25,0.85);
      backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
      border: 1px solid ${d.accentColor}20;
      border-radius: 24px; padding: 3rem 2rem;
      max-width: 460px; width: 100%; text-align: center;
      box-shadow: 0 0 60px ${d.accentColor}10;
      opacity: 0; animation: neuralFadeIn 1.5s cubic-bezier(0.22,1,0.36,1) 0.8s forwards;
    }
    @keyframes neuralFadeIn { to { opacity: 1; } }
    
    .pulse-dot {
      width: 12px; height: 12px; border-radius: 50%; background: ${d.accentColor};
      margin: 0 auto 1.5rem; position: relative;
      box-shadow: 0 0 20px ${d.accentColor};
    }
    .pulse-dot::after {
      content: ''; position: absolute; inset: -8px;
      border: 2px solid ${d.accentColor}40; border-radius: 50%;
      animation: pulseDotRing 2s infinite;
    }
    @keyframes pulseDotRing { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(2.5); opacity: 0; } }
    
    .neural-label { font-size: 0.7rem; letter-spacing: 0.3em; color: ${d.accentColor}; text-transform: uppercase; margin-bottom: 0.5rem; }
    .neural-title { font-size: clamp(1.5rem,5vw,2.2rem); font-weight: 700; color: ${d.textColor}; line-height: 1.3; margin-bottom: 1.5rem; }
    .neural-msg { font-size: 1rem; line-height: 1.8; color: ${d.textColor}; opacity: 0.8; margin: 1.5rem 0; }
    .neural-photo { width: 100%; max-width: 280px; border-radius: 16px; margin: 1.5rem auto; display: block; box-shadow: 0 0 30px ${d.accentColor}20; }
    .neural-divider { width: 60px; height: 2px; background: ${d.accentColor}; margin: 1.5rem auto; border-radius: 2px; }
    .neural-sender { font-size: 0.85rem; color: ${d.textColor}60; }
    .neural-sender strong { color: ${d.accentColor}; }
    
    @media (max-width: 480px) { .neural-card { padding: 2rem 1.5rem; } }
  `;

  const html = `
    <canvas id="neural-canvas"></canvas>
    <div class="neural-shell">
      <div class="neural-card">
        <div class="pulse-dot"></div>
        <p class="neural-label">Conexión con ${d.recipientName || 'ti'}</p>
        <h1 class="neural-title" id="type-target"></h1>
        <div class="neural-divider"></div>
        ${d.imageUrl ? `<img class="neural-photo" src="${d.imageUrl}" alt="Sorpresa" />` : ''}
        <div class="neural-divider"></div>
        <p class="neural-sender">De: <strong>${d.senderName || 'Alguien especial'}</strong></p>
      </div>
    </div>
  `;

  const js = `
    // ═══ NEURAL NETWORK CANVAS ═══
    const c = document.getElementById('neural-canvas');
    const ctx = c.getContext('2d');
    let W, H;
    function resize() { W = c.width = innerWidth; H = c.height = innerHeight; }
    addEventListener('resize', resize); resize();
    
    const nodes = [];
    for (let i = 0; i < 60; i++) {
      nodes.push({ x: Math.random()*W, y: Math.random()*H, vx: (Math.random()-0.5)*0.5, vy: (Math.random()-0.5)*0.5, r: Math.random()*3+1 });
    }
    
    function drawNeural() {
      ctx.fillStyle = 'rgba(6,6,18,0.2)';
      ctx.fillRect(0,0,W,H);
      
      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i+1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 180) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = '${d.accentColor}' + Math.floor((1 - dist/180) * 60).toString(16).padStart(2,'0');
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      // Nodes
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI*2);
        ctx.fillStyle = '${d.accentColor}80';
        ctx.fill();
      });
      
      requestAnimationFrame(drawNeural);
    }
    drawNeural();
    
    // Typewriter
    const target = document.getElementById('type-target');
    const txt = "${d.escapedMessage}";
    let idx = 0;
    function type() {
      if (idx < txt.length) {
        if (txt.substring(idx, idx+5) === '<br/>') { target.innerHTML += '<br/>'; idx += 5; }
        else { target.innerHTML += txt.charAt(idx); idx++; }
        setTimeout(type, 35);
      }
    }
    setTimeout(type, 2000);
    
    document.body.addEventListener('click', () => { const a = document.getElementById('bg-music'); if(a){a.volume=0.5;a.play();} }, {once:true});
  `;

  return { css, html, js };
}
