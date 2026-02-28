
import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    assets: [
      { symbol: 'BTC/USD', price: 64500.20, change: 2.4, status: 'bullish', marketType: 'crypto' },
      { symbol: 'ETH/USD', price: 3420.15, change: -1.2, status: 'bearish', marketType: 'crypto' },
      { symbol: 'SOL/USD', price: 145.50, change: 5.8, status: 'bullish', marketType: 'crypto' },
    ],
    timestamp: new Date().toISOString(),
  };
  return NextResponse.json(data);
}
