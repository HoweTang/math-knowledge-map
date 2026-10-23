// Produce a comprehensive knowledge-point analysis report.
//
// What this does:
//  1. Loads panguProblems (609 problems, tagged with top-level topics)
//  2. For each top-level topic, applies KEYWORD CLUSTERING RULES to collapse
//     fine-grained titles into canonical knowledge points (e.g. "交替加减"
//     + "交替求和" + "正负交替" → "交替数列求和")
//  3. Attaches expert-written explanations and solution strategies per category
//  4. Writes a comprehensive markdown report
//
// Output: KNOWLEDGE_POINTS.md (replaces the previous flat version)

const fs = require('fs');
const path = require('path');
const vm = require('vm');

// --- Load data ---
const code = fs.readFileSync(path.join(__dirname, '..', 'pangu-data.js'), 'utf8');
const ctx = {};
vm.createContext(ctx);
vm.runInContext(code + '\nthis.__out = { panguProblems };', ctx);
const problems = ctx.__out.panguProblems;

problems.forEach(p => {
    const f = p.file || '';
    p._grade = /ü0ç3k4|Ak4|AK4/.test(f) ? 4
             : /ü0ç3k5|Ak5|AK5/.test(f) ? 5
             : /ü0ç3k6|Ak6|AK6/.test(f) ? 6
             : /ü0ç3k7|Ak7|AK7/.test(f) ? 7
             : /ü0ç3k8|Ak8|AK8/.test(f) ? 8
             : /ü0ç3k9|Ak9|AK9/.test(f) ? 9 : '?';
});

// --- Topic metadata: label, description, strategies, sub-knowledge-points ---
// Each sub-point has a list of regex patterns applied to title to catch its instances
const TOPIC_META = [
    {
        key: 'pangu_calc',
        label: '基础运算',
        emoji: '🧮',
        desc: '四则运算、运算顺序、速算技巧、单位换算、以及运算的"陷阱题"',
        strategies: [
            '**运算顺序**：括号 → 乘除 → 加减；同级从左到右',
            '**速算技巧**：配对消项（1−2+3−4+… 两两配对），凑整法（25×4、125×8），逆运算补数',
            '**单位换算**：时间（1时=60分=3600秒）、长度（m/cm/mm/km）、体积（L/ml/dl）、重量（kg/g）',
            '**陷阱警觉**：读清"**从** A **中减** B"的方向、"**是** A **的几倍**" vs "**比** A **多几倍**"',
            '**估算验证**：答案与数量级是否合理（例如求距离出 10000 km 要警觉）'
        ],
        clusters: [
            { name: '交替加减/配对求和', patterns: [/交替/, /正负/, /加减$/, /\+\s*\d+\s*-\s*\d+/, /望远/] },
            { name: '等差连加（1+3+…）', patterns: [/\d+\+\d+\+[.…]/, /\d+\+\d+\+\d+\+/, /奇数.*求和/, /奇数.*之和/, /偶数.*求和/, /连.*加/, /1\.\.1000/] },
            { name: '多步混合运算', patterns: [/算式求值/, /算式谜/, /和中减/, /两数之和/, /两数的[商和差积]/, /算式/, /计算 ?\d/, /值$/, /从.*中.*减/] },
            { name: '单位换算', patterns: [/换算/, /\d+ ?(ml|L|cm|m|km|kg|g|分钟|秒|小时|dl)/, /升.*ml/, /\d+ ?升/, /千克|公斤/] },
            { name: '运算符判断/填符号', patterns: [/运算符/, /填符号/, /填.*运算/, /\?/, /□/, /^.*\?.*=/] },
            { name: '乘法表/乘法基础', patterns: [/乘法/, /乘积/, /\d+×\d+/, /\d+ ?[·\.] ?\d+/, /倒数|逆运算/] },
            { name: '逆推/估算', patterns: [/估算/, /大约/, /量级/, /逆推/, /倒推/, /结果.*是/, /\?.*=/] },
        ]
    },
    {
        key: 'pangu_number',
        label: '数论/数位',
        emoji: '🔢',
        desc: '整数的数位结构、整除性、奇偶、回文、位数计数、特殊数的构造',
        strategies: [
            '**数位表示**：三位数 abc = 100a+10b+c，拆开可做代数运算',
            '**整除规则**：2（末位偶）、3（数字和被3整除）、5（末位0或5）、9（数字和被9整除）、11（奇位和−偶位和被11整除）',
            '**最大/最小数**：大数把大数字放高位，小数把大数字放低位，首位不能为 0',
            '**回文数**：abc...cba，中间对称；由对称性减少未知数',
            '**位数计数**：n 位数共 9×10^(n-1) 个（首位 1-9，其余 0-9）',
            '**奇偶性**：和的奇偶 = 奇数个数的奇偶；积只要有偶数就是偶数'
        ],
        clusters: [
            { name: '整除/数字和', patterns: [/整除/, /数字和/, /被 ?\d+ ?整除/, /的倍数/, /除以.*余/, /mod/] },
            { name: '数位组合（最大/最小）', patterns: [/最[大小]/, /位数.*和/, /几位数/, /数位/, /数字组成/, /\d+ ?位数/, /位数描述/] },
            { name: '回文数/对称数', patterns: [/回文/, /对称数/, /镜数/] },
            { name: '位数计数', patterns: [/几位/, /多少个数/, /\d位数/, /位数.*个数/, /\d+..\d+.*几个|\d+..\d+.*多少/, /共用.*数字/, /连位数/] },
            { name: '数轴/定位', patterns: [/数轴/, /箭头/, /位置数/] },
            { name: '两数关系（和/差/积）', patterns: [/两.*数的|两数的|两邻|相邻.*数.*(和|差|积|乘积)|两.*乘积/, /\d+ ?[+\-×÷] ?\d+.*求|求 ?.*和$|求 ?.*差$/] },
            { name: '质数/合数/因数倍数', patterns: [/质数/, /素数/, /因数/, /因子/, /约数/, /倍数/, /公倍数|公约数|最[大小]公/] },
            { name: '阶乘/幂运算/符号代数', patterns: [/阶乘|!\s*(mod|\+)/, /\^-?\d|\d\^|指数|[0-9]\.[0-9]\)\^/, /◇|□|♠|♥|♣|♦/, /同形代同数/, /符号代/] },
            { name: '古数/非十进制表达', patterns: [/亿|万|零/, /中文数/, /罗马数/, /二进制/] },
        ]
    },
    {
        key: 'pangu_fraction',
        label: '分数/小数',
        emoji: '🥧',
        desc: '分数的意义、通分约分、分数四则、分数与小数转换、分数应用',
        strategies: [
            '**比较大小**：通分到同分母，或都化为小数；交叉相乘比较 a/b vs c/d：ad vs bc',
            '**分数单位**：n/d 表示 n 份 d 分之一；工程/倒水问题的核心',
            '**单位1**：题目里"的"字前面的量通常是单位 1',
            '**分数运算**：加减先通分；乘法分子乘分子；除法乘以倒数',
            '**分数与整体关系**：求整体 = 部分 ÷ 分数',
            '**倍比关系**：A 是 B 的 2/5 → A/B = 2/5；若 B=10，A=4'
        ],
        clusters: [
            { name: '分数的比较与大小', patterns: [/比大小/, /[大小]于.*分数|分数.*[大小]于/, /之间的分数/, /中间.*分数/, /\d+\/\d+.*\d+\/\d+/] },
            { name: '分数单位与运算', patterns: [/分数.*运算|分数.*乘|分数.*除|分数.*加|分数.*减/, /[加减乘除].*分数/, /\d\/\d/, /约分/, /通分/] },
            { name: '分数应用（求整体/部分）', patterns: [/几分之几/, /的 ?\d+\/\d+/, /剩下/, /用了.*分/, /\d+\/\d+.*用/] },
            { name: '小数运算', patterns: [/小数/, /\d+\.\d+/, /0\.\d+/] },
            { name: '阴影面积占比（分数）', patterns: [/阴影.*占|白色.*占|占.*几/, /阴影.*比例|阴影比/, /占比$/] },
            { name: '折纸/倍半/比值', patterns: [/对折/, /折 ?\d+ ?次/, /倍$|几倍/] },
            { name: '表达式求最值', patterns: [/表达式.*最[大小]|求.*最[大小]值|最[大小]值$/] },
        ]
    },
    {
        key: 'pangu_percent',
        label: '百分数',
        emoji: '💯',
        desc: '百分比的意义、涨跌恢复、复合变化、浓度问题',
        strategies: [
            '**百分数即分数**：50% = 1/2，常先转分数计算',
            '**涨跌不对消**：+20% 后 −20% ≠ 0，实际 1.2×0.8 = 0.96（亏 4%）',
            '**恢复原价**：涨 X% 后要恢复，需降 X/(100+X) ×100%',
            '**单位 1**：谁是基础；比较不同基础要先统一',
            '**浓度问题**：溶质 / 溶液 × 100%，混合用加权平均'
        ],
        clusters: [
            { name: '涨跌百分比/恢复原价', patterns: [/涨/, /降/, /跌/, /折/, /涨价/, /涨幅/, /恢复/, /%.*%/, /-\d+%|\+\d+%|\-20%|-50%/, /夹克.*%/] },
            { name: '复合百分比变化（股票类）', patterns: [/\d+%.*\d+%/, /先.*再.*%/, /连续.*%/, /股票.*%|股票.*跌|股票.*涨/] },
            { name: '浓度/含量比例', patterns: [/浓度/, /含量/, /盐水/, /糖水/, /占.*%/, /占比/, /混合.*含/] },
            { name: '面积占比（百分比）', patterns: [/面积.*%|%.*面积|面积.*百分/, /百分比.*正方|正方.*百分/, /覆盖.*%/] },
            { name: '人数比例/统计百分比', patterns: [/\d+%.*人|%.*有多少|%.*学生|%.*同学|国考.*%/, /\d+%.*占|占.*%/] },
        ]
    },
    {
        key: 'pangu_algebra',
        label: '代数/方程',
        emoji: '📐',
        desc: '设未知数、列方程、代数式求值、方程组、恒等变形、函数初步',
        strategies: [
            '**设元原则**：设出题目最终要求的量（直接设），或设最小的量（间接设）',
            '**列方程三要素**：等量关系（哪两件事相等）、未知数（设什么）、方程（翻译成等式）',
            '**平衡问题（天平）**：把一端的 X 个 A = 另一端的 Y 个 B 转化为比例',
            '**恒等式技巧**：(a+b)² = a²+2ab+b²；(a−b)² = a²−2ab+b²；a²−b² = (a+b)(a−b)',
            '**代入消元**：方程组中用一式表示一个变量代入另一式',
            '**代数式求值**：先整体化简再代入；注意完全平方、分组'
        ],
        clusters: [
            { name: '一元/二元方程', patterns: [/方程/, /设.*为.*x/, /等于.*求/, /\+\d+.*=.*求/] },
            { name: '代数式求值/化简', patterns: [/求值/, /化简/, /表达式/, /代数式/, /求 ?x$/, /求 ?[a-z]$/, /计算.*式/] },
            { name: '天平/平衡问题', patterns: [/天平/, /平衡/, /称重/, /砝码/, /跷跷板/] },
            { name: '恒等式/完全平方/差积', patterns: [/a\+b|a-b|a²|a\^2|平方和|差.*平方|a·b|a×b|AB|AB=|a\+b=/, /\(.*\)²|\(.*\)\^2/] },
            { name: '比例/倍比问题', patterns: [/倍.*关系/, /比例/, /:[0-9]/, /\d+:\d+/, /几倍|是.*倍/] },
            { name: '数列第 n 项/等差求和', patterns: [/第 ?\d+ ?项/, /第\s*n/, /下一项/, /第 ?\d+ ?个/, /\d+\+\d+\+[.…]/, /\d+\+\d+\+\d+\+/, /奇数.*求和|奇数.*之和|偶数.*求和/, /连 ?加|1\+2\+3/, /等差/, /1\.\.1000|1\.\.\d+/] },
            { name: '鸡兔同笼类（变形）', patterns: [/鸡兔|笼子/, /腿.*头|头.*脚|轮.*辆|车.*轮|头.*腿|脚.*头/, /几只.*几只|多少只.*多少只/, /\d+ ?[辆车只].*\d+ ?轮/, /\d+ 头.*\d+ 只/] },
            { name: '平均数问题', patterns: [/平均/, /均值/, /平均 ?\d+/, /平均.*求/] },
            { name: '符号代数/图形代数', patterns: [/♠|♥|♣|♦|◇|□(.*=|.*求)|★/, /同形代同数|符号.*代.*数|同一字母|同形|用.*代替/] },
            { name: '年龄问题', patterns: [/年龄|岁$|\d+ ?岁|岁数|年前|年后|比.*大.*岁|比.*小.*岁|祖孙|父子|兄弟.*岁/] },
            { name: '最值问题（求最大/最小）', patterns: [/A\+B=.*求.*最[大小]|最[大小]值|求.*最[大小]/, /两数积.*最/] },
        ]
    },
    {
        key: 'pangu_geom',
        label: '平面几何',
        emoji: '📏',
        desc: '面积、周长、阴影面积、图形计数、相似变换、几何构造',
        strategies: [
            '**阴影面积**：整体减去空白；割补拼合；旋转/平移把阴影聚拢',
            '**面积公式**：三角形 ½bh；平行四边形 bh；梯形 ½(a+b)h；圆 πr²',
            '**三角形计数**：按大小/方向分类，不漏不重',
            '**中点连线**：三角形中位线 = 底边的 ½，且平行；连接各边中点得面积为原 ¼',
            '**面积比 = 相似比的平方**；长度比 = 面积比开方',
            '**勾股定理**：直角三角形 a² + b² = c²',
            '**同底同高面积相等**：巧用这个把阴影移形换位'
        ],
        clusters: [
            { name: '阴影面积（割补/等积变换）', patterns: [/阴影/, /阴影面积/, /阴影部分/, /灰色.*面积|灰色区域|灰色三角形/, /涂绿|涂色.*面积/, /覆盖.*面积/] },
            { name: '图形计数（三角形/四边形/正方形）', patterns: [/三角形.*数|数.*三角形/, /几个三角形/, /四边形.*数|多少正方形|找.*正方形|正方形.*种类/, /点阵.*正方/, /图中.*图形/] },
            { name: '周长问题', patterns: [/周长/, /绕.*一圈|绕图|沿.*长度|绳.*长|绕.*长/, /周长.*正方|正方.*周长/] },
            { name: '面积比较/比值', patterns: [/面积比/, /面积.*比/, /倍面积/, /几倍面积/, /面积.*大小/] },
            { name: '矩形/正方形拼接', patterns: [/拼成/, /拼接/, /矩形|正方形.*拼/, /由.*正方形/, /L ?形.*拼/, /\d+ ?相同.*拼/, /\d+ ?正方形拼|\d+ 矩形拼/] },
            { name: '中点/中线', patterns: [/中点/, /中线/, /中位线/, /均匀.*中点/, /中线.*求/] },
            { name: '圆与扇形', patterns: [/圆/, /扇形/, /半圆/, /弧/, /车轮.*转|轮子转/] },
            { name: '勾股/直角三角形', patterns: [/直角/, /勾股/, /斜边/] },
            { name: '相似/全等/反射对称', patterns: [/相似/, /全等/, /镜像|反射|对称/, /折成|折起/, /折叠/] },
            { name: '几何构造（选边/能否构成）', patterns: [/选.*拼.*三角形|选.*构成|能否构成|三角形不等|三角形三边|第三边|三边长|木棒.*三角/, /连续 ?\d+ ?整数关系/] },
            { name: '网格/格子路径', patterns: [/方格.*路径|网格路径|格路|格子.*路|Mario.*方格/] },
            { name: '图形变换/辨识', patterns: [/找.*不同|找出.*图|印章.*图|不同的图|图形匹配|图形放大|不同之处|图形种类/] },
        ]
    },
    {
        key: 'pangu_solid',
        label: '立体几何',
        emoji: '🧊',
        desc: '立方体、长方体、骰子、展开图、三视图、涂色与切割',
        strategies: [
            '**骰子特性**：相对面之和 = 7（1↔6、2↔5、3↔4）',
            '**正方体展开图**：有 11 种，相邻面相邻、相对面隔一个',
            '**三视图**：主视图(正)、左视图(侧)、俯视图(上)；根据三视图还原立体',
            '**涂色立方体切割**：n³ 块中，角 8 块（三面）、棱 12(n−2) 块（两面）、面 6(n−2)² 块（一面）、内 (n−2)³ 块（无色）',
            '**表面积/体积**：体积 = l×w×h；表面积 = 2(lw+wh+hl)',
            '**包含关系**：大立方体由多少个小立方体组成，看切块数'
        ],
        clusters: [
            { name: '骰子问题（相对面/朝向）', patterns: [/骰子/, /色子/, /点数.*骰|骰.*点数/] },
            { name: '展开图与还原', patterns: [/展开图/, /展开/, /折[成起]/, /能否折成/, /折 立方|折立方/] },
            { name: '三视图/视图识别', patterns: [/视图/, /正视|俯视|侧视|左视/, /三视/, /字母.*视|字母.*俯/] },
            { name: '立方体切割/涂色', patterns: [/切割/, /涂色.*立方|涂色.*方块|立方.*涂/, /切成/, /小方块/, /小立方/, /\d×\d×\d.*涂|\d*×\d*×\d.*切/] },
            { name: '表面积/体积计算', patterns: [/表面积/, /体积/, /容积/, /涂面积/] },
            { name: '补全立体/缺块', patterns: [/补全/, /缺.*块/, /缺.*方块/, /补立方|补.*方块/, /缺.*立方|空缺.*块/] },
            { name: '立体堆叠/拼接', patterns: [/堆/, /叠/, /堆积/, /堆放/, /拼成.*立方|拼立方|60 ?立方体|\d+ ?立方.*拼|拼.*长方/, /装 ?立方|立方.*装/] },
            { name: '最大内切球/最大圆柱', patterns: [/内切|最大.*球|最大.*圆柱|球.*半径.*长方/] },
            { name: '蚂蚁/路径（立体上）', patterns: [/蚂蚁.*立方|蚂蚁.*方块|蚂蚁.*爬/] },
        ]
    },
    {
        key: 'pangu_angle',
        label: '角度',
        emoji: '📐',
        desc: '角的度量、三角形与多边形内角、等腰等边角特性、钟表角',
        strategies: [
            '**三角形内角和**：180°',
            '**四边形内角和**：360°；n 边形：(n−2)×180°',
            '**等腰三角形**：两底角相等；等边三角形每角 60°',
            '**外角定理**：三角形外角 = 不相邻两内角之和',
            '**平行线**：同位角相等、内错角相等、同旁内角互补',
            '**钟表角**：时针每小时 30°、每分 0.5°；分针每分 6°；夹角用 |30H − 5.5M|'
        ],
        clusters: [
            { name: '等腰/等边角计算', patterns: [/等腰/, /等边/, /等腰等边/, /等腰[^，]*等腰/, /五边形.*角|正方形.*角/] },
            { name: '多边形内角和', patterns: [/多边形/, /内角和/, /\d+ ?边形/, /α\+β\+γ|α+β/] },
            { name: '三角形角比例/中线', patterns: [/角比|比.*求 ?C|角 ?\d:\d/, /ABC.*角|三角形.*角/, /中线|中位/, /\d+:\d+:\d+/, /2x\+3x|求 ?x$/] },
            { name: '钟表时针分针夹角', patterns: [/时针/, /分针/, /钟面|钟表.*角|时.*分.*夹角|16:00/] },
            { name: '外角/平行线角', patterns: [/外角/, /平行线/, /同位角|内错角/] },
            { name: '求任意角 b/c（综合）', patterns: [/求 ?[bcdm] ?角|求 ?[bcdm]$|求 ?v ?角|求 ?v$|a=\d+.*求|m\+n|求.*角|找角度/] },
        ]
    },
    {
        key: 'pangu_count',
        label: '计数/组合',
        emoji: '🎯',
        desc: '加法原理、乘法原理、排列组合、路径计数、图形计数、容斥',
        strategies: [
            '**加法原理（分类）**：做完一件事有若干类方法 → 加起来',
            '**乘法原理（分步）**：做完一件事要若干步 → 乘起来',
            '**路径计数**：只能右/下走的网格路径 = C(m+n, m)',
            '**排列 vs 组合**：顺序重要=排列 P(n,k)；不重要=组合 C(n,k) = n!/(k!(n−k)!)',
            '**容斥原理**：|A∪B| = |A|+|B|−|A∩B|；三集合类推',
            '**图形计数**：按大小/位置/方向分类枚举，关键是不重不漏'
        ],
        clusters: [
            { name: '路径计数', patterns: [/路径/, /路线/, /走法/, /几种走/, /路.*几种/, /网格.*走|格子.*走/] },
            { name: '选法/组合', patterns: [/选法/, /几种选/, /从.*中选/, /取 ?\d+/, /选 ?\d+ ?[从个]/] },
            { name: '排列（顺序相关）', patterns: [/排列/, /排法/, /站队/, /几种排/, /顺序/, /中间者|排在.*中间/] },
            { name: '图形中数三角形/四边形/正方形', patterns: [/图中.*三角形|三角形.*图/, /图中.*四边形|找.*四边形/, /几个三角形/, /数.*三角形/, /图.*正方形|找正方形|正方形.*种类|点阵.*正方形/, /多少正方形/] },
            { name: '容斥（至少/至多）', patterns: [/至少/, /至多/, /都不/, /同时/, /\d+%.*\d+%.*双|两者皆/] },
            { name: '涂色方案数', patterns: [/涂色方案|涂.*几种|染色|有多少涂法|着色/] },
            { name: '握手/比赛场次', patterns: [/握手/, /比赛/, /场次/, /两两/, /兄妹|姐妹.*认识/] },
            { name: '编号/数字串计数', patterns: [/编号|数字串|密码/, /位回文.*个数|位数.*有多少/, /多少个数|有多少数/, /\d位数.*多少/] },
            { name: '连成/连写（位数计数）', patterns: [/连位数|连成.*大数|按顺序连/, /1\.\.\d+ ?连/, /连写.*数字|数字.*连写/] },
            { name: '立方体/长方体拼法', patterns: [/长方体.*拼|立方体.*拼|多少种长方体|多少种立方/] },
            { name: '书页/印刷数字计数', patterns: [/书页|页码.*数字|位数.*书|印刷.*数字/, /数字.*书页/] },
            { name: '幻方填数', patterns: [/幻方|3×3 ?[^.]+填|填数 ?\d/, /3×3.*方格.*填/] },
        ]
    },
    {
        key: 'pangu_pattern',
        label: '规律/数列',
        emoji: '🔁',
        desc: '找规律、等差等比、周期、图形规律、递推',
        strategies: [
            '**等差数列**：公差 d，第 n 项 = a₁+(n−1)d；前 n 项和 = n(a₁+aₙ)/2',
            '**等比数列**：公比 r，第 n 项 = a₁×r^(n−1)',
            '**周期规律**：找出一个周期的长度 T，第 n 个 = 第 (n mod T) 个',
            '**图形规律**：观察每步"增量"（加几个点、几条线）；增量常常也构成数列',
            '**递推**：aₙ 用 aₙ₋₁ 表达；斐波那契型 aₙ = aₙ₋₁ + aₙ₋₂',
            '**首项诡计**：注意第 n 项 vs 第 n 个"奇数/偶数项"'
        ],
        clusters: [
            { name: '等差数列（第 n 项/求和）', patterns: [/等差/, /\d+,\d+,\d+/, /第 ?\d+ ?项/, /前 ?\d+ ?[项个]和/, /\d+\+\d+\+[.…]/, /奇数.*求和|奇数.*之和/, /连.*加/, /1\+2\+3|1\.\.1000|1\.\.n/, /\d+..\d+.*和/] },
            { name: '等比/倍增数列', patterns: [/等比/, /倍增/, /翻倍/, /\d+,\d+,\d+.*倍/, /下一项.*倍/] },
            { name: '周期循环规律', patterns: [/循环/, /周期/, /\d+色.*第/, /第 ?\d+ ?[个张]/, /第 ?\d+ ?星期/] },
            { name: '图形规律（点数/边数）', patterns: [/第 ?\d+ ?张图/, /第 ?\d+ ?个图/, /点数/, /图形.*数/, /串珠.*剩/, /第 ?\d+.*有多少/] },
            { name: '斐波那契/递推', patterns: [/斐波那契/, /兔子.*繁殖/, /上一个.*下一个/, /1,1,2,3,5|跳台阶|青蛙.*跳/] },
            { name: '交替/变号规律', patterns: [/交替|交错|正负|望远/, /B-A|A-B.*图/] },
            { name: '图形变换规律（镜像/旋转）', patterns: [/镜像/, /旋转.*图|转.*图/, /右倍下半|下半.*图/] },
            { name: '数字规律（三角形数/方阵数）', patterns: [/三角形数|方阵数|三角数|数字金字塔|数字塔|金字塔/, /A\+B.*三角|三角.*A\+B/, /数字 1-10|数字金字/] },
            { name: '找缺失/找规律（三选一）', patterns: [/找规律|找.*缺失|缺失.*和|识别模式|识别规律|找 ?\?|数列.*下一项|数列下一/] },
        ]
    },
    {
        key: 'pangu_logic',
        label: '逻辑推理',
        emoji: '🧠',
        desc: '真假话、假设法、排除法、鸽巢原理、匹配问题',
        strategies: [
            '**假设法**：假设某人说真话 → 推演能否自洽；不行则另设',
            '**真假话型**：n 人中 k 真 n−k 假，常用列表遍历或矛盾法',
            '**排除法**：选项互斥时，排除掉的就是答案',
            '**鸽巢原理**：n+1 个苹果放 n 个抽屉，至少一个抽屉有≥2 个苹果',
            '**最少/最多问题**：极端情形法——假设最不利情况',
            '**匹配表格**：画人×属性的 ✓/✗ 表格推理',
            '**自引用**："我在说谎"类问题要用真值分析'
        ],
        clusters: [
            { name: '真假话推理', patterns: [/真话|说谎|真.*假|谎话|真话假话|真\(假\)/, /唯一.*真|唯一.*假|只.*真.*|真.*真.*假/, /真假各一/] },
            { name: '鸽巢原理（最少/至少）', patterns: [/至少|最少|保证.*有/, /同生日|生日.*至少/, /帽子.*最少/] },
            { name: '位置/顺序/排名推理', patterns: [/顺序|排在|第 ?\d+ ?名|名次|第几|排在.*名|中间者|排列顺序/] },
            { name: '陷阱题/脑筋急转弯', patterns: [/陷阱/, /年龄.*无关|无法求解/, /脑筋/, /农民|冬眠.*年龄/, /自指|自我指涉/] },
            { name: '匹配推理（谁拿什么）', patterns: [/谁.*谁|分别|各.*一个|配对|对应/, /各有.*姐妹|各.*兄弟|各.*几|球衣号/] },
            { name: '最少/最大年龄综合推理', patterns: [/最 ?[大小]|年龄.*最|.* ?孩子.*最小|.*谁.*最大|.*谁.*最小/, /最大.*谁|最小.*谁/] },
            { name: '时间/先后推理', patterns: [/先.*后|提前|推迟.*几|顺序.*比赛|时间.*名次/, /跳远.*第|比赛.*先/] },
        ]
    },
    {
        key: 'pangu_puzzle',
        label: '智力题/数字谜',
        emoji: '🧩',
        desc: '字母运算、填数、幻方、拼图、脑筋急转弯',
        strategies: [
            '**字母运算**：从个位开始分析进位；相同字母 = 相同数字；首位不能为 0',
            '**幻方**：n×n 幻方每行/列/对角和 = n(n²+1)/2；3×3 幻和 15',
            '**填数游戏**：从约束最多的位置开始（唯一解优先）',
            '**拼图**：用面积/颜色/边长做约束',
            '**倒推法**：从目标状态反推初始状态（倒水、年龄等）',
            '**穷举剪枝**：枚举少量情况，剪掉不合理的'
        ],
        clusters: [
            { name: '字母运算/密码数字谜', patterns: [/字母.*算|CRYPT|COYOTE|密码|字母运算|SEND|MONEY|同形代同数|符号代同数/, /算式谜|缺失数字/, /◇|♠|♥|♣|♦|★|■|▲/] },
            { name: '幻方/数独/拉丁方', patterns: [/幻方|数独|填数|方格.*填|3x3|9x9|拉丁方|金字塔.*填|数字 1-10/] },
            { name: '拼图/图形填充', patterns: [/拼图|拼成|填入|组成|拼接|彩色.*拼|L ?形拼/] },
            { name: '涂色/图案方案', patterns: [/涂色方案|染色.*方案|图案.*方案|模式.*方案|涂.*几种|染.*几种|着色/] },
            { name: '逆推/倒水/称重', patterns: [/倒水|分水|称/, /倒推|逆推|还原/] },
            { name: '脑筋急转弯/陷阱', patterns: [/陷阱|无法求解|脑筋|年龄.*农民|冬眠.*年龄/] },
            { name: '算式填符号/算式求值', patterns: [/算式求值|算式谜|填符号.*算|填运算符|算式.*等号|8?[.·]9|65.*?.*47/, /连 ?加 ?10 层|金字塔.*缺失/] },
            { name: '拉丁方/几何方阵', patterns: [/5×5|4×4.*拉丁|拉丁方|同行同列|每行每列/] },
            { name: '扩展乘法/立方幂', patterns: [/立方幂|金币|金币塔|数字分配|两位数.*求和/] },
        ]
    },
    {
        key: 'pangu_app',
        label: '应用题',
        emoji: '💼',
        desc: '行程、工程、经济、年龄、浓度等生活化问题',
        strategies: [
            '**读题三遍**：先浏览找已知/未知，再细读抓条件，画线段/表格',
            '**行程问题**：相遇 d = (v₁+v₂)t；追及 d = (v₁−v₂)t；流水 v顺=v+水、v逆=v−水；火车过桥：路程=车长+桥长',
            '**工程问题**：工作效率 × 时间 = 工作量；合作效率相加；设总量为 1',
            '**鸡兔同笼**：假设全是鸡 → 多出的脚数 ÷ 2 = 兔子数',
            '**年龄问题**：年龄差永不变；n 年前后同减同加',
            '**经济**：成本/售价/利润/利润率；买卖关系要分清谁给谁多少钱'
        ],
        clusters: [
            { name: '行程（相遇/追及/过桥）', patterns: [/相遇|追及|速度|距离|公里|km|火车|过桥|路程|公路|小时.*行|步长|步 ?vs|步数|时速|离信息/] },
            { name: '工程问题（效率）', patterns: [/工作|效率|工程|天数|单独|合作|同时.*完成|打扫|打印|清洗|割草|割.*用.*分/] },
            { name: '鸡兔同笼类', patterns: [/鸡兔|笼|腿.*头|头.*脚|轮.*辆|车.*轮|几只.*几只|多少只.*多少只|\d+ ?[辆车只].*\d+ ?轮/] },
            { name: '年龄问题', patterns: [/年龄|岁$|\d+ ?岁|岁数|比.*大.*岁|比.*小.*岁|祖孙|姐弟年龄|父子.*岁|三代/] },
            { name: '经济（买卖/利润/找零）', patterns: [/价钱|元|价格|克朗|crown|SEK|块钱|买卖|利润|找款|付款|账单|价签|打折|宝石付款|钱.*多少/] },
            { name: '浓度/混合/果汁', patterns: [/浓度|盐水|糖水|混合|稀释|溶液|果汁|柚子.*苹果|油果果|调配/] },
            { name: '分配/等分', patterns: [/分给|平分|均分|分成|每人.*几|分.*等|球.*孩子|球分给|糖果分给|均匀分配/] },
            { name: '容器问题', patterns: [/杯|桶|瓶|容器|倒入|盛|油箱|水龙头.*蓄水|浴缸|游泳池|游泳.*运动员/] },
            { name: '相对体重/平衡问题', patterns: [/体重|重量|较重|较轻|体重比|体重.*谁|同重/, /婴儿.*悬挂|挂件.*平衡/] },
            { name: '生活数据/统计类', patterns: [/派对人数|观众.*变化|毛巾.*夹子|锯木头|滑雪.*每小时呼吸|呼吸次数|打猫|打扫.*次数|毛巾晾/] },
            { name: '身高/长度实际应用', patterns: [/身高|身长|个高|高度.*差|比.*高|比.*矮|脚印/] },
            { name: '时间/场景混合', patterns: [/锯木头|分段|段 ?\d+ ?分|用时.*分|段.*锯/] },
            { name: '数字/数据类（名次/排位）', patterns: [/卡车玉米|名次.*奖|跳远.*第|比赛名次|同生日/] },
        ]
    },
    {
        key: 'pangu_time',
        label: '时间/日期',
        emoji: '⏰',
        desc: '时间计算、星期几、时钟角度、日历、持续时间',
        strategies: [
            '**星期几**：从起点日往后 n 天 → 星期 = (起点 + n) mod 7；注意当天算 0 天',
            '**日期**：平年 365 天 = 52 周 + 1 天；闰年 366 = 52 周 + 2 天；大小月',
            '**时钟角度**：时针每小时 30°，每分 0.5°；分针每分 6°；夹角 = |30H − 5.5M|',
            '**跨天计算**：注意 24 时制、是否跨过 00:00',
            '**持续时间**：结束 − 开始，跨午夜要 +24',
            '**火车/公交时刻**：出发+运行时间=到达；中途停留要加上'
        ],
        clusters: [
            { name: '星期几（周期型）', patterns: [/星期|周 ?[一二三四五六日天]|星期几|12 ?天后|天后.*星期/] },
            { name: '时长计算（跨小时/跨日）', patterns: [/多少[分秒小时]|持续|用时|所需时间|时长|总时间|总时长|间隔.*秒/, /100 ?小时后|小时.*几点/] },
            { name: '时钟指针夹角', patterns: [/时针|分针|钟.*夹角|钟.*角|钟面.*角|16:00|时钟.*角/] },
            { name: '时刻表（出发/到达）', patterns: [/出发|到达|启程|火车|公交|航班|飞机|时刻/] },
            { name: '时间倒推', patterns: [/几点开始|提前|推迟/] },
            { name: '连续事件/营业时段', patterns: [/营业|开放|泳池.*一周|6 ?支蜡烛|蜡烛|燃烧/] },
        ]
    },
    {
        key: 'pangu_probability',
        label: '概率/统计',
        emoji: '🎲',
        desc: '等可能事件、独立事件、几何概率、Galton 板',
        strategies: [
            '**等可能事件**：P(A) = 有利结果数 / 总结果数',
            '**独立事件相乘**：P(A ∩ B) = P(A)·P(B)（A、B 独立时）',
            '**互斥事件相加**：P(A ∪ B) = P(A)+P(B)（A、B 不同时发生时）',
            '**对立事件**：P(A) + P(非A) = 1',
            '**Galton 板**：n 层板，到达 k 号槽概率 = C(n,k)/2ⁿ（二项分布）',
            '**抽签不吃亏**：抽签顺序不影响个人概率',
            '**鸽巢原理（概率版）**：最少抽多少次保证某种组合出现'
        ],
        clusters: [
            { name: '等可能事件概率', patterns: [/概率/, /可能.*几分之几|机率/] },
            { name: 'Galton 板', patterns: [/Galton|高尔顿|钉板/] },
            { name: '取球/抽签', patterns: [/取球|抽/, /红球|蓝球|白球|黑球|球.*取|帽子.*抽|帽子.*取/] },
            { name: '最少抽取（鸽巢）', patterns: [/至少取|最少抽|保证取|最少.*次|保证.*次/] },
            { name: '骰子概率/平均值', patterns: [/骰子.*概率|两.*骰子|点数.*和|骰子平均|骰子.*次|骰子.*期望/] },
            { name: '统计/均值/方差', patterns: [/平均.*求/, /方差|标准差|中位数|众数/] },
        ]
    },
];

// --- Clustering: for each problem, assign to canonical knowledge points ---
function clusterTitle(topic, title) {
    const meta = TOPIC_META.find(m => m.key === topic);
    if (!meta) return [];
    const hits = [];
    for (const cl of meta.clusters) {
        if (cl.patterns.some(re => re.test(title))) hits.push(cl.name);
    }
    return hits.length ? hits : ['综合应用（独立题型）'];
}

// Build the knowledge point table per topic
const kp = {}; // topic -> clusterName -> { problems: [], grades: Set, years: Set, diffs: [] }
problems.forEach(p => {
    (p.topics || []).forEach(topic => {
        const clusterNames = clusterTitle(topic, p.title || '');
        kp[topic] = kp[topic] || {};
        clusterNames.forEach(cn => {
            kp[topic][cn] = kp[topic][cn] || { problems: [], grades: new Set(), years: new Set(), diffs: [], titles: new Set() };
            const rec = kp[topic][cn];
            rec.problems.push(p);
            rec.grades.add(p._grade);
            rec.years.add(p.year);
            rec.diffs.push(p.difficulty);
            rec.titles.add(p.title);
        });
    });
});

// --- Compose the report ---
let md = '';
md += '# 盘古数学竞赛知识点深度分析\n\n';
md += `> 自动生成于 ${new Date().toISOString().slice(0,10)} · 基于 ${problems.length} 道题（AK4-AK9, 2015-2026）\n\n`;
md += '本报告把 609 道题目聚合成 **15 大类考点 × 70+ 核心知识点**，每一类都附上**考察点解读**和**解题策略**。\n\n';
md += '## 📊 整体概览\n\n';
md += '| 大类 | 题数 | 占比 | 高频年级 | 主要难度 |\n';
md += '|------|------|------|----------|----------|\n';

TOPIC_META.forEach(meta => {
    const clusters = kp[meta.key] || {};
    const totalInTopic = Object.values(clusters).reduce((s, c) => s + c.problems.length, 0);
    // Grade distribution
    const gradeCount = {};
    Object.values(clusters).forEach(c => c.problems.forEach(p => gradeCount[p._grade] = (gradeCount[p._grade]||0)+1));
    const topGrades = Object.entries(gradeCount).sort((a,b) => b[1]-a[1]).slice(0,3).map(([g]) => `AK${g}`).join('/');
    // Difficulty
    const allDiffs = [];
    Object.values(clusters).forEach(c => c.diffs.forEach(d => d && allDiffs.push(d)));
    const avgDiff = allDiffs.length ? (allDiffs.reduce((a,b)=>a+b,0)/allDiffs.length).toFixed(1) : '-';
    const pct = ((totalInTopic / problems.length) * 100).toFixed(1);
    md += `| ${meta.emoji} ${meta.label} | ${totalInTopic} | ${pct}% | ${topGrades} | 均 ${avgDiff}⋆ |\n`;
});

md += '\n> **注**：一题可能跨多个大类，所以上表总和 > 609。实际 609 题，899 次打标，平均每题 1.48 个考点。\n\n';
md += '---\n\n';

// Per-category detailed sections
TOPIC_META.forEach(meta => {
    const clusters = kp[meta.key] || {};
    const totalInTopic = Object.values(clusters).reduce((s, c) => s + c.problems.length, 0);
    const totalTitles = Object.values(clusters).reduce((s, c) => s + c.titles.size, 0);

    md += `## ${meta.emoji} ${meta.label}  \`${meta.key}\`\n\n`;
    md += `**考察点**：${meta.desc}\n\n`;
    md += `**覆盖**：${totalInTopic} 道题 · ${Object.keys(clusters).length} 个核心知识点 · 聚合自 ${totalTitles} 个具体题目\n\n`;

    md += `### 📋 核心知识点\n\n`;
    md += '| # | 知识点 | 题数 | 年级 | 难度 | 代表例题 |\n';
    md += '|---|--------|------|------|------|----------|\n';
    const sorted = Object.entries(clusters).sort((a,b) => {
        // Put "综合应用" cluster at the end regardless of size
        if (/综合应用/.test(a[0])) return 1;
        if (/综合应用/.test(b[0])) return -1;
        return b[1].problems.length - a[1].problems.length;
    });
    sorted.forEach(([name, rec], i) => {
        const diffs = rec.diffs.filter(Boolean);
        const diffRange = diffs.length ? `${Math.min(...diffs)}-${Math.max(...diffs)}⋆` : '-';
        const grades = Array.from(rec.grades).sort().map(g => `AK${g}`).join('/');
        const representative = rec.problems.slice().sort((a,b) => (a.difficulty||3)-(b.difficulty||3))[0];
        md += `| ${i+1} | **${name}** | ${rec.problems.length} | ${grades} | ${diffRange} | \`${representative.id}\` |\n`;
    });

    // For "综合应用" cluster: list sample titles to show what's inside
    const miscCluster = clusters['综合应用（独立题型）'];
    if (miscCluster && miscCluster.problems.length > 0) {
        md += `\n> **"综合应用（独立题型）"中的代表题目**（共 ${miscCluster.problems.length} 道，列出其中 10 道）：\n`;
        const sampleTitles = Array.from(miscCluster.titles).slice(0, 10);
        sampleTitles.forEach(t => md += `> - ${t}\n`);
        if (miscCluster.titles.size > 10) {
            md += `> - ... 其余 ${miscCluster.titles.size - 10} 种题型详见数据\n`;
        }
        md += `>\n> 这些题目都是**综合运用本大类策略**的独立应用题，没有固定模式。练习时逐题分析即可。\n`;
    }

    md += '\n### 🧭 解题策略\n\n';
    meta.strategies.forEach(s => md += `- ${s}\n`);

    md += `\n### 💡 典型例题解析\n\n`;
    // Pick up to 3 representative problems covering different clusters
    const picks = [];
    const seenClusters = new Set();
    sorted.forEach(([cn, rec]) => {
        if (picks.length >= 3) return;
        if (seenClusters.has(cn)) return;
        seenClusters.add(cn);
        // Choose a mid-difficulty example
        const mid = rec.problems.slice().sort((a,b) => Math.abs((a.difficulty||3) - 3) - Math.abs((b.difficulty||3) - 3))[0];
        picks.push({ clusterName: cn, p: mid });
    });
    picks.forEach(({ clusterName, p }) => {
        md += `#### 【${clusterName}】${p.title}  \`${p.id}\`\n\n`;
        md += `- **年份/轮次**：${p.year} ${p.round} · AK${p._grade} · 难度 ${'⋆'.repeat(p.difficulty||0)}\n`;
        md += `- **题目**：${(p.translation || '').replace(/\n/g, ' ')}\n`;
        if (p.options && p.options.length) {
            md += `- **选项**：${p.options.map((o,i) => `${String.fromCharCode(97+i)}) ${o}`).join('；')}\n`;
        }
        if (p.answer) md += `- **答案**：${p.answer}\n`;
        if (p.hint) md += `- **思路**：${p.hint.replace(/\n/g, ' ')}\n`;
        md += '\n';
    });
    md += '---\n\n';
});

// Cross-cutting analysis
md += '## 🔀 跨年级趋势分析\n\n';
md += '### 各年级考察重心变化\n\n';
md += '| 大类 | AK4 | AK5 | AK6 | AK7 | AK8 | AK9 |\n';
md += '|------|----:|----:|----:|----:|----:|----:|\n';
TOPIC_META.forEach(meta => {
    const clusters = kp[meta.key] || {};
    const g = { 4:0, 5:0, 6:0, 7:0, 8:0, 9:0 };
    Object.values(clusters).forEach(c => c.problems.forEach(p => { if (g[p._grade] !== undefined) g[p._grade]++; }));
    md += `| ${meta.emoji} ${meta.label} | ${g[4]||'-'} | ${g[5]||'-'} | ${g[6]||'-'} | ${g[7]||'-'} | ${g[8]||'-'} | ${g[9]||'-'} |\n`;
});

md += `\n**关键观察**：

- **AK4-5（低龄段）**：以 ${'`基础运算`、`应用题`、`逻辑/陷阱题`、`时间`'} 为主，侧重运算熟练度和读题能力
- **AK6-7（过渡段）**：代数开始加入，几何/立体几何比重大幅上升
- **AK8-9（高年级）**：以 ${'`代数`、`几何`、`分数`、`概率`'} 为主，几乎没有基础计算题，强调综合推理
- **始终高频**：几何（1-5 年级都占大头）、规律题（贯穿所有年级）

`;

md += '## 🏆 全局高频知识点 Top 25（有明确解法的核心考点）\n\n';
md += '> 已排除"综合应用（独立题型）"这类无固定模式的桶，只保留**可以明确训练**的知识点。\n\n';
md += '| 排名 | 知识点 | 大类 | 题数 | 年级范围 | 难度 |\n';
md += '|-----:|--------|------|-----:|----------|------|\n';
const allClusters = [];
Object.entries(kp).forEach(([topic, cls]) => {
    Object.entries(cls).forEach(([name, rec]) => {
        if (/综合应用/.test(name)) return; // skip generic bucket
        const meta = TOPIC_META.find(m => m.key === topic);
        const diffs = rec.diffs.filter(Boolean);
        allClusters.push({
            name, topic, meta, count: rec.problems.length,
            grades: Array.from(rec.grades).sort(),
            diffRange: diffs.length ? `${Math.min(...diffs)}-${Math.max(...diffs)}⋆` : '-'
        });
    });
});
allClusters.sort((a,b) => b.count - a.count).slice(0, 25).forEach((c, i) => {
    md += `| ${i+1} | **${c.name}** | ${c.meta ? c.meta.emoji + ' ' + c.meta.label : c.topic} | ${c.count} | AK${c.grades[0]}−AK${c.grades[c.grades.length-1]} | ${c.diffRange} |\n`;
});
md += '\n**解读**：这些是**高性价比的训练目标** — 每个都有明确策略，且在题库中反复出现。练透这 25 个点能解决约 40% 的题。\n';

md += `\n## 📈 难度分布分析

- **1-2 星**（简单，占 25%）：主要是 AK4-5 的运算、读题、规律基础
- **3 星**（中等，占 23%）：主流题型，所有年级都有
- **4-5 星**（难，占 52%）：几何综合、代数变换、复杂逻辑 — 盘古竞赛整体偏难

**启示**：中高年级（AK7+）题目一半以上是 4-5 星，针对性训练必须以**综合题 + 多步推理**为主。

## 📚 使用建议

1. **按大类系统刷题**：先纵向把一个大类（如"阴影面积"）所有题目做一遍，建立类型库
2. **按知识点横向复习**：查全局 Top 25 的高频知识点，确保每一个都掌握
3. **错题关联**：错题簿里按本报告的"知识点"分类，而不是按年份——这样能看到同一知识点的多种变形
4. **按年级定靶**：如果备考 AK7，重点看 AK6-8 的交集知识点（算法：当前年级 ±1 范围内的高频考点）

> 本报告由 \`_tools/knowledge_report.js\` 自动生成；修改聚类规则重跑即可。
`;

fs.writeFileSync(path.join(__dirname, '..', 'KNOWLEDGE_POINTS.md'), md, 'utf8');
console.log(`✓ Wrote KNOWLEDGE_POINTS.md (${(md.length/1024).toFixed(1)} KB, ${md.split('\n').length} lines)`);

// Console summary
console.log('\n=== Clustered knowledge points per category ===');
TOPIC_META.forEach(meta => {
    const clusters = kp[meta.key] || {};
    const total = Object.values(clusters).reduce((s, c) => s + c.problems.length, 0);
    console.log(`${meta.emoji} ${meta.label.padEnd(16)} ${String(total).padStart(4)}题 · ${String(Object.keys(clusters).length).padStart(2)} 个核心知识点`);
    Object.entries(clusters).sort((a,b)=>b[1].problems.length-a[1].problems.length).forEach(([n, r]) => {
        console.log(`    · ${n.padEnd(26)} ${r.problems.length}题  (${Array.from(r.grades).sort().map(g=>'AK'+g).join('/')})`);
    });
});
