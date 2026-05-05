import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchSchoolById, fetchSchoolEnrichment } from "@/lib/db/schools";
import { fetchCurrentVacancy } from "@/lib/db/vacancies";
import { fetchRelatedMediaArticles } from "@/lib/db/mediaArticles";
import { createClient } from "@/lib/supabase/server";
import { SchoolDetailClient } from "./SchoolDetailClient";
import { ReputationSection } from "@/components/schools/ReputationSection";
import { RelatedMediaSection } from "@/components/schools/RelatedMediaSection";
import { DISTRICT_LABELS } from "@/lib/utils";

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
  const title = `${school.name_tc} — HKSchoolPlace`;
  const description = `${school.name_tc}（${district}）嘅學位空缺、學費、面試心得。`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://aihkschool.vercel.app/kg/${params.id}`,
    },
    robots: {
      index: true,
      follow: true,
      noarchive: true,
      nosnippet: true,
      "max-snippet": 160,
    },
  };
}

export default async function SchoolDetailPage({ params }: Props) {
  const school = await fetchSchoolById(params.id);

  if (!school) {
    notFound();
  }

  // Check auth for tiered enrichment payload (quote_highlights only for logged-in users)
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isAuthenticated = !!user;

  const [vacancy, enrichment, relatedMediaArticles] = await Promise.all([
    fetchCurrentVacancy(params.id),
    fetchSchoolEnrichment(params.id, { includeRestricted: isAuthenticated }),
    fetchRelatedMediaArticles(params.id, 6),
  ]);

  return (
    <>
      <SchoolDetailClient
        school={school}
        vacancy={vacancy}
      />
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <ReputationSection enrichment={enrichment} />
        <RelatedMediaSection articles={relatedMediaArticles} />
      </div>
    </>
  );
}
