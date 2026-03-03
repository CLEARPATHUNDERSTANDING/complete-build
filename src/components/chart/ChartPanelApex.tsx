
"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useRef, useState } from "react";
import type { ModeConfig } from "@/modes/types";
import Link from "next/link";
import { ArrowLeft, Search, Loader2 } from "lucide-react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type OHLCPoint = {
  time: number; // unix seconds
  open: number;
  high: number;
  low: number;
  close: number;
};

type Props = {
  mode: ModeConfig;
  personality: ModeConfig["chart"];
  data?: OHLCPoint[];
};

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function extractAlpha(rgba: string | undefined, fallback = 0.06) {
  if (!rgba) return fallback;
  const m = rgba.match(/rgba\(\s*\d+,\s*\d+,\s*\d+,\s*([0-9.]+)\s*\)/i);
  return m ? Number(m[1]) : fallback;
}

function sampleData(symbol: string): OHLCPoint[] {
  const now = Math.floor(Date.now() / 1000);
  const seed = symbol.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  let price = 100 + (seed % 50);
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

export default function ChartPanelApex({ mode, personality, data }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [width, setWidth] = useState(0);
  const [localSymbol, setLocalSymbol] = useState(mode.defaultSymbol);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setLocalSymbol(mode.defaultSymbol);
  }, [mode.defaultSymbol]);

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

  const bars = useMemo(() => sanitize(data?.length ? data : sampleData(localSymbol)), [data, localSymbol]);

  const series = useMemo(
    () => [
      {
        name: localSymbol,
        data: bars.map((d) => ({
          x: new Date(d.time * 1000),
          y: [d.open, d.high, d.low, d.close],
        })),
      },
    ],
    [bars, localSymbol]
  );

  const gridAlpha = extractAlpha(personality.gridVert, 0.06);
  const crossAlpha = extractAlpha(personality.crosshair, 0.25);
  const glow = clamp01(personality.glow);

  const options: any = {
    chart: {
      type: "candlestick",
      background: personality.background,
      foreColor: personality.text,
      animations: { enabled: true, speed: 300 },
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
    localSymbol,
    personality.upCandle,
    personality.downCandle,
    personality.background,
    personality.gridVert,
    personality.crosshair,
    personality.accent,
    personality.density,
    personality.glow,
    width,
  ].join("|");

  const glowShadow = `0 0 ${18 + glow * 22}px rgba(0,229,255,${0.12 + glow * 0.18})`;

  const handleSymbolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    setLocalSymbol(val);
    setIsSearching(true);
    // Simulate network lookup
    setTimeout(() => setIsSearching(false), 400);
  };

  return (
    <div className="w-full" ref={wrapRef}>
      <div
        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-3 relative"
        style={{ boxShadow: glowShadow }}
      >
        <div className="flex items-center justify-between px-2 py-2 gap-4">
          <div className="flex-1 flex items-center gap-3">
            <Link 
              href="/" 
              className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all"
              title="Exit to Hub"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
              <input 
                value={localSymbol}
                onChange={handleSymbolChange}
                className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-xs font-black uppercase tracking-[0.1em] text-white focus:outline-none focus:border-indigo-500/50 w-48 transition-all"
                placeholder="UNIVERSAL SEARCH..."
              />
              {isSearching && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-indigo-400 animate-spin" />}
            </div>
            <div className="text-[10px] font-black text-white/40 uppercase tracking-widest hidden sm:block">
              {mode.label} • {mode.tf?.analysisTF ?? mode.defaultTimeframe ?? ""}
            </div>
          </div>
          <div className="text-xs px-2 py-1 rounded-lg border border-white/10 shrink-0" style={{ color: personality.accent }}>
            Apex Terminal
          </div>
        </div>

        {mounted && width > 50 ? (
          <div className="relative">
            <ReactApexChart key={chartKey} options={options} series={series} type="candlestick" height={520} width={width} />
            {/* Logo Overlay Lower Left - Enlarged 3x See-Through */}
            <div className="absolute bottom-12 left-6 z-20 pointer-events-none group">
              <div className="relative bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-2">
                <img 
                  src="https://i.postimg.cc/3NZqktNh/Chat-GPT-Image-Feb-26-2026-02-20-36-PM.png"
                  alt="Clear Path"
                  className="w-24 h-24 rounded-xl object-cover opacity-40 group-hover:opacity-80 transition-opacity"
                />
                <span className="absolute bottom-1 right-1 text-[8px] font-bold text-white/40 select-none">©™</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-[520px] rounded-xl border border-white/10 bg-black/40 flex items-center justify-center">
             <div className="animate-pulse text-[10px] font-black uppercase tracking-widest opacity-20">Calibrating Universal Feed...</div>
          </div>
        )}
      </div>
    </div>
  );
}
