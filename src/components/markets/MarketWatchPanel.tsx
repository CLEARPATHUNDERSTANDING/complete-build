"use client";

import React, { useMemo, useState } from "react";
import { MarketWatchChart } from "@/components/markets/apex/MarketWatchChart";
import type { OhlcPoint } from "@/components/markets/apex/market-watch-types";

type Props = {
  initialSymbol?: string;
};

// TEMP: mock data. Replace later with real OHLC from your API.
function useMockOhlc(symbol: string): OhlcPoint[] {
  return useMemo(() => {
    const now = Date.now();
    const pts: OhlcPoint[] = [];
    let price = 100 + (symbol.length * 5); // Add variance based on symbol

    for (let i = 240; i >= 0; i--) {
      const t = now - i * 60_000; // 1m candles
      const o = price;
      const delta = (Math.random() - 0.5) * 2;
      const c = o + delta;
      const h = Math.max(o, c) + Math.random();
      const l = Math.min(o, c) - Math.random();
      const v = Math.floor(1000 + Math.random() * 5000);
      pts.push({ t, o, h, l, c, v });
      price = c;
    }

    return pts;
  }, [symbol]);
}

export function MarketWatchPanel({ initialSymbol }: Props) {
  const [symbol, setSymbol] = useState(initialSymbol ?? "BTC/USDT");
  const points = useMockOhlc(symbol);

  return (
    <section className="w-full mt-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30 shrink-0">Analysis Focus:</div>
        <input
          className="flex-1 rounded-xl border border-white/10 bg-[#0a0f18] px-4 py-2 text-sm text-white font-bold outline-none focus:border-cyan-500/50 transition-all placeholder:text-white/20"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="e.g. BTC/USDT"
        />
      </div>

      <div className="rounded-[24px] border border-white/5 bg-black/40 p-4 overflow-hidden relative group">
        <MarketWatchChart symbol={symbol} points={points} height={360} />
        
        {/* Diagnostic Overlay */}
        <div className="absolute top-4 right-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="px-2 py-1 rounded bg-black/60 border border-white/10 text-[8px] font-black text-white/40 uppercase tracking-widest">
            Diagnostic Stream: Active
          </div>
        </div>
      </div>
    </section>
  );
}
