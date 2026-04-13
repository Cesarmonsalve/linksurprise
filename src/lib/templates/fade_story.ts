// ═══════════════════════════════════════════════════════════════
// STYLE #10: FADE STORY — Multi-Scene Cross-Dissolve
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput } from './index';

export function renderFadeStory(d: TemplateRenderData): TemplateOutput {
  const paragraphs = d.escapedMessage.split('<br/>').filter((p: string) => p.trim() !== '');
  const scenes = paragraphs.length > 0 ? paragraphs : [d.escapedMessage];

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&display=swap');
    body { background: #080808; overflow: hidden; }
    
    .story-container { position: fixed; inset: 0; }
    
    .story-scene {
      position: absolute; inset: 0; display: flex; flex-direction: column;
      align-items: center; justify-content: center; padding: 2rem;
      opacity: 0; transition: opacity 1.5s cubic-bezier(0.22,1,0.36,1);
      text-align: center;
    }
    .story-scene.active { opacity: 1; }
    
    .story-counter {
      position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
      font-size: 0.7rem; letter-spacing: 0.2em; color: ${d.accentColor}60; z-index: 20;
    }
    
    .story-nav {
      position: fixed; bottom: 60px; left: 50%; transform: translateX(-50%);
      display: flex; gap: 8px; z-index: 20;
    }
    .story-dot {
      width: 8px; height: 8px; border-radius: 50%; background: ${d.textColor}30;
      cursor: pointer; transition: all 0.3s;
    }
    .story-dot.active { background: ${d.accentColor}; transform: scale(1.3); }
    
    .story-label { font-size: 0.7rem; letter-spacing: 0.3em; color: ${d.accentColor}; text-transform: uppercase; margin-bottom: 1rem; }
    .story-text {
      font-family: 'Lora', serif; font-size: clamp(1.3rem, 5vw, 2rem);
      color: ${d.textColor}; line-height: 1.6; max-width: 500px;
    }
    .story-photo {
      max-width: 300px; width: 90%; border-radius: 16px; margin: 2rem 0;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    }
    .story-sender {
      font-family: 'Lora', serif; font-style: italic;
      font-size: 0.95rem; color: ${d.textColor}50;
    }
    .story-sender strong { color: ${d.accentColor}; font-style: normal; }
    
    .story-tap-hint {
      position: fixed; top: 50%; right: 20px; transform: translateY(-50%);
      font-size: 1.5rem; color: ${d.accentColor}; z-index: 20;
      animation: tapPulse 2s infinite;
    }
    @keyframes tapPulse { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
  `;

  let scenesHTML = '';
  // Scene 0: Intro
  scenesHTML += `
    <div class="story-scene active" data-scene="0">
      <p class="story-label">Para ${d.recipientName || 'ti'}</p>
      <p class="story-text">${scenes[0]}</p>
    </div>
  `;
  // Scene with photo
  if (d.imageUrl) {
    scenesHTML += `
      <div class="story-scene" data-scene="1">
        <img class="story-photo" src="${d.imageUrl}" alt="Momento" />
        ${scenes[1] ? `<p class="story-text">${scenes[1]}</p>` : ''}
      </div>
    `;
  }
  // Remaining scenes
  const off = d.imageUrl ? 2 : 1;
  for (let i = off; i < scenes.length; i++) {
    scenesHTML += `
      <div class="story-scene" data-scene="${d.imageUrl ? i : i}">
        <p class="story-text">${scenes[i]}</p>
      </div>
    `;
  }
  // Final scene
  const totalScenes = scenes.length + (d.imageUrl ? 1 : 0);
  scenesHTML += `
    <div class="story-scene" data-scene="${totalScenes}">
      <p class="story-sender">Con amor, <strong>${d.senderName || 'Alguien especial'}</strong></p>
    </div>
  `;

  // Dots
  let dotsHTML = '';
  const allScenes = totalScenes + 1;
  for (let i = 0; i < allScenes; i++) {
    dotsHTML += `<div class="story-dot${i === 0 ? ' active' : ''}" data-idx="${i}"></div>`;
  }

  const html = `
    <div class="story-container">${scenesHTML}</div>
    <div class="story-nav">${dotsHTML}</div>
    <div class="story-tap-hint" id="tapHint">›</div>
  `;

  const js = `
    const scenes = document.querySelectorAll('.story-scene');
    const dots = document.querySelectorAll('.story-dot');
    let current = 0;
    const total = scenes.length;
    
    function goTo(idx) {
      if (idx < 0 || idx >= total) return;
      scenes.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      scenes[idx].classList.add('active');
      if (dots[idx]) dots[idx].classList.add('active');
      current = idx;
      if (idx >= total - 1) document.getElementById('tapHint').style.display = 'none';
    }
    
    // Click anywhere to advance
    document.addEventListener('click', () => { goTo(current + 1); });
    dots.forEach((dot, i) => { dot.addEventListener('click', (e) => { e.stopPropagation(); goTo(i); }); });
    
    // Swipe support
    let touchStart = 0;
    document.addEventListener('touchstart', e => { touchStart = e.touches[0].clientX; });
    document.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStart;
      if (dx < -50) goTo(current + 1);
      if (dx > 50) goTo(current - 1);
    });
    
    // Music on first interaction
    const a = document.getElementById('bg-music');
    if (a) document.addEventListener('click', () => { a.play(); }, { once: true });
  `;

  return { css, html, js };
}
