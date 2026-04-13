// ═══════════════════════════════════════════════════════════════
// STYLE #5: QUANTUM RIFT — 3D Wormhole Tunnel
// Ultra Premium Digital Experience Template
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput } from './index';

export function renderQuantumRift(d: TemplateRenderData): TemplateOutput {
  const css = `
    /* QUANTUM RIFT 3D — Ultra Premium */
    body { background: #020205; overflow: hidden; margin: 0; padding: 0; }
    
    #webgl-tunnel { position: fixed; inset: 0; z-index: 0; }
    
    /* Overlay gradient for depth */
    .tunnel-vignette {
      position: fixed; inset: 0; z-index: 1; pointer-events: none;
      background: radial-gradient(circle at center, transparent 40%, #020205 100%);
    }
    
    .quantum-shell {
      position: relative; z-index: 10; min-height: 100vh;
      display: flex; align-items: center; justify-content: center; padding: 2rem;
      perspective: 1500px;
    }
    
    .quantum-card {
      background: rgba(0,0,0,0.5);
      backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      border: 1px solid ${d.accentColor}20;
      border-radius: 40px; padding: 4rem 2rem;
      max-width: 500px; width: 100%; text-align: center;
      box-shadow: 0 0 50px rgba(0,0,0,0.8), inset 0 0 30px ${d.accentColor}10;
      visibility: hidden; /* For GSAP */
      transform-style: preserve-3d;
    }
    
    /* 3D Floating Rings inside UI */
    .quantum-ring-ui {
      width: 100px; height: 100px; margin: 0 auto 2rem; position: relative;
      transform-style: preserve-3d;
    }
    .quantum-ring-ui .ring-a, .quantum-ring-ui .ring-b {
      position: absolute; inset: 0; border-radius: 50%;
      border: 2px solid ${d.accentColor}50;
    }
    .quantum-ring-ui .ring-a { border-left-color: ${d.accentColor}; }
    .quantum-ring-ui .ring-b { border-right-color: transparent; border-width: 3px; }
    
    .quantum-core-ui {
      position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
      width: 16px; height: 16px; border-radius: 50%; background: #fff;
      box-shadow: 0 0 20px #fff, 0 0 40px ${d.accentColor};
    }
    
    .quantum-label { 
      font-size: 0.75rem; letter-spacing: 0.5em; color: ${d.accentColor}; 
      text-transform: uppercase; margin-bottom: 1rem; font-weight: 700;
    }
    
    .quantum-title { 
      font-size: clamp(2rem, 6vw, 3rem); font-weight: 800; color: ${d.textColor}; 
      line-height: 1.1; margin-bottom: 2rem;
      text-shadow: 0 0 20px ${d.accentColor}40;
    }
    
    .quantum-msg { 
      font-size: 1.15rem; line-height: 1.8; color: ${d.textColor}; opacity: 0.85; 
      margin: 2rem 0; font-weight: 300; 
    }
    
    .quantum-photo-wrap {
      margin: 2rem auto; width: 100%; max-width: 280px; 
      border-radius: 50%; aspect-ratio: 1; overflow: hidden;
      border: 4px solid ${d.accentColor}30;
      box-shadow: 0 0 40px ${d.accentColor}20;
    }
    .quantum-photo { 
      width: 100%; height: 100%; object-fit: cover;
      filter: grayscale(20%) contrast(1.1);
    }
    
    .quantum-divider { 
      width: 2px; height: 0px; background: ${d.accentColor}; 
      margin: 2rem auto; border-radius: 2px; 
    }
    
    .quantum-sender { font-size: 0.9rem; color: ${d.textColor}70; letter-spacing: 0.05em; }
    .quantum-sender strong { color: ${d.accentColor}; letter-spacing: 0.1em; }
  `;

  const html = `
    <canvas id="webgl-tunnel"></canvas>
    <div class="tunnel-vignette"></div>
    
    <div class="quantum-shell">
      <div class="quantum-card" id="main-card">
        <div class="quantum-ring-ui item-reveal">
          <div class="ring-a" id="ring1"></div>
          <div class="ring-b" id="ring2"></div>
          <div class="quantum-core-ui"></div>
        </div>
        <p class="quantum-label item-reveal">Transmisión para ${d.recipientName || 'ti'}</p>
        <h1 class="quantum-title item-reveal">${d.title}</h1>
        ${d.imageUrl ? `
          <div class="quantum-photo-wrap item-reveal">
            <img class="quantum-photo" src="${d.imageUrl}" alt="Portal" id="quantum-image" />
          </div>
        ` : '<div class="quantum-divider divider-reveal"></div>'}
        <div class="quantum-msg" id="type-target"></div>
        <div class="quantum-divider divider-reveal"></div>
        <p class="quantum-sender item-reveal">Origen: <strong>${d.senderName || 'Desconocido'}</strong></p>
      </div>
    </div>
  `;

  const js = `
    // ═══════════════════════════════════════
    // 1. THREE.JS TUBE / WORMHOLE ENGINE
    // ═══════════════════════════════════════
    const canvas = document.getElementById('webgl-tunnel');
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020205, 0.0015);

    const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Custom Tube Path
    class CustomSinCurve extends THREE.Curve {
      constructor(scale = 1) { super(); this.scale = scale; }
      getPoint(t, optionalTarget = new THREE.Vector3()) {
        const tx = Math.cos(t * Math.PI * 4) * 20;
        const ty = Math.sin(t * Math.PI * 2) * 20;
        const tz = t * 1000;
        return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale);
      }
    }

    const path = new CustomSinCurve(1);
    // Increased segments for smoothness
    const tubeGeometry = new THREE.TubeGeometry(path, 300, 15, 32, false);
    
    // Wireframe Material to give that quantum/cyber grid feeling
    const tubeMaterial = new THREE.MeshBasicMaterial({ 
      color: '${d.accentColor}', 
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });
    const tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);
    scene.add(tubeMesh);

    // Add floating particles inside the tunnel
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 1000;
    const posArray = new Float32Array(particleCount * 3);
    for(let i = 0; i < particleCount * 3; i+=3) {
      // distribute along the tube
      const t = Math.random();
      const pt = path.getPoint(t);
      // add random spread
      posArray[i] = pt.x + (Math.random() - 0.5) * 12;
      posArray[i+1] = pt.y + (Math.random() - 0.5) * 12;
      posArray[i+2] = pt.z + (Math.random() - 0.5) * 50;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 1.5,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const particleMesh = new THREE.Points(particleGeo, particleMat);
    scene.add(particleMesh);

    let progress = 0;
    let baseSpeed = 0.0005;
    
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Mouse Parallax for Camera
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    });

    function render3D() {
      requestAnimationFrame(render3D);

      // Advance through tube
      progress += baseSpeed;
      if (progress > 0.95) progress = 0.0;
      
      const lookAtProgress = (progress + 0.01) % 1;

      const currentPos = path.getPointAt(progress);
      const lookAtPos = path.getPointAt(lookAtProgress);

      // Smooth camera interpolation incorporating mouse offset
      camera.position.copy(currentPos);
      
      // Inject slight mouse influence on camera position/rotation
      camera.position.x += mouseX * 2;
      camera.position.y += Math.max(mouseY * 2, -10); // Prevent going out of tube

      camera.lookAt(lookAtPos);
      
      // Rotate tube to simulate spiral
      tubeMesh.rotation.z -= 0.001;

      renderer.render(scene, camera);
    }
    render3D();


    // ═══════════════════════════════════════
    // 2. GSAP SCROLL & TIMELINE
    // ═══════════════════════════════════════
    gsap.set('#main-card', { autoAlpha: 0, scale: 0.5, z: -500 });
    gsap.set('.item-reveal', { autoAlpha: 0, y: 50 });
    
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Rapid hyper-speed at first, then slow down when card appears
    gsap.to({ speed: 0.01 }, {
      speed: baseSpeed,
      duration: 3,
      ease: "power2.out",
      onUpdate: function() { baseSpeed = this.targets()[0].speed; }
    });

    // Animate UI rings
    gsap.to('#ring1', { rotationX: 360, rotationY: 180, duration: 6, repeat: -1, ease: 'none' });
    gsap.to('#ring2', { rotationY: 360, rotationZ: 180, duration: 8, repeat: -1, ease: 'none' });

    // Reveal Sequence
    tl.to('#main-card', { autoAlpha: 1, scale: 1, z: 0, duration: 1.5, delay: 0.5 })
      .to('.item-reveal', { autoAlpha: 1, y: 0, duration: 1, stagger: 0.15 }, "-=0.5")
      .to('.divider-reveal', { height: '60px', duration: 1.2 }, "-=1")
      .call(() => {
        // Typewriter effect
        const target = document.getElementById('type-target');
        const txt = "${d.escapedMessage}";
        let i = 0;
        function typeChar() {
          if (i < txt.length) {
            if (txt.substring(i, i + 5) === '<br/>') { target.innerHTML += '<br/>'; i += 5; }
            else { target.innerHTML += txt.charAt(i); i++; }
            setTimeout(typeChar, 25);
          }
        }
        typeChar();
      });

    // ScrollTrigger to modulate tunnel speed depending on scroll position
    // (If the content was huge, but this is a central card. Let's map mouse wheel to tunnel speed burst)
    window.addEventListener('wheel', (e) => {
      let boost = e.deltaY > 0 ? 0.005 : -0.005;
      baseSpeed += boost;
      gsap.to({}, { 
        duration: 1, 
        onUpdate: () => { baseSpeed += (0.0005 - baseSpeed) * 0.1; }
      });
    });

    // Start audio
    document.body.addEventListener('click', () => {
      const audio = document.getElementById('bg-music');
      if (audio) { audio.volume = 0; audio.play(); gsap.to(audio, {volume: 1, duration: 3}); }
    }, { once: true });
  `;

  return { css, html, js };
}
