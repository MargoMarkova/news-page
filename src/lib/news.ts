// import fs from "fs";
import path from "path";

export type NewsItem = {
  id: string;
  slug: string;
  title: string;
  date: string;       // ISO
  excerpt: string;
  image: string;  
  contentHeader: string;
  content: string[];
};

const dataPath = path.join(process.cwd(), "data", "news.json");

export async function getAllNews(): Promise<NewsItem[]> {
  // const raw = fs.readFileSync(dataPath, "utf-8");
  // return JSON.parse(raw) as NewsItem[];

  await new Promise((r) => setTimeout(r, 500));

  const res = await fetch('http://localhost:3000/news.json', { cache: "no-store" });
  const data = (await res.json()) as NewsItem[];
  console.log('items', data)

  return data
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  console.log(slug)
  return (await getAllNews()).find((n) => n.slug === slug) ?? null;
}

export function formatRuDate(iso: string) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}