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
    <section className="mt-12">
      <div className="mb-7 flex items-center justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 text-[24px] font-semibold leading-tight text-ink-900 md:text-[28px]">
            <span className="inline-block h-6 w-1 rounded-full bg-forest-700" />
            課外活動精選
          </h2>
          <p className="mt-2 text-base text-ink-500">
            幼稚園到小學及適合親子參與的藝術、文化及免費活動
          </p>
        </div>
        <Link
          href="/activities"
          className="shrink-0 text-sm font-medium text-forest-700 hover:underline"
        >
          查看全部 →
        </Link>
      </div>

      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
        {activities.map((a) => (
          <div key={a.id} className="min-w-0">
            <ActivityCard activity={a} />
          </div>
        ))}
      </div>
    </section>
  );
}
