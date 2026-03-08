'use client';

import React from "react";
import { cn } from "@/lib/utils";

type NeonCardProps = {
  children: React.ReactNode;
  className?: string;

  /** Inner content padding */
  paddingClassName?: string;

  /** Optional tag like "PRO" */
  badgeText?: string;

  /** Optional: make it a square */
  square?: boolean;
};

/**
 * DOUBLE GLASS PROTOCOL - MANDATORY WRAPPER
 * Features a high-intensity triple-tone gradient frame and nested glass panels.
 * Layer 1: Black/80 Translucent + Blur XL
 * Layer 2: White/5 Gloss + Internal Gloss Stroke
 */
export default function NeonCard({
  children,
  className = "",
  paddingClassName = "p-5",
  badgeText,
  square = false,
}: NeonCardProps) {
  return (
    <div
      className={cn(
        "relative group",
        square ? "aspect-square" : "",
        className
      )}
    >
      {/* Outer Spectral Frame - High Intensity Triple-Tone */}
      <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-orange-400 opacity-90 blur-[0.2px]" />

      {/* Atmospheric Bloom - Multi-Layered Blur */}
      <div className="absolute -inset-2 rounded-[36px] bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-orange-400 opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500" />

      {/* Primary Glass Base - Deep Contrast Layer */}
      <div className="absolute inset-[1px] rounded-[31px] bg-black/80 backdrop-blur-2xl" />

      {/* Secondary Gloss Layer - Double Glass Finish */}
      <div className="absolute inset-[1px] rounded-[31px] bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />

      {/* Core Card Panel - Interaction Layer */}
      <div className={cn("relative h-full w-full rounded-[28px] border border-white/10 overflow-hidden", paddingClassName)}>
        {/* Inner Gloss Stroke */}
        <div className="absolute inset-0 rounded-[28px] border border-white/5 pointer-events-none" />
        <div className="relative z-10 h-full w-full">
          {children}
        </div>
      </div>

      {/* Persistent Diagnostic Badge */}
      {badgeText && (
        <div className="absolute bottom-4 right-4 z-20">
          <span className="px-3 py-1.5 rounded-full border border-white/15 bg-black/60 backdrop-blur-md text-white/90 text-[10px] font-black uppercase tracking-widest shadow-2xl">
            {badgeText}
          </span>
        </div>
      )}
    </div>
  );
}
