import { Loader2 } from "lucide-react";

export default function CommunityLoading() {
  return (
    <main className="min-h-screen bg-black text-white p-8 lg:p-16 flex flex-col gap-12">
      <div className="flex items-center gap-6 animate-pulse">
        <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10" />
        <div className="space-y-3">
          <div className="h-8 w-48 bg-white/5 rounded-lg" />
          <div className="h-4 w-32 bg-white/5 rounded-md" />
        </div>
      </div>

      <div className="grid gap-8 max-w-4xl mx-auto w-full">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 rounded-[40px] bg-white/5 border border-white/10 animate-pulse relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </div>
        ))}
      </div>

      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black uppercase tracking-widest text-indigo-400">
        <Loader2 className="w-3 h-3 animate-spin" />
        Synchronizing Social Feed
      </div>
    </main>
  );
}
