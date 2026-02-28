
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Home, 
  BookOpen, 
  Compass, 
  FileText, 
  Image as ImageIcon, 
  Calendar, 
  Bookmark, 
  MessageCircle, 
  Heart, 
  Camera, 
  Star, 
  HardDrive,
  MoreHorizontal,
  Bell,
  Search,
  Plus,
  Sun,
  Moon,
  TrendingUp,
  Hash,
  Brain,
  Settings,
  Layout,
  Zap,
  Eye,
  Activity,
  BarChart3,
  Globe,
  Coins,
  History,
  Scale,
  CandlestickChart as ChartIcon,
  ChevronRight,
  Target,
  Waves,
  Cpu,
  Boxes,
  Briefcase
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
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
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const getImgUrl = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || null;

  const posts = [
    {
      id: 1,
      user: "Jessica Miller",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=60&q=60",
      time: "8 hours ago",
      text: "Exploring the intersection of modern aesthetics and functional design. This latest project focuses on how light transforms architectural spaces throughout the day. Functional beauty is our ultimate goal.",
    },
    {
      id: 2,
      user: "Mike Andrew",
      avatar: getImgUrl('profile-mike') || "https://i.pravatar.cc/150?u=mike",
      time: "2 hours ago",
      text: "City lights and urban rhythms. There's something magical about the blue hour in a bustling metropolis. Every window tells a different story. I've been spending my evenings capturing the transition from day to night across the skyline. The perspective changes completely when the lights come on.",
    }
  ];

  return (
    <div className={`container ${isDarkMode ? 'dark' : ''}`}>
      {/* Left Sidebar */}
      <div className={`left-side ${leftSide ? "active" : ""}`}>
        <button
          type="button"
          className="left-side-button"
          onClick={() => setLeftSide((v) => !v)}
          aria-label="Toggle left menu"
        >
          <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className="logo">ULTRANET</div>

        <div className="side-wrapper overflow-hidden flex flex-col">
          <div className="side-title">CORE INTERFACE</div>
          <div className="side-menu fuchsia-scroll flex-1">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="overview" className="border-none">
                <AccordionTrigger className="hover:no-underline py-3 text-sm font-bold text-muted-foreground hover:text-foreground">
                  <div className="flex items-center gap-3"><Layout className="w-4 h-4" /> Overview</div>
                </AccordionTrigger>
                <AccordionContent className="pb-0 pl-2">
                  <a href="#"><Home /> Home</a>
                  <a href="#"><BookOpen /> Latest News</a>
                  <a href="#"><Compass /> Explore</a>
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

              <AccordionItem value="asset-classes" className="border-none">
                <AccordionTrigger className="hover:no-underline py-3 text-sm font-bold text-muted-foreground hover:text-foreground">
                  <div className="flex items-center gap-3"><Boxes className="w-4 h-4" /> Asset Classes</div>
                </AccordionTrigger>
                <AccordionContent className="pb-0 pl-2">
                  <Link href="/dashboard?market=forex" className="flex items-center gap-3 py-2 text-xs font-medium text-muted-foreground hover:text-primary"><Globe className="w-3 h-3" /> Forex</Link>
                  <Link href="/dashboard?market=stocks" className="flex items-center gap-3 py-2 text-xs font-medium text-muted-foreground hover:text-primary"><TrendingUp className="w-3 h-3" /> Equities</Link>
                  <Link href="/dashboard?market=bonds" className="flex items-center gap-3 py-2 text-xs font-medium text-muted-foreground hover:text-primary"><Scale className="w-3 h-3" /> Bonds</Link>
                  <Link href="/dashboard?market=commodities" className="flex items-center gap-3 py-2 text-xs font-medium text-muted-foreground hover:text-primary"><ImageIcon className="w-3 h-3" /> Commodities</Link>
                  <Link href="/dashboard?market=crypto" className="flex items-center gap-3 py-2 text-xs font-medium text-muted-foreground hover:text-primary"><Coins className="w-3 h-3" /> Crypto</Link>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="instruments" className="border-none">
                <AccordionTrigger className="hover:no-underline py-3 text-sm font-bold text-muted-foreground hover:text-foreground">
                  <div className="flex items-center gap-3"><Target className="w-4 h-4" /> Instruments</div>
                </AccordionTrigger>
                <AccordionContent className="pb-0 pl-2">
                  <Link href="/dashboard?market=futures" className="flex items-center gap-3 py-2 text-xs font-medium text-muted-foreground hover:text-primary"><History className="w-3 h-3" /> Futures</Link>
                  <Link href="/dashboard?market=options" className="flex items-center gap-3 py-2 text-xs font-medium text-muted-foreground hover:text-primary"><Cpu className="w-3 h-3" /> Options</Link>
                  <Link href="/dashboard?market=etfs" className="flex items-center gap-3 py-2 text-xs font-medium text-muted-foreground hover:text-primary"><Briefcase className="w-3 h-3" /> ETFs</Link>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="specialty" className="border-none">
                <AccordionTrigger className="hover:no-underline py-3 text-sm font-bold text-muted-foreground hover:text-foreground">
                  <div className="flex items-center gap-3"><Waves className="w-4 h-4" /> Specialty</div>
                </AccordionTrigger>
                <AccordionContent className="pb-0 pl-2">
                  <Link href="/dashboard?market=volatility" className="flex items-center gap-3 py-2 text-xs font-medium text-muted-foreground hover:text-primary"><Activity className="w-3 h-3" /> Volatility</Link>
                  <Link href="/dashboard?market=carbon" className="flex items-center gap-3 py-2 text-xs font-medium text-muted-foreground hover:text-primary"><Globe className="w-3 h-3" /> Carbon</Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div className="side-wrapper overflow-hidden flex flex-col">
          <div className="side-title">PERSONAL DECK</div>
          <div className="side-menu fuchsia-scroll flex-1">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="personal" className="border-none">
                <AccordionTrigger className="hover:no-underline py-3 text-sm font-bold text-muted-foreground hover:text-foreground">
                  <div className="flex items-center gap-3"><Star className="w-4 h-4" /> Favourites</div>
                </AccordionTrigger>
                <AccordionContent className="pb-0 pl-2">
                  <a href="#"><Bookmark /> Saved Assets</a>
                  <a href="#"><MessageCircle /> Messages</a>
                  <a href="#"><Heart /> Following</a>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="system" className="border-none">
                <AccordionTrigger className="hover:no-underline py-3 text-sm font-bold text-muted-foreground hover:text-foreground">
                  <div className="flex items-center gap-3"><Settings className="w-4 h-4" /> System</div>
                </AccordionTrigger>
                <AccordionContent className="pb-0 pl-2">
                  <a href="#"><Camera /> Identity</a>
                  <a href="#"><HardDrive /> Data Bank</a>
                  <a href="#"><Bell /> Alert Hub</a>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <a href="#" className="mt-4"><Plus /> Custom Layer</a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main">
        <div className="search-bar">
          <div className="flex items-center w-full relative">
            <Search className="absolute left-0 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Search markets or analysis..." className="pl-8" />
          </div>
          <button
            type="button"
            className="right-side-button"
            onClick={() => setRightSide((v) => !v)}
            aria-label="Toggle right panel"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        <div className="main-container">
          <div className="profile">
            <Avatar className="w-[60px] h-[60px] rounded-xl">
              <AvatarImage src={getImgUrl('profile-mike') || "https://i.pravatar.cc/150?u=mike"} />
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
            <div className="profile-name">Mike Andrew</div>
          </div>

          <div className="timeline">
            <div className="timeline-left pb-20">
              {posts.map((post) => (
                <Card key={post.id} className="w-full border shadow-lg bg-card mb-6 overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={post.avatar} />
                        <AvatarFallback>{post.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-bold text-base">{post.user}</span>
                        <span className="text-xs text-muted-foreground">{post.time}</span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Report Post</DropdownMenuItem>
                        <DropdownMenuItem>Save for Later</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Unfollow</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  <CardContent className="px-6 py-6 border-y bg-card/30">
                    <p className="text-lg md:text-xl leading-relaxed font-medium">
                      {post.text}
                    </p>
                  </CardContent>
                  <CardFooter className="px-6 py-4 flex gap-8">
                    <Button variant="ghost" size="sm" className="gap-2 hover:text-red-500 transition-colors">
                      <Heart className="w-5 h-5" />
                      <span className="text-xs font-bold">2.4k</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2 hover:text-primary transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-xs font-bold">128</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2 hover:text-primary transition-colors">
                      <Compass className="w-5 h-5" />
                      <span className="text-xs font-bold">Share</span>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="timeline-right">
              <div className="timeline-right-header">
                <div className="timeline-right-header-title">Market Streams</div>
              </div>

              <div className="story">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="story-card group">
                    {getImgUrl(`story-${i}`) ? (
                      <Image
                        className="story-card-image object-cover group-hover:scale-110 transition-transform"
                        src={getImgUrl(`story-${i}`)!}
                        alt={`Story ${i}`}
                        fill
                        sizes="65px"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted animate-pulse" />
                    )}
                    <div className="story-card-author">
                      <Avatar className="w-full h-full border-2 border-primary">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${i + 10}`} />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                ))}
              </div>

              <div className="timeline-right-header mt-8">
                <div className="timeline-right-header-title">Suggested Traders</div>
              </div>

              <div className="suggested">
                {[
                  { name: "Tom Holland", role: "Macro Expert", id: "th" },
                  { name: "Selena Gomez", role: "Quant Architect", id: "sg" },
                  { name: "Chris Evans", role: "Scalp Specialist", id: "ce" }
                ].map((user) => (
                  <div key={user.id} className="suggested-user">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${user.id}`} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="suggested-user-name">
                      <span>{user.name}</span>
                      <span>{user.role}</span>
                    </div>
                    <Button variant="secondary" size="sm" className="suggested-user-button">
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className={`right-side ${rightSide ? "active" : ""}`}>
        <div className="account">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsDarkMode(!isDarkMode)}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />}
          </Button>
          <Button variant="ghost" size="icon" className="ml-2">
            <MessageCircle className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="ml-2">
            <Bell className="w-5 h-5" />
          </Button>

          <div className="account-user ml-auto">
            <Avatar className="w-[30px] h-[30px]">
              <AvatarImage src={getImgUrl('profile-mike') || "https://i.pravatar.cc/150?u=mike"} />
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
            <span className="account-username">Mike Andrew</span>
          </div>
        </div>

        <div className="side-wrapper flex flex-col min-h-0">
          <div className="side-title">CONNECTED TRADERS</div>
          <div className="side-menu orange-scroll flex-1">
            {["Tom Holland", "Selena Gomez", "Chris Evans", "Emma Watson", "Tony Stark", "Bruce Banner"].map((name) => (
              <a href="#" key={name}>
                <Avatar className="w-6 h-6 mr-3">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${name}`} />
                  <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
                {name}
              </a>
            ))}
          </div>
        </div>

        <div className="side-wrapper flex flex-col min-h-0">
          <div className="side-title">NEURO ACTIVITY</div>
          <div className="side-menu orange-scroll flex-1">
            {[
              { text: "Optimized profile detected", time: "1 hour ago", icon: <Brain className="w-3 h-3 text-primary" /> },
              { text: "Latency check passed", time: "3 hours ago", icon: <Activity className="w-3 h-3 text-green-500" /> },
              { text: "Dual view synchronized", time: "5 hours ago", icon: <Layout className="w-3 h-3 text-blue-500" /> },
              { text: "Focus mode engaged", time: "8 hours ago", icon: <Zap className="w-3 h-3 text-yellow-500" /> }
            ].map((update, idx) => (
              <a href="#" key={idx}>
                <div className="activity-dot" />
                <span>
                  <div className="flex items-center gap-2">
                    {update.text}
                    {update.icon}
                  </div>
                  <span className="activity-date block">{update.time}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="side-wrapper flex flex-col min-h-0">
          <div className="side-title">TRENDING ALPHA</div>
          <div className="side-menu orange-scroll flex-1">
            {[
              { tag: "#neurotrading", posts: "12.4k posts", icon: <TrendingUp className="w-3 h-3 text-orange-500" /> },
              { tag: "#accessibility", posts: "8.5k posts", icon: <Hash className="w-3 h-3 text-orange-400" /> },
              { tag: "#marketfocus", posts: "20k posts", icon: <TrendingUp className="w-3 h-3 text-orange-500" /> }
            ].map((topic, idx) => (
              <a href="#" key={idx}>
                <div className="activity-dot" />
                <span>
                  <div className="flex items-center gap-1.5">
                    {topic.tag}
                    {topic.icon}
                  </div>
                  <span className="activity-date block">{topic.posts}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
