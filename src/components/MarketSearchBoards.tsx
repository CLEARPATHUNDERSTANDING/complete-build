'use client';

import React, { useMemo, useState } from "react";
import { marketCatalog } from "@/data/marketCatalog";
import MarketWatchBoard from "./MarketWatchBoard";
import IntelFeedBoard from "./IntelFeedBoard";
import Link from "next/link";
import { Brain, Search } from "lucide-react";

export default function MarketSearchBoards() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) {
      return marketCatalog.slice(0, 5);
    }

    return marketCatalog
      .filter((item) => {
        return (
          item.symbol.toLowerCase().includes(q) ||
          item.display.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.searchable.some((s) => s.toLowerCase().includes(q))
        );
      })
      .slice(0, 5);
  }, [query]);

  return (
    <div className="min-h-screen bg-black px-4 py-12 text-white">
      <div className="mx-auto max-w-[430px] flex flex-col items-center">
        <div className="mb-10 flex flex-col items-center gap-4 text-center">
          <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
            <Brain className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Intelligence Interface</h1>
            <p className="text-sm text-white/40">Data Truth Layer Active</p>
          </div>
        </div>

        <div className="w-full mb-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search forex, crypto, metals, futures..."
            className="w-full rounded-2xl border border-white/10 bg-[#0a0f18] pl-11 pr-4 py-4 text-white outline-none focus:border-primary/50 transition-colors placeholder:text-white/35 shadow-2xl"
          />
        </div>

        <div className="w-full space-y-8">
          <MarketWatchBoard items={filtered} />
          <IntelFeedBoard />
          
          <div className="flex justify-center pt-4">
            <Link 
              href="/dashboard" 
              className="px-8 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all text-sm font-bold tracking-widest uppercase"
            >
              Launch Neuro Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
