// ═══════════════════════════════════════════════════════════════
// STYLE #1: NEBULA GLASS — 3D WebGL + GSAP
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput, renderVipGallery } from './index';

export function renderNebulaGlass(d: TemplateRenderData): TemplateOutput {
  const isBasic = d.renderMode === 'basic';
  const gallery = renderVipGallery(d, 'nebula');

  const css = `
    body { background: #03030a; overflow-x: hidden; margin: 0; padding: 0; }
    
    /* BASIC MODE STYLES */
    ${isBasic ? `
    .basic-shell {
      min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem;
      background: radial-gradient(circle at center, ${d.accentColor}20 0%, #03030a 70%);
    }
    .basic-card {
      background: rgba(255,255,255,0.03); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 3rem 2rem;
      max-width: 480px; width: 100%; text-align: center;
      box-shadow: 0 20px 40px rgba(0,0,0,0.6);
      animation: fadeIn 1s ease-out;
    }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .nebula-label { font-size: 0.7rem; letter-spacing: 0.4em; color: ${d.accentColor}; text-transform: uppercase; margin-bottom: 1rem; }
    .nebula-title { font-size: clamp(1.8rem, 6vw, 2.6rem); font-weight: 800; color: ${d.textColor}; margin-bottom: 1.5rem; }
    .nebula-divider { height: 2px; width: 60px; background: ${d.accentColor}; margin: 2rem auto; }
    .nebula-msg { font-size: 1.1rem; line-height: 1.8; color: ${d.textColor}; opacity: 0.9; margin: 1.5rem 0; }
    .nebula-photo { width: 100%; max-width: 320px; border-radius: 16px; margin: 2rem auto; display: block; }
    .nebula-sender { font-size: 0.85rem; color: ${d.textColor}80; margin-top: 2rem; }
    `: `
    /* VIP MODE STYLES */
    #webgl-container { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
    
    .glass-shell {
      position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; justify-content: center;
      min-height: 100vh; padding: 2rem; perspective: 1200px;
    }
    
    .glass-card {
      background: rgba(255,255,255,0.02); backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px);
      border: 1px solid rgba(255,255,255,0.1); border-top: 1px solid rgba(255,255,255,0.2);
      border-radius: 32px; padding: 3rem 2rem; max-width: 480px; width: 100%;
      box-shadow: 0 40px 80px rgba(0,0,0,0.8), inset 0 0 20px ${d.accentColor}10;
      text-align: center; visibility: hidden; transform-style: preserve-3d;
    }
    
    /* ENVELOPE OVERLAY */
    .envelope-overlay {
      position: fixed; inset: 0; z-index: 100;
      background: #03030a; display: flex; align-items: center; justify-content: center;
      transition: opacity 1s;
    }
    .envelope-box {
      width: 300px; height: 200px; background: ${d.accentColor}20;
      border: 2px solid ${d.accentColor}; border-radius: 12px;
      position: relative; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 0 40px ${d.accentColor}40;
      transition: transform 0.3s;
    }
    .envelope-box:hover { transform: scale(1.05); }
    .envelope-box::before {
      content: 'TOCA PARA ABRIR'; color: ${d.textColor}; font-weight: bold; letter-spacing: 0.1em;
    }

    .nebula-label { font-size: 0.7rem; letter-spacing: 0.4em; text-transform: uppercase; color: ${d.accentColor}; margin-bottom: 1rem; font-weight: 600; }
    .nebula-title { font-size: clamp(1.8rem, 6vw, 2.6rem); font-weight: 800; color: ${d.textColor}; letter-spacing: -0.04em; margin-bottom: 1.5rem; }
    .nebula-photo-wrap { margin: 2rem auto; width: 100%; max-width: 320px; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6), 0 0 30px ${d.accentColor}30; transform-style: preserve-3d; }
    .nebula-photo { width: 100%; display: block; transition: transform 0.7s; }
    .nebula-photo-wrap:hover .nebula-photo { transform: scale(1.05); }
    .nebula-divider { width: 0px; height: 2px; margin: 2rem auto; background: linear-gradient(90deg, transparent, ${d.accentColor}, transparent); }
    .nebula-msg { font-size: 1.1rem; line-height: 1.8; color: ${d.textColor}; opacity: 0.9; margin: 1.5rem 0; min-height: 2em; }
    .nebula-sender { font-size: 0.85rem; color: ${d.textColor}80; margin-top: 2rem; }
    .nebula-sender strong { color: ${d.accentColor}; }
    .cursor-glow {
      position: fixed; top:0; left:0; width: 400px; height: 400px;
      background: radial-gradient(circle, ${d.accentColor}20 0%, transparent 70%); border-radius: 50%; pointer-events: none; z-index: 5;
      transform: translate(-50%, -50%); transition: opacity 0.3s; mix-blend-mode: screen; opacity: 0;
    }
    ${gallery.css}
    `}
  `;

  const html = isBasic ? `
    <div class="basic-shell">
      <div class="basic-card">
        <p class="nebula-label">Para ${d.recipientName || 'ti'}</p>
        <h1 class="nebula-title">${d.title}</h1>
        <div class="nebula-divider"></div>
        ${d.imageUrl ? `<img class="nebula-photo" src="${d.imageUrl}" />` : ''}
        <div class="nebula-msg" id="type-target"></div>
        <p class="nebula-sender">Con cariño, <strong>${d.senderName || 'Alguien especial'}</strong></p>
      </div>
    </div>
  ` : `
    <div class="envelope-overlay" id="envelope-overlay">
      <div class="envelope-box" id="envelope-box"></div>
    </div>
    <div id="webgl-container"></div>
    <div class="cursor-glow" id="cursor-glow"></div>
    
    <div class="glass-shell">
      <div class="glass-card" id="main-card">
        <p class="nebula-label item-reveal">Para ${d.recipientName || 'ti'}</p>
        <h1 class="nebula-title" id="title-text"></h1>
        <div class="nebula-divider divider-reveal"></div>
        ${d.imageUrl ? `<div class="nebula-photo-wrap item-reveal" id="photo-container">${gallery.html}</div>` : ''}
        <div class="nebula-msg" id="type-target"></div>
        <p class="nebula-sender item-reveal">Con cariño, <strong>${d.senderName || 'Alguien especial'}</strong></p>
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
    const envelope = document.getElementById('envelope-box');
    const overlay = document.getElementById('envelope-overlay');
    
    envelope.addEventListener('click', () => {
      // Start Music
      const audio = document.getElementById('bg-music');
      if (audio) { audio.volume = 0; audio.play(); gsap.to(audio, {volume: 1, duration: 2}); }
      
      // Hide Envelope
      gsap.to(overlay, { opacity: 0, duration: 1, onComplete: () => {
        overlay.style.display = 'none';
        startVIPAnimations();
      }});
    });

    // THREE.JS PARTICLES
    const container = document.getElementById('webgl-container');
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x03030a, 0.001);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 2000);
    camera.position.z = 1000;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio); renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const vertices = []; const sizes = [];
    for(let i=0; i<2000; i++) {
      vertices.push((Math.random()*2000)-1000, (Math.random()*2000)-1000, (Math.random()*2000)-1000);
      sizes.push(Math.random()*2);
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    const canvasObj = document.createElement('canvas'); canvasObj.width = 16; canvasObj.height = 16;
    const ctxObj = canvasObj.getContext('2d'); ctxObj.beginPath(); ctxObj.arc(8, 8, 8, 0, Math.PI * 2);
    ctxObj.fillStyle = '${d.accentColor}'; ctxObj.fill();
    const texture = new THREE.CanvasTexture(canvasObj);

    const material = new THREE.PointsMaterial({ size: 10, map: texture, blending: THREE.AdditiveBlending, depthTest: false, transparent: true, opacity: 0.8 });
    const particles = new THREE.Points(geometry, material); scene.add(particles);

    let mouseX = 0; let mouseY = 0;
    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX - window.innerWidth/2); mouseY = (e.clientY - window.innerHeight/2);
      const cursor = document.getElementById('cursor-glow');
      if(cursor) { cursor.style.opacity = '1'; cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; }
    });

    function animate() {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.001; particles.rotation.x += 0.0005;
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    }
    animate();

    function startVIPAnimations() {
      gsap.set('.item-reveal', { y: 30, opacity: 0 });
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.fromTo('#main-card', { autoAlpha: 0, scale: 0.8, rotationX: -15, y: 100 }, { autoAlpha: 1, scale: 1, rotationX: 0, y: 0, duration: 1.5, clearProps: 'transform' })
        .to('.item-reveal', { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 }, "-=0.8")
        .to('.divider-reveal', { width: '80%', duration: 1 }, "-=0.6")
        .to('#title-text', { text: "${d.title}", duration: 1.2, ease: "none" }, "-=0.4")
        .call(() => {
          ${gallery.js}

          const target = document.getElementById('type-target');
          const txt = "${d.escapedMessage}";
          let i = 0;
          function typeChar() {
            if(i < txt.length) {
              if(txt.substring(i,i+5)==='<br/>'){target.innerHTML+='<br/>';i+=5;}
              else{target.innerHTML+=txt.charAt(i);i++;}
              setTimeout(typeChar, 30);
            } else {
              // Finish Typewriter, Trigger Confetti
              fireConfetti();
            }
          }
          typeChar();
        });
    }

    function fireConfetti() {
      const colors = ['${d.accentColor}', '#ffffff'];
      for(let i=0; i<100; i++) {
        const conf = document.createElement('div');
        conf.style.position = 'fixed';
        conf.style.left = '50%';
        conf.style.top = '10%';
        conf.style.width = '10px';
        conf.style.height = '10px';
        conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        conf.style.zIndex = '999';
        document.body.appendChild(conf);

        gsap.to(conf, {
          x: (Math.random() - 0.5) * window.innerWidth,
          y: window.innerHeight + 100,
          rotation: Math.random() * 720,
          duration: Math.random() * 2 + 1.5,
          ease: 'power1.out',
          onComplete: () => conf.remove()
        });
      }
    }

    const card = document.getElementById('main-card');
    const photoContainer = document.getElementById('photo-container');
    if(photoContainer && card) {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; const y = e.clientY - rect.top;
        const cx = rect.width/2; const cy = rect.height/2;
        gsap.to(photoContainer, { rotationX: ((y-cy)/cy)*-8, rotationY: ((x-cx)/cx)*8, transformPerspective: 1000, ease: 'power2.out', duration: 0.5 });
      });
      card.addEventListener('mouseleave', () => { gsap.to(photoContainer, { rotationX: 0, rotationY: 0, duration: 0.8 }); });
    }
  `;

  return { css, html, js };
}
