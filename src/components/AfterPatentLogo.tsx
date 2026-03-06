'use client';

import React from "react";
import { cn } from "@/lib/utils";

interface AfterPatentLogoProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

/**
 * MANDATORY BRANDING COMPONENT
 * Locked-in version of the AFTER PATENT identity using the high-fidelity source image.
 * Includes the spectral border and PRO badge as baked into the original diagnostic asset.
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
    <div className={cn("relative inline-block overflow-hidden shadow-[0_0_30px_rgba(106,92,255,0.3)]", sizeClasses[size], borderRadius[size], className)}>
      <img 
        src="https://i.postimg.cc/3NZqktNh/Chat-GPT-Image-Feb-26-2026-02-20-36-PM.png"
        alt="After Patent Logo"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
