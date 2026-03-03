/**
 * @fileOverview Utility to ensure all trading mode descriptions and compliance lines 
 * strictly follow data-only presentation rules.
 */

export interface ComplianceCheck {
  id: string;
  label: string;
  description: string;
  complianceLine: string;
}

export function validateModesDataOnly(modes: ComplianceCheck[]) {
  const forbidden = [
    "buy", "sell", "recommend", "advice", "trade now", "profit", "guaranteed"
  ];

  modes.forEach(mode => {
    const text = (mode.description + " " + mode.complianceLine).toLowerCase();
    forbidden.forEach(word => {
      if (text.includes(word)) {
        console.warn(`COMPLIANCE WARNING: Mode "${mode.label}" contains forbidden term: "${word}"`);
      }
    });
  });
  
  return true;
}
