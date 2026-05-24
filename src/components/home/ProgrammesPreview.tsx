import { fetchUpcomingProgrammes } from "@/lib/db/programmes";
import { ProgrammesPreviewClient } from "@/components/home/ProgrammesPreviewClient";
import { SectionHeader } from "@/components/home/SectionHeader";

export async function ProgrammesPreview() {
  let programmes = [] as Awaited<ReturnType<typeof fetchUpcomingProgrammes>>;

  try {
    programmes = await fetchUpcomingProgrammes(6);
  } catch {
    programmes = [];
  }

  if (programmes.length === 0) return null;

  return (
    <section className="mt-12">
      <SectionHeader
        title="康體通報名倒數"
        description="追蹤 SmartPLAY 課程開報時間，提早提醒家長準備報名"
        href="/programmes"
      />

      <ProgrammesPreviewClient programmes={programmes} />
    </section>
  );
}
