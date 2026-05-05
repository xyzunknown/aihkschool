const MONTH_MAP = {
  jan: 1,
  january: 1,
  feb: 2,
  february: 2,
  mar: 3,
  march: 3,
  apr: 4,
  april: 4,
  may: 5,
  jun: 6,
  june: 6,
  jul: 7,
  july: 7,
  aug: 8,
  august: 8,
  sep: 9,
  sept: 9,
  september: 9,
  oct: 10,
  october: 10,
  nov: 11,
  november: 11,
  dec: 12,
  december: 12,
};

const SEASON_MONTH_MAP = {
  spring: 3,
  summer: 6,
  autumn: 9,
  fall: 9,
  winter: 12,
  春季: 3,
  春天: 3,
  夏季: 6,
  夏天: 6,
  秋季: 9,
  秋天: 9,
  冬季: 12,
  冬天: 12,
};

function pad(value) {
  return String(value).padStart(2, "0");
}

function isValidDate(year, month, day) {
  if (!year || month < 1 || month > 12 || day < 1 || day > 31) return false;
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

function toIso(year, month, day) {
  if (!isValidDate(year, month, day)) return null;
  return `${year}-${pad(month)}-${pad(day)}`;
}

function toDateFromIso(iso) {
  const date = new Date(`${iso}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function normalizeYear(year, month, day, referenceDate, preferFuture) {
  if (year) return year;
  const refYear = referenceDate.getFullYear();
  if (!preferFuture) return refYear;

  const candidateThisYear = new Date(refYear, month - 1, day);
  const cutoff = new Date(referenceDate);
  cutoff.setDate(cutoff.getDate() - 14);
  return candidateThisYear < cutoff ? refYear + 1 : refYear;
}

function pushCandidate(candidates, year, month, day, precision, referenceDate, preferFuture) {
  const resolvedYear = normalizeYear(year, month, day, referenceDate, preferFuture);
  const iso = toIso(resolvedYear, month, day);
  if (!iso) return;
  candidates.push({
    iso,
    precision,
    explicitYear: Boolean(year),
    distance: Math.abs((toDateFromIso(iso)?.getTime() ?? 0) - referenceDate.getTime()),
  });
}

function dedupeCandidates(candidates) {
  const seen = new Set();
  return candidates.filter((candidate) => {
    const key = `${candidate.iso}:${candidate.precision}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function isFutureCandidate(candidate, referenceDate) {
  const date = toDateFromIso(candidate.iso);
  if (!date) return false;
  const cutoff = new Date(referenceDate.getTime() - 7 * 24 * 60 * 60 * 1000);
  return date >= cutoff;
}

function chooseCandidate(candidates, options) {
  const precisionRank = { exact: 0, month_range: 1, season: 2, month_only: 3 };
  const items = dedupeCandidates(candidates);
  const filtered = options.preferFuture
    ? items.filter((candidate) => isFutureCandidate(candidate, options.referenceDate))
    : items;
  if (filtered.length === 0) return null;
  filtered.sort((first, second) => {
    const precisionDelta = precisionRank[first.precision] - precisionRank[second.precision];
    if (precisionDelta !== 0) return precisionDelta;
    if (first.explicitYear !== second.explicitYear) {
      return first.explicitYear ? -1 : 1;
    }
    return first.distance - second.distance;
  });
  return filtered[0]?.iso ?? null;
}

function parseEnglishMonthToken(token) {
  if (!token) return null;
  return MONTH_MAP[token.toLowerCase()] ?? null;
}

export function extractIsoDate(text, options = {}) {
  if (!text) return null;

  const referenceDate = options.referenceDate instanceof Date
    ? options.referenceDate
    : new Date();
  const preferFuture = options.preferFuture !== false;
  const candidates = [];
  const content = String(text).replace(/\u2013|\u2014/g, "-");

  for (const match of content.matchAll(/(?:^|[^\d])(20\d{2})\s*[./年-]\s*(\d{1,2})\s*[./月-]\s*(\d{1,2})\s*(?:[日號]?)(?=$|[^\d])/g)) {
    pushCandidate(candidates, Number(match[1]), Number(match[2]), Number(match[3]), "exact", referenceDate, preferFuture);
  }

  for (const match of content.matchAll(/(?:^|[^\d])(\d{1,2})\s*[./-]\s*(\d{1,2})\s*[./-]\s*(20\d{2})(?=$|[^\d])/g)) {
    pushCandidate(candidates, Number(match[3]), Number(match[2]), Number(match[1]), "exact", referenceDate, preferFuture);
  }

  for (const match of content.matchAll(/(?:^|[^\d])(?:(20\d{2})\s*年\s*)?(\d{1,2})\s*月\s*(\d{1,2})\s*[日號]?(?=$|[^\d])/g)) {
    pushCandidate(
      candidates,
      match[1] ? Number(match[1]) : null,
      Number(match[2]),
      Number(match[3]),
      "exact",
      referenceDate,
      preferFuture
    );
  }

  for (const match of content.matchAll(/\b(\d{1,2})(?:st|nd|rd|th)?\s+(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t|tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)(?:\s*,?\s*(20\d{2}))?\b/gi)) {
    const month = parseEnglishMonthToken(match[2]);
    if (month) {
      pushCandidate(candidates, match[3] ? Number(match[3]) : null, month, Number(match[1]), "exact", referenceDate, preferFuture);
    }
  }

  for (const match of content.matchAll(/\b(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t|tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+(\d{1,2})(?:st|nd|rd|th)?(?:\s*,?\s*(20\d{2}))?\b/gi)) {
    const month = parseEnglishMonthToken(match[1]);
    if (month) {
      pushCandidate(candidates, match[3] ? Number(match[3]) : null, month, Number(match[2]), "exact", referenceDate, preferFuture);
    }
  }

  for (const match of content.matchAll(/\b(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t|tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s*(?:\/|\-|to)\s*(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t|tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)(?:\s*(20\d{2}))\b/gi)) {
    const month = parseEnglishMonthToken(match[1]);
    if (month) {
      pushCandidate(candidates, Number(match[3]), month, 1, "month_range", referenceDate, preferFuture);
    }
  }

  for (const match of content.matchAll(/(?:^|[^\d])(\d{1,2})\s*月\s*(?:\/|\-|至)\s*(\d{1,2})\s*月\s*(?:(20\d{2})\s*年?)?/g)) {
    pushCandidate(candidates, match[3] ? Number(match[3]) : null, Number(match[1]), 1, "month_range", referenceDate, preferFuture);
  }

  for (const match of content.matchAll(/\b(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t|tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+(20\d{2})\b/gi)) {
    const month = parseEnglishMonthToken(match[1]);
    if (month) {
      pushCandidate(candidates, Number(match[2]), month, 1, "month_only", referenceDate, preferFuture);
    }
  }

  for (const match of content.matchAll(/(20\d{2})\s*年\s*(\d{1,2})\s*月/g)) {
    pushCandidate(candidates, Number(match[1]), Number(match[2]), 1, "month_only", referenceDate, preferFuture);
  }

  for (const match of content.matchAll(/\b(spring|summer|autumn|fall|winter)\s*(20\d{2})\b/gi)) {
    const month = SEASON_MONTH_MAP[match[1].toLowerCase()];
    if (month) {
      pushCandidate(candidates, Number(match[2]), month, 1, "season", referenceDate, preferFuture);
    }
  }

  for (const match of content.matchAll(/(20\d{2})\s*年\s*(春季|春天|夏季|夏天|秋季|秋天|冬季|冬天)/g)) {
    const month = SEASON_MONTH_MAP[match[2]];
    if (month) {
      pushCandidate(candidates, Number(match[1]), month, 1, "season", referenceDate, preferFuture);
    }
  }

  for (const match of content.matchAll(/(20\d{2})\s*(春季|春天|夏季|夏天|秋季|秋天|冬季|冬天)/g)) {
    const month = SEASON_MONTH_MAP[match[2]];
    if (month) {
      pushCandidate(candidates, Number(match[1]), month, 1, "season", referenceDate, preferFuture);
    }
  }

  for (const match of content.matchAll(/(春季|春天|夏季|夏天|秋季|秋天|冬季|冬天)\s*(20\d{2})?/g)) {
    const month = SEASON_MONTH_MAP[match[1]];
    if (month) {
      pushCandidate(candidates, match[2] ? Number(match[2]) : null, month, 1, "season", referenceDate, preferFuture);
    }
  }

  return chooseCandidate(candidates, { preferFuture, referenceDate });
}
