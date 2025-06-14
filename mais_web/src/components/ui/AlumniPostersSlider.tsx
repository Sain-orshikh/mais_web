import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { generateAlumniPosters } from '../../utils/alumniPosters';
import type { AlumniPosterData } from '../../utils/alumniPosters';
import AlumniPoster from './AlumniPoster';
import { InfiniteSlider } from '../animation/infiniteslider';

// Global persistent cache that survives component remounts and page reloads
interface CachedImage {
  src: string;
  format: 'webp' | 'jpg';
  timestamp: number;
}

const globalImageCache = new Map<string, CachedImage>();
const CACHE_EXPIRY = 30 * 60 * 1000; // 30 minutes
const LOCALSTORAGE_KEY = 'mais_alumni_cache';

// Load cache from localStorage on module initialization
const loadCacheFromStorage = () => {
  try {
    const stored = localStorage.getItem(LOCALSTORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored) as Record<string, unknown>;
      Object.entries(data).forEach(([key, value]) => {
        if (value && typeof value === 'object' && value !== null) {
          const cachedImage = value as CachedImage;
          if (cachedImage.timestamp && cachedImage.src) {
            // Check if cache entry is still valid
            if (Date.now() - cachedImage.timestamp < CACHE_EXPIRY) {
              globalImageCache.set(key, cachedImage);
            }
          }
        }
      });
      console.log(`[Cache] Loaded ${globalImageCache.size} cached images from localStorage`);
    }
  } catch (error) {
    console.warn('[Cache] Failed to load cache from localStorage:', error);
  }
};

// Save cache to localStorage
const saveCacheToStorage = () => {
  try {
    const data: Record<string, CachedImage> = {};
    globalImageCache.forEach((value, key) => {
      // Only save valid, non-expired entries
      if (Date.now() - value.timestamp < CACHE_EXPIRY) {
        data[key] = value;
      }
    });
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('[Cache] Failed to save cache to localStorage:', error);
  }
};

// Initialize cache from storage
loadCacheFromStorage();

// Preload function for caching with 3-tier fallback and persistent storage
const preloadAlumniImage = async (webpPrimary: string, webpFallback: string, jpgFallback: string): Promise<void> => {
  const cacheKey = `${webpPrimary}|${webpFallback}|${jpgFallback}`;
  
  // Skip if already cached and not expired
  const cached = globalImageCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_EXPIRY) {
    console.log('[Cache] Image already cached:', cacheKey.split('|')[0].split('/').pop());
    return;
  }

  try {
    // Try primary WebP first
    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = webpPrimary;
    });
    
    const cacheEntry: CachedImage = {
      src: webpPrimary,
      format: 'webp',
      timestamp: Date.now()
    };
    globalImageCache.set(cacheKey, cacheEntry);
    saveCacheToStorage();
    console.log('[Cache] Cached WebP primary:', webpPrimary.split('/').pop());
    
  } catch {
    try {
      // Try fallback WebP
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = webpFallback;
      });
      
      const cacheEntry: CachedImage = {
        src: webpFallback,
        format: 'webp',
        timestamp: Date.now()
      };
      globalImageCache.set(cacheKey, cacheEntry);
      saveCacheToStorage();
      console.log('[Cache] Cached WebP fallback:', webpFallback.split('/').pop());
      
    } catch {
      // Final fallback to JPG
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = jpgFallback;
      });
      
      const cacheEntry: CachedImage = {
        src: jpgFallback,
        format: 'jpg',
        timestamp: Date.now()
      };
      globalImageCache.set(cacheKey, cacheEntry);
      saveCacheToStorage();
      console.log('[Cache] Cached JPG fallback:', jpgFallback.split('/').pop());
    }
  }
};

const AlumniPostersSlider: React.FC = () => {
  const [posters, setPosters] = useState<AlumniPosterData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadPosters = async () => {
      try {
        const posterData = generateAlumniPosters();
        setPosters(posterData);
        
        // Check if images are already cached globally or in localStorage
        const totalImages = posterData.length;
        let cachedCount = 0;
        
        posterData.forEach(poster => {
          const cacheKey = `${poster.webpPrimary}|${poster.webpFallback}|${poster.jpgFallback}`;
          const cached = globalImageCache.get(cacheKey);
          if (cached && Date.now() - cached.timestamp < CACHE_EXPIRY) {
            cachedCount++;
          }
        });
        
        const cachePercentage = (cachedCount / totalImages) * 100;        console.log(`[Cache] Found ${cachedCount}/${totalImages} images in cache (${Math.round(cachePercentage)}%)`);
          if (cachedCount === totalImages) {
          console.log('[Cache] All images already cached, skipping preload');
          setIsLoading(false);
          return;
        }
        
        // Start preloading remaining images in background
        
        // Start preloading remaining images in background
        preloadImages(posterData);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading alumni posters:', error);
        setIsLoading(false);
      }
    };

    loadPosters();
  }, []);
  const preloadImages = async (posterData: AlumniPosterData[]) => {
    // Preload first 5 images immediately (for initial view)
    const priorityImages = posterData.slice(0, 5);
    const backgroundImages = posterData.slice(5);

    // Load priority images first
    for (const poster of priorityImages) {
      const cacheKey = `${poster.webpPrimary}|${poster.webpFallback}|${poster.jpgFallback}`;
      if (!globalImageCache.has(cacheKey)) {
        try {
          await preloadAlumniImage(poster.webpPrimary, poster.webpFallback, poster.jpgFallback);
        } catch {
          console.warn('Failed to preload image:', poster.fileName);
        }
      }
    }

    // Load remaining images in background with delay
    setTimeout(async () => {
      for (const poster of backgroundImages) {
        const cacheKey = `${poster.webpPrimary}|${poster.webpFallback}|${poster.jpgFallback}`;
        if (!globalImageCache.has(cacheKey)) {
          try {
            await preloadAlumniImage(poster.webpPrimary, poster.webpFallback, poster.jpgFallback);
          } catch {
            console.warn('Failed to preload image:', poster.fileName);
          }
          
          // Small delay between loads to not overwhelm the network
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="w-full py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            2025 Alumni Achievements
          </h2>
          <div className="flex justify-center items-center py-16">            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading alumni posters...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (posters.length === 0) {
    return (
      <div className="w-full py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            2025 Alumni Achievements
          </h2>
          <div className="text-center py-16">
            <p className="text-gray-600">No alumni posters available at the moment.</p>
          </div>
        </div>
      </div>
    );
  }  return (
    <div className="w-full pt-12 pb-6">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-8 text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          2025 Alumni Achievements
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >          <InfiniteSlider gap={24} speed={50}>
            {posters.map((poster, index) => (
              <AlumniPoster 
                key={`${poster.fileName}-${index}`}
                poster={poster}
                className="w-64 h-64 flex-shrink-0"
              />
            ))}          </InfiniteSlider>
        </motion.div>
      </div>
    </div>
  );
};

export default AlumniPostersSlider;
