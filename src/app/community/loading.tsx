export default function CommunityLoading() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="animate-pulse">
        <div className="h-8 w-56 rounded bg-zinc-800" />
        <div className="mt-4 h-4 w-80 rounded bg-zinc-900" />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="h-40 rounded-2xl bg-zinc-900" />
          <div className="h-40 rounded-2xl bg-zinc-900" />
          <div className="h-40 rounded-2xl bg-zinc-900" />
          <div className="h-40 rounded-2xl bg-zinc-900" />
        </div>
      </div>
    </main>
  );
}
