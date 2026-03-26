import Link from "next/link";
import { OPEN_DAYS, DEADLINES, INSIGHTS } from "@/data/homepage";

function DeadlineBadge({ daysLeft }: { daysLeft: number }) {
  const colorClass =
    daysLeft < 7
      ? "bg-red-50 text-red-700"
      : daysLeft <= 14
        ? "bg-amber-50 text-amber-700"
        : "bg-emerald-50 text-emerald-700";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClass}`}
    >
      {daysLeft}天後
    </span>
  );
}

export function ParentMustKnow() {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-slate-950 mb-6">
        本週家長必知
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Left: Open days + Deadlines */}
        <div className="md:col-span-2 space-y-5">
          {/* Open days */}
          {OPEN_DAYS.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-500"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <h3 className="text-sm font-semibold text-slate-700">
                  即將開放日
                </h3>
              </div>
              <div className="space-y-2">
                {OPEN_DAYS.map((item) => (
                  <Link key={item.id} href={item.href} className="block">
                    <div className="bg-white rounded-2xl border border-slate-200 px-5 py-4 flex items-center justify-between hover:shadow-sm transition-shadow">
                      <div>
                        <p className="font-medium text-slate-950">
                          {item.school_name}
                        </p>
                        <p className="text-sm text-slate-500 mt-0.5">
                          {item.date}
                        </p>
                      </div>
                      <span className="text-slate-400">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Deadlines */}
          {DEADLINES.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-500"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <h3 className="text-sm font-semibold text-slate-700">
                  即將截止
                </h3>
              </div>
              <div className="space-y-2">
                {DEADLINES.map((item) => (
                  <Link key={item.id} href={item.href} className="block">
                    <div className="bg-white rounded-2xl border border-slate-200 px-5 py-4 flex items-center justify-between hover:shadow-sm transition-shadow">
                      <div>
                        <p className="font-medium text-slate-950">
                          {item.school_name}
                        </p>
                        <p className="text-sm text-slate-500 mt-0.5">
                          截止：{item.deadline}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <DeadlineBadge daysLeft={item.days_left} />
                        <span className="text-slate-400">→</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Parent insights dark card */}
        <div className="bg-slate-900 text-white rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">近期家長心得</h3>
          <div className="space-y-3">
            {INSIGHTS.map((insight) => (
              <Link key={insight.id} href={insight.href} className="block">
                <div className="pb-3 border-b border-slate-700 last:border-0 hover:opacity-80 transition-opacity">
                  <p className="text-sm font-medium mb-1 leading-snug">
                    &ldquo;{insight.title}&rdquo;
                  </p>
                  <p className="text-xs text-slate-400">
                    {insight.author} · {insight.date}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <Link
            href="/submit"
            className="block mt-4 text-center text-sm text-slate-400 hover:text-white transition-colors"
          >
            分享你嘅心得 →
          </Link>
        </div>
      </div>
    </section>
  );
}
