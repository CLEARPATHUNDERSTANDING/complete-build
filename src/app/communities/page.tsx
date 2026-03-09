"use client";

import React, { useState, useEffect, useMemo, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  ArrowLeft, 
  Users, 
  TrendingUp, 
  Zap, 
  Globe, 
  MessageCircle, 
  Send, 
  ShieldCheck,
  Scale,
  Flag,
  HandMetal,
  Loader2
} from "lucide-react";
import NeonBoard from "@/components/NeonBoard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useFirebase, useUser, useMemoFirebase, useCollection } from "@/firebase";
import { collection, serverTimestamp, orderBy, query, limit } from "firebase/firestore";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { cn } from "@/lib/utils";

// --- Types ---

interface CommunityHub {
  id: string;
  title: string;
  description: string;
  members: string;
  activity: string;
  icon: any;
  color: string;
  bg: string;
  category: "ideological" | "thematic";
}

// --- Dynamic Data ---

const CORE_HUBS: CommunityHub[] = [
  {
    id: "republican-sector",
    title: "Republican Sector",
    description: "Traditional conservative focus, market liberty, and constitutional trade theory.",
    members: "42.1K",
    activity: "High",
    icon: Flag,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    category: "ideological"
  },
  {
    id: "democrat-sector",
    title: "Democrat Sector",
    description: "Mainstream progressive analysis, social policy impact, and green energy flows.",
    members: "39.2K",
    activity: "Steady",
    icon: Globe,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    category: "ideological"
  },
  {
    id: "independent-sector",
    title: "Independent Sector",
    description: "Neutral truth-layer aggregation, centrist/libertarian overlap, and quant data.",
    members: "28.5K",
    activity: "Critical",
    icon: Scale,
    color: "text-slate-400",
    bg: "bg-slate-500/10",
    category: "ideological"
  },
  {
    id: "liberal-sector",
    title: "Liberal Sector",
    description: "Reform-driven intelligence, tech-culture activism, and progressive ESG mapping.",
    members: "31.4K",
    activity: "High",
    icon: HandMetal,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    category: "ideological"
  }
];

const ALL_COMMUNITIES = [...CORE_HUBS];

function CommunitiesDiscoveryContent() {
  const { firestore } = useFirebase();
  const { user, isUserLoading } = useUser();
  const searchParams = useSearchParams();
  const urlHubId = searchParams.get('hubId');
  
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("discover");
  const [selectedHubId, setSelectedHubId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);

  const messagesRef = useMemoFirebase(() => 
    selectedHubId ? collection(firestore, "communities", selectedHubId, "messages") : null, 
  [firestore, selectedHubId]);

  const messagesQuery = useMemoFirebase(() => 
    messagesRef ? query(messagesRef, orderBy("createdAt", "asc"), limit(100)) : null,
  [messagesRef]);

  const { data: hubMessages, isLoading: isMessagesLoading } = useCollection(messagesQuery);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle direct sector sync from URL
  useEffect(() => {
    if (mounted && urlHubId && ALL_COMMUNITIES.some(c => c.id === urlHubId)) {
      setSelectedHubId(urlHubId);
      setActiveTab("chat");
    }
  }, [mounted, urlHubId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [hubMessages]);

  const selectedHub = useMemo(() => 
    ALL_COMMUNITIES.find(c => c.id === selectedHubId), 
  [selectedHubId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !user || !messagesRef) return;

    // BULLETPROOF AUTHOR: Safe split and fallback
    const emailStr = user.email || "";
    const emailPrefix = emailStr.includes("@") ? emailStr.split("@")[0] : null;
    const safeAuthor = user.displayName || emailPrefix || "User";

    addDocumentNonBlocking(messagesRef, {
      userId: user.uid,
      author: safeAuthor,
      text: messageInput.trim(),
      createdAt: serverTimestamp(),
      hubId: selectedHubId
    });

    setMessageInput("");
  };

  const handleJoinHub = (id: string) => {
    setSelectedHubId(id);
    setActiveTab("chat");
  };

  const handleSectorBack = () => {
    setSelectedHubId(null);
    setActiveTab("discover");
  };

  if (!mounted || isUserLoading || !user) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500 selection:text-white font-body overflow-hidden">
      {/* Header */}
      <header className="h-56 border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-50 px-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/community" className="flex items-center gap-4 bg-indigo-500/10 border border-indigo-500/30 px-6 py-3 rounded-2xl text-[12px] font-black tracking-[0.2em] text-indigo-400 uppercase hover:bg-indigo-500/20 transition-all shadow-[0_0_20px_rgba(99,102,241,0.2)] group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            BACK TO FEED
          </Link>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex items-center gap-4">
            <NeonBoard className="w-40 h-40">
              <img 
                src="https://i.postimg.cc/3NZqktNh/Chat-GPT-Image-Feb-26-2026-02-20-36-PM.png"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </NeonBoard>
            <div className="flex flex-col">
              <span className="text-[24px] font-black tracking-[0.3em] uppercase leading-none">Hubs</span>
              <span className="text-[20px] font-bold tracking-[0.1em] text-white/40 uppercase">Network</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
            <Avatar className="w-6 h-6">
              <AvatarFallback className="text-[8px] bg-indigo-500">{user.displayName?.[0] || 'U'}</AvatarFallback>
            </Avatar>
            <span className="text-[11px] font-black uppercase tracking-widest text-white/80">{user.displayName || "User"}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 h-[calc(100vh-128px)] flex flex-col pt-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-8 shrink-0">
            <TabsList className="bg-white/5 border border-white/10 p-1 h-12 rounded-2xl">
              <TabsTrigger value="discover" className="rounded-xl px-8 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
                Discover
              </TabsTrigger>
              <TabsTrigger value="chat" className="rounded-xl px-8 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                Chat
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400 opacity-50" />
                <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Connection: Secure</span>
              </div>
            </div>
          </div>

          {/* DISCOVER TAB */}
          <TabsContent value="discover" className="flex-1 min-h-0 focus-visible:outline-none">
            <ScrollArea className="h-full pr-4">
              <div className="pb-32">
                <div className="mb-12 flex items-end justify-between">
                  <div>
                    <h1 className="text-4xl font-black uppercase tracking-[0.1em] mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#00d4ff] via-[#6a5cff] via-[#ff4fd8] to-[#ff8a00] drop-shadow-[0_0_25px_rgba(106,92,255,0.6)] brightness-125">
                      Network Hubs
                    </h1>
                    <p className="max-w-2xl text-sm font-bold uppercase tracking-widest leading-relaxed text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]">
                      Connect with sectors to share and analyze market trends.
                    </p>
                  </div>
                  <Link href="/community" className="flex items-center gap-2 text-[10px] font-black tracking-widest text-white/30 hover:text-white uppercase transition-colors">
                    <ArrowLeft className="w-3 h-3" /> Back to Feed
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {ALL_COMMUNITIES.map((hub) => (
                    <NeonBoard key={hub.id} className="h-full group hover:scale-[1.01] transition-transform">
                      <div className="p-8 flex flex-col h-full bg-[#070b16]">
                        <div className="flex items-start justify-between mb-6">
                          <div className={`p-4 rounded-2xl ${hub.bg} border border-white/5`}>
                            <hub.icon className={`w-8 h-8 ${hub.color}`} />
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Users</div>
                            <div className="text-xl font-black text-white tracking-tighter">{hub.members}</div>
                          </div>
                        </div>

                        <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3 group-hover:text-indigo-400 transition-colors">
                          {hub.title}
                        </h3>
                        
                        <p className="text-[14px] text-white/50 leading-relaxed font-medium mb-8 flex-1 italic border-l-2 border-white/10 pl-4">
                          {hub.description}
                        </p>

                        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Type</span>
                            <span className={`text-[11px] font-black uppercase tracking-wider ${hub.category === 'ideological' ? 'text-orange-400' : 'text-cyan-400'}`}>{hub.category}</span>
                          </div>
                          <Button 
                            onClick={() => handleJoinHub(hub.id)}
                            className="bg-indigo-500 hover:bg-indigo-400 text-white font-black uppercase text-[10px] tracking-widest px-6 h-10 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all"
                          >
                            Join Room →
                          </Button>
                        </div>
                      </div>
                    </NeonBoard>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          {/* CHAT TAB */}
          <TabsContent value="chat" className="flex-1 min-h-0 focus-visible:outline-none">
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 h-full pb-12">
              {/* Chat Sidebar */}
              <div className="flex flex-col gap-6 overflow-hidden">
                <NeonBoard className="h-full">
                  <div className="flex flex-col h-full bg-[#070b16]">
                    <div className="p-5 border-b border-white/5 bg-white/[0.02]">
                      <div className="text-[11px] font-black uppercase tracking-[0.2em] text-white/60">Rooms</div>
                    </div>
                    
                    <ScrollArea className="flex-1">
                      <div className="p-3 space-y-2">
                        {ALL_COMMUNITIES.map(hub => (
                          <button
                            key={hub.id}
                            onClick={() => setSelectedHubId(hub.id)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${selectedHubId === hub.id ? 'bg-indigo-500/10 border border-indigo-500/20' : 'hover:bg-white/5 border border-transparent'}`}
                          >
                            <div className={`p-2 rounded-lg ${hub.bg} border border-white/5`}>
                              <hub.icon className={`w-4 h-4 ${hub.color}`} />
                            </div>
                            <div className="text-left">
                              <div className={`text-[12px] font-black uppercase tracking-tight ${selectedHubId === hub.id ? 'text-indigo-400' : 'text-white/80'}`}>{hub.title}</div>
                              <div className="text-[9px] font-bold text-white/30 uppercase tracking-widest">{hub.activity} Activity</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </ScrollArea>

                    <div className="p-4 border-t border-white/5 bg-white/[0.01] space-y-3">
                      <div className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-2">Navigation</div>
                      <div className="grid grid-cols-2 gap-2">
                        <button onClick={handleSectorBack} className="px-2 py-2 rounded-lg border border-white/10 bg-white/5 text-[8px] font-black uppercase tracking-widest text-white/60 hover:bg-white/10 transition-all">Back to List</button>
                        <Link href="/community" className="px-2 py-2 rounded-lg border border-indigo-500/20 bg-indigo-500/5 text-[8px] font-black uppercase tracking-widest text-indigo-400 hover:bg-indigo-500/10 transition-all text-center">Feed</Link>
                      </div>
                    </div>
                  </div>
                </NeonBoard>
              </div>

              {/* Chat Main */}
              <div className="flex flex-col h-full min-w-0">
                <NeonBoard className="h-full">
                  <div className="flex flex-col h-full bg-[#070b16]">
                    {selectedHubId ? (
                      <>
                        {/* Chat Header */}
                        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                          <div className="flex items-center gap-4">
                            <button 
                              onClick={handleSectorBack}
                              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all"
                              title="Back"
                            >
                              <ArrowLeft className="w-4 h-4" />
                            </button>
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${selectedHub?.bg} border border-white/5`}>
                                {selectedHub && <selectedHub.icon className={`w-5 h-5 ${selectedHub.color}`} />}
                              </div>
                              <div>
                                <div className="text-[14px] font-black uppercase tracking-widest text-white">
                                  {selectedHub?.title}
                                </div>
                                <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                                  Path: /rooms/{selectedHubId}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex flex-col items-end">
                              <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Connected</span>
                              <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Protocol v2.5.0</span>
                            </div>
                          </div>
                        </div>

                        {/* Messages Area */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                          {isMessagesLoading ? (
                            <div className="h-full flex flex-col items-center justify-center text-white/20">
                              <MessageCircle className="w-12 h-12 mb-4 animate-spin opacity-10" />
                              <div className="text-[10px] font-black uppercase tracking-[0.3em]">Connecting to channel...</div>
                            </div>
                          ) : hubMessages?.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-white/20">
                              <MessageCircle className="w-12 h-12 mb-4 opacity-10" />
                              <div className="text-[10px] font-black uppercase tracking-[0.3em]">No messages yet. Say hi!</div>
                            </div>
                          ) : (
                            hubMessages?.map((msg) => (
                              <div key={msg.id} className={`flex flex-col gap-2 ${msg.userId === user.uid ? 'items-end' : 'items-start'}`}>
                                <div className="flex items-center gap-2 px-1">
                                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{msg.author}</span>
                                  <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Just now</span>
                                </div>
                                <div className={`max-w-[80%] px-5 py-3 rounded-2xl text-[14px] font-medium leading-relaxed ${msg.userId === user.uid ? 'bg-indigo-500/20 border border-indigo-500/30 text-indigo-100 rounded-tr-none' : 'bg-white/5 border border-white/10 text-white/90 rounded-tl-none'}`}>
                                  {msg.text}
                                </div>
                              </div>
                            ))
                          )}
                        </div>

                        {/* Chat Input */}
                        <div className="p-6 border-t border-white/5 bg-white/[0.01]">
                          <form onSubmit={handleSendMessage} className="flex items-center gap-4 relative">
                            <Input
                              value={messageInput}
                              onChange={(e) => setMessageInput(e.target.value)}
                              placeholder={`Message ${selectedHub?.title}...`}
                              className="flex-1 bg-white/5 border-white/10 rounded-xl h-14 pl-6 pr-16 text-[15px] font-medium focus:border-indigo-500/50 transition-all placeholder:text-white/20"
                            />
                            <Button 
                              type="submit" 
                              disabled={!messageInput.trim()}
                              className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-500 hover:bg-indigo-400 text-white h-10 w-10 rounded-lg p-0 shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                            >
                              <Send className="w-4 h-4" />
                            </Button>
                          </form>
                        </div>
                      </>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-white/20 p-12 text-center">
                        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                          <ShieldCheck className="w-10 h-10 opacity-30" />
                        </div>
                        <h2 className="text-xl font-black uppercase tracking-[0.3em] text-white/60 mb-2">Select a Room</h2>
                        <p className="max-w-sm text-sm font-bold uppercase tracking-widest opacity-30 leading-loose">
                          Pick a community hub from the left panel to join the chat.
                        </p>
                        <div className="mt-12 flex flex-col items-center gap-4">
                          <div className="flex gap-4">
                            <Button variant="outline" onClick={() => setActiveTab("discover")} className="border-white/10 text-[10px] font-black uppercase tracking-widest h-11 px-8 rounded-xl">Discover</Button>
                            <Link href="/community">
                              <Button className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[10px] font-black uppercase tracking-widest h-11 px-8 rounded-xl">Social Feed</Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </NeonBoard>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="py-8 border-t border-white/10 mt-auto shrink-0 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 flex justify-between items-center">
          <span>Communication Hub</span>
          <div className="flex items-center gap-6">
            <Link href="/community" className="hover:text-indigo-400 transition-colors">BACK TO FEED</Link>
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Connected</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function CommunitiesDiscoveryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center text-indigo-500">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    }>
      <CommunitiesDiscoveryContent />
    </Suspense>
  );
}
