
'use client';

import React, { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { marketCatalog } from "@/data/marketCatalog";
import MarketWatchBoard from "./MarketWatchBoard";
import IntelFeedBoard from "./IntelFeedBoard";
import Link from "next/link";
import { Brain, Search, ArrowLeft } from "lucide-react";

export default function MarketSearchBoards() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || "";
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setQuery(q);
  }, [searchParams]);

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
    <div className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-[600px] flex flex-col items-center">
        {/* Back to Social Button */}
        <div className="w-full flex justify-start mb-10">
          <Link 
            href="/" 
            className="flex items-center gap-3 px-5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all text-sm font-bold uppercase tracking-widest"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Social
          </Link>
        </div>

        <div className="mb-12 flex flex-col items-center gap-8 text-center">
          <div className="relative">
            <img 
              src="https://i.postimg.cc/3NZqktNh/Chat-GPT-Image-Feb-26-2026-02-20-36-PM.png"
              alt="Clear Path Logo"
              className="w-48 h-48 rounded-3xl object-cover border border-white/10 shadow-[0_0_40px_rgba(255,136,0,0.4)]"
            />
            <span className="absolute bottom-2 right-2 text-[12px] font-bold text-white/60 select-none">©™</span>
          </div>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-[0.3em] mb-2">Intelligence Interface</h1>
            <p className="text-sm font-bold text-white/40 uppercase tracking-widest">Data Truth Layer Active</p>
          </div>
        </div>

        <div className="w-full mb-12 relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-white/30" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search forex, crypto, metals, futures..."
            className="w-full rounded-3xl border border-white/10 bg-[#0a0f18] pl-16 pr-6 py-6 text-lg text-white outline-none focus:border-primary/50 transition-colors placeholder:text-white/35 shadow-2xl"
          />
        </div>

        <div className="w-full space-y-12">
          <MarketWatchBoard items={filtered} />
          <IntelFeedBoard />
          
          <div className="flex justify-center pt-8">
            <Link 
              href="/dashboard" 
              className="px-12 py-5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all text-base font-black tracking-widest uppercase"
            >
              Launch Neuro Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
