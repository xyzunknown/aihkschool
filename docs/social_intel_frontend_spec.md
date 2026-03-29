# 社交平台数据前端展示 — 详细开发规划

> **Context**: 小红书抓取数据（面试经验、费用、时间线、情感评价）已完成结构化处理并写入数据库（`social_intel` + `social_summary` 两张表）。本文档是前端展示的完整开发规划，涉及 4 个页面的修改/新增。
>
> **抓取技术方案**: 见 `docs/xiaohongshu_scraping_spec.md`（数据库表结构、字段定义、聚合逻辑均在该文档中）

---

## 全局规则（贯穿所有页面）

### 文案规范
- **不显示「小红书」字样** — 所有地方统一用「社交平台」
- **数据来源标注统一为**：「數據來源：網絡公開內容整理，僅供參考」
- 费用模块标题：「家長預估費用」（不是"家长回报费用"）
- 面试分享数量：「X 位家長分享」（不是 X 篇，因为一个家长可能发了多篇帖子但只算一个人）
- 未指定分校的数据：标注「此分享未指定具體分校」

### 显示阈值规则
| 模块 | 最低数据要求 | 不满足时 |
|------|-------------|---------|
| 首页热度榜 | 至少 10 所学校有 social_summary 数据 | 不渲染该 section |
| 学校卡片「熱門」标签 | heat_rank_overall ≤ 50 | 不显示标签 |
| 学校卡片家长预估费用 | fee_estimates 中某项 count ≥ 3 | 不显示 |
| 详情页面试资讯 Section | interview_posts ≥ 3 | 不渲染该 section |
| 面试关键词 pills | 至少 3 个关键词频次 ≥ 2 | 不显示关键词区域 |
| 情感分布 | total_posts ≥ 5 | 不显示情感区域 |
| 负面「需留意」关键词 | 单词频次 ≥ 3 | 该词不显示 |
| 详情页申请时间线 Section | timeline_summary 中至少 3 个事件类型有数据 | 不渲染该 section |
| 竞争度标签 | competition_level 有值且相关信号 ≥ 3 条 | 不显示 |
| 家长预估费用详情 | 每种费用类型 count ≥ 3 | 该费用类型不显示 |

### 设计系统遵循
- 卡片：复用 `GlassCard` 组件（`bg-white rounded-2xl border border-slate-200 p-6`，variant="content"）
- Section 结构：`<section className="mb-8">` + `<h2 className="text-xl font-semibold text-slate-950 mb-4">`
- 标签/Pills：`px-3 py-1.5 rounded-full text-xs font-medium`
- 颜色只用于状态，不用于装饰。新增模块颜色统一用 slate 灰色系
- 数据来源标签复用 `SourceTag` 组件模式（`px-2 py-0.5 rounded-md text-xs font-medium`）

---

## 一、数据层（最先开发）

### 1.1 TypeScript 类型定义

**修改文件**：`src/types/database.ts`

新增以下类型：

```typescript
// social_summary 表对应类型
export interface SocialSummary {
  id: string;
  school_id: string;
  school_code: string;
  total_posts: number;
  total_engagement: number;
  heat_rank_overall: number | null;
  heat_rank_district: number | null;
  interview_posts: number;
  top_interview_keywords: [string, number][]; // [关键词, 频次]
  interview_format_distribution: Record<string, number>; // {group: 9, individual: 2, ...}
  avg_interview_duration: number | null; // 分钟
  parent_interview_pct: number | null; // 0-100
  interview_contributor_count: number;
  sentiment_distribution: { positive: number; neutral: number; negative: number };
  positive_keywords: Record<string, number>; // {关键词: 频次}
  negative_keywords: Record<string, number>;
  fee_estimates: Record<string, { low: number; high: number; count: number }>;
  // fee_type: textbook/uniform/activity/snack/bus/registration/deposit/other
  timeline_summary: Record<string, { typical_month: number; count: number }>;
  // event_type: application_open/application_close/interview_notice/interview/result/offer_deadline
  competition_level: 'high' | 'medium' | 'low' | null;
  data_year_range: string | null; // "2022-2025"
  last_updated: string;
  created_at: string;
}

// 排行榜项（首页 + 排行页用）
export interface HeatRankingItem {
  school_id: string;
  school_code: string;
  name_tc: string;
  name_en: string | null;
  district: string;
  school_type: string;
  total_posts: number;
  total_engagement: number;
  interview_posts: number;
  heat_rank_overall: number;
  heat_rank_district: number | null;
  competition_level: string | null;
}
```

### 1.2 数据库查询函数

**新增文件**：`src/lib/db/socialIntel.ts`

遵循现有 `src/lib/db/schools.ts` 和 `src/lib/db/intel.ts` 的模式。

```typescript
import { createServerClient } from '@/lib/supabase/server';

// 获取单个学校的社交平台聚合数据（详情页用）
export async function fetchSocialSummary(schoolId: string): Promise<SocialSummary | null> {
  // SELECT 所有字段 FROM social_summary WHERE school_id = $1
  // 返回 null 如果该校无数据
}

// 获取热度排行榜（首页 Top 10 / 排行页分页）
export async function fetchHeatRanking(options: {
  district?: string;         // 按区筛选
  limit?: number;            // 默认 10
  offset?: number;           // 默认 0
}): Promise<{ data: HeatRankingItem[]; count: number }> {
  // JOIN social_summary + schools
  // SELECT social_summary 的热度字段 + schools 的 name_tc, name_en, district, school_type
  // WHERE schools.is_active = true
  // ORDER BY heat_rank_overall ASC (或 heat_rank_district ASC if district filter)
  // 注意：不要用 SELECT *，明确列出所有列名
}

// 批量获取多个学校的社交平台摘要（列表页用，避免 N+1 查询）
export async function fetchSocialSummariesBySchoolIds(
  schoolIds: string[]
): Promise<Record<string, SocialSummary>> {
  // SELECT ... FROM social_summary WHERE school_id IN ($1, $2, ...)
  // 返回 {school_id: SocialSummary} 的 map
}

// 检查 social_summary 表是否存在（用于 migration fallback）
export async function hasSocialSummaryTable(): Promise<boolean> {
  // 尝试 SELECT 1 FROM social_summary LIMIT 1
  // 如果表不存在返回 false，前端优雅降级（不显示社交平台相关模块）
}
```

**重要**：遵循现有的 migration fallback 模式。如果 `social_summary` 表不存在（migration 未应用），前端应该优雅降级——不显示任何社交平台模块，不报错。在 `fetchSocialSummary` 和 `fetchHeatRanking` 中 try/catch，表不存在时返回 null/空数组。

---

## 二、首页（`/`）— 新增热度榜 Section

### 2.1 位置

在现有 sections 中间插入，新的顺序：

1. Hero Banner（BannerCarousel + HeroSearchBar）
2. 近期家長必知（ParentMustKnow）
3. **社交平台熱度榜（新增）** ← 插入这里
4. 消息動態（NewsFeed）
5. 精選名校（FeaturedSchools）
6. Footer

### 2.2 新增组件

**新增文件**：`src/components/home/HeatRanking.tsx`

```
组件类型：Server Component（数据在服务端获取）
Props：无（内部调用 fetchHeatRanking）
```

**布局**：

```
┌─────────────────────────────────────────────────────┐
│  社交平台熱度榜                       查看完整排行 →  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  │
│  │ 1       │ │ 2       │ │ 3       │ │ 4       │  │  ← 横向滚动
│  │ 學校名  │ │ 學校名  │ │ 學校名  │ │ 學校名  │  │
│  │ 地區    │ │ 地區    │ │ 地區    │ │ 地區    │  │
│  │ 42篇討論│ │ 38篇討論│ │ 35篇討論│ │ 30篇討論│  │
│  │ 15位分享│ │ 12位分享│ │ 10位分享│ │ 8位分享 │  │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘  │
│                                                     │
│  數據來源：網絡公開內容整理，僅供參考                    │
└─────────────────────────────────────────────────────┘
```

**样式规范**：
- 标题行：`<h2 className="text-xl font-semibold text-slate-950">社交平台熱度榜</h2>`，无副标题
- 「查看完整排行 →」链接在标题右侧，链接到 `/kg/ranking`，样式 `text-sm text-slate-500 hover:text-slate-900`
- 卡片容器：横向滚动，复用 ParentMustKnow 的 `overflow-x-auto snap-x snap-mandatory flex gap-4 pb-2 hide-scrollbar` 模式
- 单张卡片：`min-w-[180px] snap-start flex-shrink-0 rounded-2xl border border-slate-200 bg-white p-5`
- 排名数字：`text-2xl font-bold text-slate-300` 放在卡片左上角
- 学校名：`text-sm font-semibold text-slate-950` 最多 2 行，超出省略
- 地区标签：`text-xs text-slate-500`
- 讨论数/分享数：`text-xs text-slate-400`
- 底部来源标注：`text-xs text-slate-400 mt-3`，文案「數據來源：網絡公開內容整理，僅供參考」
- 点击整张卡片跳转到该学校详情页 `/kg/[id]`
- 显示 Top 10

**桌面端**：10 张卡片一行显示（可能需要横向滚动，或截取前 5 张固定显示 + "查看更多"）
**手机端**：横向滚动，每次露出 2.5 张卡片

### 2.3 修改文件

```
src/app/(public)/page.tsx              # 在 ParentMustKnow 和 NewsFeed 之间插入 <HeatRanking />
src/components/home/HeatRanking.tsx    # 新增
```

### 2.4 数据获取

在 `page.tsx` 的 Server Component 中调用 `fetchHeatRanking({ limit: 10 })`。如果返回空数组（表不存在或无数据），不渲染该 section。

---

## 三、新页面 `/kg/ranking` — 热度排行完整页

### 3.1 新增文件

```
src/app/(public)/kg/ranking/page.tsx           # Server Component 页面壳
src/app/(public)/kg/ranking/RankingClient.tsx   # Client Component 交互逻辑
src/components/schools/RankingCard.tsx          # 排行列表中的单行组件
```

### 3.2 页面布局

```
┌──────────────────────────────────────────────────────────────┐
│  ← 返回                         社交平台熱度排行              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  [全港] [中西區] [九龍城] [沙田] [灣仔] ...    ← 区域切换 pills │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ 1  迦南幼稚園（小西灣）                                   │  │
│  │    東區 · 非牟利                    42篇 · 15位面試分享   │  │
│  │    [競爭較高]                                           │  │
│  ├────────────────────────────────────────────────────────┤  │
│  │ 2  維多利亞（寶翠園）幼稚園                               │  │
│  │    中西區 · 私立獨立                 38篇 · 12位面試分享   │  │
│  │    [競爭較高]                                           │  │
│  ├────────────────────────────────────────────────────────┤  │
│  │ 3  ...                                                 │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  數據來源：網絡公開內容整理，僅供參考                            │
│                                                              │
│  [上一頁]  第 1 頁 / 共 5 頁  [下一頁]                        │
└──────────────────────────────────────────────────────────────┘
```

### 3.3 功能细节

**区域切换**：
- 默认「全港」，按 `heat_rank_overall` 排序
- 点击某区后，按 `heat_rank_district` 排序，只显示该区学校
- 区域 pills 复用 FilterBar 的样式：选中 `bg-slate-950 text-white`，未选 `bg-white text-slate-600 border border-slate-200`
- 区域筛选状态存入 URL query string：`/kg/ranking?district=kowloon_city`

**分页**：
- 每页 20 条
- 复用 KGListClient 的分页模式
- 页码存入 URL：`/kg/ranking?page=2`

**单行 RankingCard**：
- 左侧：排名数字（`text-xl font-bold text-slate-300`，前 3 名用 `text-slate-950`）
- 中间：学校名 + 地区标签 + 学校类型 + 竞争度标签（如有）
- 右侧：帖子数 + 面试分享数
- 整行可点击跳转到 `/kg/[id]`
- 竞争度标签样式：
  - 較高：`bg-red-50 text-red-700`
  - 一般：`bg-amber-50 text-amber-700`
  - 較低：`bg-emerald-50 text-emerald-700`

**ISR**：`revalidate = 86400`（每天刷新一次，因为社交数据不频繁更新）

---

## 四、学校列表页 `/kg` — SchoolCard 增强

### 4.1 数据流改造

**修改文件**：`src/app/(public)/kg/KGListClient.tsx`

SchoolData interface 新增字段：

```typescript
interface SchoolData {
  // ...现有字段保持不变...

  // 新增社交平台数据
  social_summary?: {
    heat_rank_overall: number | null;
    total_posts: number;
    interview_posts: number;
    competition_level: string | null;
    fee_estimates: Record<string, { low: number; high: number; count: number }> | null;
  } | null;
}
```

**数据获取**：在 `page.tsx` 的 Server Component 中，获取学校列表后，批量获取对应学校的 social_summary：

```typescript
// 已有：fetchSchools() → schools
// 新增：fetchSocialSummariesBySchoolIds(schools.map(s => s.id)) → socialMap
// 合并：schools.map(s => ({ ...s, social_summary: socialMap[s.id] || null }))
```

如果 `hasSocialSummaryTable()` 返回 false，跳过社交数据获取，所有学校的 `social_summary` 为 null。

### 4.2 SchoolCard 修改

**修改文件**：`src/components/schools/SchoolCard.tsx`

新增 props：

```typescript
interface SchoolCardProps {
  // ...现有 props 保持不变...

  // 新增
  heatRank?: number | null;        // heat_rank_overall，前 50 名才传入
  feeEstimate?: string | null;     // 格式化后的费用字符串，如 "約 HK$2,000-3,000/年"
}
```

**卡片布局改动**（只增不改）：

```
┌──────────────────────────────────────┐
│  [Avatar]  學校中文名          [🔥熱門] │  ← 热门标签（heat_rank ≤ 50 时显示）
│            English Name              │
│  📍 地區 · 1.2km                      │
│  [半日班] [全日班] [非牟利]              │
│                                      │
│  K1 有位  K2 满额  K3 有位            │
│                                      │
│  💡 家長預估費用約 HK$2,000-3,000/年    │  ← 新增行（有数据时才显示）
│            ♡ 查看詳情 →               │
└──────────────────────────────────────┘
```

**热门标签**：
- 位置：学校名右侧（和收藏/对比按钮同行）
- 样式：`bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full text-[10px] font-medium`
- 文案：「🔥 熱門」
- 只在 `heatRank != null && heatRank <= 50` 时显示

**家长预估费用**：
- 位置：学额 badges 下方，footer 上方，新增一行
- 样式：`text-xs text-slate-400`，前面加 `💡` emoji
- 文案格式：「家長預估費用約 HK$X,XXX-X,XXX/年」
- 只在 `feeEstimate` 不为 null 时显示
- 费用字符串由 KGListClient 计算：取 fee_estimates 中所有费用类型的 low 值之和和 high 值之和

### 4.3 筛选和排序增强

**修改文件**：`src/components/schools/FilterBar.tsx`

新增筛选选项：

```typescript
interface FilterBarProps {
  // ...现有 props 保持不变...

  // 新增
  hasInterviewFilter: boolean;           // 「有面試分享」toggle
  onToggleInterviewFilter: () => void;
}
```

**「有面試分享」toggle**：
- 放在「更多篩選」展开面板中，在「設有N班」下方
- checkbox 样式，和「設有N班」一致
- 文案：「有面試分享」
- 选中后：只显示 `social_summary.interview_posts >= 3` 的学校

**修改文件**：`src/app/(public)/kg/KGListClient.tsx`

新增排序选项：

```typescript
// 现有排序逻辑扩展
const SORT_OPTIONS = [
  { value: 'default', label: '預設排序' },      // 现有
  { value: 'heat', label: '討論熱度' },          // 新增
];
```

- 「討論熱度」排序：按 `social_summary.total_engagement` 降序
- 排序 URL 参数：`/kg?sort=heat`
- 无社交数据的学校排在末尾

---

## 五、学校详情页 `/kg/[id]` — 最大改动

### 5.1 新的 Section 顺序

修改后共 7 个 section（原来 4 个，新增 2 个，扩充 1 个）：

1. **即時學額狀態**（VacancySection）— 扩充：加竞争度参考
2. **學校概況**（BasicInfoSection）— 不变
3. **學費及各項收費**（FeesSection）— 扩充：加家长预估费用
4. **招生與開放日**（AdmissionsSection）— 不变
5. **面試資訊**（InterviewIntelSection）— **新增**
6. **申請時間線**（ApplicationTimelineSection）— **新增**
7. 底部 CTA 栏（DetailBottomCTA）— 不变

### 5.2 数据获取

**修改文件**：`src/app/(public)/kg/[id]/page.tsx`

在 Server Component 中新增：

```typescript
// 现有
const school = await fetchSchoolById(id);
const vacancy = await fetchCurrentVacancy(id);

// 新增
const socialSummary = await fetchSocialSummary(id);
// socialSummary 可能为 null（表不存在或该校无数据）

// 传给 SchoolDetailClient
<SchoolDetailClient
  school={school}
  vacancy={vacancy}
  socialSummary={socialSummary}  // 新增 prop
/>
```

### 5.3 Section 1 扩充：竞争度参考

**修改文件**：`src/components/schools/VacancySection.tsx`

在学额 badges 下方，新增一行竞争度信息：

```
┌──────────────────────────────────────────────────┐
│  即時學額狀態                                      │
│                                                  │
│   N        K1        K2        K3                │
│  [尚有]   [尚有]    [满额]    [尚有]               │
│                                                  │
│  📊 競爭參考：較高 — 多位家長反映面試分多輪           │  ← 新增
│                                                  │
│  資料來源：教育局  ·  更新日期：2026年3月17日         │
└──────────────────────────────────────────────────┘
```

**显示规则**：
- 只在 `socialSummary?.competition_level` 有值时显示
- 竞争度标签：
  - `high` → 「較高」`text-red-600`
  - `medium` → 「一般」`text-amber-600`
  - `low` → 「較低」`text-emerald-600`
- 后面跟一句简短说明（根据 competition_level 固定文案）：
  - high：「多位家長反映面試分多輪，報名人數眾多」
  - medium：「面試競爭度適中」
  - low：「面試競爭壓力較小」
- 样式：`text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100`

**新增 prop**：

```typescript
interface VacancySectionProps {
  // ...现有 props...
  competitionLevel?: 'high' | 'medium' | 'low' | null;  // 新增
}
```

### 5.4 Section 3 扩充：家长预估费用

**修改文件**：`src/components/schools/FeesSection.tsx`

在现有学费表格下方，新增「家長預估費用」子模块：

```
┌──────────────────────────────────────────────────┐
│  學費及各項收費                                     │
│                                                  │
│  項目          半日制         全日制                │
│  每月學費      免費          HK$XXX                │
│  報名費        ...           ...                  │
│  ...                                             │
│                                                  │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │  ← 分隔线
│                                                  │
│  💡 家長預估費用                                    │  ← 新增子模块
│                                                  │
│  教材費    約 HK$500-800/年     5 位家長預估         │
│  校服費    約 HK$400-600        3 位家長預估         │
│  活動費    約 HK$300-500/年     4 位家長預估         │
│                                                  │
│  預計首年額外支出：約 HK$1,200-1,900                │
│                                                  │
│  數據來源：網絡公開內容整理，僅供參考                   │
└──────────────────────────────────────────────────┘
```

**样式细节**：
- 分隔线：`border-t border-dashed border-slate-200 my-4`
- 子模块标题：`text-base font-semibold text-slate-950` + 💡 emoji
- 费用表格：简单的三列布局（费用类型 / 金额范围 / 家长数量）
- 金额：`text-sm font-medium text-slate-700`
- 家长数量：`text-xs text-slate-400`
- 合计行：`text-sm font-semibold text-slate-950 mt-3 pt-3 border-t border-slate-100`
- 来源标注：`text-xs text-slate-400 mt-2`

**费用类型中文映射**：

```typescript
const FEE_TYPE_LABELS: Record<string, string> = {
  textbook: '教材費',
  uniform: '校服費',
  activity: '活動費',
  snack: '茶點費',
  bus: '校巴費',
  registration: '報名費/註冊費',
  deposit: '留位費',
  other: '其他費用',
};
```

**新增 prop**：

```typescript
interface FeesSectionProps {
  // ...现有 props...
  feeEstimates?: Record<string, { low: number; high: number; count: number }> | null;  // 新增
}
```

**合计计算**：前端将所有费用类型的 low 值求和、high 值求和，显示为「預計首年額外支出」。

### 5.5 Section 5 新增：面試資訊

**新增文件**：`src/components/schools/InterviewIntelSection.tsx`

**整体结构**：

```
┌──────────────────────────────────────────────────┐
│  面試資訊                      12 位家長分享        │
├──────────────────────────────────────────────────┤
│                                                  │
│  ┌────────────┬────────────┬────────────┐        │
│  │  面試形式   │  平均時長   │  家長面談   │        │  ← 5a 概况卡片
│  │  小組為主   │  約20分鐘  │    有       │        │
│  │  (75%)     │            │  (60%)     │        │
│  └────────────┴────────────┴────────────┘        │
│                                                  │
│  考察內容                                         │  ← 5b 关键词
│  [積木拼圖 ×9] [英文認知 ×7] [社交互動 ×6]          │
│  [畫畫 ×4] [唱歌 ×3] [自理能力 ×3]                 │
│                                                  │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│                                                  │
│  家長評價                                         │  ← 5c 情感分布
│  正面 ████████████░░░░ 65%                        │
│  中性 ████░░░░░░░░░░░░ 23%                        │
│  需留意 ██░░░░░░░░░░░░░░ 12%                       │
│                                                  │
│  正面常見：老師有愛心(8) · 活動豐富(6)               │
│  需留意：等候時間長(3) · 雜費較多(3)                 │
│                                                  │
│  數據來源：網絡公開內容整理，僅供參考                   │
└──────────────────────────────────────────────────┘
```

#### 5a 面试概况卡片

**布局**：3 列等宽 grid（手机端也保持 3 列，内容简短够放下）

```typescript
// 3 个数据格
const overviewItems = [
  {
    label: '面試形式',
    value: getMostCommonFormat(interview_format_distribution), // 例："小組為主"
    sub: `(${formatPercentage}%)`, // 最高占比
  },
  {
    label: '平均時長',
    value: avg_interview_duration ? `約${avg_interview_duration}分鐘` : '暫無資料',
    sub: null,
  },
  {
    label: '家長面談',
    value: parent_interview_pct != null && parent_interview_pct > 50 ? '有' : '視情況',
    sub: parent_interview_pct != null ? `(${parent_interview_pct}%)` : null,
  },
];
```

**面试形式中文映射**：

```typescript
const INTERVIEW_FORMAT_LABELS: Record<string, string> = {
  individual: '一對一',
  group: '小組',
  parent_interview: '家長面談',
  observation: '觀察活動',
  mixed: '混合形式',
};
```

**每格样式**：
- 外框：`bg-slate-50 rounded-xl p-4 text-center`
- 标题：`text-xs text-slate-400 mb-1`
- 值：`text-sm font-semibold text-slate-950`
- 副标题：`text-xs text-slate-400 mt-0.5`

**标题行**：
- 左侧：`<h2>面試資訊</h2>`
- 右侧：`text-sm text-slate-500` 显示「X 位家長分享」
- 人数取 `interview_contributor_count` 字段

#### 5b 面试内容关键词

**布局**：标签流式排列（flex-wrap）

```
考察內容：
[積木拼圖 ×9] [英文認知 ×7] [社交互動 ×6] [畫畫 ×4] [唱歌 ×3]
```

**数据来源**：`top_interview_keywords` 数组，已按频次降序排列

**样式**：
- 标签：`inline-flex items-center bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium mr-2 mb-2`
- 频次：`text-slate-400 ml-1` 显示 `×N`
- 最多显示 8 个关键词

**显示阈值**：至少 3 个关键词，且每个关键词频次 ≥ 2

#### 5c 情感分布

**布局**：

1. 横向进度条（3 行：正面/中性/需留意）
2. 下方关键词列表

**进度条样式**：

```typescript
// 三种情感
const sentimentConfig = [
  { key: 'positive', label: '正面', barColor: 'bg-emerald-200', textColor: 'text-emerald-700' },
  { key: 'neutral', label: '中性', barColor: 'bg-slate-200', textColor: 'text-slate-500' },
  { key: 'negative', label: '需留意', barColor: 'bg-amber-200', textColor: 'text-amber-700' },
];
```

注意：「需留意」用 amber 而不是 red，避免过度负面的视觉感受。

**进度条结构**：
```
标签（text-xs, 固定宽度 60px）  [███████░░░░░░]  百分比
```
- 条形背景：`bg-slate-100 rounded-full h-2`
- 填充：`rounded-full h-2` + 对应 barColor
- 宽度按百分比计算

**关键词列表**：
- 正面关键词：`text-xs text-emerald-600`，格式「正面常見：老師有愛心(8) · 活動豐富(6)」
- 需留意关键词：`text-xs text-amber-600`，格式「需留意：等候時間長(3)」
- 负面关键词频次 < 3 的**不显示**
- 用中点 `·` 分隔多个关键词

### 5.6 Section 6 新增：申請時間線

**新增文件**：`src/components/schools/ApplicationTimelineSection.tsx`

```
┌──────────────────────────────────────────────────┐
│  往年申請時間線                                     │
├──────────────────────────────────────────────────┤
│                                                  │
│   ●━━━━━━━━━━━●                                  │
│   9月初        9月底          報名期                │
│                                                  │
│         ●                                        │
│        10月中旬               面試通知              │
│                                                  │
│   ●━━━━━━●                                       │
│   11月初   11月中             面試                  │
│                                                  │
│         ●                                        │
│        12月初                 放榜                  │
│                                                  │
│  ⚠️ 以上為往年數據整理，2025/26 年度以學校公佈為準     │
│  數據來源：X 位家長分享，僅供參考                      │
└──────────────────────────────────────────────────┘
```

**数据来源**：`socialSummary.timeline_summary`

```typescript
// timeline_summary 格式：
{
  "application_open": { "typical_month": 9, "count": 6 },
  "application_close": { "typical_month": 9, "count": 5 },
  "interview_notice": { "typical_month": 10, "count": 8 },
  "interview": { "typical_month": 11, "count": 10 },
  "result": { "typical_month": 12, "count": 7 }
}
```

**事件类型中文映射和图标**：

```typescript
const TIMELINE_EVENT_CONFIG: Record<string, { label: string; icon: string }> = {
  application_open: { label: '報名開始', icon: '📋' },
  application_close: { label: '報名截止', icon: '⏰' },
  interview_notice: { label: '面試通知', icon: '📩' },
  interview: { label: '面試', icon: '🎤' },
  result: { label: '放榜', icon: '📬' },
  offer_deadline: { label: '回覆Offer截止', icon: '✅' },
};
```

**月份转中文**：

```typescript
const MONTH_LABELS = ['', '1月', '2月', '3月', '4月', '5月', '6月',
                      '7月', '8月', '9月', '10月', '11月', '12月'];
// 显示为 "X月初"/"X月中旬"/"X月底" — 因为只有月份数据，统一显示 "X月"
```

**布局实现**：

竖直时间线，左侧一条竖线 + 圆点，右侧事件标签。

```
每个时间节点：
<div className="flex items-start gap-4">
  <div className="flex flex-col items-center">
    <div className="w-3 h-3 rounded-full bg-slate-950" />  <!-- 圆点 -->
    <div className="w-0.5 h-8 bg-slate-200" />              <!-- 竖线 -->
  </div>
  <div>
    <span className="text-sm font-medium text-slate-950">10月</span>
    <span className="text-xs text-slate-500 ml-2">面試通知</span>
    <span className="text-xs text-slate-400 ml-1">(8位家長回報)</span>
  </div>
</div>
```

**底部警告**：
- ⚠️ 图标 + `text-xs text-amber-600`
- 文案：「以上為往年數據整理，{currentYear}/{nextYear} 年度以學校公佈為準」

**显示阈值**：`timeline_summary` 中至少 3 个事件类型有数据才显示整个 section。

---

## 六、导航增强

### 6.1 Header 新增入口

**修改文件**：`src/components/layout/Header.tsx`

在导航栏中，如果排行页功能上线，考虑在「搵學校」下拉或二级入口加入「熱度排行」。

但 V1 可以先不改 Header — 排行页的入口通过首页热度榜的「查看完整排行 →」链接进入即可。

---

## 七、文件清单总览

### 新增文件（7 个）

```
src/lib/db/socialIntel.ts                              # 数据库查询层
src/components/home/HeatRanking.tsx                    # 首页热度榜组件
src/app/(public)/kg/ranking/page.tsx                   # 排行页 Server Component
src/app/(public)/kg/ranking/RankingClient.tsx           # 排行页 Client Component
src/components/schools/RankingCard.tsx                  # 排行页单行组件
src/components/schools/InterviewIntelSection.tsx        # 详情页面试资讯 Section
src/components/schools/ApplicationTimelineSection.tsx   # 详情页申请时间线 Section
```

### 修改文件（8 个）

```
src/types/database.ts                                  # 新增 SocialSummary, HeatRankingItem 类型
src/lib/utils/index.ts                                 # 新增 FEE_TYPE_LABELS, INTERVIEW_FORMAT_LABELS, TIMELINE_EVENT_CONFIG 常量
src/app/(public)/page.tsx                              # 插入 HeatRanking section
src/app/(public)/kg/KGListClient.tsx                   # SchoolData 新增 social_summary 字段 + 排序/筛选
src/components/schools/SchoolCard.tsx                  # 新增 heatRank, feeEstimate props
src/components/schools/FilterBar.tsx                   # 新增 hasInterviewFilter
src/components/schools/VacancySection.tsx               # 新增 competitionLevel prop
src/components/schools/FeesSection.tsx                  # 新增 feeEstimates prop
src/app/(public)/kg/[id]/page.tsx                      # 获取 socialSummary 数据
src/app/(public)/kg/[id]/SchoolDetailClient.tsx        # 传递 socialSummary 给新 sections
```

---

## 八、开发顺序建议

```
Step 1：数据层（最先做，其他都依赖它）
  - database.ts 类型定义
  - socialIntel.ts 查询函数
  - utils/index.ts 常量映射

Step 2：学校详情页（改动最大但最核心）
  - InterviewIntelSection（面试资讯 — 核心卖点）
  - ApplicationTimelineSection（时间线）
  - VacancySection 竞争度扩充
  - FeesSection 家长预估费用扩充
  - page.tsx + SchoolDetailClient.tsx 数据传递

Step 3：学校列表页
  - SchoolCard 热门标签 + 预估费用
  - FilterBar 面试分享筛选
  - KGListClient 热度排序 + 数据获取

Step 4：首页热度榜
  - HeatRanking 组件
  - page.tsx 插入

Step 5：排行页
  - ranking/page.tsx
  - RankingClient.tsx
  - RankingCard.tsx
```

---

## 九、验证方法

### 无社交数据时（migration 未应用）
1. 打开所有页面，确认无报错
2. 首页不显示热度榜 section
3. 学校卡片无热门标签、无预估费用
4. 学校详情页只显示原有 4 个 section，无面试资讯和时间线
5. 排行页显示「暫無排行數據」空状态

### 有社交数据时
1. 首页热度榜显示 Top 10 学校，横向可滚动
2. 排行页可切换全港/按区，分页正常
3. 学校列表页：热门学校显示🔥标签，有费用数据的显示预估费用
4. 筛选「有面試分享」后只显示有面试数据的学校
5. 排序切换「討論熱度」后按互动量降序
6. 学校详情页：
   - Section 1 显示竞争度标签
   - Section 3 底部显示家长预估费用
   - Section 5 显示面试概况卡片 + 关键词 + 情感分布
   - Section 6 显示时间线
7. 手机端所有布局正常，无溢出

### 阈值验证
1. 找一所 interview_posts < 3 的学校，确认不显示面试资讯 Section
2. 找一所 total_posts < 5 的学校，确认不显示情感分布
3. 确认负面关键词频次 < 3 的不显示
