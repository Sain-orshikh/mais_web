
const events = [
  { date: "March 30", title: "Science Fair" },
  { date: "April 5", title: "Debate Championship" },
  { date: "June 10", title: "Senior Graduation" },
  { date: "July 1", title: "Summer Camp" },
];

const UpcomingEvents = () => {

  return (
    <div className="mt-6 p-4 bg-gray-900 rounded-lg text-white w-full">
      <h3 className="text-lg font-bold mb-3">📅 Upcoming Events</h3>
      <div className="space-y-3">
        {events.map((event, index) => (
          <div
            key={index}
            className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
          >
            <span className="block text-gray-400 text-sm">{event.date}</span>
            <span className="block text-lg font-semibold">{event.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
