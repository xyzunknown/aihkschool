const SIMPLIFIED_TO_TRADITIONAL: Record<string, string> = {
  学: "學",
  园: "園",
  际: "際",
  国: "國",
  华: "華",
  龙: "龍",
  区: "區",
  体: "體",
  习: "習",
  会: "會",
  圣: "聖",
  礼: "禮",
  宝: "寶",
  儿: "兒",
  语: "語",
  双: "雙",
  爱: "愛",
  乐: "樂",
  东: "東",
  湾: "灣",
  观: "觀",
  兴: "興",
  门: "門",
  县: "縣",
  广: "廣",
  书: "書",
  这: "這",
  里: "裡",
  开: "開",
  关: "關",
  报: "報",
  额: "額",
  费: "費",
  课: "課",
  程: "程",
};

const TRADITIONAL_TO_SIMPLIFIED = Object.fromEntries(
  Object.entries(SIMPLIFIED_TO_TRADITIONAL).map(([simplified, traditional]) => [traditional, simplified]),
) as Record<string, string>;

function convertCharacters(input: string, dictionary: Record<string, string>) {
  return Array.from(input).map((char) => dictionary[char] ?? char).join("");
}

export function toTraditionalSearchText(input: string) {
  return convertCharacters(input, SIMPLIFIED_TO_TRADITIONAL);
}

export function toSimplifiedSearchText(input: string) {
  return convertCharacters(input, TRADITIONAL_TO_SIMPLIFIED);
}

export function getSearchTextVariants(input: string) {
  const trimmed = input.trim();
  if (!trimmed) return [];

  return Array.from(new Set([
    trimmed,
    toTraditionalSearchText(trimmed),
    toSimplifiedSearchText(trimmed),
  ]));
}

export function normalizeSearchText(input: string) {
  return toTraditionalSearchText(input).toLocaleLowerCase("zh-Hant-HK");
}

export function matchesSearchText(value: string, query: string) {
  const normalizedQuery = normalizeSearchText(query.trim());
  if (!normalizedQuery) return true;
  return normalizeSearchText(value).includes(normalizedQuery);
}

export function startsWithSearchText(value: string, query: string) {
  const normalizedQuery = normalizeSearchText(query.trim());
  if (!normalizedQuery) return false;
  return normalizeSearchText(value).startsWith(normalizedQuery);
}
