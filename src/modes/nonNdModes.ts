'use client';
/**
 * @fileOverview Registry of 8 Standard (Non-ND) Trading Modes.
 */
import type { ModeConfig, PanelsEnabled } from "./types";
import { validateModesDataOnly } from "@/utils/modeCompliance";

/**
 * COMPLIANCE STRING
 */
const COMPLIANCE =
  "Data-only presentation: displays calculations and chart annotations. No financial guidance provided. No endorsements. No trade execution logic.";

const P_BASE: PanelsEnabled = {
  chart: true,
  watchlist: true,
  news: true,
  alerts: true,
  screener: false,
  calendar: false,
  journal: false,
  patterns: true,
  replay: false,
  research: false,
};

/**
 * Helper to define baseline chart physics for standard modes.
 */
function baseChart(bg: string) {
  return {
    background: bg,
    text: "rgba(255,255,255,0.90)",
    gridVert: "rgba(255,255,255,0.06)",
    gridHorz: "rgba(255,255,255,0.06)",
    crosshair: "rgba(255,255,255,0.20)",
    priceLine: "rgba(255,255,255,0.20)",
    upCandle: "#00E5FF",
    downCandle: "#FF3BD4",
    upWick: "#00E5FF",
    downWick: "#FF3BD4",
    borderUp: "#00E5FF",
    borderDown: "#FF3BD4",
    accent: "#00E5FF",
    glow: 0.35,
    density: "normal" as const,
  };
}

/**
 * Factory function for creating Mode configurations.
 */
function mk(
  id: string,
  label: string,
  description: string,
  patch: Partial<ModeConfig>
): ModeConfig {
  return {
    kind: "non-nd",
    id,
    label,
    description,

    marketScope: "all",
    defaultSymbol: "EURUSD",

    defaultCharts: 1,
    defaultLayout: "stack",

    tf: { analysisTF: "60", measureTF: "15", observeTF: "15" },

    panels: { ...P_BASE },

    chart: {
      ...baseChart("#05060a"),
      density: "normal",
    },

    complianceLine: COMPLIANCE,
    ...patch,
  };
}

export const NON_ND_MODES: ModeConfig[] = [
  mk("stocks", "Stocks", "Standard stock market analysis view.", { marketScope: "stocks", defaultSymbol: "AAPL" }),
  mk("etfs", "ETFs", "Exchange Traded Funds comparison view.", { marketScope: "etf", defaultSymbol: "SPY" }),
  mk("bonds", "Bonds", "Fixed income and treasury monitoring.", { marketScope: "macro", defaultSymbol: "US10Y" }),
  mk("forex", "Forex", "Currency pair volatility and trend tracking.", { marketScope: "fx", defaultSymbol: "EURUSD" }),
  mk("futures", "Futures", "Commodity and index futures terminal.", { marketScope: "futures", defaultSymbol: "ES" }),
  mk("crypto", "Crypto", "Digital asset and cryptocurrency feed.", { marketScope: "crypto", defaultSymbol: "BTCUSD" }),
  mk("indices", "Indices", "Global market index performance dashboard.", { marketScope: "indices", defaultSymbol: "SPX" }),
  mk("economy", "World Economy / Economic Indicators", "Macro-economic data and global indicator tracking.", { marketScope: "macro", defaultSymbol: "DXY" }),
];

// Validate copy is data-only
validateModesDataOnly(
  NON_ND_MODES.map((m) => ({
    id: m.id,
    label: m.label,
    description: m.description,
    complianceLine: m.complianceLine,
  }))
);
