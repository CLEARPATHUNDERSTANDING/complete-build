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

  /** Optional: make it a square like your screenshot */
  square?: boolean;
};

/**
 * MANDATORY WRAPPER COMPONENT
 * Features a high-intensity triple-tone gradient frame, 2XL atmospheric glow, and glass-morphism.
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
      {/* Gradient border frame */}
      <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-orange-400 opacity-90 blur-[0.2px]" />

      {/* Glow - High intensity atmospheric bloom */}
      <div className="absolute -inset-2 rounded-[36px] bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-orange-400 opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500" />

      {/* Inner card panel */}
      <div className={cn("relative h-full w-full rounded-[28px] bg-black/80 backdrop-blur-xl border border-white/10 overflow-hidden", paddingClassName)}>
        {children}
      </div>

      {/* Persistent Diagnostic Badge */}
      {badgeText && (
        <div className="absolute bottom-4 right-4 z-20">
          <span className="px-3 py-1.5 rounded-full border border-white/15 bg-black/60 backdrop-blur text-white/90 text-[10px] font-black uppercase tracking-widest shadow-2xl">
            {badgeText}
          </span>
        </div>
      )}
    </div>
  );
}
