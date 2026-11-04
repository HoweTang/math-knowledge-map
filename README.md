# 小学数学知识链图 · 三至六年级

> 一个交互式知识图谱 Web 应用，把四套数学教学 / 竞赛体系（**中国小学教材** · **德国数学竞赛** · **瑞典盘古 Pangea 竞赛** · **学而思秘籍**）横向拉平，看一眼就能知道"这个知识点在别的体系里对应什么、有哪些真题、我做过没有、做错的整理成错题本"。

<div align="center">

**📐 小学教材** &nbsp;·&nbsp; **🏆 德国竞赛（K3/K4）** &nbsp;·&nbsp; **🎨 盘古竞赛（AK4-AK9，609 道题）** &nbsp;·&nbsp; **🦕 学而思秘籍（1-12 级，238 讲）** &nbsp;·&nbsp; **🔗 三方关联视图**

</div>

---

## ✨ 主要功能

### 六大视图

| 视图 | 说明 |
|------|------|
| **知识图谱** | D3 力导向图，节点按类别配色、按年级描边，可拖拽/缩放/点击查看详情 |
| **主题列表** | 按年级 + 类别分组，快速定位单个知识点 |
| **学习路径** | 9 条精选路径（运算、几何、计数、逻辑、应用题、分数与代数、百分数与比率、几何进阶、计数与概率） |
| **题库浏览** | 全部 609 道题按年级 / 年份 / 轮次分组，卡片形式浏览 |
| **练习模式** | 按筛选条件随机洗牌抽题，一次一题，含"显示提示 / 显示答案 / ✓做对 / ✗做错 / ★收藏" |
| **打印导出** | 生成可打印的题集，支持按主题 / 年份 / 年级分组，`Ctrl+P` 直接出 PDF |

### 五维联合筛选

顶部工具栏支持同时按 **年级** × **轮次** × **主题** × **难度** × **状态** 五个维度过滤，所有视图跟随。

- **年级**：AK4 / AK5 / AK6 / AK7 / AK8 / AK9
- **轮次**：初赛 / 复赛 / 决赛
- **主题**：15 个盘古主题节点（计算、数论、几何、应用、计数、逻辑、分数、代数、百分数、角度、概率等）
- **难度**：1-5 星
- **状态**：全部 / ★ 收藏 / ✗ 错题本 / ✓ 已做对 / 未做

### 错题本（本地持久化）

- 每题独立可标：**✓ 做对**、**✗ 做错**、**★ 收藏**
- 持久化到浏览器 **localStorage**（`panguStatus_v1`），刷新 / 换 tab 不丢
- 顶部实时统计当前状态数量
- 错题 / 收藏 集可作为筛选条件反向拉出练习或打印

### CSV 导出

- 一键把当前筛选下的题目导出为 UTF-8（含 BOM，Excel 中文正常）CSV
- 15 列：`id, grade, year, round, num, difficulty, title, translation, options, answer, topics, hint, file, page, has_image, status_attempted, status_starred`
- 文件名根据筛选条件自动命名，如 `pangu_AK5_决赛_pangu_algebra_wrong_2025-09-22.csv`

---

## 🦕 学而思秘籍（`xes.html`）

把《学而思秘籍 · 小学数学思维培养》1-12 级共 238 讲串成知识链，并配套教学卡、OCR 提取的例题 / 练习和错题本。入口在各页面顶部的「🦕 学而思」。

| 视图 | 说明 |
|------|------|
| **学习链** | 13 条知识链的泳道图（横向 = 级别，每条链分若干轨道），点任一讲查看前置 / 后续 / 相关 |
| **知识图谱** | D3 图，横轴 = 级别 1→12，可按知识链 / 类别过滤，悬停高亮前后关系 |
| **讲次目录** | 238 讲按级别分组，可按类别、知识链、解题武器、对应盘古主题、学习状态筛选 |
| **教学卡** | 每条链一张可打印的教学卡：一句话本质、具体→图像→符号三层台阶、常见误区、家长提问清单、变式对比、90 分钟节奏、错因分类 |
| **解题武器** | 13 种跨主题通用方法（画图、假设、转化、列方程…）的识题信号与教法 |
| **题库 / 练习 / 错题本** | 从书中 OCR 提取的例题、举一反三、挑战自我；先看提示再看答案，做错时选**错因**（读题 / 概念 / 方法 / 计算），错题本按错因归类并提示回看前置讲次；支持打印错题卷、导出 CSV |
| **我的进度** | 每讲「未学 / 在学 / 已学」+ 掌握度 1-3 星，推荐下一步（前置都学完的讲次），以及题库的做对 / 做错 / 错因统计；可导出 / 导入 JSON 备份 |

- 进度保存在 `localStorage`：`xesProgress_v1`（讲次进度）、`xesQStatus_v1`（做题记录）
- URL 参数：`?view=chains|graph|lectures|cards|methods|problems|practice|wrong|progress`、`?chain=<链id>`、`?graphchain=<链id>`、`?pangu=<盘古主题id>`、`?lecture=<讲次id 或 4-6>`
- 级别对应的年级（如「约二年级下」）是按每级约 5 个月推算的**估计**，请按孩子实际进度调整
- 盘古详情面板里会列出「对应学而思讲次」，学而思讲次详情里也能跳回盘古 / 小学教材 / 德国竞赛

### 关于 OCR 题库

书是扫描版 PDF（没有文字层），题目文字由 [RapidOCR](https://github.com/RapidAI/RapidOCR) 识别而来，**只处理了 `_tools/xes_ocr_plan.json` 里挑选的 21 个核心讲次**（覆盖 1-9 级，共 525 道题，其中 394 道练习类题目带参考答案；全部 238 讲约需 5 小时）。使用时请留意：

- 图里的内容读不出来（天平、线段图、示意图等），个别字会认错（如「兔」→「免」），分数 / 竖式常有缺漏。每道题都带「原书 PDF 第 N 页」链接（PDF 页码，不是书上印的页码）用于核对
- 含图或识别置信度低的题会打上 📐 / 🔎 标记；练习模式默认跳过依赖图的题。分数几乎都会丢（如 5 级第 10 讲「分数初识」整讲标为识别不确定）
- 个别答案 / 解析缺失（如 5-10 的 4 道、6-13 的 1 道），页面会提示对照原书答案册
- 发现错字可以写进 `_tools/xes_ocr_fixes.json`（按题目 id 校正），重新运行 `node _tools/parse_xes_ocr.js` 后不会丢
- 要增加讲次：把 `4-6` 这样的编号加进 `_tools/xes_ocr_plan.json`，再按下面的管道重新跑

---

## 📊 数据概览

### 盘古竞赛（Pangea Matematiktävling）

| 年级 | 题数 | 卷子数 |
|------|-----:|-----:|
| AK4 (4 年级) | 142 | 12 |
| AK5 (5 年级) | 98 | 8 |
| AK6 (6 年级) | 74 | 5 |
| AK7 (7 年级) | 83 | 7 |
| AK8 (8 年级) | 101 | 8 |
| AK9 (9 年级) | 111 | 8 |
| **合计** | **609** | **48** |

- 覆盖 **2015/16 - 2025/26** 多届（初赛、复赛、决赛）
- 原题瑞典语，**全部已翻译为中文**
- 每题含：中文题干、5 个选项、难度星级、主题标签、解题提示
- 253 道图片题额外标注 `hasImage: true`，附读图向导提示
- 365 道题有显式 `answer` 字段（自动从提示中提取）

### 德国竞赛（Känguru der Mathematik）

- K3 (3 年级) 与 K4 (4 年级) 两级
- PDF 原题（`德国竞赛题/K3_1_Chinese/`、`K3_2_Chinese/`、`K4_Chinese/`）
- 与小学教材知识点建立双向关联

### 中国小学教材

- 三至六年级核心知识点
- 与德国竞赛、盘古竞赛主题跨图关联

---

## 🎯 15 个盘古主题节点

| 类别 | 主题 | 引入年级 |
|------|------|:-:|
| 计算 | 基础运算与巧算 | AK4 |
| 数论 | 大数与数位、找规律与数列 | AK4 |
| 几何 | 平面几何、立体几何、面积、镜像 | AK4 |
| 计数 | 计数与递推、组合 | AK4 |
| 应用 | 应用题综合、时间与日期 | AK4 |
| 逻辑 | 逻辑推理与陷阱、数字谜 | AK4 |
| **分数** | 分数与小数 | AK5+ |
| **代数** | 代数思维与符号方程 | AK5+ |
| **百分数** | 百分数与比例变化 | AK6+ |
| **角度** | 角度与三角形 | AK6+ |
| **概率** | 概率与不确定性 | AK8+ |

---

## 🚀 快速开始

### 本地运行

```bash
# 1. 克隆仓库
git clone https://github.com/HoweTang/math-knowledge-map.git
cd math-knowledge-map

# 2. （可选）把 PDF 源材料放到对应文件夹以启用 PDF 跳转
# 盘古竞赛/*.pdf
# 德国竞赛题/K3_1_Chinese/*.pdf, K3_2_Chinese/*.pdf, K4_Chinese/*.pdf
# 学而思数学/01级-…/ … 12级-…/（每级一个文件夹：各讲 PDF + 参考答案 PDF）

# 3. 启一个本地 HTTP 服务器（Python）
python -m http.server 8000
# 或者用 Node
npx serve

# 4. 浏览器打开
# http://localhost:8000/pangu.html      盘古竞赛主页
# http://localhost:8000/index.html      小学教材知识图谱
# http://localhost:8000/german.html     德国竞赛知识图谱
# http://localhost:8000/xes.html        学而思秘籍知识链
# http://localhost:8000/bridge.html     三方关联视图
```

> **备注**：也可以直接双击 `pangu.html` 用 `file://` 打开，但**打开 PDF 原文**功能受浏览器安全策略限制可能失效。建议起本地 HTTP 服务器。

### GitHub Pages 部署（推荐）

本项目是纯静态 HTML/JS，可直接托管到 GitHub Pages：

1. 打开仓库的 **Settings → Pages**
2. **Source** 选 `Deploy from a branch`
3. **Branch** 选 `main` / `/root` → **Save**
4. 等 1-2 分钟后访问 `https://<username>.github.io/math-knowledge-map/pangu.html`

---

## 🏗 技术栈

- **纯前端** —— 没有构建步骤、没有 npm install
- **[D3.js v7](https://d3js.org/)** —— 力导向图 / 缩放 / 拖拽
- **原生 JavaScript** —— 无框架、无依赖
- **localStorage** —— 客户端持久化
- **CSS Grid + Flexbox** —— 响应式布局
- **`@media print`** —— 打印视图优化

数据文件：

- `data.js` &nbsp;—— 小学教材知识点
- `german-data.js` —— 德国竞赛主题
- `pangu-data.js` —— 盘古竞赛主题 + 题库（约 300 KB）

---

## 🗂 项目结构

```
math-knowledge-map/
├── index.html          小学教材图谱主页
├── german.html         德国竞赛主页
├── pangu.html          盘古竞赛主页（6 tab）
├── bridge.html         三方关联视图
├── app.js              小学教材页逻辑
├── german-app.js       德国竞赛页逻辑
├── pangu-app.js        盘古竞赛页逻辑（含练习/打印/错题本/CSV）
├── bridge-app.js       关联视图逻辑（3 栏 + 3 类连接）
├── data.js             小学教材数据
├── german-data.js      德国竞赛数据
├── pangu-data.js       盘古竞赛数据（609 题 · 15 主题 · 24 连边）
├── xes.html            学而思秘籍主页（学习链 / 图谱 / 讲次 / 教学卡 / 题库 / 练习 / 错题本 / 进度）
├── xes-app.js          学而思页面逻辑（泳道、D3 图谱、教学卡、进度）
├── xes-practice.js     学而思题库 / 练习 / 错题本
├── xes.css             学而思页面样式（依赖 style.css）
├── xes-data.js         238 讲 + 13 条知识链 + 216 条连边（由 _tools/build_xes_data.js 生成）
├── xes-cards.js        教学卡文案（手写）
├── xes-problems.js     OCR 提取的例题 / 练习（由 _tools/parse_xes_ocr.js 生成）
├── style.css           全站样式
├── 盘古竞赛/           盘古 PDF 源材料（本地保存，见 .gitignore）
├── 德国竞赛题/         德国竞赛 PDF（含中文翻译）
├── 学而思数学/         学而思秘籍 12 级 PDF 源材料（本地保存，见 .gitignore）
└── _tools/             数据处理脚本（Python + Node）
    ├── extract_pdf.py        从 PDF 抽取文本（含瑞典字体重映射）
    ├── parse_problems.py     解析题目 / 选项 / 难度
    ├── dump_by_paper.py      按试卷输出可读文本
    ├── augment_hints.js      为图片题智能补 hint
    ├── inject_answers.js     从 hint 提取答案字母
    ├── final_check.js        整套数据的健康检查（32 项）
    ├── xes_meta.js           学而思：讲次元数据 / 知识链 / 解题武器（手写，改这里）
    ├── build_xes_data.js     学而思：生成 xes-data.js
    ├── ocr_xes.py            学而思：对 PDF 页面做 OCR（结果缓存在 xes_ocr/）
    ├── xes_ocr_plan.json     学而思：要 OCR 的讲次清单
    ├── parse_xes_ocr.js      学而思：OCR 结果 → xes-problems.js
    ├── xes_ocr_fixes.json    学而思：OCR 错字的人工校正
    ├── xes_ocr/              学而思：OCR 缓存（每讲 / 每本答案册一个 JSON，重新识别很慢，所以入库）
    ├── check_xes.js          学而思：数据体检
    └── ui_smoke_xes.js       学而思：浏览器冒烟测试（Chrome DevTools 协议）
```

---

## 🧪 数据处理管道（可复现）

```bash
cd _tools

# 1. 从 PDF 抽取所有题目原始文本（生成 problems_raw.json）
python parse_problems.py

# 2. 按试卷 dump 可读文本（便于人工核对）
python dump_by_paper.py

# 3. 为图片题智能注入提示
node augment_hints.js

# 4. 从提示中提取答案字母，注入 answer 字段
node inject_answers.js

# 5. 整套体检（32 项断言）
node final_check.js
```

### 学而思管道

```bash
# 0. 依赖（OCR 才需要；网页本身零依赖）
pip install rapidocr-onnxruntime==1.4.4 pypdfium2

# 1. 改了 _tools/xes_meta.js（讲次、知识链、解题武器）后，重新生成 xes-data.js
node _tools/build_xes_data.js

# 2. OCR：按 xes_ocr_plan.json 识别讲义页 + 对应的参考答案页（约 30-60 分钟，可中断续跑）
python _tools/ocr_xes.py --plan
#    也可以单独跑：python _tools/ocr_xes.py --lectures 4-6   /   --answers 4 --only 6

# 3. 把 OCR 结果解析成题目，生成 xes-problems.js（同时写 _tools/xes_ocr/parse_report.txt）
node _tools/parse_xes_ocr.js

# 4. 体检（讲次 / 知识链 / 教学卡 / 题目一致性）
node _tools/check_xes.js

# 5. 浏览器冒烟测试（需要 Chrome 和 Node 22+）
node _tools/ui_smoke_xes.js
```

**已知处理点**：

- 学而思答案册是双栏排版，OCR 后按栏拆开再按「练习 N → 【答案】 → 【解析】」解析；跨栏的标签偶尔被并进上一栏末行，解析器里有专门处理
- 答案册每讲从页首开始，先用页眉小条带识别「第 N 讲」标题建立页码索引，再只识别需要的页，避免整本识别（每页约 10 秒）
- 瑞典 Pangea PDF 用了自定义字体子集，直接抽取出的字符是错乱的（`Σ`、`÷`、`σ` 等）。管道里做了字体重映射（`extract_pdf.py::FONT_REMAP`）把它们复原成瑞典字母（`ä`、`ö`、`å`）
- 2016 年份的 PDF 没有 `Uppgift N` 标记，用了旧格式 `N text`，管道自动识别两种格式
- 部分 PDF 里问题号断行导致解析漏题，用了"格式检测"启发式规避（详见 `parse_problems.py` 注释）

---

## 📋 数据 Schema（`pangu-data.js`）

### 题目

```js
{
    id: "P2425O1_1",              // 唯一 ID
    grade: 4,                     // 年级 4-9
    year: "2024/25",              // 学年
    round: "初赛",                // 初赛 / 复赛 / 决赛
    num: 1,                       // 题号
    difficulty: 1,                // 难度 1-5 星
    file: "盘古竞赛/PMT2425-01-AK4.pdf",
    page: 3,
    title: "运算符判断",
    translation: "方框里应该填哪个运算符号？\n7 + 48 = 56 □ 1",
    options: ["+", "-", "÷", "×", "都不是"],
    topics: ["pangu_calc"],       // 主题标签数组
    hint: "先算左边 7+48=55...答案：b",
    answer: "b",                  // 显式答案字母（若可提取）
    hasImage: false               // 是否含图（默认 false）
}
```

### 主题节点

```js
{
    id: "pangu_algebra",
    name: "代数思维与符号方程",
    grade: 5,                     // 引入年级
    category: "other",            // 分类（决定颜色）
    source: "AK5+",
    description: "...",
    keyPoints: [...],             // 核心考点数组
    typicalApproach: [...],       // 典型思路
    linkedElementary: ["g4_08", "g5_09"],   // 关联小学节点
    linkedGerman: ["gc_k4_puzzle"]          // 关联德国节点
}
```

---

## 🎨 设计原则

- **一目十行** —— 图谱一屏能看到主要主题；点击一次能看到全部关联
- **本地优先** —— 所有数据静态生成，无后端、无网络依赖（除 D3 CDN）
- **零构建** —— 直接编辑源文件、刷新浏览器就能看效果
- **可打印** —— 家里刷题不一定坐在屏幕前，打印导出是刚需
- **可扩展** —— 增加一个年级 / 一届试卷只需要往数据文件里加对象

---

## 🛠 开发提示

- 修改 `pangu-data.js` 后，跑 `node _tools/final_check.js` 一键健康检查
- 新增题目时，`id` 命名约定：`P<year><round>_<num>` (AK4) 或 `P<year><round>_AK<n>_<num>` (AK5+)
- 主题 id 前缀 `pangu_`；小学 id 前缀无；德国 id 前缀 `gc_`
- 添加新主题节点时同步更新：`panguNodes`、`panguLinks`（≥1 条相关连接）、`panguCategoryColors`（若新类别）
- 若要开发新视图，在 `pangu.html` 新增 `<div class="view-panel" id="<name>-view">`，在 `pangu-app.js::switchView` 中挂 renderer

---

## 📝 License

个人 / 教育使用。竞赛原题版权归各竞赛方所有：
- **Pangea Matematiktävling** —— https://pangeamatematik.se/
- **Känguru der Mathematik** —— https://www.mathe-kaenguru.de/

---

## 🙏 致谢

- 数据整理与工程实现：Guihao & AI 协同
- 感谢 Pangea 与 Känguru 组织者提供丰富的竞赛题资源

---

<div align="center">

**⭐ 如果觉得有用，欢迎 star！**

</div>
