import { useState, useEffect, useRef } from 'react';

interface UseLazyImageProps {
  src: string;
  threshold?: number;
}

interface LazyImageState {
  src: string | null;
  isLoaded: boolean;
  isInView: boolean;
  hasError: boolean;
}

export const useLazyImage = ({ src, threshold = 0.1 }: UseLazyImageProps): [React.RefObject<HTMLDivElement | null>, LazyImageState] => {
  const [state, setState] = useState<LazyImageState>({
    src: null,
    isLoaded: false,
    isInView: false,
    hasError: false
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
  }, [threshold]);
  useEffect(() => {
    if (!state.isInView) return;

    const loadImage = async () => {
      try {
        // Create image element for preloading
        const img = new Image();
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });

        setState(prev => ({
          ...prev,
          src: src,
          isLoaded: true,
          hasError: false
        }));
      } catch {
        setState(prev => ({
          ...prev,
          hasError: true
        }));
      }
    };

    loadImage();
  }, [state.isInView, src]);

  return [ref, state];
};
