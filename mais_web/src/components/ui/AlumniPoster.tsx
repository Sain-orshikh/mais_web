import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLazyImage } from '../hooks/useLazyImage';
import type { AlumniPosterData } from '../../utils/alumniPosters';
import AlumniPosterModal from './AlumniPosterModal';

interface AlumniPosterProps {
  poster: AlumniPosterData;
  className?: string;
}

const AlumniPoster: React.FC<AlumniPosterProps> = ({ 
  poster, 
  className = '' 
}) => {  const [ref, { src, isLoaded, hasError }] = useLazyImage({ 
    webpSrc: poster.webpSrc, 
    jpgSrc: poster.jpgSrc 
  });
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    if (src && isLoaded && !hasError) {
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <motion.div
        ref={ref}
        className={`relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer ${className}`}
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={handleClick}
      >
        <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative">
          {/* Loading skeleton */}
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse">
              <div className="absolute inset-4 bg-white/50 rounded-lg flex items-center justify-center">
                <div className="text-gray-400 text-center">
                  <svg className="w-8 h-8 mx-auto mb-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-xs font-medium">Loading...</span>
                </div>
              </div>
            </div>
          )}

          {/* Error state */}
          {hasError && (
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
              <div className="text-red-400 text-center">
                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="text-xs font-medium">Failed to load</span>
              </div>
            </div>
          )}          {/* Actual image */}
          {src && isLoaded && (
            <motion.img
              src={src}
              alt={poster.alt}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              loading="lazy"
            />
          )}          {/* Overlay with poster number - removed for sliding version */}

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
            initial={false}
          >
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-sm font-semibold">Alumni Poster</p>
              <p className="text-xs opacity-90 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Click to view larger
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>      {/* Modal for viewing poster in larger size */}
      <AlumniPosterModal
        open={modalOpen}
        onClose={handleCloseModal}
        posterSrc={src || ''}
        alt={poster.alt}
        fileName={poster.fileName}
      />
    </>
  );
};

export { AlumniPoster };
export default AlumniPoster;
