"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Activity } from "lucide-react";

export default function HomePage() {
  return (
    <main className="landing-root bg-black min-h-screen flex flex-col items-center justify-center">
      <header className="topbar w-full absolute top-0">
        <div className="brand-wrap">
          <div>
            <div className="brand-name text-white">CLEAR PATH</div>
            <div className="brand-sub uppercase tracking-[0.2em] text-white/40">Adaptive Market Intelligence</div>
          </div>
        </div>
      </header>

      <section className="max-w-5xl px-8 text-center space-y-12">
        <div className="space-y-6">
          <div className="eyebrow">Built for clarity</div>
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
          <div className="p-8 rounded-[32px] border border-white/5 bg-white/[0.02] backdrop-blur-md">
            <span className="mini-label neon-indigo-text font-black mb-2">Adaptive Interface</span>
            <strong className="text-sm uppercase tracking-widest text-white/80">Neuro-aware visual structure</strong>
          </div>

          <div className="p-8 rounded-[32px] border border-white/5 bg-white/[0.02] backdrop-blur-md">
            <span className="mini-label neon-indigo-text font-black mb-2">Live Overlay</span>
            <strong className="text-sm uppercase tracking-widest text-white/80">Diagnostic widgets on top</strong>
          </div>

          <div className="p-8 rounded-[32px] border border-white/5 bg-white/[0.02] backdrop-blur-md">
            <span className="mini-label neon-indigo-text font-black mb-2">Deployment</span>
            <strong className="text-sm uppercase tracking-widest text-white/80">Stable public front page</strong>
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
