'use client';

import React, { Suspense } from "react";
import MarketSearchBoards from "@/components/MarketSearchBoards";
import { Loader2 } from "lucide-react";

export default function IntelligencePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-indigo-500">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Synchronizing Intelligence...</span>
      </div>
    }>
      <MarketSearchBoards />
    </Suspense>
  );
}
