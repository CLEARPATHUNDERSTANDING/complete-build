
"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Activity } from "lucide-react";
import * as React from "react";

export default function GovernancePage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500">
      <header className="h-56 border-b border-white/10 bg-black flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-16">
           <Link href="/" className="flex items-center gap-3 text-[16px] font-black tracking-[0.3em] text-indigo-400 uppercase hover:text-indigo-300 transition-colors">
              <ArrowLeft className="w-6 h-6" />
              Social Hub
           </Link>
           <div className="flex items-center gap-8">
             <div className="relative">
               <img 
                 src="https://i.postimg.cc/3NZqktNh/Chat-GPT-Image-Feb-26-2026-02-20-36-PM.png"
                 alt="Clear Path Logo"
                 className="w-48 h-48 rounded-3xl object-cover border border-white/10 shadow-[0_0_40px_rgba(255,136,0,0.4)]"
               />
               <span className="absolute bottom-2 right-2 text-[12px] font-bold text-white/60 select-none">©™</span>
             </div>
             <div className="flex flex-col text-left">
                <span className="text-[28px] font-black tracking-[0.3em] text-white uppercase leading-none">Governance</span>
                <span className="text-[24px] font-bold tracking-[0.1em] text-white/40 uppercase">Intelligence</span>
             </div>
           </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-10 py-20 text-white/90">
        <h1 className="text-6xl font-black uppercase tracking-[0.1em] mb-10 bg-clip-text text-transparent bg-gradient-to-r from-[#00d4ff] via-[#6a5cff] via-[#ff4fd8] to-[#ff8a00] drop-shadow-[0_0_25px_rgba(106,92,255,0.6)] brightness-125">
          Governance
        </h1>

        <p className="text-2xl leading-relaxed text-white/60 font-medium italic border-l-2 border-indigo-500 pl-10 mb-16">
          Governance exists to keep the platform stable. It defines how changes are made, reviewed, and
          rolled back when needed.
        </p>

        <div className="grid gap-12">
          <section className="space-y-10">
            <h2 className="text-[14px] font-black uppercase tracking-[0.3em] text-indigo-400">Change tiers</h2>
            <div className="grid gap-6">
              {[
                { title: "Tier 1 — Content", desc: "Copy edits, text updates, non-functional changes." },
                { title: "Tier 2 — UI / Routes", desc: "Navigation, layouts, route structure, public pages." },
                { title: "Tier 3 — Auth / Data / Infra", desc: "Security rules, build scripts, deployment config, server-side logic." }
              ].map((tier, i) => (
                <div key={i} className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
                  <p className="text-lg font-black uppercase tracking-widest text-indigo-300 mb-3">{tier.title}</p>
                  <p className="text-base text-white/60 font-medium">{tier.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-10 space-y-10">
            <h2 className="text-[14px] font-black uppercase tracking-[0.3em] text-indigo-400">Rules</h2>
            <ul className="space-y-6">
              {[
                "Tier 3 changes require a rollback plan.",
                "Build/boot changes must be tested from a clean start.",
                "Automated bulk edits must never be auto-applied without review.",
                "Stability beats speed when they conflict."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-6">
                  <div className="w-2 h-2 rounded-full bg-white/20 mt-3 shrink-0" />
                  <span className="text-[18px] font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <footer className="mt-20 border-t border-white/10 pt-10 flex justify-between items-center text-[12px] font-black uppercase tracking-[0.2em] text-white/30">
          <span>Security v1.0</span>
          <span className="max-w-md text-right">Governance is about preventing chaos—not blocking progress.</span>
        </footer>
      </main>
    </div>
  );
}
