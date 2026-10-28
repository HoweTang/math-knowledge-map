const fs = require('fs');
const html = fs.readFileSync('ak4-knowledge-expand.html', 'utf8');
const scripts = html.match(/<script>([\s\S]*?)<\/script>/g);
const inline = scripts[scripts.length - 1].replace(/<\/?script>/g, '');

const scriptStart = html.lastIndexOf('<script>');
const beforeLines = html.substring(0, scriptStart).split('\n').length;

// Use vm module to get better error info
const vm = require('vm');
try {
    new vm.Script(inline, { filename: 'inline.js' });
    console.log('OK');
} catch (e) {
    console.log('Error:', e.message);
    console.log('Stack:', e.stack.split('\n').slice(0, 5).join('\n'));
}
