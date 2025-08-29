import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { RiArrowLeftSLine, RiArrowRightSLine, RiSparklingLine } from "react-icons/ri";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const nonSeasonalProducts = products.filter((product) => !product.seasonal);

  const [imageIndexes, setImageIndexes] = useState({});

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
    <div className="w-full my-16 px-4 sm:px-6 lg:px-8">
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
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4">
            {nonSeasonalProducts.map((item) => {
              const images = [
                item.image1,
                item.image2,
                item.image3,
                item.image4,
                item.image5,
              ].filter(Boolean);
              const currentImage =
                images[imageIndexes[item._id] || 0] || item.image;

              return (
                <div
                  key={item._id}
                  className="min-w-[160px] sm:min-w-[180px] md:min-w-[200px] relative group transform transition-transform duration-300 hover:scale-10"
                >
                  {/* NEW Tag */}
                  <div className="absolute top-2 left-2 bg-emerald-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md z-10">
                    NEW
                  </div>

                  <ProductItem
                    id={item._id}
                    image={currentImage}
                    name={item.name}
                    price={item.price}
                  />

                  {/* Image Navigation Arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 text-gray-900 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={() =>
                          handleImageChange(item._id, "prev", images.length)
                        }
                      >
                        <RiArrowLeftSLine className="w-4 h-4" />
                      </button>
                      <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 text-gray-900 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={() =>
                          handleImageChange(item._id, "next", images.length)
                        }
                      >
                        <RiArrowRightSLine className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No new items available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default LatestCollection;
