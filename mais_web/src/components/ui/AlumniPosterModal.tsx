import React, { useState, useEffect } from 'react';
import { Modal, Box, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

interface AlumniPosterModalProps {
  open: boolean;
  onClose: () => void;
  posterSrc: string;
  alt: string;
}

const AlumniPosterModal: React.FC<AlumniPosterModalProps> = ({
  open,
  onClose,
  posterSrc,
  alt
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

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
    bgcolor: 'transparent',
    boxShadow: 'none',
    p: 0,
    borderRadius: 2,
    outline: 'none',
    width: { xs: '95vw', sm: '90vw', md: '85vw', lg: '80vw' },
    maxWidth: '1000px',
    height: { xs: '85vh', md: '80vh' },
    maxHeight: '90vh',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  } as const;

  return (    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="alumni-poster-modal"
      aria-describedby="alumni-poster-modal-description"
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
          >            <Box sx={modalStyle}>
              {/* Close button */}
              <IconButton
                onClick={onClose}
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
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

              {/* Loading skeleton for image */}
              {!imageLoaded && (
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(243, 244, 246, 0.9)',
                    borderRadius: 2,
                    backdropFilter: 'blur(8px)'
                  }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style={{ color: '#6b7280' }}
                  >
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                    </svg>
                  </motion.div>
                </Box>
              )}
              
              {/* Enlarged poster image */}
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
                  borderRadius: 2,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                  opacity: imageLoaded ? 1 : 0,
                  transition: 'opacity 0.3s ease-in-out'
                }}
                loading="lazy"
              />
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};

export default AlumniPosterModal;
