const fs = require('fs');

const files = [
  'hologram_scan.ts', 'quantum_rift.ts', 'film_noir.ts', 'golden_age.ts',
  'cinematic_scroll.ts', 'velvet_dark.ts', 'fade_story.ts', 'bento_pastel.ts',
  'mono_grid.ts', 'zen_minimal.ts', 'swiss_clean.ts', 'soft_stack.ts',
  'liquid_dream.ts', 'particle_burst.ts', 'brutalist_bold.ts', 'neon_wave.ts',
  'aurora_flow.ts'
];

for(const file of files) {
  const filepath = 'src/lib/templates/' + file;
  let content = fs.readFileSync(filepath, 'utf8');

  // We are looking for any backslash followed by a backtick that acts as a structural boundary.
  
  // 1. const something = \`
  content = content.replace(/=\s*\\`/g, '= `');
  
  // 2. \${condition ? \`
  content = content.replace(/\?\s*\\`/g, '? `');
  
  // 3. \` : \`
  content = content.replace(/\\`\s*:\s*\\`/g, '` : `');
  
  // 4. \`}
  content = content.replace(/\\`\s*\}/g, '` }');
  
  // 5. \`;
  content = content.replace(/\\`\s*;/g, '`;');
  
  // 6. += \`
  content = content.replace(/\+=\s*\\`/g, '+= `');

  // Let's also make sure we didn't miss `\n  \` : \`` etc. The regex with \s* handles that.

  fs.writeFileSync(filepath, content);
}

console.log('Fixed outer boundaries.');
