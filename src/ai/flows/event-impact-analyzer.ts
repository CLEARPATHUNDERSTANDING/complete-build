'use server';
/**
 * @fileOverview An AI agent that analyzes the potential impact of economic events or news.
 *
 * - analyzeEventImpact - A function that handles the event impact analysis process.
 * - EventImpactAnalyzerInput - The input type for the analyzeEventImpact function.
 * - EventImpactAnalyzerOutput - The return type for the analyzeEventImpact function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EventImpactAnalyzerInputSchema = z.object({
  eventName: z
    .string()
    .describe('The name or description of the economic event or news item.'),
});
export type EventImpactAnalyzerInput = z.infer<
  typeof EventImpactAnalyzerInputSchema
>;

const EventImpactAnalyzerOutputSchema = z.object({
  analysis: z
    .string()
    .describe(
      'A brief analysis of the potential impact of the event on relevant assets or sectors.'
    ),
  relevantAssetsOrSectors: z
    .array(z.string())
    .describe(
      'A list of assets or sectors potentially affected by the event.'
    ),
});
export type EventImpactAnalyzerOutput = z.infer<
  typeof EventImpactAnalyzerOutputSchema
>;

export async function analyzeEventImpact(
  input: EventImpactAnalyzerInput
): Promise<EventImpactAnalyzerOutput> {
  return eventImpactAnalyzerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'eventImpactAnalyzerPrompt',
  input: {schema: EventImpactAnalyzerInputSchema},
  output: {schema: EventImpactAnalyzerOutputSchema},
  prompt: `As a market analyst, your task is to provide a brief analysis of the potential impact of an economic event or news item on relevant assets or sectors.

Event: {{{eventName}}}

Provide a concise analysis focusing on potential risks and opportunities, and list the key assets or sectors that are likely to be affected.`,
});

const eventImpactAnalyzerFlow = ai.defineFlow(
  {
    name: 'eventImpactAnalyzerFlow',
    inputSchema: EventImpactAnalyzerInputSchema,
    outputSchema: EventImpactAnalyzerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
