import { NextResponse } from "next/server";
import { searchNews } from "@/server/providers/news";
import { searchYouTube } from "@/server/providers/youtube";
import { searchReddit } from "@/server/providers/reddit";
import { searchWiki } from "@/server/providers/wiki";
import { classifyQuery } from "@/server/query/classify";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();
  const category = (searchParams.get("category") || "").trim();

  if (!q) {
    return NextResponse.json({ ok: false, error: "Missing query" }, { status: 400 });
  }

  const inferred = category || classifyQuery(q);

  // Choose which sources to hit based on category
  const include = pickSources(inferred);

  const tasks: Promise<any>[] = [];
  if (include.news) tasks.push(searchNews(q));
  if (include.youtube) tasks.push(searchYouTube(q));
  if (include.reddit) tasks.push(searchReddit(q));
  if (include.wiki) tasks.push(searchWiki(q));

  const results = await Promise.allSettled(tasks);

  const items = results.flatMap((r) =>
    r.status === "fulfilled" ? r.value : []
  );

  // Final safety: cap and sort
  const capped = items.slice(0, 40);

  return NextResponse.json({
    ok: true,
    q,
    category: inferred,
    items: capped,
  });
}

function pickSources(category: string) {
  if (category === "news") return { news: true, youtube: true, reddit: true, wiki: true };
  if (category === "howto") return { news: false, youtube: true, reddit: true, wiki: true };
  if (category === "shopping") return { news: false, youtube: true, reddit: true, wiki: false };
  if (category === "auto") return { news: true, youtube: true, reddit: true, wiki: true };
  if (category === "parenting") return { news: true, youtube: true, reddit: true, wiki: true };
  return { news: true, youtube: true, reddit: true, wiki: true };
}
