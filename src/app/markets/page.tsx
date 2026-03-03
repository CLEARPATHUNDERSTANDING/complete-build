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

      <MarketHero />
      <div className="mt-16">
        <MarketGrid cards={data.cards} />
      </div>

      <footer className="py-12 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.25em] text-white/30">
          <span>Diagnostic v3.0.0</span>
          <span>ClearPath Markets Terminal</span>
        </div>
      </footer>
    </main>
  );
}
