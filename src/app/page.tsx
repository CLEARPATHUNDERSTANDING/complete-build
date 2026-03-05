"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <main className="landing-root bg-black min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <header className="topbar w-full absolute top-0 flex items-center justify-between px-10 py-8 z-50">
        <div className="brand-wrap">
          <div className="flex items-center gap-4">
            <img 
              src="https://i.postimg.cc/3NZqktNh/Chat-GPT-Image-Feb-26-2026-02-20-36-PM.png"
              alt="After Patent Logo"
              className="w-12 h-12 rounded-xl object-cover border-2 border-orange-500/40 shadow-[0_0_30px_rgba(255,136,0,0.8)] brightness-125 saturate-150"
            />
            <div>
              <div className="brand-name text-white">AFTER PATENT</div>
              <div className="brand-sub uppercase tracking-[0.2em] text-white/40">Adaptive Market Intelligence</div>
            </div>
          </div>
        </div>

        <nav className="flex items-center gap-10">
          <Link href="/patent-pending" className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400 hover:text-white transition-all">
            Patent Pending
          </Link>
          <Link href="/login" className="text-[11px] font-black uppercase tracking-[0.3em] text-white/60 hover:text-white transition-all">
            Identity Portal
          </Link>
        </nav>
      </header>

      <section className="max-w-5xl px-8 text-center space-y-12 relative z-10">
        <div className="flex flex-col items-center gap-10 mb-8">
          <div className="relative group">
            <img 
              src="https://i.postimg.cc/3NZqktNh/Chat-GPT-Image-Feb-26-2026-02-20-36-PM.png"
              alt="Clear Path Logo"
              className="w-48 h-48 rounded-[40px] object-cover border-2 border-orange-500/50 shadow-[0_0_80px_rgba(255,136,0,0.8)] brightness-125 saturate-150 transition-all duration-700 group-hover:scale-105"
            />
            <span className="absolute -bottom-4 -right-4 bg-orange-500 text-black px-3 py-1 rounded-lg text-[12px] font-black tracking-widest shadow-[0_0_20px_rgba(255,136,0,0.5)]">PRO</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="eyebrow">Secure Diagnostic Interface</div>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.95]">
            Market intelligence <br /> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00d4ff] via-[#6a5cff] to-[#ff4fd8]">designed for focus</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-white/60 leading-relaxed font-medium">
            Your interactive intelligence layer sits above a solid, distraction-free foundation 
            with sharp neon styling and high-fidelity diagnostic anchors.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <Link href="/login" className="primary-btn large px-12 group">
            Synchronize Session <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/login" className="ghost-btn large px-12">
            Identity Portal
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          <div className="p-8 rounded-[32px] border border-white/5 bg-white/[0.02] backdrop-blur-md flex flex-col items-center">
            <span className="mini-label neon-indigo-text font-black mb-2">Adaptive Interface</span>
            <strong className="text-sm uppercase tracking-widest text-white/80 text-center">Neuro-aware visual structure</strong>
          </div>

          <div className="p-8 rounded-[32px] border border-white/5 bg-white/[0.02] backdrop-blur-md flex flex-col items-center">
            <span className="mini-label neon-indigo-text font-black mb-2">Live Overlay</span>
            <strong className="text-sm uppercase tracking-widest text-white/80 text-center">Login and widgets on top</strong>
          </div>

          <div className="p-8 rounded-[32px] border border-white/5 bg-white/[0.02] backdrop-blur-md flex flex-col items-center">
            <span className="mini-label neon-indigo-text font-black mb-2">Deployment</span>
            <strong className="text-sm uppercase tracking-widest text-white/80 text-center">Stable public front page</strong>
          </div>
        </div>

        <div className="pt-12 flex items-center justify-center gap-3 text-white/20">
          <ShieldCheck className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-widest">Encrypted Data Truth Layer Active</span>
        </div>
      </section>
    </main>
  );
}
