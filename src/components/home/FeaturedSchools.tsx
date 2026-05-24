"use client";

import { SchoolCard } from "@/components/schools/SchoolCard";
import { FEATURED_SCHOOLS } from "@/data/homepage";
import { useAuth } from "@/components/layout/AuthProvider";
import { useCompare } from "@/lib/hooks/useCompare";
import { SectionHeader } from "@/components/home/SectionHeader";
import type { FeaturedSchool } from "@/types/homepage";
import type { VacancyStatus } from "@/types/database";

interface FeaturedSchoolsProps {
  schools?: FeaturedSchool[];
}

export function FeaturedSchools({ schools }: FeaturedSchoolsProps) {
  const { requireAuth } = useAuth();
  const { addToCompare, removeFromCompare, isInCompare, canAdd } = useCompare();
  const list = schools ?? FEATURED_SCHOOLS;

  if (list.length === 0) return null;

  return (
    <section className="mb-[72px] mt-8 md:mt-10">
      <SectionHeader
        title="熱點學校"
        description="家長近期關注的幼稚園，一次比較學位、地區和類別"
        href="/kg?hot=100"
      />

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
              hasNursery={school.hasN}
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
