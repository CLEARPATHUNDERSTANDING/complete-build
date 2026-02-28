'use client';

import React from "react";

type NeonBoardProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * High-intensity NeonBoard component with a 10px thick wrap (3x thick).
 * Features mathematically consistent border radii to eliminate corner artifacts.
 * Outer shell: rounded-[32px] | Padding: 10px | Inner panel: rounded-[22px]
 */
export default function NeonBoard({ children, className = "" }: NeonBoardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[32px] ${className}`}
      style={{
        padding: "10px",
        background: "linear-gradient(135deg, #7c3aed 0%, #00e5ff 45%, #ff4fd8 75%, #78a6ff 100%)",
        boxShadow: "0 0 50px rgba(124,58,237,0.6), 0 0 80px rgba(0,229,255,0.5), 0 0 120px rgba(244,63,94,0.4)",
      }}
    >
      {/* glow overlay, clipped correctly to match outer radius */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[32px]"
        style={{
          boxShadow: "inset 0 0 24px rgba(255,255,255,0.06), inset 0 0 40px rgba(0,229,255,0.08)",
        }}
      />

      {/* inner panel: mathematically consistent radius (32 - 10 = 22) */}
      <div className="relative rounded-[22px] bg-[#070b16] h-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}
