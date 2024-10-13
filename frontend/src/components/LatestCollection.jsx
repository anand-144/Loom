import { useContext, useEffect, useMemo, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [visibleProducts, setVisibleProducts] = useState(5); 

    const latestProducts = useMemo(() => {
        return products.slice(0, visibleProducts);
    }, [products, visibleProducts]);

    // Function to load 5 more products
    const loadMoreProducts = () => {
        setVisibleProducts(prevVisible => prevVisible + 5);
    };

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'NEWEST'} text2={'RAIMENTS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Behold our newest wares, where modern meets timeless, crafted with grace for every season.
                </p>
            </div>

            {/* Empty state handling */}
            {latestProducts.length > 0 ? (
                <>
                    {/* Rendering Products */}
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                        {latestProducts.map((item, index) => (
                            <ProductItem
                                key={index}
                                id={item._id}
                                image={item.image}
                                name={item.name}
                                price={item.price}
                            />
                        ))}
                    </div>

                    {/* Load More Button */}
                    {visibleProducts < products.length && (
                        <div className='text-center mt-6'>
                            <button
                                onClick={loadMoreProducts}
                                className='px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all'
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <p className='text-center text-gray-600 mt-8'>No new items available at the moment.</p>
            )}
        </div>
    );
};

export default LatestCollection;
