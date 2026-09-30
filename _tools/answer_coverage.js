const fs = require('fs');
const src = fs.readFileSync('C:/Users/eguihta/Learning/Guihao/math/math-knowledge-map/pangu-data.js', 'utf8');
const R = (new Function(src + '\nreturn { panguProblems };'))();

// By grade
const stats = {};
R.panguProblems.forEach(p => {
    const g = p.grade || 4;
    stats[g] = stats[g] || { total: 0, withAns: 0, hasImage: 0, hasImageWithAns: 0 };
    stats[g].total++;
    if (p.answer) stats[g].withAns++;
    if (p.hasImage) {
        stats[g].hasImage++;
        if (p.answer) stats[g].hasImageWithAns++;
    }
});

console.log('年级  总数  有答案  覆盖率  含图题  含图题有答案');
console.log('----  ----  ------  ------  ------  ------------');
let totAll = 0, ansAll = 0;
Object.keys(stats).sort().forEach(g => {
    const s = stats[g];
    totAll += s.total; ansAll += s.withAns;
    const pct = (s.withAns / s.total * 100).toFixed(0);
    console.log(`AK${g}   ${String(s.total).padEnd(4)}  ${String(s.withAns).padEnd(6)}  ${pct.padStart(4)}%   ${String(s.hasImage).padEnd(6)}  ${s.hasImageWithAns}`);
});
console.log(`----  ----  ------  ------`);
console.log(`合计  ${totAll}   ${ansAll}    ${(ansAll/totAll*100).toFixed(0)}%`);
