import { OhlcPoint } from "@/components/markets/apex/market-watch-types";

/**
 * Generates consistent mock OHLC data for a given symbol.
 */
export function generateMockOhlc(symbol: string, count: number = 60): OhlcPoint[] {
  const now = Date.now();
  const pts: OhlcPoint[] = [];
  const seed = symbol.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  let price = 100 + (seed % 500);

  for (let i = count; i >= 0; i--) {
    const t = now - i * 60_000; // 1m intervals
    const o = price;
    const delta = (Math.random() - 0.5) * (price * 0.02);
    const c = o + delta;
    const h = Math.max(o, c) + Math.random() * (price * 0.005);
    const l = Math.min(o, c) - Math.random() * (price * 0.005);
    const v = Math.floor(1000 + Math.random() * 5000);
    pts.push({ t, o, h, l, c, v });
    price = c;
  }

  return pts;
}
