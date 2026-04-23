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
