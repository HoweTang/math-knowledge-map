const fs = require('fs');
const src = fs.readFileSync('C:/Users/eguihta/Learning/Guihao/math/math-knowledge-map/pangu-data.js', 'utf8');
const R = (new Function(src + '\nreturn { panguProblems };'))();
const missing = R.panguProblems.filter(p => !p.answer);

// Group by hint pattern
const buckets = { hasNumberAns: [], hasImage: [], noHint: [], other: [] };
missing.forEach(p => {
    if (!p.hint) buckets.noHint.push(p);
    else if (p.hasImage && /读图向导/.test(p.hint)) buckets.hasImage.push(p);
    else if (/答案[：:]?\s*\d/.test(p.hint)) buckets.hasNumberAns.push(p);
    else buckets.other.push(p);
});
console.log(`Total without answer: ${missing.length}`);
console.log(`  hasImage (read-image template hint): ${buckets.hasImage.length}`);
console.log(`  hint has 答案:<number>: ${buckets.hasNumberAns.length}`);
console.log(`  no hint at all: ${buckets.noHint.length}`);
console.log(`  other pattern: ${buckets.other.length}`);
console.log();
console.log('Sample hint has 答案:<number>:');
buckets.hasNumberAns.slice(0, 10).forEach(p => {
    console.log(`  ${p.id}: options=${JSON.stringify(p.options)} hint="${p.hint.slice(0, 100)}"`);
});
console.log();
console.log('Sample other patterns:');
buckets.other.slice(0, 10).forEach(p => {
    console.log(`  ${p.id}: hint="${p.hint.slice(0, 100)}"`);
});
