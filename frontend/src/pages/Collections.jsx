import { useContext, useEffect, useState } from "react";
import { debounce } from "lodash";
import { IoFilterSharp } from "react-icons/io5";
import { LuArrowUpDown } from "react-icons/lu";
import ProductItem from "../components/ProductItem";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import { motion } from "framer-motion";

// Import icons for existing subcategory filters
// For Shirt
import { PiShirtFoldedLight, PiShirtFoldedFill } from "react-icons/pi";
// For T-Shirt
import { PiTShirtBold, PiTShirtFill } from "react-icons/pi";
// For Jacket
import { TbJacket } from "react-icons/tb";
import { GiSleevelessJacket } from "react-icons/gi";
// For Polo
import { LiaTshirtSolid } from "react-icons/lia";
import { GiPoloShirt } from "react-icons/gi";
// For Sweatshirt
import { PiHoodieLight, PiHoodieFill } from "react-icons/pi";
// For Pants
import { PiPants, PiPantsFill } from "react-icons/pi";

const Collections = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [bestseller, setBestSeller] = useState(false);
  const [seasonalWear, setSeasonalWear] = useState(false);
  const [sortType, setSortType] = useState("relevant");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);

  // Toggle Category Filter
  const toggleCategory = (e) => {
    const value = e.target.value;
    if (value === "Bestseller") {
      setBestSeller((prev) => !prev);
    } else {
      if (category.includes(value)) {
        setCategory((prev) => prev.filter((item) => item !== value));
      } else {
        setCategory((prev) => [...prev, value]);
      }
    }
  };

  // Toggle Subcategory Filter
  const toggleSubCategory = (input) => {
    const value = typeof input === "string" ? input : input.target.value;
    if (subCategory.includes(value)) {
      setSubCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setSubCategory((prev) => [...prev, value]);
    }
  };

  // Apply filters to products
  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && debouncedSearch) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    if (bestseller) {
      productsCopy = productsCopy.filter((item) => item.bestseller === true);
    }

    setFilterProducts(productsCopy);
  };

  // Sort products
  const sortProducts = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  // Handle loading more products
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  // Calculate visible products
  const visibleProducts = filterProducts.slice(0, visibleCount);

  // Initial setup
  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  // Apply filters when dependencies change
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, debouncedSearch, showSearch, bestseller, products]);

  // Apply sorting when sort type changes
  useEffect(() => {
    sortProducts();
  }, [sortType]);

  // Debounce search input
  useEffect(() => {
    const debounced = debounce(() => setDebouncedSearch(search), 300);
    debounced();
    return () => debounced.cancel();
  }, [search]);

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="flex h-full">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block w-80 h-screen overflow-y-auto border-r border-gray-200 bg-white p-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-gray-700 via-black to-gray-700 bg-clip-text text-transparent">
              FILTERS
            </h2>
            
            {/* Category Filter */}
            <div className="border-2 border-gray-200 rounded-lg p-4 mb-6 hover:border-gray-300 transition-colors">
              <h3 className="font-bold mb-4 text-gray-800">Category</h3>
              <div className="space-y-3">
                {["Men", "Women", "Bestseller"].map((item) => (
                  <label key={item} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-gray-700 focus:ring-gray-500"
                      value={item}
                      onChange={toggleCategory}
                      checked={item === "Bestseller" ? bestseller : category.includes(item)}
                    />
                    <span className="text-gray-600 group-hover:text-gray-900 transition-colors">
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Types Section */}
            <div className="border-2 border-gray-200 rounded-lg p-4 mb-6 hover:border-gray-300 transition-colors">
              <h3 className="font-bold mb-4 text-gray-800">Tops</h3>
              <div className="space-y-3">
                {[
                  ["Shirt", PiShirtFoldedLight, PiShirtFoldedFill],
                  ["T-Shirt", PiTShirtBold, PiTShirtFill],
                  ["Polos", LiaTshirtSolid, GiPoloShirt],
                  ["Sweatshirts", PiHoodieLight, PiHoodieFill],
                  ["Jacket", TbJacket, GiSleevelessJacket],
                ].map(([type, Icon, ActiveIcon]) => (
                  <motion.button
                    key={type}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleSubCategory(type)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                      subCategory.includes(type)
                        ? "bg-gradient-to-r from-gray-700 via-black to-gray-700 text-slate-200"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {subCategory.includes(type) ? (
                      <ActiveIcon className="text-xl" />
                    ) : (
                      <Icon className="text-xl" />
                    )}
                    <span>{type}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Bottoms Section */}
            <div className="border-2 border-gray-200 rounded-lg p-4 mb-6 hover:border-gray-300 transition-colors">
              <h3 className="font-bold mb-4 text-gray-800">Bottoms</h3>
              <div className="space-y-3">
                {[
                  "Jeans",
                  "Trousers",
                  "Cargo",
                  "Joggers",
                  "TrackPant",
                  "Shorts",
                ].map((type) => (
                  <motion.button
                    key={type}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleSubCategory(type)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                      subCategory.includes(type)
                        ? "bg-gradient-to-r from-gray-700 via-black to-gray-700 text-slate-200"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {subCategory.includes(type) ? (
                      <PiPantsFill className="text-xl" />
                    ) : (
                      <PiPants className="text-xl" />
                    )}
                    <span>{type}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Products Section */}
        <div className="flex-1 h-screen overflow-y-auto bg-gray-50">
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex justify-between items-center">
              <Title text1="ALL" text2="COLLECTIONS" className="text-2xl font-bold" />
              <select
                className="hidden lg:block px-4 py-2 border-2 border-gray-200 rounded-md text-sm cursor-pointer hover:border-gray-300 transition-colors focus:outline-none focus:border-gray-400"
                onChange={(e) => setSortType(e.target.value)}
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
              </select>
            </div>
          </div>

          <div className="p-6">
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {visibleProducts.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductItem
                    name={item.name}
                    id={item._id}
                    price={item.price}
                    image={item.image}
                  />
                </motion.div>
              ))}
            </motion.div>

            {visibleCount < filterProducts.length && (
              <div className="text-center mt-10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-gray-700 via-black to-gray-700 text-slate-200 rounded-lg shadow-md hover:shadow-lg transition-all"
                  onClick={handleLoadMore}
                >
                  Load More
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-2 divide-x divide-gray-200">
          <button
            onClick={() => setShowFilter(true)}
            className="flex items-center justify-center gap-2 py-4 font-medium hover:bg-gray-50"
          >
            <IoFilterSharp className="text-lg" />
            FILTER
          </button>
          <button
            onClick={() => setShowSort(true)}
            className="flex items-center justify-center gap-2 py-4 font-medium hover:bg-gray-50"
          >
            <LuArrowUpDown className="text-lg" />
            SORT
          </button>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showFilter && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto lg:hidden">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button
                onClick={() => setShowFilter(false)}
                className="text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="space-y-6">
              {/* Category Section */}
              <div className="border-b pb-4">
                <p className="font-bold mb-3">Category</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value="Men"
                      checked={category.includes("Men")}
                      onChange={toggleCategory}
                    />
                    <span>Men</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value="Women"
                      checked={category.includes("Women")}
                      onChange={toggleCategory}
                    />
                    <span>Women</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value="Bestseller"
                      checked={bestseller}
                      onChange={toggleCategory}
                    />
                    <span>Bestseller</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value="Seasonal Wear"
                      checked={seasonalWear}
                      onChange={toggleCategory}
                    />
                    <span>Seasonal Wear</span>
                  </label>

                </div>
              </div>

              {/* Types Section */}
              <div className="border-b pb-4">
                <p className="font-bold mb-3">Type</p>
                <div className="space-y-2">
                  {["Shirt", "T-Shirt", "Polos", "Sweatshirts", "Jacket"].map((type) => (
                    <button
                      key={type}
                      onClick={() => toggleSubCategory(type)}
                      className={`flex items-center gap-2 w-full py-2 px-3 rounded ${
                        subCategory.includes(type)
                          ? "bg-gradient-to-r from-gray-700 via-black to-gray-700 text-slate-200"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottoms Section */}
              <div className="border-b pb-4">
                <p className="font-bold mb-3">Bottoms</p>
                <div className="space-y-2">
                  {["Jeans", "Trousers", "Cargo", "Joggers", "TrackPant", "Shorts"].map(
                    (type) => (
                      <button
                        key={type}
                        onClick={() => toggleSubCategory(type)}
                        className={`flex items-center gap-2 w-full py-2 px-3 rounded ${
                          subCategory.includes(type)
                            ? "bg-gradient-to-r from-gray-700 via-black to-gray-700 text-slate-200"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {type}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sort Modal */}
      {showSort && (
        <div className="fixed inset-0 bg-white z-50 lg:hidden">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Sort By</h2>
              <button
                onClick={() => setShowSort(false)}
                className="text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              {["relevant", "low-high", "high-low"].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSortType(type);
                    setShowSort(false);
                  }}
                  className={`w-full text-left py-2 px-4 rounded ${
                    sortType === type
                      ? "bg-gradient-to-r from-gray-700 via-black to-gray-700 text-slate-200"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {type === "relevant"
                    ? "Relevant"
                    : type === "low-high"
                    ? "Price: Low to High"
                    : "Price: High to Low"}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collections;