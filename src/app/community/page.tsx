export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center">
      <div className="max-w-md w-full p-10 rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl text-center space-y-6">
        <h1 className="text-3xl font-black uppercase tracking-[0.2em] text-indigo-400">Isolation Test</h1>
        <p className="text-sm font-bold text-white/60 uppercase tracking-widest leading-relaxed">
          If you can see this, the route chunk is loading correctly. The original failure was likely inside a nested component or import.
        </p>
        <div className="pt-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-widest">
            Protocol: Operational
          </div>
        </div>
      </div>
    </main>
  );
}
