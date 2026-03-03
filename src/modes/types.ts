export interface PanelsEnabled {
  chart: boolean;
  watchlist: boolean;
  news: boolean;
  alerts: boolean;
  screener: boolean;
  calendar: boolean;
  journal: boolean;
  patterns: boolean;
  replay: boolean;
  research: boolean;
}

export interface ModeConfig {
  kind: "nd" | "non-nd";
  id: string;
  label: string;
  description: string;
  marketScope: "all" | "macro" | "etf" | "stocks" | "futures" | "fx" | "crypto";
  defaultSymbol: string;
  defaultTimeframe?: string;
  defaultCharts?: number;
  defaultLayout?: "grid" | "stack";
  tf?: {
    analysisTF: string;
    measureTF?: string;
    observeTF?: string;
  };
  panels: PanelsEnabled;
  chart: {
    background: string;
    text: string;
    gridVert: string;
    gridHorz: string;
    crosshair: string;
    priceLine: string;
    upCandle: string;
    downCandle: string;
    upWick: string;
    downWick: string;
    borderUp: string;
    borderDown: string;
    accent: string;
    density: 'tight' | 'airy' | 'normal';
    glow: number;
  };
  complianceLine: string;
}
