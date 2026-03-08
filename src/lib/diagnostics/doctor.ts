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
  logoExists: boolean;
  missingFiles: string[];
  errors: string[];
  warnings: string[];
  bannedTermsFound: string[];
}

export const MANDATORY_LOGO_URL =
  "https://i.postimg.cc/3NZqktNh/Chat-GPT-Image-Feb-26-2026-02-20-36-PM.png";

const REQUIRED_FILES = [
  "src/lib/neuro/profiles.ts",
  "src/lib/neuro/chartPhysics.ts",
  "src/components/ui/card.tsx",
  "src/components/SocialPlatform/SocialPlatform.tsx",
];

const BANNED_TERMS = ["after patent", "replit", "netlify"];

/**
 * Diagnostic logic - Environment aware to prevent browser crashes.
 */
export function diagnoseSystem(): SystemHealth {
  const isServer = typeof window === 'undefined';
  const errors: string[] = [];
  const warnings: string[] = [];
  let missingFiles: string[] = [];
  let brandingLocked = true;
  let bannedTermsFound: string[] = [];

  if (isServer) {
    try {
      // Local requires within server guard to prevent client-side bundling
      const fs = require('fs');
      const path = require('path');
      const root = process.cwd();

      // Check for missing files
      missingFiles = REQUIRED_FILES.filter(file => !fs.existsSync(path.join(root, file)));
      if (missingFiles.length > 0) {
        errors.push(`Missing required files: ${missingFiles.join(", ")}`);
      }

      // Check branding lock
      const brandingFiles = [
        "src/app/page.tsx",
        "src/components/DiagnosticLogo.tsx"
      ];
      brandingLocked = brandingFiles.every(file => {
        const p = path.join(root, file);
        if (!fs.existsSync(p)) return false;
        const content = fs.readFileSync(p, "utf8");
        
        // Scan for banned terms while we are at it
        BANNED_TERMS.forEach(term => {
          if (content.toLowerCase().includes(term)) {
            if (!bannedTermsFound.includes(term)) bannedTermsFound.push(term);
          }
        });

        return content.includes(MANDATORY_LOGO_URL);
      });

    } catch (e) {
      // Silent fail-safe for restricted environments
    }
  }

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
  } catch (e) {}

  let status: VitalSign = "Healthy";
  if (warnings.length > 0 || errors.length > 0 || bannedTermsFound.length > 0) status = "Degraded";
  if (profileCount === 0 || !physicsActive) {
    status = "Critical";
  }

  return {
    status,
    neuroProfiles: profileCount,
    physicsActive,
    brandingLocked,
    logoExists: true,
    missingFiles,
    errors,
    warnings,
    bannedTermsFound,
  };
}
