# 学校数据执行清单

更新时间：2026-04-23

## 目标

- 继续以官方链路作为学校主数据底座：KGP / EDB / 学校官网
- 新增 `Schooland` 作为第三方结构化补充源
- 保持讨论层与媒体层分离，不把论坛/媒体内容混入学校事实字段

## 本次执行范围

- 已完成：确认现有主链路状态
- 已完成：确认 `Schooland` 为当前最适合新增的结构化目录源
- 已完成：开发 `scripts/crawlers/schooland-kg.mjs`
- 已完成：全量抓取 `Schooland` 幼稚园详情页并生成本地快照
- 已完成：增强二次匹配（完整网址、别名、分校名）
- 已完成：生成平台标准 `Schooland` enrichment JSON + seed SQL
- 已完成：接入 `scripts/apply_school_enrichment.mjs`

## 执行步骤

1. 运行小样本验证

```bash
npm run crawl:schooland:kg -- --dry-run --limit 12 --detail-limit 12
```

通过标准：

- `crawled_detail_rows > 0`
- `matched_rows > 0`
- `detail_errors = 0` 或仅少量可解释错误

2. 运行全量抓取

```bash
npm run crawl:schooland:kg
```

产物：

- `data/schooland_kg_snapshot.json`
- `docs/schooland-kg-report.json`

当前结果：

- `total_listed = 987`
- `matched_rows = 873`
- `unmatched_rows = 114`
- `detail_errors = 0`
- `match_rate = 88.45%`

3. 生成平台 enrichment 产物

```bash
npm run build:schooland:enrichment
```

产物：

- `data/schooland_profile_enrichment.json`
- `docs/schooland-profile-enrichment-report.json`
- `supabase/seed/009_schooland_profile_enrichment.sql`

4. 应用到平台数据层

```bash
node scripts/apply_school_enrichment.mjs --dry-run
```

非 dry-run 时会一并应用：

- `edb_fee_enrichment.json`
- `private_international_profile_enrichment.json`
- `private_international_vacancy_enrichment.json`
- `schooland_profile_enrichment.json`

5. 验证输出

- 检查总抓取行数
- 检查学校匹配率
- 抽查未匹配样本是否为多校共用网站、旧名、或现有平台缺失学校
- 抽查详情字段：学费、地址、学校类别、上课时间、办学规模、教职员规模

## 数据使用原则

- 官方数据优先级高于 `Schooland`
- `Schooland` 当前仅用于补充 `website`、`fee_annual_hkd`、`fee_notes`、`other_fees_note` 等平台标准字段
- `Schooland` 不写入 vacancy、申请开放状态等高时效字段
- 对未匹配学校不落库；只导出已匹配记录

## 已知限制

- `Schooland` 的 `/ajax/` 路径被 robots 禁止，因此 crawler 改为抓取 18 区静态页 + 学校详情页
- 部分详情页共用同一网站域名，学校匹配可能需要依赖地址或名称 disambiguation
- 仍有 `114` 条未匹配，主要是共享域名、多校集团和本地/国际命名差异，需要后续补分校 alias
- 现阶段已提供本地 JSON、seed SQL 和 apply 脚本接入口，但是否真正写入线上库仍取决于运行环境中的 Supabase 凭证