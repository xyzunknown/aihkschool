import type { Activity } from "@/lib/db/activities";

function nonEmptyUrl(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function getActivityRegistrationHref(activity: Pick<Activity, "source_url" | "contact_url">) {
  return nonEmptyUrl(activity.source_url) || nonEmptyUrl(activity.contact_url);
}

export function getActivityOrganizerHref(activity: Pick<Activity, "source_url" | "contact_url">) {
  const sourceUrl = nonEmptyUrl(activity.source_url);
  const contactUrl = nonEmptyUrl(activity.contact_url);
  if (!contactUrl || contactUrl === sourceUrl) return null;
  return contactUrl;
}
