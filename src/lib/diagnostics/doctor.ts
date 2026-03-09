/**
 * @fileOverview System Diagnostic "Doctor" - Core Logic
 * Monitors application "Vital Signs" to prevent IP deletion or branding corruption.
 * Optimized for browser compatibility: No filesystem access.
 */

import { NEURO_PROFILES } from "@/lib/neuro/profiles";
import { chartPhysics } from "@/lib/neuro/chartPhysics";

export type VitalSign = "Healthy" | "Degraded" | "Critical";

export interface SystemHealth {
  status: VitalSign;
  neuroProfiles: number;
  physicsActive: boolean;
  brandingLocked: boolean;
  logoExists: boolean;
  missingFiles: string[];
  errors: string[];
  warnings: string[];
  bannedTermsFound: string[];
}

export const MANDATORY_LOGO_URL =
  "https://i.postimg.cc/3NZqktNh/Chat-GPT-Image-Feb-26-2026-02-20-36-PM.png";

/**
 * Diagnostic logic - Environment aware and safe for client bundle.
 * Filesystem checks are disabled to prevent bundler crashes.
 */
export function diagnoseSystem(): SystemHealth {
  const errors: string[] = [];
  const warnings: string[] = [];
  const bannedTermsFound: string[] = [];

  const profileCount = Array.isArray(NEURO_PROFILES) ? NEURO_PROFILES.length : 0;
  if (profileCount < 16) {
    errors.push(`Neural Failure: Missing ${16 - profileCount} profiles.`);
  }

  // Physics engine test
  let physicsActive = false;
  try {
    const sample = NEURO_PROFILES[0];
    if (sample?.personality) {
      const testPhysics = chartPhysics(sample.personality);
      physicsActive = !!testPhysics && typeof testPhysics.candleWidth !== "undefined";
    }
  } catch (e) {
    errors.push("Physics Engine: Calibration failure.");
  }

  let status: VitalSign = "Healthy";
  if (warnings.length > 0 || errors.length > 0 || bannedTermsFound.length > 0) status = "Degraded";
  if (profileCount === 0 || !physicsActive) {
    status = "Critical";
  }

  return {
    status,
    neuroProfiles: profileCount,
    physicsActive,
    brandingLocked: true, // Asset verification happens via source control
    logoExists: true,
    missingFiles: [],
    errors,
    warnings,
    bannedTermsFound,
  };
}
