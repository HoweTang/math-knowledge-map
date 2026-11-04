/**
 * 学而思数据体检: node _tools/check_xes.js
 * 检查 xes-data.js / xes-cards.js (以及存在时的 xes-problems.js) 的一致性
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const ctx = {};
vm.createContext(ctx);
function load(file, exports) {
    const p = path.join(ROOT, file);
    if (!fs.existsSync(p)) return false;
    vm.runInContext(fs.readFileSync(p, 'utf8') + `\n;Object.assign(this,{${exports.join(',')}});`, ctx, { filename: file });
    return true;
}

let fail = 0, pass = 0;
function check(name, ok, detail) {
    if (ok) { pass++; }
    else { fail++; console.log('  ✗ ' + name + (detail ? '  → ' + detail : '')); }
}

load('data.js', ['knowledgeNodes']);
load('pangu-data.js', ['panguNodes', 'panguNodeMap']);
load('xes-data.js', ['xesLevels', 'xesLectures', 'xesLectureMap', 'xesChains', 'xesChainMap', 'xesLinks', 'xesMethods', 'xesMethodMap', 'xesCategoryNames']);
load('xes-cards.js', ['xesChainCards', 'xesMethodCards', 'xesRhythm', 'xesErrorCauses', 'xesLadderIntro']);
const hasProblems = load('xes-problems.js', ['xesProblems', 'xesProblemMap']);

const byKey = Object.fromEntries(ctx.xesLectures.map(l => [l.key, l]));

console.log('— 讲次与链 —');
check('238 讲', ctx.xesLectures.length === 238, String(ctx.xesLectures.length));
check('12 级', ctx.xesLevels.length === 12);
check('id 唯一', new Set(ctx.xesLectures.map(l => l.id)).size === ctx.xesLectures.length);
check('每讲都在至少一条链里', ctx.xesLectures.every(l => l.chains.length > 0));
check('每讲类别合法', ctx.xesLectures.every(l => ctx.xesCategoryNames[l.category]));
check('链内讲次 id 全部存在', ctx.xesChains.every(c => c.lectures.every(id => ctx.xesLectureMap[id])));
check('连线两端都存在', ctx.xesLinks.every(e => ctx.xesLectureMap[e.source] && ctx.xesLectureMap[e.target]));
check('前置边不成环', (() => {
    const adj = {};
    ctx.xesLinks.filter(e => e.type === 'prerequisite').forEach(e => (adj[e.source] = adj[e.source] || []).push(e.target));
    const color = {};
    let cyc = false;
    const dfs = u => { color[u] = 1; for (const v of adj[u] || []) { if (color[v] === 1) { cyc = true; return; } if (!color[v]) dfs(v); if (cyc) return; } color[u] = 2; };
    Object.keys(adj).forEach(u => { if (!color[u] && !cyc) dfs(u); });
    return !cyc;
})());
check('前置边方向: 级别不降', ctx.xesLinks.filter(e => e.type === 'prerequisite').every(e => {
    const a = ctx.xesLectureMap[e.source], b = ctx.xesLectureMap[e.target];
    return a.level <= b.level;
}), '存在由高级指向低级的前置边');

console.log('— 教学卡 —');
check('每条链都有教学卡', ctx.xesChains.every(c => ctx.xesChainCards[c.id]));
check('每个解题武器都有卡', ctx.xesMethods.every(m => ctx.xesMethodCards[m.id]));
for (const c of ctx.xesChains) {
    const card = ctx.xesChainCards[c.id];
    if (!card) continue;
    check(`[${c.id}] essence/ladder/pitfalls/askKid/variants/review 齐全`,
        card.essence && card.ladder && card.ladder.length === 3 && card.pitfalls.length >= 3 && card.askKid.length >= 4 && card.variants.length >= 2 && card.review);
    for (const st of card.ladder) {
        for (const k of st.lectures) {
            check(`[${c.id}] 台阶引用的讲次存在 ${k}`, !!byKey[k]);
            if (byKey[k]) check(`[${c.id}] ${k} 属于本链`, byKey[k].chains.includes(c.id), `${k} 的链: ${byKey[k].chains.join(',')}`);
        }
    }
    for (const v of card.variants) {
        check(`[${c.id}] 变式「${v.title}」有 3 道题且含 same`, v.skins.length === 3 && v.same && v.skins.every(s => s.q && s.a));
    }
}
check('三层台阶覆盖: 具体/图像/符号', ctx.xesChains.every(c => ctx.xesChainCards[c.id].ladder.map(s => s.stage).join() === '具体,图像,符号'));
check('节奏分钟合计 90', ctx.xesRhythm.steps.reduce((s, x) => s + x.min, 0) === 90);
check('错因 4 类', ctx.xesErrorCauses.length === 4);

console.log('— 与盘古 / 小学教材的关联 —');
const panguIds = new Set(ctx.panguNodes.map(n => n.id));
const elemIds = new Set(ctx.knowledgeNodes.map(n => n.id));
check('盘古关联 id 合法', ctx.xesLectures.every(l => l.pangu.every(p => panguIds.has(p))));
check('小学教材关联 id 合法', ctx.xesLectures.every(l => l.elementary.every(e => elemIds.has(e))));
const panguCovered = new Set(ctx.xesLectures.flatMap(l => l.pangu));
const panguMissing = [...panguIds].filter(id => !panguCovered.has(id));
check('15 个盘古主题都至少对应一讲', panguMissing.length === 0, panguMissing.join(','));

if (hasProblems) {
    console.log('— 例题 / 练习 —');
    const P = ctx.xesProblems;
    check('题目 id 唯一', new Set(P.map(p => p.id)).size === P.length);
    check('题目所属讲次存在', P.every(p => ctx.xesLectureMap[p.lecture]));
    check('题目有页码, 讲次有 PDF 文件', P.every(p => p.page > 0 && ctx.xesLectureMap[p.lecture] && ctx.xesLectureMap[p.lecture].file));
    check('题型合法', P.every(p => ['example', 'practice', 'challenge', 'peak'].includes(p.type)));
    check('练习题有答案的占比 >= 50%', (() => {
        const pr = P.filter(p => p.type === 'practice' || p.type === 'challenge');
        return !pr.length || pr.filter(p => p.answer).length / pr.length >= 0.5;
    })());
    check('题干非空', P.every(p => p.text && p.text.trim().length >= 4));
    check('题目 id 与讲次一致', P.every(p => {
        const l = ctx.xesLectureMap[p.lecture];
        return p.id.startsWith(`xesq_${String(l.level).padStart(2, '0')}_${String(l.no).padStart(2, '0')}_`);
    }));
    check('有答案的题记录了答案册页码', P.every(p => !p.answer || p.answerPage > 0));
    const lecIds = [...new Set(P.map(p => p.lecture))];
    check('每个提取过的讲至少有 3 道例题和 6 道练习', lecIds.every(id => {
        const ps = P.filter(p => p.lecture === id);
        return ps.filter(p => p.type === 'example').length >= 3 && ps.filter(p => p.type !== 'example').length >= 6;
    }), lecIds.filter(id => {
        const ps = P.filter(p => p.lecture === id);
        return !(ps.filter(p => p.type === 'example').length >= 3 && ps.filter(p => p.type !== 'example').length >= 6);
    }).join(','));
    check('题干里没有明显的 OCR 噪声残留 (APP扫码 / 二维码提示)', P.every(p => !/APP\s*扫码|扫码看讲解|拍照批改/.test(p.text)),
        P.filter(p => /APP\s*扫码|扫码看讲解|拍照批改/.test(p.text)).map(p => p.id).slice(0, 5).join(','));
    const byType = {};
    P.forEach(p => { byType[p.type] = (byType[p.type] || 0) + 1; });
    console.log('  共 ' + P.length + ' 题: ' + Object.entries(byType).map(([k, v]) => k + v).join(' '));
    console.log('  覆盖讲次: ' + new Set(P.map(p => p.lecture)).size);
}

console.log(`\n通过 ${pass} 项, 失败 ${fail} 项`);
process.exit(fail ? 1 : 0);
