import { NextRequest, NextResponse } from "next/server";
import { marketCategories } from "@/data/marketCategories";

function hashText(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function buildSeries(seedText: string, points = 24) {
  const seed = hashText(seedText);
  let value = 100 + (seed % 25);
  const out: number[] = [];

  for (let i = 0; i < points; i += 1) {
    const drift = ((seed + i * 17) % 7) - 3;
    const wave = Math.sin(i / 2.4) * 1.7;
    value = Math.max(10, value + drift * 0.55 + wave * 0.35);
    out.push(Number(value.toFixed(2)));
  }

  return out;
}

function buildPct(series: number[]) {
  if (series.length < 2) return 0;
  const first = series[0];
  const last = series[series.length - 1];
  return Number((((last - first) / first) * 100).toFixed(2));
}

export async function GET(request: NextRequest) {
  const cards = marketCategories.map((cat) => {
    const series = buildSeries(cat.id);
    const changePct = buildPct(series);
    return {
      ...cat,
      series,
      lastValue: series[series.length - 1],
      changePct,
      trend: changePct >= 0 ? ("up" as const) : ("down" as const),
      symbols: cat.starterSymbols,
    };
  });

  return NextResponse.json({ ok: true, cards });
}
