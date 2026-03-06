'use client';

import React from "react";
import CPLogoGlow from "./CPLogoGlow";
import { cn } from "@/lib/utils";

interface AfterPatentLogoProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showPro?: boolean;
}

export default function AfterPatentLogo({ 
  className = "", 
  size = "md",
  showPro = true
}: AfterPatentLogoProps) {
  
  const sizeClasses = {
    xs: "w-12 h-12 p-[3px]",
    sm: "w-20 h-20 p-[5px]",
    md: "w-32 h-32 p-[7px]",
    lg: "w-48 h-48 p-[10px]",
    xl: "w-64 h-64 p-[14px]",
  };

  const borderRadius = {
    xs: "rounded-[10px]",
    sm: "rounded-[14px]",
    md: "rounded-[22px]",
    lg: "rounded-[32px]",
    xl: "rounded-[44px]",
  };

  const innerPadding = {
    xs: "p-1",
    sm: "p-2",
    md: "p-3",
    lg: "p-4",
    xl: "p-6",
  };

  return (
    <div className={cn("relative inline-block", className)}>
      {/* Outer Border Frame */}
      <div 
        className={cn("relative transition-all duration-500", sizeClasses[size], borderRadius[size])}
        style={{
          background: "linear-gradient(135deg, #00f5ff 0%, #6a5cff 33%, #ff00d4 66%, #ff8a00 100%)",
          boxShadow: "0 0 40px rgba(106,92,255,0.25)",
        }}
      >
        {/* Inner Black Background */}
        <div className={cn("w-full h-full bg-black flex items-center justify-center overflow-hidden", borderRadius[size], innerPadding[size])}>
          <CPLogoGlow className="w-full h-full" opacity={1} />
        </div>
      </div>

      {/* PRO Badge */}
      {showPro && (
        <div className={cn(
          "absolute bg-black/40 backdrop-blur-xl border border-white/20 text-white font-black uppercase tracking-widest flex items-center justify-center leading-none select-none z-20",
          size === "xs" ? "px-1 py-0.5 text-[4px] rounded-[2px] bottom-1 right-1" :
          size === "sm" ? "px-1.5 py-0.5 text-[6px] rounded-[4px] bottom-1.5 right-1.5" :
          size === "md" ? "px-3 py-1 text-[9px] rounded-[8px] bottom-2.5 right-2.5" :
          size === "lg" ? "px-5 py-2 text-[12px] rounded-[12px] bottom-4 right-4 shadow-[0_0_20px_rgba(255,136,0,0.4)]" :
          "px-8 py-3 text-[16px] rounded-[16px] bottom-6 right-6 shadow-[0_0_30px_rgba(255,136,0,0.6)]"
        )}>
          PRO
        </div>
      )}
    </div>
  );
}
