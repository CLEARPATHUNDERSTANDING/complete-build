'use client';

import React, { useMemo, useEffect, useState } from "react";
import CPLogoGlow from "@/components/CPLogoGlow";

/**
 * SAFE MotionBlurSlider + CPLogoGlow
 * - NO <img>
 * - NO SVG filter-based motion blur
 * - NO requestAnimationFrame / performance.now
 * This is meant to STOP crashes and get the page loading.
 */

type Slide = { title: string; body: string; bgClass: string };

export default function MotionBlurSlider() {
  const slides: Slide[] = useMemo(
    () => [
      {
        title: "Clear Path: Focus Mode",
        body: "Less noise. Cleaner decisions. Built for clarity.",
        bgClass: "bg-gradient-to-br from-fuchsia-500/20 via-cyan-500/15 to-indigo-500/20",
      },
      {
        title: "Signal Discipline",
        body: "Reduce impulse. Follow structure. Track progress.",
        bgClass: "bg-gradient-to-br from-cyan-500/20 via-emerald-500/10 to-fuchsia-500/20",
      },
      {
        title: "Fast Scanning",
        body: "Find setups faster with consistent visual rules.",
        bgClass: "bg-gradient-to-br from-indigo-500/20 via-fuchsia-500/10 to-cyan-500/20",
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [anim, setAnim] = useState(false);

  const go = (dir: 1 | -1) => {
    const next = (index + dir + slides.length) % slides.length;
    setIndex(next);
  };

  useEffect(() => {
    setAnim(true);
    const t = setTimeout(() => setAnim(false), 220);
    return () => clearTimeout(t);
  }, [index]);

  const slide = slides[index];

  return (
    <section className="w-full max-w-3xl mx-auto">
      <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur p-3 shadow-lg">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="text-sm text-white/70">
            Slide {index + 1} / {slides.length}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
              ›
            </button>
          </div>
        </div>

        <div
          className={`relative overflow-hidden rounded-xl p-6 min-h-[180px] ${slide.bgClass}`}
          style={{
            transition: "transform 200ms ease, filter 200ms ease, opacity 200ms ease",
            transform: anim ? "translateX(-6px)" : "translateX(0px)",
            filter: anim ? "blur(1.6px)" : "none",
            opacity: anim ? 0.92 : 1,
          }}
        >
          {/* CP Logo Overlay (SVG = NOT an image file) */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-60">
            <CPLogoGlow className="w-[260px] h-auto" />
          </div>

          {/* Foreground text */}
          <div className="relative">
            <div className="text-xl font-semibold text-white">{slide.title}</div>
            <p className="mt-2 text-white/80 leading-relaxed">{slide.body}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 rounded-full border border-white/10 bg-black/30 text-white/80">No images</span>
              <span className="text-xs px-2 py-1 rounded-full border border-white/10 bg-black/30 text-white/80">Neon CP</span>
              <span className="text-xs px-2 py-1 rounded-full border border-white/10 bg-black/30 text-white/80">Firebase-safe</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
