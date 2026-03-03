import React from "react";
import NeonBoard from "./NeonBoard";
import { MarketItem } from "@/data/marketCatalog";
import { MarketWatchPanel } from "./markets/MarketWatchPanel";

type Props = {
  items: MarketItem[];
};

function fakePrice(symbol: string) {
  const seed = symbol.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);

  if (symbol.includes("USD") && symbol.length <= 7 && !symbol.startsWith("XAU") && !symbol.startsWith("BTC")) {
    return (1 + (seed % 9000) / 10000).toFixed(4);
  }

  if (symbol.startsWith("XAU") || symbol.startsWith("BTC")) {
    return (64000 + (seed % 4000)).toLocaleString();
  }

  return (100 + (seed % 900)).toLocaleString();
}

function symbolColor(item: MarketItem) {
  if (item.category === "forex") return "#1cd6ff";
  if (item.category === "metals") return "#7c4dff";
  if (item.category === "crypto") return "#5166ff";
  return "#ffffff";
}

export default function MarketWatchBoard({ items }: Props) {
  const activeSymbol = items[0]?.display || "Market";

  return (
    <NeonBoard className="w-full">
      <div className="px-5 py-5">
        <div className="mb-4 text-[13px] font-black uppercase tracking-[0.22em] text-white/75">
          Market Watch
        </div>

        <div className="space-y-5">
          {items.map((item) => (
            <div key={item.symbol} className="flex items-center justify-between group cursor-pointer">
              <div>
                <div
                  className="text-[20px] font-bold tracking-tight group-hover:scale-105 transition-transform origin-left"
                  style={{ color: symbolColor(item) }}
                >
                  {item.display}
                </div>
                <div className="mt-1 text-[12px] uppercase tracking-[0.16em] text-white/40 font-bold">
                  {item.description}
                </div>
              </div>

              <div className="text-right">
                <div className="text-[18px] font-black text-white font-mono">
                  {fakePrice(item.symbol)}
                </div>
                <div className="text-[10px] font-black text-green-400 uppercase tracking-widest mt-0.5">
                  +{(Math.random() * 2).toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="py-10 text-center text-white/40 text-sm italic font-bold uppercase tracking-widest">
              No matching assets found
            </div>
          )}
        </div>

        {/* Multi-Chart Analytics Panel */}
        {items.length > 0 && (
          <MarketWatchPanel symbol={activeSymbol} />
        )}
      </div>
    </NeonBoard>
  );
}
