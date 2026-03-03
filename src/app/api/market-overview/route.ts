import { NextRequest, NextResponse } from "next/server";
import { marketCategories } from "@/data/marketCategories";
import { computePct, getBestSeriesForSymbol } from "@/lib/marketDataProviders";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const selected = id
      ? marketCategories.filter((item) => item.id === id)
      : marketCategories;

    if (!selected.length && id) {
      return NextResponse.json({ ok: false, error: "Category not found" }, { status: 404 });
    }

    const cards = await Promise.all(
      selected.map(async (item) => {
        try {
          const primarySymbol = item.starterSymbols?.[0] || item.id;
          const points = await getBestSeriesForSymbol(item.id, primarySymbol);
          const series = (points || []).map((p) => p.value);
          const changePct = computePct(series);
          const lastValue = series.length > 0 ? series[series.length - 1] : 0;

          return {
            id: item.id,
            label: item.label,
            description: item.description,
            children: item.children,
            symbols: item.starterSymbols,
            series,
            lastValue: typeof lastValue === 'number' ? Number(lastValue.toFixed(2)) : 0,
            changePct,
            trend: changePct >= 0 ? "up" : "down",
            accent: item.accent,
            glow: item.glow
          };
        } catch (innerError) {
          console.error(`Failed to process category ${item.id}:`, innerError);
          return {
            id: item.id,
            label: item.label,
            series: [],
            lastValue: 0,
            changePct: 0,
            trend: "neutral",
            accent: item.accent,
            glow: item.glow
          };
        }
      })
    );

    return NextResponse.json({ ok: true, cards });
  } catch (error: any) {
    console.error("Market overview API critical failure:", error);
    return NextResponse.json({ ok: false, error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
