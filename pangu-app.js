// ============= 全局状态 =============
let currentView = 'graph';
let currentRound = 'all';
let currentGrade = 'all';           // 'all' | 4 | 5 | ...
let currentTopic = 'all';           // 'all' | 'pangu_xxx'
let currentDifficulty = 'all';      // 'all' | 1..5
let currentSet = 'all';             // 'all' | 'starred' | 'wrong' | 'correct' | 'unmarked'
let simulation = null;
let svg = null;
let graphGroup = null;

// 练习模式状态
let practiceQueue = [];             // shuffled ids
let practiceIndex = 0;
let practiceAnswerRevealed = false;
let practiceHintRevealed = false;

// ============= 错题本 / 收藏 状态（localStorage） =============
const STATUS_KEY = 'panguStatus_v1';
let panguStatus = loadStatus();

function loadStatus() {
    try {
        const raw = localStorage.getItem(STATUS_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
}
function saveStatus() {
    try { localStorage.setItem(STATUS_KEY, JSON.stringify(panguStatus)); } catch {}
}
function getStatus(id) {
    return panguStatus[id] || { attempted: null, starred: false, ts: 0 };
}
function setAttempted(id, val) {
    const s = getStatus(id);
    // Toggle: click same again clears
    s.attempted = (s.attempted === val) ? null : val;
    s.ts = Date.now();
    panguStatus[id] = s;
    saveStatus();
}
function toggleStar(id) {
    const s = getStatus(id);
    s.starred = !s.starred;
    s.ts = Date.now();
    panguStatus[id] = s;
    saveStatus();
}
function resetStatus(id) {
    delete panguStatus[id];
    saveStatus();
}
function resetAllStatus() {
    if (!confirm('确认清空所有做题记录和收藏？')) return;
    panguStatus = {};
    saveStatus();
    renderList();
    renderLibrary();
    if (currentView === 'practice') renderPractice();
    if (currentView === 'print') renderPrint();
}

// 统计信息
function statusStats() {
    let correct = 0, wrong = 0, starred = 0;
    Object.values(panguStatus).forEach(s => {
        if (s.attempted === 'correct') correct++;
        if (s.attempted === 'wrong') wrong++;
        if (s.starred) starred++;
    });
    return { correct, wrong, starred };
}

// 年级配色
const GRADE_COLORS = {
    4: '#F9A825',   // AK4 金黄
    5: '#42A5F5',   // AK5 蓝
    6: '#66BB6A',   // AK6 绿
    7: '#AB47BC',   // AK7 紫
    8: '#EF5350',   // AK8 红
    9: '#5D4037'    // AK9 棕
};
function gradeColor(g) { return GRADE_COLORS[g] || '#9E9E9E'; }

// 判断题目 / 节点属于第几年级（未标注默认 4）
function problemGrade(p) { return p.grade || 4; }
function nodeGrade(n)     { return n.grade || 4; }

// 从主图取索引
const elementaryNodeMap = Object.fromEntries((knowledgeNodes || []).map(n => [n.id, n]));
const germanNodeMap = Object.fromEntries((germanNodes || []).map(n => [n.id, n]));

// ============= 初始化 =============
document.addEventListener('DOMContentLoaded', () => {
    populateTopicFilter();
    initGraph();
    renderList();
    renderPaths();
    renderLibrary();

    // URL 参数支持
    const params = new URLSearchParams(location.search);
    const topicId = params.get('topic');
    if (topicId && panguNodeMap[topicId]) {
        setTimeout(() => showDetail(topicId), 300);
    }
    const problemId = params.get('problem');
    if (problemId && panguProblemMap[problemId]) {
        setTimeout(() => showProblemDetail(problemId), 300);
    }
});

function populateTopicFilter() {
    const sel = document.getElementById('topic-filter');
    if (!sel) return;
    panguNodes.forEach(n => {
        const opt = document.createElement('option');
        opt.value = n.id;
        opt.textContent = `${n.name} (AK${nodeGrade(n)})`;
        sel.appendChild(opt);
    });
}

// ============= 视图切换 =============
function switchView(view) {
    currentView = view;
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });
    document.querySelectorAll('.view-panel').forEach(panel => {
        panel.classList.toggle('active', panel.id === view + '-view');
    });
    if (view === 'graph' && simulation) simulation.alpha(0.3).restart();
    if (view === 'practice') rebuildPracticeQueue();
    if (view === 'print') renderPrint();
}

function filterRound(round) {
    currentRound = round;
    document.querySelectorAll('.round-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.round === round);
    });
    renderList();
    renderLibrary();
}

function filterGrade(grade) {
    currentGrade = grade === 'all' ? 'all' : Number(grade);
    document.querySelectorAll('.grade-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.grade === String(grade));
    });
    onFiltersChanged();
    if (simulation) redrawGraph();
}

function filterTopic(topicId) {
    currentTopic = topicId;
    onFiltersChanged();
}

function filterDifficulty(diff) {
    currentDifficulty = diff === 'all' ? 'all' : Number(diff);
    onFiltersChanged();
}

function filterSet(set) {
    currentSet = set;
    document.querySelectorAll('.set-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.set === set);
    });
    onFiltersChanged();
}

function grantsSetFilter(id) {
    if (currentSet === 'all') return true;
    const s = getStatus(id);
    if (currentSet === 'starred')  return s.starred;
    if (currentSet === 'wrong')    return s.attempted === 'wrong';
    if (currentSet === 'correct')  return s.attempted === 'correct';
    if (currentSet === 'unmarked') return !s.attempted && !s.starred;
    return true;
}

function onFiltersChanged() {
    renderList();
    renderLibrary();
    if (currentView === 'practice') rebuildPracticeQueue();
    if (currentView === 'print') renderPrint();
}

function grantsGradeFilter(gr) {
    return currentGrade === 'all' || gr === currentGrade;
}
function grantsRoundFilter(rd) {
    return currentRound === 'all' || rd === currentRound;
}
function grantsTopicFilter(topics) {
    return currentTopic === 'all' || (topics || []).includes(currentTopic);
}
function grantsDifficultyFilter(d) {
    return currentDifficulty === 'all' || d === currentDifficulty;
}

// 综合筛选：题目对象是否符合所有过滤条件
function problemMatchesFilters(p) {
    return grantsGradeFilter(problemGrade(p))
        && grantsRoundFilter(p.round)
        && grantsTopicFilter(p.topics)
        && grantsDifficultyFilter(p.difficulty)
        && grantsSetFilter(p.id);
}

// ============= 知识图谱 =============
function initGraph() {
    const container = document.querySelector('.graph-container');
    const width = container.clientWidth;
    const height = container.clientHeight;

    svg = d3.select('#knowledge-graph').attr('width', width).attr('height', height);

    svg.append('defs').append('marker')
        .attr('id', 'arrow')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 20).attr('refY', 0)
        .attr('markerWidth', 6).attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path').attr('d', 'M0,-5L10,0L0,5').attr('fill', '#888');

    const zoom = d3.zoom().scaleExtent([0.3, 3])
        .on('zoom', (e) => graphGroup.attr('transform', e.transform));
    svg.call(zoom);
    graphGroup = svg.append('g');

    const nodes = panguNodes.map(d => ({ ...d }));
    const links = panguLinks.map(d => ({ source: d.source, target: d.target, type: d.type, label: d.label }));

    simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(140))
        .force('charge', d3.forceManyBody().strength(-420))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(50))
        .force('x', d3.forceX(width / 2).strength(0.05))
        .force('y', d3.forceY(height / 2).strength(0.05));

    const link = graphGroup.append('g').selectAll('line').data(links).join('line')
        .attr('class', d => `link ${d.type}`)
        .attr('stroke', d => d.type === 'prerequisite' ? '#888' : '#bbb')
        .attr('stroke-width', d => d.type === 'prerequisite' ? 1.5 : 1)
        .attr('stroke-dasharray', d => d.type === 'related' ? '4 3' : null)
        .attr('marker-end', d => d.type === 'prerequisite' ? 'url(#arrow)' : null);

    const node = graphGroup.append('g').selectAll('g').data(nodes).join('g')
        .attr('class', 'node')
        .call(d3.drag().on('start', dragStarted).on('drag', dragged).on('end', dragEnded));

    node.append('circle')
        .attr('class', 'node-body')
        .attr('r', 22)
        .attr('fill', d => panguCategoryColors[d.category])
        .attr('stroke', d => gradeColor(nodeGrade(d)))
        .attr('stroke-width', 3)
        .attr('opacity', 0.92);

    // AK 徽标（依据节点年级）
    node.append('circle')
        .attr('class', 'node-grade-badge')
        .attr('r', 8)
        .attr('cx', 16).attr('cy', -16)
        .attr('fill', d => gradeColor(nodeGrade(d)))
        .attr('stroke', 'white').attr('stroke-width', 1.5);
    node.append('text')
        .attr('class', 'node-grade-label')
        .attr('dx', 16).attr('dy', -13)
        .attr('text-anchor', 'middle')
        .attr('font-size', '8px')
        .attr('font-weight', '700')
        .attr('fill', 'white')
        .attr('pointer-events', 'none')
        .text(d => 'AK' + nodeGrade(d));

    node.append('text')
        .attr('class', 'node-count')
        .attr('dy', 4).attr('text-anchor', 'middle')
        .attr('font-size', '10px').attr('font-weight', '700').attr('fill', 'white')
        .attr('pointer-events', 'none')
        .text(d => problemsForPanguTopic(d.id).length + '题');

    node.append('text')
        .attr('dy', 36).attr('text-anchor', 'middle')
        .attr('font-size', '11px')
        .text(d => d.name);

    node.on('click', (e, d) => { e.stopPropagation(); showDetail(d.id); });
    node.on('mouseenter', (e, d) => highlightConnected(d, nodes, links, node, link));
    node.on('mouseleave', () => {
        node.classed('dimmed', false);
        link.classed('dimmed', false);
    });

    svg.on('click', () => closeDetail());
    node.append('title').text(d => `${d.name}\n${d.description}`);

    simulation.on('tick', () => {
        link.attr('x1', d => d.source.x).attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
        node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    window.addEventListener('resize', () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        svg.attr('width', w).attr('height', h);
        simulation.force('center', d3.forceCenter(w / 2, h / 2));
        simulation.alpha(0.3).restart();
    });
}

// 根据当前年级过滤器，把不匹配的节点半透明
function redrawGraph() {
    if (!graphGroup) return;
    graphGroup.selectAll('g.node').classed('graph-node-hidden', d => !grantsGradeFilter(nodeGrade(d)));
}

function highlightConnected(d, nodes, links, nodeSelection, linkSelection) {
    const ids = new Set([d.id]);
    links.forEach(l => {
        const s = typeof l.source === 'object' ? l.source.id : l.source;
        const t = typeof l.target === 'object' ? l.target.id : l.target;
        if (s === d.id) ids.add(t);
        if (t === d.id) ids.add(s);
    });
    nodeSelection.classed('dimmed', n => !ids.has(n.id));
    linkSelection.classed('dimmed', l => {
        const s = typeof l.source === 'object' ? l.source.id : l.source;
        const t = typeof l.target === 'object' ? l.target.id : l.target;
        return s !== d.id && t !== d.id;
    });
}

function dragStarted(e, d) { if (!e.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; }
function dragged(e, d) { d.fx = e.x; d.fy = e.y; }
function dragEnded(e, d) { if (!e.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; }

// ============= 主题列表 =============
function renderList() {
    const container = document.getElementById('knowledge-list');
    // 按当前 grade 过滤显示的主题
    const visibleNodes = panguNodes.filter(n => grantsGradeFilter(nodeGrade(n)));

    // 主题按 grade 分组
    const byGrade = {};
    visibleNodes.forEach(n => {
        const g = nodeGrade(n);
        (byGrade[g] = byGrade[g] || []).push(n);
    });
    const grades = Object.keys(byGrade).map(Number).sort((a, b) => a - b);

    const totalProblems = panguProblems.filter(p => grantsGradeFilter(problemGrade(p))).length;

    let html = `<div class="path-intro">
        <h2>&#x1F3A8; 盘古数学竞赛 (Pangea Matematiktävling)</h2>
        <p>瑞典盘古数学竞赛知识图谱，当前包含 <b>AK4</b> 与 <b>AK5</b> 两个年级组，
        覆盖 2015/16 - 2025/26 多届初赛/复赛/决赛，共 ${totalProblems} 道题。
        原题为瑞典语，全部已翻译为中文。点击主题查看该主题下的所有题目、解题思路与关联知识。</p>
    </div>`;

    grades.forEach(g => {
        const nodes = byGrade[g];
        const color = gradeColor(g);
        html += `<div class="grade-section">
            <h2 class="grade-section-title">
                <span class="grade-badge" style="background:${color};color:white">AK${g}</span>
                共 ${nodes.length} 个主题
            </h2>
            <div class="topic-grid">
                ${nodes.map(n => {
                    const cnt = problemsForPanguTopic(n.id)
                        .filter(p => grantsGradeFilter(problemGrade(p))).length;
                    return `<div class="topic-card grade-${g}" style="border-left-color:${color}" onclick="showDetail('${n.id}')">
                        <h4>${n.name}</h4>
                        <div class="topic-meta">
                            <span>AK${g}</span>
                            <span>${cnt} 道题</span>
                        </div>
                        <span class="topic-category cat-bg-${n.category}">${panguCategoryNames[n.category]}</span>
                    </div>`;
                }).join('')}
            </div>
        </div>`;
    });

    container.innerHTML = html;
}

// ============= 学习路径 =============
function renderPaths() {
    const container = document.getElementById('learning-paths');
    let html = `<div class="path-intro">
        <h2>&#x1F3AF; 学习路径</h2>
        <p>盘古 AK4 组的主要学习路径。虽然只有一个年级组，但内部有清晰的进阶顺序：先掌握基础运算与规律，再攻克几何、组合、逻辑推理等高分题型。</p>
    </div>`;

    panguPaths.forEach(path => {
        const pathNodes = path.nodes.map(id => panguNodeMap[id]).filter(Boolean);
        html += `<div class="path-section">
            <h2>${path.icon} ${path.name}</h2>
            <p style="color:#7f8c8d;font-size:13px;margin:-8px 0 12px 12px;">${path.description}</p>
            <div class="path-timeline">
                ${pathNodes.map((node, i) => {
                    const g = nodeGrade(node);
                    const gc = gradeColor(g);
                    return `<div class="path-node grade-${g}" style="border-left-color:${gc}" onclick="showDetail('${node.id}')">
                        <span class="node-title">${node.name}</span>
                        <span class="node-desc">AK${g} · ${panguCategoryNames[node.category]} · ${problemsForPanguTopic(node.id).length} 道题</span>
                    </div>
                    ${i < pathNodes.length - 1 ? '<div class="path-arrow">&#x25BC;</div>' : ''}`;
                }).join('')}
            </div>
        </div>`;
    });

    container.innerHTML = html;
}

// ============= 题库浏览 =============
const YEAR_ORDER = ['2015/16', '2020/21', '2021/22', '2022/23', '2023/24', '2024/25', '2025/26'];
const ROUND_ORDER = ['初赛', '复赛', '决赛'];
const ROUND_COLORS = { '初赛': '#4CAF50', '复赛': '#8E24AA', '决赛': '#F9A825' };

function renderLibrary() {
    const container = document.getElementById('problem-library');
    let items = panguProblems.filter(problemMatchesFilters);
    const stats = statusStats();

    // 按 grade + 年份 + 轮次 分组
    const groups = {};
    items.forEach(p => {
        const g = problemGrade(p);
        const key = `AK${g} · ${p.year} ${p.round}`;
        (groups[key] = groups[key] || []).push(p);
    });

    // 动态排序 key
    const orderedKeys = [];
    [4, 5, 6, 7, 8, 9].forEach(g => {
        YEAR_ORDER.forEach(y => {
            ROUND_ORDER.forEach(r => {
                const k = `AK${g} · ${y} ${r}`;
                if (groups[k]) orderedKeys.push(k);
            });
        });
    });

    let html = `<div class="path-intro">
        <h2>&#x1F4DA; 全部题目（含中文翻译）</h2>
        <p>当前筛选下共 <b>${items.length}</b> 道题（总库 ${panguProblems.length} 题）。原题瑞典语，全部已翻译为中文。</p>

        <div class="set-filter-bar">
            <span class="set-filter-label">状态筛选：</span>
            <button class="set-btn ${currentSet==='all'?'active':''}" data-set="all" onclick="filterSet('all')">全部</button>
            <button class="set-btn ${currentSet==='starred'?'active':''}" data-set="starred" onclick="filterSet('starred')">★ 收藏 (${stats.starred})</button>
            <button class="set-btn ${currentSet==='wrong'?'active':''}" data-set="wrong" onclick="filterSet('wrong')">✗ 错题本 (${stats.wrong})</button>
            <button class="set-btn ${currentSet==='correct'?'active':''}" data-set="correct" onclick="filterSet('correct')">✓ 已做对 (${stats.correct})</button>
            <button class="set-btn ${currentSet==='unmarked'?'active':''}" data-set="unmarked" onclick="filterSet('unmarked')">未做</button>
            <span style="flex:1"></span>
            <button class="csv-export-btn" onclick="exportCsv()">📥 导出 CSV</button>
            <button class="csv-export-btn csv-reset-btn" onclick="resetAllStatus()" title="清空所有做题记录">🗑 清空记录</button>
        </div>
    </div>`;

    orderedKeys.forEach(key => {
        const problems = groups[key];
        // key = "AK4 · 2024/25 初赛"
        const gradeMatch = key.match(/AK(\d)/);
        const grade = gradeMatch ? Number(gradeMatch[1]) : 4;
        const round = ROUND_ORDER.find(r => key.endsWith(r));
        const bg = ROUND_COLORS[round] || '#607D8B';
        const gc = gradeColor(grade);
        html += `<div class="grade-section">
            <h2 class="grade-section-title">
                <span class="grade-badge" style="background:${gc};color:white">AK${grade}</span>
                <span class="grade-badge" style="background:${bg};color:white;margin-left:6px">${key.replace(/^AK\d\s*·\s*/, '')}</span>
                <span style="margin-left:10px;font-size:13px;color:#7f8c8d">共 ${problems.length} 题</span>
            </h2>
            <div class="pangu-problem-grid">
                ${problems.map(p => renderProblemCard(p)).join('')}
            </div>
        </div>`;
    });

    if (orderedKeys.length === 0) {
        html += `<div class="grade-section"><p style="text-align:center;color:#7f8c8d;padding:40px">当前筛选下无题目</p></div>`;
    }

    container.innerHTML = html;
}

function renderProblemCard(p) {
    const stars = '⋆'.repeat(p.difficulty);
    const shortTr = p.translation.length > 100
        ? p.translation.substring(0, 100) + '…'
        : p.translation;
    const topicTags = (p.topics || []).map(tid => {
        const t = panguNodeMap[tid];
        return t ? `<span class="topic-tag cat-bg-${t.category}" onclick="event.stopPropagation();showDetail('${tid}')">${t.name}</span>` : '';
    }).join('');

    const st = getStatus(p.id);
    let statusBadges = '';
    if (st.starred) statusBadges += '<span class="card-status-badge status-star">★</span>';
    if (st.attempted === 'correct') statusBadges += '<span class="card-status-badge status-correct">✓</span>';
    if (st.attempted === 'wrong')   statusBadges += '<span class="card-status-badge status-wrong">✗</span>';
    const cardClass = 'pangu-problem-card' + (st.attempted === 'wrong' ? ' card-wrong' : '') + (st.starred ? ' card-starred' : '');

    return `<div class="${cardClass}" onclick="showProblemDetail('${p.id}')">
        <div class="problem-head">
            <span class="problem-num">第 ${p.num} 题</span>
            <span class="problem-diff">${stars}</span>
            ${p.hasImage ? '<span class="problem-img-tag">含图</span>' : ''}
            ${statusBadges}
        </div>
        <div class="problem-title">${p.title}</div>
        <div class="problem-translation">${shortTr}</div>
        <div class="problem-tags">${topicTags}</div>
    </div>`;
}

// ============= 详情面板：主题 =============
function showDetail(id) {
    const node = panguNodeMap[id];
    if (!node) return;

    const problems = problemsForPanguTopic(id);
    const elementaryTopics = (node.linkedElementary || []).map(eid => elementaryNodeMap[eid]).filter(Boolean);
    const germanTopics = (node.linkedGerman || []).map(gid => germanNodeMap[gid]).filter(Boolean);

    // 前置 / 后续 / 相关
    const prereqs = panguLinks.filter(l => l.target === id && l.type === 'prerequisite')
        .map(l => panguNodeMap[l.source]).filter(Boolean);
    const nextNodes = panguLinks.filter(l => l.source === id && l.type === 'prerequisite')
        .map(l => panguNodeMap[l.target]).filter(Boolean);
    const relatedNodes = panguLinks.filter(l => (l.source === id || l.target === id) && l.type === 'related')
        .map(l => panguNodeMap[l.source === id ? l.target : l.source]).filter(Boolean);

    const ng = nodeGrade(node);
    document.getElementById('detail-content').innerHTML = `
        <h2>${node.name}</h2>
        <span class="detail-grade-badge" style="background:${gradeColor(ng)}">AK${ng} · Pangea</span>
        <span class="topic-category cat-bg-${node.category}" style="margin-left:8px;padding:4px 12px;border-radius:14px;font-size:12px;color:white">${panguCategoryNames[node.category]}</span>

        <div class="detail-section" style="margin-top:20px">
            <h3>&#x1F4CB; 主题概述</h3>
            <p>${node.description}</p>
        </div>

        <div class="detail-section">
            <h3>&#x1F3AF; 核心考点</h3>
            <ul>${node.keyPoints.map(p => `<li>${p}</li>`).join('')}</ul>
        </div>

        <div class="detail-section">
            <h3>&#x1F4A1; 典型思路</h3>
            <div class="tip-box"><ul>${(node.typicalApproach || []).map(t => `<li>${t}</li>`).join('')}</ul></div>
        </div>

        ${problems.length > 0 ? `
        <div class="detail-section">
            <h3>&#x1F4D6; 该主题的题目（${problems.length} 道）</h3>
            <div class="pangu-mini-grid">
                ${problems.map(p => `
                    <div class="pangu-mini-card" onclick="event.stopPropagation();showProblemDetail('${p.id}')">
                        <div class="mini-head">
                            <span class="mini-year">${p.year} ${p.round}</span>
                            <span class="mini-diff">${'⋆'.repeat(p.difficulty)}</span>
                        </div>
                        <div class="mini-title">第${p.num}题：${p.title}</div>
                    </div>
                `).join('')}
            </div>
        </div>` : ''}

        ${elementaryTopics.length > 0 ? `
        <div class="detail-section cross-map-section">
            <h3>&#x1F4D0; 关联小学教材</h3>
            <div class="cross-tags">
                ${elementaryTopics.map(t => `
                    <a class="cross-tag" href="index.html?topic=${t.id}">
                        <span class="cross-tag-grade grade-${t.grade}">${t.grade}年级</span>
                        ${t.name}
                        <span class="cross-tag-arrow">&rarr;</span>
                    </a>
                `).join('')}
            </div>
        </div>` : ''}

        ${germanTopics.length > 0 ? `
        <div class="detail-section cross-map-section">
            <h3>&#x1F3C6; 关联德国竞赛主题</h3>
            <div class="cross-tags">
                ${germanTopics.map(t => `
                    <a class="cross-tag cross-tag-german" href="german.html?topic=${t.id}">
                        <span class="cross-tag-grade grade-${t.grade}">K${t.grade}</span>
                        ${t.name.replace(/^K[34]\s*·\s*/, '')}
                        <span class="cross-tag-badge">${(t.problems || []).length}题</span>
                        <span class="cross-tag-arrow">&rarr;</span>
                    </a>
                `).join('')}
            </div>
        </div>` : ''}

        ${prereqs.length > 0 ? `
        <div class="detail-section prereq-section">
            <h3>&#x2B05; 前置主题</h3>
            <div class="prereq-tags">${prereqs.map(p => `<span class="prereq-tag" onclick="showDetail('${p.id}')">${p.name}</span>`).join('')}</div>
        </div>` : ''}

        ${nextNodes.length > 0 ? `
        <div class="detail-section">
            <h3>&#x27A1; 后续主题</h3>
            <div class="next-tags">${nextNodes.map(n => `<span class="next-tag" onclick="showDetail('${n.id}')">${n.name}</span>`).join('')}</div>
        </div>` : ''}

        ${relatedNodes.length > 0 ? `
        <div class="detail-section">
            <h3>&#x1F517; 相关主题</h3>
            <div class="prereq-tags">${relatedNodes.map(r => `<span class="prereq-tag" onclick="showDetail('${r.id}')" style="background:#fff3e0;color:#E65100;border-color:#ffe0b2">${r.name}</span>`).join('')}</div>
        </div>` : ''}
    `;
    openPanel();
}

// ============= 详情面板：单题 =============
function showProblemDetail(pid) {
    const p = panguProblemMap[pid];
    if (!p) return;
    const stars = '⋆'.repeat(p.difficulty);
    const topics = (p.topics || []).map(tid => panguNodeMap[tid]).filter(Boolean);

    // PDF URL 加 #page=N 让浏览器自动跳到指定页
    const pdfUrl = encodeURI(p.file) + `#page=${p.page}`;

    const pg = problemGrade(p);
    const st = getStatus(p.id);
    const ansLetter = p.answer || (p.hint && (p.hint.match(/答案[：:]?\s*([a-eA-E])/) || [])[1]);

    document.getElementById('detail-content').innerHTML = `
        <h2>${p.title}</h2>
        <span class="detail-grade-badge" style="background:${gradeColor(pg)}">AK${pg} · ${p.year} ${p.round} · 第 ${p.num} 题</span>
        <span class="problem-diff-large" style="margin-left:8px">${stars} (${p.difficulty}星)</span>
        ${p.hasImage ? '<span class="problem-img-tag" style="margin-left:6px">含图片</span>' : ''}
        ${st.starred ? '<span class="status-tag status-star" style="margin-left:6px">★ 已收藏</span>' : ''}
        ${st.attempted === 'correct' ? '<span class="status-tag status-correct" style="margin-left:6px">✓ 做对</span>' : ''}
        ${st.attempted === 'wrong'   ? '<span class="status-tag status-wrong" style="margin-left:6px">✗ 做错</span>' : ''}

        <div class="detail-section" style="margin-top:20px">
            <h3>&#x1F4DD; 题目（中文翻译）</h3>
            <div class="problem-question">${p.translation.replace(/\n/g, '<br>')}</div>
        </div>

        ${p.options ? `
        <div class="detail-section">
            <h3>&#x1F4CB; 选项</h3>
            <ol class="problem-options" type="a">
                ${p.options.map((opt, i) => {
                    const letter = String.fromCharCode(97 + i);
                    const isAns = (ansLetter && ansLetter.toLowerCase() === letter);
                    return `<li${isAns ? ' class="problem-opt-answer" title="正确答案"' : ''}>${opt}${isAns ? ' ✓' : ''}</li>`;
                }).join('')}
            </ol>
        </div>` : ''}

        ${p.hint ? `
        <div class="detail-section">
            <h3>&#x1F4A1; 解题提示</h3>
            <div class="tip-box"><p>${p.hint}</p></div>
        </div>` : ''}

        <div class="detail-section">
            <div class="detail-status-bar">
                <span class="status-label">标记这道题：</span>
                <button class="status-btn ${st.attempted === 'correct' ? 'status-btn-correct-active' : ''}"
                        onclick="markProblemStatus('${p.id}', 'correct')">✓ 做对</button>
                <button class="status-btn ${st.attempted === 'wrong' ? 'status-btn-wrong-active' : ''}"
                        onclick="markProblemStatus('${p.id}', 'wrong')">✗ 做错</button>
                <button class="status-btn ${st.starred ? 'status-btn-star-active' : ''}"
                        onclick="markProblemStatus('${p.id}', 'star')">★ 收藏</button>
            </div>
        </div>

        <div class="detail-section">
            <a class="jump-full-btn" href="${pdfUrl}" target="_blank" rel="noopener">
                &#x1F4C4; 打开 PDF 原文（第 ${p.page} 页）
            </a>
        </div>

        ${topics.length > 0 ? `
        <div class="detail-section">
            <h3>&#x1F3F7; 涉及主题</h3>
            <div class="prereq-tags">
                ${topics.map(t => `<span class="prereq-tag" onclick="showDetail('${t.id}')">${t.name}</span>`).join('')}
            </div>
        </div>` : ''}
    `;
    openPanel();
}

function markProblemStatus(id, action) {
    if (action === 'correct') setAttempted(id, 'correct');
    else if (action === 'wrong') setAttempted(id, 'wrong');
    else if (action === 'star') toggleStar(id);
    // 刷新当前详情面板
    showProblemDetail(id);
    // 同时刷新其他视图上的标记
    if (currentView === 'library') renderLibrary();
    if (currentView === 'practice') renderPractice();
}

function openPanel() {
    document.getElementById('detail-panel').classList.add('open');
    document.getElementById('detail-overlay').classList.add('open');
    document.getElementById('detail-panel').scrollTop = 0;
}

function closeDetail() {
    document.getElementById('detail-panel').classList.remove('open');
    document.getElementById('detail-overlay').classList.remove('open');
}

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDetail(); });

// ============= 练习模式 =============
function rebuildPracticeQueue() {
    const pool = panguProblems.filter(problemMatchesFilters);
    // Fisher-Yates 打乱
    practiceQueue = pool.map(p => p.id);
    for (let i = practiceQueue.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [practiceQueue[i], practiceQueue[j]] = [practiceQueue[j], practiceQueue[i]];
    }
    practiceIndex = 0;
    practiceAnswerRevealed = false;
    practiceHintRevealed = false;
    renderPractice();
}

function practiceNext() {
    if (!practiceQueue.length) return;
    practiceIndex = (practiceIndex + 1) % practiceQueue.length;
    practiceAnswerRevealed = false;
    practiceHintRevealed = false;
    renderPractice();
}

function practicePrev() {
    if (!practiceQueue.length) return;
    practiceIndex = (practiceIndex - 1 + practiceQueue.length) % practiceQueue.length;
    practiceAnswerRevealed = false;
    practiceHintRevealed = false;
    renderPractice();
}

function practiceReveal(what) {
    if (what === 'hint') practiceHintRevealed = true;
    if (what === 'answer') practiceAnswerRevealed = true;
    renderPractice();
}

function practiceReshuffle() {
    rebuildPracticeQueue();
}

function renderPractice() {
    const container = document.getElementById('practice-panel');
    if (!container) return;

    const total = practiceQueue.length;
    if (total === 0) {
        container.innerHTML = `<div class="path-intro">
            <h2>&#x1F3AF; 练习模式</h2>
            <p>当前筛选下没有可练习的题目。请调整年级 / 轮次 / 主题 / 难度筛选器。</p>
        </div>`;
        return;
    }

    const p = panguProblemMap[practiceQueue[practiceIndex]];
    if (!p) { container.innerHTML = ''; return; }

    const pg = problemGrade(p);
    const stars = '⋆'.repeat(p.difficulty);
    const pdfUrl = encodeURI(p.file) + `#page=${p.page}`;
    const topics = (p.topics || []).map(tid => panguNodeMap[tid]).filter(Boolean);

    // 优先用 explicit answer 字段；否则解析 hint
    let answerLetter = p.answer || null;
    if (!answerLetter && p.hint) {
        const m = p.hint.match(/答案[：:]?\s*([a-eA-E])/);
        if (m) answerLetter = m[1].toLowerCase();
    }

    // 当前题状态
    const st = getStatus(p.id);

    // 进度统计（在当前筛选内已做对 / 已做错 / 已收藏的比例）
    let doneCorrect = 0, doneWrong = 0, doneStar = 0;
    practiceQueue.forEach(id => {
        const s = getStatus(id);
        if (s.attempted === 'correct') doneCorrect++;
        if (s.attempted === 'wrong') doneWrong++;
        if (s.starred) doneStar++;
    });

    container.innerHTML = `
        <div class="path-intro">
            <h2>&#x1F3AF; 练习模式</h2>
            <p>随机抽题，一次一题。进度 <b>${practiceIndex + 1} / ${total}</b> ·
               <span class="stat-inline">✓ ${doneCorrect}</span>
               <span class="stat-inline">✗ ${doneWrong}</span>
               <span class="stat-inline">★ ${doneStar}</span>
            </p>
        </div>

        <div class="practice-card">
            <div class="practice-meta">
                <span class="detail-grade-badge" style="background:${gradeColor(pg)}">AK${pg}</span>
                <span class="practice-round">${p.year} ${p.round}</span>
                <span class="practice-num">第 ${p.num} 题</span>
                <span class="practice-diff">${stars} (${p.difficulty}星)</span>
                ${p.hasImage ? '<span class="problem-img-tag">含图</span>' : ''}
                ${st.starred ? '<span class="status-tag status-star">★ 已收藏</span>' : ''}
                ${st.attempted === 'correct' ? '<span class="status-tag status-correct">✓ 做对</span>' : ''}
                ${st.attempted === 'wrong'   ? '<span class="status-tag status-wrong">✗ 做错</span>' : ''}
            </div>

            <h3 class="practice-title">${p.title}</h3>

            <div class="practice-question">${p.translation.replace(/\n/g, '<br>')}</div>

            ${p.options ? `
            <ol class="practice-options" type="a">
                ${p.options.map((opt, i) => {
                    const letter = String.fromCharCode(97 + i);
                    const isCorrect = practiceAnswerRevealed && answerLetter === letter;
                    return `<li class="${isCorrect ? 'practice-opt-correct' : ''}">${opt}${isCorrect ? ' ✓' : ''}</li>`;
                }).join('')}
            </ol>` : ''}

            ${practiceHintRevealed && p.hint ? `
            <div class="practice-hint">
                <b>&#x1F4A1; 提示：</b> ${p.hint}
            </div>` : ''}

            ${topics.length ? `
            <div class="practice-tags">
                ${topics.map(t => `<span class="topic-tag cat-bg-${t.category}" onclick="showDetail('${t.id}')">${t.name}</span>`).join('')}
            </div>` : ''}

            <div class="practice-status-actions">
                <span class="status-label">标记这道题：</span>
                <button class="status-btn ${st.attempted === 'correct' ? 'status-btn-correct-active' : ''}"
                        onclick="practiceMark('correct')">✓ 做对</button>
                <button class="status-btn ${st.attempted === 'wrong' ? 'status-btn-wrong-active' : ''}"
                        onclick="practiceMark('wrong')">✗ 做错</button>
                <button class="status-btn ${st.starred ? 'status-btn-star-active' : ''}"
                        onclick="practiceMark('star')">★ 收藏</button>
            </div>

            <div class="practice-actions">
                <button class="practice-btn" onclick="practicePrev()">← 上一题</button>
                ${!practiceHintRevealed && p.hint ? '<button class="practice-btn practice-btn-hint" onclick="practiceReveal(\'hint\')">显示提示</button>' : ''}
                ${!practiceAnswerRevealed ? '<button class="practice-btn practice-btn-answer" onclick="practiceReveal(\'answer\')">显示答案</button>' : ''}
                <button class="practice-btn practice-btn-primary" onclick="practiceNext()">下一题 →</button>
                <button class="practice-btn practice-btn-reshuffle" onclick="practiceReshuffle()">🎲 重新洗牌</button>
                <a class="practice-btn practice-btn-pdf" href="${pdfUrl}" target="_blank" rel="noopener">📄 打开 PDF</a>
                <button class="practice-btn" onclick="showProblemDetail('${p.id}')">📋 详情</button>
            </div>
        </div>
    `;
}

function practiceMark(action) {
    const id = practiceQueue[practiceIndex];
    if (!id) return;
    if (action === 'correct') setAttempted(id, 'correct');
    else if (action === 'wrong') setAttempted(id, 'wrong');
    else if (action === 'star') toggleStar(id);
    renderPractice();
}

// ============= 打印导出 =============
let printGroupBy = 'topic';   // 'topic' | 'year' | 'grade'
let printShowHints = true;

function setPrintGroupBy(g) {
    printGroupBy = g;
    renderPrint();
}

function togglePrintHints() {
    printShowHints = !printShowHints;
    renderPrint();
}

function renderPrint() {
    const container = document.getElementById('print-panel');
    if (!container) return;
    const items = panguProblems.filter(problemMatchesFilters);

    // 分组
    const groups = {};
    items.forEach(p => {
        let keys = [];
        if (printGroupBy === 'topic') {
            keys = (p.topics || []).length ? p.topics.map(t => panguNodeMap[t]?.name || t) : ['(无主题)'];
        } else if (printGroupBy === 'year') {
            keys = [`${p.year} ${p.round}`];
        } else {
            keys = [`AK${problemGrade(p)}`];
        }
        keys.forEach(k => (groups[k] = groups[k] || []).push(p));
    });

    let html = `<div class="print-controls no-print">
        <h2>&#x1F5A8; 打印导出</h2>
        <p>把筛选后的题目排版成可打印格式。共 <b>${items.length}</b> 题。用浏览器"打印"（Ctrl+P）即可导出 PDF 或直接打印。</p>

        <div class="print-toolbar">
            <label>分组方式：</label>
            <button class="print-toggle-btn ${printGroupBy==='topic'?'active':''}" onclick="setPrintGroupBy('topic')">按主题</button>
            <button class="print-toggle-btn ${printGroupBy==='year'?'active':''}" onclick="setPrintGroupBy('year')">按年份/轮次</button>
            <button class="print-toggle-btn ${printGroupBy==='grade'?'active':''}" onclick="setPrintGroupBy('grade')">按年级</button>
            <span style="width:12px"></span>
            <label>
                <input type="checkbox" ${printShowHints?'checked':''} onchange="togglePrintHints()">
                包含提示与答案
            </label>
            <span style="width:12px"></span>
            <button class="print-toggle-btn print-btn-primary" onclick="window.print()">🖨 打印</button>
            <button class="print-toggle-btn" onclick="exportCsv()">📥 导出 CSV</button>
        </div>
    </div>

    <div class="print-doc" id="print-doc">
        <div class="print-cover">
            <h1>盘古数学竞赛题集</h1>
            <p>筛选条件：
                ${currentGrade === 'all' ? '全年级' : 'AK' + currentGrade} ·
                ${currentRound === 'all' ? '全部轮次' : currentRound} ·
                ${currentTopic === 'all' ? '全部主题' : (panguNodeMap[currentTopic]?.name || currentTopic)} ·
                ${currentDifficulty === 'all' ? '全部难度' : currentDifficulty + '星'}
            </p>
            <p>共 <b>${items.length}</b> 道题</p>
        </div>
    </div>
    `;

    // 分组内容
    const orderedKeys = Object.keys(groups).sort();
    let contentHtml = '';
    orderedKeys.forEach(k => {
        const problems = groups[k];
        contentHtml += `<div class="print-section">
            <h2 class="print-section-title">${k} <span class="print-section-count">（${problems.length} 题）</span></h2>
            ${problems.map((p, i) => renderPrintProblem(p, i + 1)).join('')}
        </div>`;
    });

    if (items.length === 0) {
        contentHtml = '<p class="print-empty">当前筛选下无题目。请调整筛选条件。</p>';
    }

    html = html.replace('</div>\n\n    <div class="print-doc"', '</div><div class="print-doc"');
    // 更清晰的方案：直接拼在末尾
    container.innerHTML = html;
    const doc = document.getElementById('print-doc');
    if (doc) doc.innerHTML = doc.innerHTML + contentHtml;
}

function renderPrintProblem(p, seq) {
    const stars = '⋆'.repeat(p.difficulty);
    const pg = problemGrade(p);
    const ansLetter = p.answer || (p.hint && (p.hint.match(/答案[：:]?\s*([a-eA-E])/) || [])[1]);
    const showAnswer = printShowHints && ansLetter;

    return `<div class="print-problem">
        <div class="print-problem-head">
            <span class="print-problem-seq">${seq}.</span>
            <span class="print-problem-badge">AK${pg} · ${p.year} ${p.round} · 第${p.num}题</span>
            <span class="print-problem-diff">${stars}</span>
            ${p.hasImage ? '<span class="print-problem-img">［含图，见 PDF 第 ' + p.page + ' 页］</span>' : ''}
        </div>
        <div class="print-problem-title"><b>${p.title}</b></div>
        <div class="print-problem-question">${p.translation.replace(/\n/g, '<br>')}</div>
        ${p.options ? `<ol class="print-problem-options" type="a">
            ${p.options.map((opt, i) => {
                const letter = String.fromCharCode(97 + i);
                const isAns = showAnswer && letter === (ansLetter || '').toLowerCase();
                return `<li${isAns ? ' class="print-opt-answer"' : ''}>${opt}${isAns ? ' ✓' : ''}</li>`;
            }).join('')}
        </ol>` : ''}
        ${printShowHints && p.hint ? `<div class="print-problem-hint"><b>提示：</b>${p.hint}</div>` : ''}
    </div>`;
}

// ============= CSV 导出 =============
function csvEscape(v) {
    if (v === null || v === undefined) return '';
    const s = String(v);
    if (/[",\n\r]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
    return s;
}

function exportCsv() {
    const items = panguProblems.filter(problemMatchesFilters);
    if (!items.length) {
        alert('当前筛选下无题目，无法导出。');
        return;
    }
    const headers = ['id', 'grade', 'year', 'round', 'num', 'difficulty', 'title', 'translation',
                     'options', 'answer', 'topics', 'hint', 'file', 'page', 'has_image',
                     'status_attempted', 'status_starred'];
    const lines = [headers.join(',')];

    items.forEach(p => {
        const st = getStatus(p.id);
        const row = [
            p.id,
            problemGrade(p),
            p.year,
            p.round,
            p.num,
            p.difficulty,
            p.title,
            p.translation,
            (p.options || []).join(' | '),
            p.answer || (p.hint && (p.hint.match(/答案[：:]?\s*([a-eA-E])/) || [])[1]) || '',
            (p.topics || []).map(t => panguNodeMap[t]?.name || t).join(' | '),
            p.hint || '',
            p.file,
            p.page,
            p.hasImage ? 'yes' : 'no',
            st.attempted || '',
            st.starred ? 'yes' : ''
        ];
        lines.push(row.map(csvEscape).join(','));
    });

    // BOM for Excel Chinese
    const csv = '\uFEFF' + lines.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    const filenameParts = ['pangu'];
    if (currentGrade !== 'all')       filenameParts.push('AK' + currentGrade);
    if (currentRound !== 'all')       filenameParts.push(currentRound);
    if (currentTopic !== 'all')       filenameParts.push(panguNodeMap[currentTopic]?.name.replace(/[^\w\u4e00-\u9fa5]/g, '') || currentTopic);
    if (currentSet !== 'all')         filenameParts.push(currentSet);
    filenameParts.push(new Date().toISOString().slice(0, 10));
    a.download = filenameParts.join('_') + '.csv';
    a.href = url;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
}
