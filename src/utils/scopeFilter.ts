'use client';
/**
 * @fileOverview Helpers to filter symbols by market scope.
 */
import type { MarketScope } from "@/modes/types";
import { ALL_UNIVERSE, UNIVERSes, type UniverseSymbol } from "@/modes/universes";

export function getUniverseForScope(scope: MarketScope): UniverseSymbol[] {
  if (scope === "all") return ALL_UNIVERSE;
  return UNIVERSes[scope] ?? ALL_UNIVERSE;
}

export function filterUniverse(query: string, universe: UniverseSymbol[]): UniverseSymbol[] {
  const q = (query || "").trim().toLowerCase();
  if (!q) return universe;

  return universe.filter((s) => {
    const sym = s.symbol.toLowerCase();
    const lab = s.label.toLowerCase();
    return sym.includes(q) || lab.includes(q);
  });
}

/**
 * If a symbol is not allowed by scope, return a safe default from that scope.
 */
export function coerceSymbolToScope(scope: MarketScope, symbol: string): string {
  const universe = getUniverseForScope(scope);
  const ok = universe.some((s) => s.symbol === symbol);
  if (ok) return symbol;
  return universe[0]?.symbol ?? "EURUSD";
}
