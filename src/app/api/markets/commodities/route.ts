
import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    assets: [
      { symbol: 'GOLD', price: 2155.40, change: 0.35, status: 'bullish', marketType: 'commodities' },
      { symbol: 'CRUDE_OIL', price: 78.50, change: -1.2, status: 'bearish', marketType: 'commodities' },
      { symbol: 'SILVER', price: 24.30, change: 0.15, status: 'bullish', marketType: 'commodities' },
    ],
    timestamp: new Date().toISOString(),
  };
  return NextResponse.json(data);
}
