// ═══════════════════════════════════════════════════════════════
// STYLE #4: HOLOGRAM SCAN — Holographic Reveal
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput } from './index';

export function renderHologramScan(d: TemplateRenderData): TemplateOutput {
  const isBasic = d.renderMode === 'basic';
  const c = d.accentColor || '#00ffcc';

  const css = `
    body { background: #030308; overflow-x: hidden; margin: 0; font-family: 'Space Grotesk', sans-serif; }
    
    ${isBasic ? `
    .basic-shell { min-height: 100vh; padding: 2rem; display: flex; align-items: center; justify-content: center; background: radial-gradient(ellipse at 50% 50%, ${c}10, transparent 70%); }
    .basic-card { border: 1px solid ${c}30; border-radius: 12px; padding: 3rem 2rem; max-width: 460px; width: 100%; text-align: center; position: relative; overflow: hidden; background: rgba(0,0,0,0.5); }
    .scan-line { position: absolute; left: 0; width: 100%; height: 3px; background: ${c}; box-shadow: 0 0 20px ${c}; animation: scan 3s infinite linear; }
    @keyframes scan { 0% { top: 0; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
    .holo-status { display: inline-block; padding: 4px 12px; border: 1px solid ${c}; border-radius: 20px; font-size: 0.7rem; color: ${c}; margin-bottom: 2rem; }
    .holo-title { font-size: 2rem; color: #fff; margin-bottom: 1rem; }
    .holo-photo { width: 100%; border-radius: 8px; margin: 1rem 0; border: 1px solid ${c}40; opacity: 0.8; }
    .holo-msg { color: #ccc; line-height: 1.6; margin: 1.5rem 0; }
    .holo-sender { font-size: 0.8rem; color: #888; }
    .holo-sender strong { color: ${c}; }
    `: `
    /* VIP MODE */
    .holo-bg { position: fixed; inset: 0; background: radial-gradient(ellipse at 50% 50%, ${c}08 0%, transparent 80%); pointer-events: none; }
    
    /* Preloader Hologram Scan */
    #scanner-overlay {
      position: fixed; inset: 0; z-index: 100; background: #000;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
    }
    .scanner-target {
      width: 250px; height: 250px; border: 2px dashed ${c}40; border-radius: 50%;
      position: relative; overflow: hidden; margin-bottom: 2rem;
    }
    .scanner-target::before {
      content: ''; position: absolute; inset: 0; border: 4px solid ${c}; border-radius: 50%;
      clip-path: polygon(0 0, 100% 0, 100% 20%, 0 20%);
      animation: spin 4s linear infinite;
    }
    @keyframes spin { 100% { transform: rotate(360deg); } }
    .scanner-line-vertical { position: absolute; left: 50%; top: 0; bottom: 0; width: 1px; background: ${c}40; }
    .scanner-line-horizontal { position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: ${c}40; }
    .scanner-bar { position: absolute; left:-50%; width: 200%; height: 4px; background: ${c}; box-shadow: 0 0 20px ${c}; top: 0; }
    
    .scanner-text { color: ${c}; font-family: monospace; letter-spacing: 2px; text-align: center; }
    #scan-progress { font-size: 2rem; font-weight: bold; margin-bottom: 10px; }
    #scan-status { font-size: 0.8rem; height: 1em; }

    #main-content {
      position: relative; z-index: 10; min-height: 100vh;
      display: none; align-items: center; justify-content: center; padding: 2rem;
    }
    .holo-card {
      background: rgba(0,0,0,0.6); border: 1px solid ${c}30; border-radius: 20px;
      padding: 3rem 2rem; max-width: 500px; width: 100%; text-align: center;
      position: relative; overflow: hidden; backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    }
    /* Hologram Glitch FX */
    .holo-card::before { content: ''; position: fixed; inset: 0; background: repeating-linear-gradient(0deg, transparent, transparent 2px, ${c}10 3px, ${c}10 3px); pointer-events: none; z-index: 50; }
    
    .holo-status { display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; border: 1px solid ${c}; border-radius: 20px; font-size: 0.7rem; color: ${c}; margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 2px; }
    .holo-status-dot { width: 6px; height: 6px; border-radius: 50%; background: ${c}; animation: blink 1s infinite; }
    @keyframes blink { 50% { opacity: 0; } }
    
    .holo-label { font-size: 0.65rem; letter-spacing: 0.4em; color: ${c}80; text-transform: uppercase; margin-bottom: 1rem; }
    .holo-title { font-size: clamp(1.8rem,6vw,2.5rem); font-weight: 800; color: #fff; text-shadow: 0 0 10px ${c}80, 2px 0 0 red, -2px 0 0 cyan; margin-bottom: 1.5rem; position: relative; }
    .holo-divider { width: 100px; height: 1px; background: ${c}50; margin: 1.5rem auto; }
    
    .holo-photo { width: 100%; max-width: 300px; border-radius: 12px; margin: 1.5rem auto; display: block; border: 1px solid ${c}40; box-shadow: 0 0 40px ${c}20; filter: contrast(1.2) hue-rotate(180deg) opacity(0.8) drop-shadow(0 0 10px ${c}); }
    
    .holo-msg { font-size: 1.1rem; line-height: 1.8; color: #ddd; margin: 1.5rem 0; text-shadow: 0 0 2px ${c}40; }
    .holo-sender { font-size: 0.85rem; color: #888; }
    .holo-sender strong { color: ${c}; text-shadow: 0 0 5px ${c}80; }
    `}
  `;

  const html = isBasic ? `
    <div class="basic-shell">
      <div class="basic-card">
        <div class="scan-line"></div>
        <div class="holo-status">TRANSMISIÓN ENTRANTE</div>
        <h1 class="holo-title">${d.title}</h1>
        ${d.imageUrl ? `<img class="holo-photo" src="${d.imageUrl}" />` : ''}
        <p class="holo-msg" id="type-target"></p>
        <p class="holo-sender">Origen: <strong>${d.senderName || 'Desconocido'}</strong></p>
      </div>
    </div>
  ` : `
    <div class="holo-bg"></div>
    
    <div id="scanner-overlay">
      <div class="scanner-target">
        <div class="scanner-line-vertical"></div>
        <div class="scanner-line-horizontal"></div>
        <div class="scanner-bar" id="scan-bar"></div>
      </div>
      <div class="scanner-text">
        <div id="scan-progress">0%</div>
        <div id="scan-status">Alineando sensores...</div>
      </div>
      <button id="start-scan-btn" style="margin-top:20px; background:transparent; border: 1px solid ${c}; color: ${c}; padding: 10px 20px; border-radius: 4px; cursor: pointer; letter-spacing: 2px;">INICIAR ESCÁNER</button>
    </div>

    <div id="main-content">
      <div class="holo-card" id="main-card">
        <div class="holo-status" id="h-status" style="opacity:0"><span class="holo-status-dot"></span> SEÑAL ESTABLE</div>
        <p class="holo-label" id="h-label" style="opacity:0">Sujeto Id: ${d.recipientName || 'Desconocido'}</p>
        <h1 class="holo-title" id="h-title"></h1>
        <div class="holo-divider" id="h-div"></div>
        ${d.imageUrl ? `<img class="holo-photo" id="h-img" style="opacity:0" src="${d.imageUrl}" />` : ''}
        <div class="holo-msg" id="type-target"></div>
        <p class="holo-sender" id="h-sender" style="opacity:0">Origen: <strong>${d.senderName || 'Clasificado'}</strong></p>
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
    // VIP MODE
    const btn = document.getElementById('start-scan-btn');
    const prog = document.getElementById('scan-progress');
    const stat = document.getElementById('scan-status');
    const bar = document.getElementById('scan-bar');
    
    btn.addEventListener('click', () => {
      btn.style.display = 'none';
      
      const audio = document.getElementById('bg-music');
      if (audio) { audio.volume = 0; audio.play(); gsap.to(audio, {volume: 0.6, duration: 2}); }
      
      // Animate scanner bar
      gsap.to(bar, { top: '100%', duration: 1.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      
      // Simulate loading
      let p = 0;
      const statusMsgs = ['Analizando biorritmo...', 'Desencriptando paquete...', 'Reconstruyendo holograma...', 'Finalizando...'];
      
      const interval = setInterval(() => {
        p += Math.floor(Math.random() * 5) + 1;
        if(p > 100) p = 100;
        prog.innerText = p + '%';
        
        if (p < 30) stat.innerText = statusMsgs[0];
        else if (p < 60) stat.innerText = statusMsgs[1];
        else if (p < 90) stat.innerText = statusMsgs[2];
        else stat.innerText = statusMsgs[3];
        
        if(p === 100) {
          clearInterval(interval);
          setTimeout(showHologram, 500);
        }
      }, 80);
    });
    
    function showHologram() {
      gsap.to('#scanner-overlay', { opacity: 0, duration: 0.5, onComplete: () => {
        document.getElementById('scanner-overlay').style.display = 'none';
        
        document.getElementById('main-content').style.display = 'flex';
        
        // Hologram Glitch in
        const card = document.getElementById('main-card');
        gsap.fromTo(card, 
          { opacity: 0, scale: 0.8, filter: 'blur(10px) hue-rotate(90deg)' },
          { opacity: 1, scale: 1, filter: 'blur(0px) hue-rotate(0deg)', duration: 1.5, ease: 'power4.out' }
        );
        
        gsap.to('#h-status', { opacity: 1, duration: 0.5, delay: 1 });
        gsap.to('#h-label', { opacity: 1, duration: 0.5, delay: 1.2 });
        
        // Title Text Scramble
        const targetTitle = document.getElementById('h-title');
        const finalTitle = "${d.title}";
        let iters = 0;
        const scramInterval = setInterval(() => {
          targetTitle.innerText = finalTitle.split('').map((c, i) => {
            if(i < iters) return c;
            return String.fromCharCode(65 + Math.floor(Math.random() * 26));
          }).join('');
          iters += 1/3;
          if(iters >= finalTitle.length) { clearInterval(scramInterval); targetTitle.innerText = finalTitle; }
        }, 30);
        
        gsap.to('#h-div', { width: '100px', duration: 0.5, delay: 2 });
        if(document.getElementById('h-img')) gsap.to('#h-img', { opacity: 1, duration: 1, delay: 2.2 });
        
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
               gsap.to('#h-sender', { opacity: 1, duration: 1 });
            }
          }
          type();
        }, (document.getElementById('h-img') ? 3000 : 2500));
        
      }});
    }
  `;

  return { css, html, js };
}
