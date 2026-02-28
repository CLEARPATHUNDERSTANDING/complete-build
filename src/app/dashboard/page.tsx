"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ViewMode, VisualProfile } from "@/lib/dashboard-types"
import { MarketPanel } from "@/components/dashboard/MarketPanel"
import { NewsPanel } from "@/components/dashboard/NewsPanel"
import { CandlestickChart } from "@/components/dashboard/CandlestickChart"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Settings, 
  User, 
  Eye, 
  Layout, 
  Zap, 
  SlidersHorizontal,
  Maximize2,
  Brain,
  Grid2X2,
  Rows,
  Activity,
  LineChart,
  Menu,
  Volume2,
  Bluetooth,
  ChevronDown
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { NEURO_PROFILES, NeuroProfileId, getProfile } from "@/lib/neuro/profiles"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { NeuroGlowCard } from "@/components/ui/NeuroGlowCard"
import { TimeframeBar } from "@/components/dashboard/TimeframeBar"
import { BackToDashboard } from "@/components/nav/BackToDashboard"

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // URL Param State
  const initialMode = (searchParams.get('mode') as ViewMode) || 'minimal';
  const profileParam = searchParams.get('profile') as NeuroProfileId;
  const marketParam = searchParams.get('market') || 'stocks';
  const symbolParam = searchParams.get('symbol') || 'AAPL';
  
  // Local State
  const [mode, setMode] = React.useState<ViewMode>(initialMode);
  const [selectedProfileId, setSelectedProfileId] = React.useState<NeuroProfileId>(profileParam || "calm_focus");
  const [layoutStyle, setLayoutStyle] = React.useState<'grid' | 'stack'>('grid');
  const [timeframe, setTimeframe] = React.useState<any>("1h");
  const [selectedSymbol, setSelectedSymbol] = React.useState(symbolParam);

  // Sync URL Params to State
  React.useEffect(() => {
    const p = searchParams.get('profile') as NeuroProfileId;
    if (p && p !== selectedProfileId) setSelectedProfileId(p);
  }, [searchParams, selectedProfileId]);

  const neuroProfile = React.useMemo(() => getProfile(selectedProfileId), [selectedProfileId]);

  const updateMode = (newMode: ViewMode) => {
    setMode(newMode);
    const params = new URLSearchParams(searchParams.toString());
    params.set('mode', newMode);
    router.replace(`/dashboard?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-black flex flex-col font-body selection:bg-indigo-500 selection:text-white">
      {/* Screenshot-Sync Header */}
      <header className="h-20 border-b border-white/10 bg-black flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-8">
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
             </div>
             <div className="flex flex-col">
                <span className="text-[12px] font-black tracking-[0.2em] text-white uppercase leading-none">ClearPath</span>
                <span className="text-[10px] font-bold tracking-[0.1em] text-white/40 uppercase">Intelligence</span>
             </div>
           </div>

           <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
              <button 
                className="px-6 py-2 rounded-full text-[10px] font-black tracking-widest uppercase transition-all text-white/40 hover:text-white"
                onClick={() => updateMode('minimal')}
              >
                Standard
              </button>
              <button 
                className="px-6 py-2 rounded-full text-[10px] font-black tracking-widest uppercase transition-all bg-pink-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.5)]"
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
              <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">Profile</span>
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
           </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="flex-1 p-8 overflow-hidden">
        {mode === 'focus' && (
          <div className="max-w-6xl mx-auto h-full flex flex-col gap-8">
            <NeuroGlowCard neuroModeId={selectedProfileId} className="flex-1">
              <div className="flex flex-col h-full">
                {/* Chart Header Sync */}
                <div className="px-6 py-4 flex items-center justify-between border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="grid grid-cols-2 gap-1 opacity-60">
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
                     <button className="px-4 py-2 text-[9px] font-black uppercase tracking-widest text-pink-400 bg-pink-500/10 border border-pink-500/20 rounded-lg">
                        Clear Draw
                     </button>
                  </div>
                </div>
                <div className="flex-1 p-4">
                  <CandlestickChart neuroModeId={selectedProfileId} title={selectedSymbol} height={600} />
                </div>
              </div>
            </NeuroGlowCard>
          </div>
        )}

        {/* Other modes would follow the same card physics */}
        {mode !== 'focus' && (
           <div className="h-full flex items-center justify-center text-white/40 uppercase text-xs font-black tracking-widest">
             Mode {mode} active - All panels wrapped in 10px NeonBoard logic
           </div>
        )}
      </main>

      {/* Status Bar */}
      <footer className="h-10 border-t border-white/10 bg-black flex items-center justify-between px-8 text-[10px] uppercase font-bold tracking-widest text-white/40">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]" /> Connected</span>
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full shadow-[0_0_10px_#6366f1]" /> Real-time Feed</span>
        </div>
        <div>
          ClearPath v1.8.0 • Physics Enabled • {neuroProfile.label}
        </div>
      </footer>
    </div>
  );
}
