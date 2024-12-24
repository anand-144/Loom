  import React from 'react';
  import { assets } from '../assets/admin_assets/assets';
  import { NavLink } from 'react-router-dom';

  const Navbar = ({setToken}) => {
    return (
      <div className="flex items-center py-2 px-[4%] justify-between border-b-2 border-gray-700 border-l-0">
          <img
            className="w-20 sm:w-32 md:w-[9rem] lg:w-[9rem] xl:w-36 py-3"
            src={assets.logo}
            alt="Admin Panel Logo"
          />
        <button onClick={() => setToken('')} className="bg-gray-700 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-600 transition duration-200 cursor-pointer">
          Log Out
        </button>
      </div>
    );
  };

  export default Navbar;
