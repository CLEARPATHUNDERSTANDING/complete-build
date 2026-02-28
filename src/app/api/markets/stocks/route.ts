
import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    assets: [
      { symbol: 'AAPL', price: 182.40, change: -0.45, status: 'bearish', marketType: 'stocks' },
      { symbol: 'NVDA', price: 820.50, change: 4.2, status: 'bullish', marketType: 'stocks' },
      { symbol: 'TSLA', price: 175.20, change: -1.8, status: 'bearish', marketType: 'stocks' },
    ],
    timestamp: new Date().toISOString(),
  };
  return NextResponse.json(data);
}
