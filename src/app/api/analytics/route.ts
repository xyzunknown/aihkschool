import { NextRequest, NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const EVENT_NAMES = new Set(["page_view", "search", "favorite", "compare", "programme_follow", "application_click", "recommendation_click"]);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const eventName = String(body.event_name ?? "");
    if (!EVENT_NAMES.has(eventName)) {
      return NextResponse.json({ success: true });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const service = await createServiceClient();
    await service.from("analytics_events" as never).insert({
      event_name: eventName,
      page_path: typeof body.page_path === "string" ? body.page_path.slice(0, 300) : null,
      target_type: typeof body.target_type === "string" ? body.target_type.slice(0, 80) : null,
      target_id: typeof body.target_id === "string" ? body.target_id.slice(0, 120) : null,
      target_label: typeof body.target_label === "string" ? body.target_label.slice(0, 200) : null,
      search_term: typeof body.search_term === "string" ? body.search_term.slice(0, 100) : null,
      user_id: user?.id ?? null,
      metadata: typeof body.metadata === "object" && body.metadata ? body.metadata : {},
    } as never);
  } catch {
    // Analytics must never break the product.
  }

  return NextResponse.json({ success: true });
}
