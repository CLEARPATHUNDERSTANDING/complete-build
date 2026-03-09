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
  ShieldCheck,
  Globe,
  LayoutDashboard,
  Users,
  Compass,
  MessageCircle,
  TrendingUp,
  Brain
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet"
import { NeuroGlowCard } from "@/components/ui/NeuroGlowCard"
import { useToast } from "@/hooks/use-toast"
import { useMounted } from "@/hooks/use-mounted"
import DiagnosticLogo from "@/components/DiagnosticLogo"
import { CandlestickChart } from "@/components/dashboard/CandlestickChart"
import Link from "next/link"

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
      toast({ variant: "destructive", title: "Unsupported", description: "This browser doesn't support connections." });
      return;
    }
    toast({ title: "Connecting", description: "Searching for device..." });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black flex flex-col font-body selection:bg-indigo-500 selection:text-white">
      <header className="h-20 lg:h-56 border-b border-white/10 bg-black flex items-center justify-between px-6 lg:px-10 sticky top-0 z-50">
        <div className="flex items-center gap-4 lg:gap-16">
           <div className="flex items-center gap-4 lg:gap-8">
             <DiagnosticLogo size="xs" className="lg:hidden" />
             <DiagnosticLogo size="md" className="hidden lg:block" />
             <div className="flex flex-col text-left">
                <span className="text-sm lg:text-[28px] font-black tracking-[0.2em] lg:tracking-[0.3em] text-white uppercase leading-none">TRADER</span>
                <span className="text-xs lg:text-[24px] font-bold tracking-[0.1em] text-white uppercase hidden lg:inline-block">Diagnostic Board</span>
             </div>
           </div>

           <div className="hidden lg:flex bg-white/5 rounded-full p-1.5 border border-white/10">
              <button 
                onClick={() => setIsNeuroEnabled(false)}
                className={`px-8 py-3 rounded-full text-[11px] font-black tracking-widest uppercase transition-all ${!isNeuroEnabled ? 'bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.5)]' : 'text-white/40 hover:text-white'}`}
              >
                Standard
              </button>
              <button 
                onClick={() => setIsNeuroEnabled(true)}
                className={`px-8 py-3 rounded-full text-[11px] font-black tracking-widest uppercase transition-all ${isNeuroEnabled ? 'bg-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.5)]' : 'text-white/40 hover:text-white'}`}
              >
                Neuro
              </button>
           </div>

           <Sheet>
             <SheetTrigger asChild>
               <button className="flex items-center gap-2 text-[10px] lg:text-[11px] font-black tracking-[0.2em] text-indigo-400 uppercase hover:text-indigo-300 transition-colors">
                  <Menu className="w-4 h-4 lg:w-5 h-5" />
                  Navigation
               </button>
             </SheetTrigger>
             <SheetContent side="left" className="bg-black/95 border-r border-white/10 p-0 w-[300px] lg:w-[350px]">
               <SheetHeader className="p-6 lg:p-8 border-b border-white/5 bg-white/[0.02]">
                 <div className="flex items-center gap-4">
                   <DiagnosticLogo size="xs" />
                   <SheetTitle className="text-lg lg:text-xl font-black tracking-widest uppercase text-white">Hub Menu</SheetTitle>
                 </div>
                 <SheetDescription className="text-xs text-white/30 uppercase tracking-widest">Diagnostic terminals and network nodes.</SheetDescription>
               </SheetHeader>
               <div className="p-6 space-y-8">
                 <div className="space-y-2">
                   <div className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mb-4 px-2">Diagnostic Terminals</div>
                   <Link href="/dashboard" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group">
                     <LayoutDashboard className="w-5 h-5 text-amber-400" />
                     <span className="text-xs font-black uppercase tracking-widest">Trading Desk</span>
                   </Link>
                   <Link href="/markets" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group">
                     <Globe className="w-5 h-5 text-emerald-400" />
                     <span className="text-xs font-black uppercase tracking-widest">Market Intel</span>
                   </Link>
                   <Link href="/personalities" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group">
                     <Compass className="w-5 h-5 text-orange-400" />
                     <span className="text-xs font-black uppercase tracking-widest">Sector Nodes</span>
                   </Link>
                 </div>

                 <div className="space-y-2">
                   <div className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mb-4 px-2">Social Network</div>
                   <Link href="/community" className="flex items-center gap-4 p-4 rounded-2xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 transition-all group">
                     <MessageCircle className="w-5 h-5 text-indigo-400" />
                     <span className="text-xs font-black uppercase tracking-widest">Global Feed</span>
                   </Link>
                   <Link href="/communities" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group">
                     <Users className="w-5 h-5 text-pink-400" />
                     <span className="text-xs font-black uppercase tracking-widest">Community Hubs</span>
                   </Link>
                 </div>

                 <div className="pt-8 border-t border-white/5">
                   <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 border border-white/10 text-center">
                     <Brain className="w-6 h-6 text-indigo-400 mx-auto mb-4" />
                     <div className="text-[8px] font-black uppercase tracking-widest text-indigo-400 mb-1">Status: Operational</div>
                     <div className="text-[10px] font-bold text-white/60">Neural Engine v2.5.0</div>
                   </div>
                 </div>
               </div>
             </SheetContent>
           </Sheet>
        </div>

        <div className="flex items-center gap-4 lg:gap-8">
           <div className="hidden lg:flex items-center gap-6 text-white/30 border-r border-white/10 pr-8">
              <Volume2 className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
              <Bluetooth onClick={handleBluetooth} className="w-5 h-5 hover:text-indigo-400 cursor-pointer transition-colors" />
           </div>

           <div className="flex items-center gap-4">
              <div className="hidden lg:flex flex-col items-end">
                <span className="text-[9px] font-black tracking-widest text-white/40 uppercase">Profile</span>
                <span className="text-[11px] font-black text-indigo-400 uppercase tracking-widest">{isNeuroEnabled ? activeProfile.label : standardMode.label}</span>
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
                <SelectTrigger className="w-[140px] lg:w-[240px] bg-white/5 border-white/10 rounded-xl h-10 lg:h-12 uppercase text-[9px] lg:text-[11px] font-black tracking-widest">
                  <SelectValue placeholder="Profile" />
                </SelectTrigger>
                <SelectContent className="bg-[#0a0f18] border-white/10">
                  {isNeuroEnabled ? (
                    NEURO_PROFILES.map((p) => (
                      <SelectItem key={p.id} value={p.id} className="text-[10px] lg:text-[11px] font-black uppercase tracking-widest focus:bg-cyan-500 focus:text-white">
                        {p.label}
                      </SelectItem>
                    ))
                  ) : (
                    NON_ND_MODES.map((m) => (
                      <SelectItem key={m.id} value={m.id} className="text-[10px] lg:text-[11px] font-black uppercase tracking-widest focus:bg-indigo-500 focus:text-white">
                        {m.label}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
           </div>
        </div>
      </header>

      <main className="flex-1 p-4 lg:p-10 overflow-hidden">
        <div className="max-w-[1800px] mx-auto h-full flex flex-col gap-4 lg:gap-10">
          <NeuroGlowCard neuroModeId={neuroId} className="flex-1">
            <div className="flex flex-col h-full bg-[#070b16]/40 backdrop-blur-3xl">
              <div className="px-4 lg:px-8 py-3 lg:py-5 flex items-center justify-between border-b border-white/5 bg-black/20">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                    <Activity className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <span className="text-[11px] lg:text-[14px] font-black tracking-[0.2em] lg:tracking-[0.3em] text-white uppercase">{standardMode.defaultSymbol} VIEW</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 lg:gap-8">
                   <div className="hidden sm:flex gap-1 p-1 bg-black/40 rounded-xl border border-white/10">
                      {["15m", "1h", "1d", "1w"].map(tf => (
                        <button 
                          key={tf} 
                          onClick={() => setActiveTf(tf)}
                          className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-widest transition-all rounded-lg ${activeTf === tf ? 'bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'text-white/30 hover:text-white'}`}
                        >
                          {tf}
                        </button>
                      ))}
                   </div>

                   <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
                      <button 
                        onClick={() => setViewMode('minimal')}
                        className={`p-1.5 rounded-lg transition-all ${viewMode === 'minimal' ? 'bg-indigo-500 text-white' : 'text-white/20'}`}
                      >
                        <Square className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => setViewMode('quad')}
                        className={`p-1.5 rounded-lg transition-all ${viewMode === 'quad' ? 'bg-indigo-500 text-white' : 'text-white/20'}`}
                      >
                        <LayoutGrid className="w-3.5 h-3.5" />
                      </button>
                   </div>
                </div>
              </div>

              <div className="flex-1 p-4 lg:p-8 overflow-auto">
                {viewMode === 'quad' ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 h-full">
                    <CandlestickChart neuroModeId={neuroId} title={standardMode.defaultSymbol} height={300} />
                    <CandlestickChart neuroModeId={neuroId} title="EURUSD" height={300} />
                    <CandlestickChart neuroModeId={neuroId} title="BTCUSD" height={300} />
                    <CandlestickChart neuroModeId={neuroId} title="XAUUSD" height={300} />
                  </div>
                ) : (
                  <div className="h-full flex flex-col gap-8">
                    <CandlestickChart neuroModeId={neuroId} title={standardMode.defaultSymbol} height={mounted && typeof window !== 'undefined' && window.innerWidth < 1024 ? 400 : 600} />
                  </div>
                )}
              </div>
            </div>
          </NeuroGlowCard>
        </div>
      </main>

      <footer className="h-10 border-t border-white/10 bg-black flex items-center justify-between px-6 lg:px-10 text-[8px] lg:text-[10px] uppercase font-bold tracking-widest text-white/40">
        <div className="flex items-center gap-4 lg:gap-8">
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Live</span>
          <span className="hidden sm:flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" /> Synchronized</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="opacity-50">IP-RESTORED v1.5.0</span>
        </div>
      </footer>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-indigo-500 gap-4">
        <Loader2 className="w-10 h-10 animate-spin" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Loading Terminal...</span>
      </div>
    }>
      <DashboardContent />
    </React.Suspense>
  );
}
