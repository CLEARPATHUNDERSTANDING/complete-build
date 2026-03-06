/**
 * @fileOverview Gemini Executor - Execution and Retry logic for Guarded Prompts.
 */

import { buildGuardedGeminiPrompt, validateGeminiOutput } from "./geminiGuard";

export interface GeminiExecutorOptions {
  userPrompt: string;
  taskType?: "ui" | "code" | "content" | "repair";
  callModel: (prompt: string) => Promise<string>;
  maxRetries?: number;
}

export async function runGuardedGeminiTask({
  userPrompt,
  taskType = "code",
  callModel,
  maxRetries = 2,
}: GeminiExecutorOptions): Promise<{
  ok: boolean;
  output: string;
  attempts: number;
  errors: string[];
}> {
  const errors: string[] = [];
  let attempts = 0;
  let lastOutput = "";

  while (attempts <= maxRetries) {
    attempts += 1;

    const guardedPrompt = buildGuardedGeminiPrompt({
      userPrompt,
      taskType,
    });

    const output = await callModel(guardedPrompt);
    lastOutput = output;

    const validation = validateGeminiOutput(output);

    if (validation.valid) {
      return {
        ok: true,
        output,
        attempts,
        errors,
      };
    }

    errors.push(...validation.reasons);
  }

  return {
    ok: false,
    output: lastOutput,
    attempts,
    errors,
  };
}