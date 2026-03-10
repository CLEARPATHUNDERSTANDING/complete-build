"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, LayoutDashboard, Globe, Compass, Activity } from "lucide-react";
import DiagnosticLogo from "@/components/DiagnosticLogo";
import NeonBoard from "@/components/NeonBoard";
import { useMounted } from "@/hooks/use-mounted";

export default function HomePage() {
  const mounted = useMounted();

  return (
    <main className="landing-root bg-black min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* BACKGROUND DECORATIVE GLOWS */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* TOP PROTOCOL BAR */}
      <header className="absolute top-0 w-full flex items-center justify-between px-10 py-10 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-6">
          <DiagnosticLogo size="xs" />
          <div className="flex flex-col">
            <span className="text-[14px] font-black tracking-[0.3em] uppercase text-white">Clear Path</span>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">Intelligence Protocol</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-12">
          <Link href="/patent-pending" className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400 hover:text-white transition-all">Patent Pending</Link>
          <Link href="/research" className="text-[11px] font-black uppercase tracking-[0.3em] text-white/60 hover:text-white transition-all">Lab</Link>
          <Link href="/login" className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-[0.3em] text-white hover:bg-white/10 transition-all">Sign In</Link>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-7xl w-full px-10 pt-40 pb-24 grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <div className="space-y-12 text-left">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">
            <ShieldCheck className="w-4 h-4" /> Secure Diagnostic Node
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9]">
            Market Intel <br /> 
            <span className="spectral-text">Redefined</span>
          </h1>

          <p className="max-w-xl text-xl text-white/60 leading-relaxed font-medium italic border-l-2 border-indigo-500 pl-8">
            Access a high-fidelity intelligence layer designed for neuro-divergent focus. 
            Universal asset tracking with zero sensory noise.
          </p>

          <div className="flex flex-wrap gap-6 pt-4">
            <Link href="/login" className="neon-btn-primary group">
              Start Protocol <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/community" className="neon-btn-secondary">
              Guest Access
            </Link>
          </div>
        </div>

        <div className="relative group">
          <NeonBoard className="w-full aspect-square max-w-[600px] mx-auto transition-transform duration-700 group-hover:scale-[1.02]">
            <div className="h-full w-full flex flex-col items-center justify-center gap-12 p-12 bg-[#070b16]/40 backdrop-blur-3xl">
              <DiagnosticLogo size="xl" className="shadow-[0_0_60px_rgba(106,92,255,0.3)]" />
              <div className="w-full space-y-6">
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-cyan-500 to-indigo-500" />
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
                  <span>System: Operational</span>
                  <span>v2.5.0</span>
                </div>
              </div>
            </div>
          </NeonBoard>
        </div>
      </section>

      {/* FEATURE GRIDS */}
      <section className="max-w-7xl w-full px-10 py-24 border-t border-white/5 bg-black/40">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Globe, title: "Universal Truth", desc: "Cross-referenced data from TwelveData, CoinAPI, and Finnhub.", color: "text-cyan-400" },
            { icon: LayoutDashboard, title: "Diagnostic View", desc: "16 clinical neuro-profiles for optimal sensory calibration.", color: "text-indigo-400" },
            { icon: Compass, title: "Sector Intel", desc: "Synchronized media nodes from across the political spectrum.", color: "text-orange-400" },
          ].map((feat, i) => (
            <div key={i} className="p-10 rounded-[40px] border border-white/10 bg-white/[0.02] backdrop-blur-xl group hover:border-white/20 transition-all">
              <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 w-fit mb-8 ${feat.color}`}>
                <feat.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-widest text-white mb-4">{feat.title}</h3>
              <p className="text-sm font-medium text-white/40 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER STATS */}
      <footer className="w-full px-10 py-12 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
            Data Layer: Synchronized
          </div>
          <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
            <Link href="/transparency" className="hover:text-indigo-400">Transparency</Link>
            <Link href="/compliance" className="hover:text-indigo-400">Compliance</Link>
            <Link href="/governance" className="hover:text-indigo-400">Governance</Link>
          </div>
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
            © 2026 Clear Path Understanding
          </div>
        </div>
      </footer>
    </main>
  );
}
