import { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const bestProduct = products.filter((item) => item.bestseller);
      setBestSeller(bestProduct.slice(0, 5));
    }
  }, [products]); // Dependency array includes 'products' to update when it changes

  return (
    <div className='my-10'>
      {/* Title Section */}
      <div className='text-center text-3xl py-8'>
        <Title text1={'BEST'} text2={'SELLERS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Discover our most popular products, handpicked for their outstanding value and quality.
        </p>
      </div>

      {/* Best Sellers Grid */}
      {bestSeller.length > 0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {bestSeller.map((item, index) => (
            <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
          ))}
        </div>
      ) : (
        <p className='text-center text-gray-500 mt-8'>No best-selling products available.</p>
      )}
    </div>
  );
};

export default BestSeller;
