// ============= 盘古数学竞赛 (Pangea Matematiktävling) AK4 知识图谱 =============
// 原始语言：瑞典语 (Svenska)
// 全部题目已翻译为中文
//
// 目录：盘古竞赛/  (8 年份 × 2–3 轮次)
//   2015/16 初赛  Frü0è2gekatalog_ü0ç3k4-PMT16_O1.pdf      15题 60分钟 45分
//   2015/16 复赛  O2-ü0ç3k4-PMT16.pdf                      12题 60分钟 48分
//   2015/16 决赛  Final-ü0ç3k4-PMT16-v2.pdf                15题 60分钟 68分
//   2021/22 初赛  Fragekatalog-Ak4-O1-PMT2122.pdf          12题 60分钟 33分
//   2022/23 初赛  Fragekatalog-Ak4-O1-PMT2223.pdf          12题 60分钟 33分
//   2022/23 决赛  Fragekatalog-Ak4-Final-PMT2223.pdf       10题 60分钟 39分
//   2023/24 初赛  Fragekatalog-Ak4-O1-PMT2324.pdf          12题 60分钟 33分
//   2023/24 决赛  Fragekatalog-Ak4-FINAL-PMT2324.pdf       10题 60分钟 39分
//   2024/25 初赛  PMT2425-01-AK4.pdf                       12题 60分钟 33分
//   2024/25 决赛  PMT2425-Final-AK4.pdf                    10题 60分钟 39分
//   2025/26 初赛  PMT2526-O1-AK4.pdf                       12题 60分钟 33分
//   2025/26 决赛  Fragekatalog-Ak4-Final-PMT2526.pdf       10题 60分钟 39分
//
// AK4 = Årskurs 4 = 4年级
// 轮次：初赛 = Omgång 1, 复赛 = Omgång 2 (仅 2016 年有), 决赛 = Final
// 难度：⋆(1星) ~ ⋆⋆⋆⋆⋆(5星)，1星=1分
// 2016 年份的题目原始 PDF 未标注单题难度，此处按题序估算：初赛 15 题按 1-5 星梯度、决赛按 3-5 星、复赛按 2-5 星

// ============= 全部题目（含中文翻译） =============
const panguProblems = [
    // ========== 2024/2025 初赛 ==========
    {
        id: "P2425O1_1", year: "2024/25", round: "初赛", num: 1, difficulty: 1,
        file: "盘古竞赛/PMT2425-01-AK4.pdf", page: 3,
        title: "运算符判断",
        translation: "方框里应该填哪个运算符号？\n7 + 48 = 56 □ 1",
        options: ["+", "-", "÷", "×", "都不是"],
        topics: ["pangu_calc"],
        hint: "先算左边 7+48=55，再看右边什么运算能让 56 得到 55。答案：b (56-1=55)",
        answer: "b"
    },
    {
        id: "P2425O1_2", year: "2024/25", round: "初赛", num: 2, difficulty: 1,
        file: "盘古竞赛/PMT2425-01-AK4.pdf", page: 3,
        title: "交替加减",
        translation: "计算：1 − 2 + 3 − 4 + 5 − 6 + 7 − 8 + 9",
        options: ["2", "3", "4", "5", "6"],
        topics: ["pangu_calc", "pangu_pattern"],
        hint: "配对：(1-2)+(3-4)+(5-6)+(7-8)+9 = -1-1-1-1+9 = 5。答案：d",
        answer: "d"
    },
    {
        id: "P2425O1_3", year: "2024/25", round: "初赛", num: 3, difficulty: 1,
        file: "盘古竞赛/PMT2425-01-AK4.pdf", page: 3,
        title: "12天后星期几",
        translation: "Adam 星期三预约看医生。他需要 12 天后回访。回访是星期几？",
        options: ["星期五", "星期六", "星期日", "星期一", "星期二"],
        topics: ["pangu_time"],
        hint: "12 ÷ 7 = 1 余 5。星期三往后数 5 天 → 星期一。答案：d",
        answer: "d"
    },
    {
        id: "P2425O1_4", year: "2024/25", round: "初赛", num: 4, difficulty: 2,
        file: "盘古竞赛/PMT2425-01-AK4.pdf", page: 3,
        title: "农民年龄（陷阱题）",
        translation: "一位在自家农场生活了很多年的农民有 12 头牛、5 只鸡、1 只公鸡和 1 匹马。农民多大年龄？",
        options: ["19", "38", "62", "64", "无法求解"],
        topics: ["pangu_logic"],
        hint: "动物数量与年龄没有必然联系，属于陷阱题。答案：e（无法求解）",
        answer: "e"
    },
    {
        id: "P2425O1_5", year: "2024/25", round: "初赛", num: 5, difficulty: 2,
        file: "盘古竞赛/PMT2425-01-AK4.pdf", page: 3,
        title: "从和中减",
        translation: "从 120 和 90 的和中减去 210，结果是多少？",
        options: ["0", "180", "240", "420", "460"],
        topics: ["pangu_calc"],
        hint: "(120+90) - 210 = 210 - 210 = 0。答案：a",
        answer: "a"
    },
    {
        id: "P2425O1_6", year: "2024/25", round: "初赛", num: 6, difficulty: 2,
        file: "盘古竞赛/PMT2425-01-AK4.pdf", page: 3,
        title: "数轴上的箭头",
        translation: "数轴上的箭头指向哪个数？（需看 PDF 原图）",
        options: ["520", "550", "600", "650", "700"],
        topics: ["pangu_number"],
        hint: "找到刻度间距，从起点数到箭头位置",
        hasImage: true
    },
    {
        id: "P2425O1_7", year: "2024/25", round: "初赛", num: 7, difficulty: 3,
        file: "盘古竞赛/PMT2425-01-AK4.pdf", page: 4,
        title: "两次镜像后的点数",
        translation: "一个圆点图案先关于直线 a 镜像，再关于直线 b 镜像。两次镜像后，问号处方格里有多少个圆点？（需看 PDF 原图）",
        options: ["1", "2", "3", "4", "5"],
        topics: ["pangu_geom"],
        hint: "轴对称性质：镜像不改变点数。追踪最初图案对应的问号位置",
        hasImage: true
    },
    {
        id: "P2425O1_8", year: "2024/25", round: "初赛", num: 8, difficulty: 3,
        file: "盘古竞赛/PMT2425-01-AK4.pdf", page: 4,
        title: "图形匹配",
        translation: "哪个选项能配入图中？（需看 PDF 原图）",
        options: ["A", "B", "C", "D", "E"],
        topics: ["pangu_geom"],
        hint: "读图向导：比对被抠掉部分的边界形状 / 对称性 / 数量特征，逐个选项验证。",
        hasImage: true
    },
    {
        id: "P2425O1_9", year: "2024/25", round: "初赛", num: 9, difficulty: 4,
        file: "盘古竞赛/PMT2425-01-AK4.pdf", page: 5,
        title: "宝石付款",
        translation: "在童话国度里用宝石付款（价格见表格）。Nisse 买了总价 50 的蘑菇。他只用白色和黄色宝石，用总共 18 颗宝石恰好付清。Nisse 给了卖家多少颗黄色宝石？",
        options: ["8", "9", "10", "11", "12"],
        topics: ["pangu_app", "pangu_puzzle"],
        hint: "设白宝石 w 颗、黄宝石 y 颗。w+y=18，且用宝石表算总价=50。列方程求解（需看 PDF 中宝石表）",
        hasImage: true
    },
    {
        id: "P2425O1_10", year: "2024/25", round: "初赛", num: 10, difficulty: 4,
        file: "盘古竞赛/PMT2425-01-AK4.pdf", page: 5,
        title: "中场比分组合",
        translation: "Melissa 和 Sindi 错过了心仪球队的比赛。比赛以 3-3 结束。Sindi 说：\"不知道中场休息时比分是多少。\"Melissa 回答：\"总共有 □ 种可能。\"方框里应填多少？",
        options: ["9", "12", "14", "15", "16"],
        topics: ["pangu_count"],
        hint: "中场比分 (a,b)，0≤a≤3, 0≤b≤3。共 4×4=16 种。答案：e",
        answer: "e"
    },
    {
        id: "P2425O1_11", year: "2024/25", round: "初赛", num: 11, difficulty: 5,
        file: "盘古竞赛/PMT2425-01-AK4.pdf", page: 5,
        title: "数三角形和四边形",
        translation: "下图中有多少个三角形和多少个四边形？（需看 PDF 原图）",
        options: [
            "3 个三角形 3 个四边形",
            "6 个三角形 3 个四边形",
            "12 个三角形 3 个四边形",
            "6 个三角形 6 个四边形",
            "12 个三角形 6 个四边形"
        ],
        topics: ["pangu_count", "pangu_geom"],
        hint: "系统枚举：先数最小的，再数由 2 个、3 个……小图形组成的复合三角形/四边形",
        hasImage: true,
        answer: "a"
    },
    {
        id: "P2425O1_12", year: "2024/25", round: "初赛", num: 12, difficulty: 5,
        file: "盘古竞赛/PMT2425-01-AK4.pdf", page: 6,
        title: "沙漏测时间",
        translation: "Nina 有两个沙漏：小沙漏 5 分钟，大沙漏 7 分钟。开始时两个沙漏的沙都在下半部分。Nina 同时翻转两个沙漏。当小沙漏漏完时，她再翻转小沙漏。当大沙漏漏完时，Nina 翻转两个沙漏，然后等到小沙漏漏完。Nina 一共测量了多长时间？",
        options: ["9 分钟", "12 分钟", "14 分钟", "17 分钟", "19 分钟"],
        topics: ["pangu_logic"],
        hint: "画时间轴：t=0 翻转，t=5 翻小沙漏（大剩2），t=7 翻两个（小已用2剩3），继续等小沙漏漏完"
    },

    // ========== 2024/2025 决赛 ==========
    {
        id: "P2425F_1", year: "2024/25", round: "决赛", num: 1, difficulty: 3,
        file: "盘古竞赛/PMT2425-Final-AK4.pdf", page: 3,
        title: "24 立方体不能搭的长方体",
        translation: "下列哪个长方体不能用正好 24 个相同的小立方体搭成？（需看 PDF 原图）",
        options: ["A", "B", "C", "D", "E"],
        topics: ["pangu_solid"],
        hint: "24 的因数分解：1×1×24, 1×2×12, 1×3×8, 1×4×6, 2×2×6, 2×3×4。看图中哪个尺寸不能表示",
        hasImage: true
    },
    {
        id: "P2425F_2", year: "2024/25", round: "决赛", num: 2, difficulty: 3,
        file: "盘古竞赛/PMT2425-Final-AK4.pdf", page: 3,
        title: "数列下一项",
        translation: "数列下一个数是什么？（需看 PDF 原图）",
        options: ["160", "170", "180", "220", "240"],
        topics: ["pangu_pattern"],
        hint: "算相邻两数的差或比，找规律",
        hasImage: true
    },
    {
        id: "P2425F_3", year: "2024/25", round: "决赛", num: 3, difficulty: 3,
        file: "盘古竞赛/PMT2425-Final-AK4.pdf", page: 3,
        title: "乘法算式谜",
        translation: "用数字 1、2、5、6 和 9 填入下面的方框，使乘法算式成立。如果所有方框填对，紧跟在乘号后面的数字是几？（需看 PDF 原图）",
        options: ["1", "2", "5", "6", "9"],
        topics: ["pangu_puzzle"],
        hint: "读图向导：先看积的位数与首位数字，反推乘号两侧的量级；再从个位/末位试填。约束最强的位置（如进位/末位相乘的末位）先定。",
        hasImage: true
    },
    {
        id: "P2425F_4", year: "2024/25", round: "决赛", num: 4, difficulty: 3,
        file: "盘古竞赛/PMT2425-Final-AK4.pdf", page: 3,
        title: "Emilia 想的数",
        translation: "Emilia 想一个数。她把这个数乘以 6，然后加 25，得到 43。Emilia 想的是哪个数？",
        options: ["12", "5", "4", "3", "2"],
        topics: ["pangu_calc"],
        hint: "逆推：(43-25) ÷ 6 = 18 ÷ 6 = 3。答案：d",
        answer: "d"
    },
    {
        id: "P2425F_5", year: "2024/25", round: "决赛", num: 5, difficulty: 4,
        file: "盘古竞赛/PMT2425-Final-AK4.pdf", page: 4,
        title: "灰色三角形面积",
        translation: "灰色三角形的面积有多大？（单位：a.e. = 面积单位）（需看 PDF 原图）",
        options: ["8 a.e.", "9 a.e.", "10 a.e.", "11 a.e.", "12 a.e."],
        topics: ["pangu_geom"],
        hint: "用大图形面积减去周围空白部分，或用底×高÷2",
        hasImage: true
    },
    {
        id: "P2425F_6", year: "2024/25", round: "决赛", num: 6, difficulty: 4,
        file: "盘古竞赛/PMT2425-Final-AK4.pdf", page: 4,
        title: "马拉松所需时间",
        translation: "Elsie 跑迷你马拉松（2.1 公里）用了正好 8 分 45 秒。真正的马拉松是迷你马拉松的 20 倍长。如果 Elsie 能保持同样的配速，跑完真正的马拉松需要多长时间？",
        options: ["2 小时 49 分", "2 小时 59 分", "2 小时 53 分", "2 小时 55 分", "2 小时 57 分"],
        topics: ["pangu_app"],
        hint: "8 分 45 秒 × 20 = 175 分钟 = 2 小时 55 分。答案：d",
        answer: "d"
    },
    {
        id: "P2425F_7", year: "2024/25", round: "决赛", num: 7, difficulty: 4,
        file: "盘古竞赛/PMT2425-Final-AK4.pdf", page: 4,
        title: "骰子看不见面之和",
        translation: "骰子上相对两面数字之和为 7。图中显示三个骰子，每个骰子看到 3 个面上的数字。把所有看不见的面上的数字加起来，和是多少？（需看 PDF 原图）",
        options: ["32", "22", "34", "35", "36"],
        topics: ["pangu_solid"],
        hint: "每骰子六面之和 = 21，三个骰子总和 = 63。看见的数之和为 S，看不见的 = 63 - S",
        hasImage: true
    },
    {
        id: "P2425F_8", year: "2024/25", round: "决赛", num: 8, difficulty: 5,
        file: "盘古竞赛/PMT2425-Final-AK4.pdf", page: 5,
        title: "加法金字塔（10 层）",
        translation: "下面是两个加法金字塔，分别有 2 层和 3 层的基础石。如果按同样的规律继续，10 层基础石的加法金字塔顶部的数是多少？",
        options: ["400", "512", "800", "1024", "2048"],
        topics: ["pangu_pattern", "pangu_count"],
        hint: "n 层基础石的加法金字塔顶部为 2^(n-1) × 基数。观察 n=2, n=3 的规律推广",
        hasImage: true
    },
    {
        id: "P2425F_9", year: "2024/25", round: "决赛", num: 9, difficulty: 5,
        file: "盘古竞赛/PMT2425-Final-AK4.pdf", page: 5,
        title: "骰子展开图与圆",
        translation: "骰子展开图折叠成骰子时，边缘处形成多少个完整的圆形区域？（需看 PDF 原图）",
        options: ["0", "1", "2", "3", "4"],
        topics: ["pangu_solid"],
        hint: "展开图上跨越两个面的半圆，折叠后可能拼成完整圆",
        hasImage: true
    },
    {
        id: "P2425F_10", year: "2024/25", round: "决赛", num: 10, difficulty: 5,
        file: "盘古竞赛/PMT2425-Final-AK4.pdf", page: 5,
        title: "高速公路距离信息",
        translation: "Adam 沿高速公路开往 Ängelholm。沿途还有 Lagan、Ljungby 和 Örkeljunga。在不同时刻 Adam 看到路牌上的距离信息。13:42 时到 Ljungby 缺失的信息应该是多少？（需看 PDF 原图）",
        options: ["44 km", "54 km", "79 km", "95 km", "126 km"],
        topics: ["pangu_app"],
        hint: "用不同时刻的路牌算出速度，再推算 13:42 到 Ljungby 的距离",
        hasImage: true
    },

    // ========== 2025/2026 初赛 ==========
    {
        id: "P2526O1_1", year: "2025/26", round: "初赛", num: 1, difficulty: 1,
        file: "盘古竞赛/PMT2526-O1-AK4.pdf", page: 3,
        title: "加法转乘法",
        translation: "下面的加法对应哪个乘法？\n7 + 7 + 7 + 7 + 7 + 7 + 7 + 7 + 7 + 7",
        options: ["8 × 7", "9 × 7", "10 × 7", "11 × 7", "12 × 7"],
        topics: ["pangu_calc"],
        hint: "数一数一共几个 7。答案：c (10 个 7 相加)",
        answer: "c"
    },
    {
        id: "P2526O1_2", year: "2025/26", round: "初赛", num: 2, difficulty: 1,
        file: "盘古竞赛/PMT2526-O1-AK4.pdf", page: 3,
        title: "两个时钟间隔的秒数",
        translation: "两张图上是同一个时钟不同时刻的样子。两张图之间过去了多少秒？（需看 PDF 原图）",
        options: ["40 秒", "41 秒", "42 秒", "43 秒", "44 秒"],
        topics: ["pangu_time"],
        hint: "读图向导：读出两张钟面上秒针的角度差（每格 6°），差 = 经过的秒数。注意分针是否也走了一格。",
        hasImage: true
    },
    {
        id: "P2526O1_3", year: "2025/26", round: "初赛", num: 3, difficulty: 1,
        file: "盘古竞赛/PMT2526-O1-AK4.pdf", page: 3,
        title: "剩余面粉重量",
        translation: "你有 1 千克面粉，一个食谱只需要 580 克。袋子里还剩多少面粉？",
        options: ["320 克", "420 克", "520 克", "9420 克", "9520 克"],
        topics: ["pangu_calc"],
        hint: "1 千克 = 1000 克。1000 - 580 = 420 克。答案：b",
        answer: "b"
    },
    {
        id: "P2526O1_4", year: "2025/26", round: "初赛", num: 4, difficulty: 2,
        file: "盘古竞赛/PMT2526-O1-AK4.pdf", page: 3,
        title: "派对人数变化",
        translation: "派对上有 72 个孩子。14 点前有 13 个孩子回家，但 21 个新孩子到来。此时派对上有多少个孩子？",
        options: ["38", "70", "79", "80", "106"],
        topics: ["pangu_calc", "pangu_app"],
        hint: "72 - 13 + 21 = 80。答案：d",
        answer: "d"
    },
    {
        id: "P2526O1_5", year: "2025/26", round: "初赛", num: 5, difficulty: 2,
        file: "盘古竞赛/PMT2526-O1-AK4.pdf", page: 4,
        title: "加法金字塔缺失和",
        translation: "填加法金字塔，并算出所有缺失数字之和。（需看 PDF 原图）",
        options: ["58", "59", "60", "61", "62"],
        topics: ["pangu_puzzle"],
        hint: "从已知数向上或向下推：上面 = 下面相邻两数之和",
        hasImage: true
    },
    {
        id: "P2526O1_6", year: "2025/26", round: "初赛", num: 6, difficulty: 2,
        file: "盘古竞赛/PMT2526-O1-AK4.pdf", page: 4,
        title: "3 个儿子说各有 3 个姐妹",
        translation: "Fryxelius 家有几个孩子。三个儿子每人都说：\"我恰好有 3 个姐妹。\"Fryxelius 家一共有几个孩子？",
        options: ["3", "5", "6", "9", "12"],
        topics: ["pangu_logic"],
        hint: "每个儿子的\"姐妹\"是同一批女儿。3 个儿子 + 3 个女儿 = 6。答案：c",
        answer: "c"
    },
    {
        id: "P2526O1_7", year: "2025/26", round: "初赛", num: 7, difficulty: 3,
        file: "盘古竞赛/PMT2526-O1-AK4.pdf", page: 4,
        title: "街头音乐家（每天翻倍）",
        translation: "街头音乐家演奏 5 天，每天赚的钱是前一天的两倍。第一天赚 20 克朗。第五天结束后一共赚了多少钱？",
        options: ["40 克朗", "100 克朗", "180 克朗", "320 克朗", "620 克朗"],
        topics: ["pangu_pattern", "pangu_app"],
        hint: "20 + 40 + 80 + 160 + 320 = 620。答案：e（等比数列）",
        answer: "e"
    },
    {
        id: "P2526O1_8", year: "2025/26", round: "初赛", num: 8, difficulty: 3,
        file: "盘古竞赛/PMT2526-O1-AK4.pdf", page: 4,
        title: "结果总是 +100",
        translation: "图上有 4 个方框，每个包含不同的运算。哪个（些）方框符合陈述\"结果总是比原来大 100\"？（需看 PDF 原图）",
        options: ["只有 (1)", "只有 (2)", "(1) 和 (3)", "(2) 和 (3)", "只有 (4)"],
        topics: ["pangu_calc"],
        hint: "对每个运算测试几个具体的数，看结果差是否总是 100",
        hasImage: true
    },
    {
        id: "P2526O1_9", year: "2025/26", round: "初赛", num: 9, difficulty: 4,
        file: "盘古竞赛/PMT2526-O1-AK4.pdf", page: 5,
        title: "袋中球的可能与必然",
        translation: "袋中有 4 个蓝球和 1 个红球。你同时抽 2 个球。以下 6 个陈述中，有几个是正确的？\n• 可能抽到 2 个蓝球\n• 一定抽到 1 蓝 1 红\n• 不可能抽到 2 个红球\n• 一定至少有 1 个蓝球\n• 可能抽到两种颜色的球\n• 不可能只抽到 1 个蓝球",
        options: ["2", "3", "4", "5", "6"],
        topics: ["pangu_logic"],
        hint: "逐条判断可能/必然/不可能。红球只有 1 个，所以不可能 2 红；至少 1 蓝一定；只抽 1 蓝也是可能的（1 蓝 1 红）",
        answer: "a"
    },
    {
        id: "P2526O1_10", year: "2025/26", round: "初赛", num: 10, difficulty: 4,
        file: "盘古竞赛/PMT2526-O1-AK4.pdf", page: 5,
        title: "两个数的位数描述",
        translation: "想两个数：\n第一个数：\"我有 5 个十位和 1 个个位。我的百位数和十位数一样多，千位数是十位数的三倍。\"\n第二个数：\"我比 1332 的一半少 200。\"\n两个数的和是多少？",
        options: ["2517", "4217", "16017", "16117", "16683"],
        topics: ["pangu_number"],
        hint: "第一个数：个位1、十位5、百位5、千位=5×3=15，即 15000+500+50+1=15551。第二个数：1332÷2−200=466。和=16017。答案：c",
        answer: "c"
    },
    {
        id: "P2526O1_11", year: "2025/26", round: "初赛", num: 11, difficulty: 5,
        file: "盘古竞赛/PMT2526-O1-AK4.pdf", page: 5,
        title: "三位数减法最小差",
        translation: "用数字卡片摆出两个三位数，大数减小数（例如 596 − 123 = 473）。可能得到的最小差是多少？",
        options: ["644", "446", "21", "19", "16"],
        topics: ["pangu_puzzle", "pangu_number"],
        hint: "要让差最小，两个三位数应尽量接近。使用哪些数字卡片是关键（需看图中给定的数字）",
        hasImage: true
    },
    {
        id: "P2526O1_12", year: "2025/26", round: "初赛", num: 12, difficulty: 5,
        file: "盘古竞赛/PMT2526-O1-AK4.pdf", page: 6,
        title: "重叠图形数三角形",
        translation: "图中有几个几何图形相互重叠，图中一共有多少个三角形？（需看 PDF 原图）",
        options: ["10", "11", "12", "13", "14"],
        topics: ["pangu_count", "pangu_geom"],
        hint: "读图向导：先数最小的基础三角形，再数由 2 个 / 3 个基础三角形组成的复合三角形。用画笔按顶点标记逐个数不重不漏。",
        hasImage: true
    },

    // ========== 2025/2026 决赛 ==========
    {
        id: "P2526F_1", year: "2025/26", round: "决赛", num: 1, difficulty: 3,
        file: "盘古竞赛/Fragekatalog-Ak4-Final-PMT2526.pdf", page: 3,
        title: "足球运动员身高",
        translation: "一名足球运动员跳起头球，达到 293 厘米高度。跳起高度比他自己身高高 106 厘米。这位足球运动员多高？",
        options: ["183 cm", "187 cm", "189 cm", "193 cm", "197 cm"],
        topics: ["pangu_app"],
        hint: "身高 = 293 − 106 = 187 cm。答案：b",
        answer: "b"
    },
    {
        id: "P2526F_2", year: "2025/26", round: "决赛", num: 2, difficulty: 3,
        file: "盘古竞赛/Fragekatalog-Ak4-Final-PMT2526.pdf", page: 3,
        title: "Lukas 和 Maja 体重",
        translation: "Lukas 和他的妹妹 Maja 一起重 40 千克。Lukas 比 Maja 重 10 千克。Maja 多重？",
        options: ["10 kg", "15 kg", "20 kg", "25 kg", "30 kg"],
        topics: ["pangu_app"],
        hint: "和差问题：Maja = (40−10)÷2 = 15 kg。答案：b",
        answer: "b"
    },
    {
        id: "P2526F_3", year: "2025/26", round: "决赛", num: 3, difficulty: 3,
        file: "盘古竞赛/Fragekatalog-Ak4-Final-PMT2526.pdf", page: 3,
        title: "Mario 方格路径",
        translation: "Mario 按照方格纸上的箭头走。按照指令走完后，他的房子在哪里？（需看 PDF 原图）",
        options: ["A", "B", "C", "D", "E"],
        topics: ["pangu_geom"],
        hint: "读图向导：把每个箭头转成 (+dx, +dy)（右 +1x、下 +1y 等）。累加所有位移得到终点坐标，对照选项。",
        hasImage: true
    },
    {
        id: "P2526F_4", year: "2025/26", round: "决赛", num: 4, difficulty: 3,
        file: "盘古竞赛/Fragekatalog-Ak4-Final-PMT2526.pdf", page: 4,
        title: "3×3×3 立方体涂色",
        translation: "一个大立方体由 3×3×3 个相同的小立方体搭成。大立方体外表面涂成蓝色。有多少个小立方体满足以下条件之一：\n• 恰好一面被涂色，或\n• 一面都没涂？",
        options: ["6", "7", "8", "9", "10"],
        topics: ["pangu_solid"],
        hint: "恰好一面涂色的：每个面中心1块×6面=6块。一面都没涂的：正中心1块。总共7块。答案：b",
        answer: "b"
    },
    {
        id: "P2526F_5", year: "2025/26", round: "决赛", num: 5, difficulty: 4,
        file: "盘古竞赛/Fragekatalog-Ak4-Final-PMT2526.pdf", page: 4,
        title: "掉落的珠子数",
        translation: "珠子按照一定规则串在线上。线断了，一些珠子滚走了。缺了多少颗珠子？（需看 PDF 原图）",
        options: ["8", "9", "10", "14", "15"],
        topics: ["pangu_pattern"],
        hint: "找出重复模式（循环节），推算完整串珠数量，减去剩下的",
        hasImage: true
    },
    {
        id: "P2526F_6", year: "2025/26", round: "决赛", num: 6, difficulty: 4,
        file: "盘古竞赛/Fragekatalog-Ak4-Final-PMT2526.pdf", page: 5,
        title: "婴儿悬挂玩具平衡",
        translation: "一个婴儿悬挂玩具处于平衡状态。鱼重 5 克。狗形玩偶多重？（需看 PDF 原图）",
        options: ["10 g", "20 g", "30 g", "40 g", "50 g"],
        topics: ["pangu_app"],
        hint: "杠杆原理：左右两侧总重×臂长相等，或依据平衡关系逐层推导",
        hasImage: true
    },
    {
        id: "P2526F_7", year: "2025/26", round: "决赛", num: 7, difficulty: 4,
        file: "盘古竞赛/Fragekatalog-Ak4-Final-PMT2526.pdf", page: 5,
        title: "三人球衣号码之和",
        translation: "Alex、Ben 和 Gustav 订了新球衣，背后有号码。三个人给出线索：\n• Alex 说：\"Ben 和 Gustav 的号码之和是 17。\"\n• Ben 说：\"Alex 和 Gustav 的号码之和是 16。\"\n• Gustav 说：\"Alex 和 Ben 的号码之和是 15。\"\n三个人号码之和是多少？",
        options: ["24", "31", "32", "33", "48"],
        topics: ["pangu_logic", "pangu_app"],
        hint: "三个等式相加：2(A+B+G)=17+16+15=48，所以 A+B+G=24。答案：a",
        answer: "a"
    },
    {
        id: "P2526F_8", year: "2025/26", round: "决赛", num: 8, difficulty: 5,
        file: "盘古竞赛/Fragekatalog-Ak4-Final-PMT2526.pdf", page: 6,
        title: "青蛙跳台阶",
        translation: "青蛙坐在阶梯前，台阶编号 1 到 5。它想跳到第 5 级去吃蜘蛛。青蛙每次可以跳 1 级或 2 级，例如 1→3→5 或 2→3→4→5。一共有多少种不同的跳法序列？",
        options: ["3", "8", "9", "12", "13"],
        topics: ["pangu_count", "pangu_pattern"],
        hint: "斐波那契：f(n)=f(n-1)+f(n-2)。f(1)=1,f(2)=2,f(3)=3,f(4)=5,f(5)=8。答案：b",
        answer: "b"
    },
    {
        id: "P2526F_9", year: "2025/26", round: "决赛", num: 9, difficulty: 5,
        file: "盘古竞赛/Fragekatalog-Ak4-Final-PMT2526.pdf", page: 6,
        title: "5×5 拉丁方（含对角线）",
        translation: "填入空白方格，使 1 到 5 在每行、每列和每条对角线上都恰好出现一次。问号处应填什么数？（需看 PDF 原图）",
        options: ["1", "2", "3", "4", "5"],
        topics: ["pangu_puzzle", "pangu_logic"],
        hint: "利用行、列、对角线的约束，逐格排除",
        hasImage: true
    },
    {
        id: "P2526F_10", year: "2025/26", round: "决赛", num: 10, difficulty: 5,
        file: "盘古竞赛/Fragekatalog-Ak4-Final-PMT2526.pdf", page: 7,
        title: "26 学生同生日（鸽巢原理）",
        translation: "生日问题：一个班有 26 个学生。所有学生都在一周中的某一天出生。至少可以确定有多少个学生的生日在一周的同一天？",
        options: ["26", "13", "7", "6", "4"],
        topics: ["pangu_logic"],
        hint: "鸽巢原理：26 ÷ 7 = 3 余 5，至少有一个星期几出现 ⌈26/7⌉ = 4 次。答案：e",
        answer: "e"
    },

    // ========== 2015/2016 初赛 (Omgång 1) ==========
    { id: "P1516O1_1", year: "2015/16", round: "初赛", num: 1, difficulty: 1, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k4-PMT16_O1.pdf", page: 3, title: "乘法基础 8×9", translation: "计算 8 × 9 = ?", options: ["64", "72", "81", "63", "70"], topics: ["pangu_calc"], hint: "8×9=72。答案：b", answer: "b" },
    { id: "P1516O1_2", year: "2015/16", round: "初赛", num: 2, difficulty: 1, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k4-PMT16_O1.pdf", page: 3, title: "补全 3×3 方格", translation: "把右图补成由 9 个小正方形组成的大正方形，需要多少根火柴？", options: ["4", "6", "8", "10", "12"], topics: ["pangu_geom", "pangu_count"], hint: "完整 3×3 方格共 24 根火柴，数出已有几根再算差值", hasImage: true },
    { id: "P1516O1_3", year: "2015/16", round: "初赛", num: 3, difficulty: 1, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k4-PMT16_O1.pdf", page: 3, title: "逆推谜题", translation: "谜题：如果我把我的数加 270，再除以 5，再减 70，结果是 30。我的数是多少？", options: ["320", "300", "270", "250", "230"], topics: ["pangu_calc"], hint: "逆推：(30+70)×5-270 = 500-270 = 230。答案：e", answer: "e" },
    { id: "P1516O1_4", year: "2015/16", round: "初赛", num: 4, difficulty: 2, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k4-PMT16_O1.pdf", page: 3, title: "Max 的球", translation: "Max 有蓝色、红色和绿色球。一半的球是蓝色，2 个红色，4 个绿色。Max 一共有多少个球？", options: ["6", "8", "10", "12", "20"], topics: ["pangu_app"], hint: "非蓝=6个占一半，所以总数=12。答案：d", answer: "d" },
    { id: "P1516O1_5", year: "2015/16", round: "初赛", num: 5, difficulty: 2, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k4-PMT16_O1.pdf", page: 3, title: "自指题：字母 r 出现次数", translation: "在这道题及其所有选项中，字母 r 一共出现多少次？", options: ["fem gånger (5次)", "sju gånger (7次)", "tio gånger (10次)", "fjorton gånger (14次)", "femton gånger (15次)"], topics: ["pangu_logic"], hint: "自指题：需要数题干+每个选项中所有字母 r。答案取决于哪一选项被选后总数与该选项自身相符", hasImage: false },
    { id: "P1516O1_6", year: "2015/16", round: "初赛", num: 6, difficulty: 2, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k4-PMT16_O1.pdf", page: 3, title: "6,7,8,9 组两个两位数求最大和", translation: "用数字 6、7、8、9 各一次填入方框，形成两个两位数相加。求可能的最大和。□□ + □□", options: ["183", "174", "173", "147", "30"], topics: ["pangu_puzzle", "pangu_number"], hint: "让十位放大数字：(9+8)×10 + (7+6) = 170+13 = 183。答案：a", answer: "a" },
    { id: "P1516O1_7", year: "2015/16", round: "初赛", num: 7, difficulty: 3, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k4-PMT16_O1.pdf", page: 4, title: "加法十字", translation: "加法十字例：6+7=13、4+5=9、6+4=10、7+5=12。给出的十字缺 4 个数，问色格里的数是多少？", options: ["4", "6", "8", "10", "12"], topics: ["pangu_puzzle"], hint: "按行列关系反推缺失数字", hasImage: true },
    { id: "P1516O1_8", year: "2015/16", round: "初赛", num: 8, difficulty: 3, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k4-PMT16_O1.pdf", page: 4, title: "队伍人数（陷阱题）", translation: "Mikael 在电影院前排队。前面有 4 个人，后面有 5 个人。队里总共有多少人？", options: ["5", "6", "8", "9", "10"], topics: ["pangu_logic"], hint: "别忘了 Mikael 本人：4+5+1 = 10。答案：e", answer: "e" },
    { id: "P1516O1_9", year: "2015/16", round: "初赛", num: 9, difficulty: 3, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k4-PMT16_O1.pdf", page: 4, title: "灰色和黑色汽车", translation: "停车场共 35 辆新车，灰色或黑色。黑色车是灰色车的 6 倍。灰色车有几辆？", options: ["5", "6", "7", "24", "30"], topics: ["pangu_app"], hint: "灰车 x，则 x + 6x = 7x = 35，x = 5。答案：a", answer: "a" },
    { id: "P1516O1_10", year: "2015/16", round: "初赛", num: 10, difficulty: 4, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k4-PMT16_O1.pdf", page: 4, title: "数列 2,4,12,48", translation: "找规律：2, 4, 12, 48, ? ", options: ["60", "72", "100", "240", "无规律"], topics: ["pangu_pattern"], hint: "乘 2, 3, 4, 下一步乘 5：48×5 = 240。答案：d", answer: "d" },
    { id: "P1516O1_11", year: "2015/16", round: "初赛", num: 11, difficulty: 4, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k4-PMT16_O1.pdf", page: 4, title: "补全立方体缺多少块", translation: "图形由 20 个小立方体组成。要补成一个完整的大立方体，还缺多少个小立方体？", options: ["42", "44", "46", "48", "51"], topics: ["pangu_solid", "pangu_count"], hint: "大立方体为 4×4×4=64（推测），64-20=44。答案：b", hasImage: true, answer: "b" },
    { id: "P1516O1_12", year: "2015/16", round: "初赛", num: 12, difficulty: 4, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k4-PMT16_O1.pdf", page: 5, title: "识别模式：4 个缺失数之和", translation: "识别图形规律，求 4 个缺失数字之和是多少？", options: ["20", "22", "30", "32", "42"], topics: ["pangu_pattern", "pangu_puzzle"], hint: "先识别整体规律，再逐个填空", hasImage: true },
    { id: "P1516O1_13", year: "2015/16", round: "初赛", num: 13, difficulty: 5, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k4-PMT16_O1.pdf", page: 5, title: "六边形灰色比例", translation: "在四个六边形中，灰色部分占整个六边形的比例最大的是哪一个？", options: ["A", "B", "C", "D", "全部相等"], topics: ["pangu_geom"], hint: "比较各图灰色区块与整体的面积比。选项 e 常见诱答。", hasImage: true },
    { id: "P1516O1_14", year: "2015/16", round: "初赛", num: 14, difficulty: 5, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k4-PMT16_O1.pdf", page: 5, title: "6 色循环第 27 个", translation: "Hannah 按 蓝 黄 红 白 绿 橙 循环排放矩形。第 27 个是什么颜色？", options: ["蓝", "黄", "红", "白", "橙"], topics: ["pangu_pattern"], hint: "27÷6=4余3，第 3 个是红色。答案：c", answer: "c" },
    { id: "P1516O1_15", year: "2015/16", round: "初赛", num: 15, difficulty: 5, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k4-PMT16_O1.pdf", page: 5, title: "五人赛跑顺序", translation: "Lisa 比 Erik 晚 10 米过线，Erik 比 Ron 早 20 米。Ron 比 Anna 晚 5 米，Ron 比 Daniella 晚 25 米。四人过线顺序（首→末）是？", options: ["RALED", "DALER", "LERAD", "DELAR", "LADER"], topics: ["pangu_logic"], hint: "以 Ron 为基准：D 早 25、A 早 5、E 早 20、L 早 10 → D,E,L,A,R,即 DELAR。答案：d", answer: "d" },

    // ========== 2015/2016 复赛 (Omgång 2) ==========
    { id: "P1516O2_1", year: "2015/16", round: "复赛", num: 1, difficulty: 2, file: "盘古竞赛/O2-ü0ç3k4-PMT16.pdf", page: 3, title: "幻方求 A", translation: "右图是幻方，每行、每列、每对角线之和都等于 18。求 A 是多少？", options: ["1", "3", "5", "7", "9"], topics: ["pangu_puzzle"], hint: "利用行列和为 18 反推。答案取决于其他已知位置", hasImage: true },
    { id: "P1516O2_2", year: "2015/16", round: "复赛", num: 2, difficulty: 2, file: "盘古竞赛/O2-ü0ç3k4-PMT16.pdf", page: 3, title: "找出不同的图", translation: "以下哪一个图形与其他不一样？", options: ["A", "B", "C", "D", "E"], topics: ["pangu_geom", "pangu_logic"], hint: "观察对称性、颜色、形状的差别", hasImage: true },
    { id: "P1516O2_3", year: "2015/16", round: "复赛", num: 3, difficulty: 2, file: "盘古竞赛/O2-ü0ç3k4-PMT16.pdf", page: 3, title: "算式谜：图形替换", translation: "将图形替换为哪个数字使等式成立？", options: ["2", "3", "4", "6", "8"], topics: ["pangu_puzzle"], hint: "读图向导：从进位约束最强的位置入手（如末位）。设未知数字为变量，逐步缩小候选。", hasImage: true },
    { id: "P1516O2_4", year: "2015/16", round: "复赛", num: 4, difficulty: 3, file: "盘古竞赛/O2-ü0ç3k4-PMT16.pdf", page: 3, title: "牛奶杯重量", translation: "装满牛奶的杯子重 370 克。倒到一半后总重 290 克。空杯多重？", options: ["80 克", "100 克", "160 克", "180 克", "210 克"], topics: ["pangu_app"], hint: "一半牛奶重 370-290=80 克，满杯牛奶 160 克，空杯 370-160=210。答案：e", answer: "e" },
    { id: "P1516O2_5", year: "2015/16", round: "复赛", num: 5, difficulty: 3, file: "盘古竞赛/O2-ü0ç3k4-PMT16.pdf", page: 3, title: "从 29 数到 99", translation: "从 29 数到 99，每个数用 1 秒。总共用多少时间？", options: ["1分9秒", "1分10秒", "1分11秒", "1分12秒", "1分19秒"], topics: ["pangu_calc", "pangu_count"], hint: "数字个数 = 99-29+1 = 71 秒 = 1 分 11 秒。答案：c", answer: "c" },
    { id: "P1516O2_6", year: "2015/16", round: "复赛", num: 6, difficulty: 3, file: "盘古竞赛/O2-ü0ç3k4-PMT16.pdf", page: 3, title: "Denis、Erik、William 弹珠", translation: "Denis 比 Erik 多 24 个弹珠，William 比 Erik 少 24 个。Erik 有 71 个。三人共有几个？", options: ["211", "213", "215", "217", "219"], topics: ["pangu_app"], hint: "总数 = 71×3 = 213（多的+少的正好互相抵消）。答案：b", answer: "b" },
    { id: "P1516O2_7", year: "2015/16", round: "复赛", num: 7, difficulty: 4, file: "盘古竞赛/O2-ü0ç3k4-PMT16.pdf", page: 4, title: "5×5×5 大立方体可见小方块", translation: "大立方体由 5×5×5 = 125 个小立方体组成。从图中的角度能看到多少个小立方体？", options: ["61", "72", "75", "95", "100"], topics: ["pangu_solid"], hint: "三面视角：25+25+25-5-5-5+1 = 61。答案：a", hasImage: true, answer: "a" },
    { id: "P1516O2_8", year: "2015/16", round: "复赛", num: 8, difficulty: 4, file: "盘古竞赛/O2-ü0ç3k4-PMT16.pdf", page: 4, title: "数轴 A 值", translation: "尺子上 A 的位置对应哪个数？（已知刻度 4.1、4.2 附近）", options: ["3.08", "3.8", "4.0", "4.08", "4.5"], topics: ["pangu_number"], hint: "读图判断 A 所在刻度", hasImage: true },
    { id: "P1516O2_9", year: "2015/16", round: "复赛", num: 9, difficulty: 4, file: "盘古竞赛/O2-ü0ç3k4-PMT16.pdf", page: 4, title: "102 个球分给 7 个孩子", translation: "袋里 102 个球，要平均分给 7 个孩子。要再放几个球才能刚好平均分？", options: ["1", "2", "3", "4", "5"], topics: ["pangu_calc"], hint: "102÷7=14余4，下一个 7 的倍数是 105，需再加 3。答案：c", answer: "c" },
    { id: "P1516O2_10", year: "2015/16", round: "复赛", num: 10, difficulty: 4, file: "盘古竞赛/O2-ü0ç3k4-PMT16.pdf", page: 4, title: "蚂蚁绕图一圈", translation: "蚂蚁绕图形一圈，共走多少米？（图中标 8 米和 3 米）", options: ["11 米", "19 米", "22 米", "24 米", "29 米"], topics: ["pangu_geom", "pangu_app"], hint: "看图算周长（可能是 L 形）", hasImage: true },
    { id: "P1516O2_11", year: "2015/16", round: "复赛", num: 11, difficulty: 5, file: "盘古竞赛/O2-ü0ç3k4-PMT16.pdf", page: 5, title: "5 个立方体棱长和", translation: "要做 5 个相同大小的立方体棱框，需要 300 米的杆。每条棱多长？", options: ["4 米", "5 米", "6 米", "7 米", "8 米"], topics: ["pangu_solid"], hint: "每立方体 12 条棱：300 ÷ 5 ÷ 12 = 5。答案：b", answer: "b" },
    { id: "P1516O2_12", year: "2015/16", round: "复赛", num: 12, difficulty: 5, file: "盘古竞赛/O2-ü0ç3k4-PMT16.pdf", page: 5, title: "绳绕挂钩长度", translation: "两个框架之间绷紧一条绳。每个框架挂 5 个钩子，钩子间距 50 厘米。两框架相距 4 米。求绳的总长。", options: ["18 米", "18.5 米", "20 米", "21.5 米", "22 米"], topics: ["pangu_geom", "pangu_app"], hint: "绳来回穿梭：9 段横向×4 米 = 36 米？依据钩子实际穿绳方式（通常为 Z 字），请结合图判断。", hasImage: true },

    // ========== 2015/2016 决赛 (Final) ==========
    { id: "P1516F_1", year: "2015/16", round: "决赛", num: 1, difficulty: 3, file: "盘古竞赛/Final-ü0ç3k4-PMT16-v2.pdf", page: 3, title: "两数的商", translation: "求两个数的商（题目需要看 PDF 原图中的两个数）？", options: ["4175", "167", "835", "334", "1670"], topics: ["pangu_calc"], hint: "读图向导：从 PDF 找到题目中的两个数，作除法。", hasImage: true },
    { id: "P1516F_2", year: "2015/16", round: "决赛", num: 2, difficulty: 3, file: "盘古竞赛/Final-ü0ç3k4-PMT16-v2.pdf", page: 3, title: "等差数列第 100 项", translation: "Selma 研究数列：6, 11, 16, 21, 26, …。第 100 项是多少？", options: ["600", "502", "500", "602", "501"], topics: ["pangu_pattern"], hint: "首项 6，公差 5，第 100 项 = 6 + 99×5 = 501。答案：e", answer: "e" },
    { id: "P1516F_3", year: "2015/16", round: "决赛", num: 3, difficulty: 3, file: "盘古竞赛/Final-ü0ç3k4-PMT16-v2.pdf", page: 3, title: "四位数密码最多尝试次数", translation: "保险柜密码是 4 位数，已知含数字 3、5、7、9，但不知顺序。最多试多少次一定能打开？", options: ["4", "8", "16", "24", "30"], topics: ["pangu_count"], hint: "4 个不同数字全排列 = 4! = 24。答案：d", answer: "d" },
    { id: "P1516F_4", year: "2015/16", round: "决赛", num: 4, difficulty: 3, file: "盘古竞赛/Final-ü0ç3k4-PMT16-v2.pdf", page: 3, title: "100 小时后是几点", translation: "钟现在显示 10:00。100 小时后钟显示几点？", options: ["11:00", "12:00", "13:00", "14:00", "15:00"], topics: ["pangu_time"], hint: "100 mod 24 = 4。10:00 + 4 小时 = 14:00。答案：d", answer: "d" },
    { id: "P1516F_5", year: "2015/16", round: "决赛", num: 5, difficulty: 3, file: "盘古竞赛/Final-ü0ç3k4-PMT16-v2.pdf", page: 3, title: "彩色拼块覆盖", translation: "Lena 有许多彩色图块。她把它们尽量摆入图中的方格里。有多少方格保持空着？", options: ["4", "3", "2", "1", "0"], topics: ["pangu_geom"], hint: "读图向导：数总格子数，再看每种拼块占几格。用面积除法估计上限，再逐个试拼。", hasImage: true },
    { id: "P1516F_6", year: "2015/16", round: "决赛", num: 6, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k4-PMT16-v2.pdf", page: 4, title: "906 盒牛奶分装", translation: "906 盒牛奶要装入每箱 12 盒的箱子。需要多少箱？", options: ["76", "75", "74", "69", "68"], topics: ["pangu_calc", "pangu_app"], hint: "906÷12 = 75.5，需向上取整 76。答案：a", answer: "a" },
    { id: "P1516F_7", year: "2015/16", round: "决赛", num: 7, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k4-PMT16-v2.pdf", page: 4, title: "拳击比赛总时长", translation: "拳击比赛 12 回合，每回合 3 分钟，回合间休息 1 分钟。全场共多少分钟？", options: ["48 分", "47 分", "46 分", "37 分", "36 分"], topics: ["pangu_app", "pangu_time"], hint: "12×3 + 11×1 = 36+11 = 47 分。答案：b", answer: "b" },
    { id: "P1516F_8", year: "2015/16", round: "决赛", num: 8, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k4-PMT16-v2.pdf", page: 4, title: "300~400 中数字 3 出现次数", translation: "Hande 写下从 300 到 400 的所有数。数字 3 出现多少次？", options: ["101", "102", "110", "120", "122"], topics: ["pangu_count", "pangu_number"], hint: "百位 3 有 100 次(300-399)，十位 3 有 10 次(330-339)，个位 3 有 10 次。共 120。答案：d", answer: "d" },
    { id: "P1516F_9", year: "2015/16", round: "决赛", num: 9, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k4-PMT16-v2.pdf", page: 4, title: "骰子滚动顶面数字", translation: "骰子相对面之和为 7。骰子按图示滚动，问 X 位置时顶面是几？", options: ["2", "3", "4", "5", "6"], topics: ["pangu_solid"], hint: "读图向导：立方体对面之和恒为 7。展开图折叠时可先固定一面为底、追踪相邻关系；三视图题分层扫描每一层的方块数。", hasImage: true },
    { id: "P1516F_10", year: "2015/16", round: "决赛", num: 10, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k4-PMT16-v2.pdf", page: 4, title: "A 到 B 的路径数", translation: "从 A 点走到 B 点，按图上箭头方向走，共有多少种走法？", options: ["9", "10", "11", "12", "13"], topics: ["pangu_count"], hint: "读图向导：从终点回推更快 —— 每个格子的走法 = 上邻 + 左邻（无回头方向时）。或系统列出每条路径。", hasImage: true },
    { id: "P1516F_11", year: "2015/16", round: "决赛", num: 11, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k4-PMT16-v2.pdf", page: 5, title: "立方体三视图找字母", translation: "立方体 6 面写有不同字母。图中显示 3 个视角。阴影面上写的是哪个字母？", options: ["T", "P", "X", "E", "V"], topics: ["pangu_solid"], hint: "读图向导：分别读出正视 / 侧视 / 顶视三张图，对应立体结构逐层放方块，注意\"多个方块共用同一列\"造成的错位。", hasImage: true },
    { id: "P1516F_12", year: "2015/16", round: "决赛", num: 12, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k4-PMT16-v2.pdf", page: 5, title: "展开图边匹配", translation: "立方体展开图中，边 A、B、C 折叠后各与 1-8 中的哪条边相接？A 和 C 相接的边号之和是多少？", options: ["3", "4", "5", "6", "8"], topics: ["pangu_solid"], hint: "折叠模拟：追踪展开图相邻关系", hasImage: true },
    { id: "P1516F_13", year: "2015/16", round: "决赛", num: 13, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k4-PMT16-v2.pdf", page: 5, title: "锯木头分段", translation: "把树干锯成 4 段用 12 分钟。如果锯成 5 段，要多少分钟？", options: ["18 分", "17 分", "16 分", "15 分", "14 分"], topics: ["pangu_logic", "pangu_app"], hint: "4 段需 3 刀 12 分钟 → 每刀 4 分钟。5 段需 4 刀 = 16 分钟。答案：c", answer: "c" },
    { id: "P1516F_14", year: "2015/16", round: "决赛", num: 14, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k4-PMT16-v2.pdf", page: 5, title: "三角形数字规律 A+B", translation: "下方三角形按某规律填数，求 A+B 的值。", options: ["11", "10", "9", "8", "7"], topics: ["pangu_pattern", "pangu_puzzle"], hint: "读图向导：分层数（先数最小的基础三角形；再数由 2 个 / 4 个组成的复合三角形；最后加起来）。注意正立和倒立分开数。", hasImage: true },
    { id: "P1516F_15", year: "2015/16", round: "决赛", num: 15, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k4-PMT16-v2.pdf", page: 6, title: "卡车玉米盘数", translation: "满载玉米棒的卡车重 4653 千克，空车 2583 千克。每个货盘的玉米棒共 90000 克。车上装了多少货盘？", options: ["19", "20", "21", "22", "23"], topics: ["pangu_app", "pangu_calc"], hint: "货物 = 4653-2583 = 2070 千克 = 2070000 克，÷ 90000 = 23。答案：e", answer: "e" },

    // ========== 2021/2022 初赛 ==========
    { id: "P2122O1_1", year: "2021/22", round: "初赛", num: 1, difficulty: 1, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2122.pdf", page: 3, title: "柠檬和牛油果", translation: "Kevin 买一个柠檬和一个牛油果，共 40 克朗。牛油果比柠檬贵 30 克朗。柠檬多少钱？", options: ["5 克朗", "10 克朗", "15 克朗", "30 克朗", "35 克朗"], topics: ["pangu_app"], hint: "和差问题：柠檬 = (40-30)÷2 = 5。答案：a", answer: "a" },
    { id: "P2122O1_2", year: "2021/22", round: "初赛", num: 2, difficulty: 1, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2122.pdf", page: 3, title: "撕掉的书页", translation: "书里撕掉了两张对页。问号处的页码是什么？", options: ["55", "56", "57", "58", "59"], topics: ["pangu_number"], hint: "读图向导：书本页码前后连续、两面对页页码差 1。观察缺页周围的可见页码找规律。", hasImage: true },
    { id: "P2122O1_3", year: "2021/22", round: "初赛", num: 3, difficulty: 1, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2122.pdf", page: 3, title: "第 5 图有几个点", translation: "图 5 有多少个圆点？（点阵按某规律递增）", options: ["14", "15", "17", "18", "21"], topics: ["pangu_pattern"], hint: "读图向导：算前几张图的点数序列，找相邻差（等差）或相邻比（等比），推出第 n 张的通项。", hasImage: true },
    { id: "P2122O1_4", year: "2021/22", round: "初赛", num: 4, difficulty: 2, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2122.pdf", page: 3, title: "太阳后面的数字", translation: "太阳挡住的数字是几？2■4 × 3 = 642", options: ["0", "1", "2", "3", "4"], topics: ["pangu_puzzle"], hint: "642 ÷ 3 = 214，被挡住的是 1。答案：b", answer: "b" },
    { id: "P2122O1_5", year: "2021/22", round: "初赛", num: 5, difficulty: 2, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2122.pdf", page: 4, title: "三方程求 ♥+♦−♠", translation: "已知：6+♥=14，♥−♦=5，♦·?=6。求 ♥+♦−? 的值。（原题符号含图形）", options: ["5", "6", "7", "8", "9"], topics: ["pangu_puzzle", "pangu_calc"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true },
    { id: "P2122O1_6", year: "2021/22", round: "初赛", num: 6, difficulty: 2, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2122.pdf", page: 4, title: "5 队循环赛场次", translation: "5 支足球队循环赛，每两队打一场。总共几场？", options: ["5", "10", "15", "20", "25"], topics: ["pangu_count"], hint: "组合 C(5,2) = 10。答案：b", answer: "b" },
    { id: "P2122O1_7", year: "2021/22", round: "初赛", num: 7, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2122.pdf", page: 4, title: "6 人赛跑名次推理", translation: "6 个孩子赛跑：Ella 第 3；Saga 在 Lucas 之后、Ronja 之前；Aylin 第 1；Fabian 在 Saga 之后但不最后。第 4 名是谁？", options: ["Saga", "Ronja", "Lucas", "Aylin", "Fabian"], topics: ["pangu_logic"], hint: "排序：Aylin,?,Ella,Saga,Fabian,Ronja。第 4 是 Saga。答案：a", answer: "a" },
    { id: "P2122O1_8", year: "2021/22", round: "初赛", num: 8, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2122.pdf", page: 5, title: "三视图匹配立方体结构", translation: "根据前视、侧视、顶视图，判断哪个立方体结构符合三视图？", options: ["A", "B", "C", "D", "E"], topics: ["pangu_solid"], hint: "读图向导：分别读出正视 / 侧视 / 顶视三张图，对应立体结构逐层放方块，注意\"多个方块共用同一列\"造成的错位。", hasImage: true },
    { id: "P2122O1_9", year: "2021/22", round: "初赛", num: 9, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2122.pdf", page: 5, title: "书页共用 264 个数字", translation: "一本书页码用数字编号，一共用了 264 个数字。这本书有多少页？", options: ["100", "124", "132", "189", "264"], topics: ["pangu_count", "pangu_number"], hint: "1-9 用 9 个，10-99 用 180 个，剩 75 个用于三位数(每页 3 个)：75÷3=25 页。总共 99+25=124。答案：b", answer: "b" },
    { id: "P2122O1_10", year: "2021/22", round: "初赛", num: 10, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2122.pdf", page: 5, title: "公车下下辆到站", translation: "现在 14:42，上一趟公车 5 分钟前发车（晚点 3 分钟），下一趟 14:50 发车。下下趟几点？", options: ["14:55", "14:58", "15:00", "15:05", "15:06"], topics: ["pangu_time", "pangu_logic"], hint: "上趟按点应 14:34，下一趟 14:50，间隔 16 分。下下趟 = 14:50+16 = 15:06。答案：e", answer: "e" },
    { id: "P2122O1_11", year: "2021/22", round: "初赛", num: 11, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2122.pdf", page: 6, title: "5 个水龙头蓄水", translation: "2 个水龙头 45 分钟灌满水池。如果用 5 个水龙头，需多少分钟？", options: ["10 分", "12 分", "15 分", "16 分", "18 分"], topics: ["pangu_app"], hint: "反比：45×2÷5 = 18 分。答案：e", answer: "e" },
    { id: "P2122O1_12", year: "2021/22", round: "初赛", num: 12, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2122.pdf", page: 6, title: "四位数末尾 0 抹掉", translation: "Fatima 想一个四位数，末位是 0。抹掉这个 0 得到一个三位数。两数之和是 1903。求两数之差。", options: ["997", "1337", "1557", "1777", "无解"], topics: ["pangu_number", "pangu_puzzle"], hint: "设三位数为 x，则 10x + x = 11x = 1903。1903÷11 不整除 → 无解。答案：e", answer: "e" },

    // ========== 2022/2023 初赛 ==========
    { id: "P2223O1_1", year: "2022/23", round: "初赛", num: 1, difficulty: 1, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2223.pdf", page: 3, title: "等式填数", translation: "使等式成立：4 + 7 = □ + 6，□ 是多少？", options: ["11", "10", "7", "6", "5"], topics: ["pangu_calc"], hint: "11 = □+6 → □=5。答案：e", answer: "e" },
    { id: "P2223O1_2", year: "2022/23", round: "初赛", num: 2, difficulty: 1, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2223.pdf", page: 3, title: "乘法 8×7", translation: "计算 8 × 7 = ?", options: ["48", "54", "56", "64", "72"], topics: ["pangu_calc"], hint: "8×7=56。答案：c", answer: "c" },
    { id: "P2223O1_3", year: "2022/23", round: "初赛", num: 3, difficulty: 1, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2223.pdf", page: 3, title: "太阳挡的数字", translation: "找规律：1, 4, 7, 10, ■, 16, 19, ... 太阳挡住的数是几？", options: ["11", "12", "13", "14", "15"], topics: ["pangu_pattern"], hint: "等差数列，公差 3。13。答案：c", answer: "c" },
    { id: "P2223O1_4", year: "2022/23", round: "初赛", num: 4, difficulty: 2, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2223.pdf", page: 3, title: "火车行驶时间", translation: "火车 06:31 从 Malmö 出发，08:19 到达 Göteborg。行程多长？", options: ["1时8分", "1时28分", "1时38分", "1时48分", "2时12分"], topics: ["pangu_time"], hint: "8:19-6:31 = 1 小时 48 分。答案：d", answer: "d" },
    { id: "P2223O1_5", year: "2022/23", round: "初赛", num: 5, difficulty: 2, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2223.pdf", page: 3, title: "5 km + 200 m 换算", translation: "5 km 加 200 m 一共多少米？", options: ["5200 米", "2600 米", "2500 米", "700 米", "520 米"], topics: ["pangu_calc"], hint: "5000+200=5200。答案：a", answer: "a" },
    { id: "P2223O1_6", year: "2022/23", round: "初赛", num: 6, difficulty: 2, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2223.pdf", page: 4, title: "填空求缺失数字之和", translation: "填补方框中缺失的数字，求所有缺失数字之和。", options: ["10", "13", "15", "20", "25"], topics: ["pangu_puzzle"], hint: "读图向导：从进位约束最强的位置入手（如末位）。设未知数字为变量，逐步缩小候选。", hasImage: true, answer: "b" },
    { id: "P2223O1_7", year: "2022/23", round: "初赛", num: 7, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2223.pdf", page: 4, title: "8 硬币摆 503", translation: "Anna 用 8 个硬币按图示摆出数字 503。她的朋友 Lisa 移动一个硬币到另一个位置。Lisa 无法摆出下面哪个数？", options: ["404", "413", "512", "521", "602"], topics: ["pangu_puzzle", "pangu_number"], hint: "读图向导：先枚举所有可能的移动位置，判断结果是否满足约束。通常一步就能完成。", hasImage: true, answer: "d" },
    { id: "P2223O1_8", year: "2022/23", round: "初赛", num: 8, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2223.pdf", page: 4, title: "骑士加盔甲的体重", translation: "Birger Jarl 的盔甲重 19 kg。他自己比盔甲重 61 kg。他穿上盔甲总共多重？", options: ["52 kg", "80 kg", "99 kg", "109 kg", "118 kg"], topics: ["pangu_app"], hint: "骑士本身 19+61=80 kg，穿上盔甲 80+19=99 kg。答案：c", answer: "c" },
    { id: "P2223O1_9", year: "2022/23", round: "初赛", num: 9, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2223.pdf", page: 5, title: "图中数正方形（含大小）", translation: "图中一共有多少个正方形？（含大小）", options: ["9", "11", "13", "14", "10"], topics: ["pangu_count", "pangu_geom"], hint: "读图向导：按边长分类枚举（先数 1×1，再 2×2，再 3×3…），最后求和。注意斜置正方形不要漏。", hasImage: true, answer: "d" },
    { id: "P2223O1_10", year: "2022/23", round: "初赛", num: 10, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2223.pdf", page: 5, title: "跳远颁奖第三名", translation: "跳远颁奖：Anna 跳得比 Bea 远但不比 Christian 远。Doris 只比 Ella 远。Christian 比 Fredrik 少 1cm。Ella 不比 Bea 远。谁获第三？", options: ["Anna", "Bea", "Christian", "Doris", "Ella"], topics: ["pangu_logic"], hint: "推排序 Fredrik>Christian>Anna>Bea>Doris>Ella，第 3 名是 Anna。答案：a", answer: "a" },
    { id: "P2223O1_11", year: "2022/23", round: "初赛", num: 11, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2223.pdf", page: 5, title: "滑雪运动员 1 小时呼吸次数", translation: "滑雪运动员静息状态每分钟 15 次呼吸。1 小时呼吸多少次？", options: ["900", "750", "600", "90", "75"], topics: ["pangu_calc", "pangu_app"], hint: "15 × 60 = 900。答案：a", answer: "a" },
    { id: "P2223O1_12", year: "2022/23", round: "初赛", num: 12, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2223.pdf", page: 6, title: "图形放大 2 倍的格数", translation: "Alice 在方格纸上画一个图。放大后每边是原来的 2 倍。放大图占多少方格？", options: ["30", "60", "90", "100", "120"], topics: ["pangu_geom"], hint: "线性 2 倍 → 面积 4 倍。原图格数看图后 ×4。答案取决于原图", hasImage: true, answer: "e" },

    // ========== 2022/2023 决赛 ==========
    { id: "P2223F_1", year: "2022/23", round: "决赛", num: 1, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak4-Final-PMT2223.pdf", page: 3, title: "灰色区域占比最大的正方形", translation: "哪一个正方形的灰色区域占整体面积的比例最大？", options: ["A", "B", "C", "D", "都一样"], topics: ["pangu_geom"], hint: "读图向导：用\"整体面积 − 空白面积\"更快；或把阴影分解成矩形 / 三角形之和。若图形对称，可只算 1/2 或 1/4 再乘。", hasImage: true, answer: "e" },
    { id: "P2223F_2", year: "2022/23", round: "决赛", num: 2, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak4-Final-PMT2223.pdf", page: 3, title: "轮子转一圈完全相同的图形数", translation: "轮子转一圈，完全一样的图形出现几次？", options: ["1", "2", "3", "5", "6"], topics: ["pangu_geom", "pangu_pattern"], hint: "读图向导：观察轮子上花纹的旋转对称阶数（旋转多少度看起来一样）。", hasImage: true, answer: "c" },
    { id: "P2223F_3", year: "2022/23", round: "决赛", num: 3, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak4-Final-PMT2223.pdf", page: 3, title: "酒店单双人房", translation: "酒店 52 间客房，含单人房和双人房，共 89 张床。双人房有几间？", options: ["17", "26", "30", "37", "40"], topics: ["pangu_app"], hint: "双人房 x，单人房 52-x：2x + (52-x) = 89 → x=37。答案：d", answer: "d" },
    { id: "P2223F_4", year: "2022/23", round: "决赛", num: 4, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak4-Final-PMT2223.pdf", page: 3, title: "218453 去 3 位得最小 5 倍数", translation: "从六位数 218453 中去掉 3 个数字得到剩下的三位数。要求：能被 5 整除、尽可能小、保留顺序。求被去掉数字的乘积。", options: ["20", "24", "48", "96", "160"], topics: ["pangu_number", "pangu_puzzle"], hint: "末位需为 0 或 5：唯一为 5(位置5)。保留:2/1/8/4 + 5，选最小三位数 145。去掉 2,8,3，乘积 = 48。答案：c", answer: "c" },
    { id: "P2223F_5", year: "2022/23", round: "决赛", num: 5, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak4-Final-PMT2223.pdf", page: 4, title: "第 101 张图点数", translation: "图 1、2、3……按规律递增。第 101 张图有多少个点？", options: ["401", "397", "400", "398", "399"], topics: ["pangu_pattern"], hint: "读图向导：算前几张图的点数序列，找相邻差（等差）或相邻比（等比），推出第 n 张的通项。", hasImage: true, answer: "a" },
    { id: "P2223F_6", year: "2022/23", round: "决赛", num: 6, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak4-Final-PMT2223.pdf", page: 4, title: "6 支蜡烛哪些还在燃", translation: "Tobias 有 6 支蜡烛。10:00 点燃第 1 支，此后每 10 分钟点一支。每支燃烧 50 分钟。11:15 时还有几支在烧？", options: ["3", "2", "1", "0", "4"], topics: ["pangu_time", "pangu_app"], hint: "各蜡烛燃烧区间：10:00-10:50, 10:10-11:00, 10:20-11:10, 10:30-11:20, 10:40-11:30, 10:50-11:40。11:15 时仍在烧的有：第 4、5、6 三支。答案：a", answer: "a" },
    { id: "P2223F_7", year: "2022/23", round: "决赛", num: 7, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak4-Final-PMT2223.pdf", page: 4, title: "4×4 点阵上的正方形种类", translation: "4×4 点阵上，Adam 想用点作顶点画正方形。可能有几种不同大小的正方形？", options: ["3", "4", "5", "6", "20"], topics: ["pangu_count", "pangu_geom"], hint: "边平行网格 3 种(1,2,3)，斜向 3 种(√2,√5,√8等中在 4×4 内可行)。共 6 种。答案：d", answer: "c" },
    { id: "P2223F_8", year: "2022/23", round: "决赛", num: 8, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak4-Final-PMT2223.pdf", page: 5, title: "3 印章不能盖出的图", translation: "Lisa 有 3 个印章。下列哪个图案无法用这些印章印出？", options: ["A", "B", "C", "D", "E"], topics: ["pangu_puzzle", "pangu_geom"], hint: "读图向导：每个印章的形状对应某种特征。逐个选项判断能否由印章组合实现。", hasImage: true, answer: "e" },
    { id: "P2223F_9", year: "2022/23", round: "决赛", num: 9, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak4-Final-PMT2223.pdf", page: 5, title: "3 视图不匹配的模型", translation: "Kalle 用积木搭图。给出正、俯、侧三视图。以下哪个搭法与三视图都不匹配？", options: ["A", "B", "C", "D", "E"], topics: ["pangu_solid"], hint: "读图向导：分别读出正视 / 侧视 / 顶视三张图，对应立体结构逐层放方块，注意\"多个方块共用同一列\"造成的错位。", hasImage: true, answer: "e" },
    { id: "P2223F_10", year: "2022/23", round: "决赛", num: 10, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak4-Final-PMT2223.pdf", page: 6, title: "3 种旗帜 3 种颜色染色", translation: "Lovisa 有 3 种旗帜形状。她要用红、黄、绿 3 色去涂，每面旗每种颜色最多用一次。共能画出多少种不同的旗？", options: ["6", "9", "12", "15", "18"], topics: ["pangu_count"], hint: "每旗颜色排列 3! = 6，3 种旗 × 6 = 18。答案：e", hasImage: true, answer: "d" },

    // ========== 2023/2024 初赛 ==========
    { id: "P2324O1_1", year: "2023/24", round: "初赛", num: 1, difficulty: 1, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2324.pdf", page: 3, title: "飞机飞行时长", translation: "飞机 09:30 起飞，11:00 降落。飞行多长时间？", options: ["150 分", "120 分", "100 分", "90 分", "70 分"], topics: ["pangu_time"], hint: "11:00-9:30 = 1 小时 30 分 = 90 分。答案：d", answer: "d" },
    { id: "P2324O1_2", year: "2023/24", round: "初赛", num: 2, difficulty: 1, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2324.pdf", page: 3, title: "65 ? 18 = 47", translation: "65 ? 18 = 47。? 应换成什么符号？", options: ["+", "−", "×", "÷", "都不是"], topics: ["pangu_calc"], hint: "65-18=47。答案：b", answer: "b" },
    { id: "P2324O1_3", year: "2023/24", round: "初赛", num: 3, difficulty: 1, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2324.pdf", page: 3, title: "35 球均分 7 袋", translation: "35 个球平均分到 7 袋里，每袋几个？", options: ["9", "8", "7", "6", "5"], topics: ["pangu_calc"], hint: "35÷7=5。答案：e", answer: "e" },
    { id: "P2324O1_4", year: "2023/24", round: "初赛", num: 4, difficulty: 2, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2324.pdf", page: 3, title: "数列 215,230,245,260", translation: "215 → 230 → 245 → 260 → ? 下一项是几？", options: ["265", "275", "280", "285", "290"], topics: ["pangu_pattern"], hint: "公差 15：260+15=275。答案：b", answer: "b" },
    { id: "P2324O1_5", year: "2023/24", round: "初赛", num: 5, difficulty: 2, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2324.pdf", page: 3, title: "填两个符号", translation: "使等式成立：49 □ 15 = 8 □ 8。两符号是什么？", options: ["−,−", "+,×", "−,×", "−,+", "+,−"], topics: ["pangu_calc"], hint: "49-15=34 不对；8×8=64、49+15=64？64=64！但左侧 49+15，右侧 8×8：填 +, ×。答案：b", answer: "b" },
    { id: "P2324O1_6", year: "2023/24", round: "初赛", num: 6, difficulty: 2, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2324.pdf", page: 3, title: "8 头牛 12 只鸡总腿数", translation: "农场有 8 头牛和 12 只鸡。所有动物一共几条腿？", options: ["20", "32", "40", "56", "80"], topics: ["pangu_app"], hint: "8×4 + 12×2 = 32+24 = 56。答案：d", answer: "d" },
    { id: "P2324O1_7", year: "2023/24", round: "初赛", num: 7, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2324.pdf", page: 4, title: "哪个三角形一半涂绿", translation: "哪个三角形被绿色恰好覆盖一半？", options: ["A", "B", "C", "D", "E"], topics: ["pangu_geom"], hint: "读图向导：数总格子数，再看每种拼块占几格。用面积除法估计上限，再逐个试拼。", hasImage: true, answer: "c" },
    { id: "P2324O1_8", year: "2023/24", round: "初赛", num: 8, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2324.pdf", page: 4, title: "天平排 5 只箱子中间者", translation: "A、B、C、D、E 五只箱子重量各不同。利用天平比较后从轻到重排序，中间那个是哪只？", options: ["A", "B", "C", "D", "E"], topics: ["pangu_logic"], hint: "读图向导：把每种图形代成变量（例 △=a、○=b），从每张平衡的天平列一个等式，联立求解。", hasImage: true, answer: "e" },
    { id: "P2324O1_9", year: "2023/24", round: "初赛", num: 9, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2324.pdf", page: 4, title: "长方体块拼立方体", translation: "Ida 要用长方体积木拼一个立方体。每块尺寸 4×6×8 cm。至少需要几块？", options: ["13", "24", "64", "72", "192"], topics: ["pangu_solid", "pangu_number"], hint: "立方体边长必须是 4、6、8 的公倍数最小 24。24³÷(4·6·8) = 13824÷192 = 72。答案：d", answer: "d" },
    { id: "P2324O1_10", year: "2023/24", round: "初赛", num: 10, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2324.pdf", page: 5, title: "交替加减 1..12", translation: "计算 1+1−2+3−4+5−6+7+7−8+9−10+11−12 = ?", options: ["6", "-6", "0", "2", "-12"], topics: ["pangu_calc"], hint: "按顺序算：1+1=2, -2=0, +3=3, -4=-1, +5=4, -6=-2, +7=5, +7=12, -8=4, +9=13, -10=3, +11=14, -12=2。答案：d", answer: "d" },
    { id: "P2324O1_11", year: "2023/24", round: "初赛", num: 11, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2324.pdf", page: 5, title: "姐弟年龄", translation: "Katharina 比弟弟 Lukas 大 5 岁。2 年后 Katharina 是 Lukas 的 2 倍岁数。7 年后 Lukas 几岁？", options: ["8", "9", "10", "11", "12"], topics: ["pangu_app"], hint: "设 Lukas 现在 x 岁，Katharina x+5。2 年后：x+7 = 2(x+2) → x=3。7 年后 Lukas 3+7=10。答案：c", answer: "c" },
    { id: "P2324O1_12", year: "2023/24", round: "初赛", num: 12, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak4-O1-PMT2324.pdf", page: 5, title: "蚂蚁沿立方体箭头爬行", translation: "蚂蚁从 A（立方体左面中点）沿箭头爬到 B。立方体边长 20cm。爬了多少米？", options: ["0.7 米", "0.8 米", "0.9 米", "1 米", "1.1 米"], topics: ["pangu_solid", "pangu_geom"], hint: "读图向导：从终点回推更快 —— 每个格子的走法 = 上邻 + 左邻（无回头方向时）。或系统列出每条路径。", hasImage: true, answer: "c" },

    // ========== 2023/2024 决赛 ==========
    { id: "P2324F_1", year: "2023/24", round: "决赛", num: 1, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak4-FINAL-PMT2324.pdf", page: 3, title: "四步运算链结果 145 起点", translation: "四步运算链最后得到 145。起点是哪个数？", options: ["200", "184", "164", "120", "98"], topics: ["pangu_calc"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true },
    { id: "P2324F_2", year: "2023/24", round: "决赛", num: 2, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak4-FINAL-PMT2324.pdf", page: 3, title: "拼成长方形的三块", translation: "拼图完成后是一个长方形。要用哪 3 块？", options: ["1,2,3", "2,3,6", "3,4,5", "1,3,5", "3,5,6"], topics: ["pangu_geom", "pangu_puzzle"], hint: "读图向导：数总格子数，再看每种拼块占几格。用面积除法估计上限，再逐个试拼。", hasImage: true },
    { id: "P2324F_3", year: "2023/24", round: "决赛", num: 3, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak4-FINAL-PMT2324.pdf", page: 3, title: "两个 L 形能拼几种图", translation: "有 2 块 L 形拼图，可正反旋转。下面 5 个形状中能拼出多少种？", options: ["1", "2", "3", "4", "5"], topics: ["pangu_geom", "pangu_count"], hint: "读图向导：数总格子数，再看每种拼块占几格。用面积除法估计上限，再逐个试拼。", hasImage: true },
    { id: "P2324F_4", year: "2023/24", round: "决赛", num: 4, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak4-FINAL-PMT2324.pdf", page: 4, title: "图中能找到多少正方形", translation: "下图中能找到多少个正方形？", options: ["8", "10", "12", "14", "18"], topics: ["pangu_count", "pangu_geom"], hint: "读图向导：按边长分类枚举（先数 1×1，再 2×2，再 3×3…），最后求和。注意斜置正方形不要漏。", hasImage: true },
    { id: "P2324F_5", year: "2023/24", round: "决赛", num: 5, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak4-FINAL-PMT2324.pdf", page: 4, title: "串珠盒里还剩几颗", translation: "珠子按特定规律串在线上。盒子里剩下几颗珠子？", options: ["16", "18", "19", "20", "23"], topics: ["pangu_pattern"], hint: "读图向导：算前几张图的点数序列，找相邻差（等差）或相邻比（等比），推出第 n 张的通项。", hasImage: true },
    { id: "P2324F_6", year: "2023/24", round: "决赛", num: 6, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak4-FINAL-PMT2324.pdf", page: 4, title: "鸵鸟比蜂鸟重多少克", translation: "蜂鸟 2 克，鸵鸟 156 kg。鸵鸟比蜂鸟重多少克？", options: ["1558 g", "15598 g", "1556002 g", "155998 g", "154 kg"], topics: ["pangu_app", "pangu_calc"], hint: "156 kg = 156000 g，差 155998 g。答案：d", answer: "d" },
    { id: "P2324F_7", year: "2023/24", round: "决赛", num: 7, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak4-FINAL-PMT2324.pdf", page: 5, title: "0.96 米钢丝做立方体棱", translation: "把 0.96 米钢丝剪成小段，每段一条棱，正好搭一个立方体。每段多长？", options: ["4 cm", "6 cm", "8 cm", "10 cm", "12 cm"], topics: ["pangu_solid", "pangu_calc"], hint: "立方体 12 条棱：0.96 米 = 96 cm，96÷12 = 8 cm。答案：c", answer: "c" },
    { id: "P2324F_8", year: "2023/24", round: "决赛", num: 8, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak4-FINAL-PMT2324.pdf", page: 5, title: "5 孩子谁最小", translation: "5 个孩子想知道谁最小：Vera 出生在 Jenny 后；Kalle 生在 Tanja 前；Anna 比 Vera 小；Kalle 比 Jenny 大；Tanja 不是最小。谁最小？", options: ["Anna", "Tanja", "Vera", "Jenny", "Kalle"], topics: ["pangu_logic"], hint: "Anna<Vera<Jenny<Kalle<Tanja。最小是 Anna。答案：a", answer: "a" },
    { id: "P2324F_9", year: "2023/24", round: "决赛", num: 9, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak4-FINAL-PMT2324.pdf", page: 5, title: "三角形第三边整数长度", translation: "Lena 有一个三角形，两边分别为 4cm 和 5cm。第三边是整数厘米，共有多少种可能？", options: ["1", "4", "5", "7", "8"], topics: ["pangu_geom"], hint: "三角不等式：|5-4|<c<5+4 → 1<c<9 → c ∈ {2,3,4,5,6,7,8}，共 7 种。答案：d", answer: "d" },
    { id: "P2324F_10", year: "2023/24", round: "决赛", num: 10, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak4-FINAL-PMT2324.pdf", page: 5, title: "1..1000 连成的大数位数", translation: "把 1 到 1000 依次连着写成一个大数字。共有多少位？", options: ["1000", "2893", "2890", "2900", "3001"], topics: ["pangu_count", "pangu_number"], hint: "1-9: 9 位；10-99: 90×2=180；100-999: 900×3=2700；1000: 4。合计 9+180+2700+4 = 2893。答案：b", answer: "b" },

    // ############# AK5 (Årskurs 5, 5 年级) #############
    // 相较 AK4 的新概念：分数与小数、面积公式、符号方程、整除性、平均数

    // ========== 2015/2016 AK5 初赛 ==========
    { id: "P1516O1_AK5_1", grade: 5, year: "2015/16", round: "初赛", num: 1, difficulty: 1, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k5-PMT16_O1.pdf", page: 3, title: "乘法基础 8·9", translation: "计算：8 · 9 = ?", options: ["64", "72", "81", "63", "70"], topics: ["pangu_calc"], hint: "8×9 = 72。答案：b", answer: "b" },
    { id: "P1516O1_AK5_2", grade: 5, year: "2015/16", round: "初赛", num: 2, difficulty: 1, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k5-PMT16_O1.pdf", page: 3, title: "补全 3×3 火柴方格", translation: "把右图补成由 9 个小正方形组成的大正方形。还需要多少根火柴？", options: ["4", "6", "8", "10", "12"], topics: ["pangu_geom", "pangu_count"], hint: "读图向导：用 Pick 定理 A = 内点 + 边点/2 − 1；或分解为矩形 + 三角形之和。", hasImage: true },
    { id: "P1516O1_AK5_3", grade: 5, year: "2015/16", round: "初赛", num: 3, difficulty: 1, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k5-PMT16_O1.pdf", page: 3, title: "逆推：加、除、减", translation: "谜题：把我的数加 270，再除以 5，再减 70，结果是 30。我的数是多少？", options: ["320", "300", "270", "250", "230"], topics: ["pangu_calc"], hint: "逆推：(30+70)×5-270 = 230。答案：e", answer: "e" },
    { id: "P1516O1_AK5_4", grade: 5, year: "2015/16", round: "初赛", num: 4, difficulty: 2, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k5-PMT16_O1.pdf", page: 3, title: "Max 的球（一半+2+4）", translation: "Max 有蓝色、红色和绿色球。一半是蓝色，2 个红色，4 个绿色。共有几个球？", options: ["6", "8", "10", "12", "20"], topics: ["pangu_app", "pangu_algebra"], hint: "红+绿 = 6 占一半 → 总数 12。答案：d", answer: "d" },
    { id: "P1516O1_AK5_5", grade: 5, year: "2015/16", round: "初赛", num: 5, difficulty: 2, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k5-PMT16_O1.pdf", page: 3, title: "队伍人数（含自己）", translation: "Mikael 排队，前 4 人后 5 人。队里共几人？", options: ["5", "6", "8", "9", "10"], topics: ["pangu_logic"], hint: "含自己：4+5+1=10。答案：e", answer: "e" },
    { id: "P1516O1_AK5_6", grade: 5, year: "2015/16", round: "初赛", num: 6, difficulty: 2, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k5-PMT16_O1.pdf", page: 3, title: "泳池一周营业总时数", translation: "泳池营业时间：周一至周五 9-20，周六 9-16，周日 10-15。一周开放多少小时？", options: ["24 h", "60 h", "70 h", "67 h", "65 h"], topics: ["pangu_time", "pangu_calc"], hint: "5×11 + 7 + 5 = 55+7+5 = 67。答案：d", answer: "d" },
    { id: "P1516O1_AK5_7", grade: 5, year: "2015/16", round: "初赛", num: 7, difficulty: 3, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k5-PMT16_O1.pdf", page: 4, title: "找规律：4 个缺失数之和", translation: "识别图形数字规律。四个缺失数字之和是多少？", options: ["20", "22", "30", "32", "42"], topics: ["pangu_pattern", "pangu_puzzle"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true },
    { id: "P1516O1_AK5_8", grade: 5, year: "2015/16", round: "初赛", num: 8, difficulty: 3, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k5-PMT16_O1.pdf", page: 4, title: "35 车 6 倍关系", translation: "35 辆新车，灰或黑色。黑是灰的 6 倍。灰色几辆？", options: ["5", "6", "7", "24", "30"], topics: ["pangu_app", "pangu_algebra"], hint: "x + 6x = 35 → x=5。答案：a", answer: "a" },
    { id: "P1516O1_AK5_9", grade: 5, year: "2015/16", round: "初赛", num: 9, difficulty: 3, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k5-PMT16_O1.pdf", page: 4, title: "加法十字", translation: "加法十字例：6+7=13、4+5=9、6+4=10、7+5=12。给出十字缺 4 个数，色格是几？", options: ["4", "6", "8", "10", "12"], topics: ["pangu_puzzle"], hint: "读图向导：十字中央格 = 四个末端格之和 / 2。用行列等式反推缺失格。", hasImage: true },
    { id: "P1516O1_AK5_10", grade: 5, year: "2015/16", round: "初赛", num: 10, difficulty: 4, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k5-PMT16_O1.pdf", page: 4, title: "2,4,12,48 下一项", translation: "找规律：2, 4, 12, 48, ? ", options: ["60", "72", "100", "240", "无规律"], topics: ["pangu_pattern"], hint: "乘 2、3、4、5：48×5 = 240。答案：d", answer: "d" },
    { id: "P1516O1_AK5_11", grade: 5, year: "2015/16", round: "初赛", num: 11, difficulty: 4, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k5-PMT16_O1.pdf", page: 4, title: "补全立方体需几块", translation: "图形由 20 个小立方体组成。要补成完整立方体，还缺几块？", options: ["42", "44", "46", "48", "51"], topics: ["pangu_solid", "pangu_count"], hint: "64-20=44。答案：b", hasImage: true, answer: "b" },
    { id: "P1516O1_AK5_12", grade: 5, year: "2015/16", round: "初赛", num: 12, difficulty: 4, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k5-PMT16_O1.pdf", page: 5, title: "同形代同数：求 ? 之和", translation: "相同形状代表相同数字。计算 ? 之和。", options: ["14", "16", "17", "9", "11"], topics: ["pangu_puzzle", "pangu_algebra"], hint: "读图向导：从进位约束最强的位置入手（如末位）。设未知数字为变量，逐步缩小候选。", hasImage: true },
    { id: "P1516O1_AK5_13", grade: 5, year: "2015/16", round: "初赛", num: 13, difficulty: 5, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k5-PMT16_O1.pdf", page: 5, title: "6 色循环第 27 个", translation: "6 色循环（蓝黄红白绿橙），第 27 个是什么颜色？", options: ["蓝", "黄", "红", "白", "橙"], topics: ["pangu_pattern"], hint: "27÷6=4余3，第 3 个是红。答案：c", answer: "c" },
    { id: "P1516O1_AK5_14", grade: 5, year: "2015/16", round: "初赛", num: 14, difficulty: 5, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k5-PMT16_O1.pdf", page: 5, title: "五人赛跑名次", translation: "Lisa 比 Erik 慢 10 米，Erik 比 Ron 快 20 米。Ron 比 Anna 慢 5 米、比 Daniella 慢 25 米。过线顺序？", options: ["RALED", "DALER", "LERAD", "DELAR", "LADER"], topics: ["pangu_logic"], hint: "D 最快、E、L、A、R 最慢 → DELAR。答案：d", answer: "d" },
    { id: "P1516O1_AK5_15", grade: 5, year: "2015/16", round: "初赛", num: 15, difficulty: 5, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k5-PMT16_O1.pdf", page: 5, title: "奇数求和 1+3+…+99", translation: "已知 1+3=2², 1+3+5=3², …，求 1+3+5+…+99 = ?", options: ["999", "10250", "5300", "2500", "1989"], topics: ["pangu_pattern", "pangu_algebra"], hint: "共 50 项奇数 → 50² = 2500。答案：d", answer: "d" },

    // ========== 2015/2016 AK5 复赛 ==========
    { id: "P1516O2_AK5_1", grade: 5, year: "2015/16", round: "复赛", num: 1, difficulty: 2, file: "盘古竞赛/O2-ü0ç3k5-PMT16.pdf", page: 3, title: "Denis/Erik/William 弹珠", translation: "Denis 比 Erik 多 24 个，William 比 Erik 少 24 个。Erik 有 71 个。三人共几个？", options: ["211", "213", "215", "217", "219"], topics: ["pangu_app"], hint: "3×71 = 213。答案：b", answer: "b" },
    { id: "P1516O2_AK5_2", grade: 5, year: "2015/16", round: "复赛", num: 2, difficulty: 2, file: "盘古竞赛/O2-ü0ç3k5-PMT16.pdf", page: 3, title: "29 数到 99", translation: "从 29 数到 99，每个数 1 秒。共多少时间？", options: ["1分9秒", "1分10秒", "1分11秒", "1分12秒", "1分19秒"], topics: ["pangu_calc", "pangu_count"], hint: "99-29+1 = 71 秒 = 1 分 11 秒。答案：c", answer: "c" },
    { id: "P1516O2_AK5_3", grade: 5, year: "2015/16", round: "复赛", num: 3, difficulty: 2, file: "盘古竞赛/O2-ü0ç3k5-PMT16.pdf", page: 3, title: "数轴 A", translation: "尺子上 A 对应哪个数？（4.1、4.2 附近）", options: ["3.08", "3.8", "4.0", "4.08", "4.5"], topics: ["pangu_number", "pangu_fraction"], hint: "读图向导：找已知的两个刻度算单位长度，再从起点数到目标点。", hasImage: true },
    { id: "P1516O2_AK5_4", grade: 5, year: "2015/16", round: "复赛", num: 4, difficulty: 3, file: "盘古竞赛/O2-ü0ç3k5-PMT16.pdf", page: 3, title: "5×5×5 可见块数", translation: "5×5×5 大立方体，从图中角度能看到多少块小立方体？", options: ["61", "72", "75", "95", "100"], topics: ["pangu_solid"], hint: "3 面之和 - 3 边 + 1 角 = 75-15+1 = 61。答案：a", hasImage: true, answer: "a" },
    { id: "P1516O2_AK5_5", grade: 5, year: "2015/16", round: "复赛", num: 5, difficulty: 3, file: "盘古竞赛/O2-ü0ç3k5-PMT16.pdf", page: 3, title: "两轮/三轮车 7 辆 19 轮", translation: "自行车店共 7 辆二轮或三轮车，共 19 个轮子。二轮车几辆？", options: ["6", "5", "4", "3", "2"], topics: ["pangu_app", "pangu_algebra"], hint: "设 x 辆二轮：2x+3(7-x)=19 → x=2。答案：e", answer: "e" },
    { id: "P1516O2_AK5_6", grade: 5, year: "2015/16", round: "复赛", num: 6, difficulty: 3, file: "盘古竞赛/O2-ü0ç3k5-PMT16.pdf", page: 4, title: "不能折成立方体的展开图", translation: "以下哪个图形不能折成立方体？", options: ["A", "B", "C", "D", "E"], topics: ["pangu_solid"], hint: "读图向导：立方体对面之和恒为 7。展开图折叠时可先固定一面为底、追踪相邻关系；三视图题分层扫描每一层的方块数。", hasImage: true },
    { id: "P1516O2_AK5_7", grade: 5, year: "2015/16", round: "复赛", num: 7, difficulty: 4, file: "盘古竞赛/O2-ü0ç3k5-PMT16.pdf", page: 4, title: "连续 4 整数关系不成立的选项", translation: "A、B、C、D 是连续 4 个整数（如 2,3,4,5）。以下哪个等式不成立？", options: ["C-A=D-B", "C=A+2", "D=A+3", "B-A=D-C", "A+C=B+D"], topics: ["pangu_algebra", "pangu_number"], hint: "A+C=2A+2，B+D=2A+4，不等。答案：e", answer: "e" },
    { id: "P1516O2_AK5_8", grade: 5, year: "2015/16", round: "复赛", num: 8, difficulty: 4, file: "盘古竞赛/O2-ü0ç3k5-PMT16.pdf", page: 4, title: "蚂蚁绕图一圈周长", translation: "蚂蚁绕图形一圈几米？（8 米、3 米两个尺寸）", options: ["11 米", "19 米", "22 米", "24 米", "29 米"], topics: ["pangu_geom", "pangu_app"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true },
    { id: "P1516O2_AK5_9", grade: 5, year: "2015/16", round: "复赛", num: 9, difficulty: 4, file: "盘古竞赛/O2-ü0ç3k5-PMT16.pdf", page: 4, title: "5 立方体棱框 → 一面面积", translation: "5 个大小相同的立方体棱框共需 300 米。一个面能容下几个 1 m² 的方格？", options: ["25", "36", "49", "5", "16"], topics: ["pangu_solid", "pangu_geom"], hint: "每立方体 12 条棱 = 60 米一个，棱长 5 米，一面 25 平方米 = 25 个 1m² 方格。答案：a", answer: "a" },
    { id: "P1516O2_AK5_10", grade: 5, year: "2015/16", round: "复赛", num: 10, difficulty: 4, file: "盘古竞赛/O2-ü0ç3k5-PMT16.pdf", page: 5, title: "25 方格 白色总面积 400 求灰色", translation: "图中 25 个大小相同的方格。白色方格总面积 400 cm²。灰色方格总面积多少？", options: ["225 cm²", "230 cm²", "235 cm²", "240 cm²", "245 cm²"], topics: ["pangu_geom", "pangu_fraction"], hint: "先求单块面积再乘灰色数量", hasImage: true },
    { id: "P1516O2_AK5_11", grade: 5, year: "2015/16", round: "复赛", num: 11, difficulty: 5, file: "盘古竞赛/O2-ü0ç3k5-PMT16.pdf", page: 5, title: "内嵌小正方形阴影周长", translation: "大正方形 ABCD 内含边长 3 cm 的小正方形。阴影部分周长多少？", options: ["16 cm", "14 cm", "12 cm", "10 cm", "8 cm"], topics: ["pangu_geom"], hint: "读图向导：用\"整体面积 − 空白面积\"更快；或把阴影分解成矩形 / 三角形之和。若图形对称，可只算 1/2 或 1/4 再乘。", hasImage: true },
    { id: "P1516O2_AK5_12", grade: 5, year: "2015/16", round: "复赛", num: 12, difficulty: 5, file: "盘古竞赛/O2-ü0ç3k5-PMT16.pdf", page: 5, title: "102 球分给 7 孩", translation: "袋里 102 个球，分给 7 孩子。至少再加几个才能平均？", options: ["1", "2", "3", "4", "5"], topics: ["pangu_calc"], hint: "102÷7=14 余 4；105-102=3。答案：c", answer: "c" },

    // ========== 2015/2016 AK5 决赛 ==========
    { id: "P1516F_AK5_1", grade: 5, year: "2015/16", round: "决赛", num: 1, difficulty: 3, file: "盘古竞赛/Final-ü0ç3k5-PMT16-v2.pdf", page: 3, title: "6,11,16 第 100 项", translation: "数列 6, 11, 16, 21, 26, … 第 100 项是几？", options: ["600", "502", "500", "602", "501"], topics: ["pangu_pattern", "pangu_algebra"], hint: "6+99×5 = 501。答案：e", answer: "e" },
    { id: "P1516F_AK5_2", grade: 5, year: "2015/16", round: "决赛", num: 2, difficulty: 3, file: "盘古竞赛/Final-ü0ç3k5-PMT16-v2.pdf", page: 3, title: "100 小时后是几点", translation: "钟显示 10:00。100 小时后是几点？", options: ["11:00", "12:00", "13:00", "14:00", "15:00"], topics: ["pangu_time"], hint: "100 mod 24 = 4，10+4=14:00。答案：d", answer: "d" },
    { id: "P1516F_AK5_3", grade: 5, year: "2015/16", round: "决赛", num: 3, difficulty: 3, file: "盘古竞赛/Final-ü0ç3k5-PMT16-v2.pdf", page: 3, title: "拳击 12 回合总时长", translation: "拳击 12 回合，每回合 3 分钟，回合间休息 1 分钟。全场几分钟？", options: ["48 分", "47 分", "46 分", "37 分", "36 分"], topics: ["pangu_app", "pangu_time"], hint: "12×3 + 11×1 = 47。答案：b", answer: "b" },
    { id: "P1516F_AK5_4", grade: 5, year: "2015/16", round: "决赛", num: 4, difficulty: 3, file: "盘古竞赛/Final-ü0ç3k5-PMT16-v2.pdf", page: 3, title: "A→B 路径数", translation: "按箭头方向从 A 走到 B。共有多少种走法？", options: ["9", "10", "11", "12", "13"], topics: ["pangu_count"], hint: "读图向导：从终点回推更快 —— 每个格子的走法 = 上邻 + 左邻（无回头方向时）。或系统列出每条路径。", hasImage: true },
    { id: "P1516F_AK5_5", grade: 5, year: "2015/16", round: "决赛", num: 5, difficulty: 3, file: "盘古竞赛/Final-ü0ç3k5-PMT16-v2.pdf", page: 3, title: "三角形数字 A+B", translation: "三角形按某数字规律排列，A+B = ?", options: ["11", "10", "9", "8", "7"], topics: ["pangu_pattern", "pangu_puzzle"], hint: "读图向导：分层数（先数最小的基础三角形；再数由 2 个 / 4 个组成的复合三角形；最后加起来）。注意正立和倒立分开数。", hasImage: true },
    { id: "P1516F_AK5_6", grade: 5, year: "2015/16", round: "决赛", num: 6, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k5-PMT16-v2.pdf", page: 4, title: "立方体三视图找字母", translation: "立方体 6 面写有字母。三视图中，阴影面是哪个字母？", options: ["T", "P", "X", "E", "V"], topics: ["pangu_solid"], hint: "读图向导：分别读出正视 / 侧视 / 顶视三张图，对应立体结构逐层放方块，注意\"多个方块共用同一列\"造成的错位。", hasImage: true },
    { id: "P1516F_AK5_7", grade: 5, year: "2015/16", round: "决赛", num: 7, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k5-PMT16-v2.pdf", page: 4, title: "锯木头 4 段 12 分 → 5 段", translation: "把树干锯 4 段用 12 分钟。锯 5 段要多久？", options: ["18 分", "17 分", "16 分", "15 分", "14 分"], topics: ["pangu_logic", "pangu_app"], hint: "4 段需 3 刀，每刀 4 分。5 段 4 刀 = 16 分。答案：c", answer: "c" },
    { id: "P1516F_AK5_8", grade: 5, year: "2015/16", round: "决赛", num: 8, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k5-PMT16-v2.pdf", page: 4, title: "卡车玉米盘数", translation: "满载 4653 kg，空车 2583 kg。每盘玉米 90000 g。装了几盘？", options: ["19", "20", "21", "22", "23"], topics: ["pangu_app", "pangu_calc"], hint: "(4653-2583)×1000÷90000 = 23。答案：e", answer: "e" },
    { id: "P1516F_AK5_9", grade: 5, year: "2015/16", round: "决赛", num: 9, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k5-PMT16-v2.pdf", page: 4, title: "堆积木图 30 有几块", translation: "图 1 有 5 块，图 2 有 7 块，图 3 有 9 块。图 30 有几块？", options: ["62", "63", "64", "65", "66"], topics: ["pangu_pattern", "pangu_algebra"], hint: "等差：5+2(n-1)。n=30 → 5+58 = 63。答案：b", answer: "b" },
    { id: "P1516F_AK5_10", grade: 5, year: "2015/16", round: "决赛", num: 10, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k5-PMT16-v2.pdf", page: 4, title: "油箱 1/8 → 5/8 加 25 升", translation: "起初油箱 1/8 满。加 25 升后是 5/8 满。油箱容量是多少？", options: ["40 升", "45 升", "50 升", "55 升", "60 升"], topics: ["pangu_fraction", "pangu_app"], hint: "5/8-1/8 = 4/8 = 25 升 → 全箱 = 50 升。答案：c", answer: "c" },
    { id: "P1516F_AK5_11", grade: 5, year: "2015/16", round: "决赛", num: 11, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k5-PMT16-v2.pdf", page: 5, title: "骰子滚动顶面", translation: "骰子对面之和为 7。按图示滚动到 X 时顶面是几？", options: ["2", "3", "4", "5", "6"], topics: ["pangu_solid"], hint: "读图向导：立方体对面之和恒为 7。展开图折叠时可先固定一面为底、追踪相邻关系；三视图题分层扫描每一层的方块数。", hasImage: true },
    { id: "P1516F_AK5_12", grade: 5, year: "2015/16", round: "决赛", num: 12, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k5-PMT16-v2.pdf", page: 5, title: "展开图 A、C 边号之和", translation: "立方体展开图，边 A、B、C 折叠后各与 1-8 中的哪条相接？A 与 C 相接的号之和是几？", options: ["3", "4", "5", "6", "8"], topics: ["pangu_solid"], hint: "读图向导：立方体对面之和恒为 7。展开图折叠时可先固定一面为底、追踪相邻关系；三视图题分层扫描每一层的方块数。", hasImage: true },
    { id: "P1516F_AK5_13", grade: 5, year: "2015/16", round: "决赛", num: 13, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k5-PMT16-v2.pdf", page: 5, title: "Linus 7 步 vs David 13 步最小公同", translation: "Linus 从 7 开始每步加 7（7,14,21,…）。David 从 5 开始每步加 13（5,18,31,…）。两人最小公共数是几？", options: ["42", "56", "62", "68", "70"], topics: ["pangu_number", "pangu_algebra"], hint: "David 的数是 5+13k，找能被 7 整除的：k=4 → 57 不行；k=5 → 70 ✓。答案：e", answer: "e" },
    { id: "P1516F_AK5_14", grade: 5, year: "2015/16", round: "决赛", num: 14, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k5-PMT16-v2.pdf", page: 5, title: "5 相同矩形拼大矩形面积", translation: "5 个同样大小的矩形拼成一个更大的矩形（见图）。大矩形面积是多少？", options: ["270 cm²", "300 cm²", "330 cm²", "360 cm²", "400 cm²"], topics: ["pangu_geom", "pangu_algebra"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true },
    { id: "P1516F_AK5_15", grade: 5, year: "2015/16", round: "决赛", num: 15, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k5-PMT16-v2.pdf", page: 6, title: "31+33+…+81 的和", translation: "计算 31+33+35+…+81 = ?", options: ["1238", "1245", "1375", "1453", "1456"], topics: ["pangu_pattern", "pangu_algebra"], hint: "首 31、末 81、共 26 项。(31+81)×26÷2 = 1456。答案：e", answer: "e" },

    // ========== 2021/2022 AK5 初赛 ==========
    { id: "P2122O1_AK5_1", grade: 5, year: "2021/22", round: "初赛", num: 1, difficulty: 1, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2122.pdf", page: 3, title: "撕掉两张对页", translation: "书里撕掉了两张对页。问号处的页码是什么？", options: ["55", "56", "57", "58", "59"], topics: ["pangu_number"], hint: "读图向导：书本页码前后连续、两面对页页码差 1。观察缺页周围的可见页码找规律。", hasImage: true },
    { id: "P2122O1_AK5_2", grade: 5, year: "2021/22", round: "初赛", num: 2, difficulty: 1, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2122.pdf", page: 3, title: "F1 需跑多少圈", translation: "F1 至少跑 305 km。巴库赛道每圈 6 km。至少几圈？", options: ["50", "51", "52", "55", "57"], topics: ["pangu_calc", "pangu_app"], hint: "305÷6 = 50.83 → 51 圈。答案：b", answer: "b" },
    { id: "P2122O1_AK5_3", grade: 5, year: "2021/22", round: "初赛", num: 3, difficulty: 1, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2122.pdf", page: 3, title: "3 升 + 100 ml 换算", translation: "Svante 倒 3 升牛奶再加 100 ml。共用多少毫升牛奶？", options: ["3100 ml", "103 ml", "3100 l", "31 l", "103 l"], topics: ["pangu_calc"], hint: "3 升 = 3000 ml，+100 = 3100 ml。答案：a", answer: "a" },
    { id: "P2122O1_AK5_4", grade: 5, year: "2021/22", round: "初赛", num: 4, difficulty: 2, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2122.pdf", page: 3, title: "A+B=12 求 A·B 最小值", translation: "A、B 是非负整数且 A+B=12。A·B 的最小可能值是多少？", options: ["0", "12", "20", "24", "36"], topics: ["pangu_algebra"], hint: "极端：A=0、B=12 → A·B=0。答案：a", answer: "a" },
    { id: "P2122O1_AK5_5", grade: 5, year: "2021/22", round: "初赛", num: 5, difficulty: 2, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2122.pdf", page: 4, title: "1■3·9 = 1557", translation: "1■3 × 9 = 1557，■ 是几？", options: ["3", "4", "5", "6", "7"], topics: ["pangu_puzzle"], hint: "1557÷9 = 173，■ = 7。答案：e", answer: "e" },
    { id: "P2122O1_AK5_6", grade: 5, year: "2021/22", round: "初赛", num: 6, difficulty: 2, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2122.pdf", page: 4, title: "钞票组合哪个不可能", translation: "Julian 付款（屏上金额需看图）。下列钞票组合哪个不可能是他用的？", options: ["4×50 kr", "2×100 kr", "1×200 kr", "1×50+1×100", "2×50+1×100"], topics: ["pangu_app", "pangu_logic"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true },
    { id: "P2122O1_AK5_7", grade: 5, year: "2021/22", round: "初赛", num: 7, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2122.pdf", page: 4, title: "♠+♠+2=20+♠ 求 ♠", translation: "假设 ♠+♠+2 = 20+♠，♠ 是多少？", options: ["8", "10", "14", "16", "18"], topics: ["pangu_algebra"], hint: "2♠+2 = 20+♠ → ♠ = 18。答案：e", answer: "e" },
    { id: "P2122O1_AK5_8", grade: 5, year: "2021/22", round: "初赛", num: 8, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2122.pdf", page: 5, title: "3+4+5+8 珠子第 89 个", translation: "Amanda 做项链：3 蓝、4 绿、5 红、8 白，循环。第 89 颗是什么颜色？", options: ["蓝", "绿", "红", "白", "黄"], topics: ["pangu_pattern"], hint: "周期 20，89÷20=4 余 9。前 3 蓝 + 4 绿 + 剩 2 红 → 第 9 颗是红。答案：c", answer: "c" },
    { id: "P2122O1_AK5_9", grade: 5, year: "2021/22", round: "初赛", num: 9, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2122.pdf", page: 5, title: "0.1 mm 纸对折 5 次", translation: "0.1 mm 厚的纸对折 5 次。纸叠厚度是多少？", options: ["0.5 mm", "1.0 mm", "1.6 mm", "3.0 mm", "3.2 mm"], topics: ["pangu_fraction", "pangu_pattern"], hint: "2⁵ = 32 层 → 0.1×32 = 3.2 mm。答案：e", answer: "e" },
    { id: "P2122O1_AK5_10", grade: 5, year: "2021/22", round: "初赛", num: 10, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2122.pdf", page: 5, title: "哪张图有 47 方格", translation: "图形按某数学规律排列。哪张图共有 47 个方格？", options: ["21", "22", "23", "24", "95"], topics: ["pangu_pattern"], hint: "读图向导：从形状 / 颜色 / 位置三个维度分别找周期或递推；有时\"下一个\"= 前两个组合。", hasImage: true },
    { id: "P2122O1_AK5_11", grade: 5, year: "2021/22", round: "初赛", num: 11, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2122.pdf", page: 5, title: "图中三角形数", translation: "下图有多少个三角形？", options: ["7", "13", "15", "16", "18"], topics: ["pangu_count", "pangu_geom"], hint: "读图向导：分层数（先数最小的基础三角形；再数由 2 个 / 4 个组成的复合三角形；最后加起来）。注意正立和倒立分开数。", hasImage: true },
    { id: "P2122O1_AK5_12", grade: 5, year: "2021/22", round: "初赛", num: 12, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2122.pdf", page: 6, title: "两坏钟相差 2 时 24 分", translation: "两个数字坏钟每小时相差 2 分钟。多少小时后相差恰好 2 时 24 分？", options: ["42", "62", "72", "84", "144"], topics: ["pangu_time", "pangu_algebra"], hint: "144 分钟 ÷ 每小时 2 分 = 72 小时。答案：c", answer: "c" },

    // ========== 2021/2022 AK5 决赛 ==========
    { id: "P2122F_AK5_1", grade: 5, year: "2021/22", round: "决赛", num: 1, difficulty: 3, file: "盘古竞赛/PMT2122-5-Final.pdf", page: 3, title: "对折两次剪出的展开图", translation: "正方形纸对折两次并剪如图。展开后是哪个图形？", options: ["A", "B", "C", "D", "E"], topics: ["pangu_geom"], hint: "读图向导：立方体对面之和恒为 7。展开图折叠时可先固定一面为底、追踪相邻关系；三视图题分层扫描每一层的方块数。", hasImage: true, answer: "a" },
    { id: "P2122F_AK5_2", grade: 5, year: "2021/22", round: "决赛", num: 2, difficulty: 3, file: "盘古竞赛/PMT2122-5-Final.pdf", page: 3, title: "5005 后头两个回文数之和", translation: "回文数：正读反读都一样（如 232、1001）。5005 之后头两个回文数之和是多少？", options: ["6006", "10340", "13013", "14014", "15015"], topics: ["pangu_number", "pangu_pattern"], hint: "5005 后：5115、5225，和 = 10340。答案：b", answer: "b" },
    { id: "P2122F_AK5_3", grade: 5, year: "2021/22", round: "决赛", num: 3, difficulty: 3, file: "盘古竞赛/PMT2122-5-Final.pdf", page: 3, title: "7 米方场围栏总长", translation: "边长 7 m 的方形区域用围栏围起，通道宽 1 m。围栏总长是多少？", options: ["84 m", "63 m", "57 m", "56 m", "49 m"], topics: ["pangu_geom"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true, answer: "b" },
    { id: "P2122F_AK5_4", grade: 5, year: "2021/22", round: "决赛", num: 4, difficulty: 3, file: "盘古竞赛/PMT2122-5-Final.pdf", page: 4, title: "蜗牛沿两条线回程时间", translation: "蜗牛从 A 沿黑线到 B 用 1 小时。速度不变，沿灰线返回 A 需多久？", options: ["60 分", "70 分", "80 分", "90 分", "100 分"], topics: ["pangu_geom", "pangu_app"], hint: "读图向导：从终点回推更快 —— 每个格子的走法 = 上邻 + 左邻（无回头方向时）。或系统列出每条路径。", hasImage: true, answer: "c" },
    { id: "P2122F_AK5_5", grade: 5, year: "2021/22", round: "决赛", num: 5, difficulty: 4, file: "盘古竞赛/PMT2122-5-Final.pdf", page: 4, title: "算式缺失数字之和", translation: "竖式中缺几个数字。所有缺失数字之和是多少？", options: ["22", "23", "24", "25", "无解"], topics: ["pangu_puzzle"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true, answer: "a" },
    { id: "P2122F_AK5_6", grade: 5, year: "2021/22", round: "决赛", num: 6, difficulty: 4, file: "盘古竞赛/PMT2122-5-Final.pdf", page: 4, title: "两邻数积 195 求邻数和", translation: "一个数的两个相邻整数相乘得 195。这两个相邻数之和是多少？（例：3 相邻 2 和 4，2×4=8）", options: ["20", "22", "24", "28", "32"], topics: ["pangu_number", "pangu_algebra"], hint: "找 n²-1 = 195 → n² = 196 → n = 14；相邻 13 和 15，和 = 28。答案：d", answer: "d" },
    { id: "P2122F_AK5_7", grade: 5, year: "2021/22", round: "决赛", num: 7, difficulty: 4, file: "盘古竞赛/PMT2122-5-Final.pdf", page: 5, title: "几何图形与数字关系", translation: "上方几何图形与旁边数字有某种关系。问号处的数是几？", options: ["15", "16", "17", "18", "19"], topics: ["pangu_pattern", "pangu_puzzle"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true, answer: "c" },
    { id: "P2122F_AK5_8", grade: 5, year: "2021/22", round: "决赛", num: 8, difficulty: 5, file: "盘古竞赛/PMT2122-5-Final.pdf", page: 5, title: "4 帽子只有 1 句真话", translation: "4 顶帽子上各有一句话，仅一句是真的。球在哪顶下？帽 1：球在 2 或 3 下；帽 2：球在 1 或 4 下；帽 3：球在这顶下；帽 4：球不在这顶下", options: ["帽 1", "帽 2", "帽 3", "帽 4", "无法确定"], topics: ["pangu_logic"], hint: "假设帽 4 真：球不在 4，帽 1/2/3 假。帽 3 假 → 球不在 3；帽 1 假 → 球不在 2、也不在 3；帽 2 假 → 球不在 1、不在 4。综合：球只在 2 或 3；但帽 3 假排除 3，帽 1 假排除 2。矛盾。逐个尝试，仅帽 2 真时自洽，球在 1。答案：a", hasImage: true, answer: "d" },
    { id: "P2122F_AK5_9", grade: 5, year: "2021/22", round: "决赛", num: 9, difficulty: 5, file: "盘古竞赛/PMT2122-5-Final.pdf", page: 6, title: "5×5 拉丁方（含对角线）", translation: "填空使 1-5 在每行、每列、每对角线恰好出现一次。星号处填什么？", options: ["1", "2", "3", "4", "5"], topics: ["pangu_puzzle", "pangu_logic"], hint: "读图向导：从约束最强的行 / 列开始（该行已填数字最多的）。逐格排除候选。", hasImage: true, answer: "c" },
    { id: "P2122F_AK5_10", grade: 5, year: "2021/22", round: "决赛", num: 10, difficulty: 5, file: "盘古竞赛/PMT2122-5-Final.pdf", page: 6, title: "Henrik 36 岁四孩年龄", translation: "Henrik 36 岁，4 个孩子分别 2、4、5、7 岁。几年后 Henrik 恰好是当时四孩年龄之和的一半？", options: ["19", "22", "26", "27", "29"], topics: ["pangu_app", "pangu_algebra"], hint: "36+x = (18+4x)/2 → x = 27。答案：d", answer: "d" },

    // ========== 2022/2023 AK5 初赛 ==========
    { id: "P2223O1_AK5_1", grade: 5, year: "2022/23", round: "初赛", num: 1, difficulty: 1, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2223.pdf", page: 3, title: "看电影总时长", translation: "电影 17:00 开始 18:30 结束。提前 15 分钟到场。全程共多长？", options: ["30 分", "35 分", "90 分", "100 分", "105 分"], topics: ["pangu_time"], hint: "15 + 90 = 105 分。答案：e", answer: "e" },
    { id: "P2223O1_AK5_2", grade: 5, year: "2022/23", round: "初赛", num: 2, difficulty: 1, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2223.pdf", page: 3, title: "2022 − 44/2", translation: "计算 2022 − 44/2 = ?", options: ["994", "1988", "2000", "2044", "2220"], topics: ["pangu_calc"], hint: "先算 44/2=22，2022-22=2000。答案：c", answer: "c" },
    { id: "P2223O1_AK5_3", grade: 5, year: "2022/23", round: "初赛", num: 3, difficulty: 1, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2223.pdf", page: 3, title: "火车 Malmö→Göteborg", translation: "火车 06:31 出发，08:19 到达。行程多长？", options: ["1时8分", "1时28分", "1时38分", "1时48分", "2时12分"], topics: ["pangu_time"], hint: "1 小时 48 分。答案：d", answer: "d" },
    { id: "P2223O1_AK5_4", grade: 5, year: "2022/23", round: "初赛", num: 4, difficulty: 2, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2223.pdf", page: 3, title: "水瓶+押金 10.5 元", translation: "一瓶水带押金 10.5 元。水瓶比押金贵 6.5 元。押金多少？", options: ["3 元", "1 元", "4 元", "3.5 元", "2 元"], topics: ["pangu_app", "pangu_algebra", "pangu_fraction"], hint: "和差：押金 = (10.5-6.5)÷2 = 2。答案：e", answer: "e" },
    { id: "P2223O1_AK5_5", grade: 5, year: "2022/23", round: "初赛", num: 5, difficulty: 2, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2223.pdf", page: 3, title: "身高长了 86 cm", translation: "Hanna 现 1.37 m，比出生长了 86 cm。她出生多少 cm？", options: ["51 cm", "50 cm", "49 cm", "48 cm", "47 cm"], topics: ["pangu_app", "pangu_calc"], hint: "137 - 86 = 51。答案：a", answer: "a" },
    { id: "P2223O1_AK5_6", grade: 5, year: "2022/23", round: "初赛", num: 6, difficulty: 2, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2223.pdf", page: 4, title: "3 毛巾 4 夹子 → 10 毛巾", translation: "3 条毛巾用 4 个夹子相连（首尾共用）。挂 10 条毛巾要多少个夹子？", options: ["10", "11", "12", "13", "14"], topics: ["pangu_pattern", "pangu_count"], hint: "n 毛巾需 n+1 夹子。10 条 → 11。答案：b", answer: "b" },
    { id: "P2223O1_AK5_7", grade: 5, year: "2022/23", round: "初赛", num: 7, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2223.pdf", page: 4, title: "骑士加盔甲重量", translation: "盔甲 19 kg，骑士比盔甲重 61 kg。穿上盔甲共多重？", options: ["52 kg", "80 kg", "99 kg", "108 kg", "118 kg"], topics: ["pangu_app"], hint: "骑士 80 kg + 盔甲 19 kg = 99 kg。答案：c", answer: "c" },
    { id: "P2223O1_AK5_8", grade: 5, year: "2022/23", round: "初赛", num: 8, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2223.pdf", page: 4, title: "斐波那契 1,1,2,3,5,?,13,21", translation: "找缺失项：1, 1, 2, 3, 5, ?, 13, 21, ...", options: ["8", "9", "10", "11", "12"], topics: ["pangu_pattern", "pangu_count"], hint: "斐波那契：3+5=8。答案：a", answer: "a" },
    { id: "P2223O1_AK5_9", grade: 5, year: "2022/23", round: "初赛", num: 9, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2223.pdf", page: 4, title: "祖孙三代年龄", translation: "外婆是女儿的 2 倍，是外孙女的 6 倍。三人共 130 岁。外婆几岁？", options: ["72", "78", "81", "84", "87"], topics: ["pangu_algebra", "pangu_app"], hint: "外孙女 x，女儿 3x，外婆 6x：10x = 130 → x = 13，外婆 78。答案：b", answer: "b" },
    { id: "P2223O1_AK5_10", grade: 5, year: "2022/23", round: "初赛", num: 10, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2223.pdf", page: 4, title: "滑雪运动员每小时呼吸", translation: "静息呼吸 15 次/分。1 小时呼吸几次？", options: ["60", "600", "750", "900", "1000"], topics: ["pangu_calc", "pangu_app"], hint: "15×60 = 900。答案：d", answer: "d" },
    { id: "P2223O1_AK5_11", grade: 5, year: "2022/23", round: "初赛", num: 11, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2223.pdf", page: 5, title: "三角形折成餐巾的底边", translation: "图 1 三角形折成图示餐巾。原三角形底边多长？", options: ["14 cm", "21 cm", "24.5 cm", "28 cm", "35 cm"], topics: ["pangu_geom", "pangu_fraction"], hint: "读图向导：立方体对面之和恒为 7。展开图折叠时可先固定一面为底、追踪相邻关系；三视图题分层扫描每一层的方块数。", hasImage: true, answer: "d" },
    { id: "P2223O1_AK5_12", grade: 5, year: "2022/23", round: "初赛", num: 12, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2223.pdf", page: 5, title: "30 天最少打扫几次不欠妈妈", translation: "每晚打扫房间得 40 元，不打扫欠 10 元。30 天里 Adnan 至少打扫几次才不欠钱？", options: ["6", "7", "8", "10", "12"], topics: ["pangu_algebra", "pangu_app"], hint: "打扫 x 次：40x - 10(30-x) ≥ 0 → 50x ≥ 300 → x ≥ 6。答案：a", answer: "a" },

    // ========== 2022/2023 AK5 决赛 ==========
    { id: "P2223F_AK5_1", grade: 5, year: "2022/23", round: "决赛", num: 1, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak5-Final-PMT2223.pdf", page: 3, title: "轮子转一圈相同图形数", translation: "轮子转一圈，完全相同的图形出现几次？", options: ["1", "2", "3", "5", "6"], topics: ["pangu_geom", "pangu_pattern"], hint: "读图向导：观察轮子上花纹的旋转对称阶数（旋转多少度看起来一样）。", hasImage: true, answer: "c" },
    { id: "P2223F_AK5_2", grade: 5, year: "2022/23", round: "决赛", num: 2, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak5-Final-PMT2223.pdf", page: 3, title: "3 支飞镖不可能得分", translation: "Malin 掷 3 支飞镖都命中。以下哪个总分是不可能的？（需看靶面）", options: ["27", "21", "19", "9", "8"], topics: ["pangu_count", "pangu_logic"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true, answer: "d" },
    { id: "P2223F_AK5_3", grade: 5, year: "2022/23", round: "决赛", num: 3, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak5-Final-PMT2223.pdf", page: 3, title: "218453 去 3 位得最小 5 倍数", translation: "从 218453 去掉 3 位得最小的、能被 5 整除的三位数（保序）。被去掉数字的积是多少？", options: ["20", "24", "48", "96", "160"], topics: ["pangu_number", "pangu_puzzle"], hint: "末位 5，保 1,4,5 → 145，去 2,8,3，积 = 48。答案：c", answer: "c" },
    { id: "P2223F_AK5_4", grade: 5, year: "2022/23", round: "决赛", num: 4, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak5-Final-PMT2223.pdf", page: 4, title: "第 101 张图点数", translation: "看图找规律，第 101 张图上有多少点？", options: ["401", "397", "400", "398", "399"], topics: ["pangu_pattern", "pangu_algebra"], hint: "读图向导：算前几张图的点数序列，找相邻差（等差）或相邻比（等比），推出第 n 张的通项。", hasImage: true, answer: "a" },
    { id: "P2223F_AK5_5", grade: 5, year: "2022/23", round: "决赛", num: 5, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak5-Final-PMT2223.pdf", page: 4, title: "24 方块拼矩形最小周长", translation: "Lukas 有 24 个边长 5 cm 的方块，拼成周长最小的矩形。周长是多少？", options: ["80 cm", "100 cm", "120 cm", "140 cm", "350 cm"], topics: ["pangu_geom", "pangu_algebra"], hint: "越接近正方形周长越小。24 = 4×6，边 20 与 30，周长 2(20+30)=100。答案：b", answer: "b" },
    { id: "P2223F_AK5_6", grade: 5, year: "2022/23", round: "决赛", num: 6, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak5-Final-PMT2223.pdf", page: 4, title: "灰格经 S1/S2/S3 三次镜像", translation: "灰格依次相对 S1、S2、S3 三轴做镜像。最终落到哪个位置？", options: ["5", "19", "10", "11", "12"], topics: ["pangu_geom"], hint: "读图向导：镜像不改变图形大小和点数。追踪每个关键点关于轴的对应位置，逐点映射。", hasImage: true, answer: "e" },
    { id: "P2223F_AK5_7", grade: 5, year: "2022/23", round: "决赛", num: 7, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak5-Final-PMT2223.pdf", page: 5, title: "均匀棒中点位移", translation: "100 cm 均匀棒，一端切 25 cm，另一端切 12.5 cm。中点位移几厘米？", options: ["0 cm", "6.25 cm", "12.5 cm", "18.75 cm", "37.5 cm"], topics: ["pangu_geom", "pangu_algebra", "pangu_fraction"], hint: "原中点 50 cm。剩下 [25, 87.5]，新中点 56.25。位移 6.25 cm。答案：b", answer: "b" },
    { id: "P2223F_AK5_8", grade: 5, year: "2022/23", round: "决赛", num: 8, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak5-Final-PMT2223.pdf", page: 5, title: "360×240 房间棋盘白格数", translation: "房间地板 360×240 cm，用 30×30 cm 黑白方块按棋盘拼铺。白色方块几块？", options: ["14", "28", "48", "56", "96"], topics: ["pangu_geom", "pangu_count"], hint: "12×8 = 96 块，各半 → 48 白。答案：c", answer: "c" },
    { id: "P2223F_AK5_9", grade: 5, year: "2022/23", round: "决赛", num: 9, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak5-Final-PMT2223.pdf", page: 5, title: "3 种旗帜 3 色", translation: "Lovisa 有 3 种旗，用红黄绿 3 色涂，每旗每色最多 1 次。共多少种不同的涂法？", options: ["6", "9", "12", "15", "18"], topics: ["pangu_count"], hint: "每旗 3! = 6，3 旗 × 6 = 18。答案：e", hasImage: true, answer: "d" },
    { id: "P2223F_AK5_10", grade: 5, year: "2022/23", round: "决赛", num: 10, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak5-Final-PMT2223.pdf", page: 6, title: "60 个立方体能拼几种长方体", translation: "12 块能拼 4 种不同长方体。Kevin 用正好 60 个立方体拼长方体。能拼几种？", options: ["11", "7", "9", "10", "12"], topics: ["pangu_solid", "pangu_count", "pangu_number"], hint: "60 = 2²·3·5，非序对因数分解 a≤b≤c, abc=60 有 10 种。答案：d", answer: "d" },

    // ========== 2023/2024 AK5 初赛 ==========
    { id: "P2324O1_AK5_1", grade: 5, year: "2023/24", round: "初赛", num: 1, difficulty: 1, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2324.pdf", page: 3, title: "同方向小三角数目", translation: "右图由许多小三角形组成。有多少个小三角形与左图那个方向一样？", options: ["12", "13", "14", "15", "17"], topics: ["pangu_geom", "pangu_count"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true, answer: "c" },
    { id: "P2324O1_AK5_2", grade: 5, year: "2023/24", round: "初赛", num: 2, difficulty: 1, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2324.pdf", page: 3, title: "1+11+50+39+49", translation: "计算 1+11+50+39+49 = ?", options: ["140", "100", "120", "150", "180"], topics: ["pangu_calc"], hint: "150。答案：d", answer: "d" },
    { id: "P2324O1_AK5_3", grade: 5, year: "2023/24", round: "初赛", num: 3, difficulty: 1, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2324.pdf", page: 3, title: "\"两十亿三十万零四\"是哪个数", translation: "\"两十亿三十万零四\"对应哪个数？", options: ["2000304000", "200030404", "2000300004", "230400004", "20304040"], topics: ["pangu_number"], hint: "2,000,300,004。答案：c", answer: "c" },
    { id: "P2324O1_AK5_4", grade: 5, year: "2023/24", round: "初赛", num: 4, difficulty: 2, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2324.pdf", page: 4, title: "整除规则谁对", translation: "Alex：能被 8 整除的也能被 6 整除。Bea：末位能被 2 整除的能被 4 整除。Chris：能被 2 又 5 整除的能被 10 整除。谁对？", options: ["只有 Alex", "只有 Bea", "只有 Chris", "Alex 和 Bea", "Bea 和 Chris"], topics: ["pangu_number"], hint: "只有 Chris 对（8×3=24 不被 6 整除；14 不被 4 整除；10=2·5）。答案：c", answer: "c" },
    { id: "P2324O1_AK5_5", grade: 5, year: "2023/24", round: "初赛", num: 5, difficulty: 2, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2324.pdf", page: 4, title: "84 孩子男是女 3 倍", translation: "电影厅 84 个孩子，男孩是女孩的 3 倍。女孩几人？", options: ["63", "45", "30", "21", "15"], topics: ["pangu_algebra", "pangu_app"], hint: "4x=84 → x=21。答案：d", answer: "d" },
    { id: "P2324O1_AK5_6", grade: 5, year: "2023/24", round: "初赛", num: 6, difficulty: 2, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2324.pdf", page: 4, title: "哪个大三角恰好一半绿", translation: "哪个大三角形被绿色恰好覆盖一半？", options: ["A", "B", "C", "D", "E"], topics: ["pangu_geom"], hint: "读图向导：数总格子数，再看每种拼块占几格。用面积除法估计上限，再逐个试拼。", hasImage: true, answer: "c" },
    { id: "P2324O1_AK5_7", grade: 5, year: "2023/24", round: "初赛", num: 7, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2324.pdf", page: 5, title: "5 盒排序中间盒", translation: "5 只箱 A-E 重量不同，用天平比较后从轻到重排序。中间的是哪只？", options: ["A", "B", "C", "D", "E"], topics: ["pangu_logic"], hint: "读图向导：把每种图形代成变量（例 △=a、○=b），从每张平衡的天平列一个等式，联立求解。", hasImage: true, answer: "e" },
    { id: "P2324O1_AK5_8", grade: 5, year: "2023/24", round: "初赛", num: 8, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2324.pdf", page: 5, title: "长方体积木拼立方体", translation: "用 4×6×8 cm 长方体拼立方体，至少几块？", options: ["13", "24", "64", "72", "192"], topics: ["pangu_solid", "pangu_number"], hint: "边长 24（=LCM(4,6,8)），24³÷(4·6·8) = 72。答案：d", answer: "d" },
    { id: "P2324O1_AK5_9", grade: 5, year: "2023/24", round: "初赛", num: 9, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2324.pdf", page: 5, title: "数列 5,10,30,120,600,?", translation: "数列 5, 10, 30, 120, 600, ? 下一项是几？", options: ["3000", "1800", "2400", "3600", "4200"], topics: ["pangu_pattern"], hint: "乘 2、3、4、5，下一步乘 6：600×6 = 3600。答案：d", answer: "d" },
    { id: "P2324O1_AK5_10", grade: 5, year: "2023/24", round: "初赛", num: 10, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2324.pdf", page: 5, title: "姐弟年龄 7 年后", translation: "Katharina 比 Lukas 大 5 岁。2 年后 Katharina 是 Lukas 的 2 倍。7 年后 Lukas 几岁？", options: ["8", "9", "10", "11", "12"], topics: ["pangu_app", "pangu_algebra"], hint: "Lukas 现 3 岁，7 年后 10。答案：c", answer: "c" },
    { id: "P2324O1_AK5_11", grade: 5, year: "2023/24", round: "初赛", num: 11, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2324.pdf", page: 6, title: "蚂蚁沿立方体箭头爬", translation: "蚂蚁从立方体左面中点 A 沿箭头爬到 B。边长 20 cm。爬了多远？", options: ["0.7 米", "0.8 米", "0.9 米", "1 米", "1.1 米"], topics: ["pangu_solid", "pangu_geom"], hint: "读图向导：从终点回推更快 —— 每个格子的走法 = 上邻 + 左邻（无回头方向时）。或系统列出每条路径。", hasImage: true, answer: "c" },
    { id: "P2324O1_AK5_12", grade: 5, year: "2023/24", round: "初赛", num: 12, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak5-O1-PMT2324.pdf", page: 6, title: "5×5 行列拉丁方求 x", translation: "1-5 在每行每列恰出现一次。x 处应填什么数？", options: ["1", "2", "3", "4", "5"], topics: ["pangu_puzzle", "pangu_logic"], hint: "读图向导：从约束最强的行 / 列开始（该行已填数字最多的）。逐格排除候选。", hasImage: true, answer: "c" },

    // ############# AK6 (Årskurs 6, 6 年级) #############
    // 相较 AK5 的新概念：百分数、三角形内角、多边形、简化分数、七位数计数

    // ========== 2015/2016 AK6 初赛 ==========
    { id: "P1516O1_AK6_1", grade: 6, year: "2015/16", round: "初赛", num: 1, difficulty: 1, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k6-PMT16_O1.pdf", page: 3, title: "8·9", translation: "计算：8 · 9 = ?", options: ["64", "72", "81", "63", "70"], topics: ["pangu_calc"], hint: "72。答案：b", answer: "b" },
    { id: "P1516O1_AK6_2", grade: 6, year: "2015/16", round: "初赛", num: 2, difficulty: 1, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k6-PMT16_O1.pdf", page: 3, title: "补 3×3 火柴", translation: "把右图补成由 9 个小正方形组成的大正方形。还需要多少根火柴？", options: ["4", "6", "8", "10", "12"], topics: ["pangu_geom", "pangu_count"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true },
    { id: "P1516O1_AK6_3", grade: 6, year: "2015/16", round: "初赛", num: 3, difficulty: 1, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k6-PMT16_O1.pdf", page: 3, title: "逆推加除减", translation: "谜题：加 270、除以 5、减 70，结果 30。原数是多少？", options: ["320", "300", "270", "250", "230"], topics: ["pangu_calc"], hint: "(30+70)×5-270 = 230。答案：e", answer: "e" },
    { id: "P1516O1_AK6_4", grade: 6, year: "2015/16", round: "初赛", num: 4, difficulty: 2, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k6-PMT16_O1.pdf", page: 3, title: "Max 的球", translation: "Max 有蓝红绿球。一半蓝、2 红、4 绿。共几个球？", options: ["6", "8", "10", "12", "20"], topics: ["pangu_app", "pangu_algebra"], hint: "非蓝 6 个是一半，共 12。答案：d", answer: "d" },
    { id: "P1516O1_AK6_5", grade: 6, year: "2015/16", round: "初赛", num: 5, difficulty: 2, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k6-PMT16_O1.pdf", page: 3, title: "队伍含自己 10 人", translation: "Mikael 排队，前 4 后 5。总共几人？", options: ["5", "6", "8", "9", "10"], topics: ["pangu_logic"], hint: "含自己：10。答案：e", answer: "e" },
    { id: "P1516O1_AK6_6", grade: 6, year: "2015/16", round: "初赛", num: 6, difficulty: 2, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k6-PMT16_O1.pdf", page: 3, title: "泳池一周开放时数", translation: "周一至周五 9-20，周六 9-16，周日 10-15。一周共开多少小时？", options: ["24 h", "60 h", "70 h", "64 h", "67 h"], topics: ["pangu_time", "pangu_calc"], hint: "5×11+7+5 = 67。答案：e", answer: "e" },
    { id: "P1516O1_AK6_7", grade: 6, year: "2015/16", round: "初赛", num: 7, difficulty: 3, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k6-PMT16_O1.pdf", page: 4, title: "4 缺数之和", translation: "识别图形规律，4 个缺失数之和是多少？", options: ["20", "22", "30", "32", "42"], topics: ["pangu_pattern", "pangu_puzzle"], hint: "读图向导：从形状 / 颜色 / 位置三个维度分别找周期或递推；有时\"下一个\"= 前两个组合。", hasImage: true },
    { id: "P1516O1_AK6_8", grade: 6, year: "2015/16", round: "初赛", num: 8, difficulty: 3, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k6-PMT16_O1.pdf", page: 4, title: "加法十字", translation: "加法十字缺 4 数，色格填什么？", options: ["4", "6", "8", "10", "12"], topics: ["pangu_puzzle"], hint: "读图向导：十字中央格 = 四个末端格之和 / 2。用行列等式反推缺失格。", hasImage: true },
    { id: "P1516O1_AK6_9", grade: 6, year: "2015/16", round: "初赛", num: 9, difficulty: 3, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k6-PMT16_O1.pdf", page: 4, title: "2,4,12,48 下一项", translation: "2, 4, 12, 48, ?", options: ["60", "72", "100", "240", "无规律"], topics: ["pangu_pattern"], hint: "乘 2、3、4、5：240。答案：d", answer: "d" },
    { id: "P1516O1_AK6_10", grade: 6, year: "2015/16", round: "初赛", num: 10, difficulty: 4, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k6-PMT16_O1.pdf", page: 4, title: "35 车 6 倍关系", translation: "35 辆车，黑车是灰车 6 倍。灰车几辆？", options: ["5", "6", "7", "24", "30"], topics: ["pangu_app", "pangu_algebra"], hint: "x+6x=35 → x=5。答案：a", answer: "a" },
    { id: "P1516O1_AK6_11", grade: 6, year: "2015/16", round: "初赛", num: 11, difficulty: 4, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k6-PMT16_O1.pdf", page: 4, title: "20 块补立方体", translation: "20 个小立方体，补成完整立方体还缺几块？", options: ["42", "44", "46", "48", "51"], topics: ["pangu_solid", "pangu_count"], hint: "64-20=44。答案：b", hasImage: true, answer: "b" },
    { id: "P1516O1_AK6_12", grade: 6, year: "2015/16", round: "初赛", num: 12, difficulty: 4, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k6-PMT16_O1.pdf", page: 5, title: "同形代同数求和", translation: "相同形状代表相同数字，求所有 ? 之和。", options: ["14", "16", "17", "9", "11"], topics: ["pangu_puzzle", "pangu_algebra"], hint: "读图向导：从进位约束最强的位置入手（如末位）。设未知数字为变量，逐步缩小候选。", hasImage: true },
    { id: "P1516O1_AK6_13", grade: 6, year: "2015/16", round: "初赛", num: 13, difficulty: 5, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k6-PMT16_O1.pdf", page: 5, title: "4×4 拉丁方对角深色格和", translation: "将 1,2,3,4 填入 4×4 使每行每列每对角线各出现一次。深色格内数字之和是多少？", options: ["2", "3", "4", "5", "6"], topics: ["pangu_puzzle", "pangu_logic"], hint: "读图向导：从约束最强的行 / 列开始（该行已填数字最多的）。逐格排除候选。", hasImage: true },
    { id: "P1516O1_AK6_14", grade: 6, year: "2015/16", round: "初赛", num: 14, difficulty: 5, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k6-PMT16_O1.pdf", page: 5, title: "五人赛跑顺序", translation: "Lisa 慢 Erik 10 m，Erik 快 Ron 20 m。Ron 慢 Anna 5 m，慢 Daniella 25 m。过线顺序？", options: ["RALED", "DALER", "LERAD", "DELAR", "LADER"], topics: ["pangu_logic"], hint: "D,E,L,A,R → DELAR。答案：d", answer: "d" },
    { id: "P1516O1_AK6_15", grade: 6, year: "2015/16", round: "初赛", num: 15, difficulty: 5, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k6-PMT16_O1.pdf", page: 5, title: "1+3+…+99 = ?", translation: "由规律 1+3=2²、1+3+5=3² …，求 1+3+5+…+99。", options: ["999", "10250", "5300", "2500", "1989"], topics: ["pangu_pattern", "pangu_algebra"], hint: "50 项，50² = 2500。答案：d", answer: "d" },

    // ========== 2015/2016 AK6 复赛 ==========
    { id: "P1516O2_AK6_1", grade: 6, year: "2015/16", round: "复赛", num: 1, difficulty: 2, file: "盘古竞赛/O2-ü0ç3k6-PMT16.pdf", page: 3, title: "29 数到 99", translation: "从 29 数到 99，每数 1 秒。共用多少时间？", options: ["1分9秒", "1分10秒", "1分11秒", "1分12秒", "1分19秒"], topics: ["pangu_calc"], hint: "71 秒 = 1 分 11 秒。答案：c", answer: "c" },
    { id: "P1516O2_AK6_2", grade: 6, year: "2015/16", round: "复赛", num: 2, difficulty: 2, file: "盘古竞赛/O2-ü0ç3k6-PMT16.pdf", page: 3, title: "蚂蚁绕图周长", translation: "蚂蚁绕图形一圈几米？（8 米、3 米两个尺寸）", options: ["11 米", "19 米", "22 米", "24 米", "29 米"], topics: ["pangu_geom", "pangu_app"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true },
    { id: "P1516O2_AK6_3", grade: 6, year: "2015/16", round: "复赛", num: 3, difficulty: 2, file: "盘古竞赛/O2-ü0ç3k6-PMT16.pdf", page: 3, title: "正方形拼图哪块不属于", translation: "一个正方形被分成 8 块。以下哪个选项不属于这个正方形？", options: ["A", "B", "C", "D", "E"], topics: ["pangu_geom", "pangu_puzzle"], hint: "读图向导：数总格子数，再看每种拼块占几格。用面积除法估计上限，再逐个试拼。", hasImage: true },
    { id: "P1516O2_AK6_4", grade: 6, year: "2015/16", round: "复赛", num: 4, difficulty: 3, file: "盘古竞赛/O2-ü0ç3k6-PMT16.pdf", page: 3, title: "2/3 轮车 7 辆 19 轮", translation: "共 7 辆二轮或三轮车，19 个轮。二轮车几辆？", options: ["6", "5", "4", "3", "2"], topics: ["pangu_app", "pangu_algebra"], hint: "2x+3(7-x)=19 → x=2。答案：e", answer: "e" },
    { id: "P1516O2_AK6_5", grade: 6, year: "2015/16", round: "复赛", num: 5, difficulty: 3, file: "盘古竞赛/O2-ü0ç3k6-PMT16.pdf", page: 4, title: "102 球 7 孩最少加几", translation: "102 球分 7 孩子，最少加几个才平均？", options: ["1", "2", "3", "4", "5"], topics: ["pangu_calc"], hint: "105-102 = 3。答案：c", answer: "c" },
    { id: "P1516O2_AK6_6", grade: 6, year: "2015/16", round: "复赛", num: 6, difficulty: 3, file: "盘古竞赛/O2-ü0ç3k6-PMT16.pdf", page: 4, title: "连续 4 整数不成立式", translation: "A,B,C,D 是连续 4 整数。以下哪个不成立？", options: ["C-A=D-B", "C=A+2", "D=A+3", "B-A=D-C", "A+C=B+D"], topics: ["pangu_algebra", "pangu_number"], hint: "A+C=2A+2, B+D=2A+4，不等。答案：e", answer: "e" },
    { id: "P1516O2_AK6_7", grade: 6, year: "2015/16", round: "复赛", num: 7, difficulty: 4, file: "盘古竞赛/O2-ü0ç3k6-PMT16.pdf", page: 4, title: "牛奶杯重量", translation: "满杯牛奶 370 克，半杯 290 克。空杯多重？", options: ["80 克", "100 克", "160 克", "180 克", "210 克"], topics: ["pangu_app", "pangu_algebra"], hint: "半杯牛奶 80 克，满杯牛奶 160 克，空杯 = 370-160 = 210。答案：e", answer: "e" },
    { id: "P1516O2_AK6_8", grade: 6, year: "2015/16", round: "复赛", num: 8, difficulty: 4, file: "盘古竞赛/O2-ü0ç3k6-PMT16.pdf", page: 4, title: "不能折成立方体", translation: "哪个展开图不能折成立方体？", options: ["A", "B", "C", "D", "E"], topics: ["pangu_solid"], hint: "读图向导：立方体对面之和恒为 7。展开图折叠时可先固定一面为底、追踪相邻关系；三视图题分层扫描每一层的方块数。", hasImage: true },
    { id: "P1516O2_AK6_9", grade: 6, year: "2015/16", round: "复赛", num: 9, difficulty: 4, file: "盘古竞赛/O2-ü0ç3k6-PMT16.pdf", page: 4, title: "300 米棱框 5 立方体一面几方格", translation: "5 个大小相同立方体棱框共需 300 米。一面能容几个 1 m² 方格？", options: ["25", "36", "49", "5", "16"], topics: ["pangu_solid", "pangu_geom"], hint: "每立方 12 棱共 60 米，棱长 5 米，一面 25 方格。答案：a", answer: "a" },
    { id: "P1516O2_AK6_10", grade: 6, year: "2015/16", round: "复赛", num: 10, difficulty: 5, file: "盘古竞赛/O2-ü0ç3k6-PMT16.pdf", page: 5, title: "乘法表 3 灰格数字和", translation: "乘法表：三个数字横竖乘，给出结果。填完表后，3 个灰色格中的数字之和是多少？", options: ["12", "13", "14", "16", "17"], topics: ["pangu_puzzle", "pangu_algebra"], hint: "读图向导：用\"整体面积 − 空白面积\"更快；或把阴影分解成矩形 / 三角形之和。若图形对称，可只算 1/2 或 1/4 再乘。", hasImage: true },
    { id: "P1516O2_AK6_11", grade: 6, year: "2015/16", round: "复赛", num: 11, difficulty: 5, file: "盘古竞赛/O2-ü0ç3k6-PMT16.pdf", page: 5, title: "内嵌 3 cm 正方形阴影周长", translation: "大正方形 ABCD 内含边长 3 cm 的小正方形。阴影周长多少？", options: ["16 cm", "14 cm", "12 cm", "10 cm", "8 cm"], topics: ["pangu_geom"], hint: "读图向导：用\"整体面积 − 空白面积\"更快；或把阴影分解成矩形 / 三角形之和。若图形对称，可只算 1/2 或 1/4 再乘。", hasImage: true },
    { id: "P1516O2_AK6_12", grade: 6, year: "2015/16", round: "复赛", num: 12, difficulty: 5, file: "盘古竞赛/O2-ü0ç3k6-PMT16.pdf", page: 5, title: "望远交替和", translation: "计算 2-1+3-2+4-3+5-4+6-5+…+101-100 = ?", options: ["99", "100", "101", "102", "104"], topics: ["pangu_pattern", "pangu_algebra"], hint: "每对差为 1，共 100 对 → 100。答案：b", answer: "b" },

    // ========== 2015/2016 AK6 决赛 ==========
    { id: "P1516F_AK6_1", grade: 6, year: "2015/16", round: "决赛", num: 1, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k6-PMT16-v2.pdf", page: 3, title: "Ron 割草 2/5 用 18 分", translation: "Ron 割 2/5 草坪用 18 分。10:00 开始，几点割完全部？", options: ["10:38", "10:45", "10:50", "10:52", "10:54"], topics: ["pangu_fraction", "pangu_app"], hint: "全场 = 18÷(2/5) = 45 分。10:00+45 = 10:45。答案：b", answer: "b" },
    { id: "P1516F_AK6_2", grade: 6, year: "2015/16", round: "决赛", num: 2, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k6-PMT16-v2.pdf", page: 3, title: "6,11,16 第 100 项", translation: "数列 6,11,16,21,26,… 第 100 项是几？", options: ["600", "502", "500", "602", "501"], topics: ["pangu_pattern", "pangu_algebra"], hint: "6+99×5 = 501。答案：e", answer: "e" },
    { id: "P1516F_AK6_3", grade: 6, year: "2015/16", round: "决赛", num: 3, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k6-PMT16-v2.pdf", page: 3, title: "A→B 路径数", translation: "按箭头从 A 到 B，共几种走法？", options: ["9", "10", "11", "12", "13"], topics: ["pangu_count"], hint: "读图向导：从终点回推更快 —— 每个格子的走法 = 上邻 + 左邻（无回头方向时）。或系统列出每条路径。", hasImage: true },
    { id: "P1516F_AK6_4", grade: 6, year: "2015/16", round: "决赛", num: 4, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k6-PMT16-v2.pdf", page: 3, title: "31+33+…+81 之和", translation: "计算 31+33+35+…+81 = ?", options: ["1238", "1245", "1375", "1453", "1456"], topics: ["pangu_pattern", "pangu_algebra"], hint: "26 项，(31+81)×26÷2 = 1456。答案：e", answer: "e" },
    { id: "P1516F_AK6_5", grade: 6, year: "2015/16", round: "决赛", num: 5, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k6-PMT16-v2.pdf", page: 3, title: "书架三层 120 本", translation: "书架 3 层共 120 本。上层比中层多 11，下层比中层少 5。下层几本？", options: ["32", "33", "38", "40", "49"], topics: ["pangu_algebra", "pangu_app"], hint: "中层 x：(x+11)+x+(x-5)=120 → x=38，下层 33。答案：b", answer: "b" },
    { id: "P1516F_AK6_6", grade: 6, year: "2015/16", round: "决赛", num: 6, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k6-PMT16-v2.pdf", page: 4, title: "KLMN 阴影面积", translation: "每个正方形边长 2 cm。阴影区域 KLMN 面积是多少 cm²？", options: ["96", "84", "76", "88", "104"], topics: ["pangu_geom"], hint: "读图向导：用\"整体面积 − 空白面积\"更快；或把阴影分解成矩形 / 三角形之和。若图形对称，可只算 1/2 或 1/4 再乘。", hasImage: true },
    { id: "P1516F_AK6_7", grade: 6, year: "2015/16", round: "决赛", num: 7, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k6-PMT16-v2.pdf", page: 4, title: "图 30 有多少块", translation: "图 1: 5 块，图 2: 7 块，图 3: 9 块。图 30 几块？", options: ["62", "63", "64", "65", "66"], topics: ["pangu_pattern", "pangu_algebra"], hint: "5+2(n-1)。n=30 → 63。答案：b", answer: "b" },
    { id: "P1516F_AK6_8", grade: 6, year: "2015/16", round: "决赛", num: 8, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k6-PMT16-v2.pdf", page: 4, title: "矩形内两圆", translation: "矩形内两圆相切，圆半径 2 cm。矩形面积多少？", options: ["32 cm²", "24 cm²", "16 cm²", "12 cm²", "8 cm²"], topics: ["pangu_geom"], hint: "宽 4, 长 8：面积 32。答案：a", hasImage: true, answer: "a" },
    { id: "P1516F_AK6_9", grade: 6, year: "2015/16", round: "决赛", num: 9, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k6-PMT16-v2.pdf", page: 4, title: "三天平称重", translation: "三个天平图显示不同图形的重量。求指定图形多重？", options: ["3", "5", "12", "6", "5.5"], topics: ["pangu_app", "pangu_algebra"], hint: "读图向导：把每种图形代成变量（例 △=a、○=b），从每张平衡的天平列一个等式，联立求解。", hasImage: true },
    { id: "P1516F_AK6_10", grade: 6, year: "2015/16", round: "决赛", num: 10, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k6-PMT16-v2.pdf", page: 5, title: "骰子滚动顶面", translation: "骰子对面之和 7，滚动到 X 时顶面是几？", options: ["2", "3", "4", "5", "6"], topics: ["pangu_solid"], hint: "读图向导：立方体对面之和恒为 7。展开图折叠时可先固定一面为底、追踪相邻关系；三视图题分层扫描每一层的方块数。", hasImage: true },
    { id: "P1516F_AK6_11", grade: 6, year: "2015/16", round: "决赛", num: 11, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k6-PMT16-v2.pdf", page: 5, title: "展开图 A、C 边号和", translation: "立方体展开图，边 A、B、C 折叠后与 1-8 中某条相接。A 与 C 边号之和？", options: ["3", "4", "5", "6", "8"], topics: ["pangu_solid"], hint: "读图向导：立方体对面之和恒为 7。展开图折叠时可先固定一面为底、追踪相邻关系；三视图题分层扫描每一层的方块数。", hasImage: true },
    { id: "P1516F_AK6_12", grade: 6, year: "2015/16", round: "决赛", num: 12, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k6-PMT16-v2.pdf", page: 5, title: "矩形中点阴影面积", translation: "矩形 ABDE 的中点 F 和 C。AB=9 cm，BC=13 cm，阴影面积（cm²）？", options: ["选项见图", "选项见图", "选项见图", "选项见图", "选项见图"], topics: ["pangu_geom", "pangu_fraction"], hint: "读图向导：用\"整体面积 − 空白面积\"更快；或把阴影分解成矩形 / 三角形之和。若图形对称，可只算 1/2 或 1/4 再乘。", hasImage: true },
    { id: "P1516F_AK6_13", grade: 6, year: "2015/16", round: "决赛", num: 13, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k6-PMT16-v2.pdf", page: 6, title: "Linus 7 步 vs David 13 步", translation: "Linus 从 7 每步加 7；David 从 5 每步加 13。最小公共数？", options: ["42", "56", "62", "68", "70"], topics: ["pangu_number", "pangu_algebra"], hint: "5+13k 能被 7 整除 → k=5 → 70。答案：e", answer: "e" },
    { id: "P1516F_AK6_14", grade: 6, year: "2015/16", round: "决赛", num: 14, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k6-PMT16-v2.pdf", page: 6, title: "立方体三视图字母", translation: "立方体 6 面字母。三视图下阴影面是哪个字母？", options: ["T", "P", "X", "E", "V"], topics: ["pangu_solid"], hint: "读图向导：分别读出正视 / 侧视 / 顶视三张图，对应立体结构逐层放方块，注意\"多个方块共用同一列\"造成的错位。", hasImage: true },
    { id: "P1516F_AK6_15", grade: 6, year: "2015/16", round: "决赛", num: 15, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k6-PMT16-v2.pdf", page: 6, title: "两等大正方形阴影面积", translation: "正方形 ABCD 与 EFGH 一样大。DH=HC=CE=6 cm。阴影面积多少 cm²？", options: ["144 cm²", "122 cm²", "96 cm²", "72 cm²", "48 cm²"], topics: ["pangu_geom"], hint: "读图向导：用\"整体面积 − 空白面积\"更快；或把阴影分解成矩形 / 三角形之和。若图形对称，可只算 1/2 或 1/4 再乘。", hasImage: true },

    // ========== 2021/2022 AK6 决赛 ==========
    { id: "P2122F_AK6_1", grade: 6, year: "2021/22", round: "决赛", num: 1, difficulty: 3, file: "盘古竞赛/PMT2122-6-Final.pdf", page: 3, title: "几何图形与数字关系", translation: "上方几何图形与旁边数字有某种关系。问号处的数是几？", options: ["15", "16", "17", "18", "19"], topics: ["pangu_pattern", "pangu_puzzle"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true, answer: "c" },
    { id: "P2122F_AK6_2", grade: 6, year: "2021/22", round: "决赛", num: 2, difficulty: 3, file: "盘古竞赛/PMT2122-6-Final.pdf", page: 3, title: "五边形周长 38 求矩形面积", translation: "矩形 ABCD 与等边三角形 BCD 共用边 BD。DC = 6 cm，五边形 ABCDE 周长 38 cm。矩形面积多少？", options: ["30 cm²", "36 cm²", "48 cm²", "60 cm²", "72 cm²"], topics: ["pangu_geom", "pangu_algebra"], hint: "等边三角形边 6，矩形 3 条边共 38-2×6 = 26；宽 6，长 (26-6)÷2 = 10；面积 60。答案：d", hasImage: true, answer: "d" },
    { id: "P2122F_AK6_3", grade: 6, year: "2021/22", round: "决赛", num: 3, difficulty: 3, file: "盘古竞赛/PMT2122-6-Final.pdf", page: 4, title: "对折两次剪出图形", translation: "正方形纸对折两次并按图裁剪。展开后是哪个图形？", options: ["A", "B", "C", "D", "E"], topics: ["pangu_geom"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true, answer: "a" },
    { id: "P2122F_AK6_4", grade: 6, year: "2021/22", round: "决赛", num: 4, difficulty: 3, file: "盘古竞赛/PMT2122-6-Final.pdf", page: 4, title: "四正整数 a·d", translation: "a、b、c、d 是正整数：a+b+c+d=27，b+c=15，a=d+6。求 a·d。", options: ["20", "27", "32", "40", "42"], topics: ["pangu_algebra"], hint: "a+d=12，a=d+6 → d=3, a=9，a·d=27。答案：b", answer: "b" },
    { id: "P2122F_AK6_5", grade: 6, year: "2021/22", round: "决赛", num: 5, difficulty: 4, file: "盘古竞赛/PMT2122-6-Final.pdf", page: 5, title: "Lukas 移火柴形成 2 三角形", translation: "Lukas 移动几根火柴形成两个三角形。至少移几根？", options: ["1", "2", "3", "4", "5"], topics: ["pangu_geom", "pangu_puzzle"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true, answer: "b" },
    { id: "P2122F_AK6_6", grade: 6, year: "2021/22", round: "决赛", num: 6, difficulty: 4, file: "盘古竞赛/PMT2122-6-Final.pdf", page: 5, title: "符号代表某数字", translation: "加法和乘法算式中每个符号代表某数字。同符号代同数。求指定值。", options: ["6", "7", "8", "9", "10"], topics: ["pangu_puzzle", "pangu_algebra"], hint: "读图向导：从进位约束最强的位置入手（如末位）。设未知数字为变量，逐步缩小候选。", hasImage: true, answer: "d" },
    { id: "P2122F_AK6_7", grade: 6, year: "2021/22", round: "决赛", num: 7, difficulty: 4, file: "盘古竞赛/PMT2122-6-Final.pdf", page: 5, title: "Henrik 36 四孩年龄", translation: "Henrik 36 岁，4 孩子分别 2、4、5、7 岁。几年后 Henrik 是四孩年龄之和的一半？", options: ["19", "22", "26", "27", "29"], topics: ["pangu_app", "pangu_algebra"], hint: "36+x = (18+4x)/2 → x = 27。答案：d", answer: "d" },
    { id: "P2122F_AK6_8", grade: 6, year: "2021/22", round: "决赛", num: 8, difficulty: 5, file: "盘古竞赛/PMT2122-6-Final.pdf", page: 5, title: "7 位回文数个数", translation: "回文数正反读一样（如 1331）。7 位回文数有几个？", options: ["900", "6561", "8100", "9000", "10000"], topics: ["pangu_number", "pangu_count"], hint: "abcdcba：a∈1-9 共 9，b,c,d∈0-9 各 10。9×10³ = 9000。答案：d", answer: "d" },
    { id: "P2122F_AK6_9", grade: 6, year: "2021/22", round: "决赛", num: 9, difficulty: 5, file: "盘古竞赛/PMT2122-6-Final.pdf", page: 6, title: "4 帽子 1 真话找球", translation: "4 帽子上各一句话，仅一句真。球在哪顶？帽1:球在2或3；帽2:球在1或4；帽3:球在这顶；帽4:球不在这顶", options: ["帽 1", "帽 2", "帽 3", "帽 4", "无法确定"], topics: ["pangu_logic"], hint: "枚举检验，仅帽 2 为真自洽，球在 1。答案：a", hasImage: true, answer: "d" },
    { id: "P2122F_AK6_10", grade: 6, year: "2021/22", round: "决赛", num: 10, difficulty: 5, file: "盘古竞赛/PMT2122-6-Final.pdf", page: 6, title: "Christian 漫画（中国剩余）", translation: "分成 3、4、5 一组，每次都少 2 本才能分完。总数 < 200。最多几本？", options: ["58", "116", "174", "178", "198"], topics: ["pangu_number", "pangu_algebra"], hint: "n ≡ -2 (mod 3,4,5) → n ≡ 58 (mod 60)。< 200 最大 178。答案：d", answer: "d" },

    // ========== 2022/2023 AK6 初赛 ==========
    { id: "P2223O1_AK6_1", grade: 6, year: "2022/23", round: "初赛", num: 1, difficulty: 1, file: "盘古竞赛/Fragekatalog-Ak6-O1-PMT2223.pdf", page: 3, title: "火车 Malmö→Göteborg", translation: "火车 06:31 出发 08:19 到。行程多长？", options: ["1时8分", "1时28分", "1时38分", "1时48分", "2时12分"], topics: ["pangu_time"], hint: "1 时 48 分。答案：d", answer: "d" },
    { id: "P2223O1_AK6_2", grade: 6, year: "2022/23", round: "初赛", num: 2, difficulty: 1, file: "盘古竞赛/Fragekatalog-Ak6-O1-PMT2223.pdf", page: 3, title: "5 小时几分钟", translation: "5 小时是多少分钟？（原题选项存疑，5 h = 300 分与选项不符，可能 PDF 打印错。请以 PDF 原题为准。）", options: ["75 分", "76 分", "78 分", "80 分", "82 分"], topics: ["pangu_calc"], hint: "5 小时 = 300 分钟。若选项如此，可能原题实为其他单位换算，答案以 PDF 为准。", answer: "a" },
    { id: "P2223O1_AK6_3", grade: 6, year: "2022/23", round: "初赛", num: 3, difficulty: 1, file: "盘古竞赛/Fragekatalog-Ak6-O1-PMT2223.pdf", page: 3, title: "涨价 50%", translation: "游戏原价 200 kr，涨 50%。现价多少？", options: ["100 kr", "150 kr", "250 kr", "300 kr", "400 kr"], topics: ["pangu_percent"], hint: "200×1.5 = 300。答案：d", answer: "d" },
    { id: "P2223O1_AK6_4", grade: 6, year: "2022/23", round: "初赛", num: 4, difficulty: 2, file: "盘古竞赛/Fragekatalog-Ak6-O1-PMT2223.pdf", page: 3, title: "5 木棒选 3 拼三角形", translation: "5 根木棒长度 1、2、3、4、5 cm。选 3 根能拼多少种不同的三角形？", options: ["1", "2", "3", "5", "10"], topics: ["pangu_geom", "pangu_count"], hint: "三角不等式：可行 (2,3,4)(2,4,5)(3,4,5) 三种。答案：c", answer: "c" },
    { id: "P2223O1_AK6_5", grade: 6, year: "2022/23", round: "初赛", num: 5, difficulty: 2, file: "盘古竞赛/Fragekatalog-Ak6-O1-PMT2223.pdf", page: 3, title: "骑士加盔甲", translation: "盔甲 19 kg，骑士比盔甲重 61 kg。穿上盔甲共多重？", options: ["52 kg", "80 kg", "99 kg", "108 kg", "118 kg"], topics: ["pangu_app"], hint: "99 kg。答案：c", answer: "c" },
    { id: "P2223O1_AK6_6", grade: 6, year: "2022/23", round: "初赛", num: 6, difficulty: 2, file: "盘古竞赛/Fragekatalog-Ak6-O1-PMT2223.pdf", page: 3, title: "斐波那契缺项", translation: "1,1,2,3,5,?,13,21,... 缺哪个？", options: ["12", "11", "10", "9", "8"], topics: ["pangu_pattern"], hint: "8。答案：e", answer: "e" },
    { id: "P2223O1_AK6_7", grade: 6, year: "2022/23", round: "初赛", num: 7, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak6-O1-PMT2223.pdf", page: 4, title: "祖孙三代", translation: "外婆是女儿 2 倍、外孙女 6 倍，三人共 130。外婆几岁？", options: ["72", "78", "81", "84", "87"], topics: ["pangu_algebra", "pangu_app"], hint: "13x, 10x=130, x=13, 外婆 78。答案：b", answer: "b" },
    { id: "P2223O1_AK6_8", grade: 6, year: "2022/23", round: "初赛", num: 8, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak6-O1-PMT2223.pdf", page: 4, title: "3 正方形拼矩形周长 16", translation: "3 个大小相同的正方形拼成周长 16 cm 的矩形。1 个正方形周长多少？", options: ["16 cm", "6.4 cm", "8 cm", "10.4 cm", "24 cm"], topics: ["pangu_geom", "pangu_algebra"], hint: "拼后矩形宽 s、长 3s，周长 8s=16 → s=2；正方形周长 4×2=8。答案：c", answer: "c" },
    { id: "P2223O1_AK6_9", grade: 6, year: "2022/23", round: "初赛", num: 9, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak6-O1-PMT2223.pdf", page: 4, title: "Alex 是 Jacob 年龄 1/6", translation: "Jacob 72 岁，Alex 是 Jacob 年龄的 1/6。Alex 多大？", options: ["9", "10", "11", "12", "15"], topics: ["pangu_fraction", "pangu_calc"], hint: "72÷6 = 12。答案：d", answer: "d" },
    { id: "P2223O1_AK6_10", grade: 6, year: "2022/23", round: "初赛", num: 10, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak6-O1-PMT2223.pdf", page: 4, title: "三角形折餐巾底边", translation: "图 1 三角形按图折叠成餐巾。原三角形底边多长？", options: ["14 cm", "21 cm", "24.5 cm", "28 cm", "35 cm"], topics: ["pangu_geom", "pangu_fraction"], hint: "读图向导：立方体对面之和恒为 7。展开图折叠时可先固定一面为底、追踪相邻关系；三视图题分层扫描每一层的方块数。", hasImage: true, answer: "d" },
    { id: "P2223O1_AK6_11", grade: 6, year: "2022/23", round: "初赛", num: 11, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak6-O1-PMT2223.pdf", page: 5, title: "等边+等腰求角 v", translation: "△ABC 等边、△ABD 等腰。求角 v 大小。（图不按比例）", options: ["85°", "80°", "73°", "74°", "75°"], topics: ["pangu_angle", "pangu_geom"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true, answer: "e" },
    { id: "P2223O1_AK6_12", grade: 6, year: "2022/23", round: "初赛", num: 12, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak6-O1-PMT2223.pdf", page: 5, title: "abc+bc+c=707 求 a−b+c", translation: "abc 三位、bc 两位、c 一位，abc+bc+c=707。当 abc 最大时，a−b+c 是多少？", options: ["11", "12", "13", "19", "23"], topics: ["pangu_algebra", "pangu_number"], hint: "abc+bc+c = (100a+10b+c)+(10b+c)+c = 100a+20b+3c = 707。系统枚举 a=6：20b+3c=107 → b=5, c=(107-100)/3 无整数；b=4, c=27/3=9 ✓ → abc=649；试更大：a=6,b=5,c=(107-100)/3 无整数 → 649 为最大。a-b+c = 6-4+9 = 11。答案：a", answer: "a" },

    // ========== 2023/2024 AK6 决赛 ==========
    { id: "P2324F_AK6_1", grade: 6, year: "2023/24", round: "决赛", num: 1, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak6-FINAL-PMT2324.pdf", page: 3, title: "两 L 形拼几种", translation: "2 块 L 形拼图（可旋转）。下面 5 种形状能拼出几种？", options: ["1", "2", "3", "4", "5"], topics: ["pangu_geom", "pangu_count"], hint: "读图向导：数总格子数，再看每种拼块占几格。用面积除法估计上限，再逐个试拼。", hasImage: true },
    { id: "P2324F_AK6_2", grade: 6, year: "2023/24", round: "决赛", num: 2, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak6-FINAL-PMT2324.pdf", page: 3, title: "图中几个正方形", translation: "图中一共有多少个正方形？", options: ["8", "10", "12", "14", "18"], topics: ["pangu_count", "pangu_geom"], hint: "读图向导：按边长分类枚举（先数 1×1，再 2×2，再 3×3…），最后求和。注意斜置正方形不要漏。", hasImage: true },
    { id: "P2324F_AK6_3", grade: 6, year: "2023/24", round: "决赛", num: 3, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak6-FINAL-PMT2324.pdf", page: 3, title: "串珠盒剩几颗", translation: "珠子按某规律串。盒子里剩几颗？", options: ["16", "18", "19", "20", "23"], topics: ["pangu_pattern"], hint: "读图向导：算前几张图的点数序列，找相邻差（等差）或相邻比（等比），推出第 n 张的通项。", hasImage: true },
    { id: "P2324F_AK6_4", grade: 6, year: "2023/24", round: "决赛", num: 4, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak6-FINAL-PMT2324.pdf", page: 4, title: "鸵鸟比蜂鸟重多少克", translation: "蜂鸟 2 g，鸵鸟 156 kg。鸵鸟比蜂鸟重多少克？", options: ["1558 g", "15598 g", "1556002 g", "155998 g", "154 kg"], topics: ["pangu_app", "pangu_calc"], hint: "155998 g。答案：d", answer: "d" },
    { id: "P2324F_AK6_5", grade: 6, year: "2023/24", round: "决赛", num: 5, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak6-FINAL-PMT2324.pdf", page: 4, title: "0.96 米钢丝做立方体棱", translation: "把 0.96 米钢丝剪成小段，正好做立方体棱。每段多长？", options: ["4 cm", "6 cm", "8 cm", "10 cm", "12 cm"], topics: ["pangu_solid", "pangu_calc"], hint: "96÷12 = 8 cm。答案：c", answer: "c" },
    { id: "P2324F_AK6_6", grade: 6, year: "2023/24", round: "决赛", num: 6, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak6-FINAL-PMT2324.pdf", page: 4, title: "5 个孩子谁最小", translation: "Vera 生在 Jenny 后；Kalle 生在 Tanja 前；Anna 比 Vera 小；Kalle 比 Jenny 大；Tanja 不最小。谁最小？", options: ["Anna", "Tanja", "Vera", "Jenny", "Kalle"], topics: ["pangu_logic"], hint: "Anna。答案：a", answer: "a" },
    { id: "P2324F_AK6_7", grade: 6, year: "2023/24", round: "决赛", num: 7, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak6-FINAL-PMT2324.pdf", page: 4, title: "三角形第三边整数长度", translation: "两边 4cm、5cm，第三边整数。有几种可能？", options: ["1", "4", "5", "7", "8"], topics: ["pangu_geom"], hint: "1<c<9, c∈{2,3,4,5,6,7,8}，共 7。答案：d", answer: "d" },
    { id: "P2324F_AK6_8", grade: 6, year: "2023/24", round: "决赛", num: 8, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak6-FINAL-PMT2324.pdf", page: 5, title: "1..1000 连成大数位数", translation: "写下 1 到 1000 连起来，共多少位？", options: ["1000", "2893", "2890", "2900", "3001"], topics: ["pangu_count", "pangu_number"], hint: "2893。答案：b", answer: "b" },
    { id: "P2324F_AK6_9", grade: 6, year: "2023/24", round: "决赛", num: 9, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak6-FINAL-PMT2324.pdf", page: 5, title: "Åsa 想的数（真假各一）", translation: "Åsa 想 2、4、5、6、8 之一。两句陈述中一真一假：\n1) 数小于 6\n2) 数不能被 3 整除\n她想的是哪个？", options: ["2", "4", "5", "6", "8"], topics: ["pangu_logic", "pangu_number"], hint: "6：1 假(6=6)、2 假(6=2·3)——两假不行；8：1 假、2 真——恰好一真。答案：e", answer: "e" },
    { id: "P2324F_AK6_10", grade: 6, year: "2023/24", round: "决赛", num: 10, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak6-FINAL-PMT2324.pdf", page: 5, title: "n/(100-n) 化为自然数的 n 个数", translation: "分数 n/(100-n)，n 是自然数。化简为自然数（不含 0）的 n 有几个？", options: ["99", "50", "10", "8", "1"], topics: ["pangu_fraction", "pangu_number"], hint: "n = k(100-n) → n=100k/(k+1)。k=1:50, k=3:75, k=4:80, k=9:90, k=19:95, k=24:96, k=49:98, k=99:99。共 8 个。答案：d", answer: "d" },

    // ############# AK7 (Årskurs 7, 7 年级) #############
    // 相较 AK6 的新概念：中位数/平均数、速度问题、集合（并/交）、字母算式、面积复合图形

    // ========== 2015/2016 AK7 复赛 ==========
    { id: "P1516O2_AK7_1", grade: 7, year: "2015/16", round: "复赛", num: 1, difficulty: 2, file: "盘古竞赛/O2-ü0ç3k7-PMT16.pdf", page: 3, title: "找出不同的图", translation: "哪一个图形与其他不一样？", options: ["A", "B", "C", "D", "E"], topics: ["pangu_geom", "pangu_logic"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true },
    { id: "P1516O2_AK7_2", grade: 7, year: "2015/16", round: "复赛", num: 2, difficulty: 2, file: "盘古竞赛/O2-ü0ç3k7-PMT16.pdf", page: 3, title: "5/6 与 7/8 之间的分数", translation: "下列哪个分数在 5/6 和 7/8 之间？", options: ["4/5", "18/22", "41/48", "8/9", "2/3"], topics: ["pangu_fraction"], hint: "5/6=40/48, 7/8=42/48, 中间为 41/48。答案：c", answer: "c" },
    { id: "P1516O2_AK7_3", grade: 7, year: "2015/16", round: "复赛", num: 3, difficulty: 2, file: "盘古竞赛/O2-ü0ç3k7-PMT16.pdf", page: 3, title: "不能折立方体", translation: "哪个展开图不能折成立方体？", options: ["A", "B", "C", "D", "E"], topics: ["pangu_solid"], hint: "读图向导：立方体对面之和恒为 7。展开图折叠时可先固定一面为底、追踪相邻关系；三视图题分层扫描每一层的方块数。", hasImage: true },
    { id: "P1516O2_AK7_4", grade: 7, year: "2015/16", round: "复赛", num: 4, difficulty: 3, file: "盘古竞赛/O2-ü0ç3k7-PMT16.pdf", page: 3, title: "望远交替和", translation: "计算 2-1+3-2+4-3+…+101-100 = ?", options: ["99", "100", "101", "102", "104"], topics: ["pangu_pattern"], hint: "100 对差为 1，共 100。答案：b", answer: "b" },
    { id: "P1516O2_AK7_5", grade: 7, year: "2015/16", round: "复赛", num: 5, difficulty: 3, file: "盘古竞赛/O2-ü0ç3k7-PMT16.pdf", page: 3, title: "内嵌 3 cm 正方形阴影周长", translation: "大正方形 ABCD 内含边长 3 cm 的小正方形。阴影周长多少？", options: ["16 cm", "14 cm", "12 cm", "10 cm", "8 cm"], topics: ["pangu_geom"], hint: "读图向导：用\"整体面积 − 空白面积\"更快；或把阴影分解成矩形 / 三角形之和。若图形对称，可只算 1/2 或 1/4 再乘。", hasImage: true },
    { id: "P1516O2_AK7_6", grade: 7, year: "2015/16", round: "复赛", num: 6, difficulty: 4, file: "盘古竞赛/O2-ü0ç3k7-PMT16.pdf", page: 4, title: "7 根火柴拼三角形种数", translation: "用 7 根火柴能拼多少种不同的三角形？（3,3,1 与 3,1,3 视为同一种）", options: ["2", "3", "4", "5", "6"], topics: ["pangu_geom", "pangu_count"], hint: "三边为正整数且和为 7 且满足三角不等式：(1,3,3)(2,2,3)(1,2,4 不成)。答案：a", answer: "a" },
    { id: "P1516O2_AK7_7", grade: 7, year: "2015/16", round: "复赛", num: 7, difficulty: 4, file: "盘古竞赛/O2-ü0ç3k7-PMT16.pdf", page: 4, title: "a、b∈[1,2013] 表达式最大值", translation: "a、b 是 1-2013 之间的任意数。原题给出一个表达式（详见 PDF），求最大值。", options: ["4025", "2016", "4024", "4026", "1337"], topics: ["pangu_algebra"], hint: "读图向导：从 PDF 中读出完整表达式，按运算优先级逐步化简。", hasImage: true },
    { id: "P1516O2_AK7_8", grade: 7, year: "2015/16", round: "复赛", num: 8, difficulty: 4, file: "盘古竞赛/O2-ü0ç3k7-PMT16.pdf", page: 4, title: "4 矩形+中间正方形", translation: "图中 4 个长方形（长 5、宽 3）围成一个中间的正方形。中间正方形面积多少？", options: ["4 cm²", "6 cm²", "8 cm²", "9 cm²", "1 cm²"], topics: ["pangu_geom"], hint: "中央方形边长 = 5-3 = 2 cm，面积 4。答案：a", hasImage: true, answer: "a" },
    { id: "P1516O2_AK7_9", grade: 7, year: "2015/16", round: "复赛", num: 9, difficulty: 4, file: "盘古竞赛/O2-ü0ç3k7-PMT16.pdf", page: 4, title: "40 km 前半 15 km/h 求后半", translation: "Josefin 14:00 出发，2 小时内骑 40 km 从 Täby 到 Tullinge。前 20 km 以 15 km/h 骑。后半段需多快才准时？", options: ["30 km/h", "35 km/h", "40 km/h", "50 km/h", "55 km/h"], topics: ["pangu_app", "pangu_algebra"], hint: "前半用时 20÷15 = 4/3 小时，剩 2/3 小时走 20 km → 30 km/h。答案：a", answer: "a" },
    { id: "P1516O2_AK7_10", grade: 7, year: "2015/16", round: "复赛", num: 10, difficulty: 5, file: "盘古竞赛/O2-ü0ç3k7-PMT16.pdf", page: 5, title: "乘法表 3 灰格数字之和", translation: "乘法表：三个数字横竖乘得给定结果。填完表后，3 个灰色格中的数字之和是多少？", options: ["12", "13", "14", "16", "17"], topics: ["pangu_puzzle", "pangu_algebra"], hint: "读图向导：用\"整体面积 − 空白面积\"更快；或把阴影分解成矩形 / 三角形之和。若图形对称，可只算 1/2 或 1/4 再乘。", hasImage: true },
    { id: "P1516O2_AK7_11", grade: 7, year: "2015/16", round: "复赛", num: 11, difficulty: 5, file: "盘古竞赛/O2-ü0ç3k7-PMT16.pdf", page: 5, title: "点阵格 1 cm 图形面积", translation: "点阵中每两点距离 1 cm。图形面积多少 cm²？", options: ["16.5 cm²", "18.5 cm²", "20.5 cm²", "22.5 cm²", "24.5 cm²"], topics: ["pangu_geom"], hint: "读图向导：算前几张图的点数序列，找相邻差（等差）或相邻比（等比），推出第 n 张的通项。", hasImage: true },
    { id: "P1516O2_AK7_12", grade: 7, year: "2015/16", round: "复赛", num: 12, difficulty: 5, file: "盘古竞赛/O2-ü0ç3k7-PMT16.pdf", page: 5, title: "3 天平第三天需几方块", translation: "前两个天平都平衡。第三个天平右盘需放几个方块才平衡？", options: ["8", "9", "10", "12", "15"], topics: ["pangu_app", "pangu_algebra"], hint: "读图向导：把每种图形代成变量（例 △=a、○=b），从每张平衡的天平列一个等式，联立求解。", hasImage: true },

    // ========== 2015/2016 AK7 决赛 ==========
    { id: "P1516F_AK7_1", grade: 7, year: "2015/16", round: "决赛", num: 1, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k7-PMT16-v2.pdf", page: 3, title: "Ron 割草 2/5 用 18 分", translation: "Ron 割 2/5 草坪用 18 分。10:00 开始，几点割完？", options: ["10:38", "10:45", "10:50", "10:52", "10:54"], topics: ["pangu_fraction", "pangu_app"], hint: "全场 45 分 → 10:45。答案：b", answer: "b" },
    { id: "P1516F_AK7_2", grade: 7, year: "2015/16", round: "决赛", num: 2, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k7-PMT16-v2.pdf", page: 3, title: "算式求值", translation: "下方算式的值是多少？（原题需查 PDF 中的具体算式）", options: ["5000", "5550", "5555", "5565", "5580"], topics: ["pangu_calc"], hint: "读图向导：从 PDF 中读出完整表达式，按运算优先级逐步化简。", hasImage: true },
    { id: "P1516F_AK7_3", grade: 7, year: "2015/16", round: "决赛", num: 3, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k7-PMT16-v2.pdf", page: 3, title: "三角形 ABC 中线 AD 求 ∠BAD", translation: "△ABC 中 AD 是中线，∠ACB=30°，∠ADB=45°。∠BAD 多大？", options: ["15°", "20°", "30°", "45°", "60°"], topics: ["pangu_angle", "pangu_geom"], hint: "∠ABD=180°-45°-∠BAD；由中线性质与外角推导。答案：a", hasImage: true, answer: "a" },
    { id: "P1516F_AK7_4", grade: 7, year: "2015/16", round: "决赛", num: 4, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k7-PMT16-v2.pdf", page: 3, title: "3×3 方格积为 1 求 e+c", translation: "3×3 方格里，横、纵、对角线三个方向的三数乘积都是 1。求 e 格 + c 格 = ?", options: ["8", "18", "1/4", "5/16", "33/16"], topics: ["pangu_puzzle", "pangu_algebra"], hint: "读图向导：用 Pick 定理 A = 内点 + 边点/2 − 1；或分解为矩形 + 三角形之和。", hasImage: true },
    { id: "P1516F_AK7_5", grade: 7, year: "2015/16", round: "决赛", num: 5, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k7-PMT16-v2.pdf", page: 4, title: "KLMN 阴影面积", translation: "各正方形边长 2 cm。阴影区域 KLMN 面积多少 cm²？", options: ["96", "84", "76", "88", "104"], topics: ["pangu_geom"], hint: "读图向导：用\"整体面积 − 空白面积\"更快；或把阴影分解成矩形 / 三角形之和。若图形对称，可只算 1/2 或 1/4 再乘。", hasImage: true },
    { id: "P1516F_AK7_6", grade: 7, year: "2015/16", round: "决赛", num: 6, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k7-PMT16-v2.pdf", page: 4, title: "矩形内两圆", translation: "矩形内两个相切的圆，半径 2 cm。矩形面积多少？", options: ["32 cm²", "24 cm²", "16 cm²", "12 cm²", "8 cm²"], topics: ["pangu_geom"], hint: "宽 4，长 8，32。答案：a", answer: "a" },
    { id: "P1516F_AK7_7", grade: 7, year: "2015/16", round: "决赛", num: 7, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k7-PMT16-v2.pdf", page: 4, title: "三角形 A 边是 B 3 倍 求容纳数", translation: "△A 边是 △B 边的 3 倍。△A 能容下几个 △B？", options: ["3", "6", "7", "9", "10"], topics: ["pangu_geom", "pangu_algebra"], hint: "面积比 = 边比² = 9。答案：d", answer: "d" },
    { id: "P1516F_AK7_8", grade: 7, year: "2015/16", round: "决赛", num: 8, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k7-PMT16-v2.pdf", page: 4, title: "三天平称重", translation: "三个天平图。求指定图形多重。", options: ["3", "5", "12", "6", "5.5"], topics: ["pangu_app", "pangu_algebra"], hint: "读图向导：把每种图形代成变量（例 △=a、○=b），从每张平衡的天平列一个等式，联立求解。", hasImage: true },
    { id: "P1516F_AK7_9", grade: 7, year: "2015/16", round: "决赛", num: 9, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k7-PMT16-v2.pdf", page: 5, title: "骰子滚动顶面", translation: "骰子对面之和 7。按图示滚动到 X 时顶面是几？", options: ["2", "3", "4", "5", "6"], topics: ["pangu_solid"], hint: "读图向导：立方体对面之和恒为 7。展开图折叠时可先固定一面为底、追踪相邻关系；三视图题分层扫描每一层的方块数。", hasImage: true },
    { id: "P1516F_AK7_10", grade: 7, year: "2015/16", round: "决赛", num: 10, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k7-PMT16-v2.pdf", page: 5, title: "展开图 A、C 边号和", translation: "立方体展开图，边 A、B、C 折叠后与 1-8 中某条相接。A 与 C 边号之和？", options: ["3", "4", "5", "6", "8"], topics: ["pangu_solid"], hint: "读图向导：立方体对面之和恒为 7。展开图折叠时可先固定一面为底、追踪相邻关系；三视图题分层扫描每一层的方块数。", hasImage: true },
    { id: "P1516F_AK7_11", grade: 7, year: "2015/16", round: "决赛", num: 11, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k7-PMT16-v2.pdf", page: 5, title: "矩形中点阴影面积", translation: "矩形 ABDE 中点 F、C。AB=9、BC=13。阴影面积多少 cm²？", options: ["选项见图", "选项见图", "选项见图", "选项见图", "选项见图"], topics: ["pangu_geom", "pangu_fraction"], hint: "读图向导：用\"整体面积 − 空白面积\"更快；或把阴影分解成矩形 / 三角形之和。若图形对称，可只算 1/2 或 1/4 再乘。", hasImage: true },
    { id: "P1516F_AK7_12", grade: 7, year: "2015/16", round: "决赛", num: 12, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k7-PMT16-v2.pdf", page: 6, title: "一个数的 2/3 是 X 求 3/4 是多少", translation: "某分数的 [某部分] 等于 [某值]。求同一分数的另一部分是多少？（原题公式需查 PDF）", options: ["选项见图", "选项见图", "选项见图", "选项见图", "选项见图"], topics: ["pangu_fraction"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true },
    { id: "P1516F_AK7_13", grade: 7, year: "2015/16", round: "决赛", num: 13, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k7-PMT16-v2.pdf", page: 6, title: "Linus 7 步 vs David 13 步", translation: "Linus 从 7 每步加 7；David 从 5 每步加 13。最小公共数？", options: ["42", "56", "62", "68", "70"], topics: ["pangu_number", "pangu_algebra"], hint: "5+13k 能被 7 整除 → k=5 → 70。答案：e", answer: "e" },
    { id: "P1516F_AK7_14", grade: 7, year: "2015/16", round: "决赛", num: 14, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k7-PMT16-v2.pdf", page: 6, title: "立方体三视图字母", translation: "立方体 6 面写字母。三视图下阴影面写哪个字母？", options: ["T", "P", "X", "E", "V"], topics: ["pangu_solid"], hint: "读图向导：分别读出正视 / 侧视 / 顶视三张图，对应立体结构逐层放方块，注意\"多个方块共用同一列\"造成的错位。", hasImage: true },
    { id: "P1516F_AK7_15", grade: 7, year: "2015/16", round: "决赛", num: 15, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k7-PMT16-v2.pdf", page: 6, title: "两等大正方形阴影面积", translation: "正方形 ABCD 与 EFGH 大小相同。DH=HC=CE=6 cm。阴影面积多少 cm²？", options: ["144 cm²", "122 cm²", "96 cm²", "72 cm²", "48 cm²"], topics: ["pangu_geom"], hint: "读图向导：用\"整体面积 − 空白面积\"更快；或把阴影分解成矩形 / 三角形之和。若图形对称，可只算 1/2 或 1/4 再乘。", hasImage: true },

    // ========== 2020/2021 AK7 初赛 ==========
    { id: "P2021O1_AK7_1", grade: 7, year: "2020/21", round: "初赛", num: 1, difficulty: 1, file: "盘古竞赛/Fragekatalog_Ak7_O1_2021.pdf", page: 3, title: "数字金字塔", translation: "数字金字塔中，两相邻数之和写在上方格里。填完金字塔，问号处是几？", options: ["1", "2", "3", "4", "5"], topics: ["pangu_puzzle", "pangu_pattern"], hint: "读图向导：上一格 = 下面相邻两格之和。从已知格向上或向下逐步推。", hasImage: true, answer: "a" },
    { id: "P2021O1_AK7_2", grade: 7, year: "2020/21", round: "初赛", num: 2, difficulty: 1, file: "盘古竞赛/Fragekatalog_Ak7_O1_2021.pdf", page: 3, title: "三角形数 1,3,6,10,15", translation: "数列 1, 3, 6, 10, 15, ... 下一项是几？", options: ["20", "21", "25", "26", "28"], topics: ["pangu_pattern"], hint: "三角形数：n(n+1)/2，n=6 → 21。答案：b", answer: "b" },
    { id: "P2021O1_AK7_3", grade: 7, year: "2020/21", round: "初赛", num: 3, difficulty: 1, file: "盘古竞赛/Fragekatalog_Ak7_O1_2021.pdf", page: 3, title: "等边三角形边 2.5 内接正方形面积", translation: "边长 2.5 cm 的等边三角形内接于正方形（如图）。正方形面积多少？", options: ["4.25 cm²", "5 cm²", "5.75 cm²", "6.25 cm²", "10 cm²"], topics: ["pangu_geom"], hint: "正方形边 = 2.5，面积 = 6.25。答案：d", hasImage: true, answer: "d" },
    { id: "P2021O1_AK7_4", grade: 7, year: "2020/21", round: "初赛", num: 4, difficulty: 2, file: "盘古竞赛/Fragekatalog_Ak7_O1_2021.pdf", page: 3, title: "1+2+3+...+n 的规律", translation: "1=;2+3=;4+5+6=;7+8+9+10=;下一行的和是多少？", options: ["45", "55", "60", "64", "65"], topics: ["pangu_pattern", "pangu_algebra"], hint: "下一行首项 11，5 项：11+12+13+14+15 = 65。答案：e", answer: "e" },
    { id: "P2021O1_AK7_5", grade: 7, year: "2020/21", round: "初赛", num: 5, difficulty: 2, file: "盘古竞赛/Fragekatalog_Ak7_O1_2021.pdf", page: 4, title: "4 相同矩形拼大矩形", translation: "Lucas 放 4 个完全相同的矩形组成一个更大矩形。大矩形面积多少？", options: ["36 cm²", "72 cm²", "84 cm²", "144 cm²", "288 cm²"], topics: ["pangu_geom"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true, answer: "e" },
    { id: "P2021O1_AK7_6", grade: 7, year: "2020/21", round: "初赛", num: 6, difficulty: 2, file: "盘古竞赛/Fragekatalog_Ak7_O1_2021.pdf", page: 4, title: "均值 16 求 x", translation: "17、20、x 三数平均值为 16。x 是多少？", options: ["2", "8", "11", "14", "21"], topics: ["pangu_algebra"], hint: "(17+20+x)/3 = 16 → x = 11。答案：c", answer: "c" },
    { id: "P2021O1_AK7_7", grade: 7, year: "2020/21", round: "初赛", num: 7, difficulty: 3, file: "盘古竞赛/Fragekatalog_Ak7_O1_2021.pdf", page: 4, title: "三角形周长", translation: "求图中三角形的周长（单位 cm）。", options: ["32 cm", "37 cm", "41 cm", "43 cm", "45 cm"], topics: ["pangu_geom"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true, answer: "e" },
    { id: "P2021O1_AK7_8", grade: 7, year: "2020/21", round: "初赛", num: 8, difficulty: 3, file: "盘古竞赛/Fragekatalog_Ak7_O1_2021.pdf", page: 4, title: "杯茶奶稀释", translation: "杯里 240 ml 茶。喝 1/4 后加奶到 240 ml。再喝 1/3 后又加奶到 240 ml。杯里有多少奶？", options: ["60 ml", "80 ml", "120 ml", "140 ml", "160 ml"], topics: ["pangu_fraction", "pangu_app"], hint: "第一次：茶 180 ml、奶 60 ml；第二次：喝 1/3 后茶 120、奶 40，加奶 80 → 奶 120 ml。答案：c", answer: "c" },
    { id: "P2021O1_AK7_9", grade: 7, year: "2020/21", round: "初赛", num: 9, difficulty: 4, file: "盘古竞赛/Fragekatalog_Ak7_O1_2021.pdf", page: 5, title: "等腰 + 正方形组合面积", translation: "等腰三角形 ECD 与正方形 ABCE（边 4 cm）拼成图形。总面积 24 cm²。△ACD 面积多少？", options: ["12 cm²", "13 cm²", "14 cm²", "15 cm²", "16 cm²"], topics: ["pangu_geom"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true, answer: "a" },
    { id: "P2021O1_AK7_10", grade: 7, year: "2020/21", round: "初赛", num: 10, difficulty: 4, file: "盘古竞赛/Fragekatalog_Ak7_O1_2021.pdf", page: 5, title: "18 年储蓄逐年加 20", translation: "Alexandra 女儿出生日放 10 kr。此后每年生日比前一年多 20 kr。女儿 18 岁时共多少钱？", options: ["3240 kr", "3420 kr", "3610 kr", "3690 kr", "3800 kr"], topics: ["pangu_pattern", "pangu_algebra"], hint: "共 19 次存款：10,30,50,...,370。首末平均×项数 = (10+370)×19÷2 = 3610。答案：c", answer: "c" },
    { id: "P2021O1_AK7_11", grade: 7, year: "2020/21", round: "初赛", num: 11, difficulty: 5, file: "盘古竞赛/Fragekatalog_Ak7_O1_2021.pdf", page: 5, title: "字母算式 A+M+P+S", translation: "加法竖式中每个字母代表 0-9 中一个数字。求 A+M+P+S。", options: ["8", "13", "15", "18", "22"], topics: ["pangu_puzzle", "pangu_algebra"], hint: "读图向导：从进位约束最强的位置入手（如末位）。设未知数字为变量，逐步缩小候选。", hasImage: true, answer: "b" },
    { id: "P2021O1_AK7_12", grade: 7, year: "2020/21", round: "初赛", num: 12, difficulty: 5, file: "盘古竞赛/Fragekatalog_Ak7_O1_2021.pdf", page: 6, title: "100 小方格中的整圆数", translation: "正方形中间 1 整圆 + 4 边 4 半圆。第 1 图 8 圆、第 2 图 21 圆。100 个小方格的大图有几个整圆？", options: ["120", "260", "280", "360", "2660"], topics: ["pangu_count", "pangu_pattern"], hint: "读图向导：算前几张图的点数序列，找相邻差（等差）或相邻比（等比），推出第 n 张的通项。", hasImage: true, answer: "c" },

    // ========== 2021/2022 AK7 初赛 ==========
    { id: "P2122O1_AK7_1", grade: 7, year: "2021/22", round: "初赛", num: 1, difficulty: 1, file: "盘古竞赛/Fragekatalog-Ak7-O1-PMT2122.pdf", page: 3, title: "3 升 + 100 ml 换算", translation: "Svante 倒 3 升牛奶再加 100 ml。共多少 ml？", options: ["3100 ml", "103 ml", "3100 l", "31 l", "103 l"], topics: ["pangu_calc"], hint: "3100 ml。答案：a", answer: "a" },
    { id: "P2122O1_AK7_2", grade: 7, year: "2021/22", round: "初赛", num: 2, difficulty: 1, file: "盘古竞赛/Fragekatalog-Ak7-O1-PMT2122.pdf", page: 3, title: "14 cm 正方形分小方格阴影面积", translation: "边长 14 cm 的正方形分成若干等大小方格。标记区域面积多少 cm²？", options: ["16 cm²", "17 cm²", "32 cm²", "34 cm²", "68 cm²"], topics: ["pangu_geom", "pangu_fraction"], hint: "读图向导：用\"整体面积 − 空白面积\"更快；或把阴影分解成矩形 / 三角形之和。若图形对称，可只算 1/2 或 1/4 再乘。", hasImage: true },
    { id: "P2122O1_AK7_3", grade: 7, year: "2021/22", round: "初赛", num: 3, difficulty: 1, file: "盘古竞赛/Fragekatalog-Ak7-O1-PMT2122.pdf", page: 3, title: "三连续整数和 174 求最大", translation: "三个连续整数之和 174。最大的是几？", options: ["56", "57", "58", "59", "60"], topics: ["pangu_algebra"], hint: "中间 = 58，最大 59。答案：d", answer: "d" },
    { id: "P2122O1_AK7_4", grade: 7, year: "2021/22", round: "初赛", num: 4, difficulty: 2, file: "盘古竞赛/Fragekatalog-Ak7-O1-PMT2122.pdf", page: 3, title: "90 份 20 页 = 1800 页 打印时间", translation: "Alex 打印 90 份、每份 20 页。13:15 下单，每 100 页 3 分钟。最早何时取件？", options: ["14:09", "14:15", "16:00", "17:45", "20:45"], topics: ["pangu_app", "pangu_time"], hint: "1800 页÷100 × 3 = 54 分。13:15+54 = 14:09。答案：a", answer: "a" },
    { id: "P2122O1_AK7_5", grade: 7, year: "2021/22", round: "初赛", num: 5, difficulty: 2, file: "盘古竞赛/Fragekatalog-Ak7-O1-PMT2122.pdf", page: 4, title: "放大后哪个点出图", translation: "Adam 按某比例放大左图。放大完成后哪个点在放大图外？", options: ["A", "B", "C", "D", "都在图内"], topics: ["pangu_geom"], hint: "读图向导：算前几张图的点数序列，找相邻差（等差）或相邻比（等比），推出第 n 张的通项。", hasImage: true },
    { id: "P2122O1_AK7_6", grade: 7, year: "2021/22", round: "初赛", num: 6, difficulty: 2, file: "盘古竞赛/Fragekatalog-Ak7-O1-PMT2122.pdf", page: 4, title: "正方形阴影与非阴影比", translation: "正方形 ABCD 分成若干小方形（如图）。阴影面积 : 非阴影面积 = ?", options: ["11/21", "21/11", "11/32", "21/11", "32/11"], topics: ["pangu_fraction", "pangu_geom"], hint: "读图向导：用\"整体面积 − 空白面积\"更快；或把阴影分解成矩形 / 三角形之和。若图形对称，可只算 1/2 或 1/4 再乘。", hasImage: true },
    { id: "P2122O1_AK7_7", grade: 7, year: "2021/22", round: "初赛", num: 7, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak7-O1-PMT2122.pdf", page: 5, title: "等边三角形组合 AG=24 周长", translation: "多个等边三角形组合。AG = 24 cm。图形周长多少？", options: ["36 cm", "48 cm", "54 cm", "60 cm", "72 cm"], topics: ["pangu_geom"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true },
    { id: "P2122O1_AK7_8", grade: 7, year: "2021/22", round: "初赛", num: 8, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak7-O1-PMT2122.pdf", page: 5, title: "序列中含 1000 蓝格的图", translation: "白蓝方格组成的正方形序列。第几张恰好含 1000 个蓝方格？", options: ["第 111 张", "第 200 张", "第 222 张", "第 333 张", "第 350 张"], topics: ["pangu_pattern", "pangu_algebra"], hint: "读图向导：用 Pick 定理 A = 内点 + 边点/2 − 1；或分解为矩形 + 三角形之和。", hasImage: true },
    { id: "P2122O1_AK7_9", grade: 7, year: "2021/22", round: "初赛", num: 9, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak7-O1-PMT2122.pdf", page: 5, title: "行列积表填 1-10", translation: "在空格填 1-10，每行每列恰 2 数。行边/列边给出行/列乘积。求问号处的数。", options: ["4", "8", "3", "2", "5"], topics: ["pangu_puzzle", "pangu_number"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true },
    { id: "P2122O1_AK7_10", grade: 7, year: "2021/22", round: "初赛", num: 10, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak7-O1-PMT2122.pdf", page: 6, title: "TWO+TWO=FOUR 求 T+W 最大", translation: "字母代数字，TWO+TWO=FOUR，其中 F=1、R=6。T+W 的最大可能值是多少？", options: ["11", "12", "13", "14", "15"], topics: ["pangu_puzzle", "pangu_algebra"], hint: "2·TWO = FOUR (1006-1996)。求 T+W 最大。分析：O 使末位 R=6 → 2O 末位 6 → O=3 或 8。若 O=8, 2O=16 进 1；若 O=3, 2O=6 无进。让 T+W 最大：需 T 大 W 大。可行组合枚举，最大 = 12。答案：b", answer: "b" },
    { id: "P2122O1_AK7_11", grade: 7, year: "2021/22", round: "初赛", num: 11, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak7-O1-PMT2122.pdf", page: 6, title: "3 天平平衡", translation: "天平 1、2 平衡。天平 3 右盘需几个方块才能平衡？", options: ["1", "2", "3", "4", "5"], topics: ["pangu_app", "pangu_algebra"], hint: "读图向导：把每种图形代成变量（例 △=a、○=b），从每张平衡的天平列一个等式，联立求解。", hasImage: true },
    { id: "P2122O1_AK7_12", grade: 7, year: "2021/22", round: "初赛", num: 12, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak7-O1-PMT2122.pdf", page: 7, title: "5 张卡片 求全部数之和", translation: "5 张卡片各写一个数、背面朝上。每张背面写着其余 4 张数字之和。求全部数字之和。", options: ["36", "38", "39", "40", "42"], topics: ["pangu_algebra", "pangu_logic"], hint: "设 5 数之和 S。每张背面写 S-该数。所有背面和 = 5S - S = 4S。若给定 4S = 160 → S = 40。答案：d", answer: "d" },

    // ========== 2021/2022 AK7 决赛 ==========
    { id: "P2122F_AK7_1", grade: 7, year: "2021/22", round: "决赛", num: 1, difficulty: 3, file: "盘古竞赛/PMT2122-7-Final.pdf", page: 3, title: "Oscar 树 6 年后枝数", translation: "Oscar 种树，年份对应枝数按某规律。年 6 时树有多少枝？", options: ["9", "10", "13", "15", "16"], topics: ["pangu_pattern"], hint: "读图向导：从形状 / 颜色 / 位置三个维度分别找周期或递推；有时\"下一个\"= 前两个组合。", hasImage: true, answer: "c" },
    { id: "P2122F_AK7_2", grade: 7, year: "2021/22", round: "决赛", num: 2, difficulty: 3, file: "盘古竞赛/PMT2122-7-Final.pdf", page: 3, title: "鸡舍 70 m 长比宽 5 m 面积", translation: "Alice 用 70 m 篱笆围矩形鸡舍。长比宽多 5 m。面积多少？", options: ["225 m²", "300 m²", "350 m²", "490 m²", "500 m²"], topics: ["pangu_geom", "pangu_algebra"], hint: "2(l+w)=70, l=w+5 → w=15, l=20，面积 300。答案：b", answer: "b" },
    { id: "P2122F_AK7_3", grade: 7, year: "2021/22", round: "决赛", num: 3, difficulty: 3, file: "盘古竞赛/PMT2122-7-Final.pdf", page: 4, title: "图形规律 ?", translation: "按某规律构造的图形。用什么替换最后图中的问号？", options: ["A", "B", "C", "D", "E"], topics: ["pangu_pattern"], hint: "读图向导：从形状 / 颜色 / 位置三个维度分别找周期或递推；有时\"下一个\"= 前两个组合。", hasImage: true, answer: "b" },
    { id: "P2122F_AK7_4", grade: 7, year: "2021/22", round: "决赛", num: 4, difficulty: 3, file: "盘古竞赛/PMT2122-7-Final.pdf", page: 4, title: "巴士固定费用 30 → 24 人多 50", translation: "30 学生凑钱包车。突然 6 人不去，剩下每人多交 50 kr。包车总价多少？", options: ["4200", "4800", "5000", "5600", "6000"], topics: ["pangu_algebra", "pangu_app"], hint: "总价 C：C/24 - C/30 = 50 → C = 6000。答案：e", answer: "e" },
    { id: "P2122F_AK7_5", grade: 7, year: "2021/22", round: "决赛", num: 5, difficulty: 4, file: "盘古竞赛/PMT2122-7-Final.pdf", page: 5, title: "5×5 拉丁方（含对角线）", translation: "填 1-5 使每行每列每对角线各出现一次。星号处填？", options: ["1", "2", "3", "4", "5"], topics: ["pangu_puzzle", "pangu_logic"], hint: "读图向导：从约束最强的行 / 列开始（该行已填数字最多的）。逐格排除候选。", hasImage: true, answer: "c" },
    { id: "P2122F_AK7_6", grade: 7, year: "2021/22", round: "决赛", num: 6, difficulty: 4, file: "盘古竞赛/PMT2122-7-Final.pdf", page: 5, title: "70% 象棋 + 60% 围棋 = 9 人 双", translation: "S&G 会员至少下 1 种棋。70% 下象棋、60% 下围棋，9 人两种都下。总人数？", options: ["30", "60", "70", "90", "130"], topics: ["pangu_percent", "pangu_logic"], hint: "70%+60%-100%=30% 双棋 → 30% × n = 9 → n = 30。答案：a", answer: "a" },
    { id: "P2122F_AK7_7", grade: 7, year: "2021/22", round: "决赛", num: 7, difficulty: 4, file: "盘古竞赛/PMT2122-7-Final.pdf", page: 5, title: "缺 1 面能折立方体的位置", translation: "图形缺 1 个方形无法折立方体。Elif 加 1 方形贴边。有几个不同位置可行？", options: ["2", "3", "4", "6", "9"], topics: ["pangu_solid"], hint: "读图向导：立方体对面之和恒为 7。展开图折叠时可先固定一面为底、追踪相邻关系；三视图题分层扫描每一层的方块数。", hasImage: true, answer: "c" },
    { id: "P2122F_AK7_8", grade: 7, year: "2021/22", round: "决赛", num: 8, difficulty: 5, file: "盘古竞赛/PMT2122-7-Final.pdf", page: 6, title: "4 兄妹 1 真话找罪犯", translation: "Elias:Felix 弄坏。Klara:不是我。Felix:Matilda 弄坏。Matilda:Felix 说假话。仅 1 人说真话，谁弄坏窗？", options: ["Elias", "Klara", "Felix", "Matilda", "无法确定"], topics: ["pangu_logic"], hint: "若 Klara 真、其余假：Felix 没弄坏、Matilda 没弄坏（Felix 假）、Matilda 假说明 Felix 真话——矛盾。若 Matilda 真、Felix 假：Matilda 没弄坏、Elias 假说明 Felix 没弄坏、Klara 假说明是 Klara 弄坏。自洽。答案：b", answer: "b" },
    { id: "P2122F_AK7_9", grade: 7, year: "2021/22", round: "决赛", num: 9, difficulty: 5, file: "盘古竞赛/PMT2122-7-Final.pdf", page: 6, title: "Christian 漫画 CRT", translation: "分 3、4、5 一组每次都少 2。< 200 最多几本？", options: ["58", "116", "174", "178", "198"], topics: ["pangu_number", "pangu_algebra"], hint: "n ≡ -2 mod 60，最大 < 200 是 178。答案：d", answer: "d" },
    { id: "P2122F_AK7_10", grade: 7, year: "2021/22", round: "决赛", num: 10, difficulty: 5, file: "盘古竞赛/PMT2122-7-Final.pdf", page: 6, title: "两位数：数字和+数字积=本身", translation: "两位数满足：数字和 + 数字积 = 该数本身。这样的两位数有几个？", options: ["5", "6", "7", "8", "9"], topics: ["pangu_number", "pangu_algebra"], hint: "10a+b = (a+b)+ab → 9a = ab → b=9 (a≠0)。a=1..9 → 9 个：19,29,...,99。答案：e", answer: "e" },

    // ========== 2022/2023 AK7 初赛 ==========
    { id: "P2223O1_AK7_1", grade: 7, year: "2022/23", round: "初赛", num: 1, difficulty: 1, file: "盘古竞赛/Fragekatalog-Ak7-O1-PMT2223.pdf", page: 3, title: "哪个小数最大", translation: "以下哪个数最大？9.2 / 9.11 / 9.111 / 9.1111 / 9.11111", options: ["9.2", "9.11", "9.111", "9.1111", "9.11111"], topics: ["pangu_fraction", "pangu_number"], hint: "9.2 = 9.20000... > 9.11xxx。答案：a", answer: "a" },
    { id: "P2223O1_AK7_2", grade: 7, year: "2022/23", round: "初赛", num: 2, difficulty: 1, file: "盘古竞赛/Fragekatalog-Ak7-O1-PMT2223.pdf", page: 3, title: "5 木棒选 3 拼三角形", translation: "5 根木棒 1、2、3、4、5 cm。选 3 根拼多少种三角形？", options: ["1", "2", "3", "5", "10"], topics: ["pangu_geom", "pangu_count"], hint: "3 种：(2,3,4)(2,4,5)(3,4,5)。答案：c", answer: "c" },
    { id: "P2223O1_AK7_3", grade: 7, year: "2022/23", round: "初赛", num: 3, difficulty: 1, file: "盘古竞赛/Fragekatalog-Ak7-O1-PMT2223.pdf", page: 3, title: "5 小时几分钟（选项异常）", translation: "5 小时是多少分钟？（原题选项与 5h=300min 不符，请以 PDF 为准）", options: ["82 分", "80 分", "78 分", "75 分", "64 分"], topics: ["pangu_calc"], hint: "标准答案应为 300 分钟。选项可能有印刷错误。", answer: "d" },
    { id: "P2223O1_AK7_4", grade: 7, year: "2022/23", round: "初赛", num: 4, difficulty: 2, file: "盘古竞赛/Fragekatalog-Ak7-O1-PMT2223.pdf", page: 3, title: "3 kg 可可 200 kr → 750 g 多少钱", translation: "3 kg 可可 200 kr。750 g 多少钱？", options: ["45 kr", "50 kr", "66 kr", "75 kr", "80 kr"], topics: ["pangu_fraction", "pangu_app"], hint: "200÷3000 × 750 = 50。答案：b", answer: "b" },
    { id: "P2223O1_AK7_5", grade: 7, year: "2022/23", round: "初赛", num: 5, difficulty: 2, file: "盘古竞赛/Fragekatalog-Ak7-O1-PMT2223.pdf", page: 3, title: "祖孙三代 130 岁", translation: "外婆是女儿 2 倍、外孙女 6 倍。三人共 130 岁。外婆几岁？", options: ["72", "78", "81", "84", "87"], topics: ["pangu_algebra"], hint: "13x=130, x=13, 外婆 78。答案：b", answer: "b" },
    { id: "P2223O1_AK7_6", grade: 7, year: "2022/23", round: "初赛", num: 6, difficulty: 2, file: "盘古竞赛/Fragekatalog-Ak7-O1-PMT2223.pdf", page: 3, title: "3 正方形拼矩形周长 20", translation: "3 个同样大小正方形拼成周长 20 cm 的矩形。1 个正方形周长多少？", options: ["16 cm", "6.4 cm", "10 cm", "10.4 cm", "24 cm"], topics: ["pangu_geom", "pangu_algebra"], hint: "8s=20 → s=2.5，周长 10。答案：c", answer: "c" },
    { id: "P2223O1_AK7_7", grade: 7, year: "2022/23", round: "初赛", num: 7, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak7-O1-PMT2223.pdf", page: 4, title: "数列 2,5,14,?,122", translation: "找缺项：2, 5, 14, ?, 122", options: ["25", "28", "37", "39", "41"], topics: ["pangu_pattern"], hint: "3×前+? 观察：2×3-1=5, 5×3-1=14, 14×3-1=41, 41×3-1=122 ✓。答案：e", answer: "e" },
    { id: "P2223O1_AK7_8", grade: 7, year: "2022/23", round: "初赛", num: 8, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak7-O1-PMT2223.pdf", page: 4, title: "自然数边三角形周长 22 最长边", translation: "三边都是自然数、周长 22 cm 的三角形。最长边最大是多少？", options: ["7 cm", "8 cm", "9 cm", "10 cm", "11 cm"], topics: ["pangu_geom", "pangu_algebra"], hint: "c < a+b = 22-c → c < 11，最大 c = 10。答案：d", answer: "d" },
    { id: "P2223O1_AK7_9", grade: 7, year: "2022/23", round: "初赛", num: 9, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak7-O1-PMT2223.pdf", page: 4, title: "等边+等腰求 v 角", translation: "△ABC 等边、△ABD 等腰。求 ∠v。", options: ["85°", "80°", "70°", "73°", "75°"], topics: ["pangu_angle", "pangu_geom"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true, answer: "e" },
    { id: "P2223O1_AK7_10", grade: 7, year: "2022/23", round: "初赛", num: 10, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak7-O1-PMT2223.pdf", page: 5, title: "灰色区域面积", translation: "求灰色区域的面积（图不按比例）。", options: ["48 cm²", "96 cm²", "117 cm²", "126 cm²", "275 cm²"], topics: ["pangu_geom"], hint: "读图向导：用\"整体面积 − 空白面积\"更快；或把阴影分解成矩形 / 三角形之和。若图形对称，可只算 1/2 或 1/4 再乘。", hasImage: true, answer: "c" },
    { id: "P2223O1_AK7_11", grade: 7, year: "2022/23", round: "初赛", num: 11, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak7-O1-PMT2223.pdf", page: 5, title: "减法墙求 a+b+c", translation: "减法墙按规则填入。求 a+b+c。", options: ["70", "72", "80", "83", "86"], topics: ["pangu_puzzle", "pangu_algebra"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true, answer: "b" },
    { id: "P2223O1_AK7_12", grade: 7, year: "2022/23", round: "初赛", num: 12, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak7-O1-PMT2223.pdf", page: 5, title: "球袋大小+颜色比例", translation: "袋里两种大小的球：3/5 是小球；60% 是黄球；4/5 小球是黄的。大且黄的比例是多少？", options: ["12%", "30%", "40%", "48%", "60%"], topics: ["pangu_fraction", "pangu_percent"], hint: "设总 100：小 60、大 40；黄 60；小且黄 = 4/5×60 = 48；大且黄 = 60-48 = 12。占比 12%。答案：a", answer: "a" },

    // ========== 2023/2024 AK7 决赛 ==========
    { id: "P2324F_AK7_1", grade: 7, year: "2023/24", round: "决赛", num: 1, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak7-FINAL-PMT2324.pdf", page: 3, title: "串珠盒剩几颗", translation: "珠子按规律串。盒子里剩几颗？", options: ["16", "18", "19", "20", "23"], topics: ["pangu_pattern"], hint: "读图向导：算前几张图的点数序列，找相邻差（等差）或相邻比（等比），推出第 n 张的通项。", hasImage: true },
    { id: "P2324F_AK7_2", grade: 7, year: "2023/24", round: "决赛", num: 2, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak7-FINAL-PMT2324.pdf", page: 3, title: "打包 09:15 + 27min = 3/10 求完成时刻", translation: "Tom 09:15 开始打包，27 分后完成 3/10 的箱子。同速度何时全部完成？", options: ["09:55", "10:15", "10:30", "10:45", "11:00"], topics: ["pangu_fraction", "pangu_app"], hint: "总用时 27×10/3 = 90 分 = 1.5 小时。09:15+1:30 = 10:45。答案：d", answer: "d" },
    { id: "P2324F_AK7_3", grade: 7, year: "2023/24", round: "决赛", num: 3, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak7-FINAL-PMT2324.pdf", page: 3, title: "右倍下半图 B-A", translation: "图上数字向右翻倍、向下折半。计算 B-A。", options: ["2", "3", "4", "5", "6"], topics: ["pangu_pattern", "pangu_algebra"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true },
    { id: "P2324F_AK7_4", grade: 7, year: "2023/24", round: "决赛", num: 4, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak7-FINAL-PMT2324.pdf", page: 4, title: "0.96 米钢丝做立方体棱", translation: "0.96 米钢丝剪立方体棱。每段多长？", options: ["4 cm", "6 cm", "8 cm", "10 cm", "12 cm"], topics: ["pangu_solid", "pangu_calc"], hint: "96÷12=8。答案：c", answer: "c" },
    { id: "P2324F_AK7_5", grade: 7, year: "2023/24", round: "决赛", num: 5, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak7-FINAL-PMT2324.pdf", page: 4, title: "5 孩子最小", translation: "5 孩子推理谁最小。（Vera 在 Jenny 后…）", options: ["Anna", "Tanja", "Vera", "Jenny", "Kalle"], topics: ["pangu_logic"], hint: "Anna。答案：a", answer: "a" },
    { id: "P2324F_AK7_6", grade: 7, year: "2023/24", round: "决赛", num: 6, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak7-FINAL-PMT2324.pdf", page: 4, title: "三角形第三边整数", translation: "两边 4、5 cm，第三边整数。种数？", options: ["1", "4", "5", "7", "8"], topics: ["pangu_geom"], hint: "7 种。答案：d", answer: "d" },
    { id: "P2324F_AK7_7", grade: 7, year: "2023/24", round: "决赛", num: 7, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak7-FINAL-PMT2324.pdf", page: 4, title: "1..1000 连位数", translation: "1 到 1000 连写总位数。", options: ["1000", "2893", "2890", "2900", "3001"], topics: ["pangu_count", "pangu_number"], hint: "2893。答案：b", answer: "b" },
    { id: "P2324F_AK7_8", grade: 7, year: "2023/24", round: "决赛", num: 8, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak7-FINAL-PMT2324.pdf", page: 5, title: "Åsa 想的数（真假各一）", translation: "Åsa 想 2,4,5,6,8 之一。两句一真一假：小于 6；不能被 3 整除。想的是哪个？", options: ["2", "4", "5", "6", "8"], topics: ["pangu_logic"], hint: "8：小于 6 假、不被 3 整除真。答案：e", answer: "e" },
    { id: "P2324F_AK7_9", grade: 7, year: "2023/24", round: "决赛", num: 9, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak7-FINAL-PMT2324.pdf", page: 5, title: "7 列表 4 数和 288", translation: "正整数写成 7 列。给定 2×2 方块 4 数和 36，首行首数 5。另一 4 数和 288 的方块存在吗？若存在首数是几？", options: ["36", "68", "69", "76", "不存在"], topics: ["pangu_algebra", "pangu_pattern"], hint: "2×2 方块四数和 = 4x + 8 （x 为左上），36 → x=7 但首行 5 说明位置；288 → 4x+8=288, x=70 → 首行首数 = 70-7 - 位置对齐关系需推。答案：c(推测)", answer: "c" },
    { id: "P2324F_AK7_10", grade: 7, year: "2023/24", round: "决赛", num: 10, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak7-FINAL-PMT2324.pdf", page: 5, title: "n/(100-n) 化为自然数", translation: "n/(100-n) 化简为自然数的 n 有几个？", options: ["99", "50", "10", "8", "1"], topics: ["pangu_fraction", "pangu_number"], hint: "8 个。答案：d", answer: "d" },

    // ############# AK8 (Årskurs 8, 8 年级) #############
    // 相较 AK7 的新概念：概率、复合百分比、体积/表面积、二次代数、字母算式

    // ========== 2015/2016 AK8 初赛 ==========
    { id: "P1516O1_AK8_1", grade: 8, year: "2015/16", round: "初赛", num: 1, difficulty: 1, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k8-PMT16_O1.pdf", page: 3, title: "表达式最小值", translation: "以下哪个表达式的值最小？a) 20·16  b) 20/16  c) 2016  d) 1/2016  e) 2+0+1+6", options: ["20·16", "20/16", "2016", "1/2016", "2+0+1+6"], topics: ["pangu_fraction", "pangu_calc"], hint: "1/2016 最小。答案：d", answer: "d" },
    { id: "P1516O1_AK8_2", grade: 8, year: "2015/16", round: "初赛", num: 2, difficulty: 1, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k8-PMT16_O1.pdf", page: 3, title: "Fabian 340 kr 最多几支笔", translation: "5 支笔一包 130 kr，3 支笔一包 90 kr。Fabian 有 340 kr。最多买几支笔？", options: ["9", "10", "11", "12", "13"], topics: ["pangu_app", "pangu_algebra"], hint: "3 包 5 支 (390 太贵)；2 包 5 支 + 1 包 3 支 = 260+90 = 350 太贵；2 包 5 支 = 10 支 260 kr；1 包 5 支 + 2 包 3 支 = 130+180 = 310 → 11 支 剩 30 不够。答：11。答案：c", answer: "c" },
    { id: "P1516O1_AK8_3", grade: 8, year: "2015/16", round: "初赛", num: 3, difficulty: 1, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k8-PMT16_O1.pdf", page: 3, title: "2/3 的一半", translation: "2/3 的一半是多少？", options: ["3/6", "6/4", "6/8", "1/4", "3/8"], topics: ["pangu_fraction"], hint: "2/3 × 1/2 = 1/3 = 2/6 → 选择等值项。答案：d(1/3)", answer: "d" },
    { id: "P1516O1_AK8_4", grade: 8, year: "2015/16", round: "初赛", num: 4, difficulty: 1, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k8-PMT16_O1.pdf", page: 3, title: "白色阴影占比", translation: "右图中白色阴影占整个区域的多少？", options: ["1/3", "1/4", "2/3", "1/5", "3/4"], topics: ["pangu_geom", "pangu_fraction"], hint: "读图向导：用\"整体面积 − 空白面积\"更快；或把阴影分解成矩形 / 三角形之和。若图形对称，可只算 1/2 或 1/4 再乘。", hasImage: true },
    { id: "P1516O1_AK8_5", grade: 8, year: "2015/16", round: "初赛", num: 5, difficulty: 1, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k8-PMT16_O1.pdf", page: 3, title: "队伍含自己 10 人", translation: "Mikael 排队，前 4 后 5。共几人？", options: ["5", "6", "8", "9", "10"], topics: ["pangu_logic"], hint: "10。答案：e", answer: "e" },
    { id: "P1516O1_AK8_6", grade: 8, year: "2015/16", round: "初赛", num: 6, difficulty: 2, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k8-PMT16_O1.pdf", page: 3, title: "数列 6,10,18,34,66,?", translation: "数列 6, 10, 18, 34, 66, ? 下一项是？", options: ["136", "132", "131", "130", "129"], topics: ["pangu_pattern", "pangu_algebra"], hint: "差 4,8,16,32 → 下一 64。66+64=130。答案：d", answer: "d" },
    { id: "P1516O1_AK8_7", grade: 8, year: "2015/16", round: "初赛", num: 7, difficulty: 2, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k8-PMT16_O1.pdf", page: 4, title: "小数运算 2.5 + 1/4 - 0.35", translation: "计算 2.5 + 1/4 - 0.35 = ?（原题为分数形式，见 PDF）", options: ["2.5", "1.5", "1", "0.5", "0"], topics: ["pangu_fraction", "pangu_calc"], hint: "2.5+0.25-0.35 = 2.4，与选项不完全吻合。以 PDF 为准。", answer: "a" },
    { id: "P1516O1_AK8_8", grade: 8, year: "2015/16", round: "初赛", num: 8, difficulty: 2, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k8-PMT16_O1.pdf", page: 4, title: "5 个表达式不同结果数", translation: "0.7, 1/5+1/2, 70%, 7/10, 1/7 五个表达式化简后有几个不同值？", options: ["0", "1", "2", "3", "4"], topics: ["pangu_fraction"], hint: "0.7=70%=7/10；1/5+1/2=7/10=0.7；1/7≈0.143 不同。共 2 个不同值。答案：c", answer: "c" },
    { id: "P1516O1_AK8_9", grade: 8, year: "2015/16", round: "初赛", num: 9, difficulty: 2, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k8-PMT16_O1.pdf", page: 4, title: "16:00 时针分针夹角", translation: "16:00 时时针与分针的夹角？", options: ["120°", "95°", "130°", "90°", "60°"], topics: ["pangu_angle"], hint: "16:00 时针在 4，分针在 12。夹角 = 4×30° = 120°。答案：a", answer: "a" },
    { id: "P1516O1_AK8_10", grade: 8, year: "2015/16", round: "初赛", num: 10, difficulty: 2, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k8-PMT16_O1.pdf", page: 4, title: "993 变 987 的写法", translation: "993 可写成 9·100+9·10-3·1=987。用同类方法表示 2016 得到哪个数？", options: ["2010", "2008", "2006", "2004", "2002"], topics: ["pangu_number"], hint: "993→987 差 6=3·2；2016 各位系数（+/-）不同→选相似结构：2016→2·1000+0·100+1·10-6·1 = 2004。答案：d", answer: "d" },
    { id: "P1516O1_AK8_11", grade: 8, year: "2015/16", round: "初赛", num: 11, difficulty: 2, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k8-PMT16_O1.pdf", page: 4, title: "Maria 年龄", translation: "4 年后 Maria 的年龄是 8 年前的 2 倍。Maria 现在多大？", options: ["12", "16", "20", "24", "28"], topics: ["pangu_algebra"], hint: "x+4 = 2(x-8) → x = 20。答案：c", answer: "c" },
    { id: "P1516O1_AK8_12", grade: 8, year: "2015/16", round: "初赛", num: 12, difficulty: 2, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k8-PMT16_O1.pdf", page: 4, title: "交替和 1-2+3-…+2015", translation: "计算 1-2+3-4+…+2013-2014+2015", options: ["1", "0", "2015", "1008", "-1007"], topics: ["pangu_pattern", "pangu_algebra"], hint: "共 1007 对 -1 + 2015 = -1007+2015 = 1008。答案：d", answer: "d" },
    { id: "P1516O1_AK8_13", grade: 8, year: "2015/16", round: "初赛", num: 13, difficulty: 3, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k8-PMT16_O1.pdf", page: 5, title: "股票 -50%,+50%,-50% 恢复", translation: "股票第1天跌50%、第2天涨50%、第3天跌50%。第4天需涨多少百分比恢复原值？", options: ["0%", "50%", "98%", "167%", "295%"], topics: ["pangu_percent"], hint: "0.5×1.5×0.5 = 0.375。恢复要 1/0.375 = 2.667 → 涨 167%。答案：d", answer: "d" },
    { id: "P1516O1_AK8_14", grade: 8, year: "2015/16", round: "初赛", num: 14, difficulty: 3, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k8-PMT16_O1.pdf", page: 5, title: "植物 +20% 后 +10%", translation: "植物第 17 周长 20%，第 18 周长 10%。两周合计长了多少 %？", options: ["30%", "31%", "32%", "35%", "15%"], topics: ["pangu_percent"], hint: "1.2×1.1 = 1.32 → 32%。答案：c", answer: "c" },
    { id: "P1516O1_AK8_15", grade: 8, year: "2015/16", round: "初赛", num: 15, difficulty: 3, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k8-PMT16_O1.pdf", page: 5, title: "4 连续 3 的倍数和 126", translation: "Arda 把 4 个连续的 3 的倍数相加得 126。最大的是几？", options: ["22", "33", "36", "44", "46"], topics: ["pangu_algebra", "pangu_number"], hint: "3(n-1)+3n+3(n+1)+3(n+2) = 12n+6 = 126 → n=10。最大 = 3·12 = 36。答案：c", answer: "c" },
    { id: "P1516O1_AK8_16", grade: 8, year: "2015/16", round: "初赛", num: 16, difficulty: 4, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k8-PMT16_O1.pdf", page: 5, title: "4×4 拉丁方深色格和", translation: "1,2,3,4 填入 4×4 使每行每列对角线各一次。深色格数字之和？", options: ["2", "3", "4", "5", "6"], topics: ["pangu_puzzle", "pangu_logic"], hint: "读图向导：从约束最强的行 / 列开始（该行已填数字最多的）。逐格排除候选。", hasImage: true },
    { id: "P1516O1_AK8_17", grade: 8, year: "2015/16", round: "初赛", num: 17, difficulty: 4, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k8-PMT16_O1.pdf", page: 5, title: "(0.02)^-1", translation: "计算 (0.02)^{-1}", options: ["20", "30", "40", "50", "60"], topics: ["pangu_fraction", "pangu_algebra"], hint: "1/0.02 = 50。答案：d", answer: "d" },
    { id: "P1516O1_AK8_18", grade: 8, year: "2015/16", round: "初赛", num: 18, difficulty: 4, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k8-PMT16_O1.pdf", page: 6, title: "COYOTE 字母算式", translation: "字母代数字（M=2, Y=7）。求 C+O+Y+O+T+E。", options: ["14", "18", "24", "28", "34"], topics: ["pangu_puzzle"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true },
    { id: "P1516O1_AK8_19", grade: 8, year: "2015/16", round: "初赛", num: 19, difficulty: 5, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k8-PMT16_O1.pdf", page: 6, title: "等边+正方形+等边五边形求 α", translation: "图中含等边△GAH、正方形 ABCD、等边五边形 CDEFH、三角形 GHF。求 α 角。", options: ["39°", "41°", "43°", "45°", "47°"], topics: ["pangu_angle", "pangu_geom"], hint: "读图向导：n 边形内角和 = (n-2)·180°。等边等角图形每角平均分配。", hasImage: true },
    { id: "P1516O1_AK8_20", grade: 8, year: "2015/16", round: "初赛", num: 20, difficulty: 5, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k8-PMT16_O1.pdf", page: 6, title: "3 等边三角形嵌 AEBFCDA 长度", translation: "三个等边△ACD、BFC、AEB 嵌套。ABC 周长 12。折线 AEBFCDA 长多少？", options: ["16", "20", "24", "28", "36"], topics: ["pangu_geom", "pangu_algebra"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true },

    // ========== 2015/2016 AK8 复赛 ==========
    { id: "P1516O2_AK8_1", grade: 8, year: "2015/16", round: "复赛", num: 1, difficulty: 2, file: "盘古竞赛/O2-ü0ç3k8-PMT16.pdf", page: 3, title: "7 车 19 轮", translation: "7 辆二/三轮车共 19 轮。二轮几辆？", options: ["6", "5", "4", "3", "2"], topics: ["pangu_algebra"], hint: "x=2。答案：e", answer: "e" },
    { id: "P1516O2_AK8_2", grade: 8, year: "2015/16", round: "复赛", num: 2, difficulty: 2, file: "盘古竞赛/O2-ü0ç3k8-PMT16.pdf", page: 3, title: "5/6 与 7/8 之间的分数", translation: "哪个分数在 5/6 与 7/8 之间？", options: ["4/5", "18/22", "41/48", "8/9", "2/3"], topics: ["pangu_fraction"], hint: "41/48。答案：c", answer: "c" },
    { id: "P1516O2_AK8_3", grade: 8, year: "2015/16", round: "复赛", num: 3, difficulty: 2, file: "盘古竞赛/O2-ü0ç3k8-PMT16.pdf", page: 3, title: "4 矩形+中间正方形", translation: "4 长方形（5×3）围成中间正方形。中间面积？", options: ["4 cm²", "6 cm²", "8 cm²", "9 cm²", "1 cm²"], topics: ["pangu_geom"], hint: "边 = 5-3 = 2，4。答案：a", answer: "a" },
    { id: "P1516O2_AK8_4", grade: 8, year: "2015/16", round: "复赛", num: 4, difficulty: 3, file: "盘古竞赛/O2-ü0ç3k8-PMT16.pdf", page: 3, title: "a,b∈[1,2013] 表达式最大值", translation: "a、b∈[1,2013]。原题表达式最大值？（详见 PDF）", options: ["4025", "2016", "4024", "4026", "1337"], topics: ["pangu_algebra"], hint: "读图向导：从 PDF 中读出完整表达式，按运算优先级逐步化简。", hasImage: true },
    { id: "P1516O2_AK8_5", grade: 8, year: "2015/16", round: "复赛", num: 5, difficulty: 3, file: "盘古竞赛/O2-ü0ç3k8-PMT16.pdf", page: 3, title: "852 位数字的书页数", translation: "书页编号一共用了 852 个数字。共几页？", options: ["320", "310", "305", "303", "321"], topics: ["pangu_count", "pangu_number"], hint: "1-9 用 9 位，10-99 用 180 位，剩 663 位用于三位数：663/3 = 221 页 → 99+221 = 320。答案：a", answer: "a" },
    { id: "P1516O2_AK8_6", grade: 8, year: "2015/16", round: "复赛", num: 6, difficulty: 3, file: "盘古竞赛/O2-ü0ç3k8-PMT16.pdf", page: 4, title: "7 火柴三角种数", translation: "7 根火柴拼三角形（顺序不计）。几种？", options: ["2", "3", "4", "5", "6"], topics: ["pangu_geom", "pangu_count"], hint: "(1,3,3)(2,2,3) 2 种。答案：a", answer: "a" },
    { id: "P1516O2_AK8_7", grade: 8, year: "2015/16", round: "复赛", num: 7, difficulty: 4, file: "盘古竞赛/O2-ü0ç3k8-PMT16.pdf", page: 4, title: "1 cm 点阵图形面积", translation: "点阵间距 1 cm。图形面积多少 cm²？", options: ["16.5", "18.5", "20.5", "22.5", "24.5"], topics: ["pangu_geom"], hint: "读图向导：算前几张图的点数序列，找相邻差（等差）或相邻比（等比），推出第 n 张的通项。", hasImage: true },
    { id: "P1516O2_AK8_8", grade: 8, year: "2015/16", round: "复赛", num: 8, difficulty: 4, file: "盘古竞赛/O2-ü0ç3k8-PMT16.pdf", page: 4, title: "3 天平平衡", translation: "天平 1、2 平衡。天平 3 右盘放几方块才平衡？", options: ["8", "9", "10", "12", "15"], topics: ["pangu_app", "pangu_algebra"], hint: "读图向导：把每种图形代成变量（例 △=a、○=b），从每张平衡的天平列一个等式，联立求解。", hasImage: true },
    { id: "P1516O2_AK8_9", grade: 8, year: "2015/16", round: "复赛", num: 9, difficulty: 4, file: "盘古竞赛/O2-ü0ç3k8-PMT16.pdf", page: 5, title: "三角形角比 2:3:4 求 C", translation: "△三角 a<b<c 比 2:3:4。求 ∠C。", options: ["50°", "60°", "70°", "80°", "90°"], topics: ["pangu_angle"], hint: "2+3+4=9, ∠C = 180×4/9 = 80°。答案：d", answer: "d" },
    { id: "P1516O2_AK8_10", grade: 8, year: "2015/16", round: "复赛", num: 10, difficulty: 4, file: "盘古竞赛/O2-ü0ç3k8-PMT16.pdf", page: 5, title: "30 cm 方板挖 10 cm 方框重量", translation: "30 cm 方形金属板挖去 10 cm 方形块（重 2.7 kg）。剩下框架多重？", options: ["20.8 kg", "21.6 kg", "23.1 kg", "23.6 kg", "24.4 kg"], topics: ["pangu_geom", "pangu_algebra"], hint: "面积比 (900-100)/100 = 8 → 框重 = 8×2.7 = 21.6 kg。答案：b", answer: "b" },
    { id: "P1516O2_AK8_11", grade: 8, year: "2015/16", round: "复赛", num: 11, difficulty: 5, file: "盘古竞赛/O2-ü0ç3k8-PMT16.pdf", page: 5, title: "3+6 人加权平均体重", translation: "3 人平均 75 kg，另 6 人平均 66 kg。9 人总平均多少？", options: ["70.5", "68", "70", "65", "69"], topics: ["pangu_algebra"], hint: "(3×75+6×66)/9 = (225+396)/9 = 69。答案：e", answer: "e" },
    { id: "P1516O2_AK8_12", grade: 8, year: "2015/16", round: "复赛", num: 12, difficulty: 5, file: "盘古竞赛/O2-ü0ç3k8-PMT16.pdf", page: 5, title: "地毯未覆盖面积比例", translation: "波斯地毯放在正方形砖地上。未被覆盖的地面占多少？", options: ["16/36", "5/9", "11/36", "22/30", "4/6"], topics: ["pangu_fraction", "pangu_geom"], hint: "读图向导：数总格子数，再看每种拼块占几格。用面积除法估计上限，再逐个试拼。", hasImage: true },

    // ========== 2015/2016 AK8 决赛 ==========
    { id: "P1516F_AK8_1", grade: 8, year: "2015/16", round: "决赛", num: 1, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k8-PMT16-v2.pdf", page: 3, title: "锯木 4→5 段", translation: "锯 4 段用 12 分钟。锯 5 段要多久？", options: ["18 分", "17 分", "16 分", "15 分", "14 分"], topics: ["pangu_logic"], hint: "每刀 4 分，4 刀 = 16 分。答案：c", answer: "c" },
    { id: "P1516F_AK8_2", grade: 8, year: "2015/16", round: "决赛", num: 2, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k8-PMT16-v2.pdf", page: 3, title: "算式求值", translation: "下方算式的值？（原题需看 PDF）", options: ["5000", "5550", "5555", "5565", "5580"], topics: ["pangu_calc"], hint: "读图向导：从 PDF 中读出完整表达式，按运算优先级逐步化简。", hasImage: true },
    { id: "P1516F_AK8_3", grade: 8, year: "2015/16", round: "决赛", num: 3, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k8-PMT16-v2.pdf", page: 3, title: "△ABC AD 中线求 ∠BAD", translation: "AD 中线，∠ACB=30°，∠ADB=45°。∠BAD 多大？", options: ["15°", "20°", "30°", "45°", "60°"], topics: ["pangu_angle"], hint: "读图向导：设未知年龄为 x，写出\"几年后 = 几倍\"这类关系式并解方程。", hasImage: true },
    { id: "P1516F_AK8_4", grade: 8, year: "2015/16", round: "决赛", num: 4, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k8-PMT16-v2.pdf", page: 3, title: "3×3 方格积 1 求 e+c", translation: "3×3 方格中三方向乘积都 1。e+c 是多少？", options: ["8", "18", "1/4", "5/16", "33/16"], topics: ["pangu_puzzle", "pangu_algebra"], hint: "读图向导：用 Pick 定理 A = 内点 + 边点/2 − 1；或分解为矩形 + 三角形之和。", hasImage: true },
    { id: "P1516F_AK8_5", grade: 8, year: "2015/16", round: "决赛", num: 5, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k8-PMT16-v2.pdf", page: 4, title: "表达式求值", translation: "给定条件代入表达式求值。（详见 PDF）", options: ["-11", "-5", "1", "5", "11"], topics: ["pangu_algebra"], hint: "读图向导：从 PDF 中读出完整表达式，按运算优先级逐步化简。", hasImage: true },
    { id: "P1516F_AK8_6", grade: 8, year: "2015/16", round: "决赛", num: 6, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k8-PMT16-v2.pdf", page: 4, title: "矩形内两圆", translation: "矩形内两圆相切，r=2 cm。矩形面积？", options: ["32 cm²", "24 cm²", "16 cm²", "12 cm²", "8 cm²"], topics: ["pangu_geom"], hint: "32。答案：a", answer: "a" },
    { id: "P1516F_AK8_7", grade: 8, year: "2015/16", round: "决赛", num: 7, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k8-PMT16-v2.pdf", page: 4, title: "边 3 倍容 9 个 B", translation: "△A 边是 △B 3 倍。装几个 B？", options: ["3", "6", "7", "9", "10"], topics: ["pangu_geom"], hint: "面积 9 倍。答案：d", answer: "d" },
    { id: "P1516F_AK8_8", grade: 8, year: "2015/16", round: "决赛", num: 8, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k8-PMT16-v2.pdf", page: 4, title: "求 b 角（a=35, d=40, c=55）", translation: "图中 a=35°、d=40°、c=55°。b 是多少度？", options: ["100°", "105°", "120°", "125°", "130°"], topics: ["pangu_angle"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true },
    { id: "P1516F_AK8_9", grade: 8, year: "2015/16", round: "决赛", num: 9, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k8-PMT16-v2.pdf", page: 5, title: "骰子顶面", translation: "骰子对面和 7，滚到 X 顶面？", options: ["2", "3", "4", "5", "6"], topics: ["pangu_solid"], hint: "读图向导：立方体对面之和恒为 7。展开图折叠时可先固定一面为底、追踪相邻关系；三视图题分层扫描每一层的方块数。", hasImage: true },
    { id: "P1516F_AK8_10", grade: 8, year: "2015/16", round: "决赛", num: 10, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k8-PMT16-v2.pdf", page: 5, title: "展开图 A、C 边号", translation: "展开图 A、B、C 折叠后 A 与 C 相接的边号之和？", options: ["3", "4", "5", "6", "8"], topics: ["pangu_solid"], hint: "读图向导：立方体对面之和恒为 7。展开图折叠时可先固定一面为底、追踪相邻关系；三视图题分层扫描每一层的方块数。", hasImage: true },
    { id: "P1516F_AK8_11", grade: 8, year: "2015/16", round: "决赛", num: 11, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k8-PMT16-v2.pdf", page: 5, title: "矩形中点阴影面积", translation: "AB=9、BC=13。阴影面积？", options: ["选项见图", "选项见图", "选项见图", "选项见图", "选项见图"], topics: ["pangu_geom"], hint: "读图向导：用\"整体面积 − 空白面积\"更快；或把阴影分解成矩形 / 三角形之和。若图形对称，可只算 1/2 或 1/4 再乘。", hasImage: true },
    { id: "P1516F_AK8_12", grade: 8, year: "2015/16", round: "决赛", num: 12, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k8-PMT16-v2.pdf", page: 5, title: "两数的商", translation: "两数的商是多少？（详见 PDF）", options: ["1", "2", "3", "4", "5"], topics: ["pangu_calc"], hint: "读图向导：从 PDF 找到题目中的两个数，作除法。", hasImage: true },
    { id: "P1516F_AK8_13", grade: 8, year: "2015/16", round: "决赛", num: 13, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k8-PMT16-v2.pdf", page: 6, title: "31+33+…+81 和", translation: "计算 31+33+…+81。", options: ["1238", "1245", "1375", "1453", "1456"], topics: ["pangu_pattern"], hint: "1456。答案：e", answer: "e" },
    { id: "P1516F_AK8_14", grade: 8, year: "2015/16", round: "决赛", num: 14, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k8-PMT16-v2.pdf", page: 6, title: "KLMN 阴影面积", translation: "各正方形边 2 cm。阴影 KLMN 面积？", options: ["96", "84", "76", "88", "104"], topics: ["pangu_geom"], hint: "读图向导：用\"整体面积 − 空白面积\"更快；或把阴影分解成矩形 / 三角形之和。若图形对称，可只算 1/2 或 1/4 再乘。", hasImage: true },
    { id: "P1516F_AK8_15", grade: 8, year: "2015/16", round: "决赛", num: 15, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k8-PMT16-v2.pdf", page: 6, title: "立方体三视图字母", translation: "立方体 6 面字母，三视图下阴影面字母？", options: ["T", "P", "X", "E", "V"], topics: ["pangu_solid"], hint: "读图向导：分别读出正视 / 侧视 / 顶视三张图，对应立体结构逐层放方块，注意\"多个方块共用同一列\"造成的错位。", hasImage: true },

    // ========== 2020/2021 AK8 初赛 ==========
    { id: "P2021O1_AK8_1", grade: 8, year: "2020/21", round: "初赛", num: 1, difficulty: 1, file: "盘古竞赛/Fragekatalog_Ak8_O1_2021.pdf", page: 3, title: "AE 8 cm 4 等分小半圆半径", translation: "AE = 8 cm 被 4 等分。最小的半圆半径是多少？", options: ["0.5 cm", "1 cm", "1.5 cm", "2 cm", "4 cm"], topics: ["pangu_geom"], hint: "每段 2 cm，最小半圆直径 2，半径 1 cm。答案：b", hasImage: true, answer: "b" },
    { id: "P2021O1_AK8_2", grade: 8, year: "2020/21", round: "初赛", num: 2, difficulty: 1, file: "盘古竞赛/Fragekatalog_Ak8_O1_2021.pdf", page: 3, title: "数字金字塔求 ?", translation: "两相邻数之和写上方。问号处是几？", options: ["1", "2", "3", "4", "5"], topics: ["pangu_puzzle"], hint: "读图向导：上一格 = 下面相邻两格之和。从已知格向上或向下逐步推。", hasImage: true, answer: "a" },
    { id: "P2021O1_AK8_3", grade: 8, year: "2020/21", round: "初赛", num: 3, difficulty: 1, file: "盘古竞赛/Fragekatalog_Ak8_O1_2021.pdf", page: 3, title: "哪个不整除 330", translation: "以下哪个数不能整除 330？", options: ["2", "3", "5", "7", "11"], topics: ["pangu_number"], hint: "330 = 2·3·5·11, 不含 7。答案：d", answer: "d" },
    { id: "P2021O1_AK8_4", grade: 8, year: "2020/21", round: "初赛", num: 4, difficulty: 2, file: "盘古竞赛/Fragekatalog_Ak8_O1_2021.pdf", page: 3, title: "图中三角形数", translation: "图中有几个三角形？", options: ["9", "10", "11", "12", "13"], topics: ["pangu_count", "pangu_geom"], hint: "读图向导：分层数（先数最小的基础三角形；再数由 2 个 / 4 个组成的复合三角形；最后加起来）。注意正立和倒立分开数。", hasImage: true, answer: "e" },
    { id: "P2021O1_AK8_5", grade: 8, year: "2020/21", round: "初赛", num: 5, difficulty: 2, file: "盘古竞赛/Fragekatalog_Ak8_O1_2021.pdf", page: 4, title: "1;2+3;4+5+6;7+8+9+10;下一行", translation: "1=; 2+3=; 4+5+6=; 7+8+9+10=; 下一行的和是几？", options: ["45", "55", "60", "64", "65"], topics: ["pangu_pattern", "pangu_algebra"], hint: "下一行 11+12+13+14+15 = 65。答案：e", answer: "e" },
    { id: "P2021O1_AK8_6", grade: 8, year: "2020/21", round: "初赛", num: 6, difficulty: 2, file: "盘古竞赛/Fragekatalog_Ak8_O1_2021.pdf", page: 4, title: "某数 1/5 是 60 求 1/3", translation: "某数的 1/5 是 60。1/3 是多少？", options: ["12", "20", "100", "120", "300"], topics: ["pangu_fraction"], hint: "整数 = 300，1/3 = 100。答案：c", answer: "c" },
    { id: "P2021O1_AK8_7", grade: 8, year: "2020/21", round: "初赛", num: 7, difficulty: 3, file: "盘古竞赛/Fragekatalog_Ak8_O1_2021.pdf", page: 4, title: "a+b=20, a²+b²=218 求 ab", translation: "a+b=20, a²+b²=218。求 a·b。", options: ["75", "84", "91", "96", "182"], topics: ["pangu_algebra"], hint: "(a+b)²=a²+2ab+b² → 400=218+2ab → ab=91。答案：c", answer: "c" },
    { id: "P2021O1_AK8_8", grade: 8, year: "2020/21", round: "初赛", num: 8, difficulty: 3, file: "盘古竞赛/Fragekatalog_Ak8_O1_2021.pdf", page: 4, title: "先降 10% 后降 30% 等效", translation: "先降 10% 再降 30%。相同终价需一次降多少？", options: ["20%", "37%", "40%", "43%", "63%"], topics: ["pangu_percent"], hint: "0.9×0.7 = 0.63 → 一次降 37%。答案：b", answer: "b" },
    { id: "P2021O1_AK8_9", grade: 8, year: "2020/21", round: "初赛", num: 9, difficulty: 4, file: "盘古竞赛/Fragekatalog_Ak8_O1_2021.pdf", page: 5, title: "三角每边和 20 阴影和", translation: "1-9 填入三角形，每边和 20。阴影圆内数字之和？", options: ["10", "15", "20", "30", "35"], topics: ["pangu_puzzle", "pangu_algebra"], hint: "读图向导：用\"整体面积 − 空白面积\"更快；或把阴影分解成矩形 / 三角形之和。若图形对称，可只算 1/2 或 1/4 再乘。", hasImage: true, answer: "d" },
    { id: "P2021O1_AK8_10", grade: 8, year: "2020/21", round: "初赛", num: 10, difficulty: 4, file: "盘古竞赛/Fragekatalog_Ak8_O1_2021.pdf", page: 5, title: "望远数系列和", translation: "1·2(1-1/2) + 2·3(1/2-1/3) + … + 2019·2020(1/2019-1/2020)。答案？", options: ["1", "2018", "2019", "2020", "2019/2020"], topics: ["pangu_pattern", "pangu_algebra"], hint: "每项 = k(k+1)·1/[k(k+1)] = 1，共 2019 项。答案：c", answer: "d" },
    { id: "P2021O1_AK8_11", grade: 8, year: "2020/21", round: "初赛", num: 11, difficulty: 5, file: "盘古竞赛/Fragekatalog_Ak8_O1_2021.pdf", page: 5, title: "Bianca 双立方体涂面积", translation: "边 2 cm 的立方体上叠一个边 1.6 cm 的立方体（居中）。所有可见面积多少？", options: ["27.68 cm²", "30.24 cm²", "32.80 cm²", "34.24 cm²", "36.80 cm²"], topics: ["pangu_solid", "pangu_geom"], hint: "大立方体：4 侧面+底面上除小方形 = 4×4+(4-2.56) = 16+1.44=17.44; 加小立方体 4 侧+顶 = 4×2.56+2.56 = 12.8。合计 30.24。答案：b", answer: "b" },
    { id: "P2021O1_AK8_12", grade: 8, year: "2020/21", round: "初赛", num: 12, difficulty: 5, file: "盘古竞赛/Fragekatalog_Ak8_O1_2021.pdf", page: 6, title: "100 方格整圆数", translation: "第 1 图 8 圆，第 2 图 21 圆。100 方格大图几个整圆？", options: ["120", "260", "280", "360", "2660"], topics: ["pangu_count", "pangu_pattern"], hint: "边长 n×n 的图圆数 = n²+(n+1)²/... 需推公式。答案参照 PDF。", hasImage: true, answer: "c" },

    // ========== 2021/2022 AK8 决赛 ==========
    { id: "P2122F_AK8_1", grade: 8, year: "2021/22", round: "决赛", num: 1, difficulty: 3, file: "盘古竞赛/PMT2122-8-Final.pdf", page: 3, title: "7 位回文数个数", translation: "7 位回文数有几个？", options: ["900", "6561", "8100", "9000", "10000"], topics: ["pangu_number", "pangu_count"], hint: "9·10³ = 9000。答案：d", answer: "d" },
    { id: "P2122F_AK8_2", grade: 8, year: "2021/22", round: "决赛", num: 2, difficulty: 3, file: "盘古竞赛/PMT2122-8-Final.pdf", page: 3, title: "3 cm 立方体装 12×15×18 rätblock", translation: "边 3 cm 立方体装入 12×15×18 cm 长方体，最多几个？", options: ["15", "45", "120", "1080", "3240"], topics: ["pangu_solid"], hint: "(12/3)×(15/3)×(18/3) = 4×5×6 = 120。答案：c", answer: "c" },
    { id: "P2122F_AK8_3", grade: 8, year: "2021/22", round: "决赛", num: 3, difficulty: 3, file: "盘古竞赛/PMT2122-8-Final.pdf", page: 3, title: "3 相同矩形拼大矩形周长", translation: "3 个相同长方形拼成大矩形（面积 96 cm²）。大矩形周长？", options: ["32 cm", "4√96 cm", "40 cm", "48 cm", "72 cm"], topics: ["pangu_geom", "pangu_algebra"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true, answer: "c" },
    { id: "P2122F_AK8_4", grade: 8, year: "2021/22", round: "决赛", num: 4, difficulty: 3, file: "盘古竞赛/PMT2122-8-Final.pdf", page: 3, title: "浴缸同开水龙头+塞子拔", translation: "水龙头 4 分能灌满浴缸；拔塞 6 分能放空。同时开+拔塞时几分钟灌满？", options: ["6 分", "8 分", "12 分", "24 分", "永远灌不满"], topics: ["pangu_app", "pangu_algebra"], hint: "净速率 = 1/4 - 1/6 = 1/12，灌满 12 分。答案：c", answer: "c" },
    { id: "P2122F_AK8_5", grade: 8, year: "2021/22", round: "决赛", num: 5, difficulty: 4, file: "盘古竞赛/PMT2122-8-Final.pdf", page: 4, title: "两位数 数和+数积=本身", translation: "两位数满足：数字和+数字积=本身。有几个？", options: ["5", "6", "7", "8", "9"], topics: ["pangu_number"], hint: "个位=9 时可行，共 9 个。答案：e", answer: "e" },
    { id: "P2122F_AK8_6", grade: 8, year: "2021/22", round: "决赛", num: 6, difficulty: 4, file: "盘古竞赛/PMT2122-8-Final.pdf", page: 4, title: "1.7 m 链子几个环", translation: "手工艺人 Louise 做 1.7 m 长链子（每环见图）。需要几个环？", options: ["17", "30", "41", "42", "60"], topics: ["pangu_app", "pangu_algebra"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true, answer: "d" },
    { id: "P2122F_AK8_7", grade: 8, year: "2021/22", round: "决赛", num: 7, difficulty: 4, file: "盘古竞赛/PMT2122-8-Final.pdf", page: 4, title: "Christian 漫画 CRT", translation: "分 3、4、5 都少 2 本。<200 最多几本？", options: ["58", "116", "174", "178", "198"], topics: ["pangu_number", "pangu_algebra"], hint: "178。答案：d", answer: "d" },
    { id: "P2122F_AK8_8", grade: 8, year: "2021/22", round: "决赛", num: 8, difficulty: 5, file: "盘古竞赛/PMT2122-8-Final.pdf", page: 5, title: "4 兄妹只 1 真话", translation: "4 人证词，只 1 真话。谁弄坏窗？", options: ["Elias", "Klara", "Felix", "Matilda", "无法确定"], topics: ["pangu_logic"], hint: "Matilda 真、Felix 假 → Klara。答案：b", answer: "b" },
    { id: "P2122F_AK8_9", grade: 8, year: "2021/22", round: "决赛", num: 9, difficulty: 5, file: "盘古竞赛/PMT2122-8-Final.pdf", page: 5, title: "11+13+…+31 和", translation: "已知 1+3+…+(2n-1)=n²。求 11+13+15+…+31。", options: ["220", "231", "441", "840", "880"], topics: ["pangu_pattern", "pangu_algebra"], hint: "= (1+3+…+31) - (1+3+…+9) = 16²-5² = 256-25 = 231。答案：b", answer: "b" },
    { id: "P2122F_AK8_10", grade: 8, year: "2021/22", round: "决赛", num: 10, difficulty: 5, file: "盘古竞赛/PMT2122-8-Final.pdf", page: 5, title: "祖孙年龄 m·n", translation: "外公 mm 岁，外婆 mn 岁，儿子 nn 岁，男孙 m 岁，女孙 n 岁。外公+儿子+男孙均 35；外婆+女孙均 33。求 m·n。", options: ["18", "34", "40", "63", "68"], topics: ["pangu_algebra", "pangu_number"], hint: "11m + 11n + m = 105 → 12m+11n=105; 11m+n+n = 66 → 11m+2n=66。解得 m=6, n=0 或 m=4, n=11 不合适。系统枚举：m=4, n=7: 12·4+11·7=48+77=125 ✗; m=6, n=3: 72+33=105 ✓, 66+6=72 ≠ 66。答案见 PDF。", answer: "a" },

    // ========== 2022/2023 AK8 初赛 ==========
    { id: "P2223O1_AK8_1", grade: 8, year: "2022/23", round: "初赛", num: 1, difficulty: 1, file: "盘古竞赛/Fragekatalog-Ak8-O1-PMT2223.pdf", page: 3, title: "5 木棒选 3 拼三角", translation: "1-5 cm 木棒选 3 根拼三角形。几种？", options: ["1", "3", "4", "5", "10"], topics: ["pangu_geom", "pangu_count"], hint: "3 种。答案：b", answer: "b" },
    { id: "P2223O1_AK8_2", grade: 8, year: "2022/23", round: "初赛", num: 2, difficulty: 1, file: "盘古竞赛/Fragekatalog-Ak8-O1-PMT2223.pdf", page: 3, title: "23 年几个月", translation: "23 年是多少月？", options: ["21 月", "30 月", "24 月", "27 月", "33 月"], topics: ["pangu_calc"], hint: "选项异常（正确 276 月）。以 PDF 为准。", answer: "e" },
    { id: "P2223O1_AK8_3", grade: 8, year: "2022/23", round: "初赛", num: 3, difficulty: 1, file: "盘古竞赛/Fragekatalog-Ak8-O1-PMT2223.pdf", page: 3, title: "5-(1-(2-3))", translation: "计算 5 - (1 - (2 - 3))", options: ["3", "-1", "9", "4", "10"], topics: ["pangu_calc"], hint: "5-(1-(-1)) = 5-2 = 3。答案：a", answer: "a" },
    { id: "P2223O1_AK8_4", grade: 8, year: "2022/23", round: "初赛", num: 4, difficulty: 2, file: "盘古竞赛/Fragekatalog-Ak8-O1-PMT2223.pdf", page: 3, title: "3 正方形拼矩形周长 20", translation: "3 正方形拼矩形周长 20 cm。1 个正方形周长？", options: ["16 cm", "6.4 cm", "10 cm", "10.4 cm", "24 cm"], topics: ["pangu_geom", "pangu_algebra"], hint: "10。答案：c", answer: "c" },
    { id: "P2223O1_AK8_5", grade: 8, year: "2022/23", round: "初赛", num: 5, difficulty: 2, file: "盘古竞赛/Fragekatalog-Ak8-O1-PMT2223.pdf", page: 3, title: "三角形周长 22 最长边", translation: "整数边周长 22 三角形。最长边最大是多少？", options: ["7", "8", "9", "10", "11"], topics: ["pangu_geom"], hint: "10。答案：d", answer: "d" },
    { id: "P2223O1_AK8_6", grade: 8, year: "2022/23", round: "初赛", num: 6, difficulty: 2, file: "盘古竞赛/Fragekatalog-Ak8-O1-PMT2223.pdf", page: 3, title: "夹克 -20% +20%", translation: "夹克 1000 kr 先降 20% 后涨 20%。最终价？", options: ["640", "800", "900", "960", "1200"], topics: ["pangu_percent"], hint: "1000×0.8×1.2 = 960。答案：d", answer: "d" },
    { id: "P2223O1_AK8_7", grade: 8, year: "2022/23", round: "初赛", num: 7, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak8-O1-PMT2223.pdf", page: 4, title: "等边+等腰求 v", translation: "△ABC 等边、△ABD 等腰。∠v？", options: ["85°", "80°", "75°", "73°", "70°"], topics: ["pangu_angle", "pangu_geom"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true, answer: "c" },
    { id: "P2223O1_AK8_8", grade: 8, year: "2022/23", round: "初赛", num: 8, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak8-O1-PMT2223.pdf", page: 4, title: "三位数数字和>24 几个", translation: "数字和 > 24 的三位数有几个？", options: ["9", "10", "17", "18", "19"], topics: ["pangu_count", "pangu_number"], hint: "数字和 25：999 各位和 27，反向枚举：≥25 → 25 有 6 个、26 有 3 个、27 有 1 个。总 10。答案：b", answer: "b" },
    { id: "P2223O1_AK8_9", grade: 8, year: "2022/23", round: "初赛", num: 9, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak8-O1-PMT2223.pdf", page: 4, title: "骰子平均 2.5 求 3 次数", translation: "骰子结果均值 2.5。3 出现几次？", options: ["2", "4", "6", "10", "12"], topics: ["pangu_algebra", "pangu_probability"], hint: "读图向导：立方体对面之和恒为 7。展开图折叠时可先固定一面为底、追踪相邻关系；三视图题分层扫描每一层的方块数。", hasImage: true, answer: "e" },
    { id: "P2223O1_AK8_10", grade: 8, year: "2022/23", round: "初赛", num: 10, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak8-O1-PMT2223.pdf", page: 5, title: "补全正方形百分比", translation: "图形要补成完整正方形。原始图形占正方形的百分之几？", options: ["36%", "64%", "60%", "54%", "80%"], topics: ["pangu_geom", "pangu_percent"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true, answer: "b" },
    { id: "P2223O1_AK8_11", grade: 8, year: "2022/23", round: "初赛", num: 11, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak8-O1-PMT2223.pdf", page: 5, title: "Emma 6 km/h Annika 9 km/h 20 分相遇", translation: "Emma 6 km/h、Annika 9 km/h 反向跑湖。20 分相遇。Emma 跑一圈需多久？", options: ["25 分", "30 分", "40 分", "50 分", "501 分"], topics: ["pangu_app", "pangu_algebra"], hint: "20 分共走 (6+9)×20/60 = 5 km 一圈。Emma 单跑 5÷6 = 50 分。答案：d", answer: "d" },
    { id: "P2223O1_AK8_12", grade: 8, year: "2022/23", round: "初赛", num: 12, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak8-O1-PMT2223.pdf", page: 5, title: "1/4 圆内 CD 长", translation: "1/4 圆中有 r=1 cm 半圆。CD 与半圆相切、平行 AB。CD 多长？", options: ["√3/2 cm", "4 cm", "√5/3 cm", "9/5 cm", "5 cm"], topics: ["pangu_geom"], hint: "读图向导：连接圆心到切点得半径垂线；构造直角三角形用勾股。", hasImage: true, answer: "c" },

    // ========== 2022/2023 AK8 决赛 ==========
    { id: "P2223F_AK8_1", grade: 8, year: "2022/23", round: "决赛", num: 1, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak8-Final-PMT2223.pdf", page: 3, title: "218453 去 3 位得最小 5 倍数", translation: "218453 去 3 位得最小的、能被 5 整除的三位数（保序）。被去数字之积？", options: ["20", "24", "48", "96", "160"], topics: ["pangu_number", "pangu_puzzle"], hint: "48。答案：c", answer: "c" },
    { id: "P2223F_AK8_2", grade: 8, year: "2022/23", round: "决赛", num: 2, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak8-Final-PMT2223.pdf", page: 3, title: "图中三角形数", translation: "图中有几个三角形？", options: ["10", "11", "12", "13", "14"], topics: ["pangu_count", "pangu_geom"], hint: "读图向导：分层数（先数最小的基础三角形；再数由 2 个 / 4 个组成的复合三角形；最后加起来）。注意正立和倒立分开数。", hasImage: true, answer: "d" },
    { id: "P2223F_AK8_3", grade: 8, year: "2022/23", round: "决赛", num: 3, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak8-Final-PMT2223.pdf", page: 3, title: "(r+1)(r-1) 最大值（mod 6）", translation: "非负整数除以 6 的余数为 r。(r+1)(r-1) 的最大值？", options: ["24", "25", "35", "30", "36"], topics: ["pangu_algebra", "pangu_number"], hint: "r ∈ {0,1,2,3,4,5}, (r+1)(r-1)=r²-1。r=5 时 24。答案：a", answer: "a" },
    { id: "P2223F_AK8_4", grade: 8, year: "2022/23", round: "决赛", num: 4, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak8-Final-PMT2223.pdf", page: 3, title: "100 cm 均匀棒切中点位移", translation: "100 cm 均匀棒一端切 25、另一端切 12.5。中点位移几 cm？", options: ["0", "6.25", "12.5", "18.75", "37.5"], topics: ["pangu_geom"], hint: "6.25。答案：b", answer: "b" },
    { id: "P2223F_AK8_5", grade: 8, year: "2022/23", round: "决赛", num: 5, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak8-Final-PMT2223.pdf", page: 4, title: "Lovisa 3 旗帜 3 色染色", translation: "3 种旗 × 3 色（红黄绿）。每旗每色最多 1 次。多少种？", options: ["6", "9", "12", "15", "18"], topics: ["pangu_count"], hint: "18。答案：e", answer: "d" },
    { id: "P2223F_AK8_6", grade: 8, year: "2022/23", round: "决赛", num: 6, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak8-Final-PMT2223.pdf", page: 4, title: "60 立方体能拼几种长方体", translation: "60 个立方体拼长方体，几种？", options: ["11", "7", "9", "10", "12"], topics: ["pangu_solid", "pangu_number"], hint: "10 种。答案：d", answer: "d" },
    { id: "P2223F_AK8_7", grade: 8, year: "2022/23", round: "决赛", num: 7, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak8-Final-PMT2223.pdf", page: 5, title: "3²+6²+…+30² 计算", translation: "已知 1²+2²+…+10² = 385。求 3²+6²+9²+…+30²。", options: ["1155", "3456", "3465", "3850", "5511"], topics: ["pangu_algebra", "pangu_pattern"], hint: "= 9(1²+2²+…+10²) = 9×385 = 3465。答案：c", answer: "c" },
    { id: "P2223F_AK8_8", grade: 8, year: "2022/23", round: "决赛", num: 8, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak8-Final-PMT2223.pdf", page: 5, title: "x, y 等差和差 q-p=6", translation: "x = 2+4+…+p，y = 6+8+…+q，p、q 偶数、q-p=6。y-x = ?", options: ["3p", "3p-6", "q-p", "3q+6", "3q-12"], topics: ["pangu_algebra"], hint: "y-x = 6+8+…+q - (2+4+…+p) = (2+4+…+q) - (2+4+…+p) - (2+4) = 项和差。展开：q=p+6，多出 3 项 (p+2)+(p+4)+(p+6) = 3p+12，减去初 (2+4)=6 → 3p+6。答案考察略：答案：a(3p) 或 3p+6 — 请以 PDF 为准。", answer: "e" },
    { id: "P2223F_AK8_9", grade: 8, year: "2022/23", round: "决赛", num: 9, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak8-Final-PMT2223.pdf", page: 5, title: "9 小矩形阴影面积", translation: "大矩形分 9 小矩形，5 个已知面积。整数边。阴影面积？", options: ["56 a.e.", "46 a.e.", "60 a.e.", "40 a.e.", "52 a.e."], topics: ["pangu_geom", "pangu_algebra"], hint: "读图向导：用\"整体面积 − 空白面积\"更快；或把阴影分解成矩形 / 三角形之和。若图形对称，可只算 1/2 或 1/4 再乘。", hasImage: true, answer: "a" },
    { id: "P2223F_AK8_10", grade: 8, year: "2022/23", round: "决赛", num: 10, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak8-Final-PMT2223.pdf", page: 6, title: "Galton 板 4 层球到 2 号槽概率", translation: "Galton 板 4 层 5 槽。球落到 2 号槽的概率？", options: ["1/16", "3/16", "3/8", "1/4", "1/2"], topics: ["pangu_probability", "pangu_count"], hint: "2 号槽路径数 = C(4,1) = 4，总路径 2⁴ = 16 → 4/16 = 1/4。答案：d", hasImage: true, answer: "d" },

    // ========== 2023/2024 AK8 决赛 ==========
    { id: "P2324F_AK8_1", grade: 8, year: "2023/24", round: "决赛", num: 1, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak8-FINAL-PMT2324.pdf", page: 3, title: "几个正方形", translation: "图中几个正方形？", options: ["8", "10", "12", "14", "18"], topics: ["pangu_count", "pangu_geom"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true },
    { id: "P2324F_AK8_2", grade: 8, year: "2023/24", round: "决赛", num: 2, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak8-FINAL-PMT2324.pdf", page: 3, title: "鸵鸟比蜂鸟重", translation: "蜂鸟 2 g，鸵鸟 156 kg。差多少 g？", options: ["1558", "15598", "1556002", "155998", "154 kg"], topics: ["pangu_calc"], hint: "155998。答案：d", answer: "d" },
    { id: "P2324F_AK8_3", grade: 8, year: "2023/24", round: "决赛", num: 3, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak8-FINAL-PMT2324.pdf", page: 3, title: "0.96 m 钢丝做立方体棱", translation: "0.96 m 钢丝做立方体棱，每段？", options: ["4 cm", "6 cm", "8 cm", "10 cm", "12 cm"], topics: ["pangu_solid"], hint: "8。答案：c", answer: "c" },
    { id: "P2324F_AK8_4", grade: 8, year: "2023/24", round: "决赛", num: 4, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak8-FINAL-PMT2324.pdf", page: 3, title: "5 孩子最小", translation: "5 孩子推理最小。", options: ["Anna", "Tanja", "Vera", "Jenny", "Kalle"], topics: ["pangu_logic"], hint: "Anna。答案：a", answer: "a" },
    { id: "P2324F_AK8_5", grade: 8, year: "2023/24", round: "决赛", num: 5, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak8-FINAL-PMT2324.pdf", page: 4, title: "三角形第三边种数", translation: "两边 4、5 cm 整数第三边。种数？", options: ["1", "4", "5", "7", "8"], topics: ["pangu_geom"], hint: "7。答案：d", answer: "d" },
    { id: "P2324F_AK8_6", grade: 8, year: "2023/24", round: "决赛", num: 6, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak8-FINAL-PMT2324.pdf", page: 4, title: "1..1000 连位数", translation: "1 到 1000 连写总位数。", options: ["1000", "2893", "2890", "2900", "3001"], topics: ["pangu_count"], hint: "2893。答案：b", answer: "b" },
    { id: "P2324F_AK8_7", grade: 8, year: "2023/24", round: "决赛", num: 7, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak8-FINAL-PMT2324.pdf", page: 4, title: "7 列表 4 数和 288", translation: "整数按 7 列排。已知 2×2 方块 4 数和 36，首行首数 5。另一 4 数和 288 的方块存在吗？首数？", options: ["36", "68", "69", "76", "不存在"], topics: ["pangu_algebra", "pangu_pattern"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true },
    { id: "P2324F_AK8_8", grade: 8, year: "2023/24", round: "决赛", num: 8, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak8-FINAL-PMT2324.pdf", page: 4, title: "n/(100-n) 化简", translation: "n/(100-n) 化简为自然数的 n 有几个？", options: ["99", "50", "10", "8", "1"], topics: ["pangu_fraction", "pangu_number"], hint: "8。答案：d", answer: "d" },
    { id: "P2324F_AK8_9", grade: 8, year: "2023/24", round: "决赛", num: 9, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak8-FINAL-PMT2324.pdf", page: 5, title: "帽子围巾配色最少抽取次数", translation: "袋1:2白8黑4红 帽子；袋2:5白9黑 围巾。轮流抽帽围。至少抽几次一定有一对同色？", options: ["7", "8", "10", "12", "13"], topics: ["pangu_probability", "pangu_logic"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true },
    { id: "P2324F_AK8_10", grade: 8, year: "2023/24", round: "决赛", num: 10, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak8-FINAL-PMT2324.pdf", page: 5, title: "1!+2!+…+99! mod 5", translation: "求 (1!+2!+3!+…+99!) mod 5。", options: ["0", "1", "2", "3", "4"], topics: ["pangu_number", "pangu_pattern"], hint: "n≥5 时 n! 含 5 因子 → mod 5 = 0。仅 1!+2!+3!+4! = 1+2+6+24 = 33，33 mod 5 = 3。答案：d", answer: "d" },

    // ############# AK9 (Årskurs 9, 9 年级) #############
    // 最高年级，涵盖：勾股定理、二次方程、圆几何、组合概率、望远求和、复合百分比

    // ========== 2015/2016 AK9 初赛 ==========
    { id: "P1516O1_AK9_1", grade: 9, year: "2015/16", round: "初赛", num: 1, difficulty: 1, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k9-PMT16_O1.pdf", page: 3, title: "转盘不指向蓝色概率", translation: "旋转的指针不指向蓝色区域的概率是多少？", options: ["16.67%", "66.67%", "40%", "50%", "60%"], topics: ["pangu_probability"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true },
    { id: "P1516O1_AK9_2", grade: 9, year: "2015/16", round: "初赛", num: 2, difficulty: 1, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k9-PMT16_O1.pdf", page: 3, title: "队伍含自己", translation: "Marcel 前 4 后 5。共几人？", options: ["5", "6", "8", "9", "10"], topics: ["pangu_logic"], hint: "10。答案：e", answer: "e" },
    { id: "P1516O1_AK9_3", grade: 9, year: "2015/16", round: "初赛", num: 3, difficulty: 1, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k9-PMT16_O1.pdf", page: 3, title: "表达式最小值", translation: "以下哪个表达式最小？a) 20·16  b) 20/16  c) 2016  d) 1/2016  e) 2+0+1+6", options: ["20·16", "20/16", "2016", "1/2016", "2+0+1+6"], topics: ["pangu_fraction"], hint: "1/2016 最小。答案：d", answer: "d" },
    { id: "P1516O1_AK9_4", grade: 9, year: "2015/16", round: "初赛", num: 4, difficulty: 1, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k9-PMT16_O1.pdf", page: 3, title: "白色阴影占比", translation: "右图白色阴影占多少比例？", options: ["1/3", "1/4", "2/3", "1/5", "3/4"], topics: ["pangu_geom", "pangu_fraction"], hint: "读图向导：用\"整体面积 − 空白面积\"更快；或把阴影分解成矩形 / 三角形之和。若图形对称，可只算 1/2 或 1/4 再乘。", hasImage: true },
    { id: "P1516O1_AK9_5", grade: 9, year: "2015/16", round: "初赛", num: 5, difficulty: 1, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k9-PMT16_O1.pdf", page: 3, title: "121,110,88,55 下一项", translation: "数列 121, 110, 88, 55, ? 下一项？", options: ["1", "11", "22", "33", "44"], topics: ["pangu_pattern"], hint: "差 -11,-22,-33，下一 -44 → 11。答案：b", answer: "b" },
    { id: "P1516O1_AK9_6", grade: 9, year: "2015/16", round: "初赛", num: 6, difficulty: 2, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k9-PMT16_O1.pdf", page: 3, title: "多选考试计分", translation: "考试每对 2 分、每错扣 0.5 分。50 题中 Martin 对 40、错 10。总分？", options: ["60", "70", "75", "80", "90"], topics: ["pangu_calc"], hint: "40×2 - 10×0.5 = 80-5 = 75。答案：c", answer: "c" },
    { id: "P1516O1_AK9_7", grade: 9, year: "2015/16", round: "初赛", num: 7, difficulty: 2, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k9-PMT16_O1.pdf", page: 4, title: "2.5+1/4-0.35 类", translation: "计算 2.5 + [表达式] - [表达式]。（详见 PDF）", options: ["2.5", "1.5", "1", "0.5", "0"], topics: ["pangu_fraction"], hint: "读图向导：从 PDF 中读出完整表达式，按运算优先级逐步化简。", hasImage: true },
    { id: "P1516O1_AK9_8", grade: 9, year: "2015/16", round: "初赛", num: 8, difficulty: 2, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k9-PMT16_O1.pdf", page: 4, title: "分数乘法", translation: "计算 [分数表达式]。（详见 PDF）", options: ["9/16", "1/2", "2/3", "3/4", "1"], topics: ["pangu_fraction"], hint: "读图向导：从 PDF 中读出完整表达式，按运算优先级逐步化简。", hasImage: true },
    { id: "P1516O1_AK9_9", grade: 9, year: "2015/16", round: "初赛", num: 9, difficulty: 2, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k9-PMT16_O1.pdf", page: 4, title: "5 米车道铺沥青求宽", translation: "5 米长车道铺沥青 6300 kr，每 m² 600 kr。车道多宽？", options: ["1.8 m", "1.9 m", "2.0 m", "2.1 m", "2.2 m"], topics: ["pangu_app", "pangu_algebra"], hint: "面积 = 6300÷600 = 10.5 m²，宽 = 10.5÷5 = 2.1 m。答案：d", answer: "d" },
    { id: "P1516O1_AK9_10", grade: 9, year: "2015/16", round: "初赛", num: 10, difficulty: 2, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k9-PMT16_O1.pdf", page: 4, title: "6 蓝 9 红取 2 都红概率", translation: "袋里 6 蓝 9 红球。取 2 球都红的概率？", options: ["54/210", "15/29", "6/9", "12/35", "6/15"], topics: ["pangu_probability", "pangu_fraction"], hint: "C(9,2)/C(15,2) = 36/105 = 12/35。答案：d", answer: "d" },
    { id: "P1516O1_AK9_11", grade: 9, year: "2015/16", round: "初赛", num: 11, difficulty: 3, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k9-PMT16_O1.pdf", page: 4, title: "交替和 1-2+…+2015", translation: "计算 1-2+3-4+…+2013-2014+2015", options: ["1", "0", "2015", "1008", "-1007"], topics: ["pangu_pattern"], hint: "1008。答案：d", answer: "d" },
    { id: "P1516O1_AK9_12", grade: 9, year: "2015/16", round: "初赛", num: 12, difficulty: 3, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k9-PMT16_O1.pdf", page: 4, title: "五边形面积 22 求周长", translation: "五边形面积 22 cm²。周长是多少？", options: ["16", "16+2", "16+3", "16+6", "16+8"], topics: ["pangu_geom", "pangu_algebra"], hint: "读图向导：n 边形内角和 = (n-2)·180°。等边等角图形每角平均分配。", hasImage: true },
    { id: "P1516O1_AK9_13", grade: 9, year: "2015/16", round: "初赛", num: 13, difficulty: 3, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k9-PMT16_O1.pdf", page: 5, title: "4 连续 3 倍数和 126", translation: "Philip 加 4 连续 3 的倍数和 126。最大的是几？", options: ["22", "33", "36", "44", "46"], topics: ["pangu_algebra"], hint: "36。答案：c", answer: "c" },
    { id: "P1516O1_AK9_14", grade: 9, year: "2015/16", round: "初赛", num: 14, difficulty: 3, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k9-PMT16_O1.pdf", page: 5, title: "股票 3 次跌涨 恢复", translation: "股票 -50%,+50%,-50%。第 4 天需涨多少 % 恢复？", options: ["0%", "50%", "98%", "167%", "295%"], topics: ["pangu_percent"], hint: "167%。答案：d", answer: "d" },
    { id: "P1516O1_AK9_15", grade: 9, year: "2015/16", round: "初赛", num: 15, difficulty: 4, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k9-PMT16_O1.pdf", page: 5, title: "6 学生随机 2 差 ≥3 概率", translation: "6 学生 7,8,9,10,11,12 岁。随机选 2 人，年龄差 ≥3 的概率是多少 %？", options: ["20", "33", "36", "40", "46"], topics: ["pangu_probability", "pangu_count"], hint: "总对数 C(6,2)=15。差≥3：{7,10}{7,11}{7,12}{8,11}{8,12}{9,12}=6 对。6/15 = 40%。答案：d", answer: "d" },
    { id: "P1516O1_AK9_16", grade: 9, year: "2015/16", round: "初赛", num: 16, difficulty: 4, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k9-PMT16_O1.pdf", page: 5, title: "4×4 拉丁方深格和", translation: "1,2,3,4 填 4×4 拉丁方。深色格数字之和？", options: ["2", "3", "4", "5", "6"], topics: ["pangu_puzzle"], hint: "读图向导：从约束最强的行 / 列开始（该行已填数字最多的）。逐格排除候选。", hasImage: true },
    { id: "P1516O1_AK9_17", grade: 9, year: "2015/16", round: "初赛", num: 17, difficulty: 4, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k9-PMT16_O1.pdf", page: 5, title: "3×6 矩形分三份求 x", translation: "3×6 cm 矩形分成大小相同的 3 部分（两三角+一平行四边形）。求 x 长度。", options: ["1.1 cm", "1.2 cm", "1.3 cm", "1.4 cm", "1.5 cm"], topics: ["pangu_geom", "pangu_algebra"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true },
    { id: "P1516O1_AK9_18", grade: 9, year: "2015/16", round: "初赛", num: 18, difficulty: 4, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k9-PMT16_O1.pdf", page: 6, title: "COYOTE 字母算式", translation: "字母代数字，M=2、Y=7。求 C+O+Y+O+T+E。", options: ["14", "18", "24", "28", "34"], topics: ["pangu_puzzle"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true },
    { id: "P1516O1_AK9_19", grade: 9, year: "2015/16", round: "初赛", num: 19, difficulty: 5, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k9-PMT16_O1.pdf", page: 6, title: "(0.02)^-1", translation: "计算 (0.02)^{-1}", options: ["20", "30", "40", "50", "60"], topics: ["pangu_fraction", "pangu_algebra"], hint: "50。答案：d", answer: "d" },
    { id: "P1516O1_AK9_20", grade: 9, year: "2015/16", round: "初赛", num: 20, difficulty: 5, file: "盘古竞赛/Frü0è2gekatalog_ü0ç3k9-PMT16_O1.pdf", page: 6, title: "换 2 蓝球为红求总数", translation: "袋里蓝红球，抽蓝概率 60%。换 2 蓝为红后，抽红概率 50%。总球数？", options: ["40", "36", "20", "24", "18"], topics: ["pangu_algebra", "pangu_probability"], hint: "0.6n 是蓝球数；换后蓝 = 0.6n-2，红 = 0.4n+2；(0.4n+2)/n = 0.5 → n=20。答案：c", answer: "c" },

    // ========== 2015/2016 AK9 复赛 ==========
    { id: "P1516O2_AK9_1", grade: 9, year: "2015/16", round: "复赛", num: 1, difficulty: 2, file: "盘古竞赛/O2-ü0ç3k9-PMT16.pdf", page: 3, title: "不能折立方体", translation: "哪个展开图不能折成立方体？", options: ["A", "B", "C", "D", "E"], topics: ["pangu_solid"], hint: "读图向导：立方体对面之和恒为 7。展开图折叠时可先固定一面为底、追踪相邻关系；三视图题分层扫描每一层的方块数。", hasImage: true },
    { id: "P1516O2_AK9_2", grade: 9, year: "2015/16", round: "复赛", num: 2, difficulty: 2, file: "盘古竞赛/O2-ü0ç3k9-PMT16.pdf", page: 3, title: "望远交替和 2-1+3-2+…", translation: "2-1+3-2+4-3+…+101-100 = ?", options: ["99", "100", "101", "102", "104"], topics: ["pangu_pattern"], hint: "100 对差 1，共 100。答案：b", answer: "b" },
    { id: "P1516O2_AK9_3", grade: 9, year: "2015/16", round: "复赛", num: 3, difficulty: 2, file: "盘古竞赛/O2-ü0ç3k9-PMT16.pdf", page: 3, title: "正方形内两等边三角形交角", translation: "正方形内两个相交的等边三角形。指定夹角是多少度？", options: ["150", "170", "100", "110", "120"], topics: ["pangu_angle", "pangu_geom"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true },
    { id: "P1516O2_AK9_4", grade: 9, year: "2015/16", round: "复赛", num: 4, difficulty: 3, file: "盘古竞赛/O2-ü0ç3k9-PMT16.pdf", page: 3, title: "a,b∈[1,2013] 最大值", translation: "a、b∈[1,2013]，原题表达式最大值？（详见 PDF）", options: ["4025", "2016", "4024", "4026", "1337"], topics: ["pangu_algebra"], hint: "读图向导：从 PDF 中读出完整表达式，按运算优先级逐步化简。", hasImage: true },
    { id: "P1516O2_AK9_5", grade: 9, year: "2015/16", round: "复赛", num: 5, difficulty: 3, file: "盘古竞赛/O2-ü0ç3k9-PMT16.pdf", page: 3, title: "852 位数书页数", translation: "书页编号一共用 852 位。共几页？", options: ["320", "310", "305", "303", "321"], topics: ["pangu_number", "pangu_count"], hint: "320。答案：a", answer: "a" },
    { id: "P1516O2_AK9_6", grade: 9, year: "2015/16", round: "复赛", num: 6, difficulty: 3, file: "盘古竞赛/O2-ü0ç3k9-PMT16.pdf", page: 4, title: "地毯未覆盖比例", translation: "波斯地毯放正方形砖地。未覆盖部分比例？", options: ["16/36", "5/9", "11/36", "22/30", "4/6"], topics: ["pangu_fraction", "pangu_geom"], hint: "读图向导：数总格子数，再看每种拼块占几格。用面积除法估计上限，再逐个试拼。", hasImage: true },
    { id: "P1516O2_AK9_7", grade: 9, year: "2015/16", round: "复赛", num: 7, difficulty: 4, file: "盘古竞赛/O2-ü0ç3k9-PMT16.pdf", page: 4, title: "3+6 加权均值", translation: "3 人平均 75，6 人平均 66。9 人总平均？", options: ["70.5", "68", "70", "65", "69"], topics: ["pangu_algebra"], hint: "69。答案：e", answer: "e" },
    { id: "P1516O2_AK9_8", grade: 9, year: "2015/16", round: "复赛", num: 8, difficulty: 4, file: "盘古竞赛/O2-ü0ç3k9-PMT16.pdf", page: 4, title: "3 天平平衡", translation: "前 2 天平平衡。天平 3 右盘几方块平衡？", options: ["8", "9", "10", "12", "15"], topics: ["pangu_app", "pangu_algebra"], hint: "读图向导：把每种图形代成变量（例 △=a、○=b），从每张平衡的天平列一个等式，联立求解。", hasImage: true },
    { id: "P1516O2_AK9_9", grade: 9, year: "2015/16", round: "复赛", num: 9, difficulty: 4, file: "盘古竞赛/O2-ü0ç3k9-PMT16.pdf", page: 4, title: "6 球取 2 组两位数被 4 整除概率", translation: "袜里 6 球标 1-6。取 2 球组两位数。被 4 整除的概率？", options: ["3/10", "1/4", "2/8", "7/30", "8/30"], topics: ["pangu_probability", "pangu_number"], hint: "总排列 6×5 = 30。被 4 整除的两位数：末 2 位。逐个枚举 → 7 个。7/30。答案：d", answer: "d" },
    { id: "P1516O2_AK9_10", grade: 9, year: "2015/16", round: "复赛", num: 10, difficulty: 4, file: "盘古竞赛/O2-ü0ç3k9-PMT16.pdf", page: 5, title: "三角角比 2:3:4 求 C", translation: "△三角 a<b<c 比 2:3:4。∠C？", options: ["50°", "60°", "70°", "80°", "90°"], topics: ["pangu_angle"], hint: "80°。答案：d", answer: "d" },
    { id: "P1516O2_AK9_11", grade: 9, year: "2015/16", round: "复赛", num: 11, difficulty: 5, file: "盘古竞赛/O2-ü0ç3k9-PMT16.pdf", page: 5, title: "AB=AD=√130 BCDE 面积", translation: "AB=AD=√130 cm。△ABE 与正方形 BCDE 面积相等。求 BCDE 面积。", options: ["5.5 cm²", "6 cm²", "7.5 cm²", "8 cm²", "10 cm²"], topics: ["pangu_geom", "pangu_algebra"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true },
    { id: "P1516O2_AK9_12", grade: 9, year: "2015/16", round: "复赛", num: 12, difficulty: 5, file: "盘古竞赛/O2-ü0ç3k9-PMT16.pdf", page: 5, title: "计算表达式", translation: "计算下方表达式。（详见 PDF）", options: ["选项见图", "选项见图", "选项见图", "选项见图", "选项见图"], topics: ["pangu_algebra"], hint: "读图向导：从 PDF 中读出完整表达式，按运算优先级逐步化简。", hasImage: true },

    // ========== 2015/2016 AK9 决赛 ==========
    { id: "P1516F_AK9_1", grade: 9, year: "2015/16", round: "决赛", num: 1, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k9-PMT16-v2.pdf", page: 3, title: "三角数字规律 A+B", translation: "三角形按某数字规律排列。A+B？", options: ["11", "10", "9", "8", "7"], topics: ["pangu_pattern"], hint: "读图向导：从形状 / 颜色 / 位置三个维度分别找周期或递推；有时\"下一个\"= 前两个组合。", hasImage: true },
    { id: "P1516F_AK9_2", grade: 9, year: "2015/16", round: "决赛", num: 2, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k9-PMT16-v2.pdf", page: 3, title: "算式求值", translation: "计算下方表达式（详见 PDF）。", options: ["5000", "5550", "5555", "5565", "5580"], topics: ["pangu_calc"], hint: "读图向导：从 PDF 中读出完整表达式，按运算优先级逐步化简。", hasImage: true },
    { id: "P1516F_AK9_3", grade: 9, year: "2015/16", round: "决赛", num: 3, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k9-PMT16-v2.pdf", page: 3, title: "△ABC AD 中线 ∠BAD", translation: "AD 中线，∠ACB=30°、∠ADB=45°。∠BAD？", options: ["15°", "20°", "30°", "45°", "60°"], topics: ["pangu_angle"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true },
    { id: "P1516F_AK9_4", grade: 9, year: "2015/16", round: "决赛", num: 4, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k9-PMT16-v2.pdf", page: 3, title: "两等大正方形阴影", translation: "正方形 ABCD 和 EFGH 大小相同。DH=HC=CE=6 cm。阴影面积多少 cm²？", options: ["144", "122", "96", "72", "48"], topics: ["pangu_geom"], hint: "读图向导：用\"整体面积 − 空白面积\"更快；或把阴影分解成矩形 / 三角形之和。若图形对称，可只算 1/2 或 1/4 再乘。", hasImage: true },
    { id: "P1516F_AK9_5", grade: 9, year: "2015/16", round: "决赛", num: 5, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k9-PMT16-v2.pdf", page: 4, title: "立方体三视图字母", translation: "立方体 6 面字母。三视图下阴影面字母？", options: ["T", "P", "X", "E", "V"], topics: ["pangu_solid"], hint: "读图向导：分别读出正视 / 侧视 / 顶视三张图，对应立体结构逐层放方块，注意\"多个方块共用同一列\"造成的错位。", hasImage: true },
    { id: "P1516F_AK9_6", grade: 9, year: "2015/16", round: "决赛", num: 6, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k9-PMT16-v2.pdf", page: 4, title: "小立方体 1 cm 边求 AB（勾股）", translation: "所有小立方体边长 1 cm。求 AB 的长度（提示：勾股定理 a²+b²=c²）。", options: ["√14", "√18", "4", "5", "6"], topics: ["pangu_solid", "pangu_geom"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true },
    { id: "P1516F_AK9_7", grade: 9, year: "2015/16", round: "决赛", num: 7, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k9-PMT16-v2.pdf", page: 4, title: "堆积木图 30 块数", translation: "图 1: 5 块，图 2: 7 块，图 3: 9 块。图 30 几块？", options: ["62", "63", "64", "65", "66"], topics: ["pangu_pattern"], hint: "63。答案：b", answer: "b" },
    { id: "P1516F_AK9_8", grade: 9, year: "2015/16", round: "决赛", num: 8, difficulty: 4, file: "盘古竞赛/Final-ü0ç3k9-PMT16-v2.pdf", page: 4, title: "油箱 1/8→5/8 加 25 升", translation: "起初 1/8 满，加 25 升后 5/8 满。油箱容量？", options: ["40", "45", "50", "55", "60"], topics: ["pangu_fraction"], hint: "50。答案：c", answer: "c" },
    { id: "P1516F_AK9_9", grade: 9, year: "2015/16", round: "决赛", num: 9, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k9-PMT16-v2.pdf", page: 5, title: "对角 2 求正方形面积", translation: "正方形对角线 2，边 a。面积多少？", options: ["1", "2", "3", "4", "5"], topics: ["pangu_geom"], hint: "对角 = a√2 = 2 → a=√2, 面积 = 2。答案：b", answer: "b" },
    { id: "P1516F_AK9_10", grade: 9, year: "2015/16", round: "决赛", num: 10, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k9-PMT16-v2.pdf", page: 5, title: "展开图 A、C 边号和", translation: "展开图 A、B、C 折叠后 A 与 C 相接边号之和？", options: ["3", "4", "5", "6", "8"], topics: ["pangu_solid"], hint: "读图向导：立方体对面之和恒为 7。展开图折叠时可先固定一面为底、追踪相邻关系；三视图题分层扫描每一层的方块数。", hasImage: true },
    { id: "P1516F_AK9_11", grade: 9, year: "2015/16", round: "决赛", num: 11, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k9-PMT16-v2.pdf", page: 5, title: "矩形中点阴影面积", translation: "AB=9、BC=13。阴影面积 cm²？", options: ["选项见图", "选项见图", "选项见图", "选项见图", "选项见图"], topics: ["pangu_geom"], hint: "读图向导：用\"整体面积 − 空白面积\"更快；或把阴影分解成矩形 / 三角形之和。若图形对称，可只算 1/2 或 1/4 再乘。", hasImage: true },
    { id: "P1516F_AK9_12", grade: 9, year: "2015/16", round: "决赛", num: 12, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k9-PMT16-v2.pdf", page: 5, title: "两数商", translation: "两数的商？（详见 PDF）", options: ["1", "2", "3", "4", "5"], topics: ["pangu_calc"], hint: "读图向导：从 PDF 找到题目中的两个数，作除法。", hasImage: true },
    { id: "P1516F_AK9_13", grade: 9, year: "2015/16", round: "决赛", num: 13, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k9-PMT16-v2.pdf", page: 6, title: "两正方形对角线段长", translation: "两正方形并排。小边 1 cm，大边 7 cm。从 A 到 B 直线段多长？", options: ["10", "11", "12", "13", "14"], topics: ["pangu_geom"], hint: "对角=√(8²+7²) 或类似勾股。答案：d(10 若三角边 6,8)", hasImage: true, answer: "d" },
    { id: "P1516F_AK9_14", grade: 9, year: "2015/16", round: "决赛", num: 14, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k9-PMT16-v2.pdf", page: 6, title: "正方形边 8 内含圆", translation: "正方形边 8。BC 边与圆相切。圆半径多大？", options: ["3", "4", "4.5", "5", "5.5"], topics: ["pangu_geom", "pangu_algebra"], hint: "读图向导：设未知年龄为 x，写出\"几年后 = 几倍\"这类关系式并解方程。", hasImage: true },
    { id: "P1516F_AK9_15", grade: 9, year: "2015/16", round: "决赛", num: 15, difficulty: 5, file: "盘古竞赛/Final-ü0ç3k9-PMT16-v2.pdf", page: 6, title: "表达式求值", translation: "计算表达式的值（详见 PDF）", options: ["-11", "-5", "1", "5", "11"], topics: ["pangu_algebra"], hint: "读图向导：从 PDF 中读出完整表达式，按运算优先级逐步化简。", hasImage: true },

    // ========== 2020/2021 AK9 初赛 ==========
    { id: "P2021O1_AK9_1", grade: 9, year: "2020/21", round: "初赛", num: 1, difficulty: 1, file: "盘古竞赛/Fragekatalog_Ak9_O1_2021.pdf", page: 3, title: "1;2+3;4+5+6;... 下一行和", translation: "找规律：1=; 2+3=; 4+5+6=; 7+8+9+10=; 下一行的和？", options: ["45", "55", "60", "64", "65"], topics: ["pangu_pattern", "pangu_algebra"], hint: "第 5 行 5 项 11+12+13+14+15 = 65。答案：e", answer: "e" },
    { id: "P2021O1_AK9_2", grade: 9, year: "2020/21", round: "初赛", num: 2, difficulty: 1, file: "盘古竞赛/Fragekatalog_Ak9_O1_2021.pdf", page: 3, title: "AE=8 cm 4 等分小半圆半径", translation: "AE=8 cm 4 等分。最小半圆半径？", options: ["0.5", "1", "1.5", "2", "4"], topics: ["pangu_geom"], hint: "1 cm。答案：b", answer: "b" },
    { id: "P2021O1_AK9_3", grade: 9, year: "2020/21", round: "初赛", num: 3, difficulty: 1, file: "盘古竞赛/Fragekatalog_Ak9_O1_2021.pdf", page: 3, title: "下图点数", translation: "下一张图有几个点？", options: ["35", "44", "51", "56", "70"], topics: ["pangu_pattern"], hint: "读图向导：算前几张图的点数序列，找相邻差（等差）或相邻比（等比），推出第 n 张的通项。", hasImage: true, answer: "a" },
    { id: "P2021O1_AK9_4", grade: 9, year: "2020/21", round: "初赛", num: 4, difficulty: 2, file: "盘古竞赛/Fragekatalog_Ak9_O1_2021.pdf", page: 3, title: "a+b=20, a²+b²=218 求 ab", translation: "a+b=20, a²+b²=218。ab=?", options: ["75", "84", "91", "96", "182"], topics: ["pangu_algebra"], hint: "(a+b)²-a²-b² = 2ab → 400-218 = 2ab → ab=91。答案：c", answer: "c" },
    { id: "P2021O1_AK9_5", grade: 9, year: "2020/21", round: "初赛", num: 5, difficulty: 2, file: "盘古竞赛/Fragekatalog_Ak9_O1_2021.pdf", page: 4, title: "△ABC 27 cm² 三等分求 △AQC", translation: "△ABC 面积 27 cm²，AP=PQ=QB。△AQC 面积？", options: ["9", "15", "18", "24", "27"], topics: ["pangu_geom"], hint: "AQ = 2/3 AB，故 △AQC = 2/3 × 27 = 18。答案：c", answer: "c" },
    { id: "P2021O1_AK9_6", grade: 9, year: "2020/21", round: "初赛", num: 6, difficulty: 2, file: "盘古竞赛/Fragekatalog_Ak9_O1_2021.pdf", page: 4, title: "从 {1,3,…,19} 去 2 数余和 66", translation: "Noah 从 {1,3,5,…,19} 去掉两数，剩下和为 66。两数差（大-小）？", options: ["0", "2", "4", "6", "8"], topics: ["pangu_algebra", "pangu_number"], hint: "总和 1+3+…+19 = 100。去两数和 = 34。可能对：(15,19)差 4、(17,17)不行 → (15,19) 差 4。答案：c", answer: "c" },
    { id: "P2021O1_AK9_7", grade: 9, year: "2020/21", round: "初赛", num: 7, difficulty: 3, file: "盘古竞赛/Fragekatalog_Ak9_O1_2021.pdf", page: 4, title: "2x+3x+4x+6x 求 x", translation: "图中标 2x、3x、4x、6x 四个角。求 x。", options: ["12°", "12.9°", "15°", "16.4°", "18°"], topics: ["pangu_angle", "pangu_algebra"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true, answer: "c" },
    { id: "P2021O1_AK9_8", grade: 9, year: "2020/21", round: "初赛", num: 8, difficulty: 3, file: "盘古竞赛/Fragekatalog_Ak9_O1_2021.pdf", page: 4, title: "1L+2L+4L 混合水果含量", translation: "A 10% 果 + B 20% + C 40%。1+2+4 升混合。含果率？", options: ["23.33%", "30%", "35%", "45%", "70%"], topics: ["pangu_percent"], hint: "(0.1·1 + 0.2·2 + 0.4·4)/(1+2+4) = 2.1/7 = 30%。答案：b", answer: "b" },
    { id: "P2021O1_AK9_9", grade: 9, year: "2020/21", round: "初赛", num: 9, difficulty: 4, file: "盘古竞赛/Fragekatalog_Ak9_O1_2021.pdf", page: 5, title: "望远和", translation: "计算 1·2(1-1/2)+2·3(1/2-1/3)+…+2019·2020(1/2019-1/2020)。", options: ["1", "2018", "2019", "2020", "2019/2020"], topics: ["pangu_algebra", "pangu_pattern"], hint: "每项 = 1，共 2019 项。答案：c", answer: "d" },
    { id: "P2021O1_AK9_10", grade: 9, year: "2020/21", round: "初赛", num: 10, difficulty: 4, file: "盘古竞赛/Fragekatalog_Ak9_O1_2021.pdf", page: 5, title: "直角三角形内接正方形面积", translation: "3-4-5 直角三角形内接正方形。正方形面积？", options: ["12/7 cm²", "4 cm²", "144/49 cm²", "3 cm²", "121/25 cm²"], topics: ["pangu_geom", "pangu_algebra"], hint: "内接正方形边长 = 12/7，面积 = 144/49。答案：c", answer: "c" },
    { id: "P2021O1_AK9_11", grade: 9, year: "2020/21", round: "初赛", num: 11, difficulty: 5, file: "盘古竞赛/Fragekatalog_Ak9_O1_2021.pdf", page: 5, title: "半圆 vs 圆内接正方形面积比", translation: "两正方形分别内接半圆和整圆，半径相同。大正方形面积是小的几倍？", options: ["0.4", "2", "2.5", "3.5", "4"], topics: ["pangu_geom", "pangu_algebra"], hint: "整圆内正方形 边=r√2 面积 2r²；半圆内正方形 边=(2/√5)r 面积 4r²/5。比 = (2r²)/(4r²/5) = 2.5。答案：c", answer: "c" },
    { id: "P2021O1_AK9_12", grade: 9, year: "2020/21", round: "初赛", num: 12, difficulty: 5, file: "盘古竞赛/Fragekatalog_Ak9_O1_2021.pdf", page: 6, title: "自然数 5 列 找 2020 位置", translation: "自然数排成 5 列。2020 出现在哪行哪列？", options: ["506 行 4 列", "505 行 1 列", "506 行 3 列", "505 行 2 列", "505 行 5 列"], topics: ["pangu_pattern", "pangu_algebra"], hint: "2020 ÷ 5 = 404 余 0 → 位置需按具体表格排法。答案见 PDF。", answer: "e" },

    // ========== 2020/2021 AK9 决赛 ==========
    { id: "P2021F_AK9_1", grade: 9, year: "2020/21", round: "决赛", num: 1, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak9-Final-2021.pdf", page: 3, title: "矩形 ABCD 阴影 70% 求 DF", translation: "矩形 ABCD 中 AB=6、BC=8、CE=2。阴影是全矩形 70%。DF 多长？", options: ["2√2 cm", "√2 cm", "2 cm", "2.4 cm", "2.8 cm"], topics: ["pangu_geom", "pangu_algebra"], hint: "阴影面积 = 48 × 0.7 = 33.6。用图关系求 DF。答案：e(2.8)", hasImage: true, answer: "e" },
    { id: "P2021F_AK9_2", grade: 9, year: "2020/21", round: "决赛", num: 2, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak9-Final-2021.pdf", page: 3, title: "Boris 年龄推理", translation: "Boris 11 < 岁 < 19。父比母大 2 岁，是女儿 13 倍。Boris 比父小 22 岁。Boris 几岁？", options: ["14", "15", "16", "17", "18"], topics: ["pangu_algebra"], hint: "父 = 13B - 22 反证。若 Boris=14, 父=36, 但女儿=父/13=2.77 不整。若 Boris=17, 父=39, 女儿=3 ✓, 母=37。Boris=17。答案：d", answer: "d" },
    { id: "P2021F_AK9_3", grade: 9, year: "2020/21", round: "决赛", num: 3, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak9-Final-2021.pdf", page: 3, title: "3 圆内切矩形求 MN", translation: "3 圆内切矩形，互相相切、切边。小圆同大小，矩形短边 4 cm。MN 长？", options: ["√10 cm", "3 cm", "4 cm", "√5 cm", "2√2 cm"], topics: ["pangu_geom"], hint: "读图向导：识别圆的直径 = 矩形的宽（或对应关系）。用圆面积 πr² 或矩形面积公式代入。", hasImage: true, answer: "b" },
    { id: "P2021F_AK9_4", grade: 9, year: "2020/21", round: "决赛", num: 4, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak9-Final-2021.pdf", page: 3, title: "两位数 n 前加 7 变 51n 求数字和", translation: "两位数 n。在 n 前加数字 7 得三位数 = 51n。n 的数字和？", options: ["4", "5", "8", "12", "14"], topics: ["pangu_algebra", "pangu_number"], hint: "700+n = 51n → n=14。数字和 5。答案：b", answer: "b" },
    { id: "P2021F_AK9_5", grade: 9, year: "2020/21", round: "决赛", num: 5, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak9-Final-2021.pdf", page: 4, title: "PANGEA 循环第 2020 字母", translation: "PANGEAPANGEA... 第 2020 个字母是哪个？", options: ["A", "E", "G", "N", "P"], topics: ["pangu_pattern"], hint: "周期 6：2020 mod 6 = 4 → 第 4 位 G。答案：c", answer: "c" },
    { id: "P2021F_AK9_6", grade: 9, year: "2020/21", round: "决赛", num: 6, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak9-Final-2021.pdf", page: 4, title: "字母算式 abc 求积", translation: "加法算式中 a、b、c 是三个不同非零数字。求 a·b·c。", options: ["12", "18", "24", "28", "30"], topics: ["pangu_puzzle"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true, answer: "b" },
    { id: "P2021F_AK9_7", grade: 9, year: "2020/21", round: "决赛", num: 7, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak9-Final-2021.pdf", page: 4, title: "望远积化简", translation: "化简连乘 (k²-1)/(k²+k) 从 k=2 到 k=2020。", options: ["2020/2021", "1/2019", "1/2020", "2019/2020", "1"], topics: ["pangu_algebra", "pangu_fraction"], hint: "(k²-1)/(k²+k) = (k-1)(k+1)/(k(k+1)) = (k-1)/k。连乘 = 1/2020。答案：c", answer: "c" },
    { id: "P2021F_AK9_8", grade: 9, year: "2020/21", round: "决赛", num: 8, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak9-Final-2021.pdf", page: 4, title: "正方形 50 cm² 与三角形覆盖", translation: "正方形 50 cm²。正方形盖三角形 3/4，反面三角形盖正方形 60%。三角形面积？", options: ["30", "35", "37.5", "40", "45"], topics: ["pangu_algebra", "pangu_percent"], hint: "重叠部分：(3/4)T = 0.6·50 = 30 → T = 40。答案：d", answer: "d" },
    { id: "P2021F_AK9_9", grade: 9, year: "2020/21", round: "决赛", num: 9, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak9-Final-2021.pdf", page: 5, title: "LOL·LOL=ALLOAL O=0", translation: "字母算式：LOL × LOL = ALLOAL，O=0。求 A·L。", options: ["6", "10", "12", "15", "18"], topics: ["pangu_puzzle"], hint: "LOL = 101L (L是首末)：(101L)² = 10201L²。设值 = ALLOAL。L=3: 909, 909²=826281 → 结构 A=8, L=6? 用枚举验证。答案：c(12) 待 PDF 确认", answer: "b" },
    { id: "P2021F_AK9_10", grade: 9, year: "2020/21", round: "决赛", num: 10, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak9-Final-2021.pdf", page: 5, title: "两垂直线切圆阴影面积", translation: "两直线在 C 垂直相交，与圆分别切于 A、B。AC=4 cm。阴影面积？", options: ["(16-π) cm²", "(16-2π) cm²", "(16-3π) cm²", "(16-4π) cm²", "(16-5π) cm²"], topics: ["pangu_geom"], hint: "正方形 4×4=16 减去 1/4 圆 π·4²/4 = 4π。阴影 16-4π。答案：d", hasImage: true, answer: "d" },

    // ========== 2021/2022 AK9 决赛 ==========
    { id: "P2122F_AK9_1", grade: 9, year: "2021/22", round: "决赛", num: 1, difficulty: 3, file: "盘古竞赛/PMT2122-9-Final.pdf", page: 3, title: "两位数数和+数积=本身", translation: "两位数满足：数字和+数字积=本身。有几个？", options: ["5", "6", "7", "8", "9"], topics: ["pangu_number"], hint: "9 个。答案：e", answer: "e" },
    { id: "P2122F_AK9_2", grade: 9, year: "2021/22", round: "决赛", num: 2, difficulty: 3, file: "盘古竞赛/PMT2122-9-Final.pdf", page: 3, title: "缺 1 面能折立方体", translation: "图形缺 1 方形。Elif 加 1 方形贴边使能折立方体。几个位置可行？", options: ["2", "3", "4", "6", "9"], topics: ["pangu_solid"], hint: "读图向导：立方体对面之和恒为 7。展开图折叠时可先固定一面为底、追踪相邻关系；三视图题分层扫描每一层的方块数。", hasImage: true, answer: "c" },
    { id: "P2122F_AK9_3", grade: 9, year: "2021/22", round: "决赛", num: 3, difficulty: 3, file: "盘古竞赛/PMT2122-9-Final.pdf", page: 3, title: "7 位回文数", translation: "7 位回文数有几个？", options: ["900", "6561", "8100", "9000", "10000"], topics: ["pangu_number", "pangu_count"], hint: "9000。答案：d", answer: "d" },
    { id: "P2122F_AK9_4", grade: 9, year: "2021/22", round: "决赛", num: 4, difficulty: 3, file: "盘古竞赛/PMT2122-9-Final.pdf", page: 4, title: "1.7 m 链子几环", translation: "Louise 做 1.7 m 长链。几个环？", options: ["17", "30", "41", "42", "60"], topics: ["pangu_app"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true, answer: "d" },
    { id: "P2122F_AK9_5", grade: 9, year: "2021/22", round: "决赛", num: 5, difficulty: 4, file: "盘古竞赛/PMT2122-9-Final.pdf", page: 4, title: "Christian 漫画 CRT", translation: "分 3、4、5 都少 2 本。<200 最多？", options: ["58", "116", "174", "178", "198"], topics: ["pangu_number"], hint: "178。答案：d", answer: "d" },
    { id: "P2122F_AK9_6", grade: 9, year: "2021/22", round: "决赛", num: 6, difficulty: 4, file: "盘古竞赛/PMT2122-9-Final.pdf", page: 4, title: "10!+11! 不被哪个整除", translation: "10! + 11! 不能被以下哪个整除？", options: ["20", "21", "35", "66", "105"], topics: ["pangu_number"], hint: "10!+11! = 10!(1+11) = 12·10!。检查各选项：20=4·5|10!·12 ✓；21=3·7|10! ✓；35=5·7|10! ✓；66=2·3·11 → 11 不在 10!，需在 12 中，12/11 ✗ → 66 不整除。答案：d", answer: "d" },
    { id: "P2122F_AK9_7", grade: 9, year: "2021/22", round: "决赛", num: 7, difficulty: 4, file: "盘古竞赛/PMT2122-9-Final.pdf", page: 5, title: "◇²-□²=37 求 ◇²+□²", translation: "◇²-□²=37，求 ◇²+□²。（◇、□ 为整数）", options: ["37", "342", "685", "1369", "无法确定"], topics: ["pangu_algebra", "pangu_number"], hint: "(◇-□)(◇+□)=37 (素数) → ◇-□=1、◇+□=37 → ◇=19, □=18。◇²+□²=361+324=685。答案：c", answer: "c" },
    { id: "P2122F_AK9_8", grade: 9, year: "2021/22", round: "决赛", num: 8, difficulty: 5, file: "盘古竞赛/PMT2122-9-Final.pdf", page: 5, title: "4 兄妹只 1 真话", translation: "4 人证词只 1 真话，谁打碎窗？", options: ["Elias", "Klara", "Felix", "Matilda", "无法确定"], topics: ["pangu_logic"], hint: "Klara。答案：b", answer: "b" },
    { id: "P2122F_AK9_9", grade: 9, year: "2021/22", round: "决赛", num: 9, difficulty: 5, file: "盘古竞赛/PMT2122-9-Final.pdf", page: 5, title: "11+13+…+31 和", translation: "利用 1+3+…+(2n-1)=n²，求 11+13+…+31。", options: ["220", "231", "441", "840", "880"], topics: ["pangu_pattern", "pangu_algebra"], hint: "231。答案：b", answer: "b" },
    { id: "P2122F_AK9_10", grade: 9, year: "2021/22", round: "决赛", num: 10, difficulty: 5, file: "盘古竞赛/PMT2122-9-Final.pdf", page: 6, title: "两盒球随机换回原状概率", translation: "从盒 1 取球放入盒 2；再从盒 2 取球放入盒 1。返回原状的概率？（盒中球组成见图）", options: ["12/25", "13/25", "17/30", "43/75", "3/5"], topics: ["pangu_probability"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true, answer: "c" },

    // ========== 2022/2023 AK9 初赛 ==========
    { id: "P2223O1_AK9_1", grade: 9, year: "2022/23", round: "初赛", num: 1, difficulty: 1, file: "盘古竞赛/Fragekatalog-Ak9-O1-PMT2223.pdf", page: 3, title: "80·0.25+40·0.5", translation: "计算 80·0.25 + 40·0.5", options: ["40", "60", "100", "120", "140"], topics: ["pangu_fraction"], hint: "20+20 = 40。答案：a", answer: "a" },
    { id: "P2223O1_AK9_2", grade: 9, year: "2022/23", round: "初赛", num: 2, difficulty: 1, file: "盘古竞赛/Fragekatalog-Ak9-O1-PMT2223.pdf", page: 3, title: "3×4×5 长方体最大球半径", translation: "3×4×5 cm 长方体内最大球的半径？", options: ["1 cm", "3/2 cm", "5/2 cm", "3/(2π) cm", "√50 cm"], topics: ["pangu_solid", "pangu_geom"], hint: "球直径 = 短边 3 → 半径 3/2。答案：b", answer: "b" },
    { id: "P2223O1_AK9_3", grade: 9, year: "2022/23", round: "初赛", num: 3, difficulty: 1, file: "盘古竞赛/Fragekatalog-Ak9-O1-PMT2223.pdf", page: 3, title: "5 木棒选 3 三角形数", translation: "1-5 cm 木棒选 3 根拼三角形。几种？", options: ["1", "2", "3", "5", "10"], topics: ["pangu_geom", "pangu_count"], hint: "3。答案：c", answer: "c" },
    { id: "P2223O1_AK9_4", grade: 9, year: "2022/23", round: "初赛", num: 4, difficulty: 2, file: "盘古竞赛/Fragekatalog-Ak9-O1-PMT2223.pdf", page: 3, title: "夹克 -20% +20%", translation: "1000 kr 夹克先降 20% 后涨 20%。最终价？", options: ["640", "800", "900", "960", "1200"], topics: ["pangu_percent"], hint: "960。答案：d", answer: "d" },
    { id: "P2223O1_AK9_5", grade: 9, year: "2022/23", round: "初赛", num: 5, difficulty: 2, file: "盘古竞赛/Fragekatalog-Ak9-O1-PMT2223.pdf", page: 3, title: "125.125 化最简分数", translation: "把 125.125 写成最简分数。", options: ["8/1001", "8/125", "40/5005", "1001/8", "4/5"], topics: ["pangu_fraction"], hint: "125.125 = 125125/1000 = 1001/8（约分后）。答案：d", answer: "d" },
    { id: "P2223O1_AK9_6", grade: 9, year: "2022/23", round: "初赛", num: 6, difficulty: 2, file: "盘古竞赛/Fragekatalog-Ak9-O1-PMT2223.pdf", page: 3, title: "三位数数字和>24 几个", translation: "数字和 > 24 的三位数有几个？", options: ["9", "10", "17", "18", "19"], topics: ["pangu_count", "pangu_number"], hint: "10。答案：b", answer: "b" },
    { id: "P2223O1_AK9_7", grade: 9, year: "2022/23", round: "初赛", num: 7, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak9-O1-PMT2223.pdf", page: 4, title: "a+b=20, a²+b²=218 求 ab", translation: "a+b=20, a²+b²=218。ab？", options: ["75", "80", "90", "91", "182"], topics: ["pangu_algebra"], hint: "91。答案：d", answer: "d" },
    { id: "P2223O1_AK9_8", grade: 9, year: "2022/23", round: "初赛", num: 8, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak9-O1-PMT2223.pdf", page: 4, title: "a^(3a)=224 求 a", translation: "a 是正整数，a^{3a} = 224。求 a。", options: ["2", "3", "4", "6", "无解"], topics: ["pangu_algebra", "pangu_number"], hint: "224 = 2^5 · 7。若 a=2: 2⁶=64；a=3: 3⁹ 太大；a=4: 4¹² 太大。无整数解。答案：e", answer: "c" },
    { id: "P2223O1_AK9_9", grade: 9, year: "2022/23", round: "初赛", num: 9, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak9-O1-PMT2223.pdf", page: 4, title: "三角形 α+β+γ=180 求 m+n", translation: "△三角 α=3m+30, β=2m+7n, γ=n+50，其中 n>m 自然数。m+n？", options: ["13", "14", "15", "16", "17"], topics: ["pangu_angle", "pangu_algebra"], hint: "3m+30+2m+7n+n+50 = 180 → 5m+8n = 100。n>m 试解：m=4,n=10 → 20+80=100 ✓。m+n=14。答案：b", answer: "b" },
    { id: "P2223O1_AK9_10", grade: 9, year: "2022/23", round: "初赛", num: 10, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak9-O1-PMT2223.pdf", page: 4, title: "1/4 圆内 CD 长", translation: "1/4 圆中含 r=1 cm 半圆。CD 与半圆相切且平行 AB。CD 多长？", options: ["√3/2 cm", "4 cm", "√5/3 cm", "9/5 cm", "5 cm"], topics: ["pangu_geom"], hint: "读图向导：连接圆心到切点得半径垂线；构造直角三角形用勾股。", hasImage: true, answer: "c" },
    { id: "P2223O1_AK9_11", grade: 9, year: "2022/23", round: "初赛", num: 11, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak9-O1-PMT2223.pdf", page: 5, title: "两出租车公司等价距离", translation: "A: 415 kr 起步 + 19 kr/km；B: 370 kr + 20.5 kr/km。两家一样。距离多少 km？", options: ["3", "4.5", "15", "20", "30"], topics: ["pangu_algebra", "pangu_app"], hint: "415+19x = 370+20.5x → 45 = 1.5x → x=30。答案：e", answer: "e" },
    { id: "P2223O1_AK9_12", grade: 9, year: "2022/23", round: "初赛", num: 12, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak9-O1-PMT2223.pdf", page: 5, title: "球袋大小+颜色比例", translation: "3/5 小、60% 黄、4/5 小球是黄。大且黄占比？", options: ["12%", "30%", "40%", "48%", "60%"], topics: ["pangu_fraction", "pangu_percent"], hint: "小 60、大 40；黄 60；小且黄 48；大且黄 12。12%。答案：a", answer: "a" },

    // ========== 2022/2023 AK9 决赛 ==========
    { id: "P2223F_AK9_1", grade: 9, year: "2022/23", round: "决赛", num: 1, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak9-Final-PMT2223.pdf", page: 3, title: "图形周长（方格 1 cm）", translation: "每格边 1 cm。求图形周长。", options: ["24", "28", "30", "32", "36"], topics: ["pangu_geom"], hint: "读图向导：用 Pick 定理 A = 内点 + 边点/2 − 1；或分解为矩形 + 三角形之和。", hasImage: true, answer: "b" },
    { id: "P2223F_AK9_2", grade: 9, year: "2022/23", round: "决赛", num: 2, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak9-Final-PMT2223.pdf", page: 3, title: "国考评级共有多少人", translation: "国考评级：A 15%、C 20%、D 45%、E 15%。F 有 6 人。共几人考？", options: ["95", "90", "120", "101", "100"], topics: ["pangu_percent"], hint: "F 占 100-15-20-45-15 = 5%。6/0.05 = 120。答案：c", answer: "c" },
    { id: "P2223F_AK9_3", grade: 9, year: "2022/23", round: "决赛", num: 3, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak9-Final-PMT2223.pdf", page: 3, title: "100 cm 均匀棒切", translation: "100 cm 棒一端切 25、另一端切 12.5。中点位移？", options: ["0", "6.25", "12.5", "18.75", "37.5"], topics: ["pangu_geom"], hint: "6.25。答案：b", answer: "b" },
    { id: "P2223F_AK9_4", grade: 9, year: "2022/23", round: "决赛", num: 4, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak9-Final-PMT2223.pdf", page: 3, title: "<2023 不同时被 4 和 5 整除", translation: "< 2023 的正整数，不同时被 4 和 5 整除的有几个？", options: ["808", "909", "101", "1214", "1921"], topics: ["pangu_number"], hint: "被 20 整除的 < 2023 有 ⌊2022/20⌋ = 101。2022-101 = 1921。答案：e", answer: "e" },
    { id: "P2223F_AK9_5", grade: 9, year: "2022/23", round: "决赛", num: 5, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak9-Final-PMT2223.pdf", page: 4, title: "60 立方体几种长方体", translation: "60 立方体拼长方体，几种？", options: ["11", "7", "9", "10", "12"], topics: ["pangu_solid"], hint: "10。答案：d", answer: "d" },
    { id: "P2223F_AK9_6", grade: 9, year: "2022/23", round: "决赛", num: 6, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak9-Final-PMT2223.pdf", page: 4, title: "3²+6²+…+30² 求和", translation: "已知 1²+…+10²=385。求 3²+6²+…+30²。", options: ["1155", "3456", "3465", "3850", "5511"], topics: ["pangu_algebra"], hint: "9×385 = 3465。答案：c", answer: "c" },
    { id: "P2223F_AK9_7", grade: 9, year: "2022/23", round: "决赛", num: 7, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak9-Final-PMT2223.pdf", page: 4, title: "x, y 等差 q-p=6 求 y-x", translation: "x=2+4+…+p, y=6+8+…+q, p、q 偶数、q-p=6。y-x=?", options: ["3p", "3p-6", "q-p", "3q+6", "3q-12"], topics: ["pangu_algebra"], hint: "y-x = (2+4+…+q) - (2+4+…+p) - (2+4) = (q(q+2)/4) - (p(p+2)/4) - 6。q=p+6 展开后化简 = 3p 或类似。答案见 PDF。", answer: "e" },
    { id: "P2223F_AK9_8", grade: 9, year: "2022/23", round: "决赛", num: 8, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak9-Final-PMT2223.pdf", page: 5, title: "9 矩形阴影面积", translation: "大矩形分 9 小矩形，5 个已知面积。整数边。阴影面积？", options: ["56 a.e.", "46 a.e.", "60 a.e.", "40 a.e.", "52 a.e."], topics: ["pangu_geom", "pangu_algebra"], hint: "读图向导：用\"整体面积 − 空白面积\"更快；或把阴影分解成矩形 / 三角形之和。若图形对称，可只算 1/2 或 1/4 再乘。", hasImage: true, answer: "a" },
    { id: "P2223F_AK9_9", grade: 9, year: "2022/23", round: "决赛", num: 9, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak9-Final-PMT2223.pdf", page: 5, title: "Galton 板 2 号槽概率", translation: "Galton 板 4 层 5 槽。落 2 号槽概率？", options: ["1/16", "3/16", "3/8", "1/4", "1/2"], topics: ["pangu_probability"], hint: "1/4。答案：d", answer: "d" },
    { id: "P2223F_AK9_10", grade: 9, year: "2022/23", round: "决赛", num: 10, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak9-Final-PMT2223.pdf", page: 6, title: "4 位数去个位差 2020 求数字和", translation: "n 是 4 位数，去掉个位得 3 位数 m。n-m=2020。n 的数字和？", options: ["12", "9", "11", "7", "10"], topics: ["pangu_algebra", "pangu_number"], hint: "n = 10m+d, n-m = 9m+d = 2020 → m=224, d=4 (9·224=2016, +4=2020 ✓) → n=2244。数字和 12。答案：a", answer: "a" },

    // ========== 2023/2024 AK9 决赛 ==========
    { id: "P2324F_AK9_1", grade: 9, year: "2023/24", round: "决赛", num: 1, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak9-FINAL-PMT2324.pdf", page: 3, title: "右倍下半图 B-A", translation: "数字向右翻倍、向下折半。求 B-A。", options: ["2", "3", "4", "5", "6"], topics: ["pangu_pattern"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true },
    { id: "P2324F_AK9_2", grade: 9, year: "2023/24", round: "决赛", num: 2, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak9-FINAL-PMT2324.pdf", page: 3, title: "Tom 打包完成时刻", translation: "09:15 开始，27 分完 3/10。同速全部完成时刻？", options: ["09:55", "10:15", "10:30", "10:45", "11:00"], topics: ["pangu_fraction", "pangu_app"], hint: "10:45。答案：d", answer: "d" },
    { id: "P2324F_AK9_3", grade: 9, year: "2023/24", round: "决赛", num: 3, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak9-FINAL-PMT2324.pdf", page: 3, title: "5 孩子最小", translation: "5 孩子推理谁最小。", options: ["Anna", "Tanja", "Vera", "Jenny", "Kalle"], topics: ["pangu_logic"], hint: "Anna。答案：a", answer: "a" },
    { id: "P2324F_AK9_4", grade: 9, year: "2023/24", round: "决赛", num: 4, difficulty: 3, file: "盘古竞赛/Fragekatalog-Ak9-FINAL-PMT2324.pdf", page: 3, title: "三角形第三边整数种数", translation: "两边 4、5，第三边整数。种数？", options: ["1", "4", "5", "7", "8"], topics: ["pangu_geom"], hint: "7。答案：d", answer: "d" },
    { id: "P2324F_AK9_5", grade: 9, year: "2023/24", round: "决赛", num: 5, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak9-FINAL-PMT2324.pdf", page: 4, title: "1..1000 连位数", translation: "1..1000 连写总位数。", options: ["1000", "2893", "2890", "2900", "3001"], topics: ["pangu_count"], hint: "2893。答案：b", answer: "b" },
    { id: "P2324F_AK9_6", grade: 9, year: "2023/24", round: "决赛", num: 6, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak9-FINAL-PMT2324.pdf", page: 4, title: "7 列表 4 数和 288", translation: "整数排 7 列。已知 2×2 方块 4 数和 36，首行首数 5。存在和 288 的方块吗？首数？", options: ["36", "68", "69", "76", "不存在"], topics: ["pangu_algebra"], hint: "读图向导：先把图中已知的边长、数字、颜色等标记下来，再判断是否可用几何公式 / 计数 / 对称性等方法。若卡住，请打开 PDF 查看清晰原图。", hasImage: true },
    { id: "P2324F_AK9_7", grade: 9, year: "2023/24", round: "决赛", num: 7, difficulty: 4, file: "盘古竞赛/Fragekatalog-Ak9-FINAL-PMT2324.pdf", page: 4, title: "n/(100-n) 化自然数 n 数", translation: "n/(100-n) 化简为自然数的 n 有几个？", options: ["99", "50", "10", "8", "1"], topics: ["pangu_fraction", "pangu_number"], hint: "8。答案：d", answer: "d" },
    { id: "P2324F_AK9_8", grade: 9, year: "2023/24", round: "决赛", num: 8, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak9-FINAL-PMT2324.pdf", page: 4, title: "1+1·2+…+99! mod 5", translation: "求 (1+1·2+1·2·3+…+1·2·…·99) mod 5。", options: ["8", "1", "2", "3", "4"], topics: ["pangu_number", "pangu_pattern"], hint: "1+2+6+24+120... 从 5! 起都被 5 整除。1+2+6+24 = 33 → mod 5 = 3。答案：d", answer: "d" },
    { id: "P2324F_AK9_9", grade: 9, year: "2023/24", round: "决赛", num: 9, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak9-FINAL-PMT2324.pdf", page: 5, title: "a/b=3, b/c=4, a+c=39", translation: "a/b=3, b/c=4, a+c=39。a=?", options: ["3", "13", "26", "30", "36"], topics: ["pangu_algebra"], hint: "a=3b, b=4c → a=12c。12c+c=39 → c=3, a=36。答案：e", answer: "e" },
    { id: "P2324F_AK9_10", grade: 9, year: "2023/24", round: "决赛", num: 10, difficulty: 5, file: "盘古竞赛/Fragekatalog-Ak9-FINAL-PMT2324.pdf", page: 5, title: "直角三角形周长 30 面积 30", translation: "直角三角形周长 30、面积 30、边整数。求斜边长。", options: ["5", "10", "12", "13", "14"], topics: ["pangu_geom", "pangu_algebra"], hint: "a+b+c=30, ab/2=30 → ab=60。且 a²+b²=c²。(5,12,13): 5+12+13=30 ✓，5·12/2=30 ✓。答案：d", answer: "d" }
];

// 构建 id → 题目 索引
const panguProblemMap = Object.fromEntries(panguProblems.map(p => [p.id, p]));

// ============= 主题节点 =============
// id 前缀 pangu_ ；grade 固定为 4（AK4）
// linkedElementary: 关联到小学教材知识图谱节点
// linkedGerman:      关联到德国竞赛知识图谱节点

const panguNodes = [
    {
        id: "pangu_calc",
        name: "基础运算与巧算",
        grade: 4,
        category: "calc",
        source: "AK4",
        description: "加减乘除、运算符判断、交替加减、逆推、乘法基础。盘古竞赛入门级题型，考察运算敏感度与观察力。",
        keyPoints: [
            "运算符号判断与等式恢复",
            "交替加减、配对凑整",
            "逆运算（还原：给结果反推起点）",
            "加法与乘法的等价关系",
            "简单的单位换算（千克/克）"
        ],
        typicalApproach: [
            "先观察式子结构，找配对或规律",
            "从右往左倒着推（还原类）",
            "养成\"先估算\"的习惯"
        ],
        linkedElementary: ["g3_02", "g3_04", "g3_11", "g4_03", "g4_12", "g3_12"],
        linkedGerman: ["gc_k4_calc", "gc_k3_calc"]
    },
    {
        id: "pangu_pattern",
        name: "找规律与数列",
        grade: 4,
        category: "number",
        source: "AK4",
        description: "数列规律、图形规律、串珠模式、翻倍/递推数列，考察观察-归纳-验证的思维过程。",
        keyPoints: [
            "等差、等比、二级差数列",
            "图形/串珠的循环节",
            "加法金字塔（数塔递推）",
            "翻倍类等比数列"
        ],
        typicalApproach: [
            "写出前 4-5 项，算相邻差或比",
            "找循环节长度，用余数定位",
            "小规模验证公式"
        ],
        linkedElementary: ["g3_01", "g3_10", "g6_16"],
        linkedGerman: ["gc_k3_pattern", "gc_k4_seq"]
    },
    {
        id: "pangu_time",
        name: "时间与日期",
        grade: 4,
        category: "other",
        source: "AK4",
        description: "星期推算、时钟读数、时间间隔计算。盘古入门常见题型。",
        keyPoints: [
            "N 天后是星期几（用 N mod 7）",
            "时钟读数与时间差",
            "时段的加减法（可能跨小时/跨日）"
        ],
        typicalApproach: [
            "把日期或时刻标在时间轴上",
            "用 7 天周期做取余",
            "时间加减注意 60 进制"
        ],
        linkedElementary: ["g3_03", "g3_10"],
        linkedGerman: ["gc_k3_time"]
    },
    {
        id: "pangu_app",
        name: "应用题综合",
        grade: 4,
        category: "app",
        source: "AK4",
        description: "情境题：身高体重、和差问题、比例、行程、平衡称重、货币付款等。",
        keyPoints: [
            "和差问题（Lukas/Maja 型）",
            "比例与倍数（马拉松时间）",
            "杠杆平衡问题",
            "多币面额付款问题",
            "路牌 / 行程分段问题"
        ],
        typicalApproach: [
            "画线段图或表格",
            "设未知量列方程",
            "利用不变量（总量、比值）"
        ],
        linkedElementary: ["g3_06", "g3_07", "g4_14", "g4_10", "g6_03"],
        linkedGerman: ["gc_k3_app", "gc_k4_app", "gc_k4_travel"]
    },
    {
        id: "pangu_geom",
        name: "平面几何与图形",
        grade: 4,
        category: "geometry",
        source: "AK4",
        description: "面积、对称、路径、图形匹配、镜像变换。",
        keyPoints: [
            "三角形面积（底×高÷2）",
            "轴对称与镜像变换",
            "方格上的图形与路径",
            "图形匹配与拼图"
        ],
        typicalApproach: [
            "用格子纸画图辅助",
            "对称：找对称轴，逐点映射",
            "路径题：一步步走标注坐标"
        ],
        linkedElementary: ["g3_09", "g3_18", "g4_04", "g4_05", "g4_09"],
        linkedGerman: ["gc_k3_geom", "gc_k4_geom"]
    },
    {
        id: "pangu_solid",
        name: "立体几何与空间",
        grade: 4,
        category: "geometry",
        source: "AK4",
        description: "立方体计数、涂色问题、骰子相对面、展开图折叠。空间想象力核心训练。",
        keyPoints: [
            "立方体拆分与因数分解",
            "涂色/未涂色的小立方体计数",
            "骰子相对面数字之和为 7",
            "展开图 → 立体图的重构"
        ],
        typicalApproach: [
            "分类：角块（3 面）、棱块（2 面）、面心（1 面）、体心（0 面）",
            "折叠模拟：手工做一个模型验证",
            "利用相对面之和的不变性"
        ],
        linkedElementary: ["g4_17", "g6_05", "g6_06"],
        linkedGerman: ["gc_k4_geom"]
    },
    {
        id: "pangu_puzzle",
        name: "数字谜与巧填",
        grade: 4,
        category: "number",
        source: "AK4",
        description: "算式谜、加法金字塔、拉丁方、最优化数字摆放。锻炼系统枚举与约束推理。",
        keyPoints: [
            "乘法/加法算式谜",
            "加法金字塔缺失数字",
            "拉丁方（行/列/对角线约束）",
            "数字卡片摆放最优化"
        ],
        typicalApproach: [
            "从约束最强的格子入手",
            "假设-验证-回溯",
            "利用整除性/末位/首位缩小候选"
        ],
        linkedElementary: ["g3_12", "g4_08", "g4_14"],
        linkedGerman: ["gc_k3_numpuzzle", "gc_k4_puzzle"]
    },
    {
        id: "pangu_count",
        name: "计数与递推",
        grade: 4,
        category: "count",
        source: "AK4",
        description: "组合计数、图形计数、跳台阶（斐波那契）、加乘原理。",
        keyPoints: [
            "有序枚举与树形图",
            "加乘原理",
            "图形计数（三角形/四边形）",
            "斐波那契型递推"
        ],
        typicalApproach: [
            "先分类，再在每类内计数",
            "从简单情形归纳递推关系",
            "画树形图不遗漏"
        ],
        linkedElementary: ["g3_15", "g3_16", "g3_17", "g5_13", "g6_16"],
        linkedGerman: ["gc_k3_count", "gc_k4_count"]
    },
    {
        id: "pangu_logic",
        name: "逻辑推理与陷阱",
        grade: 4,
        category: "other",
        source: "AK4",
        description: "真假话、家庭成员关系、可能与必然、鸽巢原理、陷阱题。盘古竞赛的高分题型。",
        keyPoints: [
            "\"每人几个姐妹\"类家庭关系题",
            "可能 / 必然 / 不可能 的判断",
            "陷阱题（无关信息辨别）",
            "鸽巢原理（26÷7 型）",
            "沙漏 / 测时间的操作序列"
        ],
        typicalApproach: [
            "列表格系统排除",
            "反证 / 假设法",
            "识别无关信息，别被误导",
            "鸽巢：⌈n/k⌉"
        ],
        linkedElementary: ["g3_15", "g3_16"],
        linkedGerman: ["gc_k3_logic", "gc_k4_puzzle"]
    },
    {
        id: "pangu_number",
        name: "大数与数位",
        grade: 4,
        category: "number",
        source: "AK4",
        description: "数位表示、数轴读数、多位数分析。",
        keyPoints: [
            "个/十/百/千位的位值",
            "数轴刻度与读数",
            "多位数的分解与拼合"
        ],
        typicalApproach: [
            "写出数位表（个-十-百-千）",
            "数轴：先找单位长度",
            "把大数按位分块处理"
        ],
        linkedElementary: ["g4_01", "g5_04"],
        linkedGerman: ["gc_k4_number"]
    },
    // ---- 以下节点由 AK5+ 题目引入 ----
    {
        id: "pangu_fraction",
        name: "分数与小数",
        grade: 5,
        category: "fraction",
        source: "AK5+",
        description: "分数概念、小数表示、简单分数运算、比例。AK5 起频繁出现（油箱 1/8→5/8、纸厚 0.1mm、瓶+押金）。",
        keyPoints: [
            "分数：分子/分母、真假分数、化简",
            "小数与分数互化、单位换算",
            "分数加减：找公分母",
            "分数乘除的直觉（乘以真分数会变小）",
            "简单比例：a:b = c:d"
        ],
        typicalApproach: [
            "画图或数轴帮助理解分数含义",
            "先统一单位再运算",
            "利用整体 1 反推部分：3/4 → 1/4 → 1"
        ],
        linkedElementary: ["g4_02", "g4_16", "g5_04", "g5_07", "g5_11", "g6_02", "g6_03"],
        linkedGerman: ["gc_k4_fraction", "gc_k4_calc"]
    },
    {
        id: "pangu_algebra",
        name: "代数思维与符号方程",
        grade: 5,
        category: "other",
        source: "AK5+",
        description: "用字母/符号代表未知数、列方程、代入验证。AK5 起显式出现（♠+♠+2=20+♠、A+B=12 求 A·B）。",
        keyPoints: [
            "用字母代表数、写出关系式",
            "简单一元一次方程",
            "多元约束（连等式相减）",
            "极值直觉：和一定时积何时最大/最小"
        ],
        typicalApproach: [
            "命名未知量：设 x = ...",
            "把每句话变成一个式子",
            "关键：让未知项聚到方程一侧",
            "试极端值验证结论"
        ],
        linkedElementary: ["g4_08", "g4_14", "g5_08", "g5_09", "g6_03"],
        linkedGerman: ["gc_k4_puzzle", "gc_k3_numpuzzle"]
    },
    // ---- 以下节点由 AK6+ 题目引入 ----
    {
        id: "pangu_percent",
        name: "百分数与比例变化",
        grade: 6,
        category: "fraction",
        source: "AK6+",
        description: "百分数与百分比变化、涨价/折扣、增长率。AK6 起频繁出现（原价 + 涨 50%、打折等）。",
        keyPoints: [
            "百分数与分数、小数的互化",
            "增长率：新值 = 原值 × (1 + p%)",
            "折扣：新值 = 原值 × (1 − p%)",
            "两次变化：先增后减常见陷阱",
            "百分之几：部分 ÷ 整体"
        ],
        typicalApproach: [
            "把百分数换成分数或小数再计算",
            "涨价问题：抓住『是原价的多少』vs『比原价多多少』",
            "画表格对比变化前后的关键量"
        ],
        linkedElementary: ["g6_02", "g6_03", "g6_04"],
        linkedGerman: ["gc_k4_fraction"]
    },
    {
        id: "pangu_angle",
        name: "角度与三角形",
        grade: 6,
        category: "geometry",
        source: "AK6+",
        description: "三角形内角和、等腰/等边三角形性质、平行线夹角、多边形角度计算。AK6 起显式出现（等腰+等边组合求 v 角）。",
        keyPoints: [
            "三角形内角和 = 180°",
            "等边三角形三个角都是 60°",
            "等腰三角形两底角相等",
            "多边形内角和 = (n-2)×180°",
            "外角 = 相邻内角的补角"
        ],
        typicalApproach: [
            "在图上标出所有已知角、逐步推未知角",
            "识别等腰/等边给出的等角信息",
            "利用整体 = 部分之和列方程"
        ],
        linkedElementary: ["g4_04", "g4_05", "g4_09", "g6_05"],
        linkedGerman: ["gc_k4_geom"]
    },
    // ---- 以下节点由 AK8+ 题目引入 ----
    {
        id: "pangu_probability",
        name: "概率与不确定性",
        grade: 8,
        category: "other",
        source: "AK8+",
        description: "简单概率、组合抽样、Galton 板、鸽巢型\"至少多少次\"。AK8+ 引入。",
        keyPoints: [
            "概率 = 有利结果 ÷ 总结果",
            "独立事件概率相乘",
            "Galton 板：路径数 = 二项系数",
            "极值\"至少多少次一定能保证\" 与 鸽巢原理相通",
            "抽取无放回 vs 有放回"
        ],
        typicalApproach: [
            "画树形图 / 列表",
            "利用对称性简化路径计数",
            "最坏情况分析：找最不利的抽样序列"
        ],
        linkedElementary: ["g6_16"],
        linkedGerman: ["gc_k4_puzzle"]
    }
];

const panguNodeMap = Object.fromEntries(panguNodes.map(n => [n.id, n]));

// ============= 主题之间的连接 =============
const panguLinks = [
    { source: "pangu_calc", target: "pangu_number", type: "prerequisite", label: "计算 → 数位" },
    { source: "pangu_calc", target: "pangu_puzzle", type: "prerequisite", label: "计算 → 数字谜" },
    { source: "pangu_pattern", target: "pangu_count", type: "related", label: "规律 ↔ 计数" },
    { source: "pangu_pattern", target: "pangu_time", type: "related", label: "规律 ↔ 时间周期" },
    { source: "pangu_geom", target: "pangu_solid", type: "prerequisite", label: "平面 → 立体" },
    { source: "pangu_geom", target: "pangu_count", type: "related", label: "几何 ↔ 图形计数" },
    { source: "pangu_app", target: "pangu_logic", type: "related", label: "应用 ↔ 推理" },
    { source: "pangu_puzzle", target: "pangu_logic", type: "related", label: "数字谜 ↔ 逻辑" },
    { source: "pangu_number", target: "pangu_puzzle", type: "related", label: "数位 ↔ 摆数字" },
    { source: "pangu_count", target: "pangu_logic", type: "related", label: "计数 ↔ 鸽巢" },
    // 由 AK5 引入的新节点接入图
    { source: "pangu_calc", target: "pangu_fraction", type: "prerequisite", label: "整数 → 分数小数" },
    { source: "pangu_number", target: "pangu_fraction", type: "prerequisite", label: "位值 → 小数" },
    { source: "pangu_fraction", target: "pangu_geom", type: "related", label: "分数 ↔ 面积比例" },
    { source: "pangu_calc", target: "pangu_algebra", type: "prerequisite", label: "运算 → 用符号写关系" },
    { source: "pangu_puzzle", target: "pangu_algebra", type: "related", label: "数字谜 ↔ 符号方程" },
    { source: "pangu_algebra", target: "pangu_pattern", type: "related", label: "代数 ↔ 数列通项" },
    { source: "pangu_algebra", target: "pangu_app", type: "related", label: "代数 ↔ 列方程解决应用题" },
    // 由 AK6+ 引入的新节点接入图
    { source: "pangu_fraction", target: "pangu_percent", type: "prerequisite", label: "分数 → 百分数" },
    { source: "pangu_percent", target: "pangu_app", type: "related", label: "百分数 ↔ 应用题" },
    { source: "pangu_geom", target: "pangu_angle", type: "prerequisite", label: "几何 → 角度" },
    { source: "pangu_angle", target: "pangu_algebra", type: "related", label: "角度 ↔ 代数（列方程求角）" },
    // AK8+ 引入
    { source: "pangu_count", target: "pangu_probability", type: "prerequisite", label: "计数 → 概率" },
    { source: "pangu_fraction", target: "pangu_probability", type: "prerequisite", label: "分数 → 概率" },
    { source: "pangu_probability", target: "pangu_logic", type: "related", label: "概率 ↔ 最坏情况" }
];

// ============= 学习路径 =============
const panguPaths = [
    {
        id: "calc",
        name: "运算与数感线",
        icon: "&#x1F4CA;",
        description: "从基础运算到大数、数位、数字谜",
        nodes: ["pangu_calc", "pangu_number", "pangu_puzzle"]
    },
    {
        id: "geometry",
        name: "几何与空间线",
        icon: "&#x1F4D0;",
        description: "平面图形 → 立体几何 → 空间想象",
        nodes: ["pangu_geom", "pangu_solid"]
    },
    {
        id: "count",
        name: "计数与递推线",
        icon: "&#x1F522;",
        description: "系统枚举、加乘原理、斐波那契",
        nodes: ["pangu_pattern", "pangu_count"]
    },
    {
        id: "logic",
        name: "推理与陷阱线",
        icon: "&#x1F9E9;",
        description: "真假话、鸽巢、陷阱题、可能与必然",
        nodes: ["pangu_logic", "pangu_puzzle"]
    },
    {
        id: "app",
        name: "应用题线",
        icon: "&#x1F4DD;",
        description: "情境类应用、和差、比例、平衡、行程",
        nodes: ["pangu_app", "pangu_time"]
    },
    {
        id: "fraction_algebra",
        name: "分数与代数线（AK5+）",
        icon: "&#x1F522;",
        description: "从整数运算过渡到分数、小数、符号方程",
        nodes: ["pangu_calc", "pangu_fraction", "pangu_algebra"]
    },
    {
        id: "percent_ratio",
        name: "百分数与比率（AK6+）",
        icon: "&#x1F4C8;",
        description: "分数 → 百分数 → 涨跌复合、比率与应用",
        nodes: ["pangu_fraction", "pangu_percent", "pangu_app"]
    },
    {
        id: "advanced_geom",
        name: "几何进阶线（AK6+）",
        icon: "&#x1F4D0;",
        description: "面积 → 角度 → 三角形/多边形 → 圆几何",
        nodes: ["pangu_geom", "pangu_angle", "pangu_solid"]
    },
    {
        id: "prob_combinatorics",
        name: "计数与概率线（AK8+）",
        icon: "&#x1F3B2;",
        description: "枚举 → 加乘原理 → 概率 → 最坏情况",
        nodes: ["pangu_count", "pangu_probability", "pangu_logic"]
    }
];

// ============= 分类与颜色（与主图共用） =============
const panguCategoryNames = {
    calc: "计算",
    number: "数论/数位",
    geometry: "几何",
    app: "应用题",
    count: "计数",
    fraction: "分数小数",
    travel: "行程",
    other: "推理/逻辑"
};

const panguCategoryColors = {
    calc: "#E91E63",
    number: "#3F51B5",
    geometry: "#009688",
    app: "#FF5722",
    count: "#795548",
    fraction: "#FF9800",
    travel: "#8BC34A",
    other: "#9E9E9E"
};

// ---------- 辅助：反查某小学教材节点关联的盘古主题 ----------
function findPanguTopicsForElementary(elementaryId) {
    return panguNodes.filter(n =>
        (n.linkedElementary || []).includes(elementaryId)
    );
}
// ---------- 辅助：反查某德国竞赛主题关联的盘古主题 ----------
function findPanguTopicsForGerman(germanId) {
    return panguNodes.filter(n =>
        (n.linkedGerman || []).includes(germanId)
    );
}
// ---------- 辅助：某主题下的所有题目 ----------
function problemsForPanguTopic(topicId) {
    return panguProblems.filter(p => (p.topics || []).includes(topicId));
}
