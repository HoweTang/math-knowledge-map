// ============= 全局状态 =============
let currentView = 'graph';
let currentGrade = 'all';
let simulation = null;
let svg = null;
let graphGroup = null;

// ============= 初始化 =============
document.addEventListener('DOMContentLoaded', () => {
    initGraph();
    renderList();
    renderPaths();
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
}

// ============= 知识图谱 =============
function initGraph() {
    const container = document.querySelector('.graph-container');
    const width = container.clientWidth;
    const height = container.clientHeight;

    svg = d3.select('#knowledge-graph')
        .attr('width', width)
        .attr('height', height);

    // 添加箭头标记
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

    // 缩放功能
    const zoom = d3.zoom()
        .scaleExtent([0.3, 3])
        .on('zoom', (event) => {
            graphGroup.attr('transform', event.transform);
        });

    svg.call(zoom);

    graphGroup = svg.append('g');

    // 准备数据
    const nodes = knowledgeNodes.map(d => ({...d}));
    const links = knowledgeLinks.map(d => ({
        source: d.source,
        target: d.target,
        type: d.type,
        label: d.label
    }));

    // 力导向模拟
    simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(120))
        .force('charge', d3.forceManyBody().strength(-400))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(45))
        .force('x', d3.forceX(width / 2).strength(0.05))
        .force('y', d3.forceY(height / 2).strength(0.05));

    // 绘制连线
    const link = graphGroup.append('g')
        .selectAll('line')
        .data(links)
        .join('line')
        .attr('class', d => `link ${d.type}`)
        .attr('stroke', d => d.type === 'prerequisite' ? '#888' : '#bbb')
        .attr('stroke-width', d => d.type === 'prerequisite' ? 1.5 : 1)
        .attr('stroke-dasharray', d => d.type === 'related' ? '4 3' : null)
        .attr('marker-end', d => d.type === 'prerequisite' ? 'url(#arrow)' : null);

    // 绘制节点
    const node = graphGroup.append('g')
        .selectAll('g')
        .data(nodes)
        .join('g')
        .attr('class', 'node')
        .call(d3.drag()
            .on('start', dragStarted)
            .on('drag', dragged)
            .on('end', dragEnded));

    // 节点圆形 - 外圈表示年级
    node.append('circle')
        .attr('r', 18)
        .attr('fill', d => categoryColors[d.category])
        .attr('stroke', d => gradeColors[d.grade])
        .attr('stroke-width', 3)
        .attr('opacity', 0.9);

    // 节点内部小圆标记年级
    node.append('circle')
        .attr('r', 5)
        .attr('cx', 12)
        .attr('cy', -12)
        .attr('fill', d => gradeColors[d.grade])
        .attr('stroke', 'white')
        .attr('stroke-width', 1.5);

    // 节点文字
    node.append('text')
        .attr('dy', 30)
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .text(d => d.name);

    // 鼠标事件
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

    // 点击空白关闭
    svg.on('click', () => {
        closeDetail();
    });

    // Tooltip
    node.append('title')
        .text(d => `${d.name} (${d.grade}年级)\n${d.description}`);

    // 更新位置
    simulation.on('tick', () => {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // 窗口大小变化
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

// ============= 知识列表 =============
function renderList() {
    const container = document.getElementById('knowledge-list');
    let filteredNodes = knowledgeNodes;

    if (currentGrade !== 'all') {
        filteredNodes = knowledgeNodes.filter(n => n.grade === parseInt(currentGrade));
    }

    const grade3Nodes = filteredNodes.filter(n => n.grade === 3);
    const grade4Nodes = filteredNodes.filter(n => n.grade === 4);

    let html = '';

    if (grade3Nodes.length > 0) {
        html += `<div class="grade-section">
            <h2 class="grade-section-title">
                <span class="grade-badge grade3-badge">三年级</span>
                共${grade3Nodes.length}个专题，54讲
            </h2>
            <div class="topic-grid">
                ${grade3Nodes.map(n => renderTopicCard(n)).join('')}
            </div>
        </div>`;
    }

    if (grade4Nodes.length > 0) {
        html += `<div class="grade-section">
            <h2 class="grade-section-title">
                <span class="grade-badge grade4-badge">四年级</span>
                共${grade4Nodes.length}个专题，43讲
            </h2>
            <div class="topic-grid">
                ${grade4Nodes.map(n => renderTopicCard(n)).join('')}
            </div>
        </div>`;
    }

    container.innerHTML = html;
}

function renderTopicCard(node) {
    return `<div class="topic-card grade-${node.grade}" onclick="showDetail('${node.id}')">
        <h4>${node.name}</h4>
        <div class="topic-meta">
            <span>${node.lectures}</span>
            <span>${node.grade}年级</span>
        </div>
        <span class="topic-category cat-bg-${node.category}">${categoryNames[node.category]}</span>
    </div>`;
}

// ============= 学习路径 =============
function renderPaths() {
    const container = document.getElementById('learning-paths');

    let html = `<div class="path-intro">
        <h2>&#x1F3AF; 学习路径指南</h2>
        <p>以下是三年级到四年级数学知识的主要学习路径。每条路径按照知识递进关系排列，建议按顺序学习。点击任意节点可查看该知识点的详细内容。</p>
    </div>`;

    learningPaths.forEach(path => {
        const pathNodes = path.nodes.map(id => knowledgeNodes.find(n => n.id === id)).filter(Boolean);

        html += `<div class="path-section path-${path.id}">
            <h2>${path.icon} ${path.name}</h2>
            <p style="color:#7f8c8d; font-size:13px; margin:-8px 0 12px 12px;">${path.description}</p>
            <div class="path-timeline">
                ${pathNodes.map((node, i) => `
                    <div class="path-node grade-${node.grade}" onclick="showDetail('${node.id}')">
                        <span class="node-title">${node.name}</span>
                        <span class="node-desc">${node.grade}年级 · ${node.lectures} · ${categoryNames[node.category]}</span>
                    </div>
                    ${i < pathNodes.length - 1 ? '<div class="path-arrow">&#x25BC;</div>' : ''}
                `).join('')}
            </div>
        </div>`;
    });

    container.innerHTML = html;
}

// ============= 详情面板 =============
function showDetail(id) {
    const node = knowledgeNodes.find(n => n.id === id);
    if (!node) return;

    const panel = document.getElementById('detail-panel');
    const overlay = document.getElementById('detail-overlay');
    const content = document.getElementById('detail-content');

    // 找到前置知识和后续知识
    const prereqs = knowledgeLinks
        .filter(l => l.target === id && l.type === 'prerequisite')
        .map(l => knowledgeNodes.find(n => n.id === l.source))
        .filter(Boolean);

    const nextNodes = knowledgeLinks
        .filter(l => l.source === id && l.type === 'prerequisite')
        .map(l => knowledgeNodes.find(n => n.id === l.target))
        .filter(Boolean);

    const relatedNodes = knowledgeLinks
        .filter(l => (l.source === id || l.target === id) && l.type === 'related')
        .map(l => {
            const targetId = l.source === id ? l.target : l.source;
            return knowledgeNodes.find(n => n.id === targetId);
        })
        .filter(Boolean);

    content.innerHTML = `
        <h2>${node.name}</h2>
        <span class="detail-grade-badge" style="background:${gradeColors[node.grade]}">${node.grade}年级 · ${node.lectures}</span>
        <span class="topic-category cat-bg-${node.category}" style="margin-left:8px;padding:4px 12px;border-radius:14px;font-size:12px;color:white">${categoryNames[node.category]}</span>

        <div class="detail-section" style="margin-top:20px">
            <h3>&#x1F4CB; 知识概述</h3>
            <p>${node.description}</p>
        </div>

        <div class="detail-section">
            <h3>&#x1F3AF; 核心知识点</h3>
            <ul>
                ${node.keyPoints.map(p => `<li>${p}</li>`).join('')}
            </ul>
        </div>

        <div class="detail-section">
            <h3>&#x1F4D6; 典型例题</h3>
            ${node.examples.map(ex => `
                <div class="example-box">
                    <h4>${ex.title}</h4>
                    <p class="question">${ex.question}</p>
                    <div class="solution"><strong>解析：</strong>${ex.solution}</div>
                </div>
            `).join('')}
        </div>

        <div class="detail-section">
            <h3>&#x270F; 练习题</h3>
            ${node.exercises.map((ex, i) => `
                <div class="exercise-box">
                    <h4>练习 ${i + 1}</h4>
                    <p>${ex}</p>
                </div>
            `).join('')}
        </div>

        <div class="detail-section">
            <h3>&#x1F4A1; 教学建议（如何让小学生更好理解）</h3>
            <div class="tip-box">
                <h4>学习方法与技巧</h4>
                <ul>
                    ${node.tips.map(t => `<li>${t}</li>`).join('')}
                </ul>
            </div>
        </div>

        ${prereqs.length > 0 ? `
        <div class="detail-section prereq-section">
            <h3>&#x2B05; 前置知识</h3>
            <div class="prereq-tags">
                ${prereqs.map(p => `<span class="prereq-tag" onclick="showDetail('${p.id}')">${p.name} (${p.grade}年级)</span>`).join('')}
            </div>
        </div>` : ''}

        ${nextNodes.length > 0 ? `
        <div class="detail-section">
            <h3>&#x27A1; 后续知识</h3>
            <div class="next-tags">
                ${nextNodes.map(n => `<span class="next-tag" onclick="showDetail('${n.id}')">${n.name} (${n.grade}年级)</span>`).join('')}
            </div>
        </div>` : ''}

        ${relatedNodes.length > 0 ? `
        <div class="detail-section">
            <h3>&#x1F517; 相关联系</h3>
            <div class="prereq-tags">
                ${relatedNodes.map(r => `<span class="prereq-tag" onclick="showDetail('${r.id}')" style="background:#fff3e0;color:#E65100;border-color:#ffe0b2">${r.name} (${r.grade}年级)</span>`).join('')}
            </div>
        </div>` : ''}
    `;

    panel.classList.add('open');
    overlay.classList.add('open');
}

function closeDetail() {
    document.getElementById('detail-panel').classList.remove('open');
    document.getElementById('detail-overlay').classList.remove('open');
}

// ESC 关闭面板
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDetail();
});
