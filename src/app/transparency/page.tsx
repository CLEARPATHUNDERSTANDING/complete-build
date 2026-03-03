import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "Transparency | Clear Path Understanding",
  description:
    "How this platform works: data sources, limitations, boundaries, and change control.",
};

export default function TransparencyPage() {
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
                <span className="text-[12px] font-black tracking-[0.2em] text-white uppercase leading-none">Transparency</span>
                <span className="text-[10px] font-bold tracking-[0.1em] text-white/40 uppercase">Intelligence</span>
             </div>
           </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-8 py-16 text-white/90">
        <h1 className="text-5xl font-black uppercase tracking-[0.1em] mb-8">Transparency</h1>

        <p className="text-xl leading-relaxed text-white/60 font-medium italic border-l-2 border-indigo-500 pl-6 mb-12">
          Transparency is a stability feature. This page explains what the platform is doing, what it is
          not doing, and where limitations exist.
        </p>

        <div className="grid gap-8">
          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 space-y-6">
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400">Data and limitations</h2>
            <ul className="space-y-4">
              {[
                "Displayed metrics may be delayed, incomplete, or simulated depending on source.",
                "We surface errors rather than hiding them when possible.",
                "We avoid implying certainty when the system is probabilistic or estimated."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-2.5 shrink-0" />
                  <span className="text-[15px] font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 space-y-6">
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400">Boundaries</h2>
            <ul className="space-y-4">
              {[
                "This platform is informational and user-directed.",
                "It is not a broker, adviser, exchange, or custodian.",
                "Users are responsible for decisions made outside the platform."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-2.5 shrink-0" />
                  <span className="text-[15px] font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 space-y-6">
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400">Change control</h2>
            <p className="text-[15px] font-medium leading-relaxed text-white/70">
              Build changes should be reversible. If an automated tool attempts to apply bulk edits, those
              edits should be reviewed and made opt-in. If stability is threatened, we prefer “stop and
              restore” over “push forward and hope.”
            </p>
          </section>
        </div>

        <footer className="mt-16 border-t border-white/10 pt-8 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
          <span>Build Status: Stable</span>
          <span className="max-w-xs text-right">This page is intentionally plain to prevent regressions.</span>
        </footer>
      </main>
    </div>
  );
}
