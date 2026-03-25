import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchSchoolById } from "@/lib/db/schools";
import { fetchCurrentVacancy } from "@/lib/db/vacancies";
import { fetchApprovedIntel } from "@/lib/db/intel";
import { SchoolDetailClient } from "./SchoolDetailClient";
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
  };
}

export default async function SchoolDetailPage({ params }: Props) {
  const school = await fetchSchoolById(params.id);

  if (!school) {
    notFound();
  }

  const vacancy = await fetchCurrentVacancy(params.id);
  const intelResult = await fetchApprovedIntel(params.id, 1, 3);

  return (
    <SchoolDetailClient
      school={school}
      vacancy={vacancy}
      initialIntel={intelResult.data}
      intelCount={intelResult.count}
    />
  );
}
