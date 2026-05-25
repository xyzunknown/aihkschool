import { fetchFeaturedActivities } from "@/lib/db/activities";
import { ActivityCard } from "@/components/activities/ActivityCard";
import { SectionHeader } from "@/components/home/SectionHeader";

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
      <SectionHeader
        title="課外活動精選"
        description="幼稚園到小學及適合親子參與的藝術、文化及免費活動"
        href="/activities"
      />

      <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
        {activities.map((a) => (
          <div key={a.id} className="min-w-0">
            <ActivityCard activity={a} />
          </div>
        ))}
      </div>
    </section>
  );
}
