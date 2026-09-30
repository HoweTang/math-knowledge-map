/**
 * Merge official Facit answers into pangu-data.js.
 * Facit answers are authoritative — they override any auto-extracted answer.
 */
const fs = require('fs');
const PATH = 'C:/Users/eguihta/Learning/Guihao/math/math-knowledge-map/pangu-data.js';
const FACIT = 'C:/Users/eguihta/Learning/Guihao/math/math-knowledge-map/_tools/facit_answers.json';

const src = fs.readFileSync(PATH, 'utf8');
const facit = JSON.parse(fs.readFileSync(FACIT, 'utf8'));

// Load current problems for lookup
const R = (new Function(src + '\nreturn { panguProblems };'))();
const problemMap = Object.fromEntries(R.panguProblems.map(p => [p.id, p]));

function reEscape(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

let modified = src;
let added = 0;
let overrode = 0;
let unchanged = 0;
let unknownIds = 0;
const conflicts = [];

for (const [id, letter] of Object.entries(facit)) {
    const p = problemMap[id];
    if (!p) { unknownIds++; continue; }

    if (p.answer === letter) { unchanged++; continue; }

    // Need to inject or update the answer
    const idRe = new RegExp(`(id:\\s*"${reEscape(id)}")`);
    const idMatch = modified.match(idRe);
    if (!idMatch) continue;

    // Find enclosing braces
    let openIdx = -1, depth = 0;
    for (let i = idMatch.index; i >= 0; i--) {
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

    // Case A: existing answer differs from Facit → replace
    const existingRe = /,\s*answer:\s*"[a-e]"/;
    let newSeg;
    if (existingRe.test(seg)) {
        if (p.answer && p.answer !== letter) {
            conflicts.push({ id, existing: p.answer, facit: letter });
        }
        newSeg = seg.replace(existingRe, `, answer: "${letter}"`);
        overrode++;
    } else {
        // Case B: no answer field → inject
        const isMultiline = seg.includes('\n') && seg.includes('\n    ');
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
        added++;
    }
    modified = modified.slice(0, openIdx) + newSeg + modified.slice(closeIdx + 1);
}

fs.writeFileSync(PATH, modified, 'utf8');
console.log(`Facit merge summary:`);
console.log(`  Added new answer   : ${added}`);
console.log(`  Overrode existing  : ${overrode}`);
console.log(`  Unchanged (match)  : ${unchanged}`);
console.log(`  Facit ids not in DB: ${unknownIds}`);
console.log(`  Facit total        : ${Object.keys(facit).length}`);
console.log();
if (conflicts.length) {
    console.log(`⚠ ${conflicts.length} conflicts (Facit used):`);
    conflicts.slice(0, 20).forEach(c => {
        console.log(`  ${c.id}: had ${c.existing}, Facit says ${c.facit}`);
    });
    if (conflicts.length > 20) console.log(`  ... and ${conflicts.length - 20} more`);
}
