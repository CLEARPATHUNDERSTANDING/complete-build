"use client"

import * as React from "react"
import { Newspaper, Sparkles, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { marketNewsSummaryGeneration } from "@/ai/flows/market-news-summary"
import { ScrollArea } from "@/components/ui/scroll-area"

export function NewsPanel() {
  const [news, setNews] = React.useState<any[]>([]);
  const [summary, setSummary] = React.useState<string | null>(null);
  const [summarizing, setSummarizing] = React.useState(false);

  React.useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(setNews);
  }, []);

  const handleAIAnalyze = async () => {
    if (!news.length) return;
    setSummarizing(true);
    try {
      const result = await marketNewsSummaryGeneration({ articles: news });
      setSummary(result);
    } catch (err) {
      console.error(err);
    } finally {
      setSummarizing(false);
    }
  };

  return (
    <Card className="h-full flex flex-col shadow-none border-none bg-transparent">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-headline flex items-center gap-2">
          <Newspaper className="w-5 h-5" />
          Market News
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleAIAnalyze} 
          disabled={summarizing || !news.length}
          className="bg-accent/10 hover:bg-accent/20 border-accent/30 text-accent-foreground"
        >
          {summarizing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
          AI Summary
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        {summary && (
          <div className="mb-4 p-4 rounded-lg bg-primary/5 border border-primary/20 text-sm italic text-primary-foreground/90 font-medium">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase tracking-widest">AI INSIGHT</span>
            </div>
            {summary}
          </div>
        )}
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4">
            {news.map((item) => (
              <div key={item.id} className="p-4 rounded-lg bg-card border hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{item.summary}</p>
                <div className="mt-2 flex items-center justify-between text-[10px] uppercase font-bold text-muted-foreground">
                  <span>Reuters</span>
                  <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}