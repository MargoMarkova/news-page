import { IAPI, NewsItem } from "./api";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class FakeAPI implements IAPI {
  private data: NewsItem[] = [];

  constructor() {
    fetch("/news.json")
      .then((response) => response.json())
      .then((json) => (this.data = json));
  }

  async getAllNews(): Promise<NewsItem[]> {
    await delay(100);
    return this.data;
  }

  async getNews(slug: string): Promise<NewsItem> {
    await delay(100);
    const item = this.data.find((newsItem) => newsItem.slug === slug);
    if (!item) throw new Error(`Do not have any news with slug=${slug}`);
    return item;
  }
}
