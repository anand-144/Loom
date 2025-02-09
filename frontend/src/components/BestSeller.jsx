import { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { RiStarLine } from 'react-icons/ri';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    if (products.length > 0) {
      const bestProduct = products.filter((item) => item.bestseller);
      setBestSeller(bestProduct);
    }
  }, [products]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  const visibleItems = bestSeller.slice(0, visibleCount);

  return (
    <div className="w-full overflow-hidden my-16 px-4 sm:px-6 lg:px-8">
      {/* Title Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <RiStarLine className="w-6 h-6 text-amber-500" />
          <Title text1={'BEST'} text2={'SELLERS'} />
          <RiStarLine className="w-6 h-6 text-amber-500" />
        </div>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-600 leading-relaxed">
          Discover our most popular products, handpicked for their outstanding value and quality.
          Each piece represents excellence in craftsmanship and style.
        </p>
      </div>

      {/* Best Sellers Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 gap-y-6 sm:gap-y-8">
        {visibleItems.length > 0 ? (
          visibleItems.map((item) => (
            <div key={item._id} className="transform transition-transform duration-300 hover:scale-105">
              <ProductItem
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full">
            <p className="text-center text-gray-600 py-12 bg-gray-50 rounded-lg">
              No best-selling products available at the moment.
            </p>
          </div>
        )}
      </div>

      {/* Load More Button */}
      {visibleCount < bestSeller.length && (
        <div className="text-center mt-12">
          <button
            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transform transition-all duration-300 hover:shadow-lg active:scale-95"
            onClick={handleLoadMore}
          >
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
};

export default BestSeller;