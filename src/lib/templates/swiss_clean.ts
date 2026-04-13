// ═══════════════════════════════════════════════════════════════
// STYLE #14: SWISS CLEAN — Swiss Design Principles
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput } from './index';

export function renderSwissClean(d: TemplateRenderData): TemplateOutput {
  const isBasic = d.renderMode === 'basic';
  const c = d.accentColor || '#e53935';
  
  const now = new Date();
  const dateStr = `${now.getFullYear()}.${String(now.getMonth()+1).padStart(2,'0')}.${String(now.getDate()).padStart(2,'0')}`;

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800;900&display=swap');
    body { background: #fff; overflow-x: hidden; margin: 0; font-family: 'Inter', sans-serif; }
    
    ${isBasic ? `
    .swiss-shell { min-height: 100vh; padding: 3rem 2rem; display: flex; align-items: center; justify-content: center; }
    .swiss-card { max-width: 480px; width: 100%; opacity: 0; animation: swissIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s forwards; }
    @keyframes swissIn { to { opacity: 1; } }
    
    .swiss-red-bar { width: 40px; height: 6px; background: ${c}; margin-bottom: 2rem; }
    .swiss-label { font-size: 0.65rem; letter-spacing: 0.3em; color: #999; text-transform: uppercase; font-weight: 600; margin-bottom: 0.3rem; }
    .swiss-name { font-size: clamp(3rem, 10vw, 5rem); font-weight: 900; color: #111; letter-spacing: -0.05em; line-height: 0.95; margin-bottom: 2rem; }
    .swiss-divider { width: 100%; height: 1px; background: #e0e0e0; margin: 2rem 0; }
    .swiss-msg { font-size: 1rem; line-height: 2; color: #333; font-weight: 300; max-width: 400px; }
    .swiss-photo { width: 100%; border-radius: 4px; margin: 2rem 0; display: block; box-shadow: 0 4px 20px rgba(0,0,0,0.08); filter: grayscale(100%); transition: filter 0.5s; }
    .swiss-photo:hover { filter: grayscale(0%); }
    .swiss-meta { display: flex; justify-content: space-between; align-items: center; padding-top: 2rem; border-top: 1px solid #e0e0e0; margin-top: 2rem; }
    .swiss-sender { font-size: 0.8rem; color: #999; font-weight: 400; }
    .swiss-sender strong { color: #111; font-weight: 600; }
    .swiss-date { font-size: 0.7rem; color: #bbb; font-weight: 300; font-family: monospace; }
    `: `
    /* VIP MODE - Kinetic Typography */
    .viewport { width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
    .grid-lines { position: absolute; inset: 0; background-size: 50px 50px; background-image: linear-gradient(to right, #f0f0f0 1px, transparent 1px), linear-gradient(to bottom, #f0f0f0 1px, transparent 1px); z-index: 0; opacity: 0.5; }
    
    .intro-canvas { position: absolute; inset: 0; z-index: 50; background: #fff; display: flex; align-items: center; justify-content: center; }
    .big-name { font-size: clamp(4rem, 15vw, 12rem); font-weight: 900; color: #111; letter-spacing: -0.05em; text-transform: uppercase; line-height: 0.8; display: flex; overflow: hidden; }
    .char { transform: translateY(100%); display: inline-block; }
    .kinetic-bar { position: absolute; top: 0; left: 0; height: 100vh; width: 0; background: ${c}; z-index: 60; mix-blend-mode: multiply; }

    #main-content { position: relative; z-index: 10; max-width: 900px; width: 100%; padding: 4rem 2rem; display: none; opacity: 0; }
    .sys-header { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid #111; padding-bottom: 1rem; margin-bottom: 3rem; overflow: hidden; }
    .h-left p { margin: 0; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.2em; color: #999; text-transform: uppercase; transform: translateY(20px); opacity: 0; }
    .h-right { font-family: monospace; font-size: 0.8rem; color: #111; font-weight: bold; transform: translateY(20px); opacity: 0; }
    
    .layout-grid { display: grid; grid-template-columns: 1fr; gap: 4rem; }
    @media (min-width: 768px) { .layout-grid { grid-template-columns: 1fr 1fr; } }
    
    .left-col { position: relative; }
    .red-accent { width: 0; height: 10px; background: ${c}; margin-bottom: 2rem; }
    .s-title { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 900; line-height: 1; letter-spacing: -0.04em; color: #111; margin-bottom: 2rem; overflow:hidden; }
    .s-title span { display: block; transform: translateY(100%); }
    .s-msg { font-size: 1.1rem; line-height: 1.8; color: #333; font-weight: 400; opacity: 0; }
    
    .right-col { position: relative; }
    .s-photo-wrap { width: 100%; border: 1px solid #111; padding: 10px; background: #fff; transform: rotate(2deg) scale(0.9); opacity: 0; }
    .s-photo { width: 100%; display: block; filter: grayscale(100%); transition: filter 0.5s; }
    .s-photo-wrap:hover .s-photo { filter: grayscale(0%); cursor: none; }
    
    .cursor-dot { width: 20px; height: 20px; background: ${c}; border-radius: 50%; position: fixed; pointer-events: none; z-index: 9999; transform: translate(-50%, -50%); mix-blend-mode: multiply; opacity: 0; transition: opacity 0.3s; }
    
    .s-footer { margin-top: 4rem; border-top: 1px solid #ddd; padding-top: 2rem; display: flex; justify-content: space-between; font-size: 0.8rem; color: #666; opacity: 0; }
    .s-footer strong { color: #111; font-weight: 800; font-size: 1rem; }
    `}
  `;

  const html = isBasic ? `
    <div class="swiss-shell">
      <div class="swiss-card">
        <div class="swiss-red-bar"></div>
        <p class="swiss-label">Para</p>
        <h1 class="swiss-name" style="word-break: break-word;">${d.title}</h1>
        <div class="swiss-divider"></div>
        <p class="swiss-msg" id="type-target"></p>
        ${d.imageUrl ? `<img class="swiss-photo" src="${d.imageUrl}" />` : ''}
        <div class="swiss-meta">
          <p class="swiss-sender">De: <strong>${d.senderName || 'Anónimo'}</strong></p>
          <p class="swiss-date">${dateStr}</p>
        </div>
      </div>
    </div>
  ` : `
    <div class="cursor-dot" id="custom-cursor"></div>
    <div class="viewport">
      <div class="grid-lines"></div>
      
      <div class="intro-canvas" id="intro">
        <div class="big-name" id="name-container"></div>
        <div class="kinetic-bar" id="k-bar"></div>
      </div>
      
      <div id="main-content">
        <div class="sys-header">
          <div class="h-left"><p class="hel">DATA VISUALIZATION</p><p class="hel" style="color:#111;font-weight:900">${d.recipientName || 'GUEST'}</p></div>
          <div class="h-right hel">${dateStr}</div>
        </div>
        
        <div class="layout-grid">
          <div class="left-col">
            <div class="red-accent" id="r-acc"></div>
            <h1 class="s-title"><span id="s-t1">${d.title.split(' ')[0] || d.title}</span><span id="s-t2">${d.title.split(' ').slice(1).join(' ')}</span></h1>
            <div class="s-msg" id="type-target"></div>
          </div>
          
          <div class="right-col">
            ${d.imageUrl ? `<div class="s-photo-wrap" id="s-img-wrap"><img class="s-photo" src="${d.imageUrl}" /></div>` : `<div class="s-photo-wrap" id="s-img-wrap" style="padding:40px; text-align:center; display:flex;align-items:center;justify-content:center;aspect-ratio:3/4;background:#f5f5f5;"><h2 style="color:#ccc;font-weight:900;font-size:3rem;">NO_IMG</h2></div>`}
          </div>
        </div>
        
        <div class="s-footer" id="s-foot">
          <div><span style="font-size:0.6rem;letter-spacing:2px;text-transform:uppercase;">ORIGIN</span><br/><strong>${d.senderName || 'Anónimo'}</strong></div>
          <div style="text-align:right;"><span style="font-size:0.6rem;letter-spacing:2px;text-transform:uppercase;">SYS.ID</span><br/>#${Math.floor(Math.random()*9000)+1000}</div>
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
    // VIP MODE ENGINE - Kinetic Typography
    const nameStr = "${(d.recipientName || 'HOLA').toUpperCase()}";
    const cont = document.getElementById('name-container');
    nameStr.split('').forEach(c => {
      const sp = document.createElement('span');
      sp.className = 'char';
      sp.innerText = c;
      cont.appendChild(sp);
    });
    
    // Custom cursor
    const cursor = document.getElementById('custom-cursor');
    if(window.matchMedia("(pointer: fine)").matches) {
       document.addEventListener('mousemove', e => {
           cursor.style.opacity = '1';
           cursor.style.left = e.clientX + 'px';
           cursor.style.top = e.clientY + 'px';
       });
       document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
    }
    
    // Intro sequence
    const tl = gsap.timeline();
    tl.to('.char', { y: '0%', duration: 0.8, stagger: 0.1, ease: 'power4.out', delay: 0.5 })
      .to('#k-bar', { width: '100%', duration: 0.8, ease: 'power4.inOut' }, "+=0.5")
      .to('#intro', { x: '100%', duration: 0.8, ease: 'power4.inOut' }, "+=0.2")
      .call(startMain)
      .set('#intro', {display: 'none'});
      
    function startMain() {
      const audio = document.getElementById('bg-music');
      if (audio) { audio.volume = 0; audio.play(); gsap.to(audio, {volume: 0.6, duration: 2}); }
      
      const main = document.getElementById('main-content');
      main.style.display = 'block';
      gsap.to(main, { opacity: 1, duration: 0.1 });
      
      const mTl = gsap.timeline();
      mTl.to('.hel', { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' })
         .to('#r-acc', { width: '80px', duration: 0.6, ease: 'power3.out' }, "-=0.4")
         .to('#s-t1', { y: 0, duration: 0.8, ease: 'power4.out' }, "-=0.2")
         .to('#s-t2', { y: 0, duration: 0.8, ease: 'power4.out' }, "-=0.6")
         .to('#s-img-wrap', { opacity: 1, scale: 1, rotation: -2, duration: 1, ease: 'back.out(1.2)' }, "-=0.6")
         .to('.s-msg', { opacity: 1, duration: 0.5 }, "-=0.2")
         .to('#s-foot', { opacity: 1, y: -10, duration: 0.5 }, "-=0.2")
         .call(() => {
            const target = document.getElementById('type-target');
            const txt = "${d.escapedMessage}";
            let i = 0;
            function type() {
              if(i < txt.length) {
                if(txt.substring(i,i+5)==='<br/>'){target.innerHTML+='<br/>';i+=5;}
                else{target.innerHTML+=txt.charAt(i);i++;}
                setTimeout(type, 15); // Fast type
              }
            }
            type();
            
            // Image parallax
            const wrap = document.getElementById('s-img-wrap');
            window.addEventListener('mousemove', e => {
                const x = (e.clientX / window.innerWidth - 0.5) * 20;
                const y = (e.clientY / window.innerHeight - 0.5) * 20;
                gsap.to(wrap, { x: x, y: y, duration: 1, ease: 'power2.out' });
            });
         });
    }
  `;

  return { css, html, js };
}
