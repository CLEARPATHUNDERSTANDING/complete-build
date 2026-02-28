
"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { getProfile, type NeuroProfileId } from "@/lib/neuro/profiles";
import { chartPhysics } from "@/lib/neuro/chartPhysics";

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

/**
 * ApexCandlePoint matches the TwelveData OHLC format:
 * x: Timestamp (ms)
 * y: [Open, High, Low, Close]
 */
export type ApexCandlePoint = { 
  x: number; 
  y: [number, number, number, number] 
};

interface CandlestickChartProps {
  neuroModeId: NeuroProfileId;
  title?: string;
  height?: number;
  data?: ApexCandlePoint[]; // External data feed (e.g., from TwelveData Tool)
}

export function CandlestickChart({
  neuroModeId,
  title = "TwelveData Feed",
  height = 350,
  data,
}: CandlestickChartProps) {
  const profile = getProfile(neuroModeId);
  const p = profile.personality;
  const physics = chartPhysics(p);

  // Fallback Mock Data if no external TwelveData feed is provided
  const mockData: ApexCandlePoint[] = useMemo(() => [
    { x: new Date(2023, 1, 1).getTime(), y: [6629.81, 6650.5, 6623.04, 6633.33] },
    { x: new Date(2023, 1, 2).getTime(), y: [6632.01, 6643.59, 6620, 6630.11] },
    { x: new Date(2023, 1, 3).getTime(), y: [6630.71, 6648.95, 6623.34, 6635.65] },
    { x: new Date(2023, 1, 4).getTime(), y: [6635.65, 6651, 6629.67, 6638.24] },
    { x: new Date(2023, 1, 5).getTime(), y: [6638.24, 6640, 6620, 6624.47] },
    { x: new Date(2023, 1, 6).getTime(), y: [6624.53, 6636.03, 6621.61, 6631.31] },
    { x: new Date(2023, 1, 7).getTime(), y: [6631.31, 6645.5, 6610.12, 6640.4] },
    { x: new Date(2023, 1, 8).getTime(), y: [6640.4, 6648.5, 6630.12, 6635.4] },
    { x: new Date(2023, 1, 9).getTime(), y: [6635.4, 6650, 6625.12, 6645.4] },
    { x: new Date(2023, 1, 10).getTime(), y: [6645.4, 6660, 6640.12, 6655.4] },
    { x: new Date(2023, 1, 11).getTime(), y: [6655.4, 6670, 6650.12, 6665.4] },
    { x: new Date(2023, 1, 12).getTime(), y: [6665.4, 6680, 6660.12, 6675.4] }
  ], []);

  const series = useMemo(() => [{ 
    name: title, 
    data: data || mockData 
  }], [title, data, mockData]);

  const options = useMemo<any>(() => {
    const glowCss = `drop-shadow(0 0 ${Math.round(
      10 * physics.glowStrength
    )}px ${p.borderA}) drop-shadow(0 0 ${Math.round(
      16 * physics.glowStrength
    )}px ${p.borderB})`;

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
    <div style={wrapStyle} className="transition-all duration-700">
      <div className="px-4 pt-3 flex items-center justify-between">
         <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: p.text }}>{title}</span>
         <span className="text-[10px] font-bold uppercase tracking-widest opacity-50" style={{ color: p.text }}>{profile.label}</span>
      </div>
      <Chart options={options} series={series} type="candlestick" height={height - 40} />
    </div>
  );
}
