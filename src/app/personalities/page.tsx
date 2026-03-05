'use client';

import React from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  ShieldCheck, 
  ExternalLink, 
  Globe, 
  Scale, 
  Flag, 
  HandMetal,
  Loader2
} from "lucide-react";
import GradientBurstWrap from "@/components/GradientBurstWrap";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMounted } from "@/hooks/use-mounted";

const spectralTitleClass = "bg-clip-text text-transparent bg-gradient-to-r from-[#00d4ff] via-[#6a5cff] via-[#ff4fd8] to-[#ff8a00] drop-shadow-[0_0_25px_rgba(106,92,255,0.6)] brightness-125";

interface MediaLink {
  name: string;
  url: string;
  type: string;
}

interface PoliticalSector {
  id: string;
  label: string;
  description: string;
  theme: "orange" | "blue" | "gray" | "purple";
  icon: any;
  members: string;
  links: MediaLink[];
}

const POLITICAL_SECTORS: PoliticalSector[] = [
  {
    id: "republican-sector",
    label: "Republican Media",
    description: "Traditional conservative focus, market liberty, and constitutional trade theory.",
    theme: "orange",
    icon: Flag,
    members: "42.1K",
    links: [
      {"name":"Fox News","url":"https://www.foxnews.com","type":"news"},
      {"name":"Fox Business","url":"https://www.foxbusiness.com","type":"finance"},
      {"name":"Wall Street Journal","url":"https://www.wsj.com","type":"finance"},
      {"name":"Daily Wire","url":"https://www.dailywire.com","type":"news"},
      {"name":"Breitbart","url":"https://www.breitbart.com","type":"news"},
      {"name":"Newsmax","url":"https://www.newsmax.com","type":"news"},
      {"name":"The Federalist","url":"https://thefederalist.com","type":"news"},
      {"name":"National Review","url":"https://www.nationalreview.com","type":"news"},
      {"name":"Washington Examiner","url":"https://www.washingtonexaminer.com","type":"news"},
      {"name":"Townhall","url":"https://townhall.com","type":"news"},
      {"name":"RealClearPolitics","url":"https://www.realclearpolitics.com","type":"politics"},
      {"name":"Rumble","url":"https://rumble.com","type":"social"},
      {"name":"Truth Social","url":"https://truthsocial.com","type":"social"},
      {"name":"Free Republic","url":"https://freerepublic.com","type":"community"},
      {"name":"Barstool Sports","url":"https://www.barstoolsports.com","type":"sports"},
      {"name":"DraftKings","url":"https://www.draftkings.com","type":"betting"},
      {"name":"Black Rifle Coffee","url":"https://www.blackriflecoffee.com","type":"shopping"},
      {"name":"Grunt Style","url":"https://www.gruntstyle.com","type":"shopping"},
      {"name":"Nine Line Apparel","url":"https://www.ninelineapparel.com","type":"shopping"},
      {"name":"Seeking Alpha","url":"https://seekingalpha.com","type":"finance"}
    ]
  },
  {
    id: "democrat-sector",
    label: "Democrat Media",
    description: "Mainstream progressive analysis, social policy impact, and green energy flows.",
    theme: "blue",
    icon: Globe,
    members: "39.2K",
    links: [
      {"name":"New York Times","url":"https://www.nytimes.com","type":"news"},
      {"name":"Washington Post","url":"https://www.washingtonpost.com","type":"news"},
      {"name":"CNN","url":"https://www.cnn.com","type":"news"},
      {"name":"MSNBC","url":"https://www.msnbc.com","type":"news"},
      {"name":"NPR","url":"https://www.npr.org","type":"news"},
      {"name":"Politico","url":"https://www.politico.com","type":"politics"},
      {"name":"Axios","url":"https://www.axios.com","type":"news"},
      {"name":"Vox","url":"https://www.vox.com","type":"news"},
      {"name":"ProPublica","url":"https://www.propublica.org","type":"investigative"},
      {"name":"Guardian US","url":"https://www.theguardian.com/us","type":"news"},
      {"name":"HuffPost","url":"https://www.huffpost.com","type":"news"},
      {"name":"Daily Kos","url":"https://www.dailykos.com","type":"community"},
      {"name":"Reddit Politics","url":"https://www.reddit.com/r/politics","type":"community"},
      {"name":"YouTube","url":"https://youtube.com","type":"social"},
      {"name":"Twitter/X","url":"https://twitter.com","type":"social"},
      {"name":"TikTok","url":"https://tiktok.com","type":"social"},
      {"name":"Bloomberg","url":"https://www.bloomberg.com","type":"finance"},
      {"name":"Yahoo Finance","url":"https://finance.yahoo.com","type":"finance"},
      {"name":"MarketWatch","url":"https://www.marketwatch.com","type":"finance"},
      {"name":"Etsy","url":"https://www.etsy.com","type":"shopping"}
    ]
  },
  {
    id: "independent-sector",
    label: "Independent Media",
    description: "Neutral truth-layer aggregation, centrist/libertarian overlap, and quant data.",
    theme: "gray",
    icon: Scale,
    members: "28.5K",
    links: [
      {"name":"Reuters","url":"https://www.reuters.com","type":"news"},
      {"name":"Associated Press","url":"https://apnews.com","type":"news"},
      {"name":"BBC News","url":"https://www.bbc.com/news","type":"news"},
      {"name":"RealClearPolitics","url":"https://www.realclearpolitics.com","type":"politics"},
      {"name":"The Hill","url":"https://thehill.com","type":"politics"},
      {"name":"Reason Magazine","url":"https://reason.com","type":"news"},
      {"name":"Substack","url":"https://substack.com","type":"community"},
      {"name":"Quora","url":"https://quora.com","type":"community"},
      {"name":"Reddit","url":"https://reddit.com","type":"community"},
      {"name":"YouTube","url":"https://youtube.com","type":"social"},
      {"name":"Twitter/X","url":"https://twitter.com","type":"social"},
      {"name":"LinkedIn","url":"https://linkedin.com","type":"social"},
      {"name":"Investing.com","url":"https://www.investing.com","type":"finance"},
      {"name":"Seeking Alpha","url":"https://seekingalpha.com","type":"finance"},
      {"name":"Morningstar","url":"https://www.morningstar.com","type":"finance"},
      {"name":"Yahoo Finance","url":"https://finance.yahoo.com","type":"finance"},
      {"name":"ZeroHedge","url":"https://www.zerohedge.com","type":"finance"},
      {"name":"DraftKings","url":"https://www.draftkings.com","type":"betting"},
      {"name":"FanDuel","url":"https://www.fanduel.com","type":"betting"},
      {"name":"eBay","url":"https://www.ebay.com","type":"shopping"}
    ]
  },
  {
    id: "liberal-sector",
    label: "Liberal Media",
    description: "Reform-driven intelligence, tech-culture activism, and progressive ESG mapping.",
    theme: "purple",
    icon: HandMetal,
    members: "31.4K",
    links: [
      {"name":"The Guardian","url":"https://www.theguardian.com","type":"news"},
      {"name":"Mother Jones","url":"https://www.motherjones.com","type":"news"},
      {"name":"The Intercept","url":"https://theintercept.com","type":"news"},
      {"name":"Democracy Now","url":"https://www.democracynow.org","type":"news"},
      {"name":"Common Dreams","url":"https://www.commondreams.org","type":"news"},
      {"name":"Slate","url":"https://slate.com","type":"news"},
      {"name":"Jacobin","url":"https://jacobin.com","type":"news"},
      {"name":"Teen Vogue Politics","url":"https://www.teenvogue.com","type":"news"},
      {"name":"Vice","url":"https://www.vice.com","type":"culture"},
      {"name":"Reddit Liberal","url":"https://www.reddit.com/r/liberal","type":"community"},
      {"name":"Reddit Politics","url":"https://www.reddit.com/r/politics","type":"community"},
      {"name":"YouTube","url":"https://youtube.com","type":"social"},
      {"name":"Twitter/X","url":"https://twitter.com","type":"social"},
      {"name":"TikTok","url":"https://tiktok.com","type":"social"},
      {"name":"Bloomberg Green","url":"https://www.bloomberg.com/green","type":"finance"},
      {"name":"Yahoo Finance ESG","url":"https://finance.yahoo.com","type":"finance"},
      {"name":"Patagonia","url":"https://www.patagonia.com","type":"shopping"},
      {"name":"REI","url":"https://www.rei.com","type":"shopping"},
      {"name":"Etsy","url":"https://www.etsy.com","type":"shopping"},
      {"name":"Kickstarter","url":"https://www.kickstarter.com","type":"startup"}
    ]
  }
];

function SectorCard({ sector }: { sector: PoliticalSector }) {
  const isOrange = sector.theme === "orange";
  const isBlue = sector.theme === "blue";
  const isGray = sector.theme === "gray";
  const isPurple = sector.theme === "purple";

  const iconColors = {
    orange: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    blue: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    gray: "text-slate-400 bg-slate-500/10 border-slate-500/20",
    purple: "text-pink-400 bg-pink-500/10 border-pink-500/20"
  };

  const gradients = {
    orange: "linear-gradient(90deg, #ff8800, #ff0055)",
    blue: "linear-gradient(90deg, #00d4ff, #6a5cff)",
    gray: "linear-gradient(90deg, #94a3b8, #334155)",
    purple: "linear-gradient(90deg, #ff4fd8, #6a5cff)"
  };

  return (
    <GradientBurstWrap style={{ background: gradients[sector.theme] }}>
      <div className="flex items-start justify-between mb-6">
        <div className={cn("p-3 rounded-xl border shadow-2xl transition-all duration-500", iconColors[sector.theme])}>
          <sector.icon className="w-6 h-6" />
        </div>
        <div className="text-right">
          <div className="text-[9px] font-black text-white/30 uppercase tracking-widest">Network Nodes</div>
          <div className="text-xs font-black text-white uppercase tracking-tighter">{sector.members}</div>
        </div>
      </div>

      <h3 className="gb-title text-xl uppercase tracking-wider text-white mb-2">{sector.label}</h3>
      <p className="gb-muted text-sm leading-relaxed mb-6 italic border-l-2 border-white/10 pl-4">{sector.description}</p>

      <div className="mb-8 space-y-3">
        <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] flex items-center gap-2 border-b border-white/5 pb-2">
          <ShieldCheck className={cn("w-3 h-3", isOrange ? "text-orange-400" : isBlue ? "text-cyan-400" : isGray ? "text-slate-400" : "text-pink-400")} /> Media Sources
        </div>
        
        <div className="grid grid-cols-2 gap-2 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar scrollbar-hide">
          {sector.links.map((link, idx) => (
            <a 
              key={idx} 
              href={link.url} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group"
            >
              <span className="text-[10px] font-black text-white/60 group-hover:text-white truncate uppercase tracking-tight">{link.name}</span>
              <ExternalLink className="w-2.5 h-2.5 text-white/10 shrink-0 group-hover:text-white/40" />
            </a>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Link href={`/communities?hubId=${sector.id}`}>
          <Button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black uppercase text-[10px] tracking-widest h-11 rounded-xl transition-all shadow-2xl">
            Synchronize Sector →
          </Button>
        </Link>
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <div className={cn("w-1.5 h-1.5 rounded-full", isOrange ? "bg-orange-500 shadow-[0_0_8px_#ff8800]" : isBlue ? "bg-cyan-500 shadow-[0_0_8px_#00d4ff]" : isGray ? "bg-slate-500 shadow-[0_0_8px_#94a3b8]" : "bg-pink-500 shadow-[0_0_8px_#ff4fd8]")} />
            <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Protocol: Active</span>
          </div>
          <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">v2.5.0</span>
        </div>
      </div>
    </GradientBurstWrap>
  );
}

export default function PersonalitiesPage() {
  const mounted = useMounted();

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-indigo-500">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Synchronizing Intelligence Nodes...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500 font-body">
      <header className="h-56 border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-50 px-10 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/community" className="flex items-center gap-3 text-[14px] font-black tracking-[0.25em] text-indigo-400 uppercase hover:text-indigo-300 transition-colors">
            <ArrowLeft className="w-6 h-6" />
            Return to Social Hub
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
              <span className={`text-[24px] font-black tracking-[0.3em] uppercase leading-none ${spectralTitleClass}`}>Intelligence Node</span>
              <span className="text-[18px] font-bold tracking-[0.1em] text-white/40 uppercase">Political Media Network</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ShieldCheck className="w-5 h-5 text-emerald-400 opacity-50 shadow-[0_0_15px_rgba(52,211,153,0.3)]" />
          <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">
            Data Integrity: Synchronized
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-20 px-10">
        <div className="mb-16">
          <h1 className={`text-5xl font-black uppercase tracking-tighter mb-6 ${spectralTitleClass}`}>
            Sector Personalities
          </h1>
          <p className="max-w-2xl text-lg text-white/60 leading-relaxed font-medium italic border-l-2 border-indigo-500 pl-8">
            Access ideological intelligence sectors calibrated for high-clarity network investigation. 
            Each sector synchronizes 20 high-fidelity media nodes into a unified diagnostic grid.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-12">
          {POLITICAL_SECTORS.map((sector) => (
            <SectorCard key={sector.id} sector={sector} />
          ))}
        </div>
      </main>

      <footer className="py-16 border-t border-white/10 mt-20 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-10 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
          <span>Ideological Protocol v2.5.0 • 80 Intelligence Anchors</span>
          <span>© 2026 AFTER PATENT • Universal Intelligence Interface</span>
        </div>
      </footer>
    </div>
  );
}
