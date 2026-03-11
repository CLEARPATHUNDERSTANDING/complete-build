import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

/**
 * MASTER AI ENGINE - 2026 STANDARDS LOCKDOWN
 * Switched to Gemini 3.1 Flash-Lite for high-fidelity diagnostic performance.
 */
export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-3.1-pro-preview-lite-preview',
});
