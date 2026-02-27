'use server';
/**
 * @fileOverview A Genkit flow for generating concise summaries of market news articles.
 *
 * - marketNewsSummaryGeneration - A function that generates a summary of market news.
 * - MarketNewsSummaryInput - The input type for the marketNewsSummaryGeneration function.
 * - MarketNewsSummaryOutput - The return type for the marketNewsSummaryGeneration function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const ArticleSchema = z.object({
  title: z.string().describe('The title of the news article.'),
  url: z.string().url().optional().describe('The URL of the news article.'),
  content: z.string().describe('The full content of the news article.'),
});

const MarketNewsSummaryInputSchema = z.object({
  articles: z.array(ArticleSchema).describe('An array of market news articles to summarize.'),
});
export type MarketNewsSummaryInput = z.infer<typeof MarketNewsSummaryInputSchema>;

// Output Schema
const MarketNewsSummaryOutputSchema = z.string().describe('A concise, AI-generated summary of the market news, highlighting key developments and implications.');
export type MarketNewsSummaryOutput = z.infer<typeof MarketNewsSummaryOutputSchema>;

// Wrapper function
export async function marketNewsSummaryGeneration(
  input: MarketNewsSummaryInput
): Promise<MarketNewsSummaryOutput> {
  return marketNewsSummaryFlow(input);
}

// Prompt definition
const marketNewsSummaryPrompt = ai.definePrompt({
  name: 'marketNewsSummaryPrompt',
  input: {schema: MarketNewsSummaryInputSchema},
  output: {schema: MarketNewsSummaryOutputSchema},
  prompt: `You are an expert market analyst. Your task is to provide a concise, AI-generated summary of the following market news articles.\nFocus on key developments, their implications, and overall market sentiment.\nThe summary should be easy to understand and provide a quick overview without requiring the user to read lengthy reports.\n\nHere are the news articles:\n\n{{#each articles}}\n---\nTitle: {{{this.title}}}\nURL: {{{this.url}}}\nContent:\n{{{this.content}}}\n{{/each}}\n\nPlease provide the consolidated summary:`,
});

// Flow definition
const marketNewsSummaryFlow = ai.defineFlow(
  {
    name: 'marketNewsSummaryFlow',
    inputSchema: MarketNewsSummaryInputSchema,
    outputSchema: MarketNewsSummaryOutputSchema,
  },
  async (input) => {
    const {output} = await marketNewsSummaryPrompt(input);
    if (!output) {
      throw new Error('Failed to generate market news summary.');
    }
    return output;
  }
);
