'use client';

import React from "react";

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
      className={[
        "relative group",
        square ? "aspect-square" : "",
        className,
      ].join(" ")}
    >
      {/* Gradient border frame */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-orange-400 opacity-90 blur-[0.2px]" />

      {/* Glow */}
      <div className="absolute -inset-2 rounded-[28px] bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-orange-400 opacity-25 blur-2xl group-hover:opacity-40 transition-opacity duration-500" />

      {/* Inner card */}
      <div className={`relative h-full w-full rounded-3xl bg-black/70 backdrop-blur-xl border border-white/10 overflow-hidden ${paddingClassName}`}>
        {children}
      </div>

      {/* Optional badge (PRO pill) */}
      {badgeText ? (
        <div className="absolute bottom-4 right-4 z-20">
          <span className="px-3 py-1.5 rounded-full border border-white/15 bg-black/60 backdrop-blur text-white/90 text-[10px] font-black uppercase tracking-widest shadow-2xl">
            {badgeText}
          </span>
        </div>
      ) : null}
    </div>
  );
}
