'use client';

import React from "react";
import { cn } from "@/lib/utils";

interface AfterPatentLogoProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

/**
 * MANDATORY BRANDING COMPONENT - LOCKED VERSION
 * Uses only the definitive original image provided by the user.
 * Size map handles responsive scaling for headers, heroes, and chart corners.
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
    <div className={cn("relative inline-block overflow-hidden", sizeClasses[size], borderRadius[size], className)}>
      <img 
        src="https://i.postimg.cc/3NZqktNh/Chat-GPT-Image-Feb-26-2026-02-20-36-PM.png"
        alt="After Patent Logo"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
