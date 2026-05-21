import Link from "next/link";
import { fetchUpcomingProgrammes } from "@/lib/db/programmes";
import { ProgrammesPreviewClient } from "@/components/home/ProgrammesPreviewClient";

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
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-ink-900 flex items-center gap-2">
            <span className="inline-block w-1 h-5 bg-brand-700 rounded-full" />
            康體通開報倒數
          </h2>
          <p className="mt-1.5 text-sm text-ink-500">
            追蹤 SmartPLAY 課程開報時間，提早提醒家長準備報名
          </p>
        </div>
        <Link href="/programmes" className="shrink-0 text-sm text-brand-700 hover:underline font-medium">
          查看全部 →
        </Link>
      </div>

      <ProgrammesPreviewClient programmes={programmes} />
    </section>
  );
}
