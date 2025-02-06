import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [visibleProducts, setVisibleProducts] = useState(5);
  const [imageIndexes, setImageIndexes] = useState({});

  // Function to load more products
  const loadMoreProducts = () => {
    setVisibleProducts((prev) => prev + 5);
  };

  // Function to handle image switching
  const handleImageChange = (id, direction, totalImages) => {
    setImageIndexes((prev) => {
      const currentIndex = prev[id] || 0;
      let newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

      if (newIndex >= totalImages) newIndex = 0;
      if (newIndex < 0) newIndex = totalImages - 1;
      
      return { ...prev, [id]: newIndex };
    });
  };

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"NEW"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Behold our newest wares, where modern meets timeless, crafted with grace for every season.
        </p>
      </div>

      {products.length > 0 ? (
        <>
          {/* Rendering Products */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {products.slice(0, visibleProducts).map((item) => {
              const images = [item.image1, item.image2, item.image3, item.image4 , item.image5].filter(Boolean);
              const currentImage = images[imageIndexes[item._id] || 0] || item.image;

              return (
                <div key={item._id} className="relative">
                  <ProductItem id={item._id} image={currentImage} name={item.name} price={item.price} />
                  {images.length > 1 && (
                    <>
                      <button
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full"
                        onClick={() => handleImageChange(item._id, "prev", images.length)}
                      >
                        <FaChevronLeft size={14} />
                      </button>
                      <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full"
                        onClick={() => handleImageChange(item._id, "next", images.length)}
                      >
                        <FaChevronRight size={14} />
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Load More Button */}
          {visibleProducts < products.length && (
            <div className="text-center mt-6">
              <button
                onClick={loadMoreProducts}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all"
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-600 mt-8">No new items available at the moment.</p>
      )}
    </div>
  );
};

export default LatestCollection;