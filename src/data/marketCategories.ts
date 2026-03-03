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
    accent: "from-indigo-400 to-purple-600",
    glow: "shadow-[0_0_35px_rgba(129,140,248,0.28)]",
    description: "Decentralized assets, layer-1s, and ecosystem tokens.",
    children: ["Major Coins", "Stablecoins", "Layer 1s", "DeFi", "Memes", "Ecosystems"],
    starterSymbols: ["BTC", "ETH", "SOL", "XRP", "BNB"]
  }
];
