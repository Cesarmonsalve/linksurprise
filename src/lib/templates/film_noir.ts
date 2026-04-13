// ═══════════════════════════════════════════════════════════════
// STYLE #6: FILM NOIR — Classic B&W Contrast
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput } from './index';

export function renderFilmNoir(d: TemplateRenderData): TemplateOutput {
  const isBasic = d.renderMode === 'basic';

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap');
    body { background: #000; overflow-x: hidden; margin: 0; padding: 0; }
    
    .noir-grain {
      position: fixed; inset: 0; z-index: 100; pointer-events: none; opacity: 0.15;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }
    
    ${isBasic ? `
    .basic-shell { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; position: relative; z-index: 10; }
    .basic-card { background: #111; padding: 3rem; max-width: 500px; width: 100%; text-align: center; border: 2px solid #333; }
    .noir-label { font-family: 'Courier Prime', monospace; font-size: 0.8rem; letter-spacing: 0.2em; color: #888; text-transform: uppercase; margin-bottom: 1rem; }
    .noir-title { font-family: 'Courier Prime', monospace; font-size: 2rem; color: #fff; margin-bottom: 1.5rem; text-transform: uppercase; }
    .noir-divider { width: 50px; height: 2px; background: #555; margin: 1.5rem auto; }
    .noir-photo { width: 100%; border: 4px solid #333; filter: grayscale(100%) contrast(1.2); margin: 1.5rem 0; }
    .noir-msg { font-family: 'Courier Prime', monospace; color: #ccc; line-height: 1.6; }
    .noir-sender { font-family: 'Courier Prime', monospace; color: #666; font-size: 0.9rem; margin-top: 2rem; }
    `: `
    /* VIP MODE */
    #spotlight-overlay { position: fixed; inset: 0; background: radial-gradient(circle 15vw at 50% 50%, transparent 0%, #000 80%), #000; z-index: 50; transition: background 0.1s; pointer-events: none; }
    
    .film-scenes { position: relative; z-index: 10; width: 100vw; height: 100vh; overflow: hidden; display: flex; align-items: center; justify-content: center; }
    .scene-box { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; opacity: 0; visibility: hidden; }
    .scene-box.active { opacity: 1; visibility: visible; }
    
    .noir-title { font-family: 'Courier Prime', monospace; font-size: clamp(2rem,8vw,4rem); color: #fff; text-align: center; text-transform: uppercase; letter-spacing: 5px; }
    .noir-text { font-family: 'Courier Prime', monospace; font-size: clamp(1rem,4vw,1.5rem); color: #fff; text-align: center; max-width: 600px; line-height: 1.8; }
    .noir-photo { width: 100%; max-width: 400px; filter: grayscale(100%) contrast(1.5) sepia(20%); border: 8px solid #fff; box-shadow: 0 0 50px rgba(0,0,0,1); }
    .film-clapboard { font-family: 'Courier Prime'; color: #000; background: #fff; padding: 10px 20px; font-weight: bold; margin-bottom: 2rem; text-transform: uppercase; }
    
    #play-btn { position: fixed; bottom: 40px; right: 40px; z-index: 60; background: transparent; border: 2px solid #fff; color: #fff; font-family: 'Courier Prime'; padding: 10px 20px; cursor: pointer; transition: 0.3s; }
    #play-btn:hover { background: #fff; color: #000; }
    `}
  `;

  const html = isBasic ? `
    <div class="noir-grain"></div>
    <div class="basic-shell">
      <div class="basic-card">
        <div class="noir-label">DIRIGIDO A</div>
        <h1 class="noir-title">${d.recipientName || 'TI'}</h1>
        <div class="noir-divider"></div>
        ${d.imageUrl ? `<img class="noir-photo" src="${d.imageUrl}" />` : ''}
        <p class="noir-msg" id="type-target"></p>
        <p class="noir-sender">CAST: <strong>${d.senderName || 'ANÓNIMO'}</strong></p>
      </div>
    </div>
  ` : `
    <div class="noir-grain"></div>
    <div id="spotlight-overlay"></div>
    
    <div class="film-scenes" id="film-scenes">
      <!-- Scene 1: Concept -->
      <div class="scene-box active" id="scene-1">
        <div class="film-clapboard">TOMA 1: EL ENCUENTRO</div>
        <h1 class="noir-title">${d.title}</h1>
      </div>
      <!-- Scene 2: Photo -->
      ${d.imageUrl ? `
      <div class="scene-box" id="scene-img">
        <img class="noir-photo" src="${d.imageUrl}" />
      </div>` : ''}
      <!-- Scene 3: Message -->
      <div class="scene-box" id="scene-msg">
        <p class="noir-text" id="type-target"></p>
      </div>
      <!-- Scene 4: End -->
      <div class="scene-box" id="scene-end">
        <p class="noir-text" style="font-size: 0.8rem; margin-bottom: 20px;">PRODUCIDO Y DIRIGIDO POR</p>
        <h1 class="noir-title"><strong>${d.senderName || 'ANÓNIMO'}</strong></h1>
        <p class="noir-text" style="font-size: 0.8rem; margin-top: 50px;">FIN</p>
      </div>
    </div>
    
    <button id="play-btn">ACTION [▶]</button>
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
    const spotlight = document.getElementById('spotlight-overlay');
    window.addEventListener('mousemove', e => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      spotlight.style.background = \`radial-gradient(circle 20vw at \${x}% \${y}%, transparent 0%, rgba(0,0,0,0.95) 80%), #000\`;
    });
    
    // Auto-advance or manual
    const scenes = document.querySelectorAll('.scene-box');
    let currScene = 0;
    
    const playBtn = document.getElementById('play-btn');
    playBtn.addEventListener('click', () => {
      const audio = document.getElementById('bg-music');
      if (audio) { audio.volume = 0; audio.play(); gsap.to(audio, {volume: 0.8, duration: 2}); }
      
      playBtn.style.display = 'none';
      nextScene();
    });
    
    function nextScene() {
      if(currScene >= scenes.length) return;
      
      // Film burn effect transition (CSS Flash)
      const flash = document.createElement('div');
      flash.style.position = 'fixed'; flash.style.inset = 0; flash.style.background = '#fff'; flash.style.zIndex = 40;
      document.body.appendChild(flash);
      gsap.fromTo(flash, {opacity: 0}, {opacity: 1, duration: 0.1, yoyo: true, repeat: 1, onComplete: () => flash.remove()});
      
      scenes.forEach(s => s.classList.remove('active'));
      scenes[currScene].classList.add('active');
      
      if(scenes[currScene].id === 'scene-msg') {
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
      }
      
      if(currScene === 0) gsap.from('.film-clapboard', {y: -100, rotation: -20, duration: 1, ease: 'bounce.out'});
      if(scenes[currScene].id === 'scene-img') gsap.from('.noir-photo', {scale: 1.2, filter: 'grayscale(100%) contrast(5)', duration: 4});
      if(scenes[currScene].id === 'scene-end') gsap.from('.noir-title', {letterSpacing: '20px', opacity:0, duration: 2});
      
      currScene++;
      if (currScene < scenes.length) {
         setTimeout(nextScene, 5000);
      } else {
         setTimeout(() => {
           gsap.to(spotlight, { background: '#000', duration: 3 });
         }, 4000);
      }
    }
  `;

  return { css, html, js };
}
