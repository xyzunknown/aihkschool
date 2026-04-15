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
    <section className="mb-10">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-950">課外活動精選</h2>
          <p className="mt-1 text-sm text-slate-500">
            幼稚園階段小朋友適合嘅興趣班、免費社區活動
          </p>
        </div>
        <Link
          href="/activities"
          className="text-sm text-slate-500 transition-colors hover:text-slate-950"
        >
          查看全部 →
        </Link>
      </div>

      <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-2 hide-scrollbar md:-mx-8 md:px-8">
        {activities.map((a) => (
          <div key={a.id} className="w-72 flex-shrink-0">
            <ActivityCard activity={a} />
          </div>
        ))}
      </div>
    </section>
  );
}
