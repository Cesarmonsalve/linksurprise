// ═══════════════════════════════════════════════════════════════
// STYLE #6: FILM NOIR — Black & White Cinematic
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput } from './index';

export function renderFilmNoir(d: TemplateRenderData): TemplateOutput {
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap');
    body { background: #0a0a0a; overflow-x: hidden; }
    
    /* Film grain overlay */
    .grain {
      position: fixed; inset: 0; z-index: 100; pointer-events: none; opacity: 0.06;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      animation: grainAnim 0.5s steps(6) infinite;
    }
    @keyframes grainAnim {
      0% { transform: translate(0,0); } 20% { transform: translate(-5%,-5%); }
      40% { transform: translate(5%,5%); } 60% { transform: translate(-3%,3%); }
      80% { transform: translate(3%,-3%); } 100% { transform: translate(0,0); }
    }
    
    /* Vignette */
    .vignette {
      position: fixed; inset: 0; z-index: 2; pointer-events: none;
      background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%);
    }
    
    /* Spotlight follows content */
    .spotlight {
      position: fixed; width: 400px; height: 400px; border-radius: 50%;
      background: radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 60%);
      transform: translate(-50%, -50%); pointer-events: none; z-index: 3;
      transition: left 0.8s, top 0.8s;
    }
    
    .noir-shell {
      position: relative; z-index: 10; min-height: 100vh;
      display: flex; align-items: center; justify-content: center; padding: 2rem;
    }
    .noir-card {
      max-width: 480px; width: 100%; text-align: center;
      padding: 3rem 2rem;
      opacity: 0; animation: noirFade 2s cubic-bezier(0.22,1,0.36,1) 0.5s forwards;
    }
    @keyframes noirFade { to { opacity: 1; } }
    
    .noir-ornament {
      font-size: 2rem; color: #ffffff30; margin-bottom: 1rem;
      letter-spacing: 0.5em;
    }
    .noir-label {
      font-family: 'Playfair Display', serif; font-style: italic;
      font-size: 1rem; color: #ffffff60; margin-bottom: 0.5rem;
    }
    .noir-title {
      font-family: 'Playfair Display', serif; font-weight: 900;
      font-size: clamp(2rem, 7vw, 3.5rem); color: #f5f5f0;
      line-height: 1.15; margin-bottom: 1.5rem; letter-spacing: -0.02em;
    }
    .noir-divider {
      width: 80px; height: 1px;
      background: linear-gradient(90deg, transparent, #ffffff40, transparent);
      margin: 2rem auto;
    }
    .noir-msg {
      font-family: 'Playfair Display', serif; font-style: italic;
      font-size: 1.1rem; line-height: 2; color: #f5f5f0; opacity: 0.7;
    }
    .noir-photo {
      width: 100%; max-width: 300px; border-radius: 4px; margin: 2rem auto; display: block;
      filter: grayscale(80%) contrast(1.1);
      box-shadow: 0 20px 60px rgba(0,0,0,0.6);
      transition: filter 0.6s;
    }
    .noir-photo:hover { filter: grayscale(0%); }
    .noir-sender {
      font-family: 'Playfair Display', serif; font-style: italic;
      font-size: 0.9rem; color: #ffffff50; margin-top: 2rem;
    }
    .noir-sender strong { color: #f5f5f0; font-style: normal; }
    
    @media (max-width: 480px) { .noir-card { padding: 2rem 1.5rem; } }
  `;

  const html = `
    <div class="grain"></div>
    <div class="vignette"></div>
    <div class="spotlight" id="spotlight"></div>
    <div class="noir-shell">
      <div class="noir-card">
        <div class="noir-ornament">✦ ✦ ✦</div>
        <p class="noir-label">Una dedicatoria para ${d.recipientName || 'ti'}</p>
        <h1 class="noir-title" id="type-target"></h1>
        <div class="noir-divider"></div>
        ${d.imageUrl ? `<img class="noir-photo" src="${d.imageUrl}" alt="Recuerdo" />` : ''}
        <div class="noir-divider"></div>
        <p class="noir-sender">Siempre tuyo, <strong>${d.senderName || 'alguien especial'}</strong></p>
      </div>
    </div>
  `;

  const js = `
    // Spotlight follows mouse
    const spot = document.getElementById('spotlight');
    document.addEventListener('mousemove', e => {
      spot.style.left = e.clientX + 'px';
      spot.style.top = e.clientY + 'px';
    });
    
    // Typewriter
    const target = document.getElementById('type-target');
    const txt = "${d.escapedMessage}";
    let i = 0;
    function type() {
      if (i < txt.length) {
        if(txt.substring(i,i+5)==='<br/>'){target.innerHTML+='<br/>';i+=5;}
        else{target.innerHTML+=txt.charAt(i);i++;}
        setTimeout(type, 50);
      }
    }
    setTimeout(type, 1500);
    
    document.body.addEventListener('click', () => { const a = document.getElementById('bg-music'); if(a){a.play();} }, {once:true});
  `;

  return { css, html, js };
}
