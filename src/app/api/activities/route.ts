import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  fetchActivities,
  type ActivityCategory,
  type ActivityDistrict,
} from "@/lib/db/activities";

export const dynamic = "force-dynamic";

const querySchema = z.object({
  category: z
    .enum([
      "music",
      "sports",
      "art",
      "dance",
      "stem",
      "language",
      "drama",
      "other",
    ])
    .optional(),
  district: z
    .enum([
      "central_and_western",
      "eastern",
      "southern",
      "wan_chai",
      "kowloon_city",
      "kwun_tong",
      "sham_shui_po",
      "wong_tai_sin",
      "yau_tsim_mong",
      "islands",
      "kwai_tsing",
      "north",
      "sai_kung",
      "sha_tin",
      "tai_po",
      "tsuen_wan",
      "tuen_mun",
      "yuen_long",
    ])
    .optional(),
  free: z.enum(["true", "false"]).optional(),
  age: z.coerce.number().int().min(0).max(12).optional(),
  search: z.string().max(100).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const raw = Object.fromEntries(searchParams.entries());
    const parsed = querySchema.safeParse(raw);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: {
            code: "INVALID_QUERY",
            message: parsed.error.issues[0]?.message ?? "Invalid query",
          },
        },
        { status: 400 },
      );
    }

    const { category, district, free, age, search, page, limit } = parsed.data;

    const result = await fetchActivities({
      category: category as ActivityCategory | undefined,
      district: district as ActivityDistrict | undefined,
      free: free === "true" ? true : undefined,
      age,
      search,
      page,
      limit,
    });

    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("GET /api/activities error:", message, err);
    return NextResponse.json(
      {
        error: { code: "INTERNAL_ERROR", message: "Failed to fetch activities" },
      },
      { status: 500 },
    );
  }
}
