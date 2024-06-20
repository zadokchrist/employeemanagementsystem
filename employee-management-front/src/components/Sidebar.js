import React from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="h-screen bg-gray-800 w-64">
      <div className="p-4 text-white text-2xl font-bold">My App</div>
      <nav className="mt-10">
      <a href="#" className="block px-4 py-2 mt-2 text-sm text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white">Dashboard</a>
        <button className="block px-4 py-2 mt-2 text-sm text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white"
         onClick={() => navigate("/layout", { state: { screen: "newuser" } })}>
        Add New User
        </button>
        <button className="block px-4 py-2 mt-2 text-sm text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white"
         onClick={() => navigate("/layout", { state: { screen: "addemployees" } })}>
        Add Employees
        </button>
        <button className="block px-4 py-2 mt-2 text-sm text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white"
         onClick={() => navigate("/layout", { state: { screen: "viewemployees" } })}>
        View Employees
        </button>
        <button className="block px-4 py-2 mt-2 text-sm text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white"
         onClick={() => navigate("/")}>
        Logout
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;
