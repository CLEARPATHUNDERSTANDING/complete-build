"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Sparkles, 
  Grid2X2, 
  Users, 
  Info, 
  Eye, 
  Scale, 
  FileText, 
  ShieldAlert, 
  Lock, 
  Zap, 
  Brain, 
  TrendingUp, 
  Navigation, 
  Menu,
  Globe,
  Compass
} from "lucide-react";

type FeedPost = {
  id: number;
  author: string;
  time: string;
  text: string;
  likes: string;
  comments: string;
  avatar: string;
};

type Friend = {
  id: number;
  name: string;
  avatar: string;
  online?: boolean;
};

const posts: FeedPost[] = [
  {
    id: 1,
    author: "Jessica Miller",
    time: "8 HOURS AGO",
    text:
      "Exploring the intersection of structure, clarity, and interface design. This workspace is built to reduce noise, improve navigation, and keep decision flow visually stable throughout the day.",
    likes: "2.4K",
    comments: "128",
    avatar: "JM",
  },
  {
    id: 2,
    author: "Market Watch",
    time: "12 HOURS AGO",
    text:
      "Macro releases, cross-asset movement, and sector rotation are drawing attention today. Watch how liquidity conditions affect pacing rather than reacting to isolated headlines.",
    likes: "1.8K",
    comments: "94",
    avatar: "MW",
  },
  {
    id: 3,
    author: "Research Desk",
    time: "1 DAY AGO",
    text:
      "A cleaner interface improves review quality. This design separates observation, discussion, and planning so users can research markets without feeling rushed or overloaded.",
    likes: "3.1K",
    comments: "202",
    avatar: "RD",
  },
];

const friends: Friend[] = [
  { id: 1, name: "Tom Holland", avatar: "TH", online: true },
  { id: 2, name: "Selena Gomez", avatar: "SG", online: true },
  { id: 3, name: "Zendaya", avatar: "Z", online: true },
  { id: 4, name: "Robert Downey", avatar: "RD", online: false },
  { id: 5, name: "Scarlett J", avatar: "SJ", online: true },
  { id: 6, name: "Chris Evans", avatar: "CE", online: false },
  { id: 7, name: "Mark Ruffalo", avatar: "MR", online: true },
  { id: 8, name: "Jeremy Renner", avatar: "JR", online: false },
];

function BorderWallCard({
  title,
  children,
  className = "",
  maxHeight = "400px",
  id,
  useScrollArea = true
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
  maxHeight?: string;
  id?: string;
  useScrollArea?: boolean;
}) {
  return (
    <div
      id={id}
      className={[
        "relative rounded-[26px]",
        "p-[5px]",
        "bg-[linear-gradient(135deg,rgba(255,110,34,1)_0%,rgba(255,40,120,0.95)_45%,rgba(255,140,0,1)_100%)]",
        "shadow-[0_0_22px_rgba(255,98,0,0.48),0_0_44px_rgba(255,40,120,0.26),0_0_70px_rgba(255,140,0,0.12)]",
        className,
      ].join(" ")}
    >
      <div
        className="
          rounded-[23px]
          p-[5px]
          bg-[linear-gradient(135deg,rgba(55,214,255,1)_0%,rgba(162,122,255,0.95)_48%,rgba(255,79,179,1)_100%)]
          shadow-[inset_0_0_16px_rgba(255,255,255,0.09),0_0_28px_rgba(44,213,255,0.35),0_0_30px_rgba(255,76,166,0.24)]
        "
      >
        <div
          className="
            rounded-[20px]
            bg-[radial-gradient(circle_at_top,rgba(17,24,54,0.92)_0%,rgba(3,8,24,0.98)_48%,rgba(1,4,15,1)_100%)]
            backdrop-blur-xl
            border border-white/5
            flex flex-col overflow-hidden
          "
        >
          {title ? (
            <div className="border-b border-white/8 px-5 py-4 shrink-0">
              <div className="text-[12px] font-black uppercase tracking-[0.28em] text-white/70">
                {title}
              </div>
            </div>
          ) : null}

          <div className="flex-1 min-h-0 relative">
            {useScrollArea ? (
              <ScrollArea className="h-full">
                <div className="p-5" style={{ maxHeight: maxHeight }}>{children}</div>
              </ScrollArea>
            ) : (
              <div className="p-5 h-full overflow-hidden" style={{ maxHeight: maxHeight }}>
                {children}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AvatarBadge({
  label,
  online = false,
}: {
  label: string;
  online?: boolean;
}) {
  return (
    <div className="relative h-12 w-12 shrink-0 rounded-full bg-[linear-gradient(135deg,#59e7ff,#8a7dff,#ff4ba3)] p-[2px] shadow-[0_0_12px_rgba(67,222,255,0.45),0_0_16px_rgba(255,83,171,0.22)]">
      <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-950 text-sm font-black text-white">
        {label}
      </div>
      {online ? (
        <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-slate-950 bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
      ) : null}
    </div>
  );
}

function NavItem({
  label,
  icon: Icon,
  href = "#",
  active = false,
  color = "cyan",
}: {
  label: string;
  icon?: any;
  href?: string;
  active?: boolean;
  color?: "cyan" | "pink" | "orange" | "violet" | "emerald" | "blue";
}) {
  const colorMap = {
    cyan: "text-cyan-300",
    pink: "text-pink-400",
    orange: "text-orange-300",
    violet: "text-violet-300",
    emerald: "text-emerald-400",
    blue: "text-blue-400",
  };

  return (
    <Link
      href={href}
      className={[
        "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 group",
        active
          ? "bg-white/[0.04] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
          : "hover:bg-white/[0.03]",
      ].join(" ")}
    >
      {Icon ? (
        <Icon className={["w-5 h-5", active ? colorMap[color] : "text-white/70 group-hover:text-white group-hover:scale-110 transition-all"].join(" ")} />
      ) : (
        <span className={["text-lg", colorMap[color]].join(" ")}>✦</span>
      )}
      <span className={["text-[15px] font-semibold", active ? colorMap[color] : "text-white"].join(" ")}>{label}</span>
    </Link>
  );
}

function FeedCard({ post }: { post: FeedPost }) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="relative rounded-[36px] p-[8px] bg-[linear-gradient(135deg,rgba(83,238,255,1)_0%,rgba(110,142,255,1)_30%,rgba(255,87,182,1)_68%,rgba(184,160,255,1)_100%)] shadow-[0_0_26px_rgba(92,223,255,0.3),0_0_60px_rgba(180,80,255,0.16)]">
        <div className="rounded-[29px] bg-[radial-gradient(circle_at_top,rgba(10,18,48,0.94)_0%,rgba(2,6,23,0.98)_58%,rgba(1,4,15,1)_100%)] px-8 py-7 text-left">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <AvatarBadge label={post.avatar} />
              <div>
                <div className="text-[18px] font-black text-white">
                  {post.author}
                </div>
                <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-white/50">
                  {post.time}
                </div>
              </div>
            </div>

            <button className="text-[13px] font-black uppercase tracking-[0.16em] text-cyan-300 transition hover:text-pink-300">
              Analyze Intel →
            </button>
          </div>

          <div className="my-6 h-px bg-white/8" />

          <p className="max-w-3xl text-[18px] leading-9 text-white/92 md:text-[19px]">
            {post.text}
          </p>

          <div className="my-6 h-px bg-white/8" />

          <div className="flex items-center gap-8 text-white/70">
            <div className="flex items-center gap-2">
              <span className="text-lg">♡</span>
              <span className="font-bold">{post.likes}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">◔</span>
              <span className="font-bold">{post.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-indigo-500">
      <div className="grid min-h-screen grid-cols-1 xl:grid-cols-[290px_minmax(0,1fr)_330px]">
        {/* LEFT SIDEBAR */}
        <aside className="border-r border-white/8 bg-black">
          <div className="sticky top-0 h-screen flex flex-col">
            <div className="p-6 mb-2 shrink-0">
              <div className="mb-8 flex items-center gap-3">
                <span className="text-2xl text-violet-400">☰</span>
                <div className="text-[13px] font-black uppercase tracking-[0.35em] text-violet-300">
                  Navigation
                </div>
              </div>
            </div>

            <ScrollArea className="flex-1 min-h-0">
              <div className="px-5 pb-8 space-y-7">
                <BorderWallCard title="Workspace" maxHeight="none" useScrollArea={false}>
                  <div className="space-y-1">
                    <NavItem label="Market Overview" icon={Globe} href="/markets" color="emerald" />
                    <NavItem label="Standard Workspace" icon={LayoutDashboard} href="/dashboard?mode=minimal" color="orange" />
                    <NavItem label="Neuro Workspace" icon={Sparkles} href="/dashboard?mode=focus" color="violet" />
                    <NavItem label="STANDARD VIEW" icon={Grid2X2} href="/dashboard?mode=quad" color="cyan" />
                    <NavItem label="All Communities" icon={Compass} href="/communities" color="blue" />
                    <NavItem label="Community Feed" icon={Users} href="/community" active color="pink" />
                  </div>
                </BorderWallCard>

                <BorderWallCard title="Standard Modes" maxHeight="300px">
                  <div className="space-y-1">
                    <NavItem label="Stocks" href="/dashboard?mode=minimal&style=stocks" color="cyan" />
                    <NavItem label="ETFs" href="/dashboard?mode=minimal&style=etfs" color="cyan" />
                    <NavItem label="Bonds" href="/dashboard?mode=minimal&style=bonds" color="cyan" />
                    <NavItem label="Forex" href="/dashboard?mode=minimal&style=forex" color="cyan" />
                    <NavItem label="Futures" href="/dashboard?mode=minimal&style=futures" color="cyan" />
                    <NavItem label="Crypto" href="/dashboard?mode=minimal&style=crypto" color="cyan" />
                    <NavItem label="Indices" href="/dashboard?mode=minimal&style=indices" color="cyan" />
                    <NavItem label="World Economy" href="/dashboard?mode=minimal&style=economy" color="cyan" />
                  </div>
                </BorderWallCard>

                <BorderWallCard title="Platform" maxHeight="none" useScrollArea={false}>
                  <div className="space-y-1">
                    <NavItem label="On-Going Research" icon={Zap} href="/research" color="orange" />
                    <NavItem label="Mission" icon={Info} href="/mission" color="cyan" />
                    <NavItem label="Transparency" icon={Eye} href="/transparency" color="cyan" />
                    <NavItem label="Governance" icon={Scale} href="/governance" color="cyan" />
                    <NavItem label="Constitution" icon={FileText} href="/platform-constitution" color="cyan" />
                  </div>
                </BorderWallCard>

                <BorderWallCard title="Legal" maxHeight="none" useScrollArea={false}>
                  <div className="space-y-1">
                    <NavItem label="Risk Disclosure" icon={ShieldAlert} href="/mission" color="orange" />
                    <NavItem label="Compliance" icon={Lock} href="/transparency" color="cyan" />
                  </div>
                </BorderWallCard>
              </div>
            </ScrollArea>
          </div>
        </aside>

        {/* CENTER */}
        <section className="min-w-0 bg-black">
          <div className="sticky top-0 z-20 border-b border-white/8 bg-black/92 px-8 py-5 backdrop-blur-xl">
            <div className="flex flex-wrap items-center gap-4">
              <div className="min-w-[280px] flex-1">
                <div className="flex h-14 items-center rounded-2xl border border-white/10 bg-white/[0.02] px-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]">
                  <span className="mr-3 text-white/50 text-xl">⌕</span>
                  <input
                    className="w-full bg-transparent text-[18px] text-white outline-none placeholder:text-white/35"
                    placeholder="Search markets, news, or traders..."
                  />
                </div>
              </div>

              <div className="ml-auto flex items-center gap-5">
                <button className="text-xl text-yellow-300">☼</button>
                <button className="text-xl text-white/70">◔</button>

                <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] px-3 py-2">
                  <AvatarBadge label="MA" />
                  <div className="leading-tight text-left">
                    <div className="text-[15px] font-black text-white">
                      Mike Andrew
                    </div>
                    <div className="text-[12px] font-black uppercase tracking-[0.1em] text-cyan-300">
                      Premium User
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-80px)]">
            <div className="px-8 py-8 space-y-10">
              {posts.map((post) => (
                <FeedCard key={post.id} post={post} />
              ))}
            </div>
          </ScrollArea>
        </section>

        {/* RIGHT SIDEBAR */}
        <aside className="border-l border-white/8 bg-black">
          <div className="sticky top-0 h-screen flex flex-col">
            <ScrollArea className="flex-1 min-h-0">
              <div className="px-5 py-6 space-y-8">
                <BorderWallCard title="Online Friends" maxHeight="none" id="online-friends-card" useScrollArea={false}>
                  <div className="friends-scroll max-h-[350px] pr-2 space-y-5">
                    {friends.map((friend) => (
                      <div
                        key={friend.id}
                        className="flex items-center gap-4 rounded-2xl px-2 py-1.5 hover:bg-white/[0.03] transition-all cursor-pointer"
                      >
                        <AvatarBadge
                          label={friend.avatar}
                          online={friend.online}
                        />
                        <div className="text-[16px] font-bold text-white">
                          {friend.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </BorderWallCard>

                <BorderWallCard title="Latest Updates" maxHeight="none" id="latest-updates-card" useScrollArea={false}>
                  <div className="latest-updates-scroll max-h-[300px] pr-2 space-y-5 text-[15px] text-left">
                    <div className="rounded-2xl bg-white/[0.02] px-4 py-3 border border-white/5">
                      <div className="text-white/90 leading-snug">
                        <span className="font-black text-cyan-300">Tonny</span>{" "}
                        posted 1 photo
                      </div>
                      <div className="mt-1 text-[12px] font-bold uppercase tracking-[0.16em] text-white/45">
                        2 MIN AGO
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white/[0.02] px-4 py-3 border border-white/5">
                      <div className="text-white/90 leading-snug">
                        <span className="font-black text-cyan-300">Mike</span>{" "}
                        started following you
                      </div>
                      <div className="mt-1 text-[12px] font-bold uppercase tracking-[0.16em] text-white/45">
                        5 MIN AGO
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white/[0.02] px-4 py-3 border border-white/5">
                      <div className="text-white/90 leading-snug">
                        <span className="font-black text-cyan-300">Research</span>{" "}
                        added a new macro note
                      </div>
                      <div className="mt-1 text-[12px] font-bold uppercase tracking-[0.16em] text-white/45">
                        11 MIN AGO
                      </div>
                    </div>
                  </div>
                </BorderWallCard>
              </div>
            </ScrollArea>
          </div>
        </aside>
      </div>
    </main>
  );
}
