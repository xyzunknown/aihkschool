import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchSchoolById, fetchSchoolEnrichment } from "@/lib/db/schools";
import { fetchCurrentVacancy } from "@/lib/db/vacancies";
import { SchoolDetailClient } from "./SchoolDetailClient";
import { getKgpOfficialProfile } from "@/lib/schools/kgpProfile";
import { DISTRICT_LABELS } from "@/lib/utils";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const revalidate = 3600; // ISR 1 hour

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const school = await fetchSchoolById(params.id);

  if (!school) {
    return { title: "搵唔到學校 — HKSchoolPlace" };
  }

  const district = DISTRICT_LABELS[school.district as keyof typeof DISTRICT_LABELS] ?? school.district;
  const title = `${school.name_tc}｜${district}幼稚園資料`;
  const description = `${school.name_tc}（${district}）幼稚園資料：學額狀態、學費、班別、申請資訊、位置和官方資料整理。`;

  return pageMetadata({
    title,
    description,
    path: `/kg/${params.id}`,
    image: school.logo_url || undefined,
  });
}

export default async function SchoolDetailPage({ params }: Props) {
  const school = await fetchSchoolById(params.id);

  if (!school) {
    notFound();
  }

  const [vacancy, enrichment] = await Promise.all([
    fetchCurrentVacancy(params.id),
    fetchSchoolEnrichment(params.id),
  ]);
  const officialProfile = getKgpOfficialProfile(school.school_code, school.name_tc);
  const district = DISTRICT_LABELS[school.district as keyof typeof DISTRICT_LABELS] ?? school.district;
  const schoolJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: school.name_tc,
    alternateName: school.name_en ?? undefined,
    url: absoluteUrl(`/kg/${school.id}`),
    logo: school.logo_url ? absoluteUrl(school.logo_url) : undefined,
    address: school.address_tc
      ? {
          "@type": "PostalAddress",
          streetAddress: school.address_tc,
          addressLocality: district,
          addressRegion: "Hong Kong",
        }
      : undefined,
    telephone: school.phone ?? undefined,
    email: school.email ?? undefined,
    sameAs: [school.website, school.official_profile_url, school.schooland_url].filter(Boolean),
    areaServed: district,
    description: `${school.name_tc} 的學額狀態、學費、班別、申請資訊和位置整理。`,
  };

  return (
    <div className="pb-24">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "首頁", path: "/" },
            { name: "香港幼稚園搜尋", path: "/kg" },
            { name: school.name_tc, path: `/kg/${school.id}` },
          ]),
          schoolJsonLd,
        ]}
      />
      <SchoolDetailClient
        school={school}
        vacancy={vacancy}
        enrichment={enrichment}
        officialProfile={officialProfile}
      />
    </div>
  );
}
