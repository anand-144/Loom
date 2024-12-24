import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaListAlt } from "react-icons/fa";
import { LuPackageOpen } from "react-icons/lu";
import { IoIosAddCircle } from "react-icons/io";

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2 border-gray-700'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>

        <NavLink className='flex items-center gap-3 border border-gray-700 border-r-0 px-3 py-2 rounded-l hover:bg-slate-100' to="/add">
          <IoIosAddCircle className='w-6 h-6 text-[#9a7090]' />
          <p className='hidden md:block hover:font-medium active:text-gray-600'>Add Items</p>
        </NavLink>
        

        <NavLink className='flex items-center gap-3 border border-gray-700 border-r-0 px-3 py-2 rounded-l hover:bg-slate-100' to="/list">
        <FaListAlt className='w-6 h-6 text-[#9a7090]' />
          <p className='hidden md:block hover:font-medium active:text-gray-600'>List Items</p>
        </NavLink>

        <NavLink className='flex items-center gap-3 border border-gray-700 border-r-0 px-3 py-2 rounded-l hover:bg-slate-100' to="/orders">
        <LuPackageOpen className='w-6 h-6 text-[#9a7090]' />
          <p className='hidden md:block hover:font-medium active:text-gray-600'>Orders</p>
        </NavLink>


      </div>
    </div>
  )
}

export default Sidebar