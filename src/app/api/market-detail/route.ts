import { NextRequest, NextResponse } from "next/server";
import { marketCategories } from "@/data/marketCategories";
import { computePct, getBestSeriesForSymbol } from "@/lib/marketDataProviders";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const marketId = searchParams.get("marketId");
    const symbol = searchParams.get("symbol");

    if (!marketId) {
      return NextResponse.json({ ok: false, error: "marketId is required" }, { status: 400 });
    }

    const market = marketCategories.find((item) => item.id === marketId);
    if (!market) {
      return NextResponse.json({ ok: false, error: "market not found" }, { status: 404 });
    }

    const chosenSymbol = symbol || market.starterSymbols?.[0] || market.id;
    const points = await getBestSeriesForSymbol(marketId, chosenSymbol);
    const series = (points || []).map((p) => p.value);
    const changePct = computePct(series);

    return NextResponse.json({
      ok: true,
      market: {
        id: market.id,
        label: market.label,
        description: market.description,
        children: market.children,
        symbols: market.starterSymbols,
        accent: market.accent,
        glow: market.glow
      },
      symbol: chosenSymbol,
      points,
      stats: {
        lastValue: series.length > 0 ? series[series.length - 1] : 0,
        high: series.length ? Math.max(...series) : 0,
        low: series.length ? Math.min(...series) : 0,
        changePct
      }
    });
  } catch (error: any) {
    console.error("Market detail API critical failure:", error);
    return NextResponse.json({ ok: false, error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
