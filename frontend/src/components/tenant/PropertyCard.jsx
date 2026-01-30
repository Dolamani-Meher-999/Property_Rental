import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined, FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';

const PropertyCard = ({ property, onFavoriteToggle }) => {
  const {
    id, title, price, location, image,
    rating, beds, baths, area, isFavorite
  } = property;

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition border border-gray-100 overflow-hidden">
      <div className="relative h-44">
        <img src={image} alt={title} className="w-full h-full object-cover" />

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onFavoriteToggle(id);
          }}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
        >
          {isFavorite
            ? <FaHeart className="text-red-500" />
            : <FaRegHeart className="text-gray-400" />}
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between mb-1">
          <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
          <span className="flex items-center text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded">
            <FaStar className="mr-1" /> {rating}
          </span>
        </div>

        <p className="text-xs text-gray-500 mb-3">{location}</p>

        <div className="grid grid-cols-3 text-xs text-gray-600 mb-3">
          <span className="flex items-center gap-1"><FaBed /> {beds}</span>
          <span className="flex items-center gap-1"><FaBath /> {baths}</span>
          <span className="flex items-center gap-1"><FaRulerCombined /> {area}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-bold text-orange-600">
            ₹{price.toLocaleString()}<span className="text-xs text-gray-500"> /mo</span>
          </span>

          <Link
            to={`/property/${id}`}
            className="text-xs font-medium text-orange-600 hover:underline"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
