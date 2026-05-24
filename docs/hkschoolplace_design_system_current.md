# HKSchoolPlace Current Design System

This is the current source of truth for new HKSchoolPlace web UI work. Older visual references can still be useful for history, but new features should follow this document first.

## Design Intent

HKSchoolPlace should feel warm, clear, credible, and parent-friendly. It is a practical decision tool for families, not a cold admin product and not a decorative marketing site.

The product voice is:

- Clear before clever.
- Warm before playful.
- Trustworthy before flashy.
- Dense enough for comparison, but not visually crowded.

Use Traditional Chinese for user-facing UI. Keep the tone natural for Hong Kong parents. English is reserved for brand names, official school names, technical identifiers, and unavoidable third-party names.

## Core Visual Rules

- Page background uses warm ivory: `surface-page` / `cream-50`.
- Cards and panels use solid white with a soft green-gray border.
- Main actions use forest green.
- Status colors are information, not decoration.
- Avoid one-off page styles. Login, account, detail, list, and marketing-adjacent pages should all feel like the same product.
- Avoid glass/blur card treatments for the main product UI.
- Avoid hard black CTAs unless the surrounding design explicitly supports it.

```text
Page
┌────────────────────────────────────┐
│ warm ivory background              │
│                                    │
│ ┌──────── white card ────────────┐ │
│ │ clear title                     │ │
│ │ useful details                  │ │
│ │ green primary action            │ │
│ └────────────────────────────────┘ │
└────────────────────────────────────┘
```

## Color

Use the existing Tailwind tokens as the shared palette.

| Purpose                 | Token                                    |
| ----------------------- | ---------------------------------------- |
| Page background         | `surface-page`, `cream-50`, `ivory-50`   |
| Soft section background | `surface-soft`, `cream-100`, `ivory-100` |
| Card surface            | `white`                                  |
| Border                  | `surface-border`, `line-card`            |
| Primary text            | `ink-900`                                |
| Body text               | `ink-700`                                |
| Muted text              | `ink-500`                                |
| Main action             | `forest-700`, `brand-700`                |
| Main action hover       | `forest-800`                             |
| Soft selected state     | `forest-50`, `brand-50`, `leaf-50`       |
| Warm warning accent     | `clay-500`, `rust-500`                   |

Do not introduce new greens, creams, or grays unless a real state is missing. Reuse tokens even when a custom hex feels slightly nicer.

## Typography

Use the project font stack and Tailwind text tokens.

| Level          | Recommended use                           |
| -------------- | ----------------------------------------- |
| `text-display` | True landing/home hero only               |
| `text-h1`      | Main page titles and detail titles        |
| `text-h2`      | Card titles, section titles, school names |
| `text-body`    | Primary reading text and button text      |
| `text-small`   | Secondary metadata                        |
| `text-label`   | Tags, compact labels, field labels        |

Do not scale font size with viewport width. Keep letter spacing at `0` unless the existing token already defines it.

## Layout And Cards

Use white cards for repeated items and detail panels.

- Cards: `bg-white`, `border border-surface-border`, `rounded-card`, `shadow-soft` or no shadow.
- Detail panels may use slightly larger rounded corners only when matching nearby pages.
- Do not nest cards inside cards.
- Do not make entire page sections look like floating cards.
- Keep repeated information easy to scan in grids.

```text
Detail page information
┌──────────────┬──────────────┐
│ icon label   │ icon label   │
│ value        │ value        │
├──────────────┼──────────────┤
│ icon label   │ icon label   │
│ value        │ value        │
└──────────────┴──────────────┘
```

## Buttons

Use a small set of button styles.

| Type                      | Use                                                    |
| ------------------------- | ------------------------------------------------------ |
| Primary green pill/button | Main page action, usually one dominant action per view |
| Secondary outline         | Follow-up action beside a primary action               |
| Text link                 | Low-priority navigation or external source             |
| Icon button               | Compact tools like favorite, compare, close, remove    |

Button icons should be Phosphor icons and follow the icon rules below. Do not mix text arrows with icon arrows.

## Icon System

Use Phosphor as the primary web icon family for new work. The goal is a friendlier, rounder, more parent-friendly interface.

### Library

- Preferred: `@phosphor-icons/react`
- Default style: regular line icons
- Avoid mixing Lucide, handwritten SVG, emoji, and text arrows in product UI.
- Keep existing brand logos as their real brand marks where needed.

### Icon Categories

| Category           | Examples                                                             | Treatment                                                    |
| ------------------ | -------------------------------------------------------------------- | ------------------------------------------------------------ |
| Information icons  | date, time, place, district, fee, age, sessions, phone, website      | soft square or circle background                             |
| Action icons       | search, filter, favorite, compare, reminder, calendar, share, remove | button or chip context                                       |
| Navigation icons   | back, next, expand, external link, close, menu                       | no custom arrows, always the same family                     |
| Brand/social icons | Google, Apple, Facebook, Instagram, YouTube                          | use official marks or Phosphor brand icons where appropriate |

### Size Rules

| Context           | Icon size | Container                 |
| ----------------- | --------- | ------------------------- |
| Inline metadata   | 14-16px   | none                      |
| Filter chips      | 16-18px   | chip                      |
| Buttons           | 16-20px   | button                    |
| Information cards | 20-22px   | 36-40px soft icon tile    |
| Mobile bottom nav | 20-22px   | 28-32px active background |
| Empty states      | 28-36px   | 48-56px soft icon tile    |

### Color Rules

- Default icon color: `forest-700`.
- Muted utility icon: `ink-500`.
- Active icon: white on `forest-700` or `forest-600`.
- Information icon tile: `bg-forest-50 text-forest-700`.
- Avoid multicolor icons except official social/brand identity.

### Information Icon Tile

Use this pattern for detail facts on programmes, activities, and school details.

```text
┌────────────────────┐
│  ◉  報名開放        │
│     4月22日 00:30  │
└────────────────────┘
```

Recommended mapping:

| Data                  | Icon idea               |
| --------------------- | ----------------------- |
| Date                  | Calendar                |
| Time                  | Clock                   |
| Address / venue       | MapPin                  |
| District              | MapTrifold or Map       |
| Fee                   | Tag                     |
| Sessions / lessons    | BookOpen                |
| Age                   | UserCircle or Users     |
| Phone                 | Phone                   |
| Website               | Globe or ArrowSquareOut |
| Enrollment / reminder | Bell                    |
| School type           | Student or Buildings    |

## Arrow And Navigation Rules

Unify all arrows with Phosphor.

| Action          | Icon                             |
| --------------- | -------------------------------- |
| Back            | `CaretLeft` or `ArrowLeft`       |
| Enter detail    | `CaretRight`                     |
| Expand dropdown | `CaretDown`                      |
| Collapse        | rotated `CaretDown` or `CaretUp` |
| External link   | `ArrowSquareOut`                 |
| Close           | `X`                              |
| Remove chip     | `XCircle` or compact `X`         |
| Menu            | `List`                           |

Do not use raw characters like `←`, `→`, `◆`, or custom one-off arrow SVGs for product navigation. Decorative brand marks are separate from navigation.

## Filters And Selected Chips

The kindergarten list filters should use icons where they improve scanning, especially on mobile.

Use icons for filter group buttons and selected chips:

```text
[ 地區 ▼ ] [ 學位 ▼ ] [ 年級 ▼ ] [ 更多篩選 ]

已選：
[ 地圖 大埔 x ] [ 學生 K1 x ] [ 時鐘 全日班 x ]
```

Do not put icons on every tiny label if it makes the row crowded. Prioritize district, grade, session, vacancy, and special filters.

## Login And Account Pages

Login must follow the same product system as the rest of the site.

- Use the same ivory page background, white panels, green actions, and soft borders.
- Replace one-off custom login SVGs with Phosphor or official provider marks.
- Form fields use the same input shape as the rest of the product.
- Security and reminder messages can use soft icon tiles.
- Avoid a separate marketing-style login visual language.

```text
Login
┌────────────────────────────┐
│ HKSchoolPlace              │
│ 登入以儲存收藏和提醒        │
│                            │
│  Email field               │
│  Password field            │
│  [登入]                    │
│  [Google] [Apple]          │
│                            │
│ ◉ 安全保存你的偏好          │
└────────────────────────────┘
```

## Detail Pages

Programme, activity, and school detail pages should share the same detail-page grammar.

- Hero area: image or identity block on the left/top, title and actions beside/below.
- Tags: soft pills, restrained color.
- Primary action: green.
- Secondary actions: white outline or text link.
- Key facts: icon information tiles.
- Notices: soft green/ivory panel with an info icon.

Activity detail currently needs to move closer to the programme detail style. School detail also needs information icons in the factual sections.

## Mobile Rules

Phosphor works well on mobile because the icons are rounder and readable at small sizes. Keep mobile layouts compact.

- Touch targets should be at least 40px high, preferably 44px for important actions.
- Bottom navigation icons should remain simple and consistent.
- Selected filter chips can include icons, but keep text short.
- Information tiles can stack one column on narrow screens.
- Avoid icon tiles that consume too much vertical space in long lists.

```text
Mobile detail facts
┌────────────────────┐
│ ◉ 日期              │
│   5月21日 - 6月25日 │
├────────────────────┤
│ ◉ 場地              │
│   Tai Po Pool       │
└────────────────────┘
```

## Existing Pages To Align

| Area                     | Direction                                                                  |
| ------------------------ | -------------------------------------------------------------------------- |
| Programme detail         | Keep the current information-card direction, replace with Phosphor         |
| Activity detail          | Add matching information icons and align arrows/buttons                    |
| School detail            | Add factual section icon treatment where useful                            |
| Kindergarten filters     | Add icons to group controls and selected chips                             |
| Login                    | Rework to match system, remove one-off icon style                          |
| Header/footer/mobile nav | Standardize navigation icons and arrows                                    |
| Compare tools            | Use Phosphor action icons consistently                                     |
| Timeline                 | Replace emoji/bitmap-like event markers where product UI needs consistency |

## Do Not Do

- Do not introduce a second icon family for normal product UI.
- Do not draw new one-off SVG icons unless Phosphor truly lacks the symbol.
- Do not use emoji as functional icons.
- Do not mix raw arrow characters and icon arrows.
- Do not create a visually isolated page for new features.
- Do not add decorative blobs/orbs/gradients as a substitute for layout.
- Do not overuse colored chips. Color should signal state or category.

## Implementation Checklist For New UI

Before shipping a UI change:

- Does it use the shared color tokens?
- Does it use Phosphor for product icons?
- Are arrows and external-link indicators consistent?
- Does it work in mobile width without crowded chips or text overflow?
- Does the login/account/detail/list page still feel like HKSchoolPlace?
- Are cards, buttons, tags, and information tiles using existing shapes?
- Did you visually check the result in browser when the change affects UI?
