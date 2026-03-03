import type { SearchItem } from "@/server/types";

const SUBS = ["news", "worldnews", "stocks", "cryptocurrency", "technology", "recipes", "cars", "parenting"];

export async function searchReddit(q: string): Promise<SearchItem[]> {
  const items: SearchItem[] = [];

  // Hit 2–3 subs max to avoid rate issues
  const subs = pickSubs(q).slice(0, 3);

  await Promise.all(
    subs.map(async (sub) => {
      try {
        const url = `https://www.reddit.com/r/${sub}/search.json?q=${encodeURIComponent(q)}&restrict_sr=1&sort=relevance&t=month&limit=6`;
        const res = await fetch(url, { headers: { "User-Agent": "ClearPath/1.0" } });
        if (!res.ok) return;
        const data: any = await res.json();
        const children = data?.data?.children || [];
        for (const c of children) {
          const p = c?.data;
          if (!p?.permalink) continue;
          items.push({
            source: "reddit",
            title: p.title,
            url: `https://www.reddit.com${p.permalink}`,
            snippet: p.selftext?.slice(0, 180),
            author: `u/${p.author}`,
            publishedAt: p.created_utc ? new Date(p.created_utc * 1000).toISOString() : undefined,
          });
        }
      } catch (e) {
        console.error(`Reddit search failed for /r/${sub}:`, e);
      }
    })
  );

  return items;
}

function pickSubs(q: string) {
  const s = q.toLowerCase();
  if (s.includes("recipe") || s.includes("cook")) return ["recipes", "food", "mealprep"];
  if (s.includes("car") || s.includes("truck")) return ["cars", "cartalk", "autos"];
  if (s.includes("baby") || s.includes("toddler")) return ["parenting", "newparents"];
  if (s.includes("crypto")) return ["cryptocurrency", "bitcoin"];
  if (s.includes("stock") || s.includes("earnings") || s.includes("invest")) return ["stocks", "investing", "wallstreetbets"];
  if (s.includes("iran") || s.includes("war") || s.includes("election")) return ["worldnews", "news", "politics"];
  return SUBS;
}
