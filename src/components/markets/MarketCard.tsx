import MarketMiniChart from "./MarketMiniChart";
import { TrendingUp, TrendingDown } from "lucide-react";

type Props = {
  card: {
    id: string;
    label: string;
    description: string;
    children: string[];
    symbols: string[];
    series: number[];
    lastValue: number;
    changePct: number;
    trend: "up" | "down";
    accent: string;
    glow: string;
  };
};

export default function MarketCard({ card }: Props) {
  const positive = card.trend === "up";

  return (
    <article
      className={`group rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 ${card.glow}`}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="text-left">
          <div className={`inline-flex rounded-full bg-gradient-to-r ${card.accent} px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-black`}>
            {card.label}
          </div>
          <h3 className="mt-4 text-2xl font-black text-white uppercase tracking-tight">{card.label} Overview</h3>
          <p className="mt-2 max-w-md text-sm font-medium leading-relaxed text-white/50">{card.description}</p>
        </div>

        <div className="text-right">
          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30">Snapshot</div>
          <div className="mt-1 font-mono text-xl font-black text-white">
            {card.lastValue.toFixed(2)}
          </div>
          <div className={`mt-1 flex items-center justify-end gap-1.5 text-xs font-black uppercase tracking-widest ${positive ? 'text-cyan-400' : 'text-rose-500'}`}>
            {positive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {card.changePct > 0 ? '+' : ''}{card.changePct}%
          </div>
        </div>
      </div>

      <div className="mb-6 h-32 w-full overflow-hidden rounded-2xl bg-black/20">
        <MarketMiniChart series={card.series} positive={positive} />
      </div>

      <div className="flex flex-wrap gap-2">
        {card.symbols.map(s => (
          <span key={s} className="rounded-lg border border-white/5 bg-white/[0.03] px-2 py-1 text-[10px] font-black uppercase tracking-widest text-white/40">
            {s}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4 border-t border-white/5 pt-4">
        {card.children.map(child => (
          <span key={child} className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20">
            {child}
          </span>
        ))}
      </div>
    </article>
  );
}
