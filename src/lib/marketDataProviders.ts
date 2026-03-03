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

function hashText(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function buildFallbackSeries(seedText: string, points = 24) {
  const seed = hashText(seedText);
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
  return []; // Integration point for real TwelveData API
}

async function getFinnhubCryptoSeries(symbol: string): Promise<QuotePoint[]> {
  return []; // Integration point for real Finnhub API
}

async function getFredSeries(fredId: string): Promise<QuotePoint[]> {
  return []; // Integration point for real FRED API
}

export async function getBestSeriesForSymbol(marketId: string, symbol: string) {
  try {
    if (["forex", "stocks", "etfs", "indices", "futures", "commodities", "bonds"].includes(marketId)) {
      const data = await getTwelveDataSeries(symbol);
      if (data.length) return data;
    }

    if (marketId === "crypto") {
      const cryptoSymbol = symbol.includes(":") ? symbol : `BINANCE:${symbol.replace("/", "")}`;
      const data = await getFinnhubCryptoSeries(cryptoSymbol);
      if (data.length) return data;
    }

    if (["economic-calendar", "macro", "funds-rates"].includes(marketId)) {
      const data = await getFredProxySeries(symbol);
      if (data.length) return data;
    }
  } catch (e) {
    // fall through
  }

  return buildFallbackSeries(symbol).map((value, index) => ({
    time: `P${index}`,
    value
  }));
}

async function getFredProxySeries(symbol: string) {
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
