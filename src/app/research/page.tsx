import type { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowLeft, 
  Activity, 
  Zap, 
  BookOpen, 
  Microscope, 
  ExternalLink, 
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Brain
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { evidencePillars, CLEAR_PATH_NON_MEDICAL_DEVICE_DISCLAIMER } from "@/docs/evidenceRegistry";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "On-Going Research | Clear Path Intelligence",
  description:
    "Active research initiatives: neuro-physics calibration, clinical rationale, and citation-backed design pillars.",
};

export default function ResearchPage() {
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
                <span className="text-[12px] font-black tracking-[0.2em] text-white uppercase leading-none">Research</span>
                <span className="text-[10px] font-bold tracking-[0.1em] text-white/40 uppercase">Intelligence</span>
             </div>
           </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-8 py-16 text-white/90">
        <div className="mb-16">
          <h1 className="text-5xl font-black uppercase tracking-[0.1em] mb-8">Intelligence Lab</h1>
          <p className="text-xl leading-relaxed text-white/60 font-medium italic border-l-2 border-indigo-500 pl-6 mb-12">
            Clear Path Intelligence is dedicated to reducing interface-driven strain through 
            evidence-informed design levers and cognition-aware sensory controls.
          </p>
        </div>

        <div className="grid gap-12">
          {/* Clinical Registry Header */}
          <section className="space-y-8">
            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <Microscope className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-black uppercase tracking-wider">Evidence Registry</h2>
                <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400/60">Citation-Backed Design Pillars</div>
              </div>
            </div>

            {/* Non-Medical Disclaimer */}
            <div className="bg-indigo-500/5 border border-indigo-500/20 p-8 rounded-[32px] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <ShieldCheck className="w-32 h-32 text-indigo-400" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="w-5 h-5 text-indigo-400" />
                  <h4 className="text-sm font-black uppercase tracking-widest text-indigo-400">Non-Medical Regulatory Positioning</h4>
                </div>
                <p className="text-[15px] text-white/80 leading-relaxed font-medium max-w-3xl">
                  {CLEAR_PATH_NON_MEDICAL_DEVICE_DISCLAIMER}
                </p>
              </div>
            </div>

            {/* Evidence Pillars Accordion */}
            <div className="space-y-6">
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/40">The 10 Core Pillars</h3>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {evidencePillars.map((pillar) => (
                  <AccordionItem key={pillar.id} value={pillar.id} className="border border-white/10 bg-white/[0.02] rounded-2xl px-6 transition-all hover:bg-white/[0.04]">
                    <AccordionTrigger className="hover:no-underline py-6">
                      <div className="flex flex-col items-start gap-2 text-left">
                        <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400">{pillar.domain}</span>
                        <span className="text-base font-black uppercase tracking-tight text-indigo-100">{pillar.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-8 space-y-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <div className="text-[10px] font-black uppercase tracking-widest text-white/30">VC-Safe Claim</div>
                          <p className="text-lg font-bold text-cyan-300 leading-tight">"{pillar.vcSafeClaim}"</p>
                          
                          <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mt-6">Internal Technical Interpretation</div>
                          <p className="text-sm text-white/60 leading-relaxed italic">{pillar.internalInterpretation}</p>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-3">Implementation Controls</div>
                            <div className="flex flex-wrap gap-2">
                              {pillar.designLevers.map(lever => (
                                <Badge key={lever} variant="outline" className="bg-white/5 border-white/10 text-[9px] uppercase font-black text-white/50">{lever.replace(/_/g, ' ')}</Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-3">Supported Features</div>
                            <ul className="space-y-2">
                              {pillar.whatItSupports.map((feat, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs font-medium text-white/70">
                                  <CheckCircle2 className="w-3 h-3 text-indigo-500 mt-0.5 shrink-0" />
                                  {feat}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                        <div className="space-y-4">
                          <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400/60">Allowed Marketing Phrasing</div>
                          <div className="flex flex-wrap gap-2">
                            {pillar.allowedMarketingLanguage.map((phrase, i) => (
                              <div key={i} className="px-3 py-1 rounded-md bg-emerald-500/5 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                                {phrase}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="text-[10px] font-black uppercase tracking-widest text-rose-400/60">Restricted Medical Claims</div>
                          <div className="flex flex-wrap gap-2">
                            {pillar.disallowedMedicalClaims.map((phrase, i) => (
                              <div key={i} className="px-3 py-1 rounded-md bg-rose-500/5 border border-rose-500/20 text-[10px] font-bold text-rose-400 uppercase tracking-widest">
                                {phrase}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-6">
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-4">Scientific Citations</div>
                        <div className="grid gap-3">
                          {pillar.citations.map((cite, i) => (
                            <a key={i} href={cite.url} target="_blank" rel="noreferrer" className="flex items-center justify-between group p-4 rounded-xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all">
                              <span className="text-xs font-bold text-white/70 group-hover:text-white flex items-center gap-3">
                                <BookOpen className="w-4 h-4 text-indigo-400" />
                                {cite.label}
                              </span>
                              <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-indigo-400" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <section className="rounded-[32px] border border-white/10 bg-white/[0.02] p-8 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <Brain className="w-5 h-5 text-indigo-400" />
                <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400">Current Initiatives</h2>
              </div>
              <div className="space-y-4">
                {[
                  { title: "Neuro-Physics v2.0", desc: "Higher-fidelity motion damping for sensory-safe charting." },
                  { title: "Predictive Pacing", desc: "Adaptive refresh rates synced to cognitive load estimates." }
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-xs font-black uppercase tracking-widest text-indigo-300 mb-1">{item.title}</p>
                    <p className="text-[13px] text-white/50 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[32px] border border-white/10 bg-white/[0.02] p-8 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-5 h-5 text-orange-400" />
                <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-orange-400">Experimental Modes</h2>
              </div>
              <ul className="space-y-4">
                {[
                  "Tactile Feedback Integration for motor-assist profiles.",
                  "Context-Aware Noise Cancellation in market news feeds.",
                  "Stable Geometry rendering for reduced processing load."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="w-1 h-4 bg-orange-500 shadow-[0_0_10px_#f97316] shrink-0" />
                    <span className="text-[13px] font-medium leading-relaxed text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <footer className="mt-20 border-t border-white/10 pt-8 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
          <span>Diagnostic Lab v3.5</span>
          <span className="max-w-xs text-right">Research is guided by peer-reviewed evidence and conservative accessibility principles.</span>
        </footer>
      </main>
    </div>
  );
}
