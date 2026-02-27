import { NextResponse } from 'next/server';

export async function GET() {
  const data = [
    {
      id: '1',
      title: 'Global Markets React to Fed Statements',
      summary: 'Central bank signals potential rate shifts in late Q4.',
      content: 'The Federal Reserve recently issued a statement suggesting that inflation targets are nearing levels that could warrant a shift in monetary policy. Market participants are split on the timing...',
      url: 'https://example.com/news/1',
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Tech Stocks Surge Amid AI Breakthroughs',
      summary: 'Renewed interest in semiconductor manufacturing drives index higher.',
      content: 'A major breakthrough in AI chip efficiency has propelled several leading tech companies to all-time highs today. Analysts suggest this could be the start of a broader sector rotation...',
      url: 'https://example.com/news/2',
      timestamp: new Date().toISOString(),
    },
  ];

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  });
}