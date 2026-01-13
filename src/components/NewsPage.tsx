import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import NewsCard from './ui/NewsCard';
import { getAllLocalizedNews } from '../data/localizedNewsData';
import { useCommonTranslation, useNewsPageTranslation } from '../translations/useTranslation';
import { useAtom } from 'jotai';
import { Language } from '../store/ThemeAtom';

const NewsPage = () => {
  const { t: commonT } = useCommonTranslation();
  const { t } = useNewsPageTranslation();
  const [language] = useAtom(Language);

  // Fetch dynamic news from API
  const { data: dynamicNews, isLoading: newsLoading } = useQuery({
    queryKey: ['all-published-news'],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/news/fetch");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch news");
      // Only show published news
      return (data.data || []).filter((n: any) => n.status === 'published');
    },
    retry: 1,
  });

  // Use dynamic news if available, fallback to static
  const newsItems = dynamicNews && dynamicNews.length > 0 
    ? dynamicNews.map((news: any) => ({
        id: news._id,
        title: news.title,
        excerpt: news.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
        thumbnailUrl: news.image,
        imageUrl: news.image,
      }))
    : getAllLocalizedNews(language);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t?.hero.title || "Latest News & Updates"}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t?.hero.subtitle || "Stay informed with the latest news, updates, and announcements from"} {commonT?.school.fullName || "Mongol Aspiration International School"}
            </p>
          </motion.div>
        </div>
      </div>

      {/* News Grid */}
      <div className="container mx-auto px-4 py-12">
        {newsLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-t-2 border-b-2 border-accent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading news...</p>
            </div>
          </div>
        ) : newsItems.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <p className="text-gray-600 text-lg">No news articles available at the moment.</p>
            </div>
          </div>
        ) : (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {newsItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}              >                <NewsCard
                  title={item.title}
                  excerpt={item.excerpt}
                  imageUrl={item.imageUrl}
                  thumbnailUrl={item.thumbnailUrl}
                  href={`/news/${item.id}`}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            to="/"
            className="inline-flex items-center text-accent hover:text-accent-dark transition-colors"
          >            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            {t?.backToHome || "Back to Home"}
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NewsPage;
