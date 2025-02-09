import React from 'react';
import { FaShippingFast, FaHandshake, FaPhoneAlt } from 'react-icons/fa'; // Import icons

const DeliveryPartner = () => {
    return (
        <div className='max-w-6xl mx-auto my-16 p-8 bg-white shadow-lg rounded-lg'>
            {/* Header Section */}
            <div className='mb-10 text-center'>
                <h1 className='text-4xl font-bold text-gray-900'>Our Delivery Partners</h1>
                <p className='text-gray-500 mt-4'>
                    We work with trusted delivery partners to ensure your packages arrive on time and in perfect condition.
                </p>
            </div>

            {/* Partner Logos Section */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                <div className='p-6 bg-gray-100 rounded-lg flex items-center justify-center'>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Blue_Dart_logo_transparent.png" alt="Partner 1" className='w-32' />
                </div>
                <div className='p-6 bg-gray-100 rounded-lg flex items-center justify-center'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2CQIMiyn44Rj9rbUflyH69dj0MaObVOeQPw&s" alt="Partner 2" className='w-32' />
                </div>
                <div className='p-6 bg-gray-100 rounded-lg flex items-center justify-center'>
                    <img src="data:image/png;base64,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" alt="Partner 3" className='w-32' />
                </div>
            </div>

            {/* Work with Us Section */}
            <div className='mt-16'>
                <div className='flex items-center mb-4'>
                    <FaHandshake className='text-blue-600 text-3xl mr-3' />
                    <h2 className='text-2xl font-semibold text-gray-900'>Interested in Partnering with Us?</h2>
                </div>
                <p className='text-gray-500'>
                    We are always looking for new delivery partners to help us deliver exceptional service. If you're interested in collaborating,
                    feel free to reach out to us. We're open to discussing how we can work together to make our deliveries even better.
                </p>
            </div>

            {/* Contact Information Section */}
            <div className='mt-10'>
                <div className='flex items-center mb-4'>
                    <FaPhoneAlt className='text-blue-600 text-2xl mr-3' />
                    <h3 className='text-xl font-medium text-gray-900'>Contact Us</h3>
                </div>
                <p className='text-gray-500'>
                    Email us at{' '}
                    <a href="mailto:partners@example.com" className='text-blue-500 underline'>
                        partners@example.com
                    </a>{' '}
                    or call us at{' '}
                    <span className='font-semibold text-gray-900'>+91 9876543210</span>.
                </p>
            </div>
        </div>
    );
};

export default DeliveryPartner;
