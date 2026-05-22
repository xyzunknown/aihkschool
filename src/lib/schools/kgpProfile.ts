import "server-only";

import { cache } from "react";
import { readFileSync } from "fs";
import path from "path";

export interface KgpOfficialProfile {
  schoolCode: string;
  name: string;
  district: string;
  basics: DetailItem[];
  facilities: DetailItem[];
  studentAndTeacher: DetailItem[];
  fees: DetailItem[];
  curriculum: DetailItem[];
  support: DetailItem[];
}

export interface DetailItem {
  label: string;
  value: string;
}

type CsvRow = Record<string, string>;

const CSV_PATH = path.join(process.cwd(), "data", "KGP_2025_tc.csv");

const EMPTY_VALUES = new Set([
  "",
  "-",
  "沒有此項目",
  "沒有",
  "沒有資料",
  "沒有中文資料",
  "不適用",
  "No information",
  "No Information",
  "Not applicable",
]);

function parseCsv(text: string, delimiter = "^") {
  const rows: string[][] = [];
  let field = "";
  let row: string[] = [];
  let inQuotes = false;

  const pushField = () => {
    row.push(field);
    field = "";
  };

  const pushRow = () => {
    if (row.length > 0 && row.some((value) => value.trim() !== "")) rows.push(row);
    row = [];
  };

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        field += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === delimiter && !inQuotes) {
      pushField();
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") index += 1;
      pushField();
      pushRow();
      continue;
    }

    field += char;
  }

  if (field.length > 0 || row.length > 0) {
    pushField();
    pushRow();
  }

  const [headers = [], ...body] = rows;
  if (headers.length > 0) headers[0] = headers[0].replace(/^\uFEFF/, "");

  return body.map((values) =>
    Object.fromEntries(headers.map((header, index) => [header, normalizeCell(values[index] ?? "")])),
  );
}

function normalizeCell(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function hasValue(value: string | undefined | null): value is string {
  return Boolean(value && !EMPTY_VALUES.has(value.trim()));
}

function item(row: CsvRow, label: string, key: string): DetailItem | null {
  const value = row[key];
  return hasValue(value) ? { label, value } : null;
}

function moneyItem(row: CsvRow, label: string, key: string): DetailItem | null {
  const value = row[key];
  if (!hasValue(value)) return null;
  if (value === "0") return { label, value: "免費" };
  return { label, value: formatMoney(value) };
}

function ratioItem(row: CsvRow, label: string, key: string): DetailItem | null {
  const value = row[key];
  if (!hasValue(value)) return null;
  return { label, value: value.replace(/^0+(\d):0*/, "$1:") };
}

function compact(items: Array<DetailItem | null>) {
  return items.filter((entry): entry is DetailItem => entry !== null);
}

function joinStudentCount(row: CsvRow, grade: string, amKey: string, pmKey: string, wdKey: string): DetailItem | null {
  const values = compact([
    item(row, "上午", amKey),
    item(row, "下午", pmKey),
    item(row, "全日", wdKey),
  ]);

  if (values.length === 0) return null;
  if (values.every((entry) => Number(entry.value) === 0)) return null;

  return {
    label: grade,
    value: values.map((entry) => `${entry.label} ${entry.value}`).join("；"),
  };
}

function buildProfile(row: CsvRow): KgpOfficialProfile {
  const basics = compact([
    item(row, "學校類別", "學校類別"),
    item(row, "學生類別", "學生類別"),
    item(row, "課程類別", "課程類別"),
    item(row, "創校年份", "創校年份"),
    item(row, "校監", "校監姓名"),
    item(row, "校長", "校長姓名"),
    item(row, "家長教師會", "家長教師會"),
  ]);

  const facilities = compact([
    item(row, "註冊課室數目", "註冊課室數目"),
    item(row, "已使用課室總容額", "已使用課室的總容額"),
    item(row, "戶外遊戲場地", "戶外遊戲場地"),
    item(row, "室內遊戲場地", "室內遊戲場地"),
    item(row, "音樂室", "音樂室"),
    item(row, "其他特別室", "其他特別室"),
  ]);

  const studentAndTeacher = compact([
    joinStudentCount(row, "幼兒班學生", "學生人數幼兒班_上午班", "學生人數幼兒班_下午班", "學生人數幼兒班_全日班"),
    joinStudentCount(row, "低班學生", "學生人數低班_上午班", "學生人數低班_下午班", "學生人數低班_全日班"),
    joinStudentCount(row, "高班學生", "學生人數高班_上午班", "學生人數高班_下午班", "學生人數高班_全日班"),
    ratioItem(row, "上午師生比例", "上午時段師生比例"),
    ratioItem(row, "下午師生比例", "下午時段師生比例"),
    item(row, "師生比例備註", "師生比例_備註"),
    item(row, "教學人員總數", "校長及教學人員總人數"),
    item(row, "持有學位", "校長及教學人員人數_持有學位"),
    item(row, "非持有學位", "校長及教學人員人數_非持有學位"),
    item(row, "幼兒教育證書或以上", "校長及教學人員人數_幼兒教育證書或以上"),
    item(row, "合格幼稚園教師", "校長及教學人員人數_合格幼稚園教師"),
    item(row, "教學年資 4 年以下", "教學年資_4以下"),
    item(row, "教學年資 4 至 7 年", "教學年資_4_7"),
    item(row, "教學年資 7 年以上", "教學年資_7以上"),
  ]);

  const fees = compact([
    moneyItem(row, "全年學費（半日）", "收費水平_全年_半日"),
    moneyItem(row, "全年學費（全日）", "收費水平_全年_全日"),
    moneyItem(row, "報名費", "其他核准收費_報名費"),
    moneyItem(row, "註冊費（半日）", "註冊費_半日班"),
    moneyItem(row, "註冊費（全日）", "註冊費_全日班"),
    moneyItem(row, "夏季校服", "夏季校服"),
    moneyItem(row, "冬季校服", "冬季校服"),
    moneyItem(row, "書包", "書包"),
    moneyItem(row, "茶點", "茶點"),
    moneyItem(row, "課本", "課本"),
    moneyItem(row, "練習簿／作業", "練習簿_作業"),
    moneyItem(row, "文具", "文具"),
    moneyItem(row, "寢具", "寢具"),
  ]);

  const curriculum = compact([
    item(row, "課程規劃", "課程規劃"),
    item(row, "學習及教學模式", "學習_教學模式及活動"),
    item(row, "學習經驗評估", "兒童學習經驗評估"),
    item(row, "學校使命及抱負", "學校使命及抱負"),
  ]);

  const support = compact([
    item(row, "對學生支援", "對學生支援"),
    item(row, "家長活動", "其他家長活動_聯繫"),
    item(row, "非華語學童支援", "對非華語學童的支援"),
    item(row, "特殊需要支援", "對有特殊需要的學童的支援"),
    item(row, "2 歲以下幼兒服務", "提供2歲以下幼兒服務"),
    item(row, "N 班 / 2-3 歲幼兒服務", "提供2-3歲幼兒服務"),
    item(row, "延長服務時間", "提供延長服務時間"),
    item(row, "暫托服務", "提供暫托服務"),
  ]);

  return {
    schoolCode: row["學校編號"],
    name: row["學校名稱"],
    district: row["地區"],
    basics,
    facilities,
    studentAndTeacher,
    fees,
    curriculum,
    support,
  };
}

const getKgpProfileMap = cache(() => {
  const text = readFileSync(CSV_PATH, "utf8");
  const rows = parseCsv(text);
  const map = new Map<string, KgpOfficialProfile[]>();

  for (const row of rows) {
    const code = row["學校編號"];
    if (!hasValue(code)) continue;
    const profiles = map.get(code) ?? [];
    profiles.push(buildProfile(row));
    map.set(code, profiles);
  }

  return map;
});

export function getKgpOfficialProfile(schoolCode: string | null | undefined, schoolName?: string | null) {
  if (!schoolCode) return null;
  const candidates = getKgpProfileMap().get(schoolCode) ?? [];
  if (candidates.length === 0) return null;
  if (!schoolName) return candidates[0];

  return candidates.find((profile) => profile.name === schoolName) ?? candidates[0];
}

function formatMoney(value: string) {
  const normalized = value.replace(/^HK\$/i, "").replace(/^\$/, "").trim();
  const number = Number(normalized.replace(/,/g, ""));
  if (Number.isFinite(number)) {
    return `HK$${number.toLocaleString("zh-HK")}`;
  }
  return value.startsWith("$") || /^HK\$/i.test(value) ? value : `HK$${value}`;
}
