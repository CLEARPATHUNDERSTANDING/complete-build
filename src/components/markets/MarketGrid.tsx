import MarketCard from "./MarketCard";

type Card = {
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

export default function MarketGrid({ cards }: { cards: Card[] }) {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-8 pb-24 xl:grid-cols-2">
      {cards.map((card) => (
        <MarketCard key={card.id} card={card} />
      ))}
    </section>
  );
}
