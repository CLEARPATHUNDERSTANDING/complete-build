
"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Compass, 
  Users, 
  TrendingUp, 
  BarChart2, 
  Zap, 
  Globe, 
  Plus, 
  Hash, 
  MessageCircle, 
  Send, 
  Settings,
  MoreVertical,
  Brain,
  ShieldCheck
} from "lucide-react";
import NeonBoard from "@/components/NeonBoard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// --- Types ---

interface Community {
  id: string;
  title: string;
  description: string;
  members: string;
  activity: string;
  icon: any;
  color: string;
  bg: string;
}

interface Channel {
  id: string;
  communityId: string;
  name: string;
}

interface Message {
  id: string;
  channelId: string;
  author: string;
  text: string;
  timestamp: string;
}

// --- Data ---

const THEMATIC_COMMUNITIES: Community[] = [
  {
    id: "macro-strategy",
    title: "Macro Strategy",
    description: "Global thematic discussion on rates, inflation, and cross-asset flow.",
    members: "12.4K",
    activity: "High",
    icon: Globe,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10"
  },
  {
    id: "crypto-quant",
    title: "Crypto Quant",
    description: "Algorithmic analysis and sentiment tracking for digital asset universes.",
    members: "8.2K",
    activity: "Critical",
    icon: Zap,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10"
  },
  {
    id: "bond-yields",
    title: "Bonds & Yields",
    description: "Fixed income diagnostics and sovereign debt cycle investigation.",
    members: "5.1K",
    activity: "Steady",
    icon: TrendingUp,
    color: "text-violet-400",
    bg: "bg-violet-500/10"
  },
  {
    id: "equity-alpha",
    title: "Equity Alpha",
    description: "Sector-specific deep dives and earnings-cycle data truth layers.",
    members: "15.9K",
    activity: "High",
    icon: BarChart2,
    color: "text-pink-400",
    bg: "bg-pink-500/10"
  }
];

const INITIAL_CHANNELS: Channel[] = [
  { id: "c1", communityId: "macro-strategy", name: "general" },
  { id: "c2", communityId: "macro-strategy", name: "rate-watch" },
  { id: "c3", communityId: "crypto-quant", name: "btc-alpha" },
  { id: "c4", communityId: "crypto-quant", name: "sentiment-data" },
];

export default function CommunitiesDiscoveryPage() {
  // --- Local State / Store ---
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("discover");
  const [me, setMe] = useState({ displayName: "Mike Andrew" });
  const [communities, setCommunities] = useState<Community[]>(THEMATIC_COMMUNITIES);
  const [channels, setChannels] = useState<Channel[]>(INITIAL_CHANNELS);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null);
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);

  // --- Effects ---
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("cp_community_store");
    if (saved) {
      const data = JSON.parse(saved);
      if (data.me) setMe(data.me);
      if (data.messages) setMessages(data.messages);
      if (data.channels) setChannels(data.channels);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("cp_community_store", JSON.stringify({ me, messages, channels }));
  }, [me, messages, channels, mounted]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, selectedChannelId]);

  // --- Derived Data ---
  const selectedCommunity = useMemo(() => 
    communities.find(c => c.id === selectedCommunityId), 
  [communities, selectedCommunityId]);

  const activeChannels = useMemo(() => 
    channels.filter(c => c.communityId === selectedCommunityId), 
  [channels, selectedCommunityId]);

  const activeMessages = useMemo(() => 
    messages.filter(m => m.channelId === selectedChannelId), 
  [messages, selectedChannelId]);

  // --- Handlers ---
  const handleCreateChannel = (commId: string) => {
    const name = window.prompt("Enter room name:");
    if (name && name.trim()) {
      const clean = name.trim().toLowerCase().replace(/\s+/g, "-");
      const newChannel: Channel = {
        id: `ch-${Date.now()}`,
        communityId: commId,
        name: clean
      };
      setChannels([...channels, newChannel]);
      setSelectedChannelId(newChannel.id);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedChannelId) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      channelId: selectedChannelId,
      author: me.displayName,
      text: messageInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setMessageInput("");
  };

  const handleJoinHub = (id: string) => {
    setSelectedCommunityId(id);
    const firstChan = channels.find(c => c.communityId === id);
    if (firstChan) setSelectedChannelId(firstChan.id);
    setActiveTab("chat");
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500 selection:text-white font-body">
      {/* Header */}
      <header className="h-20 border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-50 px-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-[10px] font-black tracking-[0.25em] text-indigo-400 uppercase hover:text-indigo-300 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Social Hub
          </Link>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-black tracking-[0.2em] uppercase leading-none">Community</span>
              <span className="text-[10px] font-bold tracking-[0.1em] text-white/40 uppercase">Intelligence</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-[10px] font-black tracking-widest text-white/40 uppercase hidden md:block">
            Network Directory Active
          </div>
          <div className="h-8 w-px bg-white/10 mx-2" />
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
            <Avatar className="w-6 h-6">
              <AvatarFallback className="text-[8px] bg-indigo-500">{me.displayName[0]}</AvatarFallback>
            </Avatar>
            <span className="text-[11px] font-black uppercase tracking-widest text-white/80">{me.displayName}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-8 h-[calc(100vh-80px)] flex flex-col">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <TabsList className="bg-white/5 border border-white/10 p-1 h-12 rounded-2xl">
              <TabsTrigger value="discover" className="rounded-xl px-8 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
                Discover
              </TabsTrigger>
              <TabsTrigger value="chat" className="rounded-xl px-8 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                Network Chat
              </TabsTrigger>
              <TabsTrigger value="settings" className="rounded-xl px-8 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-pink-500 data-[state=active]:text-white">
                Identity
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400 opacity-50" />
              <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Diagnostic Pacing: STABLE</span>
            </div>
          </div>

          {/* DISCOVER TAB */}
          <TabsContent value="discover" className="flex-1 min-h-0 focus-visible:outline-none">
            <ScrollArea className="h-full pr-4">
              <div className="mb-12">
                <h1 className="text-4xl font-black uppercase tracking-[0.2em] mb-4 text-white">Thematic Sectors</h1>
                <p className="text-white/40 max-w-2xl text-sm font-bold uppercase tracking-widest leading-relaxed">
                  Connect with specialized intelligence hubs to synchronize diagnostic data across the network.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
                {communities.map((comm) => (
                  <NeonBoard key={comm.id} className="h-full group hover:scale-[1.01] transition-transform">
                    <div className="p-8 flex flex-col h-full bg-[#070b16]">
                      <div className="flex items-start justify-between mb-6">
                        <div className={`p-4 rounded-2xl ${comm.bg} border border-white/5`}>
                          <comm.icon className={`w-8 h-8 ${comm.color}`} />
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Members</div>
                          <div className="text-xl font-black text-white tracking-tighter">{comm.members}</div>
                        </div>
                      </div>

                      <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3 group-hover:text-indigo-400 transition-colors">
                        {comm.title}
                      </h3>
                      
                      <p className="text-[15px] text-white/50 leading-relaxed font-medium mb-8 flex-1 italic border-l-2 border-indigo-500/30 pl-4">
                        {comm.description}
                      </p>

                      <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Activity</span>
                          <span className={`text-[11px] font-black uppercase tracking-wider ${comm.activity === 'Critical' ? 'text-pink-500' : 'text-emerald-400'}`}>{comm.activity}</span>
                        </div>
                        <Button 
                          onClick={() => handleJoinHub(comm.id)}
                          className="bg-indigo-500 hover:bg-indigo-400 text-white font-black uppercase text-[10px] tracking-widest px-6 h-10 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all"
                        >
                          Synchronize →
                        </Button>
                      </div>
                    </div>
                  </NeonBoard>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* CHAT TAB */}
          <TabsContent value="chat" className="flex-1 min-h-0 focus-visible:outline-none">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 h-full">
              {/* Chat Sidebar */}
              <div className="flex flex-col gap-6">
                <NeonBoard className="h-full">
                  <div className="flex flex-col h-full bg-[#070b16]">
                    <div className="p-5 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                      <div className="text-[11px] font-black uppercase tracking-[0.2em] text-white/60">Sectors</div>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-white/40 hover:text-white"><MoreVertical className="w-4 h-4" /></Button>
                    </div>
                    
                    <ScrollArea className="flex-1">
                      <div className="p-3 space-y-2">
                        {communities.map(comm => (
                          <button
                            key={comm.id}
                            onClick={() => {
                              setSelectedCommunityId(comm.id);
                              const first = channels.find(c => c.communityId === comm.id);
                              if (first) setSelectedChannelId(first.id);
                            }}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${selectedCommunityId === comm.id ? 'bg-indigo-500/10 border border-indigo-500/20' : 'hover:bg-white/5 border border-transparent'}`}
                          >
                            <div className={`p-2 rounded-lg ${comm.bg} border border-white/5`}>
                              <comm.icon className={`w-4 h-4 ${comm.color}`} />
                            </div>
                            <div className="text-left">
                              <div className={`text-[12px] font-black uppercase tracking-tight ${selectedCommunityId === comm.id ? 'text-indigo-400' : 'text-white/80'}`}>{comm.title}</div>
                              <div className="text-[9px] font-bold text-white/30 uppercase tracking-widest">{comm.members} Active</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </ScrollArea>

                    {selectedCommunityId && (
                      <div className="mt-auto border-t border-white/5">
                        <div className="p-4 flex items-center justify-between">
                          <div className="text-[10px] font-black uppercase tracking-widest text-white/30">Rooms</div>
                          <button onClick={() => handleCreateChannel(selectedCommunityId)} className="text-cyan-400 hover:text-cyan-300 transition-colors"><Plus className="w-4 h-4" /></button>
                        </div>
                        <div className="px-3 pb-4 space-y-1">
                          {activeChannels.map(chan => (
                            <button
                              key={chan.id}
                              onClick={() => setSelectedChannelId(chan.id)}
                              className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${selectedChannelId === chan.id ? 'bg-cyan-500/10 text-cyan-400' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                            >
                              <Hash className="w-3.5 h-3.5" /> {chan.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </NeonBoard>
              </div>

              {/* Chat Main */}
              <div className="flex flex-col h-full min-w-0">
                <NeonBoard className="h-full">
                  <div className="flex flex-col h-full bg-[#070b16]">
                    {selectedChannelId ? (
                      <>
                        {/* Chat Header */}
                        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                          <div className="flex items-center gap-3">
                            <Hash className="w-5 h-5 text-cyan-400" />
                            <div>
                              <div className="text-[14px] font-black uppercase tracking-widest text-white">
                                {channels.find(c => c.id === selectedChannelId)?.name}
                              </div>
                              <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                                Sector: {selectedCommunity?.title}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="text-white/40 text-[9px] font-black tracking-widest uppercase hover:text-indigo-400">Archive Intel</Button>
                            <div className="h-4 w-px bg-white/10" />
                            <Users className="w-4 h-4 text-white/20" />
                          </div>
                        </div>

                        {/* Messages Area */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                          {activeMessages.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-white/20">
                              <MessageCircle className="w-12 h-12 mb-4 opacity-10" />
                              <div className="text-[10px] font-black uppercase tracking-[0.3em]">Channel Initialized. Dispatch observation.</div>
                            </div>
                          ) : (
                            activeMessages.map((msg) => (
                              <div key={msg.id} className={`flex flex-col gap-2 ${msg.author === me.displayName ? 'items-end' : 'items-start'}`}>
                                <div className="flex items-center gap-2 px-1">
                                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{msg.author}</span>
                                  <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{msg.timestamp}</span>
                                </div>
                                <div className={`max-w-[80%] px-5 py-3 rounded-2xl text-[14px] font-medium leading-relaxed ${msg.author === me.displayName ? 'bg-indigo-500/20 border border-indigo-500/30 text-indigo-100 rounded-tr-none' : 'bg-white/5 border border-white/10 text-white/90 rounded-tl-none'}`}>
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
                              placeholder="Dispatch market insight..."
                              className="flex-1 bg-white/5 border-white/10 rounded-xl h-14 pl-6 pr-16 text-[15px] font-medium focus:border-cyan-500/50 transition-all placeholder:text-white/20"
                            />
                            <Button 
                              type="submit" 
                              disabled={!messageInput.trim()}
                              className="absolute right-2 top-1/2 -translate-y-1/2 bg-cyan-500 hover:bg-cyan-400 text-black h-10 w-10 rounded-lg p-0 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                            >
                              <Send className="w-4 h-4" />
                            </Button>
                          </form>
                        </div>
                      </>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-white/20 p-12 text-center">
                        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                          <Brain className="w-10 h-10 opacity-30" />
                        </div>
                        <h2 className="text-xl font-black uppercase tracking-[0.2em] text-white/60 mb-2">Select Sector Room</h2>
                        <p className="max-w-sm text-sm font-bold uppercase tracking-widest opacity-30 leading-loose">
                          Pick a community and room from the left diagnostic panel to open the intelligence stream.
                        </p>
                      </div>
                    )}
                  </div>
                </NeonBoard>
              </div>
            </div>
          </TabsContent>

          {/* SETTINGS TAB */}
          <TabsContent value="settings" className="flex-1 min-h-0 focus-visible:outline-none">
            <div className="max-w-2xl mx-auto py-12">
              <NeonBoard>
                <div className="p-8 space-y-8 bg-[#070b16]">
                  <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                    <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/20">
                      <Settings className="w-6 h-6 text-pink-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black uppercase tracking-widest">Identity Settings</h2>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-400/60">Configure Diagnostic Profile</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Display Name</label>
                      <Input 
                        value={me.displayName}
                        onChange={(e) => setMe({...me, displayName: e.target.value})}
                        className="bg-white/5 border-white/10 h-12 rounded-xl text-lg font-bold"
                      />
                      <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">This identifier will be broadcasted across rooms.</p>
                    </div>

                    <div className="pt-6 border-t border-white/5">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20">
                        <div>
                          <div className="text-[11px] font-black uppercase tracking-widest text-indigo-400">Local-First Storage</div>
                          <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest mt-1">Data truth layer saved in browser.</div>
                        </div>
                        <Badge className="bg-indigo-500">ACTIVE</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 flex justify-end">
                    <Button onClick={() => setActiveTab("discover")} className="bg-white/5 border border-white/10 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest px-8 rounded-xl h-11 transition-all">
                      Exit Identity Panel
                    </Button>
                  </div>
                </div>
              </NeonBoard>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="py-12 border-t border-white/10 mt-auto shrink-0">
        <div className="max-w-7xl mx-auto px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 flex justify-between items-center">
          <span>ClearPath v2.5.0 • Global Network Directory</span>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Synchronized</span>
            <span>No Financial Advice • Information Only</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
