import { Link } from 'react-router-dom';
import { useLazyImage } from '../hooks/useLazyImage';

interface NewsCardProps {
  title: string;
  excerpt: string;
  thumbnailUrl: string; // JPG fallback from Cloudinary
  imageUrl: string; // Local WebP first
  href?: string;
}

const NewsCard = ({ title, excerpt, thumbnailUrl, imageUrl, href = "/news" }: NewsCardProps) => {
  // Use 2-tier fallback: Local WebP → Cloudinary JPG
  const [ref, { src, isLoaded, hasError }] = useLazyImage({ 
    webpPrimary: imageUrl, // Local WebP file
    jpgFallback: thumbnailUrl // Cloudinary JPG fallback
  });

  return (
    <Link 
      to={href}
      className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-accent-200 transition-all duration-200"
    >
      {/* Image */}
      <div ref={ref} className="relative h-48 overflow-hidden">
        {!isLoaded && !hasError && (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
            <span className="text-gray-400 text-sm">Loading...</span>
          </div>
        )}
        
        {hasError && (
          <div className="w-full h-full bg-red-100 flex items-center justify-center">
            <span className="text-red-600 text-sm">Failed to load</span>
          </div>
        )}
        
        {src && isLoaded && (
          <img 
            src={src} 
            alt={title}
            className="w-full h-full object-fill group-hover:scale-105 transition-transform duration-300"
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200"></div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-accent mb-2 line-clamp-2 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3">
          {excerpt}
        </p>
      </div>
    </Link>
  );
};

export default NewsCard;
