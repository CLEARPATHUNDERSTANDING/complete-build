"use client";

import dynamic from "next/dynamic";
import React, { useMemo, useState, useEffect } from "react";
import type { ApexOptions } from "apexcharts";
import { type OhlcPoint, type ApexChartType, CHART_TYPES } from "./market-watch-types";
import { normalizeForApex } from "./market-watch-normalize";
import { ArrowLeft, ChevronDown, Loader2 } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ApexChart = dynamic(() => import("react-apexcharts"), { 
  ssr: false,
  loading: () => <div className="h-full flex items-center justify-center opacity-20"><Loader2 className="w-8 h-8 animate-spin" /></div>
});

type Props = {
  symbol: string;
  points: OhlcPoint[];
  height?: number;
  initialType?: ApexChartType;
};

export function MarketWatchChart({ symbol, points, height = 340, initialType = "candlestick" }: Props) {
  const [chartType, setChartType] = useState<ApexChartType>(initialType);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const normalized = useMemo(() => normalizeForApex(chartType, points), [points, chartType]);

  const options: ApexOptions = useMemo(() => {
    const baseOptions: ApexOptions = {
      chart: {
        id: `mw-${symbol}`,
        type: chartType === "column" ? "bar" : chartType as any,
        toolbar: { show: true },
        zoom: { enabled: true },
        animations: { enabled: true },
        background: "transparent",
        foreColor: 'rgba(255,255,255,0.5)',
      },
      theme: { mode: "dark" },
      grid: { borderColor: "rgba(255,255,255,0.08)" },
      colors: ['#00e5ff', '#ff003c', '#ff8a00', '#6366f1'],
      stroke: { width: chartType === "line" || chartType === "area" ? 2 : 1 },
      tooltip: { theme: 'dark', shared: true },
    };

    if (chartType === "candlestick") {
      baseOptions.plotOptions = {
        candlestick: {
          colors: { upward: '#00e5ff', downward: '#ff003c' },
          wick: { useFillColor: true }
        }
      };
    }

    if (chartType === "funnel") {
      baseOptions.plotOptions = {
        bar: { horizontal: true, barHeight: '80%', isFunnel: true }
      };
    }

    if (chartType === "column") {
      baseOptions.plotOptions = {
        bar: { horizontal: false, columnWidth: '55%' }
      };
    }

    if (chartType === "pie" || chartType === "donut") {
      baseOptions.labels = (normalized as any).labels;
    }

    if (chartType === "radar") {
      baseOptions.xaxis = { categories: (normalized as any).labels };
    }

    if (["line", "area", "candlestick", "scatter", "rangeArea"].includes(chartType)) {
      baseOptions.xaxis = { type: "datetime" };
    }

    return baseOptions;
  }, [symbol, chartType, normalized]);

  const series: any = useMemo(() => {
    if ('series' in normalized) return normalized.series;
    return [];
  }, [normalized]);

  return (
    <div className="w-full h-full flex flex-col relative">
      <div className="mb-4 px-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link 
            href="/" 
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2"
            title="Exit to Hub"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="h-8 w-px bg-white/10 mx-2" />
          <div className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-black uppercase tracking-widest text-indigo-400">
            {symbol} TERMINAL
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-cyan-400 hover:bg-white/10 transition-all outline-none">
            Style: {CHART_TYPES.find(t => t.type === chartType)?.label}
            <ChevronDown className="w-3 h-3" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#0a0f18] border-white/10 text-white min-w-[200px]">
            {CHART_TYPES.map((t) => (
              <DropdownMenuItem 
                key={t.type} 
                onClick={() => setChartType(t.type)}
                className="text-[10px] font-bold uppercase tracking-widest focus:bg-indigo-500 focus:text-white cursor-pointer"
              >
                {t.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-1 min-h-[300px] relative">
        {mounted ? (
          <ApexChart 
            options={options} 
            series={chartType === "pie" || chartType === "donut" || chartType === "radialBar" ? (normalized as any).series : series} 
            type={chartType === "column" || chartType === "funnel" ? "bar" : chartType as any} 
            height="100%" 
            width="100%" 
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center opacity-20">
            <Loader2 className="w-8 h-8 animate-spin mb-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Loading View...</span>
          </div>
        )}
        <div className="absolute bottom-10 left-8 z-20 pointer-events-none opacity-20">
          <div className="relative bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-2">
            <img src="https://i.postimg.cc/3NZqktNh/Chat-GPT-Image-Feb-26-2026-02-20-36-PM.png" className="w-16 h-16 rounded-xl object-cover" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
