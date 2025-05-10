import React, { useState } from 'react';
import { FiSettings } from 'react-icons/fi';

function  Navbar() {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(prev => !prev);
  };

  return (
    <nav className="w-full bg-black h-full text-white flex justify-between items-center px-6 py-4 shadow-md">
      <div className="text-2xl font-bold tracking-wide">
        Chat<span className="text-gray-400">App</span>
      </div>

      <div className="relative">
        <button
          onClick={toggleSettings}
          className="p-2 rounded-full  hover:bg-white hover:text-black transition duration-300"
        >
          <FiSettings size={24} />
        </button>

        {showSettings && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10">
            <ul className="py-2 text-sm">
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Profile</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Theme</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Logout</li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
