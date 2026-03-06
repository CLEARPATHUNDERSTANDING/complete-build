'use client';
/**
 * @fileOverview A safe icon wrapper component that prevents crashes from missing imports.
 * - name: The name of the Lucide icon to render.
 * - className: Optional Tailwind classes.
 * - size: Icon dimensions.
 */

import React from "react";
import dynamic from "next/dynamic";

// Lazy-load ALL lucide icons (prevents "X is not defined" crashes)
const Lucide = dynamic(() => import("lucide-react"), { ssr: false }) as any;

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
  const Cmp = Lucide?.[name];

  // If icon name is wrong/missing, render a safe fallback (no crash)
  if (!Cmp) {
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
