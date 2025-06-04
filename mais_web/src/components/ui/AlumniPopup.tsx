import React, { useMemo } from 'react';
import type { Alumni } from '../../data/alumniData';
import { motion } from 'framer-motion';

interface AlumniPopupProps {
  alumni: Alumni[];
  countryName: string;
  onClose: () => void;
}

const AlumniPopup: React.FC<AlumniPopupProps> = ({ alumni, countryName, onClose }) => {
  // Group alumni by university
  const alumniByUniversity = useMemo(() => {
    const grouped: { [key: string]: Alumni[] } = {};
    
    alumni.forEach(person => {
      if (!grouped[person.university]) {
        grouped[person.university] = [];
      }
      grouped[person.university].push(person);
    });
    
    // Convert to array and sort by university name
    return Object.entries(grouped)
      .map(([university, students]) => ({ university, students }))
      .sort((a, b) => a.university.localeCompare(b.university));
  }, [alumni]);
  
  // Group alumni by field of study
  const fieldStatistics = useMemo(() => {
    const fields: { [key: string]: number } = {};
    
    alumni.forEach(person => {
      fields[person.major] = (fields[person.major] || 0) + 1;
    });
    
    return Object.entries(fields)
      .map(([field, count]) => ({ field, count }))
      .sort((a, b) => b.count - a.count);
  }, [alumni]);
  
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
      >
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">
              MAIS Alumni in {countryName}
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
            {alumni.length} {alumni.length === 1 ? 'alumnus' : 'alumni'} • {alumniByUniversity.length} {alumniByUniversity.length === 1 ? 'university' : 'universities'}
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row h-[70vh]">
          {/* Main alumni list - grouped by university */}
          <div className="p-6 overflow-y-auto flex-grow">
            {alumni.length > 0 ? (
              <div className="space-y-8">
                {alumniByUniversity.map(({ university, students }) => (
                  <div key={university} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <h3 className="font-semibold text-xl mb-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {university}
                      <span className="text-gray-500 font-normal text-sm ml-2">
                        ({students.length} {students.length === 1 ? 'student' : 'students'})
                      </span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {students.map((person) => (
                        <motion.div 
                          key={person.id}
                          className="flex bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="w-28 h-28 flex-shrink-0">
                            <img 
                              src={person.image || "https://via.placeholder.com/112?text=Student"} 
                              alt={person.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4 flex-grow">
                            <h3 className="font-semibold text-lg">{person.name}</h3>
                            <p className="text-sm text-gray-600">Class of {person.graduationYear}</p>
                            <div className="mt-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {person.major}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
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
          {alumni.length > 0 && (
            <div className="bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200 p-6 md:w-80 flex-shrink-0 overflow-y-auto">
              <div className="space-y-6">
                {/* Fields of study breakdown */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Fields of Study</h3>
                  <div className="space-y-2">
                    {fieldStatistics.map(({ field, count }) => (
                      <div key={field} className="flex items-center">
                        <div className="flex-grow">
                          <p className="text-sm font-medium text-gray-700">{field}</p>
                        </div>
                        <div className="ml-2">
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded">
                            {count}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Graduation years breakdown */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Graduation Years</h3>
                  <div className="space-y-2">
                    {Array.from(new Set(alumni.map(a => a.graduationYear)))
                      .sort((a, b) => b - a) // Sort descending
                      .map(year => {
                        const count = alumni.filter(a => a.graduationYear === year).length;
                        return (
                          <div key={year} className="flex items-center">
                            <div className="flex-grow">
                              <p className="text-sm font-medium text-gray-700">Class of {year}</p>
                            </div>
                            <div className="ml-2">
                              <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded">
                                {count}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
                
                {/* Alumni stats */}
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-3">Quick Facts</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      {alumniByUniversity.length} {alumniByUniversity.length === 1 ? 'university' : 'universities'}
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {fieldStatistics.length} fields of study
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {new Set(alumni.map(a => a.graduationYear)).size} graduation years
                    </li>
                    <li className="flex items-center text-blue-600 font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {alumni.length} total alumni
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
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AlumniPopup;