# 📊 InsightFlow Data Specifications

This document defines the data structures currently "running" in the InsightFlow UI. Use these schemas when coding your Genkit tools or connecting the API key stack.

## 🛠️ The Tech Stack
- **Visual Engine:** [ApexCharts](https://apexcharts.com/) (React-ApexCharts) - Handles the "Neuro-Physics" (glow, spacing, density).
- **Data Source:** [TwelveData](https://twelvedata.com/) - Primary provider for OHLC (Open, High, Low, Close) candlestick data.

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

## 3. Financial Candlestick Schema (TwelveData Compatible)
**Component:** `CandlestickChart.tsx`
**Format:**
```typescript
type ApexCandlePoint = {
  x: number; // Unix timestamp in milliseconds
  y: [number, number, number, number]; // [Open, High, Low, Close]
};
```
*Note: When fetching from TwelveData, ensure you map their `datetime` (string) to a Unix timestamp (number) and their string values (o, h, l, c) to numbers.*

## 4. API Key Usage Strategy
- **TwelveData/Polygon:** Use for the `ApexCandlePoint` stream.
- **Finnhub/AlphaVantage:** Use for News and Market Sentiment analysis.
- **Coingecko:** Use for real-time Crypto price overlays.

---
*Note: The frontend currently uses mock data in these exact shapes to maintain structural integrity while your Genkit tools are being developed.*
