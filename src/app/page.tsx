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
          <div className="flex flex-col">
            <span className="brand-name">CLEAR PATH</span>
            <span className="brand-sub">Adaptive Market Intelligence</span>
          </div>
        </div>
      </header>

      <section className="hero-shell">
        <div className="hero-right">
          <div className="glass-card neon-cyan login-card">
            <div className="card-kicker">Secure Access</div>
            <h2>Member Login</h2>

            <form className="login-form">
              <label>
                <span>Network Identifier</span>
                <input type="email" placeholder="name@example.com" />
              </label>

              <label>
                <span>Access Key</span>
                <input type="password" placeholder="Enter password" />
              </label>

              <button type="button" className="primary-btn">
                Synchronize Session
              </button>

              <div className="form-links">
                <Link href="/forgot-password">Recover Key</Link>
                <Link href="/signup">Create Identity</Link>
              </div>
            </form>
          </div>

          <div className="widget-grid">
            <div className="glass-card neon-green widget-card">
              <div className="widget-label">Market Pulse</div>
              <div className="widget-value">24 Feeds</div>
              <p>
                Live intelligence stream synchronized across network nodes.
              </p>
            </div>

            <div className="glass-card neon-indigo widget-card">
              <div className="widget-label">Mode Engine</div>
              <div className="widget-value">Adaptive</div>
              <p>
                Personalized diagnostic views for neuro-aware analysis.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}