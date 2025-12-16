
import { useHomeTranslation } from '../../../translations/useTranslation';

const UpcomingEvents = () => {
  const { t } = useHomeTranslation();

  if (!t) {
    return (
      <div className="mt-6 p-4 bg-gray-900 rounded-lg text-white w-full">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded mb-3"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((index) => (
              <div key={index} className="p-3 bg-gray-800 rounded-lg">
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-5 bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 p-4 bg-gray-900 rounded-lg text-white w-full">
      <h3 className="text-lg font-bold mb-3">📅 {t.events.title}</h3>
      <div className="space-y-3">
        {t.events.eventData.map((event, index) => (
          <div
            key={index}
            className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
          >
            <span className="block text-gray-400 text-sm">
              {new Date(event.date).toLocaleDateString()}
            </span>
            <span className="block text-lg font-semibold">{event.title}</span>
            <span className="block text-gray-300 text-sm">{event.location}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
