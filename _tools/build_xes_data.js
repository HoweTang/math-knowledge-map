/**
 * 生成 xes-data.js (学而思秘籍 12 级 / 238 讲的结构化数据)
 *
 * 做的事:
 *   1. 扫描 学而思数学/ 目录, 解析 级 / 讲 / 标题 / 文件路径 / 参考答案 PDF
 *   2. 合并 _tools/xes_meta.js 里的人工元数据 (类别 / 方法 / 关联盘古主题 / 关联小学教材)
 *   3. 把知识链的"轨道"展开成前置边, 合并补充连线
 *   4. 交叉校验 (文件 <-> 元数据, 盘古 id, 小学教材 id, 链内讲次), 有问题直接报错退出
 *
 * 用法:  node _tools/build_xes_data.js
 * 输出:  xes-data.js  (全局变量, 供 xes.html / pangu.html 直接 <script> 引入)
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const meta = require('./xes_meta.js');

const ROOT = path.join(__dirname, '..');
const SRC_DIR = path.join(ROOT, '学而思数学');
const OUT = path.join(ROOT, 'xes-data.js');

// 原始文件名里的笔误, 在展示标题时修正 (文件路径保持原样)
const TITLE_FIX = {
    '字典排列法语树形图': '字典排列法与树形图',
    '包含于排除': '包含与排除'
};

const CATEGORY_NAMES = { calc: '计算', number: '数论', geometry: '几何', app: '应用题', count: '计数', fraction: '分数小数', travel: '行程', other: '其他' };
const CATEGORY_COLORS = { calc: '#E91E63', number: '#3F51B5', geometry: '#009688', app: '#FF5722', count: '#795548', fraction: '#FF9800', travel: '#8BC34A', other: '#9E9E9E' };

const errors = [];
const warnings = [];
const pad2 = n => String(n).padStart(2, '0');
const keyToId = key => { const [l, n] = key.split('-').map(Number); return `xes_${pad2(l)}_${pad2(n)}`; };

// ---------- 1. 扫描目录 ----------
const levelFolders = fs.readdirSync(SRC_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory() && /^\d+级/.test(d.name))
    .map(d => d.name)
    .sort((a, b) => parseInt(a) - parseInt(b));

const levels = [];
const lectures = [];

for (const folder of levelFolders) {
    const level = parseInt(folder);
    const files = fs.readdirSync(path.join(SRC_DIR, folder)).filter(f => f.toLowerCase().endsWith('.pdf'));
    let answerFile = null;
    const found = new Set();
    for (const f of files) {
        const rel = `学而思数学/${folder}/${f}`;
        const m = f.match(/第\s*(\d+)\s*讲\s*(.+?)\.pdf$/i);
        if (m) {
            const no = parseInt(m[1]);
            const rawTitle = m[2].trim();
            const title = TITLE_FIX[rawTitle] || rawTitle;
            const key = `${level}-${no}`;
            found.add(no);
            const mt = meta.lectureMeta[key];
            if (!mt) { errors.push(`缺少元数据: ${key} ${title}`); continue; }
            const [cat, ms, pg, el] = mt.split('|');
            lectures.push({
                id: keyToId(key), key, level, no, title,
                category: cat,
                methods: ms ? ms.split(',') : [],
                pangu: pg ? pg.split(',').map(x => 'pangu_' + x) : [],
                elementary: el ? el.split(',') : [],
                chains: [],
                file: rel
            });
        } else if (/参考答案/.test(f)) {
            answerFile = rel;
        } else {
            warnings.push(`未识别的文件: ${rel}`);
        }
    }
    const maxNo = Math.max(...found);
    const missing = [];
    for (let i = 1; i <= 20; i++) if (!found.has(i)) missing.push(i);
    const info = meta.levelInfo[level] || {};
    levels.push({
        level, name: `${level}级`, grade: info.grade || '', stage: info.stage || '',
        folder: `学而思数学/${folder}`, answerFile, lectureCount: found.size, missing
    });
}
lectures.sort((a, b) => a.level - b.level || a.no - b.no);
const byKey = Object.fromEntries(lectures.map(l => [l.key, l]));

// 元数据里有但目录里没有
for (const key of Object.keys(meta.lectureMeta)) if (!byKey[key]) errors.push(`元数据多余(无对应 PDF): ${key}`);

// ---------- 2. 校验关联 id ----------
function loadGlobals(file, expr) {
    const ctx = {};
    vm.createContext(ctx);
    vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8') + `;this.__out=(${expr});`, ctx);
    return ctx.__out;
}
const elemIds = new Set(loadGlobals('data.js', 'knowledgeNodes.map(n=>n.id)'));
const panguIds = new Set(loadGlobals('pangu-data.js', 'panguNodes.map(n=>n.id)'));
for (const l of lectures) {
    if (!CATEGORY_NAMES[l.category]) errors.push(`${l.key} 未知类别 ${l.category}`);
    l.methods.forEach(m => { if (!meta.methods.find(x => x.id === m)) errors.push(`${l.key} 未知方法码 ${m}`); });
    l.pangu.forEach(p => { if (!panguIds.has(p)) errors.push(`${l.key} 未知盘古主题 ${p}`); });
    l.elementary.forEach(e => { if (!elemIds.has(e)) errors.push(`${l.key} 未知小学教材节点 ${e}`); });
}

// ---------- 3. 链与边 ----------
const links = [];
const linkIndex = new Map();
function addLink(s, t, type, extra) {
    const k = `${s}>${t}>${type}`;
    if (linkIndex.has(k)) {
        const ex = linkIndex.get(k);
        if (extra.chain && !ex.chains.includes(extra.chain)) ex.chains.push(extra.chain);
        return;
    }
    const link = { source: s, target: t, type, chains: extra.chain ? [extra.chain] : [] };
    if (extra.label) link.label = extra.label;
    linkIndex.set(k, link);
    links.push(link);
}

const chains = meta.chains.map(c => {
    const memberKeys = [];
    const tracks = c.tracks.map(tr => {
        const ids = tr.lectures.map(key => {
            const l = byKey[key];
            if (!l) { errors.push(`链 ${c.id}/${tr.name} 引用不存在的讲次 ${key}`); return null; }
            if (!memberKeys.includes(key)) memberKeys.push(key);
            if (!l.chains.includes(c.id)) l.chains.push(c.id);
            return l.id;
        }).filter(Boolean);
        for (let i = 0; i + 1 < ids.length; i++) addLink(ids[i], ids[i + 1], 'prerequisite', { chain: c.id });
        return { name: tr.name, lectures: ids };
    });
    memberKeys.sort((a, b) => byKey[a].level - byKey[b].level || byKey[a].no - byKey[b].no);
    return {
        id: c.id, name: c.name, icon: c.icon, color: c.color,
        tracks,
        lectures: memberKeys.map(k => byKey[k].id)
    };
});

for (const [s, t, type, label] of meta.extraLinks) {
    if (!byKey[s] || !byKey[t]) { errors.push(`补充连线引用不存在的讲次: ${s} -> ${t}`); continue; }
    addLink(byKey[s].id, byKey[t].id, type, { label });
}

// 没进任何链的讲次: 允许, 但列出来
const orphan = lectures.filter(l => l.chains.length === 0);

// ---------- 4. 方法统计 ----------
const methodList = meta.methods.map(m => ({
    ...m,
    lectures: lectures.filter(l => l.methods.includes(m.id)).map(l => l.id)
}));

if (errors.length) {
    console.error('生成失败, 发现问题:');
    errors.forEach(e => console.error('  - ' + e));
    process.exit(1);
}

// ---------- 5. 输出 ----------
const stamp = new Date().toISOString().slice(0, 10);
let out = '';
out += `// ============= 学而思秘籍 · 小学数学思维培养 (2022 版) 12 级 / ${lectures.length} 讲 =============\n`;
out += `// 由 _tools/build_xes_data.js 自动生成 (${stamp}), 请勿手改; 修改 _tools/xes_meta.js 后重新运行即可\n`;
out += `// 全局变量: xesLevels, xesLectures, xesLectureMap, xesChains, xesChainMap, xesLinks, xesMethods, xesMethodMap,\n`;
out += `//           xesCategoryNames, xesCategoryColors\n\n`;

out += `const xesCategoryNames = ${JSON.stringify(CATEGORY_NAMES)};\n`;
out += `const xesCategoryColors = ${JSON.stringify(CATEGORY_COLORS)};\n\n`;

out += `// 每级一册, 每册 20 讲 (有的文件夹缺讲次见 missing); grade 为按"每级约 5 个月"推算的估计年级\n`;
out += `const xesLevels = [\n${levels.map(l => '    ' + JSON.stringify(l)).join(',\n')}\n];\n\n`;

out += `const xesLectures = [\n${lectures.map(l => '    ' + JSON.stringify(l)).join(',\n')}\n];\n`;
out += `const xesLectureMap = Object.fromEntries(xesLectures.map(l => [l.id, l]));\n\n`;

out += `// 知识链: tracks 为线性学习序列, lectures 为链内全部讲次 (按级别排序)\n`;
out += `const xesChains = [\n${chains.map(c => '    ' + JSON.stringify(c)).join(',\n')}\n];\n`;
out += `const xesChainMap = Object.fromEntries(xesChains.map(c => [c.id, c]));\n\n`;

out += `// 讲次之间的连线: prerequisite = 前置 (来自链的轨道顺序), related = 相关 (人工补充)\n`;
out += `const xesLinks = [\n${links.map(l => '    ' + JSON.stringify(l)).join(',\n')}\n];\n\n`;

out += `// 解题"武器": 跨主题的通用方法\n`;
out += `const xesMethods = [\n${methodList.map(m => '    ' + JSON.stringify(m)).join(',\n')}\n];\n`;
out += `const xesMethodMap = Object.fromEntries(xesMethods.map(m => [m.id, m]));\n\n`;

out += `// ---------- 辅助函数 ----------\n`;
out += `function xesLectureLabel(l) { return l.level + '级第' + l.no + '讲 ' + l.title; }\n`;
out += `// 某讲次关联的盘古主题 (直接标注)\n`;
out += `function xesPanguTopics(l) { return (l.pangu || []).map(id => (typeof panguNodeMap !== 'undefined' ? panguNodeMap[id] : null)).filter(Boolean); }\n`;
out += `// 某盘古主题对应的学而思讲次 (反查)\n`;
out += `function xesLecturesForPangu(panguId) { return xesLectures.filter(l => (l.pangu || []).includes(panguId)); }\n`;
out += `// 某小学教材节点对应的学而思讲次 (反查)\n`;
out += `function xesLecturesForElementary(elemId) { return xesLectures.filter(l => (l.elementary || []).includes(elemId)); }\n`;

fs.writeFileSync(OUT, out, 'utf8');

// ---------- 报告 ----------
const catCount = {};
lectures.forEach(l => { catCount[l.category] = (catCount[l.category] || 0) + 1; });
console.log(`已生成 ${path.relative(ROOT, OUT)} (${(out.length / 1024).toFixed(1)} KB)`);
console.log(`  级别 ${levels.length} · 讲次 ${lectures.length} · 链 ${chains.length} · 连线 ${links.length} · 方法 ${methodList.length}`);
console.log('  缺讲次:', levels.filter(l => l.missing.length).map(l => `${l.name}缺第${l.missing.join(',')}讲`).join('；') || '无');
console.log('  类别分布:', Object.entries(catCount).map(([k, v]) => `${CATEGORY_NAMES[k]}${v}`).join(' '));
console.log(`  未归入任何链的讲次: ${orphan.length}`);
orphan.forEach(l => console.log(`    - ${l.key} ${l.title}`));
if (warnings.length) { console.log('  警告:'); warnings.forEach(w => console.log('    - ' + w)); }
const multi = lectures.filter(l => l.chains.length > 1).length;
console.log(`  同时属于多条链的讲次: ${multi}`);
