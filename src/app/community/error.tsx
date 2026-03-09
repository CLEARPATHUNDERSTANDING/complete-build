"use client";

import { AlertCircle, RefreshCcw } from "lucide-react";

export default function CommunityError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="w-full max-w-xl rounded-[32px] border border-rose-500/20 bg-rose-500/5 p-10 backdrop-blur-xl space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-rose-500/20 border border-rose-500/30">
            <AlertCircle className="w-6 h-6 text-rose-400" />
          </div>
          <div>
            <h2 className="text-xl font-black uppercase tracking-widest text-rose-400">Terminal Exception</h2>
            <p className="text-[10px] font-black uppercase tracking-widest text-rose-400/60">Route: /community</p>
          </div>
        </div>

        <div className="bg-black/40 rounded-2xl border border-white/5 p-6">
          <pre className="text-xs font-mono text-rose-200/70 whitespace-pre-wrap break-words">
            {String(error?.message || "Chunk load failure or runtime interruption.")}
          </pre>
        </div>

        <button
          onClick={() => reset()}
          className="w-full flex items-center justify-center gap-3 h-14 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-[11px] font-black uppercase tracking-widest transition-all"
        >
          <RefreshCcw className="w-4 h-4" />
          Re-initialize Community Node
        </button>
      </div>
    </main>
  );
}
