'use client';

import React from "react";

/**
 * Animated Backdrop Node
 * Restored to use gradient animations without SVG CP paths.
 */
export default function PatentPendingBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* animated gradient haze */}
      <div className="pp-haze absolute inset-0" />

      {/* Brand logo centered */}
      <div className="pp-float absolute inset-0 flex items-center justify-center opacity-30">
        <img 
          src="https://i.postimg.cc/3NZqktNh/Chat-GPT-Image-Feb-26-2026-02-20-36-PM.png"
          className="w-[300px] h-auto object-contain brightness-150 saturate-150"
          alt=""
        />
      </div>

      {/* vignette to keep text readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/45" />

      <style>{`
        .pp-haze{
          background:
            radial-gradient(600px 240px at 35% 50%, rgba(0,245,255,.18), transparent 60%),
            radial-gradient(600px 240px at 65% 52%, rgba(255,45,255,.18), transparent 60%),
            radial-gradient(700px 300px at 50% 60%, rgba(75,60,255,.12), transparent 62%);
          transform: scale(1.05);
          filter: blur(10px);
          animation: ppHaze 7s ease-in-out infinite;
        }
        .pp-float{
          animation: ppFloat 5.5s ease-in-out infinite;
        }
        @keyframes ppHaze{
          0%{ opacity:.75; transform: scale(1.02) translateY(0px); }
          50%{ opacity:1; transform: scale(1.07) translateY(-6px); }
          100%{ opacity:.75; transform: scale(1.02) translateY(0px); }
        }
        @keyframes ppFloat{
          0%{ transform: translateY(0px); filter: blur(0px); }
          50%{ transform: translateY(-8px); filter: blur(.7px); }
          100%{ transform: translateY(0px); filter: blur(0px); }
        }
      `}</style>
    </div>
  );
}
