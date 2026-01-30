import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined, FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';

const PropertyCard = ({ property, onFavoriteToggle }) => {
  const { 
    id, 
    title, 
    price, 
    location, 
    image, 
    rating, 
    beds, 
    baths, 
    area,
    isFavorite
  } = property;

  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative pt-[60%] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onFavoriteToggle(id);
          }}
          className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full shadow-sm hover:bg-gray-100 transition-colors z-10"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? (
            <FaHeart className="h-4 w-4 text-red-500" />
          ) : (
            <FaRegHeart className="h-4 w-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-3 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-1" title={title}>
            {title}
          </h3>
          <div className="flex items-center bg-blue-50 text-blue-700 text-xs px-1.5 py-0.5 rounded">
            <FaStar className="mr-0.5 h-3 w-3" />
            <span>{rating}</span>
          </div>
        </div>

        <p className="text-gray-500 text-xs mb-2 flex items-center">
          <span className="line-clamp-1">{location}</span>
        </p>

        <div className="grid grid-cols-3 gap-1 text-xs text-gray-600 mt-auto pt-2 border-t border-gray-100">
          <div className="flex flex-col items-center">
            <span className="font-medium">{beds}</span>
            <span className="text-gray-500 text-[10px]">Beds</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-medium">{baths}</span>
            <span className="text-gray-500 text-[10px]">Baths</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-medium">{area}</span>
            <span className="text-gray-500 text-[10px]">sqft</span>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="font-bold text-sm text-gray-900">
            {formatPrice(price)}<span className="text-xs font-normal text-gray-500">/mo</span>
          </span>
          <Link
            to={`/property/${id}`}
            className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;