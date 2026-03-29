import type { Metadata } from "next";
import { CompareClient } from "./CompareClient";

export const metadata: Metadata = {
  title: "學校對比 — HKSchoolPlace",
  description: "並排對比 2-3 所幼稚園的學費、學位、班制、地區等關鍵信息。",
};

export default function ComparePage() {
  return <CompareClient />;
}
