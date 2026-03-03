'use client';

import React from 'react';
import { NON_ND_MODES } from "@/modes/nonNdModes";
import Link from 'next/link';
import { ArrowLeft, Zap, Activity } from 'lucide-react';

export default function NonNdListingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <header className="h-20 border-b border-white/10 bg-black flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-8">
           <Link href="/" className="flex items-center gap-2 text-[10px] font-black tracking-[0.25em] text-indigo-400 uppercase hover:text-indigo-300 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Social
           </Link>
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
             </div>
             <div className="flex flex-col text-left">
                <span className="text-[12px] font-black tracking-[0.2em] text-white uppercase leading-none">Standard</span>
                <span className="text-[10px] font-bold tracking-[0.1em] text-white/40 uppercase">Intelligence</span>
             </div>
           </div>
        </div>
        <div className="text-[10px] font-black tracking-widest text-white/40 uppercase">
          Standard Mode Hub • 20 Configurations
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-16 px-8">
        <div className="mb-16">
          <h1 className="text-4xl font-black uppercase tracking-[0.25em] mb-4 text-white">Standard Workspace</h1>
          <p className="text-white/40 max-w-2xl text-sm font-bold uppercase tracking-widest leading-relaxed">
            Professional data-only configurations for institutional analysis. 
            All modes follow strict compliance guidelines for unbiased measurement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NON_ND_MODES.map((mode) => (
            <Link 
              key={mode.id} 
              href={`/non-nd/${mode.id}`}
              className="group relative p-8 rounded-[24px] border border-white/10 bg-white/5 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all flex flex-col h-full"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-all">
                  <Zap className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="font-black text-lg uppercase tracking-wider text-white group-hover:text-indigo-400 transition-colors">
                  {mode.label}
                </h3>
              </div>
              <p className="text-sm text-white/50 leading-relaxed font-medium mb-8 flex-1">
                {mode.description}
              </p>
              <div className="text-[9px] font-black uppercase tracking-widest text-indigo-500/60 group-hover:text-indigo-400 transition-colors flex items-center gap-2 mt-auto">
                Launch Environment <ArrowLeft className="w-3 h-3 rotate-180" />
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="py-12 border-t border-white/10 mt-20">
        <div className="max-w-6xl mx-auto px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 flex justify-between items-center">
          <span>ClearPath v2.5.0 • Standard Trading Architecture</span>
          <span className="max-w-md text-right leading-loose">
            Disclaimer: All data presented is for informational purposes only and does not constitute financial advice.
          </span>
        </div>
      </footer>
    </div>
  );
}
