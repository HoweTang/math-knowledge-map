// Segment the extracted text into problem blocks.
// Each problem starts with "任务X" line, often followed by "W H" dimensions, then "N 分", ".审判", question text, options a-e, "你的回答是：answer".
const fs = require('fs');

const text = fs.readFileSync('_tools/docx_task1/extracted.txt', 'utf8');
const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

const problems = [];
let current = null;

for (const line of lines) {
    // Start of a new problem (task header)
    if (/^任务[一二三四五六七八九十]$/.test(line)) {
        if (current) problems.push(current);
        current = { header: line, lines: [] };
    } else if (current) {
        current.lines.push(line);
    }
}
if (current) problems.push(current);

console.log(`Problems detected: ${problems.length}`);

// Parse each into structured fields
const parsed = problems.map((p, i) => {
    const L = p.lines;
    const prob = {
        idx: i + 1,
        header: p.header,
        rawLines: L,
    };
    // Line 0: often "W H" dimensions (image placeholder)
    // Line 1: "N 分"
    // Line 2: ".审判" or similar
    // Last line: "你的回答是：X)"
    const pointsLine = L.find(l => /^\d+\s*分$/.test(l));
    if (pointsLine) prob.points = pointsLine.match(/\d+/)[0];
    const answerLine = L.find(l => /^你的回答是：/.test(l));
    if (answerLine) prob.rawAnswer = answerLine.replace('你的回答是：', '').trim();

    // Find the question text (between the metadata header and "a)" option line)
    const questionLines = [];
    const options = [];
    let foundQuestion = false;
    let inOptions = false;
    for (const l of L) {
        if (/^\d+\s*\d+$/.test(l)) continue; // W H
        if (/^\d+\s*分$/.test(l)) continue;
        if (l === '.审判' || l === '审判') continue;
        if (/^你的回答是：/.test(l)) continue;
        if (l === '检查') continue;
        if (/^[A-Ea-e]\)/.test(l)) {
            inOptions = true;
            options.push(l);
        } else if (!inOptions) {
            questionLines.push(l);
        } else {
            // After options line "a)" — some options continue
            options.push(l);
        }
    }
    prob.questionZh = questionLines.join(' ');
    prob.optionsRaw = options;
    return prob;
});

// Group by task
const byTask = {};
parsed.forEach(p => {
    byTask[p.header] = byTask[p.header] || [];
    byTask[p.header].push(p);
});
console.log('By task:');
Object.entries(byTask).forEach(([t, arr]) => {
    console.log(`  ${t}: ${arr.length} problems`);
});

// Sample output: first 5 problems
console.log('\n=== First 5 problems ===');
parsed.slice(0, 5).forEach(p => {
    console.log(`\n--- P${p.idx} (${p.header}, ${p.points||'?'}分, 答:${p.rawAnswer||'?'}) ---`);
    console.log('Q:', p.questionZh);
    console.log('Options:', p.optionsRaw.join(' | '));
});

// Save as JSON for subsequent processing
fs.writeFileSync('_tools/docx_task1/problems.json', JSON.stringify(parsed, null, 2), 'utf8');
console.log('\n✓ Saved _tools/docx_task1/problems.json');
