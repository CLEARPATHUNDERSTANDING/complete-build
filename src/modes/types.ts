export interface ModeConfig {
  id: string;
  label: string;
  defaultSymbol: string;
  defaultTimeframe?: string;
  defaultCharts?: number;
  defaultLayout?: "grid" | "stack";
  tf?: {
    analysisTF: string;
  };
  chart: {
    background: string;
    text: string;
    gridVert: string;
    crosshair: string;
    upCandle: string;
    downCandle: string;
    priceLine: string;
    accent: string;
    density: 'tight' | 'airy' | 'normal';
    glow: number;
  };
}
