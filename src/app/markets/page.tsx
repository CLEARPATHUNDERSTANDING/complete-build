import Image from "next/image";
import MarketGrid from "@/components/markets/MarketGrid";
import MarketHero from "@/components/markets/MarketHero";
import Link from "next/link";
import { ArrowLeft, Activity } from "lucide-react";

async function getCards() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:9002";
  const res = await fetch(`${baseUrl}/api/market-overview`, {
    cache: "no-store"
  });

  if (!res.ok) {
    return { cards: [] };
  }

  return res.json();
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
                <span className="text-[12px] font-black tracking-[0.2em] text-white uppercase leading-none">Intelligence</span>
                <span className="text-[10px] font-bold tracking-[0.1em] text-white/40 uppercase">Board</span>
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
              <div className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Clear Path</div>
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
          <span>ClearPath Markets Terminal</span>
        </div>
      </footer>
    </main>
  );
}
