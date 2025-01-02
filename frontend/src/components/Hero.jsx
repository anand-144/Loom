import React, { useState, useEffect } from 'react';
import { assets } from '../assets/frontend_assets/assets';
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

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [currentIndex]);

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

    {/* Indicator Dots */}
    <div className="absolute bottom-4 right-4 flex gap-2 z-10">
  {sections.map((_, index) => (
    <div
      key={index}
      className={`w-2.5 h-2.5 rounded-full bg-white cursor-pointer ${index === currentIndex ? 'bg-opacity-100' : 'bg-opacity-50'}`}
      onClick={() => setCurrentIndex(index)}
      aria-label={`Go to slide ${index + 1}`}
    />
  ))}
</div>


    {/* Hero Right Side */}
    <div className="w-full sm:w-1/2 h-[300px] sm:h-[400px] md:h-[500px] relative">
      <img
        className="w-full h-full object-cover transition-all duration-1000 ease-out"
        src={sections[currentIndex].img}
        alt={sections[currentIndex].alt}
      />
    </div>
  </div>
</section>
 
  );
};

export default Hero;
