export type QuotePoint = {
  time: string;
  value: number;
};

export function computePct(series: number[]) {
  if (!series || series.length < 2) return 0;
  const first = series[0];
  const last = series[series.length - 1];
  if (typeof first !== 'number' || typeof last !== 'number' || first === 0) return 0;
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

/**
 * Fetches real-time crypto series from CoinAPI.io
 */
async function getCoinApiSeries(symbol: string): Promise<QuotePoint[]> {
  const apiKey = process.env.COINAPI_KEY || "ed697bd4-d7df-462c-b4cb-1a9e9a19fbfa";
  if (!apiKey) return [];

  try {
    // Normalize symbol for CoinAPI (e.g. BTC/USD -> BITSTAMP_SPOT_BTC_USD or similar)
    // For simplicity, we use their asset_id based endpoint
    const cleanSym = symbol.replace("/", "_").toUpperCase();
    const url = `https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_${cleanSym}/latest?period_id=1HRS&limit=24`;
    
    const res = await fetch(url, {
      headers: { "X-CoinAPI-Key": apiKey },
      next: { revalidate: 300 } // Cache for 5 minutes
    });

    if (!res.ok) return [];
    
    const data = await res.json();
    return data.map((item: any) => ({
      time: item.time_period_start,
      value: item.price_close
    })).reverse();
  } catch (e) {
    console.error("CoinAPI fetch failed:", e);
    return [];
  }
}

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
    // Priority 1: CoinAPI for Crypto
    if (marketId === "crypto") {
      const data = await getCoinApiSeries(symbol);
      if (data && data.length) return data;
    }

    // Priority 2: Standard Financial Markets
    if (["forex", "stocks", "etfs", "indices", "futures", "commodities", "bonds"].includes(marketId)) {
      const data = await getTwelveDataSeries(symbol);
      if (data && data.length) return data;
    }

    // Priority 3: Macro Indicators
    if (["economic-calendar", "macro", "funds-rates"].includes(marketId)) {
      const data = await getFredProxySeries(symbol);
      if (data && data.length) return data;
    }
  } catch (e) {
    console.error("Market data provider failed:", e);
  }

  // Fallback: Mocked truth layer
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
