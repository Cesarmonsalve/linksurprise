const fs = require('fs');

function f(file, r, repl) {
  const p = 'src/lib/templates/' + file;
  if (fs.existsSync(p)) {
    let c = fs.readFileSync(p, 'utf8');
    c = c.replace(r, repl);
    fs.writeFileSync(p, c);
  }
}

// aurora_flow.ts 177:         ctx.strokeStyle = col1 + `\${Math.floor(20 - i*5)}`;
f('aurora_flow.ts', /col1 \+ `\\\$\{Math\.floor\(20 \- i\*5\)\}`/g, "col1 + `\\${Math.floor(20 - i*5)}\\`");
// Wait, regex might fail above. Let's do exact match replace by string!
function forceFix(file, target, rep) {
  const p = 'src/lib/templates/' + file;
  if(!fs.existsSync(p)) return;
  let c = fs.readFileSync(p, 'utf8');
  if(c.includes(target)) {
    c = c.split(target).join(rep);
    fs.writeFileSync(p, c);
  }
}

forceFix('aurora_flow.ts', 
  "ctx.strokeStyle = col1 + `\\${Math.floor(20 - i*5)}`;", 
  "ctx.strokeStyle = col1 + `\\${Math.floor(20 - i*5)}\\`; // fixed "
);
// wait, line 177 in `aurora_flow.ts` was `ctx.strokeStyle = col1 + `\${Math.floor(20 - i*5)}` ; ` (from view_file)
forceFix('aurora_flow.ts',
  "ctx.strokeStyle = col1 + `\\${Math.floor(20 - i*5)}`",
  "ctx.strokeStyle = col1 + \\`\\${Math.floor(20 - i*5)}\\`"
);

forceFix('brutalist_bold.ts',
  "fill(`★ ${d.recipientName || 'RECIPIENT'} ★ NO RULES `)",
  "fill(`★ ${d.recipientName || 'RECIPIENT'} ★ NO RULES `)" // wait, wait... What's wrong with line 85? let's see.
);
forceFix('brutalist_bold.ts',
  "dragger.style.transform = `translateY(\\${y}px) rotate(\\${startRot + y*0.01}deg)`;",
  "dragger.style.transform = \\`translateY(\\${y}px) rotate(\\${startRot + y*0.01}deg)\\`;"
);
forceFix('brutalist_bold.ts',
  "st.style.transform = `rotate(\\${Math.random()*60 - 30}deg)`;",
  "st.style.transform = \\`rotate(\\${Math.random()*60 - 30}deg)\\`;"
);

forceFix('neon_wave.ts',
  "ctx.strokeStyle = `hsl(\\${hue}, 100%, 50%)`;",
  "ctx.strokeStyle = \\`hsl(\\${hue}, 100%, 50%)\\`;"
);
forceFix('neon_wave.ts',
  "ctx.shadowColor = `hsl(\\${hue}, 100%, 50%)`;",
  "ctx.shadowColor = \\`hsl(\\${hue}, 100%, 50%)\\`;"
);

forceFix('film_noir.ts',
  "spotlight.style.background = `radial-gradient(circle 20vw at \\${x}% \\${y}%, transparent 0%, rgba(0,0,0,0.95) 80%), #000`;",
  "spotlight.style.background = \\`radial-gradient(circle 20vw at \\${x}% \\${y}%, transparent 0%, rgba(0,0,0,0.95) 80%), #000\\`;"
);

forceFix('golden_age.ts',
  "target.innerHTML += `<span class=\"ink-text\" style=\"opacity:0; animation: inkReveal 0.5s forwards\">\\${char}</span>`;",
  "target.innerHTML += \\`<span class=\"ink-text\" style=\"opacity:0; animation: inkReveal 0.5s forwards\">\\${char}</span>\\`;"
);

forceFix('particle_burst.ts',
  "parts += `<div class=\"p-css\" style=\"left:\\${l}%; width:\\${s}px; height:\\${s}px; --dr:\\${d}s; animation-delay:\\${Math.random()*2}s;\"></div>`;",
  "parts += \\`<div class=\"p-css\" style=\"left:\\${l}%; width:\\${s}px; height:\\${s}px; --dr:\\${d}s; animation-delay:\\${Math.random()*2}s;\"></div>\\`;"
);

// ALSO, fix the three older files missing `\`` removal at line 9/10!
const oldFiles = ['cyber_grid.ts', 'nebula_glass.ts', 'neural_pulse.ts'];
for(const o of oldFiles) {
  let c = fs.readFileSync('src/lib/templates/' + o, 'utf8');
  c = c.replace(/const css = \\`/g, 'const css = `');
  c = c.replace(/const html = isBasic \? \\`/g, 'const html = isBasic ? `');
  c = c.replace(/const js = \\`/g, 'const js = `');
  c = c.replace(/const js = isBasic \? \\`/g, 'const js = isBasic ? `');
  c = c.replace(/\\`: `/g, '`: `');
  c = c.replace(/\\` : \\`/g, '` : `');
  c = c.replace(/\\`\s*\}/g, '` }');
  c = c.replace(/\\`;/g, '`;');
  fs.writeFileSync('src/lib/templates/' + o, c);
}

// Ensure Brutalist Bold array fill does NOT have unescaped inner backticks? Wait... Inside ${ }, you can use backticks. So it should literally be `...`. But my regex in fix.js unescaped it successfully!
// Wait! Line 85 in brutalist bold:
// \${Array(10).fill(\`★ ${d.recipientName || 'RECIPIENT'} ★ NO RULES \`).join('')}
// If the outer is a backtick, inside ${ } using another backtick is PERFECTLY VALID IN TYPESCRIPT!
// But why did it error? Maybe because `\`` inside `${...}` was `\`` and `fix.js` didn't fix it?
function fixBrutalist() {
   let c = fs.readFileSync('src/lib/templates/brutalist_bold.ts', 'utf8');
   c = c.replace(/\\\`★ \$\{d\.recipientName/g, '`★ ${d.recipientName');
   c = c.replace(/NO RULES \\\`/g, 'NO RULES `');
   fs.writeFileSync('src/lib/templates/brutalist_bold.ts', c);
}
fixBrutalist();

console.log('Final targeted fix applied.');
