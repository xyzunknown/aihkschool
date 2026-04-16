import type { Activity } from "@/lib/db/activities";

/**
 * Generate an ICS (iCalendar) file content for an activity.
 *
 * Handles three cases:
 *  1. Activity has a specific time in `schedule` (e.g. "10:30-12:00") → timed event
 *  2. Activity spans multiple days with no time → all-day event from start to end
 *  3. Single day with no time → single all-day event
 */
export function generateICS(activity: Activity): string {
  const now = formatDateTimeUTC(new Date());
  const uid = `${activity.id}@hkschoolplace.com`;

  const summary = escapeICS(activity.title);
  const location = activity.address ? escapeICS(activity.address) : "";
  const descParts = [
    activity.description,
    activity.organizer ? `主辦：${activity.organizer}` : null,
    activity.source_url ? `詳情：${activity.source_url}` : null,
  ].filter(Boolean);
  const description = escapeICS(descParts.join("\\n"));

  // Try to parse time from schedule (e.g. "10:30-12:00")
  const timeParsed = parseScheduleTime(activity.schedule);

  let dtstart: string;
  let dtend: string;

  if (activity.start_date && timeParsed) {
    // Case 1: timed event — use start_date + parsed time (HKT = UTC+8)
    const [sh, sm] = timeParsed.start;
    const [eh, em] = timeParsed.end;
    // Convert HKT to UTC by subtracting 8 hours
    const startUTC = hktToUTC(activity.start_date, sh, sm);
    const endUTC = hktToUTC(activity.start_date, eh, em);
    dtstart = `DTSTART:${formatDateTimeUTC(startUTC)}`;
    dtend = `DTEND:${formatDateTimeUTC(endUTC)}`;
  } else if (activity.start_date) {
    // Case 2/3: all-day event
    const start = activity.start_date.replace(/-/g, "");
    // ICS all-day DTEND is exclusive — add 1 day
    const endDate = activity.end_date || activity.start_date;
    const endExclusive = addDays(endDate, 1).replace(/-/g, "");
    dtstart = `DTSTART;VALUE=DATE:${start}`;
    dtend = `DTEND;VALUE=DATE:${endExclusive}`;
  } else {
    // No date info — use today as fallback
    const today = new Date().toISOString().split("T")[0].replace(/-/g, "");
    dtstart = `DTSTART;VALUE=DATE:${today}`;
    dtend = `DTEND;VALUE=DATE:${today}`;
  }

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//HKSchoolPlace//Activities//ZH",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    dtstart,
    dtend,
    `SUMMARY:${summary}`,
    ...(location ? [`LOCATION:${location}`] : []),
    ...(description ? [`DESCRIPTION:${description}`] : []),
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.join("\r\n");
}

/** Trigger a .ics file download in the browser */
export function downloadICS(activity: Activity): void {
  const content = generateICS(activity);
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${activity.title.slice(0, 50).replace(/[^\w\u4e00-\u9fff]/g, "_")}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function parseScheduleTime(
  schedule: string | null,
): { start: [number, number]; end: [number, number] } | null {
  if (!schedule) return null;
  // Match "HH:MM-HH:MM" pattern
  const match = schedule.match(/(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/);
  if (!match) return null;
  return {
    start: [parseInt(match[1], 10), parseInt(match[2], 10)],
    end: [parseInt(match[3], 10), parseInt(match[4], 10)],
  };
}

function hktToUTC(
  dateStr: string,
  hours: number,
  minutes: number,
): Date {
  // dateStr is "YYYY-MM-DD", hours/minutes are in HKT (UTC+8)
  // Construct with +08:00 offset so JS Date converts to correct UTC
  return new Date(`${dateStr}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00+08:00`);
}

function formatDateTimeUTC(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function escapeICS(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}
