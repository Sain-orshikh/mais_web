// API Configuration
// Uses environment variable in production, falls back to localhost in development
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Helper function to build API URLs
export const buildApiUrl = (path: string): string => {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};
