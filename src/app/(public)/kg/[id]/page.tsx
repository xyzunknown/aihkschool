import { notFound } from "next/navigation";
import { fetchSchoolById } from "@/lib/db/schools";
import { fetchCurrentVacancy } from "@/lib/db/vacancies";
import { fetchApprovedIntel } from "@/lib/db/intel";
import { SchoolDetailClient } from "./SchoolDetailClient";

export const revalidate = 3600; // ISR 1 hour

interface Props {
  params: { id: string };
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
