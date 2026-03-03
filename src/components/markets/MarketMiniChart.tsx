"use client";

import dynamic from "next/dynamic";
import { type ApexOptions } from "apexcharts";
import { useMemo } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {
  series: number[];
  positive: boolean;
};

/**
 * Standardized Mini Candlestick Chart.
 * Transforms simple series data into diagnostic candlesticks for the overview grid.
 */
export default function MarketMiniChart({ series, positive }: Props) {
  const candleData = useMemo(() => {
    // Transform single-value series into mock OHLC points for candlestick rendering
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
          upward: "#00e5ff", // Neon Cyan
          downward: "#ff003c" // Neon Rose/Fuchsia
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
    <div className="h-28 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30">
      <Chart
        options={options}
        series={[{ name: "Diagnostic", data: candleData }]}
        type="candlestick"
        height="100%"
        width="100%"
      />
    </div>
  );
}
