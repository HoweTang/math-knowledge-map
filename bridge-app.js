// ============= 全局状态 =============
let currentView = 'graph';
let currentGrade = 'all';   // 'all' | 'k3' | 'k4' | 'ak4'..'ak9'
let simulation = null;
let svg = null;
let graphGroup = null;

// 节点 id 前缀判断
const isGermanId = id => typeof id === 'string' && id.startsWith('gc_');
const isPanguId  = id => typeof id === 'string' && id.startsWith('pangu_');
const nodeType   = id => isGermanId(id) ? 'german' : (isPanguId(id) ? 'pangu' : 'elementary');

// 全节点索引
const elemNodeMap = Object.fromEntries(knowledgeNodes.map(n => [n.id, n]));
const gNodeMap    = Object.fromEntries(germanNodes.map(n => [n.id, n]));
const pNodeMap    = Object.fromEntries((typeof panguNodes !== 'undefined' ? panguNodes : []).map(n => [n.id, n]));

// 盘古年级颜色
const PANGU_GRADE_COLORS = { 4:'#F9A825', 5:'#42A5F5', 6:'#66BB6A', 7:'#AB47BC', 8:'#EF5350', 9:'#5D4037' };
const panguGradeColor = g => PANGU_GRADE_COLORS[g] || '#9E9E9E';

// 连线颜色
const LINK_COLORS = {
    'elem-german':   '#9C27B0',   // 紫
    'elem-pangu':    '#F9A825',   // 金
    'german-pangu':  '#009688'    // 青
};

// ============= 数据构造 =============
function buildBridgeData() {
    const crossLinks = [];
    const linkedElemIds  = new Set();
    const linkedGIds     = new Set();
    const linkedPIds     = new Set();

    // 1) 德国节点 → 小学
    germanNodes.forEach(gn => {
        (gn.linkedElementary || []).forEach(eid => {
            if (elemNodeMap[eid]) {
                crossLinks.push({ source: gn.id, target: eid, type: 'elem-german' });
                linkedElemIds.add(eid);
                linkedGIds.add(gn.id);
            }
        });
    });
    // 2) 盘古节点 → 小学
    (typeof panguNodes !== 'undefined' ? panguNodes : []).forEach(pn => {
        (pn.linkedElementary || []).forEach(eid => {
            if (elemNodeMap[eid]) {
                crossLinks.push({ source: pn.id, target: eid, type: 'elem-pangu' });
                linkedElemIds.add(eid);
                linkedPIds.add(pn.id);
            }
        });
        (pn.linkedGerman || []).forEach(gid => {
            if (gNodeMap[gid]) {
                crossLinks.push({ source: pn.id, target: gid, type: 'german-pangu' });
                linkedGIds.add(gid);
                linkedPIds.add(pn.id);
            }
        });
    });

    const elemNodes = knowledgeNodes.filter(n => linkedElemIds.has(n.id)).map(n => ({ ...n, _type: 'elementary' }));
    const gNodes    = germanNodes.filter(n => linkedGIds.has(n.id)).map(n => ({ ...n, _type: 'german' }));
    const pNodes    = (typeof panguNodes !== 'undefined' ? panguNodes : [])
                        .filter(n => linkedPIds.has(n.id)).map(n => ({ ...n, _type: 'pangu' }));

    return { nodes: [...elemNodes, ...gNodes, ...pNodes], links: crossLinks };
}

// ============= 初始化 =============
document.addEventListener('DOMContentLoaded', () => {
    initGraph();
    renderTable();
    renderStats();

    const params = new URLSearchParams(location.search);
    const topicId = params.get('topic');
    if (topicId) setTimeout(() => showDetail(topicId), 300);
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
    if (view === 'graph' && simulation) simulation.alpha(0.3).restart();
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

function passFilter(node) {
    if (currentGrade === 'all') return true;

    // K3/K4 filter
    if (currentGrade === 'k3' || currentGrade === 'k4') {
        const kGrade = currentGrade === 'k3' ? 3 : 4;
        if (node._type === 'german') return node.grade === kGrade;
        if (node._type === 'elementary') {
            // 至少关联到符合的德国节点
            return germanNodes.some(gn => (gn.linkedElementary || []).includes(node.id) && gn.grade === kGrade);
        }
        if (node._type === 'pangu') {
            // 盘古节点关联到该 K 级
            return (node.linkedGerman || []).some(gid => (gNodeMap[gid] || {}).grade === kGrade);
        }
        return false;
    }
    // AK4-AK9 filter
    if (currentGrade.startsWith('ak')) {
        const akGrade = parseInt(currentGrade.slice(2), 10);
        if (node._type === 'pangu') return (node.grade || 4) === akGrade;
        if (node._type === 'elementary') {
            // 至少被 grade == akGrade 的盘古节点关联
            return (typeof panguNodes !== 'undefined' ? panguNodes : []).some(pn =>
                (pn.linkedElementary || []).includes(node.id) && (pn.grade || 4) === akGrade
            );
        }
        if (node._type === 'german') {
            // 至少被 grade == akGrade 的盘古节点关联
            return (typeof panguNodes !== 'undefined' ? panguNodes : []).some(pn =>
                (pn.linkedGerman || []).includes(node.id) && (pn.grade || 4) === akGrade
            );
        }
    }
    return true;
}

// ============= 关联图谱 =============
function initGraph() {
    const container = document.querySelector('.graph-container');
    const width = container.clientWidth;
    const height = container.clientHeight;

    svg = d3.select('#knowledge-graph').attr('width', width).attr('height', height);

    const zoom = d3.zoom().scaleExtent([0.3, 3])
        .on('zoom', (e) => graphGroup.attr('transform', e.transform));
    svg.call(zoom);
    graphGroup = svg.append('g');

    const data = buildBridgeData();
    const nodes = data.nodes.map(d => ({ ...d }));
    const links = data.links.map(d => ({ ...d }));

    // 三列：小学 / 德国 / 盘古
    const leftX   = width * 0.18;
    const midX    = width * 0.50;
    const rightX  = width * 0.82;
    const xForType = t => t === 'elementary' ? leftX : (t === 'german' ? midX : rightX);

    simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(160).strength(0.35))
        .force('charge', d3.forceManyBody().strength(-280))
        .force('collision', d3.forceCollide().radius(36))
        .force('x', d3.forceX(d => xForType(d._type)).strength(0.4))
        .force('y', d3.forceY(height / 2).strength(0.06));

    // 分隔线
    [midX * 0.7, midX * 1.3].forEach(x => {
        graphGroup.append('line')
            .attr('class', 'bridge-divider')
            .attr('x1', x).attr('y1', 40)
            .attr('x2', x).attr('y2', height - 40)
            .attr('stroke', '#dbe1e8')
            .attr('stroke-dasharray', '4 6')
            .attr('stroke-width', 1);
    });

    // 三列标题
    [
        { x: leftX,  label: '📐 小学教材知识点', color: '#2c3e50' },
        { x: midX,   label: '🏆 德国竞赛主题',   color: '#2c3e50' },
        { x: rightX, label: '🎨 盘古竞赛主题',   color: '#2c3e50' }
    ].forEach(({ x, label, color }) => {
        graphGroup.append('text')
            .attr('class', 'bridge-column-label')
            .attr('x', x).attr('y', 30)
            .attr('text-anchor', 'middle')
            .attr('font-size', '13px').attr('font-weight', '600').attr('fill', color)
            .text(label);
    });

    // 连线
    const link = graphGroup.append('g').selectAll('line').data(links).join('line')
        .attr('class', d => `link cross-link ${d.type}`)
        .attr('stroke', d => LINK_COLORS[d.type] || '#9C27B0')
        .attr('stroke-width', 1.4)
        .attr('stroke-dasharray', '5 4')
        .attr('stroke-opacity', 0.5);

    // 节点
    const node = graphGroup.append('g').selectAll('g').data(nodes).join('g')
        .attr('class', d => `node bridge-node ${d._type}`)
        .call(d3.drag().on('start', dragStarted).on('drag', dragged).on('end', dragEnded));

    node.append('circle')
        .attr('r', d => d._type === 'elementary' ? 14 : 18)
        .attr('fill', d => {
            if (d._type === 'elementary') return gradeColors[d.grade];
            if (d._type === 'german') return germanCategoryColors[d.category];
            return panguCategoryColors[d.category];  // pangu
        })
        .attr('stroke', d => {
            if (d._type === 'elementary') return '#fff';
            if (d._type === 'german')     return germanGradeColors[d.grade];
            return panguGradeColor(d.grade || 4);  // pangu
        })
        .attr('stroke-width', d => d._type === 'elementary' ? 2 : 3)
        .attr('opacity', 0.92);

    // 内部标签
    node.filter(d => d._type === 'elementary')
        .append('text').attr('dy', 3).attr('text-anchor', 'middle')
        .attr('font-size', '9px').attr('font-weight', '700').attr('fill', 'white')
        .attr('pointer-events', 'none').text(d => d.grade);

    node.filter(d => d._type === 'german')
        .append('text').attr('dy', 4).attr('text-anchor', 'middle')
        .attr('font-size', '10px').attr('font-weight', '700').attr('fill', 'white')
        .attr('pointer-events', 'none').text(d => 'K' + d.grade);

    node.filter(d => d._type === 'pangu')
        .append('text').attr('dy', 4).attr('text-anchor', 'middle')
        .attr('font-size', '9px').attr('font-weight', '700').attr('fill', 'white')
        .attr('pointer-events', 'none').text(d => 'AK' + (d.grade || 4));

    // 节点名称
    node.append('text')
        .attr('class', 'bridge-node-label')
        .attr('dy', d => d._type === 'elementary' ? 28 : 34)
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .text(d => {
            if (d._type === 'german') return d.name.replace(/^K[34]\s*·\s*/, '');
            return d.name;
        });

    node.on('click', (e, d) => { e.stopPropagation(); showDetail(d.id); });
    node.on('mouseenter', (e, d) => highlightConnected(d, nodes, links, node, link));
    node.on('mouseleave', () => {
        node.classed('dimmed', false);
        link.classed('dimmed', false);
        link.attr('stroke-opacity', 0.5).attr('stroke-width', 1.4);
    });

    svg.on('click', () => closeDetail());

    node.append('title').text(d => {
        const g = d._type === 'german' ? `K${d.grade}` :
                  d._type === 'pangu'  ? `AK${d.grade || 4}` :
                  `${d.grade}年级`;
        return `${d.name} (${g})\n${d.description || ''}`;
    });

    simulation.on('tick', () => {
        link.attr('x1', d => d.source.x).attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
        node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    window.addEventListener('resize', () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        svg.attr('width', w).attr('height', h);
        simulation.force('x', d3.forceX(d => {
            if (d._type === 'elementary') return w * 0.18;
            if (d._type === 'german')     return w * 0.50;
            return w * 0.82;
        }).strength(0.4)).force('y', d3.forceY(h / 2).strength(0.06));
        simulation.alpha(0.3).restart();
    });
}

function highlightConnected(d, nodes, links, nodeSelection, linkSelection) {
    const connectedIds = new Set([d.id]);
    links.forEach(l => {
        const s = typeof l.source === 'object' ? l.source.id : l.source;
        const t = typeof l.target === 'object' ? l.target.id : l.target;
        if (s === d.id) connectedIds.add(t);
        if (t === d.id) connectedIds.add(s);
    });
    nodeSelection.classed('dimmed', n => !connectedIds.has(n.id));
    linkSelection.each(function (l) {
        const s = typeof l.source === 'object' ? l.source.id : l.source;
        const t = typeof l.target === 'object' ? l.target.id : l.target;
        const involved = s === d.id || t === d.id;
        d3.select(this).classed('dimmed', !involved)
            .attr('stroke-opacity', involved ? 0.95 : 0.05)
            .attr('stroke-width', involved ? 2.5 : 1);
    });
}

function updateGraphFilter() {
    if (!graphGroup) return;
    graphGroup.selectAll('.bridge-node')
        .style('opacity', d => passFilter(d) ? 1 : 0.15);
    graphGroup.selectAll('.cross-link').style('opacity', function (l) {
        const s = typeof l.source === 'object' ? l.source : { id: l.source };
        const t = typeof l.target === 'object' ? l.target : { id: l.target };
        const sType = s._type || nodeType(s.id);
        const tType = t._type || nodeType(t.id);
        const sNode = sType === 'german' ? gNodeMap[s.id] : (sType === 'pangu' ? pNodeMap[s.id] : elemNodeMap[s.id]);
        const tNode = tType === 'german' ? gNodeMap[t.id] : (tType === 'pangu' ? pNodeMap[t.id] : elemNodeMap[t.id]);
        return passFilter({ ...sNode, _type: sType }) && passFilter({ ...tNode, _type: tType }) ? 0.5 : 0.05;
    });
}

function dragStarted(e, d) { if (!e.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; }
function dragged(e, d) { d.fx = e.x; d.fy = e.y; }
function dragEnded(e, d) { if (!e.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; }

// ============= 对照表 =============
function renderTable() {
    const container = document.getElementById('correlation-table');

    // 依据 filter 分组
    let html = `<div class="path-intro">
        <h2>&#x1F4CB; 三方关联对照表</h2>
        <p>展示三个知识图谱之间的横向映射：小学教材 · 德国竞赛 · 盘古竞赛。当前筛选：<b>${currentGrade === 'all' ? '全部' : currentGrade.toUpperCase()}</b>。点击卡片查看详情，或跳转到对应图谱页面。</p>
    </div>`;

    // 视角 1：德国主题 → 关联的小学 + 盘古
    let gNodesToShow = germanNodes.filter(n => (n.linkedElementary || []).length > 0);
    if (currentGrade === 'k3') gNodesToShow = gNodesToShow.filter(n => n.grade === 3);
    else if (currentGrade === 'k4') gNodesToShow = gNodesToShow.filter(n => n.grade === 4);
    else if (currentGrade.startsWith('ak')) {
        const akGrade = parseInt(currentGrade.slice(2), 10);
        gNodesToShow = gNodesToShow.filter(gn => (typeof panguNodes !== 'undefined' ? panguNodes : [])
            .some(pn => (pn.linkedGerman || []).includes(gn.id) && (pn.grade || 4) === akGrade));
    }

    if (gNodesToShow.length) {
        html += `<div class="grade-section">
            <h2 class="grade-section-title">
                <span class="grade-badge grade4-badge">🏆 德国主题视角</span>
                共 ${gNodesToShow.length} 个主题
            </h2>
            <div class="bridge-table">
                ${gNodesToShow.map(gn => renderGermanRow(gn)).join('')}
            </div>
        </div>`;
    }

    // 视角 2：盘古主题 → 关联小学 + 关联德国
    let pNodesToShow = (typeof panguNodes !== 'undefined' ? panguNodes : []).filter(n =>
        (n.linkedElementary || []).length + (n.linkedGerman || []).length > 0);
    if (currentGrade.startsWith('ak')) {
        const akGrade = parseInt(currentGrade.slice(2), 10);
        pNodesToShow = pNodesToShow.filter(pn => (pn.grade || 4) === akGrade);
    } else if (currentGrade === 'k3' || currentGrade === 'k4') {
        const kGrade = currentGrade === 'k3' ? 3 : 4;
        pNodesToShow = pNodesToShow.filter(pn => (pn.linkedGerman || []).some(gid => (gNodeMap[gid] || {}).grade === kGrade));
    }

    if (pNodesToShow.length) {
        html += `<div class="grade-section">
            <h2 class="grade-section-title">
                <span class="grade-badge" style="background:#F9A825;color:white">🎨 盘古主题视角</span>
                共 ${pNodesToShow.length} 个主题
            </h2>
            <div class="bridge-table">
                ${pNodesToShow.map(pn => renderPanguRow(pn)).join('')}
            </div>
        </div>`;
    }

    container.innerHTML = html;
}

function renderGermanRow(gn) {
    const elems = (gn.linkedElementary || []).map(id => elemNodeMap[id]).filter(Boolean);
    const relatedPangu = (typeof panguNodes !== 'undefined' ? panguNodes : [])
        .filter(pn => (pn.linkedGerman || []).includes(gn.id));
    const problemCount = (gn.problems || []).length;

    return `<div class="bridge-row">
        <div class="bridge-row-left" onclick="showDetail('${gn.id}')">
            <div class="bridge-row-header">
                <span class="bridge-row-title cat-bg-${gn.category}">${gn.name}</span>
                <span class="bridge-row-count">K${gn.grade} · ${problemCount} 题</span>
            </div>
            <p class="bridge-row-desc">${gn.description}</p>
        </div>
        <div class="bridge-row-arrow">&hArr;</div>
        <div class="bridge-row-right">
            ${elems.map(e => `
                <a class="bridge-elem-chip grade-${e.grade}" href="index.html?topic=${e.id}"
                   title="小学教材知识点" onclick="event.stopPropagation();">
                    <span class="chip-grade">${e.grade}年级</span>
                    <span class="chip-name">${e.name}</span>
                </a>
            `).join('')}
            ${relatedPangu.map(pn => `
                <a class="bridge-elem-chip" style="border-color:${panguGradeColor(pn.grade || 4)}"
                   href="pangu.html?topic=${pn.id}" title="盘古竞赛主题"
                   onclick="event.stopPropagation();">
                    <span class="chip-grade" style="background:${panguGradeColor(pn.grade || 4)};color:white">AK${pn.grade || 4}</span>
                    <span class="chip-name">${pn.name}</span>
                </a>
            `).join('')}
        </div>
    </div>`;
}

function renderPanguRow(pn) {
    const elems  = (pn.linkedElementary || []).map(id => elemNodeMap[id]).filter(Boolean);
    const germs  = (pn.linkedGerman || []).map(id => gNodeMap[id]).filter(Boolean);
    const problemCount = (typeof panguProblems !== 'undefined')
        ? panguProblems.filter(p => (p.topics || []).includes(pn.id)).length : 0;
    const gc = panguGradeColor(pn.grade || 4);

    return `<div class="bridge-row">
        <div class="bridge-row-left" onclick="showDetail('${pn.id}')">
            <div class="bridge-row-header">
                <span class="bridge-row-title cat-bg-${pn.category}" style="border-left:4px solid ${gc};padding-left:8px">${pn.name}</span>
                <span class="bridge-row-count" style="background:${gc};color:white">AK${pn.grade || 4} · ${problemCount} 题</span>
            </div>
            <p class="bridge-row-desc">${pn.description}</p>
        </div>
        <div class="bridge-row-arrow">&hArr;</div>
        <div class="bridge-row-right">
            ${elems.map(e => `
                <a class="bridge-elem-chip grade-${e.grade}" href="index.html?topic=${e.id}"
                   onclick="event.stopPropagation();">
                    <span class="chip-grade">${e.grade}年级</span>
                    <span class="chip-name">${e.name}</span>
                </a>
            `).join('')}
            ${germs.map(g => `
                <a class="bridge-elem-chip" style="border-color:#9C27B0"
                   href="german.html?topic=${g.id}" onclick="event.stopPropagation();">
                    <span class="chip-grade" style="background:#9C27B0;color:white">K${g.grade}</span>
                    <span class="chip-name">${g.name.replace(/^K[34]\s*·\s*/, '')}</span>
                </a>
            `).join('')}
        </div>
    </div>`;
}

// ============= 统计 =============
function renderStats() {
    const container = document.getElementById('bridge-stats');
    const linkedElemIds = new Set();
    let egLinks = 0, epLinks = 0, gpLinks = 0;
    germanNodes.forEach(gn => (gn.linkedElementary || []).forEach(eid => {
        linkedElemIds.add(eid); egLinks++;
    }));
    (typeof panguNodes !== 'undefined' ? panguNodes : []).forEach(pn => {
        (pn.linkedElementary || []).forEach(eid => { linkedElemIds.add(eid); epLinks++; });
        gpLinks += (pn.linkedGerman || []).length;
    });

    container.innerHTML = `
        <div class="stat-item"><span class="stat-num">${egLinks}</span><span class="stat-label">小学↔德国</span></div>
        <div class="stat-item"><span class="stat-num">${epLinks}</span><span class="stat-label">小学↔盘古</span></div>
        <div class="stat-item"><span class="stat-num">${gpLinks}</span><span class="stat-label">德国↔盘古</span></div>
        <div class="stat-item"><span class="stat-num">${linkedElemIds.size}</span><span class="stat-label">被关联的小学点</span></div>
    `;
}

// ============= 详情面板 =============
function showDetail(id) {
    if (isPanguId(id)) return showPanguDetail(id);
    if (isGermanId(id)) return showGermanDetail(id);
    return showElementaryDetail(id);
}

function showGermanDetail(id) {
    const node = gNodeMap[id];
    if (!node) return;
    const linkedElems = (node.linkedElementary || []).map(eid => elemNodeMap[eid]).filter(Boolean);
    const relatedPangu = (typeof panguNodes !== 'undefined' ? panguNodes : [])
        .filter(pn => (pn.linkedGerman || []).includes(id));
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

        ${linkedElems.length ? `
        <div class="detail-section cross-map-section">
            <h3>&#x1F4D0; 关联小学教材（${linkedElems.length} 个知识点）</h3>
            <div class="cross-tags">
                ${linkedElems.map(t => `
                    <a class="cross-tag" href="index.html?topic=${t.id}">
                        <span class="cross-tag-grade grade-${t.grade}">${t.grade}年级</span>
                        ${t.name}
                        <span class="cross-tag-arrow">&rarr;</span>
                    </a>
                `).join('')}
            </div>
        </div>` : ''}

        ${relatedPangu.length ? `
        <div class="detail-section cross-map-section">
            <h3>&#x1F3A8; 关联盘古竞赛（${relatedPangu.length} 个主题）</h3>
            <div class="cross-tags">
                ${relatedPangu.map(pn => `
                    <a class="cross-tag" style="border-color:${panguGradeColor(pn.grade || 4)}" href="pangu.html?topic=${pn.id}">
                        <span class="cross-tag-grade" style="background:${panguGradeColor(pn.grade || 4)}">AK${pn.grade || 4}</span>
                        ${pn.name}
                        <span class="cross-tag-arrow">&rarr;</span>
                    </a>
                `).join('')}
            </div>
        </div>` : ''}

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
    const relatedGerman = germanNodes.filter(gn => (gn.linkedElementary || []).includes(id));
    const relatedPangu = (typeof panguNodes !== 'undefined' ? panguNodes : [])
        .filter(pn => (pn.linkedElementary || []).includes(id));

    const content = document.getElementById('detail-content');
    content.innerHTML = `
        <h2>${node.name}</h2>
        <span class="detail-grade-badge" style="background:${gradeColors[node.grade]}">${node.grade}年级 · ${node.lectures}</span>
        <span class="topic-category cat-bg-${node.category}" style="margin-left:8px;padding:4px 12px;border-radius:14px;font-size:12px;color:white">${categoryNames[node.category]}</span>

        <div class="detail-section" style="margin-top:20px">
            <h3>&#x1F4CB; 知识概述</h3>
            <p>${node.description}</p>
        </div>

        ${relatedGerman.length ? `
        <div class="detail-section cross-map-section">
            <h3>&#x1F3C6; 关联德国竞赛主题（${relatedGerman.length} 个）</h3>
            <div class="cross-tags">
                ${relatedGerman.map(gn => `
                    <a class="cross-tag cross-tag-german" href="german.html?topic=${gn.id}">
                        <span class="cross-tag-grade grade-${gn.grade}">K${gn.grade}</span>
                        ${gn.name.replace(/^K[34]\s*·\s*/, '')}
                        <span class="cross-tag-badge">${(gn.problems || []).length}题</span>
                        <span class="cross-tag-arrow">&rarr;</span>
                    </a>
                `).join('')}
            </div>
        </div>` : ''}

        ${relatedPangu.length ? `
        <div class="detail-section cross-map-section">
            <h3>&#x1F3A8; 关联盘古竞赛主题（${relatedPangu.length} 个）</h3>
            <div class="cross-tags">
                ${relatedPangu.map(pn => `
                    <a class="cross-tag" style="border-color:${panguGradeColor(pn.grade || 4)}" href="pangu.html?topic=${pn.id}">
                        <span class="cross-tag-grade" style="background:${panguGradeColor(pn.grade || 4)}">AK${pn.grade || 4}</span>
                        ${pn.name}
                        <span class="cross-tag-arrow">&rarr;</span>
                    </a>
                `).join('')}
            </div>
        </div>` : ''}

        <div class="detail-section">
            <a class="jump-full-btn jump-elem-btn" href="index.html?topic=${node.id}">
                &#x1F4D0; 在小学教材图谱中查看完整详情
            </a>
        </div>
    `;
    openPanel();
}

function showPanguDetail(id) {
    const node = pNodeMap[id];
    if (!node) return;
    const linkedElems = (node.linkedElementary || []).map(eid => elemNodeMap[eid]).filter(Boolean);
    const linkedGerm  = (node.linkedGerman || []).map(gid => gNodeMap[gid]).filter(Boolean);
    const problemCount = (typeof panguProblems !== 'undefined')
        ? panguProblems.filter(p => (p.topics || []).includes(id)).length : 0;
    const gc = panguGradeColor(node.grade || 4);

    const content = document.getElementById('detail-content');
    content.innerHTML = `
        <h2>${node.name}</h2>
        <span class="detail-grade-badge" style="background:${gc}">AK${node.grade || 4} · Pangea</span>
        <span class="topic-category cat-bg-${node.category}" style="margin-left:8px;padding:4px 12px;border-radius:14px;font-size:12px;color:white">${panguCategoryNames[node.category]}</span>

        <div class="detail-section" style="margin-top:20px">
            <h3>&#x1F4CB; 主题概述</h3>
            <p>${node.description}</p>
        </div>

        <div class="detail-section">
            <h3>&#x1F3AF; 核心考点</h3>
            <ul>${(node.keyPoints || []).map(p => `<li>${p}</li>`).join('')}</ul>
        </div>

        ${linkedElems.length ? `
        <div class="detail-section cross-map-section">
            <h3>&#x1F4D0; 关联小学教材（${linkedElems.length} 个知识点）</h3>
            <div class="cross-tags">
                ${linkedElems.map(t => `
                    <a class="cross-tag" href="index.html?topic=${t.id}">
                        <span class="cross-tag-grade grade-${t.grade}">${t.grade}年级</span>
                        ${t.name}
                        <span class="cross-tag-arrow">&rarr;</span>
                    </a>
                `).join('')}
            </div>
        </div>` : ''}

        ${linkedGerm.length ? `
        <div class="detail-section cross-map-section">
            <h3>&#x1F3C6; 关联德国竞赛（${linkedGerm.length} 个主题）</h3>
            <div class="cross-tags">
                ${linkedGerm.map(gn => `
                    <a class="cross-tag cross-tag-german" href="german.html?topic=${gn.id}">
                        <span class="cross-tag-grade grade-${gn.grade}">K${gn.grade}</span>
                        ${gn.name.replace(/^K[34]\s*·\s*/, '')}
                        <span class="cross-tag-arrow">&rarr;</span>
                    </a>
                `).join('')}
            </div>
        </div>` : ''}

        <div class="detail-section">
            <a class="jump-full-btn" href="pangu.html?topic=${node.id}">
                &#x1F3A8; 在盘古竞赛图谱中查看完整详情（含 ${problemCount} 道题）
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

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDetail(); });
