import { TemplateRenderData, TemplateOutput, renderVipGallery } from './index';

export function renderAuroraFlow(d: TemplateRenderData): TemplateOutput {
  const isBasic = d.renderMode === 'basic';
  const gallery = renderVipGallery(d, "auroraflow");
  const c = d.accentColor || '#00ffcc'; // Cyan
  const c2 = '#7b2ff7'; // Purple

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;600;800&display=swap');
    body { background: #080a15; overflow-x: hidden; margin: 0; font-family: 'Jost', sans-serif; color: #fff; }
    
    ${isBasic ? `
    .aurora-bg { position: fixed; inset: 0; background: linear-gradient(135deg, #080a15, #12103a, #080a15); z-index: 0; }
    .aurora-glow-1 { position: absolute; width: 60vw; height: 60vw; background: radial-gradient(circle, ${c}40, transparent 70%); top: -20vh; left: -20vw; filter: blur(50px); animation: pulseA 10s infinite alternate; }
    .aurora-glow-2 { position: absolute; width: 50vw; height: 50vw; background: radial-gradient(circle, ${c2}40, transparent 70%); bottom: -20vh; right: -20vw; filter: blur(50px); animation: pulseA 15s infinite alternate-reverse; }
    @keyframes pulseA { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(1.2); opacity: 1; } }

    .a-shell { min-height: 100vh; padding: 2rem; display: flex; align-items: center; justify-content: center; position: relative; z-index: 10; }
    .a-card { background: rgba(20,20,30,0.4); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 3rem; max-width: 500px; width: 100%; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.05); }
    
    .a-label { font-size: 0.8rem; letter-spacing: 0.4em; color: ${c}; text-transform: uppercase; font-weight: 600; margin-bottom: 1rem; }
    .a-title { font-size: clamp(2rem, 6vw, 3rem); font-weight: 800; color: #fff; line-height: 1.2; margin-bottom: 2rem; }
    .a-photo { width: 100%; border-radius: 12px; margin: 1.5rem 0; box-shadow: 0 10px 30px rgba(0,0,0,0.4); }
    .a-msg { font-size: 1.1rem; line-height: 1.8; color: #ddd; font-weight: 300; }
    .a-div { width: 60px; height: 2px; background: linear-gradient(90deg, transparent, ${c}, transparent); margin: 2rem auto; }
    .a-sender { font-size: 0.9rem; color: #999; }
    .a-sender strong { color: ${c}; font-weight: 600; }
    `: `
    /* VIP MODE - Interactive Aurora Gradient Map */
    #aurora-canvas { position: fixed; inset: 0; z-index: 0; width: 100vw; height: 100vh; }
    
    #overlay-screen { position: fixed; inset: 0; z-index: 100; display: flex; align-items: center; justify-content: center; background: rgba(8,10,21,0.8); backdrop-filter: blur(10px); }
    .begin-btn { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.3); color: #fff; font-family: 'Jost'; font-weight: 400; padding: 15px 40px; font-size: 1.2rem; cursor: pointer; border-radius: 30px; letter-spacing: 2px; text-transform: uppercase; transition: all 0.5s; overflow: hidden; position: relative; }
    .begin-btn::before { content:''; position:absolute; top:0; left:-100%; width:100%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent); transition:all 0.5s; }
    .begin-btn:hover::before { left:100%; }
    .begin-btn:hover { background: rgba(255,255,255,0.2); box-shadow: 0 0 20px ${c}40; border-color: ${c}80; }

    #main-content { position: relative; z-index: 10; min-height: 100vh; padding: 4rem 2rem; display: none; align-items: center; justify-content: center; pointer-events: none; }
    .a-card { background: rgba(10,10,20,0.3); backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px); border: 1px solid rgba(255,255,255,0.1); border-radius: 40px; padding: 4rem; max-width: 600px; width: 100%; text-align: center; box-shadow: 0 30px 60px rgba(0,0,0,0.3); pointer-events: auto; }
    
    .a-label { font-size: 0.8rem; letter-spacing: 0.5em; color: rgba(255,255,255,0.8); text-transform: uppercase; margin-bottom: 2rem; font-weight: 300; }
    .a-title { font-size: clamp(2.5rem, 8vw, 4rem); font-weight: 800; color: #fff; line-height: 1.1; margin-bottom: 3rem; background: linear-gradient(135deg, #fff, rgba(255,255,255,0.5)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    
    .a-photo { width: 100%; max-width: 350px; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); object-fit: cover; aspect-ratio: 4/5; }
    .photo-wrapper { padding: 10px; background: rgba(255,255,255,0.05); border-radius: 30px; display: inline-block; margin-bottom: 3rem; }
    
    .a-msg { font-size: 1.2rem; line-height: 1.9; color: rgba(255,255,255,0.9); font-weight: 300; margin-bottom: 3rem; }
    .a-sender { font-size: 1rem; color: rgba(255,255,255,0.5); font-weight: 300; }
    .a-sender strong { font-weight: 600; font-size: 1.4rem; color: #fff; display: block; margin-top: 5px; }
    `}
  `;

  const html = isBasic ? `
    <div class="aurora-bg"></div>
    <div class="aurora-glow-1"></div>
    <div class="aurora-glow-2"></div>
    
    <div class="a-shell">
      <div class="a-card">
        <p class="a-label">Para ti</p>
        <h1 class="a-title">${d.title}</h1>
        ${d.imageUrl ? gallery.html : ''}
        <div class="a-div"></div>
        <p class="a-msg" id="type-target"></p>
        <div class="a-div"></div>
        <p class="a-sender">De: <strong>${d.senderName || 'Alguien'}</strong></p>
      </div>
    </div>
  ` : `
    <canvas id="aurora-canvas"></canvas>
    
    <div id="overlay-screen">
      <button class="begin-btn" id="start-btn">EXPERIMENTAR</button>
    </div>
    
    <div id="main-content">
      <div class="a-card" id="main-card">
        <p class="a-label gs-st">Destinatario: ${d.recipientName || 'Especial'}</p>
        <h1 class="a-title gs-st">${d.title}</h1>
        ${d.imageUrl ? `
        <div class="photo-wrapper gs-st">
           ${gallery.html}
        </div>` : ''}
        <div class="a-msg gs-st" id="type-target"></div>
        <p class="a-sender gs-st">Con cariño,<br/><strong>${d.senderName || 'Anónimo'}</strong></p>
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
    // VIP MODE ENGINE - Aurora Gradient Canvas
    const canvas = document.getElementById('aurora-canvas');
    const ctx = canvas.getContext('2d');
    let W = window.innerWidth; let H = window.innerHeight;
    canvas.width = W; canvas.height = H;
    
    window.addEventListener('resize', () => { W = window.innerWidth; H = window.innerHeight; canvas.width = W; canvas.height = H; });

    // Interactive mouse coordinates
    let mouse = { x: W/2, y: H/2 };
    let targetMouse = { x: W/2, y: H/2 };
    
    window.addEventListener('mousemove', e => { targetMouse.x = e.clientX; targetMouse.y = e.clientY; });
    window.addEventListener('touchmove', e => { targetMouse.x = e.touches[0].clientX; targetMouse.y = e.touches[0].clientY; }, {passive:true});

    let time = 0;
    
    // Extracted colors
    const col1 = '${c}'; // highlight
    const col2 = '${c2}'; // mid tone
    const col3 = '#141133'; // dark base
    const bgCol = '#080a15'; // bg

    function drawAurora() {
      // Smooth mouse follow
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;
      
      // Clear with background color
      ctx.fillStyle = bgCol;
      ctx.fillRect(0, 0, W, H);
      
      // Blob 1 - Top left ambient
      const g1 = ctx.createRadialGradient(
         W*0.2 + Math.sin(time*0.5)*W*0.1, H*0.2 + Math.cos(time*0.3)*H*0.1, 0,
         W*0.2, H*0.2, W*0.8
      );
      g1.addColorStop(0, col2 + '80');
      g1.addColorStop(1, 'transparent');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, W, H);
      
      // Blob 2 - Bottom right ambient
      const g2 = ctx.createRadialGradient(
         W*0.8 + Math.cos(time*0.4)*W*0.1, H*0.8 + Math.sin(time*0.2)*H*0.1, 0,
         W*0.8, H*0.8, W*0.8
      );
      g2.addColorStop(0, col3 + 'CC');
      g2.addColorStop(1, 'transparent');
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, W, H);
      
      // Blob 3 - Interactive Mouse Blob
      const g3 = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, W*0.6);
      g3.addColorStop(0, col1 + '50');
      g3.addColorStop(1, 'transparent');
      ctx.fillStyle = g3;
      ctx.fillRect(0, 0, W, H);
      
      // Wave lines simulation
      ctx.globalCompositeOperation = 'lighter';
      for(let i=0; i<3; i++) {
         ctx.beginPath();
         let yOff = 0;
         for(let x=0; x<=W; x+=50) {
            yOff = Math.sin(x*0.005 + time + i) * H*0.2 + Math.cos(x*0.002 - Math.min(time, 1) + i*0.5) * H*0.1;
            const y = H*0.5 + yOff + (i-1)*H*0.2;
            if(x===0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
         }
         ctx.strokeStyle = col1 + Math.floor(20 - i*5).toString(16).padStart(2,'0');
         ctx.lineWidth = 100 + i*50;
         ctx.lineCap = 'round';
         ctx.stroke();
      }
      
      ctx.globalCompositeOperation = 'source-over';
      time += 0.01;
      requestAnimationFrame(drawAurora);
    }
    
    // Start button
    const startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', () => {
      const audio = document.getElementById('bg-music');
      if (audio) { audio.volume = 0; audio.play(); gsap.to(audio, {volume: 0.6, duration: 4}); }
      
      gsap.to('#overlay-screen', { opacity: 0, duration: 2, ease: 'power2.inOut', onComplete: () => {
         document.getElementById('overlay-screen').style.display = 'none';
         document.getElementById('main-content').style.display = 'flex';
         
         // Start drawing
         drawAurora();
         
         // Animate entry
         gsap.set('.gs-st', { autoAlpha: 0, y: 30, scale: 0.95 });
         gsap.to('.gs-st', { autoAlpha: 1, y: 0, scale: 1, duration: 1.5, stagger: 0.2, ease: 'power3.out', delay: 0.5 });
         
         setTimeout(() => {
           const target = document.getElementById('type-target');
           const txt = "${d.escapedMessage}";
           let i = 0;
           function type() {
             if(i < txt.length) {
               if(txt.substring(i,i+5)==='<br/>'){target.innerHTML+='<br/>';i+=5;}
               else{target.innerHTML+=txt.charAt(i);i++;}
               setTimeout(type, 30);
             }
           }
           type();
         }, 2000);
      }});
    });
    
    // Card tilt
    const card = document.getElementById('main-card');
    window.addEventListener('mousemove', e => {
      const x = (e.clientX / W - 0.5) * 10;
      const y = (e.clientY / H - 0.5) * 10;
      gsap.to(card, { rotationY: x, rotationX: -y, duration: 1, ease: 'power2.out' });
    });

    ${gallery.js}`;

  return { css, html, js };
}
