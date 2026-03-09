"use client";

export default function CommunityError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <h2 className="text-2xl font-bold text-red-400">Community route crashed</h2>
        <p className="mt-3 text-zinc-300">
          The /community route hit an error while loading.
        </p>

        <pre className="mt-4 overflow-auto rounded-xl bg-zinc-900 p-4 text-xs text-zinc-300">
{String(error?.message || "Unknown error")}
        </pre>

        <button
          onClick={() => reset()}
          className="mt-4 rounded-xl border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-800"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
