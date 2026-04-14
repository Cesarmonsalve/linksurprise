// ═══════════════════════════════════════════════════════════════
// STYLE #9: VELVET DARK — Rich Dramatic Luxury
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput, renderVipGallery } from './index';

export function renderVelvetDark(d: TemplateRenderData): TemplateOutput {
  const isBasic = d.renderMode === 'basic';
  const gallery = renderVipGallery(d, "velvetdark");
  const c = d.accentColor || '#ff3366';

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500&display=swap');
    body { background: #0a0608; overflow: hidden; margin: 0; font-family: 'DM Sans', sans-serif; }
    
    .velvet-ambient { position: fixed; inset: 0; z-index: 0; pointer-events: none; background: radial-gradient(ellipse at 20% 80%, ${c}15 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, ${c}10 0%, transparent 50%); }
    
    ${isBasic ? `
    .velvet-shell { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; position: relative; z-index: 10; }
    .velvet-card { background: rgba(20,10,15,0.6); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.05); border-radius: 32px; padding: 3rem 2rem; max-width: 460px; width: 100%; text-align: center; box-shadow: 0 40px 80px rgba(0,0,0,0.5); }
    .v-emoji { font-size: 4rem; margin-bottom: 1rem; filter: drop-shadow(0 10px 10px rgba(0,0,0,0.5)); }
    .v-label { font-weight: 300; font-size: 0.75rem; letter-spacing: 0.3em; color: ${c}; text-transform: uppercase; margin-bottom: 0.5rem; }
    .v-title { font-family: 'DM Serif Display', serif; font-size: clamp(1.8rem, 6vw, 2.8rem); color: #fff; line-height: 1.2; margin-bottom: 1.5rem; }
    .v-photo { width: 100%; max-width: 280px; border-radius: 20px; margin: 1.5rem auto; display: block; box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
    .v-div { width: 40px; height: 3px; background: ${c}; margin: 2rem auto; border-radius: 2px; }
    .v-msg { font-weight: 300; font-size: 1rem; line-height: 1.9; color: #fff; opacity: 0.7; margin: 1.5rem 0; }
    .v-sender { font-weight: 300; font-size: 0.85rem; color: #fff; opacity: 0.5; margin-top: 2rem; }
    .v-sender strong { color: ${c}; font-weight: 500; opacity: 1; }
    `: `
    /* VIP MODE */
    #gift-overlay {
      position: fixed; inset: 0; z-index: 100; background: #0a0608;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      perspective: 1200px;
    }
    .gift-box-wrapper { width: 150px; height: 150px; position: relative; transform-style: preserve-3d; cursor: pointer; transition: transform 0.3s; }
    .gift-box-wrapper:hover { transform: scale(1.1) rotateY(15deg); }
    
    .box-face { position: absolute; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; border: 2px solid rgba(255,255,255,0.1); }
    .box-front { transform: translateZ(75px); background: linear-gradient(135deg, ${c}, ${c}80); }
    .box-back { transform: rotateY(180deg) translateZ(75px); background: ${c}80; }
    .box-right { transform: rotateY(90deg) translateZ(75px); background: ${c}a0; }
    .box-left { transform: rotateY(-90deg) translateZ(75px); background: ${c}60; }
    .box-top { transform: rotateX(90deg) translateZ(75px); background: ${c}c0; }
    .box-bottom { transform: rotateX(-90deg) translateZ(75px); background: #000; }
    
    .ribbon-v { position: absolute; width: 20px; height: 100%; background: #ffea00; left: 50%; transform: translateX(-50%); box-shadow: 0 0 10px rgba(0,0,0,0.5); }
    .ribbon-h { position: absolute; width: 100%; height: 20px; background: #ffea00; top: 50%; transform: translateY(-50%); box-shadow: 0 0 10px rgba(0,0,0,0.5); }
    .gift-hint { color: #fff; font-family: 'DM Sans'; font-weight: 300; letter-spacing: 3px; text-transform: uppercase; margin-top: 60px; font-size: 0.8rem; opacity: 0.6; animation: pulse 2s infinite; }
    @keyframes pulse { 50% { opacity: 1; } }

    #main-content {
      position: relative; z-index: 10; height: 100vh; overflow-y: auto; overflow-x: hidden;
      display: none; padding: 4rem 2rem; perspective: 1000px;
    }
    .velvet-card {
      background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 40px;
      padding: 4rem 3rem; max-width: 550px; width: 100%; text-align: center; margin: 0 auto;
      box-shadow: 0 60px 120px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1);
      backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px);
      transform-style: preserve-3d;
    }
    .v-emoji { font-size: 5rem; margin-bottom: 1.5rem; filter: drop-shadow(0 20px 20px rgba(0,0,0,0.5)); transform: translateZ(50px); }
    .v-label { font-weight: 300; font-size: 0.8rem; letter-spacing: 0.4em; color: ${c}; text-transform: uppercase; margin-bottom: 1rem; transform: translateZ(30px); }
    .v-title { font-family: 'DM Serif Display', serif; font-size: clamp(2.5rem, 8vw, 3.5rem); color: #fff; line-height: 1.1; margin-bottom: 2rem; transform: translateZ(40px); }
    .v-div { width: 60px; height: 3px; background: ${c}; margin: 2rem auto; border-radius: 3px; box-shadow: 0 0 20px ${c}; transform: translateZ(20px); }
    .v-photo-wrap { transform: translateZ(60px); transform-style: preserve-3d; }
    .v-photo { width: 100%; max-width: 320px; border-radius: 20px; box-shadow: 0 30px 60px rgba(0,0,0,0.8); margin: 2rem auto; display: block; border: 1px solid rgba(255,255,255,0.1); }
    .v-msg { font-weight: 300; font-size: 1.1rem; line-height: 2; color: #fff; opacity: 0.8; margin: 2rem 0; min-height: 100px; transform: translateZ(30px); }
    .v-sender { font-weight: 400; font-size: 1rem; color: rgba(255,255,255,0.5); margin-top: 3rem; transform: translateZ(20px); }
    .v-sender strong { color: ${c}; font-weight: 500; font-size: 1.2rem; display: block; margin-top: 5px; }

    .particle { position: fixed; pointer-events: none; border-radius: 50%; opacity: 0; z-index: 100; }
    `}
  `;

  const html = isBasic ? `
    <div class="velvet-ambient"></div>
    <div class="velvet-shell">
      <div class="velvet-card">
        <div class="v-emoji">🌹</div>
        <p class="v-label">Para ${d.recipientName || 'ti'}</p>
        <h1 class="v-title">${d.title}</h1>
        <div class="v-div"></div>
        ${d.imageUrl ? gallery.html : ''}
        <p class="v-msg" id="type-target"></p>
        <p class="v-sender">Siempre, <strong>${d.senderName || 'Alguien'}</strong></p>
      </div>
    </div>
  ` : `
    <div class="velvet-ambient"></div>
    
    <div id="gift-overlay">
      <div class="gift-box-wrapper" id="gift-box">
        <div class="box-face box-front"><div class="ribbon-v"></div><div class="ribbon-h"></div></div>
        <div class="box-face box-back"><div class="ribbon-v"></div><div class="ribbon-h"></div></div>
        <div class="box-face box-right"><div class="ribbon-v"></div><div class="ribbon-h"></div></div>
        <div class="box-face box-left"><div class="ribbon-v"></div><div class="ribbon-h"></div></div>
        <div class="box-face box-top"><div class="ribbon-v"></div><div class="ribbon-h"></div></div>
        <div class="box-face box-bottom"></div>
      </div>
      <div class="gift-hint">TOCA PARA ABRIR</div>
    </div>
    
    <div id="main-content">
      <div class="velvet-card" id="main-card">
        <div class="v-emoji gs-el">🎁</div>
        <p class="v-label gs-el">Una Sorpresa Para ${d.recipientName || 'ti'}</p>
        <h1 class="v-title gs-el">${d.title}</h1>
        <div class="v-div gs-el"></div>
        ${d.imageUrl ? `
        <div class="v-photo-wrap gs-el">
          ${gallery.html}
        </div>` : ''}
        <div class="v-msg gs-el" id="type-target"></div>
        <p class="v-sender gs-el">Entregado por <strong>${d.senderName || 'Alguien especial'}</strong></p>
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
    const gift = document.getElementById('gift-box');
    const overlay = document.getElementById('gift-overlay');
    
    // Rotate box idle
    gsap.to(gift, { rotationY: 360, rotationX: 20, duration: 8, repeat: -1, ease: 'linear' });
    
    gift.addEventListener('click', () => {
      // Audio
      const audio = document.getElementById('bg-music');
      if (audio) { audio.volume = 0; audio.play(); gsap.to(audio, {volume: 0.8, duration: 2}); }
      
      // Stop idle
      gsap.killTweensOf(gift);
      
      // Explode box
      gsap.to('.box-top', { y: -200, rotationX: 180, opacity: 0, duration: 1 });
      gsap.to('.box-front', { z: 200, rotationX: -90, opacity: 0, duration: 1 });
      gsap.to('.box-right', { x: 200, rotationY: 90, opacity: 0, duration: 1 });
      gsap.to('.box-left', { x: -200, rotationY: -90, opacity: 0, duration: 1 });
      gsap.to('.box-back', { z: -200, rotationX: 90, opacity: 0, duration: 1 });
      
      // Explosion particles
      createParticles();
      
      setTimeout(() => {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto'; // allow scroll if needed
        showCard();
      }, 800);
    });
    
    function createParticles() {
      const colors = ['${c}', '#ffffff', '#ffea00', '#ff3366'];
      for(let i=0; i<50; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.width = Math.random() * 10 + 5 + 'px';
        p.style.height = p.style.width;
        p.style.left = '50%'; p.style.top = '50%';
        document.body.appendChild(p);
        
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * innerWidth;
        gsap.to(p, {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          opacity: Math.random() > 0.5 ? 1 : 0.5,
          rotation: Math.random() * 360,
          duration: 1.5 + Math.random(),
          ease: 'power3.out',
          onComplete: () => p.remove()
        });
      }
    }
    
    function showCard() {
      document.getElementById('main-content').style.display = 'block';
      gsap.set('.gs-el', { autoAlpha: 0, y: 50, rotationX: -20 });
      
      const tl = gsap.timeline();
      tl.from('#main-card', { autoAlpha: 0, scale: 0.8, rotationY: -30, duration: 1.5, ease: 'power4.out', clearProps: 'transform' })
        .to('.gs-el', { autoAlpha: 1, y: 0, rotationX: 0, duration: 0.8, stagger: 0.15, ease: 'back.out' }, "-=1")
        .call(() => {
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
        });
        
      // 3D Parallax on card hover
      const card = document.getElementById('main-card');
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width/2;
        const y = e.clientY - rect.top - rect.height/2;
        gsap.to(card, { rotationY: x*0.02, rotationX: -y*0.02, duration: 0.5, ease: 'power2.out' });
      });
      card.addEventListener('mouseleave', () => { gsap.to(card, { rotationY: 0, rotationX: 0, duration: 1, ease: 'elastic.out' }); });
    }
  
    ${gallery.js}`;

  return { css, html, js };
}
