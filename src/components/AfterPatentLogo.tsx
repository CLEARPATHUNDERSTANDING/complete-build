'use client';

import React from "react";
import { cn } from "@/lib/utils";

interface AfterPatentLogoProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

/**
 * MANDATORY BRANDING COMPONENT - DEFINITIVE VERSION
 * Uses the high-fidelity original image provided for patent demonstration.
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
    <div className={cn("relative inline-block", sizeClasses[size], className)}>
      {/* 10px Spectral Border Layer */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #00f5ff 0%, #6a5cff 33%, #ff00d4 66%, #ff8a00 100%)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "destination-out",
          padding: "10px",
          borderRadius: "inherit",
        }}
      />
      
      {/* Spectral Shadow - No generic gold/orange haze */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "0 0 30px rgba(0,245,255,0.25), 0 0 50px rgba(106,92,255,0.2), 0 0 70px rgba(255,0,212,0.15)",
          borderRadius: "inherit",
        }}
      />

      {/* Content Container */}
      <div className={cn("relative p-[10px] h-full w-full overflow-hidden bg-black", borderRadius[size])}>
        <img 
          src="https://i.postimg.cc/3NZqktNh/Chat-GPT-Image-Feb-26-2026-02-20-36-PM.png"
          alt="Logo"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
