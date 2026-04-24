# V1 爬虫扩展交付规划（AI 开发者执行手册）

> Superseded 2026-04-22: `babykingdom-preview.mjs` / `bkmilk.mjs` 已确认是错误方向或失效来源。生产化路线改为 `edu-kingdom.com`，见 `scripts/crawlers/edu-kingdom.mjs` 和 `docs/edu-kingdom-status.md`。

> 本文件是外部 AI 开发者（Claude Code / ChatGPT / Copilot 等）实施 V1 爬虫扩展的完整 handoff 文档。每个 Task 都可独立完成，建议按顺序执行。

---

## 背景

**目前状态**：
- 小红书（XHS）封控严重，**自动 cron 已停**（2026-04-22），用户正在准备新账号 + 换运行环境，**V1 范围内不重启**
- Baby Kingdom（`babykingdom-preview.mjs`）和 BK Milk（`bkmilk.mjs`）爬虫**已实现但未接 cron**，处于休眠
- `social_posts_raw` 表已支持多 platform，`extract-reputation.mjs` 已是平台无关聚合器
- Claude API 走 aipaibox 代理（`extract-reputation.mjs` 内部已适配 `ANTHROPIC_BASE_URL` + `ANTHROPIC_AUTH_TOKEN`）
- **默认模型：Claude Opus 4.7**（`claude-opus-4-7`），通过 `ANTHROPIC_MODEL` env var 可覆盖。用户策略：优选最新最强模型，追求摘要质量

**V1 目标**（不扩大范围）：
1. 激活 Baby Kingdom，月频入库
2. 激活 BK Milk，半月频入库
3. 端到端验证：Baby Kingdom + BK Milk 数据 → `social_posts_raw` → `extract-reputation.mjs` 用 Opus 4.7 聚合 → `school_enrichments`

**明确排除**：XHS 重启（等用户账号就绪）、Facebook、知乎、家长帮、公众号、Threads、Kimi/其他模型切换。

---

## Task 1：激活 Baby Kingdom

### 交付物
新建 `.github/workflows/crawl-babykingdom.yml`。

### 实施步骤

1. **先读** [scripts/crawlers/babykingdom-preview.mjs](babykingdom-preview.mjs)（370 行），确认：
   - 是否支持 `--limit N`、`--dry-run`、`--concurrency N` CLI 参数
   - 速率控制是否 ≥ 3 秒/请求（看 `hostLastRequest` 或类似 Map）
   - robots.txt 是否正确解析
   - 错误处理是否 warn-continue 而非 throw（不应因单个学校失败整体崩）

2. **如缺参数**：模仿 [crawl-social-posts.yml](../.github/workflows/crawl-social-posts.yml) 的 xhs-posts.mjs 参数解析方式补上。**不要改爬虫核心逻辑**。

3. **新建 workflow**，模板仿 [crawl-activities.yml](../.github/workflows/crawl-activities.yml)：

   ```yaml
   name: Crawl Baby Kingdom
   on:
     workflow_dispatch:
       inputs:
         limit:
           description: "Max threads (0 = default)"
           default: "0"
         dry_run:
           description: "Log only, no DB writes"
           default: "false"
     schedule:
       - cron: "0 4 1 * *"  # 每月 1 号 04:00 UTC (12:00 HKT)

   permissions:
     contents: read

   jobs:
     crawl:
       runs-on: ubuntu-latest
       timeout-minutes: 45
       env:
         NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
         SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: "20"
             cache: "npm"
         - run: npm install --no-save @supabase/supabase-js playwright cheerio
         - run: npx playwright install --with-deps chromium
         - name: Crawl Baby Kingdom
           run: |
             ARGS=""
             [ "${{ inputs.limit }}" != "0" ] && ARGS="--limit ${{ inputs.limit }}"
             [ "${{ inputs.dry_run }}" = "true" ] && ARGS="$ARGS --dry-run"
             node scripts/crawlers/babykingdom-preview.mjs $ARGS
         - name: Summary
           if: always()
           run: echo "Baby Kingdom crawl complete."
   ```

### 验收
- 手动 `workflow_dispatch` 跑一次，`limit=10`，成功无 429/503
- `SELECT COUNT(*), MAX(fetched_at) FROM social_posts_raw WHERE platform='babykingdom'` 返回 ≥ 10 条，`fetched_at` 为今天
- `school_matches` JSONB 非空的比例 > 30%

### 不要做
- ❌ 改爬虫内部解析逻辑
- ❌ 改抓取频率为日频（月频是深思熟虑的，BK 内容更新慢）
- ❌ 加 ANTHROPIC secret（此 workflow 不调 AI）

---

## Task 2：激活 BK Milk

### 交付物
新建 `.github/workflows/crawl-bkmilk.yml`。

### 实施步骤

1. **先读** [scripts/crawlers/bkmilk.mjs](bkmilk.mjs)（379 行），确认：
   - RSS feed URL 是否 hardcoded 或可配置
   - 有无 fallback 到 listing 页面的路径（应该有）
   - 参数是否齐全（`--limit`、`--dry-run`）

2. **新建 workflow**，比 Baby Kingdom 更轻（不需要 Playwright）：

   ```yaml
   name: Crawl BK Milk
   on:
     workflow_dispatch:
       inputs:
         limit:
           default: "0"
         dry_run:
           default: "false"
     schedule:
       - cron: "0 5 1,15 * *"  # 每月 1 号、15 号 05:00 UTC

   permissions:
     contents: read

   jobs:
     crawl:
       runs-on: ubuntu-latest
       timeout-minutes: 20
       env:
         NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
         SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: "20"
             cache: "npm"
         - run: npm install --no-save @supabase/supabase-js cheerio
         - name: Crawl BK Milk
           run: |
             ARGS=""
             [ "${{ inputs.limit }}" != "0" ] && ARGS="--limit ${{ inputs.limit }}"
             [ "${{ inputs.dry_run }}" = "true" ] && ARGS="$ARGS --dry-run"
             node scripts/crawlers/bkmilk.mjs $ARGS
         - name: Summary
           if: always()
           run: echo "BK Milk crawl complete."
   ```

### 验收
- 手动跑一次，`limit=20`，拉到 ≥ 20 篇
- `SELECT COUNT(*), MAX(fetched_at) FROM social_posts_raw WHERE platform='bkmilk'` 有记录
- 抽查 3-5 条，`raw_text` 看起来是正常文章摘要

---

## Task 3（已由用户自行处理）：小红书保持停跑

**不要重启 XHS 自动抓取**。用户决定：

- [../.github/workflows/crawl-social-posts.yml](../.github/workflows/crawl-social-posts.yml) 的 schedule 已注释掉，仅保留 `workflow_dispatch` 手动触发
- 用户正在准备新账号 + 换运行环境（IP、cookie、UA 指纹等），**未完成前不跑**
- AI 开发者**不要**动这个 workflow、不要改 XHS Python 脚本、不要建 `targets.json`、不要取消注释 cron
- 如果发现 XHS workflow 异常，跳过 → 告知用户，**不自行修复**

用户就绪后会单独发任务，届时才做定向搜索改造（`--targets`、频率调整等）。

---

## Task 4（可选）：监控告警

### 前置
用户是否已有 Telegram bot？如无 → 跳过此 Task。如有 → 问用户拿 `TELEGRAM_BOT_TOKEN` 和 `TELEGRAM_CHAT_ID`，设成 GitHub Secrets。

### 实施
在每个 crawl-* workflow 末尾加：
```yaml
- name: Notify on failure
  if: failure()
  run: |
    curl -s -X POST "https://api.telegram.org/bot${{ secrets.TELEGRAM_BOT_TOKEN }}/sendMessage" \
      -d "chat_id=${{ secrets.TELEGRAM_CHAT_ID }}" \
      -d "text=❌ ${{ github.workflow }} failed. Run: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}"
```

---

## 端到端验证（用户最终 sign-off）

所有 Task 完成后，按顺序：

1. **Supabase secrets 已全**：`NEXT_PUBLIC_SUPABASE_URL`、`SUPABASE_SERVICE_ROLE_KEY`、`ANTHROPIC_AUTH_TOKEN`、`ANTHROPIC_BASE_URL` 均已在 GitHub repo Secrets 里（默认模型 `claude-opus-4-7` 已在 workflow 里设好，如要覆盖加 GitHub Variable `ANTHROPIC_MODEL`）
2. 手动触发 `crawl-babykingdom` + `crawl-bkmilk`，各 `limit=10`
3. 手动触发 `extract-reputation`，`dry_run=true limit=3`，日志应有 `Claude summary generated (xxx chars)` 且 `model=claude-opus-4-7`；无 401/402/403
4. SQL 验证：
   ```sql
   SELECT platform, COUNT(*), MAX(fetched_at) AS latest
   FROM social_posts_raw
   WHERE fetched_at > NOW() - INTERVAL '1 day'
   GROUP BY platform;
   ```
   期望：2 行（babykingdom / bkmilk）——**XHS 不应出现**，因其自动 cron 已停
5. 再跑一次 `extract-reputation` 不 dry_run：
   ```sql
   SELECT s.name_tc, e.reputation_summary, e.source_count_by_platform
   FROM school_enrichments e JOIN schools s ON s.id = e.school_id
   WHERE e.source_count_by_platform ? 'babykingdom' OR e.source_count_by_platform ? 'bkmilk'
   LIMIT 10;
   ```
   期望：有学校的 `source_count_by_platform` 里同时出现多个 platform 的计数

---

## 绝对不要做

- ❌ 把 V2 deferred 源（FB、知乎、家长帮、公众号）"顺手"加进来
- ❌ **重启 XHS 自动 cron**（用户账号准备中，未授权前保持停跑）
- ❌ 改 `social_posts_raw` / `school_enrichments` schema（已就绪）
- ❌ 改 `extract-reputation.mjs` 的 Stage 1 关键词字典（用户要亲自调）
- ❌ 把 Claude Opus 4.7 换成 Kimi 或其他模型（用户策略：先用完 aipaibox 额度）
- ❌ 为省钱擅自降级到 Haiku/Sonnet（如要改，必须改 `ANTHROPIC_MODEL` env，不要改代码默认值）
- ❌ 删 `ANTHROPIC_API_KEY` fallback（留着方便切回直连 Anthropic）
- ❌ 改 `runs-on` 为 `macos-latest`（macOS runner 比 Linux 贵 10 倍）
- ❌ 在 `social_posts_raw` 里存全文（raw_text 已硬编码 2000 char 截断，保持）
- ❌ 在任何公开 API 路径暴露 `social_posts_raw` 原始数据

## 通讯与 commit 约定

- 每个 Task 独立 PR
- Commit 信息格式：`crawler: activate babykingdom monthly cron` 或 `crawler: downgrade xhs to weekly targeted mode`
- 遇 Baby Kingdom / BK Milk 反爬命中 → **降频而非绕过**（周→月，月→季），立即告知用户
- aipaibox 401/403 → 不要重试，直接 fail 并告知用户换 token

---

## V2 推迟清单（等用户达到条件再启动）

| 源 | 启动条件 | 难度 |
|---|---|---|
| Facebook 公开 Page | V1 稳定后 | 中 |
| 知乎 | Top 100 扩到内地国际校 | 中 |
| 家长帮 | 法务审核后 | 高（登录+验证码）|
| 公众号 | 有合规合作方后 | 高（生态封闭）|

用户现有暂缓功能：A 面试陪练、B 叩门信——当 K2/K3 家长用户 > 100 或进入升小季时重启。届时这些新源才值得加，用于喂新功能的主观语料。
