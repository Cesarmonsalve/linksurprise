// ═══════════════════════════════════════════════════════════════
// STYLE #15: SOFT STACK — Layered Depth
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput } from './index';

export function renderSoftStack(d: TemplateRenderData): TemplateOutput {
  const isBasic = d.renderMode === 'basic';
  const c = d.accentColor || '#6c5ce7';

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&display=swap');
    body { background: #f0f2f5; overflow-x: hidden; margin: 0; font-family: 'Quicksand', sans-serif; }
    
    ${isBasic ? `
    .stack-shell { min-height: 100vh; padding: 3rem 2rem; display: flex; align-items: center; justify-content: center; position: relative; }
    .stack-container { position: relative; wmax-width: 460px; width: 100%; z-index: 10; }
    
    .stack-layer { position: absolute; inset: 0; background: #fff; border-radius: 30px; box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
    .layer-1 { transform: translateY(20px) scale(0.9); opacity: 0.5; z-index: 1; }
    .layer-2 { transform: translateY(10px) scale(0.95); opacity: 0.8; z-index: 2; }
    
    .stack-card { position: relative; background: #fff; border-radius: 30px; padding: 3rem 2.5rem; text-align: center; box-shadow: 0 30px 60px rgba(0,0,0,0.1); z-index: 3; }
    
    .st-icon { width: 60px; height: 60px; background: ${c}15; color: ${c}; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin: 0 auto 1.5rem; }
    .st-label { font-size: 0.8rem; letter-spacing: 0.2em; color: #888; text-transform: uppercase; font-weight: 700; margin-bottom: 0.5rem; }
    .st-title { font-size: clamp(1.8rem, 5vw, 2.5rem); font-weight: 700; color: #2d3436; line-height: 1.2; margin-bottom: 2rem; }
    .st-photo { width: 100%; border-radius: 20px; margin: 1.5rem 0; box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
    .st-msg { font-size: 1.1rem; line-height: 1.8; color: #636e72; font-weight: 600; }
    .st-div { width: 40px; height: 4px; border-radius: 2px; background: #dfe6e9; margin: 2rem auto; }
    .st-sender { font-size: 0.9rem; color: #888; }
    .st-sender strong { color: ${c}; font-weight: 700; }
    `: `
    /* VIP MODE - 3D Interactive Stack */
    .viewport { min-height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden; perspective: 1000px; }
    .bg-blobs { position: absolute; inset: 0; filter: blur(60px); z-index: 0; opacity: 0.4; }
    .blob { position: absolute; border-radius: 50%; }
    .blob-1 { width: 40vw; height: 40vw; background: ${c}; top: -10vw; left: -10vw; animation: drift 20s infinite alternate; }
    .blob-2 { width: 30vw; height: 30vw; background: #74b9ff; bottom: 0; right: -5vw; animation: drift 15s infinite alternate-reverse; }
    @keyframes drift { 100% { transform: translate(5vw, 10vw); } }

    .stack-wrapper { position: relative; width: 100%; max-width: 450px; height: 600px; transform-style: preserve-3d; cursor: pointer; z-index: 10; }
    .stack-item { position: absolute; inset: 0; background: rgba(255,255,255,0.85); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-radius: 36px; padding: 2.5rem; box-shadow: 0 20px 40px rgba(0,0,0,0.1); border: 1px solid rgba(255,255,255,0.4); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); transform-style: preserve-3d; }
    
    .item-icon { font-size: 4rem; margin-bottom: 1rem; transform: translateZ(30px); }
    .item-label { font-size: 0.8rem; font-weight: 700; color: ${c}; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 0.5rem; transform: translateZ(20px); }
    .item-title { font-size: 2.5rem; font-weight: 700; color: #2d3436; line-height: 1.1; transform: translateZ(40px); }
    
    .item-photo { width: 100%; height: 100%; object-fit: cover; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); transform: translateZ(20px); }
    
    .item-msg { font-size: 1.2rem; line-height: 1.7; color: #2d3436; font-weight: 600; transform: translateZ(20px); }
    .item-sender { margin-top: 2rem; font-size: 1rem; color: #636e72; transform: translateZ(10px); }
    .item-sender strong { color: ${c}; }

    .swipe-hint { position: fixed; bottom: 40px; left: 50%; transform: translateX(-50%); background: #fff; padding: 10px 20px; border-radius: 30px; box-shadow: 0 10px 20px rgba(0,0,0,0.1); color: ${c}; font-weight: 700; font-size: 0.8rem; letter-spacing: 1px; z-index: 100; pointer-events: none; animation: float 2s infinite; }
    @keyframes float { 50% { transform: translate(-50%, -10px); } }
    `}
  `;

  const html = isBasic ? `
    <div class="stack-shell">
      <div class="stack-container">
        <div class="stack-layer layer-1"></div>
        <div class="stack-layer layer-2"></div>
        <div class="stack-card">
          <div class="st-icon">✤</div>
          <p class="st-label">Para ${d.recipientName || 'Ti'}</p>
          <h1 class="st-title">${d.title}</h1>
          ${d.imageUrl ? `<img class="st-photo" src="${d.imageUrl}" />` : ''}
          <div class="st-div"></div>
          <p class="st-msg" id="type-target"></p>
          <div class="st-div"></div>
          <p class="st-sender">Con afecto,<br/><strong>${d.senderName || 'Alguien'}</strong></p>
        </div>
      </div>
    </div>
  ` : `
    <div class="viewport">
      <div class="bg-blobs">
        <div class="blob blob-1"></div><div class="blob blob-2"></div>
      </div>
      
      <div class="swipe-hint" id="hint">TOCA PARA AVANZAR</div>
      
      <div class="stack-wrapper" id="stack">
        <!-- Message Card -->
        <div class="stack-item s-msg-card" style="z-index: 1;">
          <div class="item-msg" id="type-target"></div>
          <p class="item-sender">De: <strong>${d.senderName || 'Alguien'}</strong></p>
        </div>
        
        <!-- Photo Card -->
        ${d.imageUrl ? `
        <div class="stack-item s-photo-card" style="z-index: 2; padding: 1rem;">
          <img class="item-photo" src="${d.imageUrl}" />
        </div>` : ''}
        
        <!-- Title Card -->
        <div class="stack-item s-title-card" style="z-index: ${d.imageUrl ? 3 : 2};">
          <div class="item-icon">✨</div>
          <p class="item-label">Para ${d.recipientName || 'ti'}</p>
          <h1 class="item-title">${d.title}</h1>
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
    // VIP MODE ENGINE - 3D Card Stack
    const stack = document.getElementById('stack');
    const items = Array.from(stack.querySelectorAll('.stack-item')).reverse(); // Top card is first in array
    let current = 0;
    
    // Initial setup
    function updateStack() {
      items.forEach((item, i) => {
        const offset = i - current;
        if(offset < 0) return; // Swept away
        
        const scale = 1 - (offset * 0.05);
        const y = offset * 20;
        const z = -offset * 50;
        const opacity = 1 - (offset * 0.2);
        
        gsap.to(item, {
          y: y, z: z, scale: scale, opacity: opacity,
          duration: 0.6, ease: 'power3.out'
        });
      });
    }
    updateStack();
    
    stack.addEventListener('click', () => {
      if (current === 0) {
        const audio = document.getElementById('bg-music');
        if (audio) { audio.volume = 0; audio.play(); gsap.to(audio, {volume: 0.8, duration: 2}); }
      }
      
      document.getElementById('hint').style.opacity = '0';
      
      if(current < items.length - 1) {
        const topCard = items[current];
        // Sweep out animation
        gsap.to(topCard, {
          y: -800, rotationZ: -20, opacity: 0,
          duration: 0.8, ease: 'power2.in'
        });
        
        current++;
        updateStack();
        
        // If last card is msg
        if(current === items.length - 1) {
           setTimeout(() => {
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
           }, 400);
        }
      }
    });

    // Gyro/mouse parallax
    stack.addEventListener('mousemove', (e) => {
       const rect = stack.getBoundingClientRect();
       const x = (e.clientX - rect.left - rect.width/2)/20;
       const y = -(e.clientY - rect.top - rect.height/2)/20;
       gsap.to(stack, { rotationY: x, rotationX: y, duration: 0.5 });
    });
    stack.addEventListener('mouseleave', () => gsap.to(stack, {rotationY:0, rotationX:0, duration:1, ease:'elastic.out'}));
  `;

  return { css, html, js };
}
