import { NextResponse } from 'next/server';

export async function GET() {
  // Mock normalized market data
  const data = {
    assets: [
      { symbol: 'BTC/USD', price: 64200.5, change: 2.5, status: 'bullish' },
      { symbol: 'ETH/USD', price: 3450.2, change: -1.2, status: 'bearish' },
      { symbol: 'SPY', price: 512.3, change: 0.1, status: 'neutral' },
      { symbol: 'GOLD', price: 2150.0, change: 0.8, status: 'bullish' },
    ],
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=59',
    },
  });
}