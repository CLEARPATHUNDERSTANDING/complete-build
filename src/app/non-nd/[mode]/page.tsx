'use client';

import React, { use, Suspense } from 'react';
import { NON_ND_MODES } from "@/modes/nonNdModes";
import ChartsGrid from "@/components/chart/ChartsGrid";
import { NeuroGlowCard } from "@/components/ui/NeuroGlowCard";
import Link from "next/link";
import { ArrowLeft, Loader2, Activity, ShieldCheck } from "lucide-react";

export default function NonNdModePage({ params }: { params: Promise<{ mode: string }> }) {
  const resolvedParams = use(params);
  const mode = NON_ND_MODES.find(m => m.id === resolvedParams.mode) ?? NON_ND_MODES[0];

  return (
    <div className="min-h-screen bg-black flex flex-col font-body selection:bg-indigo-500 selection:text-white">
      {/* Dynamic Header */}
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
              <span className="text-[10px] font-black tracking-widest text-white uppercase">{mode.label} Active</span>
           </div>
        </div>
      </header>

      <main className="flex-1 p-8 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full flex flex-col gap-8">
          <Suspense fallback={
            <div className="flex-1 flex flex-col items-center justify-center text-indigo-500">
              <Loader2 className="w-10 h-10 animate-spin mb-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Calibrating Environment...</span>
            </div>
          }>
            <NeuroGlowCard neuroModeId="calm_focus" className="flex-1">
              <div className="flex flex-col h-full">
                {/* Internal Panel Header */}
                <div className="px-6 py-4 flex items-center justify-between border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="grid grid-cols-2 gap-[2px] opacity-60">
                       <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                       <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                       <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                       <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                    </div>
                    <span className="text-[13px] font-black tracking-[0.2em] text-white uppercase">
                      {mode.defaultSymbol} Terminal View
                    </span>
                  </div>
                  <div className="max-w-md truncate text-right">
                    <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.15em] leading-relaxed">
                      {mode.complianceLine}
                    </span>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-6 overflow-auto">
                  <div className="mb-6 flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/5">
                    <div className="flex flex-col">
                      <h2 className="text-xl font-black text-white uppercase tracking-wider">{mode.label}</h2>
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{mode.description}</p>
                    </div>
                    <div className="flex gap-4">
                       <div className="flex flex-col items-end">
                          <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Analysis Frame</span>
                          <span className="text-xs font-bold text-indigo-400">{mode.tf?.analysisTF} MIN</span>
                       </div>
                       <div className="w-[1px] bg-white/10" />
                       <div className="flex flex-col items-end">
                          <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Layout</span>
                          <span className="text-xs font-bold text-indigo-400 uppercase">{mode.defaultLayout}</span>
                       </div>
                    </div>
                  </div>
                  
                  <ChartsGrid mode={mode} personality={mode.chart} />
                </div>
              </div>
            </NeuroGlowCard>
          </Suspense>
        </div>
      </main>
      
      <footer className="h-10 border-t border-white/10 bg-black flex items-center justify-between px-8 text-[10px] uppercase font-bold tracking-widest text-white/40">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]" /> Connected</span>
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full shadow-[0_0_10px_#6366f1]" /> Data Integrity Verified</span>
        </div>
        <div>ClearPath v2.5.0 • Standard Hub • {mode.label}</div>
      </footer>
    </div>
  );
}
