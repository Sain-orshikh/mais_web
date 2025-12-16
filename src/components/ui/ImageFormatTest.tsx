import React from 'react';
import { useLazyImage } from '../hooks/useLazyImage';
import { generateSmartAlumniUrls } from '../../utils/cloudinaryConfig';

// Test component to verify 3-tier Cloudinary fallback
const ImageFormatTest: React.FC = () => {
  const testFileName = "misheel mend-amar";
  const urls = generateSmartAlumniUrls(testFileName);
  
  const [ref, { src, isLoaded, hasError, format }] = useLazyImage({ 
    webpPrimary: urls.webpPrimary,
    webpFallback: urls.webpFallback,
    jpgFallback: urls.jpgFallback
  });

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Cloudinary 3-Tier Fallback Test</h2>
      
      <div ref={ref} className="mb-4">
        <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
          {!isLoaded && !hasError && (
            <div className="w-full h-full flex items-center justify-center">
              <span>Loading...</span>
            </div>
          )}
          
          {hasError && (
            <div className="w-full h-full flex items-center justify-center bg-red-100">
              <span className="text-red-600">Failed to load</span>
            </div>
          )}
          
          {src && isLoaded && (
            <img
              src={src}
              alt="Test"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
      
      <div className="text-sm space-y-1">
        <p><strong>Status:</strong> {isLoaded ? 'Loaded' : hasError ? 'Error' : 'Loading...'}</p>
        <p><strong>Format:</strong> {format || 'None'}</p>
        <p><strong>Account:</strong> {urls.accountUsed}</p>
        <p><strong>Source:</strong> {src || 'None'}</p>
      </div>
      
      <div className="mt-4 text-xs text-gray-600 space-y-1">
        <p><strong>3-Tier Fallback Test:</strong></p>
        <p>1. WebP Primary ({urls.accountUsed}): {urls.webpPrimary}</p>
        <p>2. WebP Fallback: {urls.webpFallback}</p>
        <p>3. JPG Fallback: {urls.jpgFallback}</p>
      </div>
    </div>
  );
};

export default ImageFormatTest;
