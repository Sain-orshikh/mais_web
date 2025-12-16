import { FaNewspaper, FaUsers, FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import { FaCalendarDays, FaChartLine } from "react-icons/fa6";
import { FaCheckCircle, FaUserPlus, FaBell } from "react-icons/fa";
import { MdOutlineAccessTimeFilled, MdAdd, MdSettings, MdDashboard } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { IoCalendarOutline, IoStatsChart } from "react-icons/io5";
import { useState } from "react";
import { Link } from "react-router-dom";

const AdminPage = () => {
  const [users] = useState(100);
  const [students] = useState(480);
  const [staff] = useState(45);
  const [news] = useState(50);
  const [status] = useState("operational");
  const [lastLogin] = useState("2h ago");

  // Sample recent activity data (would come from API in real implementation)
  const recentActivities = [
    { type: "profile", message: "Student profile updated - Bat-Erdene M.", time: "1h ago" },
    { type: "announcement", message: "New announcement published - Spring Festival", time: "3h ago" },
    { type: "enrollment", message: "New student enrolled - Narantsetseg B.", time: "5h ago" },
    { type: "grade", message: "Grades updated - 11th Grade Physics", time: "Yesterday" },
    { type: "event", message: "New event scheduled - Science Fair", time: "Yesterday" },
  ];

  // Sample upcoming events (would come from API in real implementation)
  const upcomingEvents = [
    { name: "Staff Meeting", date: "April 15, 2025", time: "09:00 AM" },
    { name: "Science Fair", date: "April 20, 2025", time: "01:00 PM" },
    { name: "Parent-Teacher Conference", date: "April 25, 2025", time: "04:00 PM" },
  ];

  return (
    <>
      <div className="w-full h-full flex flex-col p-6">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">School Administration Dashboard</h1>
          <div className="flex items-center text-sm text-gray-500">
            <MdDashboard className="mr-1" />
            <span>Welcome to MAIS Admin Portal</span>
          </div>
        </div>

        {/* Main Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Link to="/admin/publish" className="block">
            <div className="h-24 border bg-white rounded-lg flex items-center p-4 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex justify-center items-center mr-4">
                <FaNewspaper className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">News Management</h3>
                <p className="text-sm text-gray-500">Publish and manage articles</p>
              </div>
            </div>
          </Link>
          
          <Link to="/admin/create" className="block">
            <div className="h-24 border bg-white rounded-lg flex items-center p-4 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-green-100 rounded-full flex justify-center items-center mr-4">
                <FaUsers className="text-green-600 text-xl" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">User Management</h3>
                <p className="text-sm text-gray-500">Manage staff and students</p>
              </div>
            </div>
          </Link>
          
          <Link to="#" className="block">
            <div className="h-24 border bg-white rounded-lg flex items-center p-4 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex justify-center items-center mr-4">
                <FaCalendarDays className="text-purple-600 text-xl" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Calendar</h3>
                <p className="text-sm text-gray-500">Schedule and manage events</p>
              </div>
            </div>
          </Link>
          
          <Link to="#" className="block">
            <div className="h-24 border bg-white rounded-lg flex items-center p-4 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex justify-center items-center mr-4">
                <FaChartLine className="text-amber-600 text-xl" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Analytics</h3>
                <p className="text-sm text-gray-500">View reports and statistics</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Statistics Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="border bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex justify-center items-center">
                <FaUsers className="text-blue-600 text-sm" />
              </div>
              <span className="text-xs text-gray-500">Users</span>
            </div>
            <p className="text-xl font-bold text-gray-800">{users}</p>
          </div>
          
          <div className="border bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex justify-center items-center">
                <FaUserGraduate className="text-green-600 text-sm" />
              </div>
              <span className="text-xs text-gray-500">Students</span>
            </div>
            <p className="text-xl font-bold text-gray-800">{students}</p>
          </div>
          
          <div className="border bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex justify-center items-center">
                <FaChalkboardTeacher className="text-amber-600 text-sm" />
              </div>
              <span className="text-xs text-gray-500">Staff</span>
            </div>
            <p className="text-xl font-bold text-gray-800">{staff}</p>
          </div>
          
          <div className="border bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex justify-center items-center">
                <FaNewspaper className="text-purple-600 text-sm" />
              </div>
              <span className="text-xs text-gray-500">News</span>
            </div>
            <p className="text-xl font-bold text-gray-800">{news}</p>
          </div>
          
          <div className="border bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex justify-center items-center">
                <FaCheckCircle className="text-emerald-600 text-sm" />
              </div>
              <span className="text-xs text-gray-500">Status</span>
            </div>
            <p className="text-xl font-bold text-emerald-600 capitalize">{status}</p>
          </div>
          
          <div className="border bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex justify-center items-center">
                <MdOutlineAccessTimeFilled className="text-gray-600 text-sm" />
              </div>
              <span className="text-xs text-gray-500">Last Login</span>
            </div>
            <p className="text-xl font-bold text-gray-800">{lastLogin}</p>
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
                <Link to="/admin/publish" className="flex items-center justify-start w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md text-sm">
                  <MdAdd className="mr-2" />
                  Create News Article
                </Link>
                <Link to="/admin/create" className="flex items-center justify-start w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded-md text-sm">
                  <FaUserPlus className="mr-2" />
                  Add New User
                </Link>
                <button className="flex items-center justify-start w-full bg-amber-600 hover:bg-amber-700 text-white p-2 rounded-md text-sm">
                  <IoCalendarOutline className="mr-2" />
                  Schedule Event
                </button>
                <button className="flex items-center justify-start w-full bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-md text-sm">
                  <FaBell className="mr-2" />
                  Send Notification
                </button>
                <button className="flex items-center justify-start w-full bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-md text-sm">
                  <BiSolidReport className="mr-2" />
                  Generate Report
                </button>
                <button className="flex items-center justify-start w-full border border-gray-300 hover:bg-gray-50 text-gray-700 p-2 rounded-md text-sm">
                  <MdSettings className="mr-2" />
                  System Settings
                </button>
              </div>
            </div>
          </div>
          
          {/* Two Panels */}
          <div className="lg:col-span-2 grid grid-cols-1 gap-6">
            {/* Recent Activities Panel */}
            <div className="bg-white border rounded-lg shadow-sm">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-semibold text-gray-800">Recent Activities</h2>
                <Link to="#" className="text-sm text-blue-600 hover:underline">View all</Link>
              </div>
              <div className="p-4 divide-y">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="py-3 first:pt-0 last:pb-0">
                    <div className="flex items-start">
                      <ActivityIcon type={activity.type} />
                      <div className="ml-3">
                        <p className="text-sm text-gray-800">{activity.message}</p>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Upcoming Events Panel */}
            <div className="bg-white border rounded-lg shadow-sm">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-semibold text-gray-800">Upcoming Events</h2>
                <Link to="#" className="text-sm text-blue-600 hover:underline">View calendar</Link>
              </div>
              <div className="p-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex flex-col items-center justify-center mr-3 border border-blue-100">
                        <span className="text-xs font-medium text-blue-700">
                          {event.date.split(", ")[0].split(" ")[1]}
                        </span>
                        <span className="text-sm font-bold text-blue-800">
                          {event.date.split(" ")[1].replace(",", "")}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{event.name}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <span>{event.date}</span>
                          <span className="mx-1">•</span>
                          <span>{event.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-3 pt-3 border-t">
                  <button className="w-full text-sm text-blue-600 hover:text-blue-800">
                    + Add new event
                  </button>
                </div>
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

type ActivityType = 'profile' | 'announcement' | 'enrollment' | 'grade' | 'event' | string;

const ActivityIcon = ({ type }: { type: ActivityType }) => {
  switch (type) {
    case 'profile':
      return (
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <FaUsers className="text-blue-600 text-sm" />
        </div>
      );
    case 'announcement':
      return (
        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
          <FaNewspaper className="text-amber-600 text-sm" />
        </div>
      );
    case 'enrollment':
      return (
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <FaUserGraduate className="text-green-600 text-sm" />
        </div>
      );
    case 'grade':
      return (
        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
          <IoStatsChart className="text-purple-600 text-sm" />
        </div>
      );
    case 'event':
      return (
        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
          <FaCalendarDays className="text-red-600 text-sm" />
        </div>
      );
    default:
      return (
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
          <FaBell className="text-gray-600 text-sm" />
        </div>
      );
  }
};

export default AdminPage;