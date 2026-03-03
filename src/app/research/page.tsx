import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Activity, Zap, BookOpen, Microscope, ExternalLink, ShieldCheck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "On-Going Research | Clear Path Intelligence",
  description:
    "Active research initiatives: neuro-physics calibration, clinical rationale, and high-focus UI testing.",
};

const RATIONALE_SECTIONS = [
  {
    title: "1. Arousal & Threat Perception (Red Restriction)",
    content: "In affective science, red is repeatedly associated with heightened arousal and threat appraisal. In financial environments, this can amplify 'urgency bias'. Modes intended for stability avoid high-saturation reds, substituting muted warm tones to reduce threat-response cycles.",
    citations: ["Elliot & Maier (2007)", "Hill & Barton (2005)"]
  },
  {
    title: "2. Color Bias & Calming Affect",
    content: "Blue and green hues are consistently associated with lower autonomic arousal in environmental research. Calmer modes utilize these palettes with reduced saturation to lower perceptual load and avoid sensory overstimulation.",
    citations: ["Valdez & Mehrabian (1994)", "Kaya & Epps (2004)"]
  },
  {
    title: "3. ADHD & Optimal Stimulation",
    content: "ADHD is associated with under-arousal dynamics where increased salience can improve engagement. We use high-salience candles with strict guardrails: minimal competing elements and controlled motion to prevent overstimulation backfire.",
    citations: ["Zentall & Zentall (1983)", "Sergeant (2000)"]
  },
  {
    title: "4. Cognitive Load & Memory Limits",
    content: "Human working memory is limited. Simultaneous high-velocity information streams degrade decision quality. Profiles enforce strict chart limits and reduce concurrent stimuli to preserve executive function resources.",
    citations: ["Sweller (1988)", "Kahneman (2011)"]
  },
  {
    title: "5. Photic Safety & Flicker Control",
    content: "Flicker can provoke adverse responses in photosensitive individuals and aggravate sensory discomfort. We prohibit strobing, rapid flashing alerts, and high-frequency visual transients system-wide.",
    citations: ["W3C WCAG 2.2 Guidance", "Harding FPA Standards"]
  },
  {
    title: "6. Visual Crowding & Dyslexia Relief",
    content: "Visual crowding can make pattern decoding harder. Increasing spacing, simplifying backgrounds, and improving figure-ground separation reduces ocular strain and decoding difficulty for dyslexia and visual processing differences.",
    citations: ["Wilkins (1995)", "British Dyslexia Association Guide"]
  },
  {
    title: "7. Numeric Strain & Dyscalculia",
    content: "Numeric processing difficulties are exacerbated by dense tables and excessive decimals. Using relative descriptors, reduced precision, and visual shape-coding reduces magnitude comparison strain.",
    citations: ["Butterworth (2004)", "APA Dyscalculia Resources"]
  }
];

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
            Clear Path Intelligence is dedicated to reducing cognitive noise and improving decision clarity through 
            evidence-informed UI physics and sensory exposure controls.
          </p>
        </div>

        <div className="grid gap-12">
          {/* Clinical Rationale Section */}
          <section className="space-y-8">
            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <Microscope className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-black uppercase tracking-wider">Clinical Rationale</h2>
                <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400/60">Evidence-Informed Design</div>
              </div>
            </div>

            <div className="bg-rose-500/5 border border-rose-500/20 p-6 rounded-2xl flex items-start gap-4 mb-8">
              <ShieldCheck className="w-5 h-5 text-rose-400 mt-1 shrink-0" />
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-rose-400 mb-1">Non-Medical Claim Boundary</h4>
                <p className="text-[13px] text-white/60 leading-relaxed font-medium">
                  Clear Path’s color and animation decisions are UX-level cognitive load and sensory exposure controls, not medical treatment. 
                  The rationale draws on evidence from cognitive load theory, threat perception research, and accessibility standards.
                </p>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {RATIONALE_SECTIONS.map((section, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border border-white/10 bg-white/[0.02] rounded-2xl px-6">
                  <AccordionTrigger className="hover:no-underline py-6">
                    <span className="text-sm font-black uppercase tracking-widest text-left text-indigo-300">{section.title}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <p className="text-[15px] leading-relaxed text-white/70 mb-4">{section.content}</p>
                    <div className="flex flex-wrap gap-3">
                      {section.citations.map((cite, cIdx) => (
                        <div key={cIdx} className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                          <BookOpen className="w-3 h-3" /> {cite}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 space-y-6">
              <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400">Current Initiatives</h2>
              <div className="space-y-4">
                {[
                  { title: "Neuro-Physics v2.0", desc: "Higher-fidelity motion damping for sensory-safe charting." },
                  { title: "Predictive Pacing", desc: "Adaptive refresh rates synced to cognitive load estimates." }
                ].map((item, i) => (
                  <div key={i}>
                    <p className="text-xs font-black uppercase tracking-widest text-indigo-300 mb-1">{item.title}</p>
                    <p className="text-[13px] text-white/50 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 space-y-6">
              <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-orange-400">Experimental Modes</h2>
              <ul className="space-y-4">
                {[
                  "Tactile Feedback Integration for motor-assist profiles.",
                  "Context-Aware Noise Cancellation in market news feeds.",
                  "Stable Geometry rendering for reduced processing load."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-orange-500 mt-2 shrink-0" />
                    <span className="text-[13px] font-medium leading-relaxed text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <footer className="mt-20 border-t border-white/10 pt-8 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
          <span>Diagnostic Lab v3.5</span>
          <span className="max-w-xs text-right">Research is guided by peer-reviewed evidence and conservative UX principles.</span>
        </footer>
      </main>
    </div>
  );
}
