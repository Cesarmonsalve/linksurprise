const fs = require('fs');

const files = [
  'hologram_scan.ts', 'quantum_rift.ts', 'film_noir.ts', 'golden_age.ts',
  'cinematic_scroll.ts', 'velvet_dark.ts', 'fade_story.ts', 'bento_pastel.ts',
  'mono_grid.ts', 'zen_minimal.ts', 'swiss_clean.ts', 'soft_stack.ts',
  'liquid_dream.ts', 'particle_burst.ts', 'brutalist_bold.ts', 'neon_wave.ts',
  'aurora_flow.ts'
];

for(const file of files) {
  let content = fs.readFileSync('src/lib/templates/' + file, 'utf8');

  // Fix backticks
  content = content.replace(/const css = \\`/g, 'const css = `');
  content = content.replace(/const html = \\`/g, 'const html = `');
  content = content.replace(/const html = isBasic \? \\`/g, 'const html = isBasic ? `');
  content = content.replace(/const js = isBasic \? \\`/g, 'const js = isBasic ? `');
  content = content.replace(/const js = \\`/g, 'const js = `');
  content = content.replace(/let html = \\`/g, 'let html = `');
  content = content.replace(/html = \\`/g, 'html = `');
  content = content.replace(/let html = '';\r?\n\s*if \(isBasic\) {\r?\n\s*let panelsHTML = \\`/g, "let html = '';\n  if (isBasic) {\n    let panelsHTML = `");

  content = content.replace(/\\\$\{isBasic \? \\`/g, '${isBasic ? `');
  content = content.replace(/\\` : \\`/g, '` : `');
  content = content.replace(/\\`\}?/g, (match) => match === '\\`}' ? '`}' : match);
  content = content.replace(/\\`;/g, '`;');
  content = content.replace(/\\`\r?\n/g, '`\n');
  content = content.replace(/\\`\s*;/g, '`;');
  
  content = content.replace(/panelsHTML \+= \\`/g, 'panelsHTML += `');
  
  // For \${d.imageUrl ? \` ... \` : ''}
  content = content.replace(/\\\$\{d\.imageUrl \? \\`/g, '${d.imageUrl ? `');
  content = content.replace(/\\` : ''\}/g, '` : \'\'}');

  // For \${paragraphs[1] ? \` ... \` : ''}
  content = content.replace(/\\\$\{paragraphs\[1\] \? \\`/g, '${paragraphs[1] ? `');

  // For \${!isBasic && d.imageUrl ? \` ... \` : ''}
  content = content.replace(/\\\$\{!isBasic && d\.imageUrl \? \\`/g, '${!isBasic && d.imageUrl ? `');
  content = content.replace(/\\\$\{!isBasic \? \\`/g, '${!isBasic ? `');
  
  // Replace variables intended for TS interpolation
  content = content.replace(/\\\$\{c\}/g, '${c}');
  content = content.replace(/\\\$\{c2\}/g, '${c2}');
  content = content.replace(/\\\$\{d\./g, '${d.');
  content = content.replace(/\\\$\{paragraphs/g, '${paragraphs');
  content = content.replace(/\\\$\{Math\.floor\(Math\.random\(\)\*[0-9]+\)/g, (m) => m.replace(/\\/g, ''));
  content = content.replace(/\\\$\{Array/g, '${Array');
  content = content.replace(/\\\$\{scenes/g, '${scenes');
  content = content.replace(/\\\$\{dateStr\}/g, '${dateStr}');
  content = content.replace(/\\\$\{currentIndex/g, '${currentIndex');
  content = content.replace(/\\\$\{startIdx/g, '${startIdx');
  content = content.replace(/\\\$\{i\}/g, '${i}'); // For loops building HTML string in fading template
  
  content = content.replace(/\\\$\{i === 0/g, '${i === 0');

  // Wait, I need to make sure \`\$\{Math.floor(20 - i*5)\}\` in JS remains untouched because they rely on JS var `i`.
  // Wait, the regex `\\\$\{Math\.floor\(Math\.random\(\)\*[0-9]+\)` catches `\${Math.floor(Math.random()*9000)`. Which is fine since it doesn't use `i`.

  // Specific places where I used `\`` in HTML string building:
  // scenesHTML += \` <div ... > \`
  content = content.replace(/scenesHTML \+= \\`/g, 'scenesHTML += `');
  
  // dotsHTML += \`...\`
  content = content.replace(/dotsHTML \+= \\`/g, 'dotsHTML += `');
  // barsHTML += \`...\`
  content = content.replace(/barsHTML \+= \\`/g, 'barsHTML += `');
  
  // panelsHTML += \`<section...>\`
  content = content.replace(/panelsHTML \+= \\`/g, 'panelsHTML += `');
  
  // parts += \`<div ... >\`
  content = content.replace(/parts \+= \\`/g, 'parts += `');
  
  // Let's also do a general pass for:
  content = content.replace(/uiHTML = \\`/g, 'uiHTML = `');

  // Let's fix line 15 `\${isBasic ? \`` which we handled but just to be sure:
  content = content.replace(/\\\$\{isBasic \? \\`/g, '${isBasic ? `');

  fs.writeFileSync('src/lib/templates/' + file, content);
}
console.log('Fix complete.');
