import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "Governance | Clear Path Understanding",
  description:
    "Governance rules: stability tiers, approval expectations, and how we prevent regressions.",
};

export default function GovernancePage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500">
      <header className="h-20 border-b border-white/10 bg-black flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-8">
           <Link href="/" className="flex items-center gap-2 text-[10px] font-black tracking-[0.25em] text-indigo-400 uppercase hover:text-indigo-300 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Social Hub
           </Link>
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                <Activity className="w-5 h-5 text-white" />
             </div>
             <div className="flex flex-col text-left">
                <span className="text-[12px] font-black tracking-[0.2em] text-white uppercase leading-none">Governance</span>
                <span className="text-[10px] font-bold tracking-[0.1em] text-white/40 uppercase">Intelligence</span>
             </div>
           </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-8 py-16 text-white/90">
        <h1 className="text-5xl font-black uppercase tracking-[0.1em] mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#00d4ff] via-[#6a5cff] via-[#ff4fd8] to-[#ff8a00] drop-shadow-[0_0_10px_rgba(106,92,255,0.3)]">
          Governance
        </h1>

        <p className="text-xl leading-relaxed text-white/60 font-medium italic border-l-2 border-indigo-500 pl-6 mb-12">
          Governance exists to keep the platform stable. It defines how changes are made, reviewed, and
          rolled back when needed.
        </p>

        <div className="grid gap-8">
          <section className="space-y-6">
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400">Change tiers</h2>
            <div className="grid gap-4">
              {[
                { title: "Tier 1 — Content", desc: "Copy edits, text updates, non-functional changes." },
                { title: "Tier 2 — UI / Routes", desc: "Navigation, layouts, route structure, public pages." },
                { title: "Tier 3 — Auth / Data / Infra", desc: "Security rules, build scripts, deployment config, server-side logic." }
              ].map((tier, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <p className="text-sm font-black uppercase tracking-widest text-indigo-300 mb-2">{tier.title}</p>
                  <p className="text-sm text-white/60 font-medium">{tier.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 space-y-6">
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400">Rules</h2>
            <ul className="space-y-4">
              {[
                "Tier 3 changes require a rollback plan.",
                "Build/boot changes must be tested from a clean start.",
                "Automated bulk edits must never be auto-applied without review.",
                "Stability beats speed when they conflict."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-2.5 shrink-0" />
                  <span className="text-[15px] font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <footer className="mt-16 border-t border-white/10 pt-8 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
          <span>Security v1.0</span>
          <span className="max-w-xs text-right">Governance is about preventing chaos—not blocking progress.</span>
        </footer>
      </main>
    </div>
  );
}
