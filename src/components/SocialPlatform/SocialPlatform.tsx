"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  Search,
  LayoutDashboard,
  MessageCircle,
  Heart,
  TrendingUp,
  Sparkles,
  Users,
  Compass,
  Zap,
  BarChart2,
  X,
  MousePointer2,
  Type,
  Globe,
  Loader2,
  Radio,
  Activity,
  MessageSquare,
  AlertCircle,
  Volume2,
  Bluetooth,
  Flag,
  Scale,
  HandMetal
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
import { collection, serverTimestamp } from "firebase/firestore";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import placeholderData from "@/app/lib/placeholder-images.json";
import { cn } from "@/lib/utils";
import WeatherWidget from "@/components/WeatherWidget";

const spectralTitleClass = "bg-clip-text text-transparent bg-gradient-to-r from-[#00f5ff] via-[#6a5cff] via-[#ff4fd8] to-[#ff8a00] drop-shadow-[0_0_25px_rgba(106,92,255,0.6)] brightness-125";

function BorderWallCard({
  title,
  children,
  className = "",
  maxHeight = "400px",
  id,
  useScrollArea = true,
  variant = "warm"
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
  maxHeight?: string;
  id?: string;
  useScrollArea?: boolean;
  variant?: "warm" | "cool";
}) {
  const isCool = variant === "cool";
  
  return (
    <div
      id={id}
      className={cn(
        "relative rounded-[26px] p-[3px] transition-all duration-500",
        isCool 
          ? "bg-[linear-gradient(135deg,#00f5ff_0%,#6a5cff_100%)] shadow-[0_0_25px_rgba(0,245,255,0.3)]" 
          : "bg-[linear-gradient(135deg,#ff00d4_0%,#ff8a00_100%)] shadow-[0_0_25px_rgba(255,138,0,0.3)]",
        className
      )}
    >
      <div
        className="
          h-full w-full
          rounded-[23px]
          bg-[radial-gradient(circle_at_top,rgba(17,24,54,0.95)_0%,rgba(3,8,24,0.98)_48%,rgba(0,0,0,1)_100%)]
          backdrop-blur-xl
          border border-white/5
          flex flex-col overflow-hidden
        "
      >
        {title ? (
          <div className="border-b border-white/8 px-5 py-4 shrink-0">
            <div className={cn(
              "text-[12px] font-black uppercase tracking-[0.28em]",
              isCool ? "text-cyan-300" : "text-orange-300"
            )}>
              {title}
            </div>
          </div>
        ) : null}

        <div className="flex-1 min-0 relative">
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
  );
}

function NavItem({
  label,
  icon: Icon,
  href = "#",
  active = false,
  color = "orange",
}: {
  label: string;
  icon?: any;
  href?: string;
  active?: boolean;
  color?: "pink" | "orange" | "emerald" | "amber" | "rose";
}) {
  const colorMap = {
    pink: "text-pink-400",
    orange: "text-orange-400",
    emerald: "text-emerald-400",
    amber: "text-amber-400",
    rose: "text-rose-400",
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
        <Icon className={cn("w-5 h-5 transition-all", active ? colorMap[color] : "text-white/70 group-hover:text-white group-hover:scale-110")} />
      ) : (
        <span className={cn("text-lg", colorMap[color])}>✦</span>
      )}
      <span className={cn("text-[15px] font-semibold", active ? colorMap[color] : "text-white")}>{label}</span>
    </a>
  );
}

export default function SocialPlatform() {
  const router = useRouter();
  const { toast } = useToast();
  const { firestore } = useFirebase();
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

  // Camera State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

  // Firestore Data
  const insightsRef = useMemoFirebase(() => user ? collection(firestore, "insights") : null, [firestore, user]);
  const { data: insightsData, isLoading: isInsightsLoading, error: insightsError } = useCollection(insightsRef);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!isUserLoading && !user && mounted) router.push("/login");
  }, [user, isUserLoading, mounted, router]);

  // Handle Camera Permission
  useEffect(() => {
    let stream: MediaStream | null = null;

    const getCameraPermission = async () => {
      if (isLive) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setHasCameraPermission(true);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          setIsLive(false);
          toast({
            variant: "destructive",
            title: "Camera Access Denied",
            description: "Please enable camera permissions in your browser settings to use this feature.",
          });
        }
      } else {
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        setHasCameraPermission(null);
      }
    };

    getCameraPermission();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isLive, toast]);

  const handleBluetooth = async () => {
    if (!navigator.bluetooth) {
      toast({
        variant: "destructive",
        title: "Protocol Unsupported",
        description: "Bluetooth synchronization is not supported by your current browser engine.",
      });
      return;
    }

    try {
      toast({
        title: "Bluetooth Initializing",
        description: "Scanning for unauthorized neural peripherals...",
      });
      
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
      });

      toast({
        title: "Device Synchronized",
        description: `Linked to: ${device.name || 'Unknown Peripheral'}`,
      });
    } catch (error: any) {
      if (error.name === 'NotFoundError') return;
      toast({
        variant: "destructive",
        title: "Sync Failure",
        description: "Failed to establish a secure link with the peripheral.",
      });
    }
  };

  const filteredCatalog = useMemo(() => {
    const q = chartSearchQuery.toLowerCase();
    return marketCatalog.filter(item => 
      item.symbol.toLowerCase().includes(q) || 
      item.display.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [chartSearchQuery]);

  const getImg = (id: string) => placeholderData.placeholderImages.find(img => img.id === id)?.imageUrl || "";

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
      description: "Your ideological thesis has been broadcast to the network.",
    });
  };

  return (
    <div className="flex w-full h-screen overflow-hidden bg-black text-white selection:bg-indigo-500 font-body">
      {/* LEFT SIDEBAR */}
      <aside className="w-[350px] border-r border-white/8 bg-black shrink-0 h-full flex flex-col">
        <div className="p-6 shrink-0">
          <NeonBoard className="w-full">
            <div className="px-6 py-6 flex flex-col items-center justify-center gap-4 bg-transparent group">
              <div className="relative">
                <img 
                  src="https://i.postimg.cc/3NZqktNh/Chat-GPT-Image-Feb-26-2026-02-20-36-PM.png"
                  alt="After Patent Logo"
                  className="w-48 h-48 rounded-3xl object-cover border-2 border-orange-500/40 shadow-[0_0_60px_rgba(255,136,0,0.8)] brightness-125 saturate-150 transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute bottom-2 right-2 text-[12px] font-bold text-white shadow-black drop-shadow-md select-none">©™</span>
              </div>
              <div className="text-[14px] font-black tracking-[0.25em] text-white uppercase text-center">
                AFTER PATENT
              </div>
            </div>
          </NeonBoard>
        </div>

        <ScrollArea className="flex-1 min-h-0">
          <div className="px-6 pb-8 space-y-8">
            <BorderWallCard title="Workspace" maxHeight="none" useScrollArea={false}>
              <div className="space-y-1">
                <NavItem label="Market Overview" icon={Globe} href="/markets" color="emerald" />
                <NavItem label="Universal Terminal" icon={LayoutDashboard} href="/dashboard?mode=minimal" color="amber" />
                <NavItem label="Political Network" icon={Compass} href="/personalities" active color="orange" />
                <NavItem label="Network Hubs" icon={Users} href="/communities" color="emerald" />
                <NavItem label="Social Stream" icon={MessageCircle} href="/community" color="pink" />
              </div>
            </BorderWallCard>

            <BorderWallCard title="Political Sectors" maxHeight="300px">
              <div className="space-y-1">
                <NavItem label="Republican" icon={Flag} href="/communities?hubId=republican-sector" color="orange" />
                <NavItem label="Democrat" icon={Globe} href="/communities?hubId=democrat-sector" color="pink" />
                <NavItem label="Independent" icon={Scale} href="/communities?hubId=independent-sector" color="amber" />
                <NavItem label="Liberal" icon={HandMetal} href="/communities?hubId=liberal-sector" color="emerald" />
              </div>
            </BorderWallCard>
          </div>
        </ScrollArea>
      </aside>

      {/* CENTER SECTION */}
      <section className="flex-1 min-w-0 flex flex-col h-full overflow-hidden bg-transparent">
        <header className="h-56 border-b border-white/10 bg-black/40 backdrop-blur-md px-10 flex items-center justify-between shrink-0 sticky top-0 z-50">
          <div className="flex items-center gap-10">
            <div className="relative group">
              <img 
                src="https://i.postimg.cc/3NZqktNh/Chat-GPT-Image-Feb-26-2026-02-20-36-PM.png"
                alt="After Patent Logo"
                className="w-48 h-48 rounded-3xl object-cover border-2 border-orange-500/40 shadow-[0_0_60px_rgba(255,136,0,0.8)] brightness-125 saturate-150 transition-all duration-500 group-hover:scale-105"
              />
              <span className="absolute bottom-2 right-2 text-[12px] font-bold text-white shadow-black drop-shadow-md select-none">©™</span>
            </div>
            <div className="flex flex-col text-left">
              <span className={`text-[32px] font-black tracking-[0.3em] uppercase leading-none ${spectralTitleClass}`}>Intelligence</span>
              <span className="text-[24px] font-bold tracking-[0.1em] text-white/40 uppercase">Global Stream</span>
            </div>
          </div>
          
          <div className="flex-1 max-w-xl mx-12">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-white/30" />
              <input
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 py-5 text-lg focus:border-indigo-500/50 transition-all outline-none"
                placeholder="Search ideological network..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-10">
            <div className="hidden lg:flex items-center gap-6 text-white/30 border-r border-white/10 pr-10">
              <Volume2 className="w-6 h-6 hover:text-indigo-400 cursor-pointer transition-colors" />
              <Bluetooth 
                onClick={handleBluetooth}
                className="w-6 h-6 hover:text-indigo-400 cursor-pointer transition-colors" 
              />
            </div>

            <div className="flex items-center gap-4 bg-white/5 border border-white/8 rounded-3xl px-6 py-3">
              <Avatar className="w-14 h-14 ring-2 ring-indigo-500/20">
                <AvatarImage src={user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`} />
                <AvatarFallback className="bg-indigo-500 text-sm font-black">{user.displayName?.[0]}</AvatarFallback>
              </Avatar>
              <div className="text-left leading-tight hidden lg:block">
                <div className="text-lg font-black text-white">{user.displayName || "Trader"}</div>
                <div className="text-[11px] font-black text-indigo-400 uppercase tracking-widest">Authorized</div>
              </div>
            </div>
          </div>
        </header>

        <ScrollArea className="flex-1">
          <div className="max-w-4xl mx-auto px-10 py-12 space-y-12 pb-32">
            {/* DISPATCH MODULE */}
            <BorderWallCard title="Dispatch" maxHeight="none" useScrollArea={false} variant="cool">
              <div className="flex flex-col gap-8">
                {/* Live Camera Preview */}
                {isLive && (
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl">
                    <video 
                      ref={videoRef} 
                      className="w-full h-full object-cover transition-all duration-700" 
                      autoPlay 
                      muted 
                    />
                    <div className="absolute top-6 right-6 flex items-center gap-3 px-4 py-2 rounded-full bg-rose-500/80 backdrop-blur-md border border-white/20 animate-pulse">
                      <Radio className="w-4 h-4 text-white" />
                      <span className="text-[11px] font-black text-white uppercase tracking-widest">LIVE</span>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-6">
                  <div className="flex flex-col items-center gap-3">
                    <Avatar className="w-16 h-16 border border-white/10 ring-2 ring-indigo-500/20">
                      <AvatarImage src={user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`} />
                      <AvatarFallback className="bg-indigo-500 text-lg">{user.displayName?.[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <textarea 
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-lg font-medium text-white outline-none focus:border-cyan-500/50 transition-all resize-none min-h-[160px] placeholder:text-white/20"
                      placeholder="Broadcast ideological thesis or network observation..."
                      value={postText}
                      onChange={(e) => setPostText(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/5">
                <div className="flex items-center gap-10">
                  <button onClick={() => setIsChartModalOpen(true)} className={`flex items-center gap-3 text-[11px] font-black uppercase tracking-widest transition-colors ${activeAttachment ? 'text-cyan-400' : 'text-white/40 hover:text-cyan-400'}`}>
                    <BarChart2 className="w-5 h-5" /> Attach Mapped Chart
                  </button>
                  <button onClick={() => setIsLive(!isLive)} className={`flex items-center gap-3 text-[11px] font-black uppercase tracking-widest transition-colors ${isLive ? 'text-rose-400' : 'text-white/40 hover:text-rose-400'}`}>
                    <Radio className="w-5 h-5" /> Live Sync
                  </button>
                </div>
                <Button onClick={handleDispatch} className="bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase text-[11px] tracking-widest px-10 h-12 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all">
                  Dispatch →
                </Button>
              </div>
            </BorderWallCard>

            {/* FEED */}
            <div className="space-y-12">
              {isInsightsLoading ? (
                <div className="py-24 flex flex-col items-center opacity-20">
                  <Activity className="w-12 h-12 animate-pulse mb-6 text-indigo-500" />
                  <span className="text-[11px] font-black uppercase tracking-[0.4em]">Synchronizing Data Stream...</span>
                </div>
              ) : (
                insightsData?.sort((a: any, b: any) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)).map((post: any) => (
                  <div key={post.id} className="mx-auto w-full group">
                    <div className="relative rounded-[40px] p-[4px] bg-[linear-gradient(135deg,#00f5ff_0%,#6a5cff_50%,#ff00d4_100%)] shadow-[0_0_30px_rgba(106,92,255,0.2)] transition-transform hover:scale-[1.005]">
                      <div className="rounded-[36px] bg-[radial-gradient(circle_at_top,rgba(10,18,48,0.94)_0%,rgba(2,6,23,0.98)_58%,rgba(1,4,15,1)_100%)] px-10 py-8">
                        <div className="flex items-start justify-between gap-6">
                          <div className="flex items-center gap-6">
                            <Avatar className="w-16 h-16 ring-2 ring-indigo-500/20">
                              <AvatarImage src={post.avatar || `https://i.pravatar.cc/150?u=${post.userId}`} />
                              <AvatarFallback className="bg-indigo-500 text-lg">{post.user[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-3">
                                <div className="text-[22px] font-black text-white">{post.user}</div>
                                {post.isLive && <Badge className="bg-rose-500 text-[10px] font-black px-2 py-1 h-5 uppercase tracking-widest">LIVE</Badge>}
                              </div>
                              <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-white/40">
                                {post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleString() : post.time}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="my-8 h-px bg-white/8" />

                        <p className="text-[20px] leading-relaxed text-white/90 mb-8">{post.text}</p>

                        <div className="flex items-center gap-12 text-white/50 border-t border-white/5 pt-8">
                          <button className="flex items-center gap-3 hover:text-red-500 transition-colors"><Heart className="w-6 h-6" /><span className="font-bold text-sm uppercase tracking-widest">Synchronize</span></button>
                          <button className="flex items-center gap-3 hover:text-indigo-400 transition-colors"><MessageCircle className="w-6 h-6" /><span className="font-bold text-sm uppercase tracking-widest">Discuss</span></button>
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
      <aside className="w-[380px] border-l border-white/8 bg-black shrink-0 h-full flex flex-col">
        <div className="p-8 flex items-center gap-4 border-b border-white/5 shrink-0">
          <TrendingUp className="w-6 h-6 text-indigo-500" />
          <div className={`text-[14px] font-black tracking-[0.3em] uppercase ${spectralTitleClass}`}>Environment</div>
        </div>
        <ScrollArea className="flex-1 min-h-0">
          <div className="px-6 py-8 space-y-10">
            <BorderWallCard title="Atmospheric Data" maxHeight="none" useScrollArea={false} variant="cool">
              <WeatherWidget />
            </BorderWallCard>

            <BorderWallCard title="Live Hubs" maxHeight="none" useScrollArea={false}>
              <div className="space-y-6">
                {[
                  { name: "Jessica Miller", status: "Analyzing Market", active: true, img: getImg("profile-jessica") },
                  { name: "Market Watch", status: "Session Review", active: true, img: getImg("hub-market-watch") },
                ].map((hub, i) => (
                  <div key={i} className="flex items-center gap-5 p-3 rounded-2xl hover:bg-white/5 transition-all cursor-pointer group">
                    <div className="relative h-16 w-16 shrink-0 rounded-full bg-[linear-gradient(135deg,#00f5ff,#6a5cff,#ff00d4,#ff8a00)] p-[3px]">
                      <div className="h-full w-full rounded-full overflow-hidden">
                        <img src={hub.img} className="w-full h-full object-cover" alt="" />
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="text-[16px] font-black text-white group-hover:text-indigo-400 transition-colors">{hub.name}</div>
                      <div className="text-[11px] font-black text-white/30 uppercase tracking-widest">{hub.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </BorderWallCard>
          </div>
        </ScrollArea>
      </aside>
    </div>
  );
}