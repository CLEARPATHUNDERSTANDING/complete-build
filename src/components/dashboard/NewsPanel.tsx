"use client"

import * as React from "react"
import { Newspaper, Sparkles, Loader2, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { marketNewsSummaryGeneration } from "@/ai/flows/market-news-summary"
import { analyzeEventImpact } from "@/ai/flows/event-impact-analyzer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/hooks/use-toast"

export function NewsPanel() {
  const [news, setNews] = React.useState<any[]>([]);
  const [summary, setSummary] = React.useState<string | null>(null);
  const [summarizing, setSummarizing] = React.useState(false);
  const [analyzingItem, setAnalyzingItem] = React.useState<string | null>(null);

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
      toast({
        title: "Market Summary Generated",
        description: "AI has analyzed the latest news cycle.",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSummarizing(false);
    }
  };

  const handleItemAnalyze = async (title: string, id: string) => {
    setAnalyzingItem(id);
    try {
      const result = await analyzeEventImpact({ eventName: title });
      toast({
        title: "Event Impact Analysis",
        description: result.analysis,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzingItem(null);
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
          className="bg-primary/10 hover:bg-primary/20 border-primary/30 text-primary-foreground"
        >
          {summarizing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
          AI Summary
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        {summary && (
          <div className="mb-4 p-4 rounded-lg bg-primary/10 border border-primary/20 text-sm italic text-white font-medium animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">AI INSIGHT</span>
            </div>
            {summary}
          </div>
        )}
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4">
            {news.map((item) => (
              <div 
                key={item.id} 
                className="group p-4 rounded-lg bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all cursor-pointer relative"
              >
                <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{item.summary}</p>
                <div className="mt-3 flex items-center justify-between text-[10px] uppercase font-bold text-muted-foreground">
                  <span>Feed: Global</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 px-2 text-[9px] gap-1 hover:text-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleItemAnalyze(item.title, item.id);
                    }}
                    disabled={analyzingItem === item.id}
                  >
                    {analyzingItem === item.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Zap className="w-3 h-3" />}
                    Quick Analyze
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
