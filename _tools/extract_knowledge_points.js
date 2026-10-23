// Extract fine-grained knowledge points per top-level topic.
// Each problem's `title` is treated as a candidate knowledge point;
// we group titles by top-level topic tag so you can see the actual coverage.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const code = fs.readFileSync(path.join(__dirname, '..', 'pangu-data.js'), 'utf8');
const ctx = {};
vm.createContext(ctx);
vm.runInContext(code + '\nthis.__out = { panguProblems };', ctx);
const problems = ctx.__out.panguProblems;

// Grade inference (same as analyze_topics.js)
problems.forEach(p => {
    const f = p.file || '';
    p._grade = /ü0ç3k4|Ak4|AK4/.test(f) ? 4
             : /ü0ç3k5|Ak5|AK5/.test(f) ? 5
             : /ü0ç3k6|Ak6|AK6/.test(f) ? 6
             : /ü0ç3k7|Ak7|AK7/.test(f) ? 7
             : /ü0ç3k8|Ak8|AK8/.test(f) ? 8
             : /ü0ç3k9|Ak9|AK9/.test(f) ? 9 : '?';
});

const TOPIC_LABEL = {
    pangu_calc:       '基础运算',
    pangu_number:     '数论/数位',
    pangu_fraction:   '分数/小数',
    pangu_percent:    '百分数',
    pangu_algebra:    '代数/方程',
    pangu_geom:       '平面几何',
    pangu_solid:      '立体几何',
    pangu_angle:      '角度',
    pangu_count:      '计数/组合',
    pangu_pattern:    '规律/数列',
    pangu_logic:      '逻辑推理',
    pangu_puzzle:     '智力题/脑筋急转弯',
    pangu_app:        '应用题',
    pangu_time:       '时间/日期',
    pangu_probability:'概率/统计',
};

// Group titles by top-level topic
const groups = {}; // topic -> Map<title, [problems]>
problems.forEach(p => {
    (p.topics || ['pangu_other']).forEach(t => {
        groups[t] = groups[t] || new Map();
        const title = (p.title || '(无题目)').trim();
        if (!groups[t].has(title)) groups[t].set(title, []);
        groups[t].get(title).push(p);
    });
});

// Produce a markdown report
let md = '# 盘古数学竞赛知识点全景（AK4 - AK9，609 题）\n\n';
md += `> 自动生成于 ${new Date().toISOString().slice(0,10)}\n\n`;
md += '按 15 个大类分组，每一类下列出该类**所有具体知识点**（题目 title），标注出现次数、年级分布、年份覆盖、难度范围。\n\n';
md += '**阅读方式**：你可以直接把这份文档当作"考纲"，哪一类下的点越多/星级越高，越是考察重心。\n\n';

const topicOrder = Object.entries(groups).sort((a,b) => {
    const ca = Array.from(a[1].values()).reduce((s,arr)=>s+arr.length,0);
    const cb = Array.from(b[1].values()).reduce((s,arr)=>s+arr.length,0);
    return cb - ca;
});

for (const [topic, titleMap] of topicOrder) {
    const label = TOPIC_LABEL[topic] || topic;
    const totalProblems = Array.from(titleMap.values()).reduce((s,a)=>s+a.length,0);
    md += `\n## ${label}  \`${topic}\`  — ${totalProblems} 题 · ${titleMap.size} 个不同知识点\n\n`;

    // Grade distribution for this topic
    const gradeDist = {};
    titleMap.forEach(arr => arr.forEach(p => gradeDist[p._grade] = (gradeDist[p._grade]||0)+1));
    md += '**年级分布**：' + Object.entries(gradeDist).sort().map(([g,n]) => `AK${g} ${n}题`).join(' · ') + '\n\n';

    // Table of knowledge points
    md += '| # | 知识点 | 题数 | 年级 | 年份 | 难度 | 典型例题 ID |\n';
    md += '|---|--------|------|------|------|------|-------------|\n';

    const sortedTitles = Array.from(titleMap.entries()).sort((a,b) => b[1].length - a[1].length);
    sortedTitles.forEach(([title, arr], i) => {
        const grades = [...new Set(arr.map(p => p._grade))].sort().map(g => `AK${g}`).join('/');
        const years = [...new Set(arr.map(p => p.year))].sort().join(', ');
        const diffs = arr.map(p => p.difficulty).filter(Boolean);
        const diffRange = diffs.length ? `${Math.min(...diffs)}-${Math.max(...diffs)}⋆` : '-';
        const sampleId = arr[0].id;
        md += `| ${i+1} | ${title} | ${arr.length} | ${grades} | ${years} | ${diffRange} | \`${sampleId}\` |\n`;
    });
}

fs.writeFileSync(path.join(__dirname, '..', 'KNOWLEDGE_POINTS.md'), md, 'utf8');
console.log(`✓ Wrote KNOWLEDGE_POINTS.md (${(md.length/1024).toFixed(1)} KB, ${md.split('\n').length} lines)`);

// Also console summary
console.log('\n=== Fine-grained knowledge points per category ===');
for (const [topic, titleMap] of topicOrder) {
    const label = TOPIC_LABEL[topic] || topic;
    const total = Array.from(titleMap.values()).reduce((s,a)=>s+a.length,0);
    console.log(`${label.padEnd(22)} ${String(total).padStart(4)}题  ${String(titleMap.size).padStart(3)} 个不同知识点`);
}
