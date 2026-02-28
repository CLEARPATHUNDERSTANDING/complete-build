
import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    assets: [
      { symbol: 'EUR/USD', price: 1.0854, change: 0.12, status: 'bullish', marketType: 'forex' },
      { symbol: 'GBP/USD', price: 1.2645, change: -0.05, status: 'bearish', marketType: 'forex' },
      { symbol: 'USD/JPY', price: 150.32, change: 0.45, status: 'bullish', marketType: 'forex' },
    ],
    timestamp: new Date().toISOString(),
  };
  return NextResponse.json(data);
}
