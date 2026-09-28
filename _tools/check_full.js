// Full health check for pangu-data.js + pangu-app.js
const fs = require('fs');
const path = require('path');

const root = 'C:/Users/eguihta/Learning/Guihao/math/math-knowledge-map';

function load(file) {
    return fs.readFileSync(path.join(root, file), 'utf8');
}

// 1) pangu-data.js loads
const data = load('pangu-data.js') + '\nreturn { panguProblems, panguNodes, panguLinks, panguPaths, panguProblemMap, panguNodeMap, panguCategoryNames, panguCategoryColors, problemsForPanguTopic };';
let R;
try { R = (new Function(data))(); } catch (e) { console.log('DATA LOAD FAIL:', e.message); process.exit(1); }

console.log(`✓ pangu-data.js loaded: ${R.panguProblems.length} problems, ${R.panguNodes.length} topics, ${R.panguLinks.length} links, ${R.panguPaths.length} paths`);

// 2) All problem topics are known
const known = new Set(R.panguNodes.map(n => n.id));
const badTopics = [];
R.panguProblems.forEach(p => {
    (p.topics || []).forEach(t => {
        if (!known.has(t)) badTopics.push(`${p.id} → ${t}`);
    });
});
console.log(badTopics.length === 0 ? '✓ All topic tags valid' : `✗ Unknown topics: ${badTopics.join(', ')}`);

// 3) All link source/target are valid
const badLinks = [];
R.panguLinks.forEach(l => {
    if (!known.has(l.source)) badLinks.push(`bad source: ${l.source}`);
    if (!known.has(l.target)) badLinks.push(`bad target: ${l.target}`);
});
console.log(badLinks.length === 0 ? '✓ All link endpoints valid' : `✗ Bad links: ${badLinks.join(', ')}`);

// 4) All path nodes valid
const badPathNodes = [];
R.panguPaths.forEach(p => (p.nodes || []).forEach(n => {
    if (!known.has(n)) badPathNodes.push(`${p.id} → ${n}`);
}));
console.log(badPathNodes.length === 0 ? '✓ All path nodes valid' : `✗ Bad path nodes: ${badPathNodes.join(', ')}`);

// 5) Unique problem IDs
const ids = R.panguProblems.map(p => p.id);
const dups = ids.filter((v, i) => ids.indexOf(v) !== i);
console.log(dups.length === 0 ? '✓ All problem IDs unique' : `✗ Duplicate IDs: ${dups.join(', ')}`);

// 6) Every problem has file, page, options, difficulty
const missing = R.panguProblems.filter(p =>
    !p.file || !p.page || !p.options || p.options.length < 3 || !p.difficulty);
console.log(missing.length === 0 ? '✓ All problems fully populated' : `⚠ ${missing.length} problems with missing fields: ${missing.slice(0,3).map(p => p.id).join(', ')}...`);

// 7) Grade breakdown
const byGrade = {};
R.panguProblems.forEach(p => {
    const g = p.grade || 4;
    byGrade[g] = (byGrade[g] || 0) + 1;
});
console.log('Grade breakdown:', byGrade);

// 8) pangu-app.js syntax
try {
    new Function(load('pangu-app.js'));
    console.log('✓ pangu-app.js parses');
} catch (e) {
    // pangu-app.js references DOM, so this may fail at runtime; only check it parses as text
    if (e instanceof SyntaxError) console.log('✗ pangu-app.js syntax error:', e.message);
    else console.log('✓ pangu-app.js parses (runtime errors expected without DOM)');
}
