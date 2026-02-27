"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
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
  Hash
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
import { PlaceHolderImages } from "@/lib/placeholder-images";

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
      text: "Exploring the intersection of modern aesthetics and functional design. This latest project focuses on how light transforms architectural spaces throughout the day. We are looking at ways to integrate sustainable materials without compromising on the visual appeal.",
      hint: "modern architecture"
    },
    {
      id: 2,
      user: "Mike Andrew",
      avatar: getImgUrl('profile-mike') || "",
      time: "2 hours ago",
      text: "City lights and urban rhythms. There's something magical about the blue hour in a bustling metropolis. Every window tells a different story. I've been spending my evenings capturing the transition from day to night across the skyline.",
      hint: "city skyline"
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
          <svg stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="logo">ULTRANET</div>

        <div className="side-wrapper">
          <div className="side-title">MENU</div>
          <div className="side-menu fuchsia-scroll">
            <a href="#"><Home /> Home</a>
            <a href="#"><BookOpen /> Latest News</a>
            <a href="#"><Compass /> Explore</a>
            <a href="#"><FileText /> Files</a>
            <a href="#"><ImageIcon /> Galery</a>
            <a href="#"><Calendar /> Events</a>
            <a href="#"><Bookmark /> Archive</a>
            <a href="#"><MessageCircle /> Forums</a>
            <a href="#"><Star /> Trending</a>
            <a href="#"><Heart /> Activity</a>
          </div>
        </div>

        <div className="side-wrapper">
          <div className="side-title">YOUR FAVOURITES</div>
          <div className="side-menu fuchsia-scroll">
            <a href="#"><Bookmark /> Favourites</a>
            <a href="#"><MessageCircle /> Messages</a>
            <a href="#"><Heart /> Like</a>
            <a href="#"><Camera /> Photo</a>
            <a href="#"><Star /> Ratings</a>
            <a href="#"><HardDrive /> Storage</a>
            <a href="#"><Bell /> Alerts</a>
            <a href="#"><Plus /> Custom</a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main">
        <div className="search-bar">
          <div className="flex items-center w-full relative">
            <Search className="absolute left-0 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Search" className="pl-8" />
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
              <AvatarImage src={getImgUrl('profile-mike') || undefined} />
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
            <div className="profile-name">Mike Andrew</div>
          </div>

          <div className="timeline">
            <div className="timeline-left space-y-6 pb-20">
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden border-none shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500 bg-card/80 backdrop-blur-sm">
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
                  <CardContent className="px-6 py-4">
                    <p className="text-base md:text-lg leading-relaxed text-foreground/90 font-medium">
                      {post.text}
                    </p>
                  </CardContent>
                  <CardFooter className="px-6 pb-6 pt-2 flex gap-8">
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
                <div className="timeline-right-header-title">Stories</div>
                <Button variant="ghost" size="icon" className="timeline-right-header-settings">
                  <Compass className="w-[18px] h-[18px]" />
                </Button>
              </div>

              <div className="story">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="story-card">
                    {getImgUrl(`story-${i}`) ? (
                      <Image
                        className="story-card-image object-cover"
                        src={getImgUrl(`story-${i}`)!}
                        alt={`Story ${i}`}
                        fill
                        data-ai-hint="lifestyle story"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted animate-pulse" />
                    )}
                    <div className="story-card-author">
                      <Avatar className="w-full h-full border-2 border-accent">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                ))}
              </div>

              <div className="timeline-right-header mt-8">
                <div className="timeline-right-header-title">Suggested</div>
              </div>

              <div className="suggested">
                {[
                  { name: "Tom Holland", role: "Developer", id: "th" },
                  { name: "Jason Momoa", role: "UI Designer", id: "jm" },
                  { name: "Selena Gomez", role: "UX Designer", id: "sg" }
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
            className="account-button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />}
          </Button>
          <Button variant="ghost" size="icon" className="account-button">
            <MessageCircle className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="account-button">
            <Bell className="w-5 h-5" />
          </Button>

          <div className="account-user">
            <Avatar className="w-[30px] h-[30px]">
              <AvatarImage src={getImgUrl('profile-mike') || "https://i.pravatar.cc/150?u=mike"} />
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
            <span className="account-username">Mike Andrew</span>
          </div>
        </div>

        <div className="side-wrapper">
          <div className="side-title">ONLINE FRIENDS</div>
          <div className="side-menu orange-scroll">
            {["Tom Holland", "Selena Gomez", "Jack Sparrow", "Aaron Paul", "Chris Evans", "Emma Watson", "Tony Stark", "Bruce Banner"].map((name) => (
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

        <div className="side-wrapper">
          <div className="side-title">LATEST UPDATES</div>
          <div className="side-menu orange-scroll">
            {[
              { text: "Tonny posted 1 photo", time: "2 min ago" },
              { text: "Mike started following you", time: "45 min ago" },
              { text: "Jessica liked your post", time: "1 hour ago" },
              { text: "Daniel joined to the group", time: "4 hour ago" },
              { text: "Sarah commented on your story", time: "5 hour ago" },
              { text: "Mark shared a file", time: "6 hour ago" },
              { text: "Chris sent you a message", time: "7 hour ago" },
              { text: "Anna updated her profile", time: "8 hour ago" }
            ].map((update, idx) => (
              <a href="#" key={idx}>
                <div className="activity-dot" />
                <span>
                  {update.text}
                  <span className="activity-date block">{update.time}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="side-wrapper">
          <div className="side-title">TRENDING TOPICS</div>
          <div className="side-menu orange-scroll">
            {[
              { tag: "#nextjs", posts: "12.4k posts", icon: <TrendingUp className="w-3 h-3 text-orange-500" /> },
              { tag: "#firebase", posts: "8.5k posts", icon: <Hash className="w-3 h-3 text-orange-400" /> },
              { tag: "#webdesign", posts: "5.2k posts", icon: <TrendingUp className="w-3 h-3 text-orange-500" /> },
              { tag: "#reactjs", posts: "20k posts", icon: <TrendingUp className="w-3 h-3 text-orange-500" /> },
              { tag: "#uidesign", posts: "15.1k posts", icon: <Hash className="w-3 h-3 text-orange-400" /> },
              { tag: "#codinglife", posts: "4.2k posts", icon: <TrendingUp className="w-3 h-3 text-orange-500" /> },
              { tag: "#frontend", posts: "11.8k posts", icon: <Hash className="w-3 h-3 text-orange-400" /> }
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

      <button
        type="button"
        className={`overlay ${(rightSide || leftSide) ? "active" : ""}`}
        onClick={() => {
          setRightSide(false);
          setLeftSide(false);
        }}
        aria-label="Close panels"
      />
    </div>
  );
}
