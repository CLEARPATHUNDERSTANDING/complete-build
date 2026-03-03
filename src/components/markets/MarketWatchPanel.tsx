"use client";

import React, { useState, useMemo } from "react";
import { MarketWatchChart } from "./apex/MarketWatchChart";
import { ApexChartType, MarketHistoryPoint } from "./apex/market-watch-types";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

/**
 * Generates high-fidelity mock OHLC data for visual calibration.
 */
function generateMockData(count = 40): MarketHistoryPoint[] {
  const now = Math.floor(Date.now() / 1000);
  let price = 150 + Math.random() * 100;
  return Array.from({ length: count }).map((_, i) => {
    const t = now - (count - i) * 3600;
    const o = price;
    const volatility = price * 0.02;
    const c = o + (Math.random() - 0.5) * volatility;
    const h = Math.max(o, c) + Math.random() * (volatility * 0.5);
    const l = Math.min(o, c) - Math.random() * (volatility * 0.5);
    price = c;
    return { time: t, open: o, high: h, low: l, close: c };
  });
}

export function MarketWatchPanel({ symbol = "BTCUSD" }: { symbol?: string }) {
  const [chartType, setChartType] = useState<ApexChartType>('candlestick');
  
  // Memoize data so it doesn't jitter on chart type changes
  const mockData = useMemo(() => generateMockData(), [symbol]);

  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="flex items-center justify-between px-1">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30">Analytics Engine</span>
          <span className="text-[12px] font-bold text-cyan-400 uppercase tracking-tight">{symbol} Diagnostic</span>
        </div>
        
        <Select value={chartType} onValueChange={(v) => setChartType(v as ApexChartType)}>
          <SelectTrigger className="w-[110px] h-8 text-[9px] uppercase font-black tracking-widest bg-white/5 border-white/10 hover:bg-white/10 transition-all rounded-lg outline-none ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#0a0f18] border-white/10">
            <SelectItem value="candlestick" className="text-[9px] uppercase font-black tracking-widest focus:bg-cyan-500/20">Candles</SelectItem>
            <SelectItem value="line" className="text-[9px] uppercase font-black tracking-widest focus:bg-cyan-500/20">Line</SelectItem>
            <SelectItem value="area" className="text-[9px] uppercase font-black tracking-widest focus:bg-cyan-500/20">Area</SelectItem>
            <SelectItem value="bar" className="text-[9px] uppercase font-black tracking-widest focus:bg-cyan-500/20">Bars</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="h-[300px] rounded-[20px] border border-white/5 bg-black/40 overflow-hidden relative group">
        <MarketWatchChart data={mockData} symbol={symbol} type={chartType} />
        
        {/* Diagnostic Overlay */}
        <div className="absolute top-2 right-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="px-2 py-1 rounded bg-black/60 border border-white/10 text-[8px] font-black text-white/40 uppercase tracking-widest">
            Stream: Active
          </div>
        </div>
      </div>
    </div>
  );
}
