import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { RiArrowLeftSLine, RiArrowRightSLine, RiSparklingLine } from "react-icons/ri";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  // Filter out seasonal products
  const nonSeasonalProducts = products.filter((product) => !product.seasonal);

  const [visibleProducts, setVisibleProducts] = useState(5);
  const [imageIndexes, setImageIndexes] = useState({});

  const loadMoreProducts = () => {
    setVisibleProducts((prev) => prev + 5);
  };

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
    <div className="w-full overflow-hidden my-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <RiSparklingLine className="w-6 h-6 text-emerald-500" />
          <Title text1={"NEW"} text2={"COLLECTION"} />
          <RiSparklingLine className="w-6 h-6 text-emerald-500" />
        </div>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-600 leading-relaxed">
          Behold our newest wares, where modern meets timeless, crafted with grace for every season.
          Each piece tells a story of innovation and style.
        </p>
      </div>

      {nonSeasonalProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 gap-y-6 sm:gap-y-8">
            {nonSeasonalProducts.slice(0, visibleProducts).map((item) => {
              const images = [
                item.image1,
                item.image2,
                item.image3,
                item.image4,
                item.image5
              ].filter(Boolean);
              const currentImage = images[imageIndexes[item._id] || 0] || item.image;

              return (
                <div key={item._id} className="relative group transform transition-transform duration-300 hover:scale-105 mb-3">
                  <ProductItem id={item._id} image={currentImage} name={item.name} price={item.price} />
                  {images.length > 1 && (
                    <>
                      <button
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 text-gray-900 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={() => handleImageChange(item._id, "prev", images.length)}
                      >
                        <RiArrowLeftSLine className="w-4 h-4" />
                      </button>
                      <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 text-gray-900 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={() => handleImageChange(item._id, "next", images.length)}
                      >
                        <RiArrowRightSLine className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {visibleProducts < nonSeasonalProducts.length && (
            <div className="text-center mt-12">
              <button
                onClick={loadMoreProducts}
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-gray-700 via-black to-gray-700 text-white rounded-full hover:bg-gray-800 transform transition-all duration-300 hover:shadow-lg active:scale-95"
              >
                Load More Products
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No new items available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default LatestCollection;
