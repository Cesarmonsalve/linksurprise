// ═══════════════════════════════════════════════════════════════
// STYLE #17: PARTICLE BURST — Interactive Mouse Particles
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput } from './index';

export function renderParticleBurst(d: TemplateRenderData): TemplateOutput {
  const css = `
    body { background: #080810; overflow-x: hidden; }
    #particle-canvas { position: fixed; inset: 0; z-index: 0; }
    
    .burst-shell {
      position: relative; z-index: 10; min-height: 100vh;
      display: flex; align-items: center; justify-content: center; padding: 2rem;
    }
    .burst-card {
      max-width: 460px; width: 100%; text-align: center; padding: 3rem 2rem;
      background: rgba(255,255,255,0.03);
      backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 28px;
      box-shadow: 0 40px 80px rgba(0,0,0,0.4);
      opacity: 0; transform: scale(0.9);
      animation: burstReveal 1s cubic-bezier(0.22,1,0.36,1) 0.5s forwards;
    }
    @keyframes burstReveal { to { opacity: 1; transform: scale(1); } }
    
    .burst-label { font-size: 0.7rem; letter-spacing: 0.3em; color: ${d.accentColor}; text-transform: uppercase; margin-bottom: 0.5rem; }
    .burst-title {
      font-size: clamp(1.6rem,5vw,2.4rem); font-weight: 800;
      color: ${d.textColor}; line-height: 1.3; margin-bottom: 1.5rem;
    }
    .burst-msg { font-size: 1rem; line-height: 1.8; color: ${d.textColor}cc; margin: 1.5rem 0; }
    .burst-photo {
      width: 100%; max-width: 280px; border-radius: 20px; margin: 1.5rem auto; display: block;
      box-shadow: 0 20px 50px rgba(0,0,0,0.4);
    }
    .burst-divider { width: 60px; height: 2px; background: ${d.accentColor}; margin: 1.5rem auto; }
    .burst-sender { font-size: 0.85rem; color: ${d.textColor}60; }
    .burst-sender strong { color: ${d.accentColor}; }
    .burst-hint { font-size: 0.7rem; color: ${d.accentColor}60; margin-top: 1rem; letter-spacing: 0.1em; }
    
    @media (max-width: 480px) { .burst-card { padding: 2rem 1.5rem; } }
  `;

  const html = `
    <canvas id="particle-canvas"></canvas>
    <div class="burst-shell">
      <div class="burst-card">
        <p class="burst-label">Para ${d.recipientName || 'ti'}</p>
        <h1 class="burst-title" id="type-target"></h1>
        <div class="burst-divider"></div>
        ${d.imageUrl ? `<img class="burst-photo" src="${d.imageUrl}" alt="Sorpresa" />` : ''}
        <div class="burst-divider"></div>
        <p class="burst-sender">De <strong>${d.senderName || 'Alguien'}</strong></p>
        <p class="burst-hint">✦ Mueve el mouse para crear partículas ✦</p>
      </div>
    </div>
  `;

  const js = `
    const c = document.getElementById('particle-canvas');
    const ctx = c.getContext('2d');
    let W, H;
    function resize() { W = c.width = innerWidth; H = c.height = innerHeight; }
    addEventListener('resize', resize); resize();
    
    const particles = [];
    const colors = ['${d.accentColor}', '#ff006680', '#00ccff80', '#ffcc0080', '#ff66aa80'];
    
    class Particle {
      constructor(x, y) {
        this.x = x; this.y = y;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
        this.life = 1;
        this.r = Math.random() * 4 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        this.vx *= 0.99; this.vy *= 0.99;
        this.life -= 0.008;
        this.r *= 0.998;
      }
      draw() {
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
    
    document.addEventListener('mousemove', e => {
      for (let i = 0; i < 3; i++) particles.push(new Particle(e.clientX, e.clientY));
    });
    document.addEventListener('touchmove', e => {
      const t = e.touches[0];
      for (let i = 0; i < 3; i++) particles.push(new Particle(t.clientX, t.clientY));
    });
    // Click burst
    document.addEventListener('click', e => {
      for (let i = 0; i < 30; i++) particles.push(new Particle(e.clientX, e.clientY));
    });
    
    function loop() {
      ctx.fillStyle = 'rgba(8,8,16,0.08)';
      ctx.fillRect(0,0,W,H);
      particles.forEach((p, i) => { p.update(); p.draw(); if(p.life <= 0) particles.splice(i,1); });
      ctx.globalAlpha = 1;
      requestAnimationFrame(loop);
    }
    loop();
    
    // Typewriter
    const target = document.getElementById('type-target');
    const txt = "${d.escapedMessage}";
    let idx = 0;
    function type() {
      if (idx < txt.length) {
        if(txt.substring(idx,idx+5)==='<br/>'){target.innerHTML+='<br/>';idx+=5;}
        else{target.innerHTML+=txt.charAt(idx);idx++;}
        setTimeout(type, 30);
      }
    }
    setTimeout(type, 1500);
    
    const a = document.getElementById('bg-music');
    if(a) document.addEventListener('click', () => { a.play(); }, {once:true});
  `;

  return { css, html, js };
}
