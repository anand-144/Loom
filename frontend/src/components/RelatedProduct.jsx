import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProduct = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    // Early exit if no products exist
    if (products.length === 0) return;

    // Filter related products based on category and subCategory
    const filteredProducts = products.filter(
      (item) => category === item.category && subCategory === item.subCategory
    );

    // Limit the number of related products to 5
    setRelated(filteredProducts.slice(0, 5));
  }, [products, category, subCategory]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>

      {related.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-5">
          {related.map((item) => (
            <ProductItem key={item._id} id={item._id} name={item.name} price={item.price} image={item.image} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-8">No related products available.</p>
      )}
    </div>
  );
};

export default RelatedProduct;
