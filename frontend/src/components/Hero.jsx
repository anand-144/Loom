import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { assets } from '../assets/frontend_assets/assets';


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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === sections.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [sections.length]);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-gray-700 via-black  to-gray-700 text-slate-200">
          <div className="grid md:grid-cols-2 min-h-[500px] lg:min-h-[600px]">
            {/* Content */}
            <div className="relative z-10 flex items-center p-6 sm:p-8 md:p-12 lg:p-16">
              <div className="w-full">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-0.5 w-8 sm:w-12 bg-pink-700"></div>
                    <p className="text-sm md:text-base text-gray-400 font-medium tracking-wide">
                      {sections[currentIndex].description}
                    </p>
                  </div>
                  
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-200 leading-tight">
                    {sections[currentIndex].title}
                  </h1>
                  
                  <Link
                    to="/collections"
                    className="inline-flex items-center space-x-4 group"
                  >
                    <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-300 group-hover:text-gray-200 transition-colors">
                      SHOP NOW
                    </span>
                    <div className="h-0.5 w-8 sm:w-12 bg-gray-900 group-hover:bg-gray-600 transition-colors"></div>
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-[250px] sm:h-[300px] md:h-full">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={sections[currentIndex].img}
                  alt={sections[currentIndex].alt}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 flex space-x-1.5 sm:space-x-2">
            {sections.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-gray-500 scale-110'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;