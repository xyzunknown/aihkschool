import { IOS_BUNDLE_ID } from "@/lib/seo";

export const dynamic = "force-dynamic";

export function GET() {
  const teamId = process.env.APPLE_TEAM_ID || "HM627U98V5";
  const appId = `${teamId}.${IOS_BUNDLE_ID}`;
  const body = {
    applinks: {
      apps: [],
      details: [
        {
          appIDs: [appId],
          components: [
            { "/": "/kg/*", comment: "Open HKSchoolPlace school pages in the iOS app." },
            { "/": "/programmes/*", comment: "Open SmartPLAY programme pages in the iOS app." },
            { "/": "/activities/*", comment: "Open activity pages in the iOS app." },
            { "/": "/ios-app", comment: "Open the HKSchoolPlace app landing page." },
          ],
        },
      ],
    },
    webcredentials: {
      apps: [appId],
    },
  };

  return Response.json(body, {
    headers: {
      "cache-control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
