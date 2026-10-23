// Analyze topic distribution across all pangu problems.
// Usage: node _tools/analyze_topics.js
const fs = require('fs');
const path = require('path');

// Load pangu-data.js in a sandbox since it declares `const panguProblems = [...]`
const code = fs.readFileSync(path.join(__dirname, '..', 'pangu-data.js'), 'utf8');
const vm = require('vm');
const ctx = {};
vm.createContext(ctx);
vm.runInContext(code + '\nthis.__out = { panguProblems: typeof panguProblems !== "undefined" ? panguProblems : null };', ctx);
const problems = ctx.__out.panguProblems;

if (!problems) {
    console.error('Could not load panguProblems from pangu-data.js');
    process.exit(1);
}

console.log(`\n=== Overview ===`);
console.log(`Total problems: ${problems.length}`);

// --- Group counts ---
const byYear = {}, byGrade = {}, byRound = {}, byDiff = {};
problems.forEach(p => {
    const grade = (p.id || '').match(/^P?(?:AK)?(\d+)/) ? p.id.match(/(?:^|_)(?:AK)?(\d)/) : null;
    // Infer grade from file name or id suffix - but simpler: use the number suffix pattern
    const g = (p.id || '').includes('AK4') || /ü0ç3k4|Ak4|AK4/.test(p.file || '') ? 4
            : (p.id || '').includes('AK5') || /ü0ç3k5|Ak5|AK5/.test(p.file || '') ? 5
            : (p.id || '').includes('AK6') || /ü0ç3k6|Ak6|AK6/.test(p.file || '') ? 6
            : (p.id || '').includes('AK7') || /ü0ç3k7|Ak7|AK7/.test(p.file || '') ? 7
            : (p.id || '').includes('AK8') || /ü0ç3k8|Ak8|AK8/.test(p.file || '') ? 8
            : (p.id || '').includes('AK9') || /ü0ç3k9|Ak9|AK9/.test(p.file || '') ? 9
            : '?';
    byYear[p.year]  = (byYear[p.year]  || 0) + 1;
    byGrade[g]      = (byGrade[g]      || 0) + 1;
    byRound[p.round]= (byRound[p.round]|| 0) + 1;
    byDiff[p.difficulty] = (byDiff[p.difficulty] || 0) + 1;
    p._grade = g;
});

console.log('\n--- By year ---');
Object.entries(byYear).sort().forEach(([k,v]) => console.log(`  ${k}: ${v}`));
console.log('\n--- By grade ---');
Object.entries(byGrade).sort().forEach(([k,v]) => console.log(`  AK${k}: ${v}`));
console.log('\n--- By round ---');
Object.entries(byRound).sort().forEach(([k,v]) => console.log(`  ${k}: ${v}`));
console.log('\n--- By difficulty ---');
Object.entries(byDiff).sort().forEach(([k,v]) => console.log(`  ${'⋆'.repeat(+k)} (${k}星): ${v}`));

// --- Topic distribution ---
const topicCount = {};
const topicByGrade = {}; // topic -> grade -> count
const problemsWithoutTopics = [];
problems.forEach(p => {
    if (!p.topics || !p.topics.length) {
        problemsWithoutTopics.push(p.id);
        return;
    }
    p.topics.forEach(t => {
        topicCount[t] = (topicCount[t] || 0) + 1;
        topicByGrade[t] = topicByGrade[t] || {};
        topicByGrade[t][p._grade] = (topicByGrade[t][p._grade] || 0) + 1;
    });
});
const sortedTopics = Object.entries(topicCount).sort((a,b) => b[1]-a[1]);

console.log(`\n=== Topic tag distribution (${sortedTopics.length} unique) ===`);
console.log('Tag'.padEnd(28), 'Count'.padStart(6), '  Grade breakdown');
console.log('-'.repeat(72));
sortedTopics.forEach(([t,c]) => {
    const gb = topicByGrade[t];
    const parts = Object.entries(gb).sort().map(([g,n]) => `AK${g}:${n}`).join(' ');
    console.log(t.padEnd(28), String(c).padStart(6), '  ' + parts);
});

console.log(`\nTotal topic tag applications: ${sortedTopics.reduce((s,[,c])=>s+c,0)}`);
console.log(`Avg topics per problem: ${(sortedTopics.reduce((s,[,c])=>s+c,0)/problems.length).toFixed(2)}`);
console.log(`Problems missing topic tags: ${problemsWithoutTopics.length}`);
if (problemsWithoutTopics.length && problemsWithoutTopics.length < 20) {
    console.log('  ', problemsWithoutTopics.join(', '));
}

// --- Topic co-occurrence (which topics appear together) ---
const cooccur = {};
problems.forEach(p => {
    if (!p.topics || p.topics.length < 2) return;
    for (let i = 0; i < p.topics.length; i++) {
        for (let j = i+1; j < p.topics.length; j++) {
            const key = [p.topics[i], p.topics[j]].sort().join(' + ');
            cooccur[key] = (cooccur[key]||0) + 1;
        }
    }
});
console.log(`\n=== Top topic co-occurrences (knowledge-point connections) ===`);
Object.entries(cooccur).sort((a,b)=>b[1]-a[1]).slice(0, 15).forEach(([k,c]) =>
    console.log(c.toString().padStart(4), ' ', k));

// --- Export JSON for downstream analysis ---
const out = {
    totalProblems: problems.length,
    byYear, byGrade, byRound, byDiff,
    topics: sortedTopics.map(([t,c]) => ({ tag: t, count: c, byGrade: topicByGrade[t] })),
    coOccurrences: Object.entries(cooccur).sort((a,b)=>b[1]-a[1]).map(([k,c]) => ({ pair: k, count: c })),
    problemsMissingTopics: problemsWithoutTopics
};
fs.writeFileSync(path.join(__dirname, 'topics_analysis.json'), JSON.stringify(out, null, 2), 'utf8');
console.log(`\n✓ Wrote _tools/topics_analysis.json (${(JSON.stringify(out).length/1024).toFixed(1)} KB)`);
