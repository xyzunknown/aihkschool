import Link from "next/link";

const ACTIONS = [
  {
    href: "/kg",
    title: "搜尋學校",
    desc: "快速找到合適學校",
    iconBg: "bg-brand-50",
    iconFg: "text-brand-700",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <line x1="16.5" y1="16.5" x2="22" y2="22" />
      </svg>
    ),
  },
  {
    href: "/timeline",
    title: "開放日",
    desc: "查看近期開放日",
    iconBg: "bg-leaf-100",
    iconFg: "text-forest-700",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    href: "/timeline?filter=deadline",
    title: "截止提醒",
    desc: "重要日期不錯過",
    iconBg: "bg-sand-50",
    iconFg: "text-sand-700",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    href: "/kg?has_vacancy=1",
    title: "學位空缺",
    desc: "即時查看空缺情況",
    iconBg: "bg-[#FFF4DC]",
    iconFg: "text-[#A46612]",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: "/account",
    title: "我的收藏",
    desc: "收藏學校與文章",
    iconBg: "bg-[#FCEBE8]",
    iconFg: "text-[#B4473B]",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21s-7-4.35-7-10a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.65-7 10-11 10z" />
      </svg>
    ),
  },
];

export function QuickActions() {
  return (
    <section className="max-w-[1200px] mx-auto px-5 md:px-8 mt-2 md:mt-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 bg-white rounded-card border border-surface-border shadow-card p-4 md:p-5">
        {ACTIONS.map((a) => (
          <Link
            key={a.title}
            href={a.href}
            className="group flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-surface-soft transition"
          >
            <span
              className={`shrink-0 w-11 h-11 rounded-full ${a.iconBg} ${a.iconFg} flex items-center justify-center`}
            >
              {a.icon}
            </span>
            <span className="flex flex-col leading-tight min-w-0">
              <span className="text-sm font-semibold text-ink-900 group-hover:text-brand-700 transition truncate">
                {a.title}
              </span>
              <span className="text-[11px] text-ink-500 truncate">{a.desc}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
