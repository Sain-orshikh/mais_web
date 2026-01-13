import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthUser } from "../../hooks/useAuthUser";
import { API_BASE_URL } from '../../config/api';
import toast from "react-hot-toast";
import { 
  FaArrowLeft, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaCheck, 
  FaTimes,
  FaClock,
  FaFileAlt
} from "react-icons/fa";
import { MdClose } from "react-icons/md";

interface News {
  _id: string;
  title: string;
  content: string;
  category: string;
  image: string;
  author: string;
  status: 'draft' | 'pending' | 'published';
  createdBy?: {
    _id: string;
    username: string;
  };
  approvedBy?: {
    _id: string;
    username: string;
  };
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export default function NewsManagement() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: authUser } = useAuthUser();
  
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'pending' | 'published'>('all');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [previewNews, setPreviewNews] = useState<News | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const canApprove = authUser?.permission === 'admin' || authUser?.permission === 'super_admin';

  // Fetch all news
  const { data: allNews = [], isLoading, error: fetchError } = useQuery<News[]>({
    queryKey: ['admin-news'],
    queryFn: async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/news/fetch`, {
          credentials: 'include',
        });
        const data = await res.json();
        if (!res.ok) {
          console.error('API Error:', data);
          throw new Error(data.error || 'Failed to fetch news');
        }
        console.log('Fetched news:', data);
        return data.data || [];
      } catch (err) {
        console.error('Fetch error:', err);
        throw err;
      }
    },
    retry: 1,
  });

  // Filter news
  const filteredNews = allNews.filter(news => {
    const newsStatus = news.status || 'draft';
    const matchesStatus = statusFilter === 'all' || newsStatus === statusFilter;
    const matchesSearch = news.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         news.author?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/api/news/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to delete news');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-news'] });
      toast.success('News deleted successfully');
      setDeleteConfirm(null);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Submit for approval mutation
  const submitMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/api/news/${id}/submit`, {
        method: 'PUT',
        credentials: 'include',
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to submit');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-news'] });
      toast.success('News submitted for approval');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Approve mutation
  const approveMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/api/news/${id}/approve`, {
        method: 'PUT',
        credentials: 'include',
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to approve');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-news'] });
      toast.success('News approved and published');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Reject mutation
  const rejectMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/api/news/${id}/reject`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ reason: 'Needs revision' }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to reject');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-news'] });
      toast.success('News rejected and sent back to draft');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      draft: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
      published: 'bg-green-100 text-green-800',
    };
    return styles[status as keyof typeof styles] || styles.draft;
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      draft: <FaFileAlt className="inline mr-1" />,
      pending: <FaClock className="inline mr-1" />,
      published: <FaCheck className="inline mr-1" />,
    };
    return icons[status as keyof typeof icons] || null;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading news...</p>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading News</h2>
          <p className="text-gray-600 mb-4">{(fetchError as Error).message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-6 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <FaArrowLeft />
          <span>Back to Dashboard</span>
        </button>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">News Management</h1>
            <p className="text-sm text-gray-500">
              Manage and publish news articles
            </p>
          </div>
          
          <button
            onClick={() => navigate("/admin/publish")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            <FaPlus />
            <span>Create New Article</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 rounded-md transition-colors ${
                statusFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({allNews.length})
            </button>
            <button
              onClick={() => setStatusFilter('draft')}
              className={`px-4 py-2 rounded-md transition-colors ${
                statusFilter === 'draft'
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Draft ({allNews.filter(n => (n.status || 'draft') === 'draft').length})
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-4 py-2 rounded-md transition-colors ${
                statusFilter === 'pending'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending ({allNews.filter(n => (n.status || 'draft') === 'pending').length})
            </button>
            <button
              onClick={() => setStatusFilter('published')}
              className={`px-4 py-2 rounded-md transition-colors ${
                statusFilter === 'published'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Published ({allNews.filter(n => (n.status || 'draft') === 'published').length})
            </button>
          </div>
        </div>
      </div>

      {/* News List */}
      {filteredNews.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <FaFileAlt className="text-gray-300 text-6xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No news articles found</h3>
          <p className="text-gray-500 mb-6">
            {statusFilter === 'all' 
              ? 'Start by creating your first article'
              : `No articles with status: ${statusFilter}`
            }
          </p>
          <button
            onClick={() => navigate("/admin/publish")}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            Create Article
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Article
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredNews.map((news) => (
                  <tr key={news._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={news.image}
                          alt={news.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900 line-clamp-2">
                            {news.title}
                          </div>
                          {news.createdBy && (
                            <div className="text-xs text-gray-500">
                              by {news.createdBy.username}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {news.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {news.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(news.status || 'draft')}`}>
                        {getStatusIcon(news.status || 'draft')}
                        {(news.status || 'draft').charAt(0).toUpperCase() + (news.status || 'draft').slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(news.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setPreviewNews(news)}
                          className="text-blue-600 hover:text-blue-900 p-2"
                          title="Preview"
                        >
                          <FaEye />
                        </button>
                        
                        <button
                          onClick={() => navigate(`/admin/edit-news/${news._id}`)}
                          className="text-green-600 hover:text-green-900 p-2"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        
                        {news.status === 'draft' && (
                          <button
                            onClick={() => submitMutation.mutate(news._id)}
                            className="text-yellow-600 hover:text-yellow-900 p-2"
                            title="Submit for approval"
                          >
                            <FaClock />
                          </button>
                        )}
                        
                        {canApprove && news.status === 'pending' && (
                          <>
                            <button
                              onClick={() => approveMutation.mutate(news._id)}
                              className="text-green-600 hover:text-green-900 p-2"
                              title="Approve & Publish"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => rejectMutation.mutate(news._id)}
                              className="text-red-600 hover:text-red-900 p-2"
                              title="Reject"
                            >
                              <FaTimes />
                            </button>
                          </>
                        )}
                        
                        <button
                          onClick={() => setDeleteConfirm(news._id)}
                          className="text-red-600 hover:text-red-900 p-2"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this news article? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteMutation.mutate(deleteConfirm)}
                disabled={deleteMutation.isPending}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors disabled:opacity-50"
              >
                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewNews && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={() => setPreviewNews(null)}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-colors"
            >
              <MdClose size={24} />
            </button>

            {/* Card-style Preview matching homepage */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={previewNews.image}
                  alt={previewNews.title}
                  className="w-full h-full object-fill"
                />
              </div>

              {/* Content Section */}
              <div className="p-8">
                {/* Status Badge */}
                <div className="mb-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(previewNews.status || 'draft')}`}>
                    Status: {(previewNews.status || 'draft').toUpperCase()}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{previewNews.title}</h1>
                
                {/* Article Content */}
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: previewNews.content }}
                />
                
                {/* Approval Info */}
                {previewNews.approvedBy && (
                  <div className="mt-8 pt-6 border-t">
                    <p className="text-sm text-gray-600">
                      Approved by {previewNews.approvedBy.username} on{' '}
                      {new Date(previewNews.approvedAt!).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
