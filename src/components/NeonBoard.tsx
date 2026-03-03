'use client';

import React from "react";

type NeonBoardProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * High-intensity NeonBoard component with a 10px thick Unified Blended Gradient.
 * Outer shell: rounded-[32px] | Padding: 10px | Inner panel: rounded-[22px]
 * Spectrum: Blended Orange-to-Magenta.
 * Background: Transparent.
 */
export default function NeonBoard({ children, className = "" }: NeonBoardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[32px] ${className}`}
      style={{
        padding: "10px",
        background: "linear-gradient(135deg, #ff8800 0%, #ff0055 50%, #ff4fd8 100%)",
        boxShadow: "0 0 50px rgba(255,136,0,0.4), 0 0 80px rgba(255,0,85,0.2)",
      }}
    >
      {/* Blended internal glow shadow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[32px]"
        style={{
          boxShadow: "inset 0 0 24px rgba(255,255,255,0.06), inset 0 0 40px rgba(255,0,85,0.08)",
        }}
      />

      {/* inner panel: mathematically consistent radius (32 - 10 = 22) | Background set to transparent */}
      <div className="relative rounded-[22px] bg-transparent h-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}
