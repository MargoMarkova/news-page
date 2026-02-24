import { IAPI, NewsItem } from "./api";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export class FakeAPI implements IAPI {
  private buildUrl(endpoint: string): string {
    return `${BACKEND_URL}/${endpoint}`;
  }

  async getAllNews(): Promise<NewsItem[]> {
    await delay(100);
    const res = await fetch(this.buildUrl("news.json"));
    console.log(this.buildUrl("news.json"));
    if (!res.ok) throw new Error("Failed to fetch news");

    return res.json();
  }

  async getNews(slug: string): Promise<NewsItem> {
    const allNews = (await this.getAllNews()) as NewsItem[];
    const item = allNews.find((newsItem) => newsItem.slug === slug);
    if (!item) throw new Error(`Do not have any news with slug=${slug}`);
    return item;
  }
}
