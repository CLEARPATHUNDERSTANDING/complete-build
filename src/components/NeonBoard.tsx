'use client';

import React from "react";

type NeonBoardProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * High-intensity NeonBoard component acting as a true "Frame".
 * Uses CSS mask to ensure the interior is perfectly transparent
 * while the 10px border carries the high-intensity AFTER PATENT logo spectrum.
 */
export default function NeonBoard({ children, className = "" }: NeonBoardProps) {
  return (
    <div className={`relative ${className}`}>
      {/* The Border Layer - Full Logo Spectrum */}
      <div
        className="absolute inset-0 rounded-[32px]"
        style={{
          background: "linear-gradient(135deg, #00d4ff 0%, #6a5cff 33%, #ff4fd8 66%, #ff8a00 100%)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "destination-out",
          padding: "10px",
        }}
      />
      
      {/* The Shadow/Glow Layer - Multi-tone logo bloom */}
      <div 
        className="absolute inset-0 rounded-[32px] pointer-events-none"
        style={{
          boxShadow: "0 0 40px rgba(0,212,255,0.2), 0 0 60px rgba(106,92,255,0.15), 0 0 80px rgba(255,79,216,0.1)",
        }}
      />

      {/* Content Container */}
      <div className="relative p-[10px] h-full">
        <div className="h-full w-full rounded-[22px] bg-transparent overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
