// ═══════════════════════════════════════════════════════════════
// STYLE #12: MONO GRID — Monochrome Systematic
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput, renderVipGallery } from './index';

export function renderMonoGrid(d: TemplateRenderData): TemplateOutput {
  const isBasic = d.renderMode === 'basic';
  const gallery = renderVipGallery(d, "monogrid");
  const c = d.accentColor || '#ffffff';

  const css = `
    body { background: #111; overflow-x: hidden; margin: 0; font-family: monospace; }
    
    .mono-shell { min-height: 100vh; padding: 2rem; display: flex; align-items: center; justify-content: center; }
    .mono-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; max-width: 500px; width: 100%; background: #333; border: 1px solid #444; }
    .mono-cell { background: #111; padding: 2rem; transition: background 0.3s; position: relative; overflow: hidden; }
    .mono-wide { grid-column: 1 / -1; }
    
    .mono-accent-bar { height: 4px; width: 40px; background: ${c}; margin-bottom: 1.5rem; }
    .mono-label { font-size: 0.7rem; letter-spacing: 0.3em; color: #666; text-transform: uppercase; font-weight: 600; margin-bottom: 0.5rem; }
    .mono-title { font-size: clamp(1.8rem, 5vw, 2.5rem); font-weight: 800; color: #fff; line-height: 1.1; margin: 0; }
    
    .mono-photo-cell { padding: 0 !important; }
    .mono-photo { width: 100%; height: 100%; display: block; aspect-ratio: 1; object-fit: cover; filter: grayscale(100%); transition: filter 0.5s; }
    
    .mono-msg { font-size: 1.1rem; line-height: 1.8; color: #aaa; }
    .mono-sender { font-size: 0.85rem; color: #666; margin: 0; }
    .mono-sender strong { color: #fff; text-transform: uppercase; letter-spacing: 2px; }
    
    ${isBasic ? `
    .mono-grid { opacity: 0; animation: monoIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s forwards; }
    @keyframes monoIn { to { opacity: 1; } }
    .mono-cell:hover { background: #1a1a1a; }
    .mono-photo:hover { filter: grayscale(0%); }
    `: `
    /* VIP MODE */
    #glitch-overlay {
      position: fixed; inset: 0; z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #000;
      font-family: monospace; color: #fff;
    }
    .glitch-text { font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 2rem; animation: glitchText 0.2s infinite; text-align: center; }
    @keyframes glitchText { 0% { transform: translate(2px, 2px); } 50% { transform: translate(-2px, -2px); } 100% { transform: translate(2px, -2px); } }
    
    .repair-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; width: 300px; height: 300px; background: #333; }
    .repair-cell { background: #111; cursor: pointer; transition: all 0.2s; position: relative; overflow: hidden; }
    .repair-cell::before { content: ''; position: absolute; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.3'/%3E%3C/svg%3E"); }
    .repair-cell.fixed { background: ${c}; box-shadow: 0 0 20px ${c}; }
    .repair-cell.fixed::before { display: none; }
    
    #main-content { display: none; }
    
    /* Reveal Animation FX */
    .mono-cell { opacity: 0; transform: scale(0.95); }
    `}
    
    @media (max-width: 480px) { .mono-grid { grid-template-columns: 1fr; } .mono-cell { padding: 1.5rem; } }
  `;

  const html = isBasic ? `
    <div class="mono-shell">
      <div class="mono-grid">
        <div class="mono-cell mono-wide">
          <div class="mono-accent-bar"></div>
          <p class="mono-label">Para</p>
          <h1 class="mono-title">${d.recipientName || 'Ti'}</h1>
        </div>
        ${d.imageUrl ? `
        <div class="mono-cell mono-photo-cell">
          <img class="mono-photo" src="${d.imageUrl}" />
        </div>
        <div class="mono-cell" style="display:flex;align-items:center;">
          <p class="mono-msg" id="type-target"></p>
        </div>
        ` : `
        <div class="mono-cell mono-wide">
          <p class="mono-msg" id="type-target"></p>
        </div>
        `}
        <div class="mono-cell mono-wide" style="border-top:2px solid #222;">
          <p class="mono-sender">SRC_ <br/><strong>${d.senderName || 'Anónimo'}</strong></p>
        </div>
      </div>
    </div>
  ` : `
    <div id="glitch-overlay">
      <div class="glitch-text" id="g-text">SISTEMA CORRUPTO<br/>REPARA LA CUADRÍCULA</div>
      <div class="repair-grid" id="r-grid">
        <div class="repair-cell"></div><div class="repair-cell"></div><div class="repair-cell"></div>
        <div class="repair-cell"></div><div class="repair-cell"></div><div class="repair-cell"></div>
        <div class="repair-cell"></div><div class="repair-cell"></div><div class="repair-cell"></div>
      </div>
    </div>
  
    <div class="mono-shell" id="main-content">
      <div class="mono-grid">
        <div class="mono-cell mono-wide v-cell">
          <div class="mono-accent-bar"></div>
          <p class="mono-label">Decodificado para</p>
          <h1 class="mono-title">${d.title}</h1>
        </div>
        ${d.imageUrl ? `
        <div class="mono-cell mono-photo-cell v-cell" id="v-photo">
          <img class="mono-photo" src="${d.imageUrl}" />
        </div>
        <div class="mono-cell v-cell" style="display:flex;align-items:center;">
          <p class="mono-msg" id="type-target"></p>
        </div>
        ` : `
        <div class="mono-cell mono-wide v-cell">
          <p class="mono-msg" id="type-target"></p>
        </div>
        `}
        <div class="mono-cell mono-wide v-cell">
          <p class="mono-sender">SYSTEM_ROOT_ <br/><strong>${d.senderName || 'Anónimo'}</strong></p>
        </div>
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
    const rCells = document.querySelectorAll('.repair-cell');
    let fixedCount = 0;
    const total = rCells.length;
    
    rCells.forEach(cell => {
      cell.addEventListener('click', () => {
        if(!cell.classList.contains('fixed')) {
          cell.classList.add('fixed');
          gsap.fromTo(cell, {scale: 0.8}, {scale: 1, ease: 'elastic.out(1, 0.3)', duration: 0.8});
          fixedCount++;
          if(fixedCount === total) repairComplete();
        }
      });
    });
    
    function repairComplete() {
      const audio = document.getElementById('bg-music');
      if (audio) { audio.volume = 0; audio.play(); gsap.to(audio, {volume: 0.8, duration: 2}); }
      
      const txt = document.getElementById('g-text');
      txt.innerText = "SISTEMA RESTAURADO";
      txt.style.color = '${c}';
      txt.style.animation = 'none';
      
      gsap.to('.repair-cell', { background: '#fff', scale: 1.1, duration: 0.2, yoyo: true, repeat: 1, stagger: 0.05, onComplete: () => {
         gsap.to('#glitch-overlay', { opacity: 0, duration: 0.5, onComplete: () => {
            document.getElementById('glitch-overlay').style.display = 'none';
            document.getElementById('main-content').style.display = 'flex';
            showGrid();
         }});
      }});
    }
    
    function showGrid() {
      gsap.to('.v-cell', { opacity: 1, scale: 1, duration: 0.5, stagger: 0.15, ease: 'power2.out' });
      
      setTimeout(() => {
        if(document.getElementById('v-photo')) {
          const img = document.querySelector('.mono-photo');
          gsap.to(img, { filter: 'grayscale(0%)', duration: 2 });
        }
        
        const target = document.getElementById('type-target');
        const txt = "${d.escapedMessage}";
        let i = 0;
        function type() {
          if(i < txt.length) {
            if(txt.substring(i,i+5)==='<br/>'){target.innerHTML+='<br/>';i+=5;}
            else{target.innerHTML+=txt.charAt(i);i++;}
            // Matrix terminal cursor effect
            target.innerHTML = target.innerHTML.replace('█','') + '█';
            setTimeout(type, 20);
          } else {
             target.innerHTML = target.innerHTML.replace('█','');
          }
        }
        type();
      }, 1000);
    }
  
    ${gallery.js}`;

  return { css, html, js };
}
