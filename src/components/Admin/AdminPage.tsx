import { FaNewspaper, FaUsers, FaUserGraduate} from "react-icons/fa";
import { FaCalendarDays, FaChartLine } from "react-icons/fa6";
import { FaCheckCircle, FaUserPlus, FaBell } from "react-icons/fa";
import { MdOutlineAccessTimeFilled, MdAdd, MdSettings, MdDashboard, MdLogout } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { IoCalendarOutline, IoStatsChart } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useAuthUser } from "../../hooks/useAuthUser";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  category: string;
  location?: string;
  isAllDay: boolean;
}

const AdminPage = () => {
  const { data: authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Logout failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.setQueryData(["authUser"], null);
      toast.success("Logged out successfully");
      navigate("/admin/login");
    },
    onError: () => {
      toast.error("Failed to logout");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // Permission checks
  const canAccessNews = authUser?.permission === 'super_admin' || 
                        authUser?.permission === 'admin' || 
                        authUser?.permission === 'editor';
  
  const canAccessUserManagement = authUser?.permission === 'super_admin';
  
  const canAccessCalendar = authUser?.permission === 'super_admin' || 
                            authUser?.permission === 'admin' ||
                            authUser?.permission === 'editor';
  
  const canAccessAnalytics = authUser?.permission === 'super_admin' || 
                             authUser?.permission === 'admin';

  const handleNavigationClick = (e: React.MouseEvent<HTMLAnchorElement>, hasPermission: boolean, feature: string) => {
    if (!hasPermission) {
      e.preventDefault();
      toast.error(`You don't have permission to access ${feature}`);
    }
  };

  // Fetch real stats
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [adminsRes, newsRes, eventsRes] = await Promise.all([
        fetch('http://localhost:5000/api/admins', { credentials: 'include' }),
        fetch('http://localhost:5000/api/news', { credentials: 'include' }),
        fetch('http://localhost:5000/api/events', { credentials: 'include' })
      ]);
      
      const admins = adminsRes.ok ? await adminsRes.json() : [];
      const newsData = newsRes.ok ? await newsRes.json() : [];
      const events = eventsRes.ok ? await eventsRes.json() : [];
      
      return {
        admins: admins.length || 0,
        news: newsData.length || 0,
        events: events.length || 0,
      };
    },
  });

  // Format last login
  const formatLastLogin = (date: string | null | undefined) => {
    if (!date) return 'Never';
    const loginDate = new Date(date);
    const now = new Date();
    const diff = now.getTime() - loginDate.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return loginDate.toLocaleDateString();
  };

  // Fetch upcoming events
  const { data: upcomingEvents = [] } = useQuery<Event[]>({
    queryKey: ['upcoming-events'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/api/events', {
        credentials: 'include',
      });
      if (!res.ok) return [];
      const events: Event[] = await res.json();
      
      // Filter upcoming events (future only) and sort by date
      const now = new Date();
      return events
        .filter((event) => new Date(event.date) >= now)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 5); // Show only next 5 events
    },
  });

  // Fetch recent activities from news and events
  const { data: recentActivities = [] } = useQuery({
    queryKey: ['recent-activities'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/api/activities/recent', { 
        credentials: 'include' 
      });
      if (!res.ok) return [];
      return res.json();
    },
  });

  return (
    <>
      <div className="w-full h-full flex flex-col p-6">
        {/* Dashboard Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">School Administration Dashboard</h1>
            <div className="flex items-center text-sm text-gray-500">
              <MdDashboard className="mr-1" />
              <span>Welcome to MAIS Admin Portal</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <MdLogout />
            <span>{logoutMutation.isPending ? "Logging out..." : "Logout"}</span>
          </button>
        </div>

        {/* Main Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Link 
            to="/admin/news" 
            className="block"
            onClick={(e) => handleNavigationClick(e, canAccessNews, 'News Management')}
          >
            <div className={`h-24 border bg-white rounded-lg flex items-center p-4 shadow-sm transition-all ${
              canAccessNews ? 'hover:shadow-md cursor-pointer' : 'opacity-50 cursor-not-allowed'
            }`}>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex justify-center items-center mr-4">
                <FaNewspaper className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">News Management</h3>
                <p className="text-sm text-gray-500">Manage and approve articles</p>
              </div>
            </div>
          </Link>
          
          <Link 
            to="/admin/publish" 
            className="block"
            onClick={(e) => handleNavigationClick(e, canAccessNews, 'Create News')}
          >
            <div className={`h-24 border bg-white rounded-lg flex items-center p-4 shadow-sm transition-all ${
              canAccessNews ? 'hover:shadow-md cursor-pointer' : 'opacity-50 cursor-not-allowed'
            }`}>
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex justify-center items-center mr-4">
                <FaNewspaper className="text-indigo-600 text-xl" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Create News</h3>
                <p className="text-sm text-gray-500">Publish new articles</p>
              </div>
            </div>
          </Link>
          
          <Link 
            to="/admin/users" 
            className="block"
            onClick={(e) => handleNavigationClick(e, canAccessUserManagement, 'User Management')}
          >
            <div className={`h-24 border bg-white rounded-lg flex items-center p-4 shadow-sm transition-all ${
              canAccessUserManagement ? 'hover:shadow-md cursor-pointer' : 'opacity-50 cursor-not-allowed'
            }`}>
              <div className="w-12 h-12 bg-green-100 rounded-full flex justify-center items-center mr-4">
                <FaUsers className="text-green-600 text-xl" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">User Management</h3>
                <p className="text-sm text-gray-500">Manage staff and students</p>
              </div>
            </div>
          </Link>
          
          <Link 
            to="/admin/calendar" 
            className="block"
            onClick={(e) => handleNavigationClick(e, canAccessCalendar, 'Calendar')}
          >
            <div className={`h-24 border bg-white rounded-lg flex items-center p-4 shadow-sm transition-all ${
              canAccessCalendar ? 'hover:shadow-md cursor-pointer' : 'opacity-50 cursor-not-allowed'
            }`}>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex justify-center items-center mr-4">
                <FaCalendarDays className="text-purple-600 text-xl" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Calendar</h3>
                <p className="text-sm text-gray-500">Schedule and manage events</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Statistics Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          <div className="border bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex justify-center items-center">
                <FaUsers className="text-blue-600 text-sm" />
              </div>
              <span className="text-xs text-gray-500">Admins</span>
            </div>
            <p className="text-xl font-bold text-gray-800">{stats?.admins || 0}</p>
          </div>
          
          <div className="border bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex justify-center items-center">
                <FaNewspaper className="text-purple-600 text-sm" />
              </div>
              <span className="text-xs text-gray-500">News</span>
            </div>
            <p className="text-xl font-bold text-gray-800">{stats?.news || 0}</p>
          </div>
          
          <div className="border bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex justify-center items-center">
                <FaCalendarDays className="text-amber-600 text-sm" />
              </div>
              <span className="text-xs text-gray-500">Events</span>
            </div>
            <p className="text-xl font-bold text-gray-800">{stats?.events || 0}</p>
          </div>
          
          <div className="border bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex justify-center items-center">
                <FaCheckCircle className="text-emerald-600 text-sm" />
              </div>
              <span className="text-xs text-gray-500">Status</span>
            </div>
            <p className="text-xl font-bold text-emerald-600 capitalize">Operational</p>
          </div>
          
          <div className="border bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex justify-center items-center">
                <MdOutlineAccessTimeFilled className="text-gray-600 text-sm" />
              </div>
              <span className="text-xs text-gray-500">Last Login</span>
            </div>
            <p className="text-sm font-bold text-gray-800">{formatLastLogin(authUser?.lastLogin)}</p>
          </div>
        </div>

        {/* Main Content - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white border rounded-lg shadow-sm h-full">
              <div className="p-4 border-b">
                <h2 className="font-semibold text-gray-800">Quick Actions</h2>
              </div>
              <div className="p-4 space-y-3">
                {canAccessNews && (
                  <Link to="/admin/publish" className="flex items-center justify-start w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md text-sm transition-colors">
                    <MdAdd className="mr-2" />
                    Create News Article
                  </Link>
                )}
                {canAccessNews && (
                  <Link to="/admin/news" className="flex items-center justify-start w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-md text-sm transition-colors">
                    <FaNewspaper className="mr-2" />
                    Manage News
                  </Link>
                )}
                {canAccessUserManagement && (
                  <Link to="/admin/users" className="flex items-center justify-start w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-md text-sm transition-colors">
                    <FaUserPlus className="mr-2" />
                    Manage Users
                  </Link>
                )}
                {canAccessCalendar && (
                  <Link to="/admin/calendar" className="flex items-center justify-start w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-md text-sm transition-colors">
                    <IoCalendarOutline className="mr-2" />
                    Manage Events
                  </Link>
                )}
              </div>
            </div>
          </div>
          
          {/* Two Panels */}
          <div className="lg:col-span-2 grid grid-cols-1 gap-6">
            {/* Recent Activities Panel */}
            <div className="bg-white border rounded-lg shadow-sm">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-semibold text-gray-800">Recent Activities</h2>
                <Link to="/admin/news" className="text-sm text-blue-600 hover:underline">View all news</Link>
              </div>
              <div className="p-4 divide-y">
                {recentActivities.length === 0 ? (
                  <div className="text-center py-6 text-gray-500">
                    <p>No recent activities</p>
                  </div>
                ) : (
                  recentActivities.map((activity: any, index: number) => (
                    <div key={index} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex items-start">
                        <ActivityIcon type={activity.action} />
                        <div className="ml-3">
                          <p className="text-sm text-gray-800">{activity.description}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                            <span>{activity.actor?.username || 'System'}</span>
                            <span>•</span>
                            <span>{formatLastLogin(activity.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            
            {/* Upcoming Events Panel */}
            <div className="bg-white border rounded-lg shadow-sm">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-semibold text-gray-800">Upcoming Events</h2>
                <Link to="/admin/calendar" className="text-sm text-blue-600 hover:underline">View Calendar</Link>
              </div>
              <div className="p-4">
                {upcomingEvents.length === 0 ? (
                  <div className="text-center py-6 text-gray-500">
                    <p className="mb-2">No upcoming events</p>
                    <Link 
                      to="/admin/calendar" 
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Add your first event
                    </Link>
                  </div>
                ) : (
                  <>
                    {upcomingEvents.map((event) => {
                      const eventDate = new Date(event.date);
                      const monthShort = eventDate.toLocaleDateString('en-US', { month: 'short' });
                      const day = eventDate.getDate();
                      const dateStr = eventDate.toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      });
                      const timeStr = eventDate.toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      });
                      
                      return (
                        <div key={event._id} className="mb-4 last:mb-0">
                          <div className="flex items-start">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex flex-col items-center justify-center mr-3 border border-blue-100">
                              <span className="text-xs font-medium text-blue-700">{monthShort}</span>
                              <span className="text-sm font-bold text-blue-800">{day}</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-800">{event.title}</p>
                              <div className="flex items-center text-xs text-gray-500">
                                <span>{dateStr}</span>
                                <span className="mx-1">•</span>
                                <span>{timeStr}</span>
                              </div>
                              {event.location && (
                                <p className="text-xs text-gray-500 mt-1">📍 {event.location}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="mt-3 pt-3 border-t">
                      <Link 
                        to="/admin/calendar" 
                        className="block w-full text-center text-sm text-blue-600 hover:text-blue-800"
                      >
                        Add events
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="footer mt-6 border-t pt-4 px-6 pb-4 bg-gray-50">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex mb-2 md:mb-0">
            <span className="text-gray-500 border-r border-gray-300 pr-2">
              MAIS Admin Portal v1.1.0
            </span>
            <span className="text-gray-500 pl-2">
              © 2025 MAIS. All rights reserved.
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500">
              Last updated: April 14, 2025
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

type ActivityType = 'news_created' | 'news_updated' | 'news_deleted' | 'news_submitted' | 'news_approved' | 'news_rejected' | 'event_created' | 'event_updated' | 'event_deleted' | 'admin_login' | string;

const ActivityIcon = ({ type }: { type: ActivityType }) => {
  if (type.startsWith('news_')) {
    const colorClass = type === 'news_approved' ? 'bg-green-100 text-green-600' :
                       type === 'news_rejected' ? 'bg-red-100 text-red-600' :
                       type === 'news_deleted' ? 'bg-red-100 text-red-600' :
                       'bg-blue-100 text-blue-600';
    return (
      <div className={`w-8 h-8 ${colorClass} rounded-full flex items-center justify-center flex-shrink-0`}>
        <FaNewspaper className="text-sm" />
      </div>
    );
  }
  
  if (type.startsWith('event_')) {
    const colorClass = type === 'event_deleted' ? 'bg-red-100 text-red-600' : 'bg-purple-100 text-purple-600';
    return (
      <div className={`w-8 h-8 ${colorClass} rounded-full flex items-center justify-center flex-shrink-0`}>
        <FaCalendarDays className="text-sm" />
      </div>
    );
  }
  
  if (type === 'admin_login') {
    return (
      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
        <FaUsers className="text-gray-600 text-sm" />
      </div>
    );
  }
  
  return (
    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
      <FaBell className="text-gray-600 text-sm" />
    </div>
  );
};

export default AdminPage;