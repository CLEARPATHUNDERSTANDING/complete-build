"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Search,
  Plus,
  Sun,
  Moon,
  Brain,
  Layout,
  Zap,
  Activity,
  Globe,
  CandlestickChart as ChartIcon,
  MessageCircle,
  Heart,
  ArrowRight
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { NEURO_PROFILES } from "@/lib/neuro/profiles";

export default function SocialPlatform() {
  const [leftSide, setLeftSide] = useState(false);
  const [rightSide, setRightSide] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const getImgUrl = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || null;

  const posts = [
    {
      id: 1,
      user: "Jessica Miller",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=60&q=60",
      time: "8 hours ago",
      text: "Exploring the intersection of modern aesthetics and functional design. This latest project focuses on how light transforms architectural spaces throughout the day.",
    },
    {
      id: 2,
      user: "Mike Andrew",
      avatar: getImgUrl('profile-mike') || "https://i.pravatar.cc/150?u=mike",
      time: "2 hours ago",
      text: "City lights and urban rhythms. There's something magical about the blue hour in a bustling metropolis. Every window tells a different story.",
    }
  ];

  return (
    <div className="flex w-full h-screen overflow-hidden bg-black text-white">
      {/* Left Sidebar */}
      <div className={`w-64 border-r border-white/10 flex flex-col bg-black transition-all ${leftSide ? 'translate-x-0' : '-translate-x-0'}`}>
        <div className="p-6">
          <div className="text-xl font-bold tracking-[0.2em] text-primary">ULTRANET</div>
        </div>

        <div className="flex-1 overflow-y-auto px-4">
          <div className="text-[10px] font-bold tracking-widest text-muted-foreground/50 mb-4 px-2">CORE INTERFACE</div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="intelligence" className="border-none">
              <AccordionTrigger className="hover:no-underline py-3 text-sm font-bold text-primary hover:text-primary/80">
                <div className="flex items-center gap-3"><Globe className="w-4 h-4" /> Intelligence</div>
              </AccordionTrigger>
              <AccordionContent className="pb-0 pl-2">
                <Link href="/intelligence" className="flex items-center gap-3 py-2 text-xs font-bold text-muted-foreground hover:text-primary">
                  <Search className="w-3 h-3" /> Launch Search
                </Link>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="neuro" className="border-none">
              <AccordionTrigger className="hover:no-underline py-3 text-sm font-bold text-primary hover:text-primary/80">
                <div className="flex items-center gap-3"><Brain className="w-4 h-4" /> Neuro Analytics</div>
              </AccordionTrigger>
              <AccordionContent className="pb-0 pl-2">
                <Link href="/dashboard" className="flex items-center gap-3 py-2 text-xs font-bold text-muted-foreground hover:text-primary">
                  <ChartIcon className="w-3 h-3" /> Standard View
                </Link>
                {NEURO_PROFILES.slice(0, 5).map((profile) => (
                  <Link 
                    key={profile.id} 
                    href={`/dashboard?profile=${profile.id}`} 
                    className="flex items-center gap-3 py-2 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Zap className="w-3 h-3" /> {profile.label}
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-black">
        {/* Header Bar */}
        <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-black">
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search markets or analysis..." 
              className="w-full bg-white/5 border border-white/5 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary/50"
            />
          </div>
          <div className="flex items-center gap-4 ml-6">
            <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarImage src={getImgUrl('profile-mike') || "https://i.pravatar.cc/150?u=mike"} />
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Scrollable Feed */}
        <div className="flex-1 overflow-y-auto p-6 flex justify-center">
          <div className="w-full max-w-2xl space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="border-white/10 bg-[#0a0a0a] shadow-xl overflow-hidden">
                <CardHeader className="p-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-10 h-10 border border-white/10">
                      <AvatarImage src={post.avatar} />
                      <AvatarFallback>{post.user[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-white">{post.user}</span>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{post.time}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-6 py-4 border-y border-white/5 bg-black/40">
                  <p className="text-base leading-relaxed text-white/90">
                    {post.text}
                  </p>
                </CardContent>
                <CardFooter className="px-6 py-4 flex gap-6">
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-red-500">
                    <Heart className="w-4 h-4" />
                    <span className="text-xs font-bold">2.4k</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs font-bold">128</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-72 border-l border-white/10 flex flex-col bg-black">
        <div className="p-6">
          <div className="text-xs font-bold tracking-widest text-muted-foreground/50 mb-4">NEURO ACTIVITY</div>
          <div className="space-y-4">
            {[
              { text: "Optimized profile detected", time: "1h", icon: <Brain className="w-3 h-3 text-primary" /> },
              { text: "Latency check passed", time: "3h", icon: <Activity className="w-3 h-3 text-green-500" /> },
              { text: "Focus mode engaged", time: "8h", icon: <Zap className="w-3 h-3 text-yellow-500" /> }
            ].map((update, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="mt-1">{update.icon}</div>
                <div className="flex-1">
                  <div className="text-xs text-white/80 font-medium">{update.text}</div>
                  <div className="text-[10px] text-muted-foreground font-bold mt-1">{update.time} AGO</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
