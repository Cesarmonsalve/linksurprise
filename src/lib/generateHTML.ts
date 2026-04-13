// ═══════════════════════════════════════════════════════════════
// ADVANCED STANDALONE HTML GENERATOR ENGINE v2.0
// 20 Premium Visual Style Templates
// ═══════════════════════════════════════════════════════════════

import { TEMPLATE_RENDERERS, resolveTemplateId, TemplateRenderData } from './templates/index';

export interface ProjectData {
  recipientName: string;
  senderName: string;
  message: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  fontFamily: string;
  effect: string;
  musicUrl: string;
  imageUrl: string;
  template: string; // ID of the template
  title: string;
  password: string;
  customTemplateConfig?: any; // For custom templates from DB
}

export function generateHTML(data: ProjectData, isPaid: boolean = false, renderMode: 'vip' | 'basic' = 'vip'): string {
  const {
    recipientName,
    senderName,
    message,
    backgroundColor,
    textColor,
    accentColor,
    fontFamily,
    musicUrl,
    imageUrl,
    title,
    template,
    password,
  } = data;

  // ═══ SANITIZATION ═══
  const htmlEscape = (str: string) => {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  const safeRecipient = htmlEscape(recipientName);
  const safeSender = htmlEscape(senderName);
  const safeTitle = htmlEscape(title);
  const safePassword = htmlEscape(password);
  const safeMessage = htmlEscape(message);
  const escapedMessage = safeMessage
    .replace(/\\\\/g, '\\\\\\\\')
    .replace(/\n/g, '<br/>')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"');

  // ═══ RESOLVE TEMPLATE (with backwards compatibility) ═══
  const resolvedTemplate = resolveTemplateId(template);

  // ═══ GET RENDERER OR USE CUSTOM ═══
  let templateCSS = '';
  let templateHTML = '';
  let templateJS = '';

  if (data.customTemplateConfig) {
    // Es una plantilla personalizada cargada desde la BD
    const c = data.customTemplateConfig;
    // Replace variables in Custom HTML
    templateHTML = c.htmlTemplate
      .replace(/\$\{recipientName\}/g, safeRecipient)
      .replace(/\$\{senderName\}/g, safeSender)
      .replace(/\$\{escapedMessage\}/g, escapedMessage)
      .replace(/\$\{imageUrl\}/g, imageUrl || '')
      .replace(/\$\{backgroundColor\}/g, backgroundColor)
      .replace(/\$\{textColor\}/g, textColor)
      .replace(/\$\{accentColor\}/g, accentColor);
      
    templateCSS = c.cssTemplate || '';
    templateJS = c.jsTemplate || '';
  } else {
    // Es una plantilla nativa estática
    const renderer = TEMPLATE_RENDERERS[resolvedTemplate];
    if (renderer) {
      const renderData: TemplateRenderData = {
        recipientName: safeRecipient,
        senderName: safeSender,
        message: safeMessage,
        escapedMessage,
        backgroundColor,
        textColor,
        accentColor,
        fontFamily,
        musicUrl,
        imageUrl,
        title: safeTitle,
        template: resolvedTemplate,
      };
      const rendered = renderer(renderData);
      templateCSS = rendered.css;
      templateHTML = rendered.html;
      templateJS = rendered.js;
    }
  }

  // ═══ BASIC MODE / FREEMIUM ═══
  // If basic, we purge the complex scripts (GSAP, Parallax, Three)
  let engineLibraries = '';
  let engineExecution = '';

  if (renderMode === 'basic') {
    // Modo Básico: Sin librerías pesadas, y con HTML/CSS plano
    templateJS = `document.body.style.overflow = 'auto';`;
    engineExecution = `<script>window.addEventListener('load', () => { ${templateJS} });</script>`;
    
    // Validar si la plantilla Custom tiene una versión Basic designada
    if (data.customTemplateConfig && data.customTemplateConfig.htmlBasicTemplate) {
      templateHTML = data.customTemplateConfig.htmlBasicTemplate
        .replace(/\$\{recipientName\}/g, safeRecipient)
        .replace(/\$\{senderName\}/g, safeSender)
        .replace(/\$\{escapedMessage\}/g, escapedMessage)
        .replace(/\$\{imageUrl\}/g, imageUrl || '')
        .replace(/\$\{backgroundColor\}/g, backgroundColor)
        .replace(/\$\{textColor\}/g, textColor)
        .replace(/\$\{accentColor\}/g, accentColor);
      templateCSS = data.customTemplateConfig.cssBasicTemplate || '';
    } else {
      // Si no tiene Basic, o es de las predefinidas: TARJETA UNIVERSAL
      templateCSS = `
        .freemium-card {
          max-width: 600px; margin: 40px auto; padding: 40px 20px; text-align: center;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);
          border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          font-family: '${fontFamily}', sans-serif;
        }
        .freemium-img { width: 150px; height: 150px; border-radius: 50%; object-fit: cover; margin-bottom: 20px; border: 4px solid ${accentColor}; }
        .freemium-title { font-size: 2rem; color: ${textColor}; margin-bottom: 15px; font-weight: bold; }
        .freemium-message { font-size: 1.1rem; color: ${textColor}; opacity: 0.8; line-height: 1.6; white-space: pre-wrap; }
        .freemium-footer { margin-top: 30px; font-size: 0.9rem; color: ${accentColor}; }
      `;
      templateHTML = `
        <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; background: ${backgroundColor};">
          <div class="freemium-card">
            ${imageUrl ? `<img src="${imageUrl}" alt="Foto" class="freemium-img" />` : ''}
            <h1 class="freemium-title">Para: ${safeRecipient}</h1>
            <div class="freemium-message">${escapedMessage}</div>
            <div class="freemium-footer">Con cariño, ${safeSender}</div>
          </div>
        </div>
      `;
    }
  } else {
    // Modo VIP Completo con todas las librerías
    engineLibraries = `
  <!-- Core 3D & GSAP Engine (Mega Interactive) -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/TextPlugin.min.js"></script>
    `;
    engineExecution = `
  <script>
    // Register GSAP Plugins globally
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
    
    // Engine: ${resolvedTemplate}
    window.addEventListener('load', () => {
      // Small delay to let preloader fade out securely
      setTimeout(() => {
        ${templateJS}
      }, 500);
    });
  </script>`;
  }

  // ═══ WATERMARK (free tier) ═══
  const watermark = !isPaid
    ? `<div style="position:fixed;bottom:10px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.6);color:#fff;padding:6px 16px;border-radius:20px;font-size:11px;font-family:sans-serif;z-index:9999;backdrop-filter:blur(8px);">Hecho con ❤️ en LinkSurprise</div>`
    : '';

  // ═══ PASSWORD GATE ═══
  const passwordHTML = safePassword
    ? `
    <div id="password-gate" style="position:fixed;inset:0;background:${backgroundColor};display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:99999;font-family:'${fontFamily}',sans-serif;">
      <div class="pw-box" style="text-align:center;padding:3rem 2rem;background:rgba(255,255,255,0.05);backdrop-filter:blur(20px);border-radius:20px;border:1px solid rgba(255,255,255,0.1);box-shadow:0 25px 50px rgba(0,0,0,0.5);width:90%;max-width:350px;">
        <div style="font-size:4rem;margin-bottom:1.5rem;filter:drop-shadow(0 0 10px ${accentColor});">🔐</div>
        <h2 style="color:${textColor};font-size:1.5rem;margin-bottom:0.5rem;font-weight:700;letter-spacing:-0.03em;">Bóveda Secreta</h2>
        <p style="color:${textColor}80;font-size:0.9rem;margin-bottom:2rem;">Solo aquellos con la llave pueden entrar.</p>
        <input id="pw-input" type="password" placeholder="••••••••" style="padding:1rem;border-radius:12px;border:1px solid ${accentColor}40;background:rgba(0,0,0,0.2);color:${textColor};font-size:1.5rem;letter-spacing:0.3em;text-align:center;outline:none;width:100%;transition:all 0.3s;" />
        <br/>
        <button onclick="checkPw()" style="margin-top:1.5rem;width:100%;padding:1rem;border-radius:12px;border:none;background:${accentColor};color:#fff;font-size:1rem;font-weight:700;cursor:pointer;text-transform:uppercase;letter-spacing:0.1em;box-shadow:0 10px 20px ${accentColor}40;">Desbloquear</button>
        <p id="pw-error" style="color:#ef4444;font-size:0.8rem;margin-top:1rem;display:none;animation:shake 0.4s;">Contraseña incorrecta</p>
      </div>
    </div>
    <style>@keyframes shake { 0%, 100% {transform: translateX(0);} 25% {transform: translateX(-10px);} 75% {transform: translateX(10px);} }</style>
    <script>
      function checkPw() {
        if (document.getElementById('pw-input').value === '${safePassword}') {
          const gate = document.getElementById('password-gate');
          gate.style.transition = 'opacity 0.8s, transform 0.8s';
          gate.style.opacity = '0';
          gate.style.transform = 'scale(1.1)';
          setTimeout(() => gate.remove(), 800);
        } else {
          document.getElementById('pw-error').style.display = 'block';
          document.getElementById('pw-input').style.borderColor = '#ef4444';
          document.querySelector('.pw-box').style.animation = 'shake 0.4s';
          setTimeout(()=>document.querySelector('.pw-box').style.animation = '', 400);
        }
      }
      document.getElementById('pw-input').addEventListener('keydown', function(e) { if(e.key==='Enter') checkPw(); });
    </script>
  `
    : '';

  // ═══ PRELOADER (Global for 3D/GSAP Templates) ═══
  const preloaderHTML = renderMode === 'vip' ? `
    <div id="ls-preloader" style="position:fixed;inset:0;background:${backgroundColor};z-index:999999;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:opacity 0.8s ease, transform 0.8s ease;">
      <div style="width:60px;height:60px;border-radius:50%;border:2px solid ${accentColor}20;border-top-color:${accentColor};animation:lsSpin 1s linear infinite;margin-bottom:20px;box-shadow:0 0 20px ${accentColor}40;"></div>
      <p style="color:${textColor};font-family:'${fontFamily}',sans-serif;font-size:0.85rem;letter-spacing:0.2em;text-transform:uppercase;animation:lsPulse 2s infinite;">Cargando <span id="ls-progress">0%</span></p>
      <style>
        @keyframes lsSpin { to {transform: rotate(360deg);} }
        @keyframes lsPulse { 0%,100%{opacity:0.5;} 50%{opacity:1;} }
        body.ls-loaded #ls-preloader { opacity:0; pointer-events:none; transform: scale(1.05); }
      </style>
      <script>
        document.addEventListener('DOMContentLoaded', () => {
          let p = 0; 
          const el = document.getElementById('ls-progress');
          const int = setInterval(() => { 
            p += Math.floor(Math.random() * 15) + 5; 
            if(p >= 100) { p = 100; clearInterval(int); }
            if(el) el.textContent = p + '%';
          }, 150);
          window.addEventListener('load', () => {
            clearInterval(int);
            if(el) el.textContent = '100%';
            setTimeout(() => { document.body.classList.add('ls-loaded'); }, 400);
          });
        });
      </script>
    </div>
  ` : '';

  // ═══ ASSEMBLE FINAL HTML ═══
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${safeTitle || 'Una sorpresa para ti 💝'}</title>
  <meta name="description" content="Alguien especial te envió una sorpresa digital">
  <meta property="og:title" content="${safeTitle || 'Tienes una sorpresa 💝'}">
  <meta property="og:description" content="Alguien especial te ha enviado un mensaje. ¡Ábrelo!">
  <link href="https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}:wght@300;400;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root { --bg: ${backgroundColor}; --txt: ${textColor}; --acc: ${accentColor}; }
    *{margin:0;padding:0;box-sizing:border-box;}
    body{
      font-family:'${fontFamily}',sans-serif;
      color:var(--txt);
      overflow-x:hidden;
      -webkit-font-smoothing: antialiased;
      background: var(--bg);
    }
    
    /* ═══ Template: ${resolvedTemplate} ═══ */
    ${templateCSS}
  </style>
</head>
<body>
  ${preloaderHTML}
  ${passwordHTML}
  ${musicUrl ? `<audio id="bg-music" src="${musicUrl}" loop style="display:none;"></audio>` : ''}
  
  <!-- Template Engine: ${resolvedTemplate} -->
  ${templateHTML}
  
  ${watermark}
  ${engineLibraries}
  ${engineExecution}
</body>
</html>`;
}
