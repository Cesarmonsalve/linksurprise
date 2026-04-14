import { TemplateRenderData, TemplateOutput, renderVipGallery } from './index';

export function renderGoldenAge(d: TemplateRenderData): TemplateOutput {
  const isBasic = d.renderMode === 'basic';
  const gallery = renderVipGallery(d, "goldenage");
  const c = d.accentColor || '#d4af37'; // gold

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Great+Vibes&display=swap');
    body { background: #1a1408; overflow-x: hidden; margin: 0; }
    
    .golden-grain { position: fixed; inset: 0; pointer-events: none; opacity: 0.04; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); z-index: 100; }
    .golden-glow { position: fixed; inset: 0; background: radial-gradient(ellipse at 50% 30%, ${c}15, transparent 60%); z-index: 0; }
    
    ${isBasic ? `
    .basic-shell { min-height: 100vh; padding: 2rem; display: flex; align-items: center; justify-content: center; position: relative; z-index: 10; }
    .basic-card { background: rgba(26,20,8,0.8); border: 1px solid ${c}30; padding: 3rem 2rem; max-width: 480px; width: 100%; text-align: center; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); position: relative; }
    .basic-card::before, .basic-card::after { content: '✦'; position: absolute; font-size: 1.2rem; color: ${c}50; }
    .basic-card::before { top: 12px; left: 16px; } .basic-card::after { bottom: 12px; right: 16px; }
    .g-year { font-size: 0.7rem; letter-spacing: 0.4em; color: ${c}; text-transform: uppercase; margin-bottom: 1rem; }
    .g-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem,6vw,2.8rem); font-weight: 700; color: #fdfbf7; margin-bottom: 1.5rem; line-height: 1.2; }
    .g-div { width: 100px; height: 1px; background: ${c}40; margin: 1.5rem auto; }
    .g-photo { width: 100%; max-width: 300px; border: 4px solid ${c}30; border-radius: 4px; filter: sepia(30%) contrast(1.1); margin: 1.5rem 0; }
    .g-msg { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; line-height: 2; color: #fdfbf7; opacity: 0.8; margin: 1.5rem 0; }
    .g-sender { font-family: 'Great Vibes', cursive; font-size: 2rem; color: ${c}; margin-top: 2rem; }
    `: `
    /* VIP MODE - 3D Letter */
    .vip-shell { min-height: 100vh; display: flex; align-items: center; justify-content: center; perspective: 1500px; position: relative; z-index: 10; padding: 2rem; }
    
    #wax-seal-overlay {
      position: absolute; inset: 0; z-index: 50; display: flex; flex-direction: column; align-items: center; justify-content: center;
      background: rgba(26,20,8,0.9); backdrop-filter: blur(5px); transition: opacity 1s;
    }
    .wax-seal {
      width: 120px; height: 120px; background: radial-gradient(circle, #8a1c1c 40%, #5a0c0c 100%);
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
      box-shadow: inset 0 0 20px rgba(0,0,0,0.8), 0 10px 20px rgba(0,0,0,0.5);
      cursor: pointer; position: relative; transition: transform 0.3s;
    }
    .wax-seal:hover { transform: scale(1.05); }
    .wax-seal::after { content: '✦'; font-size: 3rem; color: #d4af37; opacity: 0.7; text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
    .seal-text { font-family: 'Cormorant Garamond', serif; color: ${c}; margin-top: 2rem; letter-spacing: 0.2em; text-transform: uppercase; }

    .letter-wrap {
      width: 100%; max-width: 500px; position: relative; transform-style: preserve-3d;
      transform: rotateX(60deg) translateY(200px) scale(0.5); opacity: 0;
    }
    
    .paper {
      background: #f4ecd8; border-radius: 4px; box-shadow: 0 20px 40px rgba(0,0,0,0.5), inset 0 0 60px rgba(139,115,85,0.2);
      padding: 4rem 3rem; text-align: center; color: #3a2e1d; position: relative; overflow: hidden;
    }
    /* Paper texture */
    .paper::before { content: ''; position: absolute; inset: 0; opacity: 0.5; pointer-events: none; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.1'/%3E%3C/svg%3E"); }
    
    .g-label { font-family: 'Cormorant Garamond'; font-size: 1rem; color: #8b7355; font-style: italic; margin-bottom: 1rem; }
    .g-title { font-family: 'Cormorant Garamond'; font-size: clamp(2.5rem,7vw,3.5rem); font-weight: 700; color: #2a1f10; margin-bottom: 2rem; line-height: 1.1; }
    .g-div { width: 80px; height: 1px; background: #c2a67e; margin: 2rem auto; }
    .g-photo { width: 100%; border: 4px solid #fff; box-shadow: 0 10px 20px rgba(0,0,0,0.1); filter: sepia(40%) contrast(1.2); transform: rotate(-2deg); margin: 2rem 0; transition: transform 0.3s; }
    .g-photo:hover { transform: scale(1.05) rotate(0deg); z-index: 10; position: relative; }
    .g-msg { font-family: 'Cormorant Garamond'; font-size: 1.2rem; line-height: 2; color: #3a2e1d; text-align: justify; margin: 2rem 0; min-height: 100px; }
    .g-sender { font-family: 'Great Vibes', cursive; font-size: 3rem; color: #8a1c1c; margin-top: 3rem; }
    
    .ink-text { font-weight: 600; color: #1a1408; }
    `}
  `;

  const html = isBasic ? `
    <div class="golden-grain"></div>
    <div class="golden-glow"></div>
    <div class="basic-shell">
      <div class="basic-card">
        <p class="g-year">✦ Momento Especial ✦</p>
        <h1 class="g-title">${d.title}</h1>
        <div class="g-div"></div>
        ${d.imageUrl ? gallery.html : ''}
        <p class="g-msg" id="type-target"></p>
        <p class="g-sender">${d.senderName || 'Alguien'}</p>
      </div>
    </div>
  ` : `
    <div class="golden-grain"></div>
    <div class="golden-glow"></div>
    
    <div class="vip-shell">
      <div id="wax-seal-overlay">
        <div class="wax-seal" id="seal-btn"></div>
        <p class="seal-text">Romper el sello</p>
      </div>
      
      <div class="letter-wrap" id="letter">
        <div class="paper">
          <p class="g-label">Para ${d.recipientName || 'Ti'},</p>
          <h1 class="g-title">${d.title}</h1>
          <div class="g-div"></div>
          ${d.imageUrl ? gallery.html : ''}
          <div class="g-msg" id="type-target"></div>
          <p class="g-sender" id="g-sender" style="opacity:0">${d.senderName || 'Alguien'}</p>
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
    const seal = document.getElementById('seal-btn');
    const overlay = document.getElementById('wax-seal-overlay');
    const letter = document.getElementById('letter');
    
    seal.addEventListener('click', () => {
      const audio = document.getElementById('bg-music');
      if (audio) { audio.volume = 0; audio.play(); gsap.to(audio, {volume: 0.8, duration: 2}); }
      
      // Break seal animation
      gsap.to(seal, { scale: 1.5, opacity: 0, duration: 0.5, ease: 'back.in' });
      gsap.to('.seal-text', { opacity: 0, duration: 0.3 });
      
      setTimeout(() => {
        overlay.style.pointerEvents = 'none';
        gsap.to(overlay, { opacity: 0, duration: 1 });
        
        // Unfold letter
        gsap.to(letter, { 
          opacity: 1, 
          rotationX: 0, 
          y: 0, 
          scale: 1, 
          duration: 2, 
          ease: 'power3.out',
          onComplete: startWriting
        });
      }, 500);
    });
    
    function startWriting() {
       const target = document.getElementById('type-target');
       const txt = "${d.escapedMessage}";
       let i = 0;
       function type() {
         if(i < txt.length){
           let char = txt.charAt(i);
           if(txt.substring(i,i+5)==='<br/>'){ 
               target.innerHTML += '<br/>'; i += 4; 
           } else {
               // Make it look like ink flowing
                target.innerHTML += \`<span class="ink-text" style="opacity:0; animation: inkReveal 0.5s forwards">\${char}</span>\`;
           }
           i++;
           setTimeout(type, 40);
         } else {
            // Reveal signature
            gsap.to('#g-sender', { opacity: 1, scale: 1.2, duration: 2, ease: 'back.out' });
            
            // Gold particles
            for(let p=0; p<30; p++) {
                const pt = document.createElement('div');
                pt.innerHTML = '✦';
                pt.style.position = 'absolute'; pt.style.color = '${c}'; pt.style.zIndex = '90';
                pt.style.left = (Math.random() * 100) + '%'; pt.style.top = (Math.random() * 100) + '%';
                document.body.appendChild(pt);
                gsap.fromTo(pt, {y: 0, opacity: 1, scale: Math.random()*2}, {y: -200, opacity: 0, duration: 2+Math.random()*2, onComplete:()=>pt.remove()});
            }
         }
       }
       
       // Add CSS for ink
       const style = document.createElement('style');
       style.textContent = \`@keyframes inkReveal { from { opacity: 0; filter: blur(2px); } to { opacity: 1; filter: blur(0px); } }\`;
       document.head.appendChild(style);
       
       type();
    }

    ${gallery.js}`;

  return { css, html, js };
}
