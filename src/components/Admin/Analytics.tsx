import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, TrendingUp, Eye, FileText, Calendar, Activity } from "lucide-react";

interface DashboardStats {
  totalNewsViews: number;
  totalPageViews: number;
  totalNewsArticles: number;
  totalEvents: number;
  recentViews: number;
}

interface TopNews {
  _id: string;
  views: number;
  title: string;
  date: string;
  imageUrl: string;
}

interface ViewsData {
  date: string;
  count: number;
}

interface PageBreakdown {
  page: string;
  views: number;
}

export default function Analytics() {
  const navigate = useNavigate();

  // Fetch dashboard stats
  const { data: stats, isLoading: statsLoading } = useQuery<DashboardStats>({
    queryKey: ['analytics-stats'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/api/analytics/stats', {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch stats');
      return res.json();
    },
  });

  // Fetch top news
  const { data: topNews = [], isLoading: topNewsLoading } = useQuery<TopNews[]>({
    queryKey: ['analytics-top-news'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/api/analytics/top-news?limit=10', {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch top news');
      return res.json();
    },
  });

  // Fetch views over time
  const { data: viewsOverTime = [], isLoading: viewsLoading } = useQuery<ViewsData[]>({
    queryKey: ['analytics-views-over-time'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/api/analytics/views-over-time?days=30', {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch views over time');
      return res.json();
    },
  });

  // Fetch page breakdown
  const { data: pageBreakdown = [], isLoading: pageLoading } = useQuery<PageBreakdown[]>({
    queryKey: ['analytics-page-breakdown'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/api/analytics/page-breakdown', {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch page breakdown');
      return res.json();
    },
  });

  if (statsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading analytics...</div>
      </div>
    );
  }

  const maxViews = Math.max(...viewsOverTime.map(v => v.count), 1);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <button
              onClick={() => navigate('/admin')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </button>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <div className="hidden sm:block sm:w-24 md:w-32"></div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="text-blue-500" size={20} />
              <h3 className="text-xs md:text-sm font-medium text-gray-600">News Views</h3>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">{stats?.totalNewsViews || 0}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-green-500" size={20} />
              <h3 className="text-xs md:text-sm font-medium text-gray-600">Page Views</h3>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">{stats?.totalPageViews || 0}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="text-purple-500" size={20} />
              <h3 className="text-xs md:text-sm font-medium text-gray-600">Articles</h3>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">{stats?.totalNewsArticles || 0}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="text-orange-500" size={20} />
              <h3 className="text-xs md:text-sm font-medium text-gray-600">Events</h3>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">{stats?.totalEvents || 0}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="text-red-500" size={20} />
              <h3 className="text-xs md:text-sm font-medium text-gray-600">Last 30 Days</h3>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">{stats?.recentViews || 0}</p>
          </div>
        </div>

        {/* Views Chart */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Views Over Time (Last 30 Days)</h2>
          {viewsLoading ? (
            <div className="text-center py-8 text-gray-500">Loading chart...</div>
          ) : viewsOverTime.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No data available</div>
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-[600px]">
                <div className="flex items-end justify-between gap-1 h-48">
                  {viewsOverTime.map((item, index) => {
                    const height = (item.count / maxViews) * 100;
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="w-full flex items-end justify-center h-40">
                          <div
                            className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-all cursor-pointer"
                            style={{ height: `${height}%` }}
                            title={`${item.date}: ${item.count} views`}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-2 rotate-45 origin-left whitespace-nowrap">
                          {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top News Articles */}
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Top News Articles</h2>
            {topNewsLoading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : topNews.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No news views yet</div>
            ) : (
              <div className="space-y-3">
                {topNews.map((news, index) => (
                  <div key={news._id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    {news.imageUrl && (
                      <img src={news.imageUrl} alt="" className="w-12 h-12 object-cover rounded" />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 text-sm truncate">{news.title}</h3>
                      <p className="text-xs text-gray-500">
                        {new Date(news.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p className="text-lg font-bold text-blue-600">{news.views}</p>
                      <p className="text-xs text-gray-500">views</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Popular Pages */}
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Popular Pages</h2>
            {pageLoading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : pageBreakdown.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No page views yet</div>
            ) : (
              <div className="space-y-3">
                {pageBreakdown.map((page, index) => (
                  <div key={index} className="p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900 truncate">{page.page}</span>
                      <span className="text-sm font-bold text-gray-900">{page.views}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${(page.views / (pageBreakdown[0]?.views || 1)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
