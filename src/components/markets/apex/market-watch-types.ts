export type ApexChartType =
  | "line"
  | "area"
  | "bar"
  | "column"
  | "scatter"
  | "heatmap"
  | "treemap"
  | "pie"
  | "donut"
  | "radar"
  | "radialBar"
  | "candlestick"
  | "rangeBar"
  | "rangeArea"
  | "boxPlot"
  | "funnel";

export const CHART_TYPES: Array<{ type: ApexChartType; label: string }> = [
  { type: "candlestick", label: "Candlestick" },
  { type: "line", label: "Line Chart" },
  { type: "area", label: "Area Chart" },
  { type: "bar", label: "Bar Chart" },
  { type: "column", label: "Column Chart" },
  { type: "boxPlot", label: "BoxPlot" },
  { type: "rangeBar", label: "Range Bar Chart" },
  { type: "rangeArea", label: "Range Area Chart" },
  { type: "heatmap", label: "Heat Map Chart" },
  { type: "treemap", label: "Treemap Chart" },
  { type: "funnel", label: "Funnel Chart" },
  { type: "pie", label: "Pie / Donut" },
  { type: "radar", label: "Radar" },
  { type: "radialBar", label: "RadialBar / Circular Gauge" },
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
  | { kind: "rangeArea"; series: Array<{ name: string; data: Array<{ x: number; y: [number, number] }> }> }
  | { kind: "pie"; labels: string[]; series: number[] }
  | { kind: "heatmap"; series: Array<{ name: string; data: Array<{ x: string; y: number }> }> }
  | { kind: "treemap"; series: Array<{ data: Array<{ x: string; y: number }> }> }
  | { kind: "radial"; labels: string[]; series: number[] }
  | { kind: "radar"; series: Array<{ name: string; data: number[] }>; labels: string[] }
  | { kind: "boxPlot"; series: Array<{ data: Array<{ x: string; y: [number, number, number, number, number] }> }> };
