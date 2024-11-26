import React, { useState } from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sections = [
    {
      title: "Men's Wear",
      description: 'OUR BESTSELLER',
      img: assets.Hero_Men,
      alt: "Men's fashion arrivals showcase",
    },
    {
      title: "Women's Wear",
      description: 'OUR BESTSELLER',
      img: assets.Girl_Hero,
      alt: "Women's fashion arrivals showcase",
    },
    {
      title: 'OUR BESTSELLER',
      description: 'LATEST ARRIVAL',
      img: assets.hero_img,
      alt: 'Holiday season sale showcase',
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? sections.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === sections.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section className="relative">
      {/* Hero Section */}
      <div className="flex flex-col-reverse sm:flex-row border-2 rounded-sm border-gray-700 bg-[#ffd9c4]">
        {/* Hero Left Side */}
        <div className="w-full sm:w-1/2 flex items-center justify-center py-6 px-4 sm:py-0 font-medium">
          <div className="text-[#414141] text-center sm:text-left px-4">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <div className="divider w-10 h-0.5 bg-gray-800"></div>
              <p className="font-medium text-sm md:text-base">{sections[currentIndex].description}</p>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-5xl sm:py-3 leading-relaxed">
              {sections[currentIndex].title}
            </h1>
            <Link to="/collections">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <p className="font-semibold text-sm md:text-base cursor-pointer hover:underline">
                SHOP NOW
              </p>
              <div className="divider w-10 h-0.5 bg-gray-800"></div>
            </div>
            </Link>
          </div>
        </div>

        {/* Hero Right Side */}
        <div className="w-full sm:w-1/2 h-[300px] sm:h-[400px] md:h-[500px] relative">
          <img
            className="w-full h-full object-cover transition-all duration-[1000ms] ease-out"
            src={sections[currentIndex].img}
            alt={sections[currentIndex].alt}
          />
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 p-1 sm:p-2 bg-white rounded-full shadow-md focus:outline-none"
            aria-label="Previous"
          >
            <FaArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-800" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 p-1 sm:p-2 bg-white rounded-full shadow-md focus:outline-none"
            aria-label="Next"
          >
            <FaArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-800" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
