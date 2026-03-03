
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFirebase } from "@/firebase/provider";
import { initiateEmailSignIn } from "@/firebase/non-blocking-login";
import { errorEmitter } from "@/firebase/error-emitter";
import { useToast } from "@/hooks/use-toast";

export default function HomePage() {
  const router = useRouter();
  const { auth, user, isUserLoading } = useFirebase();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect to social hub if already logged in
  useEffect(() => {
    if (user && !isUserLoading) {
      router.push("/community"); 
    }
  }, [user, isUserLoading, router]);

  // Listen for auth errors
  useEffect(() => {
    const handleAuthError = (error: any) => {
      toast({
        variant: "destructive",
        title: "Security Protocol Failure",
        description: error.message || "Failed to synchronize with the Intelligence Hub.",
      });
    };

    errorEmitter.on('auth-error', handleAuthError);
    return () => errorEmitter.off('auth-error', handleAuthError);
  }, [toast]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Missing Credentials",
        description: "Please provide a valid network identifier and access key.",
      });
      return;
    }

    initiateEmailSignIn(auth, email, password);
    toast({
      title: "Synchronizing Data",
      description: "Establishing a secure link to the Intelligence Hub...",
    });
  };

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
          <div className="relative">
            <img
              src="https://i.postimg.cc/3NZqktNh/Chat-GPT-Image-Feb-26-2026-02-20-36-PM.png"
              alt="Clear Path Logo"
              className="brand-logo-image opacity-60"
            />
            <span className="absolute bottom-1 right-1 text-[8px] font-bold text-white/60 select-none">©™</span>
          </div>
          <div>
            <div className="brand-name text-white">CLEAR PATH</div>
            <div className="brand-sub">Adaptive Market Intelligence</div>
          </div>
        </div>
      </header>

      <section className="hero-shell">
        <div className="glass-card neon-fuchsia hero-left">
          <div className="relative inline-block mb-4">
            <img
              src="https://i.postimg.cc/3NZqktNh/Chat-GPT-Image-Feb-26-2026-02-20-36-PM.png"
              alt="Clear Path Hero Logo"
              className="hero-top-image opacity-60"
            />
            <span className="absolute bottom-3 right-3 text-[10px] font-bold text-white/60 select-none">©™</span>
          </div>

          <div className="eyebrow">Built for clarity</div>

          <h1 className="hero-title text-white font-black uppercase">
            Market intelligence designed to feel cleaner
          </h1>

          <p className="hero-copy">
            Professional diagnostic workspace utilizing an interactive quantum 
            truth layer for high-fidelity market investigation.
          </p>

          <div className="hero-cta-row">
            <Link href="/login" className="primary-btn large">
              Synchronize Profile
            </Link>
            <Link href="/login" className="ghost-btn large">
              Explore Network
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
            <h2 className="text-white">Member Login</h2>

            <form className="login-form" onSubmit={handleLogin}>
              <label>
                <span className="text-white/60">Email</span>
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>

              <label>
                <span className="text-white/60">Password</span>
                <input 
                  type="password" 
                  placeholder="Enter your password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>

              <button type="submit" className="primary-btn large full">
                Synchronize Session
              </button>

              <div className="form-links">
                <Link href="/login">Recover Key</Link>
                <Link href="/login">Create Identity</Link>
              </div>
            </form>
          </div>

          <div className="widget-grid">
            <div className="glass-card neon-green widget-card">
              <div className="widget-label">Market Pulse</div>
              <div className="widget-value text-white">24 Active Feeds</div>
              <p>
                News, watchlists, scanners, dashboards, and intelligence surfaces
                live within the network layer.
              </p>
            </div>

            <div className="glass-card neon-indigo widget-card">
              <div className="widget-label">Mode Engine</div>
              <div className="widget-value text-white">Adaptive Views</div>
              <p>
                Personalized diagnostic experiences are authorized via your unique 
                diagnostic profile.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
