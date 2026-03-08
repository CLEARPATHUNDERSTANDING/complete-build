'use client';
/**
 * @fileOverview A safe icon wrapper component that prevents crashes from missing imports.
 * Optimized for Next.js 15: Added robust validation for resolved components.
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

  // CRITICAL: Verify the resolved object is a valid React component function
  if (!Cmp || typeof Cmp !== 'function') {
    return (
      <span
        className={className}
        style={{ display: "inline-flex", width: size, height: size, alignItems: "center", justifyContent: "center" }}
        aria-hidden="true"
        title={`Missing icon: ${name}`}
      >
        🌐
      </span>
    );
  }

  return <Cmp className={className} size={size} strokeWidth={strokeWidth} />;
}
