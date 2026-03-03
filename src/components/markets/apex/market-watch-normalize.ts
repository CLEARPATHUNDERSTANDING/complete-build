import { ApexChartType, MarketHistoryPoint } from "./market-watch-types";

/**
 * Normalizes raw market history data into ApexCharts-compatible series formats
 * based on the requested chart type.
 */
export function normalizeToApex(data: MarketHistoryPoint[], type: ApexChartType): any[] {
  switch (type) {
    case 'candlestick':
      return data.map(p => ({
        x: new Date(p.time * 1000),
        y: [p.open, p.high, p.low, p.close]
      }));
    case 'line':
    case 'area':
    case 'bar':
      return data.map(p => ({
        x: new Date(p.time * 1000),
        y: p.close
      }));
    default:
      return [];
  }
}
