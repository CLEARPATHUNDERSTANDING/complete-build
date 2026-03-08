/**
 * @fileOverview Gemini Guard - Prompt and Output validation for Rick's build environment.
 */

export interface GuardedPromptOptions {
  userPrompt: string;
  taskType?: "ui" | "code" | "content" | "repair";
}

const NON_NEGOTIABLE_RULES = `
You are working inside Rick's protected build environment.

Mandatory rules:
1. Never remove or replace required branding assets unless explicitly instructed.
2. Preserve all required neuro profile architecture.
3. Do not introduce Replit, Netlify, TradingView widgets, or block trading features.
4. Use dark black backgrounds with neon accents only.
5. Avoid dull blur, muddy gradients, default purple haze, orchid glow, or weak contrast.
6. Prefer fluorescent orange, lava red, neon fuchsia, cyan, indigo, hot pink, electric green.
7. Do not rewrite unrelated files.
8. Do not rename core files unless specifically requested.
9. Keep wrappers consistent: NeonCard, CardShell, or equivalent protected wrapper.
10. Output production-safe code only.
11. If unsure, preserve the current architecture instead of improvising.
12. Never silently remove functionality.
`;

function getTaskRules(taskType: GuardedPromptOptions["taskType"]): string {
  switch (taskType) {
    case "ui":
      return `
UI task rules:
- Keep visuals high-contrast and readable.
- No weak generic templates.
- No default corporate white theme.
- Preserve neon identity and card hierarchy.
`;
    case "code":
      return `
Code task rules:
- Return exact code only.
- No pseudo-code.
- No fake placeholders unless clearly labeled.
- Do not invent imports that do not exist.
`;
    case "repair":
      return `
Repair task rules:
- Diagnose root cause first.
- Prefer the smallest safe fix.
- Do not refactor unrelated modules.
- Preserve file names and exports unless broken.
`;
    case "content":
    default:
      return `
General task rules:
- Stay specific.
- Preserve project identity.
- Do not collapse important structure.
`;
  }
}

export function buildGuardedGeminiPrompt(options: GuardedPromptOptions): string {
  return `
${NON_NEGOTIABLE_RULES}

${getTaskRules(options.taskType)}

User task:
${options.userPrompt}
`.trim();
}

export function validateGeminiOutput(output: string): {
  valid: boolean;
  reasons: string[];
} {
  const reasons: string[] = [];
  const lower = output.toLowerCase();

  const bannedPatterns = [
    "replit",
    "netlify",
    "tradingview widget",
    "block trading",
    "purple blur",
    "orchid glow",
    "after patent"
  ];

  for (const pattern of bannedPatterns) {
    if (lower.includes(pattern)) {
      reasons.push(`Forbidden output detected: "${pattern}"`);
    }
  }

  if (lower.includes("todo") && lower.includes("later")) {
    reasons.push("Output looks incomplete or deferred.");
  }

  return {
    valid: reasons.length === 0,
    reasons,
  };
}
