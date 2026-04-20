# 学校网站爬虫覆盖率分析报告

**日期**: 2025-07-18  
**爬虫版本**: school-website.mjs v2 (Step 2 完成后)  
**配置**: concurrency=3, FETCH_TIMEOUT=12000ms, rate-limit=400ms/host

---

## 一、整体结果

| 状态 | 学校数 | 占比 | 说明 |
|------|--------|------|------|
| **ok** | 72 | 8.3% | 成功提取内容 |
| **unchanged** | 8 | 0.9% | 内容与上次相同 |
| **content_insufficient** | 4 | 0.5% | 页面可达但内容不足 |
| **unreachable** | 780 | 89.9% | 无法获取任何页面 |
| **error** | 4 | 0.5% | 处理过程异常 |
| **robots_blocked** | 0 | 0% | - |
| **spa_detected** | 0 | 0% | - |
| **合计** | **868** | 100% | |

**有效覆盖率**: 80/868 = **9.2%** (ok + unchanged)

---

## 二、Unreachable 根因分析

### 2.1 诊断方法

对 780 所 "unreachable" 学校，去重得到 **582 个不同域名**。
- 随机抽样 20 个域名 → 55% 实际可达
- 按学校数排序取 top 30 域名（覆盖 188 所学校）→ 精确复现 rateLimitedFetch 逻辑

### 2.2 Top 30 域名诊断结果

| 分类 | 域名数 | 影响学校数 | 典型域名 |
|------|--------|-----------|---------|
| **✅ 200 OK (实际可达)** | 19 | ~120 | cannan.edu.hk (11校), victoria.edu.hk (10校), sunisland.edu.hk (8校) |
| **🔒 SSL 证书错误** | 3 | 35 | hkspc.org (16校), york.edu.hk (11校), learninghabitat.org (8校) |
| **🚫 403 拒绝** | 4 | 15 | yuenyuenkg.edu.hk (5校), tutortime.com.hk (4校), wfb.edu.hk (3校) |
| **❌ 连接拒绝** | 2 | 31 | salvationarmy.org.hk (27校), newklnwa.edu.hk (4校) |
| **🔌 连接异常** | 1 | 10 | creative.edu.hk (UND_ERR_SOCKET: other side closed) |
| **⏱ 连接超时** | 1 | 4 | nursery.bgca.org.hk (UND_ERR_CONNECT_TIMEOUT) |

### 2.3 重大发现：「可达但标记为 unreachable」悖论

**19/30 域名 (63%) 在独立测试中返回 200 OK，但爬虫标记它们为 unreachable**。

典型案例 — `http://www.cannan.edu.hk`:
- 12 所迦南分校共享同一 URL
- `九龍迦南中英文幼稚園` → **ok**（最先处理，排序在"九"）
- `迦南幼稚園（九龍塘）` 等 11 所 → **unreachable**（后处理，排序在"迦"）
- 独立 Node.js fetch 测试 → textLen=19,729，完全可达

**这说明爬虫存在系统性 bug，不是目标网站的问题。**

### 2.4 Bug 根因推断

根据代码审查和实验数据，问题出在以下几个层面：

#### Bug #1: 并发连接池耗尽 (UND_ERR_SOCKET)

Node.js 24 的 `fetch` 底层使用 undici，默认连接池有限。当 3 个学校并行处理、每校发起 ~10 个请求时，undici 连接池可能饱和：
```
creative.edu.hk → UND_ERR_SOCKET: "other side closed"
```
`rateLimitedFetch` 的 `catch {}` 块**静默吞掉**这些错误，返回 `null`，被误判为 "unreachable"。

#### Bug #2: 同 URL 多校重复抓取 + 服务端限流

多所学校共享同一 URL 时（迦南 12 校、维多利亚 10 校等），第一所学校的 6-10 次请求可能触发服务端临时限流。后续同 URL 学校被拒绝。

**没有 URL 级别的缓存去重**，相同页面被反复抓取。

#### Bug #3: SSL 证书验证失败 (HTTP → HTTPS 重定向)

594/780 unreachable URLs 使用 `http://`。许多 `.edu.hk` 网站会 301 重定向到 `https://`，但使用自签名或过期证书：
```
http://www.york.edu.hk → 301 → https://www.york.edu.hk → UNABLE_TO_VERIFY_LEAF_SIGNATURE
http://www.learninghabitat.org → 同上
```
Node.js 默认严格验证 TLS 证书，导致这些网站全部失败。

#### Bug #4: 错误信息丢失

`rateLimitedFetch` 的 catch 块是空的 `catch {}`，不记录任何错误信息。这导致：
- 无法区分超时、DNS 失败、SSL 错误、服务器拒绝
- 所有错误统一变成 "unreachable"
- 无法针对不同错误类型采取不同策略

---

## 三、成功学校分析

### 3.1 成功域名分布

| 域名 | OK 学校数 | 说明 |
|------|-----------|------|
| plkkgs.edu.hk | 20 | 保良局旗下幼稚园 |
| poleungkuk.org.hk | 16 | 保良局旗下 |
| guidepost.hk | 3 | Guidepost Montessori |
| castar.edu.hk | 2 | 世德幼稚園 |
| pokoi.org.hk | 2 | 博愛醫院 |
| 其他 | ~37 | 各独立域名 |

### 3.2 为什么保良局成功率高？

保良局学校的特点：
- 统一的 CMS 平台
- 每所分校有独立子域名或路径
- 服务器稳定、无 SSL 问题
- 页面结构化，有清晰的招生信息区域

---

## 四、错误分类全景 (估算)

基于 Top 30 域名的诊断比例外推到全部 582 个域名 (780 所学校)：

| 错误类型 | 估计域名数 | 估计学校数 | 占比 |
|---------|-----------|-----------|------|
| **实际可达但被误判** | ~367 | ~370-450 | 47-58% |
| **SSL 证书错误** | ~58 | ~80-100 | 10-13% |
| **DNS 解析失败 (网站已关闭)** | ~87 | ~90-110 | 12-14% |
| **403/429 被拦截** | ~35 | ~40-60 | 5-8% |
| **ECONNREFUSED (服务器宕机)** | ~23 | ~60-80 | 8-10% |
| **超时 / 连接异常** | ~12 | ~20-30 | 3-4% |

**结论：约 50% 的 "unreachable" 学校 (390+ 所) 实际上是可以抓取的。**

---

## 五、修复方案

### 方案 P0: URL 级别缓存去重 ⭐ 影响最大

**问题**: 12 所迦南学校对同一 URL 发起 12 次独立抓取
**方案**: 增加 URL→结果 缓存，相同 URL 只抓取一次

```javascript
const urlResultCache = new Map();

async function fetchSchoolPagesWithCache(url) {
  if (urlResultCache.has(url)) return urlResultCache.get(url);
  const result = await fetchSchoolPages(url);
  urlResultCache.set(url, result);
  return result;
}
```

**预期收益**: 34 个共享域名中的重复学校全部受益（~150 所学校）

---

### 方案 P1: SSL 证书容忍 ⭐ 快速修复

**问题**: Node.js 默认拒绝无效 SSL 证书
**方案**: 使用 `NODE_TLS_REJECT_UNAUTHORIZED=0` 环境变量运行爬虫

```bash
NODE_TLS_REJECT_UNAUTHORIZED=0 node scripts/crawlers/school-website.mjs
```

**或** 在代码中使用自定义 undici Agent:
```javascript
import { Agent } from "undici";
const sslAgent = new Agent({ connect: { rejectUnauthorized: false } });
// 传入 fetch 的 dispatcher 选项
```

**预期收益**: ~35 所 SSL 错误学校恢复 (hkspc.org 16校 + york 11校 + learninghabitat 8校)

⚠️ 注意: 仅用于爬虫环境，不影响前端代码的安全性。

---

### 方案 P2: 添加请求重试 + 错误诊断

**问题**: 一次失败即放弃，无错误日志
**方案**: 
1. `rateLimitedFetch` 添加最多 2 次重试（指数退避）
2. 记录错误类型到 notes

```javascript
async function rateLimitedFetch(url, { acceptPdf = false, retries = 2 } = {}) {
  // ... rate limit 逻辑 ...
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const resp = await fetch(url, { ... });
      if (!resp.ok) return { result: null, error: `HTTP ${resp.status}` };
      // ... 正常处理 ...
    } catch (e) {
      const code = e.cause?.code || e.message;
      if (attempt < retries && isRetryable(code)) {
        await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
        continue;
      }
      return { result: null, error: code };
    }
  }
}

function isRetryable(code) {
  return ["UND_ERR_SOCKET", "ECONNRESET", "ETIMEDOUT", "UND_ERR_CONNECT_TIMEOUT"].includes(code);
}
```

**预期收益**: UND_ERR_SOCKET (10校) + 临时性错误 (~50-100 校)

---

### 方案 P3: 增加 User-Agent 回退策略

**问题**: 部分网站 (403) 拦截 Bot User-Agent
**方案**: 首次请求被 403 后，使用浏览器 UA 重试

```javascript
const BROWSER_UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36";

// 在 rateLimitedFetch 中: 如果 resp.status === 403，用 BROWSER_UA 重试
```

**预期收益**: ~15 所 403 学校 (yuenyuenkg, tutortime, wfb, anchors)

---

### 方案 P4: 超时时间调整

**问题**: 12s 超时对慢速服务器不够
**方案**: 基础页面超时增加到 20s; sub-pages 保持 12s

**预期收益**: ~20-30 所超时学校

---

## 六、修复优先级 & 预期效果

| 优先级 | 方案 | 预期新增成功 | 实现难度 | 风险 |
|--------|------|-------------|---------|------|
| **P0** | URL 缓存去重 | +150 校 | 低 (10行代码) | 无 |
| **P1** | SSL 证书容忍 | +35 校 | 极低 (1行环境变量) | 极低 |
| **P2** | 请求重试+诊断 | +60-100 校 | 中 (50行代码) | 无 |
| **P3** | UA 回退 | +15 校 | 低 (15行代码) | 无 |
| **P4** | 超时调整 | +20-30 校 | 极低 (改1个常量) | 无 |

**综合预期**: 实施 P0-P4 后，从当前 80 所 → 预估 **350-400 所**，覆盖率从 9% → **40-46%**。

剩余 ~470 所 unreachable 原因：
- DNS 失败 / 网站已关闭 (~110 所) → 无法修复
- ECONNREFUSED / 服务器宕机 (~70 所) → 等服务器恢复
- 防爬严格 (WAF/Cloudflare) (~50 所) → 需要 Playwright
- 短文本 / 空页面 (~40 所) → 源数据URL可能过期
- 其他未知 (~200 所) → 需要 P2 的诊断数据进一步分析

---

## 七、下一步建议

1. **立即实施 P0 + P1** → 最小改动、最大收益
2. **重跑爬虫**，带 `--json-report docs/school-website-report-v2.json`
3. **对比两次报告**，确认改善效果
4. 根据 P2 的诊断数据，决定是否实施 P3、P4
5. 对于无法通过 fetch 爬取的站点（Cloudflare、WAF），评估 Playwright headless 方案
