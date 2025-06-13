import { useState, useEffect, useRef } from 'react';

interface UseLazyImageProps {
  webpSrc: string;
  jpgSrc: string;
  threshold?: number;
}

interface LazyImageState {
  src: string | null;
  isLoaded: boolean;
  isInView: boolean;
  hasError: boolean;
  format: 'webp' | 'jpg' | null;
}

export const useLazyImage = ({ webpSrc, jpgSrc, threshold = 0.1 }: UseLazyImageProps): [React.RefObject<HTMLDivElement | null>, LazyImageState] => {
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

    const loadImage = async () => {
      try {
        // Try WebP first
        const webpImg = new Image();
        
        await new Promise((resolve, reject) => {
          webpImg.onload = resolve;
          webpImg.onerror = reject;
          webpImg.src = webpSrc;
        });

        setState(prev => ({
          ...prev,
          src: webpSrc,
          isLoaded: true,
          hasError: false,
          format: 'webp'
        }));
      } catch {
        // Fallback to JPG if WebP fails
        try {
          const jpgImg = new Image();
          
          await new Promise((resolve, reject) => {
            jpgImg.onload = resolve;
            jpgImg.onerror = reject;
            jpgImg.src = jpgSrc;
          });

          setState(prev => ({
            ...prev,
            src: jpgSrc,
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
  }, [state.isInView, webpSrc, jpgSrc]);

  return [ref, state];
};
