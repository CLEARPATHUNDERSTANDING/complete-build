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
      <header className="h-20 border-b border-white/10 bg-black flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-8">
           <Link href="/" className="flex items-center gap-2 text-[10px] font-black tracking-[0.25em] text-indigo-400 uppercase hover:text-indigo-300 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Social Hub
           </Link>
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                <Activity className="w-5 h-5 text-white" />
             </div>
             <div className="flex flex-col text-left">
                <span className="text-[12px] font-black tracking-[0.3em] text-white uppercase leading-none">CLEAR PATH TRADER</span>
                <span className="text-[10px] font-bold tracking-[0.1em] text-white/40 uppercase">Intelligence Board</span>
             </div>
           </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
            <span className="text-[9px] font-black uppercase tracking-widest text-white/30">Deployment:</span>
            <div className="flex items-center gap-4">
              {/* Neon Cyan Apple Logo */}
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#00e5ff] fill-current drop-shadow-[0_0_8px_#00e5ff]" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.05 20.28c-.98.95-2.05 1.61-3.22 1.61-1.12 0-1.5-.68-2.83-.68-1.32 0-1.76.66-2.82.68-1.13.02-2.32-.75-3.32-1.73-2.04-1.99-3.12-5.11-3.12-7.81 0-2.69 1.01-4.64 2.1-5.79 1.09-1.15 2.33-1.74 3.42-1.74 1.04 0 1.76.41 2.72.41 1.01 0 1.5-.41 2.7-.41 1.01 0 2.14.53 3.06 1.43-2.41 1.43-2.01 4.69.41 5.81-.51 1.28-1.17 2.52-2.13 3.56l.01-.01zM12.03 4.13c-.02-1.34.52-2.63 1.41-3.56.91-.95 2.21-1.57 3.51-1.57.02 1.34-.52 2.63-1.41 3.56-.91.95-2.21 1.57-3.51 1.57z"/>
              </svg>
              {/* Neon Fuchsia Android Logo */}
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#ff00d4] fill-current drop-shadow-[0_0_8px_#ff00d4]" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.523 15.3414c-.5511 0-1-.4489-1-1s.4489-1 1-1 1 .4489 1 1-.4489 1-1 1zm-11.046 0c-.5511 0-1-.4489-1-1s.4489-1 1-1 1 .4489 1 1-.4489 1-1 1zM18.1535 11.6566c-.1141-.1141-.2617-.1712-.4092-.1712h-11.4886c-.1475 0-.2951.0571-.4092.1712-.1141.1141-.1712.2617-.1712.4092v2.0114c0 .1475.0571.2951.1712.4092.1141.1141.2617.1712.4092.1712h11.4886c.1475 0 .2951-.0571.4092-.1712.1141-.1141.1712-.2617.1712-.4092v-2.0114c0-.1475-.0571-.2951-.1712-.4092zM12 2c-4.9706 0-9 4.0294-9 9 0 4.1788 2.8412 7.6933 6.6923 8.6885-.0152-.224-.0256-.4501-.0256-.6785v-.01c0-1.6569 1.3431-3 3-3s3 1.3431 3 3v.01c0 .2284-.0104.4545-.0256.6785 3.8511-.9952 6.6923-4.5097 6.6923-8.6885 0-4.9706-4.0294-9-9-9z"/>
              </svg>
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
              <h1 className="mt-1 text-2xl font-black md:text-4xl uppercase tracking-tight">Command Center</h1>
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

      <footer className="py-12 border-t border-white/10 bg-black mt-20">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.25em] text-white/30">
          <span>Diagnostic v3.5.0</span>
          <span>CLEAR PATH TRADER Terminal</span>
        </div>
      </footer>
    </main>
  );
}
