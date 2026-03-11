"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  Menu,
  Globe,
  LayoutDashboard,
  MessageCircle,
  Loader2,
  Compass,
  Users,
  Search,
  Volume2,
  Bluetooth,
  Link as LinkIcon,
  Activity,
  Zap,
  MoreHorizontal
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useFirebase, useUser, useMemoFirebase, useCollection } from "@/firebase";
import { collection, serverTimestamp, query, orderBy, limit } from "firebase/firestore";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { cn } from "@/lib/utils";
import DiagnosticLogo from "@/components/DiagnosticLogo";
import NeonBoard from "@/components/NeonBoard";
import WeatherWidget from "@/components/WeatherWidget";

function getSafeAuthor(user: any) {
  if (!user) return "Guest Node";
  if (user.displayName) return user.displayName;
  const email = (user.email || "").toString();
  if (email && email.includes("@")) {
    return email.split("@")[0];
  }
  return "Protocol User";
}

function NavItem({
  label,
  icon: IconComp,
  href = "#",
  active = false,
  indicatorColor = "orange",
}: {
  label: string;
  icon: any;
  href?: string;
  active?: boolean;
  indicatorColor?: "orange" | "cyan" | "pink";
}) {
  return (
    <a
      href={href}
      className={cn(
        "flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-left transition-all duration-300 group relative",
        active ? "bg-white/[0.03] border border-white/5 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]" : "hover:bg-white/[0.02] border border-transparent"
      )}
    >
      {active && (
        <div className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full shadow-[0_0_15px_rgba(255,136,0,0.8)]",
          indicatorColor === "orange" ? "bg-orange-500" : indicatorColor === "cyan" ? "bg-cyan-400" : "bg-pink-500"
        )} />
      )}
      <IconComp className={cn("w-5 h-5 transition-all", active ? "text-white opacity-100" : "text-white/40 group-hover:text-white")} />
      <span className={cn("text-[14px] font-bold uppercase tracking-tight", active ? "text-white" : "text-white/60 group-hover:text-white")}>{label}</span>
    </a>
  );
}

export default function SocialPlatform() {
  const router = useRouter();
  const { toast } = useToast();
  const { firestore } = useFirebase();
  const { user, isUserLoading } = useUser();
  
  const [mounted, setMounted] = useState(false);
  const [postText, setPostText] = useState("");
  const [isLive, setIsLive] = useState(false);

  const insightsRef = useMemoFirebase(() => user ? collection(firestore, "insights") : null, [firestore, user]);
  const insightsQuery = useMemoFirebase(() => 
    insightsRef ? query(insightsRef, orderBy("createdAt", "desc"), limit(20)) : null,
  [insightsRef]);
  
  const { data: insightsData } = useCollection(insightsQuery);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (mounted && !isUserLoading && !user) router.push("/login");
  }, [user, isUserLoading, mounted, router]);

  if (!mounted || isUserLoading || !user) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-indigo-500 z-[9999]">
        <Loader2 className="w-12 h-12 animate-spin mb-6" />
        <span className="text-[12px] font-black uppercase tracking-[0.4em] animate-pulse">Initializing Neural Hub...</span>
      </div>
    );
  }

  const handleDispatch = () => {
    if (!postText.trim() || !user || !insightsRef) return;
    addDocumentNonBlocking(insightsRef, {
      userId: user.uid,
      user: getSafeAuthor(user),
      avatar: user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`,
      createdAt: serverTimestamp(),
      text: postText,
      isLive
    });
    setPostText("");
    setIsLive(false);
    toast({ title: "Insight Posted", description: "Truth layer updated." });
  };

  return (
    <div className="flex w-full h-screen overflow-hidden bg-black text-white selection:bg-indigo-500 font-body">
      {/* LEFT SIDEBAR - WORKSPACE */}
      <aside className="hidden xl:flex w-[320px] border-r border-white/5 bg-black shrink-0 h-full flex-col">
        <div className="p-10 shrink-0">
          <DiagnosticLogo size="md" className="mx-auto" />
        </div>
        
        <ScrollArea className="flex-1">
          <div className="px-6 py-4 space-y-10">
            <div className="space-y-4">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 px-4">Workspace</div>
              <div className="space-y-1">
                <NavItem label="Market Overview" icon={Globe} href="/markets" />
                <NavItem label="Universal Terminal" icon={LayoutDashboard} href="/dashboard" />
                <NavItem label="Political Network" icon={Compass} active indicatorColor="orange" />
                <NavItem label="Network Hubs" icon={Users} href="/communities" />
                <NavItem label="Social Stream" icon={MessageCircle} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 px-4">Political Sectors</div>
              <div className="space-y-1">
                <NavItem label="Republican" icon={Activity} />
                <NavItem label="Democrat" icon={Activity} />
                <NavItem label="Independent" icon={Activity} />
              </div>
            </div>
          </div>
        </ScrollArea>
      </aside>

      {/* CENTER COLUMN - MAIN FEED */}
      <section className="flex-1 min-w-0 flex flex-col h-full bg-black">
        <header className="h-40 border-b border-white/5 bg-black px-10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-8">
            <DiagnosticLogo size="sm" />
            <div className="flex flex-col">
              <span className="text-[28px] font-black tracking-[0.3em] uppercase leading-none text-white">Intelligence</span>
              <span className="text-[16px] font-bold tracking-[0.2em] text-white/40 uppercase mt-1">Global Stream</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-white/5 blur-xl group-hover:bg-white/10 transition-colors" />
              <button className="relative p-4 rounded-2xl bg-white/5 border border-white/10">
                <Search className="w-6 h-6 text-white/40" />
              </button>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex items-center gap-4 text-white/20">
              <Volume2 className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
              <Bluetooth className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </header>

        <ScrollArea className="flex-1">
          <div className="max-w-4xl mx-auto px-10 py-12 space-y-12">
            {/* DISPATCH CENTER */}
            <NeonBoard>
              <div className="p-8 bg-[#070b16]/90 flex flex-col h-full">
                <div className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40 mb-8 px-2">Dispatch Center</div>
                
                <div className="flex gap-6 items-start">
                  <div className="shrink-0 pt-2">
                    <Avatar className="w-16 h-16 border-2 border-white/5 shadow-2xl">
                      <AvatarImage src={user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`} />
                      <AvatarFallback className="bg-indigo-500 font-black">U</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <textarea 
                      className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-6 text-[18px] font-medium text-white/90 outline-none min-h-[160px] resize-none focus:border-white/10 transition-all placeholder:text-white/20"
                      placeholder="Broadcast intelligence observation..."
                      value={postText}
                      onChange={(e) => setPostText(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-white/30">
                    <button className="flex items-center gap-2 hover:text-white transition-colors">
                      <Activity className="w-4 h-4" /> Attach Terminal
                    </button>
                    <button className="flex items-center gap-2 text-cyan-400">
                      <Zap className="w-4 h-4 fill-cyan-400/20" /> Active Link
                    </button>
                  </div>
                  <Button 
                    onClick={handleDispatch}
                    disabled={!postText.trim()}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase text-[11px] tracking-[0.2em] px-10 h-14 rounded-full shadow-[0_0_30px_rgba(79,70,229,0.4)]"
                  >
                    Dispatch Intel →
                  </Button>
                </div>
              </div>
            </NeonBoard>

            {/* FEED ITEMS */}
            <div className="space-y-10 pb-40">
              {insightsData?.map((post: any) => (
                <NeonBoard key={post.id}>
                  <div className="p-10 bg-[#070b16]/95 rounded-[40px]">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-6">
                        <Avatar className="w-16 h-16 border-2 border-white/5">
                          <AvatarImage src={post.avatar} />
                          <AvatarFallback className="bg-indigo-500 font-black">{post.user?.[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-[22px] font-black uppercase tracking-tight text-white">{post.user}</div>
                          <div className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] mt-1">Node Trace: Active</div>
                        </div>
                      </div>
                      <button className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-[22px] leading-relaxed text-white/90 font-medium italic border-l-2 border-indigo-500/40 pl-8">{post.text}</p>
                  </div>
                </NeonBoard>
              ))}
            </div>
          </div>
        </ScrollArea>
      </section>

      {/* RIGHT SIDEBAR - ENVIRONMENTAL / NODES */}
      <aside className="hidden 2xl:flex w-[380px] border-l border-white/5 bg-black shrink-0 h-full flex-col">
        <header className="h-40 px-10 flex items-center shrink-0">
          <div className="flex items-center gap-4">
            <Activity className="w-6 h-6 text-indigo-400" />
            <span className="text-[18px] font-black uppercase tracking-[0.3em] text-white">Atmosphere</span>
          </div>
        </header>

        <ScrollArea className="flex-1">
          <div className="p-8 space-y-10">
            {/* REAL-TIME NODE */}
            <NeonBoard>
              <div className="p-8 bg-[#070b16]/90">
                <WeatherWidget />
              </div>
            </NeonBoard>

            {/* LIVE NETWORK HUBS */}
            <div className="space-y-6">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 px-2">Live Network Hubs</div>
              <div className="space-y-4">
                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-all">
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <Avatar className="w-14 h-14 border-2 border-pink-500/20">
                        <AvatarImage src="https://i.pravatar.cc/150?u=jessica" />
                        <AvatarFallback>JM</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black" />
                    </div>
                    <div>
                      <div className="text-[16px] font-black uppercase tracking-tight text-white group-hover:text-pink-400 transition-colors">Jessica Miller</div>
                      <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">Analyzing Market</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-all opacity-50">
                  <div className="flex items-center gap-5">
                    <Avatar className="w-14 h-14 border-2 border-white/10">
                      <AvatarImage src="https://i.pravatar.cc/150?u=mike" />
                      <AvatarFallback>MD</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-[16px] font-black uppercase tracking-tight text-white">Mike David</div>
                      <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">Standby</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </aside>
    </div>
  );
}
