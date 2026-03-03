"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ViewMode } from "@/lib/dashboard-types"
import ChartsGrid from "@/components/chart/ChartsGrid"
import { 
  Activity,
  Volume2,
  Bluetooth,
  Menu,
  Loader2
} from "lucide-react"
import { NEURO_PROFILES, NeuroProfileId, getProfile } from "@/lib/neuro/profiles"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { NeuroGlowCard } from "@/components/ui/NeuroGlowCard"
import type { ModeConfig } from "@/modes/types"

const STANDARD_PERSONALITY: ModeConfig["chart"] = {
  background: "#050816",
  text: "rgba(255,255,255,0.7)",
  gridVert: "rgba(255,255,255,0.06)",
  crosshair: "rgba(255,255,255,0.2)",
  upCandle: "#22c55e",
  downCandle: "#ef4444",
  priceLine: "rgba(255,255,255,0.1)",
  accent: "#6366f1",
  density: "normal",
  glow: 0.2,
};

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialMode = (searchParams.get('mode') as ViewMode) || 'minimal';
  const profileParam = searchParams.get('profile') as NeuroProfileId;
  const symbolParam = searchParams.get('symbol') || 'AAPL';
  const styleParam = searchParams.get('style') || 'standard';
  
  const [mode, setMode] = React.useState<ViewMode>(initialMode);
  const [selectedProfileId, setSelectedProfileId] = React.useState<NeuroProfileId>(profileParam || "calm_focus");
  const [selectedSymbol] = React.useState(symbolParam);

  React.useEffect(() => {
    const p = searchParams.get('profile') as NeuroProfileId;
    if (p && p !== selectedProfileId) setSelectedProfileId(p);
  }, [searchParams, selectedProfileId]);

  const neuroProfile = React.useMemo(() => getProfile(selectedProfileId), [selectedProfileId]);

  const modeConfig = React.useMemo<ModeConfig>(() => {
    const isNeuro = mode === 'focus';
    const p = isNeuro ? neuroProfile.personality : STANDARD_PERSONALITY;
    
    return {
      id: isNeuro ? neuroProfile.id : styleParam,
      label: isNeuro ? neuroProfile.label : styleParam.replace(/_/g, ' ').toUpperCase(),
      defaultSymbol: selectedSymbol,
      defaultTimeframe: "15m",
      defaultCharts: mode === 'quad' ? 4 : 1,
      defaultLayout: mode === 'quad' ? "grid" : "stack",
      chart: isNeuro ? {
        background: neuroProfile.personality.bgTop,
        text: neuroProfile.personality.text,
        gridVert: neuroProfile.personality.grid,
        crosshair: neuroProfile.personality.borderA,
        upCandle: neuroProfile.personality.upColor,
        downCandle: neuroProfile.personality.downColor,
        priceLine: neuroProfile.personality.outlineColor,
        accent: neuroProfile.personality.borderA,
        density: neuroProfile.personality.dataDensity === 'High' ? 'tight' : neuroProfile.personality.dataDensity === 'Low' ? 'airy' : 'normal',
        glow: neuroProfile.personality.glow === 'High' ? 1 : neuroProfile.personality.glow === 'Medium' ? 0.5 : 0,
      } : STANDARD_PERSONALITY
    };
  }, [mode, neuroProfile, selectedSymbol, styleParam]);

  const updateMode = (newMode: ViewMode) => {
    setMode(newMode);
    const params = new URLSearchParams(searchParams.toString());
    params.set('mode', newMode);
    router.replace(`/dashboard?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-black flex flex-col font-body selection:bg-indigo-500 selection:text-white">
      <header className="h-20 border-b border-white/10 bg-black flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-8">
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
             </div>
             <div className="flex flex-col text-left">
                <span className="text-[12px] font-black tracking-[0.2em] text-white uppercase leading-none">ClearPath</span>
                <span className="text-[10px] font-bold tracking-[0.1em] text-white/40 uppercase">Intelligence</span>
             </div>
           </div>

           <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
              <button 
                className={`px-6 py-2 rounded-full text-[10px] font-black tracking-widest uppercase transition-all ${mode === 'minimal' || mode === 'quad' ? 'bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.5)]' : 'text-white/40 hover:text-white'}`}
                onClick={() => updateMode('minimal')}
              >
                Standard
              </button>
              <button 
                className={`px-6 py-2 rounded-full text-[10px] font-black tracking-widest uppercase transition-all ${mode === 'focus' ? 'bg-pink-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.5)]' : 'text-white/40 hover:text-white'}`}
                onClick={() => updateMode('focus')}
              >
                Neurodivergent
              </button>
           </div>

           <button className="flex items-center gap-2 text-[10px] font-black tracking-[0.25em] text-indigo-400 uppercase hover:text-indigo-300 transition-colors">
              <Menu className="w-4 h-4" />
              Navigation
           </button>
        </div>

        <div className="flex items-center gap-6">
           <div className="flex items-center gap-4 text-white/30 border-r border-white/10 pr-6">
              <Volume2 className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
              <Bluetooth className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
           </div>

           <div className="flex items-center gap-4">
              <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">
                {mode === 'focus' ? 'Neuro Profile' : 'Trading Style'}
              </span>
              {mode === 'focus' ? (
                <Select 
                  value={selectedProfileId} 
                  onValueChange={(v) => {
                    setSelectedProfileId(v as NeuroProfileId);
                    const params = new URLSearchParams(searchParams.toString());
                    params.set('profile', v);
                    router.replace(`/dashboard?${params.toString()}`, { scroll: false });
                  }}
                >
                  <SelectTrigger className="w-[180px] bg-white/5 border-white/10 rounded-xl h-10 uppercase text-[10px] font-black tracking-widest">
                    <SelectValue placeholder="Select Profile" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a0f18] border-white/10">
                    {NEURO_PROFILES.map((p) => (
                      <SelectItem key={p.id} value={p.id} className="text-[10px] font-black uppercase tracking-widest focus:bg-indigo-500">
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black tracking-widest uppercase text-white/60">
                  {styleParam.replace(/_/g, ' ')}
                </div>
              )}
           </div>
        </div>
      </header>

      <main className="flex-1 p-8 overflow-hidden">
        <div className="max-w-6xl mx-auto h-full flex flex-col gap-8">
          <NeuroGlowCard neuroModeId={mode === 'focus' ? selectedProfileId : "calm_focus"} className="flex-1">
            <div className="flex flex-col h-full">
              <div className="px-6 py-4 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="grid grid-cols-2 gap-[2px] opacity-60">
                     <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                     <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                     <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                     <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                  </div>
                  <span className="text-[14px] font-black tracking-[0.2em] text-white uppercase">{selectedSymbol} View</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="flex gap-2 p-1 bg-black/40 rounded-lg border border-white/10">
                      {["Zoom", "Pan", "Reset", "Crosshair", "Trendline", "Rectangle"].map(btn => (
                        <button key={btn} className="px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all bg-white/5 rounded-md">
                          {btn}
                        </button>
                      ))}
                   </div>
                   <button 
                     className="px-4 py-2 text-[9px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-lg hover:bg-indigo-500/20 transition-all"
                     onClick={() => updateMode(mode === 'quad' ? 'minimal' : 'quad')}
                   >
                      {mode === 'quad' ? 'Single View' : 'Quad View'}
                   </button>
                </div>
              </div>
              <div className="flex-1 p-6 overflow-auto">
                <ChartsGrid mode={modeConfig} personality={modeConfig.chart} />
              </div>
            </div>
          </NeuroGlowCard>
        </div>
      </main>

      <footer className="h-10 border-t border-white/10 bg-black flex items-center justify-between px-8 text-[10px] uppercase font-bold tracking-widest text-white/40">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]" /> Connected</span>
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full shadow-[0_0_10px_#6366f1]" /> Real-time Feed</span>
        </div>
        <div>
          ClearPath v2.0.0 • Apex Engine Standardized • {modeConfig.label}
        </div>
      </footer>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center text-indigo-500">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    }>
      <DashboardContent />
    </React.Suspense>
  );
}
