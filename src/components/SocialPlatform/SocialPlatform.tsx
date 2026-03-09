"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  BarChart2,
  Radio,
  Activity,
  Volume2,
  Bluetooth,
  Loader2,
  ShieldCheck,
  TrendingUp,
  Heart,
  MessageCircle,
  Search,
  Menu,
  Globe,
  LayoutDashboard,
  Compass,
  Users,
  Flag,
  Scale,
  HandMetal
} from "lucide-react";
import Icon from "@/components/icons/Icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useFirebase, useUser, useMemoFirebase, useCollection } from "@/firebase";
import { collection, serverTimestamp } from "firebase/firestore";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import placeholderData from "@/app/lib/placeholder-images.json";
import { cn } from "@/lib/utils";
import WeatherWidget from "@/components/WeatherWidget";
import DiagnosticLogo from "@/components/DiagnosticLogo";
import NeonBoard from "@/components/NeonBoard";

const spectralTitleClass = "bg-clip-text text-transparent bg-gradient-to-r from-[#00d4ff] via-[#6a5cff] to-[#ff4fd8] drop-shadow-[0_0_25px_rgba(106,92,255,0.6)] brightness-125";

function BorderWallCard({
  title,
  children,
  className = "",
  maxHeight = "400px",
  useScrollArea = true,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
  maxHeight?: string;
  useScrollArea?: boolean;
}) {
  return (
    <div className={cn("relative rounded-[32px] p-[1px] bg-white/10 group", className)}>
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 rounded-[33px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <NeonBoard className="h-full">
        <div className="flex flex-col h-full bg-[#070b16]/60 backdrop-blur-2xl">
          {title && (
            <div className="px-6 py-4 border-b border-white/5 bg-white/[0.03]">
              <div className="text-[11px] font-black uppercase tracking-[0.25em] text-white/60">{title}</div>
            </div>
          )}
          <div className="flex-1 min-h-0">
            {useScrollArea ? (
              <ScrollArea className="h-full">
                <div className="p-6" style={{ maxHeight }}>{children}</div>
              </ScrollArea>
            ) : (
              <div className="p-6" style={{ maxHeight }}>{children}</div>
            )}
          </div>
        </div>
      </NeonBoard>
    </div>
  );
}

function NavItem({
  label,
  icon: IconComp,
  href = "#",
  active = false,
  color = "orange",
}: {
  label: string;
  icon: any;
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
        "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-300 group relative overflow-hidden",
        active
          ? "bg-white/[0.06] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
          : "hover:bg-white/[0.04]",
      ].join(" ")}
    >
      {active && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent pointer-events-none" />
      )}
      <IconComp className={cn("w-5 h-5 transition-all z-10", active ? colorMap[color] : "text-white/70 group-hover:text-white group-hover:scale-110")} />
      <span className={cn("text-[15px] font-semibold z-10", active ? colorMap[color] : "text-white")}>{label}</span>
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
  const [postText, setPostText] = useState("");
  const [isLive, setIsLive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const insightsRef = useMemoFirebase(() => user ? collection(firestore, "insights") : null, [firestore, user]);
  const { data: insightsData, isLoading: isInsightsLoading } = useCollection(insightsRef);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (mounted && !isUserLoading && !user) router.push("/login");
  }, [user, isUserLoading, mounted, router]);

  useEffect(() => {
    let stream: MediaStream | null = null;
    const getCamera = async () => {
      if (isLive) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) videoRef.current.srcObject = stream;
        } catch (error) {
          setIsLive(false);
          toast({ variant: "destructive", title: "Camera Failed", description: "Could not access the lens." });
        }
      } else if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
    };
    getCamera();
    return () => stream?.getTracks().forEach(t => t.stop());
  }, [isLive, toast]);

  const handleBluetooth = async () => {
    if (!navigator.bluetooth) {
      toast({ variant: "destructive", title: "Unsupported", description: "Connections disabled in this browser." });
      return;
    }
    toast({ title: "Searching", description: "Looking for devices..." });
  };

  const getImg = (id: string) => placeholderData.placeholderImages.find(img => img.id === id)?.imageUrl || "";

  if (!mounted || isUserLoading || !user) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-indigo-500">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Connecting...</span>
      </div>
    );
  }

  const handleDispatch = () => {
    if (!postText.trim() || !user || !insightsRef) return;
    
    // BULLETPROOF IDENTITY: Safe split and fallback
    const emailPrefix = user.email ? user.email.split("@")[0] : null;
    const safeUser = user.displayName || emailPrefix || "User";

    addDocumentNonBlocking(insightsRef, {
      userId: user.uid,
      user: safeUser,
      avatar: user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`,
      createdAt: serverTimestamp(),
      text: postText,
      isLive
    });
    setPostText("");
    setIsLive(false);
    toast({ title: "Insight Posted", description: "Your update is now live." });
  };

  return (
    <div className="flex w-full h-screen overflow-hidden bg-black text-white selection:bg-indigo-500 font-body">
      {/* LEFT SIDEBAR (Desktop) */}
      <aside className="w-[350px] border-r border-white/10 bg-black/40 backdrop-blur-3xl shrink-0 h-full flex flex-col hidden lg:flex">
        <div className="p-8 shrink-0 flex flex-col items-center gap-6">
          <NeonBoard className="w-32 h-32">
            <DiagnosticLogo size="md" className="w-full h-full" />
          </NeonBoard>
        </div>

        <ScrollArea className="flex-1 min-h-0">
          <div className="px-6 pb-8 space-y-8">
            <BorderWallCard title="Workspace" maxHeight="none" useScrollArea={false}>
              <div className="space-y-1">
                <NavItem label="Markets" icon={Globe} href="/markets" color="emerald" />
                <NavItem label="Terminal" icon={LayoutDashboard} href="/dashboard" color="amber" />
                <NavItem label="Personalities" icon={Compass} href="/personalities" color="orange" />
                <NavItem label="Hubs" icon={Users} href="/communities" color="emerald" />
                <NavItem label="Feed" icon={MessageCircle} href="/community" active color="pink" />
              </div>
            </BorderWallCard>

            <BorderWallCard title="Sectors" maxHeight="300px">
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
        <header className="h-20 lg:h-56 border-b border-white/10 bg-black/60 backdrop-blur-2xl px-6 lg:px-10 flex items-center justify-between shrink-0 sticky top-0 z-50">
          <div className="flex items-center gap-4 lg:gap-6">
            <Sheet>
              <SheetTrigger asChild>
                <button className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10">
                  <Menu className="w-5 h-5 text-white" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-black/95 border-r border-white/10 p-0 w-[280px]">
                <ScrollArea className="h-full">
                  <div className="p-6 space-y-8 pt-12">
                    <DiagnosticLogo size="sm" className="mx-auto mb-8" />
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/30 px-3 mb-2">Main Menu</div>
                        <NavItem label="Markets" icon={Globe} href="/markets" color="emerald" />
                        <NavItem label="Terminal" icon={LayoutDashboard} href="/dashboard" color="amber" />
                        <NavItem label="Feed" icon={MessageCircle} href="/community" active color="pink" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/30 px-3 mb-2">Sectors</div>
                        <NavItem label="Republican" icon={Flag} href="/communities?hubId=republican-sector" color="orange" />
                        <NavItem label="Democrat" icon={Globe} href="/communities?hubId=democrat-sector" color="pink" />
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
            <div className="flex flex-col text-left">
              <span className="text-xl lg:text-[32px] font-black tracking-[0.2em] lg:tracking-[0.3em] uppercase leading-none bg-clip-text text-transparent bg-gradient-to-r from-[#00d4ff] via-[#6a5cff] to-[#ff4fd8]">Feed</span>
              <span className="text-[10px] lg:text-[24px] font-bold tracking-[0.1em] text-white/40 uppercase hidden lg:block">Global Stream</span>
            </div>
          </div>
          
          <div className="flex-1 max-w-xl mx-6 hidden md:block">
            <div className="relative group">
              <div className="absolute -inset-1 bg-indigo-500/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity" />
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 z-10" />
              <input
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 py-4 text-sm lg:text-lg focus:border-indigo-500/50 transition-all outline-none relative z-10 backdrop-blur-xl"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-10">
            <div className="hidden lg:flex items-center gap-6 text-white/30 border-r border-white/10 pr-10">
              <Volume2 className="w-6 h-6 hover:text-indigo-400 cursor-pointer transition-colors" />
              <Bluetooth onClick={handleBluetooth} className="w-6 h-6 hover:text-indigo-400 cursor-pointer transition-colors" />
            </div>
            <div className="flex items-center gap-3 lg:gap-4 bg-white/10 border border-white/15 rounded-2xl lg:rounded-3xl px-3 py-1.5 lg:px-6 lg:py-3 backdrop-blur-xl">
              <Avatar className="w-8 h-8 lg:w-14 h-14 ring-2 ring-indigo-500/40">
                <AvatarImage src={user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`} />
                <AvatarFallback className="bg-indigo-500">{user.displayName?.[0] || 'U'}</AvatarFallback>
              </Avatar>
              <div className="text-left leading-tight hidden lg:block">
                <div className="text-lg font-black text-white">{user.displayName || "User"}</div>
                <div className="text-[11px] font-black text-indigo-400 uppercase tracking-widest">Active</div>
              </div>
            </div>
          </div>
        </header>

        <ScrollArea className="flex-1">
          <div className="max-w-4xl mx-auto px-4 lg:px-10 py-6 lg:py-12 space-y-6 lg:space-y-12 pb-32">
            <BorderWallCard title="Create Post" maxHeight="none" useScrollArea={false}>
              <div className="flex flex-col gap-6 lg:gap-8">
                {isLive && (
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl">
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted />
                    <div className="absolute top-4 right-4 flex items-center gap-3 px-4 py-2 rounded-full bg-rose-500/80 animate-pulse backdrop-blur-md">
                      <Radio className="w-3 h-3 lg:w-4 h-4 text-white" />
                      <span className="text-[9px] lg:text-[11px] font-black text-white uppercase tracking-widest">LIVE</span>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-4 lg:gap-6">
                  <Avatar className="w-10 h-10 lg:w-16 h-16 shrink-0">
                    <AvatarImage src={user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`} />
                    <AvatarFallback className="bg-indigo-500">{user.displayName?.[0] || 'U'}</AvatarFallback>
                  </Avatar>
                  <textarea 
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl p-4 lg:p-6 text-sm lg:text-lg font-medium text-white outline-none focus:border-cyan-500/50 min-h-[120px] lg:min-h-[160px] backdrop-blur-xl transition-all"
                    placeholder="What's on your mind?..."
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-6 lg:mt-10 pt-6 border-t border-white/10">
                <div className="flex items-center gap-4 lg:gap-10">
                  <button className="flex items-center gap-2 text-[9px] lg:text-[11px] font-black text-white/40 hover:text-cyan-400">
                    <BarChart2 className="w-4 h-4 lg:w-5 h-5" /> Chart
                  </button>
                  <button onClick={() => setIsLive(!isLive)} className={cn("flex items-center gap-2 text-[9px] lg:text-[11px] font-black uppercase tracking-widest", isLive ? 'text-rose-400' : 'text-white/40')}>
                    <Radio className="w-4 h-4 lg:w-5 h-5" /> Live
                  </button>
                </div>
                <Button onClick={handleDispatch} className="bg-indigo-600 hover:bg-indigo-500 h-10 lg:h-12 px-6 lg:px-10 rounded-full font-black uppercase tracking-widest text-[9px] lg:text-[11px]">
                  Post Insight →
                </Button>
              </div>
            </BorderWallCard>

            <div className="space-y-6 lg:space-y-12">
              {isInsightsLoading ? (
                <div className="py-24 flex flex-col items-center opacity-20">
                  <Loader2 className="w-10 h-10 animate-spin mb-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Updating...</span>
                </div>
              ) : (
                insightsData?.sort((a: any, b: any) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)).map((post: any) => (
                  <div key={post.id} className="mx-auto w-full">
                    <NeonBoard>
                      <div className="rounded-[36px] bg-[#070b16]/80 px-6 py-6 lg:px-10 lg:py-8 backdrop-blur-3xl">
                        <div className="flex items-center gap-4 lg:gap-6">
                          <Avatar className="w-10 h-10 lg:w-16 h-16 ring-2 ring-indigo-500/20">
                            <AvatarImage src={post.avatar || `https://i.pravatar.cc/150?u=${post.userId}`} />
                            <AvatarFallback className="bg-indigo-500">{post.user ? post.user[0] : '?'}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2 lg:gap-3">
                              <div className="text-lg lg:text-[22px] font-black text-white">{post.user || "User"}</div>
                              {post.isLive && <Badge className="bg-rose-500 text-[8px] lg:text-[10px] font-black px-2 lg:px-3">LIVE</Badge>}
                            </div>
                            <div className="text-[10px] lg:text-[12px] font-bold text-white/40 uppercase tracking-widest">
                              {post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleString() : "Just now"}
                            </div>
                          </div>
                        </div>
                        <div className="my-6 lg:my-8 h-px bg-white/10" />
                        <p className="text-base lg:text-[20px] leading-relaxed text-white/90 mb-6 lg:mb-8 font-medium">{post.text}</p>
                        <div className="flex items-center gap-8 lg:gap-12 text-white/50 border-t border-white/5 pt-6 lg:pt-8">
                          <button className="flex items-center gap-2 lg:gap-3 hover:text-red-500 transition-colors">
                            <Heart className="w-5 h-5 lg:w-6 h-6" />
                            <span className="font-bold text-[10px] lg:text-sm uppercase tracking-widest">Support</span>
                          </button>
                          <button className="flex items-center gap-2 lg:gap-3 hover:text-indigo-400 transition-colors">
                            <MessageCircle className="w-5 h-5 lg:w-6 h-6" />
                            <span className="font-bold text-[10px] lg:text-sm uppercase tracking-widest">Comment</span>
                          </button>
                        </div>
                      </div>
                    </NeonBoard>
                  </div>
                ))
              )}
            </div>
          </div>
        </ScrollArea>
      </aside>

      {/* RIGHT SIDEBAR (Desktop) */}
      <aside className="w-[380px] border-l border-white/10 bg-black/40 backdrop-blur-3xl shrink-0 h-full flex flex-col hidden xl:flex">
        <div className="p-8 flex items-center gap-4 border-b border-white/10 shrink-0 bg-white/[0.02]">
          <TrendingUp className="w-6 h-6 text-indigo-500" />
          <div className="text-[14px] font-black tracking-[0.3em] uppercase text-white/80">Environment</div>
        </div>
        <ScrollArea className="flex-1 min-h-0">
          <div className="px-6 py-8 space-y-10">
            <BorderWallCard title="Local Node" maxHeight="none" useScrollArea={false}>
              <WeatherWidget />
            </BorderWallCard>
            <BorderWallCard title="Active Network" maxHeight="none" useScrollArea={false}>
              <div className="space-y-6">
                {[
                  { name: "Jessica Miller", status: "Active", img: getImg("profile-jessica") },
                  { name: "Market Watch", status: "Live Feed", img: getImg("hub-market-watch") },
                ].map((hub, i) => (
                  <div key={i} className="flex items-center gap-5 p-3 rounded-2xl hover:bg-white/5 cursor-pointer group">
                    <div className="relative h-12 w-12 lg:h-16 lg:w-16 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 p-[2px]">
                      <div className="h-full w-full rounded-full overflow-hidden border border-black/40">
                        <img src={hub.img} className="w-full h-full object-cover" alt="" />
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="text-sm lg:text-[16px] font-black text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{hub.name}</div>
                      <div className="text-[9px] lg:text-[11px] font-black text-white/30 uppercase tracking-widest">{hub.status}</div>
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
