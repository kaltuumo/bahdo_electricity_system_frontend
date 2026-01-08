import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaDollarSign, FaFileInvoice, FaTachometerAlt, FaUser, FaSignOutAlt, FaUserFriends, FaGlobe, FaPlus, FaMapMarkerAlt, FaHome } from "react-icons/fa";
import { useAuth } from "../context/AuthContext"; 
import { useState, useEffect } from "react";

const Sidebar = () => {
  const { logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState(location.pathname);

  const handleLinkClick = (path) => setActivePath(path);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    { name: "User Profile", icon: <FaUser />, path: "/user-profile" },
    { name: "User List", icon: <FaUserFriends />, path: "/user-list" },
    { name: "Customer", icon: <FaPlus />, path: "/customer-list" },
    { name: "Zone", icon: <FaGlobe />, path: "/zone-list" },
    { name: "Area", icon: <FaMapMarkerAlt />, path: "/area-list" },
    { name: "Houses", icon: <FaHome />, path: "/house-list" },
    { name: "Invoices", icon: <FaFileInvoice />, path: "/invoice-list" },
    { name: "Lacag Qabasho", icon: <FaDollarSign />, path: "/lacag-qabasho" },
  ];

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-blue-50 via-white to-white shadow-lg flex flex-col p-5">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <span className="text-2xl font-bold text-blue-900">Bahdo Electricity</span>
      </div>

      {/* Menu Items */}
      <ul className="flex flex-col gap-2 flex-1">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              onClick={() => handleLinkClick(item.path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                ${activePath === item.path 
                  ? "bg-blue-900 text-white shadow-lg" 
                  : "text-blue-900 hover:bg-blue-100 hover:text-blue-700"}
              `}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* User Info & Logout */}
      <div className="mt-auto pt-4 border-t border-blue-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-blue-300 flex items-center justify-center text-white font-bold">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div>
            <p className="text-blue-900 font-semibold">{user?.name || "User Name"}</p>
            <p className="text-blue-500 text-xs">{user?.email || "user@example.com"}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-all"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
