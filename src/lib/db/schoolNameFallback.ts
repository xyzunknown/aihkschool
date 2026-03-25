import fs from "fs";
import path from "path";

let englishNameMap: Map<string, string> | null = null;

function parseCaretSeparatedLine(line: string): string[] {
  return line.split("^").map((value) => value.replace(/^"+|"+$/g, "").trim());
}

function loadEnglishNameMap() {
  const csvPath = path.join(process.cwd(), "data", "KGP_2025_en.csv");
  const raw = fs.readFileSync(csvPath);
  const text = raw.toString("utf16le").replace(/^\uFEFF/, "");
  const lines = text.split(/\r?\n/).filter(Boolean);
  const map = new Map<string, string>();

  for (const line of lines.slice(1)) {
    const columns = parseCaretSeparatedLine(line);
    const schoolCode = columns[0]?.trim();
    const englishName = columns[2]?.trim();

    if (!schoolCode || !englishName) continue;
    map.set(schoolCode, englishName);
  }

  return map;
}

export function getFallbackEnglishName(schoolCode: string | null | undefined): string | null {
  if (!schoolCode) return null;

  if (!englishNameMap) {
    englishNameMap = loadEnglishNameMap();
  }

  return englishNameMap.get(schoolCode) ?? null;
}
