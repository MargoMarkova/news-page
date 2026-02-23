export interface IAPI {
  getAllNews: () => Promise<NewsItem[]>;
  getNews: (slug: string) => Promise<NewsItem>;
}

export type NewsItem = {
	id: number;
	slug: string;
	title: string;
	date: string; // ISO
	summary: string;
	image: string;
	contentHeader: string;
	content: string[];
  };