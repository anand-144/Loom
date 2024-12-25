import { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5); // Number of items to display initially

  useEffect(() => {
    if (products.length > 0) {
      const bestProduct = products.filter((item) => item.bestseller);
      setBestSeller(bestProduct);
    }
  }, [products]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 5); // Load 5 more items
  };

  const visibleItems = bestSeller.slice(0, visibleCount);

  return (
    <div className="my-10">
      {/* Title Section */}
      <div className="text-center text-3xl py-8">
        <Title text1={'BEST'} text2={'SELLERS'} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our most popular products, handpicked for their outstanding value and quality.
        </p>
      </div>

      {/* Best Sellers Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {visibleItems.length > 0 ? (
          visibleItems.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-8">No best-selling products available.</p>
        )}
      </div>

      {/* Load More Button */}
      {visibleCount < bestSeller.length && (
        <div className="text-center mt-6">
          <button
            className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default BestSeller;
