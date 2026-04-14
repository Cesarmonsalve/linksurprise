// ═══════════════════════════════════════════════════════════════
// STYLE #13: ZEN MINIMAL — Breathing Whitespace
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput, renderVipGallery } from './index';

export function renderZenMinimal(d: TemplateRenderData): TemplateOutput {
  const isBasic = d.renderMode === 'basic';
  const gallery = renderVipGallery(d, "zenminimal");
  const c = d.accentColor || '#333333';

  const css = `
    body { background: #fefefe; overflow-x: hidden; margin: 0; font-family: 'DM Sans', sans-serif; }
    
    ${isBasic ? `
    .zen-shell { min-height: 100vh; padding: 3rem 2rem; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
    .zen-circle { width: 80px; height: 80px; border-radius: 50%; border: 2px solid ${c}30; display: flex; align-items: center; justify-content: center; margin-bottom: 3rem; animation: breathe 4s ease-in-out infinite; }
    @keyframes breathe { 0%, 100% { transform: scale(1); opacity: 0.6; } 50% { transform: scale(1.15); opacity: 1; } }
    .zen-dot { width: 8px; height: 8px; border-radius: 50%; background: ${c}; }
    .zen-label { font-size: 0.65rem; letter-spacing: 0.4em; color: #999; text-transform: uppercase; margin-bottom: 2rem; font-weight: 500; }
    .zen-title { font-size: clamp(1.5rem, 5vw, 2rem); font-weight: 300; color: #1a1a1a; line-height: 1.7; max-width: 420px; letter-spacing: -0.01em; }
    .zen-divider { width: 1px; height: 60px; background: ${c}40; margin: 3rem auto; }
    .zen-photo { max-width: 260px; width: 90%; border-radius: 200px; aspect-ratio: 1; object-fit: cover; box-shadow: 0 20px 40px rgba(0,0,0,0.06); }
    .zen-sender { font-size: 0.8rem; color: #999; font-weight: 300; margin-top: 3rem; }
    .zen-sender strong { color: ${c}; font-weight: 500; }
    .zen-reveal { opacity: 0; transform: translateY(20px); animation: zFade 1.5s cubic-bezier(0.22,1,0.36,1) forwards; }
    .zen-reveal:nth-child(2) { animation-delay: 0.2s; } .zen-reveal:nth-child(3) { animation-delay: 0.4s; } .zen-reveal:nth-child(4) { animation-delay: 0.6s; } .zen-reveal:nth-child(5) { animation-delay: 0.8s; } .zen-reveal:nth-child(6) { animation-delay: 1s; } .zen-reveal:nth-child(7) { animation-delay: 1.2s; }
    @keyframes zFade { to { opacity: 1; transform: translateY(0); } }
    `: `
    /* VIP MODE */
    #breathe-overlay { position: fixed; inset: 0; z-index: 100; background: #fefefe; display: flex; flex-direction: column; align-items: center; justify-content: center; }
    .b-inst { font-size: 1.2rem; color: #666; font-weight: 300; margin-bottom: 40px; letter-spacing: 2px; text-transform: uppercase; text-align: center; }
    .b-circle-wrap { position: relative; width: 200px; height: 200px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
    .b-circle { position: absolute; width: 100%; height: 100%; border: 1px solid ${c}; border-radius: 50%; opacity: 0.3; transition: transform 4s cubic-bezier(0.4, 0, 0.2, 1); }
    .b-circle.expand { transform: scale(1.5); opacity: 0.8; border-width: 2px; }
    .b-text { font-size: 1rem; color: ${c}; letter-spacing: 4px; pointer-events: none; transition: opacity 0.5s; }
    .b-progress-dots { display: flex; gap: 10px; margin-top: 60px; }
    .b-dot { width: 6px; height: 6px; border-radius: 50%; background: #ccc; transition: all 0.5s; }
    .b-dot.active { background: ${c}; transform: scale(1.5); }
    
    #main-content { position: relative; z-index: 10; min-height: 100vh; padding: 4rem 2rem; display: none; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
    
    .z-orb { position: absolute; border-radius: 50%; filter: blur(40px); opacity: 0.1; z-index: -1; pointer-events: none; }
    .orb-1 { width: 300px; height: 300px; background: ${c}; top: -100px; left: -100px; animation: float 10s infinite alternate; }
    .orb-2 { width: 400px; height: 400px; background: ${c}; bottom: -100px; right: -100px; animation: float 15s infinite alternate-reverse; }
    @keyframes float { to { transform: translate(50px, 50px); } }

    .z-title { font-size: clamp(2rem, 6vw, 3.5rem); font-weight: 200; color: #111; line-height: 1.3; max-width: 600px; margin-bottom: 2rem; opacity: 0; }
    .z-div { width: 1px; height: 0px; background: ${c}; margin: 2rem auto; }
    .z-photo { width: 100%; max-width: 320px; aspect-ratio: 3/4; object-fit: cover; border-radius: 200px 200px 10px 10px; box-shadow: 0 30px 60px rgba(0,0,0,0.1); opacity: 0; }
    .z-msg { font-size: 1.1rem; line-height: 2; color: #555; font-weight: 300; max-width: 500px; margin: 2rem 0; opacity: 0; }
    .z-sender { font-size: 0.9rem; color: #999; font-weight: 300; margin-top: 3rem; text-transform: uppercase; letter-spacing: 2px; opacity: 0; }
    .z-sender strong { color: ${c}; font-weight: 500; }
    `}
  `;

  const html = isBasic ? `
    <div class="zen-shell">
      <div class="zen-circle zen-reveal"><div class="zen-dot"></div></div>
      <p class="zen-label zen-reveal">Para ${d.recipientName || 'ti'}</p>
      <h1 class="zen-title zen-reveal">${d.title}</h1>
      <div class="zen-divider zen-reveal"></div>
      ${d.imageUrl ? gallery.html : ''}
      <p class="zen-msg zen-reveal" id="type-target"></p>
      <p class="zen-sender zen-reveal">De <strong>${d.senderName || 'Alguien'}</strong></p>
    </div>
  ` : `
    <div class="z-orb orb-1"></div><div class="z-orb orb-2"></div>
    <div id="breathe-overlay">
      <div class="b-inst" id="b-inst">Sincroniza tu respiración para continuar</div>
      <div class="b-circle-wrap" id="b-btn">
        <div class="b-circle" id="bc"></div>
        <div class="b-text" id="bt">TOCA</div>
      </div>
      <div class="b-progress-dots">
        <div class="b-dot" id="bd-1"></div>
        <div class="b-dot" id="bd-2"></div>
        <div class="b-dot" id="bd-3"></div>
      </div>
    </div>
    
    <div id="main-content">
      <h1 class="z-title" id="z-title">${d.title}</h1>
      <div class="z-div" id="z-div"></div>
      ${d.imageUrl ? gallery.html : ''}
      <div class="z-msg" id="type-target"></div>
      <p class="z-sender" id="z-sender">Entregado con paz por<br/><strong>${d.senderName || 'Anónimo'}</strong></p>
    </div>
  `;

  const js = isBasic ? `
    const target = document.getElementById('type-target');
    const txt = "${d.escapedMessage}";
    let i = 0;
    function type() {
      if(i < txt.length) {
        if(txt.substring(i,i+5)==='<br/>'){target.innerHTML+='<br/>';i+=5;}
        else{target.innerHTML+=txt.charAt(i);i++;}
        setTimeout(type, 40);
      }
    }
    setTimeout(type, 1500);
  ` : `
    // VIP MODE ENGINE - Breathing Interaction
    const btn = document.getElementById('b-btn');
    const bc = document.getElementById('bc');
    const bt = document.getElementById('bt');
    const inst = document.getElementById('b-inst');
    let cycles = 0;
    
    btn.addEventListener('click', () => {
      if(cycles === 0) {
        const audio = document.getElementById('bg-music');
        if (audio) { audio.volume = 0; audio.play(); gsap.to(audio, {volume: 0.6, duration: 4}); }
      }
      
      btn.style.pointerEvents = 'none';
      
      // Inhale
      bt.innerText = 'INHALA';
      bc.classList.add('expand');
      
      setTimeout(() => {
        // Exhale
        bt.innerText = 'EXHALA';
        bc.classList.remove('expand');
        
        setTimeout(() => {
          cycles++;
          document.getElementById('bd-'+cycles).classList.add('active');
          
          if(cycles < 3) {
            bt.innerText = 'TOCA';
            btn.style.pointerEvents = 'auto';
          } else {
            bt.style.opacity = '0';
            inst.innerText = 'Sincronización Completa';
            setTimeout(revealZen, 1000);
          }
        }, 4000); // Exhale duration
      }, 4000); // Inhale duration
    });
    
    function revealZen() {
      // Fade out overlay
      gsap.to('#breathe-overlay', { opacity: 0, duration: 2, onComplete: () => {
        document.getElementById('breathe-overlay').style.display = 'none';
        document.getElementById('main-content').style.display = 'flex';
        
        // Show content extremely smoothly
        gsap.to('#z-title', { opacity: 1, y: -20, duration: 3, ease: 'power2.out' });
        gsap.to('#z-div', { height: '80px', duration: 2, delay: 1, ease: 'power2.inOut' });
        
        if(document.getElementById('z-photo')) {
          gsap.to('#z-photo', { opacity: 1, y: -20, duration: 3, delay: 2, ease: 'power2.out' });
        }
        
        setTimeout(() => {
          const target = document.getElementById('type-target');
          gsap.to(target, { opacity: 1, y: -20, duration: 2 });
          const txt = "${d.escapedMessage}";
          let i = 0;
          function type() {
            if(i < txt.length) {
              if(txt.substring(i,i+5)==='<br/>'){target.innerHTML+='<br/>';i+=5;}
              else{target.innerHTML+=txt.charAt(i);i++;}
              setTimeout(type, 50); // Slow typing
            } else {
              gsap.to('#z-sender', { opacity: 1, duration: 3, delay: 1 });
            }
          }
          type();
        }, document.getElementById('z-photo') ? 5000 : 3000);
      }});
    }
  
    ${gallery.js}`;

  return { css, html, js };
}
