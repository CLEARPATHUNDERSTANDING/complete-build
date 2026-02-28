
import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    assets: [
      { symbol: 'US10Y', price: 4.25, change: 0.02, status: 'neutral', marketType: 'bonds' },
      { symbol: 'US02Y', price: 4.62, change: -0.01, status: 'neutral', marketType: 'bonds' },
      { symbol: 'US30Y', price: 4.38, change: 0.05, status: 'bearish', marketType: 'bonds' },
    ],
    timestamp: new Date().toISOString(),
  };
  return NextResponse.json(data);
}
