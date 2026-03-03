"use client";

import React from "react";
import ChartPanelApex from "./ChartPanelApex";
import type { ModeConfig } from "@/modes/types";

interface ChartsGridProps {
  mode: ModeConfig;
  personality: ModeConfig["chart"];
  layout?: 'single' | 'dual' | 'quad';
}

export default function ChartsGrid({ mode, personality, layout = 'single' }: ChartsGridProps) {
  const gridClass = layout === 'single' 
    ? "grid-cols-1" 
    : layout === 'dual' 
      ? "grid-cols-1 lg:grid-cols-2" 
      : "grid-cols-1 lg:grid-cols-2 xl:grid-cols-2";

  return (
    <div className={`grid gap-6 w-full ${gridClass}`}>
      <ChartPanelApex mode={mode} personality={personality} />
      {layout !== 'single' && (
        <ChartPanelApex 
          mode={{ ...mode, id: `${mode.id}-2`, label: `${mode.label} (Secondary)` }} 
          personality={personality} 
        />
      )}
      {layout === 'quad' && (
        <>
          <ChartPanelApex 
            mode={{ ...mode, id: `${mode.id}-3`, label: `${mode.label} (Tertiary)` }} 
            personality={personality} 
          />
          <ChartPanelApex 
            mode={{ ...mode, id: `${mode.id}-4`, label: `${mode.label} (Quaternary)` }} 
            personality={personality} 
          />
        </>
      )}
    </div>
  );
}