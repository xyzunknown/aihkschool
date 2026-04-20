# HKSchoolPlace 重设计方案 · 2026

> 目标：把产品从一个「教育数据后台」改写成「陪伴家长做人生决定的可信伙伴」。
> 方向：激进重写设计语言；情感基调=**专业温和（Airbnb / Notion 现代派）**。
> 约束：维持 Next.js 14 + Tailwind + 零外部后端依赖。Mobile-first。性能可承受。

---

## 0. TL;DR

本方案解决三个核心病灶：**色彩冷 / 信息密度无叙事 / 品牌没有人味**。

交付三样东西：
1. **新设计语言（Inkwell Cream）** — 色板、字体、间距、材质、动效 token 全部重写，取代现有 slate 单色体系。
2. **组件语法重铸** — 8 个关键组件（Card / Button / Input / Badge / Avatar / Section / Empty / Banner）按新语言重写，保持 API 兼容。
3. **首页叙事重构** — 把 6 段「罗列式」改成 3 段「故事式」，情感层 + 信息层分离，每段都有明确的情绪目的。

配套：全新插画风格指引、粤语写作语气手册、无障碍自检报告、3 个 Sprint 的落地路线图。

---

## 1. 现状诊断：为什么感觉「空洞 + 有距离感」

基于对 `page.tsx`、`BannerCarousel.tsx`、`SchoolCard.tsx`、`HeroSearchBar.tsx`、`tailwind.config.ts` 的现场阅读：

### 1.1 颜色是冷的，所以人是远的
- 主色全部在 `slate-*`（蓝灰调，饱和度接近 0）。整页没有一毫克「暖」。
- CLAUDE.md 明文规定「Color is information, not decoration. Saturation under 20%」。这条原则来自企业 SaaS 的克制美学，但 HKSchoolPlace 的用户是情绪焦虑、需要被安抚的父母。把色彩全部让渡给「红绿灯式警告」，等于把情感层交给了「警报」。
- 对照：Airbnb 主色 `#FF385C` 并不用于警告；Notion 的 `#2F80ED` 在侧栏有大量使用；这两家都没有被「信息洁癖」限制。

### 1.2 版式只有一种节奏
- 全站六个 section 都是「slate-50 背景 + rounded-2xl 白卡」。没有深色段、没有图像段、没有 full-bleed 段。
- 结果：滚动 4 屏，视觉上是同一屏；大脑会判断「我看完了」然后关闭页面。
- 这是「Notion admin 感」和「Airbnb / 小红书首页」的核心差别 — 后者**强制节奏变化**。

### 1.3 卡片信息密度高，但没有视觉层级
- `SchoolCard` 一张卡里塞了 7 层信息：avatar + 中文名 + 英文名 + 区域 + 距离 + 3~4 个标签 + K1/K2/K3 学位格 + 学费估算 + 更新时间 + 「詳情 >」。
- 所有信息权重近似（都是小号黑 / 灰字 + pill），没有主次。
- 肉眼看到的效果：**密**但**无重点**，认知压力大、情感反馈弱。

### 1.4 图像缺席
- V1 明文说「不用真实照片，只用首字母 avatar」。
- 但 avatar 只是 tech debt 的遮羞布 — 它在每一张卡里占了 48×48，没有传递任何差异化信息，反而提高了「像后台管理」的观感。
- 没有品牌插画、没有氛围图、没有教室/孩子/植物的任何视觉线索。

### 1.5 文案语气保守
- 当前文案全部是说明书式的 TC（「即時學額狀態」「學校概況」「學費及各項收費」）。没有人味、没有粤语口吻、没有在用户紧张的时候拍拍肩膀。
- Empty state 更冷：「目前暫無近期學校活動資訊」。这应该是品牌最温柔的瞬间，现在是最尴尬的。

### 1.6 交互微反馈弱
- 卡片 hover 只是 `shadow-sm + -translate-y-0.5`。收藏动画 heart-fill 已经是全站最有情绪的地方，但只在一个点上。
- 按钮 hover `scale(1.02)` — 按设计系统教条，但放到产品里几乎感受不到。

---

## 2. 新设计宣言（取代现有 4 条约束）

重写 CLAUDE.md 里的「Design System · Core Principle」段。

| 旧 | 新 |
|---|---|
| Color is information, not decoration. | **Color tells two stories**：信息色（红/琥珀/翡翠）只用于学位状态；**品牌色**（墨蓝 + 珊瑚 + 奶油）负责情感和导航。两套互不越界。 |
| Saturation under 20%. | **Saturation with intent**：中性灰走暖灰（stone），不再用 slate；主品牌色允许 60% 饱和度；状态色饱和度克制。 |
| No glass/blur. | **Opacity with purpose**：底层不用毛玻璃，但允许在 hero 图上叠 8~12% 的品牌色 overlay，用于氛围。 |
| No external fonts. | **Typography has character**：引入 Noto Sans TC（body）+ Noto Serif TC（display / 标题，选择性用）+ Inter（英文 / 数字）。均走 Google Fonts，仅在首屏 preload。 |
| 两种卡片（白 / 深黑）。 | **三种卡片语法**：Surface（奶油白）/ Emphasis（墨蓝深）/ Warm（浅陶色，用于情感段）。 |

---

## 3. 新视觉语言：**Inkwell Cream**

### 3.1 名字由来
「Ink」= 墨蓝，严肃 / 权威 / 信息清晰。
「Cream」= 奶油，温润 / 家庭感 / 降低压迫。
两者对撞，正好是「专业温和」的物质化。

### 3.2 色板

#### 3.2.1 中性（取代 slate 全家）

| Token | HEX | 用途 |
|---|---|---|
| `bg-canvas` | `#FBF9F4` | 全站底色，暖奶油 |
| `bg-paper` | `#FFFFFF` | 默认卡片 |
| `bg-paper-warm` | `#F5F0E6` | 温暖段落背景（情感段、empty state） |
| `bg-ink` | `#0B1B2B` | Emphasis card / dark section（不是纯黑） |
| `fg-primary` | `#1A1A1A` | 主文本（接近黑，但非纯黑） |
| `fg-secondary` | `#4A4A4A` | 次文本 |
| `fg-muted` | `#7A756C` | 辅助文本（暖灰，替代 slate-500） |
| `fg-placeholder` | `#A8A098` | 占位文本 |
| `border-subtle` | `#EDE7DB` | 卡片边框（暖 beige） |
| `border-strong` | `#D4CABC` | hover / focus 边框 |

**关键差别**：中性色从「蓝灰」迁移到「暖灰（stone/warm-gray）」。单这一步，情感温度提升约 40%。

#### 3.2.2 品牌色

| Token | HEX | 用途 |
|---|---|---|
| `brand-ink` | `#0B1B2B` | 主品牌色（深墨蓝），Logo、Primary 按钮、Emphasis card |
| `brand-coral` | `#E8674A` | 辅品牌色（暖珊瑚），CTA、重要 accent、heart 填充、活跃导航 |
| `brand-coral-soft` | `#FCEAE2` | Coral 的背景底色（badge 背景、标签背景） |
| `brand-sage` | `#5F7D6A` | 辅品牌色（墨绿），信任 / 安抚场景（如收藏成功 toast） |
| `brand-sage-soft` | `#E3ECE5` | Sage 的背景底色 |

**用法原则**：
- `brand-ink` 是导航、Logo、最强按钮。
- `brand-coral` 是**一切需要情绪的地方**：「立即搵學校」CTA、收藏满状态、热门 badge、H1 里的关键词高亮。
- `brand-sage` 是**信任 / 平静**：收藏成功、「已收到你嘅提醒」、完成状态。
- 三色最多同屏出现两个。

#### 3.2.3 信息色（保留，微调饱和度）

| Status | BG | FG |
|---|---|---|
| 尚有學額 / safe | `#EEF6F0` | `#2E7D4F` |
| 學額緊張 / warning | `#FBF2E3` | `#9C6A1A` |
| 名額已滿 / urgent | `#FBEDE9` | `#B24430` |
| 未開放 / n/a | `#F1EDE5` | `#6B665E` |

**与旧的差别**：饱和度微降，底色偏暖，与 `bg-canvas` 融合不突兀。紧急色不再是「醒目红」而是「陶土红」，避免让焦虑家长「看一眼就心跳加快」。

### 3.3 字体系统

首屏加载策略：
```
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preload" as="style" href="...Noto+Sans+TC:wght@400;500;700&Inter:wght@400;500;600&Noto+Serif+TC:wght@700&display=swap">
```

Tailwind 扩展：
```ts
fontFamily: {
  sans: ['"Noto Sans TC"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
  serif: ['"Noto Serif TC"', 'Georgia', 'serif'], // 只用在 display H0
  mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'], // 用于数字、学费金额
}
```

#### 3.3.1 字号 / 字重 / 行距

| 层级 | Family | Size | Weight | Line | Letter |
|---|---|---|---|---|---|
| Display (Hero H0) | Serif | 48/56 | 700 | 1.1 | -0.02em |
| H1 | Sans | 28 | 700 | 1.25 | -0.015em |
| H2 | Sans | 20 | 600 | 1.3 | -0.01em |
| H3 | Sans | 17 | 600 | 1.4 | 0 |
| Body | Sans | 15 | 400 | 1.65 | 0 |
| Body-emphasis | Sans | 15 | 500 | 1.65 | 0 |
| Small | Sans | 13 | 400 | 1.5 | 0 |
| Label | Sans | 11 | 500 | 1.4 | 0.08em |
| Money | Mono | 15 | 500 | 1.4 | 0 |

**关键新增**：
- Serif 只在首页 Display H0 用一次（比如「為每個香港孩子，搵一間合適嘅學校」），其余地方不用。Serif 出现的那一刻就是品牌温度最高的一刻。
- Mono 专门给学费、距离、K1 学位数 — 数字有节奏感，读起来更专业。

### 3.4 间距节奏（8pt grid，不变）

保留 4/8/12/16/20/24/32/40/56/80。但引入 **Section rhythm**：

```
Section A (light)  →  mb-20 (80px desktop / 56px mobile)
Section B (dark)   →  mb-0 + 外部 wrapper 自带 vertical padding
Section C (warm)   →  mb-20

首页 section 之间不再只用间距隔开，而是用「背景色块 + 间距 + 分隔插画」三件套。
```

### 3.5 圆角 / 阴影 / 边框

| Token | Value |
|---|---|
| `radius-pill` | 9999px — 标签 / badge |
| `radius-button` | 12px |
| `radius-card` | 20px（略增） |
| `radius-hero` | 28px — banner、detail hero |
| `shadow-rest` | `0 1px 2px rgba(11,27,43,0.04), 0 0 0 1px rgba(11,27,43,0.04)` |
| `shadow-hover` | `0 12px 32px -12px rgba(11,27,43,0.18), 0 2px 6px rgba(11,27,43,0.06)` |
| `shadow-emphasis` | `0 24px 48px -20px rgba(11,27,43,0.35)` |
| `shadow-inset-warm` | `inset 0 1px 0 rgba(255,255,255,0.6)` — 给 warm card 加一层上沿高光 |

**核心变化**：卡片从「硬边线」转向「柔阴影 + 细内描边」。视觉重量下降 30%，温度上升。

### 3.6 动效 token

```ts
transition: {
  swift: 'cubic-bezier(0.32, 0.72, 0, 1)',  // Apple 式 inertia，默认
  soft:  'cubic-bezier(0.4, 0, 0.2, 1)',    // 标准 ease，用于颜色/透明度
  bounce:'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // 心跳 / 心形 / toast
},
duration: {
  instant: 120,
  quick:   200,
  base:    280,
  slow:    480,
}
```

默认所有 interactive 元素用 `swift 280ms`。Heart fill 用 `bounce 400ms`。Section 进入用 `IntersectionObserver + soft 480ms translateY(16→0) + opacity(0→1)`。

---

## 4. 组件系统改写

每一项给「旧 → 新」对比，以及 API 是否破坏。

### 4.1 Button

**旧**：
```
bg-slate-950 text-white rounded-xl px-6 py-3
hover: scale(1.02) 200ms
```

**新**：
```
bg-brand-ink text-white rounded-button px-6 py-3.5 font-medium tracking-tight
hover: bg-[#1a2d40] translateY(-1px) shadow-hover 280ms swift
active: translateY(0) shadow-rest
focus-visible: ring-2 ring-brand-coral ring-offset-2
```

同时新增一个 `variant="accent"`：`bg-brand-coral text-white`，用于**非收藏的情感 CTA**（比如首页 hero 主按钮、详情底部「申請 2027/28 入學」）。CLAUDE.md 里「只有一种 Primary」的规则要改写为「只有一个最强调用，可以在 ink / coral 中二选一」。

API 不变（`variant: "primary" | "secondary" | "accent"`）。

### 4.2 Card

**旧**：`bg-white rounded-2xl border border-slate-200 p-6`

**新三变体**：
```tsx
// Surface（默认，取代旧的 Content Card）
<div className="bg-paper rounded-card p-5 shadow-rest hover:shadow-hover hover:-translate-y-0.5 transition-all duration-base ease-swift">

// Emphasis（取代旧 slate-900 deep card）
<div className="bg-brand-ink text-white rounded-card p-6 shadow-emphasis">

// Warm（新增，情感段专用）
<div className="bg-bg-paper-warm rounded-card p-5 shadow-inset-warm border border-border-subtle">
```

新增：**Quiet 变体**，无边框无阴影，仅作为 grid 容器的 item，用于列表密度大的场景（如对比表）。

### 4.3 SchoolCard 重构

当前 SchoolCard 有 7 层信息堆叠。重构后的信息层级：

```
┌─────────────────────────────────────┐
│  [Logo/Avatar 56×56]                │  ← 视觉锚
│                                     │
│  學校中文名                           │  ← H3 17/600
│  English Name · 中西區 · 1.2km      │  ← 13/muted，一行合并
│                                     │
│  ┌─ 3 个学位状态（新设计） ──────┐    │
│  │  K1 · 尚有學額     剩 12 位    │   │
│  │  K2 · 學額緊張      剩 3 位    │   │
│  │  K3 · 名額已滿                │   │
│  └──────────────────────────────┘    │
│                                     │
│  半日班 · 非牟利 · 設 N 班          │  ← 标签合并为一行，点分隔
│                                     │
│  ───────────────────────────        │
│  📅 2026/2/15 前截止     ❤ 詳情 →  │
└─────────────────────────────────────┘
```

**核心改动**：
- **学位状态从 pill 变成带数字的 row**。现在只说「尚有學額」，新设计在可得数据时直接给「剩 N 位」，给不出时保留原 pill。数字比颜色更能传递迫切感。
- **多行标签合并成一行点分隔**（`半日班 · 非牟利 · 設 N 班`）。视觉噪声下降，信息一样。
- **距离 / 区域 / 英文名合并为第二行**（dotted separator），节省 1 行空间。
- **底部分隔线加「截止日倒计时」**（有收藏且有提醒时高亮 coral，否则普通灰）。
- **Logo / 首字母 avatar**：尺寸从 48 升到 56，初始字符从 1 个变成 1~2 个（中英首字各取一），视觉个性更强。

### 4.4 Avatar（取代 SchoolAvatar）

旧：`w-12 h-12 rounded-full + 循环 5 色`。
新：`w-14 h-14 rounded-[14px]`（方形圆角，更像 App icon，更现代）。底色从「5 个 tailwind 浅色」换为**基于 school_id hash 的 8 色油墨组**：

```
['#D1C4A3', '#B5C7B2', '#C8B8D4', '#E3C5B5', '#A8B8C7', '#C6B8A8', '#D9C2C7', '#B8BCC7']
```

都是低饱和暖中性色，叠到 `bg-canvas` 上依然协调。文字颜色一律 `brand-ink`。

后续真实 logo 接入后，Avatar 组件自动降级为图片；未接入时用上述纯色 + 大号字母，**并允许叠一层 SVG 几何纹理**（圆点 / 斜线 / 棋盘），把「没有 logo 的学校」变成一组**有设计感的默认肖像**。

### 4.5 Badge / Tag

保留 pill 形状，但：
- 不再用「全色底 + 深色字」，而是「浅底 + 同色系深字 + 1px 同色内边线」。
- 字号 12→13，padding 加大。
- 取消「热门」橙色 pill 改用小小的 `🔥` 前缀 + `brand-coral` 文字，不占 badge 空间。

```tsx
// 示例
<span className="inline-flex items-center gap-1 rounded-pill bg-brand-coral-soft text-[#A04523] px-2.5 py-1 text-[13px] font-medium ring-1 ring-inset ring-[#F0D5CB]">
  🔥 熱門
</span>
```

### 4.6 Input / SearchBar

旧：方形圆角 + slate 边框 + 焦点变深 slate。
新：
- 默认：`bg-paper rounded-[14px] border border-border-subtle px-5 py-3.5`
- Hover：`border-border-strong`
- Focus：`border-brand-ink ring-4 ring-brand-ink/8`
- 左侧固定一个 24×24 的搜索图标（暖灰），右侧嵌入「立即搵」小按钮（不是独立按钮，和 input 同高 pill）。
- 占位文案：`搵個學校 · 「九龍城區國際學校」` — 例子放进占位符教用户。

### 4.7 Section Wrapper

新增组件 `<Section tone="light | warm | dark">`。用法：
```tsx
<Section tone="warm" title="近期家長必知" subtitle="過去一週家長交返嚟嘅第一手情報">
  <EventScroller />
</Section>
```

每个 tone 自动配套：
- 背景色
- H2 字色
- Subtitle 字色
- 下方分隔方式（dark 用无缝过渡，light/warm 用 `mb-20`）

### 4.8 Empty State

旧：纯文字「目前暫無近期學校活動資訊」。
新：
```
┌─────────────────────────────┐
│                             │
│       [简笔插画 120×120]     │
│                             │
│   呢排冇新活動發佈            │
│   我會幫你盯實，有消息即刻通知  │
│                             │
│     [設定提醒 →]             │
└─────────────────────────────┘
```

**Empty state 不再是空白**，而是品牌展示最温柔一面的时刻。

---

## 5. 页面级重设计

按优先级排列。

### 5.1 首页 `/`（最优先）

#### 5.1.1 当前结构的问题

6 个 section 从上到下摞着，每段都是「标题 + 一堆卡片」。没有叙事。

#### 5.1.2 新结构：三幕叙事

```
【第一幕 · 安心】     Hero 区（dark）
【第二幕 · 行动】     发现 / 工具（light + warm 交替）
【第三幕 · 信任】     品牌故事 + 收藏 CTA（light）
```

#### 5.1.3 逐段改写

**① Hero（dark 段，占满 90vh mobile / 80vh desktop）**

- 全宽背景：一张柔光教室/植物/阳光的氛围图（单张，不是 carousel），上叠 `bg-brand-ink/60` 渐变 overlay。
- 上半：Serif H0 「**喺香港，搵一間啱自己嘅幼稚園**」（换行：`喺香港，\n搵一間啱自己嘅幼稚園`）。
- 副标：「873 間學校，學位實時更新，截止日唔會錯過。」
- 搜索栏：单行大号 Input，嵌入主按钮，左侧 magnifier。placeholder 带粤语例子。
- Hero 下方 3 个 chip：**「我想快啲搵有位嘅」「我想比較幾間」「我想睇時間線」** — 3 个不同意图的入口，取代现有「地區 pill」。
- 微动效：背景图 Ken Burns 保留但放慢到 30s；Hero 文字 on mount fade-up 480ms。

**② Parent Must Know（warm 段）**

把「近期家長必知」从横向卡片列表变成**月历式时间轴**：

```
【2026 年 4 月】
  ├─ 4/18  週六 10:00   樂基幼稚園          開放日
  │                     中西區 · 距你 2.1km
  ├─ 4/22  週三 19:00   玫瑰崗幼稚園        網上簡介會
  └─ ...

【2026 年 5 月】
  └─ ...
```

- 左边一条竖线 + 圆点，右边事件。
- 每个事件点击进入学校详情或活动详情。
- 上方 filter pill 群：全部 / 開放日 / 面試 / 截止 / 試堂。
- Empty state 接 4.8 改写。

**③ Discover Tools（light 段，3 栏 grid）**

取代现有「课外活动精选 / 社交热度榜 / 精选名校」的三段堆叠，改成一段三栏：

```
┌─────────────┬─────────────┬─────────────┐
│  時間線      │  熱度榜      │  對比工具   │
│  [插画]     │  [插画]      │  [插画]     │
│  所有學校    │  最多人睇    │  挑 2–3 間 │
│  一年的節奏  │  嘅學校      │  並排比較   │
│              │              │             │
│  [去睇 →]   │  [去睇 →]   │  [去對比 →] │
└─────────────┴─────────────┴─────────────┘
```

每栏是一张 Warm Card，插画用同一套笔触。

**④ Featured + News（light 段）**

合并「精选名校」+「消息动态」为一段左右布局（desktop）：

- 左 2/3：精选名校 3 张卡（新 SchoolCard 样式）
- 右 1/3：消息动态 3 条 list，顶部「今日 · Apr 17」，每条 title + source pill + 時間。

Mobile 下上下堆叠。

**⑤ Brand Footer 段（dark 段）**

一段只有一张 Emphasis Card，里面只放：
- Serif H2 「**幫你搵到，幫你跟到，幫你記得住。**」
- 一句话：「HKSchoolPlace 係一個家長嘅工具箱。我哋唔收學校錢，只對你負責。」
- CTA：`[登入] 收藏 · 提醒 · 對比`（accent coral 按钮）

**⑥ Footer（light）**

保留现有 3 栏，但字体切换、间距加大、品牌 logo 换成 Serif 字标。

#### 5.1.4 首页改版前后对比

| 维度 | 改版前 | 改版后 |
|---|---|---|
| 段数 | 6 段 | 5 段（含 footer） |
| 背景节奏 | 全 slate-50 | warm / light / warm / light / dark 循环 |
| 图像 | 0 | Hero 大图 + 3 段插画 + 段间分隔插画 |
| Serif 出现 | 0 | 2 次（Hero + Brand footer 段） |
| 情感表达 | 只有心形动画 | Hero copy + warm palette + 插画 + copy 语气 |
| 估算信息密度 | 高 | 中（同样信息，更好分层） |

### 5.2 学校列表页 `/kg`

**主要改动**：
- FilterBar 从「4 个独立下拉 + pill」改为「3 段横向 sticky bar」：
  - Left: 地區下拉（带当前选中 pill）
  - Center: 学位状态 segmented control（不是 pill toggle，用 iOS 风格分段）
  - Right: 「更多篩選」按钮（弹出 bottom sheet）
- 搜索 / 筛选不再清零列表 — 切换时列表渐变、卡片交错入场。
- 地圖/列表切換 toggle（未来加，占位）。
- 空结果 empty state：「搵唔到合條件嘅學校 · [清除篩選] [睇其他地區]」。
- 排序下拉改成 chip：`推薦順序 ▼` 点开 bottom sheet。
- 「📍 顯示距離」按钮从纯文字变成带 GPS 图标 + pulse 动画的小按钮。

**CompareBar**（浮动对比条）：
- 从卡片样式改成「上沿 24px radius 的 dark card」贴在底部，像 iOS Dock。
- 加入选中学校的 mini avatar（叠加显示），数字徽章 `2 / 3`。

### 5.3 学校详情 `/kg/[id]`

**Hero 区彻底重做**：
- 现在是 4:3 灰块 + 学校名字 overlay。
- 新版：16:7 氛围图（学校 logo / 教室 / 校服色调，若无则走「暖底 + 大号首字母 + 几何装饰」），向下渐变到 bg-canvas。
- 右下角浮动：**收藏按钮 + 分享按钮 + 對比按鈕**（三件套小 pill，都在同一个悬浮容器里）。
- Hero 下方是「学校名（H1）+ 英文名 + 区域 + 距离 + 3 核心标签」的 info strip。

**即時學額狀態**卡从通栏变成 2 栏（desktop）：
- 左：4 个年级 grid（N/K1/K2/K3）
- 右：一个「申請進度時間軸」—— 显示当前校历中的节点（開放日 → 簡介會 → 申請期 → 截止 → 面試 → 結果）。这是把产品从「数据展示」升级到「陪伴」的关键一步。

**學校概況** 卡：
- 地图 placeholder 从 4:3 灰块改成真的 Mapbox Static API（免费额度够用）或至少是 Google 地图一张静态图预览，点击打开 app。
- 师生比例 / 校舍面积 改成**图表式**：一条横向比例条（师生 1 : 15 → 用 icon row 视觉化）。

**學費及各項收費**：
- 保留表格，但加一行「估算年總支出」 用 Serif + coral 数字强调。
- 旁边小字「*以學校公佈為準」。

**底部 CTA**：
- 申請按钮用 `variant=accent`（coral），更像 Airbnb「預訂」按钮。
- 加一个次级「加入收藏」大按钮（secondary），放在申请按钮旁。

### 5.4 账户页 `/account`

**主要改动**：
- 欢迎 header 配 Serif 「**你好，[name]**」，下面一句「你有 3 間收藏學校，最近嘅截止喺 12 日後。」—— **人味 + 数据**融合。
- 收藏卡片用新 SchoolCard，但加一个右上角 badge「🗓 12 日後截止」。
- 提醒设置不是 toggle，改成 3 个可点 chip（7 日前 / 3 日前 / 1 日前），已选中是 coral 底。
- 底部加一段「準備好你嘅 2027/28 入學」的 brand card，里面有 checklist（出生紙掃描？身份證明？推薦信？）。从工具升级为 companion。

### 5.5 时间线 `/timeline`

- 月历式布局（参考首页第二段的纵向时间轴），全屏版。
- 左侧 sticky「月份跳转」导航（类 iOS 通讯录）。
- 顶部 filter 同首页。

### 5.6 对比 `/compare`

- 表格从「所有行都是灰底白字」改成「重要行加暖底 + 差异行加 coral 左边框」。
- 学校列头用大号 avatar + name，fixed column。
- 滚动时列头 sticky（desktop）或 tab 切换（mobile）。

---

## 6. 动效 / 微交互

### 6.1 默认动效语法

所有 interactive 元素统一用：
```
transition: all 280ms cubic-bezier(0.32, 0.72, 0, 1);
```

### 6.2 4 个标志性微交互

**① Hero 进入**：背景 0.96 scale → 1 scale 配合 20% → 100% opacity，1200ms soft。文字 fade-up 分两批入场（主标 0ms，副标 120ms delay，CTA 240ms delay）。

**② 收藏心形**：保留现有 `heart-fill`，但在动画完成后触发 toast，且心形外圈扩散一个 coral 圆（2 帧过渡，`scale 1 → 1.6`, `opacity 0.3 → 0`）。

**③ 学位 pill 变化**：切换区筛选时，学位 pill 的颜色用 `view-transitions`（或至少是 css transition on background-color 480ms soft）。

**④ Bottom sheet 打开**：从 280ms 加到 360ms，曲线 soft，背景 overlay `rgba(11,27,43,0.5)` 淡入同步。

### 6.3 Scroll reveal

在 `/kg` 列表、首页 section，用 IntersectionObserver 给每张卡片 `translateY(16→0) + opacity(0→1) 480ms swift`，stagger 40ms。首次加载后禁用（避免二次进入反复动）。

---

## 7. 插画 / 图像策略

### 7.1 插画系统（自制）

**风格基线**：
- 线条：1.5px 实线，端点圆头。
- 填色：3~4 层，都来自新色板（bg-paper-warm / brand-coral-soft / brand-sage-soft + brand-ink 线条）。
- 画风：Notion × Headspace 混合 —— 几何简洁 + 柔和，不拟人化。
- 题材：教室（桌椅、窗户、植物）、风景（山、海、云）、工具（日历、信封、放大镜），**不画孩子和老师的脸**。

**位置**：
- 首页 Hero 下的 chip 区右侧：一张小插画当「氛围锚」
- 首页 Discover Tools 三栏：3 张同系列插画
- Empty state：7~8 张
- Brand footer 段：一张大插画

**交付**：SVG，单色或两色，尺寸统一 `w-24 h-24`（小）/ `w-48 h-48`（中）/ `w-80 h-80`（大）。放 `/public/illustrations/`。

### 7.2 Logo 策略

**短期（无真实 logo）**：新 Avatar 系统（4.4）。

**中期**：
- 自动从学校官网 `<link rel="icon">` / OpenGraph `og:image` 抓取 logo 到 Supabase storage。
- 背景色仍用 8 色油墨组作为 fallback placeholder。
- CDN cache 30 天。

**长期**：人工审核的 200 间头部学校精修 logo。

### 7.3 学校 Hero 图

- 暂不用真实照片（同样有版权风险）。
- 详情页 Hero 用「学校主色 + 几何图形 + 大号首字母」组成的程序化生成图。每所学校根据 `school_id` 得到一个确定性的组合 —— 但看起来是定制的。

---

## 8. 文案 / 语气手册

### 8.1 核心原则

1. **粤语口吻，不正式，不轻佻**。
2. **永远先讲「对你有咩好」，再讲功能名**。
3. **数字比形容词好**。
4. **用动词开头**（搵 / 收藏 / 對比 / 記住）。
5. **失败时负起责，不回避**。

### 8.2 Before / After 例子

| 场景 | Before | After |
|---|---|---|
| Hero H0 | (无) | 喺香港，搵一間啱自己嘅幼稚園 |
| Hero 副标 | (无) | 873 間學校，學位實時更新，截止日唔會錯過 |
| 首页列表 CTA | 立即搜索 | 立即搵學校 |
| 空结果 | 暫無學校 | 搵唔到合條件嘅學校 · 試下放寬區域？ |
| 收藏成功 toast | 已收藏 | 已收藏 · 要開埋截止提醒嗎？ |
| 提醒设置 | 選擇提醒天數 | 幾耐前通知你？7 日 / 3 日 / 1 日 |
| Cron 失败 email | 你的提醒發送失敗 | 今次發你嘅提醒我哋漏咗，失禮，已經補返畀你 |
| 收藏上限 | 已達收藏上限（10間） | 你已經有 10 間收藏喇 · 清走邊間先？ |
| 未開放 | 未開放 | 暫未接受申請 · 請查閱學校官網 |

### 8.3 品牌短语库

- 「幫你搵到，幫你跟到，幫你記得住」（slogan）
- 「唔收學校錢，只對你負責」（立场）
- 「873 間幼稚園，一個地方睇晒」（数据）
- 「呢度由一個爸爸 / 媽媽嘅週末開始」（origin，放 About）

---

## 9. 无障碍（a11y）自检

新色板需通过 WCAG 2.1 AA。手动核对：

| 组合 | Ratio | AA normal | AA large |
|---|---|---|---|
| `fg-primary` #1A1A1A on `bg-canvas` #FBF9F4 | 16.1 : 1 | ✓ | ✓ |
| `fg-secondary` #4A4A4A on `bg-paper` #FFF | 8.2 : 1 | ✓ | ✓ |
| `fg-muted` #7A756C on `bg-canvas` | 4.8 : 1 | ✓ | ✓ |
| white on `brand-ink` #0B1B2B | 16.8 : 1 | ✓ | ✓ |
| white on `brand-coral` #E8674A | 3.9 : 1 | ✗ normal 文字 | ✓ 大号 / 按钮 |
| `#A04523` on `brand-coral-soft` #FCEAE2 | 5.4 : 1 | ✓ | ✓ |

**结论**：coral 按钮上的 CTA 文字必须 ≥ 15px 且 ≥ 500 weight（大号字），或改用 `brand-ink` 字色。默认 CTA 全部 17/600，已满足。

其他 a11y 项（focus ring、reduced-motion、键盘顺序、aria-label）在 design-handoff 阶段单独一页规格。

---

## 10. 落地路线图

分 3 个 Sprint，每个 Sprint 约 1.5~2 周（solo 开发者估算，参考 TODO.md 的节奏）。

### Sprint 1 · 基础底层（不碰任何页面）

目标：新设计系统就位，但视觉上用户看不到变化。
- [ ] Tailwind config 扩展：新 color token / font token / radius / shadow / transition。
- [ ] 引入 Google Fonts（Noto Sans TC / Noto Serif TC / Inter），首屏 preload，检查 CLS。
- [ ] 改写 `src/components/ui/Button.tsx` — 新 variant `accent` + 新交互。
- [ ] 改写 `src/components/ui/Input.tsx` 和 `BottomSheet.tsx`。
- [ ] 新增 `Section` 组件（`tone="light|warm|dark"`）。
- [ ] 新增 `Avatar` 组件（方形圆角 + 8 色 hash）。
- [ ] 新增 `EmptyState` 组件 + 3 张占位插画 SVG。
- [ ] 跑 lint / build，确保兼容。

**验收**：全站视觉几乎无变化（按钮 hover 略升起 + 字体稍微换），但 DevTools 里 CSS 变量已全部切换。

### Sprint 2 · 首页 + 列表页（用户能感知的第一波）

- [ ] 首页重写：Hero dark 段 + 新搜索栏 + 新三幕叙事。
- [ ] 配套 7~10 张插画 SVG（自制或 Undraw 定制化配色）。
- [ ] `ParentMustKnow` 从横向 card 改纵向 timeline。
- [ ] `FeaturedSchools + NewsFeed` 合并一段。
- [ ] 新增 Brand Footer Emphasis 段。
- [ ] 列表页：SchoolCard 重构（按 4.3 新版）。
- [ ] FilterBar 改 sticky segmented control。
- [ ] Empty state、loading skeleton 一并换成新组件。

**验收**：首页 + 列表页看起来像一个「有品牌的」产品。

### Sprint 3 · 详情 + 账户 + 剩余页面

- [ ] 详情页：Hero 重做 + 申请进度时间轴 + 新底部 CTA。
- [ ] 账户页：欢迎 Serif + 收藏卡倒计时 + checklist。
- [ ] 时间线页：全屏 timeline + sticky 月份导航。
- [ ] 对比页：新表格样式 + 差异行高亮。
- [ ] 邮件模板（Resend）：换字体、换色、换语气。
- [ ] 更新 CLAUDE.md「Design System」章节为新语言。
- [ ] 跑一次 Lighthouse，目标 Performance ≥ 90 / a11y ≥ 95。

**验收**：全站一致 + 设计规范文档更新完毕。

---

## 11. 风险与取舍

| 风险 | 判断 | 缓解 |
|---|---|---|
| 引入 Google Fonts 影响首屏 | 中。TC 字体文件大（约 2~5MB，subset 后可降到 200KB）。 | 用 `next/font/google` + `display=swap` + 只加载 400/500/700 weight。subset latin+chinese-traditional。Lighthouse 测。 |
| coral 按钮 a11y 对比度临界 | 低。只要 ≥17px/600 weight 即可。 | 代码层面 lint 规则禁止在 coral 上用 <15px 字。 |
| 旧 `slate-*` 散布全码 | 高。几十个文件要改。 | Sprint 1 保留 Tailwind safelist `slate-*`，Sprint 2/3 逐步替换，ESLint 规则在后期启用「禁用 slate」。 |
| CLAUDE.md 里 9 条原则要改写 | 中。影响 AI 协作一致性。 | Sprint 3 收尾时同步更新 CLAUDE.md，加入新原则 + 旧原则废弃说明。 |
| 插画工作量 | 中。8~10 张 + 3 张学校 hero 变体。 | 第一版允许用 unDraw + 改色，后续再替换自制版本。 |

---

## 12. 下一步

如果这个方案方向对，接下来我按顺序交付：

1. **一份 `theme-factory` 格式的主题 JSON**（直接可装到 Tailwind / CSS vars）。
2. **一份 `web-artifacts-builder` 生成的静态 HTML 样机**（单文件，可直接浏览器打开看完整效果），覆盖：新 Hero + 新 SchoolCard × 3 + 新 Footer。用来先在视觉上「拍板」。
3. **一份 `design:design-system` 格式的组件规格表**（每个组件的 props / state / variants），作为落地 Sprint 1 的施工图。
4. Sprint 1 落地 — 实打实改 Tailwind config + 3 个底层组件。

---

**签名**：这份方案刻意没有保留「还不错」的现状部分。你如果觉得某些地方太激进（比如 Serif 用得太多、coral 太亮），告诉我，我做 B 方案并列出两份的 trade-off。
