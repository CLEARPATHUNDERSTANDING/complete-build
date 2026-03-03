import Link from "next/link";
import MarketMiniChart from "./MarketMiniChart";

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
    <Link href={`/markets/${card.id}`}>
      <article
        className={`group rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 ${card.glow}`}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="text-left">
            <div className={`inline-flex rounded-full bg-gradient-to-r ${card.accent} px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-black`}>
              {card.label}
            </div>
            <h3 className="mt-3 text-xl font-semibold text-white">{card.label} Overview</h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-white/70">{card.description}</p>
          </div>

          <div className="text-right">
            <div className="text-xs uppercase tracking-[0.25em] text-white/45">Last</div>
            <div className="mt-1 text-2xl font-bold text-white">{card.lastValue}</div>
            <div className={`mt-1 text-sm font-semibold ${positive ? "text-cyan-300" : "text-pink-300"}`}>
              {positive ? "+" : ""}{card.changePct}%
            </div>
          </div>
        </div>

        <MarketMiniChart series={card.series} positive={positive} />

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="text-left">
            <div className="mb-2 text-xs uppercase tracking-[0.24em] text-white/45">Subgroups</div>
            <div className="flex flex-wrap gap-2">
              {card.children.map((child) => (
                <span
                  key={child}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75"
                >
                  {child}
                </span>
              ))}
            </div>
          </div>

          <div className="text-left">
            <div className="mb-2 text-xs uppercase tracking-[0.24em] text-white/45">Starter Symbols</div>
            <div className="flex flex-wrap gap-2">
              {card.symbols.map((symbol) => (
                <span
                  key={symbol}
                  className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-medium text-white"
                >
                  {symbol}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
