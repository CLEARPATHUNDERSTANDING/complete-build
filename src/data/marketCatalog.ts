'use client';
/**
 * @fileOverview Master catalog of all tradable markets, asset classes, and instruments.
 * This file serves as the single source of truth for the platform's "Trading Universe".
 */

export type MarketCategory = 'asset-class' | 'instrument' | 'specialty';

export interface MarketItem {
  id: string;
  label: string;
  category: MarketCategory;
  description?: string;
  iconName?: string;
}

export const MARKET_CATALOG: MarketItem[] = [
  // --- ASSET CLASSES ---
  { id: 'forex', label: 'Forex', category: 'asset-class', description: 'Foreign Exchange / Currencies' },
  { id: 'equities', label: 'Equities', category: 'asset-class', description: 'Stocks and Shares' },
  { id: 'bonds', label: 'Bonds', category: 'asset-class', description: 'Fixed Income / Rates' },
  { id: 'commodities', label: 'Commodities', category: 'asset-class', description: 'Raw materials & Metals' },
  { id: 'crypto', label: 'Crypto', category: 'asset-class', description: 'Digital Assets' },
  { id: 'real-estate', label: 'Real Estate', category: 'asset-class', description: 'Property Securities & REITs' },
  { id: 'credit', label: 'Credit', category: 'asset-class', description: 'Corporate & Sovereign Debt' },

  // --- INSTRUMENTS ---
  { id: 'spot', label: 'Spot', category: 'instrument', description: 'Immediate Delivery Markets' },
  { id: 'futures', label: 'Futures', category: 'instrument', description: 'Standardized Forward Contracts' },
  { id: 'options', label: 'Options', category: 'instrument', description: 'Rights to Buy/Sell Derivatives' },
  { id: 'etfs', label: 'ETFs', category: 'instrument', description: 'Exchange Traded Funds' },
  { id: 'cfds', label: 'CFDs', category: 'instrument', description: 'Contracts for Difference' },
  { id: 'swaps', label: 'Swaps', category: 'instrument', description: 'Interest Rate & Currency Swaps' },
  { id: 'structured-products', label: 'Structured Products', category: 'instrument', description: 'Hybrid Derivatives' },

  // --- SPECIALTY MARKETS ---
  { id: 'volatility', label: 'Volatility', category: 'specialty', description: 'VIX / Variance / Skew' },
  { id: 'carbon', label: 'Carbon', category: 'specialty', description: 'Emissions / Credits' },
  { id: 'power', label: 'Power', category: 'specialty', description: 'Electricity & Regional Energy' },
  { id: 'freight', label: 'Freight', category: 'specialty', description: 'Shipping & Baltic Dry' },
  { id: 'money-markets', label: 'Money Markets', category: 'specialty', description: 'Short-term Institutional Rates' },
  { id: 'prediction-event', label: 'Prediction / Event', category: 'specialty', description: 'Niche Contracts' },
];

export const getMarketsByCategory = (category: MarketCategory) => 
  MARKET_CATALOG.filter(item => item.category === category);
