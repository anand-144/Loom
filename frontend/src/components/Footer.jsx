import React from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
      {/* Logo and Description */}
      <div>
        <img src={assets.logo} alt="Forever Store Logo" className='w-32 mb-5' />
        <p className='w-full md:w-2/3 text-gray-600'>
          Discover timeless styles and quality, where fashion meets elegance. Shop now for the best in clothing and accessories.
        </p>
      </div>

      {/* Company Navigation Links */}
      <nav aria-label="Company Navigation">
        <p className='text-xl font-medium mb-5'>COMPANY</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>About Us</Link></li>
          <li><Link to='/DeliveryPartner'>Delivery</Link></li>
          <li><Link to='/PrivacyPolicy'>Privacy Policy</Link></li>
        </ul>
      </nav>

      {/* Contact Information */}
      <address>
        <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
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
      </address>

      {/* Footer Bottom Section */}
      <hr className='my-5' />
      <p className='py-5 text-sm text-center'>Copyright 2024 @ forever.com</p>
    </footer>
  );
};

export default Footer;
