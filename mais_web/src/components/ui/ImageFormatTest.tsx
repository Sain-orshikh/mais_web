import React from 'react';
import { useLazyImage } from '../hooks/useLazyImage';

// Test component to verify WebP/JPG fallback
const ImageFormatTest: React.FC = () => {
  const testFileName = "misheel mend-amar";
  
  const [ref, { src, isLoaded, hasError, format }] = useLazyImage({ 
    webpSrc: `/alumni/webp/${testFileName}.webp`,
    jpgSrc: `/alumni/jpg/${testFileName}.jpg`
  });

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Image Format Test</h2>
      
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
        <p><strong>Source:</strong> {src || 'None'}</p>
      </div>
      
      <div className="mt-4 text-xs text-gray-600">
        <p>This tests WebP-first loading with JPG fallback</p>
        <p>WebP: /alumni/webp/{testFileName}.webp</p>
        <p>JPG: /alumni/jpg/{testFileName}.jpg</p>
      </div>
    </div>
  );
};

export default ImageFormatTest;
