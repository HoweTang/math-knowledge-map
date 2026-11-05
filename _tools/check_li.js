// 体检：li-data.js（李永乐讲次 + 匹配表）和 li-study-*.js（学习单元 + 练习）
//   - 结构：52 个知识点各归属一个单元；单元里的讲次引用都存在；PDF 文件真的在磁盘上
//   - 题目：选择题 5 个互异选项、答案字母合法；有 chk 的题用代码重新算一遍答案
//   - 盘古真题 ID 都能在 pangu-data.js 里找到
// 用法：node _tools/check_li.js        （全部输出同时写到 _tools/check_li_out.txt，终端不稳定时查看它）
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const out = [];
const log = s => { out.push(s); };
let errors = 0, warns = 0;
const err = s => { errors++; log('✗ ' + s); };
const warn = s => { warns++; log('! ' + s); };

// ---- 加载数据到沙盒 ----
const H = {
    perms(a) {
        if (a.length <= 1) return [a.slice()];
        const r = [];
        a.forEach((x, i) => H.perms(a.slice(0, i).concat(a.slice(i + 1))).forEach(p => r.push([x].concat(p))));
        return r;
    },
    max: a => a.reduce((x, y) => (y > x ? y : x), -Infinity),
    min: a => a.reduce((x, y) => (y < x ? y : x), Infinity),
    range: (a, b) => Array.from({ length: b - a }, (_, i) => a + i),
    gcd: (a, b) => (b ? H.gcd(b, a % b) : a),
};
const ctx = { window: {}, H, console, Math };
ctx.window = ctx;
vm.createContext(ctx);
function load(file, tail) {
    const src = fs.readFileSync(path.join(ROOT, file), 'utf8') + (tail || '');
    vm.runInContext(src, ctx, { filename: file });
}
load('li-data.js', ';this.liLectures=liLectures;this.liLectureMap=liLectureMap;this.liAk4Map=liAk4Map;this.liAk4Extras=liAk4Extras;this.liExams=liExams;this.liAk4Cats=liAk4Cats;');
load('pangu-data.js', ';this.panguProblemMap=panguProblemMap;');
const studyFiles = fs.readdirSync(ROOT).filter(f => /^li-study-\d+\.js$/.test(f)).sort();
for (const f of studyFiles) {
    try { load(f); } catch (e) { err(`${f} 加载失败: ${e.message}`); }
}
const units = ctx.LI_UNITS || [];
const { liLectureMap, liAk4Map, liAk4Extras, panguProblemMap } = ctx;

// ---- 1. 匹配表 ----
log(`讲次 ${ctx.liLectures.length}，知识点 ${liAk4Map.length}，额外考点 ${liAk4Extras.length}，学习单元 ${units.length}（文件 ${studyFiles.join(', ') || '无'}）`);
for (const l of ctx.liLectures) {
    for (const k of ['handout', 'exercise', 'answer']) {
        if (l[k] && !fs.existsSync(path.join(ROOT, l[k].path))) err(`文件不存在: ${l.id} ${k} ${l[k].path}`);
    }
}
const lvCount = [0, 0, 0, 0];
liAk4Map.forEach(p => lvCount[p.level]++);
log(`匹配强度：直接对应 ${lvCount[3]}，部分对应 ${lvCount[2]}，间接/延伸 ${lvCount[1]}，缺口 ${lvCount[0]}`);
liAk4Map.forEach(p => {
    if (p.level >= 2 && !p.links.some(l => l.role === 'core')) warn(`知识点 ${p.n} ${p.name} 强度 ${p.level} 但没有 core 链接`);
    if (p.level === 0 && !p.note) warn(`知识点 ${p.n} 是缺口但没写说明`);
});

// ---- 2. 单元 ----
const unitIds = new Set();
const pointOwner = {};
let totalProblems = 0, withChk = 0, mcq = 0;
for (const u of units) {
    if (unitIds.has(u.id)) err(`单元 id 重复 ${u.id}`);
    unitIds.add(u.id);
    for (const k of ['title', 'essence', 'li', 'pangu', 'steps', 'demo', 'problems', 'points']) if (!u[k]) err(`${u.id} 缺少 ${k}`);
    (u.points || []).forEach(n => {
        if (pointOwner[n]) err(`知识点 ${n} 同时属于 ${pointOwner[n]} 和 ${u.id}`);
        pointOwner[n] = u.id;
        const m = liAk4Map.find(p => p.n === n);
        if (!m) err(`${u.id}: 不存在的知识点 ${n}`);
        else if (m.unit !== u.id) err(`知识点 ${n} 在匹配表里属于 ${m.unit}，但在 ${u.id} 里声明`);
    });
    (u.li || []).forEach(x => { if (!liLectureMap[x.ref]) err(`${u.id}: 讲次 ${x.ref} 不存在`); });
    (u.ids || []).forEach(id => { if (!panguProblemMap[id]) err(`${u.id}: 盘古真题 ${id} 不存在`); });
    if (u.demo && (!u.demo.q || !u.demo.steps || !u.demo.a)) err(`${u.id}: demo 不完整`);
    const lvs = {};
    (u.problems || []).forEach((p, i) => {
        const tag = `${u.id} 第${i + 1}题`;
        totalProblems++;
        lvs[p.lv] = (lvs[p.lv] || 0) + 1;
        if (![1, 2, 3].includes(p.lv)) err(`${tag}: lv 非法`);
        if (!p.q || !p.why) err(`${tag}: 缺 q 或 why`);
        if (p.opts) {
            mcq++;
            if (p.opts.length !== 5) err(`${tag}: 选项数 ${p.opts.length} ≠ 5`);
            if (new Set(p.opts.map(String)).size !== p.opts.length) err(`${tag}: 选项重复`);
            if (!/^[a-e]$/.test(p.a)) err(`${tag}: 答案字母非法 ${p.a}`);
        } else if (!p.a) err(`${tag}: 缺答案`);
        if (p.chk) {
            withChk++;
            let v;
            try { v = p.chk(); } catch (e) { err(`${tag}: chk 抛错 ${e.message}`); return; }
            const norm = s => String(s).replace(/\s+/g, '');
            const matches = t => {
                const a = norm(t), b = norm(v);
                return a === b || (a.startsWith(b) && !/[0-9.]/.test(a[b.length] || ''));
            };
            if (p.opts) {
                const idx = p.opts.map((o, i) => matches(o) ? i : -1).filter(i => i >= 0);
                const ai = 'abcde'.indexOf(p.a);
                if (idx.length !== 1) err(`${tag}: chk=${v} 匹配到 ${idx.length} 个选项 ${JSON.stringify(p.opts)}`);
                else if (idx[0] !== ai) err(`${tag}: 声明答案 ${p.a} 但 chk=${v} 对应 ${'abcde'[idx[0]]}`);
            } else if (!matches(p.a)) err(`${tag}: 声明答案 ${p.a} 但 chk=${v}`);
        }
    });
    if (!lvs[1] || !lvs[2]) warn(`${u.id}: 缺少 lv1 或 lv2 题 ${JSON.stringify(lvs)}`);
}
// --partial：单元还没写完时，跳过"52 个知识点都有单元"的覆盖检查
if (!process.argv.includes('--partial')) {
    for (let n = 1; n <= 52; n++) if (!pointOwner[n]) err(`知识点 ${n} 没有被任何单元覆盖`);
    liAk4Map.forEach(p => { if (!unitIds.has(p.unit)) err(`知识点 ${p.n} 指向不存在的单元 ${p.unit}`); });
}
liAk4Extras.forEach(e => (e.pangu || []).forEach(id => { if (!panguProblemMap[id]) err(`额外考点 ${e.name}: 盘古真题 ${id} 不存在`); }));

log(`题目 ${totalProblems}（选择题 ${mcq}），带 chk 校验 ${withChk}（${totalProblems ? Math.round(withChk / totalProblems * 100) : 0}%）`);
log(errors ? `\n结果：${errors} 个错误，${warns} 个提醒` : `\n结果：通过（${warns} 个提醒）`);
fs.writeFileSync(path.join(__dirname, 'check_li_out.txt'), out.join('\n'), 'utf8');
console.log(out.join('\n'));
process.exit(errors ? 1 : 0);
