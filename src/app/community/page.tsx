"use client";

import React, { Suspense } from "react";
import SocialPlatform from "@/components/SocialPlatform/SocialPlatform";
import { Loader2 } from "lucide-react";

/**
 * RESTORED: Full Spectrum Social Feed
 * Reinforced with high-fidelity sidebars and accessibility compliance.
 */
export default function CommunityPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-indigo-500">
        <Loader2 className="w-12 h-12 animate-spin mb-6" />
        <span className="text-[12px] font-black uppercase tracking-[0.4em]">Synchronizing Intelligence Nodes...</span>
      </div>
    }>
      <SocialPlatform />
    </Suspense>
  );
}