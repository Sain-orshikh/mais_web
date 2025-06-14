import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import swManager from '../../utils/serviceWorkerManager';

interface CacheInfo {
  cacheSize: number;
  cacheName: string;
}

const CacheManagement: React.FC = () => {
  const [cacheInfo, setCacheInfo] = useState<CacheInfo | null>(null);
  const [swStatus, setSwStatus] = useState<string>('checking');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkServiceWorkerStatus();
    loadCacheInfo();
  }, []);

  const checkServiceWorkerStatus = () => {
    setSwStatus(swManager.getStatus());
  };

  const loadCacheInfo = async () => {
    try {
      const info = await swManager.getCacheInfo();
      setCacheInfo(info);
    } catch (error) {
      console.error('Failed to load cache info:', error);
    }
  };

  const handleClearCache = async () => {
    if (!confirm('Are you sure you want to clear the image cache? This will remove all cached alumni images.')) {
      return;
    }

    setIsLoading(true);
    try {
      await swManager.clearCache();
      setCacheInfo(null);
      alert('Cache cleared successfully! Images will be re-downloaded on next visit.');    } catch (error) {
      console.error('Failed to clear cache:', error);
      alert('Failed to clear cache. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCacheSize = (size: number): string => {
    if (size === 0) return '0 images';
    if (size === 1) return '1 image';
    return `${size} images`;
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active': return 'text-green-600';
      case 'installing': return 'text-yellow-600';
      case 'not-supported': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusText = (status: string): string => {
    switch (status) {
      case 'active': return '✅ Active';
      case 'installing': return '🔄 Installing';
      case 'not-supported': return '❌ Not Supported';
      case 'not-registered': return '⚠️ Not Registered';
      default: return '❓ Unknown';
    }
  };

  if (swStatus === 'not-supported') {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">
          Cache Not Available
        </h3>
        <p className="text-yellow-700 text-sm">
          Your browser doesn't support advanced caching features. Images will still load normally but won't be cached for offline use.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Image Cache Management
      </h3>

      <div className="space-y-4">
        {/* Service Worker Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Service Worker Status:</span>
          <span className={`text-sm font-medium ${getStatusColor(swStatus)}`}>
            {getStatusText(swStatus)}
          </span>
        </div>

        {/* Cache Information */}
        {cacheInfo && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Cached Images:</span>
            <span className="text-sm font-medium text-gray-900">
              {formatCacheSize(cacheInfo.cacheSize)}
            </span>
          </div>
        )}

        {/* Cache Benefits Info */}
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            <strong>Benefits:</strong> Cached images load instantly and work offline. 
            Cache is automatically managed and expires after 30 days.
          </p>
        </div>

        {/* Clear Cache Button */}
        {swStatus === 'active' && cacheInfo && cacheInfo.cacheSize > 0 && (
          <button
            onClick={handleClearCache}
            disabled={isLoading}
            className="w-full bg-red-50 hover:bg-red-100 text-red-700 font-medium py-2 px-4 rounded-lg border border-red-200 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-700" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Clearing Cache...
              </span>
            ) : (
              'Clear Image Cache'
            )}
          </button>
        )}

        {/* Refresh Button */}
        <button
          onClick={() => {
            checkServiceWorkerStatus();
            loadCacheInfo();
          }}
          className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg border border-gray-200 transition-colors"
        >
          Refresh Status
        </button>
      </div>
    </motion.div>
  );
};

export default CacheManagement;
