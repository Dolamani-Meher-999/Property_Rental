import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyCard from '../../../components/tenant/PropertyCard';
import axios from "axios";

import { 
  FaSearch, 
  FaBed, 
  FaBath, 
  FaRulerCombined, 
  FaStar, 
  FaRegHeart, 
  FaHeart, 
  FaMapMarkerAlt,
  FaFilter,
  FaHome,
  FaStar as FaSolidStar
} from 'react-icons/fa';

// Mock data with more realistic properties
// const mockProperties = [
//   {
//     id: 1,
//     title: 'Luxury Apartment in Downtown',
//     type: 'Apartment',
//     price: 2500,
//     location: 'Downtown, New York',
//     image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
//     rating: 4.8,
//     beds: 2,
//     baths: 2,
//     area: 1200,
//     featured: true
//   },
//   {
//     id: 2,
//     title: 'Modern Loft with City View',
//     type: 'Loft',
//     price: 3200,
//     location: 'Soho, New York',
//     image: 'https://images.unsplash.com/photo-1502672260266-37a6c1f2f3a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
//     rating: 4.9,
//     beds: 1,
//     baths: 1,
//     area: 950,
//     featured: false
//   },
//   {
//     id: 3,
//     title: 'Spacious Family House',
//     type: 'House',
//     price: 4200,
//     location: 'Brooklyn, New York',
//     image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
//     rating: 4.7,
//     beds: 4,
//     baths: 2.5,
//     area: 2200,
//     featured: true
//   }
// ];

const propertyTypes = ['All', 'Apartment', 'House', 'Condo', 'Loft', 'Townhouse'];
const priceRanges = [
  { label: 'Any Price', value: '' },
  { label: 'Under $1,000', value: '0-1000' },
  { label: '$1,000 - $2,000', value: '1000-2000' },
  { label: '$2,000 - $3,000', value: '2000-3000' },
  { label: '$3,000 - $5,000', value: '3000-5000' },
  { label: '$5,000+', value: '5000-10000' }
];

const TenantDashboard = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [favorites, setFavorites] = useState(new Set());
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    beds: '',
    price: '',
    search: '',
    sort: 'featured'
  });
  const navigate = useNavigate();

  useEffect(() => {
  const fetchProperties = async () => {
    try {
      const response = await axios.get("/api/properties");

      const approved = response.data
        .filter(p => p.status === "approved")
        .map(p => ({
          id: p._id,
          title: p.title,
          type: "House",
          price: p.price,
          location: p.location,
          image: p.images?.[0] || "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
          rating: 4.5,
          beds: 2,
          baths: 1,
          area: 1000,
          featured: false
        }));

      setProperties(approved);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProperties();
}, []);


  const toggleFavorite = (propertyId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(propertyId)) {
      newFavorites.delete(propertyId);
    } else {
      newFavorites.add(propertyId);
    }
    setFavorites(newFavorites);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      type: '',
      beds: '',
      price: '',
      search: '',
      sort: 'featured'
    });
  };

  const sortProperties = (properties) => {
    const { sort } = filters;
    return [...properties].sort((a, b) => {
      switch (sort) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'featured':
        default:
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
      }
    });
  };

  const filteredProperties = sortProperties(
    properties.filter(property => {
      // Apply search filter
      if (filters.search && 
          !property.title.toLowerCase().includes(filters.search.toLowerCase()) && 
          !property.location.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      // Apply type filter
      if (filters.type && property.type.toLowerCase() !== filters.type.toLowerCase()) {
        return false;
      }
      
      // Apply beds filter
      if (filters.beds && property.beds < parseInt(filters.beds)) {
        return false;
      }
      
      // Apply price filter
      if (filters.price) {
        const [min, max] = filters.price.split('-').map(Number);
        if (property.price < min || (max && property.price > max)) return false;
      }
      
      // Apply favorites filter
      if (activeTab === 'favorites' && !favorites.has(property.id)) {
        return false;
      }
      
      return true;
    })
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Home</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Discover and book the best rental properties in your desired location
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
            <div className="w-full">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="search"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Search by location, property name, or address..."
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                />
              </div>
            </div>

            <div className="w-full md:w-48">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Property Type
              </label>
              <select
                id="type"
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">All Types</option>
                {propertyTypes.map(type => (
                  <option key={type} value={type.toLowerCase()}>{type}</option>
                ))}
              </select>
            </div>

            <div className="w-full md:w-32">
              <label htmlFor="beds" className="block text-sm font-medium text-gray-700 mb-1">
                Beds
              </label>
              <select
                id="beds"
                name="beds"
                value={filters.beds}
                onChange={handleFilterChange}
                className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>

            <div className="w-full md:w-48">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <select
                id="price"
                name="price"
                value={filters.price}
                onChange={handleFilterChange}
                className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
            </div>

            <div className="w-full md:w-48">
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                id="sort"
                name="sort"
                value={filters.sort}
                onChange={handleFilterChange}
                className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            <button
              onClick={clearFilters}
              className="w-full md:w-auto px-4 py-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Results and Tabs */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
            {activeTab === 'favorites' ? 'My Favorites' : 'Available Properties'}
            <span className="text-gray-500 text-lg ml-2">({filteredProperties.length})</span>
          </h2>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'all'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Properties
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${
                activeTab === 'favorites'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FaHeart className={`mr-2 ${activeTab === 'favorites' ? 'text-red-500' : 'text-gray-400'}`} />
              Favorites
              {favorites.size > 0 && (
                <span className="ml-2 bg-blue-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  {favorites.size}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredProperties.map(property => (
              <PropertyCard
                key={property.id}
                property={{
                  ...property,
                  isFavorite: favorites.has(property.id)
                }}
                onFavoriteToggle={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-blue-50 mb-4">
              <FaSearch className="h-10 w-10 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              {filters.search || filters.type || filters.beds || filters.price
                ? "We couldn't find any properties matching your criteria. Try adjusting your search or filter settings."
                : "There are currently no properties available. Please check back later."}
            </p>
            {(filters.search || filters.type || filters.beds || filters.price) && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Featured Properties Section */}
        {activeTab === 'all' && filteredProperties.some(p => p.featured) && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProperties
                .filter(property => property.featured)
                .slice(0, 2)
                .map(property => (
                  <div 
                    key={`featured-${property.id}`}
                    className="relative rounded-xl overflow-hidden shadow-lg group"
                  >
                    <div className="relative h-64">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <button
                        onClick={() => toggleFavorite(property.id)}
                        className="absolute top-4 right-4 p-2 bg-white/90 rounded-full text-gray-700 hover:text-red-500 transition-colors"
                        aria-label={favorites.has(property.id) ? "Remove from favorites" : "Add to favorites"}
                      >
                        {favorites.has(property.id) ? (
                          <FaHeart className="h-5 w-5 text-red-500" />
                        ) : (
                          <FaRegHeart className="h-5 w-5" />
                        )}
                      </button>
                      {property.featured && (
                        <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                          Featured
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold">{property.title}</h3>
                          <p className="text-blue-200 flex items-center">
                            <FaMapMarkerAlt className="mr-1" /> {property.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">${property.price}<span className="text-sm font-normal">/mo</span></p>
                        </div>
                      </div>
                      <div className="flex items-center mt-4 text-sm">
                        <div className="flex items-center mr-4">
                          <FaBed className="mr-1 text-blue-200" /> {property.beds} beds
                        </div>
                        <div className="flex items-center mr-4">
                          <FaBath className="mr-1 text-blue-200" /> {property.baths} baths
                        </div>
                        <div className="flex items-center">
                          <FaRulerCombined className="mr-1 text-blue-200" /> {property.area} sqft
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
            <p className="text-lg text-blue-100 mb-6">
              Sign up for property alerts and be the first to know about new listings that match your criteria.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
              />
              <button className="px-6 py-3 bg-white text-blue-700 font-medium rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-colors">
                Get Notified
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;