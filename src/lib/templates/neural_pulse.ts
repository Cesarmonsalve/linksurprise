// ═══════════════════════════════════════════════════════════════
// STYLE #3: NEURAL PULSE — Neural Network Connections
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput } from './index';

export function renderNeuralPulse(d: TemplateRenderData): TemplateOutput {
  const isBasic = d.renderMode === 'basic';
  
  const css = `
    body { background: #060612; overflow-x: hidden; margin: 0; padding: 0; font-family: sans-serif; }
    
    ${isBasic ? `
    /* BASIC MODE */
    .basic-shell { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; background: radial-gradient(circle at 50% 0%, ${d.accentColor}20 0%, #060612 60%); }
    .basic-card { background: rgba(10,10,25,0.85); border: 1px solid ${d.accentColor}30; border-radius: 20px; padding: 3rem 2rem; max-width: 480px; width: 100%; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
    .pulse-dot { width: 12px; height: 12px; border-radius: 50%; background: ${d.accentColor}; margin: 0 auto 1.5rem; position: relative; box-shadow: 0 0 20px ${d.accentColor}; }
    .pulse-dot::after { content: ''; position: absolute; inset: -8px; border: 2px solid ${d.accentColor}40; border-radius: 50%; animation: pulseDotRing 2s infinite; }
    @keyframes pulseDotRing { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(2.5); opacity: 0; } }
    .neural-label { font-size: 0.7rem; letter-spacing: 0.3em; color: ${d.accentColor}; text-transform: uppercase; margin-bottom: 0.5rem; }
    .neural-title { font-size: clamp(1.5rem,5vw,2.2rem); font-weight: 700; color: ${d.textColor}; line-height: 1.3; margin-bottom: 1.5rem; }
    .neural-msg { font-size: 1rem; line-height: 1.8; color: ${d.textColor}; opacity: 0.8; margin: 1.5rem 0; }
    .neural-photo { width: 100%; max-width: 280px; border-radius: 16px; margin: 1.5rem auto; display: block; }
    .neural-divider { width: 60px; height: 2px; background: ${d.accentColor}; margin: 1.5rem auto; border-radius: 2px; }
    .neural-sender { font-size: 0.85rem; color: ${d.textColor}60; }
    .neural-sender strong { color: ${d.accentColor}; }
    `: `
    /* VIP MODE */
    #neural-canvas { position: fixed; inset: 0; z-index: 0; }
    
    #game-overlay {
      position: fixed; inset: 0; z-index: 100; background: rgba(6,6,18,0.9);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      transition: opacity 1s; padding: 2rem; text-align: center;
    }
    .game-inst { color: #fff; font-size: 1.2rem; margin-bottom: 30px; line-height: 1.5; }
    .node-container { position: relative; width: 300px; height: 300px; border: 2px dashed ${d.accentColor}40; border-radius: 50%; }
    .node { width: 30px; height: 30px; border-radius: 50%; background: ${d.accentColor}; position: absolute; top:50%; left:50%; transform: translate(-50%, -50%); cursor: grab; box-shadow: 0 0 20px ${d.accentColor}; }
    .target-node { width: 40px; height: 40px; border-radius: 50%; border: 3px solid #fff; position: absolute; transform: translate(-50%, -50%); }
    .target-1 { top: 10%; left: 50%; } .target-2 { top: 80%; left: 20%; } .target-3 { top: 80%; left: 80%; }
    
    #main-content {
      position: relative; z-index: 10; min-height: 100vh;
      display: none; align-items: center; justify-content: center; padding: 2rem;
    }
    .neural-card {
      background: rgba(10,10,25,0.7); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
      border: 1px solid ${d.accentColor}20; border-radius: 24px; padding: 3rem 2rem;
      max-width: 500px; width: 100%; text-align: center; box-shadow: 0 40px 80px rgba(0,0,0,0.6);
    }
    .pulse-dot-vip { width: 16px; height: 16px; border-radius: 50%; background: ${d.accentColor}; margin: 0 auto 1.5rem; box-shadow: 0 0 30px ${d.accentColor}; }
    .neural-label { font-size: 0.7rem; letter-spacing: 0.3em; color: ${d.accentColor}; text-transform: uppercase; margin-bottom: 0.5rem; }
    .neural-title { font-size: clamp(1.8rem,6vw,2.5rem); font-weight: 800; color: ${d.textColor}; margin-bottom: 1.5rem; }
    .neural-photo { width: 100%; max-width: 320px; border-radius: 20px; margin: 1.5rem auto; display: block; box-shadow: 0 0 30px ${d.accentColor}20; }
    .neural-msg { font-size: 1.1rem; line-height: 1.8; color: ${d.textColor}; margin: 1.5rem 0; min-height: 50px; }
    .neural-divider { width: 0%; height: 2px; background: ${d.accentColor}; margin: 1.5rem auto; border-radius: 2px; }
    .neural-sender { font-size: 0.85rem; color: ${d.textColor}60; opacity: 0; }
    .neural-sender strong { color: ${d.accentColor}; }
    `}
  `;

  const html = isBasic ? `
    <div class="basic-shell">
      <div class="basic-card">
        <div class="pulse-dot"></div>
        <p class="neural-label">Conexión Establecida</p>
        <h1 class="neural-title">${d.title}</h1>
        <div class="neural-divider"></div>
        ${d.imageUrl ? `<img class="neural-photo" src="${d.imageUrl}" />` : ''}
        <p class="neural-msg" id="type-target"></p>
        <p class="neural-sender">De: <strong>${d.senderName || 'Alguien especial'}</strong></p>
      </div>
    </div>
  ` : `
    <canvas id="neural-canvas"></canvas>
    
    <div id="game-overlay">
      <div class="game-inst">Arrastra el núcleo de energía<br/>para conectar las sinapsis vitales.</div>
      <div class="node-container" id="node-container">
        <div class="target-node target-1" data-t="1"></div>
        <div class="target-node target-2" data-t="2"></div>
        <div class="target-node target-3" data-t="3"></div>
        <div class="node" id="draggable-node"></div>
      </div>
    </div>

    <div id="main-content">
      <div class="neural-card" id="main-card">
        <div class="pulse-dot-vip" id="pulse-vip"></div>
        <p class="neural-label" id="n-label" style="opacity:0">Sincronización Completa</p>
        <h1 class="neural-title" id="n-title"></h1>
        <div class="neural-divider" id="n-div"></div>
        ${d.imageUrl ? `<img class="neural-photo" id="n-img" style="opacity:0" src="${d.imageUrl}" />` : ''}
        <div class="neural-msg" id="type-target"></div>
        <p class="neural-sender" id="n-sender">Sincronizado por: <strong>${d.senderName || 'Alguien especial'}</strong></p>
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
    // Neural Canvas Background
    const c = document.getElementById('neural-canvas');
    const ctx = c.getContext('2d');
    let W, H;
    function resize() { W = c.width = window.innerWidth; H = c.height = window.innerHeight; }
    window.addEventListener('resize', resize); resize();
    
    const nodesCanvas = [];
    for (let i = 0; i < 80; i++) {
      nodesCanvas.push({ 
        x: Math.random()*W, y: Math.random()*H, 
        vx: (Math.random()-0.5), vy: (Math.random()-0.5), 
        r: Math.random()*2+1 
      });
    }
    
    let isConnected = false;
    let mouseActiveX = W/2, mouseActiveY = H/2;
    window.addEventListener('mousemove', e => { mouseActiveX = e.clientX; mouseActiveY = e.clientY; });
    
    function drawNeural() {
      ctx.fillStyle = 'rgba(6,6,18,0.2)';
      ctx.fillRect(0,0,W,H);
      
      const distLimit = isConnected ? 250 : 150;
      
      for (let i = 0; i < nodesCanvas.length; i++) {
        for (let j = i+1; j < nodesCanvas.length; j++) {
          const dx = nodesCanvas[i].x - nodesCanvas[j].x;
          const dy = nodesCanvas[i].y - nodesCanvas[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < distLimit) {
            ctx.beginPath(); ctx.moveTo(nodesCanvas[i].x, nodesCanvas[i].y); ctx.lineTo(nodesCanvas[j].x, nodesCanvas[j].y);
            ctx.strokeStyle = '${d.accentColor}' + Math.floor((1 - dist/distLimit) * (isConnected ? 90 : 40)).toString(16).padStart(2,'0');
            ctx.lineWidth = isConnected ? 1 : 0.5; ctx.stroke();
          }
        }
      }
      
      nodesCanvas.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        
        if (isConnected) {
          const mdx = mouseActiveX - n.x; const mdy = mouseActiveY - n.y;
          if(Math.sqrt(mdx*mdx + mdy*mdy) < 200) { n.x += mdx*0.01; n.y += mdy*0.01; }
        }
        
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI*2);
        ctx.fillStyle = '${d.accentColor}' + (isConnected ? 'cc' : '80'); ctx.fill();
      });
      requestAnimationFrame(drawNeural);
    }
    drawNeural();
    
    // Drag & Drop Mini-game
    const node = document.getElementById('draggable-node');
    const container = document.getElementById('node-container');
    const targets = Array.from(document.querySelectorAll('.target-node'));
    let targetsHit = 0;
    
    // Using vanilla JS for drag to avoid issues, GSAP Draggable is a plugin.
    let isDragging = false;
    node.addEventListener('mousedown', () => isDragging = true);
    node.addEventListener('touchstart', (e) => { isDragging = true; e.preventDefault(); }, {passive: false});
    
    window.addEventListener('mouseup', () => {
      isDragging = false;
      if (targetsHit < 3) {
        gsap.to(node, { top: '50%', left: '50%', duration: 0.5, ease: 'back.out' });
      }
    });
    window.addEventListener('touchend', () => {
       isDragging = false;
       if (targetsHit < 3) gsap.to(node, { top: '50%', left: '50%', duration: 0.5, ease: 'back.out' });
    });
    
    function moveNode(clientX, clientY) {
      if(!isDragging) return;
      const rect = container.getBoundingClientRect();
      let x = clientX - rect.left; let y = clientY - rect.top;
      x = Math.max(0, Math.min(x, rect.width)); y = Math.max(0, Math.min(y, rect.height));
      node.style.left = x + 'px'; node.style.top = y + 'px';
      
      // Check collision
      targets.forEach(t => {
        if(!t.classList.contains('hit')) {
          const tRect = t.getBoundingClientRect();
          const cx = tRect.left + tRect.width/2 - rect.left;
          const cy = tRect.top + tRect.height/2 - rect.top;
          const dist = Math.sqrt(Math.pow(x-cx,2) + Math.pow(y-cy,2));
          if(dist < 30) {
            t.classList.add('hit');
            t.style.background = '${d.accentColor}';
            t.style.borderColor = '${d.accentColor}';
            targetsHit++;
            gsap.from(t, { scale: 2, duration: 0.5, ease: 'back.out' });
            if(targetsHit === 3) finishGame();
          }
        }
      });
    }
    
    window.addEventListener('mousemove', e => moveNode(e.clientX, e.clientY));
    window.addEventListener('touchmove', e => { if(isDragging) { moveNode(e.touches[0].clientX, e.touches[0].clientY); e.preventDefault(); } }, {passive: false});
    
    function finishGame() {
      const audio = document.getElementById('bg-music');
      if (audio) { audio.volume = 0; audio.play(); gsap.to(audio, {volume: 0.8, duration: 2}); }
      
      isConnected = true; // Canvas reacts faster
      gsap.to(node, { scale: 10, opacity: 0, duration: 1 });
      setTimeout(() => {
        document.getElementById('game-overlay').style.opacity = '0';
        setTimeout(() => {
          document.getElementById('game-overlay').style.display = 'none';
          startPresentation();
        }, 1000);
      }, 500);
    }
    
    function startPresentation() {
      document.getElementById('main-content').style.display = 'flex';
      gsap.from('#main-card', { opacity: 0, scale: 0.9, y: 50, duration: 1, ease: 'power3.out' });
      gsap.to('#n-label', { opacity: 1, y: -10, duration: 0.5, delay: 0.5 });
      gsap.to('#n-title', { text: "${d.title}", duration: 1, delay: 0.8 });
      gsap.to('#n-div', { width: '80%', duration: 1, delay: 1.5 });
      
      const delayImg = document.getElementById('n-img') ? 2 : 1.5;
      if(document.getElementById('n-img')) gsap.to('#n-img', { opacity: 1, duration: 1, delay: 1.8 });
      
      setTimeout(() => {
        const target = document.getElementById('type-target');
        const txt = "${d.escapedMessage}";
        let i = 0;
        function type() {
          if(i < txt.length) {
            if(txt.substring(i,i+5)==='<br/>'){target.innerHTML+='<br/>';i+=5;}
            else{target.innerHTML+=txt.charAt(i);i++;}
            setTimeout(type, 30);
          } else {
             gsap.to('#n-sender', { opacity: 1, duration: 1 });
             gsap.to('#pulse-vip', { scale: 1.2, repeat: -1, yoyo: true, duration: 1 });
          }
        }
        type();
      }, delayImg * 1000 + 500);
    }
  `;

  return { css, html, js };
}
