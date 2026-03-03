'use client';
/**
 * @fileOverview Definition of major market categories for the visual overview board.
 */

export type MarketCategory = {
  id: string;
  label: string;
  accent: string;
  glow: string;
  description: string;
  children: string[];
  starterSymbols: string[];
};

export const marketCategories: MarketCategory[] = [
  {
    id: "forex",
    label: "Forex",
    accent: "from-cyan-400 to-blue-500",
    glow: "shadow-[0_0_35px_rgba(34,211,238,0.28)]",
    description: "Major, minor, cross, and regional currency markets.",
    children: ["Majors", "Minors", "Exotics", "Crosses", "Regional FX"],
    starterSymbols: ["EURUSD", "USDJPY", "GBPUSD", "AUDUSD", "USDCAD"]
  },
  {
    id: "stocks",
    label: "Stocks",
    accent: "from-fuchsia-500 to-pink-500",
    glow: "shadow-[0_0_35px_rgba(236,72,153,0.28)]",
    description: "Equities across US and global exchanges.",
    children: ["US", "International", "Large Cap", "Mid Cap", "Small Cap", "Sectors"],
    starterSymbols: ["AAPL", "MSFT", "NVDA", "TSLA", "AMZN"]
  },
  {
    id: "etfs",
    label: "ETFs",
    accent: "from-violet-500 to-purple-500",
    glow: "shadow-[0_0_35px_rgba(168,85,247,0.28)]",
    description: "Broad market, sector, bond, and thematic ETF coverage.",
    children: ["Broad Market", "Sector", "Bond ETFs", "Commodity ETFs", "Crypto ETFs", "Leveraged"],
    starterSymbols: ["SPY", "QQQ", "IWM", "XLF", "GLD"]
  },
  {
    id: "indices",
    label: "Indices",
    accent: "from-sky-400 to-indigo-500",
    glow: "shadow-[0_0_35px_rgba(99,102,241,0.28)]",
    description: "Benchmark indices, regions, sectors, and currency indices.",
    children: ["Major World", "US", "Europe", "Asia Pacific", "Middle East", "Currency Indices"],
    starterSymbols: ["SPX", "NDX", "DJI", "DXY", "FTSE"]
  },
  {
    id: "futures",
    label: "Futures",
    accent: "from-orange-400 to-pink-500",
    glow: "shadow-[0_0_35px_rgba(249,115,22,0.28)]",
    description: "Rate, commodity, currency, and equity futures contracts.",
    children: ["Agricultural", "Energy", "Currencies", "Metals", "World Indices", "Rates"],
    starterSymbols: ["ES1!", "NQ1!", "CL1!", "GC1!", "ZN1!"]
  },
  {
    id: "commodities",
    label: "Commodities",
    accent: "from-amber-400 to-orange-500",
    glow: "shadow-[0_0_35px_rgba(245,158,11,0.28)]",
    description: "Physical commodity complexes organized for fast scanning.",
    children: ["Energy", "Precious Metals", "Base Metals", "Agriculture", "Softs", "Livestock"],
    starterSymbols: ["XAUUSD", "XAGUSD", "WTI", "BRENT", "COPPER"]
  },
  {
    id: "bonds",
    label: "Bonds",
    accent: "from-emerald-400 to-teal-500",
    glow: "shadow-[0_0_35px_rgba(16,185,129,0.28)]",
    description: "Government, treasury, corporate, and yield-linked instruments.",
    children: ["Government", "Treasuries", "Corporate", "Municipal", "High Yield", "International"],
    starterSymbols: ["US02Y", "US10Y", "US30Y", "DE10Y", "UK10Y"]
  },
  {
    id: "crypto",
    label: "Crypto",
    accent: "from-cyan-400 to-fuchsia-500",
    glow: "shadow-[0_0_35px_rgba(6,182,212,0.28)]",
    description: "Digital assets grouped by utility and structure.",
    children: ["Layer 1", "DeFi", "Stablecoins", "Meme", "AI Tokens", "Gaming", "Privacy"],
    starterSymbols: ["BTCUSD", "ETHUSD", "SOLUSD", "XRPUSD", "DOGEUSD"]
  },
  {
    id: "options",
    label: "Options",
    accent: "from-rose-400 to-red-500",
    glow: "shadow-[0_0_35px_rgba(244,63,94,0.28)]",
    description: "Equity, index, ETF, and volatility derivatives.",
    children: ["Equity Options", "Index Options", "ETF Options", "Volatility"],
    starterSymbols: ["SPY-OPT", "QQQ-OPT", "SPX-OPT", "VIX-OPT"]
  },
  {
    id: "economic-calendar",
    label: "Economic Calendar",
    accent: "from-blue-400 to-cyan-500",
    glow: "shadow-[0_0_35px_rgba(59,130,246,0.28)]",
    description: "Scheduled macro catalysts for trader preparation.",
    children: ["Central Banks", "Inflation", "Employment", "GDP", "PMI", "Retail Sales"],
    starterSymbols: ["CPI", "NFP", "FOMC", "GDP", "PMI"]
  },
  {
    id: "macro",
    label: "Macro",
    accent: "from-purple-400 to-fuchsia-500",
    glow: "shadow-[0_0_35px_rgba(147,51,234,0.28)]",
    description: "World economy dashboard for rates, inflation, and production.",
    children: ["GDP", "Inflation", "Interest Rates", "Unemployment", "Trade Balance"],
    starterSymbols: ["US-GDP", "US-CPI", "US-IR", "EU-CPI", "JP-GDP"]
  },
  {
    id: "funds-rates",
    label: "Funds / Rates",
    accent: "from-lime-400 to-emerald-500",
    glow: "shadow-[0_0_35px_rgba(132,204,22,0.28)]",
    description: "Yield curves, money markets, and rate-term structures.",
    children: ["Money Markets", "Yield Curves", "Short Rates", "Long Rates"],
    starterSymbols: ["SOFR", "EFFR", "US02Y", "US10Y", "US30Y"]
  }
];
