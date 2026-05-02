import Image from "next/image";
import Link from "next/link";
import type { SchoolEventItem, FeaturedSchool } from "@/types/homepage";

interface Props {
  events: SchoolEventItem[];
  schools: FeaturedSchool[];
}

const STATUS_STYLE: Record<string, string> = {
  available: "bg-status-available-bg text-status-available-fg ring-1 ring-status-available-fg/12 shadow-[0_6px_18px_rgba(46,125,50,0.14)]",
  limited: "bg-status-limited-bg text-status-limited-fg ring-1 ring-status-limited-fg/12 shadow-[0_6px_18px_rgba(180,120,0,0.12)]",
  full: "bg-status-full-bg text-status-full-fg ring-1 ring-status-full-fg/12 shadow-[0_6px_18px_rgba(177,61,38,0.12)]",
  pending: "bg-status-pending-bg text-status-pending-fg ring-1 ring-status-pending-fg/12 shadow-[0_6px_18px_rgba(107,114,128,0.12)]",
};

function vacancyKey(status?: string) {
  if (!status) return "pending";
  const s = status.toLowerCase();
  if (s.includes("has") || status.includes("有位")) return "available";
  if (s.includes("limit") || status.includes("少量") || status.includes("緊張")) return "limited";
  if (s.includes("no_vacancy") || s.includes("full") || status.includes("已滿") || status.includes("滿")) return "full";
  return "pending";
}

function vacancyLabel(key: string) {
  return { available: "有位", limited: "少量", full: "額滿", pending: "待更新" }[key] ?? "—";
}

export function ProgressBoard({ events, schools }: Props) {
  const now = new Date();
  const sevenDaysOut = new Date(now.getTime() + 7 * 86400000);
  const fourteenDaysOut = new Date(now.getTime() + 14 * 86400000);

  const openDayCount = events.filter(
    (e) => e.event_type === "open_day" && !e.is_past && new Date(e.date_iso) <= sevenDaysOut
  ).length;
  const deadlineCount = events.filter(
    (e) => e.event_type === "deadline" && !e.is_past && new Date(e.date_iso) <= fourteenDaysOut
  ).length;

  const vacancyItems = schools.slice(0, 5).map((s) => {
    const offered = (["k1", "k2", "k3"] as const).filter((g) => {
      const status = s.vacancyStatus?.[g];
      return status && !status.toLowerCase().includes("not_offered") && status !== "—";
    });
    const grades = offered.length
      ? offered.length === 1
        ? offered[0].toUpperCase()
        : `${offered[0].toUpperCase()} - ${offered[offered.length - 1].toUpperCase()}`
      : null;
    return {
      school: s,
      statusKey: vacancyKey(s.vacancyStatus?.k1),
      grades,
    };
  });

  return (
    <section className="max-w-[1200px] mx-auto px-5 md:px-8 mt-9 md:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-8">
      {/* Left column — application progress board */}
      <div>
        <SectionHeader title="申請進度看板" href="/timeline" />
        <div className="space-y-4">
          <TaskCard
            title="本週開放日"
            badge={openDayCount > 0 ? `${openDayCount} 場` : undefined}
            desc={
              openDayCount > 0
                ? `未來 7 日內共有 ${openDayCount} 場開放日`
                : "暫未收到本週開放日資訊，可訂閱後續更新"
            }
            sub={openDayCount > 0 ? "把握機會，盡早了解學校環境" : undefined}
            cta="查看日程"
            href="/timeline?filter=open_day"
            illustration="/brand/timeline/school.png"
            tone="brand"
          />
          <TaskCard
            title="即將截止"
            badge={deadlineCount > 0 ? `${deadlineCount} 間` : undefined}
            desc={
              deadlineCount > 0
                ? `未來 14 日內 ${deadlineCount} 間學校截止申請`
                : "暫無 14 日內截止申請的學校"
            }
            sub={deadlineCount > 0 ? "提早準備，把握心儀學校" : undefined}
            cta="查看截止列表"
            href="/timeline?filter=deadline"
            illustration="/brand/timeline/calendar.png"
            tone="warn"
          />
          <TaskCard
            title="申請助手"
            desc="智能提醒關鍵時間點，建立清單，追蹤申請進度"
            cta="建立申請清單"
            href="/account"
            illustration="/brand/mascot/miumiu-reminder1024×1024.png"
            tone="brand"
          />
        </div>
      </div>

      {/* Right column — vacancy ticker list */}
      <div>
        <SectionHeader title="學位空缺速遞" href="/kg?has_vacancy=1" />
        <div className="bg-white rounded-card border border-surface-border shadow-[0_8px_24px_rgba(30,82,56,0.06)] overflow-hidden">
          <ul className="divide-y divide-surface-border">
            {vacancyItems.map((v) => (
              <li key={v.school.id}>
                <Link
                  href={v.school.href}
                  className="flex items-center gap-3 px-4 py-3.5 min-h-[78px] hover:bg-surface-soft transition"
                >
                  <div className="shrink-0 w-12 h-12 rounded-lg bg-surface-soft flex items-center justify-center overflow-hidden">
                    <Image
                      src="/brand/timeline/school.png"
                      alt=""
                      width={48}
                      height={48}
                      className="w-9 h-9 object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-ink-900 truncate">{v.school.name_tc}</p>
                    <p className="text-xs text-ink-500 mt-0.5 flex items-center gap-2">
                      <span>📍 {v.school.district}</span>
                      {v.grades && (
                        <>
                          <span className="text-ink-400">·</span>
                          <span className="text-ink-700">{v.grades}</span>
                        </>
                      )}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${STATUS_STYLE[v.statusKey]}`}>
                      {vacancyLabel(v.statusKey)}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/kg?has_vacancy=1"
            className="block text-center px-4 py-3 text-sm font-semibold text-brand-700 hover:bg-surface-soft border-t border-surface-border transition"
          >
            更多學位空缺 →
          </Link>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ title, href }: { title: string; href: string }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-xl md:text-2xl font-semibold text-ink-900 flex items-center gap-2">
        <span className="inline-block w-1 h-5 bg-brand-700 rounded-full" />
        {title}
      </h2>
      <Link href={href} className="text-xs text-brand-700 hover:underline font-medium">
        查看全部 →
      </Link>
    </div>
  );
}

function TaskCard({
  title,
  badge,
  desc,
  sub,
  cta,
  href,
  illustration,
  tone,
}: {
  title: string;
  badge?: string;
  desc: string;
  sub?: string;
  cta: string;
  href: string;
  illustration: string;
  tone: "brand" | "warn";
}) {
  const badgeStyle = tone === "warn" ? "bg-status-limited-bg text-status-limited-fg" : "bg-brand-50 text-brand-700";
  return (
    <div className="bg-white rounded-card border border-surface-border shadow-[0_8px_24px_rgba(30,82,56,0.06)] p-5 min-h-[138px] flex items-center gap-3 hover:shadow-[0_12px_30px_rgba(30,82,56,0.1)] transition">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-base font-semibold text-ink-900">{title}</h3>
          {badge && <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${badgeStyle}`}>{badge}</span>}
        </div>
        <p className="text-sm text-ink-700 leading-snug">{desc}</p>
        {sub && <p className="text-xs text-ink-500 mt-0.5">{sub}</p>}
        <Link href={href} className="inline-flex items-center mt-3 text-sm font-semibold text-brand-700 hover:underline">
          {cta} →
        </Link>
      </div>
      <Image
        src={illustration}
        alt=""
        width={88}
        height={88}
        className="w-[72px] h-[72px] object-contain shrink-0"
      />
    </div>
  );
}
