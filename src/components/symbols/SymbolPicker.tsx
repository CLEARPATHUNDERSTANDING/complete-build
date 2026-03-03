"use client";

import React, { useMemo, useState } from "react";
import type { ModeConfig } from "@/modes/types";
import { filterUniverse, getUniverseForScope } from "@/utils/scopeFilter";
import { Search, Globe } from "lucide-react";

type Props = {
  mode: ModeConfig;
  value: string;
  onChange: (symbol: string) => void;
};

export default function SymbolPicker({ mode, value, onChange }: Props) {
  const [q, setQ] = useState("");

  const universe = useMemo(() => getUniverseForScope(mode.marketScope), [mode.marketScope]);
  const results = useMemo(() => filterUniverse(q, universe).slice(0, 30), [q, universe]);

  return (
    <div className="rounded-[24px] border border-white/10 bg-[#070b16] p-6 shadow-2xl overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
            <Globe className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <div className="text-[12px] font-black uppercase tracking-[0.2em] text-white">Symbol Search</div>
            <div className="text-[9px] font-black uppercase tracking-widest text-white/30">
              Scope: <span className="text-indigo-400">{mode.marketScope.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input
          className="w-full rounded-xl bg-white/5 border border-white/10 pl-11 pr-4 py-3 text-[13px] font-bold text-white outline-none focus:border-indigo-500/50 transition-all placeholder:text-white/20"
          placeholder={`Search ${mode.marketScope.toUpperCase()} universe…`}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="flex-1 overflow-auto rounded-xl border border-white/5 bg-black/40 custom-scrollbar">
        {results.map((s) => {
          const active = s.symbol === value;
          return (
            <button
              key={s.symbol}
              onClick={() => onChange(s.symbol)}
              className={[
                "w-full text-left px-4 py-4 border-b border-white/5 hover:bg-white/5 transition-colors group flex items-center justify-between",
                active ? "bg-white/10" : "",
              ].join(" ")}
            >
              <div>
                <div className="text-[14px] font-black text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{s.label}</div>
                <div className="text-[9px] font-bold text-white/30 uppercase tracking-widest">{s.symbol}</div>
              </div>
              {active && (
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]" />
              )}
            </button>
          );
        })}
        {!results.length && (
          <div className="px-4 py-10 text-center text-[10px] font-black uppercase tracking-widest text-white/20">
            No matching assets in {mode.marketScope} universe
          </div>
        )}
      </div>
    </div>
  );
}
