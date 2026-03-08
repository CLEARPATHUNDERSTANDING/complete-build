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
  Search
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
import DiagnosticLogo from "@/components/DiagnosticLogo";
import NeonBoard from "@/components/NeonBoard";

const spectralTitleClass = "bg-clip-text text-transparent bg-gradient-to-r from-[#00f5ff] via-[#6a5cff] via-[#ff4fd8] to-[#ff8a00] drop-shadow-[0_0_25px_rgba(106,92,255,0.6)] brightness-125";

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
      </病院Card>
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
        "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-300 group relative overflow-hidden",
        active
          ? "bg-white/[0.06] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
          : "hover:bg-white/[0.04]",
      ].join(" ")}
    >
      {active && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent pointer-events-none" />
      )}
      <Icon name={iconName} className={cn("w-5 h-5 transition-all z-10", active ? colorMap[color] : "text-white/70 group-hover:text-white group-hover:scale-110")} />
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
          toast({ variant: "destructive", title: "Camera Error", description: "Failed to connect camera." });
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
      toast({ variant: "destructive", title: "Unsupported", description: "Bluetooth not available." });
      return;
    }
    toast({ title: "Scanning", description: "Looking for devices..." });
  };

  const getImg = (id: string) => placeholderData.placeholderImages.find(img => img.id === id)?.imageUrl || "";

  if (!mounted || isUserLoading || !user) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-indigo-500">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Loading...</span>
      </div>
    );
  }

  const handleDispatch = () => {
    if (!postText.trim() || !user || !insightsRef) return;
    addDocumentNonBlocking(insightsRef, {
      userId: user.uid,
      user: user.displayName || user.email?.split("@")[0] || "User",
      avatar: user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`,
      createdAt: serverTimestamp(),
      text: postText,
      isLive
    });
    setPostText("");
    setIsLive(false);
    toast({ title: "Posted", description: "Your insight is live." });
  };

  return (
    <div className="flex w-full h-screen overflow-hidden bg-black text-white selection:bg-indigo-500 font-body">
      {/* LEFT SIDEBAR */}
      <aside className="w-[350px] border-r border-white/10 bg-black/40 backdrop-blur-3xl shrink-0 h-full flex flex-col">
        <div className="p-8 shrink-0 flex flex-col items-center gap-6">
          <NeonBoard className="w-32 h-32 hover:scale-105 transition-transform duration-500">
            <DiagnosticLogo size="md" className="w-full h-full" />
          </NeonBoard>
        </div>

        <ScrollArea className="flex-1 min-h-0">
          <div className="px-6 pb-8 space-y-8">
            <BorderWallCard title="Workspace" maxHeight="none" useScrollArea={false}>
              <div className="space-y-1">
                <NavItem label="Markets" iconName="Globe" href="/markets" color="emerald" />
                <NavItem label="Terminal" iconName="LayoutDashboard" href="/dashboard?mode=minimal" color="amber" />
                <NavItem label="Personalities" iconName="Compass" href="/personalities" active color="orange" />
                <NavItem label="Hubs" iconName="Users" href="/communities" color="emerald" />
                <NavItem label="Feed" iconName="MessageCircle" href="/community" color="pink" />
              </div>
            </BorderWallCard>

            <BorderWallCard title="Sectors" maxHeight="300px">
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
        <header className="h-56 border-b border-white/10 bg-black/60 backdrop-blur-2xl px-10 flex items-center justify-between shrink-0 sticky top-0 z-50">
          <div className="flex items-center gap-10">
            <NeonBoard className="w-32 h-32">
              <DiagnosticLogo size="md" className="w-full h-full" />
            </NeonBoard>
            <div className="flex flex-col text-left">
              <span className={`text-[32px] font-black tracking-[0.3em] uppercase leading-none ${spectralTitleClass}`}>Intelligence</span>
              <span className="text-[24px] font-bold tracking-[0.1em] text-white/40 uppercase">Global Stream</span>
            </div>
          </div>
          
          <div className="flex-1 max-w-xl mx-12">
            <div className="relative group">
              <div className="absolute -inset-1 bg-indigo-500/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity" />
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-white/30 z-10" />
              <input
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 py-5 text-lg focus:border-indigo-500/50 transition-all outline-none relative z-10 backdrop-blur-xl"
                placeholder="Search everything..."
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
            <div className="flex items-center gap-4 bg-white/10 border border-white/15 rounded-3xl px-6 py-3 backdrop-blur-xl shadow-2xl">
              <Avatar className="w-14 h-14 ring-2 ring-indigo-500/40">
                <AvatarImage src={user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`} />
                <AvatarFallback className="bg-indigo-500">{user.displayName?.[0]}</AvatarFallback>
              </Avatar>
              <div className="text-left leading-tight hidden lg:block">
                <div className="text-lg font-black text-white">{user.displayName || "User"}</div>
                <div className="text-[11px] font-black text-indigo-400 uppercase tracking-widest">Active</div>
              </div>
            </div>
          </div>
        </header>

        <ScrollArea className="flex-1">
          <div className="max-w-4xl mx-auto px-10 py-12 space-y-12 pb-32">
            <BorderWallCard title="Create Post" maxHeight="none" useScrollArea={false}>
              <div className="flex flex-col gap-8">
                {isLive && (
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl">
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted />
                    <div className="absolute top-6 right-6 flex items-center gap-3 px-4 py-2 rounded-full bg-rose-500/80 animate-pulse backdrop-blur-md">
                      <Radio className="w-4 h-4 text-white" />
                      <span className="text-[11px] font-black text-white uppercase tracking-widest">LIVE</span>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-6">
                  <Avatar className="w-16 h-16 ring-2 ring-indigo-500/20 shadow-2xl">
                    <AvatarImage src={user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`} />
                    <AvatarFallback className="bg-indigo-500">{user.displayName?.[0]}</AvatarFallback>
                  </Avatar>
                  <textarea 
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl p-6 text-lg font-medium text-white outline-none focus:border-cyan-500/50 min-h-[160px] backdrop-blur-xl transition-all"
                    placeholder="What's on your mind?..."
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/10">
                <div className="flex items-center gap-10">
                  <button className="flex items-center gap-3 text-[11px] font-black text-white/40 hover:text-cyan-400 transition-colors">
                    <BarChart2 className="w-5 h-5" /> Attach Chart
                  </button>
                  <button onClick={() => setIsLive(!isLive)} className={cn("flex items-center gap-3 text-[11px] font-black uppercase tracking-widest transition-all", isLive ? 'text-rose-400' : 'text-white/40 hover:text-rose-400')}>
                    <Radio className="w-5 h-5" /> Go Live
                  </button>
                </div>
                <Button onClick={handleDispatch} className="bg-indigo-600 hover:bg-indigo-500 px-10 h-12 rounded-full shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all font-black uppercase tracking-widest text-[11px]">
                  Post Insight →
                </Button>
              </div>
            </BorderWallCard>

            <div className="space-y-12">
              {isInsightsLoading ? (
                <div className="py-24 flex flex-col items-center opacity-20">
                  <Activity className="w-12 h-12 animate-pulse mb-6 text-indigo-500" />
                  <span className="text-[11px] font-black uppercase tracking-[0.4em]">Loading feed...</span>
                </div>
              ) : (
                insightsData?.sort((a: any, b: any) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)).map((post: any) => (
                  <div key={post.id} className="mx-auto w-full group">
                    <NeonBoard>
                      <div className="rounded-[36px] bg-[#070b16]/80 px-10 py-8 backdrop-blur-3xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-50 pointer-events-none" />
                        <div className="relative z-10">
                          <div className="flex items-center gap-6">
                            <Avatar className="w-16 h-16 ring-2 ring-indigo-500/20 shadow-2xl">
                              <AvatarImage src={post.avatar || `https://i.pravatar.cc/150?u=${post.userId}`} />
                              <AvatarFallback className="bg-indigo-500">{post.user[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-3">
                                <div className="text-[22px] font-black text-white">{post.user}</div>
                                {post.isLive && <Badge className="bg-rose-500 text-[10px] font-black px-3 py-1 shadow-[0_0_15px_#f43f5e]">LIVE</Badge>}
                              </div>
                              <div className="text-[12px] font-bold text-white/40 uppercase tracking-widest">
                                {post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleString() : "Posting..."}
                              </div>
                            </div>
                          </div>
                          <div className="my-8 h-px bg-white/10" />
                          <p className="text-[20px] leading-relaxed text-white/90 mb-8 font-medium">{post.text}</p>
                          <div className="flex items-center gap-12 text-white/50 border-t border-white/5 pt-8">
                            <button className="flex items-center gap-3 hover:text-red-500 transition-colors group/sync">
                              <Heart className="w-6 h-6 group-hover/sync:scale-110 transition-transform" />
                              <span className="font-bold text-sm uppercase tracking-widest">Support</span>
                            </button>
                            <button className="flex items-center gap-3 hover:text-indigo-400 transition-colors group/discuss">
                              <MessageCircle className="w-6 h-6 group-hover/discuss:scale-110 transition-transform" />
                              <span className="font-bold text-sm uppercase tracking-widest">Comment</span>
                            </button>
                          </div>
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
      <aside className="w-[380px] border-l border-white/10 bg-black/40 backdrop-blur-3xl shrink-0 h-full flex flex-col">
        <div className="p-8 flex items-center gap-4 border-b border-white/10 shrink-0 bg-white/[0.02]">
          <TrendingUp className="w-6 h-6 text-indigo-500" />
          <div className={`text-[14px] font-black tracking-[0.3em] uppercase ${spectralTitleClass}`}>Environment</div>
        </div>
        <ScrollArea className="flex-1 min-h-0">
          <div className="px-6 py-8 space-y-10">
            <BorderWallCard title="Local Stats" maxHeight="none" useScrollArea={false}>
              <WeatherWidget />
            </BorderWallCard>
            <BorderWallCard title="Active Hubs" maxHeight="none" useScrollArea={false}>
              <div className="space-y-6">
                {[
                  { name: "Jessica Miller", status: "Online", active: true, img: getImg("profile-jessica") },
                  { name: "Market Watch", status: "Active", active: true, img: getImg("hub-market-watch") },
                ].map((hub, i) => (
                  <div key={i} className="flex items-center gap-5 p-3 rounded-2xl hover:bg-white/5 transition-all cursor-pointer group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative h-16 w-16 shrink-0 rounded-full bg-[linear-gradient(135deg,#00f5ff,#6a5cff,#ff00d4,#ff8a00)] p-[2px] shadow-2xl">
                      <div className="h-full w-full rounded-full overflow-hidden border border-black/40">
                        <img src={hub.img} className="w-full h-full object-cover" alt="" />
                      </div>
                    </div>
                    <div className="text-left relative z-10">
                      <div className="text-[16px] font-black text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{hub.name}</div>
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
