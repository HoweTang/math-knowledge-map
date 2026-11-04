// ============= 学而思秘籍页面逻辑 =============
// 依赖: data.js / german-data.js / pangu-data.js / xes-data.js / xes-cards.js

// ---------- 小工具 ----------
const esc = s => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const $ = id => document.getElementById(id);

const LEC_BY_KEY = Object.fromEntries(xesLectures.map(l => [l.key, l]));
const LEVEL_META = Object.fromEntries(xesLevels.map(l => [l.level, l]));
const CHAIN_INDEX = Object.fromEntries(xesChains.map((c, i) => [c.id, i]));
const elementaryNodeMap = Object.fromEntries((knowledgeNodes || []).map(n => [n.id, n]));
const germanNodeMap = Object.fromEntries((germanNodes || []).map(n => [n.id, n]));

// 前置 / 后续 / 相关 索引
const IN_PREREQ = {}, OUT_PREREQ = {}, RELATED = {};
xesLinks.forEach(e => {
    if (e.type === 'prerequisite') {
        (OUT_PREREQ[e.source] = OUT_PREREQ[e.source] || []).push(e.target);
        (IN_PREREQ[e.target] = IN_PREREQ[e.target] || []).push(e.source);
    } else {
        (RELATED[e.source] = RELATED[e.source] || []).push({ id: e.target, label: e.label });
        (RELATED[e.target] = RELATED[e.target] || []).push({ id: e.source, label: e.label });
    }
});

function catColor(cat) { return xesCategoryColors[cat] || '#9E9E9E'; }

// ---------- 状态 ----------
let currentView = 'chains';
let levelRange = null;                // null | [lo, hi]
let cardChainId = xesChains[0].id;
const lecFilter = { text: '', category: 'all', chain: 'all', method: 'all', pangu: 'all', status: 'all' };

// ---------- 学习进度 (localStorage) ----------
const PROGRESS_KEY = 'xesProgress_v1';
let xesProgress = loadJson(PROGRESS_KEY, {});
function loadJson(key, fallback) {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch (e) { return fallback; }
}
function saveProgress() { try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(xesProgress)); } catch (e) { /* 隐私模式忽略 */ } }
function getProgress(id) { return xesProgress[id] || { status: 'todo', mastery: 0, ts: 0 }; }
function statusOf(id) { return getProgress(id).status; }
function setStatus(id, status) {
    const p = getProgress(id);
    p.status = (p.status === status && status !== 'todo') ? 'todo' : status;
    if (p.status === 'todo') p.mastery = 0;
    p.ts = Date.now();
    xesProgress[id] = p;
    saveProgress();
    afterProgressChange(id);
}
function setMastery(id, m) {
    const p = getProgress(id);
    p.mastery = (p.mastery === m) ? m - 1 : m;
    if (p.mastery > 0 && p.status === 'todo') p.status = 'done';
    p.ts = Date.now();
    xesProgress[id] = p;
    saveProgress();
    afterProgressChange(id);
}
function afterProgressChange(id) {
    if ($('detail-panel').classList.contains('open') && openLectureId === id) showLecture(id, true);
    refreshCurrentView();
}
const STATUS_TEXT = { todo: '未学', learning: '在学', done: '已学' };

// ---------- 过滤 ----------
function inRange(level) { return !levelRange || (level >= levelRange[0] && level <= levelRange[1]); }

function filterLevel(range) {
    levelRange = range === 'all' ? null : range.split('-').map(Number);
    document.querySelectorAll('#level-filter .grade-btn').forEach(b => b.classList.toggle('active', b.dataset.range === range));
    refreshCurrentView();
}

// ---------- 初始化 ----------
document.addEventListener('DOMContentLoaded', () => {
    initGraphControls();
    const params = new URLSearchParams(location.search);
    const view = params.get('view');
    if (params.get('chain') && xesChainMap[params.get('chain')]) {
        cardChainId = params.get('chain');
        if (!view) { switchView('cards'); }
    }
    if (params.get('pangu')) {
        lecFilter.pangu = params.get('pangu');
        switchView('lectures');
    } else if (view && ['chains', 'graph', 'lectures', 'cards', 'methods', 'progress', 'problems', 'practice', 'wrong'].includes(view)) {
        switchView(view);
    } else if (!params.get('chain')) {
        switchView('chains');
    }
    if (params.get('graphchain') && xesChainMap[params.get('graphchain')]) {
        $('graph-chain').value = params.get('graphchain');
        switchView('graph');
    }
    const lec = params.get('lecture');
    if (lec) {
        const id = xesLectureMap[lec] ? lec : (LEC_BY_KEY[lec] ? LEC_BY_KEY[lec].id : null);
        if (id) setTimeout(() => showLecture(id), 200);
    }
});

// ---------- 视图切换 ----------
function switchView(view) {
    currentView = view;
    document.querySelectorAll('#xes-tabs .tab-btn').forEach(b => b.classList.toggle('active', b.dataset.view === view));
    document.querySelectorAll('.view-panel').forEach(p => p.classList.toggle('active', p.id === view + '-view'));
    refreshCurrentView();
}

function refreshCurrentView() {
    const fn = VIEW_RENDERERS[currentView];
    if (fn) fn();
}

// ---------- 通用片段 ----------
function lecTag(l, withLevel = true) {
    return `<span class="xes-tag" style="border-left:3px solid ${catColor(l.category)}" onclick="showLecture('${l.id}')">${withLevel ? l.level + '级' + l.no + '讲 ' : ''}${esc(l.title)}</span>`;
}
function chainTag(cid) {
    const c = xesChainMap[cid];
    return `<span class="xes-tag chain" style="background:${c.color}" onclick="openCard('${c.id}')">${c.icon} ${esc(c.name)}</span>`;
}
function methodTag(mid) {
    const m = xesMethodMap[mid];
    return `<span class="xes-tag method" onclick="showMethodLectures('${m.id}')">${m.icon} ${esc(m.name)}</span>`;
}
function chip(l) {
    const st = statusOf(l.id);
    return `<button class="xes-chip status-${st}" style="--cat:${catColor(l.category)}" onclick="showLecture('${l.id}')" title="${esc(xesLectureLabel(l))}">
        <span class="no">第 ${l.no} 讲</span>${esc(l.title)}</button>`;
}
function chainProgress(c) {
    const ids = c.lectures.filter(id => inRange(xesLectureMap[id].level));
    const done = ids.filter(id => statusOf(id) === 'done').length;
    return { total: ids.length, done };
}

// =====================================================================
//  视图 1: 学习链 (泳道)
// =====================================================================
function renderChains() {
    const box = $('chains-container');
    let html = `<div class="xes-intro">
        <h2>🔗 学习链: 把 238 讲串成 ${xesChains.length} 条线</h2>
        <p>书是按「级、讲」排的,但同一个思想会在不同级别以「初步 → 进阶 → 综合」反复出现。这里把它们按知识脉络重新串起来:
        每条链里,<b>越靠右的讲次越依赖左边的讲次</b>。学新内容之前,沿着链往左回看一两讲,往往比重复讲当前这一讲更管用。
        点任何一讲查看前置与关联,点「教学卡」看这条链怎么教。</p>
        <p class="xes-note">颜色表示讲次类别,绿底 ✓ 表示已学,黄底表示在学。级别对应年级为按「每级约 5 个月」推算的估计。</p>
    </div>`;

    xesChains.forEach(c => {
        const prog = chainProgress(c);
        if (!prog.total) return;
        // 该链在当前级别范围内用到的级别
        const levels = [...new Set(c.lectures.map(id => xesLectureMap[id].level).filter(inRange))].sort((a, b) => a - b);
        const card = xesChainCards[c.id];
        const pct = prog.total ? Math.round(prog.done / prog.total * 100) : 0;
        const cols = `124px repeat(${levels.length}, minmax(118px, 1fr))`;

        let lane = `<div class="xes-lane" style="grid-template-columns:${cols}"><div></div>`;
        levels.forEach(lv => {
            lane += `<div class="xes-lane-head">${lv} 级<small>${esc(LEVEL_META[lv].grade)}</small></div>`;
        });
        c.tracks.forEach(tr => {
            const lecs = tr.lectures.map(id => xesLectureMap[id]).filter(l => inRange(l.level));
            if (!lecs.length) return;
            lane += `<div class="xes-track-name">${esc(tr.name)}</div>`;
            levels.forEach(lv => {
                const inCell = lecs.filter(l => l.level === lv);
                lane += `<div class="xes-cell${inCell.length ? '' : ' empty'}">${inCell.map(chip).join('')}</div>`;
            });
        });
        lane += '</div>';

        html += `<section class="xes-chain" style="--chain-color:${c.color}">
            <div class="xes-chain-head">
                <div class="xes-chain-title"><span class="icon">${c.icon}</span><h2>${esc(c.name)}</h2>
                    <span class="count">${prog.total} 讲 · 已学 ${prog.done}</span></div>
                <div class="xes-chain-actions">
                    <button class="xes-btn" onclick="openCard('${c.id}')">📇 教学卡</button>
                    <button class="xes-btn" onclick="showChainInGraph('${c.id}')">🕸 在图谱中查看</button>
                </div>
                <div class="xes-chain-essence">${esc(card ? card.essence : '')}</div>
            </div>
            <div class="xes-chain-progress"><span style="width:${pct}%"></span></div>
            <div class="xes-lane-scroll">${lane}</div>
        </section>`;
    });
    box.innerHTML = html;
}

// =====================================================================
//  视图 2: 知识图谱 (D3, 横轴 = 级别)
// =====================================================================
let gSvg = null, gGroup = null, gSim = null, gZoom = null;

function initGraphControls() {
    const sel = $('graph-chain');
    sel.innerHTML = '<option value="all">全部知识链</option>' + xesChains.map(c => `<option value="${c.id}">${c.icon} ${esc(c.name)}</option>`).join('');
    const cat = $('graph-category');
    cat.innerHTML = '<option value="all">全部类别</option>' + Object.entries(xesCategoryNames).map(([k, v]) => `<option value="${k}">${v}</option>`).join('');
    $('graph-legend-cats').innerHTML = Object.entries(xesCategoryNames)
        .map(([k, v]) => `<div class="legend-item"><span class="dot cat-${k}"></span> ${v}</div>`).join('');
}
function onGraphFilter() { renderGraph(); }
function showChainInGraph(cid) {
    $('graph-chain').value = cid;
    $('graph-category').value = 'all';
    switchView('graph');
}

function renderGraph() {
    const cont = $('xes-graph-container');
    const W = cont.clientWidth || 1000, H = cont.clientHeight || 600;
    if (gSim) gSim.stop();
    gSvg = d3.select('#xes-graph');
    gSvg.selectAll('*').remove();
    gSvg.attr('width', W).attr('height', H);

    gSvg.append('defs').append('marker').attr('id', 'xes-arrow').attr('viewBox', '0 -5 10 10')
        .attr('refX', 14).attr('refY', 0).attr('markerWidth', 5).attr('markerHeight', 5).attr('orient', 'auto')
        .append('path').attr('d', 'M0,-5L10,0L0,5').attr('fill', '#78909c');

    gGroup = gSvg.append('g');
    gZoom = d3.zoom().scaleExtent([0.4, 4]).on('zoom', e => gGroup.attr('transform', e.transform));
    gSvg.call(gZoom);
    gSvg.on('click', () => { /* 空白处点击不关闭面板, 避免误触 */ });

    const chainSel = $('graph-chain').value, catSel = $('graph-category').value;
    const lecs = xesLectures.filter(l => inRange(l.level)
        && (chainSel === 'all' || l.chains.includes(chainSel))
        && (catSel === 'all' || l.category === catSel));
    const idSet = new Set(lecs.map(l => l.id));

    // 行: 全部链时按"第一条所属链"分行; 选定链时按轨道分行
    let rowOf, rowLabels;
    if (chainSel === 'all') {
        rowOf = l => CHAIN_INDEX[l.chains[0]];
        rowLabels = xesChains.map(c => c.icon + ' ' + c.name);
    } else {
        const chain = xesChainMap[chainSel];
        rowOf = l => { const i = chain.tracks.findIndex(t => t.lectures.includes(l.id)); return i < 0 ? 0 : i; };
        rowLabels = chain.tracks.map(t => t.name);
    }
    const rows = rowLabels.length;
    const lo = levelRange ? levelRange[0] : 1, hi = levelRange ? levelRange[1] : 12;
    const mx = 150, top = 92, bottom = 56;
    const xScale = d3.scaleLinear().domain([lo, hi === lo ? lo + 1 : hi]).range([mx, Math.max(W - 60, mx + 200)]);
    const rowH = (H - top - bottom) / rows;
    const yOf = r => top + (r + 0.5) * rowH;

    // 坐标轴与行标签
    for (let lv = lo; lv <= hi; lv++) {
        gGroup.append('line').attr('class', 'xes-axis-line').attr('x1', xScale(lv)).attr('x2', xScale(lv)).attr('y1', top - 10).attr('y2', H - bottom + 10);
        gGroup.append('text').attr('class', 'xes-axis-label').attr('x', xScale(lv)).attr('y', top - 16).text(lv + ' 级');
    }
    rowLabels.forEach((lb, i) => {
        gGroup.append('text').attr('x', 10).attr('y', yOf(i) + 4).attr('font-size', 11).attr('fill', '#607d8b').attr('font-weight', 600).text(lb);
        gGroup.append('line').attr('x1', 8).attr('x2', W - 10).attr('y1', top + i * rowH).attr('y2', top + i * rowH).attr('stroke', '#eceff1');
    });

    const nodes = lecs.map(l => ({ ...l, tx: xScale(l.level), ty: yOf(rowOf(l)), x: xScale(l.level), y: yOf(rowOf(l)) }));
    const nodeById = Object.fromEntries(nodes.map(n => [n.id, n]));
    const links = xesLinks.filter(e => idSet.has(e.source) && idSet.has(e.target))
        .map(e => ({ source: e.source, target: e.target, type: e.type, cross: rowOf(xesLectureMap[e.source]) !== rowOf(xesLectureMap[e.target]) }));

    const link = gGroup.append('g').selectAll('line').data(links).join('line')
        .attr('class', d => 'xes-link ' + d.type + (d.cross ? ' cross' : ''))
        .attr('marker-end', d => d.type === 'prerequisite' ? 'url(#xes-arrow)' : null);

    const showAll = $('graph-labels').checked || nodes.length <= 45;
    const node = gGroup.append('g').selectAll('g').data(nodes).join('g')
        .attr('class', d => 'xes-node ' + statusOf(d.id))
        .style('cursor', 'pointer')
        .call(d3.drag()
            .on('start', (e, d) => { if (!e.active) gSim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
            .on('drag', (e, d) => { d.fx = e.x; d.fy = e.y; })
            .on('end', (e, d) => { if (!e.active) gSim.alphaTarget(0); d.fx = null; d.fy = null; }));
    node.append('circle').attr('r', 8).attr('fill', d => catColor(d.category));
    node.append('text').attr('class', 'lbl').attr('dy', 20).style('display', showAll ? null : 'none').text(d => d.title);
    node.append('title').text(d => xesLectureLabel(d));
    node.on('click', (e, d) => { e.stopPropagation(); showLecture(d.id); });

    // 邻接 (用于高亮)
    const adj = {};
    links.forEach(e => {
        const s = typeof e.source === 'object' ? e.source.id : e.source, t = typeof e.target === 'object' ? e.target.id : e.target;
        (adj[s] = adj[s] || new Set()).add(t);
        (adj[t] = adj[t] || new Set()).add(s);
    });
    node.on('mouseenter', (e, d) => {
        const ids = new Set([d.id, ...(adj[d.id] || [])]);
        node.classed('dimmed', n => !ids.has(n.id));
        node.select('text.lbl').style('display', n => ids.has(n.id) ? null : (showAll ? null : 'none'));
        const touches = l => {
            const s = typeof l.source === 'object' ? l.source.id : l.source, t = typeof l.target === 'object' ? l.target.id : l.target;
            return s === d.id || t === d.id;
        };
        link.classed('dimmed', l => !touches(l)).classed('hl', touches);
    }).on('mouseleave', () => {
        node.classed('dimmed', false);
        node.select('text.lbl').style('display', showAll ? null : 'none');
        link.classed('dimmed', false).classed('hl', false);
    });

    gSim = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(34).strength(0.02))
        .force('x', d3.forceX(d => d.tx).strength(0.9))
        .force('y', d3.forceY(d => d.ty).strength(0.3))
        .force('collide', d3.forceCollide(showAll ? 17 : 11))
        .force('charge', d3.forceManyBody().strength(-6))
        .on('tick', () => {
            link.attr('x1', d => d.source.x).attr('y1', d => d.source.y).attr('x2', d => d.target.x).attr('y2', d => d.target.y);
            node.attr('transform', d => `translate(${d.x},${d.y})`);
        });
    // 保存给其它函数用
    renderGraph._nodes = nodeById;
}
window.addEventListener('resize', () => { if (currentView === 'graph') renderGraph(); });

// =====================================================================
//  视图 3: 讲次目录
// =====================================================================
function lecturePassesFilter(l) {
    if (!inRange(l.level)) return false;
    if (lecFilter.category !== 'all' && l.category !== lecFilter.category) return false;
    if (lecFilter.chain !== 'all' && !l.chains.includes(lecFilter.chain)) return false;
    if (lecFilter.method !== 'all' && !l.methods.includes(lecFilter.method)) return false;
    if (lecFilter.pangu !== 'all' && !l.pangu.includes(lecFilter.pangu)) return false;
    if (lecFilter.status !== 'all' && statusOf(l.id) !== lecFilter.status) return false;
    const t = lecFilter.text.trim();
    if (t && !(l.title.includes(t) || (l.level + '级').includes(t) || (l.level + '级' + l.no + '讲').includes(t))) return false;
    return true;
}

function renderLectures() {
    const box = $('lectures-container');
    if (!$('lec-list')) {
        const opt = (arr, all) => `<option value="all">${all}</option>` + arr.map(([v, t]) => `<option value="${v}">${esc(t)}</option>`).join('');
        box.innerHTML = `
        <div class="xes-intro"><h2>📚 讲次目录</h2>
            <p>12 本书、${xesLectures.length} 讲。可以按类别、知识链、解题武器、对应的盘古主题和学习状态筛选。点击卡片查看这一讲在知识链上的位置,以及它的前置与后续。</p>
            <p class="xes-note">2 级与 8 级的文件夹里没有「第 20 讲」,可能是拷贝时漏了,书里应该有。</p></div>
        <div class="xes-toolbar">
            <input type="search" id="lec-search" placeholder="搜索讲名,如 鸡兔 / 5级" oninput="onLecFilter()">
            <select class="topic-select" id="lec-cat" onchange="onLecFilter()">${opt(Object.entries(xesCategoryNames), '全部类别')}</select>
            <select class="topic-select" id="lec-chain" onchange="onLecFilter()">${opt(xesChains.map(c => [c.id, c.icon + ' ' + c.name]), '全部知识链')}</select>
            <select class="topic-select" id="lec-method" onchange="onLecFilter()">${opt(xesMethods.map(m => [m.id, m.icon + ' ' + m.name]), '全部解题武器')}</select>
            <select class="topic-select" id="lec-pangu" onchange="onLecFilter()">${opt(panguNodes.map(n => [n.id, '盘古 · ' + n.name]), '全部盘古主题')}</select>
            <span class="spacer"></span>
            <button class="xes-btn active" data-st="all" onclick="setLecStatus('all')">全部</button>
            <button class="xes-btn" data-st="todo" onclick="setLecStatus('todo')">未学</button>
            <button class="xes-btn" data-st="learning" onclick="setLecStatus('learning')">在学</button>
            <button class="xes-btn" data-st="done" onclick="setLecStatus('done')">已学</button>
        </div>
        <div id="lec-list"></div>`;
    }
    $('lec-search').value = lecFilter.text;
    $('lec-cat').value = lecFilter.category;
    $('lec-chain').value = lecFilter.chain;
    $('lec-method').value = lecFilter.method;
    $('lec-pangu').value = lecFilter.pangu;
    box.querySelectorAll('[data-st]').forEach(b => b.classList.toggle('active', b.dataset.st === lecFilter.status));
    renderLectureList();
}
function onLecFilter() {
    lecFilter.text = $('lec-search').value;
    lecFilter.category = $('lec-cat').value;
    lecFilter.chain = $('lec-chain').value;
    lecFilter.method = $('lec-method').value;
    lecFilter.pangu = $('lec-pangu').value;
    renderLectureList();
}
function setLecStatus(s) {
    lecFilter.status = s;
    $('lectures-container').querySelectorAll('[data-st]').forEach(b => b.classList.toggle('active', b.dataset.st === s));
    renderLectureList();
}
function showMethodLectures(mid) {
    lecFilter.method = mid;
    switchView('lectures');
    closeDetail();
}
function resetLecFilter() {
    Object.assign(lecFilter, { text: '', category: 'all', chain: 'all', method: 'all', pangu: 'all', status: 'all' });
    renderLectures();
}

function renderLectureList() {
    const list = $('lec-list');
    const items = xesLectures.filter(lecturePassesFilter);
    let html = `<p style="margin:0 0 14px;font-size:13px;color:#7f8c8d">共 <b>${items.length}</b> 讲 ${items.length < xesLectures.length ? '<button class="xes-btn" onclick="resetLecFilter()">清除筛选</button>' : ''}</p>`;
    const byLevel = {};
    items.forEach(l => (byLevel[l.level] = byLevel[l.level] || []).push(l));
    Object.keys(byLevel).map(Number).sort((a, b) => a - b).forEach(lv => {
        const meta = LEVEL_META[lv];
        html += `<div class="grade-section"><h2 class="grade-section-title">
            <span class="grade-badge" style="background:${levelColor(lv)}">${lv} 级</span>
            <span class="xes-level-title">${esc(meta.grade)} · ${esc(meta.stage)}<small>${meta.lectureCount} 讲${meta.missing.length ? ' (缺第 ' + meta.missing.join('、') + ' 讲)' : ''}</small></span></h2>
            <div class="xes-lecture-grid">${byLevel[lv].map(lectureCard).join('')}</div></div>`;
    });
    if (!items.length) html += '<p style="text-align:center;color:#999;padding:40px">没有符合条件的讲次</p>';
    list.innerHTML = html;
}
function levelColor(lv) {
    const palette = ['#66BB6A', '#43A047', '#26A69A', '#00ACC1', '#42A5F5', '#5C6BC0', '#7E57C2', '#AB47BC', '#EC407A', '#EF5350', '#FF7043', '#8D6E63'];
    return palette[(lv - 1) % palette.length];
}
function lectureCard(l) {
    const st = statusOf(l.id);
    const mark = st === 'done' ? '✅' : st === 'learning' ? '🟡' : '';
    return `<div class="xes-lecture-card status-${st}" style="--cat:${catColor(l.category)}" onclick="showLecture('${l.id}')">
        <span class="state">${mark}</span>
        <h4>第 ${l.no} 讲 · ${esc(l.title)}</h4>
        <div class="meta"><span class="topic-category cat-bg-${l.category}" style="padding:1px 8px;border-radius:9px;color:#fff;font-size:11px">${esc(xesCategoryNames[l.category])}</span>
            ${typeof xesHasProblems === 'function' && xesHasProblems(l.id) ? '<span title="已从书里提取例题与练习 (见「题库」)">📝 有题库</span>' : ''}</div>
        <div>${l.chains.map(chainTag).join('')}${l.methods.map(methodTag).join('')}</div>
    </div>`;
}

// =====================================================================
//  视图 4: 教学卡
// =====================================================================
function openCard(cid) {
    cardChainId = cid;
    closeDetail();
    switchView('cards');
}

function renderCards() {
    const box = $('cards-container');
    const chain = xesChainMap[cardChainId];
    const card = xesChainCards[cardChainId];
    const tabs = xesChains.map(c => `<button class="xes-card-tab${c.id === cardChainId ? ' active' : ''}" style="${c.id === cardChainId ? `background:${c.color};border-color:${c.color}` : ''}" onclick="openCard('${c.id}')">${c.icon} ${esc(c.name)}</button>`).join('');

    const ladderHtml = card.ladder.map((st, i) => {
        const tags = st.lectures.map(k => LEC_BY_KEY[k]).filter(Boolean).map(l => lecTag(l)).join('');
        return `<div class="xes-step s${i + 1}"><span class="stage">${i + 1} · ${esc(st.stage)}</span>
            <p><b>要建立的理解:</b>${esc(st.idea)}</p>
            <p><b>和孩子一起做:</b>${esc(st.doWith)}</p>
            <div class="lec-tags">${tags}</div></div>`;
    }).join('');

    const variantsHtml = card.variants.map(v => `<div class="xes-variant"><h4>🔀 ${esc(v.title)}</h4>
        ${v.skins.map((s, i) => `<div class="xes-skin"><div class="q"><b>${i + 1}.</b> ${esc(s.q)}</div><div class="a hidden" onclick="this.classList.toggle('hidden')" title="点击显示 / 隐藏答案">答: ${esc(s.a)}</div></div>`).join('')}
        <div class="xes-same"><b>它们哪里一样?</b> ${esc(v.same)}</div></div>`).join('');

    const prog = chainProgress(chain);
    box.innerHTML = `
    <div class="xes-card-tabs">${tabs}</div>
    <div class="xes-teach" style="--chain-color:${chain.color}">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap">
            <div><h2>${chain.icon} ${esc(chain.name)} · 教学卡</h2>
            <span style="font-size:12px;color:#7f8c8d">涵盖 ${chain.lectures.length} 讲 · 已学 ${prog.done}</span></div>
            <div class="xes-toolbar" style="margin:0;padding:0;background:none;box-shadow:none">
                <button class="xes-btn" onclick="toggleAllAnswers()">👁 显示/隐藏全部答案</button>
                <button class="xes-btn primary" onclick="window.print()">🖨 打印这张卡</button>
                <button class="xes-btn" onclick="showChainInGraph('${chain.id}')">🕸 图谱</button>
            </div>
        </div>
        <div class="essence">💡 <b>一句话本质:</b>${esc(card.essence)}</div>

        <h3>📈 三层台阶: 具体 → 图像 → 符号</h3>
        <p style="font-size:13px;color:#607d8b;margin-bottom:10px;line-height:1.7">${esc(xesLadderIntro.text)}</p>
        <div class="xes-ladder">${ladderHtml}</div>

        <div class="xes-two-col">
            <div><h3>⚠️ 常见误区</h3>${card.pitfalls.map(p => `<div class="xes-pit"><div class="w">✗ ${esc(p.wrong)}</div><div class="f">✓ ${esc(p.fix)}</div></div>`).join('')}</div>
            <div><h3>🗣 家长提问清单 (只问,不讲答案)</h3><ul class="xes-ask">${card.askKid.map(q => `<li>${esc(q)}</li>`).join('')}</ul></div>
        </div>

        <h3>🔀 变式对比: 让孩子自己说「哪里一样」</h3>
        <p style="font-size:13px;color:#607d8b;margin-bottom:10px;line-height:1.7">同一个结构换三层外皮。先别给答案,让孩子做完三道,再问它们的共同点。点击答案可显示或隐藏。</p>
        ${variantsHtml}

        <h3>⏪ 学前回看</h3>
        <div class="xes-review">${esc(card.review)}</div>

        <h3>📖 这条链上的全部讲次</h3>
        ${chain.tracks.map(tr => `<p style="margin:6px 0;font-size:13px"><b style="color:#455a64">${esc(tr.name)}:</b> ${tr.lectures.map(id => lecTag(xesLectureMap[id])).join(' → ')}</p>`).join('')}

        <h3>🕐 ${esc(xesRhythm.title)}</h3>
        <p style="font-size:13px;color:#607d8b;margin-bottom:10px;line-height:1.7">${esc(xesRhythm.note)}</p>
        <div class="xes-rhythm">${xesRhythm.steps.map(s => `<div class="r"><span class="min">${s.min} 分钟</span><b>${esc(s.name)}</b>${esc(s.what)}</div>`).join('')}</div>

        <h3>🔍 错题怎么记: 先分清错因</h3>
        <div class="xes-causes">${xesErrorCauses.map(c => `<div class="c"><b>${c.icon} ${esc(c.name)}</b>${esc(c.desc)}<br><span style="color:#2E7D32">→ ${esc(c.fix)}</span></div>`).join('')}</div>
    </div>`;
}
let answersShown = false;
function toggleAllAnswers() {
    answersShown = !answersShown;
    document.querySelectorAll('#cards-container .xes-skin .a').forEach(a => a.classList.toggle('hidden', !answersShown));
}

// =====================================================================
//  视图 5: 解题武器
// =====================================================================
function renderMethods() {
    const box = $('methods-container');
    box.innerHTML = `<div class="xes-intro"><h2>🧰 解题武器: 跨主题的 13 种通用方法</h2>
        <p>主题会变 (行程、计数、几何…),但「武器」是通用的。做题前先问一句:这题像哪一类?下面每张卡给出<b>识题信号</b>、<b>怎么教</b>和一道示范,并能一键看到用到它的讲次。</p></div>
        <div class="xes-method-grid">${xesMethods.map(m => {
            const c = xesMethodCards[m.id];
            const visible = m.lectures.filter(id => inRange(xesLectureMap[id].level)).length;
            return `<div class="xes-method"><h3>${m.icon} ${esc(m.name)}</h3><p class="desc">${esc(m.desc)}</p>
                <h5>识题信号</h5><ul>${c.signals.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
                <h5>怎么教</h5><p class="teach">${esc(c.teach)}</p>
                <h5>示范</h5><div class="ex"><b>${esc(c.example.q)}</b><div class="a">${esc(c.example.a)}</div></div>
                <p style="margin-top:10px"><button class="xes-btn" onclick="showMethodLectures('${m.id}')">查看用到它的 ${visible} 讲 →</button></p></div>`;
        }).join('')}</div>`;
}

// =====================================================================
//  视图 6: 我的进度
// =====================================================================
function renderProgress() {
    const box = $('progress-container');
    const all = xesLectures.filter(l => inRange(l.level));
    const cnt = { todo: 0, learning: 0, done: 0 };
    all.forEach(l => cnt[statusOf(l.id)]++);
    const mastery = all.filter(l => getProgress(l.id).mastery > 0);
    const avgMastery = mastery.length ? (mastery.reduce((s, l) => s + getProgress(l.id).mastery, 0) / mastery.length).toFixed(1) : '-';

    const barRow = (label, total, done, learning) => `<div class="xes-bar-row"><span>${label}</span>
        <div class="xes-bar"><span class="done" style="width:${total ? done / total * 100 : 0}%"></span><span class="learning" style="width:${total ? learning / total * 100 : 0}%"></span></div>
        <span class="n">${done}/${total}</span></div>`;

    const levelRows = xesLevels.filter(lv => inRange(lv.level)).map(lv => {
        const ls = xesLectures.filter(l => l.level === lv.level);
        return barRow(`${lv.name} <small style="color:#90a4ae">${esc(lv.grade)}</small>`, ls.length, ls.filter(l => statusOf(l.id) === 'done').length, ls.filter(l => statusOf(l.id) === 'learning').length);
    }).join('');
    const chainRows = xesChains.map(c => {
        const ids = c.lectures.filter(id => inRange(xesLectureMap[id].level));
        if (!ids.length) return '';
        return barRow(`${c.icon} ${esc(c.name)}`, ids.length, ids.filter(id => statusOf(id) === 'done').length, ids.filter(id => statusOf(id) === 'learning').length);
    }).join('');

    // 推荐下一步: 未学完且所有前置都已学完的讲次, 按级别/讲次排序
    const next = all.filter(l => statusOf(l.id) !== 'done' && (IN_PREREQ[l.id] || []).every(p => statusOf(p) === 'done'))
        .sort((a, b) => a.level - b.level || a.no - b.no).slice(0, 12);
    // 薄弱: 已学但掌握度低 (1 星)
    const weak = all.filter(l => statusOf(l.id) === 'done' && getProgress(l.id).mastery === 1);

    box.innerHTML = `
    <div class="xes-intro"><h2>📈 我的进度</h2>
        <p>进度保存在这台电脑的浏览器里 (localStorage),不会上传。换电脑或清理浏览器数据之前,请先点「导出进度」备份。掌握度 1-3 星:1 星 = 听懂了但还不会独立做;2 星 = 能独立做出来;3 星 = 能讲给别人听,并能做变式题。</p></div>
    <div class="xes-stat-row">
        <div class="xes-stat"><b>${cnt.done}</b><span>已学 / ${all.length}</span></div>
        <div class="xes-stat"><b>${cnt.learning}</b><span>在学</span></div>
        <div class="xes-stat"><b>${cnt.todo}</b><span>未学</span></div>
        <div class="xes-stat"><b>${avgMastery}</b><span>平均掌握度 (★)</span></div>
    </div>
    <div class="xes-toolbar"><button class="xes-btn" onclick="exportProgress()">📥 导出进度</button>
        <label class="xes-btn" style="cursor:pointer">📤 导入进度<input type="file" accept="application/json" style="display:none" onchange="importProgress(this)"></label>
        <button class="xes-btn danger" onclick="resetProgress()">🗑 清空进度</button></div>
    <div class="xes-bars"><h3>▶ 推荐下一步 (前置都学完了的讲次)</h3>
        <div>${next.length ? next.map(l => lecTag(l)).join('') : '<span style="color:#999;font-size:13px">全部学完啦,或者还没有标记任何进度。先去「讲次目录」标记几讲吧。</span>'}</div></div>
    ${weak.length ? `<div class="xes-bars"><h3>🔁 需要巩固 (掌握度只有 1 星)</h3><div>${weak.map(l => lecTag(l)).join('')}</div></div>` : ''}
    <div class="xes-bars"><h3>按级别</h3>${levelRows}</div>
    <div class="xes-bars"><h3>按知识链</h3>${chainRows}</div>`;
}
function exportProgress() {
    const payload = { version: 1, exported: new Date().toISOString(), progress: xesProgress };
    if (typeof xesQStatus !== 'undefined' && Object.keys(xesQStatus).length) payload.questions = xesQStatus;   // 题库做题记录 (xes-practice.js)
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'xes_progress_' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a); a.click();
    setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(a.href); }, 100);
}
function importProgress(input) {
    const file = input.files && input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        try {
            const data = JSON.parse(reader.result);
            const p = data.progress || data;
            const valid = Object.keys(p).filter(k => xesLectureMap[k]);
            const qCount = data.questions && typeof xesProblemMap !== 'undefined'
                ? Object.keys(data.questions).filter(k => xesProblemMap[k]).length : 0;
            if (!valid.length && !qCount) { alert('文件里没有可识别的进度记录。'); return; }
            if (!confirm(`将导入 ${valid.length} 讲的进度${qCount ? ` 和 ${qCount} 道题的做题记录` : ''},并覆盖当前同名记录。继续?`)) return;
            valid.forEach(k => { xesProgress[k] = p[k]; });
            saveProgress();
            if (qCount && typeof importQuestionStatus === 'function') importQuestionStatus(data.questions);
            refreshCurrentView();
        } catch (e) { alert('导入失败: 不是有效的 JSON 文件。'); }
    };
    reader.readAsText(file);
    input.value = '';
}
function resetProgress() {
    if (!confirm('确认清空全部学习进度?此操作不可撤销 (建议先导出备份)。')) return;
    xesProgress = {};
    saveProgress();
    refreshCurrentView();
}

// =====================================================================
//  详情面板: 单讲
// =====================================================================
let openLectureId = null;

function ladderStagesFor(l) {
    const out = [];
    l.chains.forEach(cid => {
        const card = xesChainCards[cid];
        if (!card) return;
        card.ladder.forEach((st, i) => { if (st.lectures.includes(l.key)) out.push({ chain: xesChainMap[cid], st, idx: i }); });
    });
    return out;
}
function germanFor(l) {
    const ids = new Set();
    l.pangu.forEach(pid => ((panguNodeMap[pid] || {}).linkedGerman || []).forEach(g => ids.add(g)));
    return [...ids].map(id => germanNodeMap[id]).filter(Boolean);
}

function showLecture(id, keepOpen) {
    const l = xesLectureMap[id];
    if (!l) return;
    openLectureId = id;
    const meta = LEVEL_META[l.level];
    const prog = getProgress(id);
    const prereq = (IN_PREREQ[id] || []).map(i => xesLectureMap[i]);
    const next = (OUT_PREREQ[id] || []).map(i => xesLectureMap[i]);
    const related = (RELATED[id] || []).map(r => ({ l: xesLectureMap[r.id], label: r.label }));
    const stages = ladderStagesFor(l);
    const germans = germanFor(l);

    const stageHtml = stages.length ? stages.map(s => `<div class="xes-stage-box">
        <b>在「${esc(s.chain.name)}」里属于第 ${s.idx + 1} 层 · ${esc(s.st.stage)}</b><br>
        要建立的理解: ${esc(s.st.idea)}<br>和孩子一起做: ${esc(s.st.doWith)}</div>`).join('') : '';

    const panguHtml = l.pangu.map(pid => {
        const n = panguNodeMap[pid];
        const cnt = typeof problemsForPanguTopic === 'function' ? problemsForPanguTopic(pid).length : 0;
        return `<a class="cross-tag cross-tag-pangu" href="pangu.html?topic=${pid}"><span class="cross-tag-grade" style="background:#F9A825">盘古</span>${esc(n.name)}<span class="cross-tag-badge">${cnt} 题</span><span class="cross-tag-arrow">&rarr;</span></a>`;
    }).join('');
    const elemHtml = l.elementary.map(eid => {
        const n = elementaryNodeMap[eid];
        return n ? `<a class="cross-tag" href="index.html?topic=${eid}"><span class="cross-tag-grade grade-${n.grade}">${n.grade}年级</span>${esc(n.name)}<span class="cross-tag-arrow">&rarr;</span></a>` : '';
    }).join('');
    const germanHtml = germans.map(g => `<a class="cross-tag cross-tag-german" href="german.html?topic=${g.id}"><span class="cross-tag-grade grade-${g.grade}">K${g.grade}</span>${esc(String(g.name).replace(/^K[34]\s*·\s*/, ''))}<span class="cross-tag-arrow">&rarr;</span></a>`).join('');

    const probHtml = typeof lectureProblemsHtml === 'function' ? lectureProblemsHtml(l) : '';

    $('detail-content').innerHTML = `
        <h2>第 ${l.no} 讲 · ${esc(l.title)}</h2>
        <div class="xes-detail-badges">
            <span class="detail-grade-badge" style="background:${levelColor(l.level)};margin:0">${l.level} 级 · ${esc(meta.grade)}</span>
            <span class="topic-category cat-bg-${l.category}" style="padding:4px 12px;border-radius:14px;font-size:12px;color:white">${esc(xesCategoryNames[l.category])}</span>
        </div>

        <div class="detail-section"><h3>📌 学习状态</h3>
            <div class="xes-progress-bar">
                ${['todo', 'learning', 'done'].map(s => `<button class="xes-btn${prog.status === s ? ' active' : ''}" onclick="setStatus('${id}','${s}')">${STATUS_TEXT[s]}</button>`).join('')}
                <span style="margin-left:8px;font-size:12px;color:#7f8c8d">掌握度</span>
                ${[1, 2, 3].map(m => `<span class="xes-star${prog.mastery >= m ? ' on' : ''}" onclick="setMastery('${id}',${m})" title="${m} 星">★</span>`).join('')}
            </div></div>

        <div class="detail-section"><h3>🔗 所在的知识链</h3><div>${l.chains.map(chainTag).join('')}</div>
            ${stageHtml}</div>

        ${prereq.length ? `<div class="detail-section prereq-section"><h3>⬅ 学前回看 (前置)</h3><div>${prereq.map(p => lecTag(p)).join('')}</div></div>` : ''}
        ${next.length ? `<div class="detail-section"><h3>➡ 接下来 (后续)</h3><div>${next.map(p => lecTag(p)).join('')}</div></div>` : ''}
        ${related.length ? `<div class="detail-section"><h3>🔗 相关</h3>${related.map(r => `<div style="margin-bottom:4px">${lecTag(r.l)} <span style="font-size:12px;color:#7f8c8d">${esc(r.label || '')}</span></div>`).join('')}</div>` : ''}

        ${l.methods.length ? `<div class="detail-section"><h3>🧰 用到的解题武器</h3><div>${l.methods.map(methodTag).join('')}</div>
            ${l.methods.map(m => `<p style="font-size:12px;color:#607d8b;margin:4px 0"><b>${esc(xesMethodMap[m].name)}:</b> ${esc(xesMethodCards[m].teach)}</p>`).join('')}</div>` : ''}

        ${probHtml}

        ${(panguHtml || elemHtml || germanHtml) ? `<div class="detail-section cross-map-section"><h3>🌐 在其他图谱里的对应</h3><div class="cross-tags">${panguHtml}${elemHtml}${germanHtml}</div></div>` : ''}

        <div class="detail-section"><h3>📄 原书 PDF</h3>
            <a class="xes-open-pdf" href="${encodeURI(l.file)}" target="_blank" rel="noopener">打开本讲 PDF (${l.level}级 第${l.no}讲)</a>
            ${meta.answerFile ? `<a class="xes-open-pdf secondary" href="${encodeURI(meta.answerFile)}" target="_blank" rel="noopener">打开 ${l.level} 级参考答案 PDF</a>` : ''}
            <p style="font-size:12px;color:#90a4ae;margin-top:8px;line-height:1.6">PDF 是扫描图片,浏览器直接打开即可阅读。若点击后无反应,请用本地服务器打开本页 (见 README)。</p></div>
    `;
    if (!keepOpen) openPanel();
    else $('detail-panel').classList.add('open'), $('detail-overlay').classList.add('open');
}

function openPanel() {
    $('detail-panel').classList.add('open');
    $('detail-overlay').classList.add('open');
    $('detail-panel').scrollTop = 0;
}
function closeDetail() {
    $('detail-panel').classList.remove('open');
    $('detail-overlay').classList.remove('open');
    openLectureId = null;
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDetail(); });

// ---------- 视图渲染表 (放在最后, 保证函数都已定义) ----------
const VIEW_RENDERERS = {
    chains: renderChains,
    graph: renderGraph,
    lectures: renderLectures,
    cards: renderCards,
    methods: renderMethods,
    progress: renderProgress
};
