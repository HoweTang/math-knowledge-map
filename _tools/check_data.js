const fs = require('fs');
const src = fs.readFileSync('C:/Users/eguihta/Learning/Guihao/math/math-knowledge-map/pangu-data.js', 'utf8');
// Wrap in an IIFE that exposes globals so eval-scope constants become accessible
const wrapped = src + '\nreturn { panguProblems, panguNodes, panguLinks, panguPaths, panguProblemMap };';
const result = (new Function(wrapped))();
console.log(`OK problems=${result.panguProblems.length} topics=${result.panguNodes.length} links=${result.panguLinks.length} paths=${result.panguPaths.length}`);
// Sanity: unique ids
const ids = result.panguProblems.map(p => p.id);
const dupes = ids.filter((v, i) => ids.indexOf(v) !== i);
if (dupes.length) console.log('DUPLICATE IDS:', dupes);
// Topic tag validity
const knownTopics = new Set(result.panguNodes.map(n => n.id));
const bad = [];
for (const p of result.panguProblems) {
    for (const t of (p.topics || [])) {
        if (!knownTopics.has(t)) bad.push(`${p.id} -> ${t}`);
    }
}
if (bad.length) console.log('UNKNOWN TOPICS:', bad);
// Count by year/round
const bucket = {};
for (const p of result.panguProblems) {
    const k = `${p.year} ${p.round}`;
    bucket[k] = (bucket[k] || 0) + 1;
}
console.log('By year/round:');
Object.keys(bucket).sort().forEach(k => console.log(`  ${k}: ${bucket[k]}`));
