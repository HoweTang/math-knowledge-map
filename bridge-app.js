// ============= 全局状态 =============
let currentView = 'graph';
let currentGrade = 'all';
let simulation = null;
let svg = null;
let graphGroup = null;

// 用节点 id 前缀区分类型
const isGermanId = id => typeof id === 'string' && id.startsWith('gc_');

// 全部小学节点索引
const elemNodeMap = Object.fromEntries(knowledgeNodes.map(n => [n.id, n]));
const gNodeMap = Object.fromEntries(germanNodes.map(n => [n.id, n]));

// ============= 数据构造 =============
// 只保留有跨图关联的节点
function buildBridgeData() {
    // 1. 收集所有跨图连接
    const crossLinks = [];
    const linkedElemIds = new Set();
    const linkedGermanIds = new Set();

    germanNodes.forEach(gn => {
        (gn.linkedElementary || []).forEach(eid => {
            if (elemNodeMap[eid]) {
                crossLinks.push({ source: gn.id, target: eid, type: 'cross' });
                linkedElemIds.add(eid);
                linkedGermanIds.add(gn.id);
            }
        });
    });

    // 2. 构造节点集：只包含参与跨图关联的节点
    const elemNodes = knowledgeNodes
        .filter(n => linkedElemIds.has(n.id))
        .map(n => ({ ...n, _type: 'elementary' }));
    const gNodes = germanNodes
        .filter(n => linkedGermanIds.has(n.id))
        .map(n => ({ ...n, _type: 'german' }));

    return { nodes: [...elemNodes, ...gNodes], links: crossLinks };
}

// ============= 初始化 =============
document.addEventListener('DOMContentLoaded', () => {
    initGraph();
    renderTable();
    renderStats();

    const params = new URLSearchParams(location.search);
    const topicId = params.get('topic');
    if (topicId) {
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

// ============= 筛选 =============
function filterGrade(grade) {
    currentGrade = grade;
    document.querySelectorAll('.grade-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.grade === grade);
    });
    updateGraphFilter();
    renderTable();
}

// 判断节点是否符合当前筛选
function passFilter(node) {
    if (currentGrade === 'all') return true;
    const kGrade = currentGrade === 'k3' ? 3 : 4;
    if (node._type === 'german') return node.grade === kGrade;
    // elementary：检查是否至少关联到符合的德国节点
    const linkedGermanNodes = germanNodes.filter(gn =>
        (gn.linkedElementary || []).includes(node.id) && gn.grade === kGrade
    );
    return linkedGermanNodes.length > 0;
}

// ============= 关联图谱 =============
function initGraph() {
    const container = document.querySelector('.graph-container');
    const width = container.clientWidth;
    const height = container.clientHeight;

    svg = d3.select('#knowledge-graph')
        .attr('width', width)
        .attr('height', height);

    // 缩放
    const zoom = d3.zoom()
        .scaleExtent([0.3, 3])
        .on('zoom', (event) => {
            graphGroup.attr('transform', event.transform);
        });
    svg.call(zoom);
    graphGroup = svg.append('g');

    const data = buildBridgeData();
    const nodes = data.nodes.map(d => ({ ...d }));
    const links = data.links.map(d => ({ ...d }));

    // 力：小学节点靠左，德国节点靠右
    const leftX = width * 0.28;
    const rightX = width * 0.72;

    simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(180).strength(0.5))
        .force('charge', d3.forceManyBody().strength(-320))
        .force('collision', d3.forceCollide().radius(38))
        .force('x', d3.forceX(d => d._type === 'elementary' ? leftX : rightX).strength(0.35))
        .force('y', d3.forceY(height / 2).strength(0.06));

    // 中间分隔虚线（装饰）
    graphGroup.append('line')
        .attr('class', 'bridge-divider')
        .attr('x1', width / 2).attr('y1', 40)
        .attr('x2', width / 2).attr('y2', height - 40)
        .attr('stroke', '#dbe1e8')
        .attr('stroke-dasharray', '4 6')
        .attr('stroke-width', 1);

    graphGroup.append('text')
        .attr('class', 'bridge-column-label')
        .attr('x', leftX).attr('y', 30)
        .attr('text-anchor', 'middle')
        .attr('font-size', '13px')
        .attr('font-weight', '600')
        .attr('fill', '#2c3e50')
        .text('📐 小学教材知识点');

    graphGroup.append('text')
        .attr('class', 'bridge-column-label')
        .attr('x', rightX).attr('y', 30)
        .attr('text-anchor', 'middle')
        .attr('font-size', '13px')
        .attr('font-weight', '600')
        .attr('fill', '#2c3e50')
        .text('🏆 德国竞赛主题');

    // 连线
    const link = graphGroup.append('g')
        .selectAll('line')
        .data(links)
        .join('line')
        .attr('class', 'link cross-link')
        .attr('stroke', '#9C27B0')
        .attr('stroke-width', 1.5)
        .attr('stroke-dasharray', '5 4')
        .attr('stroke-opacity', 0.5);

    // 节点
    const node = graphGroup.append('g')
        .selectAll('g')
        .data(nodes)
        .join('g')
        .attr('class', d => `node bridge-node ${d._type}`)
        .call(d3.drag()
            .on('start', dragStarted)
            .on('drag', dragged)
            .on('end', dragEnded));

    // 小学节点：小圆，年级色
    // 德国节点：大圆，类别色，边框深色
    node.append('circle')
        .attr('r', d => d._type === 'german' ? 20 : 14)
        .attr('fill', d => d._type === 'german' ? germanCategoryColors[d.category] : gradeColors[d.grade])
        .attr('stroke', d => d._type === 'german' ? germanGradeColors[d.grade] : '#fff')
        .attr('stroke-width', d => d._type === 'german' ? 3 : 2)
        .attr('opacity', 0.92);

    // 德国节点内部 K3/K4 文字标签
    node.filter(d => d._type === 'german')
        .append('text')
        .attr('dy', 4)
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .attr('font-weight', '700')
        .attr('fill', 'white')
        .attr('pointer-events', 'none')
        .text(d => 'K' + d.grade);

    // 小学节点内部年级数字
    node.filter(d => d._type === 'elementary')
        .append('text')
        .attr('dy', 3)
        .attr('text-anchor', 'middle')
        .attr('font-size', '9px')
        .attr('font-weight', '700')
        .attr('fill', 'white')
        .attr('pointer-events', 'none')
        .text(d => d.grade);

    // 节点下方显示名称
    node.append('text')
        .attr('class', 'bridge-node-label')
        .attr('dy', d => d._type === 'german' ? 34 : 28)
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .text(d => d._type === 'german'
            ? d.name.replace(/^K[34]\s*·\s*/, '')
            : d.name);

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
        link.attr('stroke-opacity', 0.5).attr('stroke-width', 1.5);
    });

    svg.on('click', () => closeDetail());

    node.append('title')
        .text(d => d._type === 'german'
            ? `${d.name}\n${d.description}`
            : `${d.name} (${d.grade}年级)\n${d.description}`);

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
        simulation
            .force('x', d3.forceX(d => d._type === 'elementary' ? w * 0.28 : w * 0.72).strength(0.35))
            .force('y', d3.forceY(h / 2).strength(0.06));
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
    linkSelection.each(function (l) {
        const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
        const targetId = typeof l.target === 'object' ? l.target.id : l.target;
        const involved = sourceId === d.id || targetId === d.id;
        d3.select(this)
            .classed('dimmed', !involved)
            .attr('stroke-opacity', involved ? 0.95 : 0.05)
            .attr('stroke-width', involved ? 2.5 : 1);
    });
}

function updateGraphFilter() {
    if (!graphGroup) return;
    graphGroup.selectAll('.bridge-node')
        .style('opacity', d => passFilter(d) ? 1 : 0.15);
    graphGroup.selectAll('.cross-link')
        .style('opacity', function (l) {
            const src = typeof l.source === 'object' ? l.source : { id: l.source, _type: 'german' };
            const tgt = typeof l.target === 'object' ? l.target : { id: l.target, _type: 'elementary' };
            // 拿到完整节点对象
            const srcNode = isGermanId(src.id) ? gNodeMap[src.id] : elemNodeMap[src.id];
            const tgtNode = isGermanId(tgt.id) ? gNodeMap[tgt.id] : elemNodeMap[tgt.id];
            const srcTyped = { ...srcNode, _type: isGermanId(src.id) ? 'german' : 'elementary' };
            const tgtTyped = { ...tgtNode, _type: isGermanId(tgt.id) ? 'german' : 'elementary' };
            return passFilter(srcTyped) && passFilter(tgtTyped) ? 0.5 : 0.05;
        });
}

function dragStarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}
function dragged(event, d) { d.fx = event.x; d.fy = event.y; }
function dragEnded(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

// ============= 对照表 =============
function renderTable() {
    const container = document.getElementById('correlation-table');
    let gNodes = germanNodes.filter(n => (n.linkedElementary || []).length > 0);
    if (currentGrade === 'k3') gNodes = gNodes.filter(n => n.grade === 3);
    else if (currentGrade === 'k4') gNodes = gNodes.filter(n => n.grade === 4);

    const k3 = gNodes.filter(n => n.grade === 3);
    const k4 = gNodes.filter(n => n.grade === 4);

    let html = `<div class="path-intro">
        <h2>&#x1F4CB; 关联对照表</h2>
        <p>每个德国竞赛主题对应一到多个国内小学教材知识点。左边是德国主题（含题目数），右边是关联的小学知识点。点击卡片可在关联图谱详情中查看，或跳到对应的原图谱页面。</p>
    </div>`;

    const renderGroup = (title, nodes, badgeClass) => {
        if (!nodes.length) return '';
        return `<div class="grade-section">
            <h2 class="grade-section-title">
                <span class="grade-badge ${badgeClass}">${title}</span>
                共 ${nodes.length} 个关联主题
            </h2>
            <div class="bridge-table">
                ${nodes.map(gn => renderTableRow(gn)).join('')}
            </div>
        </div>`;
    };

    html += renderGroup('K3（3年级组）', k3, 'grade3-badge');
    html += renderGroup('K4（4年级组）', k4, 'grade4-badge');

    container.innerHTML = html;
}

function renderTableRow(gn) {
    const elems = (gn.linkedElementary || [])
        .map(id => elemNodeMap[id])
        .filter(Boolean);
    const problemCount = (gn.problems || []).length;

    return `<div class="bridge-row">
        <div class="bridge-row-left" onclick="showDetail('${gn.id}')">
            <div class="bridge-row-header">
                <span class="bridge-row-title cat-bg-${gn.category}">${gn.name}</span>
                <span class="bridge-row-count">${problemCount} 题</span>
            </div>
            <p class="bridge-row-desc">${gn.description}</p>
        </div>
        <div class="bridge-row-arrow">&hArr;</div>
        <div class="bridge-row-right">
            ${elems.map(e => `
                <a class="bridge-elem-chip grade-${e.grade}" href="index.html?topic=${e.id}"
                   title="在小学教材图谱中查看" onclick="event.stopPropagation();">
                    <span class="chip-grade">${e.grade}年级</span>
                    <span class="chip-name">${e.name}</span>
                    <span class="chip-cat cat-bg-${e.category}">${categoryNames[e.category]}</span>
                </a>
            `).join('')}
        </div>
    </div>`;
}

// ============= 统计 =============
function renderStats() {
    const container = document.getElementById('bridge-stats');
    const totalGerman = germanNodes.length;
    const linkedGerman = germanNodes.filter(n => (n.linkedElementary || []).length > 0).length;
    const linkedElemIds = new Set();
    let totalLinks = 0;
    germanNodes.forEach(gn => (gn.linkedElementary || []).forEach(id => {
        linkedElemIds.add(id);
        totalLinks++;
    }));

    container.innerHTML = `
        <div class="stat-item"><span class="stat-num">${totalLinks}</span><span class="stat-label">关联连接</span></div>
        <div class="stat-item"><span class="stat-num">${linkedGerman}</span><span class="stat-label">德国主题</span></div>
        <div class="stat-item"><span class="stat-num">${linkedElemIds.size}</span><span class="stat-label">小学知识点</span></div>
    `;
}

// ============= 详情面板 =============
function showDetail(id) {
    if (isGermanId(id)) {
        showGermanDetail(id);
    } else {
        showElementaryDetail(id);
    }
}

function showGermanDetail(id) {
    const node = gNodeMap[id];
    if (!node) return;
    const linkedElems = (node.linkedElementary || [])
        .map(eid => elemNodeMap[eid])
        .filter(Boolean);
    const problemCount = (node.problems || []).length;

    const content = document.getElementById('detail-content');
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
            <ul>${node.keyPoints.map(p => `<li>${p}</li>`).join('')}</ul>
        </div>

        <div class="detail-section cross-map-section">
            <h3>&#x1F517; 关联小学教材（${linkedElems.length} 个知识点）</h3>
            <div class="cross-tags">
                ${linkedElems.map(t => `
                    <a class="cross-tag" href="index.html?topic=${t.id}" title="在小学教材图谱中查看">
                        <span class="cross-tag-grade grade-${t.grade}">${t.grade}年级</span>
                        ${t.name}
                        <span class="cross-tag-arrow">&rarr;</span>
                    </a>
                `).join('')}
            </div>
        </div>

        <div class="detail-section">
            <a class="jump-full-btn" href="german.html?topic=${node.id}">
                &#x1F3C6; 在德国竞赛图谱中查看完整详情（含 ${problemCount} 道 PDF 例题）
            </a>
        </div>
    `;
    openPanel();
}

function showElementaryDetail(id) {
    const node = elemNodeMap[id];
    if (!node) return;
    const relatedGerman = germanNodes.filter(gn =>
        (gn.linkedElementary || []).includes(id)
    );

    const content = document.getElementById('detail-content');
    content.innerHTML = `
        <h2>${node.name}</h2>
        <span class="detail-grade-badge" style="background:${gradeColors[node.grade]}">${node.grade}年级 · ${node.lectures}</span>
        <span class="topic-category cat-bg-${node.category}" style="margin-left:8px;padding:4px 12px;border-radius:14px;font-size:12px;color:white">${categoryNames[node.category]}</span>

        <div class="detail-section" style="margin-top:20px">
            <h3>&#x1F4CB; 知识概述</h3>
            <p>${node.description}</p>
        </div>

        <div class="detail-section cross-map-section">
            <h3>&#x1F3C6; 关联德国竞赛主题（${relatedGerman.length} 个）</h3>
            <div class="cross-tags">
                ${relatedGerman.map(gn => {
                    const cnt = (gn.problems || []).length;
                    return `
                    <a class="cross-tag cross-tag-german" href="german.html?topic=${gn.id}" title="在德国竞赛图谱中查看">
                        <span class="cross-tag-grade grade-${gn.grade}">K${gn.grade}</span>
                        ${gn.name.replace(/^K[34]\s*·\s*/, '')}
                        <span class="cross-tag-badge">${cnt}题</span>
                        <span class="cross-tag-arrow">&rarr;</span>
                    </a>`;
                }).join('')}
            </div>
        </div>

        <div class="detail-section">
            <a class="jump-full-btn jump-elem-btn" href="index.html?topic=${node.id}">
                &#x1F4D0; 在小学教材图谱中查看完整详情（含例题、练习、教学建议）
            </a>
        </div>
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

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDetail();
});
