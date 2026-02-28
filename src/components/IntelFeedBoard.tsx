import React from "react";
import NeonBoard from "./NeonBoard";
import { X } from "lucide-react";

type IntelFeedItem = {
  tag: string;
  time: string;
  title: string;
  highlightedWord?: string;
};

const intelItems: IntelFeedItem[] = [
  {
    tag: "SYSTEM",
    time: "Just now",
    title: "Intelligence Interface Active",
    highlightedWord: "Interface"
  },
  {
    tag: "NETWORK",
    time: "5m ago",
    title: "Data Truth Layer Synchronized",
  },
];

export default function IntelFeedBoard() {
  return (
    <NeonBoard className="w-full overflow-hidden">
      <div className="bg-[#070b16]">
        {/* Header Section */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="grid grid-cols-2 gap-[2px] opacity-60">
              <span className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <span className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <span className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <span className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            </div>
            <div className="text-[14px] font-black uppercase tracking-[0.25em] text-white/90">
              Intel Feed
            </div>
          </div>
          <button className="text-white/40 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Section */}
        <div className="p-5 space-y-8">
          {intelItems.map((item, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-[10px] font-black tracking-widest text-indigo-400 uppercase">
                  {item.tag}
                </span>
                <span className="text-[11px] font-medium text-white/40 lowercase">
                  {item.time}
                </span>
              </div>

              <div className="text-[20px] font-bold leading-tight text-white/95 tracking-tight">
                {item.title.split(' ').map((word, i) => (
                  <span 
                    key={i} 
                    className={word === item.highlightedWord ? "bg-cyan-500/40 text-cyan-200 px-1.5 rounded-sm shadow-[0_0_15px_rgba(6,182,212,0.5)]" : ""}
                  >
                    {word}{' '}
                  </span>
                ))}
              </div>
              
              {index !== intelItems.length - 1 && (
                <div className="pt-4 border-b border-white/10" />
              )}
            </div>
          ))}
        </div>

        {/* Diagnostic Footer Bar */}
        <div 
          className="h-2 w-full mt-4"
          style={{
            background: "linear-gradient(90deg, #7c3aed 0%, #00e5ff 50%, #f43f5e 100%)"
          }}
        />
      </div>
    </NeonBoard>
  );
}
