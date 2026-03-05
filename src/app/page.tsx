"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Activity } from "lucide-react";

export default function HomePage() {
  return (
    <main className="landing-root bg-black min-h-screen">
      <header className="topbar">
        <div className="brand-wrap">
          <div>
            <div className="brand-name text-white">CLEAR PATH</div>
            <div className="brand-sub">Adaptive Market Intelligence</div>
          </div>
        </div>
      </header>

      <section className="hero-shell">
        <div className="hero-left">
          <div className="eyebrow">Built for clarity</div>

          <h1 className="hero-title text-white">
            Market intelligence designed to feel cleaner, faster, and easier to enter
          </h1>

          <p className="hero-copy">
            Your interactive intelligence layer sits above a solid, distraction-free foundation 
            with sharp neon styling and high-fidelity diagnostic anchors.
          </p>

          <div className="hero-cta-row">
            <Link href="/login" className="primary-btn large">
              Get Started Free
            </Link>

            <Link href="/login" className="ghost-btn large">
              Member Portal
            </Link>
          </div>

          <div className="bullet-grid mt-12">
            <div className="mini-stat">
              <span className="mini-label neon-indigo-text font-black">Adaptive Interface</span>
              <strong className="neon-fuchsia-text">Neuro-aware visual structure</strong>
            </div>

            <div className="mini-stat">
              <span className="mini-label neon-indigo-text font-black">Live Overlay</span>
              <strong className="neon-fuchsia-text">Login and widgets on top</strong>
            </div>

            <div className="mini-stat">
              <span className="mini-label neon-indigo-text font-black">Deployment</span>
              <strong className="neon-fuchsia-text">Stable public front page</strong>
            </div>
          </div>
        </div>

        <div className="hero-right">
          {/* Replaced redundant login form with high-fidelity branding CTA */}
          <div className="glass-card neon-cyan login-card">
            <div className="card-kicker">Identity Protocol</div>
            <h2 className="text-white mb-6">Secure Intelligence Access</h2>
            
            <p className="text-white/60 mb-8 leading-relaxed">
              Initialize your diagnostic profile to synchronize with global market truth layers and neuro-adaptive workspaces.
            </p>

            <Link href="/login" className="primary-btn large full group">
              Synchronize Session <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3 text-white/20">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest">Encrypted Data Truth Layer Active</span>
            </div>
          </div>

          <div className="widget-grid">
            <div className="glass-card neon-green widget-card">
              <div className="widget-label flex items-center gap-2">
                <Activity className="w-3 h-3" /> Market Pulse
              </div>
              <div className="widget-value text-white">24 Active Feeds</div>
              <p className="text-white/60">
                Universal asset monitoring through high-fidelity diagnostic snapshots.
              </p>
            </div>

            <div className="glass-card neon-indigo widget-card">
              <div className="widget-label flex items-center gap-2">
                <Zap className="w-3 h-3" /> Mode Engine
              </div>
              <div className="widget-value text-white">Neuro-Adaptive</div>
              <p className="text-white/60">
                16 medical-consultant-approved profiles for cognitive clarity.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
