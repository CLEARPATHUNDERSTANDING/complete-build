export type ApexChartType =
  | "line"
  | "area"
  | "bar"
  | "scatter"
  | "heatmap"
  | "treemap"
  | "pie"
  | "donut"
  | "radialBar"
  | "candlestick"
  | "rangeBar"
  | "boxPlot";

export const CHART_TYPES: Array<{ type: ApexChartType; label: string }> = [
  { type: "candlestick", label: "Candlestick" },
  { type: "line", label: "Line" },
  { type: "area", label: "Area" },
  { type: "bar", label: "Bar" },
  { type: "rangeBar", label: "Range Bar" },
  { type: "scatter", label: "Scatter" },
  { type: "heatmap", label: "Heatmap" },
  { type: "treemap", label: "Treemap" },
  { type: "pie", label: "Pie" },
  { type: "donut", label: "Donut" },
  { type: "radialBar", label: "Radial Bar" },
  { type: "boxPlot", label: "Box Plot" },
];

export type OhlcPoint = {
  t: number; // epoch ms
  o: number;
  h: number;
  l: number;
  c: number;
  v?: number;
};

export type MarketSeries =
  | { kind: "xy"; series: Array<{ name: string; data: Array<{ x: number; y: number }> }> }
  | { kind: "candle"; series: Array<{ data: Array<{ x: number; y: [number, number, number, number] }> }> }
  | { kind: "rangeBar"; series: Array<{ data: Array<{ x: string; y: [number, number] }> }> }
  | { kind: "pie"; labels: string[]; series: number[] }
  | { kind: "heatmap"; series: Array<{ name: string; data: Array<{ x: string; y: number }> }> }
  | { kind: "treemap"; series: Array<{ data: Array<{ x: string; y: number }> }> }
  | { kind: "radial"; labels: string[]; series: number[] }
  | { kind: "boxPlot"; series: Array<{ data: Array<{ x: string; y: [number, number, number, number, number] }> }> };
