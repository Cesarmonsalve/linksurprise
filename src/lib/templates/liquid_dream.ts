// ═══════════════════════════════════════════════════════════════
// STYLE #16: LIQUID DREAM — Fluid Dynamic Art
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput } from './index';

export function renderLiquidDream(d: TemplateRenderData): TemplateOutput {
  const isBasic = d.renderMode === 'basic';
  const c = d.accentColor || '#00d2ff';

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;600;800&display=swap');
    body { background: #0b0b1a; overflow-x: hidden; margin: 0; font-family: 'Outfit', sans-serif; }
    
    ${isBasic ? `
    .liq-shell { min-height: 100vh; padding: 2rem; display: flex; align-items: center; justify-content: center; position: relative; }
    
    .liq-bg { position: absolute; inset: 0; overflow: hidden; z-index: 0; }
    .liq-shape { position: absolute; background: linear-gradient(135deg, ${c}, #3a7bd5); filter: blur(40px); opacity: 0.3; border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
    .shape-1 { width: 50vw; height: 50vw; top: -10vw; left: -10vw; animation: morph 15s ease-in-out infinite alternate; }
    .shape-2 { width: 40vw; height: 40vw; bottom: -5vw; right: -10vw; animation: morph 20s ease-in-out infinite alternate-reverse; }
    @keyframes morph { 0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; } 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: rotate(45deg); } }
    
    .liq-card { background: rgba(255,255,255,0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); border-radius: 40px; padding: 3rem 2rem; max-width: 500px; width: 100%; text-align: center; position: relative; z-index: 10; box-shadow: 0 30px 60px rgba(0,0,0,0.5); }
    .liq-label { font-size: 0.8rem; letter-spacing: 0.3em; color: ${c}; text-transform: uppercase; margin-bottom: 1rem; }
    .liq-title { font-size: clamp(2rem, 6vw, 3rem); font-weight: 800; color: #fff; line-height: 1.1; margin-bottom: 2rem; }
    .liq-photo { width: 100%; border-radius: 20px; margin: 1.5rem auto; display: block; border: 2px solid rgba(255,255,255,0.1); }
    .liq-msg { font-size: 1.1rem; line-height: 1.8; color: #d0d0d0; font-weight: 300; }
    .liq-div { width: 40px; height: 4px; background: ${c}; margin: 2rem auto; border-radius: 2px; }
    .liq-sender { font-size: 0.9rem; color: #888; }
    .liq-sender strong { color: #fff; font-weight: 600; }
    `: `
    /* VIP MODE - Gooey Effect & Ripple */
    .gooey-container { position: fixed; inset: 0; filter: url('#gooey'); background: #0b0b1a; z-index: 0; }
    .drop { position: absolute; background: ${c}; border-radius: 50%; transform: translate(-50%, -50%); transform-origin: center; z-index: 1; }
    
    #main-content { position: relative; z-index: 10; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; pointer-events: none; }
    .l-card { background: transparent; max-width: 600px; width: 100%; text-align: center; pointer-events: auto; }
    
    .l-label { font-size: 0.8rem; letter-spacing: 0.4em; color: #fff; text-transform: uppercase; margin-bottom: 1rem; opacity: 0; transform: translateY(20px); }
    .l-title { font-size: clamp(3rem, 10vw, 5rem); font-weight: 800; color: transparent; -webkit-text-stroke: 2px #fff; line-height: 1; margin-bottom: 2rem; position: relative; overflow: hidden; opacity: 0; }
    .l-title::after { content: attr(data-text); position: absolute; left: 0; top: 0; width: 0%; color: ${c}; -webkit-text-stroke: 0px; overflow: hidden; white-space: nowrap; transition: width 1s cubic-bezier(0.85, 0, 0.15, 1); }
    .l-card:hover .l-title::after { width: 100%; }
    
    .l-photo-wrap { position: relative; display: inline-block; padding: 10px; opacity: 0; transform: scale(0.9); }
    .l-photo-wrap::before { content: ''; position: absolute; inset: 0; border: 2px solid ${c}; border-radius: 30px; transform: rotate(-5deg); transition: transform 0.5s; z-index: -1; }
    .l-photo-wrap:hover::before { transform: rotate(0deg); }
    .l-photo { width: 100%; max-width: 350px; border-radius: 20px; box-shadow: 0 40px 80px rgba(0,0,0,0.8); }
    
    .l-msg { font-size: 1.2rem; line-height: 1.8; color: #fff; font-weight: 300; margin: 3rem 0; opacity: 0; }
    .l-sender { font-size: 1rem; color: #888; opacity: 0; }
    .l-sender strong { display: block; font-size: 2rem; color: ${c}; font-weight: 800; margin-top: 10px; }

    #start-screen { position: fixed; inset: 0; z-index: 100; display: flex; align-items: center; justify-content: center; background: rgba(11,11,26,0.9); backdrop-filter: blur(10px); }
    .start-btn { background: transparent; border: 2px solid ${c}; color: ${c}; padding: 15px 40px; font-size: 1.2rem; border-radius: 40px; cursor: pointer; letter-spacing: 2px; text-transform: uppercase; transition: all 0.3s; font-family: 'Outfit'; z-index: 101; }
    .start-btn:hover { background: ${c}; color: #0b0b1a; }
    `}
  `;

  const html = isBasic ? `
    <div class="liq-shell">
      <div class="liq-bg">
        <div class="liq-shape shape-1"></div>
        <div class="liq-shape shape-2"></div>
      </div>
      <div class="liq-card">
        <p class="liq-label">Flujo Continuo</p>
        <h1 class="liq-title">${d.title}</h1>
        ${d.imageUrl ? `<img class="liq-photo" src="${d.imageUrl}" />` : ''}
        <div class="liq-div"></div>
        <p class="liq-msg" id="type-target"></p>
        <div class="liq-div"></div>
        <p class="liq-sender">Para <strong>${d.recipientName || 'Ti'}</strong>, de <strong>${d.senderName || 'Alguien'}</strong></p>
      </div>
    </div>
  ` : `
    <!-- SVG Filter for Gooey Effect -->
    <svg style="position: absolute; width: 0; height: 0;" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <filter id="gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15" result="goo" />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>

    <div class="gooey-container" id="g-cont">
       <div class="drop" id="cursor-drop" style="width:100px; height:100px; left:50%; top:50%; display:none;"></div>
    </div>
    
    <div id="start-screen">
      <button class="start-btn" id="start-btn">SUMERGIR</button>
    </div>
    
    <div id="main-content">
      <div class="l-card">
        <p class="l-label gs-st">Para ${d.recipientName || 'Ti'}</p>
        <h1 class="l-title gs-st" data-text="${d.title}">${d.title}</h1>
        ${d.imageUrl ? `
        <div class="l-photo-wrap gs-st">
          <img class="l-photo" src="${d.imageUrl}" />
        </div>` : ''}
        <div class="l-msg gs-st" id="type-target"></div>
        <p class="l-sender gs-st">Con fluidez,<br/><strong>${d.senderName || 'Alguien'}</strong></p>
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
    // VIP MODE ENGINE - Gooey Interactive Background
    const startBtn = document.getElementById('start-btn');
    const gCont = document.getElementById('g-cont');
    const cDrop = document.getElementById('cursor-drop');
    
    startBtn.addEventListener('click', () => {
      const audio = document.getElementById('bg-music');
      if (audio) { audio.volume = 0; audio.play(); gsap.to(audio, {volume: 0.8, duration: 2}); }
      
      gsap.to('#start-screen', { opacity: 0, duration: 1, onComplete: () => {
         document.getElementById('start-screen').style.display = 'none';
         cDrop.style.display = 'block';
         startLiquid();
      }});
    });
    
    function startLiquid() {
      // Create random blobs
      for(let i=0; i<10; i++) {
         const b = document.createElement('div');
         b.className = 'drop';
         b.style.width = Math.random()*200 + 100 + 'px';
         b.style.height = b.style.width;
         b.style.left = Math.random()*100 + '%';
         b.style.top = Math.random()*100 + '%';
         gCont.appendChild(b);
         
         animateBlob(b);
      }
      
      // Cursor follow blob
      window.addEventListener('mousemove', e => {
         gsap.to(cDrop, { x: e.clientX, y: e.clientY, duration: 0.5, ease: 'power2.out', xPercent: -50, yPercent: -50 });
      });
      
      // Reveal Content
      gsap.to('.gs-st', { opacity: 1, y: 0, scale: 1, duration: 1.5, stagger: 0.2, ease: 'power3.out', delay: 0.5 });
      
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
    }
    
    function animateBlob(el) {
      gsap.to(el, {
         x: (Math.random()-0.5) * window.innerWidth,
         y: (Math.random()-0.5) * window.innerHeight,
         duration: Math.random()*5 + 5,
         ease: 'sine.inOut',
         onComplete: () => animateBlob(el)
      });
    }
  `;

  return { css, html, js };
}
