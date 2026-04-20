"use client";

import { useAuth } from "@/components/layout/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import { useState, useEffect, useCallback } from "react";

interface SubscribeButtonProps {
  programmeId: string;
  size?: "sm" | "md";
}

export function SubscribeButton({ programmeId, size = "md" }: SubscribeButtonProps) {
  const { user } = useAuth();
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
      showToast({ message: "請先登入" });
      return;
    }

    setLoading(true);
    try {
      if (isSubscribed) {
        const res = await fetch(
          `/api/programme-subscriptions?programme_id=${programmeId}`,
          { method: "DELETE" },
        );
        if (res.ok) {
          setIsSubscribed(false);
          showToast({ message: "已取消訂閱" });
        }
      } else {
        const res = await fetch("/api/programme-subscriptions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ programme_id: programmeId }),
        });
        if (res.ok) {
          setIsSubscribed(true);
          showToast({ message: "已訂閱提醒，報名開放前會通知你" });
        } else {
          const json = await res.json();
          showToast({ message: json.error?.message || "訂閱失敗" });
        }
      }
    } catch {
      showToast({ message: "操作失敗，請重試" });
    } finally {
      setLoading(false);
    }
  }, [user, isSubscribed, programmeId, showToast]);

  const sizeClasses = size === "sm"
    ? "px-3 py-1.5 text-xs"
    : "px-5 py-2.5 text-sm";

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`inline-flex items-center gap-1.5 rounded-xl font-medium transition-all disabled:opacity-50 ${sizeClasses} ${
        isSubscribed
          ? "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
          : "bg-slate-900 text-white hover:bg-slate-800"
      }`}
    >
      {loading ? (
        <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : isSubscribed ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      )}
      {isSubscribed ? "已訂閱" : "訂閱提醒"}
    </button>
  );
}
