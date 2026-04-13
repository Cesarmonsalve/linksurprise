// ═══════════════════════════════════════════════════════════════
// STYLE #1: NEBULA GLASS — 3D WebGL + GSAP
// Ultra Premium Digital Experience Template
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput } from './index';

export function renderNebulaGlass(d: TemplateRenderData): TemplateOutput {
  const css = `
    /* NEBULA GLASS 3D — Ultra Premium */
    body { background: #03030a; overflow-x: hidden; margin: 0; padding: 0; }
    
    #webgl-container { 
      position: fixed; inset: 0; z-index: 0; pointer-events: none;
    }
    
    .glass-shell {
      position: relative; z-index: 10;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      min-height: 100vh; padding: 2rem;
      perspective: 1200px;
    }
    
    .glass-card {
      background: rgba(255,255,255,0.02);
      backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px);
      border: 1px solid rgba(255,255,255,0.1);
      border-top: 1px solid rgba(255,255,255,0.2);
      border-radius: 32px; padding: 3rem 2rem;
      max-width: 480px; width: 100%;
      box-shadow: 0 40px 80px rgba(0,0,0,0.8), inset 0 0 20px ${d.accentColor}10;
      text-align: center;
      visibility: hidden; /* For GSAP */
      transform-style: preserve-3d;
    }
    
    .nebula-label {
      font-size: 0.7rem; letter-spacing: 0.4em; text-transform: uppercase;
      color: ${d.accentColor}; margin-bottom: 1rem; font-weight: 600;
      text-shadow: 0 0 20px ${d.accentColor}80;
    }
    
    .nebula-title {
      font-size: clamp(1.8rem, 6vw, 2.6rem); font-weight: 800;
      color: ${d.textColor}; letter-spacing: -0.04em; line-height: 1.1;
      margin-bottom: 1.5rem;
    }
    
    .nebula-photo-wrap {
      margin: 2rem auto; width: 100%; max-width: 320px;
      border-radius: 20px; overflow: hidden;
      box-shadow: 0 20px 40px rgba(0,0,0,0.6), 0 0 30px ${d.accentColor}30;
      transform-style: preserve-3d;
    }
    
    .nebula-photo {
      width: 100%; display: block;
      transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .nebula-photo-wrap:hover .nebula-photo { transform: scale(1.05); }
    
    .nebula-divider {
      width: 0px; height: 2px; margin: 2rem auto;
      background: linear-gradient(90deg, transparent, ${d.accentColor}, transparent);
    }
    
    .nebula-message {
      font-size: 1.1rem; line-height: 1.8; color: ${d.textColor};
      opacity: 0.9; margin: 1.5rem 0; font-weight: 300;
      min-height: 2em;
    }
    
    .nebula-sender {
      font-size: 0.85rem; color: ${d.textColor}80; margin-top: 2rem;
    }
    .nebula-sender strong { color: ${d.accentColor}; }
    
    .cursor-glow {
      position: fixed; top:0; left:0; width: 400px; height: 400px;
      background: radial-gradient(circle, ${d.accentColor}20 0%, transparent 70%);
      border-radius: 50%; pointer-events: none; z-index: 5;
      transform: translate(-50%, -50%); transition: opacity 0.3s;
      mix-blend-mode: screen; opacity: 0;
    }
  `;

  const html = `
    <div id="webgl-container"></div>
    <div class="cursor-glow" id="cursor-glow"></div>
    
    <div class="glass-shell">
      <div class="glass-card" id="main-card">
        <p class="nebula-label item-reveal">Para ${d.recipientName || 'ti'}</p>
        <h1 class="nebula-title" id="title-text"></h1>
        <div class="nebula-divider divider-reveal"></div>
        ${d.imageUrl ? `
          <div class="nebula-photo-wrap item-reveal" id="photo-container">
            <img class="nebula-photo" src="${d.imageUrl}" alt="Sorpresa" />
          </div>
        ` : ''}
        <div class="nebula-message" id="type-target"></div>
        <p class="nebula-sender item-reveal">Con cariño, <strong>${d.senderName || 'Alguien especial'}</strong></p>
      </div>
    </div>
  `;

  const js = `
    // ═══════════════════════════════════════
    // 1. THREE.JS 3D BACKGROUND ENGINE
    // ═══════════════════════════════════════
    const container = document.getElementById('webgl-container');
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x03030a, 0.001);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 1000;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Particles
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const sizes = [];
    const particleCount = 2000;

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() * 2000) - 1000;
      const y = (Math.random() * 2000) - 1000;
      const z = (Math.random() * 2000) - 1000;
      vertices.push(x, y, z);
      sizes.push(Math.random() * 2);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    // Create a circular texture for particles programmatically
    const canvasObj = document.createElement('canvas');
    canvasObj.width = 16; canvasObj.height = 16;
    const ctxObj = canvasObj.getContext('2d');
    ctxObj.beginPath();
    ctxObj.arc(8, 8, 8, 0, Math.PI * 2);
    ctxObj.fillStyle = '${d.accentColor}';
    ctxObj.fill();
    const texture = new THREE.CanvasTexture(canvasObj);

    const material = new THREE.PointsMaterial({
      size: 10,
      map: texture,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      opacity: 0.8
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse interaction parameters
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
      mouseX = (event.clientX - windowHalfX);
      mouseY = (event.clientY - windowHalfY);
      
      // Cursor Glow
      const cursor = document.getElementById('cursor-glow');
      if(cursor) {
        cursor.style.opacity = '1';
        cursor.style.left = event.clientX + 'px';
        cursor.style.top = event.clientY + 'px';
      }
    });

    // Device orientation for mobile limits
    if(window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', (event) => {
        if(event.gamma && event.beta) {
          mouseX = event.gamma * 20;
          mouseY = (event.beta - 45) * 20;
        }
      });
    }

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    function animate() {
      requestAnimationFrame(animate);
      targetX = mouseX * 0.5;
      targetY = mouseY * 0.5;
      
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;

      camera.position.x += (targetX - camera.position.x) * 0.02;
      camera.position.y += (-targetY - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }
    animate();

    // ═══════════════════════════════════════
    // 2. GSAP ADVANCED ANIMATIONS
    // ═══════════════════════════════════════
    
    // Setup initial states
    gsap.set('.item-reveal', { y: 30, opacity: 0 });
    
    // Main Timeline
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // 1. Reveal the card with a 3D flip-up effect
    tl.fromTo('#main-card', 
      { autoAlpha: 0, scale: 0.8, rotationX: -15, y: 100 },
      { autoAlpha: 1, scale: 1, rotationX: 0, y: 0, duration: 1.5, clearProps: 'transform' }
    )
    
    // 2. Stagger reveal items
    .to('.item-reveal', { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 }, "-=0.8")
    
    // 3. Divider expand
    .to('.divider-reveal', { width: '80%', duration: 1 }, "-=0.6")
    
    // 4. Typewriter Title (TextPlugin)
    .to('#title-text', { text: "${d.title}", duration: 1.2, ease: "none" }, "-=0.4")
    
    // 5. Typewriter Message (Custom logic with HTML breaks)
    .call(() => {
      const target = document.getElementById('type-target');
      const txt = "${d.escapedMessage}";
      let i = 0;
      function typeChar() {
        if (i < txt.length) {
          if (txt.substring(i, i + 5) === '<br/>') { target.innerHTML += '<br/>'; i += 5; }
          else { target.innerHTML += txt.charAt(i); i++; }
          setTimeout(typeChar, 30);
        }
      }
      typeChar();
    });

    // Premium 3D Tilt Effect on Photo via JS
    const photoContainer = document.getElementById('photo-container');
    const card = document.getElementById('main-card');
    
    if(photoContainer && card) {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        
        gsap.to(photoContainer, {
          rotationX: rotateX,
          rotationY: rotateY,
          transformPerspective: 1000,
          ease: 'power2.out',
          duration: 0.5
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(photoContainer, { rotationX: 0, rotationY: 0, duration: 0.8, ease: 'power2.out' });
      });
    }

    // Music interaction setup
    document.body.addEventListener('click', () => {
      const audio = document.getElementById('bg-music');
      if (audio) { audio.volume = 0; audio.play(); gsap.to(audio, {volume: 1, duration: 2}); }
    }, { once: true });
  `;

  return { css, html, js };
}
