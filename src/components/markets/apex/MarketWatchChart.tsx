
"use client";

import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import type { ApexOptions } from "apexcharts";
import { type OhlcPoint } from "./market-watch-types";
import { normalizeForApex } from "./market-watch-normalize";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {
  symbol: string;
  points: OhlcPoint[];
  height?: number;
};

export function MarketWatchChart({ symbol, points, height = 340 }: Props) {
  // Locked to candlestick as per protocol requirements
  const chartType = "candlestick";
  const normalized = useMemo(() => normalizeForApex(chartType, points), [points]);

  const options: ApexOptions = useMemo(() => {
    return {
      chart: {
        id: `mw-${symbol}`,
        type: "candlestick",
        toolbar: { show: true },
        zoom: { enabled: true },
        animations: { enabled: true },
        background: "transparent",
        foreColor: 'rgba(255,255,255,0.5)',
      },
      title: { 
        text: `${symbol} · DIAGNOSTIC CANDLESTICK`, 
        style: { fontSize: "14px", color: '#00e5ff', fontWeight: 900 } 
      },
      dataLabels: { enabled: false },
      stroke: { width: 1 },
      xaxis: { 
        type: "datetime",
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { fontSize: '11px', fontWeight: 700 } }
      },
      yaxis: { 
        labels: { style: { fontSize: '11px', fontWeight: 700 } }
      },
      tooltip: { theme: 'dark', shared: true },
      grid: { borderColor: "rgba(255,255,255,0.08)" },
      theme: { mode: "dark" },
      colors: ['#00e5ff', '#ff003c'],
      plotOptions: {
        candlestick: {
          colors: { upward: '#00e5ff', downward: '#ff003c' },
          wick: { useFillColor: true }
        }
      }
    };
  }, [symbol]);

  const series: any = useMemo(() => {
    if (normalized.kind === "candle") return normalized.series;
    return [];
  }, [normalized]);

  return (
    <div className="w-full h-full flex flex-col relative">
      <div className="mb-4 px-6 flex flex-wrap items-center gap-4">
        <Link 
          href="/" 
          className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2"
          title="Exit to Hub"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-[11px] font-black uppercase tracking-widest hidden sm:inline">Hub</span>
        </Link>
        <div className="h-8 w-px bg-white/10 mx-2" />
        <div className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-black uppercase tracking-widest text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
          CANDLESTICK VISUALIZER ACTIVE
        </div>
        <span className="text-[11px] font-bold text-cyan-400/50 uppercase tracking-widest ml-auto">{points.length} Data Points</span>
      </div>

      <div className="flex-1 min-h-[300px] relative">
        <ApexChart options={options} series={series} type="candlestick" height="100%" width="100%" />
        {/* Logo Overlay Lower Left - Enlarged 3x */}
        <div className="absolute bottom-10 left-8 z-20 pointer-events-none group">
          <div className="relative bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-2">
            <img 
              src="https://i.postimg.cc/3NZqktNh/Chat-GPT-Image-Feb-26-2026-02-20-36-PM.png"
              alt="Clear Path"
              className="w-20 h-20 rounded-xl object-cover opacity-60 group-hover:opacity-100 transition-opacity"
            />
            <span className="absolute bottom-1 right-1 text-[8px] font-bold text-white/40 select-none">©™</span>
          </div>
        </div>
      </div>
    </div>
  );
}
