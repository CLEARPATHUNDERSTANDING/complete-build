"use client";

import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";
import type { ApexOptions } from "apexcharts";
import { CHART_TYPES, type ApexChartType, type OhlcPoint } from "./market-watch-types";
import { normalizeForApex } from "./market-watch-normalize";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {
  symbol: string;
  points: OhlcPoint[];
  height?: number;
};

export function MarketWatchChart({ symbol, points, height = 340 }: Props) {
  const [chartType, setChartType] = useState<ApexChartType>("candlestick");
  const normalized = useMemo(() => normalizeForApex(chartType, points), [chartType, points]);

  const options: ApexOptions = useMemo(() => {
    const title = CHART_TYPES.find((c) => c.type === chartType)?.label ?? chartType;

    const base: ApexOptions = {
      chart: {
        id: `mw-${symbol}`,
        type: chartType as any,
        toolbar: { show: true },
        zoom: { enabled: true },
        animations: { enabled: true },
        background: "transparent",
        foreColor: 'rgba(255,255,255,0.5)',
      },
      title: { text: `${symbol} · ${title}`, style: { fontSize: "12px", color: '#00e5ff' } },
      dataLabels: { enabled: false },
      stroke: { width: chartType === "scatter" ? 0 : 2, curve: 'smooth' },
      xaxis: { 
        type: "datetime",
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { fontSize: '10px', fontWeight: 700 } }
      },
      yaxis: { 
        labels: { style: { fontSize: '10px', fontWeight: 700 } }
      },
      tooltip: { theme: 'dark', shared: true },
      grid: { borderColor: "rgba(255,255,255,0.08)" },
      theme: { mode: "dark" },
      colors: ['#00e5ff', '#ff003c', '#7c4dff', '#f59e0b'],
      plotOptions: {
        candlestick: {
          colors: { upward: '#00e5ff', downward: '#ff003c' },
          wick: { useFillColor: true }
        }
      }
    };

    if (chartType === "rangeBar") {
      base.plotOptions = { ...base.plotOptions, bar: { horizontal: true } };
      base.xaxis = { type: "category" } as any;
    }

    if (chartType === "pie" || chartType === "donut") {
      if (normalized.kind === "pie") base.labels = normalized.labels;
    }

    if (chartType === "radialBar") {
      if (normalized.kind === "radial") base.labels = normalized.labels;
    }

    if (chartType === "heatmap") {
      base.xaxis = { type: "category" } as any;
    }

    if (chartType === "treemap") {
      base.xaxis = { type: "category" } as any;
    }

    if (chartType === "boxPlot") {
      base.xaxis = { type: "category" } as any;
    }

    return base;
  }, [chartType, symbol, normalized]);

  const series: any = useMemo(() => {
    switch (normalized.kind) {
      case "xy":
      case "candle":
      case "rangeBar":
      case "heatmap":
      case "treemap":
      case "boxPlot":
        return normalized.series as any;
      case "pie":
      case "radial":
        return normalized.series as any;
      default:
        return [];
    }
  }, [normalized]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-3 px-4 flex flex-wrap items-center gap-3">
        <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Visualizer</label>
        <select
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white/80 outline-none hover:bg-white/10 transition-colors"
          value={chartType}
          onChange={(e) => setChartType(e.target.value as ApexChartType)}
        >
          {CHART_TYPES.map((c) => (
            <option key={c.type} value={c.type} className="bg-[#0a0f18]">
              {c.label}
            </option>
          ))}
        </select>
        <span className="text-[9px] font-bold text-cyan-400/50 uppercase tracking-widest ml-auto">{points.length} Data Points</span>
      </div>

      <div className="flex-1 min-h-[300px]">
        <ApexChart options={options} series={series} type={chartType as any} height="100%" width="100%" />
      </div>
    </div>
  );
}
