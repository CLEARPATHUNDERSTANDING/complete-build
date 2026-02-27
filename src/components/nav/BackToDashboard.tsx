
"use client";

import React from "react";
import { useRouter } from "next/navigation";

export function BackToDashboard({
  href = "/",
  label = "Back to Dashboard",
}: {
  href?: string;
  label?: string;
}) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(href)}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-black/20 hover:bg-white/10 text-white/90 transition-all"
    >
      <span aria-hidden>←</span>
      <span className="text-sm font-semibold">{label}</span>
    </button>
  );
}
