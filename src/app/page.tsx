"use client";

import Link from "next/link";

const HERO_IMAGE =
  "https://i.postimg.cc/3xxDchys/photo-2026-03-03-13-43-28.jpg";

export default function HomePage() {
  return (
    <main className="landing-root bg-black min-h-screen">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-logo-frame opacity-60">
            <img src={HERO_IMAGE} alt="Clear Path Logo" className="brand-logo-image" />
          </div>

          <div>
            <div className="brand-name text-white">CLEAR PATH</div>
            <div className="brand-sub">Adaptive Market Intelligence</div>
          </div>
        </div>

        <nav className="top-actions">
          <Link href="/login" className="ghost-btn">
            Log In
          </Link>
          <Link href="/login" className="primary-btn">
            Create Account
          </Link>
        </nav>
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
              Start Free
            </Link>

            <Link href="/login" className="ghost-btn large">
              Member Login
            </Link>
          </div>

          <div className="bullet-grid">
            <div className="mini-stat">
              <span className="mini-label">Diagnostic Logic</span>
              <strong>fire pink visual structure</strong>
            </div>

            <div className="mini-stat">
              <span className="mini-label">Live Overlay</span>
              <strong>Login and widgets on top</strong>
            </div>

            <div className="mini-stat">
              <span className="mini-label">Stability</span>
              <strong>Stable public front page</strong>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-image-card">
            <img src={HERO_IMAGE} alt="Clear Path Hero" className="hero-image" />
            <div className="hero-image-glow" />
          </div>

          <div className="glass-card neon-cyan login-card">
            <div className="card-kicker">Secure Access</div>
            <h2 className="text-white">Member Login</h2>

            <form className="login-form">
              <label>
                <span className="text-white/60">Email</span>
                <input type="email" placeholder="name@example.com" className="bg-white/5 border-white/10" />
              </label>

              <label>
                <span className="text-white/60">Password</span>
                <input type="password" placeholder="Enter your password" className="bg-white/5 border-white/10" />
              </label>

              <button type="button" className="primary-btn large full">
                Log In
              </button>

              <div className="form-links">
                <Link href="/login" className="text-white/40 hover:text-white">Forgot password?</Link>
                <Link href="/login" className="text-white/40 hover:text-white">Create account</Link>
              </div>
            </form>
          </div>

          <div className="widget-grid">
            <div className="glass-card neon-green widget-card">
              <div className="widget-label">Market Pulse</div>
              <div className="widget-value text-white">24 Active Feeds</div>
              <p className="text-white/60">
                News, watchlists, scanners, dashboards, and intelligence surfaces
                can live here.
              </p>
            </div>

            <div className="glass-card neon-indigo widget-card">
              <div className="widget-label">Mode Engine</div>
              <div className="widget-value text-white">Personalized Views</div>
              <p className="text-white/60">
                Different user types and front-end experiences can be routed from
                this home layer.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
