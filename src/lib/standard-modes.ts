'use client';

export type StandardModeId =
  | "pro_trading_desk"
  | "macro_rates"
  | "etf_markets"
  | "earnings_catalysts"
  | "options_flow"
  | "futures"
  | "fx_terminal"
  | "crypto_markets"
  | "scalper"
  | "swing"
  | "position"
  | "news_first"
  | "screener"
  | "portfolio_guardian"
  | "backtest_lab"
  | "market_intern"
  | "minimal_clean"
  | "multi_chart_wall"
  | "research"
  | "creator_streamer";

export interface StandardMode {
  id: StandardModeId;
  label: string;
}

export const STANDARD_MODES: StandardMode[] = [
  { id: "pro_trading_desk", label: "Pro Trading Desk Mode" },
  { id: "macro_rates", label: "Macro & Rates Mode" },
  { id: "etf_markets", label: "ETF Markets Mode" },
  { id: "earnings_catalysts", label: "Earnings & Catalysts Mode" },
  { id: "options_flow", label: "Options Flow Mode" },
  { id: "futures", label: "Futures Mode" },
  { id: "fx_terminal", label: "FX Terminal Mode" },
  { id: "crypto_markets", label: "Crypto Markets Mode" },
  { id: "scalper", label: "Scalper Mode" },
  { id: "swing", label: "Swing Mode" },
  { id: "position", label: "Position Mode" },
  { id: "news_first", label: "News-First Mode" },
  { id: "screener", label: "Screener Mode" },
  { id: "portfolio_guardian", label: "Portfolio Guardian Mode" },
  { id: "backtest_lab", label: "Backtest Lab Mode" },
  { id: "market_intern", label: "Market Intern Mode" },
  { id: "minimal_clean", label: "Minimal Clean Mode" },
  { id: "multi_chart_wall", label: "Multi-Chart Wall Mode" },
  { id: "research", label: "Research Mode" },
  { id: "creator_streamer", label: "Creator / Streamer Mode" },
];
