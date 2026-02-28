
"use client"

import * as React from "react"
import { TrendingUp, TrendingDown, Search, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface MarketPanelProps {
  type?: string;
  onSelect?: (symbol: string) => void;
  activeSymbol?: string;
}

export function MarketPanel({ type = 'stocks', onSelect, activeSymbol }: MarketPanelProps) {
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    setLoading(true);
    // Use the specific market endpoint or fallback to general
    const endpoint = type && type !== 'stocks' ? `/api/markets/${type}` : '/api/markets/stocks';
    
    fetch(endpoint)
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        // Fallback to generic market if specific fails
        fetch('/api/market')
          .then(res => res.json())
          .then(d => {
            setData(d);
            setLoading(false);
          });
      });
  }, [type]);

  const filteredAssets = React.useMemo(() => {
    if (!data?.assets) return [];
    return data.assets.filter((a: any) => 
      a.symbol.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  if (loading) return (
    <div className="p-8 flex flex-col items-center justify-center h-full text-muted-foreground animate-pulse">
      <Loader2 className="w-8 h-8 animate-spin mb-4" />
      <p className="text-xs uppercase font-bold tracking-widest">Loading Market Data...</p>
    </div>
  );

  return (
    <Card className="h-full flex flex-col shadow-none border-none bg-transparent overflow-hidden">
      <CardHeader className="pb-3 px-4">
        <div className="flex items-center justify-between mb-3">
          <CardTitle className="text-lg font-headline flex items-center gap-2">
            {type.charAt(0).toUpperCase() + type.slice(1)} Feed
          </CardTitle>
          <Badge variant="outline" className="text-[9px] uppercase font-bold tracking-wider opacity-70">Live</Badge>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search symbols..." 
            className="pl-8 h-9 text-xs bg-muted/30 border-primary/10" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full px-4">
          <div className="space-y-2 pb-4">
            {filteredAssets.map((asset: any) => (
              <button
                key={asset.symbol}
                onClick={() => onSelect?.(asset.symbol)}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-xl border transition-all hover:bg-primary/5 active:scale-[0.98]",
                  activeSymbol === asset.symbol 
                    ? "bg-primary/10 border-primary/50 shadow-inner" 
                    : "bg-card/50 border-primary/5 shadow-sm"
                )}
              >
                <div className="text-left">
                  <p className="font-bold text-sm tracking-tight">{asset.symbol}</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">{asset.marketType || type}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm font-bold">${asset.price.toLocaleString()}</p>
                  <div className={cn(
                    "flex items-center gap-1 text-[10px] font-bold justify-end",
                    asset.change >= 0 ? 'text-green-500' : 'text-red-500'
                  )}>
                    {asset.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(asset.change)}%
                  </div>
                </div>
              </button>
            ))}
            {filteredAssets.length === 0 && (
              <div className="py-10 text-center text-muted-foreground">
                <p className="text-xs italic">No symbols found matching "{search}"</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
