const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '../src/lib/templates');

const templateConfigs = {
  nebula_glass: { funcName: 'NebulaGlass', displayName: 'NEBULA GLASS', description: 'Ethereal Glassmorphism', accentColor: '#a855f7', secondaryColor: '#ec4899', bgColor: '#0f0c29', bgGradient: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)', font: 'Outfit' },
  cyber_grid: { funcName: 'CyberGrid', displayName: 'CYBER GRID', description: 'Digital Matrix Interface', accentColor: '#00ffcc', secondaryColor: '#ff00ff', bgColor: '#000000', bgGradient: 'linear-gradient(180deg, #000 0%, #0a1a1a 100%)', font: 'Share+Tech+Mono' },
  neural_pulse: { funcName: 'NeuralPulse', displayName: 'NEURAL PULSE', description: 'Brain Wave Visualization', accentColor: '#00ffff', secondaryColor: '#ff0066', bgColor: '#0a0a1a', bgGradient: 'radial-gradient(circle at 50% 50%, #1a1a3a 0%, #0a0a1a 100%)', font: 'Rajdhani' },
  hologram_scan: { funcName: 'HologramScan', displayName: 'HOLOGRAM SCAN', description: 'Futuristic Holographic', accentColor: '#00ff88', secondaryColor: '#00ccff', bgColor: '#001111', bgGradient: 'linear-gradient(180deg, #001111 0%, #002233 100%)', font: 'Orbitron' },
  quantum_rift: { funcName: 'QuantumRift', displayName: 'QUANTUM RIFT', description: 'Dimensional Portal', accentColor: '#ff00ff', secondaryColor: '#00ffff', bgColor: '#0d0d2b', bgGradient: 'radial-gradient(circle at 30% 30%, #1a0a2e 0%, #0d0d2b 100%)', font: 'Exo+2' },
  film_noir: { funcName: 'FilmNoir', displayName: 'FILM NOIR', description: 'Classic Cinema Style', accentColor: '#d4af37', secondaryColor: '#8b7355', bgColor: '#1a1a1a', bgGradient: 'linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)', font: 'Playfair+Display' },
  golden_age: { funcName: 'GoldenAge', displayName: 'GOLDEN AGE', description: 'Luxurious Vintage', accentColor: '#ffd700', secondaryColor: '#daa520', bgColor: '#1c1c1c', bgGradient: 'linear-gradient(135deg, #2c1810 0%, #1c1c1c 100%)', font: 'Cinzel' },
  cinematic_scroll: { funcName: 'CinematicScroll', displayName: 'CINEMATIC SCROLL', description: 'Epic Storytelling', accentColor: '#e50914', secondaryColor: '#ff6b35', bgColor: '#0f0f0f', bgGradient: 'linear-gradient(180deg, #1a0a0a 0%, #0f0f0f 100%)', font: 'Bebas+Neue' },
  velvet_dark: { funcName: 'VelvetDark', displayName: 'VELVET DARK', description: 'Luxurious Dark Theme', accentColor: '#9333ea', secondaryColor: '#db2777', bgColor: '#18181b', bgGradient: 'linear-gradient(180deg, #27272a 0%, #18181b 100%)', font: 'Inter' },
  fade_story: { funcName: 'FadeStory', displayName: 'FADE STORY', description: 'Gentle Narrative', accentColor: '#f472b6', secondaryColor: '#a78bfa', bgColor: '#1e1b4b', bgGradient: 'linear-gradient(180deg, #312e81 0%, #1e1b4b 100%)', font: 'Lora' },
  bento_pastel: { funcName: 'BentoPastel', displayName: 'BENTO PASTEL', description: 'Soft Playful Grid', accentColor: '#ffb3ba', secondaryColor: '#baffc9', bgColor: '#faf9f6', bgGradient: 'linear-gradient(180deg, #faf9f6 0%, #f0eee9 100%)', font: 'DM+Sans' },
  mono_grid: { funcName: 'MonoGrid', displayName: 'MONO GRID', description: 'Minimalist Monochrome', accentColor: '#333333', secondaryColor: '#666666', bgColor: '#ffffff', bgGradient: 'linear-gradient(180deg, #ffffff 0%, #f5f5f5 100%)', font: 'Space+Mono' },
  zen_minimal: { funcName: 'ZenMinimal', displayName: 'ZEN MINIMAL', description: 'Peaceful Simplicity', accentColor: '#78909c', secondaryColor: '#b0bec5', bgColor: '#eceff1', bgGradient: 'linear-gradient(180deg, #f5f7fa 0%, #e4e8eb 100%)', font: 'Noto+Sans+JP' },
  swiss_clean: { funcName: 'SwissClean', displayName: 'SWISS CLEAN', description: 'International Typographic', accentColor: '#ff0000', secondaryColor: '#000000', bgColor: '#ffffff', bgGradient: 'linear-gradient(180deg, #ffffff 0%, #f8f8f8 100%)', font: 'Helvetica+Now' },
  soft_stack: { funcName: 'SoftStack', displayName: 'SOFT STACK', description: 'Layered Card Design', accentColor: '#60a5fa', secondaryColor: '#a78bfa', bgColor: '#f8fafc', bgGradient: 'linear-gradient(180deg, #f1f5f9 0%, #f8fafc 100%)', font: 'Plus+Jakarta+Sans' },
  liquid_dream: { funcName: 'LiquidDream', displayName: 'LIQUID DREAM', description: 'Flowing Abstract', accentColor: '#2dd4bf', secondaryColor: '#f472b6', bgColor: '#0c4a6e', bgGradient: 'linear-gradient(135deg, #0c4a6e 0%, #1e3a5f 100%)', font: 'Abril+Fatface' },
  particle_burst: { funcName: 'ParticleBurst', displayName: 'PARTICLE BURST', description: 'Explosive Celebration', accentColor: '#fbbf24', secondaryColor: '#f97316', bgColor: '#1e1b4b', bgGradient: 'radial-gradient(circle at 50% 50%, #312e81 0%, #1e1b4b 100%)', font: 'Montserrat' },
  brutalist_bold: { funcName: 'BrutalistBold', displayName: 'BRUTALIST BOLD', description: 'Raw Typography', accentColor: '#00ff00', secondaryColor: '#ffff00', bgColor: '#111111', bgGradient: 'linear-gradient(180deg, #111111 0%, #000000 100%)', font: 'Archivo+Black' },
  neon_wave: { funcName: 'NeonWave', displayName: 'NEON WAVE', description: 'Synthwave Aesthetic', accentColor: '#ff00ff', secondaryColor: '#00ffff', bgColor: '#0d0221', bgGradient: 'linear-gradient(180deg, #1a0533 0%, #0d0221 100%)', font: 'Press+Start+2P' },
  aurora_flow: { funcName: 'AuroraFlow', displayName: 'AURORA FLOW', description: 'Northern Lights', accentColor: '#34d399', secondaryColor: '#60a5fa', bgColor: '#0f172a', bgGradient: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)', font: 'Sora' },
};

Object.entries(templateConfigs).forEach(([name, config]) => {
  const content = `// STYLE: ${config.displayName} - ${config.description}
import { TemplateRenderData, TemplateOutput, renderVipGallery } from './index';

export function render${config.funcName}(d: TemplateRenderData): TemplateOutput {
  const isBasic = d.renderMode === 'basic';
  const gallery = renderVipGallery(d, "${name.replace(/_/g, '')}");
  const accent = d.accentColor || '${config.accentColor}';

  const css = \`
    @import url('https://fonts.googleapis.com/css2?family=${config.font}:wght@300;400;600;800&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: ${config.bgGradient}; min-height: 100vh; overflow-x: hidden; font-family: '${config.font}', sans-serif; }
    \${isBasic ? \`
      .shell { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; position: relative; overflow: hidden; }
      .bg-orb { position: absolute; border-radius: 50%; filter: blur(60px); opacity: 0.3; animation: float 10s ease-in-out infinite; }
      .orb-1 { width: 280px; height: 280px; background: \${accent}; top: -80px; left: -80px; }
      .orb-2 { width: 220px; height: 220px; background: ${config.secondaryColor}; bottom: -60px; right: -60px; animation-delay: -5s; }
      @keyframes float { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(25px, -40px) scale(1.05); } }
      .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.2); border-radius: 28px; padding: 2.5rem; max-width: 480px; width: 100%; box-shadow: 0 20px 40px rgba(0,0,0,0.25); position: relative; z-index: 10; }
      .label { font-size: 0.7rem; letter-spacing: 0.25em; text-transform: uppercase; color: \${accent}; font-weight: 600; margin-bottom: 0.75rem; }
      .title { font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 800; color: #fff; line-height: 1.2; margin-bottom: 1.25rem; }
      .photo-wrap { width: 100%; aspect-ratio: 1; border-radius: 20px; overflow: hidden; margin: 1.25rem 0; border: 2px solid rgba(255,255,255,0.15); }
      .photo { width: 100%; height: 100%; object-fit: cover; }
      .msg { font-size: 1rem; line-height: 1.7; color: rgba(255,255,255,0.9); margin-bottom: 1.25rem; }
      .sender { font-size: 0.85rem; color: rgba(255,255,255,0.6); font-weight: 300; }
    \` : \`
      #vip-canvas { position: fixed; inset: 0; z-index: 0; }
      .stars { position: fixed; inset: 0; z-index: 1; background-image: radial-gradient(1px 1px at 50% 50%, #fff, transparent); background-size: 100px 100px; animation: twinkle 4s ease-in-out infinite; opacity: 0.4; }
      @keyframes twinkle { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.2; } }
      .vip-intro { position: fixed; inset: 0; z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; background: radial-gradient(circle at center, #1a1a2e 0%, #0f0c29 100%); }
      .intro-text { font-size: clamp(1.5rem, 4vw, 2.5rem); font-weight: 800; color: #fff; text-align: center; margin-bottom: 2rem; opacity: 0; }
      .tap-hint { font-size: 1rem; color: \${accent}; animation: pulse 2s ease-in-out infinite; }
      @keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
      #main-content { position: relative; z-index: 10; min-height: 100vh; display: none; align-items: center; justify-content: center; padding: 3rem 2rem; }
      .vip-card { background: rgba(255,255,255,0.08); backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px); border: 1px solid rgba(255,255,255,0.15); border-radius: 36px; padding: 3.5rem 2.5rem; max-width: 580px; width: 100%; box-shadow: 0 25px 50px rgba(0,0,0,0.35); position: relative; overflow: hidden; }
      .vip-card::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: conic-gradient(from 0deg, transparent, \${accent}, transparent); animation: rotate 12s linear infinite; opacity: 0.25; }
      @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      .card-inner { position: relative; z-index: 1; }
      .vip-label { font-size: 0.75rem; letter-spacing: 0.35em; text-transform: uppercase; color: \${accent}; font-weight: 600; margin-bottom: 1.25rem; }
      .vip-title { font-size: clamp(2.2rem, 5vw, 3.5rem); font-weight: 800; color: #fff; line-height: 1.1; margin-bottom: 1.75rem; }
      .vip-gallery-wrap { width: 100%; aspect-ratio: 16/9; border-radius: 20px; overflow: hidden; margin: 1.75rem 0; border: 2px solid rgba(255,255,255,0.1); }
      .vip-photo { width: 100%; height: 100%; object-fit: cover; }
      .vip-msg { font-size: 1.1rem; line-height: 1.8; color: rgba(255,255,255,0.95); margin-bottom: 1.75rem; }
      .vip-sender { font-size: 0.95rem; color: \${accent}; font-weight: 600; letter-spacing: 0.08em; }
    \`}
  \`;

  const html = isBasic ? \`
    <div class="shell">
      <div class="bg-orb orb-1"></div>
      <div class="bg-orb orb-2"></div>
      <div class="card">
        <p class="label">\${d.title || 'Para Ti'}</p>
        <h1 class="title">\${d.recipientName || 'Especial'}</h1>
        \${d.imageUrl ? '<div class="photo-wrap">' + gallery.html + '</div>' : ''}
        <p class="msg" id="type-target"></p>
        <p class="sender">De: \${d.senderName || 'Alguien Especial'}</p>
      </div>
    </div>
  \` : \`
    <canvas id="vip-canvas"></canvas>
    <div class="stars"></div>
    <div class="vip-intro" id="intro">
      <p class="intro-text" id="introText">Una experiencia especial<br/>te espera</p>
      <p class="tap-hint">Toca para comenzar</p>
    </div>
    <div id="main-content">
      <div class="vip-card">
        <div class="card-inner">
          <p class="vip-label">\${d.title || 'Exclusivo Para Ti'}</p>
          <h1 class="vip-title">\${d.recipientName || 'Increible'}</h1>
          \${d.imageUrl ? '<div class="vip-gallery-wrap">' + gallery.html + '</div>' : ''}
          <p class="vip-msg" id="type-target"></p>
          <p class="vip-sender">De: \${d.senderName || 'Alguien Especial'}</p>
        </div>
      </div>
    </div>
  \`;

  const js = isBasic ? \`
    (function() {
      const target = document.getElementById('type-target');
      if (!target) return;
      const text = "\${d.escapedMessage}";
      let i = 0;
      function type() { if (i < text.length) { target.textContent += text.charAt(i); i++; setTimeout(type, 50); } }
      setTimeout(type, 500);
    })();
  \` : \`
    (function() {
      const canvas = document.getElementById('vip-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let width, height, particles = [], mouseX = 0, mouseY = 0;
      function resize() { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; }
      class Particle { constructor() { this.reset(); } reset() { this.x = Math.random() * width; this.y = Math.random() * height; this.vx = (Math.random() - 0.5) * 0.5; this.vy = (Math.random() - 0.5) * 0.5; this.radius = Math.random() * 2 + 1; this.alpha = Math.random() * 0.5 + 0.2; } update() { this.x += this.vx + (mouseX - this.x) * 0.0001; this.y += this.vy + (mouseY - this.y) * 0.0001; if (this.x < 0 || this.x > width) this.vx *= -1; if (this.y < 0 || this.y > height) this.vy *= -1; } draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fillStyle = '\${accent}'; ctx.globalAlpha = this.alpha; ctx.fill(); } }
      function init() { resize(); for (let i = 0; i < 80; i++) particles.push(new Particle()); animate(); }
      function animate() { ctx.clearRect(0, 0, width, height); for (let i = 0; i < particles.length; i++) { for (let j = i + 1; j < particles.length; j++) { const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y, dist = Math.sqrt(dx * dx + dy * dy); if (dist < 100) { ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.strokeStyle = '\${accent}'; ctx.globalAlpha = 0.1 * (1 - dist / 100); ctx.stroke(); } } } particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animate); }
      window.addEventListener('resize', resize);
      window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
      window.addEventListener('touchmove', e => { mouseX = e.touches[0].clientX; mouseY = e.touches[0].clientY; });
      init();
      const intro = document.getElementById('intro'), mainContent = document.getElementById('main-content'), introText = document.getElementById('introText');
      if (intro && introText) {
        if (typeof gsap !== 'undefined') { gsap.to(introText, { opacity: 1, duration: 2, delay: 0.5 }); } else { introText.style.opacity = 1; }
        intro.addEventListener('click', () => {
          const finish = () => { intro.style.display = 'none'; mainContent.style.display = 'flex'; const target = document.getElementById('type-target'); if (target) { const text = "\${d.escapedMessage}"; let i = 0; function type() { if (i < text.length) { target.textContent += text.charAt(i); i++; setTimeout(type, 40); } } setTimeout(type, 800); } };
          if (typeof gsap !== 'undefined') { gsap.to(intro, { opacity: 0, duration: 1, onComplete: finish }); } else { intro.style.opacity = 0; setTimeout(finish, 1000); }
        });
      }
    })();
    \${gallery.js}
  \`;

  return { css, html, js };
}
`;

  const filePath = path.join(templatesDir, `${name}.ts`);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Generated ${name}.ts`);
});

console.log('\n✅ All templates regenerated successfully!');
