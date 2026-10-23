// Produce a grade-specific knowledge-point analysis report.
//
// Usage: node _tools/knowledge_report_grade.js 4
//        → outputs KNOWLEDGE_POINTS_AK4.md
//
// Shares TOPIC_META clustering rules with knowledge_report.js
// but filters to a single grade and tailors strategies/examples.

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const targetGrade = parseInt(process.argv[2] || '4', 10);
if (![4,5,6,7,8,9].includes(targetGrade)) {
    console.error('Grade must be 4-9'); process.exit(1);
}

// Load data
const code = fs.readFileSync(path.join(__dirname, '..', 'pangu-data.js'), 'utf8');
const ctx = {};
vm.createContext(ctx);
vm.runInContext(code + '\nthis.__out = { panguProblems };', ctx);
let problems = ctx.__out.panguProblems;

problems.forEach(p => {
    const f = p.file || '';
    p._grade = /ü0ç3k4|Ak4|AK4/.test(f) ? 4
             : /ü0ç3k5|Ak5|AK5/.test(f) ? 5
             : /ü0ç3k6|Ak6|AK6/.test(f) ? 6
             : /ü0ç3k7|Ak7|AK7/.test(f) ? 7
             : /ü0ç3k8|Ak8|AK8/.test(f) ? 8
             : /ü0ç3k9|Ak9|AK9/.test(f) ? 9 : '?';
});

// FILTER TO TARGET GRADE
const totalAll = problems.length;
problems = problems.filter(p => p._grade === targetGrade);
console.log(`Filtered to AK${targetGrade}: ${problems.length} / ${totalAll} problems`);

// Import TOPIC_META from the main report script
const mainReport = fs.readFileSync(path.join(__dirname, 'knowledge_report.js'), 'utf8');
const start = mainReport.indexOf('const TOPIC_META');
const end = mainReport.indexOf('// --- Clustering');
const ctx2 = {};
vm.createContext(ctx2);
vm.runInContext(mainReport.substring(start, end) + '\nthis.__out = { TOPIC_META };', ctx2);
const TOPIC_META = ctx2.__out.TOPIC_META;

// Grade-specific strategy overlays — adjust tone/depth per grade
const GRADE_FOCUS = {
    4: {
        name: 'AK4 (四年级)',
        intro: `AK4 是盘古竞赛的入门级别，一年通常考 12 题（初赛）+ 10 题（决赛）。
AK4 的题目侧重**读题能力、运算熟练度、空间想象、模式识别**，没有代数、几何证明、分数运算等高年级内容。
拿分策略：**基础运算必须 100% 正确；陷阱题/应用题要读 2-3 遍；几何题画图辅助**。`,
        tipPerCategory: {
            pangu_calc: '对 AK4 来说这是**送分题**，整年份下来 20 多题。要练到秒答。常考：填运算符号、交替加减、从和中减、换算单位。',
            pangu_app: 'AK4 的应用题重点在**读清题目**。常见陷阱："农民几岁"（动物数量和年龄无关）、"几倍" vs "多几倍"、单位是否统一。画线段/表格！',
            pangu_count: 'AK4 层面的计数都是**可以枚举**的。常见：三角形计数、路径数、组合（哪几种）。不要上公式，老老实实画图数。',
            pangu_puzzle: 'AK4 的数字谜/智力题常考**算式填数字**（加法/乘法竖式）、幻方、简单字母运算。练好进位规则就能解一大半。',
            pangu_logic: 'AK4 逻辑题多是**真假话、匹配、位置、陷阱**。遇到"农民年龄"要知道是陷阱；遇到匹配题画表格。',
            pangu_pattern: 'AK4 的规律大多是**找下一项/第 N 项**：周期规律（123123...）、等差（2,4,6,8...）、图形规律（第 n 张图点数）。',
            pangu_number: 'AK4 的数论入门：数位、最大/最小数、简单整除。不涉及质数因子分解。关键是会把 **abc = 100a+10b+c** 分析。',
            pangu_time: 'AK4 常考：**星期几**（mod 7）、**时长计算**（跨小时）、简单时刻表。时针夹角等高难题不会出现。',
            pangu_solid: 'AK4 立体题多是**三视图识别**、**展开图识别**、**切涂方块计数**、**堆叠**。要练空间想象，可以折纸实操。',
            pangu_geom: 'AK4 几何题重点：**周长**、**图形计数**、**图形拼接**、**阴影面积**(简单版)。不涉及证明和复杂公式。',
            pangu_fraction: 'AK4 分数极少（通常 0-2 题），只是初级分数意义，不深入运算。',
            pangu_percent: 'AK4 不考百分数。',
            pangu_algebra: 'AK4 不考代数（没有设未知数的题）。',
            pangu_angle: 'AK4 不考角度计算（高年级内容）。',
            pangu_probability: 'AK4 不考概率。',
        }
    },
    5: { name: 'AK5 (五年级)', intro: '...' },  // placeholder
};

// Cluster each problem
function clusterTitle(topic, title) {
    const meta = TOPIC_META.find(m => m.key === topic);
    if (!meta) return [];
    const hits = [];
    for (const cl of meta.clusters) {
        if (cl.patterns.some(re => re.test(title))) hits.push(cl.name);
    }
    return hits.length ? hits : ['综合应用（独立题型）'];
}

const kp = {};
problems.forEach(p => {
    (p.topics || []).forEach(topic => {
        clusterTitle(topic, p.title || '').forEach(cn => {
            kp[topic] = kp[topic] || {};
            kp[topic][cn] = kp[topic][cn] || { problems: [], diffs: [], titles: new Set(), years: new Set() };
            const rec = kp[topic][cn];
            rec.problems.push(p);
            rec.diffs.push(p.difficulty);
            rec.titles.add(p.title);
            rec.years.add(p.year);
        });
    });
});

// Compose report
const focus = GRADE_FOCUS[targetGrade] || { name: `AK${targetGrade}`, intro: '', tipPerCategory: {} };

let md = `# ${focus.name} 盘古数学知识点深度分析\n\n`;
md += `> 自动生成于 ${new Date().toISOString().slice(0,10)} · 基于 **${problems.length} 道 AK${targetGrade} 题目**（${totalAll} 全部）\n\n`;
if (focus.intro) md += `${focus.intro}\n\n`;

// Overview — only categories that have problems at this grade
const activeMetasPairs = TOPIC_META.map(meta => {
    const clusters = kp[meta.key] || {};
    const totalInTopic = Object.values(clusters).reduce((s, c) => s + c.problems.length, 0);
    return { meta, clusters, totalInTopic };
}).filter(x => x.totalInTopic > 0)
  .sort((a,b) => b.totalInTopic - a.totalInTopic);

md += `## 📊 AK${targetGrade} 考察重心\n\n`;
md += `| 大类 | 题数 | 占比 | 平均难度 | 核心知识点数 |\n`;
md += `|------|-----:|-----:|---------:|-------------:|\n`;
activeMetasPairs.forEach(({ meta, clusters, totalInTopic }) => {
    const allDiffs = [];
    Object.values(clusters).forEach(c => c.diffs.forEach(d => d && allDiffs.push(d)));
    const avgDiff = allDiffs.length ? (allDiffs.reduce((a,b)=>a+b,0)/allDiffs.length).toFixed(1) : '-';
    const pct = ((totalInTopic / problems.length) * 100).toFixed(1);
    md += `| ${meta.emoji} ${meta.label} | ${totalInTopic} | ${pct}% | ${avgDiff}⋆ | ${Object.keys(clusters).length} |\n`;
});

// List missing categories (for AK4-like grades)
const missingMetas = TOPIC_META.filter(m => !kp[m.key] || Object.values(kp[m.key]).length === 0);
if (missingMetas.length) {
    md += `\n**AK${targetGrade} 不出现的大类**：${missingMetas.map(m => m.emoji + m.label).join(' · ')}\n`;
    md += `这些是**高年级专属考点**（代数证明、分数运算、角度、百分比、概率等）—— AK${targetGrade} 完全不涉及，可以忽略。\n`;
}

md += `\n> **注**：一题可能跨多个大类，上表总和 > ${problems.length}。\n`;
md += `\n---\n\n`;

// Per-category sections — only active ones
activeMetasPairs.forEach(({ meta, clusters, totalInTopic }) => {
    const totalTitles = Object.values(clusters).reduce((s, c) => s + c.titles.size, 0);
    md += `## ${meta.emoji} ${meta.label}  \`${meta.key}\`\n\n`;
    md += `**考察点**：${meta.desc}\n\n`;
    md += `**AK${targetGrade} 覆盖**：${totalInTopic} 道题 · ${Object.keys(clusters).length} 个核心知识点 · 聚合自 ${totalTitles} 个具体题目\n\n`;

    if (focus.tipPerCategory && focus.tipPerCategory[meta.key]) {
        md += `> 💡 **AK${targetGrade} 定位**：${focus.tipPerCategory[meta.key]}\n\n`;
    }

    md += `### 📋 核心知识点\n\n`;
    md += '| # | 知识点 | 题数 | 年份覆盖 | 难度 | 代表例题 |\n';
    md += '|---|--------|-----:|----------|------|----------|\n';
    const sorted = Object.entries(clusters).sort((a,b) => {
        if (/综合应用/.test(a[0])) return 1;
        if (/综合应用/.test(b[0])) return -1;
        return b[1].problems.length - a[1].problems.length;
    });
    sorted.forEach(([name, rec], i) => {
        const diffs = rec.diffs.filter(Boolean);
        const diffRange = diffs.length ? `${Math.min(...diffs)}-${Math.max(...diffs)}⋆` : '-';
        const years = Array.from(rec.years).sort().join(', ');
        const representative = rec.problems.slice().sort((a,b) => (a.difficulty||3)-(b.difficulty||3))[0];
        md += `| ${i+1} | **${name}** | ${rec.problems.length} | ${years} | ${diffRange} | \`${representative.id}\` |\n`;
    });

    const miscCluster = clusters['综合应用（独立题型）'];
    if (miscCluster && miscCluster.problems.length > 0) {
        md += `\n> **"综合应用（独立题型）"中的 AK${targetGrade} 代表题**（共 ${miscCluster.problems.length} 道）：\n`;
        const sampleTitles = Array.from(miscCluster.titles).slice(0, 12);
        sampleTitles.forEach(t => md += `> - ${t}\n`);
        if (miscCluster.titles.size > 12) {
            md += `> - ... 其余 ${miscCluster.titles.size - 12} 种题型详见数据\n`;
        }
        md += `\n`;
    }

    md += `### 🧭 解题策略\n\n`;
    meta.strategies.forEach(s => md += `- ${s}\n`);

    md += `\n### 💡 每个知识点的例题\n\n`;
    // For each cluster, show 1-2 examples (prefer the easiest if cluster has only 1-2 problems,
    // otherwise show one typical + one harder)
    sorted.forEach(([clusterName, rec]) => {
        md += `<details${rec.problems.length <= 3 ? ' open' : ''}>\n`;
        md += `<summary><b>▸ ${clusterName}</b>（${rec.problems.length} 题，点击展开/收起）</summary>\n\n`;

        // Choose examples: deduplicate by id, sort by difficulty
        const uniq = Array.from(new Map(rec.problems.map(p => [p.id, p])).values())
                          .sort((a,b) => (a.difficulty||3) - (b.difficulty||3));

        // Pick: easiest, and if there are >2 problems, also pick a harder one
        const picks = [];
        if (uniq.length > 0) picks.push(uniq[0]);
        if (uniq.length >= 3) picks.push(uniq[uniq.length - 1]); // hardest
        if (uniq.length >= 5) picks.splice(1, 0, uniq[Math.floor(uniq.length/2)]); // middle

        picks.forEach(p => {
            md += `**${'⋆'.repeat(p.difficulty||0)} ${p.title}**  \`${p.id}\` · ${p.year} ${p.round}\n\n`;
            md += `> ${(p.translation || '').replace(/\n/g, '  \n> ')}\n\n`;
            if (p.options && p.options.length) {
                md += `选项：${p.options.map((o,i) => `**${String.fromCharCode(97+i)})** ${o}`).join('　')}\n\n`;
            }
            if (p.answer) md += `**答案**：${p.answer}　`;
            if (p.hint) md += `**思路**：${p.hint.replace(/\n/g, ' ')}\n\n`;
            else md += '\n';
        });

        // If cluster has more problems not shown, list their IDs
        if (uniq.length > picks.length) {
            const notShown = uniq.filter(p => !picks.find(x => x.id === p.id));
            md += `> **其余 ${notShown.length} 道**：${notShown.map(p => `\`${p.id}\``).join(', ')}\n\n`;
        }

        md += `</details>\n\n`;
    });
    md += '---\n\n';
});

// Top knowledge points for this grade (excluding generic bucket)
md += `## 🏆 AK${targetGrade} 高频核心知识点 Top 20\n\n`;
md += `> 已排除"综合应用"桶，这些是**能明确训练**的高性价比考点。\n\n`;
md += '| 排名 | 知识点 | 大类 | 题数 | 难度 |\n';
md += '|-----:|--------|------|-----:|------|\n';
const allClusters = [];
Object.entries(kp).forEach(([topic, cls]) => {
    Object.entries(cls).forEach(([name, rec]) => {
        if (/综合应用/.test(name)) return;
        const meta = TOPIC_META.find(m => m.key === topic);
        const diffs = rec.diffs.filter(Boolean);
        allClusters.push({
            name, topic, meta, count: rec.problems.length,
            diffRange: diffs.length ? `${Math.min(...diffs)}-${Math.max(...diffs)}⋆` : '-'
        });
    });
});
allClusters.sort((a,b) => b.count - a.count).slice(0, 20).forEach((c, i) => {
    md += `| ${i+1} | **${c.name}** | ${c.meta ? c.meta.emoji + ' ' + c.meta.label : c.topic} | ${c.count} | ${c.diffRange} |\n`;
});

// Difficulty distribution for this grade
const diffCount = {1:0, 2:0, 3:0, 4:0, 5:0};
problems.forEach(p => { if (diffCount[p.difficulty] !== undefined) diffCount[p.difficulty]++; });
md += `\n## 📈 AK${targetGrade} 难度分布\n\n`;
md += `| 难度 | 题数 | 占比 |\n|------|-----:|-----:|\n`;
[1,2,3,4,5].forEach(d => {
    const pct = problems.length ? (diffCount[d]/problems.length*100).toFixed(1) : 0;
    md += `| ${'⋆'.repeat(d)} (${d}星) | ${diffCount[d]} | ${pct}% |\n`;
});

// Year-by-year breakdown
md += `\n## 📅 AK${targetGrade} 年份与轮次题数\n\n`;
md += `| 年份 | 初赛 | 复赛 | 决赛 | 小计 |\n|------|-----:|-----:|-----:|-----:|\n`;
const byYR = {};
problems.forEach(p => {
    byYR[p.year] = byYR[p.year] || { 初赛:0, 复赛:0, 决赛:0 };
    byYR[p.year][p.round] = (byYR[p.year][p.round]||0) + 1;
});
let totalInit=0, totalRe=0, totalFin=0;
Object.keys(byYR).sort().forEach(y => {
    const r = byYR[y];
    const sum = (r.初赛||0)+(r.复赛||0)+(r.决赛||0);
    totalInit += r.初赛||0; totalRe += r.复赛||0; totalFin += r.决赛||0;
    md += `| ${y} | ${r.初赛||'-'} | ${r.复赛||'-'} | ${r.决赛||'-'} | ${sum} |\n`;
});
md += `| **合计** | **${totalInit}** | **${totalRe}** | **${totalFin}** | **${problems.length}** |\n`;

// Study plan
md += `\n## 📚 AK${targetGrade} 备考建议\n\n`;
if (targetGrade === 4) {
    md += `### 🎯 优先级（按分值性价比排）

**第 1 优先 · 必拿分（1-2 星，共约 ${diffCount[1]+diffCount[2]} 题）**
这些是入门送分题，错一道就输了：
- 四则运算（填运算符、从和中减）
- 简单时间（星期几、持续时长）
- 读题类应用题（找陷阱、不中招）
- 基础几何（数三角形、周长）
- 简单规律（下一项）

**第 2 优先 · 要抢（3 星，共约 ${diffCount[3]} 题）**
拉开排名的关键题：
- 立体几何：三视图、展开图、立方体切割涂色
- 计数：路径数、简单组合
- 智力题：加法竖式、幻方
- 规律进阶：周期+等差混合

**第 3 优先 · 攻坚（4-5 星，共约 ${diffCount[4]+diffCount[5]} 题）**
每年只有少数几道，拿下 1-2 道就能进前列：
- 复杂图形计数（含旋转/镜像的）
- 多步应用（动物腿、流程图）
- 立体几何最大/最小（能装几个立方体）

### 📝 复习步骤

1. **过一遍策略**：读本报告每一类的"🧭 解题策略"，把心法记下来
2. **分类刷题**：用项目里的"🎨 盘古竞赛"页面，筛选 AK4 一个类一个类过
3. **错题集中**：答错的题进"错题本"，一周后再做
4. **真题模拟**：按年份整套做，训练 60 分钟内完成的节奏

### ⏱️ 考试节奏

- **初赛 60 分钟 12 题** → 平均每题 5 分钟
- **决赛 60 分钟 10 题** → 平均每题 6 分钟
- 读题 + 做题 + 检查都算进去
- 遇到卡壳的 1-2 星题直接跳过（可能是陷阱题），回头再看
`;
} else {
    md += `按本报告的分类系统刷题，每周集中攻克一类。\n`;
}

const outFile = `KNOWLEDGE_POINTS_AK${targetGrade}.md`;
fs.writeFileSync(path.join(__dirname, '..', outFile), md, 'utf8');
console.log(`✓ Wrote ${outFile} (${(md.length/1024).toFixed(1)} KB, ${md.split('\n').length} lines)`);
console.log(`\n=== AK${targetGrade} knowledge points by category ===`);
activeMetasPairs.forEach(({ meta, clusters, totalInTopic }) => {
    console.log(`${meta.emoji} ${meta.label.padEnd(16)} ${String(totalInTopic).padStart(3)}题 · ${Object.keys(clusters).length} 核心知识点`);
});
