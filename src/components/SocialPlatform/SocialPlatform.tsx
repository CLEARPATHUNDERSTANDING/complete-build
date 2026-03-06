"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  Search,
  LayoutDashboard,
  MessageCircle,
  Heart,
  TrendingUp,
  Users,
  Compass,
  BarChart2,
  X,
  Radio,
  Activity,
  Volume2,
  Bluetooth,
  Flag,
  Scale,
  HandMetal,
  Loader2,
  Globe,
  ShieldCheck,
  Zap,
  User,
  Brain,
  ArrowLeft
} from "lucide-react";
import Icon from "@/components/icons/Icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { useFirebase, useUser, useMemoFirebase, useCollection } from "@/firebase";
import { collection, serverTimestamp } from "firebase/firestore";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import placeholderData from "@/app/lib/placeholder-images.json";
import { cn } from "@/lib/utils";
import WeatherWidget from "@/components/WeatherWidget";
import AfterPatentLogo from "@/components/AfterPatentLogo";
import NeonBoard from "@/components/NeonBoard";

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
  return (
    <div className={cn("relative rounded-[32px] p-[2px] bg-white/10", className)}>
      <NeonBoard className="h-full">
        <div className="flex flex-col h-full bg-[#070b16]">
          {title && (
            <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02]">
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-white/60">{title}</div>
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
  iconName,
  href = "#",
  active = false,
  color = "orange",
}: {
  label: string;
  iconName: string;
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
      <Icon name={iconName} className={cn("w-5 h-5 transition-all", active ? colorMap[color] : "text-white/70 group-hover:text-white group-hover:scale-110")} />
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
  const [postText, setPostText] = useState("");
  const [isLive, setIsLive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const insightsRef = useMemoFirebase(() => user ? collection(firestore, "insights") : null, [firestore, user]);
  const { data: insightsData, isLoading: isInsightsLoading } = useCollection(insightsRef);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!isUserLoading && !user && mounted) router.push("/login");
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
          toast({ variant: "destructive", title: "Camera Error", description: "Protocol link failed." });
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
      toast({ variant: "destructive", title: "Protocol Unsupported", description: "Bluetooth sync disabled." });
      return;
    }
    toast({ title: "Bluetooth Scanning", description: "Establishing neural link..." });
  };

  const getImg = (id: string) => placeholderData.placeholderImages.find(img => img.id === id)?.imageUrl || "";

  if (!mounted || isUserLoading || !user) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-indigo-500">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Synchronizing...</span>
      </div>
    );
  }

  const handleDispatch = () => {
    if (!postText.trim() || !user || !insightsRef) return;
    addDocumentNonBlocking(insightsRef, {
      userId: user.uid,
      user: user.displayName || user.email?.split("@")[0] || "Trader",
      avatar: user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`,
      createdAt: serverTimestamp(),
      text: postText,
      isLive
    });
    setPostText("");
    setIsLive(false);
    toast({ title: "Insight Dispatched", description: "Observation broadcasted." });
  };

  return (
    <div className="flex w-full h-screen overflow-hidden bg-black text-white selection:bg-indigo-500 font-body">
      {/* LEFT SIDEBAR */}
      <aside className="w-[350px] border-r border-white/8 bg-black shrink-0 h-full flex flex-col">
        <div className="p-8 shrink-0 flex flex-col items-center gap-6">
          <NeonBoard className="w-32 h-32">
            <AfterPatentLogo size="md" className="w-full h-full" />
          </NeonBoard>
          <div className="text-[14px] font-black tracking-[0.25em] text-white uppercase text-center">
            AFTER PATENT
          </div>
        </div>

        <ScrollArea className="flex-1 min-h-0">
          <div className="px-6 pb-8 space-y-8">
            <BorderWallCard title="Workspace" maxHeight="none" useScrollArea={false}>
              <div className="space-y-1">
                <NavItem label="Market Overview" iconName="Globe" href="/markets" color="emerald" />
                <NavItem label="Universal Terminal" iconName="LayoutDashboard" href="/dashboard?mode=minimal" color="amber" />
                <NavItem label="Political Network" iconName="Compass" href="/personalities" active color="orange" />
                <NavItem label="Network Hubs" iconName="Users" href="/communities" color="emerald" />
                <NavItem label="Social Stream" iconName="MessageCircle" href="/community" color="pink" />
              </div>
            </BorderWallCard>

            <BorderWallCard title="Political Sectors" maxHeight="300px">
              <div className="space-y-1">
                <NavItem label="Republican" iconName="Flag" href="/communities?hubId=republican-sector" color="orange" />
                <NavItem label="Democrat" iconName="Globe" href="/communities?hubId=democrat-sector" color="pink" />
                <NavItem label="Independent" iconName="Scale" href="/communities?hubId=independent-sector" color="amber" />
                <NavItem label="Liberal" iconName="HandMetal" href="/communities?hubId=liberal-sector" color="emerald" />
              </div>
            </BorderWallCard>
          </div>
        </ScrollArea>
      </aside>

      {/* CENTER SECTION */}
      <section className="flex-1 min-w-0 flex flex-col h-full overflow-hidden bg-transparent">
        <header className="h-56 border-b border-white/10 bg-black/40 backdrop-blur-md px-10 flex items-center justify-between shrink-0 sticky top-0 z-50">
          <div className="flex items-center gap-10">
            <NeonBoard className="w-32 h-32">
              <AfterPatentLogo size="md" className="w-full h-full" />
            </NeonBoard>
            <div className="flex flex-col text-left">
              <span className={`text-[32px] font-black tracking-[0.3em] uppercase leading-none ${spectralTitleClass}`}>Intelligence</span>
              <span className="text-[24px] font-bold tracking-[0.1em] text-white/40 uppercase">Global Stream</span>
            </div>
          </div>
          
          <div className="flex-1 max-w-xl mx-12">
            <div className="relative">
              <Icon name="Search" className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-white/30" />
              <input
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 py-5 text-lg focus:border-indigo-500/50 transition-all outline-none"
                placeholder="Search network..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-10">
            <div className="hidden lg:flex items-center gap-6 text-white/30 border-r border-white/10 pr-10">
              <Volume2 className="w-6 h-6 hover:text-indigo-400 cursor-pointer transition-colors" />
              <Bluetooth onClick={handleBluetooth} className="w-6 h-6 hover:text-indigo-400 cursor-pointer transition-colors" />
            </div>
            <div className="flex items-center gap-4 bg-white/5 border border-white/8 rounded-3xl px-6 py-3">
              <Avatar className="w-14 h-14 ring-2 ring-indigo-500/20">
                <AvatarImage src={user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`} />
                <AvatarFallback className="bg-indigo-500">{user.displayName?.[0]}</AvatarFallback>
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
            <BorderWallCard title="Dispatch" maxHeight="none" useScrollArea={false} variant="cool">
              <div className="flex flex-col gap-8">
                {isLive && (
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black">
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted />
                    <div className="absolute top-6 right-6 flex items-center gap-3 px-4 py-2 rounded-full bg-rose-500/80 animate-pulse">
                      <Radio className="w-4 h-4 text-white" />
                      <span className="text-[11px] font-black text-white uppercase tracking-widest">LIVE</span>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-6">
                  <Avatar className="w-16 h-16 ring-2 ring-indigo-500/20">
                    <AvatarImage src={user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`} />
                    <AvatarFallback className="bg-indigo-500">{user.displayName?.[0]}</AvatarFallback>
                  </Avatar>
                  <textarea 
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-lg font-medium text-white outline-none focus:border-cyan-500/50 min-h-[160px]"
                    placeholder="Broadcast observation..."
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/5">
                <div className="flex items-center gap-10">
                  <button className="flex items-center gap-3 text-[11px] font-black text-white/40 hover:text-cyan-400">
                    <BarChart2 className="w-5 h-5" /> Attach Chart
                  </button>
                  <button onClick={() => setIsLive(!isLive)} className={cn("flex items-center gap-3 text-[11px] font-black uppercase tracking-widest transition-colors", isLive ? 'text-rose-400' : 'text-white/40 hover:text-rose-400')}>
                    <Radio className="w-5 h-5" /> Live Sync
                  </button>
                </div>
                <Button onClick={handleDispatch} className="bg-indigo-600 hover:bg-indigo-500 px-10 h-12 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                  Dispatch →
                </Button>
              </div>
            </BorderWallCard>

            <div className="space-y-12">
              {isInsightsLoading ? (
                <div className="py-24 flex flex-col items-center opacity-20">
                  <Activity className="w-12 h-12 animate-pulse mb-6 text-indigo-500" />
                  <span className="text-[11px] font-black uppercase tracking-[0.4em]">Synchronizing...</span>
                </div>
              ) : (
                insightsData?.sort((a: any, b: any) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)).map((post: any) => (
                  <div key={post.id} className="mx-auto w-full group">
                    <NeonBoard>
                      <div className="rounded-[36px] bg-[#070b16] px-10 py-8">
                        <div className="flex items-center gap-6">
                          <Avatar className="w-16 h-16 ring-2 ring-indigo-500/20">
                            <AvatarImage src={post.avatar || `https://i.pravatar.cc/150?u=${post.userId}`} />
                            <AvatarFallback className="bg-indigo-500">{post.user[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-3">
                              <div className="text-[22px] font-black text-white">{post.user}</div>
                              {post.isLive && <Badge className="bg-rose-500 text-[10px] font-black">LIVE</Badge>}
                            </div>
                            <div className="text-[12px] font-bold text-white/40 uppercase tracking-widest">
                              {post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleString() : "Just now"}
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
                    </NeonBoard>
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
