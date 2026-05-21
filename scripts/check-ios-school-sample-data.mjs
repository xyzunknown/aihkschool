import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const iosModelsPath = resolve(process.cwd(), "../HKSchoolPlaceiOS/HKSchoolPlace/Models.swift");
const source = readFileSync(iosModelsPath, "utf8");

const expectedSchools = [
  {
    schoolCode: "590673",
    name: "盈思幼稚園",
    english: "WITTY KINDERGARTEN",
    district: "中西區",
    monthlyFee: "HK$7,320",
    threeYearTuition: "HK$219,600",
    statuses: ["待更新", "待更新", "待更新"],
  },
  {
    schoolCode: "575666",
    name: "平安福音堂幼稚園（天水圍）",
    english: "PEACE EVANGELICAL CTR KG (TIN SHUI WAI)",
    district: "元朗區",
    monthlyFee: "免費",
    threeYearTuition: "免費",
    statuses: ["有位", "有位", "有位"],
  },
  {
    schoolCode: "570885",
    name: "中華基督教會元朗堂真光幼稚園二校",
    english: "YL CHURCH (CCC) CHAN KWONG NO. 2 KG",
    district: "元朗區",
    monthlyFee: "免費",
    threeYearTuition: "免費",
    statuses: ["滿額", "滿額", "有位"],
  },
  {
    schoolCode: "618039",
    name: "維多利亞（何文田）國際幼稚園",
    english: "VICTORIA (HOMANTIN) INTERNATIONAL KINDERGARTEN",
    district: "九龍城區",
    monthlyFee: "免費",
    threeYearTuition: "免費",
    statuses: ["候補", "候補", "候補"],
  },
  {
    schoolCode: "609528",
    name: "學之園幼稚園（昇御海逸）",
    english: "LEARNING HABITAT KINDERGARTEN (CHATHAM LV)",
    district: "九龍城區",
    monthlyFee: "HK$9,000",
    threeYearTuition: "HK$270,000",
    statuses: ["待更新", "待更新", "待更新"],
  },
  {
    schoolCode: "231134",
    name: "明雅中英文幼稚園",
    english: "MINK ANGLO-CHINESE KINDERGARTEN",
    district: "大埔區",
    monthlyFee: "免費",
    threeYearTuition: "免費",
    statuses: ["候補", "滿額", "滿額"],
  },
];

const forbiddenNames = ["茵茵幼稚園", "聖文德天主教幼稚園"];
const failures = [];

for (const forbiddenName of forbiddenNames) {
  if (source.includes(forbiddenName)) {
    failures.push(`Forbidden stale school name remains in iOS data: ${forbiddenName}`);
  }
}

for (const school of expectedSchools) {
  const schoolStart = source.indexOf(`School(schoolCode: "${school.schoolCode}"`);
  if (schoolStart === -1) {
    failures.push(`Missing iOS school sample for ${school.schoolCode} ${school.name}`);
    continue;
  }

  const nextSchool = source.indexOf("\n        School(schoolCode:", schoolStart + 1);
  const schoolBlock = source.slice(schoolStart, nextSchool === -1 ? source.length : nextSchool);

  for (const [field, value] of Object.entries(school)) {
    if (field === "statuses") continue;
    const fieldSource = field === "schoolCode" ? `schoolCode: "${value}"` : `${field}: "${value}"`;
    if (!schoolBlock.includes(fieldSource)) {
      failures.push(`${school.schoolCode} expected ${field} to be ${value}`);
    }
  }

  for (const status of school.statuses) {
    if (!schoolBlock.includes(`"${status}"`)) {
      failures.push(`${school.schoolCode} missing status ${status}`);
    }
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`iOS sample school data matches web source expectations (${expectedSchools.length} schools).`);
