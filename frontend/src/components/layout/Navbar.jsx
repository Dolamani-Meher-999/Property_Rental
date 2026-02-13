// import { useState } from "react";
// import { FaBell, FaUserCircle, FaHome } from "react-icons/fa";
// import { useNavigate, useLocation } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [open, setOpen] = useState(false);

//   const links = [
//     { name: "Home", path: "/tenant/dashboard" },
//     { name: "Properties", path: "/tenant/dashboard" },
//     { name: "Favorites", path: "/tenant/dashboard" },
//     { name: "Messages", path: "/chat" },
//   ];

//   return (
//     <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200 shadow-sm">
//       <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

//         {/* LOGO */}
//         <div
//           onClick={() => navigate("/tenant/dashboard")}
//           className="flex items-center gap-3 cursor-pointer group"
//         >
//           <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-2 rounded-xl shadow-md group-hover:scale-105 transition">
//             <FaHome className="text-sm" />
//           </div>
//           <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//             RentEasy
//           </h1>
//         </div>

//         {/* NAV LINKS */}
//         <div className="hidden md:flex items-center gap-10 font-medium">
//           {links.map((link) => (
//             <button
//               key={link.name}
//               onClick={() => navigate(link.path)}
//               className={`relative transition ${
//                 location.pathname === link.path
//                   ? "text-orange-600"
//                   : "text-gray-600 hover:text-orange-500"
//               }`}
//             >
//               {link.name}

//               {location.pathname === link.path && (
//                 <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-orange-500 rounded-full"></span>
//               )}
//             </button>
//           ))}
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="flex items-center gap-6 relative">

//           {/* Notifications */}
//           <div className="relative cursor-pointer group">
//             <FaBell className="text-gray-600 text-lg group-hover:text-orange-500 transition" />
//             <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow">
//               2
//             </span>
//           </div>

//           {/* Profile Dropdown */}
//           <div className="relative">
//             <div
//               onClick={() => setOpen(!open)}
//               className="flex items-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition"
//             >
//               <FaUserCircle className="text-xl text-gray-700" />
//               <span className="hidden md:block text-sm font-medium text-gray-700">
//                 Account
//               </span>
//             </div>

//             {open && (
//               <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2">
//                 <div className="px-4 py-2 hover:bg-orange-50 cursor-pointer rounded-lg">
//                   Profile
//                 </div>
//                 <div className="px-4 py-2 hover:bg-orange-50 cursor-pointer rounded-lg">
//                   Settings
//                 </div>
//                 <div className="px-4 py-2 hover:bg-red-50 text-red-500 cursor-pointer rounded-lg">
//                   Logout
//                 </div>
//               </div>
//             )}
//           </div>

//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useState } from "react";
import { FaBell, FaUserCircle, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onNavigateSection, activeSection }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <div
          onClick={() => onNavigateSection("home")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="bg-orange-500 text-white p-2 rounded-lg">
            <FaHome />
          </div>
          <h1 className="text-xl font-bold">RentEasy</h1>
        </div>

        {/* NAV LINKS */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => onNavigateSection("home")}
            className={`${
              activeSection === "home"
                ? "text-orange-600 font-semibold"
                : "text-gray-600 hover:text-orange-500"
            }`}
          >
            Home
          </button>

          <button
            onClick={() => onNavigateSection("properties")}
            className={`${
              activeSection === "properties"
                ? "text-orange-600 font-semibold"
                : "text-gray-600 hover:text-orange-500"
            }`}
          >
            Properties
          </button>

          <button
            onClick={() => onNavigateSection("favorites")}
            className={`${
              activeSection === "favorites"
                ? "text-orange-600 font-semibold"
                : "text-gray-600 hover:text-orange-500"
            }`}
          >
            Favorites
          </button>

          <button
            onClick={() => navigate("/chat")}
            className="text-gray-600 hover:text-orange-500"
          >
            Messages
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-6 relative">
          <FaBell className="text-gray-600 text-lg cursor-pointer" />

          <div
            onClick={() => setOpen(!open)}
            className="relative cursor-pointer"
          >
            <FaUserCircle className="text-2xl text-gray-700" />

            {open && (
              <div className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-lg border py-2">
                <div className="px-4 py-2 hover:bg-orange-50 cursor-pointer">
                  Profile
                </div>
                <div className="px-4 py-2 hover:bg-red-50 text-red-500 cursor-pointer">
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
