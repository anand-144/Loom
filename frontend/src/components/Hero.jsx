import React from 'react';
import { assets } from '../assets/frontend_assets/assets';

const Hero = () => {
  return (
    <section className='flex flex-col sm:flex-row border-2 rounded-sm border-gray-700 bg-[#ffd9c4]'>
      {/* Hero Left Side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 font-medium'>
        <div className='text-[#414141]'>
          <div className='flex items-center gap-2'>
            <div className='divider'></div>
            <p className='font-medium text-sm md:text-base'>OUR BESTSELLER</p>
          </div>
          <h1 className='text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
          <div className='flex items-center gap-2'>
            <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
            <div className='divider'></div>
          </div>
        </div>
      </div>

      {/* Hero Right Side */}
      <img className='w-full sm:w-1/2' src={assets.hero_img} alt="Latest fashion arrivals showcase" />
    </section>
  );
};

export default Hero;
