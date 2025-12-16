import React from 'react';

interface AwardHistory {
  title: string;
  date: string;
}

interface Award {
  id: number;
  title: string;
  description: string;
  date: string;
  icon: string;
  count?: number;
  history?: AwardHistory[];
}

interface AwardsProps {
  achievements: Award[];
}

const Awards: React.FC<AwardsProps> = ({ achievements }) => {
  return (
    <div className="grid grid-cols-6 gap-2">
      {achievements.map((award) => (
        <div
          key={award.id}
          className="relative group"
        >
          {/* Default View - Only Icon */}
          <div className="relative">
            <div className="w-12 h-12 flex items-center justify-center text-2xl bg-[#48b095] rounded-full hover:scale-105 transition-transform duration-200">
              {award.icon}
            </div>
            {award.count && (
              <div className="absolute -bottom-1 -right-1 bg-[#238636] text-white text-[10px] px-1 py-0.5 rounded-full">
                x{award.count}
              </div>
            )}
          </div>

          {/* Hover Popup */}
          <div className="absolute z-50 left-1/2 -translate-x-1/2 top-full mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <div className="bg-white rounded-lg p-4 shadow-lg border border-gray-200">
              {/* Award Info */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 flex items-center justify-center text-xl bg-[#48b095] rounded-full">
                  {award.icon}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">{award.title}</h3>
                  <p className="text-xs text-gray-500">{award.description}</p>
                </div>
              </div>

              {/* History Section */}
              {award.history && (
                <>
                  <div className="h-px bg-gray-200 my-3"></div>
                  <h4 className="text-gray-600 text-xs font-medium mb-3">History</h4>
                  <div className="relative pl-4">
                    {award.history.map((item, index) => (
                      <div key={index} className="relative mb-2 last:mb-0">
                        {/* Timeline dot */}
                        <div className="absolute left-0 top-2 w-1.5 h-1.5 bg-gray-400 rounded-full -translate-x-[3px]"></div>
                        {/* Timeline line */}
                        {index !== award.history!.length - 1 && (
                          <div className="absolute left-0 top-2 w-0.5 h-full bg-gray-200 -translate-x-[1px]"></div>
                        )}
                        {/* Content */}
                        <div className="text-xs">
                          <div className="text-gray-900">{item.title}</div>
                          {item.date && (
                            <div className="text-gray-500">{item.date}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            {/* Triangle pointer */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Awards; 