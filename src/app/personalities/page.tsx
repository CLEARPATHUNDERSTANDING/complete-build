'use client';

import React from "react";
import Link from "next/link";
import { ArrowLeft, Users, ShieldCheck, Radio, MessageSquare, Globe, ExternalLink, Newspaper } from "lucide-react";
import GradientBurstWrap from "@/components/GradientBurstWrap";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const spectralTitleClass = "bg-clip-text text-transparent bg-gradient-to-r from-[#00d4ff] via-[#6a5cff] via-[#ff4fd8] to-[#ff8a00] drop-shadow-[0_0_25px_rgba(106,92,255,0.6)] brightness-125";

interface MediaLink {
  name: string;
  url: string;
  type: string;
}

const REPUBLICAN_LINKS: MediaLink[] = [
  { "name": "Fox News", "url": "https://www.foxnews.com", "type": "news" },
  { "name": "Fox Business", "url": "https://www.foxbusiness.com", "type": "finance" },
  { "name": "Wall Street Journal", "url": "https://www.wsj.com", "type": "finance" },
  { "name": "Daily Wire", "url": "https://www.dailywire.com", "type": "news" },
  { "name": "Breitbart", "url": "https://www.breitbart.com", "type": "news" },
  { "name": "Newsmax", "url": "https://www.newsmax.com", "type": "news" },
  { "name": "The Federalist", "url": "https://thefederalist.com", "type": "news" },
  { "name": "National Review", "url": "https://www.nationalreview.com", "type": "news" },
  { "name": "Washington Examiner", "url": "https://www.washingtonexaminer.com", "type": "news" },
  { "name": "Townhall", "url": "https://townhall.com", "type": "news" },
  { "name": "RealClearPolitics", "url": "https://www.realclearpolitics.com", "type": "politics" },
  { "name": "Rumble", "url": "https://rumble.com", "type": "social" },
  { "name": "Truth Social", "url": "https://truthsocial.com", "type": "social" },
  { "name": "Free Republic", "url": "https://freerepublic.com", "type": "community" },
  { "name": "Barstool Sports", "url": "https://www.barstoolsports.com", "type": "sports" },
  { "name": "DraftKings", "url": "https://www.draftkings.com", "type": "betting" },
  { "name": "Black Rifle Coffee", "url": "https://www.blackriflecoffee.com", "type": "shopping" },
  { "name": "Grunt Style", "url": "https://www.gruntstyle.com", "type": "shopping" },
  { "name": "Nine Line Apparel", "url": "https://www.ninelineapparel.com", "type": "shopping" },
  { "name": "Seeking Alpha", "url": "https://seekingalpha.com", "type": "finance" }
];

const DEMOCRAT_LINKS: MediaLink[] = [
  { "name": "New York Times", "url": "https://www.nytimes.com", "type": "news" },
  { "name": "Washington Post", "url": "https://www.washingtonpost.com", "type": "news" },
  { "name": "CNN", "url": "https://www.cnn.com", "type": "news" },
  { "name": "MSNBC", "url": "https://www.msnbc.com", "type": "news" },
  { "name": "NPR", "url": "https://www.npr.org", "type": "news" },
  { "name": "Politico", "url": "https://www.politico.com", "type": "politics" },
  { "name": "Axios", "url": "https://www.axios.com", "type": "news" },
  { "name": "Vox", "url": "https://www.vox.com", "type": "news" },
  { "name": "ProPublica", "url": "https://www.propublica.org", "type": "investigative" },
  { "name": "Guardian US", "url": "https://www.theguardian.com/us", "type": "news" },
  { "name": "HuffPost", "url": "https://www.huffpost.com", "type": "news" },
  { "name": "Daily Kos", "url": "https://www.dailykos.com", "type": "community" },
  { "name": "Reddit Politics", "url": "https://www.reddit.com/r/politics", "type": "community" },
  { "name": "YouTube", "url": "https://youtube.com", "type": "social" },
  { "name": "Twitter/X", "url": "https://twitter.com", "type": "social" },
  { "name": "TikTok", "url": "https://tiktok.com", "type": "social" },
  { "name": "Bloomberg", "url": "https://www.bloomberg.com", "type": "finance" },
  { "name": "Yahoo Finance", "url": "https://finance.yahoo.com", "type": "finance" },
  { "name": "MarketWatch", "url": "https://www.marketwatch.com", "type": "finance" },
  { "name": "Etsy", "url": "https://www.etsy.com", "type": "shopping" }
];

function PersonalityCard({ 
  title, 
  description, 
  icon: Icon, 
  members, 
  links = [],
  theme = "orange"
}: { 
  title: string, 
  description: string, 
  icon: any, 
  members: string,
  links?: MediaLink[],
  theme?: "orange" | "blue"
}) {
  const isBlue = theme === "blue";
  
  return (
    <GradientBurstWrap style={isBlue ? { background: 'linear-gradient(90deg, #00d4ff, #6a5cff)' } : undefined}>
      <div className="flex items-start justify-between mb-6">
        <div className={cn(
          "p-3 rounded-xl border shadow-[0_0_15px_rgba(255,122,24,0.2)]",
          isBlue 
            ? "bg-cyan-500/10 border-cyan-500/20 shadow-[0_0_15px_rgba(0,212,255,0.2)]" 
            : "bg-orange-500/10 border-orange-500/20 shadow-[0_0_15px_rgba(255,122,24,0.2)]"
        )}>
          <Icon className={cn("w-6 h-6", isBlue ? "text-cyan-400" : "text-orange-400")} />
        </div>
        <div className="text-right">
          <div className="text-[9px] font-black text-white/30 uppercase tracking-widest">Active Members</div>
          <div className="text-lg font-black text-white">{members}</div>
        </div>
      </div>

      <h3 className="gb-title text-xl uppercase tracking-wider text-white mb-2">{title} Media</h3>
      <p className="gb-muted text-sm leading-relaxed mb-6">{description}</p>

      {links.length > 0 && (
        <div className="mb-8 space-y-3">
          <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] flex items-center gap-2">
            <ShieldCheck className={cn("w-3 h-3", isBlue ? "text-cyan-400" : "text-orange-400")} /> Intelligence Sources
          </div>
          <div className="grid grid-cols-2 gap-2 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar scrollbar-hide">
            {links.map((link, idx) => (
              <a 
                key={idx} 
                href={link.url} 
                target="_blank" 
                rel="noreferrer"
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/5 transition-all group/link",
                  isBlue ? "hover:border-cyan-500/40 hover:bg-cyan-500/10" : "hover:border-orange-500/40 hover:bg-orange-500/10"
                )}
              >
                <span className="text-[10px] font-bold text-white/50 group-hover/link:text-white truncate max-w-[100px]">
                  {link.name}
                </span>
                <ExternalLink className={cn("w-2.5 h-2.5 text-white/10 shrink-0", isBlue ? "group-hover/link:text-cyan-400" : "group-hover/link:text-orange-400")} />
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <Button className={cn(
          "w-full text-black font-black uppercase text-[10px] tracking-widest h-11 rounded-xl transition-all",
          isBlue 
            ? "bg-cyan-500 hover:bg-cyan-400 shadow-[0_0_20px_rgba(0,212,255,0.3)]" 
            : "bg-orange-500 hover:bg-orange-400 shadow-[0_0_20px_rgba(255,122,24,0.3)]"
        )}>
          Synchronize Community
        </Button>
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
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
                className="w-32 h-32 rounded-2xl object-cover border-2 border-orange-500/40 shadow-[0_0_60px_rgba(255,136,0,0.8)] brightness-125 saturate-150 transition-all duration-500 group-hover:scale-110"
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
          <ShieldCheck className="w-5 h-5 text-green-500 opacity-50 shadow-[0_0_15px_rgba(34,197,94,0.3)]" />
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
            description="High-fidelity news, conservative intelligence communities, and traditional media feeds synchronized for rapid analysis."
            icon={Radio}
            members="42.8K"
            links={REPUBLICAN_LINKS}
            theme="orange"
          />
          <PersonalityCard 
            title="Democrat" 
            description="Live news, progressive intelligence communities, and digital media streams filtered for ideological synchronization."
            icon={Globe}
            members="39.2K"
            links={DEMOCRAT_LINKS}
            theme="blue"
          />
          <PersonalityCard 
            title="Independent" 
            description="Centrist news aggregators, neutral intelligence hubs, and cross-asset flow investigation centers."
            icon={Users}
            members="12.5K"
          />
          <PersonalityCard 
            title="Liberal" 
            description="Reform-focused intelligence feeds, liberal communities, and globalist data layers for broad-spectrum observation."
            icon={MessageSquare}
            members="28.9K"
          />
        </div>
      </main>

      <footer className="py-16 border-t border-white/10 mt-20 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-10 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
          <span>Alignment-Protocol v1.0.0</span>
          <span>© 2026 AFTER PATENT • Universal Political Interface</span>
        </div>
      </footer>
    </div>
  );
}
