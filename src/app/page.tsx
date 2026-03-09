"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import DiagnosticLogo from "@/components/DiagnosticLogo";
import NeonBoard from "@/components/NeonBoard";

/**
 * Platform Landing Node
 */
export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="landing-root bg-black min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Top Protocol Bar */}
      <header className="topbar w-full absolute top-0 flex items-center justify-between px-10 py-8 z-50">
        <div className="brand-wrap">
          <div className="flex items-center gap-4">
            <DiagnosticLogo size="xs" />
            <div className="brand-sub uppercase font-black tracking-[0.2em] text-white/40">Adaptive Intelligence</div>
          </div>
        </div>

        <nav className="flex items-center gap-10">
          <Link href="/patent-pending" className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400 hover:text-white transition-all">
            Patent Pending
          </Link>
          <Link href="/login" className="text-[11px] font-black uppercase tracking-[0.3em] text-white/60 hover:text-white transition-all">
            Log In
          </Link>
        </nav>
      </header>

      {/* Hero Diagnostic Node */}
      <section className="max-w-5xl px-8 text-center space-y-12 relative z-10">
        <div className="flex flex-col items-center gap-10 mb-8">
          <NeonBoard className="w-64 h-64">
            <DiagnosticLogo size="xl" className="w-full h-full" />
          </NeonBoard>
        </div>

        <div className="space-y-6">
          <div className="eyebrow">Secure Diagnostic Interface</div>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.95]">
            Market intelligence <br /> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f5ff] via-[#6a5cff] via-[#ff4fd8] to-[#ff8a00]">designed for focus</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-white/60 leading-relaxed font-medium">
            Your interactive intelligence layer sits above a solid, distraction-free foundation 
            with sharp spectral styling and high-fidelity diagnostic anchors.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/login" className="primary-btn large px-12 group">
              Log In <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/login" className="ghost-btn large px-12">
              Sign Up
            </Link>
          </div>
          
          <Link 
            href="/community" 
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400 hover:text-white transition-all border border-cyan-500/20 px-6 py-2 rounded-full bg-cyan-500/5 backdrop-blur-sm"
          >
            <Zap className="w-3 h-3" /> Continue as Guest →
          </Link>
        </div>

        {/* Feature Anchors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          <div className="p-8 rounded-[32px] border border-white/5 bg-white/[0.02] backdrop-blur-md flex flex-col items-center">
            <span className="mini-label text-indigo-400 font-black mb-2 uppercase tracking-widest text-[10px]">Adaptive Interface</span>
            <strong className="text-sm uppercase tracking-widest text-white/80 text-center">Intelligent visual structure</strong>
          </div>

          <div className="p-8 rounded-[32px] border border-white/5 bg-white/[0.02] backdrop-blur-md flex flex-col items-center">
            <span className="mini-label text-indigo-400 font-black mb-2 uppercase tracking-widest text-[10px]">Live Overlay</span>
            <strong className="text-sm uppercase tracking-widest text-white/80 text-center">Easy access widgets</strong>
          </div>

          <div className="p-8 rounded-[32px] border border-white/5 bg-white/[0.02] backdrop-blur-md flex flex-col items-center">
            <span className="mini-label text-indigo-400 font-black mb-2 uppercase tracking-widest text-[10px]">Deployment</span>
            <strong className="text-sm uppercase tracking-widest text-white/80 text-center">Stable performance</strong>
          </div>
        </div>

        {/* Security Status */}
        <div className="pt-12 flex items-center justify-center gap-3 text-white/20">
          <ShieldCheck className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-widest">Secure Data Layer Active</span>
        </div>
      </section>
    </main>
  );
}
