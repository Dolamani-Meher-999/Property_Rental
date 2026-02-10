import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOwners() {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("/api/users/owners", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOwners(res.data);
      } catch (err) {
        console.error("Error fetching owners", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOwners();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-orange-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Owners</h1>

      {owners.length === 0 ? (
        <p className="text-gray-500">No owners found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {owners.map((owner) => (
            <div
              key={owner._id}
              className="bg-white p-6 rounded-2xl shadow border"
            >
              <h3 className="font-semibold text-lg">
                {owner.name}
              </h3>
              <p className="text-gray-500 text-sm">
                {owner.email}
              </p>
              <span className="inline-block mt-2 text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">
                Owner
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
