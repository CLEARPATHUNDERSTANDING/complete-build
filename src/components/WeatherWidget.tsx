
"use client";

import React, { useEffect, useState } from "react";
import { Cloud, Sun, CloudRain, Snowflake, Thermometer, Wind, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const spectralTitleClass = "bg-clip-text text-transparent bg-gradient-to-r from-[#00d4ff] via-[#6a5cff] to-[#ff4fd8]";

export default function WeatherWidget() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/weather")
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getWeatherIcon = (text: string = "") => {
    const t = text.toLowerCase();
    if (t.includes("rain") || t.includes("shower")) return <CloudRain className="w-8 h-8 text-cyan-400" />;
    if (t.includes("snow")) return <Snowflake className="w-8 h-8 text-blue-200" />;
    if (t.includes("cloud")) return <Cloud className="w-8 h-8 text-indigo-300" />;
    return <Sun className="w-8 h-8 text-orange-400 animate-pulse" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6 opacity-20">
        <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Local Node</span>
          <span className="text-lg font-black uppercase tracking-widest text-white">{data.city}</span>
        </div>
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
          {getWeatherIcon(data.current?.WeatherText)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 group hover:bg-indigo-500/10 transition-all">
          <div className="flex items-center gap-2 mb-2">
            <Thermometer className="w-3 h-3 text-indigo-400" />
            <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Diagnostic Temp</span>
          </div>
          <div className="text-2xl font-black text-white">
            {Math.round(data.current?.Temperature?.Metric?.Value ?? 0)}°C
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 group hover:bg-cyan-500/10 transition-all">
          <div className="flex items-center gap-2 mb-2">
            <Wind className="w-3 h-3 text-cyan-400" />
            <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Air Velocity</span>
          </div>
          <div className="text-sm font-black text-white uppercase tracking-tighter">
            {data.current?.WeatherText || "CALM"}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-white/5">
        <div className="flex justify-between items-center px-2">
          <div className="flex flex-col">
            <span className="text-[8px] font-black uppercase tracking-widest text-white/20">High</span>
            <span className="text-xs font-bold text-white/60">{Math.round(data.forecast?.Temperature?.Maximum?.Value ?? 0)}°</span>
          </div>
          <div className="h-8 w-px bg-white/5" />
          <div className="flex flex-col items-end">
            <span className="text-[8px] font-black uppercase tracking-widest text-white/20">Low</span>
            <span className="text-xs font-bold text-white/60">{Math.round(data.forecast?.Temperature?.Minimum?.Value ?? 0)}°</span>
          </div>
        </div>
      </div>
    </div>
  );
}
