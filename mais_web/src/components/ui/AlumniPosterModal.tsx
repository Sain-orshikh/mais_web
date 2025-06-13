import React, { useState, useEffect } from 'react';
import { Modal, Box, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { getAlumniDataByFileName } from '../../data/alumniPosterData';

interface AlumniPosterModalProps {
  open: boolean;
  onClose: () => void;
  posterSrc: string;
  alt: string;
  fileName: string;
}

const AlumniPosterModal: React.FC<AlumniPosterModalProps> = ({
  open,
  onClose,
  posterSrc,
  alt,
  fileName
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const alumniData = getAlumniDataByFileName(fileName);

  // Reset image loaded state when modal opens
  useEffect(() => {
    if (open) {
      setImageLoaded(false);
    }
  }, [open]);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 0,
    borderRadius: 2,
    outline: 'none',
    width: { xs: '95vw', sm: '90vw', md: '85vw', lg: '80vw' },
    minWidth: { xs: '300px', md: '600px' },
    maxWidth: '1200px',
    height: { xs: '85vh', md: '80vh' },
    minHeight: { xs: '400px', md: '500px' },
    maxHeight: '90vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  } as const;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby={`alumni-poster-${fileName}`}
      aria-describedby={`alumni-poster-${fileName}-description`}
      closeAfterTransition
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
      }}
    >
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ 
              type: "spring", 
              damping: 30, 
              stiffness: 400,
              duration: 0.3
            }}
            style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Box sx={modalStyle}>
              {/* Close button */}
              <IconButton
                onClick={onClose}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  bgcolor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  zIndex: 1,
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.9)',
                  }
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </IconButton>

              {/* Modal content */}
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' }, 
                height: '100%',
                minHeight: '100%',
                overflow: 'hidden'
              }}>
                {/* Left side - Poster image */}
                <Box sx={{ 
                  flex: { xs: '1', md: '0 0 50%' }, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  p: 2,
                  minHeight: { xs: '300px', md: '400px' },
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  {/* Loading skeleton for image */}
                  {!imageLoaded && (
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(45deg, #f3f4f6, #e5e7eb)',
                        borderRadius: 2,
                        margin: 2
                      }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        style={{ color: '#6b7280' }}
                      >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                        </svg>
                      </motion.div>
                    </Box>
                  )}
                  
                  <Box
                    component="img"
                    src={posterSrc}
                    alt={alt}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageLoaded(true)}
                    sx={{
                      width: 'auto',
                      height: 'auto',
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      display: imageLoaded ? 'block' : 'none',
                      border: '2px solid #e5e7eb',
                      borderRadius: 2,
                      opacity: imageLoaded ? 1 : 0,
                      transition: 'opacity 0.3s ease-in-out'
                    }}
                    loading="lazy"
                  />
                </Box>

                {/* Right side - Alumni information */}
                <Box sx={{ 
                  flex: { xs: '1', md: '0 0 50%' }, 
                  p: 1.5, 
                  overflow: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  minHeight: { xs: '200px', md: '400px' },
                  height: '100%'
                }}>
                  {alumniData && (alumniData.name || alumniData.description) ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="h-full"
                    >
                      {/* Alumni name */}
                      {alumniData.name && (
                        <Box sx={{ mb: 2 }}>
                          <h2 className="text-2xl font-bold text-gray-800 mb-1">
                            {alumniData.name}
                          </h2>
                          {alumniData.major && (
                            <p className="text-blue-600 font-medium">{alumniData.major}</p>
                          )}
                        </Box>
                      )}

                      {/* Description */}
                      {alumniData.description && (
                        <Box sx={{ mb: 2 }}>
                          <h3 className="text-lg font-semibold text-gray-700 mb-2">About</h3>
                          <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                            {alumniData.description}
                          </p>
                        </Box>
                      )}

                      {/* Achievements */}
                      {alumniData.achievements && (
                        <Box sx={{ mb: 0 }}>
                          <h3 className="text-lg font-semibold text-gray-700 mb-2">Academic Achievements</h3>
                          <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                            {alumniData.achievements}
                          </p>
                        </Box>
                      )}
                    </motion.div>
                  ) : (
                    /* Placeholder for alumni without data */
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '300px' }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                        </svg>
                        <h3 className="text-lg font-medium text-gray-500 mb-2">Alumni Information</h3>
                        <p className="text-gray-400 text-sm">Information for this alumni will be added soon</p>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};

export default AlumniPosterModal;
