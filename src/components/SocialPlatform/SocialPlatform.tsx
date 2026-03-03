"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { 
  Search,
  Sun,
  Moon,
  LayoutDashboard,
  MessageCircle,
  Heart,
  ArrowRight,
  TrendingUp,
  Bell,
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
  Menu,
  Brain,
  Zap,
  BarChart2,
  X,
  CheckCircle2,
  MousePointer2,
  Type,
  Globe,
  Compass
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import NeonBoard from "@/components/NeonBoard";
import { NEURO_PROFILES } from "@/lib/neuro/profiles";
import { NON_ND_MODES } from "@/modes/nonNdModes";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { marketCatalog } from "@/data/marketCatalog";
import { CHART_TYPES, type ApexChartType } from "@/components/markets/apex/market-watch-types";
import { MarketWatchChart } from "@/components/markets/apex/MarketWatchChart";
import { generateMockOhlc } from "@/utils/mockData";

function FluidSection({ 
  children, 
  title, 
  className = "", 
  maxHeight = "250px", 
  id,
  useScrollArea = true 
}: { 
  children: React.ReactNode, 
  title: string, 
  className?: string, 
  maxHeight?: string,
  id?: string,
  useScrollArea?: boolean
}) {
  return (
    <div id={id} className={`p-[2px] rounded-2xl bg-gradient-to-br from-[#ff003c] via-[#ff8a00] to-[#ff00d4] shadow-[0_0_20px_rgba(255,0,60,0.15)] ${className}`}>
      <div className="bg-[#070b16] rounded-[14px] overflow-hidden flex flex-col h-full">
        <div className="px-4 py-3 border-b border-white/5 bg-white/[0.02] shrink-0">
          <div className="text-[10px] font-black tracking-[0.25em] text-white/60 uppercase">{title}</div>
        </div>
        <div className="flex-1 min-h-0 relative">
          {useScrollArea ? (
            <ScrollArea className="h-full">
              <div className="p-2" style={{ maxHeight: maxHeight }}>
                {children}
              </div>
            </ScrollArea>
          ) : (
            <div className="p-2 overflow-hidden" style={{ height: maxHeight || 'auto' }}>
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SocialPlatform() {
  const router = useRouter();
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Post Draft State
  const [postText, setPostText] = useState("");
  const [attachedSymbols, setAttachedSymbols] = useState<string[]>([]);
  
  // Advanced Chart Attachment State
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);
  const [chartSearchQuery, setChartSearchQuery] = useState("");
  const [selectedChartSymbol, setSelectedChartSymbol] = useState("BTCUSD");
  const [selectedChartType, setSelectedChartType] = useState<ApexChartType>("candlestick");
  const [annotationText, setAnnotationText] = useState("");
  const [activeAttachment, setActiveAttachment] = useState<{
    symbol: string;
    type: ApexChartType;
    annotation: string;
  } | null>(null);

  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Insight Bot",
      avatar: "https://picsum.photos/seed/ai-bot/150/150",
      time: "Just now",
      text: "Market volatility is increasing in the tech sector. Our Neuro-Predictive engine suggests a high-focus mode for NVDA and AAPL today.",
      symbols: ["NVDA", "AAPL"],
      attachment: {
        symbol: "NVDA",
        type: "candlestick" as ApexChartType,
        annotation: "CRITICAL RESISTANCE ZONE DETECTED"
      }
    },
    {
      id: 2,
      user: "Jessica Miller",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=60&q=60",
      time: "8 hours ago",
      text: "Exploring the intersection of modern aesthetics and functional design. This latest project focuses on how light transforms architectural spaces throughout the day.",
      symbols: [],
      attachment: null
    },
    {
      id: 3,
      user: "Market Watch",
      avatar: "https://picsum.photos/seed/market/150/150",
      time: "12 hours ago",
      text: "Global indices are showing strong support levels. It might be time to switch to the STANDARD VIEW mode to track multiple sectors simultaneously.",
      symbols: ["SPX", "NDX"],
      attachment: {
        symbol: "SPX",
        type: "area" as ApexChartType,
        annotation: "Support holds firm here."
      }
    }
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredCatalog = useMemo(() => {
    const q = chartSearchQuery.toLowerCase();
    return marketCatalog.filter(item => 
      item.symbol.toLowerCase().includes(q) || 
      item.display.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [chartSearchQuery]);

  if (!mounted) return null;

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleAddSymbol = () => {
    const sym = prompt("Enter asset symbol (e.g. BTC, AAPL):");
    if (sym && sym.trim()) {
      const upper = sym.trim().toUpperCase();
      if (!attachedSymbols.includes(upper)) {
        setAttachedSymbols([...attachedSymbols, upper]);
        toast({
          title: "Symbol Added",
          description: `${upper} has been linked to your insight.`,
        });
      }
    }
  };

  const handleConfirmAttachment = () => {
    setActiveAttachment({
      symbol: selectedChartSymbol,
      type: selectedChartType,
      annotation: annotationText
    });
    setIsChartModalOpen(false);
    toast({
      title: "Chart Captured",
      description: `Diagnostic ${selectedChartType} for ${selectedChartSymbol} has been annotated and attached.`,
    });
  };

  const handleDispatch = () => {
    if (!postText.trim()) {
      toast({
        variant: "destructive",
        title: "Dispatch Failed",
        description: "Please record a market observation before broadcasting.",
      });
      return;
    }

    const newPost = {
      id: Date.now(),
      user: "Mike Andrew",
      avatar: getImgUrl('profile-mike') || "https://i.pravatar.cc/150?u=mike",
      time: "Just now",
      text: postText,
      symbols: attachedSymbols,
      attachment: activeAttachment ? { ...activeAttachment } : null
    };

    setPosts([newPost, ...posts]);
    setPostText("");
    setAttachedSymbols([]);
    setActiveAttachment(null);
    setAnnotationText("");

    toast({
      title: "Insight Dispatched",
      description: "Your diagnostic thesis has been broadcast to the network.",
    });
  };

  const getImgUrl = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || null;

  const navItemClass = "flex items-center gap-4 px-4 py-2.5 rounded-xl hover:bg-white/5 transition-all group cursor-pointer";

  return (
    <div className="flex w-full h-screen overflow-hidden bg-black text-white fade-in selection:bg-primary selection:text-white font-body">
      {/* Left Sidebar */}
      <div className="w-72 border-r border-white/10 flex flex-col bg-black shrink-0 h-full">
        <div className="p-6 flex items-center gap-3 border-b border-white/5 shrink-0">
          <Menu className="w-5 h-5 text-indigo-500" />
          <div className="text-[12px] font-black tracking-[0.3em] text-indigo-500 uppercase">Navigation</div>
        </div>
        <ScrollArea className="flex-1 min-h-0">
          <div className="p-4 space-y-6 pb-8">
            <FluidSection title="Workspace" maxHeight="none" useScrollArea={false}>
              <div className="space-y-1">
                <a href="/markets" className={navItemClass}><Globe className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" /><span className="text-[15px] font-semibold text-emerald-400">Market Overview</span></a>
                <a href="/dashboard?mode=minimal" className={navItemClass}><LayoutDashboard className="w-5 h-5 text-white/70 group-hover:text-white" /><span className="text-[15px] font-semibold text-white/90">Standard Workspace</span></a>
                <a href="/dashboard?mode=focus" className={navItemClass}><Sparkles className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" /><span className="text-[15px] font-semibold text-indigo-400">Neuro Workspace</span></a>
                <a href="/dashboard?mode=quad" className={navItemClass}><Grid2X2 className="w-5 h-5 text-cyan-500 group-hover:scale-110 transition-transform" /><span className="text-[15px] font-semibold text-cyan-400">STANDARD VIEW</span></a>
                <a href="/communities" className={navItemClass}><Compass className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" /><span className="text-[15px] font-semibold text-blue-400">All Communities</span></a>
                <a href="/community" className={navItemClass}><Users className="w-5 h-5 text-pink-500 group-hover:scale-110 transition-transform" /><span className="text-[15px] font-semibold text-pink-400">Community Feed</span></a>
              </div>
            </FluidSection>

            <FluidSection title="Standard Modes" maxHeight="200px">
              <div className="space-y-1">
                {NON_ND_MODES.map(m => (
                  <a key={m.id} href={`/dashboard?mode=minimal&style=${m.id}`} className={navItemClass}>
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                    <span className="text-[13px] font-medium text-white/60 group-hover:text-white">{m.label}</span>
                  </a>
                ))}
              </div>
            </FluidSection>

            <FluidSection title="Platform" maxHeight="none" useScrollArea={false}>
              <div className="space-y-1 text-white/60">
                <a href="/research" className={navItemClass}><Zap className="w-4 h-4 text-orange-400" /><span className="text-orange-400 font-bold">On-Going Research</span></a>
                <a href="/mission" className={navItemClass}><Info className="w-4 h-4" /><span>Mission</span></a>
                <a href="/transparency" className={navItemClass}><Eye className="w-4 h-4" /><span>Transparency</span></a>
                <a href="/governance" className={navItemClass}><Scale className="w-4 h-4" /><span>Governance</span></a>
                <a href="/platform-constitution" className={navItemClass}><FileText className="w-4 h-4" /><span>Constitution</span></a>
              </div>
            </FluidSection>
          </div>
        </ScrollArea>
      </div>

      {/* Main Feed Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-transparent h-full">
        {/* Header */}
        <div className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-black/40 backdrop-blur-md shrink-0">
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search markets, news, or traders..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
          <div className="flex items-center gap-6 ml-6">
            <div className="flex items-center gap-4 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
              {/* Neon Cyan Apple */}
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#00e5ff] fill-current drop-shadow-[0_0_5px_#00e5ff]" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.05 20.28c-.98.95-2.05 1.61-3.22 1.61-1.12 0-1.5-.68-2.83-.68-1.32 0-1.76.66-2.82.68-1.13.02-2.32-.75-3.32-1.73-2.04-1.99-3.12-5.11-3.12-7.81 0-2.69 1.01-4.64 2.1-5.79 1.09-1.15 2.33-1.74 3.42-1.74 1.04 0 1.76.41 2.72.41 1.01 0 1.5-.41 2.7-.41 1.01 0 2.14.53 3.06 1.43-2.41 1.43-2.01 4.69.41 5.81-.51 1.28-1.17 2.52-2.13 3.56l.01-.01zM12.03 4.13c-.02-1.34.52-2.63 1.41-3.56.91-.95 2.21-1.57 3.51-1.57.02 1.34-.52 2.63-1.41 3.56-.91.95-2.21 1.57-3.51 1.57z"/>
              </svg>
              {/* Neon Fuchsia Android */}
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#ff00d4] fill-current drop-shadow-[0_0_5px_#ff00d4]" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.523 15.3414c-.5511 0-1-.4489-1-1s.4489-1 1-1 1 .4489 1 1-.4489 1-1 1zm-11.046 0c-.5511 0-1-.4489-1-1s.4489-1 1-1 1 .4489 1 1-.4489 1-1 1zM18.1535 11.6566c-.1141-.1141-.2617-.1712-.4092-.1712h-11.4886c-.1475 0-.2951.0571-.4092.1712-.1141.1141-.1712.2617-.1712.4092v2.0114c0 .1475.0571.2951.1712.4092.1141.1141.2617.1712.4092.1712h11.4886c.1475 0 .2951-.0571.4092-.1712.1141-.1141.1712-.2617.1712-.4092v-2.0114c0-.1475-.0571-.2951-.1712-.4092zM12 2c-4.9706 0-9 4.0294-9 9 0 4.1788 2.8412 7.6933 6.6923 8.6885-.0152-.224-.0256-.4501-.0256-.6785v-.01c0-1.6569 1.3431-3 3-3s3 1.3431 3 3v.01c0 .2284-.0104.4545-.0256.6785 3.8511-.9952 6.6923-4.5097 6.6923-8.6885 0-4.9706-4.0294-9-9-9z"/>
              </svg>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full h-9 w-9" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Avatar className="w-10 h-10 ring-2 ring-primary/20 ring-offset-2 ring-offset-black">
              <AvatarImage src={getImgUrl('profile-mike') || ""} />
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <ScrollArea className="flex-1 min-h-0">
          <div className="w-full max-w-2xl mx-auto p-8 space-y-10 pb-20">
            
            {/* INSIGHT DISPATCH MODULE */}
            <NeonBoard className="w-full">
              <div className="bg-[#070b16] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-4 bg-primary shadow-[0_0_8px_#3b82f6]" />
                  <div className="text-[11px] font-black uppercase tracking-[0.25em] text-white/70">Dispatch Insight</div>
                </div>
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10 border border-white/10 mt-1">
                    <AvatarImage src={getImgUrl('profile-mike') || ""} />
                    <AvatarFallback>MA</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <textarea 
                      placeholder="Record market observation or diagnostic thesis..."
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-[15px] font-medium text-white outline-none focus:border-primary/50 transition-all resize-none min-h-[100px] placeholder:text-white/20"
                      value={postText}
                      onChange={(e) => setPostText(e.target.value)}
                    />
                    <div className="flex flex-wrap gap-2 mt-4">
                      {attachedSymbols.map(sym => (
                        <Badge key={sym} variant="secondary" className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 gap-1.5 px-3 py-1">
                          {sym}<X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setAttachedSymbols(prev => prev.filter(s => s !== sym))} />
                        </Badge>
                      ))}
                      {activeAttachment && (
                        <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 gap-1.5 px-3 py-1">
                          <BarChart2 className="w-3 h-3" />
                          {activeAttachment.symbol} {activeAttachment.type.toUpperCase()} Attached
                          <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setActiveAttachment(null)} />
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-5">
                    <button onClick={handleAddSymbol} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-primary transition-colors">
                      <Zap className="w-3.5 h-3.5" />Add Symbol
                    </button>
                    <button onClick={() => setIsChartModalOpen(true)} className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors ${activeAttachment ? 'text-cyan-400' : 'text-white/40 hover:text-primary'}`}>
                      <BarChart2 className="w-3.5 h-3.5" />{activeAttachment ? 'Edit Attachment' : 'Attach Chart'}
                    </button>
                  </div>
                  <Button onClick={handleDispatch} className="bg-primary hover:bg-primary/80 text-[10px] font-black uppercase tracking-widest px-6 h-9 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                    Dispatch Insight →
                  </Button>
                </div>
              </div>
            </NeonBoard>

            {/* FEED */}
            {posts.map((post) => (
              <NeonBoard key={post.id} className="w-full">
                <CardHeader className="p-6">
                  <div className="flex items-center gap-4 text-left">
                    <Avatar className="w-12 h-12 border-2 border-primary/20"><AvatarImage src={post.avatar} /><AvatarFallback>{post.user[0]}</AvatarFallback></Avatar>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base text-white">{post.user}</span>
                        {post.user === "Mike Andrew" && <CheckCircle2 className="w-3.5 h-3.5 text-primary" />}
                      </div>
                      <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{post.time}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-8 py-6 bg-[#070b16]/95 border-y border-white/5 text-left">
                  <p className="text-lg leading-relaxed text-white/90 font-medium mb-6">{post.text}</p>
                  
                  {post.attachment && (
                    <div className="relative rounded-2xl border border-white/10 bg-black/40 p-4 mb-6 overflow-hidden group">
                      <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-[10px] font-black text-cyan-300 uppercase tracking-widest">
                        DIAGNOSTIC CAPTURE: {post.attachment.symbol} {post.attachment.type.toUpperCase()}
                      </div>
                      <div className="opacity-80 group-hover:opacity-100 transition-opacity">
                        <MarketWatchChart 
                          symbol={post.attachment.symbol} 
                          points={generateMockOhlc(post.attachment.symbol, 100)} 
                          height={300}
                        />
                      </div>
                      {post.attachment.annotation && (
                        <div className="absolute bottom-12 right-8 z-30 transform rotate-[-2deg]">
                          <div className="bg-yellow-400/90 text-black px-4 py-2 rounded-sm shadow-2xl font-mono text-[13px] font-black tracking-tight border-b-2 border-black/20">
                            {post.attachment.annotation}
                          </div>
                          <div className="w-4 h-4 bg-yellow-400 absolute top-[-8px] right-[-8px] rotate-45 border-t border-r border-black/10" />
                        </div>
                      )}
                    </div>
                  )}

                  {(post.symbols.length > 0) && (
                    <div className="mt-2 flex flex-wrap gap-2 pt-4 border-t border-white/5">
                      {post.symbols.map(s => (
                        <Badge key={s} variant="outline" className="text-[10px] font-black uppercase tracking-widest border-indigo-500/30 text-indigo-400 bg-indigo-500/5">{s}</Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="px-8 py-5 flex gap-8 items-center bg-[#070b16]">
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors"><Heart className="w-5 h-5" /><span className="text-xs font-black tracking-widest">2.4K</span></button>
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"><MessageCircle className="w-5 h-5" /><span className="text-xs font-black tracking-widest">128</span></button>
                  <div className="ml-auto"><a href="/intelligence" className="text-[11px] font-black text-primary flex items-center gap-1.5 hover:underline tracking-widest uppercase">Analyze Intel <ArrowRight className="w-3.5 h-3.5" /></a></div>
                </CardFooter>
              </NeonBoard>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 border-l border-white/10 flex flex-col bg-black shrink-0 h-full">
        <div className="p-6 flex items-center gap-3 border-b border-white/5 shrink-0">
          <TrendingUp className="w-5 h-5 text-indigo-500" />
          <div className="text-[12px] font-black tracking-[0.3em] text-indigo-500 uppercase">Intelligence Feed</div>
        </div>
        <ScrollArea className="flex-1 min-h-0">
          <div className="p-4 space-y-6 pb-8">
            <FluidSection title="Online Friends" maxHeight="none" id="online-friends-card" useScrollArea={false}>
              <div className="friends-scroll max-h-[300px] pr-2 space-y-4">
                {[
                  { name: "Tom Holland", online: true },
                  { name: "Selena Gomez", online: true },
                  { name: "Zendaya", online: true },
                  { name: "Scarlett J", online: true },
                  { name: "Mark Ruffalo", online: true },
                  { name: "Jeremy Renner", online: false },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-xl transition-all cursor-pointer group">
                    <Avatar className="w-10 h-10 border border-white/10 group-hover:scale-105 transition-transform">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${f.name}`} />
                      <AvatarFallback>{f.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="text-[14px] font-bold text-white/90">{f.name}</div>
                      <div className="text-[10px] font-black text-cyan-400/60 uppercase">Active Now</div>
                    </div>
                    {f.online && <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />}
                  </div>
                ))}
              </div>
            </FluidSection>

            <FluidSection title="Latest Updates" maxHeight="none" id="latest-updates-card" useScrollArea={false}>
              <div className="latest-updates-scroll max-h-[250px] pr-2 space-y-4">
                {[
                  { user: "Tonny", action: "posted 1 photo", time: "2 MIN AGO" },
                  { user: "Mike", action: "started following you", time: "5 MIN AGO" },
                  { user: "Research", action: "added a macro note", time: "11 MIN AGO" },
                  { user: "System", action: "synchronized price feed", time: "15 MIN AGO" },
                ].map((u, i) => (
                  <div key={i} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:border-indigo-500/30 transition-all">
                    <div className="text-[13px] text-white/80"><span className="font-black text-indigo-400">{u.user}</span> {u.action}</div>
                    <div className="text-[9px] font-black text-white/30 uppercase mt-1 tracking-widest">{u.time}</div>
                  </div>
                ))}
              </div>
            </FluidSection>
          </div>
        </ScrollArea>
      </div>

      {/* ADVANCED CHART ATTACHMENT MODAL */}
      <Dialog open={isChartModalOpen} onOpenChange={setIsChartModalOpen}>
        <DialogContent className="max-w-4xl bg-[#070b16] border-white/10 text-white shadow-[0_0_100px_rgba(0,229,255,0.15)] rounded-[32px] overflow-hidden p-0">
          <div className="p-8 h-full flex flex-col">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-black uppercase tracking-[0.1em] flex items-center gap-3">
                <BarChart2 className="w-6 h-6 text-cyan-400" />
                Diagnostic Capture Engine
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 flex-1 min-h-0">
              {/* Controls */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                    <Search className="w-3 h-3" /> Search Universe
                  </label>
                  <div className="relative">
                    <input 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cyan-500/50 transition-all"
                      value={chartSearchQuery}
                      onChange={(e) => setChartSearchQuery(e.target.value)}
                      placeholder="BTC, AAPL, SPX..."
                    />
                  </div>
                  <div className="space-y-1 mt-3 max-h-[150px] overflow-auto custom-scrollbar pr-2">
                    {filteredCatalog.map(item => (
                      <button 
                        key={item.symbol} 
                        onClick={() => setSelectedChartSymbol(item.symbol)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all ${selectedChartSymbol === item.symbol ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'hover:bg-white/5 text-white/60'}`}
                      >
                        {item.display} <span className="text-[9px] opacity-40 float-right uppercase">{item.category}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                    <Grid2X2 className="w-3 h-3" /> Diagnostic Visualizer
                  </label>
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs font-bold outline-none appearance-none cursor-pointer hover:bg-white/10"
                    value={selectedChartType}
                    onChange={(e) => setSelectedChartType(e.target.value as ApexChartType)}
                  >
                    {CHART_TYPES.map(t => (
                      <option key={t.type} value={t.type} className="bg-[#070b16]">{t.label}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                    <Type className="w-3 h-3" /> Annotation (Write on Chart)
                  </label>
                  <textarea 
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs font-bold outline-none focus:border-cyan-500/50 h-24 resize-none placeholder:text-white/20"
                    placeholder="e.g. BREAKOUT IMMINENT..."
                    value={annotationText}
                    onChange={(e) => setAnnotationText(e.target.value.toUpperCase())}
                  />
                </div>
              </div>

              {/* Preview Area */}
              <div className="relative rounded-2xl border border-white/5 bg-black/40 p-6 overflow-hidden min-h-[400px] flex flex-col">
                <div className="absolute top-6 left-6 z-20 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-[9px] font-black text-cyan-300 uppercase tracking-widest">
                  SNAPSHOT PREVIEW: {selectedChartSymbol} {selectedChartType.toUpperCase()}
                </div>
                
                <div className="flex-1 min-h-0 mt-8">
                  <MarketWatchChart 
                    symbol={selectedChartSymbol} 
                    points={generateMockOhlc(selectedChartSymbol, 100)} 
                    height={320}
                  />
                </div>

                {annotationText && (
                  <div className="absolute bottom-16 right-12 z-30 transform rotate-[-2deg] animate-in zoom-in-95 duration-200 max-w-[200px]">
                    <div className="bg-yellow-400 text-black px-4 py-3 rounded-sm shadow-2xl font-mono text-[14px] font-black tracking-tight border-b-2 border-black/20 leading-tight">
                      {annotationText}
                    </div>
                    <MousePointer2 className="w-5 h-5 text-black absolute top-[-10px] left-[-10px] drop-shadow-lg" />
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className="mt-8 pt-6 border-t border-white/5">
              <Button variant="ghost" onClick={() => setIsChartModalOpen(false)} className="text-white/40 hover:text-white uppercase text-[10px] font-black tracking-widest">Cancel</Button>
              <Button onClick={handleConfirmAttachment} className="bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase text-[10px] tracking-widest px-8 h-11 rounded-xl shadow-[0_0_30px_rgba(0,229,255,0.4)]">
                Confirm Snapshot & Attach
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
