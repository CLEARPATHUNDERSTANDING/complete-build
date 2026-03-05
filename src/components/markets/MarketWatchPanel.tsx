"use client";

import React, { useMemo, useState } from "react";
import { MarketWatchChart } from "@/components/markets/apex/MarketWatchChart";
import type { OhlcPoint } from "@/components/markets/apex/market-watch-types";

type Props = {
  initialSymbol?: string;
};

function useMockOhlc(symbol: string): OhlcPoint[] {
  return useMemo(() => {
    const now = Date.now();
    const pts: OhlcPoint[] = [];
    const seed = symbol.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
    let price = 100 + (seed % 200);

    for (let i = 120; i >= 0; i--) {
      const t = now - i * 3600_000;
      const o = price;
      const delta = (Math.random() - 0.5) * (price * 0.05);
      const c = o + delta;
      const h = Math.max(o, c) + Math.random() * 5;
      const l = Math.min(o, c) - Math.random() * 5;
      pts.push({ t, o, h, l, c, v: Math.random() * 1000 });
      price = c;
    }

    return pts;
  }, [symbol]);
}

export function MarketWatchPanel({ initialSymbol }: Props) {
  const [symbol, setSymbol] = useState(initialSymbol ?? "BTC/USD");
  const points = useMockOhlc(symbol);

  return (
    <section className="w-full mt-10">
      <div className="mb-6 flex items-center gap-4">
        <div className="text-[11px] font-black uppercase tracking-[0.3em] text-white/30 shrink-0">Terminal Focus:</div>
        <input
          className="flex-1 rounded-2xl border border-white/10 bg-[#0a0f18] px-6 py-3 text-sm text-white font-black uppercase tracking-widest outline-none focus:border-cyan-500/50 transition-all shadow-2xl"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="e.g. EURUSD"
        />
      </div>

      <div className="rounded-[32px] border border-white/5 bg-black/60 p-6 overflow-hidden relative group min-h-[450px]">
        <MarketWatchChart symbol={symbol} points={points} height={400} />
        
        <div className="absolute top-6 right-6 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-[9px] font-black text-cyan-400 uppercase tracking-widest backdrop-blur-md">
            Diagnostic Sync: Stable
          </div>
        </div>
      </div>
    </section>
  );
}
