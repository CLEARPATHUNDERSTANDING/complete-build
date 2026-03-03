export default function MarketHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.15),transparent_30%),radial-gradient(circle_at_top_right,rgba(236,72,153,0.15),transparent_30%),linear-gradient(to_bottom,rgba(255,255,255,0.03),rgba(255,255,255,0))]" />

      <div className="relative mx-auto max-w-7xl px-8 py-20 md:py-28 text-left">
        <div className="inline-flex rounded-md border border-cyan-400/25 bg-cyan-400/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-cyan-300">
          Clear Path Market Intelligence
        </div>

        <h1 className="mt-8 max-w-4xl text-5xl font-black leading-tight text-white md:text-7xl uppercase tracking-tighter">
          Universal Market Visualizer
        </h1>

        <p className="mt-8 max-w-3xl text-lg font-medium leading-relaxed text-white/50 italic border-l-2 border-indigo-500 pl-8">
          A high-clarity terminal for monitoring global asset volatility. 
          Each diagnostic block provides a multi-layer view of forex, stocks, 
          commodities, and fixed income metrics powered by Apex analytics.
        </p>
      </div>
    </section>
  );
}
