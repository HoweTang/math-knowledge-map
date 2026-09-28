const fs = require('fs');
const path = require('path');
const root = 'C:/Users/eguihta/Learning/Guihao/math/math-knowledge-map';

function load(f) { return fs.readFileSync(path.join(root, f), 'utf8'); }

let allOk = true;
function assert(cond, msg) {
    console.log((cond ? '✓ ' : '✗ ') + msg);
    if (!cond) allOk = false;
}

// 1. Pangu data
const dataSrc = load('pangu-data.js') + '\nreturn { panguProblems, panguNodes, panguLinks, panguPaths };';
let D;
try { D = (new Function(dataSrc))(); assert(true, `pangu-data.js loads`); }
catch (e) { assert(false, 'pangu-data.js load: ' + e.message); process.exit(1); }

assert(D.panguProblems.length === 609, `609 problems: got ${D.panguProblems.length}`);
assert(D.panguNodes.length === 15, `15 topics: got ${D.panguNodes.length}`);
assert(D.panguLinks.length === 24, `24 links: got ${D.panguLinks.length}`);
assert(D.panguPaths.length === 9, `9 paths: got ${D.panguPaths.length}`);

// 2. Hint coverage
const missing = D.panguProblems.filter(p => !p.hint || p.hint.trim() === '');
assert(missing.length === 0, `All problems have hint (missing=${missing.length})`);

// 3. Options coverage
const badOpts = D.panguProblems.filter(p => !p.options || p.options.length < 3);
assert(badOpts.length === 0, `All problems have >= 3 options (bad=${badOpts.length})`);

// 4. Topic tag validity
const known = new Set(D.panguNodes.map(n => n.id));
const badT = D.panguProblems.flatMap(p => (p.topics || []).filter(t => !known.has(t)));
assert(badT.length === 0, `All topic tags valid (bad=${badT.length})`);

// 5. Grade distribution
const byGrade = {};
D.panguProblems.forEach(p => { byGrade[p.grade || 4] = (byGrade[p.grade || 4] || 0) + 1; });
console.log('  Grade breakdown:', byGrade);

// 6. hasImage counts
const withImage = D.panguProblems.filter(p => p.hasImage).length;
console.log(`  hasImage problems: ${withImage} (all have hints)`);

// 7. Answer field coverage
const withAnswer = D.panguProblems.filter(p => p.answer && /^[a-e]$/.test(p.answer)).length;
assert(withAnswer >= 300, `Answer field on many problems (${withAnswer} >= 300)`);
console.log(`  Problems with explicit answer field: ${withAnswer} / ${D.panguProblems.length}`);

// 8. JS syntax
for (const f of ['pangu-app.js', 'bridge-app.js']) {
    try { new Function(load(f)); assert(true, `${f} parses`); }
    catch (e) { if (e instanceof SyntaxError) assert(false, `${f}: ${e.message}`); else assert(true, `${f} parses`); }
}

// 9. HTML closures
for (const f of ['pangu.html', 'bridge.html', 'index.html', 'german.html']) {
    const html = load(f);
    assert(html.includes('</html>'), `${f} closes with </html>`);
}

// 10. New UI hooks
const panguHtml = load('pangu.html');
assert(panguHtml.includes('data-view="practice"'), 'pangu.html has practice tab');
assert(panguHtml.includes('data-view="print"'), 'pangu.html has print tab');
assert(panguHtml.includes('id="topic-filter"'), 'pangu.html has topic filter');
assert(panguHtml.includes('id="difficulty-filter"'), 'pangu.html has difficulty filter');

const appJs = load('pangu-app.js');
assert(appJs.includes('function loadStatus'), 'pangu-app.js has loadStatus');
assert(appJs.includes('function saveStatus'), 'pangu-app.js has saveStatus');
assert(appJs.includes('function toggleStar'), 'pangu-app.js has toggleStar');
assert(appJs.includes('function exportCsv'), 'pangu-app.js has exportCsv');
assert(appJs.includes('function filterSet'), 'pangu-app.js has filterSet');
assert(appJs.includes('function markProblemStatus'), 'pangu-app.js has markProblemStatus');
assert(appJs.includes('function practiceMark'), 'pangu-app.js has practiceMark');
assert(appJs.includes('STATUS_KEY'), 'pangu-app.js references STATUS_KEY');

const cssFile = load('style.css');
assert(cssFile.includes('.status-correct'), 'style.css has status-correct');
assert(cssFile.includes('.set-btn'), 'style.css has set-btn');
assert(cssFile.includes('.csv-export-btn'), 'style.css has csv-export-btn');

// 11. Bridge extended
const bridgeHtml = load('bridge.html');
assert(bridgeHtml.includes('pangu-data.js'), 'bridge.html loads pangu data');
assert(bridgeHtml.includes('data-grade="ak5"'), 'bridge.html has AK5 filter');
assert(bridgeHtml.includes('data-grade="ak9"'), 'bridge.html has AK9 filter');

console.log();
console.log(allOk ? '=== ALL CHECKS PASSED ===' : '=== SOME CHECKS FAILED ===');
process.exit(allOk ? 0 : 1);
