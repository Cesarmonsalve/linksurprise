// ═══════════════════════════════════════════════════════════════
// STYLE #18: BRUTALIST BOLD — Raw & Unapologetic
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput } from './index';

export function renderBrutalistBold(d: TemplateRenderData): TemplateOutput {
  const isBasic = d.renderMode === 'basic';
  const c = d.accentColor || '#fffc00'; // Yellow

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
    body { background: #dedede; overflow-x: hidden; margin: 0; font-family: 'Space Mono', monospace; color: #000; cursor: crosshair; }
    
    ${isBasic ? `
    .brut-shell { min-height: 100vh; padding: 2rem; display: flex; align-items: center; justify-content: center; }
    .brut-card { background: #fff; border: 4px solid #000; padding: 3rem 2rem; max-width: 600px; width: 100%; box-shadow: 15px 15px 0px #000; transition: transform 0.2s, box-shadow 0.2s; }
    .brut-card:hover { transform: translate(-5px, -5px); box-shadow: 20px 20px 0px ${c}; }
    
    .brut-tag { display: inline-block; background: #000; color: #fff; padding: 5px 15px; font-weight: bold; text-transform: uppercase; margin-bottom: 2rem; font-size: 0.9rem; }
    .brut-title { font-family: 'Archivo Black', sans-serif; font-size: clamp(3rem, 8vw, 5rem); line-height: 1; margin: 0 0 2rem 0; text-transform: uppercase; word-break: break-word; }
    .brut-photo { width: 100%; border: 4px solid #000; filter: grayscale(100%) contrast(1.5); margin-bottom: 2rem; box-shadow: 10px 10px 0px #000; }
    .brut-photo:hover { filter: none; }
    .brut-msg { font-size: 1.2rem; line-height: 1.6; border-left: 4px solid ${c}; padding-left: 1rem; margin-bottom: 2rem; background: #f4f4f4; padding: 1rem; }
    .brut-sender { font-weight: bold; font-size: 1.5rem; text-transform: uppercase; background: ${c}; display: inline-block; padding: 5px 10px; border: 2px solid #000; }
    `: `
    /* VIP MODE - Interactive Brutalism */
    .brut-marquee { position: fixed; top: 10vh; left: -10vw; width: 120vw; background: ${c}; color: #000; font-family: 'Archivo Black'; font-size: 4rem; white-space: nowrap; padding: 10px 0; border-top: 4px solid #000; border-bottom: 4px solid #000; transform: rotate(-5deg); z-index: 0; box-shadow: 10px 10px 0px rgba(0,0,0,1); cursor: grab; }
    .brut-marquee:active { cursor: grabbing; box-shadow: 20px 20px 0px rgba(0,0,0,1); }
    .m-track { display: inline-block; animation: scroll 15s linear infinite; }
    .brut-marquee:hover .m-track { animation-play-state: paused; }
    @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

    #main-content { position: relative; z-index: 10; min-height: 100vh; padding: 4rem 2rem; display: flex; align-items: center; justify-content: center; perspective: 1000px; display: none; }
    
    .b-wrap { position: relative; }
    .b-card { background: #fff; border: 6px solid #000; padding: 4rem 3rem; max-width: 700px; width: 100%; box-shadow: 20px 20px 0px #000; transition: transform 0.1s; transform-style: preserve-3d; }
    
    .b-tag-wrap { display: flex; justify-content: space-between; border-bottom: 4px solid #000; padding-bottom: 1rem; margin-bottom: 2rem; }
    .b-tag { background: ${c}; color: #000; font-weight: bold; padding: 5px 15px; border: 2px solid #000; box-shadow: 4px 4px 0px #000; font-size: 1.2rem; transform: translateZ(20px); }
    .b-id { font-weight: bold; font-size: 1.2rem; }
    
    .b-title { font-family: 'Archivo Black', sans-serif; font-size: clamp(4rem, 10vw, 7rem); line-height: 0.9; margin: 0 0 2rem 0; text-transform: uppercase; position: relative; z-index: 2; transform: translateZ(40px); word-break: break-word; mix-blend-mode: exclusion; color: #fff; }
    .b-title:hover { color: ${c}; mix-blend-mode: normal; text-shadow: 4px 4px 0px #000; }
    
    .b-photo-container { position: relative; margin-bottom: 3rem; transform: translateZ(30px); }
    .b-photo { width: 100%; border: 6px solid #000; filter: contrast(1.5) grayscale(100%); transition: all 0.3s; position: relative; z-index: 2; }
    .b-photo-bg { position: absolute; inset: -10px; background: ${c}; z-index: 1; border: 4px solid #000; transform: rotate(3deg); transition: transform 0.3s; }
    .b-photo-container:hover .b-photo { filter: none; transform: translate(-10px, -10px); }
    .b-photo-container:hover .b-photo-bg { transform: rotate(-3deg) translate(10px, 10px); background: #f0f; }

    .b-msg-box { background: #000; color: #fff; font-size: 1.2rem; line-height: 1.7; padding: 2rem; border: 4px solid ${c}; transform: translateZ(20px); box-shadow: -10px 10px 0px ${c}; position: relative; }
    .b-msg-box::before { content: '>'; position: absolute; left: 10px; top: 10px; color: ${c}; font-family: 'Archivo Black'; font-size: 2rem; }
    
    .b-sender { font-family: 'Archivo Black'; font-size: 2.5rem; text-transform: uppercase; color: #000; background: ${c}; display: inline-block; padding: 10px 20px; border: 4px solid #000; box-shadow: 10px 10px 0px #000; margin-top: 3rem; transform: translateZ(50px) rotate(-2deg); transition: transform 0.2s; cursor: pointer; }
    .b-sender:hover { transform: translateZ(60px) rotate(2deg) scale(1.1); background: #f0f; color: #fff; }

    .sticker { position: absolute; font-size: 3rem; z-index: 100; pointer-events: none; animation: pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
    @keyframes pop { 0% { transform: scale(0); } 100% { transform: scale(1); } }
    
    #enter-screen { position: fixed; inset: 0; background: ${c}; z-index: 200; display: flex; align-items: center; justify-content: center; }
    .enter-btn { font-family: 'Archivo Black'; font-size: 4rem; background: #000; color: #fff; border: none; padding: 20px 40px; cursor: pointer; border: 8px solid #000; box-shadow: 20px 20px 0px rgba(0,0,0,0.5); transition: all 0.1s; text-transform: uppercase; }
    .enter-btn:hover { background: #fff; color: #000; transform: translate(-10px, -10px); box-shadow: 30px 30px 0px rgba(0,0,0,1); }
    .enter-btn:active { transform: translate(5px, 5px); box-shadow: 0px 0px 0px transparent; }
    `}
  `;

  const html = isBasic ? `
    <div class="brut-shell">
      <div class="brut-card">
        <div class="brut-tag">RAW MESSAGE</div>
        <h1 class="brut-title">${d.title}</h1>
        ${d.imageUrl ? `<img class="brut-photo" src="${d.imageUrl}" />` : ''}
        <div class="brut-msg" id="type-target"></div>
        <div class="brut-sender">${d.senderName || 'ANÓNIMO'}</div>
      </div>
    </div>
  ` : `
    <div id="enter-screen">
      <button class="enter-btn" id="enter-btn">DESTRUIR</button>
    </div>

    <!-- Draggable Marquee Background -->
    <div class="brut-marquee" id="dragger">
      <div class="m-track">
        ${Array(10).fill(`★ ${d.recipientName || 'RECIPIENT'} ★ NO RULES `).join('')}
      </div>
    </div>

    <div id="main-content">
      <div class="b-wrap">
        <div class="b-card" id="b-card">
          <div class="b-tag-wrap">
            <div class="b-tag">URGENT</div>
            <div class="b-id">ID: #\${Math.floor(Math.random() * 90000) + 10000}</div>
          </div>
          
          <h1 class="b-title">${d.title}</h1>
          
          ${d.imageUrl ? `
          <div class="b-photo-container">
            <div class="b-photo-bg"></div>
            <img class="b-photo" src="${d.imageUrl}" />
          </div>` : ''}
          
          <div class="b-msg-box">
             <div style="margin-left: 30px;" id="type-target"></div>
          </div>
          
          <div class="b-sender" id="sender-btn">${d.senderName || 'ANÓNIMO'}</div>
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
        setTimeout(type, 20);
      }
    }
    setTimeout(type, 500);
  ` : `
    // VIP MODE ENGINE - Brutalist Interactions
    const enterBtn = document.getElementById('enter-btn');
    enterBtn.addEventListener('click', () => {
      const audio = document.getElementById('bg-music');
      if (audio) { audio.volume = 0; audio.play(); gsap.to(audio, {volume: 1, duration: 0.1}); }
      
      // Screen smash effect
      gsap.to('#enter-screen', { scale: 1.5, opacity: 0, rotation: 10, duration: 0.5, ease: 'power4.in', onComplete: () => {
         document.getElementById('enter-screen').style.display = 'none';
         document.getElementById('main-content').style.display = 'flex';
         startSeq();
      }});
    });
    
    function startSeq() {
      gsap.from('#b-card', { y: 1000, rotation: -20, duration: 0.8, ease: 'back.out(1.2)' });
      
      setTimeout(() => {
        const target = document.getElementById('type-target');
        const txt = "${d.escapedMessage}";
        let i = 0;
        target.innerHTML += ' '; // buffer for cursor
        function type() {
          if(i < txt.length) {
            if(txt.substring(i,i+5)==='<br/>'){target.innerHTML+='<br/>';i+=5;}
            else{target.innerHTML+=txt.charAt(i);i++;}
            setTimeout(type, 10); // super fast
          }
        }
        type();
      }, 1000);
    }
    
    // Draggable Marquee (Vanilla JS)
    const dragger = document.getElementById('dragger');
    let isDown = false;
    let startY, startRot = -5;
    
    dragger.addEventListener('mousedown', e => { isDown = true; startY = e.clientY; dragger.style.transition = 'none'; });
    dragger.addEventListener('mouseleave', () => { isDown = false; dragger.style.transition = 'transform 0.5s'; });
    dragger.addEventListener('mouseup', () => { isDown = false; dragger.style.transition = 'transform 0.5s'; });
    dragger.addEventListener('mousemove', e => {
      if(!isDown) return;
      e.preventDefault();
      const y = e.clientY - startY;
      dragger.style.transform = \`translateY(\${y}px) rotate(\${startRot + y*0.01}deg)\`;
    });
    
    // Hardcore hover parallax on card
    const card = document.getElementById('b-card');
    document.addEventListener('mousemove', e => {
       const x = (e.clientX / window.innerWidth - 0.5) * 30;
       const y = (e.clientY / window.innerHeight - 0.5) * 30;
       gsap.to(card, { rotationY: x, rotationX: -y, duration: 0.1 }); // Fast reactive
    });
    
    // Click anywhere to spawn stickers
    const stickers = ['💣', '🔥', '⚡', '💥', '⚠️'];
    document.body.addEventListener('click', e => {
      if(e.target.id === 'enter-btn') return;
      const st = document.createElement('div');
      st.className = 'sticker';
      st.innerText = stickers[Math.floor(Math.random() * stickers.length)];
      st.style.left = (e.clientX - 25) + 'px';
      st.style.top = (e.clientY - 25) + 'px';
      st.style.transform = \`rotate(\${Math.random()*60 - 30}deg)\`;
      document.body.appendChild(st);
      
      // Auto remove
      setTimeout(() => {
         gsap.to(st, { scale: 0, opacity: 0, duration: 0.2, onComplete: () => st.remove() });
      }, 2000);
    });
  `;

  return { css, html, js };
}
