import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.TWELVEDATA_API_KEY;
  
  if (!apiKey || apiKey.startsWith('sk-abc')) {
    // Fallback to stable mock if keys are still in placeholder state
    return NextResponse.json({
      assets: [
        { symbol: 'BTC/USD', price: 64200.5, change: 2.5, status: 'bullish' },
        { symbol: 'ETH/USD', price: 3450.2, change: -1.2, status: 'bearish' },
        { symbol: 'SPY', price: 512.3, change: 0.1, status: 'neutral' },
        { symbol: 'GOLD', price: 2150.0, change: 0.8, status: 'bullish' },
      ],
      timestamp: new Date().toISOString(),
      mode: 'diagnostic-fallback'
    });
  }

  try {
    const res = await fetch(`https://api.twelvedata.com/price?symbol=BTC/USD,ETH/USD,SPY,QQQ&apikey=${apiKey}`);
    const data = await res.json();
    
    // Normalize data for the UI
    const assets = Object.keys(data).map(symbol => ({
      symbol,
      price: parseFloat(data[symbol].price),
      change: (Math.random() * 4) - 2, // Percentage placeholder until series fetch
      status: parseFloat(data[symbol].price) > 0 ? 'bullish' : 'neutral'
    }));

    return NextResponse.json({ assets, timestamp: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json({ error: "Market Sync Failed" }, { status: 500 });
  }
}
