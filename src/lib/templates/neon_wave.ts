import { TemplateRenderData, TemplateOutput, renderVipGallery } from './index';

export function renderNeonWave(d: TemplateRenderData): TemplateOutput {
  const isBasic = d.renderMode === 'basic';
  const gallery = renderVipGallery(d, "neonwave");

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@300;600&display=swap');
    body { background: #050510; color: #fff; overflow-x: hidden; margin: 0; font-family: 'Exo 2', sans-serif; }
    
    .neon-shell { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; position: relative; }
    
    ${isBasic ? `
    /* BASIC MODE */
    .neon-card { background: rgba(10,10,30,0.8); border: 2px solid ${d.accentColor}; border-radius: 20px; padding: 3rem 2rem; max-width: 480px; width: 100%; text-align: center; box-shadow: 0 0 30px ${d.accentColor}50; }
    .neon-title { font-family: 'Orbitron', sans-serif; font-size: 2.5rem; font-weight: 900; color: #fff; text-shadow: 0 0 10px ${d.accentColor}, 0 0 20px ${d.accentColor}; margin-bottom: 1.5rem; line-height: 1.1; }
    .neon-msg { font-size: 1.1rem; line-height: 1.8; color: #fff; }
    .neon-photo { width: 100%; max-width: 300px; border-radius: 12px; margin: 1.5rem auto; display: block; border: 1px solid ${d.accentColor}; box-shadow: 0 0 15px ${d.accentColor}30; }
    .neon-sender { font-size: 0.9rem; color: #aaa; margin-top: 2rem; }
    .neon-sender strong { color: ${d.accentColor}; font-family: 'Orbitron'; letter-spacing: 1px; }
    `: `
    /* VIP MODE */
    #draw-canvas { position: fixed; inset: 0; z-index: 0; }
    
    #game-overlay {
      position: fixed; inset: 0; z-index: 100; background: rgba(5,5,15,0.9); backdrop-filter: blur(10px);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      transition: opacity 1s; padding: 2rem;
    }
    .neon-btn {
      background: transparent; border: 2px solid ${d.accentColor}; color: ${d.accentColor};
      padding: 15px 40px; font-family: 'Orbitron', sans-serif; font-weight: 900; font-size: 1.2rem;
      cursor: pointer; position: relative; overflow: hidden; transition: all 0.3s;
      box-shadow: 0 0 20px ${d.accentColor}40, inset 0 0 10px ${d.accentColor}40;
    }
    .neon-btn:hover { background: ${d.accentColor}; color: #000; box-shadow: 0 0 40px ${d.accentColor}; }
    .neon-inst { color: #fff; font-family: 'Orbitron'; font-size: 0.9rem; letter-spacing: 2px; margin-top: 20px; opacity: 0.6; }
    
    #main-content {
      position: relative; z-index: 10; min-height: 100vh;
      display: none; align-items: center; justify-content: center; padding: 2rem;
    }
    .neon-v-card {
      background: rgba(10,10,30,0.4); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      border: 1px solid ${d.accentColor}30; border-radius: 20px; padding: 4rem 3rem;
      max-width: 500px; width: 100%; text-align: center; box-shadow: 0 0 60px ${d.accentColor}20;
    }
    .n-label { font-family: 'Orbitron'; font-size: 0.7rem; letter-spacing: 0.4em; color: ${d.accentColor}; text-transform: uppercase; margin-bottom: 1rem; }
    .n-title { font-family: 'Orbitron'; font-size: clamp(2rem,6vw,3.2rem); font-weight: 900; color: #fff; line-height: 1; margin-bottom: 2rem; opacity:0; transform: scale(0.8); }
    .n-photo-wrap { position: relative; display: inline-block; margin: 1rem 0; opacity: 0; }
    .n-photo-wrap::after { content: ''; position: absolute; inset: -5px; border: 1px solid ${d.accentColor}; border-radius: 14px; opacity: 0.5; }
    .n-photo { width: 100%; max-width: 320px; border-radius: 10px; display: block; box-shadow: 0 0 30px ${d.accentColor}30; }
    .n-msg { font-size: 1.2rem; line-height: 1.8; color: #fff; margin: 2rem 0; min-height: 60px; opacity: 0; }
    .n-sender { font-family: 'Orbitron'; font-size: 0.8rem; color: ${d.accentColor}; opacity: 0; margin-top: 2rem; }
    .n-sender strong { color: #fff; font-size: 1.1rem; display: block; margin-top: 5px; }
    `}
  `;

  const html = isBasic ? `
    <div class="neon-shell">
      <div class="neon-card">
        <h1 class="neon-title">${d.title}</h1>
        ${d.imageUrl ? gallery.html : ''}
        <p class="neon-msg" id="type-target"></p>
        <p class="neon-sender">ACCESO CONCEDIDO POR: <strong>${d.senderName || 'USER_ADMIN'}</strong></p>
      </div>
    </div>
  ` : `
    <canvas id="draw-canvas"></canvas>
    
    <div id="game-overlay">
      <button class="neon-btn" id="start-btn">INICIAR SISTEMA</button>
      <div class="neon-inst">DIBUJA EN LA OSCURIDAD</div>
    </div>

    <div id="main-content">
      <div class="neon-v-card" id="main-card">
        <p class="n-label">Sincronización de Datos</p>
        <h1 class="n-title">${d.title}</h1>
        ${d.imageUrl ? `
        <div class="n-photo-wrap">
          ${gallery.html}
        </div>` : ''}
        <div class="n-msg" id="type-target"></div>
        <p class="n-sender">TRANSMISIÓN_DE: <strong>${d.senderName || 'ALGUIEN'}</strong></p>
      </div>
    </div>
  `;

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
    // VIP MODE ENGINE
    const startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', () => {
      const audio = document.getElementById('bg-music');
      if (audio) { audio.volume = 0; audio.play(); gsap.to(audio, {volume: 0.8, duration: 2}); }
      
      document.getElementById('game-overlay').style.opacity = '0';
      setTimeout(() => {
        document.getElementById('game-overlay').style.display = 'none';
        initCanvas();
        startReveal();
      }, 1000);
    });
    
    function startReveal() {
      document.getElementById('main-content').style.display = 'flex';
      gsap.to('.n-title', { opacity: 1, scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)', delay: 0.2 });
      
      if(document.querySelector('.n-photo-wrap')) {
         gsap.to('.n-photo-wrap', { opacity: 1, duration: 1, delay: 0.5 });
      }
      
      setTimeout(() => {
        gsap.to('.n-msg', { opacity: 1, duration: 0.5 });
        const target = document.getElementById('type-target');
        const txt = "${d.escapedMessage}";
        let i = 0;
        function type() {
          if(i < txt.length) {
            if(txt.substring(i,i+5)==='<br/>'){target.innerHTML+='<br/>';i+=5;}
            else{target.innerHTML+=txt.charAt(i);i++;}
            setTimeout(type, 20); // Fast cyber typing
          } else {
            gsap.to('.n-sender', { opacity: 1, duration: 1 });
          }
        }
        type();
      }, document.querySelector('.n-photo-wrap') ? 1500 : 800);
      
      // 3D Tilt
      const card = document.getElementById('main-card');
      window.addEventListener('mousemove', e => {
         const x = (e.clientX / window.innerWidth - 0.5) * 15;
         const y = (e.clientY / window.innerHeight - 0.5) * 15;
         gsap.to(card, { rotationY: x, rotationX: -y, duration: 0.2 });
      });
    }
    
    // Interactive Neon Trail Canvas
    function initCanvas() {
      const canvas = document.getElementById('draw-canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth; canvas.height = window.innerHeight;
      
      window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
      
      let mouse = { x: null, y: null };
      let lastMouse = { x: null, y: null };
      
      window.addEventListener('mousemove', (e) => {
         lastMouse.x = mouse.x; lastMouse.y = mouse.y;
         mouse.x = e.clientX; mouse.y = e.clientY;
         if(lastMouse.x !== null && lastMouse.y !== null) drawLine();
      });
      
      window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; lastMouse.x = null; lastMouse.y = null; });
      
      let hue = 300; // start near magenta
      
      function drawLine() {
        ctx.beginPath();
        ctx.moveTo(lastMouse.x, lastMouse.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = \`hsl(\${hue}, 100%, 50%)\`;
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.shadowBlur = 15;
        ctx.shadowColor = \`hsl(\${hue}, 100%, 50%)\`;
        
        ctx.stroke();
        
        hue += 2;
        if(hue >= 360) hue = 0;
      }
      
      // Auto fade canvas
      function animate() {
         ctx.globalCompositeOperation = 'destination-out';
         ctx.fillStyle = 'rgba(0,0,0,0.05)';
         ctx.fillRect(0,0,canvas.width,canvas.height);
         ctx.globalCompositeOperation = 'source-over';
         requestAnimationFrame(animate);
      }
      animate();
    }
    
    ${gallery.js}`;

  return { css, html, js };
}
