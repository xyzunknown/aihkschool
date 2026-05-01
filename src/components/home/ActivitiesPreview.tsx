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
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-ink-900 flex items-center gap-2">
            <span className="inline-block w-1 h-5 bg-brand-700 rounded-full" />
            課外活動精選
          </h2>
          <p className="mt-1.5 text-sm text-ink-500">
            幼稚園階段小朋友適合嘅興趣班、免費社區活動
          </p>
        </div>
        <Link
          href="/activities"
          className="shrink-0 text-sm text-brand-700 hover:underline font-medium"
        >
          查看全部 →
        </Link>
      </div>

      <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-2 hide-scrollbar md:mx-0 md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-5 md:px-0 md:overflow-visible">
        {activities.map((a) => (
          <div key={a.id} className="w-[286px] flex-shrink-0 md:w-auto">
            <ActivityCard activity={a} />
          </div>
        ))}
      </div>
    </section>
  );
}
