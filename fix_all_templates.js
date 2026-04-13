/**
 * FINAL FIX SCRIPT — Fixes all 5 broken template files
 * 
 * The pattern: These .ts files use outer template literals (backticks) to build
 * CSS/HTML/JS strings. Inside those strings:
 *   - ${d.something} should remain UNESCAPED (TypeScript-time interpolation from the function parameter)
 *   - ${someRuntimeVar} that is meant to be in the GENERATED output JS/HTML needs to be \${...} (escaped)
 *   - Inner backticks for nested template literals in GENERATED JS need to be \` (escaped)
 * 
 * The previous fix attempts over-escaped or under-escaped things. This script
 * directly rewrites the broken lines with the correct content.
 */

const fs = require('fs');
const path = require('path');

const TEMPLATES_DIR = path.join(__dirname, 'src', 'lib', 'templates');

function fixFile(filename, fixes) {
  const filepath = path.join(TEMPLATES_DIR, filename);
  if (!fs.existsSync(filepath)) {
    console.log(`  SKIP: ${filename} not found`);
    return;
  }
  
  let content = fs.readFileSync(filepath, 'utf8');
  let lines = content.split('\n');
  let changed = 0;
  
  for (const fix of fixes) {
    const lineIdx = fix.line - 1; // 0-indexed
    const currentLine = lines[lineIdx];
    
    if (currentLine === undefined) {
      console.log(`  WARN: Line ${fix.line} does not exist in ${filename}`);
      continue;
    }
    
    if (fix.exact) {
      // Replace exact match on this line
      if (currentLine.includes(fix.from)) {
        lines[lineIdx] = currentLine.replace(fix.from, fix.to);
        changed++;
      } else {
        console.log(`  WARN: Line ${fix.line} in ${filename} doesn't contain expected text`);
        console.log(`    Expected to find: ${fix.from}`);
        console.log(`    Actual line: ${currentLine}`);
      }
    } else {
      // Replace entire line
      lines[lineIdx] = fix.to;
      changed++;
    }
  }
  
  if (changed > 0) {
    fs.writeFileSync(filepath, lines.join('\n'), 'utf8');
    console.log(`  FIXED: ${filename} (${changed} lines changed)`);
  } else {
    console.log(`  NO CHANGES: ${filename}`);
  }
}

console.log('=== FIXING ALL TEMPLATE FILES ===\n');

// ─────────────────────────────────────────────
// 1. BRUTALIST_BOLD.TS
// ─────────────────────────────────────────────
// Issues:
//   Line 85: \`★ \${d.recipientName...} — The \` and \$ are wrong inside the outer template literal.
//            This line is inside a `...` (the VIP html string), and should produce runtime JS output.
//            Since this is inside the outer ` for the html variable, the inner ` must be escaped as \`
//            and inner ${...} for runtime must be escaped as \${...}.
//            BUT d.recipientName is a TS-time variable... wait, no:
//            Looking at the context: this is inside the `html` template literal, in the VIP branch.
//            The Array(10).fill(...) is INSIDE the template literal, so it's TS code being interpolated.
//            The issue is that `Array(10).fill(\`★ \${d.recipientName...} ★ NO RULES \`)` uses \\` which is a literal backslash + backtick.
//            It should be: Array(10).fill(`★ ${d.recipientName || 'RECIPIENT'} ★ NO RULES `).join('')
//            (unescaped, because it's a TS expression being interpolated into the outer template)
//            Wait, but template literals can't nest backticks...
//            Actually in TS, inside a template literal `...`, you CAN have ${expr} where expr uses backticks
//            IF the backticks are inside the ${...} expression. Let me re-read.
//            
//            Line 85: ${Array(10).fill(\`★ \${d.recipientName || 'RECIPIENT'} ★ NO RULES \`).join('')}
//            The \` here is wrong. Inside ${...}, backticks are fine because the parser knows they're
//            a new template literal. So it should be:
//            ${Array(10).fill(`★ ${d.recipientName || 'RECIPIENT'} ★ NO RULES `).join('')}
//
//   Line 94: \${Math.floor(...)} — same issue, should be ${Math.floor(...)}
//            Wait, but this is inside the HTML string... let me check context.
//            Line 94 is: <div class="b-id">ID: #\${Math.floor(...)}</div>
//            This is inside the VIP html branch. Math.floor() is a RUNTIME thing that should execute
//            in the browser, not at TS compile time. So it SHOULD be escaped: \${Math.floor(...)}.
//            But that means it needs to output literally ${Math.floor(...)} in the HTML.
//            Actually wait — this is inside a template literal that builds an HTML string.
//            The HTML string is sent to the browser. If we want the browser's runtime JS to have
//            ${Math.floor(...)}, we need the TS string to contain the literal characters "${Math.floor(...)}".
//            To get that in a TS template literal, we write \${Math.floor(...)}.
//            That's correct! So line 94 is fine.
//            
//            Let me re-check what TS actually complains about:
//            brutalist_bold.ts(85,26): error TS1127: Invalid character.
//            => Line 85 col 26. The \` is being interpreted as an invalid character.
//            
//   Let me look more carefully at line 85:
//   ${Array(10).fill(\`★ \${d.recipientName || 'RECIPIENT'} ★ NO RULES \`).join('')}
//   
//   Inside ${...} in a template literal, you can use backticks for nested templates.
//   But \` is a backslash followed by a backtick, which is NOT valid inside ${} expression.
//   The correct syntax is just backtick:
//   ${Array(10).fill(`★ ${d.recipientName || 'RECIPIENT'} ★ NO RULES `).join('')}
//
//   But wait — d.recipientName is available at TS-compile time (it's the function parameter).
//   Inside ${ Array(10).fill(`★ ${d.recipientName} ...`).join('') }, the inner ${d.recipientName}
//   is JS/TS runtime expression inside the inner template literal, which is correct.
//   The inner backtick starts a new template literal context, so it's totally valid.

console.log('1. Fixing brutalist_bold.ts...');
fixFile('brutalist_bold.ts', [
  // Line 85: Fix the \` to just ` inside the ${...} expression
  {
    line: 85,
    exact: true,
    from: '${Array(10).fill(\\`★ \\${d.recipientName || \'RECIPIENT\'} ★ NO RULES \\`).join(\'\')}',
    to: '${Array(10).fill(`★ ${d.recipientName || \'RECIPIENT\'} ★ NO RULES `).join(\'\')}'
  },
  // Line 173: dragger.style.transform = `translateY(\${y}px) rotate(${startRot + y*0.01}deg)`;
  // This is inside the `js` template literal (the VIP JS code).
  // `translateY(...)` should be a RUNTIME template literal => needs \` and \${} for runtime vars
  // BUT ${startRot + y*0.01} uses startRot which is a RUNTIME variable.
  // So ALL of this line's template literal stuff is runtime.
  // In the outer TS template literal, to produce: `translateY(${y}px) rotate(${startRot + y*0.01}deg)`
  // We need: \`translateY(\${y}px) rotate(\${startRot + y*0.01}deg)\`
  {
    line: 173,
    to: '      dragger.style.transform = \\`translateY(\\${y}px) rotate(\\${startRot + y*0.01}deg)\\`;'
  },
  // Line 193: st.style.transform = \`rotate(\${Math.random()*60 - 30}deg)\`;
  // Same pattern - runtime template literal inside the TS js template literal
  // This actually looks correct already with \` and \${}... Let me check the error.
  // brutalist_bold.ts(173,34) is the main error. Let me check if 193 has issues too.
  // Looking at line 193: st.style.transform = \`rotate(\${Math.random()*60 - 30}deg)\`;
  // This has \` (backslash-backtick) which in TS template literal produces literal backtick char.
  // And \${...} which produces literal ${...}. This is CORRECT for runtime JS.
  // The error on line 173 cascades... let me just make sure 193 is clean too.
  {
    line: 193,
    to: '      st.style.transform = \\`rotate(\\${Math.random()*60 - 30}deg)\\`;'
  }
]);

// ─────────────────────────────────────────────
// 2. CYBER_GRID.TS
// ─────────────────────────────────────────────
// The HTML section (lines 79-120) has \${d.xxx} patterns which should be ${d.xxx}
// because d is the TS function parameter and should be interpolated at TS-compile time.
// BUT some \${...} are correct when they're runtime JS code.
//
// Let me check each line:
// Line 82: \${d.recipientName || 'GUEST'} — should be ${d.recipientName || 'GUEST'} (TS-time)
// Line 83: \${d.title} — should be ${d.title} (TS-time)  
// Line 85: \${d.imageUrl ? \`...\` : ''} — the outer \${} should be ${}, and inner \` should be ` (TS nested template)
// Line 87: \${d.senderName || 'UNKNOWN'} — should be ${d.senderName || 'UNKNOWN'} (TS-time)
//
// WAIT — but this is the BASIC mode HTML. Looking at the pattern of other templates that work
// (like aurora_flow, film_noir, etc.), in the basic HTML, ${d.xxx} is used without escaping.
// So the VIP HTML branch should also use ${d.xxx} for TS data interpolation.
// 
// But lines 110, 112-115, 117 in the VIP branch ALSO use \${d.xxx}. Let me check.
// Line 110: \${d.recipientName || 'GUEST'} — in VIP HTML — should be ${d.recipientName} (TS-time)
// Line 112-115: \${d.imageUrl ? \`...\` : ''} — should be ${d.imageUrl ? `...` : ''} (TS-time)
// Line 117: \${d.senderName || 'UNKNOWN_NODE'} — should be ${d.senderName} (TS-time)
//
// Also line 202: \`<span class="term-prompt">root@nexus:~$</span> \${val}`
//   This mixes \` start with unescaped ` end. Should be all escaped for runtime:
//   \\`<span...>root@nexus:~$</span> \\${val}\\`

console.log('2. Fixing cyber_grid.ts...');
fixFile('cyber_grid.ts', [
  // Line 82: Fix \${d.recipientName} to ${d.recipientName}
  {
    line: 82,
    to: '        <div class="cyber-sys">SYS.INIT // TARGET: ${d.recipientName || \'GUEST\'}</div>'
  },
  // Line 83: Fix \${d.title} to ${d.title}
  {
    line: 83,
    to: '        <div class="cyber-title">${d.title}</div>'
  },
  // Line 84
  {
    line: 84,
    to: '        <div class="cyber-sys">DECRYPTING PAYLOAD...</div>'
  },
  // Line 85: Fix \${d.imageUrl ? \`...\` : ''} to ${d.imageUrl ? `...` : ''}
  {
    line: 85,
    to: '        ${d.imageUrl ? `<img class="cyber-photo" src="${d.imageUrl}" />` : \'\'}'
  },
  // Line 87: Fix \${d.senderName}
  {
    line: 87,
    to: '        <div class="cyber-sys" style="margin-top:20px;">SRC: ${d.senderName || \'UNKNOWN\'}</div>'
  },
  // Line 110: Fix \${d.recipientName}
  {
    line: 110,
    to: '        <div class="hud-sys">TARGET LOCKED: ${d.recipientName || \'GUEST\'}</div>'
  },
  // Lines 112-115: Fix \${d.imageUrl ? \`...\` : ''}
  {
    line: 112,
    to: '        ${d.imageUrl ? `'
  },
  {
    line: 114,
    to: '          <img src="${d.imageUrl}" />'
  },
  {
    line: 115,
    to: '        </div>` : \'\'}'
  },
  // Line 117: Fix \${d.senderName}
  {
    line: 117,
    to: '        <div class="hud-sender">TRANSMISSION SRC: ${d.senderName || \'UNKNOWN_NODE\'}</div>'
  },
  // Line 202: Fix mixed backtick escaping
  // Current: div.innerHTML = \`<span class="term-prompt">root@nexus:~$</span> \${val}`;
  // Should be: div.innerHTML = \`<span class="term-prompt">root@nexus:~$</span> \${val}\`;
  {
    line: 202,
    to: '        div.innerHTML = \\`<span class="term-prompt">root@nexus:~$</span> \\${val}\\`;'
  }
]);

// ─────────────────────────────────────────────
// 3. GOLDEN_AGE.TS
// ─────────────────────────────────────────────
// Line 160: target.innerHTML += `<span class=\"ink-text\"...>${char}</span>`;
// This is inside the `js` template literal. The inner backticks and ${char} are RUNTIME.
// So we need: \`<span...>\${char}</span>\`
// Current line 160:
//   target.innerHTML += `<span class="ink-text" style="opacity:0; animation: inkReveal 0.5s forwards">${char}</span>`;
// The ` and ${char} are unescaped — TS interprets them! We need:
//   target.innerHTML += \`<span class="ink-text" style="opacity:0; animation: inkReveal 0.5s forwards">\${char}</span>\`;

console.log('3. Fixing golden_age.ts...');
fixFile('golden_age.ts', [
  {
    line: 160,
    to: '                target.innerHTML += \\`<span class="ink-text" style="opacity:0; animation: inkReveal 0.5s forwards">\\${char}</span>\\`;'
  }
]);

// ─────────────────────────────────────────────
// 4. NEBULA_GLASS.TS
// ─────────────────────────────────────────────
// Same pattern as cyber_grid. The HTML section uses \${d.xxx} where it should be ${d.xxx}.
// Lines 86-95 in the basic HTML, and lines 105-110 in VIP HTML.

console.log('4. Fixing nebula_glass.ts...');
fixFile('nebula_glass.ts', [
  // Line 88: \${d.recipientName || 'ti'} → ${d.recipientName || 'ti'}
  {
    line: 88,
    to: '        <p class="nebula-label">Para ${d.recipientName || \'ti\'}</p>'
  },
  // Line 89: \${d.title} → ${d.title}
  {
    line: 89,
    to: '        <h1 class="nebula-title">${d.title}</h1>'
  },
  // Line 91: \${d.imageUrl ? \`...\` : ''}
  {
    line: 91,
    to: '        ${d.imageUrl ? `<img class="nebula-photo" src="${d.imageUrl}" />` : \'\'}'
  },
  // Line 93: \${d.senderName || 'Alguien especial'}
  {
    line: 93,
    to: '        <p class="nebula-sender">Con cariño, <strong>${d.senderName || \'Alguien especial\'}</strong></p>'
  },
  // Line 105: \${d.recipientName || 'ti'} in VIP
  {
    line: 105,
    to: '        <p class="nebula-label item-reveal">Para ${d.recipientName || \'ti\'}</p>'
  },
  // Line 108: \${d.imageUrl ? \`...\` : ''} in VIP
  {
    line: 108,
    to: '        ${d.imageUrl ? `<div class="nebula-photo-wrap item-reveal" id="photo-container"><img class="nebula-photo" src="${d.imageUrl}" alt="Sorpresa" /></div>` : \'\'}'
  },
  // Line 110: \${d.senderName || 'Alguien especial'} in VIP
  {
    line: 110,
    to: '        <p class="nebula-sender item-reveal">Con cariño, <strong>${d.senderName || \'Alguien especial\'}</strong></p>'
  }
]);

// ─────────────────────────────────────────────
// 5. NEURAL_PULSE.TS
// ─────────────────────────────────────────────
// Same pattern. HTML section uses \${d.xxx} where it should be ${d.xxx}.
// Lines 61-72 in basic HTML, and lines 89-94 in VIP HTML.

console.log('5. Fixing neural_pulse.ts...');
fixFile('neural_pulse.ts', [
  // Line 66: \${d.title} → ${d.title}
  {
    line: 66,
    to: '        <h1 class="neural-title">${d.title}</h1>'
  },
  // Line 68: \${d.imageUrl ? \`...\` : ''}
  {
    line: 68,
    to: '        ${d.imageUrl ? `<img class="neural-photo" src="${d.imageUrl}" />` : \'\'}'
  },
  // Line 70: \${d.senderName || 'Alguien especial'}
  {
    line: 70,
    to: '        <p class="neural-sender">De: <strong>${d.senderName || \'Alguien especial\'}</strong></p>'
  },
  // Line 92: \${d.imageUrl ? \`...\` : ''} in VIP
  {
    line: 92,
    to: '        ${d.imageUrl ? `<img class="neural-photo" id="n-img" style="opacity:0" src="${d.imageUrl}" />` : \'\'}'
  },
  // Line 94: \${d.senderName || 'Alguien especial'} in VIP
  {
    line: 94,
    to: '        <p class="neural-sender" id="n-sender">Sincronizado por: <strong>${d.senderName || \'Alguien especial\'}</strong></p>'
  }
]);

console.log('\n=== ALL FIXES APPLIED ===');
console.log('Run: npx tsc --noEmit  to verify.');
