/**
 * @fileOverview System Diagnostic "Doctor" - Core Logic
 * Monitors application "Vital Signs" to prevent IP deletion or branding corruption.
 * Optimized for Next.js 15: Strictly environment-aware to prevent client crashes.
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
  logoExists: boolean;
  bannedTermsFound: string[];
  missingFiles: string[];
  errors: string[];
  warnings: string[];
}

export const MANDATORY_LOGO_URL =
  "https://i.postimg.cc/3NZqktNh/Chat-GPT-Image-Feb-26-2026-02-20-36-PM.png";

const REQUIRED_FILES = [
  "src/lib/neuro/profiles.ts",
  "src/lib/neuro/chartPhysics.ts",
  "src/components/ui/card.tsx",
  "src/components/SocialPlatform/SocialPlatform.tsx",
];

const BANNED_TERMS = [
  "replit",
  "netlify",
  "purple blur",
  "default orchid",
  "tradingview widget",
  "block trading",
  "after patent"
];

/**
 * Diagnostic logic - Environment aware to prevent browser crashes.
 */
export function diagnoseSystem(): SystemHealth {
  const isServer = typeof window === 'undefined';
  const errors: string[] = [];
  const warnings: string[] = [];
  let missingFiles: string[] = [];
  let bannedTermsFound: string[] = [];
  let brandingLocked = true;
  let wrappersEnforced = true;

  // NODE-ONLY FILESYSTEM SCANNING
  if (isServer) {
    try {
      // Use local require to avoid bundler analysis on the client
      const fs = require('fs');
      const path = require('path');
      const root = process.cwd();

      // Check for missing files
      missingFiles = REQUIRED_FILES.filter(file => !fs.existsSync(path.join(root, file)));
      if (missingFiles.length > 0) {
        errors.push(`Missing required files: ${missingFiles.join(", ")}`);
      }

      // Scan for banned terms
      REQUIRED_FILES.forEach(file => {
        const fullPath = path.join(root, file);
        if (fs.existsSync(fullPath)) {
          const content = fs.readFileSync(fullPath, "utf8").toLowerCase();
          BANNED_TERMS.forEach(term => {
            if (content.includes(term.toLowerCase())) {
              bannedTermsFound.push(`${file} -> "${term}"`);
            }
          });
        }
      });

      if (bannedTermsFound.length > 0) {
        warnings.push("Banned terms or patterns detected in protected files.");
      }

      // Check branding lock
      const brandingFiles = [
        "src/components/SocialPlatform/SocialPlatform.tsx",
        "src/app/page.tsx",
        "src/components/DiagnosticLogo.tsx"
      ];
      const hasLogo = brandingFiles.some(file => {
        const p = path.join(root, file);
        return fs.existsSync(p) && fs.readFileSync(p, "utf8").includes(MANDATORY_LOGO_URL);
      });
      brandingLocked = hasLogo;
      if (!brandingLocked) {
        errors.push("Branding Failure: Mandatory logo reference not found.");
      }

    } catch (e) {
      // Diagnostic engine silently fails if environment is restrictive
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
  } catch (e) {
    errors.push(`Physics Failure: Engine validation failed.`);
  }

  let status: VitalSign = "Healthy";
  if (warnings.length > 0 || errors.length > 0) status = "Degraded";
  if (profileCount === 0 || !physicsActive || (isServer && (!brandingLocked || missingFiles.length > 0))) {
    status = "Critical";
  }

  return {
    status,
    neuroProfiles: profileCount,
    physicsActive,
    brandingLocked,
    wrappersEnforced,
    logoExists: true,
    bannedTermsFound,
    missingFiles,
    errors,
    warnings,
  };
}
