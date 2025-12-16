import React from 'react';

interface Subject {
  name: string;
  grade: string;
  icon: string;
}

interface Level {
  level: string;
  subjects: Subject[];
}

interface SubjectsProps {
  subjects: Level[];
}

const Subjects: React.FC<SubjectsProps> = ({ subjects }) => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm">
      {subjects.map((level, index) => (
        <div key={index} className="mb-8 last:mb-0">
          <h2 className="text-2xl font-bold mb-6">{level.level} Subjects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {level.subjects.map((subject, subIndex) => (
              <div
                key={subIndex}
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-[#48b095] transition-colors"
              >
                <div className="w-12 h-12 flex items-center justify-center text-2xl bg-[#48b095] bg-opacity-10 rounded-xl">
                  {subject.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{subject.name}</h3>
                  <p className="text-sm text-[#48b095]">Grade: {subject.grade}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Subjects; 