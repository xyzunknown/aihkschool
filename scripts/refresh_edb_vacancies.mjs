#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { PDFParse } from "pdf-parse";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const VACANCY_CSV_PATH = path.join(ROOT, "data", "K1-K3_vacancy_tc_202627.csv");
const SCHOOLS_MERGED_PATH = path.join(ROOT, "data", "schools_merged.json");

const DISTRICT_PDFS = {
  "CENTRAL AND WESTERN": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Central%20and%20Western_K1-K3%20Vacancy.pdf",
  EASTERN: "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf",
  ISLANDS: "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Islands_K1-K3%20Vacancy.pdf",
  SOUTHERN: "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Southern_K1-K3%20Vacancy.pdf",
  "WAN CHAI": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wan%20Chai_K1-K3%20Vacancy.pdf",
  "KOWLOON CITY": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf",
  "KWUN TONG": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf",
  "SAI KUNG": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf",
  "SHAM SHUI PO": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf",
  "WONG TAI SIN": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf",
  "YAU TSIM MONG": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yau%20Tsim%20and%20Mong%20Kok_K1-K3%20Vacancy.pdf",
  "KWAI TSING": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf",
  "TSUEN WAN": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf",
  "TUEN MUN": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf",
  "YUEN LONG": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf",
  NORTH: "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf",
  "SHA TIN": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf",
  "TAI PO": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tai%20Po_K1-K3%20Vacancy.pdf",
};

const STATUS_TO_APP = {
  Y: "has_vacancy",
  N: "no_vacancy",
  P: "waiting_list",
  NA: "no_information",
};

function normalizeName(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .replace(/\s+/g, " ")
    .trim();
}

function canonicalSchoolName(value) {
  return normalizeName(value)
    .replace(/㇐/g, "一")
    .replace(/（[^）]*）/g, "")
    .replace(/\([^)]*\)/g, "")
    .replace(/#/g, "")
    .replace(/\s+/g, "")
    .trim();
}

function parseCsv(text) {
  const rows = [];
  let field = "";
  let row = [];
  let inQuotes = false;

  const pushField = () => {
    row.push(field);
    field = "";
  };

  const pushRow = () => {
    if (row.length > 0) rows.push(row);
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

    if (char === "," && !inQuotes) {
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

  const [headers, ...body] = rows;
  if (headers.length > 0) {
    headers[0] = headers[0].replace(/^\uFEFF/, "");
  }
  return {
    headers,
    rows: body.map((values) => Object.fromEntries(headers.map((header, idx) => [header, values[idx] ?? ""]))),
  };
}

function stringifyCsv(headers, rows) {
  const escapeCell = (value) => {
    const text = String(value ?? "");
    if (/[",\n\r]/.test(text)) {
      return `"${text.replace(/"/g, '""')}"`;
    }
    return text;
  };

  return [
    headers.map(escapeCell).join(","),
    ...rows.map((row) => headers.map((header) => escapeCell(row[header])).join(",")),
  ].join("\n") + "\n";
}

function extractAsAtDate(text) {
  const match = text.match(/截至\s*(\d{4})年\s*(\d{1,2})月\s*(\d{1,2})日/);
  if (!match) {
    throw new Error("Unable to find as-at date in PDF text");
  }
  const [, year, month, day] = match;
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

function parseDistrictEntries(text) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.replace(/\u0000/g, "").trim())
    .filter(Boolean);

  const entries = [];
  let current = null;

  const finalize = () => {
    if (!current) return;
    const blob = current.detailLines.join(" ");
    const statuses = [...blob.matchAll(/\b(NA|Y|N|P)\b/g)].map((match) => match[1]);
    if (statuses.length < 3) {
      throw new Error(`Unable to parse vacancy statuses for ${current.nameTc}`);
    }
    entries.push({
      nameTc: current.nameTc,
      statuses: statuses.slice(-3),
    });
    current = null;
  };

  for (const line of lines) {
    const entryMatch = line.match(/^(\d+)\s+(.+)$/);
    if (entryMatch && /[\u3400-\u9fff]/.test(entryMatch[2])) {
      const [, , nameTc] = entryMatch;
      if (nameTc.startsWith("以下爲") || nameTc.startsWith("如需") || nameTc.startsWith("下表")) {
        continue;
      }
      finalize();
      current = { nameTc: nameTc.trim(), detailLines: [] };
      continue;
    }

    if (!current) continue;
    if (
      line.startsWith("學校名稱") ||
      line.startsWith("注意事項") ||
      line.startsWith("-- ") ||
      /^\d+\/\d+$/.test(line) ||
      line.includes("參加「2026/27") ||
      line.includes("List of Kindergartens participating") ||
      line === "K1 K2 K3" ||
      line === "K1      K2      K3"
    ) {
      continue;
    }
    current.detailLines.push(line);
  }

  finalize();
  return entries;
}

async function fetchPdfText(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download PDF: ${response.status} ${response.statusText}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  const parser = new PDFParse({ data: Buffer.from(arrayBuffer) });
  try {
    const result = await parser.getText();
    return String(result.text ?? result);
  } finally {
    await parser.destroy?.();
  }
}

async function main() {
  const csvText = await fs.readFile(VACANCY_CSV_PATH, "utf8");
  const { headers, rows } = parseCsv(csvText);
  const schools = JSON.parse(await fs.readFile(SCHOOLS_MERGED_PATH, "utf8"));

  const updatesByDistrict = new Map();
  const asAtDates = new Set();

  for (const [district, url] of Object.entries(DISTRICT_PDFS)) {
    const pdfText = await fetchPdfText(url);
    const entries = parseDistrictEntries(pdfText);
    updatesByDistrict.set(district, { entries });
    asAtDates.add(extractAsAtDate(pdfText));
  }

  if (asAtDates.size !== 1) {
    throw new Error(`Inconsistent as-at dates across PDFs: ${Array.from(asAtDates).join(", ")}`);
  }

  const [asAtDateIso] = asAtDates;
  const asAtDateCsv = asAtDateIso.split("-").reverse().join("/");

  let changedRows = 0;
  let downgradedRows = 0;
  const unmatchedParsedByDistrict = [];

  for (const [district, districtUpdate] of updatesByDistrict.entries()) {
    const existingRows = rows.filter((row) => row.District === district);
    const entryQueues = new Map();
    const unmatchedExistingRows = [];

    for (const entry of districtUpdate.entries) {
      const key = canonicalSchoolName(entry.nameTc);
      const queue = entryQueues.get(key) ?? [];
      queue.push(entry);
      entryQueues.set(key, queue);
    }

    for (const row of existingRows) {
      const key = canonicalSchoolName(row["School Chinese Name"]);
      const queue = entryQueues.get(key) ?? [];
      const matched = queue.shift() ?? null;

      if (queue.length === 0) {
        entryQueues.delete(key);
      } else {
        entryQueues.set(key, queue);
      }

      if (!matched) {
        unmatchedExistingRows.push(row);
        continue;
      }

      const next = {
        ...row,
        "K1 Vacancy Status": matched.statuses[0],
        "K2 Vacancy Status": matched.statuses[1],
        "K3 Vacancy Status": matched.statuses[2],
        "As At Date": asAtDateCsv,
      };

      if (
        next["K1 Vacancy Status"] !== row["K1 Vacancy Status"] ||
        next["K2 Vacancy Status"] !== row["K2 Vacancy Status"] ||
        next["K3 Vacancy Status"] !== row["K3 Vacancy Status"] ||
        next["As At Date"] !== row["As At Date"]
      ) {
        changedRows += 1;
      }

      Object.assign(row, next);
    }

    const leftovers = Array.from(entryQueues.values()).flat();

    for (let index = 0; index < unmatchedExistingRows.length; index += 1) {
      const row = unmatchedExistingRows[index];
      const fallbackMatch = leftovers[index] ?? null;
      const [k1, k2, k3] = fallbackMatch?.statuses ?? ["NA", "NA", "NA"];
      if (!fallbackMatch) {
        downgradedRows += 1;
      }

      const next = {
        ...row,
        "K1 Vacancy Status": k1,
        "K2 Vacancy Status": k2,
        "K3 Vacancy Status": k3,
        "As At Date": asAtDateCsv,
      };

      if (
        next["K1 Vacancy Status"] !== row["K1 Vacancy Status"] ||
        next["K2 Vacancy Status"] !== row["K2 Vacancy Status"] ||
        next["K3 Vacancy Status"] !== row["K3 Vacancy Status"] ||
        next["As At Date"] !== row["As At Date"]
      ) {
        changedRows += 1;
      }

      Object.assign(row, next);
    }

    if (leftovers.length > unmatchedExistingRows.length) {
      unmatchedParsedByDistrict.push(`${district}: ${leftovers.slice(unmatchedExistingRows.length).map((entry) => entry.nameTc).join(" / ")}`);
    }
  }

  if (unmatchedParsedByDistrict.length > 0) {
    throw new Error(`Unmatched parsed vacancy rows: ${unmatchedParsedByDistrict.join("; ")}`);
  }

  const csvByCode = new Map(
    rows.map((row) => [
      String(row.SCRN ?? "").split("-")[0],
      {
        k1: STATUS_TO_APP[row["K1 Vacancy Status"]] ?? "no_information",
        k2: STATUS_TO_APP[row["K2 Vacancy Status"]] ?? "no_information",
        k3: STATUS_TO_APP[row["K3 Vacancy Status"]] ?? "no_information",
        edb_date: asAtDateIso,
      },
    ])
  );

  let updatedSchools = 0;
  for (const school of schools) {
    const update = csvByCode.get(String(school.code ?? ""));
    if (!update) continue;
    if (
      school.k1 !== update.k1 ||
      school.k2 !== update.k2 ||
      school.k3 !== update.k3 ||
      school.edb_date !== update.edb_date
    ) {
      updatedSchools += 1;
    }
    school.k1 = update.k1;
    school.k2 = update.k2;
    school.k3 = update.k3;
    school.edb_date = update.edb_date;
  }

  await fs.writeFile(VACANCY_CSV_PATH, stringifyCsv(headers, rows), "utf8");
  await fs.writeFile(SCHOOLS_MERGED_PATH, `${JSON.stringify(schools, null, 2)}\n`, "utf8");

  console.log(`EDB vacancy refresh complete.`);
  console.log(`As at date: ${asAtDateIso}`);
  console.log(`CSV rows changed: ${changedRows}`);
  console.log(`CSV rows downgraded to NA: ${downgradedRows}`);
  console.log(`schools_merged rows changed: ${updatedSchools}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});