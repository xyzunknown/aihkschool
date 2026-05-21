import type { Metadata } from "next";
import { getAllSchoolEvents } from "@/lib/homepage/liveData";
import { TimelineClient } from "./TimelineClient";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 21600; // 6 hours ISR

export const metadata: Metadata = pageMetadata({
  title: "香港幼稚園申請時間線",
  description: "查看未來 90 天內香港幼稚園面試、簡介會、開放日及報名截止日期。",
  path: "/timeline",
});

export default async function TimelinePage() {
  const events = await getAllSchoolEvents();

  return <TimelineClient events={events} />;
}
