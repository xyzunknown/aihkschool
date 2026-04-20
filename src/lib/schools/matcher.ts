/**
 * School name matcher — maps free-text school names to school IDs.
 *
 * Three-tier matching:
 *   A. Exact match on schools.name_tc / name_en
 *   B. Exact match on school_aliases.alias
 *   C. Fuzzy Levenshtein (edit distance ≤ 2)
 */

import type { SupabaseClient } from "@supabase/supabase-js";

export type MatchResult = {
  school_id: string;
  confidence: "high" | "medium" | "low";
};

/**
 * Levenshtein distance between two strings.
 * Returns edit distance (insertions, deletions, substitutions).
 */
function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;

  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0)
  );

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  return dp[m][n];
}

interface SchoolRow {
  id: string;
  name_tc: string | null;
  name_en: string | null;
}

interface AliasRow {
  school_id: string;
  alias: string;
  confidence: number;
}

/**
 * Match school names found in text against the database.
 * Searches for known school names within the given text.
 *
 * @param text - Free-text content (e.g. a social media post body)
 * @param supabase - Supabase client (service_role for DB access)
 * @returns Array of matched schools with confidence
 */
export async function matchSchoolFromText(
  text: string,
  supabase: SupabaseClient
): Promise<MatchResult[]> {
  if (!text || text.trim().length === 0) return [];

  const normalizedText = text.trim();
  const results: MatchResult[] = [];
  const seenIds = new Set<string>();

  // Tier A: Exact match on schools.name_tc / name_en
  const { data: schools } = await supabase
    .from("schools")
    .select("id, name_tc, name_en")
    .eq("is_active", true);

  if (schools) {
    for (const s of schools as SchoolRow[]) {
      if (seenIds.has(s.id)) continue;
      if (
        (s.name_tc && normalizedText.includes(s.name_tc)) ||
        (s.name_en && normalizedText.toLowerCase().includes(s.name_en.toLowerCase()))
      ) {
        results.push({ school_id: s.id, confidence: "high" });
        seenIds.add(s.id);
      }
    }
  }

  // Tier B: Exact match on school_aliases
  const { data: aliases } = await supabase
    .from("school_aliases")
    .select("school_id, alias, confidence");

  if (aliases) {
    for (const a of aliases as AliasRow[]) {
      if (seenIds.has(a.school_id)) continue;
      if (normalizedText.includes(a.alias)) {
        const conf: "high" | "medium" | "low" =
          a.confidence >= 0.9 ? "high" : a.confidence >= 0.7 ? "medium" : "low";
        results.push({ school_id: a.school_id, confidence: conf });
        seenIds.add(a.school_id);
      }
    }
  }

  // Tier C: Fuzzy Levenshtein (≤ 2) on name_tc — only for short names
  if (schools) {
    for (const s of schools as SchoolRow[]) {
      if (seenIds.has(s.id)) continue;
      if (!s.name_tc || s.name_tc.length < 4) continue;

      // Sliding window: check substrings of text that are close in length
      const name = s.name_tc;
      const nameLen = name.length;
      for (let i = 0; i <= normalizedText.length - nameLen + 2; i++) {
        const window = normalizedText.slice(i, i + nameLen);
        if (levenshtein(name, window) <= 2) {
          results.push({ school_id: s.id, confidence: "medium" });
          seenIds.add(s.id);
          break;
        }
      }
    }
  }

  return results;
}
