/**
 * 李永乐 × 盘古 AK4 页面 (li.html) 的浏览器冒烟测试
 * 方式同 ui_smoke_xes.js：Chrome DevTools 协议 + Node 22 内置 WebSocket，无需安装 puppeteer
 *
 * 用法:  node _tools/ui_smoke_li.js [--shots]    加 --shots 会把截图存到系统临时目录 li_shots
 * 要求:  已安装 Chrome (默认路径或环境变量 CHROME_PATH)，Node >= 22
 * 结果同时写到 _tools/ui_smoke_li_out.txt
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
const shotDir = path.join(os.tmpdir(), 'li_shots');
if (SHOTS) fs.mkdirSync(shotDir, { recursive: true });
const out = [];
const log = s => { out.push(s); console.log(s); };

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
    const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'li_cdp_'));
    const proc = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-first-run', `--remote-debugging-port=${PORT}`,
        `--user-data-dir=${profile}`, '--window-size=1500,950', '--allow-file-access-from-files', 'about:blank'], { stdio: 'ignore' });
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

    return {
        errors,
        async goto(url) {
            const loaded = new Promise(r => { const f = m => { if (m.method === 'Page.loadEventFired') { listeners.splice(listeners.indexOf(f), 1); r(); } }; listeners.push(f); });
            const nav = await send('Page.navigate', { url });
            if (nav.errorText) throw new Error('导航失败: ' + nav.errorText + ' ' + url);
            // 最多等 20 秒，防止 load 事件丢失时一直挂住
            await Promise.race([loaded, sleep(20000).then(() => { errors.push('等待 load 事件超时: ' + url); })]);
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
        },
    };
}

let pass = 0, fail = 0;
function check(name, ok, detail) {
    if (ok) pass++;
    else { fail++; log('  ✗ ' + name + (detail !== undefined ? '  → ' + detail : '')); }
}

(async () => {
    const b = await launch();
    try {
        log('— li.html —');
        await b.goto(fileUrl('li.html'));
        await b.eval('localStorage.clear(); location.reload(); 0');
        await sleep(1200);

        const nUnits = await b.eval('window.LI_UNITS.length');
        const nProbs = await b.eval('window.LI_UNITS.reduce((s,u)=>s+u.problems.length,0)');
        check('学习单元 24 个', nUnits === 24, nUnits);

        // ---- 匹配总表 ----
        check('总表: 10 个大类', (await b.eval('document.querySelectorAll(".li-cat").length')) === 10);
        check('总表: 52 行知识点', (await b.eval('document.querySelectorAll(".li-table tbody tr").length')) === 52);
        check('总表: 有讲次标签', (await b.eval('document.querySelectorAll(".li-table .li-chip").length')) > 100);
        check('总表: 副标题含题数', (await b.eval('document.getElementById("li-subtitle").textContent')).includes(String(nProbs)));
        await b.shot('01_map');
        await b.eval('document.querySelector("[data-act=map-filter][data-k=\\"0\\"]").click(); 0');
        check('总表: 筛选"缺口"后 4 行', (await b.eval('document.querySelectorAll(".li-table tbody tr").length')) === 4);
        await b.eval('document.querySelector("[data-act=map-filter][data-k=all]").click(); 0');
        check('总表: 取消筛选后回到 52 行', (await b.eval('document.querySelectorAll(".li-table tbody tr").length')) === 52);

        // ---- 学习单元：逐个打开 ----
        await b.eval('document.querySelector("#li-tabs [data-view=units]").click(); 0');
        check('单元: 侧栏 24 项', (await b.eval('document.querySelectorAll(".li-unit-item").length')) === 24);
        let allOk = true;
        for (let i = 0; i < 24; i++) {
            const info = await b.eval(`(() => { document.querySelectorAll(".li-unit-item")[${i}].click();
                const u = window.LI_UNITS[${i}];
                return { probs: document.querySelectorAll(".li-prob").length, want: u.problems.length,
                         refs: document.querySelectorAll(".li-ref").length, wantRefs: u.li.length,
                         real: document.querySelectorAll(".li-pangu-q").length, wantReal: (u.ids||[]).length,
                         title: document.querySelector(".li-main h2").textContent }; })()`);
            if (info.probs !== info.want || info.refs !== info.wantRefs || info.real !== info.wantReal) {
                allOk = false;
                check(`单元 ${i + 1} 渲染数量`, false, JSON.stringify(info));
            }
            if (i === 0) await b.shot('02_unit_u01');
            if (i === 10) await b.shot('02_unit_u11');
            if (i === 14) await b.shot('02_unit_u15');
        }
        check('24 个单元的题目/讲次/真题数量都与数据一致', allOk);

        // ---- 答题交互 ----
        await b.eval('document.querySelectorAll(".li-unit-item")[0].click(); 0');
        const firstMcq = await b.eval(`(() => { const p = [...document.querySelectorAll(".li-prob")].find(x => x.querySelector(".li-opt")); return p.id; })()`);
        // 点一个错误选项
        const clicked = await b.eval(`(() => { const p = document.getElementById(${JSON.stringify(firstMcq)});
            const u = window.LI_UNITS[0]; const idx = +p.id.split("-")[2] - 1; const ans = "abcde".indexOf(u.problems[idx].a);
            const wrong = [...p.querySelectorAll(".li-opt")].findIndex((_, k) => k !== ans);
            p.querySelectorAll(".li-opt")[wrong].click(); return { wrong, ans }; })()`);
        const after = await b.eval(`(() => { const p = document.getElementById(${JSON.stringify(firstMcq)});
            return { cls: p.className, correct: p.querySelectorAll(".li-opt.correct").length, wrong: p.querySelectorAll(".li-opt.wrong").length,
                     ansVisible: !p.querySelector(".li-answer").classList.contains("hide"), saved: JSON.parse(localStorage.getItem("liProgress_v1")||"{}") }; })()`);
        check('答错: 题卡标红 + 显示正确/错误选项 + 展开讲解', after.cls.includes('bad') && after.correct === 1 && after.wrong === 1 && after.ansVisible, JSON.stringify(after) + JSON.stringify(clicked));
        check('答错: 进度写入 localStorage', after.saved[firstMcq.slice(5)] === 'wrong', JSON.stringify(after.saved));
        check('答错: 单元头部与侧栏的进度同步更新', (await b.eval('document.getElementById("unit-progress").textContent')).includes('1/6') && (await b.eval('document.querySelector(".li-side h4").textContent')).includes('1/144'));
        await b.shot('03_answered');
        // 重做
        await b.eval(`document.querySelector("#${firstMcq} [data-act=redo]").click(); 0`);
        check('重做: 进度清除', (await b.eval('Object.keys(JSON.parse(localStorage.getItem("liProgress_v1")||"{}")).length')) === 0);
        // 填空题：显示答案 + 自评
        const openPid = await b.eval(`(() => { const p = [...document.querySelectorAll(".li-prob")].find(x => !x.querySelector(".li-opt")); return p.id; })()`);
        await b.eval(`document.querySelector("#${openPid} [data-act=reveal]").click(); 0`);
        check('填空题: 点击后显示答案', (await b.eval(`!document.querySelector("#${openPid} .li-answer").classList.contains("hide")`)));
        await b.eval(`document.querySelector("#${openPid} [data-act=ok]").click(); 0`);
        check('填空题: 自评 ✓ 后记录为 ok', (await b.eval('JSON.parse(localStorage.getItem("liProgress_v1")||"{}")["' + openPid.slice(5) + '"]')) === 'ok');

        // ---- 讲次反查 ----
        await b.eval('document.querySelector("#li-tabs [data-view=lectures]").click(); 0');
        check('讲次: 默认四年级 64 行', (await b.eval('document.querySelectorAll(".li-lec-row:not(.head)").length')) === 64);
        check('讲次: 有"基本不涉及"的灰色行', (await b.eval('document.querySelectorAll(".li-lec-row.skip").length')) > 5);
        const href = await b.eval('document.querySelector(".li-lec-row .li-file:not(.off)").getAttribute("href")');
        check('讲次: 文件链接已 URL 编码', /%E6%9D%8E/.test(href), href);
        await b.eval('document.querySelector("[data-act=lec-grade][data-g=\\"3\\"]").click(); 0');
        check('讲次: 三年级 59 行', (await b.eval('document.querySelectorAll(".li-lec-row:not(.head)").length')) === 59);
        await b.eval('document.querySelector("[data-act=lec-grade][data-g=\\"5\\"]").click(); 0');
        check('讲次: 五六年级只列被引用的 10 讲', (await b.eval('document.querySelectorAll(".li-lec-row:not(.head)").length')) === 10);
        await b.shot('04_lectures');

        // ---- 缺口 ----
        await b.eval('document.querySelector("#li-tabs [data-view=gaps]").click(); 0');
        check('缺口: 3 个板块', (await b.eval('document.querySelectorAll("#gaps-container .li-box").length')) === 3);
        check('缺口: 缺口/间接知识点 11 个', (await b.eval('document.querySelectorAll("#gaps-container .li-box")[0].querySelectorAll(".li-gap").length')) === 11);
        await b.shot('05_gaps');

        // ---- 抽题 ----
        await b.eval('document.querySelector("#li-tabs [data-view=practice]").click(); 0');
        check('抽题: 渲染一道题', (await b.eval('document.querySelectorAll("#practice-container .li-prob").length')) === 1);
        await b.eval('document.getElementById("pf-lv").value="3"; document.querySelector("[data-act=practice-go]").click(); 0');
        const lv3 = await b.eval('document.querySelector("#practice-container .li-badge").textContent');
        check('抽题: 筛选"挑战"后题型正确', lv3 === '挑战', lv3);
        await b.eval('document.querySelector("[data-act=practice-next]").click(); 0');
        check('抽题: 下一题不报错', (await b.eval('document.querySelectorAll("#practice-container .li-prob").length')) === 1);
        await b.shot('06_practice');

        // ---- 深链 ----
        await b.goto(fileUrl('li.html', '?view=units&unit=u12'));
        check('深链: ?view=units&unit=u12 打开阴影面积单元', (await b.eval('document.querySelector(".li-main h2").textContent')).includes('阴影面积'));
        await b.goto(fileUrl('li.html', '?point=38'));
        check('深链: ?point=38 打开逻辑推理单元', (await b.eval('document.querySelector(".li-main h2").textContent')).includes('逻辑推理'));
        await b.goto(fileUrl('li.html', '?ref=4-47'));
        check('深链: ?ref=4-47 高亮等差数列(一)', (await b.eval('document.querySelector(".li-lec-row.hl") && document.querySelector(".li-lec-row.hl").textContent')).includes('等差数列'));

        // ---- 其他页面的导航入口 ----
        for (const f of ['index.html', 'german.html', 'pangu.html', 'xes.html', 'bridge.html', 'ak4-knowledge-expand.html', 'knowledge-points.html']) {
            await b.goto(fileUrl(f));
            check(`${f}: 有指向 li.html 的入口`, (await b.eval('!!document.querySelector("a[href=\\"li.html\\"]")')) === true);
        }

        check('无未处理异常 / console.error', b.errors.length === 0, b.errors.slice(0, 5).join(' | '));
    } finally {
        await b.close();
    }
    log(`\n结果: ${pass} 通过, ${fail} 失败` + (SHOTS ? `  截图: ${shotDir}` : ''));
    fs.writeFileSync(path.join(__dirname, 'ui_smoke_li_out.txt'), out.join('\n'), 'utf8');
    process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); fs.writeFileSync(path.join(__dirname, 'ui_smoke_li_out.txt'), 'CRASH ' + e.stack, 'utf8'); process.exit(2); });
