'use client';

import React from "react";
import Link from "next/link";
import { ArrowLeft, Users, ShieldCheck, Radio, MessageSquare, Globe } from "lucide-react";
import GradientBurstWrap from "@/components/GradientBurstWrap";
import { Button } from "@/components/ui/button";

const spectralTitleClass = "bg-clip-text text-transparent bg-gradient-to-r from-[#00d4ff] via-[#6a5cff] via-[#ff4fd8] to-[#ff8a00] drop-shadow-[0_0_25px_rgba(106,92,255,0.6)] brightness-125";

function PersonalityCard({ title, description, icon: Icon, members }: { title: string, description: string, icon: any, members: string }) {
  return (
    <GradientBurstWrap>
      <div className="flex items-start justify-between mb-6">
        <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
          <Icon className="w-6 h-6 text-orange-400" />
        </div>
        <div className="text-right">
          <div className="text-[9px] font-black text-white/30 uppercase tracking-widest">Active Members</div>
          <div className="text-lg font-black text-white">{members}</div>
        </div>
      </div>

      <h3 className="gb-title text-xl uppercase tracking-wider text-white mb-2">{title} Media</h3>
      <p className="gb-muted text-sm leading-relaxed mb-8">{description}</p>

      <div className="space-y-3">
        <Button className="w-full bg-orange-500 hover:bg-orange-400 text-black font-black uppercase text-[10px] tracking-widest h-11 rounded-xl transition-all">
          Synchronize Community
        </Button>
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Live Feeds Active</span>
          </div>
          <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">v2.5.0</span>
        </div>
      </div>
    </GradientBurstWrap>
  );
}

export default function PersonalitiesPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500 font-body">
      <header className="h-56 border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-50 px-10 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/community" className="flex items-center gap-3 text-[14px] font-black tracking-[0.25em] text-orange-400 uppercase hover:text-orange-300 transition-colors">
            <ArrowLeft className="w-6 h-6" />
            Workspace Hub
          </Link>
          <div className="h-12 w-px bg-white/10" />
          <div className="flex items-center gap-6">
            <div className="relative group">
              <img 
                src="https://i.postimg.cc/3NZqktNh/Chat-GPT-Image-Feb-26-2026-02-20-36-PM.png"
                alt="Clear Path Logo"
                className="w-32 h-32 rounded-2xl object-cover border-2 border-orange-500/40 shadow-[0_0_40px_rgba(255,136,0,0.8)] brightness-125 saturate-150 transition-all duration-500 group-hover:scale-110"
              />
              <span className="absolute bottom-1.5 right-1.5 text-[8px] font-bold text-white shadow-black select-none">©™</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-[24px] font-black tracking-[0.3em] uppercase leading-none ${spectralTitleClass}`}>Network Hub</span>
              <span className="text-[18px] font-bold tracking-[0.1em] text-white/40 uppercase">Identity Alignment</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ShieldCheck className="w-5 h-5 text-green-500 opacity-50" />
          <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">
            Encrypted Data Layer: ACTIVE
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-20 px-10">
        <div className="mb-16">
          <h1 className={`text-5xl font-black uppercase tracking-tighter mb-6 ${spectralTitleClass}`}>
            Political Network intelligence
          </h1>
          <p className="max-w-2xl text-lg text-white/60 leading-relaxed font-medium italic border-l-2 border-orange-500 pl-8">
            Access synchronized media streams and community diagnostic data filtered by ideological alignment. 
            Stable, distraction-free feeds for high-intensity observation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <PersonalityCard 
            title="Republican" 
            description="Live news, conservative intelligence communities, and traditional media feeds."
            icon={Radio}
            members="42.8K"
          />
          <PersonalityCard 
            title="Democrat" 
            description="Live news, progressive intelligence communities, and digital media streams."
            icon={Globe}
            members="39.2K"
          />
          <PersonalityCard 
            title="Independent" 
            description="Centrist news aggregators, neutral intelligence hubs, and cross-asset flow."
            icon={Users}
            members="12.5K"
          />
          <PersonalityCard 
            title="Liberal" 
            description="Reform-focused intelligence feeds, liberal communities, and globalist data layers."
            icon={MessageSquare}
            members="28.9K"
          />
        </div>
      </main>

      <footer className="py-16 border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-10 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
          <span>Alignment-Protocol v1.0.0</span>
          <span>© 2026 AFTER PATENT • Universal Political Interface</span>
        </div>
      </footer>
    </div>
  );
}
