"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  {
    href: "/kg",
    label: "找幼稚園",
    match: ["/kg"],
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m16.5 16.5 4 4" />
      </svg>
    ),
  },
  {
    href: "/programmes",
    label: "康體通",
    match: ["/programmes"],
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 3v3" />
        <path d="M17 3v3" />
        <path d="M4 9h16" />
        <rect x="4" y="5" width="16" height="16" rx="3" />
      </svg>
    ),
  },
  {
    href: "/activities",
    label: "活動",
    match: ["/activities"],
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3v18" />
        <path d="M7 8h10" />
        <path d="M6 16h12" />
        <path d="M8 3h8" />
      </svg>
    ),
  },
  {
    href: "/news",
    label: "資訊",
    match: ["/news"],
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 4h14v16H5z" />
        <path d="M8 8h8" />
        <path d="M8 12h8" />
        <path d="M8 16h5" />
      </svg>
    ),
  },
  {
    href: "/account",
    label: "我的",
    match: ["/account"],
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M5 21a7 7 0 0 1 14 0" />
      </svg>
    ),
  },
] as const;

function isActive(pathname: string | null, match: readonly string[]) {
  if (!pathname) return false;
  return match.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 grid h-[68px] grid-cols-5 border-t border-surface-border bg-white/95 px-1 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(31,42,36,0.08)] backdrop-blur lg:hidden">
      {ITEMS.map((item) => {
        const active = isActive(pathname, item.match);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex min-w-0 flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors ${
              active ? "text-forest-700" : "text-ink-400"
            }`}
            aria-current={active ? "page" : undefined}
          >
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                active ? "bg-forest-50" : "bg-transparent"
              }`}
            >
              <span className="[&>svg]:h-[20px] [&>svg]:w-[20px] [&>svg]:fill-none [&>svg]:stroke-current [&>svg]:stroke-[1.9] [&>svg]:stroke-linecap-round [&>svg]:stroke-linejoin-round">
                {item.icon}
              </span>
            </span>
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
