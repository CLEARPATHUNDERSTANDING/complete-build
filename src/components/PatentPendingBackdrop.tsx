'use client';

import React from "react";

function CPLogoGlow({ className = "", opacity = 0.9 }: { className?: string; opacity?: number }) {
  return (
    <svg
      className={className}
      viewBox="0 0 520 260"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="CP neon logo"
      role="img"
      style={{ opacity }}
    >
      <defs>
        <linearGradient id="gradC_pp" x1="80" y1="40" x2="260" y2="220" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#00F5FF" />
          <stop offset="1" stopColor="#4B3CFF" />
        </linearGradient>

        <linearGradient id="gradP_pp" x1="260" y1="40" x2="480" y2="220" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FF2DFF" />
          <stop offset="1" stopColor="#FF2D6D" />
        </linearGradient>

        <filter id="glowC_pp" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glowP_pp" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="soft_pp" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>

      {/* Tiny neon particles */}
      <g filter="url(#soft_pp)" opacity="0.55">
        {[
          [120, 70, 3, "#00F5FF"],
          [150, 190, 2, "#4B3CFF"],
          [210, 90, 2.5, "#00F5FF"],
          [320, 65, 2.5, "#FF2DFF"],
          [380, 210, 3, "#FF2D6D"],
          [430, 110, 2, "#FF2DFF"],
          [260, 230, 2.5, "#FF2DFF"],
          [95, 135, 2, "#00F5FF"],
        ].map(([cx, cy, r, c], i) => (
          <circle key={i} cx={cx as number} cy={cy as number} r={r as number} fill={c as string} />
        ))}
      </g>

      {/* C */}
      <path
        d="M 235 70 A 90 90 0 1 0 235 190"
        fill="none"
        stroke="url(#gradC_pp)"
        strokeWidth="28"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glowC_pp)"
      />

      {/* C highlight */}
      <path
        d="M 228 86 A 74 74 0 1 0 228 174"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.22"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* P stem */}
      <path
        d="M 280 60 V 200"
        fill="none"
        stroke="url(#gradP_pp)"
        strokeWidth="28"
        strokeLinecap="round"
        filter="url(#glowP_pp)"
      />

      {/* P loop */}
      <path
        d="M 280 60 H 375 A 55 55 0 0 1 375 170 H 280"
        fill="none"
        stroke="url(#gradP_pp)"
        strokeWidth="28"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glowP_pp)"
      />

      {/* P highlight */}
      <path
        d="M 290 80 H 365 A 35 35 0 0 1 365 150 H 290"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.22"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Subtle split */}
      <rect x="255" y="52" width="10" height="160" fill="#FFFFFF" opacity="0.08" />
    </svg>
  );
}

/**
 * This is the BACKDROP ONLY.
 * Put it inside the PATENT PENDING card/container.
 * It will NOT appear anywhere else unless you import it somewhere else.
 */
export default function PatentPendingBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* animated gradient haze */}
      <div className="pp-haze absolute inset-0" />

      {/* CP glow logo centered */}
      <div className="pp-float absolute inset-0 flex items-center justify-center opacity-55">
        <CPLogoGlow className="w-[260px] h-auto" opacity={0.95} />
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
