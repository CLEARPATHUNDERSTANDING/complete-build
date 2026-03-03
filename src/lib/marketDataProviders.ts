'use client';

export type QuotePoint = {
  time: string;
  value: number;
};

export function computePct(series: number[]) {
  if (series.length < 2) return 0;
  const first = series[0];
  const last = series[series.length - 1];
  if (!first || first === 0) return 0;
  return Number((((last - first) / first) * 100).toFixed(2));
}

function buildFallbackSeries(seedText: string, points = 24) {
  let hash = 0;
  for (let i = 0; i < seedText.length; i++) {
    hash = (hash << 5) - hash + seedText.charCodeAt(i);
    hash |= 0;
  }
  const seed = Math.abs(hash);
  let value = 100 + (seed % 25);
  const out: number[] = [];
  for (let i = 0; i < points; i++) {
    const drift = ((seed + i * 17) % 7) - 3;
    const wave = Math.sin(i / 2.4) * 1.7;
    value = Math.max(10, value + drift * 0.55 + wave * 0.35);
    out.push(Number(value.toFixed(2)));
  }
  return out;
}

// Mocked server-side functions for the scaffold
async function getTwelveDataSeries(symbol: string): Promise<QuotePoint[]> {
  // Replace with real fetch to TwelveData in route handlers
  return [];
}

async function getFinnhubCryptoSeries(symbol: string): Promise<QuotePoint[]> {
  // Replace with real fetch to Finnhub in route handlers
  return [];
}

async function getFredSeries(fredId: string): Promise<QuotePoint[]> {
  // Replace with real fetch to FRED in route handlers
  return [];
}

export async function getBestSeriesForSymbol(marketId: string, symbol: string) {
  try {
    // Logic to hit real APIs if keys were present would go here
    // For the scaffold, we fall back to high-fidelity deterministic mock data
  } catch (e) {
    // fall through
  }

  return buildFallbackSeries(symbol).map((value, index) => ({
    time: `P${index}`,
    value
  }));
}

export async function getFredProxySeries(symbol: string) {
  const fredMap: Record<string, string> = {
    CPI: "CPIAUCSL",
    NFP: "PAYEMS",
    FOMC: "FEDFUNDS",
    GDP: "GDP",
    PMI: "NAPM",
    "US-GDP": "GDP",
    "US-CPI": "CPIAUCSL",
    "US-IR": "FEDFUNDS",
    "EU-CPI": "CP0000EZ19M086NEST",
    "JP-GDP": "JPNNGDP",
    SOFR: "SOFR",
    EFFR: "DFF",
    US02Y: "DGS2",
    US10Y: "DGS10",
    US30Y: "DGS30"
  };

  const fredId = fredMap[symbol] || fredMap.GDP;
  return getFredSeries(fredId);
}
