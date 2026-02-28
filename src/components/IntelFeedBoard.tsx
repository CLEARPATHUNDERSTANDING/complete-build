import React from "react";
import NeonBoard from "./NeonBoard";

type IntelFeedItem = {
  tag: string;
  time: string;
  title: string;
};

const intelItems: IntelFeedItem[] = [
  {
    tag: "SYSTEM",
    time: "Just now",
    title: "Intelligence Interface Active",
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
      <div className="px-5 pt-4">
        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="grid h-4 w-4 grid-cols-2 gap-[2px] opacity-50">
              <span className="rounded-sm bg-white/35" />
              <span className="rounded-sm bg-white/20" />
              <span className="rounded-sm bg-white/20" />
              <span className="rounded-sm bg-white/35" />
            </div>

            <div className="text-[14px] font-semibold uppercase tracking-[0.22em] text-white/75">
              Intel Feed
            </div>
          </div>

          <button className="text-xl text-white/70">×</button>
        </div>

        <div className="space-y-5 rounded-[22px] bg-[#0a0e19] p-4">
          {intelItems.map((item, index) => (
            <div key={index} className={index !== intelItems.length - 1 ? "border-b border-white/10 pb-5" : ""}>
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full border border-[#4028a8] bg-[#101424] px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-[#6e63ff]">
                  {item.tag}
                </span>
                <span className="text-[12px] text-white/55">{item.time}</span>
              </div>

              <div className="max-w-[230px] text-[17px] font-semibold leading-[1.25] text-white">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="mt-4 h-[140px] w-full"
        style={{
          background:
            "linear-gradient(135deg, rgba(194,223,255,0.95) 0%, rgba(255,65,182,0.92) 55%, rgba(140,199,255,0.96) 100%)",
        }}
      />
    </NeonBoard>
  );
}
