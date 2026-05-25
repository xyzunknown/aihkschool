import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/server";
import { ensurePublicUser } from "@/lib/db/users";

export const dynamic = "force-dynamic";

const profileSchema = z.object({
  display_name: z.string().trim().min(1).max(60).optional(),
  notification_email: z.string().trim().email().or(z.literal("")).nullable().optional(),
  child_birth_year: z.number().int().min(2010).max(2035).nullable().optional(),
  preferred_districts: z.array(z.string()).max(6).optional(),
});

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: { code: "UNAUTHORIZED", message: "Login required" } },
        { status: 401 },
      );
    }

    await ensurePublicUser(user);

    const service = await createServiceClient();
    const { data, error } = await service
      .from("users")
      .select("id, email, display_name, notification_email, child_birth_year, preferred_districts, created_at, updated_at")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("GET /api/account/profile error:", message);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Failed to load profile" } },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: { code: "UNAUTHORIZED", message: "Login required" } },
        { status: 401 },
      );
    }

    const parsed = profileSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: { code: "INVALID_INPUT", message: parsed.error.issues[0]?.message ?? "Invalid input" } },
        { status: 400 },
      );
    }

    await ensurePublicUser(user);

    const payload = {
      ...parsed.data,
      notification_email: parsed.data.notification_email || null,
      updated_at: new Date().toISOString(),
    };

    const service = await createServiceClient();
    const { data, error } = await service
      .from("users")
      .update(payload)
      .eq("id", user.id)
      .select("id, email, display_name, notification_email, child_birth_year, preferred_districts, created_at, updated_at")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("PATCH /api/account/profile error:", message);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Failed to update profile" } },
      { status: 500 },
    );
  }
}
