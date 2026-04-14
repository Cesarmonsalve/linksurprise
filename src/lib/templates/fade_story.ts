// ═══════════════════════════════════════════════════════════════
// STYLE #10: FADE STORY — Multi-Scene Cross-Dissolve
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput, renderVipGallery } from './index';

export function renderFadeStory(d: TemplateRenderData): TemplateOutput {
  const isBasic = d.renderMode === 'basic';
  const gallery = renderVipGallery(d, "fadestory");
  const paragraphs = d.escapedMessage.split('<br/>').filter((p: string) => p.trim() !== '');
  const scenes = paragraphs.length > 0 ? paragraphs : [d.escapedMessage];
  const c = d.accentColor || '#ffffff';

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&display=swap');
    body { background: #080808; overflow: hidden; margin: 0; font-family: 'Lora', serif; }
    
    .story-container { position: fixed; inset: 0; }
    
    .story-scene {
      position: absolute; inset: 0; display: flex; flex-direction: column;
      align-items: center; justify-content: center; padding: 2rem;
      opacity: 0; transition: opacity 1.5s cubic-bezier(0.22,1,0.36,1);
      text-align: center;
    }
    .story-scene.active { opacity: 1; z-index: 10; }
    
    ${isBasic ? `
    /* BASIC MODE */
    .story-nav { position: fixed; bottom: 60px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; z-index: 20; }
    .story-dot { width: 8px; height: 8px; border-radius: 50%; background: ${d.textColor}30; cursor: pointer; transition: all 0.3s; }
    .story-dot.active { background: ${c}; transform: scale(1.3); }
    .story-tap-hint { position: fixed; top: 50%; right: 20px; transform: translateY(-50%); font-size: 1.5rem; color: ${c}; z-index: 20; animation: tapPulse 2s infinite; }
    @keyframes tapPulse { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
    `: `
    /* VIP MODE - Insta Stories Style */
    .progress-container { position: fixed; top: 20px; left: 10px; right: 10px; display: flex; gap: 5px; z-index: 50; }
    .progress-bar { flex-grow: 1; height: 3px; background: rgba(255,255,255,0.2); border-radius: 2px; overflow: hidden; }
    .progress-fill { height: 100%; background: ${c}; width: 0%; transform-origin: left; }
    
    .story-scene.active .s-bg { transform: scale(1.1); transition: transform 5s linear; }
    .s-bg { position: absolute; inset: -10%; background-size: cover; background-position: center; filter: blur(5px) brightness(0.2); z-index: -1; }
    
    .touch-left { position: fixed; top: 0; left: 0; width: 30%; height: 100%; z-index: 40; }
    .touch-right { position: fixed; top: 0; right: 0; width: 70%; height: 100%; z-index: 40; }
    `}
    
    .s-label { font-size: 0.7rem; letter-spacing: 0.3em; color: ${c}; text-transform: uppercase; margin-bottom: 1rem; font-family: sans-serif; }
    .s-text { font-size: clamp(1.3rem, 5vw, 2rem); color: ${d.textColor}; line-height: 1.6; max-width: 500px; text-shadow: 0 2px 10px rgba(0,0,0,0.8); }
    .s-photo { max-width: 300px; width: 90%; border-radius: 16px; margin: 2rem 0; box-shadow: 0 20px 60px rgba(0,0,0,0.5); object-fit: cover; }
    .s-sender { font-style: italic; font-size: 1rem; color: ${d.textColor}; opacity: 0.8; }
    .s-sender strong { color: ${c}; font-style: normal; font-size: 1.2rem; display: block; margin-top: 10px; }
  `;

  let scenesHTML = '';
  const totalItems = scenes.length + (d.imageUrl ? 1 : 0);
  let currentIndex = 0;

  // Scene 1: Concept
  scenesHTML += `
    <div class="story-scene active" id="scene-${currentIndex}">
      ${!isBasic && d.imageUrl ? `<div class="s-bg" style="background-image:url('${d.imageUrl}')"></div>` : ''}
      <p class="s-label">Para ${d.recipientName || 'ti'}</p>
      <p class="s-text">${d.title}</p>
    </div>
  `;
  currentIndex++;

  // Scene with photo
  if (d.imageUrl) {
    scenesHTML += `
      <div class="story-scene" id="scene-${currentIndex}">
        ${!isBasic ? `<div class="s-bg" style="background-image:url('${d.imageUrl}')"></div>` : ''}
        <img class="s-photo" src="${d.imageUrl}" />
      </div>
    `;
    if (scenes[0]) {
      currentIndex++;
      scenesHTML += `
        <div class="story-scene" id="scene-${currentIndex}">
          ${!isBasic ? `<div class="s-bg" style="background-image:url('${d.imageUrl}')"></div>` : ''}
          <p class="s-text">${scenes[0]}</p>
        </div>
      `;
    }
    currentIndex++;
  }

  // Remaining scenes
  const off = d.imageUrl ? 1 : 0;
  for (let i = off; i < scenes.length; i++) {
    scenesHTML += `
      <div class="story-scene" id="scene-${currentIndex}">
        ${!isBasic && d.imageUrl ? `<div class="s-bg" style="background-image:url('${d.imageUrl}')"></div>` : ''}
        <p class="s-text">${scenes[i]}</p>
      </div>
    `;
    currentIndex++;
  }
  
  // Final scene
  scenesHTML += `
    <div class="story-scene" id="scene-${currentIndex}">
      ${!isBasic && d.imageUrl ? `<div class="s-bg" style="background-image:url('${d.imageUrl}')"></div>` : ''}
      <p class="s-sender">Con amor,<br/><strong>${d.senderName || 'Alguien especial'}</strong></p>
    </div>
  `;
  
  const totalActualScenes = currentIndex + 1;

  let uiHTML = '';
  if (isBasic) {
    let dotsHTML = '';
    for (let i = 0; i < totalActualScenes; i++) {
      dotsHTML += `<div class="story-dot${i === 0 ? ' active' : ''}" data-idx="${i}"></div>`;
    }
    uiHTML = `
      <div class="story-nav">${dotsHTML}</div>
      <div class="story-tap-hint" id="tapHint">›</div>
    `;
  } else {
    let barsHTML = '';
    for (let i = 0; i < totalActualScenes; i++) {
       barsHTML += `<div class="progress-bar"><div class="progress-fill" id="fill-${i}"></div></div>`;
    }
    uiHTML = `
      <div class="progress-container">${barsHTML}</div>
      <div class="touch-left" id="t-left"></div>
      <div class="touch-right" id="t-right"></div>
    `;
  }

  const html = `<div class="story-container">${scenesHTML}</div>${uiHTML}`;

  const js = isBasic ? `
    const scenes = document.querySelectorAll('.story-scene');
    const dots = document.querySelectorAll('.story-dot');
    let current = 0; const total = scenes.length;
    
    function goTo(idx) {
      if (idx < 0 || idx >= total) return;
      scenes.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      scenes[idx].classList.add('active');
      if (dots[idx]) dots[idx].classList.add('active');
      current = idx;
      if (idx >= total - 1) document.getElementById('tapHint').style.display = 'none';
      
      const audio = document.getElementById('bg-music');
      if(audio && current === 1 && audio.paused) { audio.volume = 0.5; audio.play(); }
    }
    
    document.addEventListener('click', () => { goTo(current + 1); });
    dots.forEach((dot, i) => { dot.addEventListener('click', (e) => { e.stopPropagation(); goTo(i); }); });
  ` : `
    // VIP MODE ENGINE - Insta Stories Auto Advance + Touch
    const scenes = document.querySelectorAll('.story-scene');
    const total = scenes.length;
    let current = 0;
    const duration = 5000; // 5s per scene
    
    function resetFills() {
      gsap.killTweensOf('.progress-fill');
      for(let i=0; i<total; i++) {
        const fill = document.getElementById('fill-'+i);
        if(i < current) fill.style.width = '100%';
        else if(i > current) fill.style.width = '0%';
      }
    }
    
    function animateFill() {
      resetFills();
      const fill = document.getElementById('fill-'+current);
      fill.style.width = '0%';
      gsap.to(fill, { width: '100%', duration: duration/1000, ease: 'none', onComplete: nextScene });
    }
    
    function showScene(idx) {
      scenes.forEach(s => s.classList.remove('active'));
      scenes[idx].classList.add('active');
      
      // Ken burns reset
      const bg = scenes[idx].querySelector('.s-bg');
      if(bg) { gsap.killTweensOf(bg); gsap.fromTo(bg, {scale: 1}, {scale: 1.15, duration: duration/1000, ease: 'none'}); }
      
      // Text reveal GSAP
      const texts = scenes[idx].querySelectorAll('p, img');
      gsap.fromTo(texts, {y: 20, opacity: 0}, {y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power2.out'});
    }
    
    function nextScene() {
      if(current < total - 1) {
        current++;
        showScene(current);
        animateFill();
      } else {
        // Stay on last, keep fill complete
        const fill = document.getElementById('fill-'+current);
        fill.style.width = '100%';
      }
    }
    
    function prevScene() {
      if(current > 0) {
        current--;
        showScene(current);
        animateFill();
      }
    }
    
    document.getElementById('t-left').addEventListener('click', () => { prevScene(); });
    document.getElementById('t-right').addEventListener('click', () => { 
      const audio = document.getElementById('bg-music');
      if (audio && audio.paused) { audio.volume = 0; audio.play(); gsap.to(audio, {volume: 0.8, duration: 2}); }
      nextScene(); 
    });
    
    // Init
    showScene(0);
    animateFill();
  
    ${gallery.js}`;

  return { css, html, js };
}
