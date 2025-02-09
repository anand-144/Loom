import React, { useState, useEffect, useContext } from 'react'; // Added useContext here
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiSearch, FiUser, FiBox, FiLogOut, FiShoppingBag } from 'react-icons/fi';
import { HiMenuAlt3 } from "react-icons/hi";
import { IoIosArrowDown } from 'react-icons/io';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';

const Navbar = () => {
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);
  const location = useLocation();

  const [visible, setVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
          <Link to='/' className="flex-shrink-0">
            <img
              src={assets.logo}
              alt="Company Logo"
              className="h-8 sm:h-10 w-auto"
            />
          </Link>

          {!isLoginPage && (
            <nav className="hidden sm:flex items-center space-x-8">
              <NavLink to="/" className={({ isActive }) => 
                `text-sm font-medium transition-colors hover:text-pink-600 ${isActive ? 'text-gray-600' : 'text-gray-700'}`
              }>
                Home
              </NavLink>
              <NavLink to="/collections" className={({ isActive }) => 
                `text-sm font-medium transition-colors hover:text-pink-600 ${isActive ? 'text-gray-600' : 'text-gray-700'}`
              }>
                Collection
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => 
                `text-sm font-medium transition-colors hover:text-pink-600 ${isActive ? 'text-gray-600' : 'text-gray-700'}`
              }>
                About
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => 
                `text-sm font-medium transition-colors hover:text-pink-600  ${isActive ? 'text-gray-600' : 'text-gray-700'}`
              }>
                Contact
              </NavLink>
            </nav>
          )}

          <div className="flex items-center space-x-6">
            {!isLoginPage && (
              <button
                className="text-gray-700 hover:text-pink-600 transition-colors"
                onClick={() => setShowSearch(true)}
              >
                <FiSearch className="w-5 h-5" />
              </button>
            )}

            <div className="relative">
              <button
                className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                onClick={handleUserIconClick}
                aria-label="User menu"
              >
                <FiUser className="w-4 h-4 text-gray-700" />
              </button>

              {token && dropdownVisible && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <FiUser className="mr-3 h-4 w-4" /> My Profile
                    </a>
                    <a href="/orders" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <FiBox className="mr-3 h-4 w-4" /> Orders
                    </a>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FiLogOut className="mr-3 h-4 w-4" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {!isLoginPage && (
              <Link to='/cart' className="relative">
                <FiShoppingBag className="w-5 h-5 text-gray-700 hover:text-pink-600 transition-colors" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-gray-600 flex items-center justify-center text-xs font-medium text-white">
                    {getCartCount()}
                  </span>
                )}
              </Link>
            )}

            <button
              className="sm:hidden text-gray-700 hover:text-pink-600 transition-colors"
              onClick={() => setVisible(true)}
            >
              <HiMenuAlt3 className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-50 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-medium text-gray-700">Menu</h2>
            <button
              className="text-gray-700 hover:text-pink-600 transition-colors"
              onClick={() => setVisible(false)}
            >
              <IoIosArrowDown className="w-6 h-6 rotate-90" />
            </button>
          </div>
          <nav className="px-4 py-6 space-y-4">
            <NavLink
              to="/"
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `block py-2 text-base font-medium transition-colors hover:text-pink-600 ${isActive ? 'text-gray-600' : 'text-gray-700'}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/collections"
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `block py-2 text-base font-medium transition-colors hover:text-pink-600 ${isActive ? 'text-gray-600' : 'text-gray-700'}`
              }
            >
              Collection
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `block py-2 text-base font-medium transition-colors hover:text-pink-600 ${isActive ? 'text-gray-600' : 'text-gray-700'}`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `block py-2 text-base font-medium transition-colors hover:text-pink-600 ${isActive ? 'text-gray-600' : 'text-gray-700'}`
              }
            >
              Contact
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
