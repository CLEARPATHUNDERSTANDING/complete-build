"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="landing-root">
      <iframe
        src="/quantum/index.html"
        className="bg-frame"
        title="Clear Path Background"
        aria-hidden="true"
      />

      <div className="bg-shade" />

      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-badge" />
          <div>
            <div className="brand-name">CLEAR PATH</div>
            <div className="brand-sub">Adaptive Market Intelligence</div>
          </div>
        </div>

        <nav className="top-actions">
          <Link href="/login" className="ghost-btn">
            Log In
          </Link>
          <Link href="/signup" className="primary-btn">
            Create Account
          </Link>
        </nav>
      </header>

      <section className="hero-shell">
        <div className="glass-card neon-fuchsia hero-left">
          <div className="eyebrow">Built for clarity</div>

          <h1 className="hero-title">
            Market intelligence designed to feel cleaner, faster, and easier to enter
          </h1>

          <p className="hero-copy">
            This homepage uses your animated quantum front layer as the visual surface,
            while your login, navigation, and launch widgets sit above it in a clean
            neon glass interface.
          </p>

          <div className="hero-cta-row">
            <Link href="/signup" className="primary-btn large">
              Start Free
            </Link>

            <Link href="/login" className="ghost-btn large">
              Member Login
            </Link>
          </div>

          <div className="bullet-grid">
            <div className="mini-stat">
              <span className="mini-label">Adaptive Interface</span>
              <strong>Neuro-aware visual structure</strong>
            </div>

            <div className="mini-stat">
              <span className="mini-label">Live Overlay</span>
              <strong>Login and widgets on top</strong>
            </div>

            <div className="mini-stat">
              <span className="mini-label">Deployment</span>
              <strong>Stable external front page</strong>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="glass-card neon-cyan login-card">
            <div className="card-kicker">Secure Access</div>
            <h2>Member Login</h2>

            <form className="login-form">
              <label>
                <span>Email</span>
                <input type="email" placeholder="name@example.com" />
              </label>

              <label>
                <span>Password</span>
                <input type="password" placeholder="Enter your password" />
              </label>

              <button type="button" className="primary-btn large full">
                Log In
              </button>

              <div className="form-links">
                <Link href="/forgot-password">Forgot password?</Link>
                <Link href="/signup">Create account</Link>
              </div>
            </form>
          </div>

          <div className="widget-grid">
            <div className="glass-card neon-green widget-card">
              <div className="widget-label">Market Pulse</div>
              <div className="widget-value">24 Active Feeds</div>
              <p>
                News, watchlists, scanners, dashboards, and intelligence surfaces
                can live here.
              </p>
            </div>

            <div className="glass-card neon-indigo widget-card">
              <div className="widget-label">Mode Engine</div>
              <div className="widget-value">Personalized Views</div>
              <p>
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
