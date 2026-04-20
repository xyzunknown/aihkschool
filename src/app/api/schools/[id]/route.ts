import { NextRequest, NextResponse } from "next/server";
import { fetchSchoolById, fetchSchoolEnrichment } from "@/lib/db/schools";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const school = await fetchSchoolById(params.id);

    if (!school) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "School not found" } },
        { status: 404 }
      );
    }

    // Check auth status for tiered payload
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const isAuthenticated = !!user;

    // Fetch enrichment data (reputation, official crawled data)
    // Pass auth status so DB query only selects permitted columns
    const enrichment = await fetchSchoolEnrichment(params.id, { includeRestricted: isAuthenticated });

    return NextResponse.json({
      data: {
        ...school,
        enrichment: enrichment ?? null,
      },
    });
  } catch (err) {
    console.error("GET /api/schools/[id] error:", err);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Failed to fetch school" } },
      { status: 500 }
    );
  }
}
