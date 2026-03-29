import type { Metadata } from "next";
import { getAllSchoolEvents } from "@/lib/homepage/liveData";
import { TimelineClient } from "./TimelineClient";

export const revalidate = 21600; // 6 hours ISR

export const metadata: Metadata = {
  title: "學校活動時間線 — HKSchoolPlace",
  description: "查看未來 90 天內所有幼稚園的開放日、面試、簡介會及報名截止日期，幫你規劃申請時間。",
  openGraph: {
    title: "學校活動時間線 — HKSchoolPlace",
    description: "查看未來 90 天內所有幼稚園的開放日、面試、簡介會及報名截止日期。",
    type: "website",
    url: "https://aihkschool.vercel.app/timeline",
  },
};

export default async function TimelinePage() {
  const events = await getAllSchoolEvents();

  return <TimelineClient events={events} />;
}
