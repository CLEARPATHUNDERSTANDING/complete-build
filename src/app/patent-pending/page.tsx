'use client';

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Gavel, Cpu, Globe, Loader2 } from "lucide-react";
import NeonBoard from "@/components/NeonBoard";
import { useMounted } from "@/hooks/use-mounted";

const spectralTitleClass = "bg-clip-text text-transparent bg-gradient-to-r from-[#00d4ff] via-[#6a5cff] via-[#ff4fd8] to-[#ff8a00] drop-shadow-[0_0_25px_rgba(106,92,255,0.6)] brightness-125";

export default function PatentPendingPage() {
  const mounted = useMounted();

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500 font-body">
      <header className="h-56 border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-50 px-10 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3 text-[14px] font-black tracking-[0.25em] text-indigo-400 uppercase hover:text-indigo-300 transition-colors">
            <ArrowLeft className="w-6 h-6" />
            Social Hub
          </Link>
          <div className="h-12 w-px bg-white/10" />
          <div className="flex items-center gap-6">
            <div className="relative group">
              <img 
                src="https://i.postimg.cc/3NZqktNh/Chat-GPT-Image-Feb-26-2026-02-20-36-PM.png"
                alt="Clear Path Logo"
                className="w-32 h-32 rounded-2xl object-cover border-2 border-orange-500/40 shadow-[0_0_60px_rgba(255,136,0,0.8)] brightness-125 saturate-150 transition-transform duration-500 group-hover:scale-110"
              />
              <span className="absolute bottom-1.5 right-1.5 text-[8px] font-bold text-white shadow-black select-none">©™</span>
            </div>
            <div className="flex flex-col text-left">
              <span className={`text-[20px] font-black tracking-[0.2em] uppercase leading-none ${spectralTitleClass}`}>IP Registry</span>
              <span className="text-[16px] font-bold tracking-[0.1em] text-white/40 uppercase">Intelligence</span>
            </div>
          </div>
        </div>
        <div className="text-[12px] font-black tracking-widest text-white/40 uppercase">
          SECURE STATUS: PENDING
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-24 px-10">
        <div className="mb-20 text-center md:text-left">
          <div className="inline-flex px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-8">
            Intellectual Property Notice
          </div>
          <h1 className={`text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 ${spectralTitleClass}`}>
            Patent Pending
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed text-white/60 font-medium italic border-l-2 border-indigo-500 pl-10">
            The AFTER PATENT diagnostic architecture, encompassing neuro-aware visual physics 
            and universal data truth layers, is currently under intellectual property review.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <NeonBoard>
            <div className="p-10 space-y-6 bg-[#070b16] h-full">
              <div className="flex items-center gap-4 text-cyan-400">
                <Cpu className="w-8 h-8" />
                <h3 className="text-xl font-black uppercase tracking-widest">Neuro-Physics Engine</h3>
              </div>
              <p className="text-sm text-white/50 leading-relaxed font-medium">
                Our proprietary algorithm for calibrating chart density and motion damping based on 
                specific neuro-divergent profiles. This includes the high-intensity neon border 
                system and specialized luminescence control.
              </p>
              <div className="pt-4 flex items-center gap-2 text-[10px] font-black text-cyan-500 uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" /> Priority Filing Active
              </div>
            </div>
          </NeonBoard>

          <NeonBoard>
            <div className="p-10 space-y-6 bg-[#070b16] h-full">
              <div className="flex items-center gap-4 text-pink-400">
                <Globe className="w-8 h-8" />
                <h3 className="text-xl font-black uppercase tracking-widest">Universal Truth Layer</h3>
              </div>
              <p className="text-sm text-white/50 leading-relaxed font-medium">
                A decentralized synchronization protocol for cross-referencing multi-asset market data 
                with social intelligence in real-time, optimized for low-latency diagnostic displays.
              </p>
              <div className="pt-4 flex items-center gap-2 text-[10px] font-black text-pink-500 uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" /> Global Utility Claims
              </div>
            </div>
          </NeonBoard>
        </div>

        <section className="rounded-[40px] border border-white/10 bg-white/[0.02] p-12 space-y-10 backdrop-blur-xl">
          <div className="flex items-center gap-4 border-b border-white/5 pb-6">
            <Gavel className="w-6 h-6 text-indigo-400" />
            <h2 className="text-2xl font-black uppercase tracking-widest">Legal Notice</h2>
          </div>
          
          <div className="space-y-8 text-left">
            <div className="grid gap-4">
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-400">Status</div>
              <p className="text-lg font-bold text-white/80">
                The AFTER PATENT system is protected under multiple pending applications. 
                Unauthorized replication of the "Neon-Board" visual framing or the "Spectral Title" 
                rendering logic is strictly prohibited.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-400">Scope</div>
              <p className="text-sm text-white/40 leading-relaxed">
                Claims include but are not limited to: automated UI theme calibration based on 
                neuro-profile metadata, real-time diagnostic overlay techniques, and 
                integrated PWA market synchronization workers.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-16 border-t border-white/10 mt-20">
        <div className="max-w-5xl mx-auto px-10 flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
          <span>IP-PROTOCOL v1.5.0</span>
          <span>© 2026 AFTER PATENT • All Rights Reserved</span>
        </div>
      </footer>
    </div>
  );
}
