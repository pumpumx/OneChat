import React, { useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { authMethod } from '../../auth_api/user.auth';
import { Navigate, useNavigate } from 'react-router-dom';
function  Navbar() {
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate()
  const toggleSettings = () => {
    setShowSettings(prev => !prev);
  };

  const handleLogout = async ()=> {
    const response  = await authMethod.logout()
    if(response.status === 200){
      navigate('/login')
    }
  }

  return (
    <nav className="w-full bg-neutral-950 h-full text-white flex justify-around relative items-center px-6 py-4 shadow-md">

      <div className="absolute right-10">
        <button 
          onClick={toggleSettings}
          className="p-2 rounded-full  hover:bg-white hover:cursor-pointer hover:text-black transition duration-300"
        >
          <FiSettings size={24} />
        </button>

        {showSettings && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10">
            <ul className="py-2 text-sm">
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Profile</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Theme</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={handleLogout}>Logout</li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
