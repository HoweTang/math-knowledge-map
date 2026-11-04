// ============= 学而思秘籍 · 题库 / 练习 / 错题本 =============
// 依赖: xes-data.js / xes-cards.js / xes-problems.js,
//       以及 xes-app.js 里的 esc / $ / loadJson / inRange / lecTag / showLecture / switchView / filterLevel /
//       levelColor / LEVEL_META / IN_PREREQ / currentView / levelRange / VIEW_RENDERERS
// 题目文字来自 OCR (xes-problems.js 由 _tools/parse_xes_ocr.js 生成), 插图读不出来, 页面上始终给出原书 PDF 页码用于核对。

// ---------- 做题记录 (localStorage) ----------
// { [题目id]: { attempted: 'correct'|'wrong'|null, starred, cause: 'read'|'concept'|'method'|'calc'|null, note, wrongCount, ts } }
const Q_KEY = 'xesQStatus_v1';
let xesQStatus = loadJson(Q_KEY, {});
const CAUSE_BY_ID = Object.fromEntries(xesErrorCauses.map(c => [c.id, c]));
const QTYPES = ['example', 'practice', 'challenge', 'peak'];
const qReveal = {};          // 题目 id -> { hint, answer, solution }, 只在本次打开页面期间有效
const Q_PAGE = 60;           // 题库一次渲染的题数

function saveQ() { try { localStorage.setItem(Q_KEY, JSON.stringify(xesQStatus)); } catch (e) { /* 隐私模式忽略 */ } }
function getQ(id) { return xesQStatus[id] || { attempted: null, starred: false, cause: null, note: '', wrongCount: 0, ts: 0 }; }
function putQ(id, q) {
    const empty = !q.attempted && !q.starred && !q.cause && !q.note && !q.wrongCount;
    if (empty) delete xesQStatus[id];
    else { q.ts = Date.now(); xesQStatus[id] = q; }
    saveQ();
}

// ---------- 题目的小工具 ----------
function problemLabel(p) {
    if (p.type === 'example') return '例' + p.num;
    if (p.type === 'peak') return '探索知识巅峰';
    return '练习' + p.num;
}
function typeLabel(p) { return XES_PROBLEM_TYPES[p.type] || p.type; }
function problemLecture(p) { return xesLectureMap[p.lecture]; }
function lecturePdfHref(p) { return encodeURI(problemLecture(p).file) + '#page=' + p.page; }
function answerPdfHref(p) {
    const a = LEVEL_META[problemLecture(p).level].answerFile;
    return a ? encodeURI(a) + (p.answerPage ? '#page=' + p.answerPage : '') : '';
}
function hasAnswer(p) { return p.type === 'example' ? !!p.solution : !!p.answer; }
function sortedLectures(ids) {
    return [...new Set(ids)].map(id => xesLectureMap[id]).sort((a, b) => a.level - b.level || a.no - b.no);
}
function lecturesWithProblems() { return sortedLectures(xesProblems.map(p => p.lecture)); }
function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
}
function groupByLecture(list) {
    const m = new Map();
    list.forEach(p => { if (!m.has(p.lecture)) m.set(p.lecture, []); m.get(p.lecture).push(p); });
    return sortedLectures([...m.keys()]).map(l => ({ lecture: l, items: m.get(l.id) }));
}
function ocrBanner() {
    const meta = typeof xesOcrMeta !== 'undefined' ? xesOcrMeta : { lectures: [], problems: 0, withAnswer: 0 };
    return `<div class="xes-note no-print">题目文字由 OCR 从扫描版 PDF 识别而来 (目前 <b>${meta.lectures.length}</b> 讲 / <b>${meta.problems}</b> 题,其中 <b>${meta.withAnswer}</b> 题带答案)。
        <b>图里的内容读不出来</b>,个别字可能认错,请对照每题的「原书 PDF 第 N 页」核对;发现错字可在 <code>_tools/xes_ocr_fixes.json</code> 里校正后重新生成。其余讲次请直接打开 PDF。</div>`;
}

// ---------- 记录操作 ----------
function setAttempted(id, v) {
    const q = getQ(id);
    if (q.attempted === v) {
        if (v === 'wrong') q.wrongCount = Math.max(0, (q.wrongCount || 0) - 1);
        q.attempted = null;
    } else {
        if (v === 'wrong') q.wrongCount = (q.wrongCount || 0) + 1;
        q.attempted = v;
    }
    putQ(id, q);
    afterQChange(id);
}
function toggleQStar(id) { const q = getQ(id); q.starred = !q.starred; putQ(id, q); afterQChange(id); }
function setCause(id, c) { const q = getQ(id); q.cause = q.cause === c ? null : c; putQ(id, q); afterQChange(id); }
function setNote(id, text) { const q = getQ(id); q.note = String(text || '').trim().slice(0, 300); putQ(id, q); }   // 失焦时保存, 不重绘, 免得打断输入
function toggleReveal(id, kind) {
    const rv = qReveal[id] = qReveal[id] || {};
    rv[kind] = !rv[kind];
    if (kind === 'solution' && rv.solution) rv.answer = rv.answer || xesProblemMap[id].type !== 'example';
    afterQChange(id, true);
}

function afterQChange(id, onlyReveal) {
    if (currentView === 'practice') { notePracticeVerdict(id); renderPractice(); return; }
    if (currentView === 'wrong' && !onlyReveal) { renderWrong(true); return; }
    refreshQCard(id);
    if (currentView === 'problems') updateLibSummary();
}
function refreshQCard(id) {
    const p = xesProblemMap[id];
    document.querySelectorAll(`[data-qid="${id}"]`).forEach(el => {
        const tmp = document.createElement('div');
        tmp.innerHTML = problemCardHtml(p, el.dataset.ctx || 'lib');
        el.replaceWith(tmp.firstElementChild);
    });
}

// ---------- 题目卡片 (题库 / 错题本共用) ----------
function flagsHtml(p) {
    let h = '';
    if (p.hasFigure) h += `<span class="xq-flag fig" title="题目里有图, OCR 读不出图的内容, 请对照原书">📐 含图</span>`;
    if (p.lowConfidence) h += `<span class="xq-flag low" title="识别置信度偏低, 可能有错字">🔎 识别不确定</span>`;
    if (p.fixed) h += `<span class="xq-flag fixed" title="已人工校正">✏️ 已校正</span>`;
    return h;
}
function hintTextFor(p) {
    const l = problemLecture(p);
    const parts = [];
    if (p.methodTitle) parts.push(`本题在书里属于「好方法 ${p.method} · ${p.methodTitle}」${p.methodHint ? ',提示: ' + p.methodHint : ''}`);
    if (l.methods.length) parts.push('这一讲常用的解题武器: ' + l.methods.map(m => xesMethodMap[m].name).join('、'));
    if (!parts.length) parts.push('先把已知条件和问题分开,用自己的话复述一遍,再想想画图或列表能不能帮上忙。');
    return parts.join('。\n');
}
function revealHtml(p) {
    const rv = qReveal[p.id] || {};
    const isEx = p.type === 'example';
    const btn = (k, label) => `<button class="xq-btn${rv[k] ? ' on' : ''}" onclick="toggleReveal('${p.id}','${k}')">${label}</button>`;
    let h = `<div class="xq-reveal no-print">${btn('hint', '💡 提示')}${isEx ? '' : btn('answer', '✅ 看答案')}${btn('solution', '📘 看解析')}</div>`;
    if (rv.hint) h += `<div class="xq-box hint no-print"><b>💡 提示 (先不要看答案)</b><br>${esc(hintTextFor(p))}</div>`;
    if (rv.answer && !isEx) {
        if (p.answer) h += `<div class="xq-box answer no-print"><b>✅ 答案</b> ${esc(p.answer)}</div>`;
        else h += `<div class="xq-box miss no-print">没有提取到这道题的答案,请对照原书答案册${answerPdfHref(p) ? ` <a href="${answerPdfHref(p)}" target="_blank" rel="noopener">打开 ${problemLecture(p).level} 级参考答案</a>` : ''}。</div>`;
    }
    if (rv.solution) {
        if (p.solution) h += `<div class="xq-box solution no-print"><b>📘 解析 (OCR)</b><div class="xq-pre">${esc(p.solution)}</div></div>`;
        else h += `<div class="xq-box miss no-print">没有提取到解析,请对照原书${answerPdfHref(p) ? ` <a href="${answerPdfHref(p)}" target="_blank" rel="noopener">答案册 PDF</a>` : ''}。</div>`;
    }
    return h;
}
function causeHtml(p) {
    const q = getQ(p.id);
    if (q.attempted !== 'wrong') return '';
    const cur = q.cause ? CAUSE_BY_ID[q.cause] : null;
    return `<div class="xq-cause no-print"><span class="lab">错在哪?</span>
        ${xesErrorCauses.map(c => `<button class="xq-cause-chip${q.cause === c.id ? ' on' : ''}" title="${esc(c.desc)}" onclick="setCause('${p.id}','${c.id}')">${c.icon} ${esc(c.name)}</button>`).join('')}
        ${cur ? `<div class="xq-fix">→ ${esc(cur.fix)}</div>` : '<div class="xq-fix muted">先判断错因,再决定补什么 (错因说明见「教学卡」最下面)。</div>'}
        <input type="text" class="xq-note" maxlength="300" placeholder="一句话记下错在哪 (可选)" value="${esc(q.note)}" onchange="setNote('${p.id}', this.value)">
    </div>`;
}
function verdictHtml(p) {
    const q = getQ(p.id), isEx = p.type === 'example';
    return `<div class="xq-actions no-print">
        <button class="status-btn${q.attempted === 'correct' ? ' status-btn-correct-active' : ''}" onclick="setAttempted('${p.id}','correct')">${isEx ? '✓ 会了' : '✓ 做对'}</button>
        <button class="status-btn${q.attempted === 'wrong' ? ' status-btn-wrong-active' : ''}" onclick="setAttempted('${p.id}','wrong')">${isEx ? '✗ 不会' : '✗ 做错'}</button>
        <button class="status-btn${q.starred ? ' status-btn-star-active' : ''}" onclick="toggleQStar('${p.id}')">★ 收藏</button>
        <a class="xq-pdf" href="${lecturePdfHref(p)}" target="_blank" rel="noopener" title="PDF 页码 (不是书上印的页码)">📖 原书 PDF 第 ${p.page} 页</a>
    </div>${causeHtml(p)}`;
}
function problemCardHtml(p, ctx) {
    const q = getQ(p.id);
    const cls = ['xq-card', 't-' + p.type];
    if (q.attempted) cls.push('st-' + q.attempted);
    if (q.starred) cls.push('starred');
    const noteLine = q.note ? `<div class="xq-notebox">📝 ${esc(q.note)}</div>` : '';
    const ansPrint = hasAnswer(p) ? `<div class="xq-print-ans"><b>答案:</b> ${esc(p.type === 'example' ? p.solution : p.answer)}</div>` : '';
    return `<div class="${cls.join(' ')}" id="xq_${p.id}" data-qid="${p.id}" data-ctx="${ctx || 'lib'}">
        <div class="xq-head"><span class="xq-type">${esc(typeLabel(p))}</span><span class="xq-no">${esc(problemLabel(p))}</span>
            ${p.methodTitle ? `<span class="xq-method" title="${esc(p.methodHint)}">好方法 ${p.method} · ${esc(p.methodTitle)}</span>` : ''}
            ${flagsHtml(p)}${q.starred ? '<span class="xq-star">★</span>' : ''}${q.attempted === 'wrong' ? '<span class="xq-mark wrong">✗</span>' : q.attempted === 'correct' ? '<span class="xq-mark ok">✓</span>' : ''}</div>
        <div class="xq-text">${esc(p.text)}</div>
        ${noteLine}${ansPrint}
        ${revealHtml(p)}
        ${verdictHtml(p)}
    </div>`;
}

// =====================================================================
//  视图: 题库
// =====================================================================
const qf = { text: '', level: 'all', lecture: 'all', chain: 'all', type: 'all', status: 'all', answered: false, limit: Q_PAGE };

function problemPassesFilter(p) {
    const l = problemLecture(p);
    if (!inRange(l.level)) return false;
    if (qf.level !== 'all' && l.level !== Number(qf.level)) return false;
    if (qf.lecture !== 'all' && p.lecture !== qf.lecture) return false;
    if (qf.chain !== 'all' && !l.chains.includes(qf.chain)) return false;
    if (qf.type !== 'all' && p.type !== qf.type) return false;
    if (qf.answered && !hasAnswer(p)) return false;
    if (qf.status !== 'all') {
        const q = getQ(p.id);
        if (qf.status === 'todo' && q.attempted) return false;
        if (qf.status === 'correct' && q.attempted !== 'correct') return false;
        if (qf.status === 'wrong' && q.attempted !== 'wrong') return false;
        if (qf.status === 'starred' && !q.starred) return false;
    }
    const t = qf.text.trim();
    if (t && !(p.text.includes(t) || p.solution.includes(t) || p.answer.includes(t) || l.title.includes(t) || (p.methodTitle || '').includes(t))) return false;
    return true;
}

function renderProblems() {
    const box = $('problems-container');
    if (!$('xq-list')) {
        const lecs = lecturesWithProblems();
        const levels = [...new Set(lecs.map(l => l.level))].sort((a, b) => a - b);
        const chains = xesChains.filter(c => lecs.some(l => l.chains.includes(c.id)));
        const opt = (arr, all) => `<option value="all">${all}</option>` + arr.map(([v, t]) => `<option value="${v}">${esc(t)}</option>`).join('');
        box.innerHTML = `
        <div class="xes-intro no-print"><h2>📝 题库: 书里的例题与练习</h2>
            <p>把每一讲里的 <b>例题</b>、<b>举一反三</b>、<b>挑战自我</b>、<b>探索知识巅峰</b> 收在一起,可以按讲、按知识链、按题型筛选。
            每题都可以先看「提示」(只提醒用哪种方法,不给答案),想好了再看答案;做完点 ✓ / ✗,做错的会进入「错题本」。</p>
            ${ocrBanner()}</div>
        <div class="xes-toolbar no-print">
            <input type="search" id="xq-search" placeholder="搜索题目文字,如 鸡 / 轮子" oninput="onQFilter()">
            <select class="topic-select" id="xq-level" onchange="onQFilter()">${opt(levels.map(v => [v, v + ' 级']), '全部级别')}</select>
            <select class="topic-select" id="xq-lecture" onchange="onQFilter()">${opt(lecs.map(l => [l.id, `${l.level}级${l.no}讲 ${l.title}`]), '全部讲次')}</select>
            <select class="topic-select" id="xq-chain" onchange="onQFilter()">${opt(chains.map(c => [c.id, c.icon + ' ' + c.name]), '全部知识链')}</select>
            <select class="topic-select" id="xq-type" onchange="onQFilter()">${opt(QTYPES.map(t => [t, XES_PROBLEM_TYPES[t]]), '全部题型')}</select>
            <label class="xes-check"><input type="checkbox" id="xq-answered" onchange="onQFilter()"> 只看有答案的</label>
            <span class="spacer"></span>
            <button class="xes-btn" data-qs="all" onclick="setQStatusFilter('all')">全部</button>
            <button class="xes-btn" data-qs="todo" onclick="setQStatusFilter('todo')">未做</button>
            <button class="xes-btn" data-qs="correct" onclick="setQStatusFilter('correct')">做对</button>
            <button class="xes-btn" data-qs="wrong" onclick="setQStatusFilter('wrong')">做错</button>
            <button class="xes-btn" data-qs="starred" onclick="setQStatusFilter('starred')">收藏</button>
        </div>
        <div id="xq-summary" class="xq-summary"></div>
        <div id="xq-list"></div>`;
    }
    $('xq-search').value = qf.text;
    $('xq-level').value = qf.level;
    $('xq-lecture').value = qf.lecture;
    $('xq-chain').value = qf.chain;
    $('xq-type').value = qf.type;
    $('xq-answered').checked = qf.answered;
    box.querySelectorAll('[data-qs]').forEach(b => b.classList.toggle('active', b.dataset.qs === qf.status));
    renderProblemList();
}
function onQFilter() {
    qf.text = $('xq-search').value;
    qf.level = $('xq-level').value;
    qf.lecture = $('xq-lecture').value;
    qf.chain = $('xq-chain').value;
    qf.type = $('xq-type').value;
    qf.answered = $('xq-answered').checked;
    qf.limit = Q_PAGE;
    renderProblemList();
}
function setQStatusFilter(s) {
    qf.status = s; qf.limit = Q_PAGE;
    $('problems-container').querySelectorAll('[data-qs]').forEach(b => b.classList.toggle('active', b.dataset.qs === s));
    renderProblemList();
}
function resetQFilter() {
    Object.assign(qf, { text: '', level: 'all', lecture: 'all', chain: 'all', type: 'all', status: 'all', answered: false, limit: Q_PAGE });
    renderProblems();
}
function moreProblems() { qf.limit += Q_PAGE; renderProblemList(); }

function filteredProblems() { return xesProblems.filter(problemPassesFilter); }
function updateLibSummary() {
    const items = filteredProblems();
    const c = { correct: 0, wrong: 0, starred: 0 };
    items.forEach(p => { const q = getQ(p.id); if (q.attempted === 'correct') c.correct++; if (q.attempted === 'wrong') c.wrong++; if (q.starred) c.starred++; });
    const groups = new Set(items.map(p => p.lecture)).size;
    const filtered = items.length < xesProblems.length;
    $('xq-summary').innerHTML = `<span>共 <b>${items.length}</b> 题 · ${groups} 讲</span>
        <span class="ok">✓ ${c.correct}</span><span class="bad">✗ ${c.wrong}</span><span class="star">★ ${c.starred}</span>
        <span class="spacer"></span>
        ${filtered ? '<button class="xes-btn no-print" onclick="resetQFilter()">清除筛选</button>' : ''}
        <button class="xes-btn no-print" onclick="startPracticeFromFilter()" ${items.length ? '' : 'disabled'}>🎯 练习这些题</button>
        <button class="xes-btn no-print" onclick="printProblems(false)" ${items.length ? '' : 'disabled'}>🖨 打印题单</button>
        <button class="xes-btn no-print" onclick="printProblems(true)" ${items.length ? '' : 'disabled'}>🖨 带答案</button>`;
}
function renderProblemList() {
    const items = filteredProblems();
    updateLibSummary();
    let shown = 0, html = '';
    for (const g of groupByLecture(items)) {
        if (shown >= qf.limit) break;
        const take = g.items.slice(0, qf.limit - shown);
        shown += take.length;
        const l = g.lecture;
        const st = { correct: 0, wrong: 0 };
        g.items.forEach(p => { const a = getQ(p.id).attempted; if (a) st[a]++; });
        html += `<section class="xq-group">
            <div class="xq-group-head"><span class="grade-badge" style="background:${levelColor(l.level)}">${l.level} 级</span>
                <h3>第 ${l.no} 讲 · ${esc(l.title)}</h3>
                <small>${g.items.length} 题${st.correct || st.wrong ? ` · ✓${st.correct} ✗${st.wrong}` : ''}</small>
                <span class="spacer"></span>
                <button class="xes-btn no-print" onclick="showLecture('${l.id}')">本讲详情</button>
                <button class="xes-btn no-print" onclick="startPracticeFor('${l.id}')">🎯 练这一讲</button></div>
            <div class="xq-cards">${take.map(p => problemCardHtml(p, 'lib')).join('')}</div></section>`;
    }
    if (!items.length) html = '<p class="xq-empty">没有符合条件的题目。目前只从部分讲次提取了题目,可清除筛选看看。</p>';
    else if (shown < items.length) html += `<p style="text-align:center;margin:18px 0" class="no-print"><button class="xes-btn" onclick="moreProblems()">显示更多 (还有 ${items.length - shown} 题)</button></p>`;
    $('xq-list').innerHTML = html;
}

function printProblems(withAnswers) {
    qf.limit = 1e9;                       // 打印时展开全部
    renderProblemList();
    document.body.classList.toggle('print-answers', !!withAnswers);
    const done = () => { document.body.classList.remove('print-answers'); qf.limit = Q_PAGE; renderProblemList(); window.removeEventListener('afterprint', done); };
    window.addEventListener('afterprint', done);
    setTimeout(() => window.print(), 50);
}

// 从别处跳到某一题
function openProblem(id) {
    const p = xesProblemMap[id];
    if (!p) return;
    if (levelRange && !inRange(problemLecture(p).level)) filterLevel('all');
    Object.assign(qf, { text: '', level: 'all', lecture: p.lecture, chain: 'all', type: 'all', status: 'all', answered: false, limit: Q_PAGE });
    closeDetail();
    switchView('problems');
    renderProblems();
    setTimeout(() => {
        const el = document.querySelector(`#problems-view [data-qid="${id}"]`);
        if (el) { el.scrollIntoView({ block: 'center' }); el.classList.add('flash'); setTimeout(() => el.classList.remove('flash'), 1800); }
    }, 60);
}
function openLectureProblems(lectureId) {
    if (levelRange && !inRange(xesLectureMap[lectureId].level)) filterLevel('all');
    Object.assign(qf, { text: '', level: 'all', lecture: lectureId, chain: 'all', type: 'all', status: 'all', answered: false, limit: Q_PAGE });
    closeDetail();
    switchView('problems');
    renderProblems();
}

// =====================================================================
//  视图: 练习
// =====================================================================
const pr = { level: 'all', lecture: 'all', chain: 'all', types: { example: false, practice: true, challenge: true, peak: true }, mode: 'all', count: 10, answered: true, skipFigure: true };
let prQueue = [], prIdx = 0, prDone = false, prSession = {}, prMsg = '';

function practiceCandidates() {
    return xesProblems.filter(p => {
        const l = problemLecture(p);
        if (!inRange(l.level)) return false;
        if (pr.level !== 'all' && l.level !== Number(pr.level)) return false;
        if (pr.lecture !== 'all' && p.lecture !== pr.lecture) return false;
        if (pr.chain !== 'all' && !l.chains.includes(pr.chain)) return false;
        if (!pr.types[p.type]) return false;
        if (pr.answered && !hasAnswer(p)) return false;
        if (pr.skipFigure && p.hasFigure) return false;
        const q = getQ(p.id);
        if (pr.mode === 'unseen' && q.attempted) return false;
        if (pr.mode === 'wrong' && q.attempted !== 'wrong') return false;
        if (pr.mode === 'starred' && !q.starred) return false;
        return true;
    });
}
function readPracticeSetup() {
    if (!$('pr-level')) return;
    pr.level = $('pr-level').value;
    pr.lecture = $('pr-lecture').value;
    pr.chain = $('pr-chain').value;
    pr.mode = $('pr-mode').value;
    pr.count = $('pr-count').value === 'all' ? 1e9 : Number($('pr-count').value);
    pr.answered = $('pr-answered').checked;
    pr.skipFigure = $('pr-nofig').checked;
    QTYPES.forEach(t => { pr.types[t] = $('pr-t-' + t).checked; });
}
function startPractice() {
    readPracticeSetup();
    prQueue = shuffle(practiceCandidates()).slice(0, pr.count);
    prIdx = 0; prDone = false; prSession = {};
    prQueue.forEach(p => { delete qReveal[p.id]; });
    prMsg = prQueue.length ? '' : '没有符合条件的题目: 换个范围,或者把「只练有答案的题」关掉试试。';
    renderPractice();
}
function startPracticeFromFilter() {
    // 把题库当前的筛选带到练习里: 直接以筛选结果作为队列
    prQueue = shuffle(filteredProblems());
    prIdx = 0; prDone = false; prSession = {};
    prQueue.forEach(p => { delete qReveal[p.id]; });
    prMsg = '';
    switchView('practice');
}
function startPracticeFor(lectureId) {
    Object.assign(pr, { level: 'all', lecture: lectureId, chain: 'all', mode: 'all', count: 1e9, answered: false, skipFigure: false });
    pr.types = { example: false, practice: true, challenge: true, peak: true };
    closeDetail();
    prQueue = shuffle(practiceCandidates());
    prIdx = 0; prDone = false; prSession = {};
    prQueue.forEach(p => { delete qReveal[p.id]; });
    prMsg = prQueue.length ? '' : '这一讲还没有提取到可练习的题目。';
    switchView('practice');
}
function startWrongPractice() {
    Object.assign(pr, { level: 'all', lecture: 'all', chain: 'all', mode: 'wrong', count: 1e9, answered: false, skipFigure: false });
    pr.types = { example: true, practice: true, challenge: true, peak: true };
    prQueue = shuffle(practiceCandidates());
    prIdx = 0; prDone = false; prSession = {};
    prQueue.forEach(p => { delete qReveal[p.id]; });
    prMsg = prQueue.length ? '' : '错题本是空的,太好了!';
    switchView('practice');
}
function notePracticeVerdict(id) {
    const a = getQ(id).attempted;
    if (!prQueue.some(p => p.id === id)) return;
    if (a) prSession[id] = a; else delete prSession[id];
}
function prNext() { if (prIdx < prQueue.length - 1) prIdx++; else prDone = true; renderPractice(); $('practice-container').parentElement.scrollTop = 0; }
function prPrev() { if (prIdx > 0) { prIdx--; renderPractice(); } }
function prBackToSetup() { prQueue = []; prDone = false; prMsg = ''; renderPractice(); }
function prRetryWrong() {
    const wrongIds = Object.keys(prSession).filter(id => prSession[id] === 'wrong');
    prQueue = shuffle(wrongIds.map(id => xesProblemMap[id]));
    prIdx = 0; prDone = false; prSession = {};
    prQueue.forEach(p => { delete qReveal[p.id]; });
    renderPractice();
}

function practiceSetupHtml() {
    const lecs = lecturesWithProblems();
    const levels = [...new Set(lecs.map(l => l.level))].sort((a, b) => a - b);
    const chains = xesChains.filter(c => lecs.some(l => l.chains.includes(c.id)));
    const sel = (id, all, arr, cur) => `<select class="topic-select" id="${id}" onchange="onPracticeSetup()"><option value="all">${all}</option>${arr.map(([v, t]) => `<option value="${v}"${String(v) === String(cur) ? ' selected' : ''}>${esc(t)}</option>`).join('')}</select>`;
    const cnt = practiceCandidates().length;
    return `<div class="practice-container">
        <div class="xes-intro"><h2>🎯 练习: 一次只看一道题</h2>
            <p>建议的做法: <b>先让孩子独立做 2-3 分钟</b>,卡住了再点「提示」(只提醒方法,不给答案);做完再看答案,由大人判断 ✓ 或 ✗。
            做错时请选一个<b>错因</b> (读题 / 概念 / 方法 / 计算),错题本会按错因帮你归类,告诉你该补哪里。</p>${ocrBanner()}</div>
        <div class="practice-card xq-setup">
            <div class="xq-setup-row"><label>范围</label>
                ${sel('pr-level', '全部级别', levels.map(v => [v, v + ' 级']), pr.level)}
                ${sel('pr-lecture', '全部讲次', lecs.map(l => [l.id, `${l.level}级${l.no}讲 ${l.title}`]), pr.lecture)}
                ${sel('pr-chain', '全部知识链', chains.map(c => [c.id, c.icon + ' ' + c.name]), pr.chain)}</div>
            <div class="xq-setup-row"><label>题型</label>
                ${QTYPES.map(t => `<label class="xes-check"><input type="checkbox" id="pr-t-${t}" ${pr.types[t] ? 'checked' : ''} onchange="onPracticeSetup()"> ${esc(XES_PROBLEM_TYPES[t])}</label>`).join('')}</div>
            <div class="xq-setup-row"><label>哪些题</label>
                <select class="topic-select" id="pr-mode" onchange="onPracticeSetup()">
                    ${[['all', '全部'], ['unseen', '还没做过的'], ['wrong', '做错的 (待订正)'], ['starred', '收藏的']].map(([v, t]) => `<option value="${v}"${pr.mode === v ? ' selected' : ''}>${t}</option>`).join('')}</select>
                <select class="topic-select" id="pr-count" onchange="onPracticeSetup()">
                    ${[['5', '5 题'], ['10', '10 题'], ['20', '20 题'], ['all', '全部']].map(([v, t]) => `<option value="${v}"${(pr.count >= 1e9 ? 'all' : String(pr.count)) === v ? ' selected' : ''}>${t}</option>`).join('')}</select>
                <label class="xes-check"><input type="checkbox" id="pr-answered" ${pr.answered ? 'checked' : ''} onchange="onPracticeSetup()"> 只练有答案的题</label>
                <label class="xes-check" title="OCR 读不出图里的内容, 这类题在屏幕上做不了, 需要对照原书"><input type="checkbox" id="pr-nofig" ${pr.skipFigure ? 'checked' : ''} onchange="onPracticeSetup()"> 跳过依赖图的题</label></div>
            <div class="xq-setup-row"><span id="pr-avail" class="xq-muted">符合条件: ${cnt} 题</span><span class="spacer"></span>
                ${prMsg ? `<span class="xq-warn">${esc(prMsg)}</span>` : ''}
                <button class="practice-btn practice-btn-primary" onclick="startPractice()">开始练习 →</button></div>
        </div></div>`;
}
function onPracticeSetup() {
    readPracticeSetup();
    $('pr-avail').textContent = '符合条件: ' + practiceCandidates().length + ' 题';
}

function practiceCardHtml(p) {
    const l = problemLecture(p);
    const stats = Object.values(prSession);
    const ok = stats.filter(v => v === 'correct').length, bad = stats.filter(v => v === 'wrong').length;
    const pct = Math.round((prIdx) / prQueue.length * 100);
    return `<div class="practice-container">
        <div class="xq-prog"><span>第 <b>${prIdx + 1}</b> / ${prQueue.length} 题</span><div class="bar"><span style="width:${pct}%"></span></div>
            <span class="ok">✓ ${ok}</span><span class="bad">✗ ${bad}</span></div>
        <div class="practice-card xq-pcard t-${p.type}">
            <div class="practice-meta"><span class="practice-round">${esc(typeLabel(p))} · ${esc(problemLabel(p))}</span>
                <span class="practice-num">${l.level}级第${l.no}讲 ${esc(l.title)}</span>${flagsHtml(p)}</div>
            <div class="practice-question xq-pre">${esc(p.text)}</div>
            ${revealHtml(p)}
            ${verdictHtml(p)}
            <div class="practice-actions">
                <button class="practice-btn" onclick="prPrev()" ${prIdx ? '' : 'disabled'}>← 上一题</button>
                <button class="practice-btn practice-btn-primary" onclick="prNext()">${prIdx < prQueue.length - 1 ? '下一题 →' : '完成 ✔'}</button>
                <button class="practice-btn" onclick="prDone=true;renderPractice()">结束练习</button>
                <button class="practice-btn" onclick="showLecture('${l.id}')">本讲详情</button>
            </div>
        </div></div>`;
}
function practiceSummaryHtml() {
    const ids = Object.keys(prSession);
    const ok = ids.filter(id => prSession[id] === 'correct'), bad = ids.filter(id => prSession[id] === 'wrong');
    const skipped = prQueue.length - ids.length;
    const causeCount = {};
    bad.forEach(id => { const c = getQ(id).cause || 'none'; causeCount[c] = (causeCount[c] || 0) + 1; });
    return `<div class="practice-container">
        <div class="practice-card xq-summary-card">
            <h2>🎉 这一轮练完了</h2>
            <div class="xes-stat-row">
                <div class="xes-stat"><b>${ok.length}</b><span>做对</span></div>
                <div class="xes-stat"><b style="color:#EF5350">${bad.length}</b><span>做错</span></div>
                <div class="xes-stat"><b style="color:#90a4ae">${skipped}</b><span>没判断</span></div>
            </div>
            ${bad.length ? `<h3>做错的题</h3>${groupByLecture(bad.map(id => xesProblemMap[id])).map(g => `<p class="xq-sumline">${lecTag(g.lecture)} ${g.items.map(p => `<a href="javascript:void(0)" onclick="openProblem('${p.id}')">${esc(problemLabel(p))}</a>${getQ(p.id).cause ? ' (' + esc(CAUSE_BY_ID[getQ(p.id).cause].name) + ')' : ' (未选错因)'}`).join('、 ')}</p>`).join('')}
                ${causeCount.none ? '<p class="xq-muted">有题目还没选错因。错因决定怎么补,建议到错题本里补选。</p>' : ''}` : '<p>这一轮全对!可以换一讲,或者挑「挑战自我」「探索知识巅峰」。</p>'}
            <div class="practice-actions">
                <button class="practice-btn practice-btn-primary" onclick="startPractice()">再来一轮</button>
                ${bad.length ? '<button class="practice-btn practice-btn-reshuffle" onclick="prRetryWrong()">只重练做错的</button>' : ''}
                <button class="practice-btn" onclick="switchView(\'wrong\')">去错题本</button>
                <button class="practice-btn" onclick="prBackToSetup()">返回设置</button>
            </div>
        </div></div>`;
}
function renderPractice() {
    const box = $('practice-container');
    if (!prQueue.length) box.innerHTML = practiceSetupHtml();
    else if (prDone) box.innerHTML = practiceSummaryHtml();
    else box.innerHTML = practiceCardHtml(prQueue[prIdx]);
}

// =====================================================================
//  视图: 错题本
// =====================================================================
const wf = { tab: 'pending', cause: 'all' };

function wrongSets() {
    const scope = xesProblems.filter(p => inRange(problemLecture(p).level));
    return {
        pending: scope.filter(p => getQ(p.id).attempted === 'wrong'),
        fixed: scope.filter(p => { const q = getQ(p.id); return q.attempted === 'correct' && q.wrongCount > 0; }),
        starred: scope.filter(p => getQ(p.id).starred)
    };
}
function setWrongTab(t) { wf.tab = t; wf.cause = 'all'; renderWrong(); }
function setWrongCause(c) { wf.cause = wf.cause === c ? 'all' : c; renderWrong(); }

function renderWrong(keepScroll) {
    const box = $('wrong-container');
    const scroller = box.parentElement;
    const top = scroller.scrollTop;
    const sets = wrongSets();
    const base = sets[wf.tab];
    const causeOf = p => getQ(p.id).cause || 'none';
    const tallySrc = wf.tab === 'starred' ? [] : base;
    const tally = { none: 0 };
    xesErrorCauses.forEach(c => { tally[c.id] = 0; });
    tallySrc.forEach(p => { tally[causeOf(p)]++; });
    const list = wf.cause === 'all' ? base : base.filter(p => causeOf(p) === wf.cause);

    const tab = (k, label, n) => `<button class="xes-btn${wf.tab === k ? ' active' : ''}" onclick="setWrongTab('${k}')">${label} <b>${n}</b></button>`;
    const causeCards = wf.tab === 'starred' ? '' : `<div class="xes-causes xq-cause-cards no-print">
        ${xesErrorCauses.map(c => `<div class="c${wf.cause === c.id ? ' on' : ''}" onclick="setWrongCause('${c.id}')"><b>${c.icon} ${esc(c.name)} <span class="n">${tally[c.id]}</span></b>${esc(c.desc)}<br><span style="color:#2E7D32">→ ${esc(c.fix)}</span></div>`).join('')}
        </div>${tally.none ? `<p class="xq-muted no-print">另有 <b>${tally.none}</b> 题还没选错因 ${wf.cause === 'none' ? '' : '<a href="javascript:void(0)" onclick="setWrongCause(\'none\')">只看这些</a>'}</p>` : ''}`;

    let body = '';
    if (!list.length) {
        const msg = wf.tab === 'pending' ? (xesProblems.length ? '还没有待订正的错题。去「题库」或「练习」里做几道题,做错的会自动出现在这里。' : '')
            : wf.tab === 'fixed' ? '还没有订正过的错题: 把待订正的题重做一遍并标 ✓,就会移到这里。' : '还没有收藏的题。';
        body = `<p class="xq-empty">${msg}</p>`;
    } else {
        body = groupByLecture(list).map(g => {
            const pre = (IN_PREREQ[g.lecture.id] || []).map(id => xesLectureMap[id]);
            return `<section class="xq-group">
                <div class="xq-group-head"><span class="grade-badge" style="background:${levelColor(g.lecture.level)}">${g.lecture.level} 级</span>
                    <h3>第 ${g.lecture.no} 讲 · ${esc(g.lecture.title)}</h3><small>${g.items.length} 题</small><span class="spacer"></span>
                    <button class="xes-btn no-print" onclick="showLecture('${g.lecture.id}')">本讲详情</button></div>
                ${wf.tab === 'pending' && pre.length ? `<div class="xq-prereq no-print">⬅ 如果错因是「概念」,先回看前置: ${pre.map(l => lecTag(l)).join('')}</div>` : ''}
                <div class="xq-cards">${g.items.map(p => problemCardHtml(p, 'wrong')).join('')}</div></section>`;
        }).join('');
    }

    box.innerHTML = `
    <div class="xes-intro no-print"><h2>📕 错题本</h2>
        <p>做错的题自动收在这里,按<b>错因</b>归类。别急着抄答案: 先看错因卡片里的建议,把题重做一遍,做对了标 ✓,它就会移到「已订正」。
        记录保存在这台电脑的浏览器里 (localStorage),换电脑前请先「导出 CSV」或在「我的进度」里导出备份。</p>${ocrBanner()}</div>
    <div class="xes-toolbar no-print">${tab('pending', '待订正', sets.pending.length)}${tab('fixed', '已订正', sets.fixed.length)}${tab('starred', '收藏', sets.starred.length)}
        <span class="spacer"></span>
        <button class="xes-btn" onclick="startWrongPractice()" ${sets.pending.length ? '' : 'disabled'}>🔁 重练待订正</button>
        <button class="xes-btn" onclick="printWrong(false)" ${list.length ? '' : 'disabled'}>🖨 打印错题卷</button>
        <button class="xes-btn" onclick="printWrong(true)" ${list.length ? '' : 'disabled'}>🖨 带答案</button>
        <button class="xes-btn" onclick="exportQCsv()">📥 导出 CSV</button>
        <button class="xes-btn danger" onclick="resetQStatus()">🗑 清空做题记录</button></div>
    ${causeCards}
    <div class="xq-print-title">错题卷 · ${new Date().toISOString().slice(0, 10)}</div>
    ${body}`;
    scroller.scrollTop = keepScroll ? top : scroller.scrollTop;
}
function printWrong(withAnswers) {
    document.body.classList.toggle('print-answers', !!withAnswers);
    const done = () => { document.body.classList.remove('print-answers'); window.removeEventListener('afterprint', done); };
    window.addEventListener('afterprint', done);
    setTimeout(() => window.print(), 50);
}

// ---------- 导出 / 导入 / 清空 ----------
function csvCell(v) { return '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"'; }
function exportQCsv() {
    const rows = xesProblems.filter(p => xesQStatus[p.id]);
    if (!rows.length) { alert('还没有做题记录可导出。'); return; }
    const head = ['级别', '讲次', '讲名', '类型', '编号', '题目', '答案', '状态', '错因', '备注', '做错次数', '收藏', '原书PDF页', '更新时间'];
    const lines = [head.map(csvCell).join(',')];
    rows.forEach(p => {
        const l = problemLecture(p), q = getQ(p.id);
        lines.push([l.level, l.no, l.title, typeLabel(p), problemLabel(p), p.text, p.answer || (p.type === 'example' ? p.solution : ''),
            q.attempted === 'correct' ? '做对' : q.attempted === 'wrong' ? '做错' : '', q.cause ? CAUSE_BY_ID[q.cause].name : '', q.note,
            q.wrongCount || 0, q.starred ? '是' : '', p.page, q.ts ? new Date(q.ts).toLocaleString() : ''].map(csvCell).join(','));
    });
    const blob = new Blob(['\ufeff' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'xes_wrongbook_' + new Date().toISOString().slice(0, 10) + '.csv';
    document.body.appendChild(a); a.click();
    setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(a.href); }, 100);
}
function importQuestionStatus(obj) {
    let n = 0;
    Object.keys(obj || {}).forEach(id => { if (xesProblemMap[id] && obj[id] && typeof obj[id] === 'object') { xesQStatus[id] = obj[id]; n++; } });
    saveQ();
    return n;
}
function resetQStatus() {
    if (!confirm('确认清空全部做题记录 (做对 / 做错 / 收藏 / 错因 / 备注)?此操作不可撤销,建议先导出 CSV。')) return;
    xesQStatus = {};
    saveQ();
    refreshCurrentView();
}

// =====================================================================
//  讲次详情面板里的「例题与练习」(xes-app.js 的 showLecture 会调用)
// =====================================================================
function lectureProblemsHtml(l) {
    const ps = xesProblemsForLecture(l.id);
    const notes = typeof xesLectureNotes !== 'undefined' ? xesLectureNotes[l.id] : null;
    if (!ps.length) {
        return `<div class="detail-section"><h3>📝 例题与练习</h3>
            <p class="xq-muted">这一讲还没有提取题目 (目前从 ${xesOcrMeta.lectures.length} 讲里提取了 ${xesOcrMeta.problems} 题)。可以直接打开下面的 PDF。</p></div>`;
    }
    let ok = 0, bad = 0;
    ps.forEach(p => { const a = getQ(p.id).attempted; if (a === 'correct') ok++; if (a === 'wrong') bad++; });
    const methods = notes && notes.methods ? notes.methods.filter(m => m.title) : [];
    const summary = notes && notes.summary ? notes.summary.filter(s => s.length > 1) : [];
    const rows = ps.map(p => {
        const q = getQ(p.id);
        const mark = q.attempted === 'correct' ? '<span class="xq-mark ok">✓</span>' : q.attempted === 'wrong' ? '<span class="xq-mark wrong">✗</span>' : '';
        return `<div class="xq-row t-${p.type}" onclick="openProblem('${p.id}')" title="在题库里打开">
            <span class="xq-row-lab">${esc(problemLabel(p))}</span><span class="xq-row-txt">${esc(p.text.slice(0, 42))}${p.text.length > 42 ? '…' : ''}</span>${q.starred ? '<span class="xq-star">★</span>' : ''}${mark}</div>`;
    }).join('');
    return `<div class="detail-section"><h3>📝 例题与练习 <small class="xq-muted">${ps.length} 题 · ✓${ok} ✗${bad}</small></h3>
        ${summary.length ? `<details class="xq-details"><summary>📖 本讲知识点梳理 (书中原文, OCR)</summary><div class="xq-pre">${esc(summary.join('\n'))}</div></details>` : ''}
        ${notes && notes.intro ? `<details class="xq-details"><summary>🧭 教学建议 (书中「知识导引」)</summary><div class="xq-pre">${esc(notes.intro)}</div></details>` : ''}
        ${methods.length ? `<div class="xq-methods">${methods.map(m => `<div><b>好方法 ${m.no}</b> ${esc(m.title)}${m.hint ? ` <span class="xq-muted">· ${esc(m.hint)}</span>` : ''}</div>`).join('')}</div>` : ''}
        <div class="xq-rows">${rows}</div>
        <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">
            <button class="xes-btn" onclick="openLectureProblems('${l.id}')">在题库里查看</button>
            <button class="xes-btn primary" onclick="startPracticeFor('${l.id}')">🎯 练这一讲</button></div>
        <p class="xq-muted" style="margin-top:8px">题目文字来自 OCR,图里的内容读不出来,请以原书 PDF 为准。</p></div>`;
}

// =====================================================================
//  「我的进度」里追加做题统计
// =====================================================================
function questionStatsHtml() {
    const scope = xesProblems.filter(p => inRange(problemLecture(p).level));
    if (!scope.length) return '';
    const qs = scope.map(p => ({ p, q: getQ(p.id) }));
    const ok = qs.filter(x => x.q.attempted === 'correct').length;
    const bad = qs.filter(x => x.q.attempted === 'wrong');
    const fixed = qs.filter(x => x.q.attempted === 'correct' && x.q.wrongCount > 0).length;
    const starred = qs.filter(x => x.q.starred).length;
    const everWrong = qs.filter(x => x.q.attempted === 'wrong' || (x.q.attempted === 'correct' && x.q.wrongCount > 0));
    const causeCount = { none: 0 };
    xesErrorCauses.forEach(c => { causeCount[c.id] = 0; });
    everWrong.forEach(x => { causeCount[x.q.cause || 'none']++; });
    const maxN = Math.max(1, ...Object.values(causeCount));
    const causeRows = xesErrorCauses.map(c => `<div class="xes-bar-row"><span>${c.icon} ${esc(c.name)}</span>
        <div class="xes-bar"><span class="done" style="width:${causeCount[c.id] / maxN * 100}%;background:#EF5350"></span></div><span class="n">${causeCount[c.id]}</span></div>`).join('');
    const perLec = {};
    bad.forEach(x => { perLec[x.p.lecture] = (perLec[x.p.lecture] || 0) + 1; });
    const worst = Object.entries(perLec).sort((a, b) => b[1] - a[1]).slice(0, 6);
    return `<div class="xes-bars"><h3>📝 题库记录 <small class="xq-muted">(共 ${scope.length} 题)</small></h3>
        <div class="xes-stat-row" style="margin-bottom:12px">
            <div class="xes-stat"><b>${ok}</b><span>做对</span></div>
            <div class="xes-stat"><b style="color:#EF5350">${bad.length}</b><span>待订正</span></div>
            <div class="xes-stat"><b>${fixed}</b><span>已订正</span></div>
            <div class="xes-stat"><b style="color:#F9A825">${starred}</b><span>收藏</span></div></div>
        ${everWrong.length ? `<h4 style="font-size:13px;margin:6px 0 8px;color:#607d8b">错因分布 (错过的题)</h4>${causeRows}
            ${causeCount.none ? `<p class="xq-muted">另有 ${causeCount.none} 题没选错因。</p>` : ''}` : '<p class="xq-muted">还没有错题记录。</p>'}
        ${worst.length ? `<h4 style="font-size:13px;margin:12px 0 6px;color:#607d8b">错得最多的讲 (建议回看)</h4><div>${worst.map(([id, n]) => lecTag(xesLectureMap[id]) + `<span class="xq-muted">×${n}</span> `).join('')}</div>` : ''}
        <p style="margin-top:10px"><button class="xes-btn" onclick="switchView('wrong')">去错题本</button> <button class="xes-btn" onclick="switchView('problems')">去题库</button></p></div>`;
}

// ---------- 接入 xes-app.js 的视图表 ----------
Object.assign(VIEW_RENDERERS, {
    problems: renderProblems,
    practice: renderPractice,
    wrong: () => renderWrong(true),
    progress: () => { renderProgress(); $('progress-container').insertAdjacentHTML('beforeend', questionStatsHtml()); }
});
