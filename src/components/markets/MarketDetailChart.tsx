"use client";

import dynamic from "next/dynamic";
import { type ApexOptions } from "apexcharts";
import { useMemo, useState, useEffect } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {
  title: string;
  data: { time: string; value: number }[];
};

export default function MarketDetailChart({ title, data }: Props) {
  const [seriesData, setSeriesData] = useState<any[]>([]);

  useEffect(() => {
    // Generate mock candlesticks only on the client to avoid hydration errors
    const pts = data.map((d, i) => {
      const open = d.value;
      const close = i < data.length - 1 ? data[i + 1].value : d.value + (Math.random() - 0.5);
      const high = Math.max(open, close) + Math.random() * 0.5;
      const low = Math.min(open, close) - Math.random() * 0.5;
      return {
        x: d.time,
        y: [open, high, low, close]
      };
    });
    setSeriesData(pts);
  }, [data]);

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
      labels: {
        style: { colors: "#94a3b8" }
      },
      tooltip: { enabled: true }
    },
    tooltip: { theme: "dark" },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#00e5ff",
          downward: "#ff003c"
        },
        wick: { useFillColor: true }
      }
    }
  };

  if (seriesData.length === 0) {
    return <div className="h-[480px] rounded-[40px] bg-white/5 border border-white/10 animate-pulse" />;
  }

  return (
    <div className="rounded-[40px] border border-white/10 bg-white/5 p-10 shadow-[0_0_60px_rgba(34,211,238,0.15)] backdrop-blur-xl relative">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{title}</h3>
        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-cyan-300">
          Apex Diagnostic Panel
        </span>
      </div>

      <div className="relative">
        <Chart
          options={options}
          series={[{ name: title, data: seriesData }]}
          type="candlestick"
          height={480}
        />
        {/* Logo Overlay Lower Left */}
        <div className="absolute bottom-12 left-8 z-20 pointer-events-none group">
          <div className="relative bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-2">
            <img 
              src="https://i.postimg.cc/3NZqktNh/Chat-GPT-Image-Feb-26-2026-02-20-36-PM.png"
              alt="Clear Path"
              className="w-20 h-20 rounded-xl object-cover opacity-40 group-hover:opacity-80 transition-opacity"
            />
            <span className="absolute bottom-1 right-1 text-[8px] font-bold text-white/40 select-none">©™</span>
          </div>
        </div>
      </div>
    </div>
  );
}
