"use client";

import Link from "next/link";
import { ArrowLeft, Activity, Globe, TrendingUp, TrendingDown } from "lucide-react";
import MarketDetailChart from "@/components/markets/MarketDetailChart";
import * as React from "react";

async function getDetailData(marketId: string, symbol?: string) {
  try {
    const url = new URL(`${window.location.origin}/api/market-detail`);
    url.searchParams.set("marketId", marketId);
    if (symbol) url.searchParams.set("symbol", symbol);

    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error("Market detail fetch failed:", e);
    return null;
  }
}

export default function MarketDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ marketId: string }>;
  searchParams: Promise<{ symbol?: string }>;
}) {
  const [data, setData] = React.useState<any>(null);
  const resolvedParams = React.use(params);
  const resolvedSearchParams = React.use(searchParams);

  React.useEffect(() => {
    getDetailData(resolvedParams.marketId, resolvedSearchParams.symbol).then(setData);
  }, [resolvedParams.marketId, resolvedSearchParams.symbol]);

  if (!data || !data.ok) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <Activity className="w-12 h-12 text-rose-500 animate-pulse mb-4" />
        <h1 className="text-xl font-black uppercase tracking-widest">Market Entity Not Found</h1>
        <Link href="/markets" className="mt-6 text-sm font-bold text-indigo-400 hover:underline uppercase tracking-widest flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Return to Board
        </Link>
      </div>
    );
  }

  const isUp = data.stats.changePct >= 0;

  return (
    <main className="min-h-screen bg-[#050816] text-white selection:bg-indigo-500">
      <header className="h-56 border-b border-white/10 bg-black flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-16">
           <Link href="/markets" className="flex items-center gap-3 text-[16px] font-black tracking-[0.25em] text-indigo-400 uppercase hover:text-indigo-300 transition-colors">
              <ArrowLeft className="w-8 h-8" />
              Intelligence Board
           </Link>
           <div className="flex items-center gap-8">
             <div className="relative">
               <img 
                 src="https://i.postimg.cc/3NZqktNh/Chat-GPT-Image-Feb-26-2026-02-20-36-PM.png"
                 alt="Clear Path Logo"
                 className="w-48 h-48 rounded-3xl object-cover border border-white/10 shadow-[0_0_40px_rgba(255,136,0,0.4)] opacity-60"
               />
               <span className="absolute bottom-2 right-2 text-[12px] font-bold text-white/60 select-none">©™</span>
             </div>
             <div className="flex flex-col text-left">
                <span className="text-[28px] font-black tracking-[0.3em] text-white uppercase leading-none">CLEAR PATH TRADER</span>
                <span className="text-[24px] font-bold tracking-[0.1em] text-white uppercase [-webkit-text-stroke:1.5px_#ff0000]">Intelligence Board</span>
             </div>
           </div>
        </div>
      </header>

      <section className="border-b border-white/10 bg-black/20 backdrop-blur-xl py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col gap-12">
            <div className="text-left">
              <div className={`inline-flex rounded-full bg-gradient-to-r ${data.market.accent} px-6 py-1.5 text-[12px] font-black uppercase tracking-[0.2em] text-black`}>
                {data.market.label} / {data.symbol}
              </div>
              <h1 className="mt-8 text-5xl font-black md:text-7xl uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#00d4ff] via-[#6a5cff] via-[#ff4fd8] to-[#ff8a00] drop-shadow-[0_0_25px_rgba(106,92,255,0.6)] brightness-125">
                {data.symbol} Terminal
              </h1>
              <p className="mt-6 max-w-3xl text-xl text-white/60 leading-relaxed italic border-l-2 border-indigo-500 pl-8">
                {data.market.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {[
                { label: "Last Value", val: Number(data.stats.lastValue).toFixed(2), icon: Globe, color: "text-white" },
                { label: "Session High", val: Number(data.stats.high).toFixed(2), icon: TrendingUp, color: "text-emerald-400" },
                { label: "Session Low", val: Number(data.stats.low).toFixed(2), icon: TrendingDown, color: "text-rose-400" },
                { 
                  label: "Diagnostic Change", 
                  val: (isUp ? "+" : "") + Number(data.stats.changePct).toFixed(2) + "%", 
                  icon: isUp ? TrendingUp : TrendingDown, 
                  color: isUp ? "text-cyan-400" : "text-pink-400" 
                }
              ].map((stat, i) => (
                <div key={i} className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 group hover:border-white/20 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <stat.icon className={`w-5 h-5 ${stat.color} opacity-50`} />
                    <span className="text-[11px] uppercase font-black tracking-[0.2em] text-white/30">{stat.label}</span>
                  </div>
                  <div className={`text-3xl font-black ${stat.color} tracking-tight`}>{stat.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-8 py-16 xl:grid-cols-[1.6fr_0.9fr]">
        <div className="min-w-0">
          <MarketDetailChart title={`${data.market.label} focus: ${data.symbol}`} data={data.points} />
        </div>

        <aside className="space-y-12">
          <div className="rounded-[40px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl">
            <div className="text-[12px] uppercase font-black tracking-[0.25em] text-white/30 border-b border-white/5 pb-6 mb-8">Market Scope</div>
            <div className="flex flex-wrap gap-3">
              {data.market.children.map((item: string) => (
                <span key={item} className="rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-[12px] font-bold text-white/70 uppercase tracking-widest">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[40px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl">
            <div className="text-[12px] uppercase font-black tracking-[0.25em] text-white/30 border-b border-white/5 pb-6 mb-8">Asset Universe</div>
            <div className="grid grid-cols-1 gap-3">
              {data.market.symbols.map((item: string) => (
                <Link
                  key={item}
                  href={`/markets/${data.market.id}?symbol=${encodeURIComponent(item)}`}
                  className={`flex items-center justify-between rounded-2xl border px-6 py-5 transition-all duration-300 ${item === data.symbol ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.1)]" : "border-white/5 bg-black/40 text-white/50 hover:border-white/20 hover:text-white"}`}
                >
                  <span className="text-base font-black uppercase tracking-widest">{item}</span>
                  {item === data.symbol && <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]" />}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <footer className="py-16 border-t border-white/10 bg-black mt-20">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.25em] text-white/30">
          <span>Detailed Diagnostic v1.2</span>
          <span>ClearPath Markets Terminal</span>
        </div>
      </footer>
    </main>
  );
}
