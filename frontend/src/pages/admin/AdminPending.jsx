import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPending() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get("/api/properties/all", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const pending = res.data.filter(p => p.status === "pending");
      setProperties(pending);
    };

    fetch();
  }, []);

  return (
    <div>
      <h2>Pending Requests</h2>

      {properties.map(p => (
        <div key={p._id}>
          <h4>{p.title}</h4>
          <p>{p.location}</p>
        </div>
      ))}
    </div>
  );
}
