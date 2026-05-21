import type { Metadata } from "next";
import { CompareClient } from "./CompareClient";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "香港幼稚園比較",
  description: "並排比較 2 至 3 所香港幼稚園的學費、學額、班制、地區和學校資料。",
  path: "/compare",
});

export default function ComparePage() {
  return <CompareClient />;
}
