import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaHeart,
  FaRegHeart,
  FaStar,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaUser
} from "react-icons/fa";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [isFavorite, setIsFavorite] = useState(false);

  // ✅ PROPERTY COMES FROM DASHBOARD
  const property = location.state;

  // 🔒 SAFETY CHECK
  useEffect(() => {
    if (!property || String(property.id) !== String(id)) {
      navigate("/tenant/dashboard");
    }
  }, [property, id, navigate]);

  if (!property) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-orange-600 hover:text-orange-700 mb-6"
      >
        <FaArrowLeft className="mr-2" /> Back to listings
      </button>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        {/* HEADER */}
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {property.title}
              </h1>
              <p className="flex items-center text-gray-500 mt-1">
                <FaMapMarkerAlt className="mr-2 text-orange-500" />
                {property.location}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
                <FaStar className="mr-1" />
                {property.rating}
              </span>

              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                {isFavorite ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart className="text-gray-500" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 grid lg:grid-cols-2 gap-8">

          {/* IMAGE */}
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-80 object-cover rounded-xl"
          />

          {/* DETAILS */}
          <div>
            <p className="text-3xl font-bold text-gray-900 mb-2">
              ₹{property.price}
              <span className="text-base text-gray-500"> / month</span>
            </p>

            <div className="grid grid-cols-3 gap-4 my-6">
              <div className="text-center bg-gray-50 p-3 rounded-lg">
                <FaBed className="mx-auto text-orange-500 mb-1" />
                {property.beds} Beds
              </div>
              <div className="text-center bg-gray-50 p-3 rounded-lg">
                <FaBath className="mx-auto text-orange-500 mb-1" />
                {property.baths} Baths
              </div>
              <div className="text-center bg-gray-50 p-3 rounded-lg">
                <FaRulerCombined className="mx-auto text-orange-500 mb-1" />
                {property.area} sqft
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              {property.description}
            </p>

            {/* OWNER */}
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-semibold mb-3">Owner Information</h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <FaUser className="text-orange-500" />
                </div>
                <div>
                  <p className="font-medium">
                    {property.ownerName || "Property Owner"}
                  </p>
                  <p className="text-sm text-gray-500">Verified Owner</p>
                </div>
              </div>

              <button
                onClick={() => navigate(`/chat/${property.ownerId}`)}
                className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
              >
                Chat with Owner
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
