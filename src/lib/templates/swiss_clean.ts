// ═══════════════════════════════════════════════════════════════
// STYLE #14: SWISS CLEAN — Swiss Design Principles
// ═══════════════════════════════════════════════════════════════
import { TemplateRenderData, TemplateOutput } from './index';

export function renderSwissClean(d: TemplateRenderData): TemplateOutput {
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800;900&display=swap');
    body { background: #fff; overflow-x: hidden; font-family: 'Inter', sans-serif; }
    
    .swiss-shell {
      min-height: 100vh; padding: 3rem 2rem;
      display: flex; align-items: center; justify-content: center;
    }
    .swiss-card {
      max-width: 480px; width: 100%;
      opacity: 0; animation: swissIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s forwards;
    }
    @keyframes swissIn { to { opacity: 1; } }
    
    .swiss-red-bar { width: 40px; height: 6px; background: #e53935; margin-bottom: 2rem; }
    .swiss-label { font-size: 0.65rem; letter-spacing: 0.3em; color: #999; text-transform: uppercase; font-weight: 600; margin-bottom: 0.3rem; }
    .swiss-name {
      font-size: clamp(3rem, 10vw, 5rem); font-weight: 900; color: #111;
      letter-spacing: -0.05em; line-height: 0.95; margin-bottom: 2rem;
    }
    .swiss-divider { width: 100%; height: 1px; background: #e0e0e0; margin: 2rem 0; }
    .swiss-msg {
      font-size: 1rem; line-height: 2; color: #333; font-weight: 300;
      max-width: 400px;
    }
    .swiss-photo {
      width: 100%; border-radius: 4px; margin: 2rem 0; display: block;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    }
    .swiss-meta {
      display: flex; justify-content: space-between; align-items: center;
      padding-top: 2rem; border-top: 1px solid #e0e0e0; margin-top: 2rem;
    }
    .swiss-sender { font-size: 0.8rem; color: #999; font-weight: 400; }
    .swiss-sender strong { color: #111; font-weight: 600; }
    .swiss-date { font-size: 0.7rem; color: #bbb; font-weight: 300; font-family: monospace; }
    
    @media (max-width: 480px) { .swiss-card { padding: 0 0.5rem; } }
  `;

  const now = new Date();
  const dateStr = `${now.getFullYear()}.${String(now.getMonth()+1).padStart(2,'0')}.${String(now.getDate()).padStart(2,'0')}`;

  const html = `
    <div class="swiss-shell">
      <div class="swiss-card">
        <div class="swiss-red-bar"></div>
        <p class="swiss-label">Para</p>
        <h1 class="swiss-name">${d.recipientName || 'Ti'}</h1>
        <div class="swiss-divider"></div>
        <p class="swiss-msg" id="type-target"></p>
        ${d.imageUrl ? `<img class="swiss-photo" src="${d.imageUrl}" alt="Foto" />` : ''}
        <div class="swiss-meta">
          <p class="swiss-sender">De: <strong>${d.senderName || 'Anónimo'}</strong></p>
          <p class="swiss-date">${dateStr}</p>
        </div>
      </div>
    </div>
  `;

  const js = `
    const target = document.getElementById('type-target');
    const txt = "${d.escapedMessage}";
    let i = 0;
    function type() {
      if (i < txt.length) {
        if(txt.substring(i,i+5)==='<br/>'){target.innerHTML+='<br/>';i+=5;}
        else{target.innerHTML+=txt.charAt(i);i++;}
        setTimeout(type, 25);
      }
    }
    setTimeout(type, 800);
    document.body.addEventListener('click', () => { const a = document.getElementById('bg-music'); if(a){a.play();} }, {once:true});
  `;

  return { css, html, js };
}
