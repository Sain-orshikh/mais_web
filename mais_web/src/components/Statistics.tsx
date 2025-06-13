import { type JSX } from 'react';
import { FaUsers, FaBookOpen, FaUserGraduate, FaTree } from 'react-icons/fa';

interface StatItem {
  icon: JSX.Element;
  value: string;
  label: string;
  description?: string;
}

const Statistics = () => {
  const stats: StatItem[] = [
    {
      icon: <FaUsers className="w-8 h-8 text-red-800" />,
      value: "384",
      label: "STUDENTS",
    },
    {
      icon: <FaUserGraduate className="w-8 h-8 text-red-800" />,
      value: "42",
      label: "TEACHERS",
    },
    {
      icon: <FaBookOpen className="w-8 h-8 text-red-800" />,
      value: "44",
      label: "COURSES",
    },    {
      icon: <FaTree className="w-8 h-8 text-red-800" />,
      value: "$3.4M",
      label: "2024 SCHOLARSHIPS",
    }
  ];
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 border-2 border-gray-200 rounded-lg hover:border-accent hover:shadow-md transition-all duration-300">
              <div className="mb-4">{stat.icon}</div>
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics; 