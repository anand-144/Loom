import React from 'react'
import { assets } from '../assets/frontend_assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                
                <div>
                    <img src={assets.logo} alt="logo" className='w-32 mb-5' />
                    <p className='w-full md:w-2/3 text-gray-600'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, nulla.
                    </p>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <Link to='/'>Home</Link>
                        <Link to='/about'>About Us</Link>
                        <Link to='/DeliveryPartner'>Delivery</Link>
                        <Link to='/PrivacyPolicy'>Privacy policy</Link>
                    </ul>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+91 574877943</li>
                        <li>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=singhanapucs20@student.mes.ac.in"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:underline hover:text-blue-500">
                                singhanapucs20@student.mes.ac.in
                            </a>
                        </li>
                    </ul>
                </div>

            </div>

            {/* Footer Bottom Section */}
            <hr className='my-5' />
            <p className='py-5 text-sm text-center'>Copyright 2024 @ forever.com</p>
        </>
    )
}

export default Footer;
