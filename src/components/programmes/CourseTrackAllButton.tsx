"use client";

import { useState } from "react";
import { useAuth } from "@/components/layout/AuthProvider";
import { useToast } from "@/components/ui/Toast";

interface CourseTrackAllButtonProps {
  programmeIds: string[];
  className?: string;
}

async function getSubscriptionIds() {
  const res = await fetch("/api/programme-subscriptions");
  if (!res.ok) return new Set<string>();
  const json = await res.json();
  if (!Array.isArray(json.data)) return new Set<string>();
  return new Set(json.data.map((item: { programme_id: string }) => item.programme_id));
}

export function CourseTrackAllButton({ programmeIds, className }: CourseTrackAllButtonProps) {
  const { user, requireAuth } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleTrackAll = async () => {
    if (!user) {
      requireAuth(() => {});
      return;
    }

    setLoading(true);
    try {
      const existing = await getSubscriptionIds();
      const pendingIds = programmeIds.filter((id) => !existing.has(id));

      if (pendingIds.length === 0) {
        showToast({ message: "這個課程嘅場次已經追蹤好" });
        return;
      }

      let created = 0;
      for (const programmeId of pendingIds) {
        const res = await fetch("/api/programme-subscriptions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ programme_id: programmeId }),
        });
        if (!res.ok) {
          const json = await res.json().catch(() => null);
          showToast({
            message: created > 0
              ? `已追蹤 ${created} 個場次，部分場次未成功`
              : json?.error?.message || "追蹤全部場次失敗",
          });
          return;
        }
        created += 1;
      }

      showToast({ message: `已追蹤 ${created} 個場次，開報前會通知你` });
    } catch {
      showToast({ message: "追蹤全部場次失敗，請稍後再試" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleTrackAll}
      disabled={loading}
      className={
        className ??
        "inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-brand-200 bg-white px-4 text-sm font-bold text-brand-700 transition hover:bg-brand-50 disabled:opacity-50"
      }
    >
      {loading ? (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        <BellIcon />
      )}
      追蹤全部
    </button>
  );
}

function BellIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}
