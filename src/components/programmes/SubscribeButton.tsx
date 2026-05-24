"use client";

import { useAuth } from "@/components/layout/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import { Bell } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

async function getErrorMessage(response: Response, fallback: string) {
  try {
    const json = await response.json();
    return json?.error?.message || fallback;
  } catch {
    return fallback;
  }
}

interface SubscribeButtonProps {
  programmeId: string;
  size?: "sm" | "md" | "lg";
}

export function SubscribeButton({ programmeId, size = "md" }: SubscribeButtonProps) {
  const { user, requireAuth } = useAuth();
  const { showToast } = useToast();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  // 檢查訂閱狀態
  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/programme-subscriptions");
        if (!res.ok) return;
        const json = await res.json();
        if (!cancelled && Array.isArray(json.data)) {
          const found = json.data.some(
            (s: { programme_id: string }) => s.programme_id === programmeId,
          );
          setIsSubscribed(found);
        }
      } catch {
        // 靜默失敗
      }
    })();

    return () => { cancelled = true; };
  }, [user, programmeId]);

  const handleToggle = useCallback(async () => {
    if (!user) {
      requireAuth(() => {});
      return;
    }

    setLoading(true);
    try {
      if (isSubscribed) {
        const res = await fetch(
          `/api/programme-subscriptions?programme_id=${programmeId}`,
          { method: "DELETE" },
        );
        if (!res.ok) {
          showToast({
            message: await getErrorMessage(res, "取消追蹤失敗"),
          });
          return;
        }
        setIsSubscribed(false);
        showToast({ message: "已取消追蹤" });
      } else {
        const res = await fetch("/api/programme-subscriptions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ programme_id: programmeId }),
        });
        if (res.ok) {
          setIsSubscribed(true);
          showToast({ message: "已加入開報前追蹤，報名前會通知你" });
        } else {
          const json = await res.json();
          showToast({ message: json.error?.message || "加入追蹤失敗" });
        }
      }
    } catch {
      showToast({ message: "操作失敗，請重試" });
    } finally {
      setLoading(false);
    }
  }, [user, isSubscribed, programmeId, requireAuth, showToast]);

  const sizeClasses = size === "sm"
    ? "h-9 px-4 text-small"
    : size === "lg"
      ? "h-14 px-6 text-body"
      : "h-10 px-5 text-small";

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-pill border font-semibold transition disabled:opacity-50 ${sizeClasses} ${
        isSubscribed
          ? "border-forest-700 bg-forest-700 text-white hover:border-forest-800 hover:bg-forest-800"
          : "border-forest-200 bg-white text-forest-700 hover:bg-forest-50"
      }`}
    >
      {loading ? (
        <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        <Bell aria-hidden="true" size={16} strokeWidth={1.7} />
      )}
      {isSubscribed ? "已追蹤" : "追蹤"}
    </button>
  );
}
