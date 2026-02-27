"use client"

import * as React from "react"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function MarketPanel() {
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/market')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4 animate-pulse bg-muted rounded-lg h-full" />;

  return (
    <Card className="h-full shadow-none border-none bg-transparent">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-headline flex items-center justify-between">
          Live Market
          <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-wider opacity-70">30s Update</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data?.assets.map((asset: any) => (
          <div key={asset.symbol} className="flex items-center justify-between p-3 rounded-md bg-card border shadow-sm transition-all hover:border-primary/30">
            <div>
              <p className="font-semibold text-sm">{asset.symbol}</p>
              <p className="text-xs text-muted-foreground">${asset.price.toLocaleString()}</p>
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${asset.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {asset.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {Math.abs(asset.change)}%
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}