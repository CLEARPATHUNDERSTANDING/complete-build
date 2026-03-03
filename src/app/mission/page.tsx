import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "Mission | Clear Path Understanding",
  description:
    "Our mission: build clarity-first, educational tools with stable, ethical, and neuroinclusive design.",
};

export default function MissionPage() {
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
                <span className="text-[12px] font-black tracking-[0.2em] text-white uppercase leading-none">Mission</span>
                <span className="text-[10px] font-bold tracking-[0.1em] text-white/40 uppercase">Intelligence</span>
             </div>
           </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-8 py-16 text-white/90">
        <h1 className="text-5xl font-black uppercase tracking-[0.1em] mb-8">Mission</h1>

        <p className="text-xl leading-relaxed text-white/60 font-medium italic border-l-2 border-indigo-500 pl-6 mb-12">
          Clear Path Understanding exists to help people reduce confusion and increase clarity through
          educational tools, transparent interfaces, and user-directed exploration. We focus on stability,
          safety, and accessibility—especially when stress, overload, or uncertainty is high.
        </p>

        <div className="grid gap-8">
          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 space-y-6">
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400">What we build</h2>
            <ul className="space-y-4">
              {[
                "Informational dashboards and learning tools.",
                "Clear explanations with visible assumptions and limits.",
                "Neuroinclusive UX: predictable layout, reduced surprise, readable typography.",
                "Stable releases: changes are small, reviewable, and reversible."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-2.5 shrink-0" />
                  <span className="text-[15px] font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 space-y-6">
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-red-400">What we do not do</h2>
            <ul className="space-y-4">
              {[
                "No trade execution, brokerage, custody, or routing orders.",
                "No personalized financial advice; content is informational and educational.",
                "No deceptive claims, dark patterns, or pressure tactics."
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
          <span>Platform v1.0.0</span>
          <span className="max-w-xs text-right">If something on the platform conflicts with this mission, the mission wins.</span>
        </footer>
      </main>
    </div>
  );
}
