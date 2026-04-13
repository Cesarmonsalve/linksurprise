// ═══════════════════════════════════════════════════════════════
// STYLE #11: BENTO PASTEL — Soft Playful Grid
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput } from './index';

export function renderBentoPastel(d: TemplateRenderData): TemplateOutput {
  const isBasic = d.renderMode === 'basic';
  const c = d.accentColor || '#ffb3ba';

  const css = `
    body { background: #faf9f6; overflow-x: hidden; margin: 0; font-family: 'DM Sans', sans-serif; }
    
    ${isBasic ? `
    .bento-shell { min-height: 100vh; padding: 2rem; display: flex; align-items: center; justify-content: center; }
    .bento-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; max-width: 500px; width: 100%; }
    .bento-card { background: #fff; border-radius: 24px; padding: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.05); transition: transform 0.3s; }
    .bento-card:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0,0,0,0.08); }
    .bento-wide { grid-column: span 2; }
    
    .bento-label { font-size: 0.7rem; letter-spacing: 0.2em; color: ${c}; text-transform: uppercase; font-weight: bold; margin-bottom: 0.5rem; }
    .bento-title { font-size: clamp(1.5rem, 5vw, 2.5rem); font-weight: 800; color: #333; line-height: 1.1; margin-bottom: 1rem; }
    .bento-photo { width: 100%; border-radius: 16px; display: block; aspect-ratio: 1; object-fit: cover; }
    .bento-photo-wrap { padding: 0; overflow: hidden; }
    .bento-icon { font-size: 3rem; background: ${c}20; width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; }
    .bento-msg { font-size: 1rem; line-height: 1.6; color: #666; }
    .bento-sender { font-size: 0.9rem; color: #999; font-weight: 500; }
    `: `
    /* VIP MODE - Bento Puzzle */
    #puzzle-overlay {
      position: fixed; inset: 0; z-index: 100; background: #faf9f6;
      display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem;
    }
    .puzzle-inst { font-size: 1.5rem; font-weight: bold; color: #333; margin-bottom: 2rem; text-align: center; }
    
    .puzzle-board { width: 300px; height: 300px; position: relative; background: #eee; border-radius: 24px; overflow: hidden; box-shadow: inset 0 0 20px rgba(0,0,0,0.1); }
    .puzzle-slot { position: absolute; width: 50%; height: 50%; border: 2px dashed #ccc; border-radius: 12px; transition: background 0.3s; }
    .slot-1 { top: 0; left: 0; } .slot-2 { top: 0; left: 50%; } .slot-3 { top: 50%; left: 0; } .slot-4 { top: 50%; left: 50%; }
    
    .puzzle-pieces { display: flex; gap: 10px; margin-top: 2rem; flex-wrap: wrap; justify-content: center; max-width: 320px; }
    .puzzle-piece { width: 60px; height: 60px; background: ${c}; border-radius: 12px; cursor: grab; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: #fff; box-shadow: 0 5px 15px ${c}80; position: relative; z-index: 110; }
    
    #main-content {
      position: relative; z-index: 10; min-height: 100vh; padding: 4rem 2rem;
      display: none; align-items: center; justify-content: center;
    }
    .bento-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; max-width: 600px; width: 100%; }
    .bento-card { background: #fff; border-radius: 32px; padding: 2.5rem; box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
    .bento-wide { grid-column: span 2; }
    .bento-bg-accent { background: linear-gradient(135deg, ${c}, ${c}dd); color: #fff; border: none; }
    .bento-bg-accent .bento-title, .bento-bg-accent .bento-label, .bento-bg-accent .bento-msg { color: #fff; }
    .bento-bg-accent .bento-sender { color: rgba(255,255,255,0.8); }
    
    .bento-label { font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase; font-weight: bold; margin-bottom: 0.5rem; color: ${c}; }
    .bento-title { font-size: clamp(2rem, 6vw, 3rem); font-weight: 800; color: #222; line-height: 1.1; margin-bottom: 0px; letter-spacing: -0.03em; }
    .bento-photo-wrap { padding: 0; overflow: hidden; border-radius: 32px; position: relative; }
    .bento-photo { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
    .bento-photo-wrap:hover .bento-photo { transform: scale(1.05); }
    .bento-icon { font-size: 3rem; background: ${c}20; width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
    .bento-msg { font-size: 1.1rem; line-height: 1.7; color: #555; }
    .bento-sender { font-size: 1rem; color: #888; font-weight: 500; margin-top: 10px; }
    `}
  `;

  const html = isBasic ? `
    <div class="bento-shell">
      <div class="bento-grid">
        <div class="bento-card bento-wide" style="background:${c}; color:#fff;">
          <p class="bento-label" style="color:rgba(255,255,255,0.8)">Para ti</p>
          <h1 class="bento-title" style="color:#fff;">${d.recipientName || 'Especial'}</h1>
        </div>
        <div class="bento-card" style="display:flex; flex-direction:column; justify-content:space-between;">
          <div class="bento-icon">✨</div>
          <h2 class="bento-title" style="font-size:1.2rem;">${d.title}</h2>
        </div>
        ${d.imageUrl ? `
        <div class="bento-card bento-photo-wrap">
          <img class="bento-photo" src="${d.imageUrl}" />
        </div>` : ''}
        <div class="bento-card bento-wide">
          <p class="bento-msg" id="type-target"></p>
          <p class="bento-sender">De: ${d.senderName || 'Alguien'}</p>
        </div>
      </div>
    </div>
  ` : `
    <div id="puzzle-overlay">
      <div class="puzzle-inst">ORDENA EL BENTO<br/>PARA REVELAR</div>
      <div class="puzzle-board" id="pz-board">
        <div class="puzzle-slot slot-1" data-id="1"></div>
        <div class="puzzle-slot slot-2" data-id="2"></div>
        <div class="puzzle-slot slot-3" data-id="3"></div>
        <div class="puzzle-slot slot-4" data-id="4"></div>
      </div>
      <div class="puzzle-pieces" id="pz-pieces">
        <div class="puzzle-piece" data-target="3">💕</div>
        <div class="puzzle-piece" data-target="2">🎁</div>
        <div class="puzzle-piece" data-target="4">✨</div>
        <div class="puzzle-piece" data-target="1">💌</div>
      </div>
    </div>
    
    <div id="main-content">
      <div class="bento-grid">
        <div class="bento-card bento-wide bento-bg-accent gs-card">
          <p class="bento-label">Sorpresa para ti</p>
          <h1 class="bento-title">${d.title}</h1>
        </div>
        
        <div class="bento-card gs-card" style="display:flex; flex-direction:column; justify-content:center;">
          <div class="bento-icon">🎉</div>
          <p class="bento-sender" style="margin-top:20px;">Para:<br/>${d.recipientName || 'Especial'}</p>
        </div>
        
        ${d.imageUrl ? `
        <div class="bento-card bento-photo-wrap gs-card">
          <img class="bento-photo" src="${d.imageUrl}" />
        </div>` : ''}
        
        <div class="bento-card ${d.imageUrl ? '' : 'bento-wide'} gs-card" style="grid-column: span ${d.imageUrl ? '2' : '2'};">
          <div class="bento-msg" id="type-target"></div>
          <p class="bento-sender" style="margin-top:30px;">Con cariño,<br/>${d.senderName || 'Alguien'}</p>
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
    // VIP MODE ENGINE - Mini Drag & Drop Puzzle (Vanilla Touch/Mouse)
    const pieces = document.querySelectorAll('.puzzle-piece');
    const slots = document.querySelectorAll('.puzzle-slot');
    const board = document.getElementById('pz-board');
    let placed = 0;
    
    pieces.forEach(p => {
      let isDragging = false;
      let startX, startY, initialX, initialY;
      
      const onMove = (e) => {
        if(!isDragging) return;
        const x = (e.clientX || e.touches[0].clientX) - startX;
        const y = (e.clientY || e.touches[0].clientY) - startY;
        gsap.set(p, { x: initialX + x, y: initialY + y });
      };
      
      const onEnd = (e) => {
        if(!isDragging) return;
        isDragging = false;
        
        // Remove listeners
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('touchmove', onMove);
        window.removeEventListener('mouseup', onEnd);
        window.removeEventListener('touchend', onEnd);
        
        const rect = p.getBoundingClientRect();
        const centerX = rect.left + rect.width/2;
        const centerY = rect.top + rect.height/2;
        
        let hitSlot = null;
        slots.forEach(s => {
          const sRect = s.getBoundingClientRect();
          if(centerX > sRect.left && centerX < sRect.right && centerY > sRect.top && centerY < sRect.bottom) {
             hitSlot = s;
          }
        });
        
        if (hitSlot && hitSlot.dataset.id === p.dataset.target && !hitSlot.classList.contains('filled')) {
          // Success match
          hitSlot.classList.add('filled');
          hitSlot.style.background = '${c}40';
          hitSlot.style.borderColor = '${c}';
          
          const sRect = hitSlot.getBoundingClientRect();
          const bRect = board.getBoundingClientRect();
          // Animate into slot exactly
          gsap.to(p, {
            x: 0, y: 0,
            left: (sRect.left - bRect.left) + (sRect.width/2) - (rect.width/2) + 'px',
            top: (sRect.top - bRect.top) + (sRect.height/2) - (rect.height/2) + 'px',
            duration: 0.3, ease: 'back.out'
          });
          
          p.style.position = 'absolute';
          board.appendChild(p); // Move DOM element to board container to maintain position relative to board
          p.style.pointerEvents = 'none'; // Lock it
          
          placed++;
          if(placed === 4) finishPuzzle();
          
        } else {
          // Snap back
          gsap.to(p, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
        }
      };
      
      const onStart = (e) => {
        isDragging = true;
        startX = e.clientX || e.touches[0].clientX;
        startY = e.clientY || e.touches[0].clientY;
        const computed = window.getComputedStyle(p);
        const transform = new DOMMatrixReadOnly(computed.transform);
        initialX = transform.m41; initialY = transform.m42;
        
        window.addEventListener('mousemove', onMove);
        window.addEventListener('touchmove', onMove, {passive:false});
        window.addEventListener('mouseup', onEnd);
        window.addEventListener('touchend', onEnd);
      };
      
      p.addEventListener('mousedown', onStart);
      p.addEventListener('touchstart', (e) => { e.preventDefault(); onStart(e); }, {passive:false});
    });
    
    function finishPuzzle() {
      const audio = document.getElementById('bg-music');
      if (audio) { audio.volume = 0; audio.play(); gsap.to(audio, {volume: 0.8, duration: 2}); }
      
      // Fun bento scale out
      gsap.to('#pz-board', { scale: 1.2, rotation: 10, duration: 0.5, ease: 'power2.in' });
      gsap.to('#puzzle-overlay', { opacity: 0, duration: 1, delay: 0.5, onComplete: () => {
        document.getElementById('puzzle-overlay').style.display = 'none';
        showBento();
      }});
      fireConfetti();
    }
    
    function showBento() {
      document.getElementById('main-content').style.display = 'flex';
      
      gsap.from('.gs-card', { 
        y: 100, opacity: 0, scale: 0.8, rotation: Math.random()*10 - 5,
        duration: 1.2, stagger: 0.1, ease: 'elastic.out(1, 0.6)'
      });
      
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
      }, 1500);
    }
    
    function fireConfetti() {
      const colors = ['${c}', '#ffffff', '#ffeb3b', '#4caf50'];
      for(let i=0; i<100; i++) {
        const conf = document.createElement('div');
        conf.style.position = 'fixed'; conf.style.left = '50%'; conf.style.top = '50%';
        conf.style.width = Math.random()*10+5+'px'; conf.style.height = conf.style.width;
        conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        conf.style.zIndex = '999';
        if(Math.random()>0.5) conf.style.borderRadius = '50%';
        document.body.appendChild(conf);

        gsap.to(conf, {
          x: (Math.random() - 0.5) * window.innerWidth * 1.5,
          y: (Math.random() - 0.5) * window.innerHeight * 1.5,
          rotation: Math.random() * 720,
          opacity: 0,
          duration: Math.random() * 2 + 1,
          ease: 'power3.out',
          onComplete: () => conf.remove()
        });
      }
    }
  `;

  return { css, html, js };
}
