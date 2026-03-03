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
  BookOpen,
  ShieldCheck,
  ExternalLink
} from "lucide-react"
import { NEURO_PROFILES, NeuroProfileId, getProfile } from "@/lib/neuro/profiles"
import { getRationale } from "@/lib/neuro/clinical-rationale"
import { NON_ND_MODES } from "@/modes/nonNdModes"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { NeuroGlowCard } from "@/components/ui/NeuroGlowCard"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { ModeConfig } from "@/modes/types"

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialMode = (searchParams.get('mode') as ViewMode) || 'minimal';
  const profileParam = searchParams.get('profile') as NeuroProfileId;
  const symbolParam = searchParams.get('symbol') || 'AAPL';
  const styleParam = searchParams.get('style') || 'stocks';
  
  const [mode, setMode] = React.useState<ViewMode>(initialMode);
  const [selectedProfileId, setSelectedProfileId] = React.useState<NeuroProfileId>(profileParam || "calm_focus");
  const [selectedStyleId, setSelectedStyleId] = React.useState<string>(styleParam);

  React.useEffect(() => {
    const p = searchParams.get('profile') as NeuroProfileId;
    if (p && p !== selectedProfileId) setSelectedProfileId(p);
    
    const s = searchParams.get('style');
    if (s && s !== selectedStyleId) setSelectedStyleId(s);
  }, [searchParams, selectedProfileId, selectedStyleId]);

  const neuroProfile = React.useMemo(() => getProfile(selectedProfileId), [selectedProfileId]);
  const rationale = React.useMemo(() => getRationale(selectedProfileId), [selectedProfileId]);
  const standardMode = React.useMemo(() => NON_ND_MODES.find(m => m.id === selectedStyleId) || NON_ND_MODES[0], [selectedStyleId]);

  const activeModeConfig = React.useMemo<ModeConfig>(() => {
    if (mode === 'focus') {
      const p = neuroProfile.personality;
      return {
        kind: "nd",
        id: neuroProfile.id,
        label: neuroProfile.label,
        description: neuroProfile.tagline,
        marketScope: "all",
        defaultSymbol: symbolParam,
        defaultCharts: mode === 'quad' ? 4 : 1,
        defaultLayout: mode === 'quad' ? "grid" : "stack",
        panels: {
          chart: true, watchlist: true, news: true, alerts: true, screener: false,
          calendar: false, journal: false, patterns: true, replay: false, research: false
        },
        chart: {
          background: p.bgTop,
          text: p.text,
          gridVert: p.grid,
          gridHorz: p.grid,
          crosshair: p.borderA,
          priceLine: p.outlineColor,
          upCandle: p.upColor,
          downCandle: p.downColor,
          upWick: p.wickColor,
          downWick: p.wickColor,
          borderUp: p.outlineColor,
          borderDown: p.outlineColor,
          accent: p.borderA,
          density: p.dataDensity === 'High' ? 'tight' : p.dataDensity === 'Low' ? 'airy' : 'normal',
          glow: p.glow === 'High' ? 1 : p.glow === 'Medium' ? 0.5 : 0,
        },
        complianceLine: "Neuro-Divergent focus interface. Evidence-informed controls."
      };
    }
    
    return standardMode;
  }, [mode, neuroProfile, standardMode, symbolParam]);

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
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">
                  {mode === 'focus' ? 'Neuro Profile' : 'Trading Style'}
                </span>
                {mode === 'focus' && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="p-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20 transition-all">
                        <Info className="w-3.5 h-3.5" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl bg-[#070b16] border-white/10 text-white rounded-[32px] overflow-hidden p-0 shadow-[0_0_80px_rgba(99,102,241,0.2)]">
                      <div className="p-8">
                        <DialogHeader className="mb-6">
                          <DialogTitle className="text-2xl font-black uppercase tracking-[0.1em] flex items-center gap-3">
                            <BookOpen className="w-6 h-6 text-indigo-400" />
                            Clinical Rationale
                          </DialogTitle>
                        </DialogHeader>
                        
                        <div className="space-y-8">
                          <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Design Goal</div>
                            <div className="text-lg font-bold text-indigo-300 leading-snug">{rationale.goal}</div>
                          </div>

                          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                            <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">Behavioral Logic</div>
                            <p className="text-[15px] leading-relaxed text-white/80">{rationale.summary}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">Design Rules</div>
                              <ul className="space-y-2">
                                {rationale.designRules.map((rule, i) => (
                                  <li key={i} className="flex items-start gap-2 text-[13px] font-medium text-white/60">
                                    <div className="w-1 h-1 rounded-full bg-indigo-500 mt-2 shrink-0" />
                                    {rule}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">Evidence Tags</div>
                              <div className="flex flex-wrap gap-2">
                                {rationale.evidenceTags.map((tag, i) => (
                                  <Badge key={i} variant="outline" className="bg-indigo-500/5 border-indigo-500/30 text-indigo-400 text-[9px] uppercase tracking-widest">{tag}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="pt-6 border-t border-white/5">
                            <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">Scientific Citations</div>
                            <div className="space-y-3">
                              {rationale.citations.map((cite, i) => (
                                <a key={i} href={cite.url} target="_blank" rel="noreferrer" className="flex items-center justify-between group p-3 rounded-xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all">
                                  <span className="text-xs font-bold text-white/70 group-hover:text-white">{cite.text}</span>
                                  <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-indigo-400" />
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
              <Select 
                value={mode === 'focus' ? selectedProfileId : selectedStyleId} 
                onValueChange={(v) => {
                  const params = new URLSearchParams(searchParams.toString());
                  if (mode === 'focus') {
                    setSelectedProfileId(v as NeuroProfileId);
                    params.set('profile', v);
                  } else {
                    setSelectedStyleId(v);
                    params.set('style', v);
                  }
                  router.replace(`/dashboard?${params.toString()}`, { scroll: false });
                }}
              >
                <SelectTrigger className="w-[180px] bg-white/5 border-white/10 rounded-xl h-10 uppercase text-[10px] font-black tracking-widest">
                  <SelectValue placeholder="Select Profile" />
                </SelectTrigger>
                <SelectContent className="bg-[#0a0f18] border-white/10">
                  {mode === 'focus' ? (
                    NEURO_PROFILES.map((p) => (
                      <SelectItem key={p.id} value={p.id} className="text-[10px] font-black uppercase tracking-widest focus:bg-pink-500">
                        {p.label}
                      </SelectItem>
                    ))
                  ) : (
                    NON_ND_MODES.map((m) => (
                      <SelectItem key={m.id} value={m.id} className="text-[10px] font-black uppercase tracking-widest focus:bg-indigo-500">
                        {m.label}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
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
                  <span className="text-[14px] font-black tracking-[0.2em] text-white uppercase">{activeModeConfig.defaultSymbol} View</span>
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
          ClearPath v2.0.0 • {activeModeConfig.label}
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
