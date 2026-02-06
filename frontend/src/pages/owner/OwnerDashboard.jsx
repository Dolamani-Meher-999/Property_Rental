// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import PropertyCard from "../../components/tenant/PropertyCard";
// import EmptyState from "../../components/common/EmptyState";
// import DashboardFooter from "../../components/common/DashboardFooter";

// const OwnerDashboard = () => {
//   const [properties, setProperties] = useState([]);

//   useEffect(() => {
//     setProperties([]); // empty for now
//   }, []);

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* HERO (same vibe as tenant) */}
//       <div
//         className="relative h-[260px] bg-cover bg-center"
//         style={{
//           backgroundImage:
//             "url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c)",
//         }}
//       >
//         <div className="absolute inset-0 bg-black/50" />
//         <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
//           <span className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full w-fit mb-3">
//             Owner Dashboard
//           </span>
//           <h1 className="text-3xl font-bold text-white mb-2">
//             Manage Your Properties
//           </h1>
//           <p className="text-gray-200 max-w-xl">
//             View listings, track tenant requests, and grow your rental income.
//           </p>

//           <Link
//             to="/owner/add-property"
//             className="mt-5 w-fit bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition"
//           >
//             + Add New Property
//           </Link>
//         </div>
//       </div>

//       {/* STATS */}
//       <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
//           {[
//             { label: "Total Properties", value: properties.length },
//             { label: "Active Listings", value: 0 },
//             { label: "Pending Requests", value: 0 },
//             { label: "Monthly Earnings", value: "₹0" },
//           ].map((item, i) => (
//             <div
//               key={i}
//               className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
//             >
//               <p className="text-sm text-gray-500">{item.label}</p>
//               <p className="text-2xl font-bold text-gray-900 mt-1">
//                 {item.value}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* MY PROPERTIES */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold text-gray-900">
//             My Properties{" "}
//             <span className="text-orange-500">
//               • {properties.length}
//             </span>
//           </h2>

//           <Link
//             to="/owner/add-property"
//             className="text-sm font-medium text-orange-600 hover:underline"
//           >
//             + Add Property
//           </Link>
//         </div>

//         {/* PROPERTY GRID (same as tenant layout) */}
//         {properties.length === 0 ? (
//           <EmptyState
//             title="No properties yet"
//             description="Add your first property to start receiving tenant requests."
//             actionLabel="Add Property"
//             actionLink="/owner/add-property"
//           />
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {properties.map((property) => (
//               <PropertyCard
//                 key={property._id}
//                 property={{
//                   ...property,
//                   id: property._id,
//                   isFavorite: false, // owner doesn't need favs
//                 }}
//                 onFavoriteToggle={() => {}}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       <DashboardFooter />
//     </div>
//   );
// };

// export default OwnerDashboard;


import { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard from "../../components/tenant/PropertyCard";
import EmptyState from "../../components/common/EmptyState";
import DashboardFooter from "../../components/common/DashboardFooter";

const OwnerDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyProperties = async () => {
      try {
        const res = await axios.get("/api/properties/my-properties", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const mapped = res.data.map((p) => ({
          id: p._id,
          title: p.title,
          price: p.price,
          location: p.location,
          image: p.images?.[0],
          rating: 4.5,
          beds: 2,
          baths: 1,
          area: 1000,
        }));

        setProperties(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProperties();
  }, []);

  const total = properties.length;
  const active = properties.length;
  const pending = 0;
  const earnings = properties.reduce((sum, p) => sum + p.price, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-orange-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">

      {/* ================= HERO (IMAGE BASED – SAME STYLE) ================= */}
      <div
        className="relative border-b border-gray-200"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/55"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 text-white">
          <span className="inline-block mb-4 px-3 py-1 text-sm rounded-full bg-orange-100 text-orange-700">
            Owner Dashboard
          </span>

          <h1 className="text-4xl font-bold leading-tight">
            Manage Your Properties
          </h1>

          <p className="mt-4 max-w-2xl text-white/90">
            View listings, track requests, and grow your rental income with
            verified tenants.
          </p>

          <div className="mt-6">
            <button className="px-6 py-3 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition">
              + Add New Property
            </button>
          </div>
        </div>
      </div>

      {/* ================= BODY WITH GRADIENT ================= */}
      <div className="app-body-gradient">
        <div className="max-w-7xl mx-auto px-6 py-10">

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <StatCard label="Total Properties" value={total} />
            <StatCard label="Active Listings" value={active} />
            <StatCard label="Pending Requests" value={pending} />
            <StatCard label="Monthly Earnings" value={`₹${earnings.toLocaleString()}`} />
          </div>

          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              My Properties <span className="text-orange-500">•</span> {total}
            </h2>

            <button className="text-orange-600 font-medium hover:underline">
              + Add Property
            </button>
          </div>

          {/* GRID / EMPTY */}
          {properties.length === 0 ? (
            <EmptyState
              title="No properties yet"
              description="Add your first property to start receiving tenant requests."
              actionLabel="Add Property"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {properties.map((p) => (
                <PropertyCard
                  key={p.id}
                  property={p}
                  onFavoriteToggle={() => {}}
                />
              ))}
            </div>
          )}
        </div>

        <DashboardFooter />
      </div>
    </div>
  );
};

/* ---------------- SMALL REUSABLE STAT CARD ---------------- */
const StatCard = ({ label, value }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
  </div>
);

export default OwnerDashboard;
