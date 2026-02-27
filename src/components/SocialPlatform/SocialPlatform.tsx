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
  Moon
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function SocialPlatform() {
  const [leftSide, setLeftSide] = useState(false);
  const [rightSide, setRightSide] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply dark mode class to body for global theme support
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const getImg = (id: string) => PlaceHolderImages.find(img => img.id === id);

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
            {/* Added extra items for scrolling demo */}
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

        <div className="side-wrapper" style={{ maxHeight: '150px' }}>
          <div className="side-title">DEVELOPER</div>
          <a className="developer" href="#">
            <Avatar className="w-8 h-8 mr-2">
              <AvatarImage src="https://pbs.twimg.com/profile_images/1253782473953157124/x56UURmt_400x400.jpg" />
              <AvatarFallback>AT</AvatarFallback>
            </Avatar>
            Aysenur Turk — @AysnrTrkk
          </a>
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
              <AvatarImage src={getImg('profile-mike')?.imageUrl} />
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
            <div className="profile-name">Mike Andrew</div>
          </div>

          <div className="timeline">
            <div className="timeline-left">
              <div className="timeline-left-header">
                <div className="timeline-left-header-user">
                  <Avatar className="w-11 h-11">
                    <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=60&q=60" />
                    <AvatarFallback>JM</AvatarFallback>
                  </Avatar>
                  <div className="user">
                    <div className="username">Jessica Miller</div>
                    <div className="time">8 hours ago</div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="timeline-left-header-more">
                      <MoreHorizontal className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Report Post</DropdownMenuItem>
                    <DropdownMenuItem>Save for Later</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Unfollow</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="timeline-left-content">
                <div className="relative w-full h-[350px] bg-muted overflow-hidden">
                  {getImg('post-image-1')?.imageUrl ? (
                    <Image
                      className="timeline-left-content-image object-cover"
                      src={getImg('post-image-1')!.imageUrl}
                      alt="Post Image"
                      fill
                      data-ai-hint="modern architecture"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground italic">
                      Image Loading...
                    </div>
                  )}
                </div>

                <div className="timeline-left-content-text">
                  <span>
                    It is a long established fact that a reader will be distracted
                    by the readable content of a page when looking at its layout.
                  </span>
                </div>
              </div>

              <div className="timeline-left-footer">
                <Button variant="ghost" size="icon" className="timeline-left-footer-button">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="timeline-left-footer-button">
                  <MessageCircle className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="timeline-left-footer-button">
                  <Compass className="w-5 h-5" />
                </Button>
              </div>
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
                    {getImg(`story-${i}`)?.imageUrl ? (
                      <Image
                        className="story-card-image object-cover"
                        src={getImg(`story-${i}`)!.imageUrl}
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
              <AvatarImage src="https://pbs.twimg.com/profile_images/1253782473953157124/x56UURmt_400x400.jpg" />
              <AvatarFallback>AT</AvatarFallback>
            </Avatar>
            <span className="account-username">Aysenur Turk</span>
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