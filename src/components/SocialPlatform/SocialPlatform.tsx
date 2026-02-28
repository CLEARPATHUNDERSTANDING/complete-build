"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Search,
  Sun,
  Moon,
  Brain,
  Globe,
  LayoutDashboard,
  MessageCircle,
  Heart,
  ArrowRight,
  TrendingUp,
  Zap,
  Activity,
  Menu
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { NEURO_PROFILES } from "@/lib/neuro/profiles";
import NeonBoard from "@/components/NeonBoard";

export default function SocialPlatform() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const getImgUrl = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || null;

  const posts = [
    {
      id: 1,
      user: "Insight Bot",
      avatar: "https://picsum.photos/seed/ai-bot/150/150",
      time: "Just now",
      text: "Market volatility is increasing in the tech sector. Our Neuro-Predictive engine suggests a high-focus mode for NVDA and AAPL today.",
    },
    {
      id: 2,
      user: "Jessica Miller",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=60&q=60",
      time: "8 hours ago",
      text: "Exploring the intersection of modern aesthetics and functional design. This latest project focuses on how light transforms architectural spaces throughout the day.",
    }
  ];

  return (
    <div className="flex w-full h-screen overflow-hidden bg-black text-white fade-in">
      {/* Left Sidebar */}
      <div className="w-72 border-r border-white/10 flex flex-col bg-black/80 backdrop-blur-xl">
        <div className="p-8">
          <div className="text-2xl font-black tracking-tighter text-primary flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            INSIGHTFLOW
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-2">
          <div className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground/50 mb-4 px-4 uppercase">Navigation</div>
          
          <Link href="/intelligence" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group">
            <Globe className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-sm font-semibold">Intelligence Interface</span>
          </Link>

          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group">
            <LayoutDashboard className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-sm font-semibold">Standard Dashboard</span>
          </Link>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="neuro" className="border-none">
              <AccordionTrigger className="hover:no-underline px-4 py-3 text-sm font-bold text-white hover:text-primary transition-colors">
                <div className="flex items-center gap-3"><Brain className="w-5 h-5 text-primary" /> Neuro Profiles</div>
              </AccordionTrigger>
              <AccordionContent className="pb-2 pl-6 space-y-1">
                {NEURO_PROFILES.slice(0, 10).map((profile) => (
                  <Link 
                    key={profile.id} 
                    href={`/dashboard?profile=${profile.id}`} 
                    className="flex items-center gap-3 py-2 text-xs font-medium text-muted-foreground hover:text-white transition-colors"
                  >
                    <Zap className="w-3 h-3 text-yellow-500" /> {profile.label}
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-transparent">
        {/* Header Bar */}
        <div className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-black/40">
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search markets, news, or traders..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all"
            />
          </div>
          <div className="flex items-center gap-6 ml-6">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Avatar className="w-10 h-10 ring-2 ring-primary/20 ring-offset-2 ring-offset-black">
              <AvatarImage src={getImgUrl('profile-mike') || "https://i.pravatar.cc/150?u=mike"} />
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Scrollable Feed */}
        <div className="flex-1 overflow-y-auto p-8 flex justify-center custom-scrollbar">
          <div className="w-full max-w-2xl space-y-12">
            {posts.map((post) => (
              <NeonBoard key={post.id} className="w-full">
                <CardHeader className="p-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12 border-2 border-primary/20">
                      <AvatarImage src={post.avatar} />
                      <AvatarFallback>{post.user[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-bold text-base text-white">{post.user}</span>
                      <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{post.time}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-8 py-6 bg-[#070b16]/80 border-y border-white/5">
                  <p className="text-lg leading-relaxed text-white/90 font-medium">
                    {post.text}
                  </p>
                </CardContent>
                <CardFooter className="px-8 py-4 flex gap-8 items-center bg-[#070b16]">
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors group/btn">
                    <Heart className="w-5 h-5 group-hover/btn:fill-current" />
                    <span className="text-xs font-black">2.4K</span>
                  </button>
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group/btn">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-xs font-black">128</span>
                  </button>
                  <div className="ml-auto">
                     <Link href="/intelligence" className="text-xs font-black text-primary flex items-center gap-1 hover:underline">
                        ANALYZE <ArrowRight className="w-3 h-3" />
                     </Link>
                  </div>
                </CardFooter>
              </NeonBoard>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar - Social Activity */}
      <div className="w-80 border-l border-white/10 flex flex-col bg-black/80 backdrop-blur-xl">
        <div className="p-8">
          <div className="text-[11px] font-black tracking-[0.25em] text-muted-foreground/50 mb-6 uppercase">Market Sentiment</div>
          <div className="space-y-6">
            {[
              { text: "NVDA: Bullish breakout", time: "2m", status: "high" },
              { text: "BTC: Testing support", time: "15m", status: "medium" },
              { text: "EURUSD: CPI impact expected", time: "1h", status: "low" }
            ].map((sig, idx) => (
              <div key={idx} className="flex flex-col gap-2 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className={`w-3 h-3 ${sig.status === 'high' ? 'text-yellow-400' : 'text-primary'}`} />
                    <span className="text-xs font-bold text-white">{sig.text}</span>
                  </div>
                  <span className="text-[9px] font-black text-muted-foreground uppercase">{sig.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-[11px] font-black tracking-[0.25em] text-muted-foreground/50 mb-6 uppercase">Quick Intel</div>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/intelligence" className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex flex-col items-center gap-2 hover:bg-primary/20 transition-all group">
              <Globe className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black text-primary uppercase">Scan</span>
            </Link>
            <Link href="/dashboard" className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex flex-col items-center gap-2 hover:bg-primary/20 transition-all group">
              <LayoutDashboard className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black text-primary uppercase">Trade</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}