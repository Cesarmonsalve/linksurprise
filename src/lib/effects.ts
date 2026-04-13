export function getGlobalEffect(effectId: string, accentColor: string, isPaid: boolean) {
  let css = '';
  let js = '';
  let html = '';

  switch (effectId) {
    case 'confetti':
      // Requires simple confetti JS via canvas
      html = `<canvas id="ls-confetti-canvas" style="position:fixed;inset:0;pointer-events:none;z-index:99999;"></canvas>`;
      js = `
        const canvas = document.getElementById('ls-confetti-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const pieces = [];
        const colors = ['${accentColor}', '#ffffff', '#ffd700', '#ffb6c1', '#add8e6'];
        for(let i=0; i<150; i++) {
          pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 10 + 5,
            h: Math.random() * 10 + 5,
            vx: Math.random() * 4 - 2,
            vy: Math.random() * 5 + 3,
            rot: Math.random() * 360,
            rotSpeed: Math.random() * 10 - 5,
            color: colors[Math.floor(Math.random() * colors.length)]
          });
        }
        function renderConfetti() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          let allDead = true;
          pieces.forEach(p => {
            if (p.y < canvas.height + 20) {
              allDead = false;
              p.x += p.vx;
              p.y += p.vy;
              p.rot += p.rotSpeed;
              ctx.save();
              ctx.translate(p.x, p.y);
              ctx.rotate(p.rot * Math.PI / 180);
              ctx.fillStyle = p.color;
              ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
              ctx.restore();
            }
          });
          if(!allDead) requestAnimationFrame(renderConfetti);
        }
        setTimeout(() => { requestAnimationFrame(renderConfetti); }, 1000);
      `;
      break;

    case 'fadeUp':
      css = `
        body > div:not(#ls-preloader):not(#password-gate) { opacity: 0; transform: translateY(40px); transition: all 1.5s cubic-bezier(0.22, 1, 0.36, 1); }
        body.ls-loaded > div:not(#ls-preloader):not(#password-gate) { opacity: 1; transform: translateY(0); }
      `;
      break;

    case 'bounceIn':
      css = `
        body > div:not(#ls-preloader):not(#password-gate) { opacity: 0; transform: scale(0.8); }
        @keyframes customBounceIn {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        body.ls-loaded > div:not(#ls-preloader):not(#password-gate) { animation: customBounceIn 1s forwards cubic-bezier(0.25, 1, 0.5, 1); }
      `;
      break;

    case 'zoomOut':
      css = `
        body > div:not(#ls-preloader):not(#password-gate) { opacity: 0; transform: scale(1.3); transition: all 1.2s ease-out; }
        body.ls-loaded > div:not(#ls-preloader):not(#password-gate) { opacity: 1; transform: scale(1); }
      `;
      break;

    case 'reveal':
      css = `
        .reveal-curtain { position:fixed; inset:0; background:#000; z-index:99990; transition: transform 1.5s cubic-bezier(0.77, 0, 0.175, 1); transform-origin: top; }
        body.ls-loaded .reveal-curtain { transform: scaleY(0); }
      `;
      html = `<div class="reveal-curtain"></div>`;
      break;

    case 'heartRain': // VIP
      if (!isPaid) break;
      html = `<canvas id="ls-hearts-canvas" style="position:fixed;inset:0;pointer-events:none;z-index:99998;"></canvas>`;
      js = `
        const hc = document.getElementById('ls-hearts-canvas');
        const hctx = hc.getContext('2d');
        hc.width = window.innerWidth;
        hc.height = window.innerHeight;
        const hearts = [];
        for(let i=0; i<40; i++) {
          hearts.push({
            x: Math.random() * hc.width,
            y: Math.random() * hc.height - hc.height,
            size: Math.random() * 15 + 10,
            vy: Math.random() * 2 + 1,
            sway: Math.random() * 2,
            swaySpeed: Math.random() * 0.05
          });
        }
        let t = 0;
        function renderHearts() {
          hctx.clearRect(0,0,hc.width,hc.height);
          t += 1;
          hearts.forEach(h => {
            h.y += h.vy;
            h.x += Math.sin(t * h.swaySpeed) * h.sway;
            if(h.y > hc.height) h.y = -h.size;
            hctx.fillStyle = '${accentColor}80';
            hctx.font = h.size + 'px sans-serif';
            hctx.fillText('❤️', h.x, h.y);
          });
          requestAnimationFrame(renderHearts);
        }
        renderHearts();
      `;
      break;

    case 'sparkles': // VIP
      if (!isPaid) break;
      html = `<canvas id="ls-sparkle-canvas" style="position:fixed;inset:0;pointer-events:none;z-index:99998;"></canvas>`;
      js = `
        const sc = document.getElementById('ls-sparkle-canvas');
        const sctx = sc.getContext('2d');
        sc.width = window.innerWidth; sc.height = window.innerHeight;
        let mx = sc.width/2, my = sc.height/2;
        window.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
        const sparks = [];
        function renderSparks() {
          sctx.clearRect(0,0,sc.width,sc.height);
          if (Math.random() < 0.4) sparks.push({x: mx, y: my, age: 0, life: Math.random()*30+20, vx: (Math.random()-0.5)*4, vy: Math.random()*-4});
          for(let i=sparks.length-1; i>=0; i--) {
            let p = sparks[i];
            p.age++; p.x += p.vx; p.y += p.vy;
            sctx.fillStyle = \`${accentColor}\${Math.floor((1 - p.age/p.life)*255).toString(16).padStart(2,'0')}\`;
            sctx.beginPath(); sctx.arc(p.x, p.y, Math.max(0, 3 - p.age/p.life*3), 0, Math.PI*2); sctx.fill();
            if(p.age >= p.life) sparks.splice(i, 1);
          }
          requestAnimationFrame(renderSparks);
        }
        renderSparks();
      `;
      break;
      
    case 'typewriter':
    default:
      // Typewriter is generally handled by the templates themselves in basic mode.
      // But we can add a simple fallback css block to reveal the document.
      css = `
        body { animation: fadeInDoc 1s ease forwards; }
        @keyframes fadeInDoc { from { opacity: 0; } to { opacity: 1; } }
      `;
      break;
  }

  return { html, css, js };
}
