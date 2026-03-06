'use client';

import React from "react";

type NeonBoardProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * High-intensity NeonBoard component acting as a true "Frame".
 * Uses CSS mask to ensure the interior is perfectly transparent
 * while the 10px border carries the high-intensity diagnostic spectrum.
 * Spectrum: Cyan -> Indigo -> Pink -> Orange burst.
 */
export default function NeonBoard({ children, className = "" }: NeonBoardProps) {
  return (
    <div className={`relative ${className}`}>
      {/* The Border Layer - Full Spectral Spectrum */}
      <div
        className="absolute inset-0 rounded-[32px]"
        style={{
          background: "linear-gradient(135deg, #00f5ff 0%, #6a5cff 33%, #ff00d4 66%, #ff8a00 100%)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "destination-out",
          padding: "10px",
        }}
      />
      
      {/* Recalibrated Spectral Shadow */}
      <div 
        className="absolute inset-0 rounded-[32px] pointer-events-none"
        style={{
          boxShadow: "0 0 30px rgba(0,245,255,0.25), 0 0 50px rgba(106,92,255,0.2), 0 0 70px rgba(255,0,212,0.15)",
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
