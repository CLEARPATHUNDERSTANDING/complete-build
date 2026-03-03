"use client";

import React, { useMemo } from "react";
import { MarketWatchChart } from "./apex/MarketWatchChart";
import { OhlcPoint } from "./apex/market-watch-types";

/**
 * Generates high-fidelity mock OhlcPoint data for the 12-mode visualizer.
 */
function generateMockOhlc(count = 150): OhlcPoint[] {
  const now = Date.now();
  let price = 150 + Math.random() * 100;
  return Array.from({ length: count }).map((_, i) => {
    const t = now - (count - i) * 3600 * 1000;
    const o = price;
    const volatility = price * 0.02;
    const c = o + (Math.random() - 0.5) * volatility;
    const h = Math.max(o, c) + Math.random() * (volatility * 0.5);
    const l = Math.min(o, c) - Math.random() * (volatility * 0.5);
    const v = Math.floor(Math.random() * 10000);
    price = c;
    return { t, o, h, l, c, v };
  });
}

export function MarketWatchPanel({ symbol = "BTCUSD" }: { symbol?: string }) {
  const mockData = useMemo(() => generateMockOhlc(), [symbol]);

  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="flex items-center justify-between px-1">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30">Analytics Engine</span>
          <span className="text-[12px] font-bold text-cyan-400 uppercase tracking-tight">{symbol} Diagnostic</span>
        </div>
      </div>
      
      <div className="h-[420px] rounded-[24px] border border-white/5 bg-black/40 p-4 overflow-hidden relative group">
        <MarketWatchChart points={mockData} symbol={symbol} height={360} />
        
        {/* Diagnostic Overlay */}
        <div className="absolute top-4 right-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="px-2 py-1 rounded bg-black/60 border border-white/10 text-[8px] font-black text-white/40 uppercase tracking-widest">
            Diagnostic Stream: Active
          </div>
        </div>
      </div>
    </div>
  );
}
