"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function track(payload: Record<string, unknown>) {
  const body = JSON.stringify(payload);
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/analytics", new Blob([body], { type: "application/json" }));
    return;
  }
  void fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  });
}

export function ProductAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams?.toString() ?? "";
    const pagePath = query ? `${pathname}?${query}` : pathname;
    const searchTerm = searchParams?.get("search");
    track({ event_name: "page_view", page_path: pagePath });
    if (searchTerm) {
      track({ event_name: "search", page_path: pagePath, search_term: searchTerm });
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target.closest("a,button") : null;
      if (!target) return;
      const text = (target.textContent ?? "").trim().slice(0, 120);
      if (target instanceof HTMLAnchorElement) {
        const href = target.getAttribute("href") ?? "";
        if (/apply|admission|application|報名|申請/i.test(`${href} ${text}`)) {
          track({ event_name: "application_click", page_path: window.location.pathname, target_url: href, target_label: text });
        }
      }
      if (/收藏|對比|追蹤/.test(text)) {
        const eventName = text.includes("對比") ? "compare" : text.includes("追蹤") ? "programme_follow" : "favorite";
        track({ event_name: eventName, page_path: window.location.pathname, target_label: text });
      }
    }
    document.addEventListener("click", handleClick, { passive: true });
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
