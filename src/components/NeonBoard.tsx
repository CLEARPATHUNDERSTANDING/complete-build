'use client';

import React from "react";

type NeonBoardProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * DOUBLE GLASS NEONBOARD
 * Features high-intensity refractive frames and deep glass translucency.
 * Spectrum: Cyan -> Indigo -> Pink -> Orange burst.
 */
export default function NeonBoard({ children, className = "" }: NeonBoardProps) {
  return (
    <div className={`relative ${className}`}>
      {/* The 10px Spectral Border Layer */}
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
      
      {/* Spectral Atmospheric Bloom */}
      <div 
        className="absolute inset-0 rounded-[32px] pointer-events-none"
        style={{
          boxShadow: "0 0 30px rgba(0,245,255,0.25), 0 0 50px rgba(106,92,255,0.2), 0 0 70px rgba(255,0,212,0.15)",
        }}
      />

      {/* Inner Glass Material - Double Finish */}
      <div className="relative p-[10px] h-full">
        <div className="h-full w-full rounded-[22px] bg-black/40 backdrop-blur-3xl overflow-hidden border border-white/5 shadow-inner">
          {/* Surface Gloss Highlight */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
          <div className="relative h-full w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
