import type { SearchItem } from "@/server/types";

export async function searchNews(q: string): Promise<SearchItem[]> {
  const key = process.env.NEWSDATA_API_KEY;
  if (!key) return [];

  const url = `https://newsdata.io/api/1/news?apikey=${encodeURIComponent(key)}&q=${encodeURIComponent(q)}&language=en`;

  try {
    const res = await fetch(url);
    if (!res.ok) return [];

    const data: any = await res.json();
    const out: SearchItem[] = [];

    for (const a of data.results || []) {
      if (!a?.link || !a?.title) continue;
      out.push({
        source: "news",
        title: a.title,
        url: a.link,
        snippet: (a.description || a.content || "").slice(0, 180),
        image: a.image_url,
        author: a.creator?.[0] || a.source_id,
        publishedAt: a.pubDate,
      });
    }

    return out;
  } catch (e) {
    console.error("News search failed:", e);
    return [];
  }
}
