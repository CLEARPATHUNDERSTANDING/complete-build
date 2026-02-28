"use client";

import React, { useState, useEffect } from "react";
import { 
  Search,
  Sun,
  Moon,
  Brain,
  LayoutDashboard,
  MessageCircle,
  Heart,
  ArrowRight,
  TrendingUp,
  Zap,
  ChevronUp,
  ChevronDown,
  Bell,
  MessageSquare,
  Sparkles,
  Grid2X2,
  Users,
  Navigation,
  Info,
  Eye,
  Scale,
  FileText,
  ShieldAlert,
  Lock,
  Menu
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlaceHolderImages } from "@/lib/placeholder-images";
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

  const navItemClass = "flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 transition-all group cursor-pointer";
  const sectionLabelClass = "text-[11px] font-black tracking-[0.25em] text-muted-foreground/40 mb-2 px-4 uppercase";

  return (
    <div className="flex w-full h-screen overflow-hidden bg-black text-white fade-in selection:bg-primary selection:text-white">
      {/* 1. Independent Scroll Area: Left Sidebar Navigation */}
      <div className="w-72 border-r border-white/10 flex flex-col bg-black shrink-0">
        <div className="p-6 flex items-center gap-3 border-b border-white/5 mb-4">
          <Menu className="w-5 h-5 text-indigo-500" />
          <div className="text-[12px] font-black tracking-[0.3em] text-indigo-500 uppercase">Navigation</div>
        </div>

        <ScrollArea className="flex-1 px-4">
          <div className="space-y-6 pb-8">
            <div>
              <div className={sectionLabelClass}>Workspace</div>
              <div className="space-y-1">
                <a href="/dashboard?mode=minimal" className={navItemClass}>
                  <LayoutDashboard className="w-5 h-5 text-white/70 group-hover:text-white" />
                  <span className="text-[15px] font-semibold text-white/90">Standard View</span>
                </a>
                <a href="/dashboard?mode=focus" className={navItemClass}>
                  <Sparkles className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />
                  <span className="text-[15px] font-semibold text-indigo-400">Neuro Mode</span>
                </a>
                <a href="/dashboard?mode=quad" className={navItemClass}>
                  <Grid2X2 className="w-5 h-5 text-cyan-500 group-hover:scale-110 transition-transform" />
                  <span className="text-[15px] font-semibold text-cyan-400">Modes Hub</span>
                </a>
                <a href="/" className={navItemClass}>
                  <Users className="w-5 h-5 text-pink-500 group-hover:scale-110 transition-transform" />
                  <span className="text-[15px] font-semibold text-pink-400">Community Feed</span>
                </a>
              </div>
            </div>

            <div>
              <div className={sectionLabelClass}>Tools</div>
              <div className="space-y-1">
                <a href="/dashboard" className={navItemClass}>
                  <Navigation className="w-5 h-5 text-white/70 group-hover:text-white" />
                  <span className="text-[15px] font-semibold text-white/90">Charts Hub</span>
                </a>
                <a href="/intelligence" className={navItemClass}>
                  <TrendingUp className="w-5 h-5 text-white/70 group-hover:text-white" />
                  <span className="text-[15px] font-semibold text-white/90">Markets Directory</span>
                </a>
              </div>
            </div>

            <div>
              <div className={sectionLabelClass}>Platform</div>
              <div className="space-y-1">
                <div className={navItemClass}>
                  <Info className="w-5 h-5 text-white/70" />
                  <span className="text-[15px] font-semibold text-white/90">Mission</span>
                </div>
                <div className={navItemClass}>
                  <Eye className="w-5 h-5 text-white/70" />
                  <span className="text-[15px] font-semibold text-white/90">Transparency</span>
                </div>
                <div className={navItemClass}>
                  <Scale className="w-5 h-5 text-white/70" />
                  <span className="text-[15px] font-semibold text-white/90">Governance</span>
                </div>
                <div className={navItemClass}>
                  <FileText className="w-5 h-5 text-white/70" />
                  <span className="text-[15px] font-semibold text-white/90">Constitution</span>
                </div>
              </div>
            </div>

            <div>
              <div className={sectionLabelClass}>Legal</div>
              <div className="space-y-1">
                <div className={navItemClass}>
                  <ShieldAlert className="w-5 h-5 text-red-500" />
                  <span className="text-[15px] font-semibold text-red-400">Risk Disclosure</span>
                </div>
                <div className={navItemClass}>
                  <Lock className="w-5 h-5 text-white/70" />
                  <span className="text-[15px] font-semibold text-white/90">Compliance</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* 2. Independent Scroll Area: Main Content Area (Feed) */}
      <div className="flex-1 flex flex-col min-w-0 bg-transparent">
        <div className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-black/40 backdrop-blur-md">
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
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border border-black" />
              </Button>
            </div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <Avatar className="w-10 h-10 ring-2 ring-primary/20 ring-offset-2 ring-offset-black group-hover:ring-primary transition-all">
                <AvatarImage src={getImgUrl('profile-mike') || "https://i.pravatar.cc/150?u=mike"} />
                <AvatarFallback>MA</AvatarFallback>
              </Avatar>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-bold text-white">Mike Andrew</span>
                <span className="text-[9px] font-black text-primary uppercase tracking-widest">Premium User</span>
              </div>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 p-8">
          <div className="w-full max-w-2xl mx-auto space-y-10 pb-20">
            {posts.map((post) => (
              <NeonBoard key={post.id} className="w-full">
                <CardHeader className="p-6">
                  <div className="flex items-center gap-4 text-left">
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
                <CardContent className="px-8 py-6 bg-[#070b16]/95 border-y border-white/5 text-left">
                  <p className="text-lg leading-relaxed text-white/90 font-medium">
                    {post.text}
                  </p>
                </CardContent>
                <CardFooter className="px-8 py-5 flex gap-8 items-center bg-[#070b16]">
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors group/btn">
                    <Heart className="w-5 h-5 group-hover/btn:fill-current" />
                    <span className="text-xs font-black tracking-widest">2.4K</span>
                  </button>
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group/btn">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-xs font-black tracking-widest">128</span>
                  </button>
                  <div className="ml-auto">
                     <a href="/intelligence" className="text-[11px] font-black text-primary flex items-center gap-1.5 hover:underline tracking-widest uppercase">
                        Analyze Intel <ArrowRight className="w-3.5 h-3.5" />
                     </a>
                  </div>
                </CardFooter>
              </NeonBoard>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right Sidebar - 3rd, 4th, and 5th Independent Scroll Areas */}
      <div className="w-80 border-l border-white/10 flex flex-col bg-black/50 backdrop-blur-xl shrink-0">
        <div className="flex-1 flex flex-col divide-y divide-white/10">
          
          {/* 3. Online Friends */}
          <div className="flex-[1.2] flex flex-col min-h-0">
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

          {/* 4. Latest Updates */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="px-8 py-6 flex items-center justify-between">
              <div className="text-[11px] font-black tracking-[0.25em] text-muted-foreground/50 uppercase">Latest Updates</div>
              <div className="flex flex-col gap-1">
                <ChevronUp className="w-3 h-3 text-primary/50" />
                <ChevronDown className="w-3 h-3 text-primary animate-pulse" />
              </div>
            </div>
            <ScrollArea className="flex-1 px-8 pb-4 text-left">
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

          {/* 5. Trending Topics */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="px-8 py-6 flex items-center justify-between">
              <div className="text-[11px] font-black tracking-[0.25em] text-muted-foreground/50 uppercase">Trending Topics</div>
              <div className="flex flex-col gap-1">
                <ChevronUp className="w-3 h-3 text-primary" />
                <ChevronDown className="w-3 h-3 text-primary/50" />
              </div>
            </div>
            <ScrollArea className="flex-1 px-8 pb-4 text-left">
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