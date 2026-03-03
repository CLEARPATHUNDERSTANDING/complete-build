'use client';

import React, { use, Suspense, useState, useEffect } from 'react';
import { NON_ND_MODES } from "@/modes/nonNdModes";
import ChartsGrid from "@/components/chart/ChartsGrid";
import { NeuroGlowCard } from "@/components/ui/NeuroGlowCard";
import DataOnlyNotice from "@/components/compliance/DataOnlyNotice";
import SymbolPicker from "@/components/symbols/SymbolPicker";
import { coerceSymbolToScope } from "@/utils/scopeFilter";
import Link from "next/link";
import { ArrowLeft, Loader2, Activity, ShieldCheck, Settings2 } from "lucide-react";

export default function NonNdModePage({ params }: { params: Promise<{ mode: string }> }) {
  const resolvedParams = use(params);
  const modeBase = NON_ND_MODES.find(m => m.id === resolvedParams.mode) ?? NON_ND_MODES[0];
  
  // State for interactive symbol switching
  const [selectedSymbol, setSelectedSymbol] = useState(modeBase.defaultSymbol);

  // Enforce scope on mode load or symbol mismatch
  useEffect(() => {
    const safe = coerceSymbolToScope(modeBase.marketScope, selectedSymbol);
    if (safe !== selectedSymbol) {
      setSelectedSymbol(safe);
    }
  }, [modeBase.id, modeBase.marketScope, selectedSymbol]);

  const activeModeConfig = {
    ...modeBase,
    defaultSymbol: selectedSymbol
  };

  return (
    <div className="min-h-screen bg-black flex flex-col font-body selection:bg-indigo-500 selection:text-white">
      {/* High-Intensity Header */}
      <header className="h-20 border-b border-white/10 bg-black flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-8">
           <Link href="/non-nd" className="flex items-center gap-2 text-[10px] font-black tracking-[0.25em] text-indigo-400 uppercase hover:text-indigo-300 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Exit Mode
           </Link>
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                <Activity className="w-5 h-5 text-white" />
             </div>
             <div className="flex flex-col text-left">
                <span className="text-[12px] font-black tracking-[0.2em] text-white uppercase leading-none">Standard</span>
                <span className="text-[10px] font-bold tracking-[0.1em] text-white/40 uppercase">Intelligence</span>
             </div>
           </div>
        </div>

        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
              <span className="text-[10px] font-black tracking-widest text-white uppercase">{modeBase.label} Active</span>
           </div>
        </div>
      </header>

      <main className="flex-1 p-8 overflow-hidden">
        <div className="max-w-[1600px] mx-auto h-full flex flex-col gap-8">
          <Suspense fallback={
            <div className="flex-1 flex flex-col items-center justify-center text-indigo-500">
              <Loader2 className="w-10 h-10 animate-spin mb-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Calibrating Environment...</span>
            </div>
          }>
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
              {/* Chart Side */}
              <div className="lg:col-span-9 flex flex-col gap-6 min-h-0">
                <NeuroGlowCard neuroModeId="calm_focus" className="flex-1">
                  <div className="flex flex-col h-full">
                    <div className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-black/20">
                      <div className="flex items-center gap-3">
                        <div className="grid grid-cols-2 gap-[2px] opacity-60">
                           <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                           <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                           <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                           <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                        </div>
                        <span className="text-[13px] font-black tracking-[0.2em] text-white uppercase">
                          {selectedSymbol} Terminal View
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                          <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Layout</span>
                          <span className="text-xs font-bold text-indigo-400 uppercase">{modeBase.defaultLayout}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 p-6 overflow-auto custom-scrollbar">
                      <ChartsGrid mode={activeModeConfig} personality={modeBase.chart} />
                    </div>
                  </div>
                </NeuroGlowCard>
                
                <DataOnlyNotice line={modeBase.complianceLine} />
              </div>

              {/* Sidebar Side */}
              <div className="lg:col-span-3 flex flex-col gap-6 overflow-hidden">
                <div className="flex-1 min-h-0">
                  <SymbolPicker 
                    mode={modeBase} 
                    value={selectedSymbol} 
                    onChange={setSelectedSymbol} 
                  />
                </div>

                <div className="p-[2px] rounded-[24px] bg-gradient-to-br from-[#ff003c] via-[#ff8a00] to-[#ff00d4] shadow-2xl">
                  <div className="bg-[#070b16] rounded-[22px] p-6 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-pink-500/10 border border-pink-500/20 rounded-lg">
                        <Settings2 className="w-4 h-4 text-pink-400" />
                      </div>
                      <div className="text-[12px] font-black uppercase tracking-[0.2em] text-white">Environment</div>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { label: "Market Scope", val: modeBase.marketScope },
                        { label: "Data Density", val: modeBase.chart.density },
                        { label: "Primary TF", val: modeBase.tf?.analysisTF + "m" },
                        { label: "Glow Factor", val: modeBase.chart.glow * 100 + "%" }
                      ].map((stat, i) => (
                        <div key={i} className="flex items-center justify-between border-b border-white/5 pb-2">
                          <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{stat.label}</span>
                          <span className="text-[11px] font-black text-white uppercase tracking-wider">{stat.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Suspense>
        </div>
      </main>
      
      <footer className="h-10 border-t border-white/10 bg-black flex items-center justify-between px-8 text-[10px] uppercase font-bold tracking-widest text-white/40">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]" /> Connected</span>
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full shadow-[0_0_10px_#6366f1]" /> {modeBase.marketScope.toUpperCase()} DATA SYNC</span>
        </div>
        <div>ClearPath v2.5.0 • Standard Hub • {modeBase.label}</div>
      </footer>
    </div>
  );
}
