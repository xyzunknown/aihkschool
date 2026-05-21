import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  fetchProgrammes,
  type ProgrammeCategory,
} from "@/lib/db/programmes";

export const dynamic = "force-dynamic";

const querySchema = z.object({
  category: z
    .enum(["swimming", "music", "dance", "art", "sport", "parent_child", "other"])
    .optional(),
  district: z
    .enum([
      "central_and_western", "eastern", "southern", "wan_chai",
      "kowloon_city", "kwun_tong", "sham_shui_po", "wong_tai_sin", "yau_tsim_mong",
      "islands", "kwai_tsing", "north", "sai_kung", "sha_tin",
      "tai_po", "tsuen_wan", "tuen_mun", "yuen_long",
    ])
    .optional(),
  search: z.string().max(100).optional(),
  // Up to 199 to match LCSD's "all ages" sentinel; lets adult / senior /
  // 親子 (0-17) presets surface in the full /programmes listing.
  ageMin: z.coerce.number().int().min(0).max(199).optional(),
  ageMax: z.coerce.number().int().min(0).max(199).optional(),
  // When true, drop programmes whose age_max is the LCSD "all ages" sentinel
  // (>= 50). Useful for narrow presets so that wide-range adult/senior rows
  // do not flood targeted preschool/primary listings.
  excludeAllAges: z.coerce.boolean().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(300).default(20),
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

    const { category, district, search, ageMin, ageMax, excludeAllAges, page, limit } = parsed.data;

    const result = await fetchProgrammes({
      category: category as ProgrammeCategory | undefined,
      district,
      search,
      ageMin,
      ageMax,
      excludeAllAges,
      page,
      limit,
    });

    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("GET /api/programmes error:", message, err);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Failed to fetch programmes" } },
      { status: 500 },
    );
  }
}
