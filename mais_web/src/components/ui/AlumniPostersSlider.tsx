import React, { useState, useEffect } from 'react';
import { InfiniteSlider } from '../animation/infiniteslider';
import AlumniPoster from './AlumniPoster';
import { generateAlumniPosters, type AlumniPosterData } from '../../utils/alumniPosters';

const AlumniPostersSlider: React.FC = () => {  const [posters, setPosters] = useState<AlumniPosterData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const speed = 50; // Fixed speed for presentation
  // const [speed, setSpeed] = useState(50); // Commented out for presentation
  useEffect(() => {
    // Generate posters based on available JPG files
    const availablePosters = generateAlumniPosters();
    setPosters(availablePosters);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Featured Alumni</h3>
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-600 font-medium">Loading Alumni Posters...</p>
        </div>
      </div>
    );
  }

  if (posters.length === 0) {
    return (
      <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Featured Alumni</h3>
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 00-2 2v2m0 0V9a2 2 0 012-2h12a2 2 0 012 2v2M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2"></path>
          </svg>
          <p className="text-gray-600 font-medium">No Alumni Posters Available</p>
          <p className="text-gray-500 text-sm mt-1">Add poster images to the alumni folder to display them here</p>
        </div>
      </div>
    );
  }
  return (
    <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">2025 Alumnis</h3>
        {/* Speed control - commented out for presentation
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Speed:</span>
          <input
            type="range"
            min="20"
            max="100"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-16 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
        */}
      </div>
      
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 overflow-hidden">
        <InfiniteSlider
          gap={16}
          speed={speed}
          speedOnHover={speed * 0.3}
          direction="horizontal"
          reverse={false}
          className="h-64"        >
          {posters.map((poster) => (
            <AlumniPoster
              key={poster.fileName}
              poster={poster}
              className="w-64 h-64 flex-shrink-0"
            />
          ))}
        </InfiniteSlider>
      </div>      
      {/* Bottom info text - commented out for presentation
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Showing {posters.length} alumni achievement{posters.length !== 1 ? 's' : ''} • Hover to slow down
        </p>
      </div>
      */}
    </div>
  );
};

export default AlumniPostersSlider;
