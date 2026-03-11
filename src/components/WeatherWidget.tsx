"use client";

import React, { useEffect, useState } from "react";
import { Cloud, Sun, CloudRain, Snowflake, Thermometer, Wind, Loader2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

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
    if (t.includes("rain") || t.includes("shower")) return <CloudRain className="w-10 h-10 text-cyan-400" />;
    if (t.includes("snow")) return <Snowflake className="w-10 h-10 text-blue-200" />;
    if (t.includes("cloud")) return <Cloud className="w-10 h-10 text-indigo-300" />;
    return <Sun className="w-10 h-10 text-orange-400 drop-shadow-[0_0_15px_rgba(251,146,60,0.5)]" />;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Syncing Node...</span>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/30">Real-Time Node</span>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Local Node</span>
            <span className="text-[24px] font-black uppercase tracking-tighter text-white">{data.city?.toUpperCase() || "NEW YORK"}</span>
          </div>
          <div className="p-4 rounded-3xl bg-white/[0.03] border border-white/5 shadow-2xl">
            {getWeatherIcon(data.current?.WeatherText)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="p-6 rounded-[32px] bg-white/[0.03] border border-white/5 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-indigo-400" />
            <span className="text-[9px] font-black uppercase tracking-widest text-white/30">Diagnostic Temp</span>
          </div>
          <div className="text-[32px] font-black text-white tracking-tighter">
            {Math.round(data.current?.Temperature?.Metric?.Value ?? 21)}°C
          </div>
        </div>

        <div className="p-6 rounded-[32px] bg-white/[0.03] border border-white/5 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-cyan-400" />
            <span className="text-[9px] font-black uppercase tracking-widest text-white/30">Air Velocity</span>
          </div>
          <div className="text-[18px] font-black text-cyan-400 uppercase tracking-tighter leading-tight mt-1">
            {data.current?.WeatherText?.toUpperCase() || "CLEAR"}
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-white/5 flex justify-between items-center text-[11px] font-black uppercase tracking-widest">
        <div className="flex flex-col gap-1">
          <span className="text-white/20">High</span>
          <span className="text-white/60">{Math.round(data.forecast?.Temperature?.Maximum?.Value ?? 27)}°</span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-white/20">Low</span>
          <span className="text-white/60">{Math.round(data.forecast?.Temperature?.Minimum?.Value ?? 11)}°</span>
        </div>
      </div>
    </div>
  );
}
