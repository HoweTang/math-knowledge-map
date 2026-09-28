/**
 * Auto-extract 'answer' letter from each problem's hint and inject it as `answer: "x"`.
 * Handles both compact single-line and multi-line problem entries.
 * Skips problems that already have an `answer` field.
 */
const fs = require('fs');
const PATH = 'C:/Users/eguihta/Learning/Guihao/math/math-knowledge-map/pangu-data.js';

const src = fs.readFileSync(PATH, 'utf8');
const wrapped = src + '\nreturn { panguProblems };';
const R = (new Function(wrapped))();

// Parse answer letter from hint
function extractAnswer(hint) {
    if (!hint) return null;
    // Try multiple patterns: 答案：a / 答案:a / 答案 a / answer: a
    const patterns = [
        /答案[：:]?\s*([a-eA-E])(?!\w)/,
        /answer[：:]?\s*([a-eA-E])(?!\w)/i,
    ];
    for (const p of patterns) {
        const m = hint.match(p);
        if (m) return m[1].toLowerCase();
    }
    return null;
}

// Escape id for regex
function reEscape(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

let modified = src;
let injected = 0;
let alreadyHave = 0;
let noAnswer = 0;

for (const p of R.panguProblems) {
    // Skip if already has answer field
    if (p.answer !== undefined) { alreadyHave++; continue; }

    const ans = extractAnswer(p.hint);
    if (!ans) { noAnswer++; continue; }

    // Locate the problem entry in source. Try compact single-line first.
    // Pattern 1: single-line { id: "X", ... }
    // Pattern 2: multi-line { \n  id: "X", ... \n}
    // We'll search for `id: "X"` and inject `answer: "a"` before the closing `}`.

    const idRe = new RegExp(`(id:\\s*"${reEscape(p.id)}")`);
    const idMatch = modified.match(idRe);
    if (!idMatch) continue;

    const startIdx = idMatch.index;
    // Find the enclosing '{' before startIdx and matching '}' after
    // Walk backward to find '{'
    let openIdx = -1;
    let depth = 0;
    for (let i = startIdx; i >= 0; i--) {
        if (modified[i] === '}') depth++;
        else if (modified[i] === '{') {
            if (depth === 0) { openIdx = i; break; }
            depth--;
        }
    }
    if (openIdx < 0) continue;

    // Walk forward from openIdx to find matching '}'
    let closeIdx = -1;
    depth = 0;
    for (let i = openIdx; i < modified.length; i++) {
        if (modified[i] === '{') depth++;
        else if (modified[i] === '}') {
            depth--;
            if (depth === 0) { closeIdx = i; break; }
        }
    }
    if (closeIdx < 0) continue;

    // Only inject if this segment corresponds to our problem (no other id: between)
    const seg = modified.slice(openIdx, closeIdx + 1);
    // Sanity: contains our id and no other 'id: "P...' before it
    const otherIdRe = /id:\s*"P[^"]*"/g;
    const idsInSeg = seg.match(otherIdRe) || [];
    if (idsInSeg.length !== 1) continue;   // safety: entry contains exactly one problem id

    // Detect compact (single-line-ish) vs multi-line
    const isMultiline = seg.includes('\n') && seg.includes('\n    ');
    let newSeg;
    if (isMultiline) {
        // Insert new line `        answer: "a",` before closing `}`
        newSeg = seg.replace(/(\n\s*)\}$/, `$1    answer: "${ans}",$1}`);
        // If the last field before `}` doesn't have trailing comma, that's fine — we insert with comma.
        // Actually easier: insert right before `}` with correct indent
        newSeg = seg.replace(/\}$/, m => `    answer: "${ans}"\n${' '.repeat(4)}}`);
        // But the previous field may not end with comma. Simpler: add comma to previous non-} non-whitespace char.
        // Use a robust approach: parse indent from seg
        const indentMatch = seg.match(/\n(\s+)id:/);
        const indent = indentMatch ? indentMatch[1] : '        ';
        // Find last field line (last line before closing '}')
        const lines = seg.split('\n');
        // last line is '    }' — insert before it
        const lastFieldIdx = lines.length - 2;
        // Ensure previous line ends with comma
        if (!lines[lastFieldIdx].trimEnd().endsWith(',')) {
            lines[lastFieldIdx] = lines[lastFieldIdx].trimEnd() + ',';
        }
        // Insert new line
        lines.splice(lastFieldIdx + 1, 0, `${indent}answer: "${ans}"`);
        newSeg = lines.join('\n');
    } else {
        // Single-line compact: `{ id: "...", ..., hint: "..." }`
        // Insert `, answer: "a"` before the final `}`
        newSeg = seg.replace(/\s*\}$/, `, answer: "${ans}" }`);
    }
    modified = modified.slice(0, openIdx) + newSeg + modified.slice(closeIdx + 1);
    injected++;
}

fs.writeFileSync(PATH, modified, 'utf8');
console.log(`Injected answer: ${injected}`);
console.log(`Already had answer: ${alreadyHave}`);
console.log(`No answer extractable from hint: ${noAnswer}`);
