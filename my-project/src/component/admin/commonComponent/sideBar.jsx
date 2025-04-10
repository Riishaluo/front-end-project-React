import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white shadow-lg z-50">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        Admin Panel
      </div>
      <ul className="mt-4 space-y-2 px-4">
        <li
          onClick={() => navigate("/admin/dashboard")}
          className="hover:bg-gray-700 p-3 rounded cursor-pointer transition"
        >
          Dashboard
        </li>
        <li
          onClick={() => {
            console.log("Clicked Products");
            navigate("/admin/product");
          }}
          className="hover:bg-gray-700 p-3 rounded cursor-pointer transition"
        >
          Products
        </li>
        <li className="hover:bg-gray-700 p-3 rounded cursor-pointer transition">
          User
        </li>
        <li className="hover:bg-red-600 p-3 rounded cursor-pointer transition">
          Logout
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
