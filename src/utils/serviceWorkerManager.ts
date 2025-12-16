// Service Worker registration and management utilities

interface ServiceWorkerMessage {
  type: 'CLEAR_CACHE' | 'GET_CACHE_INFO' | 'PRELOAD_IMAGES';
  data?: {
    urls?: string[];
  };
}

interface ServiceWorkerResponse {
  success?: boolean;
  error?: string;
  cacheSize?: number;
  cacheName?: string;
}

class ServiceWorkerManager {
  private swRegistration: ServiceWorkerRegistration | null = null;
  private isSupported: boolean = false;

  constructor() {
    this.isSupported = 'serviceWorker' in navigator;
  }

  // Register the service worker
  async register(): Promise<boolean> {
    if (!this.isSupported) {
      console.log('[SW Manager] Service Worker not supported');
      return false;
    }

    try {
      console.log('[SW Manager] Registering service worker...');
      this.swRegistration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      // Handle service worker updates
      this.swRegistration.addEventListener('updatefound', () => {
        console.log('[SW Manager] Service worker update found');
        const newWorker = this.swRegistration!.installing;
        
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('[SW Manager] New service worker installed, page refresh recommended');
              // You could show a toast notification here
            }
          });
        }
      });

      console.log('[SW Manager] Service worker registered successfully');
      return true;
    } catch (error) {
      console.error('[SW Manager] Service worker registration failed:', error);
      return false;
    }
  }
  // Send message to service worker and get response
  private async sendMessage(message: ServiceWorkerMessage): Promise<ServiceWorkerResponse> {
    if (!this.swRegistration?.active) {
      throw new Error('Service worker not active');
    }

    return new Promise((resolve, reject) => {
      const messageChannel = new MessageChannel();
      
      messageChannel.port1.onmessage = (event) => {
        if (event.data.error) {
          reject(new Error(event.data.error));
        } else {
          resolve(event.data);
        }
      };

      this.swRegistration!.active!.postMessage(message, [messageChannel.port2]);
    });
  }

  // Clear all cached images
  async clearCache(): Promise<boolean> {
    try {
      await this.sendMessage({ type: 'CLEAR_CACHE' });
      console.log('[SW Manager] Cache cleared successfully');
      return true;
    } catch (error) {
      console.error('[SW Manager] Failed to clear cache:', error);
      return false;
    }
  }
  // Get cache information
  async getCacheInfo(): Promise<{ cacheSize: number; cacheName: string } | null> {
    try {
      const info = await this.sendMessage({ type: 'GET_CACHE_INFO' });
      if (info.cacheSize !== undefined && info.cacheName !== undefined) {
        return {
          cacheSize: info.cacheSize,
          cacheName: info.cacheName
        };
      }
      return null;
    } catch (error) {
      console.error('[SW Manager] Failed to get cache info:', error);
      return null;
    }
  }

  // Preload images (useful for preloading alumni images)
  async preloadImages(urls: string[]): Promise<boolean> {
    try {
      await this.sendMessage({ 
        type: 'PRELOAD_IMAGES', 
        data: { urls } 
      });
      console.log('[SW Manager] Successfully preloaded', urls.length, 'images');
      return true;
    } catch (error) {
      console.error('[SW Manager] Failed to preload images:', error);
      return false;
    }
  }

  // Check if service worker is supported and active
  isActive(): boolean {
    return this.isSupported && !!this.swRegistration?.active;
  }

  // Get registration status
  getStatus(): string {
    if (!this.isSupported) return 'not-supported';
    if (!this.swRegistration) return 'not-registered';
    if (this.swRegistration.active) return 'active';
    if (this.swRegistration.installing) return 'installing';
    if (this.swRegistration.waiting) return 'waiting';
    return 'unknown';
  }
}

// Create singleton instance
const swManager = new ServiceWorkerManager();

export default swManager;

// Types for TypeScript
export interface CacheInfo {
  cacheSize: number;
  cacheName: string;
}

export interface ServiceWorkerStatus {
  isSupported: boolean;
  isActive: boolean;
  status: string;
}
