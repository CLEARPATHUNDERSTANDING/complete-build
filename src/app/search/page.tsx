"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, ArrowLeft, Loader2, Sparkles, Brain, Newspaper, Youtube, MessageCircle, BookOpen } from "lucide-react";
import Link from "next/link";
import NeonBoard from "@/components/NeonBoard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

type SearchItem = {
  source: "news" | "youtube" | "reddit" | "wiki";
  title: string;
  url: string;
  snippet?: string;
  image?: string;
  author?: string;
  publishedAt?: string;
};

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";
  
  const [q, setQ] = useState(initialQuery);
  const [items, setItems] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<string | null>(null);

  const runSearch = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setItems(data.items || []);
      setCategory(data.category);
    } catch (e) {
      console.error("Search execution failed:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      runSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    const params = new URLSearchParams();
    params.set("q", q);
    router.replace(`/search?${params.toString()}`);
    runSearch(q);
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "news": return <Newspaper className="w-3 h-3" />;
      case "youtube": return <Youtube className="w-3 h-3" />;
      case "reddit": return <MessageCircle className="w-3 h-3" />;
      case "wiki": return <BookOpen className="w-3 h-3" />;
      default: return <Sparkles className="w-3 h-3" />;
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case "news": return "text-blue-400 bg-blue-500/10 border-blue-500/20";
      case "youtube": return "text-red-400 bg-red-500/10 border-red-500/20";
      case "reddit": return "text-orange-400 bg-orange-500/10 border-orange-500/20";
      case "wiki": return "text-purple-400 bg-purple-500/10 border-purple-500/20";
      default: return "text-indigo-400 bg-indigo-500/10 border-indigo-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500 selection:text-white">
      <header className="h-20 border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-50 px-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-[10px] font-black tracking-[0.25em] text-indigo-400 uppercase hover:text-indigo-300 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Social Hub
          </Link>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-black tracking-[0.2em] uppercase leading-none">Topic</span>
              <span className="text-[10px] font-bold tracking-[0.1em] text-white/40 uppercase">Intelligence</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-12 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-white/20"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Analyze news, videos, community trends..."
          />
          {loading && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-500 animate-spin" />}
        </form>

        <div className="text-[10px] font-black tracking-widest text-white/40 uppercase">
          Neural Search Active
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-8">
        {category && (
          <div className="mb-10 flex items-center gap-4">
            <div className="px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Category: {category.toUpperCase()}</span>
            </div>
            <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
              Cross-Referencing {items.length} Intelligence Points
            </div>
          </div>
        )}

        {loading && items.length === 0 ? (
          <div className="h-[60vh] flex flex-col items-center justify-center text-indigo-500/40">
            <Loader2 className="w-12 h-12 animate-spin mb-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Aggregating Data Truth Layer...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, idx) => (
              <a key={idx} href={item.url} target="_blank" rel="noreferrer" className="group block">
                <NeonBoard className="h-full">
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`px-3 py-1 rounded-full border flex items-center gap-2 text-[9px] font-black uppercase tracking-widest ${getSourceColor(item.source)}`}>
                        {getSourceIcon(item.source)}
                        {item.source}
                      </div>
                      {item.publishedAt && (
                        <span className="text-[9px] font-bold text-white/30 uppercase tracking-wider">
                          {new Date(item.publishedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    {item.image && (
                      <div className="relative aspect-video rounded-xl overflow-hidden mb-4 border border-white/5">
                        <img src={item.image} alt="" className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500" />
                        <div className="absolute inset-0 bg-indigo-500/10 group-hover:bg-transparent transition-colors" />
                      </div>
                    )}

                    <h3 className="text-base font-black leading-tight text-white/90 group-hover:text-indigo-400 transition-colors mb-3 line-clamp-3 uppercase tracking-tight">
                      {item.title}
                    </h3>

                    {item.snippet && (
                      <p className="text-xs text-white/50 leading-relaxed line-clamp-4 mb-6 font-medium">
                        {item.snippet}
                      </p>
                    )}

                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6 border border-white/10">
                          <AvatarFallback className="text-[8px] bg-white/5">{item.author?.[0] || '?'}</AvatarFallback>
                        </Avatar>
                        <span className="text-[9px] font-black text-white/40 uppercase tracking-widest truncate max-w-[120px]">
                          {item.author || "Unknown Intel"}
                        </span>
                      </div>
                      <div className="text-[9px] font-black text-indigo-500 uppercase tracking-widest group-hover:underline">
                        Investigate →
                      </div>
                    </div>
                  </div>
                </NeonBoard>
              </a>
            ))}
          </div>
        )}

        {!loading && items.length === 0 && initialQuery && (
          <div className="h-[60vh] flex flex-col items-center justify-center text-white/20">
            <Search className="w-12 h-12 mb-4 opacity-20" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">No Intelligence Found for This Query</span>
          </div>
        )}
      </main>

      <footer className="py-12 border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
          <span>ClearPath Neural Search v1.0.0</span>
          <span>Data-Only Intelligence Layer • No Financial Advice</span>
        </div>
      </footer>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchContent />
    </Suspense>
  );
}
