"use client";

import React, { useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { getProfile, type NeuroProfileId } from "@/lib/neuro/profiles";
import { chartPhysics } from "@/lib/neuro/chartPhysics";
import { Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

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
  const [analyzing, setAnalyzing] = useState(false);
  const profile = getProfile(neuroModeId);
  const p = profile.personality;
  const physics = chartPhysics(p);

  // Simulate analysis state on symbol change
  useEffect(() => {
    setAnalyzing(true);
    const timer = setTimeout(() => setAnalyzing(false), 800);
    return () => clearTimeout(timer);
  }, [title]);

  // Fallback Mock Data generation based on title to make different charts look unique
  const chartData: ApexCandlePoint[] = useMemo(() => {
    if (externalData) return externalData;
    
    const seed = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
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
  }, [title, externalData]);

  const series = useMemo(() => [{ 
    name: title, 
    data: chartData 
  }], [title, chartData]);

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
        toolbar: {
          show: false
        },
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
          colors: {
            upward: p.upColor,
            downward: p.downColor,
          },
          wick: {
            useFillColor: false,
          },
        },
        bar: {
          columnWidth: `${physics.candleWidth}%`,
        },
      },
      stroke: {
        show: true,
        width: p.glow === "High" ? 2 : 1,
        colors: [p.outlineColor],
      },
      dataLabels: { enabled: false },
      xaxis: {
        type: "datetime",
        labels: {
          style: { colors: p.text },
        },
        axisBorder: { color: p.grid },
        axisTicks: { color: p.grid },
        tickAmount: p.dataDensity === "Low" ? 4 : p.dataDensity === "High" ? 10 : 7,
      },
      yaxis: {
        tooltip: { enabled: true },
        labels: {
          style: { colors: p.text },
        },
        tickAmount: physics.gridCount,
      },
      tooltip: { theme: "dark" },
      legend: { show: false },
      states: {
        hover: { filter: { type: "none" } },
        active: { filter: { type: "none" } },
      },
      _containerFilter: glowCss,
    };
  }, [p, physics]);

  const wrapStyle: React.CSSProperties = {
    height,
    width: "100%",
    borderRadius: 18,
    background: `linear-gradient(180deg, ${p.bgTop}, ${p.bgBottom})`,
    filter: options._containerFilter,
  };

  return (
    <div style={wrapStyle} className="transition-all duration-700 relative group overflow-hidden">
      <div className="px-4 pt-3 flex items-center justify-between relative z-10">
         <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: p.text }}>{title}</span>
            {analyzing && <Loader2 className="w-3 h-3 animate-spin" style={{ color: p.text }} />}
         </div>
         <span className="text-[10px] font-bold uppercase tracking-widest opacity-50" style={{ color: p.text }}>{profile.label}</span>
      </div>
      
      {analyzing && (
        <div className={cn(
          "absolute inset-0 z-20 flex items-center justify-center bg-black/20 transition-all duration-300",
          p.glow !== "Low" && "backdrop-blur-[1px]"
        )}>
          <div className="flex flex-col items-center gap-2 scale-in-center">
            <Sparkles className="w-6 h-6 animate-pulse" style={{ color: p.borderA }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] animate-pulse" style={{ color: p.text }}>Neuro-Syncing...</span>
          </div>
        </div>
      )}

      <Chart options={options} series={series} type="candlestick" height={height - 40} />
      
      {/* Interactive hover layer */}
      <div className="absolute inset-0 pointer-events-none group-hover:bg-white/[0.02] transition-colors duration-500" />
    </div>
  );
}
