// import { useState, useEffect } from 'react';
// import PropertyCard from '../../../components/tenant/PropertyCard';
// import axios from "axios";
// import { FaSearch, FaHeart } from 'react-icons/fa';

// const propertyTypes = ['All', 'Apartment', 'House', 'Condo', 'Loft', 'Townhouse'];

// const priceRanges = [
//   { label: 'Any Price', value: '' },
//   { label: 'Under $1,000', value: '0-1000' },
//   { label: '$1,000 - $2,000', value: '1000-2000' },
//   { label: '$2,000 - $3,000', value: '2000-3000' },
//   { label: '$3,000 - $5,000', value: '3000-5000' },
//   { label: '$5,000+', value: '5000-10000' }
// ];

// const TenantDashboard = () => {
//   const [activeTab, setActiveTab] = useState('all');
//   const [favorites, setFavorites] = useState(new Set());
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     type: '',
//     beds: '',
//     price: '',
//     search: '',
//     sort: 'featured'
//   });

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const res = await axios.get('/api/properties');

//         const approved = res.data
//           .filter(p => p.status === 'approved')
//           .map(p => ({
//             id: p._id,
//             title: p.title,
//             type: 'House',
//             price: p.price,
//             location: p.location,
//             image: p.images?.[0],
//             rating: 4.5,
//             beds: 2,
//             baths: 1,
//             area: 1000,
//             featured: false
//           }));

//         setProperties(approved);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProperties();
//   }, []);

//   const toggleFavorite = (id) => {
//     const next = new Set(favorites);
//     next.has(id) ? next.delete(id) : next.add(id);
//     setFavorites(next);
//   };

//   const filtered = properties.filter(p => {
//     if (
//       filters.search &&
//       !p.title.toLowerCase().includes(filters.search.toLowerCase()) &&
//       !p.location.toLowerCase().includes(filters.search.toLowerCase())
//     ) return false;

//     if (filters.type && p.type.toLowerCase() !== filters.type.toLowerCase()) return false;

//     if (filters.price) {
//       const [min, max] = filters.price.split('-').map(Number);
//       if (p.price < min || (max && p.price > max)) return false;
//     }

//     if (activeTab === 'favorites' && !favorites.has(p.id)) return false;
//     return true;
//   });

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin h-10 w-10 border-4 border-orange-500 border-t-transparent rounded-full" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* HERO (ONLY UPDATED PART) */}
//       {/* <div className="relative border-b border-gray-200 app-hero-gradient">
//         <div className="relative max-w-7xl mx-auto px-6 py-20">
//           <span className="inline-block mb-4 px-3 py-1 text-sm rounded-full bg-orange-100 text-orange-700">
//             Verified Rental Listings
//           </span>

//           <h1 className="text-4xl font-bold text-gray-900 leading-tight">
//             Find Your Perfect Home
//           </h1>

//           <p className="text-gray-700 mt-4 max-w-2xl">
//             Browse verified rental properties from trusted owners across top locations.
//             Simple, fast, and secure.
//           </p>

//           <div className="mt-6 flex gap-3">
//             <button className="px-6 py-3 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition">
//               Explore Properties
//             </button>

//             <button className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-white/60 transition">
//               How it Works
//             </button>
//           </div>
//         </div>
//       </div> */}
//       {/* HERO */}
// <div className="relative border-b border-gray-200 app-hero-gradient">
//   <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

//     {/* IMAGE CARD WITH TEXT */}
//     <div className="relative rounded-3xl overflow-hidden shadow-xl h-[360px]">
//       <img
//         src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80"
//         alt="Home"
//         className="absolute inset-0 w-full h-full object-cover"
//       />

//       {/* DARK OVERLAY */}
//       <div className="absolute inset-0 bg-black/40"></div>

//       {/* TEXT CONTENT */}
//       <div className="relative z-10 p-10 text-white h-full flex flex-col justify-center">
//         <span className="inline-block mb-4 px-3 py-1 text-sm rounded-full bg-orange-500/90">
//           Verified Rental Listings
//         </span>

//         <h1 className="text-4xl font-bold leading-tight">
//           Find Your Perfect Home
//         </h1>

//         <p className="mt-4 text-white/90 max-w-md">
//           Browse verified rental properties from trusted owners across top locations.
//           Simple, fast, and secure.
//         </p>

//         <div className="mt-6 flex gap-3">
//           <button className="px-6 py-3 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition">
//             Explore Properties
//           </button>

//           <button className="px-6 py-3 rounded-lg border border-white/70 text-white hover:bg-white/10 transition">
//             How it Works
//           </button>
//         </div>
//       </div>
//     </div>

//     {/* EMPTY SPACE (KEEPS GRADIENT VISIBLE) */}
//     <div className="hidden md:block"></div>

//   </div>
// </div>


//       {/* CONTENT (UNCHANGED) */}
//       <div className="max-w-7xl mx-auto px-6 py-10">

//         {/* FILTER BAR */}
//         <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-10">
//           <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//             <div className="md:col-span-2 relative">
//               <FaSearch className="absolute top-3.5 left-3 text-gray-400" />
//               <input
//                 placeholder="Search by location or name"
//                 value={filters.search}
//                 onChange={e => setFilters({ ...filters, search: e.target.value })}
//                 className="pl-10 w-full py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
//               />
//             </div>

//             <select
//               value={filters.type}
//               onChange={e => setFilters({ ...filters, type: e.target.value })}
//               className="py-3 border rounded-lg"
//             >
//               <option value="">All Types</option>
//               {propertyTypes.map(t => (
//                 <option key={t} value={t.toLowerCase()}>{t}</option>
//               ))}
//             </select>

//             <select
//               value={filters.price}
//               onChange={e => setFilters({ ...filters, price: e.target.value })}
//               className="py-3 border rounded-lg"
//             >
//               {priceRanges.map(p => (
//                 <option key={p.value} value={p.value}>{p.label}</option>
//               ))}
//             </select>

//             <button
//               onClick={() => setFilters({ type:'', beds:'', price:'', search:'', sort:'featured' })}
//               className="py-3 border rounded-lg text-gray-600 hover:bg-orange-50"
//             >
//               Clear
//             </button>
//           </div>
//         </div>

//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-900">
//             Available Properties <span className="text-orange-500">•</span> {filtered.length}
//           </h2>

//           <div className="flex gap-2">
//             <button
//               onClick={() => setActiveTab('all')}
//               className={`px-4 py-2 rounded-lg text-sm ${
//                 activeTab === 'all'
//                   ? 'bg-orange-100 text-orange-700'
//                   : 'text-gray-600 hover:bg-orange-50'
//               }`}
//             >
//               All
//             </button>

//             <button
//               onClick={() => setActiveTab('favorites')}
//               className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 ${
//                 activeTab === 'favorites'
//                   ? 'bg-orange-100 text-orange-700'
//                   : 'text-gray-600 hover:bg-orange-50'
//               }`}
//             >
//               <FaHeart className="text-red-500" /> Favorites
//             </button>
//           </div>
//         </div>

//         {/* GRID */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {filtered.map(p => (
//             <PropertyCard
//               key={p.id}
//               property={{ ...p, isFavorite: favorites.has(p.id) }}
//               onFavoriteToggle={toggleFavorite}
//             />
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default TenantDashboard;

import { useState, useEffect } from 'react';
import PropertyCard from '../../../components/tenant/PropertyCard';
import axios from "axios";
import { FaSearch, FaHeart } from 'react-icons/fa';

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
  const [filters, setFilters] = useState({
    type: '',
    beds: '',
    price: '',
    search: '',
    sort: 'featured'
  });

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
        <div className="absolute inset-0 bg-white/85"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <span className="inline-block mb-4 px-3 py-1 text-sm rounded-full bg-orange-100 text-orange-700">
            Verified Rental Listings
          </span>

          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            Find Your Perfect Home
          </h1>

          <p className="text-gray-700 mt-4 max-w-2xl">
            Browse verified rental properties from trusted owners across top locations.
            Simple, fast, and secure.
          </p>

          <div className="mt-6 flex gap-3">
            <button className="px-6 py-3 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition">
              Explore Properties
            </button>

            <button className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
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

        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;