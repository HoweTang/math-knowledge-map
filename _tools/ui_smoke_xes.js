/**
 * 学而思页面的浏览器冒烟测试 (无需安装 puppeteer, 用 Chrome 的 DevTools 协议 + Node 22 内置 WebSocket)
 *
 * 用法:  node _tools/ui_smoke_xes.js [--shots]       加 --shots 会把截图存到系统临时目录
 * 要求:  已安装 Chrome (默认路径或设置环境变量 CHROME_PATH), Node >= 22
 *
 * 做的事: 逐个打开页面, 切换所有视图, 点击关键按钮, 捕获未处理异常 / console.error, 并断言关键 DOM 存在
 */
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CHROME = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9333 + Math.floor(Math.random() * 300);
const SHOTS = process.argv.includes('--shots');
const shotDir = path.join(os.tmpdir(), 'xes_shots');
if (SHOTS) fs.mkdirSync(shotDir, { recursive: true });

const fileUrl = (name, query = '') => 'file:///' + ROOT.replace(/\\/g, '/') + '/' + name + query;
const sleep = ms => new Promise(r => setTimeout(r, ms));

function getJson(url) {
    return new Promise((resolve, reject) => {
        http.get(url, res => {
            let data = '';
            res.on('data', c => (data += c));
            res.on('end', () => { try { resolve(JSON.parse(data)); } catch (e) { reject(e); } });
        }).on('error', reject);
    });
}

async function launch() {
    if (typeof WebSocket === 'undefined') throw new Error('当前 Node 没有内置 WebSocket, 请使用 Node 22+');
    const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'xes_cdp_'));
    const proc = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-first-run', `--remote-debugging-port=${PORT}`,
        `--user-data-dir=${profile}`, '--window-size=1500,950', 'about:blank'], { stdio: 'ignore' });
    let list;
    for (let i = 0; i < 50; i++) {
        try { list = await getJson(`http://127.0.0.1:${PORT}/json/list`); if (list.length) break; } catch (e) { /* 还没起来 */ }
        await sleep(200);
    }
    if (!list || !list.length) throw new Error('Chrome 没有启动');
    const page = list.find(t => t.type === 'page') || list[0];
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

    let id = 0;
    const pending = new Map();
    const errors = [];
    const listeners = [];
    ws.onmessage = ev => {
        const msg = JSON.parse(ev.data);
        if (msg.id && pending.has(msg.id)) {
            const { resolve, reject } = pending.get(msg.id);
            pending.delete(msg.id);
            msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
        } else if (msg.method) {
            if (msg.method === 'Runtime.exceptionThrown') {
                const d = msg.params.exceptionDetails;
                errors.push('异常: ' + ((d.exception && d.exception.description) || d.text));
            } else if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
                errors.push('console.error: ' + msg.params.args.map(a => a.value || a.description).join(' '));
            }
            listeners.forEach(l => l(msg));
        }
    };
    const send = (method, params = {}) => new Promise((resolve, reject) => {
        const i = ++id;
        pending.set(i, { resolve, reject });
        ws.send(JSON.stringify({ id: i, method, params }));
    });
    await send('Runtime.enable');
    await send('Page.enable');

    const api = {
        errors,
        async goto(url) {
            const loaded = new Promise(r => { const f = m => { if (m.method === 'Page.loadEventFired') { listeners.splice(listeners.indexOf(f), 1); r(); } }; listeners.push(f); });
            await send('Page.navigate', { url });
            await loaded;
            await sleep(900);
        },
        async eval(expr) {
            const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
            if (r.exceptionDetails) throw new Error('页面脚本异常: ' + (r.exceptionDetails.exception && r.exceptionDetails.exception.description || r.exceptionDetails.text));
            return r.result.value;
        },
        async shot(name) {
            if (!SHOTS) return;
            const r = await send('Page.captureScreenshot', { format: 'png' });
            fs.writeFileSync(path.join(shotDir, name + '.png'), Buffer.from(r.data, 'base64'));
        },
        async close() {
            try { ws.close(); } catch (e) { /* ignore */ }
            proc.kill();
            await sleep(300);
            try { fs.rmSync(profile, { recursive: true, force: true }); } catch (e) { /* 临时目录清理失败可忽略 */ }
        }
    };
    return api;
}

let pass = 0, fail = 0;
function check(name, ok, detail) {
    if (ok) pass++;
    else { fail++; console.log('  ✗ ' + name + (detail !== undefined ? '  → ' + detail : '')); }
}

(async () => {
    const b = await launch();
    try {
        // ---------- xes.html ----------
        console.log('— xes.html —');
        await b.goto(fileUrl('xes.html'));
        await b.eval('localStorage.clear(); location.reload(); 0');
        await sleep(1200);

        check('学习链: 13 个泳道', (await b.eval('document.querySelectorAll(".xes-chain").length')) === 13);
        check('学习链: 讲次小卡片非空', (await b.eval('document.querySelectorAll(".xes-chip").length')) > 238);
        await b.shot('01_chains');

        for (const v of ['graph', 'lectures', 'cards', 'methods', 'progress']) {
            await b.eval(`switchView("${v}"); 0`);
            await sleep(700);
            const ok = await b.eval(`document.getElementById("${v}-view").classList.contains("active")`);
            check(`切换到 ${v}`, ok);
            await b.shot('02_' + v);
        }

        // 图谱: 节点数 / 选择知识链
        await b.eval('switchView("graph"); 0'); await sleep(600);
        check('图谱: 238 个节点', (await b.eval('document.querySelectorAll("#xes-graph .xes-node").length')) === 238);
        await b.eval('document.getElementById("graph-chain").value="travel"; onGraphFilter(); 0'); await sleep(600);
        check('图谱: 选行程链后节点减少', (await b.eval('document.querySelectorAll("#xes-graph .xes-node").length')) === 14);
        await b.eval('document.getElementById("graph-chain").value="all"; document.getElementById("graph-category").value="geometry"; onGraphFilter(); 0'); await sleep(600);
        check('图谱: 几何类 34 个', (await b.eval('document.querySelectorAll("#xes-graph .xes-node").length')) === 34);
        await b.eval('document.getElementById("graph-category").value="all"; 0');

        // 讲次目录
        await b.eval('switchView("lectures"); 0'); await sleep(400);
        check('讲次目录: 238 张卡片', (await b.eval('document.querySelectorAll(".xes-lecture-card").length')) === 238);
        check('讲次目录: 有题库的讲打了标记(数量 = OCR 讲数)', (await b.eval('[...document.querySelectorAll(".xes-lecture-card")].filter(c => c.innerText.includes("有题库")).length')) === (await b.eval('xesOcrMeta.lectures.length')));
        await b.eval('var s=document.getElementById("lec-search"); s.value="鸡兔"; onLecFilter(); 0');
        check('讲次目录: 搜索「鸡兔」得到 2 讲', (await b.eval('document.querySelectorAll(".xes-lecture-card").length')) === 2);
        await b.eval('resetLecFilter(); 0');
        await b.eval('document.getElementById("lec-method").value="assume"; onLecFilter(); 0');
        check('讲次目录: 假设法至少 3 讲', (await b.eval('document.querySelectorAll(".xes-lecture-card").length')) >= 3);
        await b.eval('resetLecFilter(); 0');

        // 单讲详情 + 进度
        await b.eval('showLecture("xes_04_06"); 0'); await sleep(300);
        check('详情面板打开', await b.eval('document.getElementById("detail-panel").classList.contains("open")'));
        check('详情含讲名', (await b.eval('document.getElementById("detail-content").innerText')).includes('鸡兔同笼初步'));
        check('详情含前置/后续', (await b.eval('document.getElementById("detail-content").innerText')).includes('接下来'));
        check('详情含盘古对应', (await b.eval('document.getElementById("detail-content").innerHTML')).includes('pangu.html?topic='));
        await b.shot('03_detail');
        await b.eval('setStatus("xes_04_06","done"); 0'); await sleep(200);
        check('进度写入 localStorage', (await b.eval('JSON.parse(localStorage.getItem("xesProgress_v1")||"{}").xes_04_06.status')) === 'done');
        await b.eval('setMastery("xes_04_06",2); 0');
        check('掌握度 = 2', (await b.eval('getProgress("xes_04_06").mastery')) === 2);
        await b.eval('closeDetail(); switchView("chains"); 0'); await sleep(300);
        check('学习链里该讲显示已学', (await b.eval('document.querySelectorAll(".xes-chip.status-done").length')) >= 1);
        await b.eval('switchView("progress"); 0'); await sleep(300);
        check('进度页: 已学 = 1', (await b.eval('document.querySelector(".xes-stat b").innerText')) === '1');

        // 级别过滤
        await b.eval('switchView("chains"); filterLevel("3-4"); 0'); await sleep(300);
        const heads = await b.eval('[...new Set([...document.querySelectorAll(".xes-lane-head")].map(e => e.innerText.split("\\n")[0]))].join(",")');
        check('级别过滤 3-4: 泳道只含 3 级、4 级', heads === '3 级,4 级', heads);
        await b.eval('filterLevel("all"); 0');

        // 教学卡
        for (const c of ['subst_eq', 'ratio', 'count', 'travel', 'numtheory', 'area', 'solid', 'seq', 'calc', 'fraction', 'puzzle', 'logic', 'applied']) {
            await b.eval(`openCard("${c}"); 0`);
            const okCard = await b.eval('document.querySelectorAll(".xes-step").length === 3 && document.querySelectorAll(".xes-variant").length >= 2 && document.querySelectorAll(".xes-pit").length >= 3');
            check(`教学卡 ${c} 结构完整`, okCard);
        }
        await b.shot('04_card');

        // ---------- 题库 / 练习 / 错题本 ----------
        console.log('— 题库 / 练习 / 错题本 —');
        await b.goto(fileUrl('xes.html', '?view=problems'));
        await sleep(500);
        check('?view=problems 打开题库', await b.eval('document.getElementById("problems-view").classList.contains("active")'));
        check('题库: 渲染出题目卡片', (await b.eval('document.querySelectorAll("#problems-view .xq-card").length')) >= 20);
        check('题库: 题目文字非空', await b.eval('[...document.querySelectorAll("#problems-view .xq-text")].every(e => e.innerText.trim().length >= 4)'));
        check('题库: 每张卡有原书 PDF 链接(带 #page=)', await b.eval('[...document.querySelectorAll("#problems-view .xq-pdf")].every(a => /#page=\\d+$/.test(a.getAttribute("href")))'));
        await b.shot('06_problems');

        // 找一道有答案的练习题做全流程
        const qid = await b.eval('xesProblems.find(p => p.type === "practice" && p.answer && p.solution).id');
        const qlec = await b.eval(`xesProblemMap["${qid}"].lecture`);
        const nLec = await b.eval(`xesProblemsForLecture("${qlec}").length`);
        await b.eval(`openProblem("${qid}"); 0`); await sleep(300);
        check('openProblem: 只显示该讲的题', (await b.eval('document.querySelectorAll("#problems-view .xq-card").length')) === nLec, nLec);
        check('答案默认隐藏', (await b.eval(`document.querySelectorAll('[data-qid="${qid}"] .xq-box.answer').length`)) === 0);
        await b.eval(`toggleReveal("${qid}", "hint"); 0`);
        check('点「提示」出现提示框、不出现答案', await b.eval(`!!document.querySelector('[data-qid="${qid}"] .xq-box.hint') && !document.querySelector('[data-qid="${qid}"] .xq-box.answer')`));
        await b.eval(`toggleReveal("${qid}", "answer"); 0`);
        check('点「看答案」出现答案', (await b.eval(`(document.querySelector('[data-qid="${qid}"] .xq-box.answer')||{innerText:''}).innerText`)).includes(await b.eval(`xesProblemMap["${qid}"].answer.slice(0,2)`)));

        await b.eval(`setAttempted("${qid}", "wrong"); 0`); await sleep(150);
        check('做错写入 localStorage', (await b.eval(`JSON.parse(localStorage.getItem("xesQStatus_v1")||"{}")["${qid}"].attempted`)) === 'wrong');
        check('做错后出现错因选择', (await b.eval(`document.querySelectorAll('[data-qid="${qid}"] .xq-cause-chip').length`)) === 4);
        await b.eval(`setCause("${qid}", "calc"); 0`);
        check('选错因写入', (await b.eval(`JSON.parse(localStorage.getItem("xesQStatus_v1"))["${qid}"].cause`)) === 'calc');
        await b.eval(`setNote("${qid}", "进位漏了"); 0`);
        check('备注写入', (await b.eval(`JSON.parse(localStorage.getItem("xesQStatus_v1"))["${qid}"].note`)) === '进位漏了');

        await b.eval('switchView("wrong"); 0'); await sleep(300);
        check('错题本: 待订正里有这一题', (await b.eval('document.querySelectorAll("#wrong-view .xq-card").length')) === 1);
        check('错题本: 错因「计算」计数为 1', (await b.eval('document.querySelector("#wrong-view .xq-cause-cards .c:nth-child(4) .n").innerText')) === '1');
        await b.shot('07_wrong');
        await b.eval(`setAttempted("${qid}", "correct"); 0`); await sleep(150);
        check('订正后待订正为空', (await b.eval('document.querySelectorAll("#wrong-view .xq-card").length')) === 0);
        await b.eval('setWrongTab("fixed"); 0'); await sleep(150);
        check('订正后出现在「已订正」', (await b.eval('document.querySelectorAll("#wrong-view .xq-card").length')) === 1);
        await b.eval('setWrongTab("pending"); 0');

        // 练习
        await b.eval(`startPracticeFor("${qlec}"); 0`); await sleep(300);
        check('练习: 出现练习卡片', await b.eval('!!document.querySelector("#practice-container .practice-question")'));
        await b.eval('toggleReveal(prQueue[0].id, "hint"); toggleReveal(prQueue[0].id, "answer"); toggleReveal(prQueue[0].id, "solution"); setAttempted(prQueue[0].id, "wrong"); 0'); await sleep(200);
        check('练习: 点「做错」后出现错因选择', (await b.eval('document.querySelectorAll("#practice-container .xq-cause-chip").length')) === 4);
        await b.shot('08a_practice_card');
        await b.eval('setAttempted(prQueue[0].id, "wrong"); 0');          // 再点一次取消, 还原
        const nQueue = await b.eval('prQueue.length');
        check('练习: 队列只含练习类题目(不含例题)', await b.eval('prQueue.every(p => p.type !== "example")'));
        for (let i = 0; i < nQueue; i++) await b.eval('prNext(); 0');
        check('练习: 做完出现总结', await b.eval('!!document.querySelector("#practice-container .xq-summary-card")'));
        await b.eval('prBackToSetup(); 0');
        check('练习: 返回设置页', await b.eval('!!document.getElementById("pr-mode")'));
        await b.shot('08_practice');

        // 讲次详情里的题目列表 + 进度页统计
        await b.eval(`showLecture("${qlec}"); 0`); await sleep(300);
        check('讲次详情: 含「例题与练习」', (await b.eval('document.getElementById("detail-content").innerText')).includes('例题与练习'));
        check('讲次详情: 题目行数 = 该讲题数', (await b.eval('document.querySelectorAll("#detail-content .xq-row").length')) === nLec);
        await b.eval('document.getElementById("detail-panel").scrollTop = 900; 0'); await sleep(200);
        await b.shot('09_detail_problems');
        await b.eval('closeDetail(); switchView("progress"); 0'); await sleep(300);
        check('进度页: 有题库记录统计', (await b.eval('document.getElementById("progress-container").innerText')).includes('题库记录'));
        const noData = await b.eval('(function(){ var l = xesLectures.find(l => !xesHasProblems(l.id)); return l.id; })()');
        await b.eval(`showLecture("${noData}"); 0`); await sleep(200);
        check('没有题目的讲: 提示未提取', (await b.eval('document.getElementById("detail-content").innerText')).includes('还没有提取题目'));
        await b.eval('closeDetail(); 0');

        // URL 参数
        await b.goto(fileUrl('xes.html', '?pangu=pangu_algebra'));
        const nAlg = await b.eval('document.querySelectorAll(".xes-lecture-card").length');
        check('?pangu=pangu_algebra 筛出讲次', nAlg > 5 && nAlg < 238, nAlg);
        await b.goto(fileUrl('xes.html', '?lecture=4-6'));
        await sleep(500);
        check('?lecture=4-6 自动打开详情', await b.eval('document.getElementById("detail-panel").classList.contains("open")'));
        await b.goto(fileUrl('xes.html', '?chain=area'));
        check('?chain=area 打开教学卡', (await b.eval('document.querySelector(".xes-teach h2").innerText')).includes('面积'));

        // ---------- 其他页面的互链 ----------
        console.log('— 其他页面 —');
        for (const p of ['index.html', 'german.html', 'bridge.html', 'pangu.html']) {
            await b.goto(fileUrl(p));
            check(`${p}: 有「学而思」入口`, await b.eval('!!document.querySelector(\'.map-switch a[href="xes.html"]\')'));
        }
        await b.goto(fileUrl('pangu.html', '?topic=pangu_algebra'));
        await sleep(700);
        check('pangu.html 主题详情含「对应学而思讲次」', (await b.eval('document.getElementById("detail-content").innerText')).includes('对应学而思讲次'));
        await b.shot('05_pangu_xes');

        console.log('— 页面错误 —');
        check('没有未处理异常 / console.error', b.errors.length === 0, b.errors.slice(0, 5).join(' | '));
    } catch (e) {
        fail++;
        console.log('  ✗ 测试脚本异常: ' + e.message);
    } finally {
        await b.close();
    }
    console.log(`\n通过 ${pass} 项, 失败 ${fail} 项` + (SHOTS ? `  (截图: ${shotDir})` : ''));
    process.exit(fail ? 1 : 0);
})();
