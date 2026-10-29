const fs = require('fs');
const html = fs.readFileSync('german-pangu-ak34.html', 'utf8');
const scripts = html.match(/<script>([\s\S]*?)<\/script>/g);
const inline = scripts[scripts.length - 1].replace(/<\/?script>/g, '');
const vm = require('vm');
try {
    new vm.Script(inline, { filename: 'inline.js' });
    console.log('✓ JS syntax OK');
} catch (e) {
    console.log('✗ JS ERROR:', e.message);
    console.log(e.stack.split('\n').slice(0, 5).join('\n'));
    process.exit(1);
}
console.log('File size:', Math.round(html.length / 1024), 'KB');
console.log('SVG tags:', (html.match(/<svg\s/g) || []).length);
console.log('figure fields:', (inline.match(/\bfigure:\s*[`']/g) || []).length);
