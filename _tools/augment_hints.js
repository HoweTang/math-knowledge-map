/**
 * Augment hasImage problems that lack a hint with a smart, type-inferred hint.
 * Never overwrites an existing hint.
 * Uses keyword matching on title + translation.
 */
const fs = require('fs');
const PATH = 'C:/Users/eguihta/Learning/Guihao/math/math-knowledge-map/pangu-data.js';

const src = fs.readFileSync(PATH, 'utf8');

// Load current problems to know which need augmentation
const wrapped = src + '\nreturn { panguProblems };';
const R = (new Function(wrapped))();

// Type detectors: return a hint string or null
const RULES = [
    { name: 'cube_unfold', match: /展开图|折叠|折成|折立方体|骰子|对面/, hint: '读图向导：立方体对面之和恒为 7。展开图折叠时可先固定一面为底、追踪相邻关系；三视图题分层扫描每一层的方块数。' },
    { name: 'three_views', match: /三视图|前视|侧视|顶视|正视|俯视/, hint: '读图向导：分别读出正视 / 侧视 / 顶视三张图，对应立体结构逐层放方块，注意"多个方块共用同一列"造成的错位。' },
    { name: 'die_roll', match: /骰子滚动|滚动|滚到|上面是几|顶面是几/, hint: '读图向导：追踪骰子在每一步滚动后的姿态。牢记相对面数字之和为 7，通过初始位置逐步推出每一面。' },
    { name: 'paths', match: /有多少种.*走|路径|从.*到.*B|A 到 B|A→B/, hint: '读图向导：从终点回推更快 —— 每个格子的走法 = 上邻 + 左邻（无回头方向时）。或系统列出每条路径。' },
    { name: 'triangle_count', match: /有多少个三角形|三角形数|多少三角形/, hint: '读图向导：分层数（先数最小的基础三角形；再数由 2 个 / 4 个组成的复合三角形；最后加起来）。注意正立和倒立分开数。' },
    { name: 'square_count', match: /多少个正方形|多少正方形|有多少正方形/, hint: '读图向导：按边长分类枚举（先数 1×1，再 2×2，再 3×3…），最后求和。注意斜置正方形不要漏。' },
    { name: 'shaded_area', match: /灰色|阴影|涂色.*面积|阴影面积/, hint: '读图向导：用"整体面积 − 空白面积"更快；或把阴影分解成矩形 / 三角形之和。若图形对称，可只算 1/2 或 1/4 再乘。' },
    { name: 'palette_cover', match: /覆盖|拼块|拼图|拼进|铺满|填入方格/, hint: '读图向导：数总格子数，再看每种拼块占几格。用面积除法估计上限，再逐个试拼。' },
    { name: 'balance_scale', match: /天平|平衡|重量.*相等/, hint: '读图向导：把每种图形代成变量（例 △=a、○=b），从每张平衡的天平列一个等式，联立求解。' },
    { name: 'mirror_reflect', match: /镜像|轴对称|对称轴|反射/, hint: '读图向导：镜像不改变图形大小和点数。追踪每个关键点关于轴的对应位置，逐点映射。' },
    { name: 'clock_hand', match: /时针|分针|时钟|挂钟.*角/, hint: '读图向导：时针每小时 30°，每分钟 0.5°；分针每分钟 6°。夹角 = |时针角度 − 分针角度|，超过 180° 取补角。' },
    { name: 'clock_time_diff', match: /时钟.*间隔|时钟.*秒|两张图之间|过去了多少/, hint: '读图向导：把两张钟面读数分别写成 hh:mm:ss，再算差。留意 60 进制的进位。' },
    { name: 'digit_puzzle', match: /算式谜|数字谜|方框|代表|代替|填数字|加法竖式|乘法竖式/, hint: '读图向导：从进位约束最强的位置入手（如末位）。设未知数字为变量，逐步缩小候选。' },
    { name: 'sequence_dots', match: /图.*点|点数|点阵|串珠|第.*图.*点|下一个图|图 \d+/, hint: '读图向导：算前几张图的点数序列，找相邻差（等差）或相邻比（等比），推出第 n 张的通项。' },
    { name: 'pattern_shape', match: /图形规律|图形.*找规律|图形按.*排列|按.*规律/, hint: '读图向导：从形状 / 颜色 / 位置三个维度分别找周期或递推；有时"下一个"= 前两个组合。' },
    { name: 'sum_missing_pyramid', match: /加法金字塔|数塔|数字金字塔/, hint: '读图向导：上一格 = 下面相邻两格之和。从已知格向上或向下逐步推。' },
    { name: 'latin_square', match: /拉丁方|每行.*每列.*每.*对角|每行.*每列.*一次/, hint: '读图向导：从约束最强的行 / 列开始（该行已填数字最多的）。逐格排除候选。' },
    { name: 'plus_cross', match: /加法十字|plus-kors|plus cross/, hint: '读图向导：十字中央格 = 四个末端格之和 / 2。用行列等式反推缺失格。' },
    { name: 'ordering_race', match: /过线|名次|赛跑.*顺序|谁.*第|排名/, hint: '读图向导：以最快 / 最慢的人为基准，把其他人的相对位置画成数轴，读出顺序。' },
    { name: 'age_puzzle', match: /年龄|多大|几岁|.*岁/, hint: '读图向导：设未知年龄为 x，写出"几年后 = 几倍"这类关系式并解方程。' },
    { name: 'coin_move', match: /硬币|移动一个|移一根|移动一根/, hint: '读图向导：先枚举所有可能的移动位置，判断结果是否满足约束。通常一步就能完成。' },
    { name: 'page_missing', match: /撕|页码|书页/, hint: '读图向导：书本页码前后连续、两面对页页码差 1。观察缺页周围的可见页码找规律。' },
    { name: 'balance_beam_line', match: /悬挂|挂饰|hänger|婴儿悬挂|杠杆/, hint: '读图向导：从最底一层开始逐层往上算重量；每根横杆两侧力矩相等。' },
    { name: 'wheel_rotation', match: /轮子.*转|旋转.*完整|旋转.*相同/, hint: '读图向导：观察轮子上花纹的旋转对称阶数（旋转多少度看起来一样）。' },
    { name: 'flag_coloring', match: /旗帜|旗.*涂|旗.*色/, hint: '读图向导：每种旗按顺序涂色算排列（若 n 色填 n 格 = n!）；不同旗形分别算再求和。' },
    { name: 'stamp_impossible', match: /印章|盖.*图|印.*不可能|无法.*印/, hint: '读图向导：每个印章的形状对应某种特征。逐个选项判断能否由印章组合实现。' },
    { name: 'balance_side', match: /相同大小的.*天平|平衡状态|同样重/, hint: '读图向导：从每张平衡关系列等式，把不同物体代成变量再解方程。' },
    { name: 'graph_area', match: /方格|方格纸|点阵|1 cm 点|Pick 定理|一个格.*面积/, hint: '读图向导：用 Pick 定理 A = 内点 + 边点/2 − 1；或分解为矩形 + 三角形之和。' },
    { name: 'grid_path_arrows', match: /按照.*箭头|按箭头|方格.*箭头|Mario/, hint: '读图向导：把每个方向指令解释为 (+dx, +dy)，从起点累加位移得到终点。' },
    { name: 'number_line_read', match: /数轴|刻度|linjalen|尺子|标尺/, hint: '读图向导：找已知的两个刻度算单位长度，再从起点数到目标点。' },
    { name: 'quotient', match: /^两数.*商|kvoten|商是多少/, hint: '读图向导：从 PDF 找到题目中的两个数，作除法。' },
    { name: 'circles_area', match: /圆.*矩形|矩形.*圆|圆内.*矩形|halvcirkel|kvadratcirkel/, hint: '读图向导：识别圆的直径 = 矩形的宽（或对应关系）。用圆面积 πr² 或矩形面积公式代入。' },
    { name: 'circles_tangent', match: /三.*圆.*切|相切|圆.*切.*矩形/, hint: '读图向导：连接圆心到切点得半径垂线；构造直角三角形用勾股。' },
    { name: 'expr_generic_image', match: /uttrycket|表达式|下方.*算式|下方算式|下面的算式|求值/, hint: '读图向导：从 PDF 中读出完整表达式，按运算优先级逐步化简。' },
    { name: 'ratio_geometry', match: /比.*面积|面积.*比|比例.*面积/, hint: '读图向导：相似图形面积比 = 边长比²；或直接用面积公式代入并化简。' },
    { name: 'reflection_position', match: /镜像位置|镜像.*落到|镜像.*位置|S1.*S2/, hint: '读图向导：镜像 3 次的顺序影响最终位置。每次镜像沿指定轴翻转，用坐标追踪。' },
    { name: 'polygon_angle', match: /五角|五边形|多边形.*角|内角/, hint: '读图向导：n 边形内角和 = (n-2)·180°。等边等角图形每角平均分配。' },
    { name: 'sequence_next_dots', match: /下.*张图|figur.*(?:5|6|10|100|101)|第.*张图/, hint: '读图向导：写出前几张图的量（点数 / 边数 / 格数），求相邻差找递推公式。' },
];

function inferHint(problem) {
    const text = `${problem.title || ''} ${problem.translation || ''}`;
    for (const rule of RULES) {
        if (rule.match.test(text)) return rule.hint;
    }
    // 兜底：泛用图形题提示
    return '读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。';
}

// Patch the JS source by regex-locating each hasImage entry
let modifiedSrc = src;
let augmentedCount = 0;
const idsToAugment = new Set(R.panguProblems.filter(p => p.hasImage && (!p.hint || p.hint.trim() === '')).map(p => p.id));

for (const id of idsToAugment) {
    // Locate the line for this problem
    const re = new RegExp(`(\\{ id: "${id.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}",[^}]*hasImage: true[^}]*\\})`);
    const m = modifiedSrc.match(re);
    if (!m) continue;
    const line = m[1];
    // If the entry has no "hint:", inject one
    if (!/,\s*hint\s*:/.test(line)) {
        const problem = R.panguProblems.find(p => p.id === id);
        if (!problem) continue;
        const hint = inferHint(problem);
        // Insert hint field just before hasImage
        const newLine = line.replace(/,\s*hasImage:\s*true/, `, hint: ${JSON.stringify(hint)}, hasImage: true`);
        modifiedSrc = modifiedSrc.replace(line, newLine);
        augmentedCount++;
    }
}

fs.writeFileSync(PATH, modifiedSrc, 'utf8');
console.log(`Augmented ${augmentedCount} problems with inferred read-image hints.`);
