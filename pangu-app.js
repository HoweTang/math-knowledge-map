// ============= 全局状态 =============
let currentView = 'graph';
let currentRound = 'all';
let simulation = null;
let svg = null;
let graphGroup = null;

// 从主图取索引
const elementaryNodeMap = Object.fromEntries((knowledgeNodes || []).map(n => [n.id, n]));
const germanNodeMap = Object.fromEntries((germanNodes || []).map(n => [n.id, n]));

// ============= 初始化 =============
document.addEventListener('DOMContentLoaded', () => {
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

// ============= 视图切换 =============
function switchView(view) {
    currentView = view;
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });
    document.querySelectorAll('.view-panel').forEach(panel => {
        panel.classList.toggle('active', panel.id === view + '-view');
    });
    if (view === 'graph' && simulation) {
        simulation.alpha(0.3).restart();
    }
}

function filterRound(round) {
    currentRound = round;
    document.querySelectorAll('.grade-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.round === round);
    });
    renderList();
    renderLibrary();
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
        .attr('r', 22)
        .attr('fill', d => panguCategoryColors[d.category])
        .attr('stroke', '#F9A825')  // AK4 金黄色边框
        .attr('stroke-width', 3)
        .attr('opacity', 0.92);

    // AK4 徽标
    node.append('circle')
        .attr('r', 6)
        .attr('cx', 16).attr('cy', -16)
        .attr('fill', '#F9A825')
        .attr('stroke', 'white').attr('stroke-width', 1.5);
    node.append('text')
        .attr('dx', 16).attr('dy', -13)
        .attr('text-anchor', 'middle')
        .attr('font-size', '8px')
        .attr('font-weight', '700')
        .attr('fill', 'white')
        .attr('pointer-events', 'none')
        .text('AK4');

    node.append('text')
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
    let html = `<div class="path-intro">
        <h2>&#x1F3A8; 盘古数学竞赛 (Pangea Matematiktävling) · AK4</h2>
        <p>瑞典盘古数学竞赛 4 年级组，覆盖 2024/2025 和 2025/2026 两届的初赛与决赛，共 ${panguProblems.length} 道题。原题为瑞典语，全部已翻译为中文。点击主题查看该主题下的所有题目、解题思路与关联知识。</p>
    </div>`;

    html += `<div class="grade-section">
        <h2 class="grade-section-title">
            <span class="grade-badge" style="background:#F9A825;color:white">AK4</span>
            共 ${panguNodes.length} 个主题
        </h2>
        <div class="topic-grid">
            ${panguNodes.map(n => {
                const cnt = problemsForPanguTopic(n.id).length;
                return `<div class="topic-card grade-4" style="border-left-color:#F9A825" onclick="showDetail('${n.id}')">
                    <h4>${n.name}</h4>
                    <div class="topic-meta">
                        <span>AK4</span>
                        <span>${cnt} 道题</span>
                    </div>
                    <span class="topic-category cat-bg-${n.category}">${panguCategoryNames[n.category]}</span>
                </div>`;
            }).join('')}
        </div>
    </div>`;

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
                ${pathNodes.map((node, i) => `
                    <div class="path-node grade-4" style="border-left-color:#F9A825" onclick="showDetail('${node.id}')">
                        <span class="node-title">${node.name}</span>
                        <span class="node-desc">AK4 · ${panguCategoryNames[node.category]} · ${problemsForPanguTopic(node.id).length} 道题</span>
                    </div>
                    ${i < pathNodes.length - 1 ? '<div class="path-arrow">&#x25BC;</div>' : ''}
                `).join('')}
            </div>
        </div>`;
    });

    container.innerHTML = html;
}

// ============= 题库浏览 =============
function renderLibrary() {
    const container = document.getElementById('problem-library');
    let items = panguProblems.slice();
    if (currentRound !== 'all') items = items.filter(p => p.round === currentRound);

    // 按 年份 + 轮次 分组
    const groups = {};
    items.forEach(p => {
        const key = `${p.year} ${p.round}`;
        if (!groups[key]) groups[key] = [];
        groups[key].push(p);
    });

    let html = `<div class="path-intro">
        <h2>&#x1F4DA; 全部题目（含中文翻译）</h2>
        <p>共 ${panguProblems.length} 道题，全部为瑞典语原题的中文翻译。点击题目卡片查看详情与解题提示，或点击"打开 PDF"直接跳到原文。</p>
    </div>`;

    const order = ['2024/25 初赛', '2024/25 决赛', '2025/26 初赛', '2025/26 决赛'];
    order.forEach(key => {
        if (!groups[key]) return;
        const problems = groups[key];
        const isRound1 = key.includes('初赛');
        html += `<div class="grade-section">
            <h2 class="grade-section-title">
                <span class="grade-badge" style="background:${isRound1 ? '#4CAF50' : '#F9A825'};color:white">
                    ${key}
                </span>
                共 ${problems.length} 题
            </h2>
            <div class="pangu-problem-grid">
                ${problems.map(p => renderProblemCard(p)).join('')}
            </div>
        </div>`;
    });

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

    return `<div class="pangu-problem-card" onclick="showProblemDetail('${p.id}')">
        <div class="problem-head">
            <span class="problem-num">第 ${p.num} 题</span>
            <span class="problem-diff">${stars}</span>
            ${p.hasImage ? '<span class="problem-img-tag">含图</span>' : ''}
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

    document.getElementById('detail-content').innerHTML = `
        <h2>${node.name}</h2>
        <span class="detail-grade-badge" style="background:#F9A825">AK4 · Pangea AK4</span>
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

    document.getElementById('detail-content').innerHTML = `
        <h2>${p.title}</h2>
        <span class="detail-grade-badge" style="background:#F9A825">${p.year} ${p.round} · 第 ${p.num} 题</span>
        <span class="problem-diff-large" style="margin-left:8px">${stars} (${p.difficulty}星)</span>
        ${p.hasImage ? '<span class="problem-img-tag" style="margin-left:6px">含图片</span>' : ''}

        <div class="detail-section" style="margin-top:20px">
            <h3>&#x1F4DD; 题目（中文翻译）</h3>
            <div class="problem-question">${p.translation.replace(/\n/g, '<br>')}</div>
        </div>

        ${p.options ? `
        <div class="detail-section">
            <h3>&#x1F4CB; 选项</h3>
            <ol class="problem-options" type="a">
                ${p.options.map(opt => `<li>${opt}</li>`).join('')}
            </ol>
        </div>` : ''}

        ${p.hint ? `
        <div class="detail-section">
            <h3>&#x1F4A1; 解题提示</h3>
            <div class="tip-box"><p>${p.hint}</p></div>
        </div>` : ''}

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
