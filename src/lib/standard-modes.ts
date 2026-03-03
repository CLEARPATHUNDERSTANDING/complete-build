'use client';

export type StandardModeId =
  | "stocks"
  | "etfs"
  | "bonds"
  | "forex"
  | "futures"
  | "crypto"
  | "indices"
  | "economy";

export interface StandardMode {
  id: StandardModeId;
  label: string;
}

export const STANDARD_MODES: StandardMode[] = [
  { id: "stocks", label: "Stocks" },
  { id: "etfs", label: "ETFs" },
  { id: "bonds", label: "Bonds" },
  { id: "forex", label: "Forex" },
  { id: "futures", label: "Futures" },
  { id: "crypto", label: "Crypto" },
  { id: "indices", label: "Indices" },
  { id: "economy", label: "World Economy / Economic Indicators" },
];
