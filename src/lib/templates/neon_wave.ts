// ═══════════════════════════════════════════════════════════════
// STYLE #19: NEON WAVE — Cyberpunk / Synthwave
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput } from './index';

export function renderNeonWave(d: TemplateRenderData): TemplateOutput {
  const isBasic = d.renderMode === 'basic';
  const c = d.accentColor || '#ff00ff';
  const c2 = '#00ffff'; // Cyan secondary

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;600&display=swap');
    body { background: #050014; overflow-x: hidden; margin: 0; font-family: 'Rajdhani', sans-serif; color: #fff; }
    
    .neon-grid { position: fixed; bottom: 0; left: 0; width: 100vw; height: 50vh; background-image: linear-gradient(transparent 65%, rgba(0, 255, 255, 0.4) 70%, ${c} 100%), linear-gradient(90deg, transparent 65%, rgba(0, 255, 255, 0.4) 70%, ${c} 100%); background-size: 40px 40px; transform: perspective(500px) rotateX(60deg) translateY(100px) translateZ(-200px); animation: gridMove 2s linear infinite; z-index: 0; opacity: 0.3; }
    @keyframes gridMove { 0% { transform: perspective(500px) rotateX(60deg) translateY(100px) translateZ(-200px); } 100% { transform: perspective(500px) rotateX(60deg) translateY(140px) translateZ(-200px); } }

    ${isBasic ? `
    .neon-shell { min-height: 100vh; padding: 2rem; display: flex; align-items: center; justify-content: center; position: relative; z-index: 10; }
    .neon-card { background: rgba(5, 0, 20, 0.8); border: 2px solid ${c}; border-radius: 12px; padding: 3rem 2rem; max-width: 500px; width: 100%; text-align: center; box-shadow: 0 0 20px ${c}, inset 0 0 20px ${c}; backdrop-filter: blur(10px); }
    .neon-label { font-family: 'Orbitron', sans-serif; font-size: 0.8rem; letter-spacing: 0.3em; color: ${c2}; text-transform: uppercase; margin-bottom: 1rem; text-shadow: 0 0 5px ${c2}; }
    .neon-title { font-family: 'Orbitron', sans-serif; font-size: clamp(2rem, 6vw, 3rem); font-weight: 900; color: #fff; line-height: 1.1; margin-bottom: 2rem; text-shadow: 0 0 10px #fff, 0 0 20px ${c}, 0 0 40px ${c}; }
    .neon-photo { width: 100%; border-radius: 8px; border: 2px solid ${c2}; box-shadow: 0 0 15px ${c2}; margin: 1.5rem 0; filter: contrast(1.2) saturate(1.5); }
    .neon-msg { font-size: 1.2rem; line-height: 1.7; color: #eee; font-weight: 600; text-shadow: 0 0 3px ${c}; }
    .neon-sender { font-family: 'Orbitron'; font-size: 1rem; color: ${c2}; margin-top: 2rem; text-shadow: 0 0 5px ${c2}; }
    `: `
    /* VIP MODE - Drawing Canvas & Glitch */
    #draw-canvas { position: fixed; inset: 0; z-index: 5; pointer-events: none; }
    
    #start-screen { position: fixed; inset: 0; z-index: 100; display: flex; align-items: center; justify-content: center; background: #050014; }
    .neon-sys { font-family: 'Orbitron'; color: ${c2}; font-size: 1.5rem; text-align: center; text-shadow: 0 0 10px ${c2}; }
    .boot-btn { margin-top: 30px; background: transparent; border: 2px solid ${c}; color: ${c}; padding: 15px 40px; font-family: 'Orbitron'; font-weight: 700; font-size: 1.2rem; cursor: pointer; text-shadow: 0 0 5px ${c}; box-shadow: 0 0 10px ${c}, inset 0 0 10px ${c}; transition: all 0.2s; text-transform: uppercase; }
    .boot-btn:hover { background: ${c}; color: #000; box-shadow: 0 0 30px ${c}, inset 0 0 20px ${c}; }
    .boot-btn:active { transform: scale(0.95); }

    #main-content { position: relative; z-index: 10; min-height: 100vh; padding: 4rem 2rem; display: none; align-items: center; justify-content: center; }
    .n-card { background: rgba(5,0,20,0.6); border: 1px solid rgba(0,255,255,0.3); border-radius: 16px; padding: 4rem 3rem; max-width: 600px; width: 100%; text-align: center; box-shadow: inset 0 0 30px rgba(255,0,255,0.2); backdrop-filter: blur(10px); transform-style: preserve-3d; }
    
    .n-label { font-family: 'Orbitron'; font-size: 1rem; letter-spacing: 0.5em; color: ${c2}; margin-bottom: 1rem; text-shadow: 0 0 10px ${c2}; opacity: 0; transform: translateY(20px); }
    .n-title { font-family: 'Orbitron'; font-size: clamp(2.5rem, 8vw, 4.5rem); font-weight: 900; color: #fff; line-height: 1.1; margin-bottom: 2rem; text-shadow: 0 0 5px #fff, 0 0 20px ${c}, 0 0 40px ${c}; opacity: 0; transform: scale(0.9); }
    
    .n-photo-wrap { position: relative; display: inline-block; padding: 5px; opacity: 0; }
    .n-photo-wrap::before { content: ''; position: absolute; inset: 0; background: linear-gradient(45deg, ${c}, ${c2}); z-index: -1; border-radius: 12px; filter: blur(5px); animation: pulse Glow 2s infinite alternate; }
    .n-photo { width: 100%; max-width: 400px; border-radius: 8px; border: 2px solid ${c}; mix-blend-mode: screen; filter: contrast(1.3) saturate(1.5) hue-rotate(-10deg); }
    
    .n-msg { font-size: 1.3rem; line-height: 1.8; color: #fff; font-weight: 600; text-shadow: 0 0 4px rgba(255,255,255,0.5); margin: 2rem 0; opacity: 0; }
    .n-sender { font-family: 'Orbitron'; font-size: 1.2rem; color: ${c2}; margin-top: 3rem; text-shadow: 0 0 10px ${c2}; opacity: 0; }
    
    .scanline { position: fixed; top: 0; left: 0; width: 100%; height: 50px; background: linear-gradient(to bottom, transparent, ${c2}40, transparent); z-index: 99; pointer-events: none; animation: scan 6s linear infinite; }
    @keyframes scan { 0% { top: -50px; } 100% { top: 100vh; } }
    `}
  `;

  const html = isBasic ? `
    <div class="neon-grid"></div>
    <div class="neon-shell">
      <div class="neon-card">
        <p class="neon-label">Conexión Segura</p>
        <h1 class="neon-title">${d.title}</h1>
        ${d.imageUrl ? `<img class="neon-photo" src="${d.imageUrl}" />` : ''}
        <p class="neon-msg" id="type-target"></p>
        <p class="neon-sender">// ${d.senderName || 'USER_UNKNOWN'}</p>
      </div>
    </div>
  ` : `
    <div class="neon-grid"></div>
    <div class="scanline"></div>
    <canvas id="draw-canvas"></canvas>
    
    <div id="start-screen">
      <div class="neon-sys">
        <div id="boot-text">SISTEMA OFFLINE</div>
        <button class="boot-btn" id="boot-btn">ESTABLECER ENLACE</button>
      </div>
    </div>
    
    <div id="main-content">
      <div class="n-card" id="main-card">
        <p class="n-label gs-el">TRANSMISIÓN PARA ${d.recipientName || 'TI'}</p>
        <h1 class="n-title gs-el">${d.title}</h1>
        ${d.imageUrl ? `
        <div class="n-photo-wrap gs-el">
          <img class="n-photo" src="${d.imageUrl}" />
        </div>` : ''}
        <div class="n-msg gs-el" id="type-target"></div>
        <p class="n-sender gs-el">// DATOS DE: ${d.senderName || 'ANÓNIMO'}</p>
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
    // VIP MODE ENGINE - Cyberpunk Boot & Neon Canvas
    const bootBtn = document.getElementById('boot-btn');
    bootBtn.addEventListener('click', () => {
      const audio = document.getElementById('bg-music');
      if (audio) { audio.volume = 0; audio.play(); gsap.to(audio, {volume: 0.7, duration: 3}); }
      
      const txt = document.getElementById('boot-text');
      txt.innerText = "SISTEMA ONLINE. CARGANDO...";
      bootBtn.style.display = 'none';
      
      // Glitch effect on out
      const ss = document.getElementById('start-screen');
      gsap.to(ss, { x: 10, y: -10, filter: 'hue-rotate(90deg) contrast(2)', duration: 0.1, yoyo: true, repeat: 5, onComplete: () => {
         gsap.to(ss, { opacity: 0, duration: 0.5, onComplete: () => {
             ss.style.display = 'none';
             showCard();
             initCanvas();
         }});
      }});
    });
    
    function showCard() {
      document.getElementById('main-content').style.display = 'flex';
      
      gsap.to('.n-label', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
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
  `;

  return { css, html, js };
}
