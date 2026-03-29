"use client";

import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "hksp-compare-ids";
const MAX_COMPARE = 3;

export interface CompareItem {
  id: string;
  nameTc: string;
  logoUrl?: string | null;
}

function loadFromStorage(): CompareItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, MAX_COMPARE) : [];
  } catch {
    return [];
  }
}

function saveToStorage(items: CompareItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // silently fail
  }
}

export function useCompare() {
  const [compareItems, setCompareItems] = useState<CompareItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    setCompareItems(loadFromStorage());
  }, []);

  const addToCompare = useCallback(
    (item: CompareItem) => {
      setCompareItems((prev) => {
        if (prev.length >= MAX_COMPARE) return prev;
        if (prev.some((i) => i.id === item.id)) return prev;
        const next = [...prev, item];
        saveToStorage(next);
        return next;
      });
    },
    [],
  );

  const removeFromCompare = useCallback((id: string) => {
    setCompareItems((prev) => {
      const next = prev.filter((i) => i.id !== id);
      saveToStorage(next);
      return next;
    });
  }, []);

  const clearCompare = useCallback(() => {
    setCompareItems([]);
    saveToStorage([]);
  }, []);

  const isInCompare = useCallback(
    (id: string) => compareItems.some((i) => i.id === id),
    [compareItems],
  );

  const compareUrl =
    compareItems.length >= 2
      ? `/compare?ids=${compareItems.map((i) => i.id).join(",")}`
      : null;

  return {
    compareItems,
    compareCount: compareItems.length,
    maxCompare: MAX_COMPARE,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isInCompare,
    compareUrl,
    canAdd: compareItems.length < MAX_COMPARE,
  };
}
