const fs = require('fs');

const tsEvalVars = [
  'panelsHTML', 'p', 'l', 's', 'parts', 'c', 'c2', 'isBasic'
];

const files = [
  'hologram_scan.ts', 'quantum_rift.ts', 'film_noir.ts', 'golden_age.ts',
  'cinematic_scroll.ts', 'velvet_dark.ts', 'fade_story.ts', 'bento_pastel.ts',
  'mono_grid.ts', 'zen_minimal.ts', 'swiss_clean.ts', 'soft_stack.ts',
  'liquid_dream.ts', 'particle_burst.ts', 'brutalist_bold.ts', 'neon_wave.ts',
  'aurora_flow.ts'
];

for (const file of files) {
  let c = fs.readFileSync('src/lib/templates/' + file, 'utf8');

  // Fix the split backtick
  c = c.replace(/\\`: `/g, '`: `');
  
  // Fix specific interpolations that must be evaluated by TS
  for (const v of tsEvalVars) {
    const r = new RegExp('\\\\\\$\\{' + v + '\\}', 'g');
    c = c.replace(r, '${' + v + '}');
    
    // Also without closing brace e.g. \${d.
    const r2 = new RegExp('\\\\\\$\\{' + v, 'g');
    c = c.replace(r2, '${' + v);
  }
  
  // Specifically fix some variables
  c = c.replace(/\\\$\{d\./g, '${d.');
  c = c.replace(/\\\$\{Math\.floor\(Math\.random\(\)\*90000/g, '${Math.floor(Math.random()*90000');
  c = c.replace(/\\\$\{Math\.floor\(Math\.random\(\)\*9000/g, '${Math.floor(Math.random()*9000');
  c = c.replace(/\\\$\{Array/g, '${Array');
  c = c.replace(/\\\$\{\(!d\.imageUrl/g, '${(!d.imageUrl');
  c = c.replace(/\\\$\{scene/g, '${scene');
  c = c.replace(/\\\$\{dateStr/g, '${dateStr');
  c = c.replace(/\\\$\{Math\.random\(\)\*2\}/g, '${Math.random()*2}');
  
  // Fix aurora_flow.ts 177: ctx.strokeStyle = col1 + \`\${Math.floor(20 - i*5)}`;
  c = c.replace(/col1 \+ \\`\\\$\{Math\.floor\(20 \- i\*5\)\}`/g, 'col1 + `\\${Math.floor(20 - i*5)}`');
  
  fs.writeFileSync('src/lib/templates/' + file, c);
}
console.log('Done fixing variables and boundaries.');
