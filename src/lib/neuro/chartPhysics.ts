
'use client';
/**
 * @fileOverview Calculates visual "physics" for the chart based on neuro-divergent profiles.
 */
import type { CandlePersonality } from "./profiles";

export function chartPhysics(personality: CandlePersonality) {
  const candleWidth =
    personality.spacing === "Tight" ? 22 : personality.spacing === "Wide" ? 45 : 32;

  const gridCount =
    personality.dataDensity === "Low" ? 4 : personality.dataDensity === "High" ? 10 : 7;

  const animationSpeed =
    personality.glow === "High" ? 300 : personality.glow === "Medium" ? 180 : 0;

  const glowStrength =
    personality.glow === "High" ? 0.85 : personality.glow === "Medium" ? 0.55 : 0.2;

  return {
    candleWidth,
    gridCount,
    animationSpeed,
    glowStrength,
  };
}
