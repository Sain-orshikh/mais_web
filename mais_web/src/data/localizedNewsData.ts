import type { LanguageType } from '../store/ThemeAtom';
import { manualNewsData, type NewsItem } from './manualNewsData';

// Helper interface for localized news content
export interface LocalizedNewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  thumbnailUrl: string;
}

// Function to get news content in the specified language
export const getLocalizedNewsItem = (newsItem: NewsItem, language: LanguageType): LocalizedNewsItem => {
  const title = language === 'mn' && newsItem.titleMn ? newsItem.titleMn : newsItem.title;
  const content = language === 'mn' && newsItem.contentMn ? newsItem.contentMn : newsItem.content;
  const excerpt = language === 'mn' && newsItem.excerptMn ? newsItem.excerptMn : newsItem.excerpt;
  
  return {
    id: newsItem.id,
    title,
    excerpt: excerpt || createExcerpt(content),
    content,
    imageUrl: newsItem.imageUrl,
    thumbnailUrl: newsItem.thumbnailUrl
  };
};

// Get all news in specified language
export const getAllLocalizedNews = (language: LanguageType): LocalizedNewsItem[] => {
  return manualNewsData.map(item => getLocalizedNewsItem(item, language));
};

// Get news by ID in specified language
export const getLocalizedNewsById = (id: number, language: LanguageType): LocalizedNewsItem | undefined => {
  const newsItem = manualNewsData.find(item => item.id === id);
  if (!newsItem) return undefined;
  
  return getLocalizedNewsItem(newsItem, language);
};

// Helper function to create excerpt from content
function createExcerpt(content: string): string {
  // Remove HTML tags and get first 150 characters
  const cleanText = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  if (cleanText.length <= 150) {
    return cleanText;
  }
  return cleanText.substring(0, 150).trim() + '...';
}
