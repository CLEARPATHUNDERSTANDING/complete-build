'use client';
/**
 * @fileOverview Master symbol universes mapped to specific market scopes.
 */
import type { MarketScope } from "./types";

export type UniverseSymbol = {
  symbol: string;     // Internal symbol key
  label: string;      // Display label
  type: MarketScope;  // Scope category
};

export const UNIVERSes: Record<MarketScope, UniverseSymbol[]> = {
  all: [], // "all" is handled by ALL_UNIVERSE

  fx: [
    { symbol: "EURUSD", label: "EUR/USD", type: "fx" },
    { symbol: "GBPUSD", label: "GBP/USD", type: "fx" },
    { symbol: "USDJPY", label: "USD/JPY", type: "fx" },
    { symbol: "USDCHF", label: "USD/CHF", type: "fx" },
    { symbol: "AUDUSD", label: "AUD/USD", type: "fx" },
    { symbol: "USDCAD", label: "USD/CAD", type: "fx" },
    { symbol: "NZDUSD", label: "NZD/USD", type: "fx" },
    { symbol: "EURJPY", label: "EUR/JPY", type: "fx" },
    { symbol: "GBPJPY", label: "GBP/JPY", type: "fx" },
    { symbol: "XAUUSD", label: "XAU/USD (Gold)", type: "fx" },
  ],

  crypto: [
    { symbol: "BTCUSD", label: "BTC/USD", type: "crypto" },
    { symbol: "ETHUSD", label: "ETH/USD", type: "crypto" },
    { symbol: "SOLUSD", label: "SOL/USD", type: "crypto" },
    { symbol: "XRPUSD", label: "XRP/USD", type: "crypto" },
    { symbol: "ADAUSD", label: "ADA/USD", type: "crypto" },
    { symbol: "DOGEUSD", label: "DOGE/USD", type: "crypto" },
  ],

  futures: [
    { symbol: "ES", label: "ES (S&P 500 E-mini)", type: "futures" },
    { symbol: "NQ", label: "NQ (Nasdaq E-mini)", type: "futures" },
    { symbol: "YM", label: "YM (Dow E-mini)", type: "futures" },
    { symbol: "RTY", label: "RTY (Russell 2000)", type: "futures" },
    { symbol: "CL", label: "CL (Crude Oil)", type: "futures" },
    { symbol: "GC", label: "GC (Gold)", type: "futures" },
    { symbol: "SI", label: "SI (Silver)", type: "futures" },
    { symbol: "ZB", label: "ZB (30Y Bond)", type: "futures" },
    { symbol: "ZN", label: "ZN (10Y Note)", type: "futures" },
  ],

  stocks: [
    { symbol: "AAPL", label: "Apple (AAPL)", type: "stocks" },
    { symbol: "MSFT", label: "Microsoft (MSFT)", type: "stocks" },
    { symbol: "NVDA", label: "NVIDIA (NVDA)", type: "stocks" },
    { symbol: "TSLA", label: "Tesla (TSLA)", type: "stocks" },
    { symbol: "AMZN", label: "Amazon (AMZN)", type: "stocks" },
    { symbol: "GOOGL", label: "Alphabet (GOOGL)", type: "stocks" },
  ],

  etf: [
    { symbol: "SPY", label: "SPY (S&P 500 ETF)", type: "etf" },
    { symbol: "QQQ", label: "QQQ (Nasdaq 100 ETF)", type: "etf" },
    { symbol: "IWM", label: "IWM (Russell 2000 ETF)", type: "etf" },
    { symbol: "DIA", label: "DIA (Dow ETF)", type: "etf" },
    { symbol: "XLK", label: "XLK (Tech Sector ETF)", type: "etf" },
    { symbol: "XLF", label: "XLF (Financials ETF)", type: "etf" },
  ],

  macro: [
    { symbol: "DXY", label: "DXY (US Dollar Index)", type: "macro" },
    { symbol: "US10Y", label: "US10Y (10Y Yield proxy)", type: "macro" },
    { symbol: "US02Y", label: "US02Y (2Y Yield proxy)", type: "macro" },
    { symbol: "SPX", label: "SPX (S&P 500 Index)", type: "macro" },
    { symbol: "VIX", label: "VIX (Volatility Index)", type: "macro" },
  ],
};

export const ALL_UNIVERSE: UniverseSymbol[] = [
  ...UNIVERSes.fx,
  ...UNIVERSes.crypto,
  ...UNIVERSes.futures,
  ...UNIVERSes.etf,
  ...UNIVERSes.stocks,
  ...UNIVERSes.macro,
];
