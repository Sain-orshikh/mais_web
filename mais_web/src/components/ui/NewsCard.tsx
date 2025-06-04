import { Link } from 'react-router-dom';

interface NewsCardProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  href?: string;
}

const NewsCard = ({ title, excerpt, imageUrl, href = "/news" }: NewsCardProps) => {
  return (
    <Link 
      to={href}
      className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-accent-200 transition-all duration-200"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
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
