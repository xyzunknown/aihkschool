import Image from "next/image";
import Link from "next/link";
import type { FeaturedSchool } from "@/types/homepage";

const HIGHLIGHT_TAGS = ["熱門", "新上架", "推薦", "高評分"] as const;
const TAG_COLORS: Record<(typeof HIGHLIGHT_TAGS)[number], string> = {
  熱門: "bg-rust-500 text-white",
  新上架: "bg-forest-600 text-white",
  推薦: "bg-sand-200 text-sand-700",
  高評分: "bg-leaf-100 text-forest-700",
};

const SCHOOL_PHOTOS = [
  "/brand/schools/sample-1.jpg",
  "/brand/schools/sample-2.jpg",
  "/brand/schools/sample-3.jpg",
  "/brand/schools/sample-4.jpg",
];

interface Props {
  schools: FeaturedSchool[];
}

export function FeaturedSchoolsRow({ schools }: Props) {
  if (schools.length === 0) return null;
  const items = schools.slice(0, 8);

  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 mt-12">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold text-ink-900">為你推薦的幼稚園</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.slice(0, 4).map((s, i) => (
          <SchoolCard key={s.id} school={s} highlightTag={HIGHLIGHT_TAGS[i % 4]} photo={SCHOOL_PHOTOS[i % 4]} />
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link href="/kg" className="text-sm text-forest-600 hover:underline font-medium">
          查看全部學校 →
        </Link>
      </div>
    </section>
  );
}

function SchoolCard({
  school,
  highlightTag,
  photo,
}: {
  school: FeaturedSchool;
  highlightTag: (typeof HIGHLIGHT_TAGS)[number];
  photo: string;
}) {
  const sessionTags = school.sessionTags.slice(0, 2);
  const v = school.vacancyStatus;

  return (
    <Link
      href={school.href}
      className="group bg-white rounded-card border border-cream-200 overflow-hidden shadow-soft hover:shadow-card transition flex flex-col"
    >
      <div className="relative h-40 bg-cream-100 overflow-hidden">
        <Image
          src={photo}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className="object-cover group-hover:scale-105 transition duration-500"
        />
        <span className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-[10px] font-bold ${TAG_COLORS[highlightTag]} shadow-soft`}>
          {highlightTag}
        </span>
        <button
          aria-label="收藏"
          className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-ink-500 hover:text-rust-500"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-base font-semibold text-ink-900 line-clamp-1 group-hover:text-forest-700 transition">
          {school.name_tc}
        </h3>
        <div className="flex items-center gap-1 text-xs text-ink-500 mt-1">
          <span>📍</span>
          <span>{school.district}</span>
        </div>
        {sessionTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {sessionTags.map((t) => (
              <span key={t} className="px-2 py-0.5 rounded-md bg-leaf-50 text-forest-700 text-[10px] font-medium">
                {t}
              </span>
            ))}
          </div>
        )}
        <div className="grid grid-cols-3 gap-1.5 mt-3 text-center">
          {(["k1", "k2", "k3"] as const).map((g) => {
            const status = v?.[g];
            const display = vacancyDisplay(status);
            return (
              <div key={g} className="py-1.5 rounded-lg" style={{ backgroundColor: display.bg }}>
                <p className="text-[10px] text-ink-500 font-medium">{g.toUpperCase()}</p>
                <p className="text-xs font-semibold mt-0.5" style={{ color: display.color }}>
                  {display.label}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-cream-200 text-[11px] text-ink-500">
          <span>♡ 校車</span>
          <span>📋 面試</span>
        </div>
      </div>
    </Link>
  );
}

function vacancyDisplay(status?: string) {
  if (!status) return { label: "—", bg: "#F4ECD8", color: "#6B766F" };
  const s = status.toLowerCase();
  if (s.includes("has") || status.includes("有位") || status.includes("足") || s === "vacancy")
    return { label: "有位", bg: "#E8F0E3", color: "#245636" };
  if (s.includes("limit") || status.includes("少量") || status.includes("緊張"))
    return { label: "少量", bg: "#FCEFD0", color: "#8E5F1E" };
  if (s.includes("no_vacancy") || s.includes("full") || status.includes("已滿") || status.includes("滿"))
    return { label: "已滿", bg: "#FCE2DA", color: "#A84620" };
  if (s.includes("not_offered") || s.includes("closed"))
    return { label: "未開", bg: "#F4ECD8", color: "#6B766F" };
  if (s.includes("check"))
    return { label: "查官網", bg: "#F4ECD8", color: "#6B766F" };
  return { label: "—", bg: "#F4ECD8", color: "#6B766F" };
}
