"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  Menu,
  Globe,
  LayoutDashboard,
  MessageCircle,
  Loader2
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

function getSafeAuthor(user: any) {
  if (!user) return "Guest Node";
  if (user.displayName) return user.displayName;
  const email = (user.email || "").toString();
  if (email && email.includes("@")) {
    return email.split("@")[0];
  }
  return "Protocol User";
}

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
        <div className="flex flex-col h-full bg-[#070b16]/80 backdrop-blur-2xl">
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
        active ? "bg-white/[0.06] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" : "hover:bg-white/[0.04]",
      ].join(" ")}
    >
      <IconComp className={cn("w-5 h-5 transition-all z-10", active ? colorMap[color] : "text-white/70 group-hover:text-white group-hover:scale-110")} />
      <span className={cn("text-[15px] font-bold z-10 uppercase tracking-tight", active ? colorMap[color] : "text-white/80")}>{label}</span>
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

  // SMOKING GUN FIX: Full-screen black background for loading states to prevent white flash
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
      <aside className="hidden lg:flex w-[320px] border-r border-white/10 bg-black/40 backdrop-blur-3xl shrink-0 h-full flex-col">
        <div className="p-10 shrink-0 flex flex-col items-center gap-6">
          <NeonBoard className="w-32 h-32">
            <DiagnosticLogo size="md" className="w-full h-full" />
          </NeonBoard>
          <div className="text-center">
            <div className="text-[14px] font-black tracking-[0.3em] uppercase text-white">Protocol Hub</div>
            <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mt-1">Node v2.5</div>
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="px-8 pb-12 space-y-8">
            <BorderWallCard title="Workspace">
              <NavItem label="Markets" icon={Globe} href="/markets" color="emerald" />
              <NavItem label="Terminal" icon={LayoutDashboard} href="/dashboard" color="amber" />
              <NavItem label="Feed" icon={MessageCircle} href="/community" active color="pink" />
            </BorderWallCard>
          </div>
        </ScrollArea>
      </aside>

      <section className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
        <header className="h-48 border-b border-white/10 bg-black/60 backdrop-blur-2xl px-10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-8">
            <Sheet>
              <SheetTrigger asChild>
                <button className="lg:hidden p-3 rounded-xl bg-white/5 border border-white/10">
                  <Menu className="w-6 h-6 text-white" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-black/95 border-r border-white/10 p-0 w-[300px]">
                <SheetHeader className="p-6 border-b border-white/5 bg-white/[0.02]">
                  <DiagnosticLogo size="xs" />
                  <SheetTitle className="text-lg font-black uppercase text-white mt-4">Menu Hub</SheetTitle>
                  <SheetDescription className="text-xs text-white/40 uppercase">System navigation and access nodes.</SheetDescription>
                </SheetHeader>
                <div className="p-6">
                  <NavItem label="Markets" icon={Globe} href="/markets" color="emerald" />
                  <NavItem label="Terminal" icon={LayoutDashboard} href="/dashboard" color="amber" />
                  <NavItem label="Feed" icon={MessageCircle} href="/community" active color="pink" />
                </div>
              </SheetContent>
            </Sheet>
            <div className="flex flex-col text-left">
              <span className="text-[40px] font-black tracking-[0.3em] uppercase leading-none spectral-text">Feed</span>
              <span className="text-[20px] font-bold tracking-[0.15em] text-white/40 uppercase">Global Intel</span>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <DiagnosticLogo size="sm" />
          </div>
        </header>

        <ScrollArea className="flex-1">
          <div className="max-w-5xl mx-auto px-12 py-16 space-y-16 pb-40">
            <BorderWallCard title="Dispatch Intelligence">
              <textarea 
                className="w-full bg-white/[0.04] border border-white/10 rounded-3xl p-8 text-xl font-medium text-white outline-none min-h-[200px]"
                placeholder="Share a diagnostic observation..."
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
              />
              <Button onClick={handleDispatch} className="mt-8 bg-indigo-600 w-full h-14 rounded-full font-black uppercase tracking-widest">
                Post Insight →
              </Button>
            </BorderWallCard>

            <div className="space-y-16">
              {insightsData?.map((post: any) => (
                <NeonBoard key={post.id}>
                  <div className="p-10 bg-[#070b16]/90 rounded-[40px]">
                    <div className="flex items-center gap-8">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={post.avatar} />
                        <AvatarFallback className="bg-indigo-500">{post.user?.[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-[26px] font-black uppercase text-white">{post.user}</div>
                        <div className="text-[13px] font-bold text-white/30 uppercase tracking-widest mt-1">Node Trace: Active</div>
                      </div>
                    </div>
                    <p className="mt-10 text-[24px] leading-relaxed text-white/90 font-medium">{post.text}</p>
                  </div>
                </NeonBoard>
              ))}
            </div>
          </div>
        </ScrollArea>
      </section>
    </div>
  );
}