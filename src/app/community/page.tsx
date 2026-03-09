"use client";

import React, { Suspense } from "react";
import SocialPlatform from "@/components/SocialPlatform/SocialPlatform";
import { Loader2 } from "lucide-react";

/**
 * RESTORED: High-Fidelity Social Feed
 * Stabilized with Suspense and internal safety guards.
 */
export default function CommunityPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-indigo-500">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Synchronizing Social Hub...</span>
      </div>
    }>
      <SocialPlatform />
    </Suspense>
  );
}
