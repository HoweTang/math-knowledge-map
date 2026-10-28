const fs = require('fs');
const html = fs.readFileSync('ak4-knowledge-expand.html', 'utf8');
const scripts = html.match(/<script>([\s\S]*?)<\/script>/g);
const inline = scripts[scripts.length - 1].replace(/<\/?script>/g, '');
try {
    new Function(inline);
    console.log('✓ JS syntax OK');
} catch (e) {
    console.log('✗ JS ERROR:', e.message);
    process.exit(1);
}
console.log('File size:', Math.round(html.length / 1024), 'KB');
console.log('Lines:', html.split('\n').length);
console.log('SVG tags:', (html.match(/<svg\s/g) || []).length);
console.log('fig: fields:', (inline.match(/\bfig:\s*`/g) || []).length);
