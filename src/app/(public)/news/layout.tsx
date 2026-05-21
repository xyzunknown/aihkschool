import type { Metadata } from "next";
import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "香港教育與幼稚園資訊消息",
  description: "掌握香港幼稚園、學校活動、升學政策、開放日和親子教育資訊。",
  path: "/news",
});

export default function NewsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
