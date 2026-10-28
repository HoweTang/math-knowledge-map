// Scan ak4-knowledge-expand.html for examples that likely need figures but don't have them.
const fs = require('fs');
const html = fs.readFileSync('ak4-knowledge-expand.html', 'utf8');
const scripts = html.match(/<script>([\s\S]*?)<\/script>/g);
const data = scripts[scripts.length - 1].replace(/<\/?script>/g, '');

const needsFig = /(图|形|三角|正方|长方|矩形|L 形|L形|展开|骰子|立方体|视图|网格|格子|排.*成|网.*图|点数|张图|图形|阴影|拼|组合.*图|位置|第 ?\d+ ?图)/;

// Find each example by title + stars + q
const titleRe = /title:\s*'([^']+)',\s*stars:\s*(\d),\s*q:\s*'([^']+)'/g;
let m;
let hasFig = 0, noFigButNeeds = 0;
const results = [];
const positions = [];
while ((m = titleRe.exec(data)) !== null) {
    positions.push({ title: m[1], stars: m[2], q: m[3], start: m.index });
}

// Determine window end as next example start, or end-of-data
for (let i = 0; i < positions.length; i++) {
    const p = positions[i];
    const endIdx = i + 1 < positions.length ? positions[i + 1].start : data.length;
    const chunk = data.substring(p.start, endIdx);
    // Check if `fig:` appears before the first `steps:`
    const stepsAt = chunk.indexOf('steps:');
    const figAt = chunk.search(/\bfig:\s*`/);
    const hasFigField = figAt >= 0 && (stepsAt < 0 || figAt < stepsAt);
    const qNeedsFig = needsFig.test(p.q) || needsFig.test(p.title);

    if (hasFigField) {
        hasFig++;
    }
    if (qNeedsFig && !hasFigField) {
        noFigButNeeds++;
        results.push(p);
    }
}

console.log(`Total examples: ${positions.length}`);
console.log(`Examples with figure: ${hasFig}`);
console.log(`Examples that likely NEED figure but have none: ${noFigButNeeds}`);
console.log('\n=== Problems needing figures ===');
results.forEach((r, i) => {
    console.log(`${i + 1}. [${r.stars}★] ${r.title}`);
    console.log(`   ${r.q.substring(0, 100)}...`);
});
