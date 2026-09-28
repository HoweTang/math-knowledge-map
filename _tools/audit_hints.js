const fs = require('fs');
const src = fs.readFileSync('C:/Users/eguihta/Learning/Guihao/math/math-knowledge-map/pangu-data.js', 'utf8');
const wrapped = src + '\nreturn { panguProblems, panguNodeMap };';
const R = (new Function(wrapped))();

const hasImage = R.panguProblems.filter(p => p.hasImage);
const noHint = hasImage.filter(p => !p.hint || p.hint.trim() === '');
const shortHint = hasImage.filter(p => p.hint && p.hint.length < 20);

console.log(`Total problems: ${R.panguProblems.length}`);
console.log(`hasImage: true      : ${hasImage.length}`);
console.log(`  of which no hint  : ${noHint.length}`);
console.log(`  of which very short hint (<20 chars): ${shortHint.length}`);
console.log();
console.log('First 15 hasImage w/o hint:');
noHint.slice(0, 15).forEach(p => {
    console.log(`  ${p.id} [AK${p.grade || 4} ${p.year} ${p.round}] "${p.title}"`);
});
