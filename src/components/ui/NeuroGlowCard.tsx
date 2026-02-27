"use client";

import React from "react";
import { getProfile, type NeuroProfileId } from "@/lib/neuro/profiles";

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
        "relative rounded-[22px] p-[2px] transition-all duration-700",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.06)]",
        className,
      ].join(" ")}
      style={{
        background: `linear-gradient(135deg, ${p.borderA}, ${p.borderB})`,
      }}
    >
      <div
        className="rounded-[20px] overflow-hidden h-full relative"
        style={{
          background: `linear-gradient(180deg, ${p.bgTop}, ${p.bgBottom})`,
        }}
      >
        {/* inner glow */}
        <div
          className="absolute inset-0 rounded-[22px] pointer-events-none"
          style={{
            boxShadow: `0 0 28px ${p.borderA}55, 0 0 42px ${p.borderB}33`,
          }}
        />
        <div className="relative h-full">{children}</div>
      </div>
    </div>
  );
}
