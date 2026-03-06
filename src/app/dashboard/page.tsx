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
  Loader2,
  Info,
  ShieldCheck,
  ExternalLink,
  Brain,
  CheckCircle2
} from "lucide-react"
import { NON_ND_MODES } from "@/modes/nonNdModes"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { NeuroGlowCard } from "@/components/ui/NeuroGlowCard"
import { useToast } from "@/hooks/use-toast"
import type { ModeConfig } from "@/modes/types"
import { useMounted } from "@/hooks/use-mounted"
import NeonBoard from "@/components/NeonBoard"

const TIMEFRAMES = ["1m", "5m", "15m", "30m", "1h", "4h", "1d", "1w", "1M", "YTD"] as const;

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const mounted = useMounted();
  
  const initialMode = (searchParams.get('mode') as ViewMode) || 'minimal';
  const symbolParam = searchParams.get('symbol') || 'AAPL';
  const styleParam = searchParams.get('style') || 'stocks';
  
  const [mode, setMode] = React.useState<ViewMode>(initialMode);
  const [selectedStyleId, setSelectedStyleId] = React.useState<string>(styleParam);
  const [activeTf, setActiveTf] = React.useState<string>("15m");

  React.useEffect(() => {
    const s = searchParams.get('style');
    if (s && s !== selectedStyleId) setSelectedStyleId(s);
  }, [searchParams, selectedStyleId]);

  const standardMode = React.useMemo(() => NON_ND_MODES.find(m => m.id === selectedStyleId) || NON_ND_MODES[0], [selectedStyleId]);

  const activeModeConfig = React.useMemo<ModeConfig>(() => {
    return {
      ...standardMode,
      defaultTimeframe: activeTf
    };
  }, [standardMode, activeTf]);

  const updateMode = (newMode: ViewMode) => {
    setMode(newMode);
    const params = new URLSearchParams(searchParams.toString());
    params.set('mode', newMode);
    router.replace(`/dashboard?${params.toString()}`, { scroll: false });
  };

  const handleBluetooth = async () => {
    if (!navigator.bluetooth) {
      toast({
        variant: "destructive",
        title: "Protocol Unsupported",
        description: "Bluetooth synchronization is not supported by your current browser engine.",
      });
      return;
    }

    try {
      toast({
        title: "Bluetooth Initializing",
        description: "Scanning for authorized network peripherals...",
      });
      
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
      });

      toast({
        title: "Device Synchronized",
        description: `Linked to: ${device.name || 'Unknown Peripheral'}`,
      });
    } catch (error: any) {
      if (error.name === 'NotFoundError') return;
      toast({
        variant: "destructive",
        title: "Sync Failure",
        description: "Failed to establish a secure link with the peripheral.",
      });
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black flex flex-col font-body selection:bg-indigo-500 selection:text-white">
      <header className="h-56 border-b border-white/10 bg-black flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-16">
           <div className="flex items-center gap-8">
             <NeonBoard className="w-40 h-40 group hover:scale-105 transition-transform duration-500">
               <img 
                 src="https://i.postimg.cc/3NZqktNh/Chat-GPT-Image-Feb-26-2026-02-20-36-PM.png"
                 alt="Clear Path Logo"
                 className="w-full h-full object-cover brightness-110 saturate-125 transition-all duration-500"
               />
             </NeonBoard>
             <div className="flex flex-col text-left">
                <span className="text-[28px] font-black tracking-[0.3em] text-white uppercase leading-none">CLEAR PATH TRADER</span>
                <span className="text-[24px] font-bold tracking-[0.1em] text-white uppercase [-webkit-text-stroke:1.5px_#ff0000]">Intelligence Board</span>
             </div>
           </div>

           <div className="flex bg-white/5 rounded-full p-1.5 border border-white/10">
              <button 
                className="px-8 py-3 rounded-full text-[11px] font-black tracking-widest uppercase transition-all bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.5)]"
              >
                Standard Terminal
              </button>
           </div>

           <button className="flex items-center gap-2 text-[11px] font-black tracking-[0.25em] text-indigo-400 uppercase hover:text-indigo-300 transition-colors">
              <Menu className="w-5 h-5" />
              Navigation
           </button>
        </div>

        <div className="flex items-center gap-8">
           <div className="flex items-center gap-6 text-white/30 border-r border-white/10 pr-8">
              <Volume2 className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
              <Bluetooth 
                onClick={handleBluetooth}
                className="w-5 h-5 hover:text-indigo-400 cursor-pointer transition-colors" 
              />
           </div>

           <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-black tracking-widest text-white/40 uppercase">
                  Trading Style
                </span>
              </div>
              <Select 
                value={selectedStyleId} 
                onValueChange={(v) => {
                  const params = new URLSearchParams(searchParams.toString());
                  setSelectedStyleId(v);
                  params.set('style', v);
                  router.replace(`/dashboard?${params.toString()}`, { scroll: false });
                }}
              >
                <SelectTrigger className="w-[220px] bg-white/5 border-white/10 rounded-xl h-12 uppercase text-[11px] font-black tracking-widest">
                  <SelectValue placeholder="Select Style" />
                </SelectTrigger>
                <SelectContent className="bg-[#0a0f18] border-white/10">
                  {NON_ND_MODES.map((m) => (
                    <SelectItem key={m.id} value={m.id} className="text-[11px] font-black uppercase tracking-widest focus:bg-indigo-500">
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
           </div>
        </div>
      </header>

      <main className="flex-1 p-8 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full flex flex-col gap-8">
          <NeuroGlowCard neuroModeId="corporate_open" className="flex-1">
            <div className="flex flex-col h-full">
              <div className="px-6 py-4 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="grid grid-cols-2 gap-[2px] opacity-60">
                     <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                     <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                     <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                     <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                  </div>
                  <span className="text-[14px] font-black tracking-[0.3em] text-white uppercase">{activeModeConfig.defaultSymbol} VIEW</span>
                </div>
                <div className="flex items-center gap-6">
                   {/* Timeframes Bar */}
                   <div className="flex gap-1 p-1 bg-black/40 rounded-lg border border-white/10">
                      {TIMEFRAMES.map(tf => (
                        <button 
                          key={tf} 
                          onClick={() => setActiveTf(tf)}
                          className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-widest transition-all rounded-md ${activeTf === tf ? 'bg-indigo-500 text-white shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'text-white/30 hover:text-white hover:bg-white/5'}`}
                        >
                          {tf}
                        </button>
                      ))}
                   </div>

                   {/* Tools */}
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
                <ChartsGrid mode={activeModeConfig} personality={activeModeConfig.chart} />
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
        <div className="truncate max-w-md">
          {activeModeConfig.complianceLine}
        </div>
        <div>
          CLEAR PATH TRADER • {activeModeConfig.label}
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
