export type SearchItem = {
  source: "news" | "youtube" | "reddit" | "wiki";
  title: string;
  url: string;
  snippet?: string;
  image?: string;
  author?: string;
  publishedAt?: string;
};
