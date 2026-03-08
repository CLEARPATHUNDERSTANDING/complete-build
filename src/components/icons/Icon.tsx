'use client';
/**
 * @fileOverview A safe icon wrapper component that prevents crashes from missing imports.
 * Optimized for React 19 / Next.js 15.
 */

import React from "react";
import * as LucideIcons from "lucide-react";

type IconProps = {
  name: string; // e.g. "Globe", "ShieldCheck", "Zap"
  className?: string;
  size?: number;
  strokeWidth?: number;
};

export default function Icon({
  name,
  className,
  size = 18,
  strokeWidth = 2,
}: IconProps) {
  // Use a typed lookup to safely resolve the icon component
  const Lucide = LucideIcons as any;
  const Cmp = Lucide[name];

  // If icon name is wrong/missing, or not a component, render a safe fallback (no crash)
  if (!Cmp || typeof Cmp !== 'function') {
    return (
      <span
        className={className}
        style={{ display: "inline-flex", width: size, height: size }}
        aria-hidden="true"
        title={`Missing icon: ${name}`}
      >
        🌐
      </span>
    );
  }

  return <Cmp className={className} size={size} strokeWidth={strokeWidth} />;
}
