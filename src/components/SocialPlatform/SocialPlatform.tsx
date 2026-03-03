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
  Compass,
  LogOut,
  Loader2,
  Radio
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
import { type ApexChartType } from "@/components/markets/apex/market-watch-types";
import { MarketWatchChart } from "@/components/markets/apex/MarketWatchChart";
import { generateMockOhlc } from "@/utils/mockData";
import { useFirebase, useUser, useMemoFirebase, useCollection } from "@/firebase";
import { signOut } from "firebase/auth";
import { collection, serverTimestamp } from "firebase/firestore";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";

const spectralTitleClass = "bg-clip-text text-transparent bg-gradient-to-r from-[#00d4ff] via-[#6a5cff] via-[#ff4fd8] to-[#ff8a00] drop-shadow-[0_0_25px_rgba(106,92,255,0.6)] brightness-125";

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
  const { auth, firestore } = useFirebase();
  const { user, isUserLoading } = useUser();
  
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Post Draft State
  const [postText, setPostText] = useState("");
  const [attachedSymbols, setAttachedSymbols] = useState<string[]>([]);
  const [isLive, setIsLive] = useState(false);
  
  // Advanced Chart Attachment State
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);
  const [chartSearchQuery, setChartSearchQuery] = useState("");
  const [selectedChartSymbol, setSelectedChartSymbol] = useState("BTCUSD");
  const [annotationText, setAnnotationText] = useState("");
  const [activeAttachment, setActiveAttachment] = useState<any>(null);

  // Firestore Real-time Data
  const insightsRef = useMemoFirebase(() => user ? collection(firestore, "insights") : null, [firestore, user]);
  const { data: insightsData, isLoading: isInsightsLoading } = useCollection(insightsRef);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  useEffect(() => {
    if (!isUserLoading && !user && mounted) router.push("/login");
  }, [user, isUserLoading, mounted, router]);

  const filteredCatalog = useMemo(() => {
    const q = chartSearchQuery.toLowerCase();
    return marketCatalog.filter(item => 
      item.symbol.toLowerCase().includes(q) || 
      item.display.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [chartSearchQuery]);

  if (!mounted || isUserLoading || !user) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-indigo-500">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Synchronizing Network Profile...</span>
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleDispatch = () => {
    if (!postText.trim()) {
      toast({ variant: "destructive", title: "Dispatch Failed", description: "Record observation before broadcasting." });
      return;
    }
    if (!user || !insightsRef) return;

    const insightData = {
      userId: user.uid,
      user: user.displayName || user.email?.split("@")[0] || "Trader",
      avatar: user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`,
      time: "Just now",
      createdAt: serverTimestamp(),
      text: postText,
      symbols: attachedSymbols,
      attachment: activeAttachment ? { ...activeAttachment } : null,
      isLive
    };

    addDocumentNonBlocking(insightsRef, insightData);
    setPostText("");
    setAttachedSymbols([]);
    setActiveAttachment(null);
    setAnnotationText("");
    setIsLive(false);

    toast({ title: "Insight Dispatched", description: "Your diagnostic thesis has been broadcast to the network." });
  };

  const navItemClass = "flex items-center gap-4 px-4 py-2.5 rounded-xl hover:bg-white/5 transition-all group cursor-pointer";

  return (
    <div className="flex w-full h-screen overflow-hidden bg-background text-foreground fade-in selection:bg-primary selection:text-white font-body">
      {/* Left Sidebar */}
      <div className="w-72 border-r border-white/10 flex flex-col bg-black shrink-0 h-full">
        <div className="p-4 shrink-0">
          <NeonBoard className="w-full">
            <div className="px-4 py-3 flex items-center justify-center gap-3">
              <div className="text-[11px] font-black tracking-[0.3em] text-white uppercase text-center">
                CLEAR PATH TRADER
              </div>
            </div>
          </NeonBoard>
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
                <a href="/community" className={navItemClass}><Users className="w-5 h-5 text-pink-500 group-hover:scale-110 transition-transform" /><span className="text-[15px] font-semibold text-pink-400">Overall</span></a>
              </div>
            </FluidSection>
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col min-w-0 bg-transparent h-full">
        {/* HEADER */}
        <header className="h-32 border-b border-white/10 flex items-center justify-between px-8 bg-black/40 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.6)]">
              <Activity className="w-10 h-10 text-white" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[24px] font-black tracking-[0.3em] text-white uppercase leading-none">Social Hub</span>
              <span className="text-[20px] font-bold tracking-[0.1em] text-white/40 uppercase">Intelligence Network</span>
            </div>
          </div>

          <div className="flex-1 max-w-xl relative mx-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search markets, news, or traders..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>

          <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 text-white" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Avatar className="w-10 h-10 ring-2 ring-primary/20 ring-offset-2 ring-offset-black cursor-pointer group">
              <AvatarImage src={user.photoURL || ""} />
              <AvatarFallback className="bg-indigo-500 text-xs font-black text-white">{user.displayName?.[0]}</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <ScrollArea className="flex-1 min-h-0">
          <div className="w-full max-w-2xl mx-auto p-8 space-y-10 pb-20">
            {/* RE-RESTORED POSTING BAR */}
            <NeonBoard className="w-full">
              <div className="bg-[#070b16] p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-4 bg-primary shadow-[0_0_8px_#3b82f6]" />
                    <div className="text-[11px] font-black uppercase tracking-[0.25em] text-white/70">Dispatch Insight</div>
                  </div>
                  {isLive && (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 animate-pulse">
                      <Radio className="w-3 h-3 text-rose-500" />
                      <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest">Live Syncing</span>
                    </div>
                  )}
                </div>
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10 border border-white/10 mt-1">
                    <AvatarImage src={user.photoURL || ""} />
                    <AvatarFallback className="bg-indigo-500">{user.displayName?.[0]}</AvatarFallback>
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
                        <Badge key={sym} variant="secondary" className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 gap-1.5 px-3 py-1 uppercase font-black tracking-widest text-[9px]">
                          {sym}<X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setAttachedSymbols(prev => prev.filter(s => s !== sym))} />
                        </Badge>
                      ))}
                      {activeAttachment && (
                        <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 gap-1.5 px-3 py-1 uppercase font-black tracking-widest text-[9px]">
                          <BarChart2 className="w-3 h-3" /> {activeAttachment.symbol} Mapped
                          <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setActiveAttachment(null)} />
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-5">
                    <button onClick={() => { const s = prompt("Symbol:"); if(s) setAttachedSymbols([...attachedSymbols, s.toUpperCase()]); }} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-primary transition-colors">
                      <Zap className="w-3.5 h-3.5" />Link Asset
                    </button>
                    <button onClick={() => setIsChartModalOpen(true)} className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors ${activeAttachment ? 'text-cyan-400' : 'text-white/40 hover:text-primary'}`}>
                      <BarChart2 className="w-3.5 h-3.5" />{activeAttachment ? 'Edit Markup' : 'Attach Markup'}
                    </button>
                    <button onClick={() => setIsLive(!isLive)} className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors ${isLive ? 'text-rose-400' : 'text-white/40 hover:text-rose-400'}`}>
                      <Radio className="w-3.5 h-3.5" /> Go Live
                    </button>
                  </div>
                  <Button onClick={handleDispatch} className="bg-primary hover:bg-primary/80 text-[10px] font-black uppercase tracking-widest px-6 h-9 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                    Dispatch →
                  </Button>
                </div>
              </div>
            </NeonBoard>

            <div className="space-y-10">
              {isInsightsLoading ? (
                <div className="flex flex-col items-center py-20 opacity-20"><Loader2 className="w-8 h-8 animate-spin mb-4" /></div>
              ) : (
                insightsData?.sort((a: any, b: any) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)).map((post: any) => (
                  <NeonBoard key={post.id} className="w-full">
                    <div className="text-white">
                      <CardHeader className="p-6">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12 ring-2 ring-primary/20"><AvatarImage src={post.avatar} /><AvatarFallback>{post.user[0]}</AvatarFallback></Avatar>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white">{post.user}</span>
                              {post.isLive && <Badge className="bg-rose-500 text-[8px] px-1.5 py-0">LIVE</Badge>}
                            </div>
                            <span className="text-[10px] text-white/30 uppercase font-black tracking-widest">
                              {post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleString() : post.time}
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="px-8 py-6 bg-[#070b16]/95 border-y border-white/5">
                        <p className="text-lg leading-relaxed text-white/90 mb-6">{post.text}</p>
                        {post.attachment && (
                          <div className="relative rounded-2xl border border-white/10 bg-black/40 p-4 mb-6">
                            <MarketWatchChart symbol={post.attachment.symbol} points={generateMockOhlc(post.attachment.symbol, 100)} height={300} />
                            {post.attachment.annotation && (
                              <div className="absolute bottom-12 right-8 z-30">
                                <div className="bg-yellow-400 text-black px-4 py-2 rounded-sm shadow-2xl font-mono text-[13px] font-black">{post.attachment.annotation}</div>
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="px-8 py-5 flex gap-8 items-center bg-[#070b16]">
                        <button className="flex items-center gap-2 text-white/40 hover:text-red-500 transition-colors"><Heart className="w-5 h-5" /><span className="text-xs font-black">2.4K</span></button>
                        <button className="flex items-center gap-2 text-white/40 hover:text-primary transition-colors"><MessageCircle className="w-5 h-5" /><span className="text-xs font-black">128</span></button>
                      </CardFooter>
                    </div>
                  </NeonBoard>
                ))
              )}
            </div>
          </div>
        </ScrollArea>
      </div>

      <Dialog open={isChartModalOpen} onOpenChange={setIsChartModalOpen}>
        <DialogContent className="max-w-4xl bg-[#070b16] border-white/10 text-white rounded-[32px] overflow-hidden p-0 shadow-[0_0_100px_rgba(0,229,255,0.15)]">
          <div className="p-8 h-full flex flex-col">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-black uppercase tracking-[0.1em] flex items-center gap-3"><BarChart2 className="w-6 h-6 text-cyan-400" /> Diagnostic Markup Tool</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 flex-1">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Select Asset</label>
                  <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-500/50" value={chartSearchQuery} onChange={(e) => setChartSearchQuery(e.target.value)} />
                  <div className="space-y-1 mt-3 max-h-[120px] overflow-auto pr-2 custom-scrollbar">
                    {filteredCatalog.map(item => (
                      <button key={item.symbol} onClick={() => setSelectedChartSymbol(item.symbol)} className={`w-full text-left px-3 py-2 rounded-lg text-[11px] font-black uppercase transition-all ${selectedChartSymbol === item.symbol ? 'bg-cyan-500/20 text-cyan-300' : 'text-white/40 hover:bg-white/5'}`}>{item.display}</button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Markup Annotation</label>
                  <textarea className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs font-black uppercase outline-none focus:border-cyan-500/50 h-32 resize-none" value={annotationText} onChange={(e) => setAnnotationText(e.target.value.toUpperCase())} placeholder="e.g. BREAKOUT IMMINENT" />
                </div>
              </div>
              <div className="relative rounded-2xl border border-white/5 bg-black/40 p-6 overflow-hidden min-h-[400px]">
                <div className="absolute top-6 left-6 z-20 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-[9px] font-black text-cyan-300 uppercase tracking-widest">DIAGNOSTIC PREVIEW</div>
                <div className="flex-1 min-h-0 mt-8">
                  <MarketWatchChart symbol={selectedChartSymbol} points={generateMockOhlc(selectedChartSymbol, 100)} height={340} />
                </div>
                {annotationText && (
                  <div className="absolute bottom-16 right-12 z-30 transform rotate-[-2deg] animate-in zoom-in-95">
                    <div className="bg-yellow-400 text-black px-4 py-3 rounded-sm shadow-2xl font-mono text-[14px] font-black border-b-2 border-black/20 leading-tight">{annotationText}</div>
                    <MousePointer2 className="w-5 h-5 text-black absolute top-[-10px] left-[-10px] drop-shadow-lg" />
                  </div>
                )}
              </div>
            </div>
            <DialogFooter className="mt-8 pt-6 border-t border-white/5">
              <Button variant="ghost" onClick={() => setIsChartModalOpen(false)} className="uppercase text-[10px] font-black tracking-widest">Cancel</Button>
              <Button onClick={() => { setActiveAttachment({ symbol: selectedChartSymbol, annotation: annotationText }); setIsChartModalOpen(false); }} className="bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase text-[10px] px-8 h-11 rounded-xl">Map & Attach →</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
