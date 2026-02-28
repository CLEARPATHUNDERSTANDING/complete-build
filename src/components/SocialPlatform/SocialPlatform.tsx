
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/navigation";
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
  ChevronUp,
  ChevronDown,
  Bell,
  MessageSquare
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { NEURO_PROFILES } from "@/lib/neuro/profiles";
import NeonBoard from "@/components/NeonBoard";
import { cn } from "@/lib/utils";

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

  const friends = [
    { name: "Tom Holland", avatar: "https://i.pravatar.cc/150?u=tom", online: true },
    { name: "Selena Gomez", avatar: "https://i.pravatar.cc/150?u=selena", online: true },
    { name: "Zendaya", avatar: "https://i.pravatar.cc/150?u=zen", online: true },
    { name: "Robert Downey", avatar: "https://i.pravatar.cc/150?u=rdj", online: false },
  ];

  const updates = [
    { user: "Tonny", action: "posted 1 photo", time: "2 min ago" },
    { user: "Mike", action: "started following you", time: "5 min ago" },
    { user: "Sarah", action: "liked your analysis", time: "12 min ago" },
  ];

  const trends = [
    { tag: "#nextjs", count: "12.4k posts" },
    { tag: "#firebase", count: "8.2k posts" },
    { tag: "#neurotrading", count: "5.1k posts" },
    { tag: "#insightflow", count: "2.3k posts" },
  ];

  return (
    <div className="flex w-full h-screen overflow-hidden bg-black text-white fade-in selection:bg-primary selection:text-white">
      {/* 1. Independent Scroll Area: Left Sidebar Navigation */}
      <div className="w-72 border-r border-white/10 flex flex-col bg-black/80 backdrop-blur-xl shrink-0">
        <div className="p-8">
          <div className="text-2xl font-black tracking-tighter text-primary flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            INSIGHTFLOW
          </div>
        </div>

        <ScrollArea className="flex-1 px-4">
          <div className="space-y-2 pb-8">
            <div className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground/50 mb-4 px-4 uppercase">Navigation</div>
            
            <a href="/intelligence" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group">
              <Globe className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold">Intelligence Interface</span>
            </a>

            <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group">
              <LayoutDashboard className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold">Standard Dashboard</span>
            </a>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="neuro" className="border-none">
                <AccordionTrigger className="hover:no-underline px-4 py-3 text-sm font-bold text-white hover:text-primary transition-colors">
                  <div className="flex items-center gap-3"><Brain className="w-5 h-5 text-primary" /> Neuro Profiles</div>
                </AccordionTrigger>
                <AccordionContent className="pb-2 pl-6 space-y-1">
                  {NEURO_PROFILES.map((profile) => (
                    <a 
                      key={profile.id} 
                      href={`/dashboard?profile=${profile.id}`} 
                      className="flex items-center gap-3 py-2 text-xs font-medium text-muted-foreground hover:text-white transition-colors"
                    >
                      <Zap className="w-3 h-3 text-yellow-500" /> {profile.label}
                    </a>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ScrollArea>
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
            <div className="flex items-center gap-4 text-muted-foreground">
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9" onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                <MessageSquare className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                <Bell className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10 ring-2 ring-primary/20 ring-offset-2 ring-offset-black">
                <AvatarImage src={getImgUrl('profile-mike') || "https://i.pravatar.cc/150?u=mike"} />
                <AvatarFallback>MA</AvatarFallback>
              </Avatar>
              <div className="hidden lg:flex flex-col">
                <span className="text-xs font-bold text-white">Mike</span>
                <span className="text-[10px] font-black text-muted-foreground uppercase">Andrew</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Independent Scroll Area: Middle Feed */}
        <ScrollArea className="flex-1 p-8">
          <div className="w-full max-w-2xl mx-auto space-y-12 pb-20">
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
                     <a href="/intelligence" className="text-xs font-black text-primary flex items-center gap-1 hover:underline">
                        ANALYZE <ArrowRight className="w-3 h-3" />
                     </a>
                  </div>
                </CardFooter>
              </NeonBoard>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right Sidebar - Complex Structure with Independent Scrolling */}
      <div className="w-80 border-l border-white/10 flex flex-col bg-black/80 backdrop-blur-xl shrink-0">
        <div className="flex-1 flex flex-col divide-y divide-white/10">
          
          {/* 3. Independent Scroll Area: Online Friends */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="px-8 py-6 flex items-center justify-between">
              <div className="text-[11px] font-black tracking-[0.25em] text-muted-foreground/50 uppercase">Online Friends</div>
              <div className="flex flex-col gap-1">
                <ChevronUp className="w-3 h-3 text-primary animate-pulse" />
                <ChevronDown className="w-3 h-3 text-primary/50" />
              </div>
            </div>
            <ScrollArea className="flex-1 px-8 pb-4">
              <div className="space-y-6">
                {friends.map((friend, idx) => (
                  <div key={idx} className="flex items-center gap-4 group cursor-pointer">
                    <div className="relative">
                      <Avatar className="w-10 h-10 border border-white/10 group-hover:border-primary/50 transition-colors">
                        <AvatarImage src={friend.avatar} />
                        <AvatarFallback>{friend.name[0]}</AvatarFallback>
                      </Avatar>
                      {friend.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />}
                    </div>
                    <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">{friend.name}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* 4. Independent Scroll Area: Latest Updates */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="px-8 py-6 flex items-center justify-between">
              <div className="text-[11px] font-black tracking-[0.25em] text-muted-foreground/50 uppercase">Latest Updates</div>
              <div className="flex flex-col gap-1">
                <ChevronUp className="w-3 h-3 text-primary/50" />
                <ChevronDown className="w-3 h-3 text-primary animate-pulse" />
              </div>
            </div>
            <ScrollArea className="flex-1 px-8 pb-4">
              <div className="space-y-6">
                {updates.map((update, idx) => (
                  <div key={idx} className="flex flex-col gap-1 group cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                      <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">
                        {update.user} <span className="font-medium text-muted-foreground">{update.action}</span>
                      </span>
                    </div>
                    <span className="text-[9px] font-black text-muted-foreground uppercase ml-3.5 tracking-wider">{update.time}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* 5. Independent Scroll Area: Trending Topics */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="px-8 py-6 flex items-center justify-between">
              <div className="text-[11px] font-black tracking-[0.25em] text-muted-foreground/50 uppercase">Trending Topics</div>
              <div className="flex flex-col gap-1">
                <ChevronUp className="w-3 h-3 text-primary" />
                <ChevronDown className="w-3 h-3 text-primary/50" />
              </div>
            </div>
            <ScrollArea className="flex-1 px-8 pb-4">
              <div className="space-y-6">
                {trends.map((trend, idx) => (
                  <div key={idx} className="flex flex-col gap-1 group cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">{trend.tag}</span>
                      {idx === 0 && <TrendingUp className="w-3 h-3 text-primary animate-bounce" />}
                    </div>
                    <span className="text-[9px] font-black text-muted-foreground uppercase ml-3.5 tracking-wider">{trend.count}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

        </div>
      </div>
    </div>
  );
}

