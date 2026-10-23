// Diagnostic: show titles that fall into "other/unclassified" per topic
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const code = fs.readFileSync(path.join(__dirname, '..', 'pangu-data.js'), 'utf8');
const ctx = {};
vm.createContext(ctx);
vm.runInContext(code + '\nthis.__out = { panguProblems };', ctx);
const problems = ctx.__out.panguProblems;

// Need to import the same TOPIC_META
const kr = fs.readFileSync(path.join(__dirname, 'knowledge_report.js'), 'utf8');
// Extract TOPIC_META by executing just that definition
const start = kr.indexOf('const TOPIC_META');
const end = kr.indexOf('// --- Clustering');
const topicMetaCode = kr.substring(start, end);
const ctx2 = {};
vm.createContext(ctx2);
vm.runInContext(topicMetaCode + '\nthis.__out = { TOPIC_META };', ctx2);
const TOPIC_META = ctx2.__out.TOPIC_META;

function clusterTitle(topic, title) {
    const meta = TOPIC_META.find(m => m.key === topic);
    if (!meta) return [];
    const hits = [];
    for (const cl of meta.clusters) {
        if (cl.patterns.some(re => re.test(title))) hits.push(cl.name);
    }
    return hits;
}

const unclass = {};
problems.forEach(p => {
    (p.topics || []).forEach(topic => {
        const hits = clusterTitle(topic, p.title || '');
        if (!hits.length) {
            unclass[topic] = unclass[topic] || [];
            unclass[topic].push({ title: p.title, id: p.id });
        }
    });
});

// Print per topic
Object.entries(unclass).sort((a,b) => b[1].length - a[1].length).forEach(([topic, arr]) => {
    const meta = TOPIC_META.find(m => m.key === topic);
    console.log(`\n### ${meta ? meta.label : topic}  (${arr.length} unclassified)`);
    const unique = {};
    arr.forEach(x => { unique[x.title] = (unique[x.title]||0) + 1; });
    Object.entries(unique).sort((a,b) => b[1]-a[1]).slice(0, 30).forEach(([t, c]) => {
        console.log(`  ${String(c).padStart(2)} × ${t}`);
    });
    if (Object.keys(unique).length > 30) console.log(`  ... and ${Object.keys(unique).length - 30} more unique titles`);
});
