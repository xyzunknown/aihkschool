import Link from "next/link";
import Image from "next/image";
import type { SchoolEventItem } from "@/types/homepage";

const HOT_DISTRICTS = [
  { name: "北區", count: 28 },
  { name: "元朗區", count: 45 },
  { name: "沙田區", count: 44 },
  { name: "屯門區", count: 38 },
  { name: "九龍城", count: 32 },
  { name: "中西區", count: 41 },
  { name: "灣仔區", count: 27 },
];

interface Props {
  events: SchoolEventItem[];
}

export function InfoCard4Up({ events }: Props) {
  const now = new Date();
  const sevenDaysOut = new Date(now.getTime() + 7 * 86400000);

  const openDays = events
    .filter((e) => e.event_type === "open_day" && !e.is_past && new Date(e.date_iso) <= sevenDaysOut)
    .slice(0, 3);

  const deadlines = events
    .filter((e) => e.event_type === "deadline" && !e.is_past)
    .slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* 熱門地區 */}
      <Card>
        <CardHeader title="熱門地區">
          <Link href="/kg" className="text-xs text-forest-600 hover:underline">
            查看全部地區 →
          </Link>
        </CardHeader>
        <div className="flex flex-wrap gap-2 mt-2 flex-1">
          {HOT_DISTRICTS.map((d) => (
            <Link
              key={d.name}
              href={`/kg?district=${encodeURIComponent(d.name)}`}
              className="px-3 py-1.5 rounded-pill bg-leaf-50 text-forest-700 text-xs font-medium hover:bg-forest-100 transition"
            >
              {d.name} <span className="text-forest-500">{d.count}</span>
            </Link>
          ))}
        </div>
        <Link
          href="/kg"
          className="mt-4 block text-center px-4 h-9 rounded-pill border border-forest-300 text-forest-700 text-sm font-medium hover:bg-forest-50 transition leading-9"
        >
          查看全部地區
        </Link>
      </Card>

      {/* 本週開放日 */}
      <Card>
        <CardHeader title="本週開放日">
          <Link href="/timeline" className="text-xs text-forest-600 hover:underline">
            查看全部 →
          </Link>
        </CardHeader>
        <ul className="mt-2 space-y-3 flex-1">
          {openDays.length === 0 && (
            <li className="text-sm text-ink-500">本週暫無開放日</li>
          )}
          {openDays.map((e) => (
            <li key={e.id} className="border-b border-cream-200 pb-2 last:border-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-forest-700">{e.date}</span>
                <DistrictBadge district={e.district} />
              </div>
              <Link href={e.detail_href} className="text-sm text-ink-900 mt-1 block hover:text-forest-600 line-clamp-1">
                {e.school_name}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/timeline"
          className="mt-4 block text-center px-4 h-9 rounded-pill bg-forest-600 text-white text-sm font-medium hover:bg-forest-700 transition leading-9"
        >
          查看全部開放日
        </Link>
      </Card>

      {/* 即將截止 */}
      <Card>
        <CardHeader title="即將截止" icon="🔔" iconClass="text-rust-500">
          <Link href="/timeline" className="text-xs text-forest-600 hover:underline">
            查看全部 →
          </Link>
        </CardHeader>
        <ul className="mt-2 space-y-3 flex-1">
          {deadlines.length === 0 && (
            <li className="text-sm text-ink-500">暫無即將截止事項</li>
          )}
          {deadlines.map((e) => (
            <li key={e.id} className="border-b border-cream-200 pb-2 last:border-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-rust-500/10 text-rust-600 text-[10px] font-bold">
                  截止 {e.date}
                </span>
              </div>
              <Link href={e.detail_href} className="text-sm text-ink-900 mt-1 block hover:text-forest-600 line-clamp-1">
                {e.school_name}
              </Link>
              <p className="text-[11px] text-ink-500">{e.event_label}</p>
            </li>
          ))}
        </ul>
        <Link
          href="/timeline"
          className="mt-4 block text-center px-4 h-9 rounded-pill border border-rust-500 text-rust-600 text-sm font-medium hover:bg-rust-500/10 transition leading-9"
        >
          查看所有截止事項
        </Link>
      </Card>

      {/* 提醒中心 */}
      <Card className="bg-gradient-to-br from-leaf-50 to-cream-100">
        <CardHeader title="提醒中心" />
        <div className="flex-1 flex flex-col items-center text-center mt-2">
          <Image
            src="/brand/mascot/miumiu-reminder1024×1024.png"
            alt="提醒中心"
            width={120}
            height={120}
            className="w-24 h-24 object-contain"
          />
          <p className="text-base font-semibold text-ink-900 mt-2">建立個人提醒清單</p>
          <p className="text-xs text-ink-700 mt-1">
            建立心儀學校、截止日期提醒，
            <br />
            申請進度一目瞭然，不錯過重要事項。
          </p>
        </div>
        <Link
          href="/account"
          className="mt-4 block text-center px-4 h-9 rounded-pill bg-forest-600 text-white text-sm font-medium hover:bg-forest-700 transition leading-9"
        >
          立即建立
        </Link>
      </Card>
    </section>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`bg-white rounded-card border border-cream-200 p-5 shadow-soft flex flex-col min-h-[280px] ${className}`}
    >
      {children}
    </div>
  );
}

function CardHeader({
  title,
  icon,
  iconClass = "",
  children,
}: {
  title: string;
  icon?: string;
  iconClass?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-base font-semibold text-ink-900 flex items-center gap-1.5">
        {icon && <span className={iconClass}>{icon}</span>}
        {title}
      </h3>
      {children}
    </div>
  );
}

function DistrictBadge({ district }: { district?: string }) {
  if (!district) return null;
  const labels: Record<string, string> = {
    central_and_western: "中西區",
    wan_chai: "灣仔區",
    eastern: "東區",
    southern: "南區",
    yau_tsim_mong: "油尖旺區",
    sham_shui_po: "深水埗區",
    kowloon_city: "九龍城",
    kwun_tong: "觀塘區",
    wong_tai_sin: "黃大仙",
    sha_tin: "沙田區",
    tai_po: "大埔區",
    yuen_long: "元朗區",
    tuen_mun: "屯門區",
    tsuen_wan: "荃灣區",
    kwai_tsing: "葵青區",
    sai_kung: "西貢區",
    north: "北區",
    islands: "離島區",
  };
  const label = labels[district] || district;
  return (
    <span className="px-2 py-0.5 rounded-md bg-leaf-50 text-forest-600 text-[10px] font-medium">
      {label}
    </span>
  );
}
