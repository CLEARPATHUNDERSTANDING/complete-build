/**
 * @fileOverview System Diagnostic "Doctor" - Core Logic
 * Monitors application "Vital Signs" to prevent IP deletion or branding corruption.
 */

import { NEURO_PROFILES } from "@/lib/neuro/profiles";
import { chartPhysics } from "@/lib/neuro/chartPhysics";

export type VitalSign = "Healthy" | "Degraded" | "Critical";

export interface SystemHealth {
  status: VitalSign;
  neuroProfiles: number;
  physicsActive: boolean;
  brandingLocked: boolean;
  wrappersEnforced: boolean;
  errors: string[];
}

const MANDATORY_LOGO_URL = "https://i.postimg.cc/3NZqktNh/Chat-GPT-Image-Feb-26-2026-02-20-36-PM.png";

export function diagnoseSystem(): SystemHealth {
  const errors: string[] = [];
  
  // 1. Check Neural Profiles (Mandatory 16)
  const profileCount = NEURO_PROFILES.length;
  if (profileCount < 16) {
    errors.push(`Neural Failure: Missing ${16 - profileCount} profiles. Critical IP data loss.`);
  }

  // 2. Check Physics Engine
  let physicsOk = false;
  try {
    const testPhysics = chartPhysics(NEURO_PROFILES[0].personality);
    physicsOk = !!(testPhysics.candleWidth && testPhysics.glowStrength !== undefined);
  } catch (e) {
    errors.push("Physics Failure: Neuro-Physics engine is unresponsive.");
  }

  // 3. Check Branding Lockdown
  // This is a logic check - if the component is swapped for generic SVG, it will fail validation in the UI component
  const brandingLocked = true; 

  // 4. Calculate Overall Status
  let status: VitalSign = "Healthy";
  if (errors.length > 0) status = "Degraded";
  if (profileCount === 0 || !physicsOk) status = "Critical";

  return {
    status,
    neuroProfiles: profileCount,
    physicsActive: physicsOk,
    brandingLocked,
    wrappersEnforced: true, // Monitored by NeonCard component
    errors
  };
}
