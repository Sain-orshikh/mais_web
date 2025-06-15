import React, { useMemo } from 'react';
import type { University } from '../../data/alumniData';
import { getTotalAlumniCount } from '../../data/alumniData';
import { motion } from 'framer-motion';
import { useHomeTranslation } from '../../translations/useTranslation';

interface AlumniPopupProps {
  universities: University[];
  countryName: string;
  onClose: () => void;
}

const AlumniPopup: React.FC<AlumniPopupProps> = ({ universities, countryName, onClose }) => {
  const { t } = useHomeTranslation();
  
  // Sort universities by alumni count and then by name
  const sortedUniversities = useMemo(() => {
    return [...universities].sort((a, b) => {
      if (b.alumniCount !== a.alumniCount) {
        return b.alumniCount - a.alumniCount; // Sort by count first (descending)
      }
      return a.name.localeCompare(b.name); // Then by name (ascending)
    });
  }, [universities]);
  // Calculate total alumni count
  const totalAlumni = useMemo(() => {
    return universities.reduce((total, uni) => total + uni.alumniCount, 0);
  }, [universities]);

  // Get statistics for different alumni count ranges
  const universityStats = useMemo(() => {
    const stats = {
      largePrograms: universities.filter(uni => uni.alumniCount >= 10).length,
      mediumPrograms: universities.filter(uni => uni.alumniCount >= 3 && uni.alumniCount < 10).length,
      smallPrograms: universities.filter(uni => uni.alumniCount < 3).length,
    };    return stats;
  }, [universities]);

  if (!t) {
    return <div>Loading...</div>;
  }
    
  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >        <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">
              {t.worldMap.popup.title} {countryName}
            </h2>
            <button 
              onClick={onClose}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-blue-100 mt-1">
            {totalAlumni} {totalAlumni === 1 ? t.worldMap.popup.labels.alumnus : t.worldMap.popup.labels.alumni} • {universities.length} {universities.length === 1 ? t.worldMap.popup.labels.university : t.worldMap.popup.labels.universities}
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row h-[70vh]">
          {/* Main university list */}
          <div className="p-6 overflow-y-auto flex-grow">
            {universities.length > 0 ? (
              <div className="space-y-4">
                {sortedUniversities.map((university) => (
                  <motion.div 
                    key={university.id}
                    className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-all border border-gray-200"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-grow">
                        <h3 className="font-semibold text-xl mb-2 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {university.name}
                        </h3>                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {university.alumniCount} {university.alumniCount === 1 ? t.worldMap.popup.labels.alumnus : t.worldMap.popup.labels.alumni}
                          </div>
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {university.countryName}
                          </div>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          university.alumniCount >= 10 
                            ? 'bg-green-100 text-green-800'
                            : university.alumniCount >= 3
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {university.alumniCount >= 10 
                            ? t.worldMap.popup.programSizes.large.split(' (')[0] 
                            : university.alumniCount >= 3 
                            ? t.worldMap.popup.programSizes.medium.split(' (')[0] 
                            : t.worldMap.popup.programSizes.small.split(' (')[0]}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No alumni data available for this country.</p>
                <p className="text-gray-400 text-sm mt-2">Check back later for updates.</p>
              </div>
            )}
          </div>
          
          {/* Sidebar with statistics */}
          {universities.length > 0 && (
            <div className="bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200 p-6 md:w-80 flex-shrink-0 overflow-y-auto">
              <div className="space-y-6">                {/* Program size breakdown */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">{t.worldMap.popup.programSizes.title}</h3>
                  <div className="space-y-2">
                    {universityStats.largePrograms > 0 && (
                      <div className="flex items-center">
                        <div className="flex-grow">
                          <p className="text-sm font-medium text-gray-700">{t.worldMap.popup.programSizes.large}</p>
                        </div>
                        <div className="ml-2">
                          <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded">
                            {universityStats.largePrograms}
                          </span>
                        </div>
                      </div>
                    )}
                    {universityStats.mediumPrograms > 0 && (
                      <div className="flex items-center">
                        <div className="flex-grow">
                          <p className="text-sm font-medium text-gray-700">{t.worldMap.popup.programSizes.medium}</p>
                        </div>
                        <div className="ml-2">
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded">
                            {universityStats.mediumPrograms}
                          </span>
                        </div>
                      </div>
                    )}
                    {universityStats.smallPrograms > 0 && (
                      <div className="flex items-center">
                        <div className="flex-grow">
                          <p className="text-sm font-medium text-gray-700">{t.worldMap.popup.programSizes.small}</p>
                        </div>
                        <div className="ml-2">
                          <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded">
                            {universityStats.smallPrograms}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                  {/* Top universities */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">{t.worldMap.popup.topUniversities}</h3>
                  <div className="space-y-2">
                    {sortedUniversities.slice(0, 5).map((university, index) => (
                      <div key={university.id} className="flex items-center">
                        <div className="flex items-center flex-grow">
                          <span className="text-sm font-bold text-gray-400 w-6">#{index + 1}</span>
                          <p className="text-sm font-medium text-gray-700 ml-2 truncate">{university.name}</p>
                        </div>
                        <div className="ml-2">
                          <span className="bg-purple-100 text-purple-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded">
                            {university.alumniCount}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                  {/* Alumni stats */}
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-3">{t.worldMap.popup.quickFacts}</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      {universities.length} {universities.length === 1 ? t.worldMap.popup.labels.university : t.worldMap.popup.labels.universities}
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {totalAlumni} {t.worldMap.popup.labels.totalAlumni}
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      {t.worldMap.popup.labels.average} {(totalAlumni / universities.length).toFixed(1)} {t.worldMap.popup.labels.alumniPerUniversity}
                    </li>                    <li className="flex items-center text-blue-600 font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7a6 6 0 01-6 6 6 6 0 01-6-6 6 6 0 016-6 6 6 0 016 6z" />
                      </svg>
                      {countryName} {t.worldMap.popup.labels.represents} {((totalAlumni / getTotalAlumniCount()) * 100).toFixed(1)}{t.worldMap.popup.labels.percentage}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex justify-end">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              {t.worldMap.popup.closeButton}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AlumniPopup;