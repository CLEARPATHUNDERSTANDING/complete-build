export type ApexChartType = 'candlestick' | 'line' | 'area' | 'bar';

export interface MarketHistoryPoint {
  time: number; // Unix timestamp in seconds
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface ApexSeries {
  name: string;
  data: { x: Date; y: number | number[] }[];
}
