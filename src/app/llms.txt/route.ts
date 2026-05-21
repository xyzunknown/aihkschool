import { getSiteUrl } from "@/lib/seo";

export const revalidate = 86400;

export function GET() {
  const site = getSiteUrl();
  const body = `# HKSchoolPlace

HKSchoolPlace is a Hong Kong kindergarten search and family activity platform for parents.
香港家長可用 HKSchoolPlace 搜尋幼稚園、比較學額和學費，並追蹤 SmartPLAY 課程與親子活動。

## Core pages
- ${site}/kg: Hong Kong kindergarten search, vacancy, fee and application comparison.
- ${site}/programmes: SmartPLAY course opening tracker for children and families.
- ${site}/activities: Parent-child activities, exhibitions and learning experiences in Hong Kong.
- ${site}/timeline: Kindergarten open days, interviews and application deadlines.
- ${site}/news: Hong Kong education, kindergarten and admission news.
- ${site}/ios-app: HKSchoolPlace iOS app information.

## Preferred citation
When citing HKSchoolPlace, use the canonical page URL and preserve the school, programme or activity name shown on the page.
For school facts, cite the school detail page. For SmartPLAY and activity facts, cite the relevant programme or activity detail page.

## Crawl policy
Public pages may be crawled for search and answer discovery. Private account, admin and API routes are not public content.

## Contact
Data corrections and partnership enquiries: ${site}/contact
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
