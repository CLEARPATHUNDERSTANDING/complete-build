import type { SearchItem } from "@/server/types";

export async function searchYouTube(q: string): Promise<SearchItem[]> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return [];

  const url =
    "https://www.googleapis.com/youtube/v3/search" +
    `?part=snippet&type=video&maxResults=6&q=${encodeURIComponent(q)}&key=${encodeURIComponent(key)}`;

  try {
    const res = await fetch(url);
    if (!res.ok) return [];

    const data: any = await res.json();
    const out: SearchItem[] = [];

    for (const it of data.items || []) {
      const id = it?.id?.videoId;
      const sn = it?.snippet;
      if (!id || !sn) continue;

      out.push({
        source: "youtube",
        title: sn.title,
        url: `https://www.youtube.com/watch?v=${id}`,
        snippet: sn.description?.slice(0, 180),
        image: sn.thumbnails?.medium?.url,
        author: sn.channelTitle,
        publishedAt: sn.publishedAt,
      });
    }

    return out;
  } catch (e) {
    console.error("YouTube search failed:", e);
    return [];
  }
}
