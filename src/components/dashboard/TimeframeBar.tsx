
"use client";

import React from "react";
import type { NeuroProfileId } from "@/lib/neuro/profiles";

const TF = ["1m","5m","15m","30m","1h","4h","1d","1w","1M","YTD"] as const;
export type Timeframe = typeof TF[number];

export function TimeframeBar({
  active,
  onChange,
  neuroModeId,
}: {
  active: Timeframe;
  onChange: (tf: Timeframe) => void;
  neuroModeId: NeuroProfileId;
}) {
  return (
    <div className="flex flex-wrap gap-2 px-3 py-3 border-b border-white/10">
      {TF.map((tf) => (
        <button
          key={tf}
          onClick={() => onChange(tf)}
          className={[
            "px-3 py-1 rounded-md text-xs font-semibold transition-colors",
            "border border-white/10 hover:border-white/25",
            active === tf ? "bg-white/10 text-white" : "bg-black/20 text-white/80",
          ].join(" ")}
          aria-pressed={active === tf}
        >
          {tf.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
