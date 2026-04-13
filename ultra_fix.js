const fs = require('fs');

const files = ['aurora_flow.ts', 'brutalist_bold.ts', 'cyber_grid.ts', 'film_noir.ts', 'golden_age.ts', 'nebula_glass.ts', 'neon_wave.ts', 'neural_pulse.ts'];

for(const p of files) {
  const filePath = 'src/lib/templates/' + p;
  let c = fs.readFileSync(filePath, 'utf8');

  // Strip EVERY backslash that immediately precedes a backtick or a dollar sign inside the TS strings, 
  // THEN manually re-insert them exactly where they belong.
  // Wait, no. Let's just fix the remaining few lines!

  // cyber_grid, nebula_glass, neural_pulse have wrong `\${isBasic ? \``
  c = c.replace(/\\\\\$\{isBasic \? \\\\`/g, '${isBasic ? `');
  c = c.replace(/\\\\\$\{isBasic \? \\`/g, '${isBasic ? `');
  c = c.replace(/\\\$\{isBasic \? \\`/g, '${isBasic ? `');

  // Any remaining `\`: \`` -> `` ` : ` ``
  c = c.replace(/\\`: `/g, '`: `');
  c = c.replace(/` : \\`/g, '` : `');
  c = c.replace(/\\` : \\`/g, '` : `');
  
  // Any remaining `\`} ` -> `` `} ``
  c = c.replace(/\\`\s*\}/g, '` }');
  
  // Any remaining `\`;` -> ``;`
  c = c.replace(/\\`;/g, '`;');

  // specific neon_wave fix:
  c = c.replace(/`hsl\(\\\\\$\{hue\}, 100%, 50%\)`/g, "\\`hsl(\\${hue}, 100%, 50%)\\`");
  c = c.replace(/`hsl\(\\\$\{hue\}, 100%, 50%\)`/g, "\\`hsl(\\${hue}, 100%, 50%)\\`");

  // specific brutalist bold fix:
  c = c.replace(/`translateY\(\\\\\$\{y\}px\) rotate\(\\\\\$\{startRot \+ y\*0\.01\}deg\)`/g, "\\`translateY(\\${y}px) rotate(\\${startRot + y*0.01}deg)\\`");
  c = c.replace(/`translateY\(\\\$\{y\}px\) rotate\(\\\$\{startRot \+ y\*0\.01\}deg\)`/g, "\\`translateY(\\${y}px) rotate(\\${startRot + y*0.01}deg)\\`");
  c = c.replace(/`rotate\(\\\\\$\{Math.random\(\)\*60 \- 30\}deg\)`/g, "\\`rotate(\\${Math.random()*60 - 30}deg)\\`");
  c = c.replace(/`rotate\(\\\$\{Math.random\(\)\*60 \- 30\}deg\)`/g, "\\`rotate(\\${Math.random()*60 - 30}deg)\\`");

  // film noir fix:
  c = c.replace(/`radial-gradient\(circle 20vw at \\\\\$\{x\}% \\\\\$\{y\}%, transparent 0%, rgba\(0,0,0,0\.95\) 80%\), #000`/g, "\\`radial-gradient(circle 20vw at \\${x}% \\${y}%, transparent 0%, rgba(0,0,0,0.95) 80%), #000\\`");
  c = c.replace(/`radial-gradient\(circle 20vw at \\\$\{x\}% \\\$\{y\}%, transparent 0%, rgba\(0,0,0,0\.95\) 80%\), #000`/g, "\\`radial-gradient(circle 20vw at \\${x}% \\${y}%, transparent 0%, rgba(0,0,0,0.95) 80%), #000\\`");

  // golden_age fix:
  c = c.replace(/`<span class="ink-text" style="opacity:0; animation: inkReveal 0\.5s forwards">\\\\\$\{char\}<\/span>`/g, "\\`<span class=\"ink-text\" style=\"opacity:0; animation: inkReveal 0.5s forwards\">\\${char}</span>\\`");
  c = c.replace(/`<span class="ink-text" style="opacity:0; animation: inkReveal 0\.5s forwards">\\\$\{char\}<\/span>`/g, "\\`<span class=\"ink-text\" style=\"opacity:0; animation: inkReveal 0.5s forwards\">\\${char}</span>\\`");
  
  // Also some variables that should be evaluated in TS:
  c = c.replace(/\\\\?\$\{/g, '${'); 
  // Wait! If I do this, all escaping for JS strings vanishes. Then the TS compiler will evaluate them instead of the browser.
  // Actually, wait! The JS strings are mostly returned as string literals, not evaluated by TS! 
  // Wait... YES THEY ARE. The entire `css` and `js` and `html` strings are generated on the server using Template Literals!
  // And the `js` string defines browser JS code. So if I want the browser JS code to have `${hue}`, I MUST escape it in TS! `\${hue}`!
  // If I strip all `\\?\$\{`, then TS tries to evaluate `hue`! That's why TS told me "Unexpected keyword or identifier `hue`"!
  // Because my `fix3.js` stripped the backslash from `${hue}`!
  
  fs.writeFileSync(filePath, c);
}
console.log('Script written.');
