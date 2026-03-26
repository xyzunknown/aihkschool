import Link from "next/link";
import { SchoolAvatar } from "@/components/schools/SchoolAvatar";
import { FEATURED_SCHOOLS } from "@/data/homepage";

export function FeaturedSchools() {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-950">精選名校</h2>
        <Link
          href="/kg"
          className="text-slate-500 hover:text-slate-950 text-sm font-medium transition-colors"
        >
          查看全部 →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {FEATURED_SCHOOLS.map((school) => (
          <Link key={school.id} href={school.href}>
            <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200">
              <div className="flex items-start gap-3 mb-3">
                <SchoolAvatar
                  schoolId={school.id}
                  schoolName={school.name_tc}
                  schoolCode={school.schoolCode}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
                    {school.name_tc}
                  </h3>
                  <p className="text-sm text-slate-400 leading-snug mt-0.5 line-clamp-1">
                    {school.name_en}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-sm text-slate-500 mb-2.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-400"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{school.district}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {school.sessionTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700"
                  >
                    {tag}
                  </span>
                ))}
                {school.hasN && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                    設 N 班
                  </span>
                )}
              </div>

              <div className="flex justify-end pt-3 border-t border-slate-100">
                <span className="text-blue-600 text-xs font-medium">
                  詳情 &gt;
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
