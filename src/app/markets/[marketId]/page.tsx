import Link from "next/link";
import { ArrowLeft, Activity, Globe, TrendingUp, TrendingDown } from "lucide-react";
import MarketDetailChart from "@/components/markets/MarketDetailChart";

async function getDetailData(marketId: string, symbol?: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:9002";
  const url = new URL(`${baseUrl}/api/market-detail`);
  url.searchParams.set("marketId", marketId);
  if (symbol) url.searchParams.set("symbol", symbol);

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function MarketDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ marketId: string }>;
  searchParams: Promise<{ symbol?: string }>;
}) {
  const { marketId } = await params;
  const { symbol } = await searchParams;
  const data = await getDetailData(marketId, symbol);

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
      <header className="h-20 border-b border-white/10 bg-black flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-8">
           <Link href="/markets" className="flex items-center gap-2 text-[10px] font-black tracking-[0.25em] text-indigo-400 uppercase hover:text-indigo-300 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Intelligence Board
           </Link>
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                <Activity className="w-5 h-5 text-white" />
             </div>
             <div className="flex flex-col text-left">
                <span className="text-[12px] font-black tracking-[0.2em] text-white uppercase leading-none">{data.market.label}</span>
                <span className="text-[10px] font-bold tracking-[0.1em] text-white/40 uppercase">Diagnostic</span>
             </div>
           </div>
        </div>
      </header>

      <section className="border-b border-white/10 bg-black/20 backdrop-blur-xl py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col gap-10">
            <div className="text-left">
              <div className={`inline-flex rounded-full bg-gradient-to-r ${data.market.accent} px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-black`}>
                {data.market.label} / {data.symbol}
              </div>
              <h1 className="mt-6 text-4xl font-black md:text-6xl uppercase tracking-tighter">{data.symbol} Terminal</h1>
              <p className="mt-4 max-w-3xl text-lg text-white/60 leading-relaxed italic border-l-2 border-indigo-500 pl-6">
                {data.market.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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
                <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 group hover:border-white/20 transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <stat.icon className={`w-3.5 h-3.5 ${stat.color} opacity-50`} />
                    <span className="text-[10px] uppercase font-black tracking-[0.2em] text-white/30">{stat.label}</span>
                  </div>
                  <div className={`text-2xl font-black ${stat.color} tracking-tight`}>{stat.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-8 py-12 xl:grid-cols-[1.6fr_0.9fr]">
        <div className="min-w-0">
          <MarketDetailChart title={`${data.market.label} focus: ${data.symbol}`} data={data.points} />
        </div>

        <aside className="space-y-8">
          <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
            <div className="text-[11px] uppercase font-black tracking-[0.25em] text-white/30 border-b border-white/5 pb-4 mb-6">Market Scope</div>
            <div className="flex flex-wrap gap-2">
              {data.market.children.map((item: string) => (
                <span key={item} className="rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 text-[11px] font-bold text-white/70 uppercase tracking-widest">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
            <div className="text-[11px] uppercase font-black tracking-[0.25em] text-white/30 border-b border-white/5 pb-4 mb-6">Asset Universe</div>
            <div className="grid grid-cols-1 gap-2">
              {data.market.symbols.map((item: string) => (
                <Link
                  key={item}
                  href={`/markets/${data.market.id}?symbol=${encodeURIComponent(item)}`}
                  className={`flex items-center justify-between rounded-xl border px-5 py-4 transition-all duration-300 ${item === data.symbol ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.1)]" : "border-white/5 bg-black/40 text-white/50 hover:border-white/20 hover:text-white"}`}
                >
                  <span className="text-sm font-black uppercase tracking-widest">{item}</span>
                  {item === data.symbol && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <footer className="py-12 border-t border-white/10 bg-black mt-20">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.25em] text-white/30">
          <span>Detailed Diagnostic v1.2</span>
          <span>ClearPath Markets Terminal</span>
        </div>
      </footer>
    </main>
  );
}
