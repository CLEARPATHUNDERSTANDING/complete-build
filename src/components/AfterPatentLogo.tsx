'use client';

import React from "react";
import { cn } from "@/lib/utils";

interface AfterPatentLogoProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

/**
 * MANDATORY BRANDING COMPONENT - DEFINITIVE VERSION
 * RESTORED: Uses the high-fidelity original image provided for patent demonstration.
 * Locked into the 10px spectral frame logic.
 */
export default function AfterPatentLogo({ 
  className = "", 
  size = "md",
}: AfterPatentLogoProps) {
  
  const sizeClasses = {
    xs: "w-12 h-12",
    sm: "w-20 h-20",
    md: "w-32 h-32",
    lg: "w-48 h-48",
    xl: "w-64 h-64",
  };

  const borderRadius = {
    xs: "rounded-lg",
    sm: "rounded-xl",
    md: "rounded-2xl",
    lg: "rounded-3xl",
    xl: "rounded-[40px]",
  };

  return (
    <div className={cn("relative inline-block p-[2px] overflow-hidden bg-gradient-to-br from-[#00f5ff] via-[#6a5cff] via-[#ff00d4] to-[#ff8a00] shadow-[0_0_30px_rgba(106,92,255,0.3)]", sizeClasses[size], borderRadius[size], className)}>
      <div className={cn("w-full h-full overflow-hidden bg-black", borderRadius[size])}>
        <img 
          src="https://i.postimg.cc/3NZqktNh/Chat-GPT-Image-Feb-26-2026-02-20-36-PM.png"
          alt="After Patent Logo"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
