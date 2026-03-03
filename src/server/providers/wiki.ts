import type { SearchItem } from "@/server/types";

export async function searchWiki(q: string): Promise<SearchItem[]> {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(q)}`;
  const res = await fetch(url, { headers: { "User-Agent": "ClearPath/1.0" } });
  if (!res.ok) return [];
  const data: any = await res.json();

  if (!data?.content_urls?.desktop?.page) return [];
  return [
    {
      source: "wiki",
      title: data.title || q,
      url: data.content_urls.desktop.page,
      snippet: data.extract,
      image: data.thumbnail?.source,
    },
  ];
}
