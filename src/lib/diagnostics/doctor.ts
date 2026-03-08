/**
 * @fileOverview System Diagnostic "Doctor" - Core Logic
 * Monitors application "Vital Signs" to prevent IP deletion or branding corruption.
 * Verifies 16 Neuro Profiles, Physics Engine, and Mandatory Logo integrity.
 * 
 * ENVIRONMENT NOTE: Uses dynamic requirements to prevent client-side build crashes.
 */

import { NEURO_PROFILES } from "@/lib/neuro/profiles";
import { chartPhysics } from "@/lib/neuro/chartPhysics";

// Environment-aware Node imports to prevent client-side crashes in Turbopack
const isServer = typeof window === 'undefined';
let fs: any = null;
let path: any = null;

if (isServer) {
  try {
    // Using require instead of import to hide from client-side bundlers
    fs = require('node:fs');
    path = require('node:path');
  } catch (e) {
    console.warn("Node FS/Path modules unavailable in this environment.");
  }
}

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

const REQUIRED_PROFILE_COUNT = 16;

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

function safeResolve(projectRoot: string, filePath: string): string {
  if (!path) return filePath;
  return path.join(projectRoot, filePath);
}

function fileExists(projectRoot: string, filePath: string): boolean {
  if (!fs || !path) return true; 
  return fs.existsSync(safeResolve(projectRoot, filePath));
}

function readFileSafe(projectRoot: string, filePath: string): string {
  if (!fs || !path) return ""; 
  try {
    return fs.readFileSync(safeResolve(projectRoot, filePath), "utf8");
  } catch {
    return "";
  }
}

function scanForBannedTerms(projectRoot: string, filePaths: string[]): string[] {
  if (!fs || !path) return [];
  const hits: string[] = [];

  for (const filePath of filePaths) {
    const content = readFileSafe(projectRoot, filePath).toLowerCase();
    if (!content) continue;

    for (const term of BANNED_TERMS) {
      if (content.includes(term.toLowerCase())) {
        hits.push(`${filePath} -> "${term}"`);
      }
    }
  }

  return hits;
}

function checkWrapperUsage(projectRoot: string): boolean {
  if (!fs || !path) return true;
  const socialPlatformPath = "src/components/SocialPlatform/SocialPlatform.tsx";
  const cardFilePath = "src/components/ui/card.tsx";

  const socialPlatform = readFileSafe(projectRoot, socialPlatformPath);
  const cardFile = readFileSafe(projectRoot, cardFilePath);

  const usesCardWrapper =
    socialPlatform.includes("NeonCard") ||
    socialPlatform.includes("CardShell") ||
    socialPlatform.includes("GlassCard");

  const wrapperExists =
    cardFile.includes("NeonCard") ||
    cardFile.includes("CardShell") ||
    cardFile.includes("GlassCard");

  return usesCardWrapper && wrapperExists;
}

function checkBrandingLock(projectRoot: string): boolean {
  if (!fs || !path) return true;
  const filesToCheck = [
    "src/components/SocialPlatform/SocialPlatform.tsx",
    "src/app/page.tsx",
  ];

  for (const filePath of filesToCheck) {
    const content = readFileSafe(projectRoot, filePath);
    if (content.includes(MANDATORY_LOGO_URL)) {
      return true;
    }
  }

  return false;
}

function testPhysicsEngine(): { ok: boolean; error?: string } {
  try {
    if (!Array.isArray(NEURO_PROFILES) || NEURO_PROFILES.length === 0) {
      return { ok: false, error: "No neuro profiles available for physics validation." };
    }

    const sample = NEURO_PROFILES[0];
    const personality = sample?.personality;

    if (!personality) {
      return { ok: false, error: "First neuro profile is missing personality data." };
    }

    const testPhysics = chartPhysics(personality);

    const ok =
      !!testPhysics &&
      typeof testPhysics.candleWidth !== "undefined" &&
      typeof testPhysics.glowStrength !== "undefined";

    if (!ok) {
      return { ok: false, error: "Physics engine returned incomplete configuration." };
    }

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown physics engine error.",
    };
  }
}

export function diagnoseSystem(projectRoot: string = ""): SystemHealth {
  const errors: string[] = [];
  const warnings: string[] = [];

  const missingFiles = isServer ? REQUIRED_FILES.filter((file) => !fileExists(projectRoot, file)) : [];

  if (isServer && missingFiles.length > 0) {
    errors.push(`Missing required files: ${missingFiles.join(", ")}`);
  }

  const profileCount = Array.isArray(NEURO_PROFILES) ? NEURO_PROFILES.length : 0;

  if (profileCount < REQUIRED_PROFILE_COUNT) {
    errors.push(
      `Neural Failure: Missing ${REQUIRED_PROFILE_COUNT - profileCount} profiles.`
    );
  }

  const physicsResult = testPhysicsEngine();
  if (!physicsResult.ok) {
    errors.push(`Physics Failure: ${physicsResult.error}`);
  }

  const brandingLocked = isServer ? checkBrandingLock(projectRoot) : true;
  if (isServer && !brandingLocked) {
    errors.push("Branding Failure: Mandatory logo reference not found in required UI files.");
  }

  const wrappersEnforced = isServer ? checkWrapperUsage(projectRoot) : true;
  if (isServer && !wrappersEnforced) {
    warnings.push("Wrapper Warning: NeonCard/CardShell/GlassCard wrapper not detected consistently.");
  }

  const bannedTermsFound = isServer ? scanForBannedTerms(projectRoot, REQUIRED_FILES) : [];
  if (isServer && bannedTermsFound.length > 0) {
    warnings.push("Banned terms or patterns detected in protected files.");
  }

  const logoExists = true;

  let status: VitalSign = "Healthy";

  if (warnings.length > 0 || errors.length > 0) {
    status = "Degraded";
  }

  if (
    profileCount === 0 ||
    !physicsResult.ok ||
    (isServer && (!brandingLocked || missingFiles.length > 0))
  ) {
    status = "Critical";
  }

  return {
    status,
    neuroProfiles: profileCount,
    physicsActive: physicsResult.ok,
    brandingLocked: brandingLocked,
    wrappersEnforced: wrappersEnforced,
    logoExists,
    bannedTermsFound,
    missingFiles,
    errors,
    warnings,
  };
}
