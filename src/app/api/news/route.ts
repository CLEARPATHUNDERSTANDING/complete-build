import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.NEWSDATA_API_KEY;

  if (!apiKey || apiKey.startsWith('sk-abc')) {
    return NextResponse.json([
      {
        id: '1',
        title: 'Global Markets React to Fed Statements',
        summary: 'Central bank signals potential rate shifts in late Q4.',
        content: 'Full intelligence content locked.',
        url: '#',
        timestamp: new Date().toISOString(),
      }
    ]);
  }

  try {
    const res = await fetch(`https://newsdata.io/api/1/news?apikey=${apiKey}&q=finance,crypto&language=en`);
    const data = await res.json();

    const articles = (data.results || []).map((item: any, idx: number) => ({
      id: item.article_id || String(idx),
      title: item.title,
      summary: item.description || "No description available.",
      content: item.content || item.description,
      url: item.link,
      timestamp: item.pubDate,
    }));

    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: "News Sync Failed" }, { status: 500 });
  }
}
