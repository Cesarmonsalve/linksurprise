// ═══════════════════════════════════════════════════════════════
// TEMPLATE RENDERER REGISTRY — 20 Premium Visual Styles v2.0
// Modern Redesigned Templates with Enhanced VIP Features
// ═══════════════════════════════════════════════════════════════

export interface TemplateRenderData {
  recipientName: string;
  senderName: string;
  message: string;
  escapedMessage: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  fontFamily: string;
  musicUrl: string;
  imageUrl: string;
  scenes?: string[]; // Multiple photos for VIP Gallery
  title: string;
  template: string;
  renderMode?: 'basic' | 'vip';
}

export interface TemplateOutput {
  css: string;
  html: string;
  js: string;
}

export type TemplateRenderer = (data: TemplateRenderData) => TemplateOutput;

// Import all 20 renderers
import { renderNebulaGlass } from './nebula_glass';
import { renderCyberGrid } from './cyber_grid';
import { renderNeuralPulse } from './neural_pulse';
import { renderHologramScan } from './hologram_scan';
import { renderQuantumRift } from './quantum_rift';
import { renderFilmNoir } from './film_noir';
import { renderGoldenAge } from './golden_age';
import { renderCinematicScroll } from './cinematic_scroll';
import { renderVelvetDark } from './velvet_dark';
import { renderFadeStory } from './fade_story';
import { renderBentoPastel } from './bento_pastel';
import { renderMonoGrid } from './mono_grid';
import { renderZenMinimal } from './zen_minimal';
import { renderSwissClean } from './swiss_clean';
import { renderSoftStack } from './soft_stack';
import { renderLiquidDream } from './liquid_dream';
import { renderParticleBurst } from './particle_burst';
import { renderBrutalistBold } from './brutalist_bold';
import { renderNeonWave } from './neon_wave';
import { renderAuroraFlow } from './aurora_flow';

// ═══════════════════════════════════════
// MASTER REGISTRY
// ═══════════════════════════════════════
export const TEMPLATE_RENDERERS: Record<string, TemplateRenderer> = {
  // Futuristic (5)
  nebula_glass: renderNebulaGlass,
  cyber_grid: renderCyberGrid,
  neural_pulse: renderNeuralPulse,
  hologram_scan: renderHologramScan,
  quantum_rift: renderQuantumRift,
  // Cinematic (5)
  film_noir: renderFilmNoir,
  golden_age: renderGoldenAge,
  cinematic_scroll: renderCinematicScroll,
  velvet_dark: renderVelvetDark,
  fade_story: renderFadeStory,
  // Minimalist Bento (5)
  bento_pastel: renderBentoPastel,
  mono_grid: renderMonoGrid,
  zen_minimal: renderZenMinimal,
  swiss_clean: renderSwissClean,
  soft_stack: renderSoftStack,
  // Artistic/Vibrant (5)
  liquid_dream: renderLiquidDream,
  particle_burst: renderParticleBurst,
  brutalist_bold: renderBrutalistBold,
  neon_wave: renderNeonWave,
  aurora_flow: renderAuroraFlow,
};

// ═══════════════════════════════════════
// BACKWARDS COMPATIBILITY MAP
// Old occasion-based IDs → nearest new visual style
// ═══════════════════════════════════════
export const LEGACY_TEMPLATE_MAP: Record<string, string> = {
  romantic: 'nebula_glass',
  birthday: 'particle_burst',
  proposal: 'cinematic_scroll',
  secret: 'hologram_scan',
  sorry: 'velvet_dark',
  friendship: 'aurora_flow',
  gender_reveal: 'bento_pastel',
  graduation: 'golden_age',
  travel: 'quantum_rift',
  wedding_invite: 'film_noir',
  anniversary: 'fade_story',
  pregnant: 'soft_stack',
  concert: 'neon_wave',
  mothers_day: 'liquid_dream',
  fathers_day: 'swiss_clean',
  movie_date: 'cyber_grid',
  forgive_me: 'zen_minimal',
  good_morning: 'bento_pastel',
  long_distance: 'neural_pulse',
  halloween: 'brutalist_bold',
  generic: 'nebula_glass',
  apology: 'velvet_dark',
};

export function resolveTemplateId(id: string): string {
  if (TEMPLATE_RENDERERS[id]) return id;
  return LEGACY_TEMPLATE_MAP[id] || 'nebula_glass';
}

// ═══════════════════════════════════════
// SHARED VIP GALLERY HELPER
// Generates integrated HTML/CSS/JS for multi-photo gallery
// ═══════════════════════════════════════
export function renderVipGallery(d: TemplateRenderData, className: string = 'vip-gallery'): { html: string; js: string; css: string } {
  const hasScenes = d.renderMode === 'vip' && d.scenes && d.scenes.length > 0;
  
  if (!hasScenes) {
    return {
      html: d.imageUrl ? `<img class="${className}" src="${d.imageUrl}" />` : '',
      js: '',
      css: ''
    };
  }

  const scenes = d.scenes || [];
  const html = `
    <div class="${className}-container" style="position:relative; width:100%; height:100%; overflow:hidden;">
      ${scenes.map((s, i) => `<img class="${className}-img" src="${s}" style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:${i===0?1:0};" />`).join('')}
    </div>
  `;

  const js = `
    (function(){
      const imgs = document.querySelectorAll('.${className}-img');
      if (imgs.length > 1) {
        let cur = 0;
        setInterval(() => {
          const next = (cur + 1) % imgs.length;
          gsap.to(imgs[cur], { opacity: 0, duration: 2, ease: 'power2.inOut' });
          gsap.to(imgs[next], { opacity: 1, duration: 2, ease: 'power2.inOut' });
          cur = next;
        }, 5000);
      }
    })();
  `;

  return { html, js, css: '' };
}
