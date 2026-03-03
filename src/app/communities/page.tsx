"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass, Users, TrendingUp, BarChart2, Zap, Globe } from "lucide-react";
import NeonBoard from "@/components/NeonBoard";
import { ScrollArea } from "@/components/ui/scroll-area";

const thematicCommunities = [
  {
    id: "macro-strategy",
    title: "Macro Strategy",
    description: "Global thematic discussion on rates, inflation, and cross-asset flow.",
    members: "12.4K",
    activity: "High",
    icon: Globe,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10"
  },
  {
    id: "crypto-quant",
    title: "Crypto Quant",
    description: "Algorithmic analysis and sentiment tracking for digital asset universes.",
    members: "8.2K",
    activity: "Critical",
    icon: Zap,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10"
  },
  {
    id: "bond-yields",
    title: "Bonds & Yields",
    description: "Fixed income diagnostics and sovereign debt cycle investigation.",
    members: "5.1K",
    activity: "Steady",
    icon: TrendingUp,
    color: "text-violet-400",
    bg: "bg-violet-500/10"
  },
  {
    id: "equity-alpha",
    title: "Equity Alpha",
    description: "Sector-specific deep dives and earnings-cycle data truth layers.",
    members: "15.9K",
    activity: "High",
    icon: BarChart2,
    color: "text-pink-400",
    bg: "bg-pink-500/10"
  }
];

export default function CommunitiesDiscoveryPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <header className="h-20 border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-50 px-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-[10px] font-black tracking-[0.25em] text-indigo-400 uppercase hover:text-indigo-300 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Social Hub
          </Link>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-black tracking-[0.2em] uppercase leading-none">Discovery</span>
              <span className="text-[10px] font-bold tracking-[0.1em] text-white/40 uppercase">Intelligence</span>
            </div>
          </div>
        </div>

        <div className="text-[10px] font-black tracking-widest text-white/40 uppercase">
          Network Directory Active
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-16 px-8">
        <div className="mb-16">
          <h1 className="text-4xl font-black uppercase tracking-[0.25em] mb-4 text-white">All Communities</h1>
          <p className="text-white/40 max-w-2xl text-sm font-bold uppercase tracking-widest leading-relaxed">
            Discover thematic intelligence hubs. Join specialized sectors to synchronize 
            diagnostic data and community theses across the network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {thematicCommunities.map((comm) => (
            <NeonBoard key={comm.id} className="h-full">
              <div className="p-8 flex flex-col h-full bg-[#070b16]">
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-4 rounded-2xl ${comm.bg} border border-white/5`}>
                    <comm.icon className={`w-8 h-8 ${comm.color}`} />
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Members</div>
                    <div className="text-xl font-black text-white tracking-tighter">{comm.members}</div>
                  </div>
                </div>

                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3">
                  {comm.title}
                </h3>
                
                <p className="text-[15px] text-white/50 leading-relaxed font-medium mb-8 flex-1 italic border-l-2 border-indigo-500/30 pl-4">
                  {comm.description}
                </p>

                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Pacing</span>
                      <span className={`text-[11px] font-black uppercase tracking-wider ${comm.activity === 'Critical' ? 'text-pink-500' : 'text-emerald-400'}`}>{comm.activity}</span>
                    </div>
                  </div>
                  <button className="bg-indigo-500 hover:bg-indigo-400 text-white font-black uppercase text-[10px] tracking-widest px-6 h-10 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all">
                    Synchronize Hub →
                  </button>
                </div>
              </div>
            </NeonBoard>
          ))}
        </div>
      </main>

      <footer className="py-12 border-t border-white/10 mt-20">
        <div className="max-w-6xl mx-auto px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 flex justify-between items-center">
          <span>ClearPath v2.5.0 • Global Network Directory</span>
          <span>No Financial Advice • Information Only</span>
        </div>
      </footer>
    </div>
  );
}
