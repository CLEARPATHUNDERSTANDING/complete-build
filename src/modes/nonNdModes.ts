'use client';
/**
 * @fileOverview Registry of 20 Standard (Non-ND) Trading Modes.
 */
import type { ModeConfig, PanelsEnabled } from "./types";
import { validateModesDataOnly } from "@/utils/modeCompliance";

/**
 * COMPLIANCE STRING
 * Updated to avoid forbidden terms ("advice", "recommend") while maintaining legal status.
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
  mk(
    "pro-trading-desk",
    "Pro Trading Desk",
    "Displays a multi-panel workstation for monitoring charts, lists, news, and notifications.",
    {
      marketScope: "all",
      defaultCharts: 2,
      defaultLayout: "grid",
      panels: { ...P_BASE, screener: true },
      chart: { ...baseChart("#05060a"), accent: "#00E5FF", glow: 0.55 }
    }
  ),
  mk(
    "macro-rates",
    "Macro & Rates",
    "Displays macro context with rate/yield proxies and event timing panels for regime awareness.",
    {
      marketScope: "macro",
      defaultSymbol: "DXY",
      defaultCharts: 2,
      tf: { analysisTF: "1440", measureTF: "60" },
      panels: { ...P_BASE, calendar: true },
      chart: { ...baseChart("#07070a"), accent: "#F59E0B", glow: 0.28, density: "airy" }
    }
  ),
  mk(
    "etf-markets",
    "ETF Markets",
    "Displays ETF-focused screening and grouping for broad exposure comparison.",
    {
      marketScope: "etf",
      defaultSymbol: "SPY",
      defaultCharts: 2,
      panels: { ...P_BASE, screener: true },
      chart: { ...baseChart("#05060a"), accent: "#60A5FA", glow: 0.32 }
    }
  ),
  mk(
    "earnings-catalysts",
    "Earnings & Catalysts",
    "Displays event windows and headline filters with gap-style measurements for reaction monitoring.",
    {
      marketScope: "stocks",
      defaultSymbol: "AAPL",
      tf: { analysisTF: "60", measureTF: "5" },
      panels: { ...P_BASE, calendar: true, screener: true },
      chart: { ...baseChart("#05060a"), accent: "#F472B6", glow: 0.5, density: "tight" }
    }
  ),
  mk(
    "options-flow",
    "Options Flow",
    "Displays options activity panels and volume/open-interest measurements (data view).",
    {
      marketScope: "stocks",
      defaultSymbol: "SPY",
      panels: { ...P_BASE, screener: true },
      chart: { ...baseChart("#05060a"), accent: "#A855F7", glow: 0.4, density: "tight" }
    }
  ),
  mk(
    "futures",
    "Futures",
    "Displays futures-only instruments with session timing and contract-focused monitoring panels.",
    {
      marketScope: "futures",
      defaultSymbol: "ES",
      defaultCharts: 2,
      panels: { ...P_BASE, calendar: true },
      chart: { ...baseChart("#05060a"), accent: "#F97316", glow: 0.38 }
    }
  ),
  mk(
    "fx-terminal",
    "FX Terminal",
    "Displays FX-only pairs with session context and correlation-style monitoring (data view).",
    {
      marketScope: "fx",
      defaultSymbol: "EURUSD",
      defaultCharts: 4,
      panels: { ...P_BASE, calendar: true },
      chart: { ...baseChart("#05060a"), accent: "#00E5FF", glow: 0.45, density: "tight" }
    }
  ),
  mk(
    "crypto-markets",
    "Crypto Markets",
    "Displays crypto-only symbols with movers and market context widgets (data view).",
    {
      marketScope: "crypto",
      defaultSymbol: "BTCUSD",
      defaultCharts: 4,
      panels: { ...P_BASE, screener: true },
      chart: { ...baseChart("#05060a"), accent: "#22C55E", glow: 0.6, density: "tight" }
    }
  ),
  mk(
    "scalper",
    "Scalper",
    "Displays a fast minimal layout with large candles and rapid symbol switching for quick observation.",
    {
      marketScope: "all",
      tf: { analysisTF: "15", measureTF: "1" },
      chart: { ...baseChart("#05060a"), accent: "#EF4444", glow: 0.62, density: "tight" }
    }
  ),
  mk(
    "swing",
    "Swing",
    "Displays higher-timeframe context alongside lower-timeframe measurements for structured comparison.",
    {
      marketScope: "all",
      defaultCharts: 2,
      tf: { analysisTF: "240", measureTF: "15" },
      panels: { ...P_BASE, journal: true },
      chart: { ...baseChart("#05060a"), accent: "#60A5FA", glow: 0.33, density: "airy" }
    }
  ),
  mk(
    "position",
    "Position",
    "Displays long-horizon context using daily/weekly frames for slower, higher-level observation.",
    {
      marketScope: "all",
      tf: { analysisTF: "10080", measureTF: "1440" },
      panels: { ...P_BASE, journal: true },
      chart: { ...baseChart("#06070a"), accent: "#94A3B8", glow: 0.2, density: "airy" }
    }
  ),
  mk(
    "news-first",
    "News-First",
    "Displays headlines and event context with the chart as a secondary reference view.",
    {
      marketScope: "all",
      panels: { ...P_BASE, calendar: true },
      chart: { ...baseChart("#05060a"), accent: "#F59E0B", glow: 0.25 }
    }
  ),
  mk(
    "screener",
    "Screener",
    "Displays sortable tables and filters for scanning symbol lists and changes (data view).",
    {
      marketScope: "stocks",
      defaultSymbol: "SPY",
      panels: { ...P_BASE, screener: true },
      chart: { ...baseChart("#05060a"), accent: "#00E5FF", glow: 0.18, density: "tight" }
    }
  ),
  mk(
    "portfolio-guardian",
    "Portfolio Guardian",
    "Displays monitoring panels for thresholds and exposure summaries (data view).",
    {
      marketScope: "all",
      panels: { ...P_BASE, alerts: true },
      chart: { ...baseChart("#05060a"), accent: "#F97316", glow: 0.22 }
    }
  ),
  mk(
    "backtest-lab",
    "Backtest Lab",
    "Displays replay-style review tools and measurement notes for learning and testing (data view).",
    {
      marketScope: "all",
      panels: { ...P_BASE, replay: true, journal: true },
      chart: { ...baseChart("#05060a"), accent: "#A855F7", glow: 0.22, density: "tight" }
    }
  ),
  mk(
    "market-intern",
    "Market Intern",
    "Displays guided labels, definitions, and structured prompts for learning what the chart is showing.",
    {
      marketScope: "all",
      panels: { ...P_BASE, replay: true, journal: true },
      chart: { ...baseChart("#05060a"), accent: "#34D399", glow: 0.22, density: "airy" }
    }
  ),
  mk(
    "minimal-clean",
    "Minimal Clean",
    "Displays a simplified chart-first view with reduced panels and low visual noise.",
    {
      marketScope: "all",
      panels: { chart: true, watchlist: true, news: false, alerts: false, screener: false, calendar: false, journal: false, patterns: false, replay: false, research: false },
      chart: { ...baseChart("#04050a"), accent: "#E5E7EB", glow: 0.08, density: "airy" }
    }
  ),
  mk(
    "multi-chart-wall",
    "Multi-Chart Wall",
    "Displays a multi-chart grid for comparing multiple symbols or frames at the same time.",
    {
      marketScope: "all",
      defaultCharts: 4,
      defaultLayout: "grid",
      chart: { ...baseChart("#05060a"), accent: "#00E5FF", glow: 0.32, density: "tight" }
    }
  ),
  mk(
    "research",
    "Research",
    "Displays research panels (documents/notes) with a single chart for context (data view).",
    {
      marketScope: "stocks",
      defaultSymbol: "AAPL",
      panels: { ...P_BASE, research: true, screener: true },
      chart: { ...baseChart("#06070a"), accent: "#94A3B8", glow: 0.15, density: "airy" }
    }
  ),
  mk(
    "creator-streamer",
    "Creator / Streamer",
    "Displays presentation-friendly layouts with clean overlays and capture-ready panels (data view).",
    {
      marketScope: "all",
      chart: { ...baseChart("#05060a"), accent: "#00E5FF", glow: 0.5 }
    }
  ),
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
