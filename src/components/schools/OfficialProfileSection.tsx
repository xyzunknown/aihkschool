import { GlassCard } from "@/components/ui/GlassCard";
import type { ReactNode } from "react";
import type { DetailItem, KgpOfficialProfile } from "@/lib/schools/kgpProfile";

interface OfficialProfileSectionProps {
  profile: KgpOfficialProfile | null;
  admissions?: ReactNode;
}

export function OfficialProfileSection({ profile, admissions }: OfficialProfileSectionProps) {
  if (!profile) return null;

  const highlights = [
    firstValue(profile.studentAndTeacher, ["上午師生比例", "下午師生比例"]),
    firstValue(profile.fees, ["全年學費（半日）", "全年學費（全日）"]),
    firstValue(profile.facilities, ["註冊課室數目"]),
    firstValue(profile.studentAndTeacher, ["教學人員總數"]),
  ].filter((entry): entry is DetailItem => Boolean(entry));

  const groups = [
    { title: "基本資料", items: profile.basics },
    { title: "校舍與設施", items: profile.facilities },
    { title: "師資與學生", items: profile.studentAndTeacher },
    { title: "學費及其他收費", items: profile.fees },
    { title: "課程與支援", items: [...profile.curriculum, ...profile.support] },
  ].filter((group) => group.items.length > 0);

  if (groups.length === 0) return null;
  const hasCourseSupport = groups.some((group) => group.title === "課程與支援");

  return (
    <section className="mb-8">
      <h2 className="mb-4 text-xl font-semibold text-ink-900">更多官方資料</h2>
      <GlassCard>
        {highlights.length > 0 && (
          <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((entry) => (
              <div key={entry.label} className="rounded-button border border-surface-border bg-cream-50 px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wide text-ink-500">{entry.label}</p>
                <p className="mt-1 text-base font-semibold text-ink-900">{entry.value}</p>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-3">
          {groups.map((group) => (
            <div key={group.title}>
              {group.title === "課程與支援" && admissions && (
                <AdmissionsDetailsBlock>{admissions}</AdmissionsDetailsBlock>
              )}
              <details className="group rounded-button border border-surface-border bg-cream-50/50 px-4 py-3" open={group.title === "基本資料"}>
                <summary className="cursor-pointer list-none text-sm font-semibold text-ink-800">
                  <span className="inline-flex w-full items-center justify-between gap-3">
                    {group.title}
                    <span className="text-xs font-medium text-ink-500 group-open:hidden">展開</span>
                    <span className="hidden text-xs font-medium text-ink-500 group-open:inline">收起</span>
                  </span>
                </summary>
                <div className="grid gap-x-6 gap-y-4 md:grid-cols-2">
                  {group.items.map((entry) => (
                    <div key={`${group.title}-${entry.label}`} className="min-w-0 pt-4">
                      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-ink-500">{entry.label}</p>
                      <p className="text-sm leading-6 text-ink-900">{entry.value}</p>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          ))}
          {!hasCourseSupport && admissions && (
            <AdmissionsDetailsBlock>{admissions}</AdmissionsDetailsBlock>
          )}
        </div>

        <p className="mt-5 border-t border-surface-border pt-4 text-xs leading-5 text-ink-500">
          資料來自教育局幼稚園概覽；個別學校資料每年可能更新，最終以學校及教育局公布為準。
        </p>
      </GlassCard>
    </section>
  );
}

function firstValue(items: DetailItem[], labels: string[]) {
  return labels.map((label) => items.find((entry) => entry.label === label)).find(Boolean) ?? null;
}

function AdmissionsDetailsBlock({ children }: { children: ReactNode }) {
  return (
    <details className="group mb-3 rounded-button border border-surface-border bg-cream-50/50 px-4 py-3" open>
      <summary className="cursor-pointer list-none text-sm font-semibold text-ink-800">
        <span className="inline-flex w-full items-center justify-between gap-3">
          招生與開放日
          <span className="text-xs font-medium text-ink-500 group-open:hidden">展開</span>
          <span className="hidden text-xs font-medium text-ink-500 group-open:inline">收起</span>
        </span>
      </summary>
      <div className="pt-4">{children}</div>
    </details>
  );
}
