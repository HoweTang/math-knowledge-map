// Scan german-pangu-ak34.html for problems that likely need figures but don't have SVG.
const fs = require('fs');
const html = fs.readFileSync('german-pangu-ak34.html', 'utf8');
const scripts = html.match(/<script>([\s\S]*?)<\/script>/g);
const data = scripts[scripts.length - 1].replace(/<\/?script>/g, '');

// Keywords that indicate a figure is needed
const needsFig = /(图|图形|图案|三角|正方|长方|矩形|L[\s ]*形|J[\s ]*形|圆|多边|阴影|面积|周长|网格|格子|排.*成|第 ?\d+ ?图|方阵|方格|Figur|展开|骰子|立方体|视图|网.*图|点数|张图|阴影|拼|钟|时|分针|秒针|日历|星期|天平|称|轮子|车|纸|撕|折|折纸|边长|厘米|cm|米\b|dm|格|位置|格子|绘|画|形体|地图|路径|路线|桌|椅|钟表|钟面|指针|手表|日历)/;

// Match problem objects by id field
const re = /id:'([^']+)',\s*section:'[^']+',\s*num:(\d+),[^]*?question:'([^']+)'/g;
let m;
const problems = [];
while ((m = re.exec(data)) !== null) {
    const id = m[1], num = m[2], q = m[3];
    const start = m.index;
    // Find end of this problem (next `id:` or end of array)
    const nextIdxRe = /id:'/g;
    nextIdxRe.lastIndex = start + 10;
    const nm = nextIdxRe.exec(data);
    const end = nm ? nm.index : data.length;
    const chunk = data.substring(start, end);
    const hasFigureField = /\bfigure:\s*['`]/.test(chunk);
    const hasSvg = /<svg\s/.test(chunk);
    problems.push({ id, num, q: q.substring(0, 120), hasFigureField, hasSvg });
}

const needs = problems.filter(p => needsFig.test(p.q) && !p.hasSvg);
const haveSvg = problems.filter(p => p.hasSvg);
const haveFigureText = problems.filter(p => p.hasFigureField && !p.hasSvg);

console.log(`Total problems: ${problems.length}`);
console.log(`Problems with SVG: ${haveSvg.length}`);
console.log(`Problems with 'figure:' text (but no SVG): ${haveFigureText.length}`);
console.log(`Problems that likely NEED figure but have no SVG: ${needs.length}`);
console.log('\n=== Problems needing figure (no SVG) ===');
needs.forEach((r, i) => {
    const marker = r.hasFigureField ? '📝' : '  ';
    console.log(`${(i + 1).toString().padStart(2)}. ${marker} ${r.id} #${r.num}  ${r.q}`);
});
console.log('\n(📝 = has figure: text placeholder — most need SVG)');
