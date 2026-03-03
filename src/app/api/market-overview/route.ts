import { NextRequest, NextResponse } from "next/server";
import { marketCategories } from "@/data/marketCategories";
import { computePct, getBestSeriesForSymbol } from "@/lib/marketDataProviders";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const selected = id
    ? marketCategories.filter((item) => item.id === id)
    : marketCategories;

  const cards = await Promise.all(
    selected.map(async (item) => {
      const primarySymbol = item.starterSymbols[0];
      const points = await getBestSeriesForSymbol(item.id, primarySymbol);
      const series = points.map((p) => p.value);
      const changePct = computePct(series);
      const lastValue = series[series.length - 1] ?? 0;

      return {
        id: item.id,
        label: item.label,
        description: item.description,
        children: item.children,
        symbols: item.starterSymbols,
        series,
        lastValue: Number(lastValue.toFixed?.(2) ?? lastValue),
        changePct,
        trend: changePct >= 0 ? "up" : "down",
        accent: item.accent,
        glow: item.glow
      };
    })
  );

  return NextResponse.json({ ok: true, cards });
}
