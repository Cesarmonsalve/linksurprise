const fs = require('fs');

function repl(file, search, replaceStr) {
  const p = 'src/lib/templates/' + file;
  if (!fs.existsSync(p)) return;
  let c = fs.readFileSync(p, 'utf8');
  c = c.split(search).join(replaceStr);
  fs.writeFileSync(p, c);
}

// 1. aurora_flow.ts
repl('aurora_flow.ts',
  "ctx.strokeStyle = col1 + `\\${Math.floor(20 - i*5)}\\`;",
  "ctx.strokeStyle = col1 + \\`\\${Math.floor(20 - i*5)}\\`;"
);
// Also the other case if it's missing the first backslash
repl('aurora_flow.ts',
  "ctx.strokeStyle = col1 + `\\${Math.floor(20 - i*5)}`",
  "ctx.strokeStyle = col1 + \\`\\${Math.floor(20 - i*5)}\\`;"
);

// 2. brutalist_bold.ts
repl('brutalist_bold.ts',
  "fill(`★ ${d.recipientName || 'RECIPIENT'} ★ NO RULES `)",
  "fill(\\`★ \\${d.recipientName || 'RECIPIENT'} ★ NO RULES \\`)"
);
repl('brutalist_bold.ts',
  "dragger.style.transform = `translateY(\\${y}px) rotate(\\${startRot + y*0.01}deg)`;",
  "dragger.style.transform = \\`translateY(\\${y}px) rotate(\\${startRot + y*0.01}deg)\\`;"
);
repl('brutalist_bold.ts',
  "dragger.style.transform = \\`translateY(\\${y}px) rotate(\\${startRot + y*0.01}deg)`;",
  "dragger.style.transform = \\`translateY(\\${y}px) rotate(\\${startRot + y*0.01}deg)\\`;"
);
repl('brutalist_bold.ts',
  "st.style.transform = `rotate(\\${Math.random()*60 - 30}deg)`;",
  "st.style.transform = \\`rotate(\\${Math.random()*60 - 30}deg)\\`;"
);

// 3. cyber_grid.ts
// The errors: 
// src/lib/templates/cyber_grid.ts(10,15): error TS1127: Invalid character. => It's \` missing?
// Yes, line 10 has no backslash for `const css = \``. Let's fix ALL boundaries in cyber_grid.ts
repl('cyber_grid.ts', "const css = `\n", "const css = \\`\n");
repl('cyber_grid.ts', "const css = \\`\n", "const css = `\n"); // Wait, it needs to be ` ! The TS outer string must NOT be escaped.
repl('cyber_grid.ts', "${isBasic ? `\n", "\\${isBasic ? `\n");
// Wait, cyber_grid is completely broken. Let's look at what is broken.
// cyber_grid.ts(270,1): Unterminated template literal
repl('cyber_grid.ts', " `\n  `;", " `\n  `;"); // Not helping
repl('cyber_grid.ts', "    } }", "    } }");

// 4. film_noir.ts
repl('film_noir.ts',
  "spotlight.style.background = `radial-gradient(circle 20vw at \\${x}% \\${y}%, transparent 0%, rgba(0,0,0,0.95) 80%), #000`;",
  "spotlight.style.background = \\`radial-gradient(circle 20vw at \\${x}% \\${y}%, transparent 0%, rgba(0,0,0,0.95) 80%), #000\\`;"
);

// 5. golden_age.ts
repl('golden_age.ts',
  "target.innerHTML += `<span class=\"ink-text\" style=\"opacity:0; animation: inkReveal 0.5s forwards\">\\${char}</span>`;",
  "target.innerHTML += \\`<span class=\"ink-text\" style=\"opacity:0; animation: inkReveal 0.5s forwards\">\\${char}</span>\\`;"
);

// 6. nebula_glass.ts
// 7. neon_wave.ts
repl('neon_wave.ts',
  "ctx.strokeStyle = `hsl(\\${hue}, 100%, 50%)`;",
  "ctx.strokeStyle = \\`hsl(\\${hue}, 100%, 50%)\\`;"
);
repl('neon_wave.ts',
  "ctx.shadowColor = `hsl(\\${hue}, 100%, 50%)`;",
  "ctx.shadowColor = \\`hsl(\\${hue}, 100%, 50%)\\`;"
);

// 8. neural_pulse.ts

console.log('Replacements applied.');
