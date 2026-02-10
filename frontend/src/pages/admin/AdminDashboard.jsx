import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    owners: 0,
  });

  const [pendingProperties, setPendingProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("/api/properties/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const all = res.data;
        const pending = all.filter((p) => p.status === "pending");
        const owners = new Set(all.map((p) => p.owner?._id));

        setStats({
          total: all.length,
          pending: pending.length,
          owners: owners.size,
        });

        setPendingProperties(pending.slice(0, 4));
      } catch (err) {
        console.error("Error loading admin data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-orange-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">

      {/* LEFT SIDEBAR */}
      <aside className="w-72 bg-white border-r shadow-sm flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Admin</h2>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <SidebarLink to="/admin/dashboard" label="Dashboard" />
          <SidebarLink to="/admin/properties" label="All Properties" />
          <SidebarLink to="/admin/requests" label="Pending Requests" />
          <SidebarLink to="/admin/owners" label="Owners" />

          {/* Messages Link */}
          <SidebarLink to="/admin/messages" label="Messages" />

          <button
            className="w-full text-left px-4 py-2 rounded-lg text-red-500 hover:bg-red-50"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main
        className="flex-1"
        style={{
          background:
            "linear-gradient(to left, #fde7d8 0%, #f9f2ea 35%, #eef6f8 65%, #e6f3f7 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-10">

          {/* HERO */}
          <div
            className="relative rounded-3xl overflow-hidden mb-10"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="bg-black/50 p-10 text-white">
              <h1 className="text-3xl font-bold">
                Admin Control Center
              </h1>
              <p className="mt-2 text-white/90 max-w-xl">
                Monitor property listings, approve requests, and manage platform activity.
              </p>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <StatCard
              title="Total Properties"
              value={stats.total}
              onClick={() => navigate("/admin/properties")}
            />
            <StatCard
              title="Pending Requests"
              value={stats.pending}
              onClick={() => navigate("/admin/requests")}
            />
            <StatCard
              title="Owners"
              value={stats.owners}
              onClick={() => navigate("/admin/owners")}
            />
            <StatCard title="Active Tenants" value="—" />
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* PENDING */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-6">
                Pending Property Requests
              </h2>

              {pendingProperties.length === 0 ? (
                <p className="text-gray-500">No pending requests.</p>
              ) : (
                <div className="space-y-4">
                  {pendingProperties.map((p) => (
                    <PendingRow key={p._id} property={p} />
                  ))}
                </div>
              )}
            </div>

            {/* ACTIVITY */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-6">
                Recent Activity
              </h2>

              <div className="space-y-4 text-sm">
                <Activity
                  title="New property submitted"
                  desc="2BHK Apartment by Rahul"
                />
                <Activity
                  title="Owner registered"
                  desc="Ankit Verma joined"
                />
                <Activity
                  title="Property approved"
                  desc="Luxury Villa listing"
                />
                <Activity
                  title="Tenant signed up"
                  desc="New tenant from Delhi"
                />
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function SidebarLink({ to, label }) {
  return (
    <Link
      to={to}
      className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition"
    >
      {label}
    </Link>
  );
}

function StatCard({ title, value, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-lg transition cursor-pointer"
    >
      <h3 className="text-3xl font-bold text-orange-500">{value}</h3>
      <p className="text-gray-600 mt-1">{title}</p>
    </div>
  );
}

function PendingRow({ property }) {
  const fallback =
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400&q=80";

  return (
    <div className="flex items-center gap-4 border rounded-xl p-3">
      <img
        src={property.images?.[0] || fallback}
        alt="property"
        className="w-20 h-16 object-cover rounded-lg"
      />

      <div className="flex-1">
        <h4 className="font-semibold text-sm">
          {property.title}
        </h4>
        <p className="text-xs text-gray-500">
          {property.location}
        </p>
      </div>

      <button className="text-green-600 text-sm font-medium">
        Approve
      </button>
    </div>
  );
}

function Activity({ title, desc }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="w-2 h-2 mt-2 rounded-full bg-orange-500"></div>
      <div>
        <p className="font-medium text-gray-800">{title}</p>
        <p className="text-gray-500">{desc}</p>
      </div>
    </div>
  );
}
