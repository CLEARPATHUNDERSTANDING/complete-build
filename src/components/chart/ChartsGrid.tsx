"use client";

import React, { useEffect, useMemo, useState } from "react";
import type { ModeConfig } from "@/modes/types";
import ChartPanelApex from "./ChartPanelApex";

type Props = {
  mode: ModeConfig;
  personality: ModeConfig["chart"];
  layout?: "grid" | "stack"; // optional override
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function gridClass(count: number) {
  if (count <= 1) return "grid-cols-1";
  if (count === 2) return "grid-cols-1 lg:grid-cols-2";
  if (count === 3 || count === 4) return "grid-cols-1 lg:grid-cols-2";
  return "grid-cols-1 lg:grid-cols-3";
}

export default function ChartsGrid({ mode, personality, layout }: Props) {
  const count = clamp(mode.defaultCharts ?? 1, 1, 8);
  const chosenLayout = layout ?? mode.defaultLayout ?? "grid";

  // Small "mount delay" prevents Apex 0-width edge cases during mode switch
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(false);
    const t = setTimeout(() => setReady(true), 60);
    return () => clearTimeout(t);
  }, [
    mode.id,
    mode.defaultCharts,
    chosenLayout,
    personality.upCandle,
    personality.downCandle,
    personality.background,
    personality.gridVert,
    personality.crosshair,
  ]);

  // Make sure each chart instance gets a stable unique key that changes with personality
  const chartKeys = useMemo(() => {
    const base = [
      mode.id,
      chosenLayout,
      count,
      personality.upCandle,
      personality.downCandle,
      personality.background,
      personality.gridVert,
      personality.crosshair,
      personality.accent,
      personality.density,
      personality.glow,
    ].join("|");

    return Array.from({ length: count }, (_, i) => `${base}|chart-${i + 1}`);
  }, [mode.id, chosenLayout, count, personality]);

  if (!ready) {
    return (
      <div className={`grid gap-4 ${chosenLayout === "stack" ? "grid-cols-1" : gridClass(count)}`}>
        {Array.from({ length: count }, (_, i) => (
          <div
            key={`sk-${i}`}
            className="h-[520px] rounded-2xl border border-white/10 bg-white/5"
          />
        ))}
      </div>
    );
  }

  if (chosenLayout === "stack") {
    return (
      <div className="flex flex-col gap-4">
        {chartKeys.map((k) => (
          <div key={k} className="min-w-0">
            <ChartPanelApex mode={mode} personality={personality} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid gap-4 ${gridClass(count)}`}>
      {chartKeys.map((k) => (
        <div key={k} className="min-w-0">
          <ChartPanelApex mode={mode} personality={personality} />
        </div>
      ))}
    </div>
  );
}
