"use client";

import dynamic from "next/dynamic";
import { type ApexOptions } from "apexcharts";
import { useMemo, useState, useEffect } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {
  series: number[];
  positive: boolean;
};

export default function MarketMiniChart({ series, positive }: Props) {
  const candleData = useMemo(() => {
    return series.map((val, i) => {
      const open = val;
      const close = i < series.length - 1 ? series[i + 1] : val + (Math.random() - 0.5);
      const high = Math.max(open, close) + Math.random() * (val * 0.01);
      const low = Math.min(open, close) - Math.random() * (val * 0.01);
      return {
        x: i,
        y: [open, high, low, close]
      };
    });
  }, [series]);

  const options: ApexOptions = {
    chart: {
      type: "candlestick",
      toolbar: { show: false },
      sparkline: { enabled: true },
      animations: { enabled: true },
      background: "transparent",
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#00e5ff",
          downward: "#ff003c"
        },
        wick: { useFillColor: true }
      }
    },
    stroke: {
      width: 1
    },
    tooltip: { 
      theme: "dark",
      enabled: true,
      x: { show: false }
    },
    grid: { show: false },
    xaxis: {
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: { show: false }
    },
    theme: { mode: "dark" }
  };

  return (
    <div className="h-32 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30 relative">
      <Chart
        options={options}
        series={[{ name: "Diagnostic", data: candleData }]}
        type="candlestick"
        height="100%"
        width="100%"
      />
      <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
        <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-1">
          <img 
            src="https://i.postimg.cc/3NZqktNh/Chat-GPT-Image-Feb-26-2026-02-20-36-PM.png"
            alt="Clear Path"
            className="w-12 h-12 rounded-md object-cover opacity-100"
          />
        </div>
      </div>
    </div>
  );
}
