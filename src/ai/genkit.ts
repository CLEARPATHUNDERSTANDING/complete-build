import { genkit } from 'genkit';
import { openAI } from 'genkitx-openai';

/**
 * MASTER AI ENGINE - RESTORED & SECURED
 * Switched to OpenAI plugin to resolve build-destruction errors.
 * Logic is now server-side only via Genkit Flows.
 */
export const ai = genkit({
  plugins: [openAI()],
  model: 'openai/gpt-4o-mini',
});