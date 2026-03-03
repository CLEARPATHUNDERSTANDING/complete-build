import { NextResponse } from "next/server";
import { marketCategories } from "@/data/marketCategories";

export async function GET() {
  return NextResponse.json({
    ok: true,
    count: marketCategories.length,
    markets: marketCategories
  });
}
