
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
  Radio,
  Activity
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import NeonBoard from "@/components/NeonBoard";
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
import { MarketWatchChart } from "@/components/markets/apex/MarketWatchChart";
import { generateMockOhlc } from "@/utils/mockData";
import { useFirebase, useUser, useMemoFirebase, useCollection } from "@/firebase";
import { signOut } from "firebase/auth";
import { collection, serverTimestamp } from "firebase/firestore";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";

const spectralTitleClass = "bg-clip-text text-transparent bg-gradient-to-r from-[#00d4ff] via-[#6a5cff] via-[#ff4fd8] to-[#ff8a00] drop-shadow-[0_0_25px_rgba(106,92,255,0.6)] brightness-125";

function BorderWallCard({
  title,
  children,
  className = "",
  maxHeight = "400px",
  id,
  useScrollArea = true
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
  maxHeight?: string;
  id?: string;
  useScrollArea?: boolean;
}) {
  return (
    <div
      id={id}
      className={[
        "relative rounded-[26px]",
        "p-[5px]",
        "bg-[linear-gradient(135deg,rgba(255,110,34,1)_0%,rgba(255,40,120,0.95)_45%,rgba(255,140,0,1)_100%)]",
        "shadow-[0_0_22px_rgba(255,98,0,0.48),0_0_44px_rgba(255,40,120,0.26),0_0_70px_rgba(255,140,0,0.12)]",
        className,
      ].join(" ")}
    >
      <div
        className="
          rounded-[23px]
          p-[5px]
          bg-[linear-gradient(135deg,rgba(55,214,255,1)_0%,rgba(162,122,255,0.95)_48%,rgba(255,79,179,1)_100%)]
          shadow-[inset_0_0_16px_rgba(255,255,255,0.09),0_0_28px_rgba(44,213,255,0.35),0_0_30px_rgba(255,76,166,0.24)]
        "
      >
        <div
          className="
            rounded-[20px]
            bg-[radial-gradient(circle_at_top,rgba(17,24,54,0.92)_0%,rgba(3,8,24,0.98)_48%,rgba(1,4,15,1)_100%)]
            backdrop-blur-xl
            border border-white/5
            flex flex-col overflow-hidden
          "
        >
          {title ? (
            <div className="border-b border-white/8 px-5 py-4 shrink-0">
              <div className="text-[12px] font-black uppercase tracking-[0.28em] text-white/70">
                {title}
              </div>
            </div>
          ) : null}

          <div className="flex-1 min-h-0 relative">
            {useScrollArea ? (
              <ScrollArea className="h-full">
                <div className="p-5" style={{ maxHeight: maxHeight }}>{children}</div>
              </ScrollArea>
            ) : (
              <div className="p-5 h-full overflow-hidden" style={{ maxHeight: maxHeight }}>
                {children}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({
  label,
  icon: Icon,
  href = "#",
  active = false,
  color = "cyan",
}: {
  label: string;
  icon?: any;
  href?: string;
  active?: boolean;
  color?: "cyan" | "pink" | "orange" | "violet" | "emerald" | "blue";
}) {
  const colorMap = {
    cyan: "text-cyan-300",
    pink: "text-pink-400",
    orange: "text-orange-300",
    violet: "text-violet-300",
    emerald: "text-emerald-400",
    blue: "text-blue-400",
  };

  return (
    <a
      href={href}
      className={[
        "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 group",
        active
          ? "bg-white/[0.04] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
          : "hover:bg-white/[0.03]",
      ].join(" ")}
    >
      {Icon ? (
        <Icon className={["w-5 h-5", active ? colorMap[color] : "text-white/70 group-hover:text-white group-hover:scale-110 transition-all"].join(" ")} />
      ) : (
        <span className={["text-lg", colorMap[color]].join(" ")}>✦</span>
      )}
      <span className={["text-[15px] font-semibold", active ? colorMap[color] : "text-white"].join(" ")}>{label}</span>
    </a>
  );
}

export default function SocialPlatform() {
  const router = useRouter();
  const { toast } = useToast();
  const { auth, firestore } = useFirebase();
  const { user, isUserLoading } = useUser();
  
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Dispatch State
  const [postText, setPostText] = useState("");
  const [attachedSymbols, setAttachedSymbols] = useState<string[]>([]);
  const [isLive, setIsLive] = useState(false);
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);
  const [chartSearchQuery, setChartSearchQuery] = useState("");
  const [selectedChartSymbol, setSelectedChartSymbol] = useState("BTCUSD");
  const [annotationText, setAnnotationText] = useState("");
  const [activeAttachment, setActiveAttachment] = useState<any>(null);

  // Firestore Data
  const insightsRef = useMemoFirebase(() => user ? collection(firestore, "insights") : null, [firestore, user]);
  const { data: insightsData, isLoading: isInsightsLoading } = useCollection(insightsRef);

  useEffect(() => { setMounted(true); }, []);

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

  const handleDispatch = () => {
    if (!postText.trim()) return;
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

    toast({
      title: "Insight Dispatched",
      description: "Your diagnostic thesis has been broadcast to the network.",
    });
  };

  return (
    <div className="flex w-full h-screen overflow-hidden bg-black text-white selection:bg-indigo-500 font-body">
      {/* LEFT SIDEBAR */}
      <aside className="w-[290px] border-r border-white/8 bg-black shrink-0 h-full flex flex-col">
        <div className="p-4 shrink-0">
          <NeonBoard className="w-full">
            <div className="px-4 py-3 flex items-center justify-center gap-3">
              <div className="text-[11px] font-black tracking-[0.25em] text-white uppercase text-center">
                CLEAR PATH TRADER
              </div>
            </div>
          </NeonBoard>
        </div>

        <ScrollArea className="flex-1 min-h-0">
          <div className="px-5 pb-8 space-y-7">
            <BorderWallCard title="Workspace" maxHeight="none" useScrollArea={false}>
              <div className="space-y-1">
                <NavItem label="Market Overview" icon={Globe} href="/markets" color="emerald" />
                <NavItem label="Universal Workspace" icon={LayoutDashboard} href="/dashboard?mode=minimal" color="orange" />
                <NavItem label="Neuro Workspace" icon={Sparkles} href="/dashboard?mode=focus" color="violet" />
                <NavItem label="All Communities" icon={Compass} href="/communities" color="blue" />
                <NavItem label="Overall" icon={Users} href="/community" active color="pink" />
              </div>
            </BorderWallCard>

            <BorderWallCard title="Standard Modes" maxHeight="300px">
              <div className="space-y-1">
                <NavItem label="Stocks" href="/dashboard?mode=minimal&style=stocks" color="cyan" />
                <NavItem label="ETFs" href="/dashboard?mode=minimal&style=etfs" color="cyan" />
                <NavItem label="Bonds" href="/dashboard?mode=minimal&style=bonds" color="cyan" />
                <NavItem label="Forex" href="/dashboard?mode=minimal&style=forex" color="cyan" />
                <NavItem label="Futures" href="/dashboard?mode=minimal&style=futures" color="cyan" />
                <NavItem label="Crypto" href="/dashboard?mode=minimal&style=crypto" color="cyan" />
                <NavItem label="Indices" href="/dashboard?mode=minimal&style=indices" color="cyan" />
                <NavItem label="World Economy" href="/dashboard?mode=minimal&style=economy" color="cyan" />
              </div>
            </BorderWallCard>
          </div>
        </ScrollArea>
      </aside>

      {/* CENTER SECTION */}
      <section className="flex-1 min-w-0 flex flex-col h-full overflow-hidden bg-transparent">
        <header className="h-32 border-b border-white/10 bg-black/40 backdrop-blur-md px-8 flex items-center justify-between shrink-0 sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.6)]">
              <Users className="w-10 h-10 text-white" />
            </div>
            <div className="flex flex-col text-left">
              <span className={`text-[24px] font-black tracking-[0.3em] uppercase leading-none ${spectralTitleClass}`}>Global Network</span>
              <span className="text-[20px] font-bold tracking-[0.1em] text-white/40 uppercase">Intelligence Stream</span>
            </div>
          </div>
          
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm focus:border-indigo-500/50 transition-all outline-none"
                placeholder="Search universal asset network..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 border border-white/8 rounded-2xl px-4 py-2">
            <Avatar className="w-10 h-10 ring-2 ring-indigo-500/20">
              <AvatarImage src={user.photoURL || ""} />
              <AvatarFallback className="bg-indigo-500 text-xs font-black">{user.displayName?.[0]}</AvatarFallback>
            </Avatar>
            <div className="text-left leading-tight hidden lg:block">
              <div className="text-sm font-black text-white">{user.displayName || "Trader"}</div>
              <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Authorized</div>
            </div>
          </div>
        </header>

        <ScrollArea className="flex-1">
          <div className="max-w-3xl mx-auto px-8 py-10 space-y-10 pb-32">
            {/* DISPATCH MODULE */}
            <NeonBoard className="w-full">
              <div className="bg-[#070b16] p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-4 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                    <div className="text-[11px] font-black uppercase tracking-[0.25em] text-white/70">Initialize Dispatch</div>
                  </div>
                  {isLive && (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 animate-pulse">
                      <Radio className="w-3 h-3 text-rose-500" />
                      <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest">Live Sync Active</span>
                    </div>
                  )}
                </div>

                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12 border border-white/10">
                    <AvatarImage src={user.photoURL || ""} />
                    <AvatarFallback className="bg-indigo-500">{user.displayName?.[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <textarea 
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-base font-medium text-white outline-none focus:border-indigo-500/50 transition-all resize-none min-h-[120px] placeholder:text-white/20"
                      placeholder="Broadcast diagnostic thesis or network observation..."
                      value={postText}
                      onChange={(e) => setPostText(e.target.value)}
                    />
                    <div className="flex flex-wrap gap-2 mt-4">
                      {attachedSymbols.map(s => (
                        <Badge key={s} className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 gap-1.5 px-3 py-1 uppercase font-black tracking-widest text-[9px]">
                          {s} <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setAttachedSymbols(prev => prev.filter(x => x !== s))} />
                        </Badge>
                      ))}
                      {activeAttachment && (
                        <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 gap-1.5 px-3 py-1 uppercase font-black tracking-widest text-[9px]">
                          <BarChart2 className="w-3 h-3" /> {activeAttachment.symbol} Mapped
                          <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setActiveAttachment(null)} />
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-6">
                    <button onClick={() => { const s = prompt("Symbol:"); if(s) setAttachedSymbols([...attachedSymbols, s.toUpperCase()]); }} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-indigo-400 transition-colors">
                      <Zap className="w-3.5 h-3.5" /> Link Asset
                    </button>
                    <button onClick={() => setIsChartModalOpen(true)} className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors ${activeAttachment ? 'text-cyan-400' : 'text-white/40 hover:text-cyan-400'}`}>
                      <BarChart2 className="w-3.5 h-3.5" /> {activeAttachment ? 'Adjust Mapping' : 'Attach Mapped Chart'}
                    </button>
                    <button onClick={() => setIsLive(!isLive)} className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors ${isLive ? 'text-rose-400' : 'text-white/40 hover:text-rose-400'}`}>
                      <Radio className="w-3.5 h-3.5" /> Initialize Live
                    </button>
                  </div>
                  <Button onClick={handleDispatch} className="bg-indigo-500 hover:bg-indigo-400 text-white font-black uppercase text-[10px] tracking-widest px-8 h-10 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                    Synchronize →
                  </Button>
                </div>
              </div>
            </NeonBoard>

            {/* FEED */}
            <div className="space-y-10">
              {isInsightsLoading ? (
                <div className="py-20 flex flex-col items-center opacity-20">
                  <Activity className="w-10 h-10 animate-pulse mb-4 text-indigo-500" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">Calibrating Data Stream...</span>
                </div>
              ) : insightsData?.length === 0 ? (
                <div className="py-20 flex flex-col items-center opacity-20">
                  <Brain className="w-16 h-16 mb-4" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">Intelligence Layer Empty</span>
                </div>
              ) : (
                insightsData?.sort((a: any, b: any) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)).map((post: any) => (
                  <div key={post.id} className="mx-auto w-full group">
                    <div className="relative rounded-[36px] p-[8px] bg-[linear-gradient(135deg,rgba(83,238,255,1)_0%,rgba(110,142,255,1)_30%,rgba(255,87,182,1)_68%,rgba(184,160,255,1)_100%)] shadow-[0_0_26px_rgba(92,223,255,0.2),0_0_60px_rgba(180,80,255,0.1)] transition-transform hover:scale-[1.005]">
                      <div className="rounded-[29px] bg-[radial-gradient(circle_at_top,rgba(10,18,48,0.94)_0%,rgba(2,6,23,0.98)_58%,rgba(1,4,15,1)_100%)] px-8 py-7">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="w-12 h-12 ring-2 ring-indigo-500/20">
                              <AvatarImage src={post.avatar} />
                              <AvatarFallback className="bg-indigo-500">{post.user[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <div className="text-[18px] font-black text-white">{post.user}</div>
                                {post.isLive && <Badge className="bg-rose-500 text-[8px] font-black px-1.5 py-0.5 h-4 uppercase tracking-widest">LIVE</Badge>}
                              </div>
                              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
                                {post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleString() : post.time}
                              </div>
                            </div>
                          </div>
                          <button className="text-[11px] font-black uppercase tracking-[0.16em] text-cyan-300 transition hover:text-pink-300">
                            Analyze Intel →
                          </button>
                        </div>

                        <div className="my-6 h-px bg-white/8" />

                        <p className="text-[18px] leading-relaxed text-white/90 mb-6">{post.text}</p>

                        {post.attachment && (
                          <div className="relative rounded-2xl border border-white/10 bg-black/40 p-4 mb-6 overflow-hidden">
                            <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-[9px] font-black text-cyan-300 uppercase tracking-widest">
                              DIAGNOSTIC CAPTURE: {post.attachment.symbol} CANDLESTICK
                            </div>
                            <MarketWatchChart 
                              symbol={post.attachment.symbol} 
                              points={generateMockOhlc(post.attachment.symbol, 100)} 
                              height={300}
                            />
                            {post.attachment.annotation && (
                              <div className="absolute bottom-12 right-8 z-30 transform rotate-[-2deg]">
                                <div className="bg-yellow-400 text-black px-4 py-2 rounded-sm shadow-2xl font-mono text-[13px] font-black border-b-2 border-black/20">
                                  {post.attachment.annotation}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2 mb-6">
                          {post.symbols?.map((s: string) => (
                            <Badge key={s} variant="outline" className="text-[9px] font-black uppercase tracking-widest border-indigo-500/30 text-indigo-400 bg-indigo-500/5">{s}</Badge>
                          ))}
                        </div>

                        <div className="flex items-center gap-8 text-white/50 border-t border-white/5 pt-6">
                          <button className="flex items-center gap-2 hover:text-red-500 transition-colors"><Heart className="w-5 h-5" /><span className="font-bold text-xs uppercase tracking-widest">Synchronize</span></button>
                          <button className="flex items-center gap-2 hover:text-indigo-400 transition-colors"><MessageCircle className="w-5 h-5" /><span className="font-bold text-xs uppercase tracking-widest">Discuss</span></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </ScrollArea>
      </section>

      {/* RIGHT SIDEBAR */}
      <aside className="w-[330px] border-l border-white/8 bg-black shrink-0 h-full flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-white/5 shrink-0">
          <TrendingUp className="w-5 h-5 text-indigo-500" />
          <div className={`text-[12px] font-black tracking-[0.3em] uppercase ${spectralTitleClass}`}>Diagnostic Pacing</div>
        </div>
        <ScrollArea className="flex-1 min-h-0">
          <div className="px-5 py-6 space-y-8">
            <BorderWallCard title="Live Hubs" maxHeight="none" useScrollArea={false}>
              <div className="space-y-5">
                {[
                  { name: "Jessica Miller", status: "Live Analyzing NVDA", active: true },
                  { name: "Market Watch", status: "Session Review", active: true },
                  { name: "Research Desk", status: "Macro Update", active: false },
                ].map((hub, i) => (
                  <div key={i} className="flex items-center gap-4 p-2 rounded-xl hover:bg-white/5 transition-all cursor-pointer group">
                    <div className="relative h-12 w-12 shrink-0 rounded-full bg-[linear-gradient(135deg,#59e7ff,#8a7dff,#ff4ba3)] p-[2px]">
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-950 text-sm font-black text-white">{hub.name[0]}</div>
                      {hub.active && <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-slate-950 bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" />}
                    </div>
                    <div className="text-left">
                      <div className="text-[14px] font-black text-white group-hover:text-indigo-400 transition-colors">{hub.name}</div>
                      <div className="text-[10px] font-black text-white/30 uppercase tracking-widest">{hub.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </BorderWallCard>

            <BorderWallCard title="Latest Events" maxHeight="none" useScrollArea={false}>
              <div className="space-y-4 text-[13px] text-left">
                <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                  <span className="font-black text-cyan-300 uppercase tracking-widest text-[10px]">Macro Event</span>
                  <div className="text-white/90 mt-1">Fed Interest Rate Decision in 2h</div>
                </div>
                <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                  <span className="font-black text-pink-300 uppercase tracking-widest text-[10px]">Network Sync</span>
                  <div className="text-white/90 mt-1">3.2K Traders active in Macro Sector</div>
                </div>
              </div>
            </BorderWallCard>
          </div>
        </ScrollArea>
      </aside>

      {/* CHART MODAL */}
      <Dialog open={isChartModalOpen} onOpenChange={setIsChartModalOpen}>
        <DialogContent className="max-w-4xl bg-[#070b16] border-white/10 text-white rounded-[32px] overflow-hidden p-0 shadow-[0_0_100px_rgba(0,229,255,0.15)]">
          <div className="p-8 h-full flex flex-col">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-black uppercase tracking-[0.1em] flex items-center gap-3">
                <BarChart2 className="w-6 h-6 text-cyan-400" />
                Diagnostic Capture Module
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 flex-1">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2"><Globe className="w-3 h-3" /> Select Asset</label>
                  <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-500/50" value={chartSearchQuery} onChange={(e) => setChartSearchQuery(e.target.value)} placeholder="Search Symbol..." />
                  <div className="space-y-1 mt-3 max-h-[120px] overflow-auto pr-2 custom-scrollbar">
                    {filteredCatalog.map(item => (
                      <button key={item.symbol} onClick={() => setSelectedChartSymbol(item.symbol)} className={`w-full text-left px-3 py-2 rounded-lg text-[11px] font-black transition-all uppercase tracking-widest ${selectedChartSymbol === item.symbol ? 'bg-cyan-500/20 text-cyan-300' : 'hover:bg-white/5 text-white/40'}`}>{item.display}</button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2"><Type className="w-3 h-3" /> Markup Annotation</label>
                  <textarea className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs font-black uppercase outline-none focus:border-cyan-500/50 h-32 resize-none text-white" value={annotationText} onChange={(e) => setAnnotationText(e.target.value.toUpperCase())} placeholder="e.g. BREAKOUT IMMINENT" />
                </div>
              </div>
              <div className="relative rounded-2xl border border-white/5 bg-black/40 p-6 overflow-hidden min-h-[400px]">
                <div className="absolute top-6 left-6 z-20 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-[9px] font-black text-cyan-300 uppercase tracking-widest">SNAPSHOT PREVIEW</div>
                <div className="flex-1 min-h-0 mt-8"><MarketWatchChart symbol={selectedChartSymbol} points={generateMockOhlc(selectedChartSymbol, 100)} height={340} /></div>
                {annotationText && (
                  <div className="absolute bottom-16 right-12 z-30 transform rotate-[-2deg] animate-in zoom-in-95">
                    <div className="bg-yellow-400 text-black px-4 py-3 rounded-sm shadow-2xl font-mono text-[14px] font-black border-b-2 border-black/20 leading-tight">{annotationText}</div>
                    <MousePointer2 className="w-5 h-5 text-black absolute top-[-10px] left-[-10px] drop-shadow-lg" />
                  </div>
                )}
              </div>
            </div>
            <DialogFooter className="mt-8 pt-6 border-t border-white/5">
              <Button variant="ghost" onClick={() => setIsChartModalOpen(false)} className="uppercase text-[10px] font-black tracking-widest text-white/40">Cancel</Button>
              <Button onClick={() => { setActiveAttachment({ symbol: selectedChartSymbol, annotation: annotationText }); setIsChartModalOpen(false); }} className="bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase text-[10px] tracking-widest px-8 h-11 rounded-xl">Map & Attach →</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
