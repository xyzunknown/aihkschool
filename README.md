## HKSchoolPlace

### 常用命令

```bash
npm run dev
npm run build
npm run lint
```

### 首页 Banner 开关

首页 Banner 默认关闭，不渲染轮播，也不会留下占位。

如需重新开启，在环境变量里加入：

```bash
HOMEPAGE_BANNER_ENABLED=true
```

### 首页热点学校规则

首页“热点学校”区域必须复用 `src/components/schools/SchoolCard.tsx`，和“找幼稚园”列表保持同一张学校卡片。

以后只要调整学校卡片样式、信息层级、按钮或学额展示，必须改共享的 `SchoolCard`，不要给首页另写一套卡片。

首页“查看全部”必须进入 `/kg?hot=100`，由“找幼稚园”页面显示这 100 所学校；不要恢复独立热点学校页面。

### Supabase 类型生成

项目现在把 Supabase 类型拆成两层：

- `src/types/database.generated.ts`：由 CLI 生成，允许覆盖
- `src/types/database.ts`：稳定导出层，供应用代码引用

首次使用前，准备以下环境：

```bash
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_ACCESS_TOKEN=...
```

然后执行：

```bash
npm run supabase:types
```

只校验生成文件是否过期：

```bash
npm run supabase:types:check
```

如果本机还没登录 Supabase CLI，也可以先运行：

```bash
npx supabase login
```

### Supabase Migration 说明

当前生产项目已经存在远端 schema，但远端 migration history 还没有和本地 `supabase/migrations` 完全对齐。

这意味着：

- 不要直接运行 `npx supabase db push`
- 否则 CLI 可能会从 `001_create_tables.sql` 开始重放，并在远端已存在的表上失败

这次 favorites 权限修复对应的 migration 是 `supabase/migrations/024_grant_favorites_table_access.sql`。

如果远端历史仍未整理，而你只需要应用这条修复，请在 Supabase Dashboard -> SQL Editor 手动执行：

```sql
GRANT SELECT, INSERT, UPDATE, DELETE ON public.favorites TO authenticated;
```

等远端 migration history 补齐后，再恢复正常的 CLI migration 流程。

### OAuth Redirect URL 配置

Google / OAuth 登录在本地开发和 Vercel Preview 都依赖 Supabase Auth 的 URL Configuration。

请在 Supabase Dashboard -> Authentication -> URL Configuration 中确认：

```text
Site URL: https://aihkschool.vercel.app
Redirect URLs:
- http://localhost:3000/**
- https://*-xyzunknowns-projects.vercel.app/**
- https://aihkschool.vercel.app/**
```

项目里的登录回跳地址会优先使用 `NEXT_PUBLIC_SITE_URL`，其次使用 `NEXT_PUBLIC_VERCEL_URL`，最后回退到当前页面 origin。
