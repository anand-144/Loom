import React, { useState, useEffect } from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";

const Footer = () => {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
      {/* Logo and Description */}
      <div>
        <img src={assets.logo} alt="Forever Store Logo" className="w-32 mb-5" />
        <p className="w-full md:w-2/3 text-gray-600">
          Discover timeless styles and quality, where fashion meets elegance. Shop now for the best in clothing and accessories.
        </p>
      </div>

      {/* Company Navigation Links */}
      <nav aria-label="Company Navigation">
        <p className="text-xl font-medium mb-5">COMPANY</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/DeliveryPartner">Delivery</Link></li>
          <li><Link to="/PrivacyPolicy">Privacy Policy</Link></li>
        </ul>
      </nav>

      {/* Contact Information */}
      <address>
        <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li>+91 574877943</li>
          <li>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=singhanapucs20@student.mes.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-blue-500"
            >
              singhanapucs20@student.mes.ac.in
            </a>
          </li>
        </ul>
        <div className="flex gap-4 mt-5 text-2xl text-gray-600">
          {/* Instagram Icon */}
          <a
            href="https://www.instagram.com/_anand.402/"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer hover:text-pink-500 transition duration-300"
          >
            <FaInstagram />
          </a>

          {/* WhatsApp Icon */}
          <a
            href="https://wa.me/8424861660"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer hover:text-green-500 transition duration-300"
          >
            <FaWhatsapp />
          </a>
        </div>
      </address>

      {/* Footer Bottom Section */}
      <hr className="my-5" />
      <p className="py-5 text-sm text-center">Copyright 2024 @ forever.com</p>

      {/* "Go to Top" Button */}
      <div className="fixed bottom-4 right-4 z-50">
        {showTopButton && (
          <button
            onClick={scrollToTop}
            className="p-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition duration-300 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center"
          >
            <IoIosArrowUp className="text-base sm:text-lg md:text-xl" />
          </button>
        )}
      </div>
    </footer>
  );
};

export default Footer;
