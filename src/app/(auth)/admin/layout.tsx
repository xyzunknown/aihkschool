import Link from "next/link";
import { requireAdminPage } from "@/lib/admin/auth";

const NAV = [
  { href: "/admin", label: "今日概覽" },
  { href: "/admin/health", label: "數據健康" },
  { href: "/admin/schools", label: "學校管理" },
  { href: "/admin/vacancies", label: "學額管理" },
  { href: "/admin/programmes", label: "課程管理" },
  { href: "/admin/activities", label: "活動管理" },
  { href: "/admin/content", label: "消息時間線" },
  { href: "/admin/users", label: "用戶管理" },
  { href: "/admin/growth", label: "增長後台" },
  { href: "/admin/homepage", label: "首頁內容" },
  { href: "/admin/intel", label: "面試情報" },
  { href: "/admin/reminders", label: "提醒狀態" },
  { href: "/admin/audit", label: "操作記錄" },
] as const;

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdminPage();

  return (
    <div className="min-h-[calc(100vh-73px)] bg-cream-50">
      <div className="mx-auto flex max-w-[1400px] gap-6 px-5 py-6 md:px-8">
        <aside className="sticky top-24 hidden h-fit w-56 shrink-0 rounded-card border border-surface-border bg-white p-3 lg:block">
          <div className="px-3 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">HKSchoolPlace</p>
            <h1 className="mt-1 text-lg font-bold text-ink-900">後台</h1>
          </div>
          <nav className="mt-2 space-y-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-button px-3 py-2 text-sm font-medium text-ink-700 hover:bg-cream-50 hover:text-ink-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="min-w-0 flex-1">
          <div className="mb-4 flex gap-2 overflow-x-auto lg:hidden">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-button border border-surface-border bg-white px-4 py-2 text-sm font-medium text-ink-700"
              >
                {item.label}
              </Link>
            ))}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
