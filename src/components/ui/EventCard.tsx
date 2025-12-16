import { Link } from 'react-router-dom';

interface EventCardProps {
  date: string;
  title: string;
  time?: string;
  location?: string;
  category?: string;
  href?: string;
}

const EventCard = ({ date, title, time, location, category, href = "/events" }: EventCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    return { day, month };
  };

  const { day, month } = formatDate(date);

  return (    <Link 
      to={href}
      className="group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-accent-200 transition-all duration-200 flex items-center space-x-4"
    >
      {/* Date Box */}
      <div className="flex-shrink-0 bg-accent-50 rounded-lg p-3 text-center min-w-[60px] group-hover:bg-accent-100 transition-colors">
        <div className="text-xs font-medium text-accent-600 uppercase">{month}</div>
        <div className="text-lg font-bold text-accent-900">{day}</div>
      </div>

      {/* Event Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">            {category && (
              <span className="inline-block text-xs font-medium text-accent-600 bg-accent-50 px-2 py-1 rounded-full mb-1">
                {category}
              </span>
            )}
            <h3 className="text-sm font-semibold text-gray-900 group-hover:text-accent-700 line-clamp-2 transition-colors">
              {title}
            </h3>
            <div className="mt-1 space-y-1">
              {time && (
                <div className="flex items-center text-xs text-gray-500">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  {time}
                </div>
              )}
              {location && (
                <div className="flex items-center text-xs text-gray-500">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  {location}
                </div>
              )}
            </div>
          </div>          <svg className="w-4 h-4 text-gray-400 group-hover:text-accent-500 transition-colors flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
