export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
}

export const newsData: NewsItem[] = [];

export const getNewsById = (id: number): NewsItem | undefined => {
  return newsData.find(news => news.id === id);
};

export const getAllNews = (): NewsItem[] => {
  return newsData;
};
