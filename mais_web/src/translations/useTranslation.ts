import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Language, type LanguageType } from '../store/ThemeAtom';
import type { AboutUsTranslations, HomeTranslations, CommonTranslations, NewsPageTranslations, WorkInProgressTranslations } from './types';

// Translation cache to store loaded translations
const translationCache = new Map<string, AboutUsTranslations | HomeTranslations | CommonTranslations | NewsPageTranslations | WorkInProgressTranslations>();

// Translation loading functions
const loadTranslation = async (language: LanguageType): Promise<AboutUsTranslations> => {
  const cacheKey = `aboutUs_${language}`;
    // Return from cache if already loaded
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)! as AboutUsTranslations;
  }

  // Dynamically import the translation
  let translationModule;
  try {
    if (language === 'en') {
      translationModule = await import('./en/aboutUs');
    } else if (language === 'mn') {
      translationModule = await import('./mn/aboutUs');
    } else {
      // Fallback to English
      translationModule = await import('./en/aboutUs');
    }
    
    const translations = translationModule.aboutUsTranslations;
    
    // Cache the loaded translation
    translationCache.set(cacheKey, translations);
    
    return translations;
  } catch (error) {
    console.error(`Failed to load translation for language: ${language}`, error);
    
    // Fallback to English
    if (language !== 'en') {
      const fallbackModule = await import('./en/aboutUs');
      return fallbackModule.aboutUsTranslations;
    }
    
    throw error;
  }
};

// Home translation loading functions
const loadHomeTranslation = async (language: LanguageType): Promise<HomeTranslations> => {
  const cacheKey = `home_${language}`;
  
  // Return from cache if already loaded
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)! as HomeTranslations;
  }

  // Dynamically import the translation
  let translationModule;
  try {
    if (language === 'en') {
      translationModule = await import('./en/home');
    } else if (language === 'mn') {
      translationModule = await import('./mn/home');
    } else {
      // Fallback to English
      translationModule = await import('./en/home');
    }
    
    const translations = translationModule.homeTranslations;
    
    // Cache the loaded translation
    translationCache.set(cacheKey, translations);
    
    return translations;
  } catch (error) {
    console.error(`Failed to load home translation for language: ${language}`, error);
    
    // Fallback to English
    if (language !== 'en') {
      const fallbackModule = await import('./en/home');
      return fallbackModule.homeTranslations;
    }
    
    throw error;
  }
};

// Common translation loading functions
const loadCommonTranslation = async (language: LanguageType): Promise<CommonTranslations> => {
  const cacheKey = `common_${language}`;
  
  // Return from cache if already loaded
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)! as CommonTranslations;
  }

  // Dynamically import the translation
  let translationModule;
  try {
    if (language === 'en') {
      translationModule = await import('./en/common');
    } else if (language === 'mn') {
      translationModule = await import('./mn/common');
    } else {
      // Fallback to English
      translationModule = await import('./en/common');
    }
    
    const translations = translationModule.default;
    
    // Cache the loaded translation
    translationCache.set(cacheKey, translations);
    
    return translations;
  } catch (error) {
    console.error(`Failed to load common translation for language: ${language}`, error);
    
    // Fallback to English
    if (language !== 'en') {
      const fallbackModule = await import('./en/common');
      return fallbackModule.default;
    }
      throw error;
  }
};

// NewsPage translation loading functions
const loadNewsPageTranslation = async (language: LanguageType): Promise<NewsPageTranslations> => {
  const cacheKey = `newsPage_${language}`;
  
  // Return from cache if already loaded
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)! as NewsPageTranslations;
  }

  // Dynamically import the translation
  let translationModule;
  try {
    if (language === 'en') {
      translationModule = await import('./en/newsPage');
    } else if (language === 'mn') {
      translationModule = await import('./mn/newsPage');
    } else {
      // Fallback to English
      translationModule = await import('./en/newsPage');
    }
    
    const translations = translationModule.default;
    
    // Cache the loaded translation
    translationCache.set(cacheKey, translations);
    
    return translations;
  } catch (error) {
    console.error(`Failed to load newsPage translation for language: ${language}`, error);
    
    // Fallback to English
    if (language !== 'en') {
      const fallbackModule = await import('./en/newsPage');
      return fallbackModule.default;
    }
    
    throw error;
  }
};

// WorkInProgress translation loading functions
const loadWorkInProgressTranslation = async (language: LanguageType): Promise<WorkInProgressTranslations> => {
  const cacheKey = `workInProgress_${language}`;
  
  // Return from cache if already loaded
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)! as WorkInProgressTranslations;
  }

  // Dynamically import the translation
  let translationModule;
  try {
    if (language === 'en') {
      translationModule = await import('./en/workInProgress');
    } else if (language === 'mn') {
      translationModule = await import('./mn/workInProgress');
    } else {
      // Fallback to English
      translationModule = await import('./en/workInProgress');
    }
    
    const translations = translationModule.default;
    
    // Cache the loaded translation
    translationCache.set(cacheKey, translations);
    
    return translations;
  } catch (error) {
    console.error(`Failed to load workInProgress translation for language: ${language}`, error);
    
    // Fallback to English
    if (language !== 'en') {
      const fallbackModule = await import('./en/workInProgress');
      return fallbackModule.default;
    }
    
    throw error;
  }
};

export const useAboutUsTranslation = () => {
  const [language] = useAtom(Language);
  const [translations, setTranslations] = useState<AboutUsTranslations | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadTranslations = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const translationData = await loadTranslation(language);
        
        // Only update state if component is still mounted
        if (isMounted) {
          setTranslations(translationData);
          setLoading(false);
        }      } catch (err) {
        console.error('Translation loading error:', err);
        if (isMounted) {
          setError('Failed to load translations');
          setLoading(false);
        }
      }
    };

    loadTranslations();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [language]);

  return {
    t: translations,
    loading,
    error,
    language
  };
};

export const useHomeTranslation = () => {
  const [language] = useAtom(Language);
  const [translations, setTranslations] = useState<HomeTranslations | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadTranslations = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const translationData = await loadHomeTranslation(language);
        
        // Only update state if component is still mounted
        if (isMounted) {
          setTranslations(translationData);
          setLoading(false);
        }
      } catch (err) {
        console.error('Home translation loading error:', err);
        if (isMounted) {
          setError('Failed to load home translations');
          setLoading(false);
        }
      }
    };

    loadTranslations();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [language]);

  return {
    t: translations,
    loading,
    error,
    language
  };
};

// Preload function for better performance
export const preloadAboutUsTranslations = async (language: LanguageType) => {
  try {
    await loadTranslation(language);
  } catch (error) {
    console.warn(`Failed to preload translations for ${language}:`, error);
  }
};

export const useNewsPageTranslation = () => {
  const [language] = useAtom(Language);
  const [translations, setTranslations] = useState<NewsPageTranslations | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadTranslations = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const translationData = await loadNewsPageTranslation(language);
        
        // Only update state if component is still mounted
        if (isMounted) {
          setTranslations(translationData);
          setLoading(false);
        }
      } catch (err) {
        console.error('NewsPage translation loading error:', err);
        if (isMounted) {
          setError('Failed to load newsPage translations');
          setLoading(false);
        }
      }
    };

    loadTranslations();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [language]);

  return {
    t: translations,
    loading,
    error,
    language
  };
};

export const useWorkInProgressTranslation = () => {
  const [language] = useAtom(Language);
  const [translations, setTranslations] = useState<WorkInProgressTranslations | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadTranslations = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const translationData = await loadWorkInProgressTranslation(language);
        
        // Only update state if component is still mounted
        if (isMounted) {
          setTranslations(translationData);
          setLoading(false);
        }
      } catch (err) {
        console.error('WorkInProgress translation loading error:', err);
        if (isMounted) {
          setError('Failed to load workInProgress translations');
          setLoading(false);
        }
      }
    };

    loadTranslations();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [language]);

  return {
    t: translations,
    loading,
    error,
    language
  };
};

export const useCommonTranslation = () => {
  const [language] = useAtom(Language);
  const [translations, setTranslations] = useState<CommonTranslations | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadTranslations = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const translationData = await loadCommonTranslation(language);
        
        // Only update state if component is still mounted
        if (isMounted) {
          setTranslations(translationData);
          setLoading(false);
        }
      } catch (err) {
        console.error('Common translation loading error:', err);
        if (isMounted) {
          setError('Failed to load common translations');
          setLoading(false);
        }
      }
    };

    loadTranslations();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [language]);

  return {
    t: translations,
    loading,
    error,
    language
  };
};

// Preload function for home translations
export const preloadHomeTranslations = async (language: LanguageType) => {
  try {
    await loadHomeTranslation(language);
  } catch (error) {
    console.warn(`Failed to preload home translations for ${language}:`, error);
  }
};

// Clear cache function for development/testing
export const clearTranslationCache = () => {
  translationCache.clear();
};
