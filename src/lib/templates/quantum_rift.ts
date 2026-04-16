// STYLE: QUANTUM RIFT - Dimensional Portal
import { TemplateRenderData, TemplateOutput, renderVipGallery } from './index';

export function renderQuantumRift(d: TemplateRenderData): TemplateOutput {
  const isBasic = d.renderMode === 'basic';
  const gallery = renderVipGallery(d, "quantumrift");
  const accent = d.accentColor || '#ff00ff';

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;600;800&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: radial-gradient(circle at 30% 30%, #1a0a2e 0%, #0d0d2b 100%); min-height: 100vh; overflow-x: hidden; font-family: 'Exo+2', sans-serif; }
    ${isBasic ? `
      .shell { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; position: relative; overflow: hidden; }
      .bg-orb { position: absolute; border-radius: 50%; filter: blur(60px); opacity: 0.3; animation: float 10s ease-in-out infinite; }
      .orb-1 { width: 280px; height: 280px; background: ${accent}; top: -80px; left: -80px; }
      .orb-2 { width: 220px; height: 220px; background: #00ffff; bottom: -60px; right: -60px; animation-delay: -5s; }
      @keyframes float { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(25px, -40px) scale(1.05); } }
      .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.2); border-radius: 28px; padding: 2.5rem; max-width: 480px; width: 100%; box-shadow: 0 20px 40px rgba(0,0,0,0.25); position: relative; z-index: 10; }
      .label { font-size: 0.7rem; letter-spacing: 0.25em; text-transform: uppercase; color: ${accent}; font-weight: 600; margin-bottom: 0.75rem; }
      .title { font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 800; color: #fff; line-height: 1.2; margin-bottom: 1.25rem; }
      .photo-wrap { width: 100%; aspect-ratio: 1; border-radius: 20px; overflow: hidden; margin: 1.25rem 0; border: 2px solid rgba(255,255,255,0.15); }
      .photo { width: 100%; height: 100%; object-fit: cover; }
      .msg { font-size: 1rem; line-height: 1.7; color: rgba(255,255,255,0.9); margin-bottom: 1.25rem; }
      .sender { font-size: 0.85rem; color: rgba(255,255,255,0.6); font-weight: 300; }
    ` : `
      #vip-canvas { position: fixed; inset: 0; z-index: 0; }
      .stars { position: fixed; inset: 0; z-index: 1; background-image: radial-gradient(1px 1px at 50% 50%, #fff, transparent); background-size: 100px 100px; animation: twinkle 4s ease-in-out infinite; opacity: 0.4; }
      @keyframes twinkle { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.2; } }
      .vip-intro { position: fixed; inset: 0; z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; background: radial-gradient(circle at center, #1a1a2e 0%, #0f0c29 100%); }
      .intro-text { font-size: clamp(1.5rem, 4vw, 2.5rem); font-weight: 800; color: #fff; text-align: center; margin-bottom: 2rem; opacity: 0; }
      .tap-hint { font-size: 1rem; color: ${accent}; animation: pulse 2s ease-in-out infinite; }
      @keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
      #main-content { position: relative; z-index: 10; min-height: 100vh; display: none; align-items: center; justify-content: center; padding: 3rem 2rem; }
      .vip-card { background: rgba(255,255,255,0.08); backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px); border: 1px solid rgba(255,255,255,0.15); border-radius: 36px; padding: 3.5rem 2.5rem; max-width: 580px; width: 100%; box-shadow: 0 25px 50px rgba(0,0,0,0.35); position: relative; overflow: hidden; }
      .vip-card::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: conic-gradient(from 0deg, transparent, ${accent}, transparent); animation: rotate 12s linear infinite; opacity: 0.25; }
      @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      .card-inner { position: relative; z-index: 1; }
      .vip-label { font-size: 0.75rem; letter-spacing: 0.35em; text-transform: uppercase; color: ${accent}; font-weight: 600; margin-bottom: 1.25rem; }
      .vip-title { font-size: clamp(2.2rem, 5vw, 3.5rem); font-weight: 800; color: #fff; line-height: 1.1; margin-bottom: 1.75rem; }
      .vip-gallery-wrap { width: 100%; aspect-ratio: 16/9; border-radius: 20px; overflow: hidden; margin: 1.75rem 0; border: 2px solid rgba(255,255,255,0.1); }
      .vip-photo { width: 100%; height: 100%; object-fit: cover; }
      .vip-msg { font-size: 1.1rem; line-height: 1.8; color: rgba(255,255,255,0.95); margin-bottom: 1.75rem; }
      .vip-sender { font-size: 0.95rem; color: ${accent}; font-weight: 600; letter-spacing: 0.08em; }
    `}
  `;

  const html = isBasic ? `
    <div class="shell">
      <div class="bg-orb orb-1"></div>
      <div class="bg-orb orb-2"></div>
      <div class="card">
        <p class="label">${d.title || 'Para Ti'}</p>
        <h1 class="title">${d.recipientName || 'Especial'}</h1>
        ${d.imageUrl ? '<div class="photo-wrap">' + gallery.html + '</div>' : ''}
        <p class="msg" id="type-target"></p>
        <p class="sender">De: ${d.senderName || 'Alguien Especial'}</p>
      </div>
    </div>
  ` : `
    <canvas id="vip-canvas"></canvas>
    <div class="stars"></div>
    <div class="vip-intro" id="intro">
      <p class="intro-text" id="introText">Una experiencia especial<br/>te espera</p>
      <p class="tap-hint">Toca para comenzar</p>
    </div>
    <div id="main-content">
      <div class="vip-card">
        <div class="card-inner">
          <p class="vip-label">${d.title || 'Exclusivo Para Ti'}</p>
          <h1 class="vip-title">${d.recipientName || 'Increible'}</h1>
          ${d.imageUrl ? '<div class="vip-gallery-wrap">' + gallery.html + '</div>' : ''}
          <p class="vip-msg" id="type-target"></p>
          <p class="vip-sender">De: ${d.senderName || 'Alguien Especial'}</p>
        </div>
      </div>
    </div>
  `;

  const js = isBasic ? `
    (function() {
      const target = document.getElementById('type-target');
      if (!target) return;
      const text = "${d.escapedMessage}";
      let i = 0;
      function type() { if (i < text.length) { target.textContent += text.charAt(i); i++; setTimeout(type, 50); } }
      setTimeout(type, 500);
    })();
  ` : `
    (function() {
      const canvas = document.getElementById('vip-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let width, height, particles = [], mouseX = 0, mouseY = 0;
      function resize() { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; }
      class Particle { constructor() { this.reset(); } reset() { this.x = Math.random() * width; this.y = Math.random() * height; this.vx = (Math.random() - 0.5) * 0.5; this.vy = (Math.random() - 0.5) * 0.5; this.radius = Math.random() * 2 + 1; this.alpha = Math.random() * 0.5 + 0.2; } update() { this.x += this.vx + (mouseX - this.x) * 0.0001; this.y += this.vy + (mouseY - this.y) * 0.0001; if (this.x < 0 || this.x > width) this.vx *= -1; if (this.y < 0 || this.y > height) this.vy *= -1; } draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fillStyle = '${accent}'; ctx.globalAlpha = this.alpha; ctx.fill(); } }
      function init() { resize(); for (let i = 0; i < 80; i++) particles.push(new Particle()); animate(); }
      function animate() { ctx.clearRect(0, 0, width, height); for (let i = 0; i < particles.length; i++) { for (let j = i + 1; j < particles.length; j++) { const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y, dist = Math.sqrt(dx * dx + dy * dy); if (dist < 100) { ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.strokeStyle = '${accent}'; ctx.globalAlpha = 0.1 * (1 - dist / 100); ctx.stroke(); } } } particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animate); }
      window.addEventListener('resize', resize);
      window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
      window.addEventListener('touchmove', e => { mouseX = e.touches[0].clientX; mouseY = e.touches[0].clientY; });
      init();
      const intro = document.getElementById('intro'), mainContent = document.getElementById('main-content'), introText = document.getElementById('introText');
      if (intro && introText) {
        if (typeof gsap !== 'undefined') { gsap.to(introText, { opacity: 1, duration: 2, delay: 0.5 }); } else { introText.style.opacity = 1; }
        intro.addEventListener('click', () => {
          const finish = () => { intro.style.display = 'none'; mainContent.style.display = 'flex'; const target = document.getElementById('type-target'); if (target) { const text = "${d.escapedMessage}"; let i = 0; function type() { if (i < text.length) { target.textContent += text.charAt(i); i++; setTimeout(type, 40); } } setTimeout(type, 800); } };
          if (typeof gsap !== 'undefined') { gsap.to(intro, { opacity: 0, duration: 1, onComplete: finish }); } else { intro.style.opacity = 0; setTimeout(finish, 1000); }
        });
      }
    })();
    ${gallery.js}
  `;

  return { css, html, js };
}
