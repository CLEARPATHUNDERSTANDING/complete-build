# 📊 InsightFlow Data Specifications

This document defines the data structures currently "running" in the InsightFlow UI. Use these schemas when coding your Genkit tools or connecting the API key stack.

## 1. Market Asset Schema
**Source:** `/api/market`
**Format:**
```typescript
interface MarketAsset {
  symbol: string;  // e.g., "BTC/USD", "SPY"
  price: number;   // Current spot price
  change: number;  // Percentage change (2.5, -1.2)
  status: 'bullish' | 'bearish' | 'neutral';
}

interface MarketDataResponse {
  assets: MarketAsset[];
  timestamp: string; // ISO format
}
```

## 2. News Feed Schema
**Source:** `/api/news`
**Format:**
```typescript
interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string; // Full text for AI analysis
  url?: string;
  timestamp: string; // ISO format
}
```

## 3. Financial Candlestick Schema
**Component:** `CandlestickChart.tsx` (ApexCharts)
**Format:**
```typescript
type ApexCandlePoint = {
  x: number; // Unix timestamp in milliseconds
  y: [number, number, number, number]; // [Open, High, Low, Close]
};
```

## 4. Neuro Profile Schema
**Source:** `src/lib/neuro/profiles.ts`
**Structure:**
- **ID:** `NeuroProfileId` (16 unique IDs like `adhd_hyperfocus`)
- **Personality:** Controls colors (`upColor`, `downColor`), glow levels (`Low`, `Medium`, `High`), and spacing physics.

## 5. API Key Usage Strategy
- **TwelveData/Polygon:** Recommended for OHLC (Candle) data.
- **Finnhub/AlphaVantage:** Recommended for News and Market Sentiment.
- **Coingecko:** Recommended for Crypto spot prices.
- **FRED:** Recommended for Macroeconomic context.

---
*Note: The frontend currently uses mock data in these exact shapes to maintain structural integrity while the tools are being developed.*
