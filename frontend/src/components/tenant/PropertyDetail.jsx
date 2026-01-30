import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHeart, FaRegHeart, FaStar, FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from 'react-icons/fa';

// Mock data - in a real app, this would come from an API or context
import { properties } from '../../../data/properties';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Find the property by id
  const property = properties.find(p => p.id === id);
  
  // If property not found, redirect to home
  useEffect(() => {
    if (!property) {
      navigate('/');
    }
  }, [property, navigate]);
  
  if (!property) return null;
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // In a real app, you would update the favorite status in your state/API here
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
      >
        <FaArrowLeft className="mr-2" /> Back to Properties
      </button>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{property.title}</h1>
              <div className="flex items-center text-gray-600 mt-1">
                <FaMapMarkerAlt className="mr-2 text-blue-500" />
                <span>{property.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                <FaStar className="mr-1" />
                <span className="font-medium">{property.rating}</span>
              </div>
              <button 
                onClick={toggleFavorite}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorite ? (
                  <FaHeart className="h-5 w-5 text-red-500" />
                ) : (
                  <FaRegHeart className="h-5 w-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden bg-gray-100" style={{ paddingTop: '60%' }}>
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/800x600/e2e8f0/94a3b8?text=Property+Image';
                  }}
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="relative rounded-lg overflow-hidden bg-gray-100" style={{ paddingTop: '75%' }}>
                    <img 
                      src={property.image} 
                      alt={`${property.title} ${i}`}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/300x225/e2e8f0/94a3b8?text=Property';
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Property Details</h2>
                
                {/* Price */}
                <div className="mb-6">
                  <div className="text-3xl font-bold text-gray-900">
                    ${property.price.toLocaleString()}
                    <span className="text-lg font-normal text-gray-500">/month</span>
                  </div>
                  <div className="text-green-600 font-medium mt-1 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Available Now
                  </div>
                </div>
                
                {/* Property Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <FaBed className="h-6 w-6 text-blue-500 mb-1" />
                    <span className="text-sm text-gray-600">{property.beds} Beds</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <FaBath className="h-6 w-6 text-blue-500 mb-1" />
                    <span className="text-sm text-gray-600">{property.baths} Baths</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <FaRulerCombined className="h-6 w-6 text-blue-500 mb-1" />
                    <span className="text-sm text-gray-600">{property.area} sqft</span>
                  </div>
                </div>
                
                {/* Description */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {property.description || 'No description available for this property.'}
                  </p>
                </div>
                
                {/* Features */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {property.features && property.features.length > 0 ? (
                      property.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No features listed</p>
                    )}
                  </div>
                </div>
              
                {/* Contact Form */}
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-4">Schedule a Viewing</h3>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea
                        id="message"
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="I'm interested in this property..."
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Request Viewing
                    </button>
                  </form>
                </div>
              </div>
              
              {/* Additional Details */}
              <div className="bg-white p-6 rounded-xl border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4">Additional Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Property Type</h4>
                    <p className="text-gray-600">{property.type || 'N/A'}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Year Built</h4>
                    <p className="text-gray-600">{property.yearBuilt || 'N/A'}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Garage</h4>
                    <p className="text-gray-600">{property.garage ? `${property.garage} cars` : 'No'}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Available From</h4>
                    <p className="text-gray-600">{property.availableFrom || 'Immediately'}</p>
                  </div>
                </div>
              </div>
              
              {/* Map */}
              <div className="bg-white p-6 rounded-xl border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4">Location</h3>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <FaMapMarkerAlt className="h-8 w-8 text-red-500 mx-auto mb-2" />
                    <p className="text-gray-600">Map showing property location</p>
                    <p className="text-sm text-gray-500">{property.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
