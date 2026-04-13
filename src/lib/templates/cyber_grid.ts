// ═══════════════════════════════════════════════════════════════
// STYLE #2: CYBER GRID — Hacker Terminal Game
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput } from './index';

export function renderCyberGrid(d: TemplateRenderData): TemplateOutput {
  const isBasic = d.renderMode === 'basic';
  const termColor = d.accentColor || '#00ffcc';

  const css = `
    body { background: #000; overflow-x: hidden; font-family: 'Courier New', Courier, monospace; margin: 0; padding: 0; }
    
    ${isBasic ? `
    /* BASIC MODE STYLES */
    .basic-shell {
      min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem;
      background: linear-gradient(180deg, #000 0%, #051015 100%);
    }
    .basic-card {
      background: rgba(0,20,20,0.4); border: 1px solid ${termColor}40;
      box-shadow: 0 0 20px ${termColor}20, inset 0 0 10px ${termColor}10;
      border-radius: 8px; padding: 3rem 2rem; max-width: 500px; width: 100%; text-align: left;
    }
    .cyber-sys { font-weight: bold; color: ${termColor}; font-size: 0.8rem; margin-bottom: 5px; text-transform: uppercase; }
    .cyber-title { font-size: 1.5rem; font-weight: bold; color: #fff; margin-bottom: 20px; }
    .cyber-photo { width: 100%; border: 1px solid ${termColor}50; margin: 20px 0; border-radius: 4px; filter: contrast(1.2) sepia(1) hue-rotate(130deg) saturate(2); }
    .cyber-msg { color: #aaa; line-height: 1.6; }
    .cyber-cursor { display: inline-block; width: 10px; height: 1em; background: ${termColor}; animation: blink 1s step-end infinite; vertical-align: text-bottom; }
    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
    `: `
    /* VIP MODE STYLES */
    #matrix-canvas { position: fixed; inset: 0; z-index: 0; opacity: 0.15; }
    .scanlines { position: fixed; inset: 0; background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2)); background-size: 100% 4px; z-index: 99; pointer-events: none; }
    
    #terminal-overlay {
      position: fixed; inset: 0; z-index: 50; background: #000;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 2rem; color: ${termColor};
    }
    
    .term-box {
      width: 100%; max-width: 600px; border: 2px solid ${termColor}; padding: 20px;
      background: rgba(0,20,20,0.8); box-shadow: 0 0 30px ${termColor}40;
    }
    .term-header { border-bottom: 1px solid ${termColor}; padding-bottom: 10px; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 2px; }
    .term-line { margin-bottom: 10px; }
    .term-input-line { display: flex; align-items: center; margin-top: 20px; }
    .term-prompt { margin-right: 10px; font-weight: bold; }
    .term-input { 
      background: transparent; border: none; color: #fff; font-family: 'Courier New', Courier, monospace; 
      font-size: 1rem; outline: none; flex-grow: 1; text-transform: uppercase;
    }
    .term-input::placeholder { color: ${termColor}50; }
    
    #main-content {
      position: relative; z-index: 10; display: none; flex-direction: column; align-items: center;
      min-height: 100vh; padding: 4rem 2rem;
    }
    .hud-box {
      border: 1px solid ${termColor}60; padding: 30px; background: rgba(0,0,0,0.7);
      box-shadow: 0 0 50px ${termColor}30, inset 0 0 20px ${termColor}20;
      max-width: 600px; width: 100%; position: relative;
    }
    .hud-corner { position: absolute; width: 20px; height: 20px; border: 2px solid ${termColor}; }
    .hud-tl { top: -2px; left: -2px; border-right: none; border-bottom: none; }
    .hud-tr { top: -2px; right: -2px; border-left: none; border-bottom: none; }
    .hud-bl { bottom: -2px; left: -2px; border-right: none; border-top: none; }
    .hud-br { bottom: -2px; right: -2px; border-left: none; border-top: none; }
    
    .hud-sys { font-size: 0.8rem; letter-spacing: 2px; color: ${termColor}; margin-bottom: 10px; }
    .hud-title { font-size: 2rem; color: #fff; text-shadow: 0 0 10px #fff; margin-bottom: 30px; }
    .hud-photo { width: 100%; border: 1px solid ${termColor}; margin-bottom: 20px; filter: grayscale(100%) contrast(1.5) sepia(1) hue-rotate(140deg); }
    .hud-photo img { width: 100%; display: block; opacity: 0.8; }
    .hud-msg { color: #ddd; line-height: 1.8; font-size: 1.1rem; }
    .hud-sender { margin-top: 30px; border-top: 1px dashed ${termColor}; padding-top: 20px; color: ${termColor}; }
    `}
  `;

  const html = isBasic ? `
    <div class="basic-shell">
      <div class="basic-card">
        <div class="cyber-sys">SYS.INIT // TARGET: ${d.recipientName || 'GUEST'}</div>
        <div class="cyber-title">${d.title}</div>
        <div class="cyber-sys">DECRYPTING PAYLOAD...</div>
        ${d.imageUrl ? `<img class="cyber-photo" src="${d.imageUrl}" />` : ''}
        <div class="cyber-msg" id="type-target"></div>
        <div class="cyber-sys" style="margin-top:20px;">SRC: ${d.senderName || 'UNKNOWN'}</div>
      </div>
    </div>
  ` : `
    <canvas id="matrix-canvas"></canvas>
    <div class="scanlines"></div>
    
    <div id="terminal-overlay">
      <div class="term-box">
        <div class="term-header">SURPRISE_OS v2.4.1 [ENCRYPTED]</div>
        <div id="term-output"></div>
        <div class="term-input-line" id="input-container" style="display:none;">
          <span class="term-prompt">root@nexus:~$</span>
          <input type="text" id="term-input" class="term-input" autocomplete="off" placeholder="INGRESE CLAVE...">
        </div>
      </div>
    </div>
    
    <div id="main-content">
      <div class="hud-box" id="hud-box">
        <div class="hud-corner hud-tl"></div><div class="hud-corner hud-tr"></div>
        <div class="hud-corner hud-bl"></div><div class="hud-corner hud-br"></div>
        
        <div class="hud-sys">TARGET LOCKED: ${d.recipientName || 'GUEST'}</div>
        <div class="hud-title" id="hud-title"></div>
        ${d.imageUrl ? `
        <div class="hud-photo" id="hud-photo">
          <img src="${d.imageUrl}" />
        </div>` : ''}
        <div class="hud-msg" id="hud-msg"></div>
        <div class="hud-sender">TRANSMISSION SRC: ${d.senderName || 'UNKNOWN_NODE'}</div>
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
        target.innerHTML = target.innerHTML.replace('<span class="cyber-cursor"></span>', '') + '<span class="cyber-cursor"></span>';
        setTimeout(type, 30);
      }
    }
    setTimeout(type, 800);
  ` : `
    // VIP MODE ENGINE
    
    // Matrix Background
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+'.split('');
    const fontSize = 14; const columns = canvas.width/fontSize;
    const drops = []; for(let x=0; x<columns; x++) drops[x] = 1;
    function drawMatrix() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '${termColor}'; ctx.font = fontSize + 'px monospace';
      for(let i=0; i<drops.length; i++) {
        const text = chars[Math.floor(Math.random()*chars.length)];
        ctx.fillText(text, i*fontSize, drops[i]*fontSize);
        if(drops[i]*fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }
    setInterval(drawMatrix, 33);
    window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });

    // Terminal Logic
    const output = document.getElementById('term-output');
    const inputContainer = document.getElementById('input-container');
    const input = document.getElementById('term-input');
    const expectedKey = 'OPEN';
    
    const bootSequence = [
      "Iniciando conexión segura...",
      "Estableciendo enlace cuántico...",
      "Mensaje encriptado detectado.",
      "Para descriptar, usa la clave: OPEN"
    ];
    
    let bootIndex = 0;
    function printBootLine() {
      if(bootIndex < bootSequence.length) {
        const div = document.createElement('div');
        div.className = 'term-line';
        output.appendChild(div);
        
        let charIndex = 0;
        const lineText = bootSequence[bootIndex];
        const typeInt = setInterval(() => {
          div.textContent += lineText[charIndex];
          charIndex++;
          if(charIndex >= lineText.length) {
            clearInterval(typeInt);
            bootIndex++;
            setTimeout(printBootLine, 400);
          }
        }, 30);
      } else {
        inputContainer.style.display = 'flex';
        input.focus();
      }
    }
    setTimeout(printBootLine, 1000);
    
    input.addEventListener('keydown', (e) => {
      if(e.key === 'Enter') {
        const val = input.value.trim().toUpperCase();
        const div = document.createElement('div');
        div.className = 'term-line';
        div.innerHTML = \`<span class="term-prompt">root@nexus:~$</span> \${val}\`;
        output.appendChild(div);
        input.value = '';
        
        const resp = document.createElement('div');
        resp.className = 'term-line';
        if(val === expectedKey) {
          resp.textContent = 'ACCESO CONCEDIDO. Desencriptando payload...';
          resp.style.color = '#fff';
          output.appendChild(resp);
          inputContainer.style.display = 'none';
          setTimeout(unlockPayload, 1500);
        } else {
          resp.textContent = 'ERROR: Clave incorrecta. Intentos restantes: INIFINITOS.';
          resp.style.color = 'red';
          output.appendChild(resp);
          // Auto scroll
          document.querySelector('.term-box').scrollTop = document.querySelector('.term-box').scrollHeight;
        }
      }
    });
    
    function unlockPayload() {
      const audio = document.getElementById('bg-music');
      if (audio) { audio.volume = 0; audio.play(); gsap.to(audio, {volume: 0.8, duration: 2}); }
      
      const termOverlay = document.getElementById('terminal-overlay');
      const mainContent = document.getElementById('main-content');
      
      // Glitch transition
      gsap.to(termOverlay, { opacity: 0, duration: 0.1, yoyo: true, repeat: 5 });
      setTimeout(() => {
        termOverlay.style.display = 'none';
        mainContent.style.display = 'flex';
        
        // HUD Animation
        gsap.from('#hud-box', { scale: 0.9, opacity: 0, duration: 1, ease: 'power4.out' });
        
        // Type title
        const targetTitle = document.getElementById('hud-title');
        gsap.to(targetTitle, { text: "${d.title}", duration: 1.5, ease: "none", delay: 0.5 });
        
        // Image reveal
        if(document.getElementById('hud-photo')) {
          gsap.from('#hud-photo', { height: 0, opacity: 0, duration: 1, delay: 1 });
        }
        
        // Type Msg
        setTimeout(() => {
          const targetMsg = document.getElementById('hud-msg');
          const txtMsg = "${d.escapedMessage}";
          let mi = 0;
          function typeMsg() {
            if(mi < txtMsg.length) {
              if(txtMsg.substring(mi,mi+5)==='<br/>'){targetMsg.innerHTML+='<br/>';mi+=5;}
              else{targetMsg.innerHTML+=txtMsg.charAt(mi);mi++;}
              setTimeout(typeMsg, 20);
            }
          }
          typeMsg();
        }, 2000);
        
      }, 800);
    }
  `;

  return { css, html, js };
}
