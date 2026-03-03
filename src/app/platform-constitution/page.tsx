import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "Platform Constitution | Clear Path Understanding",
  description:
    "The platform constitution: principles, boundaries, stability rules, and AI change guardrails.",
};

export default function PlatformConstitutionPage() {
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
                <span className="text-[12px] font-black tracking-[0.2em] text-white uppercase leading-none">Constitution</span>
                <span className="text-[10px] font-bold tracking-[0.1em] text-white/40 uppercase">Intelligence</span>
             </div>
           </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-8 py-16 text-white/90">
        <header className="space-y-6 mb-12">
          <h1 className="text-5xl font-black uppercase tracking-[0.1em] bg-clip-text text-transparent bg-gradient-to-r from-[#00d4ff] via-[#6a5cff] via-[#ff4fd8] to-[#ff8a00] drop-shadow-[0_0_10px_rgba(106,92,255,0.3)]">
            Platform Constitution
          </h1>
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
              Version v1.0
            </div>
            <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
              Last updated 2026-02-27
            </div>
          </div>
          <p className="text-xl leading-relaxed text-white/60 font-medium italic border-l-2 border-indigo-500 pl-6">
            This constitution exists to keep the platform stable and trustworthy. When things get chaotic,
            the constitution is the fallback.
          </p>
        </header>

        <div className="grid gap-8">
          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 space-y-6">
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400">Principles</h2>
            <ul className="space-y-4">
              {[
                "Stability is a feature.",
                "Transparency beats ambiguity.",
                "Security is enforced by design, not hope.",
                "Neuroinclusive design reduces cognitive load and surprise."
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
                "No execution, brokerage, custody, or order routing.",
                "No personalized financial advice—educational and informational framing only.",
                "No silent auto-regeneration of build-critical files without explicit approval."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-2.5 shrink-0" />
                  <span className="text-[15px] font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 space-y-6">
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400">AI change rules</h2>
            <ul className="space-y-4">
              {[
                "AI suggestions must be opt-in; no auto-apply.",
                "AI must not claim it “deployed” changes unless it actually wrote files.",
                "Any AI-proposed change must be reviewable and reversible."
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
          <span>Governance v1.0</span>
          <span className="max-w-xs text-right">If a tool conflicts with these rules, the rules win.</span>
        </footer>
      </main>
    </div>
  );
}
