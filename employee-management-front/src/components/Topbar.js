import React from 'react';

function Topbar() {
  return (
    <div className="flex items-center justify-between h-16 bg-white shadow px-6">
      <div className="text-xl font-bold text-gray-800">Dashboard</div>
      <div className="flex items-center space-x-4">
        <button className="px-3 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300">Notifications</button>
        <button className="px-3 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300">Profile</button>
      </div>
    </div>
  );
}

export default Topbar;
