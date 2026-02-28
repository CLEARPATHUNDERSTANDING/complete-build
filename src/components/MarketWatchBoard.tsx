import React from "react";
import NeonBoard from "./NeonBoard";
import { MarketItem } from "@/data/marketCatalog";

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
  return (
    <NeonBoard className="w-full">
      <div className="px-5 py-5">
        <div className="mb-4 text-[13px] font-semibold uppercase tracking-[0.22em] text-white/75">
          Market Watch
        </div>

        <div className="space-y-5">
          {items.map((item) => (
            <div key={item.symbol} className="flex items-center justify-between">
              <div>
                <div
                  className="text-[20px] font-bold tracking-tight"
                  style={{ color: symbolColor(item) }}
                >
                  {item.display}
                </div>
                <div className="mt-1 text-[12px] uppercase tracking-[0.16em] text-white/40">
                  {item.description}
                </div>
              </div>

              <div className="text-[18px] font-semibold text-white">
                {fakePrice(item.symbol)}
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="py-10 text-center text-white/40 text-sm italic">
              No matching assets found
            </div>
          )}
        </div>
      </div>
    </NeonBoard>
  );
}