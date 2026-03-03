import Image from "next/image";
import MarketGrid from "@/components/markets/MarketGrid";
import MarketHero from "@/components/markets/MarketHero";
import Link from "next/link";
import { ArrowLeft, Activity } from "lucide-react";

async function getCards() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:9002";
  try {
    const res = await fetch(`${baseUrl}/api/market-overview`, {
      cache: "no-store"
    });

    if (!res.ok) return { cards: [] };
    return res.json();
  } catch (e) {
    return { cards: [] };
  }
}

export default async function MarketsPage() {
  const data = await getCards();

  return (
    <main className="min-h-screen bg-[#050816] text-white selection:bg-indigo-500">
      <header className="h-32 border-b border-white/10 bg-black flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-12">
           <Link href="/" className="flex items-center gap-2 text-[14px] font-black tracking-[0.3em] text-indigo-400 uppercase hover:text-indigo-300 transition-colors">
              <ArrowLeft className="w-6 h-6" />
              Social Hub
           </Link>
           <div className="flex items-center gap-4">
             <div className="w-16 h-16 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.6)]">
                <Activity className="w-10 h-10 text-white" />
             </div>
             <div className="flex flex-col text-left">
                <span className="text-[24px] font-black tracking-[0.3em] text-white uppercase leading-none">CLEAR PATH TRADER</span>
                <span className="text-[20px] font-bold tracking-[0.1em] text-white/40 uppercase">Intelligence Board</span>
             </div>
           </div>
        </div>
      </header>

      <section className="border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 md:flex-row md:px-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl border border-cyan-400/30 bg-white/5 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.25)]">
               <Activity className="w-8 h-8 text-cyan-400" />
            </div>
            <div className="text-left">
              <div className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">CLEAR PATH TRADER</div>
              <h1 className="mt-1 text-2xl font-black md:text-4xl uppercase tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#00d4ff] via-[#6a5cff] via-[#ff4fd8] to-[#ff8a00] drop-shadow-[0_0_25px_rgba(106,92,255,0.6)] brightness-125">
                Command Center
              </h1>
              <p className="mt-1 text-sm text-white/65">
                Apex-powered multi-market diagnostic dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      <MarketHero />
      <div className="mt-8">
        <MarketGrid cards={data.cards} />
      </div>

      {/* Corrected High-Fidelity Logos Outside Blocks */}
      <div className="flex justify-center gap-16 py-16 border-t border-white/5 bg-black/40">
        <div className="flex flex-col items-center gap-4">
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-[#00e5ff] fill-current drop-shadow-[0_0_15px_#00e5ff]" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.05,20.28c-.96,.95-2.26,1.53-3.71,1.53s-2.75-.58-3.71-1.53c-.96-.95-1.53-2.26-1.53-3.71s.58-2.75,1.53-3.71c.96-.95,2.26-1.53,3.71-1.53s2.75,.58,3.71,1.53c.96,.95,1.53,2.26,1.53,3.71s-.58,2.75-1.53,3.71M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10,10-4.48,10-10S17.52,2,12,2M15.67,1.02c.45-.1,.84,.3,.74,.75-.14,.61-.55,1.13-1.1,1.43-.55,.3-1.21,.38-1.82,.23-.61-.14-1.13-.55-1.43-1.1-.3-.55-.38-1.21-.23-1.82,.1-.45,.6-.65,1-.45,.55,.3,1,.85,1.25,1.5,.25,.65,.35,1.35,.3,2,.4,.4,1,.65,1.6,.65s1.2-.25,1.6-.65c-.05-.65,.05-1.35,.3-2,.25-.65,.7-1.2,1.25-1.5,.4-.2,.9,0,1,.45,.15,.61,.07,1.27-.23,1.82-.3,.55-.82,.96-1.43,1.1-.61,.15-1.27,.07-1.82-.23-.55-.3-.96-.82-1.1-1.43-.1-.45,.29-.85,.74-.75Z" />
          </svg>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400">iOS Deployed</span>
        </div>
        <div className="flex flex-col items-center gap-4">
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-[#ff00d4] fill-current drop-shadow-[0_0_15px_#ff00d4]" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.52,14.33c-.55,0-1-.45-1-1s.45-1,1-1,1,.45,1,1-.45,1-1,1M6.48,14.33c-.55,0-1-.45-1-1s.45-1,1-1,1,.45,1,1-.45,1-1,1M18.15,10.66c-.11-.11-.26-.17-.41-.17H6.26c-.15,0-.3,.06-.41,.17-.11,.11-.17,.26-.17,.41v2.01c0,.15,.06,.3,.17,.41,.11,.11,.26,.17,.41,.17h11.49c.15,0,.3-.06,.41-.17,.11-.11,.17-.26,.17-.41v-2.01c0-.15-.06-.3-.17-.41M12,1c-4.97,0-9,4.03-9,9,0,4.18,2.84,7.69,6.69,8.69-.02-.22-.03-.45-.03-.68v-.01c0-1.66,1.34-3,3-3s3,1.34,3,3v.01c0,.23-.01,.45-.03,.68,3.85-1,6.69-4.51,6.69-8.69,0-4.97-4.03-9-9-9" />
          </svg>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-pink-400">Android Deployed</span>
        </div>
      </div>

      <footer className="py-12 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.25em] text-white/30">
          <span>Diagnostic v3.5.0</span>
          <span>CLEAR PATH TRADER Terminal</span>
        </div>
      </footer>
    </main>
  );
}
