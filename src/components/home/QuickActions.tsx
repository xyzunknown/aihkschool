import Link from "next/link";
import { Bell, Buildings, Heart, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

const ACTIONS = [
  {
    href: "/kg",
    title: "搜尋學校",
    desc: "快速找到合適學校",
    iconBg: "bg-forest-50/70",
    iconFg: "text-forest-700",
    icon: MagnifyingGlass,
  },
  {
    href: "/timeline?filter=deadline",
    title: "截止提醒",
    desc: "重要日期不錯過",
    iconBg: "bg-sand-50/75",
    iconFg: "text-sand-700",
    icon: Bell,
  },
  {
    href: "/kg?has_vacancy=1",
    title: "學位空缺",
    desc: "即時查看空缺情況",
    iconBg: "bg-[#FFF4DC]/80",
    iconFg: "text-[#A46612]",
    icon: Buildings,
  },
  {
    href: "/account",
    title: "我的收藏",
    desc: "收藏學校與文章",
    iconBg: "bg-[#FCEBE8]/80",
    iconFg: "text-[#B4473B]",
    icon: Heart,
  },
];

export function QuickActions() {
  return (
    <section className="max-w-[1200px] mx-auto px-5 md:px-8 mt-2 md:mt-1">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-0 bg-white rounded-card border border-surface-border shadow-soft p-3 md:p-3 md:divide-x md:divide-surface-border">
        {ACTIONS.map((a) => (
          <Link
            key={a.title}
            href={a.href}
            className="group flex items-center gap-3 px-3 md:px-4 py-1.5 rounded-card hover:bg-surface-soft transition min-h-[58px]"
          >
            <span
              className={`shrink-0 w-9 h-9 rounded-full ${a.iconBg} ${a.iconFg} flex items-center justify-center`}
            >
              <a.icon size={20} weight="regular" aria-hidden="true" />
            </span>
            <span className="flex flex-col leading-tight min-w-0">
              <span className="text-sm font-semibold text-[#18352B] group-hover:text-forest-700 transition truncate">
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
