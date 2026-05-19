import Image from "next/image";
import Link from "next/link";
import type { FeaturedSchool } from "@/types/homepage";

const SCHOOL_PHOTOS = [
  "/brand/schools/sample-1.jpg",
  "/brand/schools/sample-2.jpg",
  "/brand/schools/sample-3.jpg",
  "/brand/schools/sample-4.jpg",
];

const STATUS_STYLE: Record<string, string> = {
  available: "bg-status-available-bg text-status-available-fg ring-1 ring-status-available-fg/12",
  limited: "bg-status-limited-bg text-status-limited-fg ring-1 ring-status-limited-fg/12",
  full: "bg-status-full-bg text-status-full-fg ring-1 ring-status-full-fg/12",
  pending: "bg-status-pending-bg text-status-pending-fg ring-1 ring-status-pending-fg/12",
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

interface Props {
  schools: FeaturedSchool[];
}

export function FeaturedSchoolsRow({ schools }: Props) {
  if (schools.length === 0) return null;
  const items = schools.slice(0, 3);

  return (
    <section className="max-w-[1200px] mx-auto px-5 md:px-8 mt-12">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-semibold text-ink-900 flex items-center gap-2">
          <span className="inline-block w-1 h-5 bg-brand-700 rounded-full" />
          推薦幼稚園
        </h2>
        <Link href="/kg" className="text-sm text-brand-700 hover:underline font-medium">
          查看全部學校 →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((s, i) => (
          <SchoolCard key={s.id} school={s} photo={SCHOOL_PHOTOS[i % SCHOOL_PHOTOS.length]} />
        ))}
      </div>
    </section>
  );
}

function SchoolCard({
  school,
  photo,
}: {
  school: FeaturedSchool;
  photo: string;
}) {
  const v = school.vacancyStatus;
  return (
    <Link
      href={school.href}
      className="group bg-white rounded-[20px] border border-surface-border overflow-hidden shadow-[0_8px_24px_rgba(30,82,56,0.06)] hover:shadow-[0_14px_32px_rgba(30,82,56,0.1)] transition-all duration-200 flex flex-col"
    >
      <div className="relative aspect-[16/9] bg-surface-soft overflow-hidden">
        <Image
          src={photo}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 360px"
          className="object-cover group-hover:scale-[1.04] transition duration-500"
        />
        <span
          aria-label="收藏"
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full border border-white/80 bg-white/95 flex items-center justify-center text-ink-500 hover:text-[#B4473B] shadow-[0_8px_18px_rgba(30,82,56,0.12)]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-base font-semibold text-ink-900 line-clamp-1 group-hover:text-brand-700 transition">
          {school.name_tc}
        </h3>
        <div className="flex items-center gap-1.5 mt-1.5 text-xs">
          <span className="text-ink-500 inline-flex items-center gap-0.5">📍 {school.district}</span>
          {school.sessionTags?.slice(0, 2).map((t) => (
            <span key={t} className="px-1.5 py-0.5 rounded-md bg-surface-soft text-ink-700 text-[11px]">
              {t}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1.5 mt-3">
          {(["k1", "k2", "k3"] as const).map((g) => {
            const key = vacancyKey(v?.[g]);
            return (
              <div
                key={g}
                className={`py-1.5 rounded-lg text-center ${STATUS_STYLE[key]}`}
              >
                <p className="text-[10px] font-medium opacity-90">{g.toUpperCase()}</p>
                <p className="text-xs font-bold mt-0.5">{vacancyLabel(key)}</p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-end mt-3 pt-3 border-t border-surface-border text-[11px] text-brand-700 font-medium">
          查看詳情 →
        </div>
      </div>
    </Link>
  );
}
