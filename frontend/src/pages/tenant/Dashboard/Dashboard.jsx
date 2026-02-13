import { useState, useEffect } from 'react';
import PropertyCard from '../../../components/tenant/PropertyCard';
import Navbar from '../../../components/layout/Navbar';
import axios from "axios";
import { FaSearch, FaHeart, FaBell, FaUserCircle, FaHome } from 'react-icons/fa';



const propertyTypes = ['All', 'Apartment', 'House', 'Condo', 'Loft', 'Townhouse'];

const priceRanges = [
  { label: 'Any Price', value : '' },
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
  const [filters, setFilters] = useState({
    type: '',
    beds: '',
    price: '',
    search: '',
    sort: 'featured'
  });

  // ✅ ADD THIS HERE (inside component)
  const [activeSection, setActiveSection] = useState("home");

  
  const handleNavigateSection = (section) => {
    setActiveSection(section);

    if (section === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (section === "properties" || section === "favorites") {
      document
        .getElementById("properties-section")
        ?.scrollIntoView({ behavior: "smooth" });

      if (section === "favorites") {
        setActiveTab("favorites");
      } else {
        setActiveTab("all");
      }
    }
  };
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get('/api/properties');

        const approved = res.data
          .filter(p => p.status === 'approved')
          .map(p => ({
            id: p._id,
            title: p.title,
            type: 'House',
            price: p.price,
            location: p.location,
            image: p.images?.[0],
            rating: 4.5,
            beds: 2,
            baths: 1,
            area: 1000,
            featured: false
          }));

        setProperties(approved);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const toggleFavorite = (id) => {
    const next = new Set(favorites);
    next.has(id) ? next.delete(id) : next.add(id);
    setFavorites(next);
  };

  const filtered = properties.filter(p => {
    if (
      filters.search &&
      !p.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      !p.location.toLowerCase().includes(filters.search.toLowerCase())
    ) return false;

    if (filters.type && p.type.toLowerCase() !== filters.type.toLowerCase()) return false;

    if (filters.price) {
      const [min, max] = filters.price.split('-').map(Number);
      if (p.price < min || (max && p.price > max)) return false;
    }

    if (activeTab === 'favorites' && !favorites.has(p.id)) return false;

    return true;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-orange-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar
      onNavigateSection={handleNavigateSection}
      activeSection={activeSection}
    />


      {/* ================= HERO (UNCHANGED) ================= */}
      <div
        className="relative border-b border-gray-200"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div id="properties-section" className="max-w-7xl mx-auto px-6 py-10">

          <span className="inline-block mb-4 px-3 py-1 text-sm rounded-full bg-orange-100 text-orange-700">
            Verified Rental Listings
          </span>

          <h1 className="text-4xl font-bold text-white leading-tight">
            Find Your Perfect Home
          </h1>

          <p className="text-white/90 mt-4 max-w-2xl">
            Browse verified rental properties from trusted owners across top locations.
            Simple, fast, and secure.
          </p>

          <div className="mt-6 flex gap-3">
            <button className="px-6 py-3 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition">
              Explore Properties
            </button>

            <button className="px-6 py-3 rounded-lg border border-white/70 text-white hover:bg-white/10 transition">
              How it Works
            </button>
          </div>
        </div>
      </div>

      {/* ================= BODY WITH GRADIENT ================= */}
      <div className="app-body-gradient">
        <div className="max-w-7xl mx-auto px-6 py-10">

          {/* FILTER BAR */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2 relative">
                <FaSearch className="absolute top-3.5 left-3 text-gray-400" />
                <input
                  placeholder="Search by location or name"
                  value={filters.search}
                  onChange={e => setFilters({ ...filters, search: e.target.value })}
                  className="pl-10 w-full py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <select
                value={filters.type}
                onChange={e => setFilters({ ...filters, type: e.target.value })}
                className="py-3 border rounded-lg focus:ring-orange-500"
              >
                <option value="">All Types</option>
                {propertyTypes.map(t => (
                  <option key={t} value={t.toLowerCase()}>{t}</option>
                ))}
              </select>

              <select
                value={filters.price}
                onChange={e => setFilters({ ...filters, price: e.target.value })}
                className="py-3 border rounded-lg focus:ring-orange-500"
              >
                {priceRanges.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>

              <button
                onClick={() =>
                  setFilters({ type: '', beds: '', price: '', search: '', sort: 'featured' })
                }
                className="py-3 border rounded-lg text-gray-600 hover:bg-orange-50"
              >
                Clear
              </button>
            </div>
          </div>

          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Available Properties <span className="text-orange-500">•</span> {filtered.length}
            </h2>

            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg text-sm ${
                  activeTab === 'all'
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-gray-600 hover:bg-orange-50'
                }`}
              >
                All
              </button>

              <button
                onClick={() => setActiveTab('favorites')}
                className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 ${
                  activeTab === 'favorites'
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-gray-600 hover:bg-orange-50'
                }`}
              >
                <FaHeart className="text-red-500" /> Favorites
              </button>
            </div>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map(p => (
              <PropertyCard
                key={p.id}
                property={{ ...p, isFavorite: favorites.has(p.id) }}
                onFavoriteToggle={toggleFavorite}
              />
            ))}
          </div>

          <Footer />


        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;

function Footer() {
  return (
    <footer className="w-full mt-16 bg-gradient-to-r from-slate-100 to-orange-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

          {/* BRAND */}
          <div>
            <h2 className="text-gray-900 text-xl font-bold mb-4">
              RentEasy
            </h2>
            <p className="text-sm text-gray-600">
              Find your perfect home with ease. Connect with trusted
              property owners and explore verified listings across
              your city.
            </p>
          </div>

          {/* PRODUCT */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">
              Product
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-orange-500 cursor-pointer">
                Browse Properties
              </li>
              <li className="hover:text-orange-500 cursor-pointer">
                Saved Listings
              </li>
              <li className="hover:text-orange-500 cursor-pointer">
                Tenant Dashboard
              </li>
              <li className="hover:text-orange-500 cursor-pointer">
                Chat with Owners
              </li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">
              Support
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-orange-500 cursor-pointer">
                Help Center
              </li>
              <li className="hover:text-orange-500 cursor-pointer">
                Contact Support
              </li>
              <li className="hover:text-orange-500 cursor-pointer">
                FAQs
              </li>
              <li className="hover:text-orange-500 cursor-pointer">
                Community
              </li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">
              Stay updated
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Get latest property updates.
            </p>

            <div className="flex shadow-sm">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 w-full rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-r-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>


        {/* BOTTOM BAR */}
        <div className="border-t border-gray-300 pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-600">
          <p>© {new Date().getFullYear()} RentEasy. All rights reserved.</p>

          <div className="flex gap-6 mt-3 md:mt-0">
            <span className="hover:text-orange-500 cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-orange-500 cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

