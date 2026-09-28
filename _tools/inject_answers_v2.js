/**
 * Second-pass answer extraction:
 *   For problems that still lack `answer`, look for numeric values in the hint
 *   and cross-reference them with the options array. If exactly one option
 *   uniquely matches a numeric value in the hint's "final answer" region,
 *   set that as the answer.
 *
 * Only patch entries confident matches (single match); skip ambiguous ones.
 */
const fs = require('fs');
const PATH = 'C:/Users/eguihta/Learning/Guihao/math/math-knowledge-map/pangu-data.js';

const src = fs.readFileSync(PATH, 'utf8');
const wrapped = src + '\nreturn { panguProblems };';
const R = (new Function(wrapped))();

// Extract candidate numeric values from a hint string
function numericValues(s) {
    if (!s) return [];
    // Match integers, decimals, fractions like 3/8
    const re = /-?\d+(?:[.,]\d+)?(?:\/\d+)?/g;
    const m = s.match(re) || [];
    return m.map(x => x.replace(',', '.'));
}

// Extract only numeric values that appear in the LAST 40 chars of the hint (usually near "答案" or "=")
function trailingNumbers(hint) {
    if (!hint) return [];
    const tail = hint.slice(-60);
    return numericValues(tail);
}

// Extract numeric value from an option string (usually first number)
function optionNumeric(opt) {
    if (typeof opt !== 'string') return null;
    const m = opt.match(/-?\d+(?:[.,]\d+)?(?:\/\d+)?/);
    return m ? m[0].replace(',', '.') : null;
}

function reEscape(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

let modified = src;
let injected = 0;
let skipped = 0;
const skippedReasons = { hasImage: 0, noHint: 0, noMatch: 0, ambiguous: 0, noNumericOption: 0 };

for (const p of R.panguProblems) {
    if (p.answer) continue;
    if (!p.hint) { skipped++; skippedReasons.noHint++; continue; }

    // Skip image-only hints (they're by construction 读图向导 templates)
    if (p.hasImage && /读图向导/.test(p.hint)) { skipped++; skippedReasons.hasImage++; continue; }

    const optNumerics = (p.options || []).map(optionNumeric);
    if (!optNumerics.some(v => v !== null)) { skipped++; skippedReasons.noNumericOption++; continue; }

    // Try trailing hint numbers first (higher confidence)
    let candidateVals = trailingNumbers(p.hint);
    let matches = new Set();
    for (const val of candidateVals) {
        optNumerics.forEach((o, i) => {
            if (o === val) matches.add(i);
        });
    }

    // If no match in trailing, try all hint numbers
    if (matches.size === 0) {
        candidateVals = numericValues(p.hint);
        for (const val of candidateVals) {
            optNumerics.forEach((o, i) => {
                if (o === val) matches.add(i);
            });
        }
    }

    if (matches.size === 0) { skipped++; skippedReasons.noMatch++; continue; }
    if (matches.size > 1) { skipped++; skippedReasons.ambiguous++; continue; }

    const idx = [...matches][0];
    const letter = String.fromCharCode(97 + idx);

    // Now inject `answer: "<letter>"` into pangu-data.js source
    const idRe = new RegExp(`(id:\\s*"${reEscape(p.id)}")`);
    const idMatch = modified.match(idRe);
    if (!idMatch) continue;
    const startIdx = idMatch.index;

    let openIdx = -1, depth = 0;
    for (let i = startIdx; i >= 0; i--) {
        if (modified[i] === '}') depth++;
        else if (modified[i] === '{') {
            if (depth === 0) { openIdx = i; break; }
            depth--;
        }
    }
    if (openIdx < 0) continue;

    let closeIdx = -1; depth = 0;
    for (let i = openIdx; i < modified.length; i++) {
        if (modified[i] === '{') depth++;
        else if (modified[i] === '}') {
            depth--;
            if (depth === 0) { closeIdx = i; break; }
        }
    }
    if (closeIdx < 0) continue;

    const seg = modified.slice(openIdx, closeIdx + 1);
    const otherIdRe = /id:\s*"P[^"]*"/g;
    const idsInSeg = seg.match(otherIdRe) || [];
    if (idsInSeg.length !== 1) continue;

    const isMultiline = seg.includes('\n') && seg.includes('\n    ');
    let newSeg;
    if (isMultiline) {
        const indentMatch = seg.match(/\n(\s+)id:/);
        const indent = indentMatch ? indentMatch[1] : '        ';
        const lines = seg.split('\n');
        const lastFieldIdx = lines.length - 2;
        if (!lines[lastFieldIdx].trimEnd().endsWith(',')) {
            lines[lastFieldIdx] = lines[lastFieldIdx].trimEnd() + ',';
        }
        lines.splice(lastFieldIdx + 1, 0, `${indent}answer: "${letter}"`);
        newSeg = lines.join('\n');
    } else {
        newSeg = seg.replace(/\s*\}$/, `, answer: "${letter}" }`);
    }
    modified = modified.slice(0, openIdx) + newSeg + modified.slice(closeIdx + 1);
    injected++;
}

fs.writeFileSync(PATH, modified, 'utf8');
console.log(`v2 injected: ${injected}`);
console.log(`skipped: ${skipped}`);
console.log(`  reasons:`, skippedReasons);
