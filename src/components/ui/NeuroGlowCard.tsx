
"use client";

import React from "react";
import { getProfile, type NeuroProfileId } from "@/lib/neuro/profiles";

/**
 * 3x Thick Neon Boarder Wrap (10px) with mathematically consistent radii.
 * Outer: rounded-[32px] | Inset: 10px | Inner: rounded-[22px]
 */
export function NeuroGlowCard({
  neuroModeId,
  children,
  className = "",
}: {
  neuroModeId: NeuroProfileId;
  children: React.ReactNode;
  className?: string;
}) {
  const p = getProfile(neuroModeId).personality;

  return (
    <div
      className={[
        "relative overflow-hidden rounded-[32px] transition-all duration-700",
        className,
      ].join(" ")}
      style={{
        padding: "10px",
        background: `linear-gradient(135deg, ${p.borderA}, ${p.borderB})`,
        boxShadow: p.glow !== "Low" ? `0 0 50px ${p.borderA}66, 0 0 80px ${p.borderB}4D` : "none",
      }}
    >
      {/* Glow clipping overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[32px]"
        style={{
          boxShadow: p.glow !== "Low" ? "inset 0 0 24px rgba(255,255,255,0.06), inset 0 0 40px rgba(0,229,255,0.08)" : "none",
        }}
      />

      {/* Inner panel with consistent radius subtraction (32 - 10 = 22) */}
      <div
        className="relative rounded-[22px] overflow-hidden h-full"
        style={{
          background: `linear-gradient(180deg, ${p.bgTop}, ${p.bgBottom})`,
        }}
      >
        <div className="relative h-full">{children}</div>
      </div>
    </div>
  );
}
