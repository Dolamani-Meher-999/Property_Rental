import { useEffect, useState } from "react";
import axios from "axios";

const fallbackImage =
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80";

export default function AdminAllProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("/api/properties/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProperties(res.data);
      } catch (err) {
        console.error("Error fetching properties", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-orange-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(to left, #fde7d8 0%, #f9f2ea 35%, #eef6f8 65%, #e6f3f7 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">
          All Properties
        </h1>

        {properties.length === 0 ? (
          <p className="text-gray-600">No properties found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {properties.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition border border-gray-100 overflow-hidden"
              >
                <div className="h-44">
                  <img
                    src={p.images?.[0] || fallbackImage}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {p.title}
                  </h3>

                  <p className="text-xs text-gray-500 mb-2">
                    {p.location}
                  </p>

                  <p className="text-xs text-gray-600">
                    Owner: {p.owner?.name || "Unknown"}
                  </p>

                  <div className="flex justify-between items-center mt-3">
                    <span className="font-bold text-orange-600">
                      ₹{p.price?.toLocaleString() || 0}/mo
                    </span>

                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        p.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : p.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
