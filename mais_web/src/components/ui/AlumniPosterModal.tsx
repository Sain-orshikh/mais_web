import React from 'react';
import { Modal, Box, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

interface AlumniPosterModalProps {
  open: boolean;
  onClose: () => void;
  posterSrc: string;
  alt: string;
  posterId: number;
}

const AlumniPosterModal: React.FC<AlumniPosterModalProps> = ({
  open,
  onClose,
  posterSrc,
  alt,
  posterId
}) => {  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 0,
    borderRadius: 2,
    outline: 'none',
    maxWidth: '90vw',
    maxHeight: '90vh',
    overflow: 'hidden'
  } as const;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby={`alumni-poster-${posterId}`}
      aria-describedby={`alumni-poster-${posterId}-description`}
      closeAfterTransition
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
      }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
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
              </IconButton>              {/* Poster image */}
              <Box
                component="img"
                src={posterSrc}
                alt={alt}
                sx={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '90vw',
                  maxHeight: '90vh',
                  objectFit: 'contain',
                  display: 'block'
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
