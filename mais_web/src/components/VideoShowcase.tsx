import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

const VideoShowcase = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };
  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  return (
    <motion.section 
      className="py-20 bg-gradient-to-br from-slate-50 to-blue-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <div className="container mx-auto px-4">        <motion.div className="text-center mb-12" variants={fadeInUp}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Directions to MAIS
          </h2>
        </motion.div>

        <motion.div 
          className="max-w-7xl mx-auto"
          variants={fadeInUp}
        >
          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">            <div className="relative aspect-video">              <video
                ref={videoRef}
                className="w-full h-full object-cover cursor-pointer"
                poster="/vidposter.png"
                preload="metadata"
                onPlay={handlePlay}
                onPause={handlePause}
                onClick={handleVideoClick}
              >
                <source src="/sample.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>              {/* Play button overlay - only show when paused */}
              {!isPlaying && (
                <div 
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  onClick={handleVideoClick}
                >
                  <div className="bg-black/30 rounded-full p-4 backdrop-blur-sm hover:bg-black/40 transition-colors">
                    <svg className="w-12 h-12 text-white opacity-90" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default VideoShowcase;
