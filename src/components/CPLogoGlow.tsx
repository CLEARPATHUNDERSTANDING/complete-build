'use client';

import React from "react";

/**
 * Legacy Vector Fallback - Now synchronized with the definitive brand image.
 */
export default function CPLogoGlow({
  className = "",
  opacity = 0.9,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div className={className} style={{ opacity }}>
      <img 
        src="https://i.postimg.cc/3NZqktNh/Chat-GPT-Image-Feb-26-2026-02-20-36-PM.png"
        alt="CP Brand"
        className="w-full h-full object-contain"
      />
    </div>
  );
}
