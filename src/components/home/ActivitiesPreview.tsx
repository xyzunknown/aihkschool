import Link from "next/link";
import { fetchFeaturedActivities } from "@/lib/db/activities";
import { ActivityCard } from "@/components/activities/ActivityCard";

export async function ActivitiesPreview() {
  let activities = [] as Awaited<ReturnType<typeof fetchFeaturedActivities>>;
  try {
    activities = await fetchFeaturedActivities(6);
  } catch {
    activities = [];
  }

  if (activities.length === 0) return null;

  return (
    <section className="mt-12 py-8">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2.5 text-[28px] font-bold leading-[1.25] text-[#10231C]">
            <span className="inline-block h-7 w-1 rounded-full bg-[#247A4D]" />
            課外活動精選
          </h2>
          <p className="mt-2 text-base text-[#6B7280]">
            幼稚園到小學及適合親子參與的藝術、文化及免費活動
          </p>
        </div>
        <Link
          href="/activities"
          className="shrink-0 text-[15px] font-semibold text-[#247A4D] hover:underline"
        >
          查看全部 →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {activities.map((a) => (
          <div key={a.id} className="min-w-0">
            <ActivityCard activity={a} />
          </div>
        ))}
      </div>
    </section>
  );
}
