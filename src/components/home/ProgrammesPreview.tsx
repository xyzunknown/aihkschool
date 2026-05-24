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
    <section className="mt-0">
      <div className="mb-7 flex items-center justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 text-[24px] font-semibold leading-tight text-ink-900 md:text-[28px]">
            <span className="inline-block h-6 w-1 rounded-full bg-brand-700" />
            康體通報名倒數
          </h2>
          <p className="mt-2 text-base text-ink-500">
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
