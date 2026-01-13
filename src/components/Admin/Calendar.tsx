import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from '../../config/api';
import { ArrowLeft, Plus, Calendar as CalendarIcon, List, Filter, X, Edit2, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthUser } from "../../hooks/useAuthUser";

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  category: 'academic' | 'holiday' | 'sports' | 'cultural' | 'meeting' | 'other';
  location: string;
  isAllDay: boolean;
  createdBy: {
    _id: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
}

type ViewType = 'month' | 'list';

const categoryColors: Record<string, string> = {
  academic: 'bg-blue-500 text-blue-50',
  holiday: 'bg-red-500 text-red-50',
  sports: 'bg-green-500 text-green-50',
  cultural: 'bg-purple-500 text-purple-50',
  meeting: 'bg-yellow-500 text-yellow-900',
  other: 'bg-gray-500 text-gray-50',
};

const categoryLabels: Record<string, string> = {
  academic: 'Academic',
  holiday: 'Holiday',
  sports: 'Sports',
  cultural: 'Cultural',
  meeting: 'Meeting',
  other: 'Other',
};

export default function Calendar() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: authUser } = useAuthUser();
  
  // Check if user can modify events (admin or super_admin only)
  const canModifyEvents = authUser?.permission === 'admin' || authUser?.permission === 'super_admin';
  
  const [view, setView] = useState<ViewType>('month');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showEventModal, setShowEventModal] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    endDate: '',
    category: 'other' as Event['category'],
    location: '',
    isAllDay: false,
  });

  // Fetch events
  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/api/events`, {
        credentials: 'include',
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to fetch events');
      }
      return res.json();
    },
  });

  // Create event mutation
  const createEventMutation = useMutation({
    mutationFn: async (eventData: typeof formData) => {
      const res = await fetch(`${API_BASE_URL}/api/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(eventData),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to create event');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Event created successfully');
      resetForm();
      setShowEventModal(false);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Update event mutation
  const updateEventMutation = useMutation({
    mutationFn: async ({ id, eventData }: { id: string; eventData: typeof formData }) => {
      const res = await fetch(`${API_BASE_URL}/api/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(eventData),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to update event');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Event updated successfully');
      resetForm();
      setShowEventModal(false);
      setEditingEvent(null);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Delete event mutation
  const deleteEventMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/api/events/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to delete event');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Event deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      endDate: '',
      category: 'other',
      location: '',
      isAllDay: false,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.date) {
      toast.error('Title and date are required');
      return;
    }

    // Convert text date input to proper ISO format
    const formatDateForBackend = (dateStr: string) => {
      if (!dateStr) return '';
      
      // If already in ISO format (YYYY-MM-DDTHH:MM), return as is
      if (dateStr.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/)) {
        return dateStr;
      }
      
      // Try to parse various formats
      try {
        // Replace first space with T if format is "YYYY-MM-DD HH:MM"
        if (dateStr.match(/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}/)) {
          return dateStr.replace(/\s/, 'T');
        }
        
        // If other format, try to parse with Date
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) {
          return date.toISOString().slice(0, 16);
        }
      } catch (err) {
        console.error('Date parsing error:', err);
      }
      
      return dateStr;
    };

    const processedData = {
      ...formData,
      date: formatDateForBackend(formData.date),
      endDate: formData.endDate ? formatDateForBackend(formData.endDate) : '',
    };

    // Validate date format
    if (!processedData.date.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/)) {
      toast.error('Invalid date format. Use YYYY-MM-DD HH:MM');
      return;
    }

    if (editingEvent) {
      updateEventMutation.mutate({ id: editingEvent._id, eventData: processedData });
    } else {
      createEventMutation.mutate(processedData);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: new Date(event.date).toISOString().slice(0, 16),
      endDate: event.endDate ? new Date(event.endDate).toISOString().slice(0, 16) : '',
      category: event.category,
      location: event.location,
      isAllDay: event.isAllDay,
    });
    setShowEventModal(true);
  };

  const handleDelete = (id: string) => {
    setDeleteConfirmId(id);
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p className="font-medium">Delete this event?</p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                deleteEventMutation.mutate(id);
                toast.dismiss(t.id);
                setDeleteConfirmId(null);
              }}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            >
              Delete
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                setDeleteConfirmId(null);
              }}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
        position: 'top-center',
      }
    );
  };

  const handleCloseModal = () => {
    setShowEventModal(false);
    setEditingEvent(null);
    resetForm();
  };

  // Filter events by category
  const filteredEvents = useMemo(() => {
    if (selectedCategory === 'all') return events;
    return events.filter(event => event.category === selectedCategory);
  }, [events, selectedCategory]);

  // Get events for current month
  const monthEvents = useMemo(() => {
    const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1, 0, 0, 0);
    const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0, 23, 59, 59);
    
    return filteredEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= monthStart && eventDate <= monthEnd;
    });
  }, [filteredEvents, currentMonth]);

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    const days = [];
    
    // Add empty cells for days before the first day
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  }, [currentMonth]);

  const getEventsForDate = (date: Date) => {
    return monthEvents.filter(event => {
      const eventDate = new Date(event.date);
      // Compare only the date parts, ignoring time
      const eventDay = eventDate.getDate();
      const eventMonth = eventDate.getMonth();
      const eventYear = eventDate.getFullYear();
      
      return (
        eventDay === date.getDate() &&
        eventMonth === date.getMonth() &&
        eventYear === date.getFullYear()
      );
    });
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading calendar...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <button
              onClick={() => navigate('/admin')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </button>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Calendar Management</h1>
            <div className="hidden sm:block sm:w-24 md:w-32"></div>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* View Toggle */}
            <div className="flex gap-2 flex-1 lg:flex-initial">
              <button
                onClick={() => setView('month')}
                className={`flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg transition flex-1 sm:flex-initial ${
                  view === 'month'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <CalendarIcon size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Month</span>
              </button>
              <button
                onClick={() => setView('list')}
                className={`flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg transition flex-1 sm:flex-initial ${
                  view === 'list'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <List size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">List</span>
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-1 lg:flex-initial">
              <Filter size={18} className="text-gray-600 hidden sm:block" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex-1 lg:flex-initial px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <option value="all">All Categories</option>
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            {/* Add Event Button */}
            {canModifyEvents && (
              <button
                onClick={() => setShowEventModal(true)}
                className="flex items-center justify-center gap-1 sm:gap-2 bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-600 transition flex-1 lg:flex-initial text-sm sm:text-base"
              >
                <Plus size={18} className="sm:w-5 sm:h-5" />
                <span>Add Event</span>
              </button>
            )}
          </div>
        </div>

        {/* Month View */}
        {view === 'month' && (
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <button
                onClick={previousMonth}
                className="px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm sm:text-base"
              >
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </button>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <button
                onClick={nextMonth}
                className="px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm sm:text-base"
              >
                Next
              </button>
            </div>

            {/* Calendar Grid - Desktop */}
            <div className="hidden md:grid grid-cols-7 gap-2">
              {/* Day Headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-semibold text-gray-600 py-2">
                  {day}
                </div>
              ))}

              {/* Calendar Days */}
              {calendarDays.map((day, index) => {
                if (!day) {
                  return <div key={`empty-${index}`} className="min-h-[100px] bg-gray-50 rounded-lg"></div>;
                }

                const dayEvents = getEventsForDate(day);
                const isToday = 
                  day.getDate() === new Date().getDate() &&
                  day.getMonth() === new Date().getMonth() &&
                  day.getFullYear() === new Date().getFullYear();

                return (
                  <div
                    key={index}
                    className={`min-h-[100px] border rounded-lg p-2 ${
                      isToday ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className={`text-sm font-semibold mb-1 ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
                      {day.getDate()}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map(event => (
                        <div
                          key={event._id}
                          className={`text-xs px-2 py-1 rounded ${categoryColors[event.category]} ${canModifyEvents ? 'cursor-pointer' : 'cursor-default'} truncate`}
                          onClick={() => canModifyEvents && handleEdit(event)}
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-gray-500 px-2">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile List View */}
            <div className="md:hidden space-y-3">
              {monthEvents.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No events this month
                </div>
              ) : (
                monthEvents
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .map((event) => {
                    const eventDate = new Date(event.date);
                    const isToday = 
                      eventDate.getDate() === new Date().getDate() &&
                      eventDate.getMonth() === new Date().getMonth() &&
                      eventDate.getFullYear() === new Date().getFullYear();
                    
                    return (
                      <div
                        key={event._id}
                        className={`border rounded-lg p-3 ${
                          isToday ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-200'
                        } ${canModifyEvents ? 'cursor-pointer' : ''}`}
                        onClick={() => canModifyEvents && handleEdit(event)}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[event.category]}`}>
                                {categoryLabels[event.category]}
                              </span>
                              {isToday && (
                                <span className="text-xs font-semibold text-blue-600">Today</span>
                              )}
                            </div>
                            <h3 className="font-semibold text-gray-900">{event.title}</h3>
                          </div>
                          {canModifyEvents && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(event._id);
                              }}
                              className="text-gray-400 hover:text-red-500 p-1"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 mb-1">
                          📅 {eventDate.toLocaleDateString('en-US', { 
                            weekday: 'short',
                            month: 'short', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                        {event.location && (
                          <div className="text-sm text-gray-500">
                            📍 {event.location}
                          </div>
                        )}
                        {event.description && (
                          <div className="text-sm text-gray-600 mt-2 line-clamp-2">
                            {event.description}
                          </div>
                        )}
                      </div>
                    );
                  })
              )}
            </div>
          </div>
        )}

        {/* List View */}
        {view === 'list' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created By
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEvents.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No events found. Create your first event!
                    </td>
                  </tr>
                ) : (
                  filteredEvents.map((event) => (
                    <tr key={event._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{event.title}</div>
                        {event.description && (
                          <div className="text-sm text-gray-500 truncate max-w-md">{event.description}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(event.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${categoryColors[event.category]}`}>
                          {categoryLabels[event.category]}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {event.location || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {event.createdBy.username}
                      </td>
                      {canModifyEvents ? (
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(event)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(event._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      ) : (
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          View Only
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Event Modal */}
        {showEventModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingEvent ? 'Edit Event' : 'Create New Event'}
                  </h2>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-gray-600 transition"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date & Time *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.date}
                          onChange={(e) => {
                            setFormData({ ...formData, date: e.target.value });
                            // Auto-set end date to 1 hour after start if empty
                            if (!formData.endDate && e.target.value) {
                              try {
                                const startDate = new Date(e.target.value);
                                if (!isNaN(startDate.getTime())) {
                                  startDate.setHours(startDate.getHours() + 1);
                                  setFormData(prev => ({ 
                                    ...prev, 
                                    date: e.target.value,
                                    endDate: startDate.toISOString().slice(0, 16) 
                                  }));
                                }
                              } catch (err) {
                                // Invalid date, just update the field
                              }
                            }
                          }}
                          placeholder="2025-12-31 14:30"
                          className="w-full px-3 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                          required
                        />
                        <input
                          type="datetime-local"
                          onChange={(e) => {
                            setFormData({ ...formData, date: e.target.value });
                            if (!formData.endDate && e.target.value) {
                              const startDate = new Date(e.target.value);
                              startDate.setHours(startDate.getHours() + 1);
                              setFormData(prev => ({ 
                                ...prev, 
                                date: e.target.value,
                                endDate: startDate.toISOString().slice(0, 16) 
                              }));
                            }
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 opacity-0 cursor-pointer"
                          title="Pick date from calendar"
                        />
                        <CalendarIcon 
                          size={18} 
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" 
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Type directly or click calendar icon
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date & Time
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.endDate}
                          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                          placeholder="2025-12-31 15:30"
                          className="w-full px-3 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        />
                        <input
                          type="datetime-local"
                          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                          min={formData.date}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 opacity-0 cursor-pointer"
                          title="Pick date from calendar"
                        />
                        <CalendarIcon 
                          size={18} 
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" 
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Leave empty for single-point event
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as Event['category'] })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                      >
                        {Object.entries(categoryLabels).map(([key, label]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g., Main Auditorium, Room 101"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isAllDay"
                      checked={formData.isAllDay}
                      onChange={(e) => setFormData({ ...formData, isAllDay: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isAllDay" className="ml-2 block text-sm text-gray-900">
                      All Day Event
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={createEventMutation.isPending || updateEventMutation.isPending}
                      className="flex-1 bg-blue-500 text-white py-2.5 px-4 rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm sm:text-base"
                    >
                      {createEventMutation.isPending || updateEventMutation.isPending
                        ? 'Saving...'
                        : editingEvent
                        ? 'Update Event'
                        : 'Create Event'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="flex-1 bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-200 transition font-medium text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
