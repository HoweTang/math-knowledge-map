// 李永乐 × 盘古 AK4：知识点匹配、学习单元、讲次反查、缺口、抽题练习
// 数据：li-data.js（讲次目录 + 匹配表，自动生成）、li-study-*.js（学习单元 + 练习）、pangu-data.js（盘古真题）
(function () {
    'use strict';

    const UNITS = window.LI_UNITS || [];
    const unitById = Object.fromEntries(UNITS.map(u => [u.id, u]));
    const pointByN = Object.fromEntries(liAk4Map.map(p => [p.n, p]));
    const CAT_ORDER = Object.keys(liAk4Cats);
    const CAT_COLOR = { calc: '#E91E63', number: '#3F51B5', time: '#FF9800', geom: '#009688', solid: '#795548', count: '#8BC34A', pattern: '#00ACC1', logic: '#8E24AA', puzzle: '#EC407A', app: '#FF5722' };
    const LEVEL = { 3: { t: '直接对应', d: '●●●' }, 2: { t: '部分对应', d: '●●○' }, 1: { t: '间接/延伸', d: '●○○' }, 0: { t: '缺口', d: '○○○' } };
    const ROLE = { core: '核心', aux: '辅助', pre: '前置', ext: '延伸' };
    const ROLE_RANK = { core: 0, aux: 1, pre: 2, ext: 3 };
    const PROB_LV = { 1: '李永乐式基础', 2: '盘古式', 3: '挑战' };
    const LETTERS = 'abcde';
    const PKEY = 'liProgress_v1';

    // ---------- 小工具 ----------
    const $ = id => document.getElementById(id);
    const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const fmt = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');
    const href = p => esc(encodeURI(p));

    let prog = {};
    try { prog = JSON.parse(localStorage.getItem(PKEY) || '{}') || {}; } catch (e) { prog = {}; }
    const saveProg = () => { try { localStorage.setItem(PKEY, JSON.stringify(prog)); } catch (e) { /* 隐私模式等，忽略 */ } };
    const UI = {}; // 题目的临时界面状态 { pid: { picked, revealed } }

    // 讲次 -> 引用它的盘古知识点 / 额外考点
    const rev = {};
    liAk4Map.forEach(p => p.links.forEach(k => { (rev[k.ref] = rev[k.ref] || []).push({ n: p.n, role: k.role, why: k.why }); }));
    liAk4Extras.forEach((e, i) => e.links.forEach(k => { (rev[k.ref] = rev[k.ref] || []).push({ extra: i, role: k.role, why: k.why }); }));

    // 题目索引
    const allPids = [];
    UNITS.forEach(u => u.problems.forEach((_, i) => allPids.push(`${u.id}-${i + 1}`)));
    function findProblem(pid) {
        const m = /^(u\d+)-(\d+)$/.exec(pid);
        if (!m) return null;
        const u = unitById[m[1]];
        const p = u && u.problems[+m[2] - 1];
        return p ? { u, p, idx: +m[2] } : null;
    }
    const unitColor = u => CAT_COLOR[pointByN[u.points[0]].cat] || '#9e9e9e';

    const state = {
        view: 'map', unit: UNITS.length ? UNITS[0].id : null, mapLevel: 'all', lecGrade: 4, hlRef: null,
        practice: { unit: 'all', lv: 'all', status: 'all', queue: [], i: 0 },
    };

    // ---------- 公共片段 ----------
    function lecLabel(l) { return `第${l.no}讲 ${l.title}`; }
    function lecChip(ref, role, why) {
        const l = liLectureMap[ref];
        if (!l) return '';
        const g = l.grade === 4 ? '' : `<span class="g">${liGradeName[l.grade]}</span>`;
        const r = role ? ` role-${role}` : '';
        const tip = `${liGradeName[l.grade]}${lecLabel(l)}${role ? '（' + ROLE[role] + '）' : ''}${why ? '：' + why : ''}`;
        return `<button type="button" class="li-chip${r}" data-act="open-lec" data-ref="${ref}" title="${esc(tip)}">${g}${esc(lecLabel(l))}</button>`;
    }
    function files(l) {
        const f = (o, label) => o
            ? `<a class="li-file" href="${href(o.path)}" target="_blank" rel="noopener">${label}</a>`
            : `<span class="li-file off" title="资料里没有这一项">${label} ✗</span>`;
        return `<span class="li-files">${f(l.handout, '讲义')}${f(l.exercise, '习题')}${f(l.answer, '答案')}</span>`;
    }
    function levelBadge(lv) { return `<span class="li-badge lv${lv}" title="${LEVEL[lv].t}">${LEVEL[lv].d} ${LEVEL[lv].t}</span>`; }
    function pointChip(n, role, why) {
        const p = pointByN[n];
        return `<button type="button" class="li-chip pt" data-act="open-unit" data-unit="${p.unit}" title="${esc((role ? ROLE[role] + '：' : '') + (why || ''))}">#${n} ${esc(p.name)}</button>`;
    }
    function progressOf(u) {
        let ok = 0, bad = 0;
        u.problems.forEach((_, i) => { const s = prog[`${u.id}-${i + 1}`]; if (s === 'ok') ok++; else if (s === 'wrong') bad++; });
        return { ok, bad, total: u.problems.length };
    }
    function unitProgressText(u) {
        const pr = progressOf(u);
        return `本单元：做了 ${pr.ok + pr.bad}/${pr.total}，对 ${pr.ok}，错 ${pr.bad}`;
    }
    function totalProgress() {
        let ok = 0, bad = 0;
        allPids.forEach(pid => { if (prog[pid] === 'ok') ok++; else if (prog[pid] === 'wrong') bad++; });
        return { ok, bad, total: allPids.length };
    }

    // ---------- 视图切换 ----------
    const VIEWS = ['map', 'units', 'lectures', 'gaps', 'practice'];
    function switchView(v, keepScroll) {
        if (!VIEWS.includes(v)) v = 'map';
        state.view = v;
        document.querySelectorAll('#li-tabs .tab-btn').forEach(b => b.classList.toggle('active', b.dataset.view === v));
        VIEWS.forEach(x => {
            const panel = $(x + '-view');
            panel.classList.toggle('active', x === v);
            if (x !== v) $(x + '-container').innerHTML = ''; // 只保留当前视图的 DOM，避免同一道题出现两份
        });
        ({ map: renderMap, units: renderUnits, lectures: renderLectures, gaps: renderGaps, practice: renderPractice })[v]();
        if (!keepScroll) { const s = $(v + '-view').querySelector('.li-scroll'); if (s) s.scrollTop = 0; }
        try {
            const q = new URLSearchParams();
            q.set('view', v);
            if (v === 'units' && state.unit) q.set('unit', state.unit);
            history.replaceState(null, '', '?' + q.toString());
        } catch (e) { /* file:// 下可能不允许，忽略 */ }
    }
    function openUnit(id, pid) {
        if (!unitById[id]) return;
        state.unit = id;
        switchView('units');
        if (pid) { const el = $('prob-' + pid); if (el) el.scrollIntoView({ block: 'center' }); }
    }
    function openLecture(ref) {
        const l = liLectureMap[ref];
        if (!l) return;
        state.hlRef = ref;
        state.lecGrade = l.grade >= 5 ? 5 : l.grade;
        switchView('lectures');
        const el = document.querySelector('.li-lec-row.hl');
        if (el) el.scrollIntoView({ block: 'center' });
    }

    // ---------- 1. 匹配总表 ----------
    function renderMap() {
        const cnt = [0, 0, 0, 0];
        liAk4Map.forEach(p => cnt[p.level]++);
        const tp = totalProgress();
        const filters = [['all', '全部']].concat([3, 2, 1, 0].map(l => [String(l), LEVEL[l].t]));
        let html = `<div class="li-intro">
            <h2>盘古 AK4 的 ${liAk4Map.length} 个知识点 ↔ 李永乐三/四年级讲次</h2>
            <p>左边是「AK4 知识点扩展教学」里的 52 个知识点，右边是李永乐小学数学里对应的讲次。点讲次标签可看这一讲的讲义、习题、答案文件，点「练习」进入对应的学习单元（讲解 + 练习 + 答案）。</p>
            <div class="li-stats">
                <div class="li-stat"><b>${cnt[3]}</b>直接对应</div>
                <div class="li-stat"><b>${cnt[2]}</b>部分对应</div>
                <div class="li-stat"><b>${cnt[1]}</b>间接/延伸</div>
                <div class="li-stat"><b>${cnt[0]}</b>缺口（本页补）</div>
                <div class="li-stat"><b>${UNITS.length}</b>学习单元</div>
                <div class="li-stat"><b>${tp.total}</b>练习题（已做 ${tp.ok + tp.bad}）</div>
            </div>
            <div class="li-note">标签颜色：<span class="li-chip role-core">核心：先做它的习题</span><span class="li-chip role-aux">辅助</span><span class="li-chip role-pre">前置：三年级基础</span><span class="li-chip role-ext">延伸：更高年级才讲，AK4 不必需</span>。
            没有标年级的是四年级讲次，三、五、六年级的讲次会在标签前用小字注明年级。</div>
        </div>
        <div class="li-filter"><span class="label">匹配强度：</span>${filters.map(([k, t]) => `<button type="button" class="li-btn small${state.mapLevel === k ? ' active' : ''}" data-act="map-filter" data-k="${k}">${t}</button>`).join('')}</div>`;

        CAT_ORDER.forEach(cat => {
            const rows = liAk4Map.filter(p => p.cat === cat && (state.mapLevel === 'all' || String(p.level) === state.mapLevel));
            if (!rows.length) return;
            html += `<div class="li-cat" style="--cat-color:${CAT_COLOR[cat]}"><h3>${liAk4Cats[cat].emoji} ${liAk4Cats[cat].name}<small>${rows.length} 个知识点</small></h3>
                <table class="li-table"><thead><tr><th>#</th><th>盘古 AK4 知识点</th><th>匹配</th><th>对应李永乐讲次</th><th></th></tr></thead><tbody>`;
            rows.forEach(p => {
                const links = p.links.slice().sort((a, b) => ROLE_RANK[a.role] - ROLE_RANK[b.role]);
                html += `<tr><td class="n">${p.n}</td><td class="nm">${esc(p.name)}</td><td class="lv">${levelBadge(p.level)}</td>
                    <td>${links.length ? links.map(k => lecChip(k.ref, k.role, k.why)).join('') : '<span class="li-muted">（三～四年级没有对应讲次）</span>'}${p.note ? `<div class="why">${esc(p.note)}</div>` : ''}</td>
                    <td class="go"><button type="button" class="li-btn small primary" data-act="open-unit" data-unit="${p.unit}">练习 →</button></td></tr>`;
            });
            html += '</tbody></table></div>';
        });
        $('map-container').innerHTML = html;
    }

    // ---------- 2. 学习单元 ----------
    function sideHtml() {
        const tp = totalProgress();
        let h = `<h4>总进度：做了 ${tp.ok + tp.bad}/${tp.total} 题 · 对 ${tp.ok} · 错 ${tp.bad}</h4>`;
        UNITS.forEach(u => {
            const pr = progressOf(u);
            h += `<button type="button" class="li-unit-item${u.id === state.unit ? ' active' : ''}" style="--cat-color:${unitColor(u)}" data-act="open-unit" data-unit="${u.id}">
                ${u.emoji} ${esc(u.title)}
                <div class="meta"><span>知识点 ${u.points.map(n => '#' + n).join(' ')}</span><span>${pr.ok + pr.bad}/${pr.total}</span></div>
                <div class="bar"><span class="ok" style="width:${pr.ok / pr.total * 100}%"></span><span class="bad" style="width:${pr.bad / pr.total * 100}%"></span></div></button>`;
        });
        h += `<div style="padding:8px"><button type="button" class="li-btn small danger" data-act="reset-all">清空全部进度</button></div>`;
        return h;
    }

    function unitLinks(u) {
        const seen = new Map();
        u.points.forEach(n => pointByN[n].links.forEach(k => {
            const prev = seen.get(k.ref);
            if (!prev || ROLE_RANK[k.role] < ROLE_RANK[prev.role]) seen.set(k.ref, k);
        }));
        return [...seen.values()].sort((a, b) => ROLE_RANK[a.role] - ROLE_RANK[b.role]);
    }

    function panguRealHtml(id) {
        const q = panguProblemMap[id];
        if (!q) return '';
        const stars = '★'.repeat(q.difficulty || 0);
        const opts = (q.options || []).map((o, i) => `<b>${LETTERS[i]})</b> ${esc(o)}`).join('　');
        const pdf = q.file ? ` <a class="li-file" href="${href(q.file)}${q.page ? '#page=' + q.page : ''}" target="_blank" rel="noopener">原题 PDF 第 ${q.page || '?'} 页</a>` : '';
        return `<details class="li-pangu-q"><summary><b>${esc(id)}</b> · ${esc(q.year)} ${esc(q.round)} 第 ${q.num} 题 · <span class="li-stars">${stars}</span> ${esc(q.title || '')}</summary>
            <div class="body">${fmt(q.translation || '')}<br>${opts}<br><span class="li-muted">思路/答案：</span>${fmt(q.hint || '')}${q.hasImage ? '<br><span class="li-muted">（含图，请看原题 PDF）</span>' : ''}${pdf}</div></details>`;
    }

    function unitHtml(u) {
        const idx = UNITS.indexOf(u);
        const liRefs = new Set(u.li.map(x => x.ref));
        const more = unitLinks(u).filter(k => !liRefs.has(k.ref));
        const pr = progressOf(u);
        const pts = u.points.map(n => { const p = pointByN[n]; return `<span class="li-chip pt" title="${esc(p.note || '')}">#${n} ${esc(p.name)} ${LEVEL[p.level].d}</span>`; }).join('');
        const gap = u.points.map(n => pointByN[n]).filter(p => p.level <= 1);
        let h = `<section style="border-top:4px solid ${unitColor(u)}">
            <h2><span>${u.emoji}</span>${esc(u.title)}<span class="li-muted">${u.id.toUpperCase()}</span></h2>
            <div style="margin-top:6px">${pts}</div>
            <div class="li-essence">${fmt(u.essence)}</div>
            ${gap.length ? `<div class="li-note">⚠ ${gap.map(p => `「${esc(p.name)}」${esc(p.note || '李永乐课程里没有对应讲次')}`).join('；')}。这部分的方法讲解以本页为准。</div>` : ''}
            <div class="li-actions"><button type="button" class="li-btn small" data-act="print" data-ans="0">打印空白卷</button><button type="button" class="li-btn small" data-act="print" data-ans="1">打印带答案</button>
            <button type="button" class="li-btn small danger" data-act="reset-unit" data-unit="${u.id}">重做本单元</button><span class="li-muted" id="unit-progress" style="align-self:center">${unitProgressText(u)}</span></div>
        </section>`;

        h += `<section><h3>① 李永乐怎么讲（先做这些讲次的习题）</h3>`;
        u.li.forEach(x => {
            const l = liLectureMap[x.ref];
            h += `<div class="li-ref">${lecChip(x.ref, (unitLinks(u).find(k => k.ref === x.ref) || {}).role)}${l ? files(l) : ''}<span class="txt">${esc(x.text)}</span></div>`;
        });
        if (more.length) h += `<div style="margin-top:8px"><span class="li-muted">同一批知识点还对应：</span>${more.map(k => lecChip(k.ref, k.role, k.why)).join('')}</div>`;
        h += `</section>`;

        h += `<section><h3>② 盘古怎么考 / 常见陷阱</h3><ul class="li-list">${u.pangu.map(t => `<li>${fmt(t)}</li>`).join('')}</ul></section>`;
        h += `<section><h3>③ 解题步骤</h3><ol class="li-list">${u.steps.map(t => `<li>${fmt(t)}</li>`).join('')}</ol>
            <div class="li-demo" style="margin-top:10px"><div class="q">精讲例题：${fmt(u.demo.q)}</div><ol>${u.demo.steps.map(s => `<li>${fmt(s)}</li>`).join('')}</ol><div class="a">答案：${fmt(u.demo.a)}</div></div></section>`;
        if (u.ids && u.ids.length) h += `<section><h3>④ 盘古真题对照（点开看原题和思路）</h3>${u.ids.map(panguRealHtml).join('')}</section>`;
        h += `<section><h3>⑤ 练习（${u.problems.length} 题：基础 → 盘古式 → 挑战）</h3>
            <p class="li-muted" style="margin-bottom:10px">选择题直接点选项；填空题先自己算，再点「显示答案和讲解」，最后自评 ✓/✗。进度保存在浏览器里。</p>
            ${u.problems.map((_, i) => probHtml(`${u.id}-${i + 1}`)).join('')}</section>`;
        h += `<div class="li-nav">${idx > 0 ? `<button type="button" class="li-btn" data-act="open-unit" data-unit="${UNITS[idx - 1].id}">← ${esc(UNITS[idx - 1].title)}</button>` : '<span></span>'}
            ${idx < UNITS.length - 1 ? `<button type="button" class="li-btn primary" data-act="open-unit" data-unit="${UNITS[idx + 1].id}">${esc(UNITS[idx + 1].title)} →</button>` : '<span></span>'}</div>`;
        return h;
    }

    function renderUnits() {
        if (!UNITS.length) { $('units-container').innerHTML = '<div class="li-intro"><p>还没有加载到学习单元数据（li-study-*.js）。</p></div>'; return; }
        const u = unitById[state.unit] || UNITS[0];
        state.unit = u.id;
        $('units-container').innerHTML = `<div class="li-units-layout"><aside class="li-side" id="li-side">${sideHtml()}</aside><div class="li-main" id="unit-main">${unitHtml(u)}</div></div>`;
    }

    // ---------- 题目卡 ----------
    function probHtml(pid, showUnit) {
        const f = findProblem(pid);
        if (!f) return '';
        const { u, p, idx } = f;
        const st = prog[pid];
        const ui = UI[pid] || {};
        const picked = ui.picked != null;
        const revealed = !!ui.revealed || picked;
        const cls = st === 'ok' ? ' ok' : st === 'wrong' ? ' bad' : '';
        let opts = '';
        if (p.opts) {
            opts = `<div class="li-opts">${p.opts.map((o, k) => {
                let c = 'li-opt';
                if (picked) { if (LETTERS[k] === p.a) c += ' correct'; else if (k === ui.picked) c += ' wrong'; }
                return `<button type="button" class="${c}" data-act="pick" data-pid="${pid}" data-i="${k}"${picked ? ' disabled' : ''}><b>${LETTERS[k]})</b>${esc(o)}</button>`;
            }).join('')}</div>`;
        }
        const ansText = p.opts ? `${p.a}）${p.opts[LETTERS.indexOf(p.a)]}` : p.a;
        const stTxt = st === 'ok' ? '<span class="st ok">✓ 做对</span>' : st === 'wrong' ? '<span class="st bad">✗ 做错</span>' : '';
        const acts = p.opts
            ? `<button type="button" class="li-btn small" data-act="reveal" data-pid="${pid}">显示答案和讲解</button>${st || picked ? `<button type="button" class="li-btn small" data-act="redo" data-pid="${pid}">重做此题</button>` : ''}`
            : `<button type="button" class="li-btn small" data-act="reveal" data-pid="${pid}">显示答案和讲解</button>
               <button type="button" class="li-btn small" data-act="ok" data-pid="${pid}">✓ 做对了</button><button type="button" class="li-btn small" data-act="wrong" data-pid="${pid}">✗ 做错了</button>${st ? `<button type="button" class="li-btn small" data-act="redo" data-pid="${pid}">重做此题</button>` : ''}`;
        return `<div class="li-prob${cls}" id="prob-${pid}" data-pid="${pid}">
            <div class="li-prob-head"><span class="li-badge prob${p.lv}">${PROB_LV[p.lv]}</span><span class="pid">${showUnit ? esc(u.title) + ' · ' : ''}第 ${idx} 题</span>${stTxt}</div>
            <div class="li-q">${fmt(p.q)}</div>${p.fig || ''}${opts}
            <div class="li-actions">${acts}</div>
            <div class="li-answer${revealed ? '' : ' hide'}"><span class="a">答案：${esc(ansText)}</span><br>${fmt(p.why)}</div></div>`;
    }
    function refreshProb(pid) {
        const el = $('prob-' + pid);
        if (!el) return;
        const showUnit = state.view === 'practice';
        el.outerHTML = probHtml(pid, showUnit);
        const side = $('li-side');
        if (side) side.innerHTML = sideHtml();
        const up = $('unit-progress');
        if (up && unitById[state.unit]) up.textContent = unitProgressText(unitById[state.unit]);
    }

    // ---------- 3. 讲次反查 ----------
    function renderLectures() {
        const g = state.lecGrade;
        const list = liLectures.filter(l => (g === 5 ? l.grade >= 5 : l.grade === g));
        const covered = l => !!rev[l.id];
        let html = `<div class="li-intro"><h2>按李永乐的讲次反查：这一讲对应盘古 AK4 的哪些知识点？</h2>
            <p>灰色的讲次是盘古 AK4 基本不考的内容，可以照李永乐的进度学，不必为盘古专门练。五、六年级只列出被引用到的讲次。</p></div>
            <div class="li-filter">${[[3, '三年级'], [4, '四年级'], [5, '五、六年级（被引用）']].map(([k, t]) => `<button type="button" class="li-btn small${g === k ? ' active' : ''}" data-act="lec-grade" data-g="${k}">${t}</button>`).join('')}</div>`;
        if (g === 3 || g === 4) {
            const hit = list.filter(covered).length;
            html += `<div class="li-note" style="margin:0 0 12px">${liGradeName[g]}共 ${list.length} 讲，其中 <b>${hit}</b> 讲与盘古 AK4 的知识点有对应，<b>${list.length - hit}</b> 讲基本不涉及。</div>`;
        }
        html += `<div class="li-box"><div class="li-lec-row head"><div>讲次</div><div>标题 / 专题</div><div>文件</div><div>对应的盘古 AK4 知识点</div></div>`;
        list.forEach(l => {
            const rs = (rev[l.id] || []).slice().sort((a, b) => ROLE_RANK[a.role] - ROLE_RANK[b.role]);
            const chips = rs.map(r => r.n != null
                ? pointChip(r.n, r.role, r.why)
                : `<span class="li-chip static" title="${esc(r.why)}">＋ ${esc(liAk4Extras[r.extra].name)}</span>`).join('');
            const skip = (g === 3 || g === 4) && !rs.length;
            html += `<div class="li-lec-row${l.id === state.hlRef ? ' hl' : ''}${skip ? ' skip' : ''}" id="lec-${l.id}">
                <div><b>${liGradeName[l.grade].replace('年级', '')}·${l.no}</b></div>
                <div class="t">${esc(l.title)}<small>${l.topicNo ? '专题' + l.topicNo + ' ' + esc(l.topic) : '（讲义文件缺失）'}</small></div>
                <div>${files(l)}</div>
                <div>${chips || '<span class="li-muted">盘古 AK4 基本不涉及</span>'}</div></div>`;
        });
        html += '</div>';
        const missing = list.filter(l => !l.exercise);
        if (missing.length) html += `<div class="li-note">资料里没有习题/答案文件的讲次：${missing.map(l => `${l.no} ${esc(l.title)}`).join('、')}。</div>`;
        $('lectures-container').innerHTML = html;
        state.hlRef = null;
    }

    // ---------- 4. 缺口与补充 ----------
    function renderGaps() {
        const pts = liAk4Map.filter(p => p.level <= 1).sort((a, b) => a.level - b.level || a.n - b.n);
        let html = `<div class="li-intro"><h2>缺口：李永乐课程没有（或只在高年级才讲）的 AK4 考点</h2>
            <p>这些考点在李永乐三、四年级里没有专门讲次。对应的方法讲解、练习都在学习单元里补齐，也列出了五、六年级里最接近的讲次作参考（标「延伸」）。</p></div>
            <div class="li-box"><h3>① 缺口 / 间接对应的知识点（${pts.length} 个）</h3>`;
        pts.forEach(p => {
            html += `<div class="li-gap"><h4>#${p.n} ${esc(p.name)} ${levelBadge(p.level)} <button type="button" class="li-btn small primary" data-act="open-unit" data-unit="${p.unit}">去补充练习 →</button></h4>
                <div>${esc(p.note || '')}</div><div>${p.links.map(k => lecChip(k.ref, k.role, k.why)).join('') || '<span class="li-muted">（没有可参考的讲次）</span>'}</div></div>`;
        });
        html += '</div>';

        html += `<div class="li-box"><h3>② 盘古真题里还出现、但不在 52 个知识点里的考点（${liAk4Extras.length} 个）</h3>
            <p>来自 KNOWLEDGE_POINTS_AK4.md 的统计，顺手对到李永乐讲次。</p>`;
        liAk4Extras.forEach(e => {
            html += `<div class="li-gap"><h4>${esc(e.name)}</h4><div class="li-muted">盘古真题：${e.pangu.map(esc).join('、')}</div><div>${e.links.map(k => lecChip(k.ref, k.role, k.why)).join('')}</div></div>`;
        });
        html += '</div>';

        const skip = liLectures.filter(l => l.grade === 4 && !rev[l.id]);
        html += `<div class="li-box"><h3>③ 李永乐四年级里，盘古 AK4 基本不涉及的讲次（${skip.length} 讲）</h3>
            <p>想为盘古备考、时间又紧的话，这些讲次可以放到后面；它们对学校数学、五年级以后的盘古（AK5+）仍然有用。</p>
            <div style="padding:0 20px 14px">${skip.map(l => lecChip(l.id, null, '')).join('')}</div></div>`;
        $('gaps-container').innerHTML = html;
    }

    // ---------- 5. 抽题练习 ----------
    function buildQueue() {
        const f = state.practice;
        let pool = allPids.slice();
        if (f.unit !== 'all') pool = pool.filter(pid => pid.startsWith(f.unit + '-'));
        if (f.lv !== 'all') pool = pool.filter(pid => findProblem(pid).p.lv === +f.lv);
        if (f.status === 'todo') pool = pool.filter(pid => !prog[pid]);
        if (f.status === 'wrong') pool = pool.filter(pid => prog[pid] === 'wrong');
        if (f.status === 'ok') pool = pool.filter(pid => prog[pid] === 'ok');
        for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
        f.queue = pool; f.i = 0;
    }
    function renderPractice() {
        const f = state.practice;
        if (!f.queue.length && !f._built) { buildQueue(); f._built = true; }
        const sel = (id, val, opts) => `<select class="li-select" id="${id}">${opts.map(([k, t]) => `<option value="${k}"${String(val) === String(k) ? ' selected' : ''}>${esc(t)}</option>`).join('')}</select>`;
        let html = `<div class="li-practice-wrap"><div class="li-intro"><h2>抽题练习</h2><p>从全部 ${allPids.length} 道练习里按条件随机抽题。选「错题」就是错题本，答对一次会变成「已做对」。</p></div>
            <div class="li-filter">
                ${sel('pf-unit', f.unit, [['all', '全部单元']].concat(UNITS.map(u => [u.id, u.emoji + ' ' + u.title])))}
                ${sel('pf-lv', f.lv, [['all', '全部难度'], ['1', PROB_LV[1]], ['2', PROB_LV[2]], ['3', PROB_LV[3]]])}
                ${sel('pf-status', f.status, [['all', '全部状态'], ['todo', '还没做'], ['wrong', '错题'], ['ok', '已做对']])}
                <button type="button" class="li-btn small primary" data-act="practice-go">抽题</button>
            </div>`;
        if (!f.queue.length) {
            html += '<div class="li-intro"><p>这个条件下没有题目。换一个条件试试。</p></div>';
        } else {
            const pid = f.queue[f.i];
            html += `<div class="li-muted" style="margin-bottom:8px">第 ${f.i + 1} / ${f.queue.length} 题</div>${probHtml(pid, true)}
                <div class="li-nav"><button type="button" class="li-btn" data-act="practice-prev"${f.i === 0 ? ' disabled' : ''}>← 上一题</button>
                <button type="button" class="li-btn" data-act="open-unit" data-unit="${findProblem(pid).u.id}">回到这个单元</button>
                <button type="button" class="li-btn primary" data-act="practice-next"${f.i >= f.queue.length - 1 ? ' disabled' : ''}>下一题 →</button></div>`;
        }
        $('practice-container').innerHTML = html + '</div>';
    }

    // ---------- 事件 ----------
    function markProblem(pid, val) {
        if (val) prog[pid] = val; else delete prog[pid];
        saveProg();
    }
    document.addEventListener('click', e => {
        const el = e.target.closest('[data-act]');
        if (!el || el.disabled) return;
        const act = el.dataset.act;
        const pid = el.dataset.pid;
        switch (act) {
            case 'open-unit': openUnit(el.dataset.unit); break;
            case 'open-lec': openLecture(el.dataset.ref); break;
            case 'map-filter': state.mapLevel = el.dataset.k; renderMap(); break;
            case 'lec-grade': state.lecGrade = +el.dataset.g; state.hlRef = null; renderLectures(); break;
            case 'pick': {
                const f = findProblem(pid);
                const k = +el.dataset.i;
                UI[pid] = Object.assign(UI[pid] || {}, { picked: k, revealed: true });
                markProblem(pid, LETTERS[k] === f.p.a ? 'ok' : 'wrong');
                refreshProb(pid);
                break;
            }
            case 'reveal': UI[pid] = Object.assign(UI[pid] || {}, { revealed: true }); refreshProb(pid); break;
            case 'ok': UI[pid] = Object.assign(UI[pid] || {}, { revealed: true }); markProblem(pid, 'ok'); refreshProb(pid); break;
            case 'wrong': UI[pid] = Object.assign(UI[pid] || {}, { revealed: true }); markProblem(pid, 'wrong'); refreshProb(pid); break;
            case 'redo': delete UI[pid]; markProblem(pid, null); refreshProb(pid); break;
            case 'reset-unit':
                if (confirm('清除这个单元的做题记录？')) { unitById[el.dataset.unit].problems.forEach((_, i) => { delete UI[`${el.dataset.unit}-${i + 1}`]; delete prog[`${el.dataset.unit}-${i + 1}`]; }); saveProg(); renderUnits(); }
                break;
            case 'reset-all':
                if (confirm('清除全部做题记录？此操作不能撤销。')) { prog = {}; Object.keys(UI).forEach(k => delete UI[k]); saveProg(); renderUnits(); }
                break;
            case 'print':
                document.body.classList.toggle('li-print-answers', el.dataset.ans === '1');
                window.print();
                break;
            case 'practice-go': readPracticeFilters(); buildQueue(); renderPractice(); break;
            case 'practice-prev': state.practice.i = Math.max(0, state.practice.i - 1); renderPractice(); break;
            case 'practice-next': state.practice.i = Math.min(state.practice.queue.length - 1, state.practice.i + 1); renderPractice(); break;
            default: break;
        }
    });
    function readPracticeFilters() {
        const f = state.practice;
        f.unit = $('pf-unit').value; f.lv = $('pf-lv').value; f.status = $('pf-status').value;
    }
    window.addEventListener('afterprint', () => document.body.classList.remove('li-print-answers'));
    document.querySelectorAll('#li-tabs .tab-btn').forEach(b => b.addEventListener('click', () => switchView(b.dataset.view)));

    // ---------- 启动 ----------
    (function init() {
        const tp = totalProgress();
        $('li-subtitle').textContent = `${liAk4Map.length} 知识点 · ${UNITS.length} 单元 · ${tp.total} 题`;
        const q = new URLSearchParams(location.search);
        if (q.get('unit') && unitById[q.get('unit')]) state.unit = q.get('unit');
        if (q.get('point') && pointByN[+q.get('point')]) { state.unit = pointByN[+q.get('point')].unit; if (!q.get('view')) q.set('view', 'units'); }
        if (q.get('ref') && liLectureMap[q.get('ref')]) { state.hlRef = q.get('ref'); state.lecGrade = liLectureMap[q.get('ref')].grade >= 5 ? 5 : liLectureMap[q.get('ref')].grade; if (!q.get('view')) q.set('view', 'lectures'); }
        switchView(q.get('view') || 'map', true);
        if (state.view === 'lectures') { const el = document.querySelector('.li-lec-row.hl'); if (el) el.scrollIntoView({ block: 'center' }); }
    })();
})();
