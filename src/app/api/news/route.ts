import { NextResponse } from "next/server";
import { getAllNewsItems } from "@/lib/homepage/liveData";

export async function GET() {
  const items = await getAllNewsItems();
  return NextResponse.json({ data: items });
}
