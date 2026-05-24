"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDots, MagnifyingGlass, NewspaperClipping, Sparkle, UserCircle } from "@phosphor-icons/react";

const ITEMS = [
  {
    href: "/kg",
    label: "找幼稚園",
    match: ["/kg"],
    icon: MagnifyingGlass,
  },
  {
    href: "/programmes",
    label: "康體通",
    match: ["/programmes"],
    icon: CalendarDots,
  },
  {
    href: "/activities",
    label: "活動",
    match: ["/activities"],
    icon: Sparkle,
  },
  {
    href: "/news",
    label: "資訊",
    match: ["/news"],
    icon: NewspaperClipping,
  },
  {
    href: "/account",
    label: "我的",
    match: ["/account"],
    icon: UserCircle,
  },
] as const;

function isActive(pathname: string | null, match: readonly string[]) {
  if (!pathname) return false;
  return match.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 grid h-[68px] grid-cols-5 border-t border-surface-border bg-white px-1 pb-[env(safe-area-inset-bottom)] shadow-dock lg:hidden">
      {ITEMS.map((item) => {
        const active = isActive(pathname, item.match);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex min-w-0 flex-col items-center justify-center gap-1 text-label font-semibold transition-colors ${
              active ? "text-forest-700" : "text-ink-400"
            }`}
            aria-current={active ? "page" : undefined}
          >
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                active ? "bg-forest-50" : "bg-transparent"
              }`}
            >
              <Icon aria-hidden="true" size={21} weight={active ? "fill" : "regular"} />
            </span>
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
