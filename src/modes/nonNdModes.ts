// src/modes/nonNdModes.ts
import type { ModeConfig, PanelsEnabled } from "./types";
import { validateModesDataOnly } from "@/utils/modeCompliance";

const COMPLIANCE =
  "Data-only: displays calculations and chart annotations. Not financial advice. No recommendations. No trade instructions.";

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

    chart: baseChart("#05060a"),

    complianceLine: COMPLIANCE,
    ...patch,
  };
}

export const NON_ND_MODES: ModeConfig[] = [
  // 1) Pro Trading Desk
  mk(
    "pro-trading-desk",
    "Pro Trading Desk",
    "Displays a multi-panel workstation for monitoring charts, lists, news, and notifications.",
    {
      marketScope: "all",
      defaultCharts: 2,
      defaultLayout: "grid",
      tf: { analysisTF: "60", measureTF: "15", observeTF: "15" },
      panels: { ...P_BASE, screener: true, calendar: false, journal: false },
      chart: { ...baseChart("#05060a"), accent: "#00E5FF", upCandle: "#00E5FF", downCandle: "#FF3BD4", glow: 0.55, density: "normal" },
    }
  ),

  // 2) Macro & Rates
  mk(
    "macro-rates",
    "Macro & Rates",
    "Displays macro context with rate/yield proxies and event timing panels for regime awareness.",
    {
      marketScope: "macro",
      defaultSymbol: "DXY",
      defaultCharts: 2,
      defaultLayout: "stack",
      tf: { analysisTF: "D", measureTF: "60" },
      panels: { ...P_BASE, calendar: true, screener: false, patterns: false, news: true },
      chart: { ...baseChart("#07070a"), accent: "#F59E0B", upCandle: "#22C55E", downCandle: "#F97316", glow: 0.28, density: "airy" },
    }
  ),

  // 3) ETF Markets
  mk(
    "etf-markets",
    "ETF Markets",
    "Displays ETF-focused screening and grouping for broad exposure comparison.",
    {
      marketScope: "etf",
      defaultSymbol: "SPY",
      defaultCharts: 2,
      defaultLayout: "grid",
      tf: { analysisTF: "D", measureTF: "60" },
      panels: { ...P_BASE, screener: true, calendar: false, patterns: true },
      chart: { ...baseChart("#05060a"), accent: "#60A5FA", upCandle: "#22C55E", downCandle: "#F97316", glow: 0.32, density: "normal" },
    }
  ),

  // 4) Earnings & Catalysts
  mk(
    "earnings-catalysts",
    "Earnings & Catalysts",
    "Displays event windows and headline filters with gap-style measurements for reaction monitoring.",
    {
      marketScope: "stocks",
      defaultSymbol: "AAPL",
      defaultCharts: 2,
      defaultLayout: "grid",
      tf: { analysisTF: "60", measureTF: "5", observeTF: "15" },
      panels: { ...P_BASE, calendar: true, screener: true, patterns: true, news: true },
      chart: { ...baseChart("#05060a"), accent: "#F472B6", upCandle: "#22C55E", downCandle: "#EF4444", glow: 0.5, density: "tight" },
    }
  ),

  // 5) Options Flow (data-only)
  mk(
    "options-flow",
    "Options Flow",
    "Displays options activity panels and volume/open-interest measurements (data view).",
    {
      marketScope: "stocks",
      defaultSymbol: "SPY",
      defaultCharts: 1,
      defaultLayout: "stack",
      tf: { analysisTF: "60", measureTF: "15" },
      panels: { ...P_BASE, screener: true, calendar: false, patterns: true },
      chart: { ...baseChart("#05060a"), accent: "#A855F7", upCandle: "#00E5FF", downCandle: "#EF4444", glow: 0.4, density: "tight" },
    }
  ),

  // 6) Futures (STRICT)
  mk(
    "futures",
    "Futures",
    "Displays futures-only instruments with session timing and contract-focused monitoring panels.",
    {
      marketScope: "futures",
      defaultSymbol: "ES",
      defaultCharts: 2,
      defaultLayout: "grid",
      tf: { analysisTF: "60", measureTF: "15" },
      panels: { ...P_BASE, calendar: true, screener: false, patterns: true },
      chart: { ...baseChart("#05060a"), accent: "#F97316", upCandle: "#22C55E", downCandle: "#F97316", glow: 0.38, density: "normal" },
    }
  ),

  // 7) FX Terminal (STRICT)
  mk(
    "fx-terminal",
    "FX Terminal",
    "Displays FX-only pairs with session context and correlation-style monitoring (data view).",
    {
      marketScope: "fx",
      defaultSymbol: "EURUSD",
      defaultCharts: 4,
      defaultLayout: "grid",
      tf: { analysisTF: "60", measureTF: "15" },
      panels: { ...P_BASE, calendar: true, screener: false, patterns: true },
      chart: { ...baseChart("#05060a"), accent: "#00E5FF", upCandle: "#00E5FF", downCandle: "#8B5CF6", glow: 0.45, density: "tight" },
    }
  ),

  // 8) Crypto Markets (STRICT)
  mk(
    "crypto-markets",
    "Crypto Markets",
    "Displays crypto-only symbols with movers and market context widgets (data view).",
    {
      marketScope: "crypto",
      defaultSymbol: "BTCUSD",
      defaultCharts: 4,
      defaultLayout: "grid",
      tf: { analysisTF: "60", measureTF: "15" },
      panels: { ...P_BASE, screener: true, calendar: false, patterns: true },
      chart: { ...baseChart("#05060a"), accent: "#22C55E", upCandle: "#22C55E", downCandle: "#F472B6", glow: 0.6, density: "tight" },
    }
  ),

  // 9) Scalper (data-only, fast observation)
  mk(
    "scalper",
    "Scalper",
    "Displays a fast minimal layout with large candles and rapid symbol switching for quick observation.",
    {
      marketScope: "all",
      defaultSymbol: "EURUSD",
      defaultCharts: 1,
      defaultLayout: "stack",
      tf: { analysisTF: "15", measureTF: "1", observeTF: "5" },
      panels: { ...P_BASE, news: false, screener: false, calendar: false, journal: false, patterns: true },
      chart: { ...baseChart("#05060a"), accent: "#EF4444", upCandle: "#00E5FF", downCandle: "#EF4444", glow: 0.62, density: "tight" },
    }
  ),

  // 10) Swing (HTF context + LTF measurement)
  mk(
    "swing",
    "Swing",
    "Displays higher-timeframe context alongside lower-timeframe measurements for structured comparison.",
    {
      marketScope: "all",
      defaultSymbol: "EURUSD",
      defaultCharts: 2,
      defaultLayout: "grid",
      tf: { analysisTF: "240", measureTF: "15", observeTF: "60" },
      panels: { ...P_BASE, journal: true, news: true, patterns: true },
      chart: { ...baseChart("#05060a"), accent: "#60A5FA", upCandle: "#22C55E", downCandle: "#F59E0B", glow: 0.33, density: "airy" },
    }
  ),

  // 11) Position (long horizon)
  mk(
    "position",
    "Position",
    "Displays long-horizon context using daily/weekly frames for slower, higher-level observation.",
    {
      marketScope: "all",
      defaultCharts: 1,
      defaultLayout: "stack",
      tf: { analysisTF: "W", measureTF: "D" },
      panels: { ...P_BASE, journal: true, news: true, patterns: true, screener: false },
      chart: { ...baseChart("#06070a"), accent: "#94A3B8", upCandle: "#22C55E", downCandle: "#F97316", glow: 0.2, density: "airy" },
    }
  ),

  // 12) News-First
  mk(
    "news-first",
    "News-First",
    "Displays headlines and event context with the chart as a secondary reference view.",
    {
      marketScope: "all",
      defaultCharts: 1,
      defaultLayout: "stack",
      tf: { analysisTF: "60", measureTF: "15" },
      panels: { ...P_BASE, calendar: true, patterns: false, screener: false, news: true },
      chart: { ...baseChart("#05060a"), accent: "#F59E0B", upCandle: "#00E5FF", downCandle: "#F59E0B", glow: 0.25, density: "normal" },
    }
  ),

  // 13) Screener
  mk(
    "screener",
    "Screener",
    "Displays sortable tables and filters for scanning symbol lists and changes (data view).",
    {
      marketScope: "stocks",
      defaultSymbol: "SPY",
      defaultCharts: 1,
      defaultLayout: "stack",
      tf: { analysisTF: "60", measureTF: "60" },
      panels: { ...P_BASE, screener: true, news: false, calendar: false, patterns: false },
      chart: { ...baseChart("#05060a"), accent: "#00E5FF", upCandle: "#00E5FF", downCandle: "#FF3BD4", glow: 0.18, density: "tight" },
    }
  ),

  // 14) Portfolio Guardian
  mk(
    "portfolio-guardian",
    "Portfolio Guardian",
    "Displays monitoring panels for thresholds and exposure summaries (data view).",
    {
      marketScope: "all",
      defaultCharts: 1,
      defaultLayout: "stack",
      tf: { analysisTF: "D", measureTF: "60" },
      panels: { ...P_BASE, news: true, alerts: true, patterns: false, screener: false },
      chart: { ...baseChart("#05060a"), accent: "#F97316", upCandle: "#22C55E", downCandle: "#F97316", glow: 0.22, density: "normal" },
    }
  ),

  // 15) Backtest Lab
  mk(
    "backtest-lab",
    "Backtest Lab",
    "Displays replay-style review tools and measurement notes for learning and testing (data view).",
    {
      marketScope: "all",
      defaultCharts: 1,
      defaultLayout: "stack",
      panels: { ...P_BASE, replay: true, journal: true, news: false, patterns: true },
      chart: { ...baseChart("#05060a"), accent: "#A855F7", upCandle: "#00E5FF", downCandle: "#F472B6", glow: 0.22, density: "tight" },
    }
  ),

  // 16) Market Intern
  mk(
    "market-intern",
    "Market Intern",
    "Displays guided labels, definitions, and structured prompts for learning what the chart is showing.",
    {
      marketScope: "all",
      defaultCharts: 1,
      defaultLayout: "stack",
      panels: { ...P_BASE, replay: true, journal: true, news: false, patterns: true },
      chart: { ...baseChart("#05060a"), accent: "#34D399", upCandle: "#22C55E", downCandle: "#F97316", glow: 0.22, density: "airy" },
    }
  ),

  // 17) Minimal Clean
  mk(
    "minimal-clean",
    "Minimal Clean",
    "Displays a simplified chart-first view with reduced panels and low visual noise.",
    {
      marketScope: "all",
      defaultCharts: 1,
      defaultLayout: "stack",
      panels: { ...P_BASE, news: false, alerts: false, screener: false, calendar: false, journal: false, patterns: false },
      chart: { ...baseChart("#04050a"), accent: "#E5E7EB", upCandle: "#E5E7EB", downCandle: "#F97316", glow: 0.08, density: "airy" },
    }
  ),

  // 18) Multi-Chart Wall
  mk(
    "multi-chart-wall",
    "Multi-Chart Wall",
    "Displays a multi-chart grid for comparing multiple symbols or frames at the same time.",
    {
      marketScope: "all",
      defaultCharts: 4,
      defaultLayout: "grid",
      tf: { analysisTF: "60", measureTF: "15" },
      panels: { ...P_BASE, news: false, screener: false, calendar: false, patterns: false },
      chart: { ...baseChart("#05060a"), accent: "#00E5FF", upCandle: "#00E5FF", downCandle: "#FF3BD4", glow: 0.32, density: "tight" },
    }
  ),

  // 19) Research
  mk(
    "research",
    "Research",
    "Displays research panels (documents/notes) with a single chart for context (data view).",
    {
      marketScope: "stocks",
      defaultSymbol: "AAPL",
      defaultCharts: 1,
      defaultLayout: "stack",
      tf: { analysisTF: "D", measureTF: "60" },
      panels: { ...P_BASE, research: true, screener: true, news: true, patterns: false },
      chart: { ...baseChart("#06070a"), accent: "#94A3B8", upCandle: "#22C55E", downCandle: "#EF4444", glow: 0.15, density: "airy" },
    }
  ),

  // 20) Creator / Streamer
  mk(
    "creator-streamer",
    "Creator / Streamer",
    "Displays presentation-friendly layouts with clean overlays and capture-ready panels (data view).",
    {
      marketScope: "all",
      defaultCharts: 1,
      defaultLayout: "stack",
      panels: { ...P_BASE, news: true, alerts: false, screener: false, patterns: true },
      chart: { ...baseChart("#05060a"), accent: "#00E5FF", upCandle: "#00E5FF", downCandle: "#F59E0B", glow: 0.5, density: "normal" },
    }
  ),
];

// validate copy is data-only (dev safety)
validateModesDataOnly(
  NON_ND_MODES.map((m) => ({
    id: m.id,
    label: m.label,
    description: m.description,
    complianceLine: m.complianceLine,
  }))
);
