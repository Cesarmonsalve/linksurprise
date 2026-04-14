// ═══════════════════════════════════════════════════════════════
// STYLE #17: PARTICLE BURST — Dynamic Energy
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput, renderVipGallery } from './index';

export function renderParticleBurst(d: TemplateRenderData): TemplateOutput {
  const isBasic = d.renderMode === 'basic';
  const gallery = renderVipGallery(d, "particleburst");
  const c = d.accentColor || '#ff0055';

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;700;900&display=swap');
    body { background: #050505; overflow-x: hidden; margin: 0; font-family: 'Montserrat', sans-serif; }
    
    ${isBasic ? `
    .pb-shell { min-height: 100vh; padding: 2rem; display: flex; align-items: center; justify-content: center; position: relative; }
    
    .particles-css { position: absolute; inset: 0; overflow: hidden; z-index: 0; pointer-events: none; }
    .p-css { position: absolute; background: ${c}; border-radius: 50%; opacity: 0; animation: floatUp var(--dr) ease-in infinite forwards; }
    @keyframes floatUp { 0% { transform: translateY(100vh) scale(0); opacity: 0; } 20% { opacity: 0.8; } 80% { opacity: 0.8; } 100% { transform: translateY(-20vh) scale(1); opacity: 0; } }
    
    .pb-card { background: rgba(20,20,20,0.8); backdrop-filter: blur(10px); border: 2px solid ${c}40; border-radius: 20px; padding: 3rem 2rem; max-width: 500px; width: 100%; text-align: center; position: relative; z-index: 10; box-shadow: 0 0 40px ${c}20; }
    .pb-label { font-size: 0.7rem; letter-spacing: 0.4em; color: ${c}; text-transform: uppercase; font-weight: 700; margin-bottom: 1rem; }
    .pb-title { font-size: clamp(2rem, 6vw, 3rem); font-weight: 900; color: #fff; line-height: 1.1; margin-bottom: 2rem; text-shadow: 0 0 10px ${c}80; }
    .pb-photo { width: 100%; border-radius: 10px; margin: 1.5rem auto; display: block; border: 1px solid ${c}60; box-shadow: 0 0 20px ${c}40; }
    .pb-msg { font-size: 1.1rem; line-height: 1.8; color: #ddd; font-weight: 300; }
    .pb-sender { font-size: 0.9rem; color: #888; font-weight: 300; margin-top: 2rem; }
    .pb-sender strong { color: ${c}; font-weight: 700; }
    `: `
    /* VIP MODE - Canvas Particle Engine */
    #canvas-container { position: fixed; inset: 0; z-index: 0; background: #000; cursor: crosshair; }
    
    #start-overlay { position: fixed; inset: 0; z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(0,0,0,0.8); backdrop-filter: blur(5px); }
    .burst-inst { font-size: 2rem; font-weight: 900; color: #fff; letter-spacing: 5px; text-transform: uppercase; margin-bottom: 2rem; text-align: center; text-shadow: 0 0 20px ${c}; animation: pulseT 2s infinite; }
    @keyframes pulseT { 50% { opacity: 0.5; transform: scale(0.95); } }
    .burst-btn { background: transparent; border: 2px solid ${c}; color: ${c}; font-family: 'Montserrat'; font-weight: 700; padding: 15px 40px; font-size: 1.2rem; cursor: pointer; transition: all 0.3s; box-shadow: inset 0 0 10px ${c}00, 0 0 20px ${c}40; }
    .burst-btn:hover { background: ${c}; color: #000; box-shadow: inset 0 0 10px ${c}, 0 0 40px ${c}; }

    #main-content { position: relative; z-index: 10; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; pointer-events: none; opacity: 0; }
    .pb-card { background: rgba(10,10,10,0.6); backdrop-filter: blur(15px); border: 1px solid ${c}30; border-radius: 30px; padding: 4rem 3rem; max-width: 600px; width: 100%; text-align: center; pointer-events: auto; transform: scale(0.9); }
    
    .pb-label { font-size: 0.8rem; letter-spacing: 0.5em; color: ${c}; text-transform: uppercase; font-weight: 700; margin-bottom: 1rem; }
    .pb-title { font-size: clamp(2.5rem, 8vw, 4rem); font-weight: 900; color: #fff; line-height: 1.1; margin-bottom: 2rem; text-shadow: 0 0 20px ${c}; }
    .pb-photo { width: 100%; max-width: 400px; border-radius: 20px; box-shadow: 0 0 50px ${c}40; margin: 2rem auto; border: 2px solid ${c}50; }
    
    .pb-msg { font-size: 1.2rem; line-height: 1.8; color: #fff; font-weight: 300; margin-bottom: 2rem; }
    .pb-sender { margin-top: 3rem; font-size: 1rem; color: #888; font-weight: 300; }
    .pb-sender strong { display: block; font-size: 1.5rem; color: ${c}; font-weight: 900; margin-top: 10px; text-transform: uppercase; letter-spacing: 2px; }
    `}
  `;

  let html = '';
  if (isBasic) {
    let parts = '';
    for(let i=0; i<30; i++) {
        const l = Math.random()*100; const d = Math.random()*5+3; const s = Math.random()*6+2;
        parts += `<div class="p-css" style="left:${l}%; width:${s}px; height:${s}px; --dr:${d}s; animation-delay:${Math.random()*2}s;"></div>`;
    }
    html = `
      <div class="particles-css">${parts}</div>
      <div class="pb-shell">
        <div class="pb-card">
          <p class="pb-label">Energía para ${d.recipientName || 'ti'}</p>
          <h1 class="pb-title">${d.title}</h1>
          ${d.imageUrl ? gallery.html : ''}
          <p class="pb-msg" id="type-target"></p>
          <p class="pb-sender">Emitido por <strong>${d.senderName || 'Alguien'}</strong></p>
        </div>
      </div>
    `;
  } else {
    html = `
      <canvas id="canvas-container"></canvas>
      
      <div id="start-overlay">
        <div class="burst-inst">TOCA PARA DETONAR</div>
        <button class="burst-btn" id="start-btn">INICIAR REACCIÓN</button>
      </div>
      
      <div id="main-content">
        <div class="pb-card" id="main-card">
          <p class="pb-label gs-el">Para ${d.recipientName || 'Ti'}</p>
          <h1 class="pb-title gs-el">${d.title}</h1>
          ${d.imageUrl ? gallery.html : ''}
          <div class="pb-msg gs-el" id="type-target"></div>
          <p class="pb-sender gs-el">Desde el centro de la galaxia,<br/><strong>${d.senderName || 'Anónimo'}</strong></p>
        </div>
      </div>
    `;
  }

  const js = isBasic ? `
    const target = document.getElementById('type-target');
    const txt = "${d.escapedMessage}";
    let i = 0;
    function type() {
      if(i < txt.length){
        if(txt.substring(i,i+5)==='<br/>'){target.innerHTML+='<br/>';i+=5;}
        else{target.innerHTML+=txt.charAt(i);i++;}
        setTimeout(type, 30);
      }
    }
    setTimeout(type, 800);
  ` : `
    // VIP MODE ENGINE - Canvas Particle Physics System
    const canvas = document.getElementById('canvas-container');
    const ctx = canvas.getContext('2d');
    let W = window.innerWidth; let H = window.innerHeight;
    canvas.width = W; canvas.height = H;
    
    window.addEventListener('resize', () => { W = window.innerWidth; H = window.innerHeight; canvas.width = W; canvas.height = H; });

    class Particle {
      constructor(x, y, isBurst = false) {
        this.x = x; this.y = y;
        this.r = Math.random() * 4 + 1;
        const angle = Math.random() * Math.PI * 2;
        const speed = isBurst ? Math.random() * 20 + 5 : Math.random() * 2 + 0.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.color = Math.random() > 0.5 ? '${c}' : '#ffffff';
        this.alpha = 1;
        this.decay = isBurst ? Math.random() * 0.02 + 0.01 : 0.005;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        this.alpha -= this.decay;
        this.r *= 0.98;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10; ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    let particles = [];
    let isRunning = true;
    
    function animate() {
      if(!isRunning) return;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // trailing effect
      ctx.fillRect(0, 0, W, H);
      
      for(let i=particles.length-1; i>=0; i--) {
         particles[i].update();
         particles[i].draw();
         if(particles[i].alpha <= 0 || particles[i].r <= 0.1) particles.splice(i, 1);
      }
      requestAnimationFrame(animate);
    }
    animate();

    function createBurst(x, y, count) {
      for(let i=0; i<count; i++) particles.push(new Particle(x, y, true));
    }
    
    // Auto ambient particles
    setInterval(() => {
      if(particles.length < 50) particles.push(new Particle(Math.random()*W, Math.random()*H, false));
    }, 100);

    const startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', (e) => {
      const audio = document.getElementById('bg-music');
      if (audio) { audio.volume = 0; audio.play(); gsap.to(audio, {volume: 0.8, duration: 2}); }
      
      const rect = startBtn.getBoundingClientRect();
      const cX = rect.left + rect.width/2;
      const cY = rect.top + rect.height/2;
      
      createBurst(cX, cY, 200); // MEGA BURST
      
      gsap.to('#start-overlay', { opacity: 0, duration: 0.5, onComplete: () => document.getElementById('start-overlay').style.display='none' });
      
      setTimeout(showContent, 1000);
    });
    
    // Interactive mouse bursts
    canvas.addEventListener('mousemove', (e) => {
       if(Math.random() > 0.8) createBurst(e.clientX, e.clientY, 5);
    });
    canvas.addEventListener('click', (e) => {
       createBurst(e.clientX, e.clientY, 50);
       // Sound effect could go here
    });

    function showContent() {
      const mc = document.getElementById('main-content');
      mc.style.opacity = '1';
      
      gsap.set('.gs-el', { autoAlpha: 0, y: 50, scale: 0.8 });
      gsap.to('#main-card', { scale: 1, duration: 1, ease: 'back.out(1.5)' });
      gsap.to('.gs-el', { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out', delay: 0.5, onComplete: () => {
         const target = document.getElementById('type-target');
         const txt = "${d.escapedMessage}";
         let i = 0;
         function type() {
           if(i < txt.length) {
             if(txt.substring(i,i+5)==='<br/>'){target.innerHTML+='<br/>';i+=5;}
             else{target.innerHTML+=txt.charAt(i);i++;}
             setTimeout(type, 20);
           }
         }
         type();
      }});
      
      // Card Parallax
      const card = document.getElementById('main-card');
      window.addEventListener('mousemove', e => {
         const x = (e.clientX / W - 0.5) * 20;
         const y = (e.clientY / H - 0.5) * 20;
         gsap.to(card, { rotationY: x, rotationX: -y, duration: 0.5 });
      });
    }
  
    ${gallery.js}`;

  return { css, html, js };
}
