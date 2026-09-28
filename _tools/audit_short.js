const fs = require('fs');
const src = fs.readFileSync('C:/Users/eguihta/Learning/Guihao/math/math-knowledge-map/pangu-data.js', 'utf8');
const R = (new Function(src + '\nreturn { panguProblems };'))();
R.panguProblems.filter(p => p.hasImage && p.hint && p.hint.length < 20).forEach(p => {
    console.log(`${p.id} [AK${p.grade || 4} ${p.year} ${p.round}] "${p.title}" hint="${p.hint}"`);
});
