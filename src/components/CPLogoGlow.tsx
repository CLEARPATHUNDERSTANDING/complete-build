'use client';

import React from "react";

export default function CPLogoGlow({
  className = "",
  opacity = 0.9,
}: {
  className?: string;
  opacity?: number;
}) {
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
        {/* Left (C) gradient */}
        <linearGradient id="gradC" x1="80" y1="40" x2="260" y2="220" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#00F5FF" />
          <stop offset="1" stopColor="#4B3CFF" />
        </linearGradient>

        {/* Right (P) gradient */}
        <linearGradient id="gradP" x1="260" y1="40" x2="480" y2="220" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FF2DFF" />
          <stop offset="1" stopColor="#FF2D6D" />
        </linearGradient>

        {/* Glow filters */}
        <filter id="glowC" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glowP" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Soft particle blur */}
        <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>

      {/* Tiny neon particles (code-only) */}
      <g filter="url(#soft)" opacity="0.55">
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

      {/* LEFT: C (stroke neon) */}
      <path
        d="M 235 70
           A 90 90 0 1 0 235 190"
        fill="none"
        stroke="url(#gradC)"
        strokeWidth="28"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glowC)"
      />

      {/* Inner C (thin highlight) */}
      <path
        d="M 228 86
           A 74 74 0 1 0 228 174"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.22"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* RIGHT: P (stem) */}
      <path
        d="M 280 60
           V 200"
        fill="none"
        stroke="url(#gradP)"
        strokeWidth="28"
        strokeLinecap="round"
        filter="url(#glowP)"
      />

      {/* RIGHT: P (top loop) */}
      <path
        d="M 280 60
           H 375
           A 55 55 0 0 1 375 170
           H 280"
        fill="none"
        stroke="url(#gradP)"
        strokeWidth="28"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glowP)"
      />

      {/* Inner P (thin highlight) */}
      <path
        d="M 290 80
           H 365
           A 35 35 0 0 1 365 150
           H 290"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.22"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Subtle center split glow */}
      <rect x="255" y="52" width="10" height="160" fill="#FFFFFF" opacity="0.08" />
    </svg>
  );
}
