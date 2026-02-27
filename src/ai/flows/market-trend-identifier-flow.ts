'use server';
/**
 * @fileOverview A Genkit flow for identifying key market trends and anomalies from market data.
 *
 * - identifyMarketTrends - A function that handles the market trend identification process.
 * - MarketTrendIdentifierInput - The input type for the identifyMarketTrends function.
 * - MarketTrendIdentifierOutput - The return type for the identifyMarketTrends function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MarketTrendIdentifierInputSchema = z.object({
  marketData: z
    .string()
    .describe(
      'A comprehensive summary or raw snippet of current market data, including relevant financial indicators, news headlines, and any specific data points for analysis.'
    ),
});
export type MarketTrendIdentifierInput = z.infer<
  typeof MarketTrendIdentifierInputSchema
>;

const MarketTrendIdentifierOutputSchema = z.object({
  trends: z.array(z.string()).describe('A list of identified key market trends.'),
  anomalies: z
    .array(z.string())
    .describe('A list of identified market anomalies or unusual patterns.'),
});
export type MarketTrendIdentifierOutput = z.infer<
  typeof MarketTrendIdentifierOutputSchema
>;

export async function identifyMarketTrends(
  input: MarketTrendIdentifierInput
): Promise<MarketTrendIdentifierOutput> {
  return marketTrendIdentifierFlow(input);
}

const prompt = ai.definePrompt({
  name: 'marketTrendIdentifierPrompt',
  input: { schema: MarketTrendIdentifierInputSchema },
  output: { schema: MarketTrendIdentifierOutputSchema },
  prompt: `You are an expert market analyst.
Your task is to analyze the provided market data and identify key trends and anomalies.

Market Data:
{{{marketData}}}

Identify the most significant trends and any unusual or unexpected patterns (anomalies) from the data provided.
Provide your findings in a structured JSON format, separating trends and anomalies into distinct lists.`,
});

const marketTrendIdentifierFlow = ai.defineFlow(
  {
    name: 'marketTrendIdentifierFlow',
    inputSchema: MarketTrendIdentifierInputSchema,
    outputSchema: MarketTrendIdentifierOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
