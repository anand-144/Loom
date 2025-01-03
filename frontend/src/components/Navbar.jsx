import { assets } from '../assets/frontend_assets/assets';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiSearch, FiUser, FiBox, FiLogOut, FiShoppingBag } from 'react-icons/fi';
import { HiMenuAlt3 } from "react-icons/hi";
import { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { IoIosArrowDown } from 'react-icons/io';

const Navbar = () => {
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);
  const location = useLocation();

  const [visible, setVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleUserIconClick = () => {
    if (!token) {
      navigate('/login');
    } else {
      setDropdownVisible(!dropdownVisible);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    setDropdownVisible(false);
    navigate('/login');
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.relative')) {
        setDropdownVisible(false);
      }
    };

    if (dropdownVisible) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [dropdownVisible]);

  const isLoginPage = location.pathname === '/login';

  return (
    <div>
      <div className="flex items-center justify-between py-5 px-4 sm:px-8 md:px-16 lg:px-36 font-medium">
        <Link to='/'>
          <img
            src={assets.logo}
            alt="Company Logo"
            className="w-28 sm:w-[8rem] md:w-[9rem] lg:w-[9rem] xl:w-36"
          />
        </Link>

        {!isLoginPage && (
          <ul className="hidden sm:flex gap-5 text-md font-semibold text-gray-700">
            <NavLink to="/" className="flex flex-col items-center gap-1">
              <p>Home</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink to="/collections" className="flex flex-col items-center gap-1">
              <p>Collection</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink to="/about" className="flex flex-col items-center gap-1">
              <p>About</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink to="/contact" className="flex flex-col items-center gap-1">
              <p>Contact</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-grey-700 hidden" />
            </NavLink>
          </ul>
        )}

        <div className="flex items-center gap-6">
          {!isLoginPage && (
            <FiSearch className="w-5 h-5 cursor-pointer" onClick={() => setShowSearch(true)} />
          )}

          <div className="relative z-20">
            <div
              className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-white cursor-pointer"
              onClick={handleUserIconClick}
              aria-label="User menu"
            >
              <FiUser className="w-4 h-4" />
            </div>
            {token && dropdownVisible && (
              <div className="absolute right-0 pt-4 z-30">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded-lg shadow-md">
                  <p className="cursor-pointer hover:text-gray-700 flex items-center gap-2">
                    <FiUser /> My Profile
                  </p>
                  <p className="cursor-pointer hover:text-gray-700 flex items-center gap-2" onClick={() => navigate('/orders')}>
                    <FiBox /> Orders
                  </p>
                  <p onClick={handleLogout} className="cursor-pointer hover:text-gray-700 flex items-center gap-2">
                    <FiLogOut /> Logout
                  </p>
                </div>
              </div>
            )}
          </div>

          {!isLoginPage && (
            <Link to='/cart' className='relative'>
              <FiShoppingBag className='w-6 h-6' />
              <p className='absolute right-[-5px] top-[-5px] w-4 text-center leading-4 bg-red-500 text-white aspect-square rounded-full text-[10px]'>
                {getCartCount()}
              </p>
            </Link>
          )}

          <HiMenuAlt3 className='w-6 h-6 sm:hidden' onClick={() => setVisible(true)} />
        </div>
      </div>

      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all z-20 ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-800'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-3 p-4 cursor-pointer transition-all hover:bg-gray-200'>
            <IoIosArrowDown className='w-6 h-6 rotate-90' />
            <p className='text-xl font-semibold text-gray-700'>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-3 pl-6 text-xl font-bold text-gray-700 hover:text-gray-700 transition-all' to='/'>Home</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-3 pl-6 text-xl font-bold text-gray-700 hover:text-gray-700 transition-all' to='/collections'>Collection</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-3 pl-6 text-xl font-bold text-gray-700 hover:text-gray-700 transition-all' to='/about'>About</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-3 pl-6 text-xl font-bold text-gray-700 hover:text-gray-700 transition-all' to='/contact'>Contact</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;