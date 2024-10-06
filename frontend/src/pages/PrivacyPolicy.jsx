import React from 'react';
import { FaUserShield, FaLock, FaInfoCircle } from 'react-icons/fa'; // Import some icons

const PrivacyPolicy = () => {
  return (
    <div className='max-w-4xl mx-auto my-16 p-8 bg-white shadow-lg rounded-lg'>
      {/* Header Section */}
      <div className='mb-10 text-center'>
        <h1 className='text-4xl font-bold text-gray-800'>Privacy Policy</h1>
        <p className='text-gray-600 mt-4'>
          Your privacy is important to us. This privacy policy explains how we handle your personal data.
        </p>
      </div>

      {/* Data Collection Section */}
      <div className='mb-8'>
        <div className='flex items-center mb-4'>
          <FaUserShield className='text-blue-600 text-3xl mr-3' />
          <h2 className='text-2xl font-semibold text-gray-800'>Data Collection</h2>
        </div>
        <p className='text-gray-600'>
          We collect personal data that you provide directly to us. This includes information like your name, email address,
          and payment details when you purchase products or services from us.
        </p>
      </div>

      {/* Data Protection Section */}
      <div className='mb-8'>
        <div className='flex items-center mb-4'>
          <FaLock className='text-blue-600 text-3xl mr-3' />
          <h2 className='text-2xl font-semibold text-gray-800'>Data Protection</h2>
        </div>
        <p className='text-gray-600'>
          We prioritize keeping your data safe and secure. Our system employs industry-standard security measures to protect
          against unauthorized access, alteration, disclosure, or destruction of your personal information.
        </p>
      </div>

      {/* Use of Information Section */}
      <div className='mb-8'>
        <div className='flex items-center mb-4'>
          <FaInfoCircle className='text-blue-600 text-3xl mr-3' />
          <h2 className='text-2xl font-semibold text-gray-800'>Use of Information</h2>
        </div>
        <p className='text-gray-600'>
          The information we collect from you may be used to personalize your experience, improve our website, process
          transactions, and send periodic emails with updates or promotions.
        </p>
      </div>

      {/* Contact Information Section */}
      <div className='mt-10'>
        <h3 className='text-xl font-medium text-gray-800 mb-4'>Contact Us</h3>
        <p className='text-gray-600'>
          If you have any questions about this Privacy Policy, you can contact us via email at{' '}
          <a href="mailto:support@example.com" className='text-blue-500 underline'>
            support@example.com
          </a>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
