"use client";

import dynamic from "next/dynamic";
import { type ApexOptions } from "apexcharts";
import { useMemo } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {
  title: string;
  data: { time: string; value: number }[];
};

export default function MarketDetailChart({ title, data }: Props) {
  const seriesData = useMemo(() => {
    // Convert line data to mock candlesticks for diagnostic consistency
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

  return (
    <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[0_0_40px_rgba(34,211,238,0.15)] backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold text-white uppercase tracking-tight">{title}</h3>
        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-cyan-300">
          Apex Diagnostic Panel
        </span>
      </div>

      <Chart
        options={options}
        series={[{ name: title, data: seriesData }]}
        type="candlestick"
        height={360}
      />
    </div>
  );
}
