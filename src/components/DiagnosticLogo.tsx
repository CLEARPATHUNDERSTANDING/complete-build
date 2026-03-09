'use client';

import React from "react";
import { cn } from "@/lib/utils";

interface DiagnosticLogoProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

/**
 * MANDATORY BIOLOGICAL HEART - DEFINITIVE BRAND LOCK
 * Optimized with hardcoded dimensions to prevent "UI dissolving" if CSS fails to load.
 */
export default function DiagnosticLogo({ 
  className = "", 
  size = "md",
}: DiagnosticLogoProps) {
  
  const sizeClasses = {
    xs: "w-12 h-12",
    sm: "w-20 h-20",
    md: "w-32 h-32",
    lg: "w-48 h-48",
    xl: "w-64 h-64",
  };

  const pixelSizes = {
    xs: 48,
    sm: 80,
    md: 128,
    lg: 192,
    xl: 256,
  };

  const borderRadius = {
    xs: "rounded-lg",
    sm: "rounded-xl",
    md: "rounded-2xl",
    lg: "rounded-3xl",
    xl: "rounded-[40px]",
  };

  return (
    <div 
      className={cn("relative inline-block overflow-hidden", sizeClasses[size], className)}
      style={{ width: pixelSizes[size], height: pixelSizes[size] }}
    >
      {/* 10px Spectral Diagnostic Frame */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #00f5ff 0%, #6a5cff 33%, #ff00d4 66%, #ff8a00 100%)",
          padding: "10px",
          borderRadius: "inherit",
        }}
      />
      
      {/* Core Asset Container */}
      <div className={cn("relative p-[10px] h-full w-full overflow-hidden bg-black", borderRadius[size])}>
        <img 
          src="https://i.postimg.cc/3NZqktNh/Chat-GPT-Image-Feb-26-2026-02-20-36-PM.png"
          alt="Intelligence Protocol"
          width={pixelSizes[size]}
          height={pixelSizes[size]}
          className="w-full h-full object-cover brightness-110 contrast-110 saturate-110"
          style={{ display: 'block' }}
        />
      </div>
    </div>
  );
}
