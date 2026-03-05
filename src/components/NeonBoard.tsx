'use client';

import React from "react";

type NeonBoardProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * High-intensity NeonBoard component acting as a true "Frame".
 * Uses CSS mask to ensure the interior is perfectly transparent
 * while the 10px border carries the high-intensity gradient.
 */
export default function NeonBoard({ children, className = "" }: NeonBoardProps) {
  return (
    <div className={`relative ${className}`}>
      {/* The Border Layer */}
      <div
        className="absolute inset-0 rounded-[32px]"
        style={{
          background: "linear-gradient(135deg, #ff8800 0%, #ff0055 50%, #ff4fd8 100%)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "destination-out",
          padding: "10px",
        }}
      />
      
      {/* The Shadow/Glow Layer */}
      <div 
        className="absolute inset-0 rounded-[32px] pointer-events-none"
        style={{
          boxShadow: "0 0 50px rgba(255,136,0,0.3), 0 0 80px rgba(255,0,85,0.15)",
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
