"use client";

import Link from "next/link";
import { SchoolCard } from "@/components/schools/SchoolCard";
import { FEATURED_SCHOOLS } from "@/data/homepage";
import { useAuth } from "@/components/layout/AuthProvider";
import { useCompare } from "@/lib/hooks/useCompare";
import type { FeaturedSchool } from "@/types/homepage";
import type { VacancyStatus } from "@/types/database";

interface FeaturedSchoolsProps {
  schools?: FeaturedSchool[];
}

export function FeaturedSchools({ schools }: FeaturedSchoolsProps) {
  const { requireAuth } = useAuth();
  const { addToCompare, removeFromCompare, isInCompare, canAdd } = useCompare();
  const list = schools && schools.length > 0 ? schools : FEATURED_SCHOOLS;

  return (
    <section className="mb-[72px]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-ink-900">熱點學校</h2>
        <Link
          href="/kg?hot=100"
          className="text-ink-500 hover:text-ink-900 text-sm font-medium transition-colors"
        >
          查看全部 →
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {list.map((school) => {
          const schoolId = school.detailId ?? school.id;
          const vacancy = school.vacancyStatus
            ? {
              n_vacancy: "no_information" as VacancyStatus,
              k1_vacancy: school.vacancyStatus.k1 as VacancyStatus,
              k2_vacancy: school.vacancyStatus.k2 as VacancyStatus,
              k3_vacancy: school.vacancyStatus.k3 as VacancyStatus,
              edb_published_date: school.vacancyPublishedDate ?? null,
            }
            : null;

          return (
            // Homepage hot-school cards must stay on the shared KG list card.
            // Any SchoolCard UI change should therefore be reflected here automatically.
            <SchoolCard
              key={school.id}
              compact
              id={schoolId}
              nameTc={school.name_tc}
              nameEn={school.name_en}
              logoUrl={school.logoUrl}
              schoolCode={school.schoolCode}
              district={school.district}
              schoolType={school.schoolType ?? undefined}
              schoolandSessionLabel={school.schoolandSessionLabel}
              vacancy={vacancy}
              onToggleFavorite={() => requireAuth(() => {})}
              isInCompare={isInCompare(schoolId)}
              onToggleCompare={() => {
                if (isInCompare(schoolId)) {
                  removeFromCompare(schoolId);
                } else if (canAdd) {
                  requireAuth(() => {
                    addToCompare({ id: schoolId, nameTc: school.name_tc, logoUrl: school.logoUrl });
                  });
                }
              }}
            />
          );
        })}
      </div>
    </section>
  );
}
