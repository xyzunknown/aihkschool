import Link from "next/link";
import type {
  DeadlineItem,
  OfficialLinkItem,
  OpenDayItem,
} from "@/types/homepage";

function DetailBadge({ label }: { label?: string }) {
  if (!label) return null;

  return (
    <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
      {label}
    </span>
  );
}

interface ParentMustKnowProps {
  openDays: OpenDayItem[];
  admissions: DeadlineItem[];
  officialLinks: OfficialLinkItem[];
}

export function ParentMustKnow({
  openDays,
  admissions,
  officialLinks,
}: ParentMustKnowProps) {
  return (
    <section className="mb-10">
      <h2 className="mb-6 text-xl font-semibold text-slate-950">本週家長必知</h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="space-y-5 md:col-span-2">
          {openDays.length > 0 && (
            <div>
              <div className="mb-3 flex items-center gap-2">
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
                  校園參觀 / 開放日
                </h3>
              </div>
              <div className="space-y-2">
                {openDays.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block"
                  >
                    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 transition-shadow hover:shadow-sm">
                      <div>
                        <p className="font-medium text-slate-950">{item.school_name}</p>
                        <p className="mt-0.5 text-sm text-slate-500">{item.date}</p>
                      </div>
                      <span className="text-slate-400">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {admissions.length > 0 && (
            <div>
              <div className="mb-3 flex items-center gap-2">
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
                <h3 className="text-sm font-semibold text-slate-700">招生進行中</h3>
              </div>
              <div className="space-y-2">
                {admissions.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block"
                  >
                    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 transition-shadow hover:shadow-sm">
                      <div>
                        <p className="font-medium text-slate-950">{item.school_name}</p>
                        <p className="mt-0.5 text-sm text-slate-500">{item.deadline}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <DetailBadge label={item.badge} />
                        <span className="text-slate-400">→</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-slate-900 p-6 text-white">
          <h3 className="mb-4 text-lg font-semibold">教育局相關入口</h3>
          <div className="space-y-3">
            {officialLinks.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="block"
              >
                <div className="border-b border-slate-700 pb-3 transition-opacity last:border-0 hover:opacity-80">
                  <p className="mb-1 text-sm font-medium leading-snug">{item.title}</p>
                  <p className="text-xs text-slate-400">{item.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
          <Link
            href="https://www.edb.gov.hk/en/student-parents/parents-related/ebulletin-for-parents/"
            target="_blank"
            rel="noreferrer"
            className="mt-4 block text-center text-sm text-slate-400 transition-colors hover:text-white"
          >
            查看教育局家長專頁 →
          </Link>
        </div>
      </div>
    </section>
  );
}
