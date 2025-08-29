import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';
import Title from './Title';

const Seasonal = () => {
  const { selectedSeason, setSelectedSeason, getSeasonalProducts } = useContext(ShopContext);

  // Get only seasonal products for the selected season
  const seasonalProducts = getSeasonalProducts(selectedSeason);

  // Emoji + Tag mapping
  const seasonTags = {
    Winter: { emoji: '❄️', label: 'Winter' },
    Summer: { emoji: '🌞', label: 'Summer' },
    Autumn: { emoji: '🍂', label: "Autumn" },
    Spring: { emoji: '🌸', label: 'Spring' }
  };

  const seasonEmoji = seasonTags[selectedSeason]?.emoji || '🌟';
  const seasonLabel = seasonTags[selectedSeason]?.label || 'Seasonal';

  return (
    <div className="w-full overflow-hidden my-8 px-4 sm:px-6 lg:px-8 py-8">
      {/* Season Buttons */}
      <div className="mb-8 flex flex-wrap justify-center gap-4">
        {['Winter', 'Summer', 'Autumn', 'Spring'].map((season) => (
          <motion.button
            key={season}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedSeason(season)}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              selectedSeason === season
                ? 'bg-black text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {season}
          </motion.button>
        ))}
      </div>

      <div className="text-center mb-6">
        <Title 
          text1={seasonEmoji} 
          text2={`${selectedSeason} Collection`} 
          className="text-2xl md:text-3xl font-bold"
        />
      </div>

      {/* Horizontal Scrollable Products */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex space-x-6 pb-4">
          {seasonalProducts.length > 0 ? (
            seasonalProducts.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative min-w-[120px] sm:min-w-[140px] md:min-w-[160px] transition-transform duration-300 hover:scale-105"
              >
                {/* Seasonal Tag */}
                <div className="absolute top-2 left-2 z-20 bg-black/70 text-white text-xs px-3 py-1 rounded-full shadow-md pointer-events-none">
                  {seasonEmoji} {seasonLabel}
                </div>

                {/* Product Card */}
                <div className="relative z-10">
                  <ProductItem
                    id={item._id}
                    name={item.name}
                    image={item.image}
                    price={item.price}
                  />
                </div>
              </motion.div>
            ))
          ) : (
            <div className="w-full text-center">
              <p className="text-center text-gray-600 py-12 bg-white/50 rounded-lg backdrop-blur-sm">
                No {selectedSeason.toLowerCase()} collection available at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Seasonal;
