// ============= 德国数学竞赛（K3 / K4）知识图谱数据 =============
// 数据来源：德国数学奥林匹克 (Mathematik-Olympiade) 第50-65届 3-4年级试题
// 目录结构：
//   德国竞赛题/K3_1_Chinese/   - 3年级第一轮（第59-65届，21份）
//   德国竞赛题/K3_2_Chinese/   - 3年级第二轮（第51-58届，24份）
//   德国竞赛题/K4_Chinese/     - 4年级全部（第50-65届，47份）
//
// 命名规律：
//   A{届次}{年级}{题号}_Chinese.pdf  （早期）
//   K{年级}-{届次}-{题号}_Chinese.pdf （近几届 63,64,65）

// ---------- 全部题目清单（自动生成） ----------
function buildGermanProblems() {
    const items = [];

    // K3_1 第一轮：第59-65届（每届3题）
    // 59-62 用 A 前缀，63-65 用 K3 前缀
    for (const y of [59, 60, 61, 62]) {
        for (const p of [1, 2, 3]) {
            items.push({
                id: `K3_1_${y}_${p}`,
                grade: 3, round: 1, year: y, problem: p,
                title: `第${y}届 K3 第一轮 · 第${p}题`,
                file: `德国竞赛题/K3_1_Chinese/A${y}03${p}_Chinese.pdf`
            });
        }
    }
    for (const y of [63, 64, 65]) {
        for (const p of [1, 2, 3]) {
            items.push({
                id: `K3_1_${y}_${p}`,
                grade: 3, round: 1, year: y, problem: p,
                title: `第${y}届 K3 第一轮 · 第${p}题`,
                file: `德国竞赛题/K3_1_Chinese/K3-${y}-${p}_Chinese.pdf`
            });
        }
    }

    // K3_2 第二轮：第51-58届（每届3题）
    for (const y of [51, 52, 53, 54, 55, 56, 57, 58]) {
        for (const p of [1, 2, 3]) {
            items.push({
                id: `K3_2_${y}_${p}`,
                grade: 3, round: 2, year: y, problem: p,
                title: `第${y}届 K3 第二轮 · 第${p}题`,
                file: `德国竞赛题/K3_2_Chinese/A${y}03${p}_Chinese.pdf`
            });
        }
    }

    // K4：第50-65届
    for (let y = 50; y <= 63; y++) {
        for (const p of [1, 2, 3]) {
            items.push({
                id: `K4_${y}_${p}`,
                grade: 4, round: null, year: y, problem: p,
                title: `第${y}届 K4 · 第${p}题`,
                file: `德国竞赛题/K4_Chinese/A${y}04${p}_Chinese.pdf`
            });
        }
    }
    for (const p of [1, 2, 3]) {
        items.push({
            id: `K4_64_${p}`,
            grade: 4, round: null, year: 64, problem: p,
            title: `第64届 K4 · 第${p}题`,
            file: `德国竞赛题/K4_Chinese/K4-64-${p}_Chinese.pdf`
        });
    }
    // K4-65 仅公开 2 题
    for (const p of [1, 2]) {
        items.push({
            id: `K4_65_${p}`,
            grade: 4, round: null, year: 65, problem: p,
            title: `第65届 K4 · 第${p}题`,
            file: `德国竞赛题/K4_Chinese/K4-65-${p}_Chinese.pdf`
        });
    }

    return items;
}

const germanProblems = buildGermanProblems();
const germanProblemMap = Object.fromEntries(germanProblems.map(p => [p.id, p]));

// ---------- 辅助函数：按 (grade, round, yearList, problemList) 挑题 ----------
function pick(grade, round, years, problems) {
    const out = [];
    const prefix = grade === 3 ? `K3_${round}` : `K4`;
    for (const y of years) {
        for (const p of problems) {
            const id = `${prefix}_${y}_${p}`;
            if (germanProblemMap[id]) out.push(id);
        }
    }
    return out;
}

// ============= 德国竞赛知识节点 =============
// id 前缀 gc_ = German Competition
// grade: 3 或 4（对应 K3/K4）
// linkedElementary: 关联到小学教材知识图谱中的节点 id（跨图连接）
// problems: 例题 PDF 的 id 列表

const germanNodes = [
    // ================= K3（3年级） =================
    {
        id: "gc_k3_calc",
        name: "K3 · 计算与巧算",
        grade: 3,
        category: "calc",
        source: "K3-1/K3-2",
        description: "K3 组常见的整数加减乘除、竖式补数与凑整巧算题。侧重口算能力与观察力，常涉及数字排列、竖式空格填数。",
        keyPoints: [
            "加减乘除的巧算与凑整（99/101 型、25×4=100）",
            "多位数竖式填数、缺失数字推理",
            "运算等式重建：给定几个运算结果，反推每一步",
            "利用大小估算缩小候选范围"
        ],
        typicalApproach: [
            "先观察数字关系，找凑整、找规律",
            "从确定的数字位入手推理",
            "验算：把结果代回题目所有条件"
        ],
        linkedElementary: ["g3_02", "g3_04", "g3_11", "g4_03", "g4_12"],
        problems: pick(3, 1, [59, 61, 63, 65], [1]).concat(pick(3, 2, [51, 53, 55, 57], [1]))
    },
    {
        id: "gc_k3_pattern",
        name: "K3 · 找规律与周期",
        grade: 3,
        category: "other",
        source: "K3-1/K3-2",
        description: "观察数列、图形、颜色排列中的规律，利用周期与循环预测第 N 项。是德国 K3 组常见的入门题型。",
        keyPoints: [
            "等差、等比、递推数列规律",
            "图形/颜色循环节的识别",
            "用余数确定第 N 个元素",
            "多层规律（一层规律套另一层）"
        ],
        typicalApproach: [
            "先写出前几项，标编号 1,2,3...",
            "找出循环节长度 T，再用 N mod T 定位",
            "验证规律在所有已知项上都成立"
        ],
        linkedElementary: ["g3_01", "g3_10", "g6_16"],
        problems: pick(3, 1, [60, 62, 64], [1]).concat(pick(3, 2, [52, 54, 56, 58], [1]))
    },
    {
        id: "gc_k3_logic",
        name: "K3 · 逻辑推理",
        grade: 3,
        category: "other",
        source: "K3-1/K3-2",
        description: "德国竞赛的一大特色题型：真假话、排序、位置推理。K3 层通常人物较少，靠列表格法或反证法即可。",
        keyPoints: [
            "真假话问题（谁说真话）",
            "排位/座位问题（谁坐哪里）",
            "属性对应（谁养什么宠物、谁穿什么颜色）",
            "利用\"每种可能只能出现一次\"的抽屉思想"
        ],
        typicalApproach: [
            "列表格：行是人，列是属性，逐条排除",
            "假设法：先假设某人说真话，看是否自洽",
            "由确定信息出发扩展"
        ],
        linkedElementary: ["g3_15", "g3_16"],
        problems: pick(3, 1, [59, 60, 61, 62, 63, 64, 65], [2]).slice(0, 5)
            .concat(pick(3, 2, [51, 53, 55], [2]))
    },
    {
        id: "gc_k3_geom",
        name: "K3 · 图形与几何",
        grade: 3,
        category: "geometry",
        source: "K3-1/K3-2",
        description: "K3 组的几何题以图形观察、图形拼接、图形分割和简单周长/面积为主，几乎不涉及公式，重在直觉与观察。",
        keyPoints: [
            "长方形/正方形周长与网格面积",
            "图形拼接（用几块拼成给定形状）",
            "图形分割（把一个图形切成若干等价块）",
            "对称与图形变换"
        ],
        typicalApproach: [
            "用格子纸/方格数",
            "剪拼实验：手动尝试摆放",
            "对称轴、旋转不变量分析"
        ],
        linkedElementary: ["g3_09", "g3_18", "g4_04"],
        problems: pick(3, 1, [60, 62, 64], [2]).concat(pick(3, 2, [52, 54, 56, 57, 58], [2]))
    },
    {
        id: "gc_k3_count",
        name: "K3 · 图形与组合计数",
        grade: 3,
        category: "count",
        source: "K3-1/K3-2",
        description: "数图形（线段、三角形、正方形）、有序枚举、简单加乘原理。是训练系统枚举能力的经典题型。",
        keyPoints: [
            "数线段、数三角形、数长方形",
            "有序枚举：按大小、位置分类",
            "加法原理（分类）与乘法原理（分步）",
            "带条件的搭配问题"
        ],
        typicalApproach: [
            "分类：按大小或按位置分类计数",
            "先枚举再总结公式",
            "画树形图辅助"
        ],
        linkedElementary: ["g3_15", "g3_16", "g3_17"],
        problems: pick(3, 1, [59, 61, 65], [3]).concat(pick(3, 2, [51, 53, 55, 57], [3]))
    },
    {
        id: "gc_k3_app",
        name: "K3 · 简单应用题",
        grade: 3,
        category: "app",
        source: "K3-1/K3-2",
        description: "情境类应用题：分糖果、买东西、年龄比较、和差倍、简单方案设计。翻译成中文后可对照国内三年级应用题。",
        keyPoints: [
            "和差、和倍、差倍问题",
            "简单的价格/购物问题",
            "年龄问题（差不变）",
            "分配方案（尽可能公平）"
        ],
        typicalApproach: [
            "画线段图或列表",
            "设未知数（用小方块代替 x）",
            "反证：如果超过或少了会怎样"
        ],
        linkedElementary: ["g3_06", "g3_07", "g3_12"],
        problems: pick(3, 1, [60, 62, 63, 64], [3]).concat(pick(3, 2, [52, 54, 56, 58], [3]))
    },
    {
        id: "gc_k3_time",
        name: "K3 · 时间/日期问题",
        grade: 3,
        category: "other",
        source: "K3-1/K3-2",
        description: "涉及时刻、时段、日历、周次的问题。德国竞赛中常有\"某年某月某日是星期几\"、\"钟表指针角度\"类题目。",
        keyPoints: [
            "时刻加减（跨小时进位）",
            "日期加减（跨月/闰年）",
            "星期几的推算（用余数）",
            "钟表指针位置初步"
        ],
        typicalApproach: [
            "把日期换算成\"距离某基准日的天数\"",
            "利用 7 天周期求星期",
            "画时间轴"
        ],
        linkedElementary: ["g3_03", "g3_10"],
        problems: pick(3, 1, [59, 63, 65], [2]).concat(pick(3, 2, [52, 54, 58], [2]))
    },
    {
        id: "gc_k3_numpuzzle",
        name: "K3 · 数字谜与逆推",
        grade: 3,
        category: "number",
        source: "K3-1/K3-2",
        description: "填数游戏、幻方、算式复原、从结果倒推。锻炼思维的可逆性和系统枚举能力。",
        keyPoints: [
            "算式谜（□+□=15，每格填不同数）",
            "幻方（每行/列/对角线之和相等）",
            "还原问题（结果 → 起点）",
            "从若干等式反推每个字母代表的数"
        ],
        typicalApproach: [
            "先找\"最受限\"的位置",
            "把范围写清楚，逐格试探",
            "找不变量（例如总和固定）"
        ],
        linkedElementary: ["g3_12", "g4_08", "g4_14"],
        problems: pick(3, 1, [61, 62, 64, 65], [3]).concat(pick(3, 2, [51, 53, 55], [3]))
    },

    // ================= K4（4年级） =================
    {
        id: "gc_k4_calc",
        name: "K4 · 多位数计算与巧算",
        grade: 4,
        category: "calc",
        source: "K4",
        description: "K4 组把 K3 的计算题升级：更大的位数、更多步骤，需要熟练运用运算律和分配律进行简化。",
        keyPoints: [
            "多位数乘除、竖式规律",
            "运算律巧算（分配律、结合律）",
            "四则混合运算的顺序",
            "复杂等式复原（多空格竖式）"
        ],
        typicalApproach: [
            "先化简：合并同类项、提取公因数",
            "利用凑整（99、101、25×4、125×8）",
            "分段计算再汇总"
        ],
        linkedElementary: ["g4_03", "g4_07", "g4_12", "g5_01"],
        problems: pick(4, null, [50, 52, 54, 56, 58, 60, 62, 64], [1])
    },
    {
        id: "gc_k4_number",
        name: "K4 · 数论初步",
        grade: 4,
        category: "number",
        source: "K4",
        description: "K4 组开始出现质数、因数、倍数、整除性质、数位分析等数论问题。是走向奥数思维的分水岭。",
        keyPoints: [
            "整除特征（2、3、5、9、11 等）",
            "因数与倍数",
            "质数与合数的判断",
            "特殊数（回文数、完全平方数、位数字之和）"
        ],
        typicalApproach: [
            "对数进行质因数分解",
            "利用整除特征快速判断",
            "从最小情况出发观察规律"
        ],
        linkedElementary: ["g4_01", "g5_04", "g5_05", "g5_06", "g5_07"],
        problems: pick(4, null, [51, 55, 59, 61, 63, 65], [1])
            .concat(pick(4, null, [50, 54, 58], [3]))
    },
    {
        id: "gc_k4_geom",
        name: "K4 · 几何与面积",
        grade: 4,
        category: "geometry",
        source: "K4",
        description: "长方形/三角形面积、周长、图形分割与拼接；德国竞赛中还常出现网格几何（Gitterpunkte）与组合图形。",
        keyPoints: [
            "长方形/正方形面积与周长的综合",
            "三角形与四边形基本知识",
            "组合图形面积（割补法、平移法）",
            "网格中的图形（数格子/皮克定理直觉版）",
            "对称与旋转"
        ],
        typicalApproach: [
            "标注已知长度，把图形分块",
            "用大图形减小图形",
            "画高、构造辅助线"
        ],
        linkedElementary: ["g3_18", "g4_02", "g4_04", "g4_05", "g4_09", "g5_11"],
        problems: pick(4, null, [50, 52, 54, 56, 58, 60, 62, 64], [2])
    },
    {
        id: "gc_k4_count",
        name: "K4 · 组合计数",
        grade: 4,
        category: "count",
        source: "K4",
        description: "系统枚举、加乘原理、简单排列组合；分类讨论与不重不漏是关键。",
        keyPoints: [
            "有序枚举与树形图",
            "加法原理（分类）与乘法原理（分步）",
            "简单的排列与组合思想",
            "抽屉原理初步"
        ],
        typicalApproach: [
            "先分类，再在每类内部计数",
            "画分支图或列表",
            "用对称性简化"
        ],
        linkedElementary: ["g3_15", "g3_16", "g3_17", "g5_13"],
        problems: pick(4, null, [51, 53, 55, 57, 59, 61, 63, 65], [2])
    },
    {
        id: "gc_k4_app",
        name: "K4 · 应用题综合",
        grade: 4,
        category: "app",
        source: "K4",
        description: "多步骤情境应用题：分配方案、混合搭配、和差倍进阶。往往需要引入未知量或列表推理。",
        keyPoints: [
            "多步和差倍",
            "分配 / 组合方案设计",
            "简单方程思想",
            "最优化问题（最少/最多）"
        ],
        typicalApproach: [
            "画线段图 / 表格厘清关系",
            "设未知量列方程",
            "极值分析：先看极端情况"
        ],
        linkedElementary: ["g3_06", "g3_07", "g3_12", "g4_14", "g6_03"],
        problems: pick(4, null, [50, 52, 54, 56, 58, 60, 62, 64], [3])
    },
    {
        id: "gc_k4_travel",
        name: "K4 · 行程问题",
        grade: 4,
        category: "travel",
        source: "K4",
        description: "路程、速度、时间基本关系，相遇与追及、火车过桥、简单流水行船。",
        keyPoints: [
            "基本公式：路程 = 速度 × 时间",
            "相遇问题：路程和 = 速度和 × 时间",
            "追及问题：路程差 = 速度差 × 时间",
            "利用图示分析多段行程"
        ],
        typicalApproach: [
            "画运动线段图，标出方向和时间点",
            "找不变量（总路程/速度差）",
            "分段计算再合并"
        ],
        linkedElementary: ["g4_10", "g6_04", "g6_14"],
        problems: pick(4, null, [51, 55, 59, 63], [3])
    },
    {
        id: "gc_k4_puzzle",
        name: "K4 · 数字谜与逻辑推理",
        grade: 4,
        category: "other",
        source: "K4",
        description: "算式谜、真假话、多条件推理，K4 层难度显著上升，需要更细致的假设与排除。",
        keyPoints: [
            "字母代数谜（每个字母代表不同数字）",
            "多人真假话问题",
            "由多条件综合推断",
            "反证与假设法"
        ],
        typicalApproach: [
            "列表格系统排除",
            "从最受限的条件切入",
            "假设 → 推理 → 检验是否矛盾"
        ],
        linkedElementary: ["g3_15", "g4_08", "g4_14"],
        problems: pick(4, null, [53, 57, 61, 65], [3])
            .concat(pick(4, null, [51, 53], [1]))
    },
    {
        id: "gc_k4_seq",
        name: "K4 · 数列与递推",
        grade: 4,
        category: "number",
        source: "K4",
        description: "找数列规律、简单递推、图形数列（如三角数、方数），是数感训练的进阶题型。",
        keyPoints: [
            "等差、等比、二级差数列",
            "斐波那契型递推",
            "图形数（三角数、方数）",
            "由几项归纳通项"
        ],
        typicalApproach: [
            "写出前 5-6 项",
            "算相邻差、比、和",
            "猜测公式后用后一项验证"
        ],
        linkedElementary: ["g3_01", "g3_10", "g6_16"],
        problems: pick(4, null, [53, 57], [1])
            .concat(pick(4, null, [50, 52, 54, 56, 60], [2]).slice(0, 3))
    }
];

// ============= 德国竞赛节点之间的关系 =============
const germanLinks = [
    // K3 内部关系
    { source: "gc_k3_calc", target: "gc_k3_numpuzzle", type: "prerequisite", label: "计算 → 数字谜" },
    { source: "gc_k3_pattern", target: "gc_k3_count", type: "related", label: "找规律 ↔ 计数" },
    { source: "gc_k3_logic", target: "gc_k3_numpuzzle", type: "related", label: "逻辑 ↔ 数字谜" },
    { source: "gc_k3_geom", target: "gc_k3_count", type: "prerequisite", label: "图形 → 图形计数" },
    { source: "gc_k3_app", target: "gc_k3_numpuzzle", type: "related", label: "应用题 ↔ 逆推" },
    { source: "gc_k3_time", target: "gc_k3_pattern", type: "related", label: "时间 ↔ 周期" },

    // K4 内部关系
    { source: "gc_k4_calc", target: "gc_k4_number", type: "prerequisite", label: "计算 → 数论" },
    { source: "gc_k4_calc", target: "gc_k4_puzzle", type: "prerequisite", label: "计算 → 数字谜" },
    { source: "gc_k4_geom", target: "gc_k4_count", type: "related", label: "几何 ↔ 计数" },
    { source: "gc_k4_number", target: "gc_k4_seq", type: "prerequisite", label: "数论 → 数列" },
    { source: "gc_k4_count", target: "gc_k4_seq", type: "related", label: "计数 ↔ 数列" },
    { source: "gc_k4_app", target: "gc_k4_travel", type: "prerequisite", label: "应用题 → 行程" },
    { source: "gc_k4_app", target: "gc_k4_puzzle", type: "related", label: "应用题 ↔ 推理" },

    // K3 → K4 递进
    { source: "gc_k3_calc", target: "gc_k4_calc", type: "prerequisite", label: "K3 计算 → K4 计算" },
    { source: "gc_k3_pattern", target: "gc_k4_seq", type: "prerequisite", label: "K3 规律 → K4 数列" },
    { source: "gc_k3_logic", target: "gc_k4_puzzle", type: "prerequisite", label: "K3 逻辑 → K4 推理" },
    { source: "gc_k3_geom", target: "gc_k4_geom", type: "prerequisite", label: "K3 图形 → K4 几何" },
    { source: "gc_k3_count", target: "gc_k4_count", type: "prerequisite", label: "K3 计数 → K4 组合" },
    { source: "gc_k3_app", target: "gc_k4_app", type: "prerequisite", label: "K3 应用 → K4 应用" },
    { source: "gc_k3_numpuzzle", target: "gc_k4_puzzle", type: "prerequisite", label: "K3 数字谜 → K4 数字谜" },
    { source: "gc_k3_time", target: "gc_k4_app", type: "related", label: "K3 时间 ↔ K4 应用" },
    { source: "gc_k3_numpuzzle", target: "gc_k4_number", type: "related", label: "数字谜 ↔ 数论" }
];

// ============= 学习路径 =============
const germanPaths = [
    {
        id: "calc",
        name: "计算与巧算线",
        icon: "&#x1F4CA;",
        description: "从 K3 基本计算到 K4 多位数巧算与数论",
        nodes: ["gc_k3_calc", "gc_k3_numpuzzle", "gc_k4_calc", "gc_k4_number"]
    },
    {
        id: "geometry",
        name: "图形与几何线",
        icon: "&#x1F4D0;",
        description: "从 K3 图形观察到 K4 面积与组合几何",
        nodes: ["gc_k3_geom", "gc_k3_count", "gc_k4_geom", "gc_k4_count"]
    },
    {
        id: "logic",
        name: "逻辑推理线",
        icon: "&#x1F9E9;",
        description: "德国竞赛的招牌题型，从 K3 到 K4 层层升级",
        nodes: ["gc_k3_logic", "gc_k3_numpuzzle", "gc_k4_puzzle"]
    },
    {
        id: "pattern",
        name: "规律与数列线",
        icon: "&#x1F52E;",
        description: "找规律、周期、递推数列",
        nodes: ["gc_k3_pattern", "gc_k3_time", "gc_k4_seq"]
    },
    {
        id: "app",
        name: "应用题线",
        icon: "&#x1F4DD;",
        description: "情境应用，从和差倍到行程综合",
        nodes: ["gc_k3_app", "gc_k4_app", "gc_k4_travel"]
    }
];

// ============= 分类映射（与主图共用同一套颜色，保证视觉一致） =============
const germanCategoryNames = {
    calc: "计算",
    number: "数论",
    geometry: "几何",
    app: "应用题",
    count: "计数",
    fraction: "分数小数",
    travel: "行程",
    other: "综合/推理"
};

const germanCategoryColors = {
    calc: "#E91E63",
    number: "#3F51B5",
    geometry: "#009688",
    app: "#FF5722",
    count: "#795548",
    fraction: "#FF9800",
    travel: "#8BC34A",
    other: "#9E9E9E"
};

// K3 / K4 用不同颜色区分（沿用小学 3、4 年级色调）
const germanGradeColors = {
    3: "#4CAF50",   // K3 - 绿色
    4: "#2196F3"    // K4 - 蓝色
};

const germanGradeLabels = {
    3: "K3（3年级）",
    4: "K4（4年级）"
};

// ---------- 从小学教材节点反查关联的德国竞赛节点 ----------
function findGermanTopicsForElementary(elementaryId) {
    return germanNodes.filter(n =>
        (n.linkedElementary || []).includes(elementaryId)
    );
}
