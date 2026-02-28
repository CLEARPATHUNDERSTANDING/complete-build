
import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    assets: [
      { symbol: 'ES1!', price: 5124.50, change: 0.85, status: 'bullish', marketType: 'futures' },
      { symbol: 'NQ1!', price: 18240.25, change: 1.20, status: 'bullish', marketType: 'futures' },
      { symbol: 'YM1!', price: 39120.00, change: -0.10, status: 'bearish', marketType: 'futures' },
    ],
    timestamp: new Date().toISOString(),
  };
  return NextResponse.json(data);
}
