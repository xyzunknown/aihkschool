import Link from "next/link";

const ACTIONS = [
  {
    href: "/kg",
    title: "搜尋學校",
    desc: "快速找到合適學校",
    iconBg: "bg-brand-50/70",
    iconFg: "text-brand-700",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <line x1="16.5" y1="16.5" x2="22" y2="22" />
      </svg>
    ),
  },
  {
    href: "/timeline?filter=deadline",
    title: "截止提醒",
    desc: "重要日期不錯過",
    iconBg: "bg-sand-50/75",
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
    iconBg: "bg-[#FFF4DC]/80",
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
    iconBg: "bg-[#FCEBE8]/80",
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
    <section className="max-w-[1200px] mx-auto px-5 md:px-8 mt-2 md:mt-1">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-0 bg-white rounded-card border border-surface-border shadow-[0_12px_32px_rgba(30,82,56,0.07)] p-3 md:p-3 md:divide-x md:divide-surface-border">
        {ACTIONS.map((a) => (
          <Link
            key={a.title}
            href={a.href}
            className="group flex items-center gap-3 px-3 md:px-4 py-1.5 rounded-2xl hover:bg-surface-soft transition min-h-[58px]"
          >
            <span
              className={`shrink-0 w-9 h-9 rounded-full ${a.iconBg} ${a.iconFg} flex items-center justify-center`}
            >
              {a.icon}
            </span>
            <span className="flex flex-col leading-tight min-w-0">
              <span className="text-sm font-semibold text-[#18352B] group-hover:text-brand-700 transition truncate">
                {a.title}
              </span>
              <span className="text-[12px] text-[#7A877F] truncate">{a.desc}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
