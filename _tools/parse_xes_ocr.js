/**
 * 把 OCR 结果 (_tools/xes_ocr/*.json) 解析成题目数据 xes-problems.js
 *
 * 讲义版式 (每讲约 32 页):  知识导引 → 知识点梳理 → 好方法 1..6 (典题精讲【例N】+ 思维导图 + 【解析】,
 *   然后「举一反三」练习N、「挑战自我」练习N) → 末尾「探索知识巅峰」
 * 参考答案册版式:  第N讲 标题 → 练习N 【答案】… 【解析】… (双栏, OCR 时已按栏拆开)
 *
 * 用法:  node _tools/parse_xes_ocr.js
 * 输出:  xes-problems.js   (xesProblems, xesProblemMap, xesLectureNotes, xesOcrMeta, 辅助函数)
 *
 * 注意: 文字来自 OCR, 图形/插图里的内容读不出来, 个别字会认错 (如「兔」→「免」)。
 *       本脚本只做保守的纠错; 页面上始终提供「打开原书 PDF 第 N 页」的链接用于核对。
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const OCR_DIR = path.join(__dirname, 'xes_ocr');
const OUT = path.join(ROOT, 'xes-problems.js');

// ---------- 讲次索引 (来自 xes-data.js) ----------
const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'xes-data.js'), 'utf8') + ';this.__L=xesLectures;this.__LV=xesLevels;', ctx);
const LECTURE = {};
ctx.__L.forEach(l => { LECTURE[`${l.level}-${l.no}`] = l; });

// ---------- 文本清理 ----------
function clean(s) {
    return s
        // 书页边上的「APP 扫码看讲解 / 拍照批改 秒判对错」二维码提示, 有时被并进题干末尾 (含被截断的「APP打」「AP」「看讲角」)
        .replace(/\s*APP\s*(?:扫码)?(?:观看知识点典题精讲|看讲解|拍照批改|秒判对错|打)?/g, ' ')
        .replace(/\s*(?:看讲[解角]|拍照批改|秒判对错|扫码看讲解)/g, ' ')
        .replace(/\s+AP\s*$/, '')
        // 加号常被识别成「十」: 2十3 / (5-1)十6
        .replace(/(?<=[\d)）])\s*十\s*(?=[\d(（])/g, '+')
        // 常见的形近字误识 (这些词在小学数学里不可能是原文)
        .replace(/[革萃]果/g, '苹果').replace(/楼桃/g, '樱桃')
        // 乘号: 2X2 / 4×X / (a)X(b)
        .replace(/(?<=[\d)）])\s*[XＸ]\s*(?=[\d(（])/g, '×')
        .replace(/(?<=\d)\s*x\s*(?=\d)/g, '×')
        // 减号被识别成「一」或破折号
        .replace(/(?<=[\d)）])\s*[一—―－]\s*(?=[\d(（])/g, '−')
        // 常见的「兔」→「免」误识 (只在有把握的语境里改)
        .replace(/鸡免/g, '鸡兔')
        .replace(/免(?=子|只|同笼|的只数)/g, '兔')
        .replace(/(?<=给|成|是|看作|画成|全是|全部|换成|变成|共有|和|与|、)免(?=[，。、；：？！\s]|$)/g, '兔')
        .replace(/\s+/g, ' ')
        // 汉字之间不留空格
        .replace(/(?<=[\u4e00-\u9fff，。；：？！、）”])\s+(?=[\u4e00-\u9fff（“])/g, '')
        .trim();
}
const isNoise = t =>
    /^(APP|扫码|看讲解|拍照批改|秒判对错|学习笔记)/.test(t) ||
    /^(APP\s*)?扫码(看讲解|观看知识点典题精讲)?$/.test(t) ||
    /公众号|微信[:：]/.test(t);

// 图示里的数字标签 / 圆圈 (如「6 6 6 6 2 2」「O O O」) 被 OCR 成一行, 没有信息量
const isFigureLabel = t => /^[O○0-9\s\-]+$/.test(t) && t.trim().split(/\s+/).length >= 3 && !/[=＝]/.test(t);

function joinParts(parts) {
    // 同一段内换行不加空格; 若两侧都是字母数字 (如 x 与 5) 保留一个空格
    let out = '';
    for (const p of parts) {
        if (!out) { out = p; continue; }
        const a = out[out.length - 1], b = p[0];
        out += (/[A-Za-z0-9]/.test(a) && /[A-Za-z]/.test(b)) ? ' ' + p : p;
    }
    return out;
}

// ---------- 解析一讲 ----------
function parseLecture(data, lec) {
    const pages = Object.keys(data.pages).map(Number).sort((a, b) => a - b);
    const problems = [];
    const notes = { intro: '', summary: [], methods: [] };
    let cur = null, mode = 'none', method = null, challenge = false, headCount = 0, lastPractice = 0, stop = false;

    const closeCur = () => { cur = null; };
    const startProblem = (type, num, page, rest, scoreRef) => {
        cur = { type, num, page, method: method ? method.no : null, parts: [], sol: [], scores: [] };
        if (rest) cur.parts.push(rest);
        problems.push(cur);
        mode = 'stem';
    };

    for (const pg of pages) {
        if (stop) break;
        for (const ln of data.pages[pg].lines) {
            let t = ln.text.trim();
            if (!t) continue;
            // 页眉页脚
            if (ln.y < 120 && (/^第\s*\d+\s*讲/.test(t) || /学而思秘籍\s*小学数学思维培养/.test(t))) continue;
            if (ln.y > 1090 && /^\d{1,3}$/.test(t)) continue;
            // 书末广告 / 顾问介绍
            // (「大家一起来求和！」这类题干不能算广告, 所以只认广告页上的「大家一起来“升级”」)
            if (/学而思秘籍系列图书|^顾问介绍|^大家一起来\s*[“"”]?\s*升级/.test(t)) { stop = true; break; }

            let m;
            // 真正的小节标题是单独一行「好方法N」; 目录页里的「好方法1 基础…/3」不算
            if ((m = t.match(/^好方法\s*(\d+)\s*$/))) {
                method = { no: Number(m[1]), title: '', hint: '' };
                notes.methods.push(method);
                mode = 'methodhead'; headCount = 0; closeCur();
                continue;
            }
            if (mode === 'methodhead') {
                if (/APP|扫码|典题精讲|^思维导图|^[【\[]|^练习|^知识/.test(t) || headCount >= 2) { mode = 'none'; }
                else { if (headCount === 0) method.title = clean(t); else method.hint = clean(t); headCount++; continue; }
            }
            if (/^典题精讲/.test(t)) { mode = 'none'; closeCur(); continue; }
            if ((m = t.match(/^[【\[]?\s*例\s*(\d+)\s*[】\]]?\s*(.*)$/)) && /^[【\[]/.test(t) || (m = t.match(/^例\s*(\d+)\s*[】\]]\s*(.*)$/))) {
                startProblem('example', Number(m[1]), pg, m[2]);
                continue;
            }
            if (/^思维导图/.test(t)) { mode = 'ignore'; continue; }
            if ((m = t.match(/^[【\[]?\s*解析\s*[】\]]\s*(.*)$/)) || (m = t.match(/^解析[:：]?\s*(.*)$/))) {
                if (cur && cur.type === 'example') { mode = 'solution'; if (m[1]) cur.sol.push(m[1]); }
                else mode = 'ignore';
                continue;
            }
            if (/^举一反三/.test(t)) { challenge = false; closeCur(); mode = 'none'; continue; }
            if (/^挑战自我/.test(t)) { challenge = true; closeCur(); mode = 'none'; continue; }
            if ((m = t.match(/^练习\s*(\d+)\s*(.*)$/))) {
                lastPractice = Number(m[1]);
                startProblem(challenge ? 'challenge' : 'practice', lastPractice, pg, m[2]);
                continue;
            }
            if (/^探索知识巅峰/.test(t)) {
                lastPractice += 1;
                startProblem('peak', lastPractice, pg, t.replace(/^探索知识巅峰\s*(拍照批改\s*秒判对错)?/, ''));
                continue;
            }
            if (/^学习笔记/.test(t)) { mode = 'ignore'; closeCur(); continue; }
            if (/^知识导引/.test(t)) { mode = 'intro'; closeCur(); continue; }
            if (/^知识点梳理/.test(t)) { mode = 'summary'; closeCur(); continue; }
            if (isNoise(t)) { if (mode === 'stem') mode = 'none'; continue; }

            switch (mode) {
                case 'stem': if (cur) { cur.parts.push(t); cur.scores.push(ln.score); } break;
                case 'solution':
                    // 插图里的零碎数字 / 单字不要
                    if (cur && (t.length > 3 || /[=＝]/.test(t)) && !isFigureLabel(t)) cur.sol.push(t);
                    break;
                case 'intro': notes.intro += t; break;
                case 'summary': notes.summary.push(clean(t)); break;
                default: break;
            }
        }
    }

    // 整理
    const out = [];
    for (const p of problems) {
        const text = clean(joinParts(p.parts));
        if (text.length < 4) continue;
        let solution = clean(joinParts(p.sol))
            .replace(/(?=方法[一二三四五六七八九十]：)/g, '\n')
            .replace(/；(?=[（(]\d[）)])/g, '；\n');
        if (solution.length > 900) solution = solution.slice(0, 900) + '…';
        const avg = p.scores.length ? p.scores.reduce((a, b) => a + b, 0) / p.scores.length : 1;
        const meth = p.method ? notes.methods.find(x => x.no === p.method) : null;
        out.push({
            type: p.type, num: p.num, page: p.page, text, solution,
            method: p.method, methodTitle: meth ? meth.title : '', methodHint: meth ? meth.hint : '',
            // 依赖插图的题: 题干里提到图, 或者题干短得只剩一句指令 (如「换一换，填一填。」, 内容全在图里)
            hasFigure: /如图|下图|右图|左图|上图|图中|所示|图\d|右边的图|观察.{0,6}图|看图/.test(text) || text.replace(/[^\u4e00-\u9fffA-Za-z0-9]/g, '').length <= 14,
            // 分数 / 竖式在 OCR 里经常丢 (「占全部的，」「是舵鸟的，」), 这类句式也标成识别不确定
            lowConfidence: avg < 0.9 || /(是|占|为|等于|相当于|分到的|比)[^，。；？]{0,8}的\s*[，。；？]/.test(text)
        });
    }
    return { problems: out, notes };
}

// ---------- 解析参考答案册 ----------
// 答案与解析有时在同一行 (「11根。【解析根据最不利原则…」), 把它们拆开
function addAnswerText(rec, text) {
    const m = text.match(/[【\[]\s*解析\s*[】\]]?/);
    if (!m) { rec.answerParts.push(text); return; }
    const before = text.slice(0, m.index).trim(), after = text.slice(m.index + m[0].length).trim();
    if (before) rec.answerParts.push(before);
    if (after) rec.solParts.push(after);
    rec.inSolution = true;
}
function parseAnswers(data) {
    const res = {};  // lectureNo -> key -> {answer, solution, page}
    const pages = Object.keys(data.pages).map(Number).sort((a, b) => a - b);
    let lec = null, key = null, mode = 'none', rec = null, pendingLabel = null, labelSeen = false;
    const finish = () => { rec = null; };
    for (const pg of pages) {
        for (const ln of data.pages[pg].lines) {
            let t = ln.text.trim();
            if (!t) continue;
            if (/^参考答案$|^ANSWERS$|学而思秘籍\s*小学数学思维培养|公众号|微信[:：]/.test(t)) continue;
            if (/^\d{1,3}$/.test(t)) continue;
            let m;
            if ((m = t.match(/第\s*(\d{1,2})\s*讲/))) {
                lec = Number(m[1]); key = null; finish(); mode = 'none'; labelSeen = false;
                t = t.replace(/第\s*\d{1,2}\s*讲[^【]*/, '').trim();
                if (!t) continue;
            }
            if (lec == null) continue;
            // 跨栏的 OCR 片段会把右栏顶部的「练习N」标签并进左栏末行 (如「…164—|练习17」)。
            // 标签从行内摘掉, 右栏第一个【答案】前补上
            if (!/^练习/.test(t) && (m = t.match(/^(.*?)\s*[|｜]?\s*练习\s*(\d+)\s*(.*)$/)) && m[1].trim()) {
                pendingLabel = String(Number(m[2]));
                t = (m[1] + m[3]).trim();
            }
            if (pendingLabel && ln.col === 1 && /^[【\[]?\s*答案/.test(t)) {
                key = pendingLabel; finish(); mode = 'none'; pendingLabel = null; labelSeen = true;
            }
            if ((m = t.match(/^练习\s*(\d+)\s*(.*)$/))) {
                key = String(Number(m[1])); finish(); mode = 'none'; pendingLabel = null; labelSeen = true;
                t = m[2].trim();
                if (!t) continue;
            } else if (/^探索知识巅峰/.test(t)) {
                key = 'peak'; finish(); mode = 'none'; labelSeen = true;
                t = t.replace(/^探索知识巅峰/, '').trim();
                if (!t) continue;
            }
            if (key == null) continue;
            if ((m = t.match(/^[【\[]?\s*答案\s*[】\]]\s*(.*)$/))) {
                res[lec] = res[lec] || {};
                if (res[lec][key]) {
                    // 这个编号已经有答案了:
                    //  - 刚读到的不是「练习N」标签 → 标签漏识别, 这条应该是下一题
                    //  - 刚读到的是标签 → 多半是后面某一讲 (标题没识别出来) 的同号练习, 不能覆盖已有答案, 整条跳过
                    if (!labelSeen && /^\d+$/.test(key)) key = String(Number(key) + 1);
                    if (res[lec][key]) { rec = null; mode = 'none'; labelSeen = false; continue; }
                }
                labelSeen = false;
                rec = res[lec][key] = { answerParts: [], solParts: [], page: pg };
                mode = 'answer';
                if (m[1]) addAnswerText(rec, m[1]);
                if (rec.inSolution) mode = 'solution';
                continue;
            }
            // 「【解析」的右括号偶尔识别不出来, 所以只要求左括号
            if ((m = t.match(/^[【\[]\s*解析\s*[】\]]?\s*(.*)$/)) || (m = t.match(/^解析\s*[】\]]\s*(.*)$/))) {
                if (rec) { mode = 'solution'; if (m[1]) rec.solParts.push(m[1]); }
                continue;
            }
            if (!rec) continue;
            if (isFigureLabel(t)) continue;
            if (mode === 'answer') { addAnswerText(rec, t); if (rec.inSolution) mode = 'solution'; }
            else if (mode === 'solution') rec.solParts.push(t);
        }
    }
    for (const l of Object.keys(res)) {
        for (const k of Object.keys(res[l])) {
            const r = res[l][k];
            r.answer = clean(joinParts(r.answerParts));
            r.solution = clean(joinParts(r.solParts));
            if (r.solution.length > 700) r.solution = r.solution.slice(0, 700) + '…';
            delete r.answerParts; delete r.solParts; delete r.inSolution;
        }
    }
    return res;
}

// ---------- 主流程 ----------
const files = fs.existsSync(OCR_DIR) ? fs.readdirSync(OCR_DIR).filter(f => f.endsWith('.json')) : [];
const answers = {};   // level -> lectureNo -> key -> rec
files.filter(f => /^A\d+\.json$/.test(f)).forEach(f => {
    const d = JSON.parse(fs.readFileSync(path.join(OCR_DIR, f), 'utf8'));
    answers[d.level] = parseAnswers(d);
});

const problems = [];
const notesById = {};
const covered = [];
const KIND = { example: 'e', practice: 'p', challenge: 'c', peak: 'k' };

files.filter(f => /^L\d+_\d+\.json$/.test(f)).sort().forEach(f => {
    const d = JSON.parse(fs.readFileSync(path.join(OCR_DIR, f), 'utf8'));
    const lec = LECTURE[`${d.level}-${d.no}`];
    if (!lec) { console.warn('跳过 (xes-data 里没有): ' + f); return; }
    const { problems: ps, notes } = parseLecture(d, lec);
    covered.push(lec.key);
    notesById[lec.id] = {
        intro: notes.intro, summary: notes.summary.filter(s => s.length > 1),
        methods: notes.methods.map(m => ({ no: m.no, title: m.title, hint: m.hint }))
    };
    const ans = (answers[d.level] || {})[d.no] || {};
    ps.forEach(p => {
        const a = p.type === 'example' ? null : (ans[p.type === 'peak' ? 'peak' : String(p.num)] || null);
        problems.push({
            id: `xesq_${String(d.level).padStart(2, '0')}_${String(d.no).padStart(2, '0')}_${KIND[p.type]}${p.num}`,
            lecture: lec.id, type: p.type, num: p.num, method: p.method, methodTitle: p.methodTitle, methodHint: p.methodHint,
            page: p.page, text: p.text,
            solution: p.type === 'example' ? p.solution : (a ? a.solution : ''),
            answer: a ? a.answer : '',
            answerPage: a ? a.page : null,
            hasFigure: p.hasFigure,
            // 答案册里的分数同样会丢, 答案以标点开头 / 夹着度数符号之类的多半是残缺的
            lowConfidence: p.lowConfidence || (!!a && /^[，,、；;\s]|[°′]/.test(a.answer))
        });
    });
});

// 去重 (同一讲里同类型同编号只保留第一道)
const seen = new Set();
let unique = problems.filter(p => { if (seen.has(p.id)) return false; seen.add(p.id); return true; });

// ---------- 人工校正 (_tools/xes_ocr_fixes.json) ----------
// OCR 读不出插图里的字 (如 蛐蛐 的「蛐」) 或把表格认成乱码时, 在这里逐题纠正, 重跑解析器不会丢。
// 格式: { "<题目id>": { "text": "整段替换", "textReplace": [["旧","新"]], "solution": "...", "solutionReplace": [[...]],
//                       "answer": "...", "drop": true, "note": "说明" } }
const FIXES_FILE = path.join(__dirname, 'xes_ocr_fixes.json');
let fixCount = 0;
if (fs.existsSync(FIXES_FILE)) {
    const fixes = JSON.parse(fs.readFileSync(FIXES_FILE, 'utf8'));
    const byId = new Map(unique.map(p => [p.id, p]));
    for (const [id, fx] of Object.entries(fixes)) {
        if (id.startsWith('_')) continue;
        // "lecture:xes_05_10": 整讲校正 (目前只支持 lowConfidence)
        if (id.startsWith('lecture:')) {
            const lid = id.slice(8);
            const hit = unique.filter(p => p.lecture === lid);
            if (!hit.length) { console.warn('  整讲校正对应的讲次没有题目: ' + id); continue; }
            if (fx.lowConfidence != null) hit.forEach(p => { p.lowConfidence = !!fx.lowConfidence; });
            fixCount++;
            continue;
        }
        const p = byId.get(id);
        if (!p) { console.warn('  校正对应的题目不存在 (OCR 数据里没有): ' + id); continue; }
        if (fx.drop) { p.__drop = true; fixCount++; continue; }
        for (const k of ['text', 'solution', 'answer']) if (typeof fx[k] === 'string') p[k] = fx[k];
        for (const [field, key] of [['text', 'textReplace'], ['solution', 'solutionReplace']]) {
            for (const [from, to] of fx[key] || []) {
                if (!p[field].includes(from)) { console.warn(`  校正没有命中 ${id}.${field}: ${from}`); continue; }
                p[field] = p[field].split(from).join(to);
            }
        }
        if (fx.hasFigure != null) p.hasFigure = fx.hasFigure;
        p.fixed = true;
        fixCount++;
    }
    unique = unique.filter(p => !p.__drop);
}

const stamp = new Date().toISOString().slice(0, 10);
const withAnswer = unique.filter(p => p.answer).length;
const byType = {};
unique.forEach(p => { byType[p.type] = (byType[p.type] || 0) + 1; });

let out = '';
out += `// ============= 学而思秘籍 · 例题与练习 (OCR 提取) =============\n`;
out += `// 由 _tools/parse_xes_ocr.js 根据 _tools/xes_ocr/*.json 自动生成 (${stamp}), 请勿手改\n`;
out += `// 文字来自对扫描 PDF 的 OCR: 插图内容读不出来, 个别字可能有误, 请以原书 PDF (page 字段) 为准\n\n`;
out += `const XES_PROBLEM_TYPES = { example: '例题', practice: '举一反三', challenge: '挑战自我', peak: '探索知识巅峰' };\n\n`;
out += `const xesProblems = [\n${unique.map(p => '    ' + JSON.stringify(p)).join(',\n')}\n];\n`;
out += `const xesProblemMap = Object.fromEntries(xesProblems.map(p => [p.id, p]));\n\n`;
out += `// 每讲的「知识导引 / 知识点梳理 / 好方法标题」\n`;
out += `const xesLectureNotes = ${JSON.stringify(notesById, null, 1)};\n\n`;
out += `const xesOcrMeta = ${JSON.stringify({ generated: stamp, lectures: covered, problems: unique.length, withAnswer, byType })};\n\n`;
out += `function xesProblemsForLecture(lectureId) { return xesProblems.filter(p => p.lecture === lectureId); }\n`;
out += `function xesHasProblems(lectureId) { return xesProblems.some(p => p.lecture === lectureId); }\n`;

fs.writeFileSync(OUT, out, 'utf8');
console.log(`已生成 ${path.relative(ROOT, OUT)} (${(out.length / 1024).toFixed(1)} KB)`);
console.log(`  讲次 ${covered.length} (${covered.join(', ')}) · 题目 ${unique.length} · 有答案 ${withAnswer}`);
console.log('  类型:', Object.entries(byType).map(([k, v]) => `${k}${v}`).join(' '));
console.log('  人工校正:', fixCount);

// 同样的信息写成 UTF-8 文本, 免得 Windows 控制台编码把中文弄乱
{
    const lines = [];
    const byLec = {};
    unique.forEach(p => { (byLec[p.lecture] = byLec[p.lecture] || []).push(p); });
    lines.push(`题目 ${unique.length} · 讲次 ${covered.length} · 有答案 ${withAnswer} · 人工校正 ${fixCount}`);
    Object.entries(byLec).forEach(([id, ps]) => {
        const l = ctx.__L.find(x => x.id === id);
        const noAns = ps.filter(p => p.type !== 'example' && !p.answer).map(p => `${p.type[0]}${p.num}`);
        const noSol = ps.filter(p => p.type === 'example' && !p.solution).map(p => `e${p.num}`);
        lines.push(`${l.key} ${l.title}: ${ps.length} 题 (含图 ${ps.filter(p => p.hasFigure).length}, 低置信 ${ps.filter(p => p.lowConfidence).length}) 缺答案[${noAns.join(' ')}] 例题缺解析[${noSol.join(' ')}]`);
    });
    fs.writeFileSync(path.join(OCR_DIR, 'parse_report.txt'), lines.join('\n') + '\n', 'utf8');
}
console.log('  低置信度:', unique.filter(p => p.lowConfidence).length, ' 含图:', unique.filter(p => p.hasFigure).length);
const noAns = unique.filter(p => p.type !== 'example' && !p.answer);
console.log('  练习类题目缺答案:', noAns.length, noAns.slice(0, 12).map(p => p.id).join(' '));
