import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from '../../config/api';
import NewsEditor from "./NewsEditor";
import { FaArrowLeft } from "react-icons/fa";

export default function EditNews() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: news, isLoading, error } = useQuery({
    queryKey: ['news', id],
    queryFn: async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/news/fetch/${id}`, {
          credentials: 'include',
        });
        if (!res.ok) {
          const errorData = await res.json();
          console.error('Error fetching news:', errorData);
          throw new Error(errorData.error || 'Failed to fetch news');
        }
        const data = await res.json();
        console.log('Fetched news for edit:', data);
        return data;
      } catch (err) {
        console.error('Fetch error in EditNews:', err);
        throw err;
      }
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Article Not Found</h2>
        <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/admin/news')}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          Back to News Management
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-white border-b px-6 py-4">
        <button
          onClick={() => navigate("/admin/news")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <FaArrowLeft />
          <span>Back to News Management</span>
        </button>
      </div>
      <div className="flex-1 bg-white overflow-auto">
        <NewsEditor existingNews={news} />
      </div>
    </div>
  );
}
