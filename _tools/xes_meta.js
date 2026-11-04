// 学而思秘籍 (12 级 / 238 讲) 的人工整理元数据
// 供 build_xes_data.js 合并目录扫描结果后生成 xes-data.js
//
// lectureMeta 格式:  '级-讲': '类别|方法码(逗号分隔)|盘古主题(省略 pangu_ 前缀)|小学教材节点'
//   类别沿用项目已有的 8 类: calc number geometry app count fraction travel other
//   方法码见 methods 表
//
// 注意: 这里的分类是依据讲名与教学内容做的归纳(并抽样阅读了 4 级第 6 讲的扫描页验证讲义结构),
//       个别讲次的类别/关联可以按需微调, 改完重跑 `node _tools/build_xes_data.js` 即可。

const levelInfo = {
    1:  { grade: '约一年级上', stage: '启蒙' },
    2:  { grade: '约一年级下', stage: '启蒙' },
    3:  { grade: '约二年级上', stage: '基础' },
    4:  { grade: '约二年级下', stage: '基础' },
    5:  { grade: '约三年级上', stage: '基础' },
    6:  { grade: '约三年级下', stage: '基础' },
    7:  { grade: '约四年级上', stage: '提高' },
    8:  { grade: '约四年级下', stage: '提高' },
    9:  { grade: '约五年级上', stage: '提高' },
    10: { grade: '约五年级下', stage: '提高' },
    11: { grade: '约六年级上', stage: '拓展' },
    12: { grade: '约六年级下', stage: '拓展' }
};

const methods = [
    { id: 'draw',      name: '画图法',       icon: '✏️', desc: '把文字变成线段图、示意图、表格,让数量关系看得见。' },
    { id: 'enum',      name: '枚举与列表',   icon: '📋', desc: '有序地一个不漏地列出所有情况,再筛选。' },
    { id: 'assume',    name: '假设法',       icon: '🎭', desc: '先假设成一种情形,再用"差"去修正。' },
    { id: 'reverse',   name: '逆向思考',     icon: '⏪', desc: '从结果倒着推回起点,或从终局倒推必胜点。' },
    { id: 'subst',     name: '代换',         icon: '🔁', desc: '用一样东西等价地替换另一样,把复杂关系化简。' },
    { id: 'whole',     name: '整体思想',     icon: '🧩', desc: '不拆开算,把一组量当作一个整体来处理。' },
    { id: 'extreme',   name: '极端与最值',   icon: '📏', desc: '考虑最大、最小、最不利的情形,逼出结论。' },
    { id: 'pattern',   name: '归纳找规律',   icon: '🔎', desc: '从小情形出发归纳通项,再推广到大情形。' },
    { id: 'ratio',     name: '份数与比例',   icon: '⚖️', desc: '把数量化成份数或比,用"一份"做桥梁。' },
    { id: 'classify',  name: '分类与配对',   icon: '🗂️', desc: '按奇偶、余数、颜色等分类,或把对象两两配对。' },
    { id: 'equation',  name: '方程思想',     icon: '🟰', desc: '设未知数,把等量关系写成式子再求解。' },
    { id: 'transform', name: '割补与变换',   icon: '✂️', desc: '分割、拼补、平移、旋转,让图形变得好算。' },
    { id: 'twice',     name: '算两次',       icon: '2️⃣', desc: '用两种方法计算同一个量,得到等式。' }
];

const lectureMeta = {
    // ===== 1 级 =====
    '1-1':  'other|enum,classify|logic|',
    '1-2':  'geometry|draw|geom|g4_02',
    '1-3':  'app|draw|app|',
    '1-4':  'geometry|transform|geom|g4_04',
    '1-5':  'other||time|g3_03',
    '1-6':  'app|draw|app,logic|',
    '1-7':  'other|enum|puzzle|',
    '1-8':  'number||number|g4_01',
    '1-9':  'calc||calc|g3_02',
    '1-10': 'other|enum|puzzle|',
    '1-11': 'count|enum|count|g3_17',
    '1-12': 'geometry||solid|g4_17',
    '1-13': 'other|pattern|pattern|g3_01',
    '1-14': 'other|pattern|pattern|g3_01',
    '1-15': 'geometry|transform|geom|',
    '1-16': 'app|subst|app,algebra|',
    '1-17': 'app|draw|logic,count|',
    '1-18': 'other|enum|puzzle|',
    '1-19': 'app|draw|app|',
    '1-20': 'other|enum|logic,puzzle|',

    // ===== 2 级 (文件夹内缺第 20 讲) =====
    '2-1':  'calc|enum|calc|g3_02',
    '2-2':  'calc|enum|puzzle,calc|',
    '2-3':  'geometry|transform|geom|',
    '2-4':  'app|subst|algebra,puzzle|',
    '2-5':  'other|enum|puzzle|',
    '2-6':  'other|enum|puzzle|',
    '2-7':  'calc||calc|g3_02',
    '2-8':  'count|enum|solid,count|g3_17',
    '2-9':  'count|enum|count|g3_15',
    '2-10': 'number|classify|number|',
    '2-11': 'other|enum|logic|',
    '2-12': 'app|draw|app|',
    '2-13': 'count|enum|count,app|g3_15',
    '2-14': 'number|enum|puzzle|g4_08',
    '2-15': 'number|enum|puzzle|',
    '2-16': 'count|enum|probability,logic|',
    '2-17': 'other||time|g3_03',
    '2-18': 'app|draw|count|g3_08',
    '2-19': 'count|enum|count|g3_15',

    // ===== 3 级 =====
    '3-1':  'count|enum|count|g3_15',
    '3-2':  'calc||calc|g3_04',
    '3-3':  'calc||calc|g3_05',
    '3-4':  'count|enum|count|g3_16',
    '3-5':  'geometry|transform|geom|',
    '3-6':  'app|subst|algebra,app|g3_07',
    '3-7':  'count|enum|count|g3_15',
    '3-8':  'app|draw|app|g3_06',
    '3-9':  'count|enum|count,geom|g3_17',
    '3-10': 'other|classify|logic,count|',
    '3-11': 'calc||calc|g3_02',
    '3-12': 'other|pattern|pattern|g3_01',
    '3-13': 'other|pattern|pattern|g3_01',
    '3-14': 'app|draw|count,app|g3_08',
    '3-15': 'other|enum|logic,app|',
    '3-16': 'calc|enum|puzzle,calc|',
    '3-17': 'geometry|enum|geom,count|',
    '3-18': 'app|reverse|calc,app|g3_12',
    '3-19': 'app|draw|logic,count|',
    '3-20': 'app|draw|app|g3_07',

    // ===== 4 级 =====
    '4-1':  'app|draw,ratio|app|g3_06',
    '4-2':  'number|classify|number|g3_05',
    '4-3':  'number|pattern|count,number|g4_06',
    '4-4':  'geometry|transform|geom,count|',
    '4-5':  'count|enum|count|g3_15',
    '4-6':  'app|assume,draw,enum|app|g4_14',
    '4-7':  'geometry|transform|geom|g3_09',
    '4-8':  'calc||calc|g3_02',
    '4-9':  'count|classify|count,geom|g6_02',
    '4-10': 'other|pattern|pattern,time|g3_10',
    '4-11': 'app|draw,ratio|app|g3_06',
    '4-12': 'app|draw|app|g3_06',
    '4-13': 'other|enum|logic|',
    '4-14': 'app|draw,classify|logic,app|',
    '4-15': 'number|enum|puzzle|',
    '4-16': 'app|draw|app,algebra|',
    '4-17': 'app|draw|app|',
    '4-18': 'app|subst|algebra|g4_14',
    '4-19': 'other|enum|puzzle,logic|',
    '4-20': 'other|reverse|logic|',

    // ===== 5 级 =====
    '5-1':  'other|pattern|pattern|g3_01',
    '5-2':  'calc||calc|g3_02',
    '5-3':  'number|enum|puzzle|g4_08',
    '5-4':  'number|enum|puzzle,number|g4_08',
    '5-5':  'number|enum|puzzle|g4_08',
    '5-6':  'geometry|transform|geom|g3_09',
    '5-7':  'app|draw|app|',
    '5-8':  'app|ratio|app|g3_05',
    '5-9':  'geometry|transform|geom|g3_18',
    '5-10': 'fraction|draw|fraction|g3_13',
    '5-11': 'app|draw,ratio|app|g3_06',
    '5-12': 'app|draw,ratio|app|g3_07',
    '5-13': 'calc||calc|g3_11',
    '5-14': 'calc||calc|g3_11',
    '5-15': 'app|assume,equation|app,algebra|',
    '5-16': 'other|pattern|pattern,time|g3_10',
    '5-17': 'app|draw,assume|app,algebra|',
    '5-18': 'number|classify|number|',
    '5-19': 'count|enum|count|g3_15',
    '5-20': 'app|subst|algebra|g4_14',

    // ===== 6 级 =====
    '6-1':  'geometry||angle|g4_02',
    '6-2':  'calc||calc|g4_12',
    '6-3':  'app|equation|algebra|g4_14',
    '6-4':  'app|draw,ratio|app|g3_07',
    '6-5':  'app|reverse|calc,app|g3_12',
    '6-6':  'other|enum|logic|',
    '6-7':  'count|draw|count,pattern|',
    '6-8':  'calc|enum|puzzle,calc|',
    '6-9':  'fraction||fraction|g3_14,g4_15',
    '6-10': 'geometry|transform|geom|g4_04,g4_05',
    '6-11': 'app|draw,equation|app,algebra|',
    '6-12': 'number|classify|number|',
    '6-13': 'other|pattern|pattern,algebra|',
    '6-14': 'other||app|',
    '6-15': 'count|enum|count,geom|g3_17',
    '6-16': 'count|pattern|count,pattern|',
    '6-17': 'number|enum|count,number|g4_06',
    '6-18': 'app|equation|algebra|g4_14',
    '6-19': 'app|equation|algebra,app|g4_14',
    '6-20': 'travel|draw|app|g4_10',

    // ===== 7 级 =====
    '7-1':  'count|enum|count|g3_16',
    '7-2':  'geometry||geom,angle|g4_09',
    '7-3':  'geometry||geom,angle|g4_09',
    '7-4':  'fraction||fraction|g5_01',
    '7-5':  'other|pattern|pattern,algebra|',
    '7-6':  'travel|draw|app|g4_10',
    '7-7':  'travel|draw|app|g4_10',
    '7-8':  'number|classify|number|g5_05',
    '7-9':  'other|enum|logic|',
    '7-10': 'calc||algebra,calc|',
    '7-11': 'count|enum|count,logic|',
    '7-12': 'count|enum|count,geom|g3_17',
    '7-13': 'calc||calc|g5_01',
    '7-14': 'geometry|transform|geom|g4_05',
    '7-15': 'geometry|transform,ratio|geom|g4_05',
    '7-16': 'other|extreme|algebra,logic|',
    '7-17': 'number|enum|puzzle|',
    '7-18': 'app|draw|app,algebra|',
    '7-19': 'number|enum|puzzle|g4_08',
    '7-20': 'travel|draw|app|',

    // ===== 8 级 (文件夹内缺第 20 讲) =====
    '8-1':  'calc||calc,fraction|g5_01',
    '8-2':  'geometry|transform|geom|',
    '8-3':  'other|pattern|pattern,time|',
    '8-4':  'calc||algebra,calc|',
    '8-5':  'number|classify|number|g5_06,g5_07',
    '8-6':  'travel|draw|app|g4_10',
    '8-7':  'count|draw,classify|count,logic|',
    '8-8':  'other|pattern|pattern,number|',
    '8-9':  'other|extreme|logic,app|',
    '8-10': 'number|classify|number|g5_05',
    '8-11': 'count|enum|count|g3_16,g5_13',
    '8-12': 'travel|draw|app|',
    '8-13': 'other|classify,extreme|logic|',
    '8-14': 'other|extreme|algebra,logic|',
    '8-15': 'other|reverse|logic,puzzle|',
    '8-16': 'number||number|',
    '8-17': 'travel|draw|app|',
    '8-18': 'app|equation|algebra|',
    '8-19': 'app|equation|algebra,app|',

    // ===== 9 级 =====
    '9-1':  'fraction|draw|fraction|g5_09',
    '9-2':  'fraction|draw|fraction|g5_08',
    '9-3':  'count|classify|count,logic|g6_02',
    '9-4':  'count|enum|count|g3_15',
    '9-5':  'count|enum|count|g5_13',
    '9-6':  'number|classify|number|g5_06,g5_07',
    '9-7':  'app|draw|app,algebra|g5_03',
    '9-8':  'app|draw|app,count|g5_02',
    '9-9':  'fraction|ratio|fraction|g5_12',
    '9-10': 'geometry|ratio|geom,fraction|g5_12',
    '9-11': 'count|draw,classify|count,logic|',
    '9-12': 'other|reverse|logic|',
    '9-13': 'number|classify|number|g5_04',
    '9-14': 'fraction||fraction|g5_10',
    '9-15': 'geometry|ratio|geom|',
    '9-16': 'app|draw|fraction,app|g6_03',
    '9-17': 'travel|draw|app,time|',
    '9-18': 'number|classify|number|',
    '9-19': 'geometry|ratio|geom|',
    '9-20': 'app|ratio|app,fraction|',

    // ===== 10 级 =====
    '10-1':  'number|extreme,enum|puzzle,number|',
    '10-2':  'geometry|ratio|geom|',
    '10-3':  'calc||algebra,calc|',
    '10-4':  'travel|equation|app,algebra|',
    '10-5':  'geometry||solid|',
    '10-6':  'count|pattern|count,pattern|',
    '10-7':  'fraction|ratio|fraction,app|g5_12,g6_12',
    '10-8':  'travel|draw|time,angle|g6_04',
    '10-9':  'geometry|transform|geom|g5_11',
    '10-10': 'count|enum|count,geom|',
    '10-11': 'number|classify|number|g5_04,g5_07',
    '10-12': 'geometry||geom|',
    '10-13': 'fraction||fraction|g6_01',
    '10-14': 'number|classify|number|',
    '10-15': 'number|classify|number|',
    '10-16': 'number|enum,equation|algebra,number|',
    '10-17': 'geometry|transform|geom|g5_11',
    '10-18': 'number|classify|number|',
    '10-19': 'number|equation|number,puzzle|',
    '10-20': 'geometry||solid|g6_06',

    // ===== 11 级 =====
    '11-1':  'calc|pattern|fraction,calc|g6_01',
    '11-2':  'other|pattern|pattern,count|g6_16',
    '11-3':  'geometry|classify|solid,count|',
    '11-4':  'number|classify|number|',
    '11-5':  'app|draw,equation|app|',
    '11-6':  'calc|pattern|pattern,calc|',
    '11-7':  'geometry|transform|geom|',
    '11-8':  'other|enum|logic|',
    '11-9':  'count|classify|number,count|',
    '11-10': 'geometry|transform|geom|',
    '11-11': 'other|whole|algebra,logic|',
    '11-12': 'travel|draw|app|',
    '11-13': 'app|draw,equation|app|',
    '11-14': 'other|extreme|algebra,logic|',
    '11-15': 'app|equation|algebra,app|',
    '11-16': 'count|enum|count|g5_13',
    '11-17': 'fraction||fraction,calc|g6_08',
    '11-18': 'app|ratio|app,percent|g6_10',
    '11-19': 'travel|ratio|app|g6_14',
    '11-20': 'count|enum|probability,count|',

    // ===== 12 级 =====
    '12-1':  'other|draw,pattern|pattern,algebra|',
    '12-2':  'geometry||solid,geom|g6_05',
    '12-3':  'geometry|transform|geom|g6_06',
    '12-4':  'app|equation|app,percent|g6_11',
    '12-5':  'number|pattern|number,pattern|',
    '12-6':  'geometry|transform|geom|g6_07',
    '12-7':  'other|twice|algebra,count|',
    '12-8':  'other|extreme|logic|',
    '12-9':  'count|enum|puzzle,count|',
    '12-10': 'app|ratio|app|',
    '12-11': 'travel|ratio|app|',
    '12-12': 'number||number|',
    '12-13': 'app|draw,equation|app|',
    '12-14': 'other|classify,extreme|logic|',
    '12-15': 'calc||calc,fraction|',
    '12-16': 'geometry||geom|',
    '12-17': 'number||number|',
    '12-18': 'other||logic|',
    '12-19': 'app||app|',
    '12-20': 'travel||app|'
};

// ---------------------------------------------------------------
// 知识链: 每条链由若干"轨道"(线性学习序列)组成; 轨道内相邻两讲生成一条前置边
// ---------------------------------------------------------------
const chains = [
    {
        id: 'subst_eq', name: '从会换到会设', icon: '🔁', color: '#E91E63',
        tracks: [
            { name: '代换主线', lectures: ['1-16', '2-4', '3-6', '4-18', '5-20', '6-3', '6-18', '6-19', '8-18', '8-19', '11-15'] },
            { name: '假设法支线', lectures: ['4-6', '5-15', '5-17', '8-18'] },
            { name: '行程方程支线', lectures: ['6-19', '10-4'] }
        ]
    },
    {
        id: 'ratio', name: '和差倍到比例', icon: '⚖️', color: '#FF5722',
        tracks: [
            { name: '和差倍主线', lectures: ['4-1', '4-11', '4-12', '5-11', '5-12', '6-4'] },
            { name: '比例主线', lectures: ['6-4', '9-9', '10-7', '11-18', '11-19'] },
            { name: '归一与平均', lectures: ['5-7', '5-8', '7-18'] }
        ]
    },
    {
        id: 'count', name: '计数到概率', icon: '🎯', color: '#795548',
        tracks: [
            { name: '枚举与乘法原理', lectures: ['1-11', '2-9', '2-19', '2-13', '3-1', '3-4', '3-7', '4-5', '5-19', '7-1', '8-11', '9-4', '9-5', '11-16', '11-20'] },
            { name: '排队与排列', lectures: ['1-17', '2-9', '3-19', '5-19', '9-5'] },
            { name: '图形计数', lectures: ['1-11', '3-9', '6-15', '7-12', '10-10'] },
            { name: '容斥与对应', lectures: ['4-14', '7-11', '8-7', '9-11'] },
            { name: '方阵标数与杨辉三角', lectures: ['6-7', '6-16', '9-3', '10-6'] },
            { name: '染色与棋盘', lectures: ['4-9', '9-3'] },
            { name: '概率启蒙', lectures: ['2-16', '11-20'] }
        ]
    },
    {
        id: 'travel', name: '行程', icon: '🚆', color: '#8BC34A',
        tracks: [
            { name: '行程主线', lectures: ['6-20', '7-6', '7-7', '7-20', '8-6', '8-12', '8-17', '9-17', '10-4', '10-8', '11-12', '11-19', '12-11', '12-20'] }
        ]
    },
    {
        id: 'numtheory', name: '数论', icon: '🔢', color: '#3F51B5',
        tracks: [
            { name: '奇偶与余数', lectures: ['2-10', '4-2', '5-18', '6-12', '10-14', '10-15', '11-4'] },
            { name: '整除与质数', lectures: ['7-8', '8-5', '8-10', '9-6', '9-13', '10-11', '10-16', '10-18', '11-9', '12-5', '12-17'] },
            { name: '位值与进位制', lectures: ['1-8', '8-16', '9-18', '10-19', '12-12'] }
        ]
    },
    {
        id: 'area', name: '面积与几何模型', icon: '📐', color: '#009688',
        tracks: [
            { name: '周长面积基础', lectures: ['1-2', '1-4', '4-7', '5-6', '5-9', '6-1', '6-10', '7-2', '7-3'] },
            { name: '割补与变换', lectures: ['1-15', '2-3', '3-5', '4-4', '7-14', '7-15', '8-2', '12-3', '12-6', '12-16'] },
            { name: '比例模型', lectures: ['7-15', '9-10', '9-15', '9-19', '10-2'] },
            { name: '圆与勾股', lectures: ['10-9', '10-12', '10-17', '11-7', '11-10'] }
        ]
    },
    {
        id: 'solid', name: '空间想象', icon: '🧊', color: '#00ACC1',
        tracks: [
            { name: '立体主线', lectures: ['1-12', '2-8', '10-5', '10-20', '11-3', '12-2'] }
        ]
    },
    {
        id: 'seq', name: '规律与数列', icon: '🌀', color: '#5C6BC0',
        tracks: [
            { name: '规律主线', lectures: ['1-13', '1-14', '3-12', '3-13', '5-1', '6-13', '7-5', '8-8', '11-2', '11-6', '12-1'] },
            { name: '周期与数表', lectures: ['4-10', '5-16', '8-3', '10-6'] }
        ]
    },
    {
        id: 'calc', name: '巧算与新运算', icon: '🧮', color: '#EC407A',
        tracks: [
            { name: '加减巧算', lectures: ['1-9', '2-1', '2-7', '3-11', '4-8', '5-2', '6-2'] },
            { name: '乘除与小数巧算', lectures: ['3-2', '3-3', '5-13', '5-14', '7-13', '8-1'] },
            { name: '定义新运算', lectures: ['7-10', '8-4', '10-3'] },
            { name: '裂项', lectures: ['11-6', '11-1', '12-15'] }
        ]
    },
    {
        id: 'fraction', name: '分数与小数', icon: '🥧', color: '#FF9800',
        tracks: [
            { name: '分数', lectures: ['5-10', '9-1', '9-2', '9-16', '10-13', '11-17'] },
            { name: '小数', lectures: ['6-9', '7-4', '8-1', '9-14'] }
        ]
    },
    {
        id: 'puzzle', name: '数字谜与游戏', icon: '🧩', color: '#7E57C2',
        tracks: [
            { name: '填算符', lectures: ['2-2', '3-16', '6-8'] },
            { name: '竖式数字谜', lectures: ['2-14', '5-3', '5-4', '5-5', '7-19', '10-1', '12-9'] },
            { name: '数阵图', lectures: ['2-15', '4-15', '7-17'] },
            { name: '启蒙游戏', lectures: ['1-7', '1-10', '1-18', '1-20', '2-5', '2-6', '3-17'] }
        ]
    },
    {
        id: 'logic', name: '逻辑策略与最值', icon: '🧠', color: '#9E9E9E',
        tracks: [
            { name: '逻辑推理', lectures: ['1-1', '2-11', '4-13', '6-6', '7-9', '11-8', '12-18'] },
            { name: '策略与操作', lectures: ['3-15', '4-19', '4-20', '8-15', '9-12'] },
            { name: '最值与极端', lectures: ['7-16', '8-9', '8-14', '11-14', '12-8'] },
            { name: '抽屉原理', lectures: ['8-13', '12-14'] },
            { name: '整体与对应', lectures: ['3-10', '11-11', '12-7'] }
        ]
    },
    {
        id: 'applied', name: '应用题模型', icon: '📝', color: '#FF7043',
        tracks: [
            { name: '应用题综合', lectures: ['1-3', '1-19', '2-12', '3-8', '3-20', '11-5', '11-13', '12-13', '12-19'] },
            { name: '间隔与植树', lectures: ['2-18', '3-14', '6-7', '9-8'] },
            { name: '年龄问题', lectures: ['4-16', '6-11'] },
            { name: '页码与数字串', lectures: ['4-3', '6-17'] },
            { name: '工程与牛吃草', lectures: ['9-20', '9-7', '12-10'] },
            { name: '还原与逆向', lectures: ['3-18', '6-5'] },
            { name: '浓度与经济', lectures: ['11-18', '12-4'] },
            { name: '叠加与重叠', lectures: ['1-6', '4-14', '9-11'] },
            { name: '画图法与统计', lectures: ['4-17', '5-7', '6-14'] },
            { name: '时间', lectures: ['1-5', '2-17'] }
        ]
    }
];

// 跨轨道/跨链的补充连线: [源, 目标, 类型, 说明]
const extraLinks = [
    ['5-10', '6-9', 'related', '分数与小数是同一个量的两种写法'],
    ['7-3', '7-14', 'prerequisite', '三角形面积是等积变形的基础'],
    ['1-8', '10-19', 'related', '位值原理是"数位"概念的升级'],
    ['5-8', '9-9', 'related', '归一的"单位量"思想是比例的前身'],
    ['4-12', '5-15', 'related', '和差问题的线段图可以直接迁移到鸡兔同笼'],
    ['9-16', '11-19', 'related', '分数应用题与比例法解行程共用"单位1"思想'],
    ['6-20', '10-8', 'related', '时钟问题本质是追及问题']
];

module.exports = { levelInfo, methods, lectureMeta, chains, extraLinks };
