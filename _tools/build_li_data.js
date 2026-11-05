// 生成 li-data.js：李永乐 讲次目录 + 盘古 AK4 知识点匹配
//   输入：_tools/li_catalog.json（python _tools/li_extract.py 生成）+ _tools/li_meta.js（手写匹配）
//   输出：li-data.js
// 用法：node _tools/build_li_data.js
const fs = require('fs');
const path = require('path');
const { AK4_CATS, AK4_MAP, AK4_EXTRAS, TITLE_OVERRIDES, TOPIC_OVERRIDES } = require('./li_meta.js');

const catalog = JSON.parse(fs.readFileSync(path.join(__dirname, 'li_catalog.json'), 'utf8'));

const INVIS = /[\u200b-\u200f\u202a-\u202e\u2060-\u2064\u2066-\u2069\ufeff]/g;
function cleanTitle(t) {
    if (!t) return '';
    let s = String(t).replace(INVIS, '');
    s = s.split(/（习题|（答案|\(习题|\(答案|售\s*后/)[0];
    s = s.replace(/竖式迷/g, '竖式谜');
    return s.replace(/[★☆\s]+$/g, '').trim();
}

// ---- 1. 先把每个年级的 讲义 / 习题 / 答案 按讲次号归拢 ----
const byGrade = {};
for (const g of [3, 4, 5, 6]) byGrade[g] = { handouts: [], ex: {}, ans: {} };
for (const it of catalog) {
    const G = byGrade[it.grade];
    if (!G) continue;
    if (it.kind === 'handout') G.handouts.push(it);
    else if (it.kind === 'exercise' && it.key != null) G.ex[it.key] = it;
    else if (it.kind === 'answer' && it.key != null) G.ans[it.key] = it;
}

const lectures = [];
for (const g of [3, 4, 5, 6]) {
    const G = byGrade[g];
    const nums = new Set();
    Object.keys(G.ex).forEach(k => nums.add(+k));
    Object.keys(G.ans).forEach(k => nums.add(+k));
    for (const h of G.handouts) {
        if (h.extra && h.extra.from != null) for (let n = h.extra.from; n <= (h.extra.to || h.extra.from); n++) nums.add(n);
    }
    for (const no of [...nums].sort((a, b) => a - b)) {
        // 同一讲有多份讲义时，取覆盖范围最大的
        const cand = G.handouts
            .filter(h => h.extra && h.extra.from != null && no >= h.extra.from && no <= (h.extra.to || h.extra.from))
            .sort((a, b) => (b.extra.to - b.extra.from) - (a.extra.to - a.extra.from) || b.pages - a.pages);
        const h = cand[0] || null;
        const ex = G.ex[no] || null;
        const an = G.ans[no] || null;
        const id = `${g}-${no}`;
        const title = TITLE_OVERRIDES[id] || cleanTitle(ex && ex.extra) || cleanTitle(an && an.extra) || `第${no}讲`;
        const ov = TOPIC_OVERRIDES[id];
        lectures.push({
            id, grade: g, no, title,
            topicNo: h ? h.key : (ov ? ov.topicNo : null),
            topic: h ? cleanTitle(h.extra.title) : (ov ? ov.topic : null),
            handout: h ? { path: h.path, pages: h.pages } : null,
            exercise: ex ? { path: ex.path, pages: ex.pages } : null,
            answer: an ? { path: an.path } : null,
        });
    }
}
const lecMap = Object.fromEntries(lectures.map(l => [l.id, l]));

// ---- 2. 校验匹配表里的引用 ----
const errors = [];
function chk(ref, where) {
    if (!lecMap[ref]) errors.push(`${where}: 找不到讲次 ${ref}`);
}
const seenN = new Set();
for (const p of AK4_MAP) {
    if (seenN.has(p.n)) errors.push(`知识点编号重复 ${p.n}`);
    seenN.add(p.n);
    if (!AK4_CATS[p.cat]) errors.push(`知识点 ${p.n}: 未知类别 ${p.cat}`);
    for (const [ref] of p.links) chk(ref, `知识点 ${p.n} ${p.name}`);
}
for (let n = 1; n <= 52; n++) if (!seenN.has(n)) errors.push(`缺少知识点 ${n}`);
for (const e of AK4_EXTRAS) for (const [ref] of e.links) chk(ref, `额外考点 ${e.name}`);
if (errors.length) {
    console.error('匹配表有错误：\n' + errors.join('\n'));
    process.exit(1);
}

// ---- 3. 只保留需要的讲次：三、四年级全部 + 被引用的五、六年级 ----
const referenced = new Set();
AK4_MAP.forEach(p => p.links.forEach(l => referenced.add(l[0])));
AK4_EXTRAS.forEach(e => e.links.forEach(l => referenced.add(l[0])));
const keep = lectures.filter(l => l.grade <= 4 || referenced.has(l.id));

const map = AK4_MAP.map(p => ({
    n: p.n, cat: p.cat, name: p.name, unit: p.unit, level: p.level,
    note: p.note || '',
    links: p.links.map(([ref, role, why]) => ({ ref, role, why })),
}));
const extras = AK4_EXTRAS.map(e => ({
    name: e.name, pangu: e.pangu,
    links: e.links.map(([ref, role, why]) => ({ ref, role, why })),
}));
const exams = catalog
    .filter(it => (it.kind === 'exam' || it.kind === 'final') && (it.grade === 3 || it.grade === 4))
    .map(it => ({ grade: it.grade, kind: it.kind, name: it.name.replace(INVIS, '').trim(), path: it.path, pages: it.pages }));

const header = `// 自动生成，请勿手改：node _tools/build_li_data.js
// 来源：_tools/li_catalog.json（python _tools/li_extract.py）+ _tools/li_meta.js（手写匹配）
// 讲次引用格式 '<年级>-<讲次号>'，如 '4-47' = 四年级第47讲
`;
const body = [
    `const liGradeName = { 3: '三年级', 4: '四年级', 5: '五年级', 6: '六年级' };`,
    `const liAk4Cats = ${JSON.stringify(AK4_CATS)};`,
    `const liLectures = ${JSON.stringify(keep)};`,
    `const liLectureMap = Object.fromEntries(liLectures.map(l => [l.id, l]));`,
    `const liAk4Map = ${JSON.stringify(map)};`,
    `const liAk4Extras = ${JSON.stringify(extras)};`,
    `const liExams = ${JSON.stringify(exams)};`,
].join('\n\n');
fs.writeFileSync(path.join(__dirname, '..', 'li-data.js'), header + '\n' + body + '\n', 'utf8');

const g4 = keep.filter(l => l.grade === 4).length, g3 = keep.filter(l => l.grade === 3).length;
console.log(`li-data.js 已生成：讲次 ${keep.length}（三年级 ${g3}、四年级 ${g4}、五六年级引用 ${keep.length - g3 - g4}），知识点 ${map.length}，额外考点 ${extras.length}，试卷 ${exams.length}`);
