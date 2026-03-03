import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "Platform Constitution | Clear Path Understanding",
  description:
    "The guiding principles, boundaries, and governance rules that keep the platform stable, safe, and trustworthy.",
};

type Section = {
  id: string;
  title: string;
  body: Array<string | { subtitle: string; bullets: string[] }>;
};

const CONSTITUTION = {
  title: "Platform Constitution",
  version: "v1.0",
  lastUpdated: "2026-02-27",
  preamble:
    "This constitution defines how the platform behaves, what it will not do, and how changes are approved. It exists to prevent regressions, reduce chaos during updates, and protect users.",
  sections: [
    {
      id: "mission",
      title: "1) Mission",
      body: [
        "We build an informational, user-directed platform that supports clarity, learning, and personal decision-making without acting as a broker, adviser, or financial intermediary.",
        {
          subtitle: "Non-negotiables",
          bullets: [
            "No execution, brokerage, custody, or direct trade placement.",
            "No personalized financial advice; informational and educational framing only.",
            "We prioritize stability, transparency, and user safety over speed of change.",
          ],
        },
      ],
    },
    {
      id: "scope",
      title: "2) Scope & Boundaries",
      body: [
        "The platform must remain within clearly defined product boundaries to avoid role confusion and reduce legal and safety risk.",
        {
          subtitle: "We do",
          bullets: [
            "Provide educational tools, dashboards, and informational views.",
            "Offer user-controlled settings and personalization for accessibility and learning.",
            "Surface public or licensed data sources with clear attribution when applicable.",
          ],
        },
        {
          subtitle: "We do not",
          bullets: [
            "Impersonate regulated services or promise outcomes.",
            "Store sensitive secrets in client code.",
            "Use dark patterns, coercive UX, or deceptive claims.",
          ],
        },
      ],
    },
    {
      id: "stability",
      title: "3) Stability & Build Integrity",
      body: [
        "Stability is a first-class feature. We avoid recurring crash loops by enforcing predictable file conventions and minimizing magical auto-generation.",
        {
          subtitle: "Build rules",
          bullets: [
            "One routing edge mechanism: use proxy.ts OR middleware.ts—never both.",
            "No auto-regenerated files that overwrite hand-edits without explicit approval.",
            "All build-critical changes must be reversible (backups, clean diffs, or scripted rollback).",
          ],
        },
        {
          subtitle: "Operational principles",
          bullets: [
            "Prefer small, isolated changes with clear owners.",
            "Keep deterministic dev scripts (no duplicate port flags, no hidden generators).",
            "Make cleanup and recovery scripts safe-by-default (dry-run first).",
          ],
        },
      ],
    },
    {
      id: "security",
      title: "4) Security",
      body: [
        "Security is enforced by design, not by hope.",
        {
          subtitle: "Minimum standards",
          bullets: [
            "Server-only secrets stay server-only (never exposed via NEXT_PUBLIC).",
            "Auth/authorization is enforced on the server for protected operations.",
            "Audit sensitive operations and maintain clear incident logging pathways.",
          ],
        },
        {
          subtitle: "User safety defaults",
          bullets: [
            "Fail safe: if uncertain, degrade gracefully or disable the risky action.",
            "No silent privilege escalation or hidden admin controls.",
          ],
        },
      ],
    },
    {
      id: "privacy",
      title: "5) Privacy & Data Handling",
      body: [
        "We minimize data collection and store only what is necessary for functionality.",
        {
          subtitle: "Commitments",
          bullets: [
            "Collect the minimum data required for product function.",
            "Explain data usage in plain language.",
            "Provide clear deletion/export paths where feasible.",
          ],
        },
      ],
    },
    {
      id: "accessibility",
      title: "6) Accessibility & Neuroinclusive Design",
      body: [
        "The platform is designed to reduce cognitive load and support diverse needs.",
        {
          subtitle: "Design commitments",
          bullets: [
            "Readable typography, predictable layout, low surprise navigation.",
            "Avoid flashing/rapid animations by default; respect reduced motion preferences.",
            "Offer calm-mode / simplified UI where possible.",
          ],
        },
      ],
    },
    {
      id: "ai",
      title: "7) AI Usage Rules",
      body: [
        "AI must not silently overwrite user work or force irreversible changes.",
        {
          subtitle: "AI guardrails",
          bullets: [
            "AI suggestions are opt-in; no auto-apply without explicit user action.",
            "AI must not fabricate deployment claims or imply actions occurred when they did not.",
            "AI changes must be reviewable (diffs) and reversible (rollback/backup).",
          ],
        },
      ],
    },
    {
      id: "governance",
      title: "8) Governance & Change Control",
      body: [
        "We prevent chaos by defining who can change what, and how changes are approved.",
        {
          subtitle: "Change tiers",
          bullets: [
            "Tier 1 (Content): copy/wording changes; low risk.",
            "Tier 2 (UI/Routes): navigation, layouts, routing; medium risk.",
            "Tier 3 (Auth/Data/Infra): security, build scripts, deployment config; high risk.",
          ],
        },
        {
          subtitle: "Approval rules",
          bullets: [
            "Tier 3 requires explicit review + rollback plan.",
            "Any change that affects boot/dev server must be tested with a clean start.",
          ],
        },
      ],
    },
    {
      id: "amendments",
      title: "9) Amendments",
      body: [
        "This constitution changes only by explicit amendment and version bump.",
        {
          subtitle: "Amendment process",
          bullets: [
            "Propose the amendment with rationale + risk assessment.",
            "List affected files and rollback plan.",
            "Update version + lastUpdated.",
          ],
        },
      ],
    },
  ] as Section[],
};

export default function PlatformConstitutionPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <header className="h-20 border-b border-white/10 bg-black flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-8">
           <Link href="/" className="flex items-center gap-2 text-[10px] font-black tracking-[0.25em] text-indigo-400 uppercase hover:text-indigo-300 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Social Hub
           </Link>
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
             </div>
             <div className="flex flex-col text-left">
                <span className="text-[12px] font-black tracking-[0.2em] text-white uppercase leading-none">Platform</span>
                <span className="text-[10px] font-bold tracking-[0.1em] text-white/40 uppercase">Intelligence</span>
             </div>
           </div>
        </div>
        <div className="text-[10px] font-black tracking-widest text-white/40 uppercase">
          Build Integrity: v1.0.0
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-8 py-16 text-white/90">
        <header className="space-y-6 mb-16">
          <h1 className="text-5xl font-black uppercase tracking-[0.1em] text-white">{CONSTITUTION.title}</h1>
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
              Version {CONSTITUTION.version}
            </div>
            <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
              Last updated {CONSTITUTION.lastUpdated}
            </div>
          </div>
          <p className="text-xl leading-relaxed text-white/60 font-medium italic border-l-2 border-indigo-500 pl-6">
            {CONSTITUTION.preamble}
          </p>
        </header>

        <section className="mb-16 p-[2px] rounded-[24px] bg-gradient-to-br from-[#ff003c] via-[#ff8a00] to-[#ff00d4] shadow-2xl">
          <div className="bg-[#070b16] rounded-[22px] p-8">
            <h2 className="text-[12px] font-black uppercase tracking-[0.3em] text-white/40 mb-6 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]" />
              Index of Principles
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {CONSTITUTION.sections.map((s) => (
                <li key={s.id}>
                  <a className="text-[13px] font-black uppercase tracking-widest text-white/80 hover:text-indigo-400 transition-colors flex items-center justify-between group" href={`#${s.id}`}>
                    <span>{s.title}</span>
                    <span className="text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="space-y-24">
          {CONSTITUTION.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-32">
              <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-8 border-b border-white/10 pb-4">{section.title}</h2>
              <div className="space-y-8 text-base leading-relaxed text-white/70">
                {section.body.map((chunk, idx) => {
                  if (typeof chunk === "string") {
                    return <p key={idx} className="font-medium leading-8">{chunk}</p>;
                  }
                  return (
                    <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 space-y-6">
                      <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400">{chunk.subtitle}</h3>
                      <ul className="space-y-4">
                        {chunk.bullets.map((b, bi) => (
                          <li key={bi} className="flex items-start gap-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-2.5 shrink-0" />
                            <span className="text-[15px] font-medium leading-relaxed">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-32 border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="max-w-md">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-4">Conflict Resolution</div>
            <p className="text-sm font-medium text-white/40 leading-relaxed">
              If something conflicts with this constitution, the constitution wins until amended.
              The stability of the build environment is our highest priority.
            </p>
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">
            ClearPath Intelligence Layer • Security v1.0
          </div>
        </footer>
      </main>
    </div>
  );
}
