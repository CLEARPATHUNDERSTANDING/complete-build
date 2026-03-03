"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useRef, useState } from "react";
import type { ModeConfig } from "@/modes/types";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type OHLCPoint = {
  time: number; // unix seconds
  open: number;
  high: number;
  low: number;
  close: number;
};

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function extractAlpha(rgba: string | undefined, fallback = 0.06) {
  if (!rgba) return fallback;
  const m = rgba.match(/rgba\(\s*\d+,\s*\d+,\s*\d+,\s*([0-9.]+)\s*\)/i);
  return m ? Number(m[1]) : fallback;
}

function sampleData(): OHLCPoint[] {
  const now = Math.floor(Date.now() / 1000);
  let price = 100;
  const out: OHLCPoint[] = [];
  for (let i = 120; i >= 0; i--) {
    const t = now - i * 60 * 15;
    const drift = (Math.random() - 0.5) * 1.4;
    const o = price;
    const c = Math.max(1, o + drift);
    const h = Math.max(o, c) + Math.random() * 0.9;
    const l = Math.min(o, c) - Math.random() * 0.9;
    price = c;
    out.push({ time: t, open: o, high: h, low: l, close: c });
  }
  return out;
}

function sanitize(rows: OHLCPoint[]) {
  return rows
    .map((r) => ({
      time: Number(r.time),
      open: Number(r.open),
      high: Number(r.high),
      low: Number(r.low),
      close: Number(r.close),
    }))
    .filter(
      (r) =>
        Number.isFinite(r.time) &&
        Number.isFinite(r.open) &&
        Number.isFinite(r.high) &&
        Number.isFinite(r.low) &&
        Number.isFinite(r.close)
    );
}

export default function ChartPanelApex({ mode, personality, data }: { mode: ModeConfig; personality: ModeConfig["chart"]; data?: OHLCPoint[] }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!wrapRef.current) return;
    const el = wrapRef.current;

    const ro = new ResizeObserver(() => {
      const w = Math.floor(el.getBoundingClientRect().width);
      if (w > 0) setWidth(w);
    });

    ro.observe(el);
    const initial = Math.floor(el.getBoundingClientRect().width);
    if (initial > 0) setWidth(initial);

    return () => ro.disconnect();
  }, []);

  const bars = useMemo(() => sanitize(data?.length ? data : sampleData()), [data]);

  const series = useMemo(
    () => [
      {
        name: mode.defaultSymbol,
        data: bars.map((d) => ({
          x: new Date(d.time * 1000),
          y: [d.open, d.high, d.low, d.close],
        })),
      },
    ],
    [bars, mode.defaultSymbol]
  );

  const gridAlpha = extractAlpha(personality.gridVert, 0.06);
  const crossAlpha = extractAlpha(personality.crosshair, 0.25);
  const glow = clamp01(personality.glow);

  const options: any = {
    chart: {
      type: "candlestick",
      background: personality.background,
      foreColor: personality.text,
      animations: { enabled: false },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
      zoom: { enabled: true, type: "x", autoScaleYaxis: true },
    },
    theme: { mode: "dark" },
    grid: {
      show: true,
      borderColor: `rgba(255,255,255,${gridAlpha})`,
      strokeDashArray: personality.density === "tight" ? 2 : personality.density === "airy" ? 4 : 3,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
      padding: { left: 10, right: 10, top: 10, bottom: 10 },
    },
    xaxis: {
      type: "datetime",
      axisBorder: { show: true, color: personality.priceLine },
      axisTicks: { show: true, color: personality.priceLine },
      labels: {
        style: {
          colors: personality.text,
          fontSize: personality.density === "tight" ? "11px" : "12px",
        },
      },
      crosshairs: {
        show: true,
        stroke: { color: `rgba(255,255,255,${crossAlpha})`, width: 1, dashArray: 0 },
      },
    },
    yaxis: {
      tooltip: { enabled: true },
      axisBorder: { show: true, color: personality.priceLine },
      labels: {
        style: {
          colors: personality.text,
          fontSize: personality.density === "tight" ? "11px" : "12px",
        },
      },
    },
    tooltip: { theme: "dark" },
    plotOptions: {
      candlestick: {
        colors: { upward: personality.upCandle, downward: personality.downCandle },
        wick: { useFillColor: true },
      },
    },
    stroke: { width: 1 },
  };

  const chartKey = [
    mode.id,
    personality.upCandle,
    personality.downCandle,
    personality.background,
    personality.gridVert,
    personality.crosshair,
    width,
  ].join("|");

  const glowShadow = `0 0 ${18 + glow * 22}px rgba(0,229,255,${0.12 + glow * 0.18})`;

  return (
    <div className="w-full" ref={wrapRef}>
      <div
        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-3"
        style={{ boxShadow: glowShadow }}
      >
        <div className="flex items-center justify-between px-2 py-2">
          <div className="text-white/85 font-semibold text-sm">
            {mode.label} • {mode.defaultSymbol} • {mode.tf?.analysisTF ?? mode.defaultTimeframe ?? ""}
          </div>
          <div className="text-[10px] px-2 py-1 rounded-lg border border-white/10 font-bold uppercase tracking-widest" style={{ color: personality.accent }}>
            Apex Engine
          </div>
        </div>

        {mounted && width > 50 ? (
          <ReactApexChart key={chartKey} options={options} series={series} type="candlestick" height={520} width={width} />
        ) : (
          <div className="h-[520px] rounded-xl border border-white/10 bg-black/40 flex items-center justify-center">
             <div className="animate-pulse text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">Initializing Physics...</div>
          </div>
        )}
      </div>
    </div>
  );
}