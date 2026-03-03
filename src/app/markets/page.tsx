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
           <Link href="/" className="flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-indigo-400 uppercase hover:text-indigo-300 transition-colors">
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

      <div className="flex justify-center gap-16 py-16 border-t border-white/5 bg-black/40">
        <div className="flex flex-col items-center gap-4">
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-[#00e5ff] fill-current drop-shadow-[0_0_15px_#00e5ff]" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.151 3.096 3.712 3.034 1.498-.058 2.074-1.047 3.882-1.047 1.8 0 2.316 1.047 3.89 1.012 1.61-.027 2.59-1.478 3.572-2.902 1.129-1.659 1.597-3.258 1.621-3.34-.034-.014-3.11-1.194-3.14-4.741-.024-2.96 2.42-4.384 2.53-4.455-1.389-2.03-3.522-2.27-4.274-2.32-1.912-.155-3.41 1.115-4.39 1.115zM15.21 4.501c.849-1.02 1.419-2.439 1.263-3.851-1.218.049-2.69.811-3.562 1.83-.783.9-.1.465-2.421-1.311-3.838.156 1.41.039 2.826-.812 3.86z"/>
          </svg>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400">iOS Ready</span>
        </div>
        <div className="flex flex-col items-center gap-4">
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-[#ff00d4] fill-current drop-shadow-[0_0_15px_#ff00d4]" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.52 14.33c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-11.04 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM18.15 10.66c-.11-.11-.26-.17-.41-.17H6.26c-.15 0-.3.06-.41.17-.11.11-.17.26-.17.41v2.01c0 .15.06.3.17.41.11.11.26.17.41.17h11.49c.15 0 .3-.06.41-.17.11-.11.17-.26.17-.41v-2.01c0-.15-.06-.3-.17-.41zM12 1c-4.97 0-9 4.03-9 9 0 4.18 2.84 7.69 6.69 8.69-.02-.22-.03-.45-.03-.68v-.01c0-1.66 1.34-3 3-3s3 1.34 3 3v.01c0 .23-.01.45-.03.68 3.85-1 6.69-4.51 6.69-8.69 0-4.97-4.03-9-9-9z"/>
          </svg>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-pink-400">Android Ready</span>
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