// ============= 盘古数学竞赛 (Pangea Matematiktävling) AK4 知识图谱 =============
// 原始语言：瑞典语 (Svenska)
// 全部题目已翻译为中文
//
// 目录：盘古竞赛/
//   PMT2425-01-AK4.pdf         2024/2025 初赛 (Omgång 1)  12题 60分钟 33分
//   PMT2425-Final-AK4.pdf      2024/2025 决赛 (Final)     10题 60分钟 39分
//   PMT2526-O1-AK4.pdf         2025/2026 初赛 (Omgång 1)  12题 60分钟 33分
//   Fragekatalog-Ak4-Final-PMT2526.pdf  2025/2026 决赛     10题 60分钟 39分
//
// AK4 = Årskurs 4 = 4年级
// 难度：⋆(1星) ~ ⋆⋆⋆⋆⋆(5星)，1星=1分

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
        hint: "先算左边 7+48=55，再看右边什么运算能让 56 得到 55。答案：b (56-1=55)"
    },
    {
        id: "P2425O1_2", year: "2024/25", round: "初赛", num: 2, difficulty: 1,
        file: "盘古竞赛/PMT2425-01-AK4.pdf", page: 3,
        title: "交替加减",
        translation: "计算：1 − 2 + 3 − 4 + 5 − 6 + 7 − 8 + 9",
        options: ["2", "3", "4", "5", "6"],
        topics: ["pangu_calc", "pangu_pattern"],
        hint: "配对：(1-2)+(3-4)+(5-6)+(7-8)+9 = -1-1-1-1+9 = 5。答案：d"
    },
    {
        id: "P2425O1_3", year: "2024/25", round: "初赛", num: 3, difficulty: 1,
        file: "盘古竞赛/PMT2425-01-AK4.pdf", page: 3,
        title: "12天后星期几",
        translation: "Adam 星期三预约看医生。他需要 12 天后回访。回访是星期几？",
        options: ["星期五", "星期六", "星期日", "星期一", "星期二"],
        topics: ["pangu_time"],
        hint: "12 ÷ 7 = 1 余 5。星期三往后数 5 天 → 星期一。答案：d"
    },
    {
        id: "P2425O1_4", year: "2024/25", round: "初赛", num: 4, difficulty: 2,
        file: "盘古竞赛/PMT2425-01-AK4.pdf", page: 3,
        title: "农民年龄（陷阱题）",
        translation: "一位在自家农场生活了很多年的农民有 12 头牛、5 只鸡、1 只公鸡和 1 匹马。农民多大年龄？",
        options: ["19", "38", "62", "64", "无法求解"],
        topics: ["pangu_logic"],
        hint: "动物数量与年龄没有必然联系，属于陷阱题。答案：e（无法求解）"
    },
    {
        id: "P2425O1_5", year: "2024/25", round: "初赛", num: 5, difficulty: 2,
        file: "盘古竞赛/PMT2425-01-AK4.pdf", page: 3,
        title: "从和中减",
        translation: "从 120 和 90 的和中减去 210，结果是多少？",
        options: ["0", "180", "240", "420", "460"],
        topics: ["pangu_calc"],
        hint: "(120+90) - 210 = 210 - 210 = 0。答案：a"
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
        hint: "中场比分 (a,b)，0≤a≤3, 0≤b≤3。共 4×4=16 种。答案：e"
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
        hasImage: true
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
        hasImage: true
    },
    {
        id: "P2425F_4", year: "2024/25", round: "决赛", num: 4, difficulty: 3,
        file: "盘古竞赛/PMT2425-Final-AK4.pdf", page: 3,
        title: "Emilia 想的数",
        translation: "Emilia 想一个数。她把这个数乘以 6，然后加 25，得到 43。Emilia 想的是哪个数？",
        options: ["12", "5", "4", "3", "2"],
        topics: ["pangu_calc"],
        hint: "逆推：(43-25) ÷ 6 = 18 ÷ 6 = 3。答案：d"
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
        hint: "8 分 45 秒 × 20 = 175 分钟 = 2 小时 55 分。答案：d"
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
        hint: "数一数一共几个 7。答案：c (10 个 7 相加)"
    },
    {
        id: "P2526O1_2", year: "2025/26", round: "初赛", num: 2, difficulty: 1,
        file: "盘古竞赛/PMT2526-O1-AK4.pdf", page: 3,
        title: "两个时钟间隔的秒数",
        translation: "两张图上是同一个时钟不同时刻的样子。两张图之间过去了多少秒？（需看 PDF 原图）",
        options: ["40 秒", "41 秒", "42 秒", "43 秒", "44 秒"],
        topics: ["pangu_time"],
        hasImage: true
    },
    {
        id: "P2526O1_3", year: "2025/26", round: "初赛", num: 3, difficulty: 1,
        file: "盘古竞赛/PMT2526-O1-AK4.pdf", page: 3,
        title: "剩余面粉重量",
        translation: "你有 1 千克面粉，一个食谱只需要 580 克。袋子里还剩多少面粉？",
        options: ["320 克", "420 克", "520 克", "9420 克", "9520 克"],
        topics: ["pangu_calc"],
        hint: "1 千克 = 1000 克。1000 - 580 = 420 克。答案：b"
    },
    {
        id: "P2526O1_4", year: "2025/26", round: "初赛", num: 4, difficulty: 2,
        file: "盘古竞赛/PMT2526-O1-AK4.pdf", page: 3,
        title: "派对人数变化",
        translation: "派对上有 72 个孩子。14 点前有 13 个孩子回家，但 21 个新孩子到来。此时派对上有多少个孩子？",
        options: ["38", "70", "79", "80", "106"],
        topics: ["pangu_calc", "pangu_app"],
        hint: "72 - 13 + 21 = 80。答案：d"
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
        hint: "每个儿子的\"姐妹\"是同一批女儿。3 个儿子 + 3 个女儿 = 6。答案：c"
    },
    {
        id: "P2526O1_7", year: "2025/26", round: "初赛", num: 7, difficulty: 3,
        file: "盘古竞赛/PMT2526-O1-AK4.pdf", page: 4,
        title: "街头音乐家（每天翻倍）",
        translation: "街头音乐家演奏 5 天，每天赚的钱是前一天的两倍。第一天赚 20 克朗。第五天结束后一共赚了多少钱？",
        options: ["40 克朗", "100 克朗", "180 克朗", "320 克朗", "620 克朗"],
        topics: ["pangu_pattern", "pangu_app"],
        hint: "20 + 40 + 80 + 160 + 320 = 620。答案：e（等比数列）"
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
        hint: "逐条判断可能/必然/不可能。红球只有 1 个，所以不可能 2 红；至少 1 蓝一定；只抽 1 蓝也是可能的（1 蓝 1 红）"
    },
    {
        id: "P2526O1_10", year: "2025/26", round: "初赛", num: 10, difficulty: 4,
        file: "盘古竞赛/PMT2526-O1-AK4.pdf", page: 5,
        title: "两个数的位数描述",
        translation: "想两个数：\n第一个数：\"我有 5 个十位和 1 个个位。我的百位数和十位数一样多，千位数是十位数的三倍。\"\n第二个数：\"我比 1332 的一半少 200。\"\n两个数的和是多少？",
        options: ["2517", "4217", "16017", "16117", "16683"],
        topics: ["pangu_number"],
        hint: "第一个数：个位1、十位5、百位5、千位=5×3=15，即 15000+500+50+1=15551。第二个数：1332÷2−200=466。和=16017。答案：c"
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
        hint: "身高 = 293 − 106 = 187 cm。答案：b"
    },
    {
        id: "P2526F_2", year: "2025/26", round: "决赛", num: 2, difficulty: 3,
        file: "盘古竞赛/Fragekatalog-Ak4-Final-PMT2526.pdf", page: 3,
        title: "Lukas 和 Maja 体重",
        translation: "Lukas 和他的妹妹 Maja 一起重 40 千克。Lukas 比 Maja 重 10 千克。Maja 多重？",
        options: ["10 kg", "15 kg", "20 kg", "25 kg", "30 kg"],
        topics: ["pangu_app"],
        hint: "和差问题：Maja = (40−10)÷2 = 15 kg。答案：b"
    },
    {
        id: "P2526F_3", year: "2025/26", round: "决赛", num: 3, difficulty: 3,
        file: "盘古竞赛/Fragekatalog-Ak4-Final-PMT2526.pdf", page: 3,
        title: "Mario 方格路径",
        translation: "Mario 按照方格纸上的箭头走。按照指令走完后，他的房子在哪里？（需看 PDF 原图）",
        options: ["A", "B", "C", "D", "E"],
        topics: ["pangu_geom"],
        hasImage: true
    },
    {
        id: "P2526F_4", year: "2025/26", round: "决赛", num: 4, difficulty: 3,
        file: "盘古竞赛/Fragekatalog-Ak4-Final-PMT2526.pdf", page: 4,
        title: "3×3×3 立方体涂色",
        translation: "一个大立方体由 3×3×3 个相同的小立方体搭成。大立方体外表面涂成蓝色。有多少个小立方体满足以下条件之一：\n• 恰好一面被涂色，或\n• 一面都没涂？",
        options: ["6", "7", "8", "9", "10"],
        topics: ["pangu_solid"],
        hint: "恰好一面涂色的：每个面中心1块×6面=6块。一面都没涂的：正中心1块。总共7块。答案：b"
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
        hint: "三个等式相加：2(A+B+G)=17+16+15=48，所以 A+B+G=24。答案：a"
    },
    {
        id: "P2526F_8", year: "2025/26", round: "决赛", num: 8, difficulty: 5,
        file: "盘古竞赛/Fragekatalog-Ak4-Final-PMT2526.pdf", page: 6,
        title: "青蛙跳台阶",
        translation: "青蛙坐在阶梯前，台阶编号 1 到 5。它想跳到第 5 级去吃蜘蛛。青蛙每次可以跳 1 级或 2 级，例如 1→3→5 或 2→3→4→5。一共有多少种不同的跳法序列？",
        options: ["3", "8", "9", "12", "13"],
        topics: ["pangu_count", "pangu_pattern"],
        hint: "斐波那契：f(n)=f(n-1)+f(n-2)。f(1)=1,f(2)=2,f(3)=3,f(4)=5,f(5)=8。答案：b"
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
        hint: "鸽巢原理：26 ÷ 7 = 3 余 5，至少有一个星期几出现 ⌈26/7⌉ = 4 次。答案：e"
    }
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
    { source: "pangu_count", target: "pangu_logic", type: "related", label: "计数 ↔ 鸽巢" }
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
