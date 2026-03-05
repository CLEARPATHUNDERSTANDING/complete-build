"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useMounted } from "@/hooks/use-mounted";

export default function HomePage() {
  const mounted = useMounted();

  // The base header classes must be identical on server and client to avoid hydration errors.
  const headerClasses = "topbar w-full absolute top-0 flex items-center justify-between px-10 py-8 z-50";

  return (
    <main className="landing-root bg-black min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <header className={headerClasses}>
        <div className="brand-wrap">
          <div>
            <div className="brand-name text-white">AFTER PATENT</div>
            <div className="brand-sub uppercase tracking-[0.2em] text-white/40">Adaptive Market Intelligence</div>
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

      {/* Hero content only renders after mount to ensure the client-side interactive 
          elements match the server's initial placeholder state if necessary. */}
      {mounted ? (
        <section className="max-w-5xl px-8 text-center space-y-12 relative z-10 animate-in fade-in duration-700">
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
      ) : (
        <div className="flex flex-col items-center justify-center text-indigo-500/20">
          <div className="w-12 h-12 rounded-full border-2 border-current border-t-transparent animate-spin mb-4" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Initializing AFTER PATENT...</span>
        </div>
      )}
    </main>
  );
}
