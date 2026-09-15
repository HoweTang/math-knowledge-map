// ============= 全局状态 =============
let currentView = 'graph';
let currentGrade = 'all';
let simulation = null;
let svg = null;
let graphGroup = null;

// 主教材节点索引（用于跨图跳转显示节点名）
const elementaryNodeMap = Object.fromEntries((knowledgeNodes || []).map(n => [n.id, n]));

// ============= 初始化 =============
document.addEventListener('DOMContentLoaded', () => {
    initGraph();
    renderList();
    renderPaths();
    renderLibrary();

    // 支持 URL 参数直接打开某个节点：german.html?topic=gc_k3_calc
    const params = new URLSearchParams(location.search);
    const topicId = params.get('topic');
    if (topicId && germanNodes.find(n => n.id === topicId)) {
        setTimeout(() => showDetail(topicId), 300);
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

// ============= 年级筛选 =============
function filterGrade(grade) {
    currentGrade = grade;
    document.querySelectorAll('.grade-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.grade === grade);
    });
    updateGraphFilter();
    renderList();
    renderLibrary();
}

// ============= 知识图谱 =============
function initGraph() {
    const container = document.querySelector('.graph-container');
    const width = container.clientWidth;
    const height = container.clientHeight;

    svg = d3.select('#knowledge-graph')
        .attr('width', width)
        .attr('height', height);

    svg.append('defs').append('marker')
        .attr('id', 'arrow')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 20)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#888');

    const zoom = d3.zoom()
        .scaleExtent([0.3, 3])
        .on('zoom', (event) => {
            graphGroup.attr('transform', event.transform);
        });

    svg.call(zoom);
    graphGroup = svg.append('g');

    const nodes = germanNodes.map(d => ({ ...d }));
    const links = germanLinks.map(d => ({
        source: d.source,
        target: d.target,
        type: d.type,
        label: d.label
    }));

    simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(140))
        .force('charge', d3.forceManyBody().strength(-450))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(50))
        .force('x', d3.forceX(width / 2).strength(0.05))
        .force('y', d3.forceY(height / 2).strength(0.05));

    const link = graphGroup.append('g')
        .selectAll('line')
        .data(links)
        .join('line')
        .attr('class', d => `link ${d.type}`)
        .attr('stroke', d => d.type === 'prerequisite' ? '#888' : '#bbb')
        .attr('stroke-width', d => d.type === 'prerequisite' ? 1.5 : 1)
        .attr('stroke-dasharray', d => d.type === 'related' ? '4 3' : null)
        .attr('marker-end', d => d.type === 'prerequisite' ? 'url(#arrow)' : null);

    const node = graphGroup.append('g')
        .selectAll('g')
        .data(nodes)
        .join('g')
        .attr('class', 'node')
        .call(d3.drag()
            .on('start', dragStarted)
            .on('drag', dragged)
            .on('end', dragEnded));

    node.append('circle')
        .attr('r', 20)
        .attr('fill', d => germanCategoryColors[d.category])
        .attr('stroke', d => germanGradeColors[d.grade])
        .attr('stroke-width', 3)
        .attr('opacity', 0.92);

    node.append('circle')
        .attr('r', 5)
        .attr('cx', 14)
        .attr('cy', -14)
        .attr('fill', d => germanGradeColors[d.grade])
        .attr('stroke', 'white')
        .attr('stroke-width', 1.5);

    // K3/K4 文字标签
    node.append('text')
        .attr('dy', 4)
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .attr('font-weight', '700')
        .attr('fill', 'white')
        .attr('pointer-events', 'none')
        .text(d => 'K' + d.grade);

    node.append('text')
        .attr('dy', 34)
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .text(d => d.name.replace(/^K[34]\s*·\s*/, ''));

    node.on('click', (event, d) => {
        event.stopPropagation();
        showDetail(d.id);
    });

    node.on('mouseenter', (event, d) => {
        highlightConnected(d, nodes, links, node, link);
    });

    node.on('mouseleave', () => {
        node.classed('dimmed', false);
        link.classed('dimmed', false);
    });

    svg.on('click', () => closeDetail());

    node.append('title')
        .text(d => `${d.name}\n${d.description}`);

    simulation.on('tick', () => {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);
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
    const connectedIds = new Set([d.id]);
    links.forEach(l => {
        const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
        const targetId = typeof l.target === 'object' ? l.target.id : l.target;
        if (sourceId === d.id) connectedIds.add(targetId);
        if (targetId === d.id) connectedIds.add(sourceId);
    });
    nodeSelection.classed('dimmed', n => !connectedIds.has(n.id));
    linkSelection.classed('dimmed', l => {
        const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
        const targetId = typeof l.target === 'object' ? l.target.id : l.target;
        return sourceId !== d.id && targetId !== d.id;
    });
}

function updateGraphFilter() {
    if (!graphGroup) return;
    const allNodes = graphGroup.selectAll('.node');
    const allLinks = graphGroup.selectAll('.link');
    if (currentGrade === 'all') {
        allNodes.style('opacity', 1);
        allLinks.style('opacity', 1);
    } else {
        const grade = parseInt(currentGrade);
        allNodes.style('opacity', d => d.grade === grade ? 1 : 0.15);
        allLinks.style('opacity', 0.1);
    }
}

function dragStarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragEnded(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

// ============= 主题列表 =============
function renderList() {
    const container = document.getElementById('knowledge-list');
    let nodes = germanNodes;
    if (currentGrade !== 'all') {
        nodes = nodes.filter(n => n.grade === parseInt(currentGrade));
    }

    const k3 = nodes.filter(n => n.grade === 3);
    const k4 = nodes.filter(n => n.grade === 4);
    let html = '';

    if (k3.length) {
        html += `<div class="grade-section">
            <h2 class="grade-section-title">
                <span class="grade-badge grade3-badge">K3</span>
                3年级组 · 共${k3.length}个专题
            </h2>
            <div class="topic-grid">
                ${k3.map(renderTopicCard).join('')}
            </div>
        </div>`;
    }
    if (k4.length) {
        html += `<div class="grade-section">
            <h2 class="grade-section-title">
                <span class="grade-badge grade4-badge">K4</span>
                4年级组 · 共${k4.length}个专题
            </h2>
            <div class="topic-grid">
                ${k4.map(renderTopicCard).join('')}
            </div>
        </div>`;
    }
    container.innerHTML = html;
}

function renderTopicCard(node) {
    const problemCount = (node.problems || []).length;
    return `<div class="topic-card grade-${node.grade}" onclick="showDetail('${node.id}')">
        <h4>${node.name}</h4>
        <div class="topic-meta">
            <span>${node.source}</span>
            <span>${problemCount} 道例题</span>
        </div>
        <span class="topic-category cat-bg-${node.category}">${germanCategoryNames[node.category]}</span>
    </div>`;
}

// ============= 学习路径 =============
function renderPaths() {
    const container = document.getElementById('learning-paths');
    let html = `<div class="path-intro">
        <h2>&#x1F3AF; 学习路径指南</h2>
        <p>德国数学奥林匹克（Mathematik-Olympiade）3-4年级组的知识线索。每条路径按 K3 → K4 的顺序排列，帮助从入门到进阶系统训练。</p>
        <p style="margin-top:10px;font-size:13px;color:#7f8c8d;">
            💡 每个主题都关联到国内小学教材相应知识点，点击详情面板中的"关联小学知识"可跨图跳转查看。
        </p>
    </div>`;

    germanPaths.forEach(path => {
        const pathNodes = path.nodes.map(id => germanNodes.find(n => n.id === id)).filter(Boolean);
        html += `<div class="path-section path-${path.category || 'other'}">
            <h2>${path.icon} ${path.name}</h2>
            <p style="color:#7f8c8d;font-size:13px;margin:-8px 0 12px 12px;">${path.description}</p>
            <div class="path-timeline">
                ${pathNodes.map((node, i) => `
                    <div class="path-node grade-${node.grade}" onclick="showDetail('${node.id}')">
                        <span class="node-title">${node.name}</span>
                        <span class="node-desc">${node.source} · ${germanCategoryNames[node.category]} · ${(node.problems || []).length} 道例题</span>
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
    let items = germanProblems.slice();
    if (currentGrade !== 'all') {
        items = items.filter(p => p.grade === parseInt(currentGrade));
    }

    // 按 grade → round → year 分组
    const groups = {};
    items.forEach(p => {
        const key = p.grade === 3
            ? `K3 第${p.round}轮`
            : `K4`;
        if (!groups[key]) groups[key] = {};
        if (!groups[key][p.year]) groups[key][p.year] = [];
        groups[key][p.year].push(p);
    });

    // 反查：每道题被哪些主题引用
    const problemToTopics = {};
    germanNodes.forEach(n => {
        (n.problems || []).forEach(pid => {
            if (!problemToTopics[pid]) problemToTopics[pid] = [];
            problemToTopics[pid].push(n);
        });
    });

    let html = `<div class="path-intro">
        <h2>&#x1F4DA; 全部题目浏览</h2>
        <p>德国数学奥林匹克 K3 / K4 组共 ${germanProblems.length} 道题（第50-65届），按组别与届次组织。点击\"打开PDF\"直接查看题目原文，点击右侧标签跳转到对应主题。</p>
    </div>`;

    const groupOrder = ['K3 第1轮', 'K3 第2轮', 'K4'];
    groupOrder.forEach(key => {
        if (!groups[key]) return;
        const years = Object.keys(groups[key]).sort((a, b) => +b - +a);
        const total = years.reduce((s, y) => s + groups[key][y].length, 0);
        html += `<div class="grade-section">
            <h2 class="grade-section-title">
                <span class="grade-badge ${key.startsWith('K3') ? 'grade3-badge' : 'grade4-badge'}">${key}</span>
                共 ${total} 题
            </h2>
            <div class="year-grid">
                ${years.map(y => `
                    <div class="year-card">
                        <h3>第 ${y} 届</h3>
                        <ul class="problem-list">
                            ${groups[key][y].map(p => {
                                const topics = problemToTopics[p.id] || [];
                                return `<li>
                                    <a class="pdf-link" href="${encodeURI(p.file)}" target="_blank" rel="noopener">
                                        &#x1F4C4; 第${p.problem}题
                                    </a>
                                    <div class="problem-tags">
                                        ${topics.map(t => `<span class="topic-tag cat-bg-${t.category}" onclick="showDetail('${t.id}')">${t.name.replace(/^K[34]\s*·\s*/, '')}</span>`).join('')}
                                    </div>
                                </li>`;
                            }).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        </div>`;
    });

    container.innerHTML = html;
}

// ============= 详情面板 =============
function showDetail(id) {
    const node = germanNodes.find(n => n.id === id);
    if (!node) return;

    const panel = document.getElementById('detail-panel');
    const overlay = document.getElementById('detail-overlay');
    const content = document.getElementById('detail-content');

    // 前置 / 后续 / 相关
    const prereqs = germanLinks
        .filter(l => l.target === id && l.type === 'prerequisite')
        .map(l => germanNodes.find(n => n.id === l.source))
        .filter(Boolean);
    const nextNodes = germanLinks
        .filter(l => l.source === id && l.type === 'prerequisite')
        .map(l => germanNodes.find(n => n.id === l.target))
        .filter(Boolean);
    const relatedNodes = germanLinks
        .filter(l => (l.source === id || l.target === id) && l.type === 'related')
        .map(l => {
            const targetId = l.source === id ? l.target : l.source;
            return germanNodes.find(n => n.id === targetId);
        })
        .filter(Boolean);

    // PDF 题目
    const problems = (node.problems || [])
        .map(pid => germanProblemMap[pid])
        .filter(Boolean);

    // 关联小学教材节点
    const elementaryTopics = (node.linkedElementary || [])
        .map(eid => elementaryNodeMap[eid])
        .filter(Boolean);

    // 关联盘古竞赛主题
    const panguTopics = (typeof panguNodes !== 'undefined')
        ? panguNodes.filter(pn => (pn.linkedGerman || []).includes(id))
        : [];

    content.innerHTML = `
        <h2>${node.name}</h2>
        <span class="detail-grade-badge" style="background:${germanGradeColors[node.grade]}">${germanGradeLabels[node.grade]} · ${node.source}</span>
        <span class="topic-category cat-bg-${node.category}" style="margin-left:8px;padding:4px 12px;border-radius:14px;font-size:12px;color:white">${germanCategoryNames[node.category]}</span>

        <div class="detail-section" style="margin-top:20px">
            <h3>&#x1F4CB; 主题概述</h3>
            <p>${node.description}</p>
        </div>

        <div class="detail-section">
            <h3>&#x1F3AF; 核心考点</h3>
            <ul>
                ${node.keyPoints.map(p => `<li>${p}</li>`).join('')}
            </ul>
        </div>

        <div class="detail-section">
            <h3>&#x1F4A1; 典型思路</h3>
            <div class="tip-box">
                <ul>
                    ${(node.typicalApproach || []).map(t => `<li>${t}</li>`).join('')}
                </ul>
            </div>
        </div>

        ${problems.length > 0 ? `
        <div class="detail-section">
            <h3>&#x1F4D6; 例题 PDF（${problems.length} 道）</h3>
            <p style="font-size:12px;color:#7f8c8d;margin-bottom:10px;">
                初步分类，仅根据届次/题号规律推荐。查看后如需调整归属，可编辑 <code>german-data.js</code> 中对应节点的 <code>problems</code> 字段。
            </p>
            <div class="pdf-grid">
                ${problems.map(p => `
                    <a class="pdf-item" href="${encodeURI(p.file)}" target="_blank" rel="noopener">
                        <span class="pdf-icon">&#x1F4C4;</span>
                        <div>
                            <div class="pdf-title">${p.title}</div>
                            <div class="pdf-file">${p.file.split('/').pop()}</div>
                        </div>
                    </a>
                `).join('')}
            </div>
        </div>` : ''}

        ${elementaryTopics.length > 0 ? `
        <div class="detail-section cross-map-section">
            <h3>&#x1F517; 关联小学教材知识（点击跳转）</h3>
            <p style="font-size:12px;color:#7f8c8d;margin-bottom:8px;">
                这些是国内小学 3-6 年级教材中的对应知识点，掌握它们后再攻克德国竞赛题会事半功倍。
            </p>
            <div class="cross-tags">
                ${elementaryTopics.map(t => `
                    <a class="cross-tag" href="index.html?topic=${t.id}" title="跳转到小学教材图谱">
                        <span class="cross-tag-grade grade-${t.grade}">${t.grade}年级</span>
                        ${t.name}
                        <span class="cross-tag-arrow">&rarr;</span>
                    </a>
                `).join('')}
            </div>
        </div>` : ''}

        ${panguTopics.length > 0 ? `
        <div class="detail-section cross-map-section">
            <h3>&#x1F3A8; 关联盘古竞赛主题（AK4，含中文翻译）</h3>
            <p style="font-size:12px;color:#7f8c8d;margin-bottom:8px;">
                瑞典盘古数学竞赛的对应主题，题目已翻译为中文。
            </p>
            <div class="cross-tags">
                ${panguTopics.map(t => {
                    const cnt = (typeof problemsForPanguTopic === 'function') ? problemsForPanguTopic(t.id).length : 0;
                    return `
                    <a class="cross-tag cross-tag-pangu" href="pangu.html?topic=${t.id}" title="跳转到盘古竞赛图谱">
                        <span class="cross-tag-grade" style="background:#F9A825;color:white">AK4</span>
                        ${t.name}
                        <span class="cross-tag-badge">${cnt}题</span>
                        <span class="cross-tag-arrow">&rarr;</span>
                    </a>`;
                }).join('')}
            </div>
        </div>` : ''}

        ${prereqs.length > 0 ? `
        <div class="detail-section prereq-section">
            <h3>&#x2B05; 前置主题</h3>
            <div class="prereq-tags">
                ${prereqs.map(p => `<span class="prereq-tag" onclick="showDetail('${p.id}')">${p.name}</span>`).join('')}
            </div>
        </div>` : ''}

        ${nextNodes.length > 0 ? `
        <div class="detail-section">
            <h3>&#x27A1; 后续主题</h3>
            <div class="next-tags">
                ${nextNodes.map(n => `<span class="next-tag" onclick="showDetail('${n.id}')">${n.name}</span>`).join('')}
            </div>
        </div>` : ''}

        ${relatedNodes.length > 0 ? `
        <div class="detail-section">
            <h3>&#x1F517; 相关主题</h3>
            <div class="prereq-tags">
                ${relatedNodes.map(r => `<span class="prereq-tag" onclick="showDetail('${r.id}')" style="background:#fff3e0;color:#E65100;border-color:#ffe0b2">${r.name}</span>`).join('')}
            </div>
        </div>` : ''}
    `;

    panel.classList.add('open');
    overlay.classList.add('open');
    panel.scrollTop = 0;
}

function closeDetail() {
    document.getElementById('detail-panel').classList.remove('open');
    document.getElementById('detail-overlay').classList.remove('open');
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDetail();
});
