"use client";

import React, { useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { getProfile, type NeuroProfileId } from "@/lib/neuro/profiles";
import { chartPhysics } from "@/lib/neuro/chartPhysics";
import { Loader2, Sparkles, Search, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useMounted } from "@/hooks/use-mounted";

const Chart = dynamic(() => import("react-apexcharts"), { 
  ssr: false,
  loading: () => <div className="h-full w-full flex items-center justify-center bg-black/40 rounded-2xl opacity-20"><Loader2 className="w-6 h-6 animate-spin" /></div>
});

export type ApexCandlePoint = { 
  x: number; 
  y: [number, number, number, number] 
};

interface CandlestickChartProps {
  neuroModeId: NeuroProfileId;
  title?: string;
  height?: number;
  data?: ApexCandlePoint[];
}

export function CandlestickChart({
  neuroModeId,
  title = "TwelveData Feed",
  height = 350,
  data: externalData,
}: CandlestickChartProps) {
  const mounted = useMounted();
  const [analyzing, setAnalyzing] = useState(false);
  const [localSymbol, setLocalSymbol] = useState(title);
  
  const profile = getProfile(neuroModeId);
  const p = profile.personality;
  const physics = chartPhysics(p);

  useEffect(() => {
    setLocalSymbol(title);
  }, [title]);

  useEffect(() => {
    if (!mounted) return;
    setAnalyzing(true);
    const timer = setTimeout(() => setAnalyzing(false), 800);
    return () => clearTimeout(timer);
  }, [localSymbol, mounted]);

  const chartData: ApexCandlePoint[] = useMemo(() => {
    if (externalData) return externalData;
    if (!mounted) return [];
    
    const seed = localSymbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const mock: ApexCandlePoint[] = [];
    let currentPrice = seed % 500 + 1000;
    
    for (let i = 0; i < 20; i++) {
      const open = currentPrice;
      const high = open + Math.random() * 20;
      const low = open - Math.random() * 20;
      const close = low + Math.random() * (high - low);
      currentPrice = close;
      mock.push({ 
        x: new Date(2023, 1, i + 1).getTime(), 
        y: [open, high, low, close] 
      });
    }
    return mock;
  }, [localSymbol, externalData, mounted]);

  const series = useMemo(() => [{ 
    name: localSymbol, 
    data: chartData 
  }], [localSymbol, chartData]);

  const options = useMemo<any>(() => {
    const glowCss = physics.glowStrength > 0 ? `drop-shadow(0 0 ${Math.round(
      10 * physics.glowStrength
    )}px ${p.borderA}) drop-shadow(0 0 ${Math.round(
      16 * physics.glowStrength
    )}px ${p.borderB})` : "none";

    return {
      chart: {
        type: "candlestick",
        background: "transparent",
        animations: {
          enabled: physics.animationSpeed > 0,
          speed: physics.animationSpeed,
        },
        toolbar: { show: false },
      },
      theme: { mode: "dark" },
      grid: {
        borderColor: p.grid,
        strokeDashArray: p.dataDensity === "High" ? 2 : 4,
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: true } },
        padding: { left: 10, right: 10, top: 12, bottom: 10 },
      },
      plotOptions: {
        candlestick: {
          colors: { upward: p.upColor, downward: p.downColor },
          wick: { useFillColor: false },
        },
        bar: { columnWidth: `${physics.candleWidth}%` },
      },
      stroke: {
        show: true,
        width: p.glow === "High" ? 2 : 1,
        colors: [p.outlineColor],
      },
      dataLabels: { enabled: false },
      xaxis: {
        type: "datetime",
        labels: { style: { colors: p.text } },
        axisBorder: { color: p.grid },
        axisTicks: { color: p.grid },
        tickAmount: p.dataDensity === "Low" ? 4 : p.dataDensity === "High" ? 10 : 7,
      },
      yaxis: {
        tooltip: { enabled: true },
        labels: { style: { colors: p.text } },
        tickAmount: physics.gridCount,
      },
      tooltip: { theme: "dark" },
      legend: { show: false },
      _containerFilter: glowCss,
    };
  }, [p, physics]);

  if (!mounted) {
    return (
      <div style={{ height, borderRadius: 18, background: profile.personality.bgTop }} className="flex items-center justify-center opacity-20">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div style={{ height, width: "100%", borderRadius: 18, background: `linear-gradient(180deg, ${p.bgTop}, ${p.bgBottom})`, filter: options._containerFilter }} className="transition-all duration-700 relative group overflow-hidden">
      <div className="px-4 pt-3 flex items-center justify-between relative z-30">
         <div className="flex items-center gap-3 flex-1">
            <Link 
              href="/" 
              className="p-1.5 rounded-lg bg-white/5 border border-white/10 transition-all hover:bg-white/10"
              style={{ color: p.text }}
              title="Exit to Hub"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
            <div className="relative flex-1 max-w-[140px]">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 opacity-30" style={{ color: p.text }} />
              <input 
                value={localSymbol}
                onChange={(e) => setLocalSymbol(e.target.value.toUpperCase())}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-7 pr-2 py-1 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-indigo-500/50 transition-all"
                style={{ color: p.text }}
                placeholder="SYMBOL..."
              />
            </div>
            {analyzing && <Loader2 className="w-3 h-3 animate-spin" style={{ color: p.text }} />}
         </div>
         <span className="text-[10px] font-bold uppercase tracking-widest opacity-50 ml-2" style={{ color: p.text }}>{profile.label}</span>
      </div>
      
      {analyzing && (
        <div className={cn("absolute inset-0 z-20 flex items-center justify-center bg-black/20 backdrop-blur-[1px] transition-all duration-300")}>
          <div className="flex flex-col items-center gap-2 scale-in-center">
            <Sparkles className="w-6 h-6 animate-pulse" style={{ color: p.borderA }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] animate-pulse" style={{ color: p.text }}>Neuro-Syncing...</span>
          </div>
        </div>
      )}

      <div className="relative z-10">
        <Chart options={options} series={series} type="candlestick" height={height - 40} />
        <div className="absolute bottom-10 left-6 z-20 pointer-events-none group">
          <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-1.5 shadow-[0_0_20px_rgba(255,136,0,0.3)]">
            <img 
              src="https://i.postimg.cc/3NZqktNh/Chat-GPT-Image-Feb-26-2026-02-20-36-PM.png"
              alt="Clear Path"
              className="w-18 h-18 rounded-lg object-cover opacity-80 brightness-110"
            />
            <span className="absolute bottom-0.5 right-0.5 text-[6px] font-bold text-white/40 select-none">©™</span>
          </div>
        </div>
      </div>
    </div>
  );
}
