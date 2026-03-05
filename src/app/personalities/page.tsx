'use client';

import React from "react";
import Link from "next/link";
import { ArrowLeft, Brain, ShieldCheck, Zap, Sparkles, Activity, Eye, ZapOff } from "lucide-react";
import GradientBurstWrap from "@/components/GradientBurstWrap";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NEURO_PROFILES, type NeuroProfile } from "@/lib/neuro/profiles";

const spectralTitleClass = "bg-clip-text text-transparent bg-gradient-to-r from-[#00d4ff] via-[#6a5cff] via-[#ff4fd8] to-[#ff8a00] drop-shadow-[0_0_25px_rgba(106,92,255,0.6)] brightness-125";

function ProfileCard({ profile }: { profile: NeuroProfile }) {
  const p = profile.personality;
  
  // Custom burst colors based on the profile's personality
  const burstStyle = {
    background: `linear-gradient(90deg, ${p.borderA}, ${p.borderB})`
  };

  return (
    <GradientBurstWrap style={burstStyle}>
      <div className="flex items-start justify-between mb-6">
        <div className="p-3 rounded-xl border border-white/10 bg-white/5 shadow-2xl" style={{ color: p.borderA }}>
          <Brain className="w-6 h-6" />
        </div>
        <div className="text-right">
          <div className="text-[9px] font-black text-white/30 uppercase tracking-widest">Diagnostic Tag</div>
          <div className="text-xs font-black text-white uppercase tracking-tighter">{profile.id.replaceAll('_', ' ')}</div>
        </div>
      </div>

      <h3 className="gb-title text-xl uppercase tracking-wider text-white mb-2">{profile.label}</h3>
      <p className="gb-muted text-sm leading-relaxed mb-6 italic">{profile.tagline}</p>

      <div className="mb-8 space-y-4">
        <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] flex items-center gap-2 border-b border-white/5 pb-2">
          <ShieldCheck className="w-3 h-3 text-indigo-400" /> Physics Calibration
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-[8px] font-black text-white/30 uppercase">Glow Factor</div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-3 h-3" style={{ color: p.borderA }} />
              <span className="text-[10px] font-bold text-white/80">{p.glow}</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-[8px] font-black text-white/30 uppercase">Data Density</div>
            <div className="flex items-center gap-2">
              <Activity className="w-3 h-3" style={{ color: p.upColor }} />
              <span className="text-[10px] font-bold text-white/80">{p.dataDensity}</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-[8px] font-black text-white/30 uppercase">View Spacing</div>
            <div className="flex items-center gap-2">
              <Eye className="w-3 h-3 text-indigo-400" />
              <span className="text-[10px] font-bold text-white/80">{p.spacing}</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-[8px] font-black text-white/30 uppercase">Sync Speed</div>
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-orange-400" />
              <span className="text-[10px] font-bold text-white/80">{p.glow === 'High' ? 'Instant' : 'Stable'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Link href={`/dashboard?mode=focus&profile=${profile.id}`}>
          <Button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black uppercase text-[10px] tracking-widest h-11 rounded-xl transition-all shadow-2xl">
            Synchronize Profile
          </Button>
        </Link>
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]" />
            <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Calibration: Ready</span>
          </div>
          <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">v1.5.0</span>
        </div>
      </div>
    </GradientBurstWrap>
  );
}

export default function PersonalitiesPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500 font-body">
      <header className="h-56 border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-50 px-10 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/community" className="flex items-center gap-3 text-[14px] font-black tracking-[0.25em] text-indigo-400 uppercase hover:text-indigo-300 transition-colors">
            <ArrowLeft className="w-6 h-6" />
            Workspace Hub
          </Link>
          <div className="h-12 w-px bg-white/10" />
          <div className="flex items-center gap-6">
            <div className="relative group">
              <img 
                src="https://i.postimg.cc/3NZqktNh/Chat-GPT-Image-Feb-26-2026-02-20-36-PM.png"
                alt="Clear Path Logo"
                className="w-32 h-32 rounded-2xl object-cover border-2 border-orange-500/40 shadow-[0_0_60px_rgba(255,136,0,0.8)] brightness-125 saturate-150 transition-all duration-500 group-hover:scale-110"
              />
              <span className="absolute bottom-1.5 right-1.5 text-[8px] font-bold text-white shadow-black select-none">©™</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-[24px] font-black tracking-[0.3em] uppercase leading-none ${spectralTitleClass}`}>Identity Hub</span>
              <span className="text-[18px] font-bold tracking-[0.1em] text-white/40 uppercase">Neuro-Physics Profiles</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ShieldCheck className="w-5 h-5 text-indigo-500 opacity-50 shadow-[0_0_15px_rgba(99,102,241,0.3)]" />
          <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">
            Diagnostic Layer: ACTIVE
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-20 px-10">
        <div className="mb-16">
          <h1 className={`text-5xl font-black uppercase tracking-tighter mb-6 ${spectralTitleClass}`}>
            Adaptive Personalities
          </h1>
          <p className="max-w-2xl text-lg text-white/60 leading-relaxed font-medium italic border-l-2 border-indigo-500 pl-8">
            Access specialized neuro-divergent profiles calibrated for high-clarity market analysis. 
            Each profile adjusts the visual physics of the chart terminal to reduce interface-driven strain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {NEURO_PROFILES.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </main>

      <footer className="py-16 border-t border-white/10 mt-20 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-10 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
          <span>Neuro-Protocol v1.5.0 • 16 Clinical Profiles</span>
          <span>© 2026 AFTER PATENT • Universal Neuro-Trading Interface</span>
        </div>
      </footer>
    </div>
  );
}
