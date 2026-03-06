"use client";

import dynamic from "next/dynamic";
import { type ApexOptions } from "apexcharts";
import { useMemo, useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useMounted } from "@/hooks/use-mounted";
import DiagnosticLogo from "@/components/DiagnosticLogo";

const Chart = dynamic(() => import("react-apexcharts"), { 
  ssr: false,
  loading: () => <div className="h-[480px] flex items-center justify-center bg-black/40 rounded-2xl opacity-20"><Loader2 className="w-8 h-8 animate-spin" /></div>
});

type Props = {
  title: string;
  data: { time: string; value: number }[];
};

export default function MarketDetailChart({ title, data }: Props) {
  const mounted = useMounted();

  const seriesData = useMemo(() => {
    if (!mounted) return [];
    return data.map((d, i) => {
      const open = d.value;
      const close = i < data.length - 1 ? data[i + 1].value : d.value + (Math.random() - 0.5);
      const high = Math.max(open, close) + Math.random() * 0.5;
      const low = Math.min(open, close) - Math.random() * 0.5;
      return {
        x: d.time,
        y: [open, high, low, close]
      };
    });
  }, [data, mounted]);

  const options: ApexOptions = {
    chart: {
      type: "candlestick",
      toolbar: { show: true },
      zoom: { enabled: true },
      animations: { enabled: true },
      background: "transparent",
    },
    theme: { mode: "dark" },
    grid: { borderColor: "rgba(255,255,255,0.08)" },
    xaxis: {
      type: "category",
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: { style: { colors: "#94a3b8" } },
      tooltip: { enabled: true }
    },
    tooltip: { theme: "dark" },
    plotOptions: {
      candlestick: {
        colors: { upward: "#00e5ff", downward: "#ff003c" },
        wick: { useFillColor: true }
      }
    }
  };

  return (
    <div className="rounded-[40px] border border-white/10 bg-white/5 p-10 shadow-[0_0_60px_rgba(34,211,238,0.15)] backdrop-blur-xl relative">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{title}</h3>
        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-cyan-300 font-black">
          Apex Diagnostic Panel
        </span>
      </div>

      <div className="relative">
        {mounted ? (
          <Chart
            options={options}
            series={[{ name: title, data: seriesData }]}
            type="candlestick"
            height={480}
          />
        ) : (
          <div className="h-[480px] flex items-center justify-center bg-black/40 rounded-2xl opacity-20">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        )}
        <div className="absolute bottom-12 left-8 z-20 pointer-events-none">
          <DiagnosticLogo size="sm" />
        </div>
      </div>
    </div>
  );
}
