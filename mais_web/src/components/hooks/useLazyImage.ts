import { useState, useEffect, useRef } from 'react';

// Memory cache for loaded images (Level 1 caching)
const imageMemoryCache = new Map<string, {
  src: string;
  format: 'webp' | 'jpg';
  timestamp: number;
}>();

// LocalStorage cache constants (Level 2 caching)
const MEMORY_CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes for memory cache
const LOCALSTORAGE_CACHE_EXPIRY = 30 * 60 * 1000; // 30 minutes for localStorage cache
const LOCALSTORAGE_KEY = 'mais_alumni_cache';

// Function to check localStorage cache
const checkLocalStorageCache = (cacheKey: string) => {
  try {
    const stored = localStorage.getItem(LOCALSTORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored) as Record<string, unknown>;
      const cached = data[cacheKey];
      if (cached && typeof cached === 'object' && cached !== null) {
        const cachedImage = cached as { src: string; format: 'webp' | 'jpg'; timestamp: number };
        if (cachedImage.timestamp && cachedImage.src && Date.now() - cachedImage.timestamp < LOCALSTORAGE_CACHE_EXPIRY) {
          return cachedImage;
        }
      }
    }
  } catch (error) {
    console.warn('[Cache] Failed to check localStorage cache:', error);
  }
  return null;
};

interface UseLazyImageProps {
  webpPrimary: string;
  webpFallback?: string;
  jpgFallback: string;
  threshold?: number;
}

interface LazyImageState {
  src: string | null;
  isLoaded: boolean;
  isInView: boolean;
  hasError: boolean;
  format: 'webp' | 'jpg' | null;
}

export const useLazyImage = ({ webpPrimary, webpFallback, jpgFallback, threshold = 0.1 }: UseLazyImageProps): [React.RefObject<HTMLDivElement | null>, LazyImageState] => {
  const [state, setState] = useState<LazyImageState>({
    src: null,
    isLoaded: false,
    isInView: false,
    hasError: false,
    format: null
  });
  
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState(prev => ({ ...prev, isInView: true }));
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);  useEffect(() => {
    if (!state.isInView) return;

    // Check memory cache first (Level 1)
    const cacheKey = `${webpPrimary}|${webpFallback || ''}|${jpgFallback}`;
    const memoryCached = imageMemoryCache.get(cacheKey);
    
    if (memoryCached && (Date.now() - memoryCached.timestamp) < MEMORY_CACHE_EXPIRY) {
      console.log('[Cache] Serving from memory cache:', memoryCached.src.split('/').pop());
      setState(prev => ({
        ...prev,
        src: memoryCached.src,
        isLoaded: true,
        hasError: false,
        format: memoryCached.format
      }));
      return;
    }

    // Check localStorage cache (Level 2)
    const localStorageCached = checkLocalStorageCache(cacheKey);
    if (localStorageCached) {
      console.log('[Cache] Serving from localStorage cache:', localStorageCached.src.split('/').pop());
      
      // Add to memory cache for faster future access
      imageMemoryCache.set(cacheKey, {
        src: localStorageCached.src,
        format: localStorageCached.format,
        timestamp: Date.now()
      });
      
      setState(prev => ({
        ...prev,
        src: localStorageCached.src,
        isLoaded: true,
        hasError: false,
        format: localStorageCached.format
      }));
      return;
    }

    const loadImage = async () => {
      try {
        // Try WebP primary first
        const webpPrimaryImg = new Image();
        
        await new Promise((resolve, reject) => {
          webpPrimaryImg.onload = resolve;
          webpPrimaryImg.onerror = reject;
          webpPrimaryImg.src = webpPrimary;
        });

        // Cache successful WebP primary load
        imageMemoryCache.set(cacheKey, {
          src: webpPrimary,
          format: 'webp',
          timestamp: Date.now()
        });

        setState(prev => ({
          ...prev,
          src: webpPrimary,
          isLoaded: true,
          hasError: false,
          format: 'webp'
        }));
      } catch {
        // Try WebP fallback if available
        if (webpFallback) {
          try {
            const webpFallbackImg = new Image();
            
            await new Promise((resolve, reject) => {
              webpFallbackImg.onload = resolve;
              webpFallbackImg.onerror = reject;
              webpFallbackImg.src = webpFallback;
            });

            // Cache successful WebP fallback load
            imageMemoryCache.set(cacheKey, {
              src: webpFallback,
              format: 'webp',
              timestamp: Date.now()
            });

            setState(prev => ({
              ...prev,
              src: webpFallback,
              isLoaded: true,
              hasError: false,
              format: 'webp'
            }));
            return;
          } catch {
            // Continue to JPG fallback
          }
        }

        // Final fallback to JPG
        try {
          const jpgImg = new Image();
          
          await new Promise((resolve, reject) => {
            jpgImg.onload = resolve;
            jpgImg.onerror = reject;
            jpgImg.src = jpgFallback;
          });

          // Cache successful JPG load
          imageMemoryCache.set(cacheKey, {
            src: jpgFallback,
            format: 'jpg',
            timestamp: Date.now()
          });

          setState(prev => ({
            ...prev,
            src: jpgFallback,
            isLoaded: true,
            hasError: false,
            format: 'jpg'
          }));
        } catch {
          setState(prev => ({
            ...prev,
            hasError: true
          }));
        }
      }
    };

    loadImage();
  }, [state.isInView, webpPrimary, webpFallback, jpgFallback]);

  return [ref, state];
};
