// 从 ak4-knowledge-expand.html 里取出 AK4 数组，打印 10 大类 / 61 知识点概要
// 用法: node _tools/dump_ak4_points.js [--json out.json]
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'ak4-knowledge-expand.html'), 'utf8');
const start = html.indexOf('const AK4 = [');
if (start < 0) throw new Error('AK4 array not found');
// 数组结束位置：找到第一个 "\n];" 之后
const end = html.indexOf('\n];', start);
const src = html.slice(start, end + 3).replace('const AK4 =', 'AK4 =');
let AK4;
// eslint-disable-next-line no-eval
eval(src);

const outIdx = process.argv.indexOf('--json');
if (outIdx > 0) {
    const out = AK4.map(c => ({
        cat: c.cat, slug: c.slug, emoji: c.emoji,
        points: c.points.map(p => ({
            name: p.name,
            analysis: p.analysis,
            tips: p.tips,
            exampleTitles: (p.examples || []).map(e => e.title)
        }))
    }));
    fs.writeFileSync(process.argv[outIdx + 1], JSON.stringify(out, null, 2), 'utf8');
}

let n = 0, ex = 0;
for (const c of AK4) {
    console.log(`\n## ${c.emoji} ${c.cat} (${c.slug}) - ${c.points.length} 知识点`);
    for (const p of c.points) {
        n++;
        ex += (p.examples || []).length;
        console.log(`  ${String(n).padStart(2, '0')}. ${p.name}  [例题 ${(p.examples || []).length}]`);
    }
}
console.log(`\n共 ${AK4.length} 类，${n} 个知识点，${ex} 道例题`);
