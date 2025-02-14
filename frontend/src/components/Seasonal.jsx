import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';
import Title from './Title';

const Seasonal = () => {
  const { selectedSeason, setSelectedSeason, getSeasonalProducts } = useContext(ShopContext);
  const [visibleCount, setVisibleCount] = useState(5);

  // Get only seasonal products for the selected season
  const seasonalProducts = getSeasonalProducts(selectedSeason);
  const visibleItems = seasonalProducts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  // Emoji mapping for display
  const seasonEmojis = {
    Winter: '❄️',
    Summer: '🌞',
    Autumn: '🍂',
    Spring: '🌸'
  };
  const seasonEmoji = seasonEmojis[selectedSeason] || '🌟';

  return (
    <div className="w-full overflow-hidden my-8 px-4 sm:px-6 lg:px-8 py-8">
      {/* Season Buttons */}
      <div className="mb-8 flex flex-wrap justify-center gap-4">
        {['Winter', 'Summer', 'Autumn', 'Spring'].map((season) => (
          <motion.button
            key={season}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelectedSeason(season);
              setVisibleCount(5);
            }}
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

      {/* Product Grid (responsive layout) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 -mt-4">
        {visibleItems.length > 0 ? (
          visibleItems.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="transform transition-transform duration-300 hover:scale-105"
            >
              <ProductItem
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full">
            <p className="text-center text-gray-600 py-12 bg-white/50 rounded-lg backdrop-blur-sm">
              No {selectedSeason.toLowerCase()} collection available at the moment.
            </p>
          </div>
        )}
      </div>

      {visibleCount < seasonalProducts.length && (
        <div className="text-center mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 bg-gradient-to-r from-gray-700 via-black to-gray-700 text-white rounded-full hover:shadow-lg transition-all duration-300"
            onClick={handleLoadMore}
          >
            Load More Products
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default Seasonal;
