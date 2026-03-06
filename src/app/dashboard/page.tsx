"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ViewMode } from "@/lib/dashboard-types"
import { 
  Volume2,
  Bluetooth,
  Menu,
  Loader2,
  LayoutGrid,
  Square,
  Activity,
  ShieldCheck
} from "lucide-react"
import { NEURO_PROFILES, getProfile, type NeuroProfileId } from "@/lib/neuro/profiles"
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
import { useMounted } from "@/hooks/use-mounted"
import DiagnosticLogo from "@/components/DiagnosticLogo"
import { CandlestickChart } from "@/components/dashboard/CandlestickChart"

const TIMEFRAMES = ["1m", "5m", "15m", "30m", "1h", "4h", "1d", "1w", "1M", "YTD"] as const;

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const mounted = useMounted();
  
  const viewParam = (searchParams.get('mode') as ViewMode) || 'minimal';
  const neuroParam = (searchParams.get('neuro') as NeuroProfileId) || 'corporate_open';
  const styleParam = searchParams.get('style') || 'stocks';
  
  const [viewMode, setViewMode] = React.useState<ViewMode>(viewParam);
  const [neuroId, setNeuroId] = React.useState<NeuroProfileId>(neuroParam);
  const [styleId, setStyleId] = React.useState<string>(styleParam);
  const [activeTf, setActiveTf] = React.useState<string>("15m");
  const [isNeuroEnabled, setIsNeuroEnabled] = React.useState(true);

  const activeProfile = React.useMemo(() => getProfile(neuroId), [neuroId]);
  const standardMode = React.useMemo(() => NON_ND_MODES.find(m => m.id === styleId) || NON_ND_MODES[0], [styleId]);

  const updateParam = (key: string, val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, val);
    router.replace(`/dashboard?${params.toString()}`, { scroll: false });
  };

  const handleBluetooth = async () => {
    if (!navigator.bluetooth) {
      toast({ variant: "destructive", title: "Protocol Unsupported", description: "Sync disabled." });
      return;
    }
    toast({ title: "Bluetooth Sync", description: "Establishing link..." });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black flex flex-col font-body selection:bg-indigo-500 selection:text-white">
      <header className="h-56 border-b border-white/10 bg-black flex items-center justify-between px-10 sticky top-0 z-50">
        <div className="flex items-center gap-16">
           <div className="flex items-center gap-8">
             <DiagnosticLogo size="md" />
             <div className="flex flex-col text-left">
                <span className="text-[28px] font-black tracking-[0.3em] text-white uppercase leading-none">INTELLIGENCE TRADER</span>
                <span className="text-[24px] font-bold tracking-[0.1em] text-white uppercase [-webkit-text-stroke:1.5px_#ff0000]">Diagnostic Board</span>
             </div>
           </div>

           <div className="flex bg-white/5 rounded-full p-1.5 border border-white/10">
              <button 
                onClick={() => setIsNeuroEnabled(false)}
                className={`px-8 py-3 rounded-full text-[11px] font-black tracking-widest uppercase transition-all ${!isNeuroEnabled ? 'bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.5)]' : 'text-white/40 hover:text-white'}`}
              >
                Standard Terminal
              </button>
              <button 
                onClick={() => setIsNeuroEnabled(true)}
                className={`px-8 py-3 rounded-full text-[11px] font-black tracking-widest uppercase transition-all ${isNeuroEnabled ? 'bg-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.5)]' : 'text-white/40 hover:text-white'}`}
              >
                Neuro Terminal
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
              <Bluetooth onClick={handleBluetooth} className="w-5 h-5 hover:text-indigo-400 cursor-pointer transition-colors" />
           </div>

           <div className="flex items-center gap-6">
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-black tracking-widest text-white/40 uppercase">
                  Current Profile
                </span>
                <span className="text-[11px] font-black text-indigo-400 uppercase tracking-widest">
                  {isNeuroEnabled ? activeProfile.label : standardMode.label}
                </span>
              </div>
              
              <Select 
                value={isNeuroEnabled ? neuroId : styleId} 
                onValueChange={(v) => {
                  if (isNeuroEnabled) {
                    setNeuroId(v as NeuroProfileId);
                    updateParam('neuro', v);
                  } else {
                    setStyleId(v);
                    updateParam('style', v);
                  }
                }}
              >
                <SelectTrigger className="w-[240px] bg-white/5 border-white/10 rounded-xl h-12 uppercase text-[11px] font-black tracking-widest">
                  <SelectValue placeholder="Select Profile" />
                </SelectTrigger>
                <SelectContent className="bg-[#0a0f18] border-white/10">
                  {isNeuroEnabled ? (
                    NEURO_PROFILES.map((p) => (
                      <SelectItem key={p.id} value={p.id} className="text-[11px] font-black uppercase tracking-widest focus:bg-cyan-500 focus:text-white">
                        {p.label}
                      </SelectItem>
                    ))
                  ) : (
                    NON_ND_MODES.map((m) => (
                      <SelectItem key={m.id} value={m.id} className="text-[11px] font-black uppercase tracking-widest focus:bg-indigo-500 focus:text-white">
                        {m.label}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
           </div>
        </div>
      </header>

      <main className="flex-1 p-10 overflow-hidden">
        <div className="max-w-[1800px] mx-auto h-full flex flex-col gap-10">
          <NeuroGlowCard neuroModeId={neuroId} className="flex-1">
            <div className="flex flex-col h-full bg-[#070b16]/40 backdrop-blur-3xl">
              <div className="px-8 py-5 flex items-center justify-between border-b border-white/5 bg-black/20">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                    <Activity className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <span className="text-[14px] font-black tracking-[0.3em] text-white uppercase">{standardMode.defaultSymbol} VIEW</span>
                    <div className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">{activeProfile.tagline}</div>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                   <div className="flex gap-1 p-1 bg-black/40 rounded-xl border border-white/10">
                      {TIMEFRAMES.map(tf => (
                        <button 
                          key={tf} 
                          onClick={() => setActiveTf(tf)}
                          className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg ${activeTf === tf ? 'bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'text-white/30 hover:text-white hover:bg-white/5'}`}
                        >
                          {tf}
                        </button>
                      ))}
                   </div>

                   <div className="h-8 w-px bg-white/10" />

                   <div className="flex items-center gap-3 bg-white/5 p-1 rounded-xl border border-white/10">
                      <button 
                        onClick={() => setViewMode('minimal')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'minimal' ? 'bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.5)]' : 'text-white/20 hover:text-white'}`}
                      >
                        <Square className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setViewMode('quad')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'quad' ? 'bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.5)]' : 'text-white/20 hover:text-white'}`}
                      >
                        <LayoutGrid className="w-4 h-4" />
                      </button>
                   </div>
                </div>
              </div>

              <div className="flex-1 p-8 overflow-auto">
                {viewMode === 'quad' ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                    <CandlestickChart neuroModeId={neuroId} title={standardMode.defaultSymbol} height={400} />
                    <CandlestickChart neuroModeId={neuroId} title="EURUSD" height={400} />
                    <CandlestickChart neuroModeId={neuroId} title="BTCUSD" height={400} />
                    <CandlestickChart neuroModeId={neuroId} title="XAUUSD" height={400} />
                  </div>
                ) : (
                  <div className="h-full flex flex-col gap-8">
                    <CandlestickChart neuroModeId={neuroId} title={standardMode.defaultSymbol} height={600} />
                  </div>
                )}
              </div>
            </div>
          </NeuroGlowCard>
        </div>
      </main>

      <footer className="h-12 border-t border-white/10 bg-black flex items-center justify-between px-10 text-[10px] uppercase font-bold tracking-widest text-white/40">
        <div className="flex items-center gap-8">
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]" /> Connected</span>
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full shadow-[0_0_10px_#6366f1]" /> Neural Engine Active</span>
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_10px_#06b6d4]" /> Protocol Synchronized</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Diagnostic Mode: Stable</span>
          </div>
          <span>IP-RESTORED v1.5.0</span>
        </div>
      </footer>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-indigo-500 gap-4">
        <Loader2 className="w-12 h-12 animate-spin" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Restoring Neural Architecture...</span>
      </div>
    }>
      <DashboardContent />
    </React.Suspense>
  );
}
