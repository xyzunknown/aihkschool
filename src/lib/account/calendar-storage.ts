import type { Activity } from "@/lib/db/activities";

export const SAVED_ACTIVITY_CALENDAR_KEY = "hkschoolplace.calendar.activities";

export interface SavedCalendarActivity {
  id: string;
  title: string;
  organizer: string | null;
  start_date: string | null;
  end_date: string | null;
  schedule: string | null;
  district: string | null;
  href: string;
  saved_at: string;
}

export function toSavedCalendarActivity(activity: Activity): SavedCalendarActivity {
  return {
    id: activity.id,
    title: activity.title,
    organizer: activity.organizer,
    start_date: activity.start_date,
    end_date: activity.end_date,
    schedule: activity.schedule,
    district: activity.district,
    href: `/activities/${activity.id}`,
    saved_at: new Date().toISOString(),
  };
}

export function readSavedCalendarActivities(): SavedCalendarActivity[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SAVED_ACTIVITY_CALENDAR_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is SavedCalendarActivity => (
      item &&
      typeof item.id === "string" &&
      typeof item.title === "string" &&
      typeof item.href === "string"
    ));
  } catch {
    return [];
  }
}

export function saveCalendarActivity(activity: Activity) {
  if (typeof window === "undefined") return;
  const next = toSavedCalendarActivity(activity);
  const existing = readSavedCalendarActivities().filter((item) => item.id !== activity.id);
  window.localStorage.setItem(
    SAVED_ACTIVITY_CALENDAR_KEY,
    JSON.stringify([next, ...existing].slice(0, 50)),
  );
}

export function removeCalendarActivity(activityId: string) {
  if (typeof window === "undefined") return;
  const next = readSavedCalendarActivities().filter((item) => item.id !== activityId);
  window.localStorage.setItem(SAVED_ACTIVITY_CALENDAR_KEY, JSON.stringify(next));
}
