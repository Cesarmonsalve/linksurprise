// ═══════════════════════════════════════════════════════════════
// STYLE #5: QUANTUM RIFT — 3D Wormhole Journey
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput } from './index';

export function renderQuantumRift(d: TemplateRenderData): TemplateOutput {
  const isBasic = d.renderMode === 'basic';
  const c = d.accentColor || '#ff00ff';

  const css = `
    body { background: #010105; overflow-x: hidden; margin: 0; padding: 0; font-family: sans-serif; }
    
    ${isBasic ? `
    /* BASIC MODE */
    .basic-shell { min-height: 100vh; padding: 2rem; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
    .bg-gradient { position: absolute; inset: 0; background: radial-gradient(circle at center, ${c}30 0%, #010105 70%); z-index: 0; }
    .ring { position: absolute; border: 1px solid ${c}20; border-radius: 50%; top: 50%; left: 50%; transform: translate(-50%, -50%); }
    .ring-1 { width: 300px; height: 300px; animation: spin 20s linear infinite; }
    .ring-2 { width: 600px; height: 600px; animation: spin 30s linear infinite reverse; border-style: dashed; }
    .ring-3 { width: 900px; height: 900px; animation: spin 40s linear infinite; border-width: 2px; border-color: ${c}10; }
    @keyframes spin { 100% { transform: translate(-50%, -50%) rotate(360deg); } }
    
    .basic-card { background: rgba(0,0,0,0.6); backdrop-filter: blur(10px); border: 1px solid ${c}40; border-radius: 20px; padding: 3rem 2rem; max-width: 480px; width: 100%; text-align: center; z-index: 10; box-shadow: 0 0 40px ${c}20; }
    .q-label { font-size: 0.7rem; letter-spacing: 0.4em; color: ${c}; text-transform: uppercase; margin-bottom: 0.5rem; }
    .q-title { font-size: clamp(1.8rem,6vw,2.4rem); font-weight: 800; color: #fff; margin-bottom: 1.5rem; letter-spacing: 1px; }
    .q-photo { width: 100%; border-radius: 12px; margin: 1rem 0; }
    .q-msg { color: #ccc; line-height: 1.6; margin: 1.5rem 0; }
    .q-sender { font-size: 0.8rem; color: #888; }
    .q-sender strong { color: ${c}; }
    `: `
    /* VIP MODE */
    #webgl-container { position: fixed; inset: 0; z-index: 0; }
    
    #overlay-start {
      position: fixed; inset: 0; z-index: 100; background: rgba(1,1,5,0.9);
      display: flex; align-items: center; justify-content: center;
      transition: opacity 1s;
    }
    .btn-warp {
      background: transparent; border: 2px solid ${c}; color: ${c}; padding: 15px 40px;
      font-size: 1.2rem; cursor: pointer; border-radius: 30px; letter-spacing: 3px;
      text-transform: uppercase; box-shadow: 0 0 20px ${c}40, inset 0 0 10px ${c}40;
      transition: all 0.3s;
    }
    .btn-warp:hover { background: ${c}; color: #000; box-shadow: 0 0 40px ${c}; }
    
    #main-content {
      position: relative; z-index: 10; min-height: 100vh;
      display: none; align-items: center; justify-content: center; padding: 2rem;
    }
    .q-card {
      background: rgba(0,0,0,0.4); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
      border: 1px solid ${c}30; border-radius: 20px; padding: 3rem 2rem;
      max-width: 500px; width: 100%; text-align: center;
      box-shadow: 0 0 80px ${c}20; transform: perspective(1000px) translateZ(100px);
    }
    .q-label { font-size: 0.65rem; letter-spacing: 0.4em; color: ${c}; text-transform: uppercase; margin-bottom: 1rem; }
    .q-title { font-size: clamp(2rem,6vw,2.8rem); font-weight: 800; color: #fff; margin-bottom: 1.5rem; text-shadow: 0 0 10px ${c}80; }
    .q-div { width: 0%; height: 2px; background: ${c}; margin: 1.5rem auto; box-shadow: 0 0 10px ${c}; }
    .q-photo-wrap { perspective: 1000px; margin: 1.5rem auto; }
    .q-photo { width: 100%; max-width: 320px; border-radius: 12px; box-shadow: 0 0 30px ${c}40; filter: contrast(1.1); transform-style: preserve-3d; }
    .q-msg { font-size: 1.1rem; line-height: 1.8; color: #ddd; margin: 1.5rem 0; min-height: 50px; text-shadow: 0 2px 4px rgba(0,0,0,0.8); }
    .q-sender { font-size: 0.9rem; color: #aaa; margin-top: 2rem; opacity: 0; }
    .q-sender strong { color: ${c}; }
    `}
  `;

  const html = isBasic ? `
    <div class="basic-shell">
      <div class="bg-gradient"></div>
      <div class="ring ring-1"></div>
      <div class="ring ring-2"></div>
      <div class="ring ring-3"></div>
      <div class="basic-card">
        <p class="q-label">Anomalía Detectada</p>
        <h1 class="q-title">${d.title}</h1>
        ${d.imageUrl ? `<img class="q-photo" src="${d.imageUrl}" />` : ''}
        <p class="q-msg" id="type-target"></p>
        <p class="q-sender">De: <strong>${d.senderName || 'Anónimo'}</strong></p>
      </div>
    </div>
  ` : `
    <div id="webgl-container"></div>
    <div id="overlay-start">
      <button class="btn-warp" id="start-btn">INICIAR SALTO CUÁNTICO</button>
    </div>

    <div id="main-content">
      <div class="q-card" id="main-card">
        <p class="q-label" id="ql" style="opacity:0">Salto Completado</p>
        <h1 class="q-title" id="qt"></h1>
        <div class="q-div" id="qd"></div>
        ${d.imageUrl ? `<div class="q-photo-wrap"><img class="q-photo" id="qi" style="opacity:0" src="${d.imageUrl}" /></div>` : ''}
        <div class="q-msg" id="type-target"></div>
        <p class="q-sender" id="qs">Aterrizado por: <strong>${d.senderName || 'Anónimo'}</strong></p>
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
    // VIP MODE ENGINE - Three.js Wormhole
    const container = document.getElementById('webgl-container');
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x010105, 0.001);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 200;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Create Wormhole Tube
    const path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-100, 0, 0),
      new THREE.Vector3(0, 50, -200),
      new THREE.Vector3(100, -50, -400),
      new THREE.Vector3(0, 0, -600),
      new THREE.Vector3(-100, 50, -800),
      new THREE.Vector3(0, 0, -1000)
    ]);
    const geo = new THREE.TubeGeometry(path, 100, 25, 20, false);
    const mat = new THREE.MeshBasicMaterial({ color: '${c}', wireframe: true, transparent: true, opacity: 0.3 });
    const tube = new THREE.Mesh(geo, mat);
    scene.add(tube);
    
    // Add particles inside tube
    const pGeo = new THREE.BufferGeometry();
    const pCount = 1000;
    const pos = new Float32Array(pCount * 3);
    for(let i=0; i<pCount; i++) {
        const u = Math.random();
        const pt = path.getPointAt(u);
        const randR = Math.random() * 20;
        const randAngle = Math.random() * Math.PI * 2;
        pos[i*3] = pt.x + Math.cos(randAngle) * randR;
        pos[i*3+1] = pt.y + Math.sin(randAngle) * randR;
        pos[i*3+2] = pt.z + (Math.random() - 0.5) * 50;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const canvasObj = document.createElement('canvas'); canvasObj.width = 16; canvasObj.height = 16;
    const ctxObj = canvasObj.getContext('2d'); ctxObj.beginPath(); ctxObj.arc(8, 8, 8, 0, Math.PI * 2);
    ctxObj.fillStyle = '#ffffff'; ctxObj.fill();
    const texture = new THREE.CanvasTexture(canvasObj);
    const pMat = new THREE.PointsMaterial({ color: '${c}', size: 2, map: texture, transparent: true, blending: THREE.AdditiveBlending });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Camera animation variables
    let camPos = 0;
    let isWarping = false;
    let speed = 0.0001;

    function animate() {
      requestAnimationFrame(animate);
      if(isWarping) {
        speed += 0.00005; // Accelerate
      }
      camPos += speed;
      if(camPos > 1) camPos = 1;
      
      if(camPos < 1) {
        const p1 = path.getPointAt(camPos);
        const p2 = path.getPointAt(Math.min(camPos + 0.01, 1));
        camera.position.copy(p1);
        camera.lookAt(p2);
      } else if(isWarping) {
        // Reached end of wormhole
        isWarping = false;
        showContent();
      }
      
      tube.rotation.z += 0.005;
      renderer.render(scene, camera);
    }
    animate();

    document.getElementById('start-btn').addEventListener('click', () => {
      document.getElementById('overlay-start').style.opacity = '0';
      const audio = document.getElementById('bg-music');
      if (audio) { audio.volume = 0; audio.play(); gsap.to(audio, {volume: 0.8, duration: 2}); }
      
      setTimeout(() => {
        document.getElementById('overlay-start').style.display = 'none';
        isWarping = true; // start warp
      }, 1000);
    });

    function showContent() {
      // Big Bang Flash
      const flash = document.createElement('div');
      flash.style.cssText = 'position:fixed;inset:0;background:#fff;z-index:99;opacity:1';
      document.body.appendChild(flash);
      
      gsap.to(flash, { opacity: 0, duration: 2, ease: 'power2.out', onComplete:()=>flash.remove() });
      
      // Reveal Content
      document.getElementById('main-content').style.display = 'flex';
      gsap.from('#main-card', { opacity: 0, scale: 0.1, rotationZ: 180, duration: 2, ease: 'elastic.out(1, 0.5)' });
      
      gsap.to('#ql', { opacity: 1, duration: 1, delay: 1 });
      gsap.to('#qt', { text: "${d.title}", duration: 1.5, delay: 1.5 });
      gsap.to('#qd', { width: '60%', duration: 1, delay: 2.5 });
      
      if(document.getElementById('qi')) gsap.to('#qi', { opacity: 1, rotationY: 360, duration: 1.5, delay: 3 });
      
      setTimeout(() => {
        const target = document.getElementById('type-target');
        const txt = "${d.escapedMessage}";
        let i = 0;
        function type() {
          if(i < txt.length) {
            if(txt.substring(i,i+5)==='<br/>'){target.innerHTML+='<br/>';i+=5;}
            else{target.innerHTML+=txt.charAt(i);i++;}
            setTimeout(type, 30);
          } else {
             gsap.to('#qs', { opacity: 1, duration: 1 });
          }
        }
        type();
      }, (document.getElementById('qi') ? 4500 : 3500));
    }
    
    // Mouse Parallax on Photo
    const card = document.getElementById('main-card');
    const photo = document.getElementById('qi');
    if(card && photo) {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width/2;
        const y = e.clientY - rect.top - rect.height/2;
        gsap.to(photo, { rotationY: x*0.05, rotationX: -y*0.05, duration: 0.5 });
      });
      card.addEventListener('mouseleave', () => gsap.to(photo, { rotationY: 0, rotationX: 0, duration: 0.5 }));
    }
  `;

  return { css, html, js };
}
