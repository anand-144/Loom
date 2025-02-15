import { useContext, useEffect, useState } from "react";
import { debounce } from "lodash";
import { IoFilterSharp } from "react-icons/io5";
import { LuArrowUpDown } from "react-icons/lu";
import ProductItem from "../components/ProductItem";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import { motion } from "framer-motion";

// Import icons for subcategory filters (Tops & Bottoms)
import { PiShirtFoldedLight, PiShirtFoldedFill } from "react-icons/pi";
import { PiTShirtBold, PiTShirtFill } from "react-icons/pi";
import { TbJacket } from "react-icons/tb";
import { GiSleevelessJacket, GiPoloShirt } from "react-icons/gi";
import { LiaTshirtSolid } from "react-icons/lia";
import { PiHoodieLight, PiHoodieFill } from "react-icons/pi";
import { PiPants, PiPantsFill } from "react-icons/pi";

// Import season icons
import { FaSun, FaRegSun, FaRegSnowflake, FaSnowflake } from "react-icons/fa";
import { IoLeafOutline, IoLeaf } from "react-icons/io5";
import { PiFlowerBold, PiFlowerDuotone } from "react-icons/pi";

// Import new icons for category filters
import { FaMale, FaFemale, FaStar } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";

const Collections = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [bestseller, setBestSeller] = useState(false);
  const [selectedSeasons, setSelectedSeasons] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);

  // Helper function for category icons.
  // When active, the icon renders in its designated color; otherwise, in gray.
  const getCategoryIcon = (item, isActive) => {
    switch (item) {
      case "Men":
        return (
          <FaMale className={`text-2xl ${isActive ? "text-blue-500" : "text-gray-500"}`} />
        );
      case "Women":
        return (
          <FaFemale className={`text-2xl ${isActive ? "text-pink-500" : "text-gray-500"}`} />
        );
      case "Bestseller":
        return (
          <FaStar className={`text-2xl ${isActive ? "text-yellow-500" : "text-gray-500"}`} />
        );
      default:
        return null;
    }
  };

  // Options for Tops with icons.
  // The "color" property now holds the text color for active state.
  const topsOptions = [
    { type: "Shirt", Icon: PiShirtFoldedLight, ActiveIcon: PiShirtFoldedFill, color: "text-blue-500" },
    { type: "T-Shirt", Icon: PiTShirtBold, ActiveIcon: PiTShirtFill, color: "text-red-500" },
    { type: "Polos", Icon: LiaTshirtSolid, ActiveIcon: GiPoloShirt, color: "text-purple-500" },
    { type: "Sweatshirts", Icon: PiHoodieLight, ActiveIcon: PiHoodieFill, color: "text-green-500" },
    { type: "Jacket", Icon: TbJacket, ActiveIcon: GiSleevelessJacket, color: "text-orange-500" },
  ];

  // Options for Bottoms with icons.
  const bottomsOptions = [
    { type: "Jeans", Icon: PiPants, ActiveIcon: PiPantsFill, color: "text-indigo-500" },
    { type: "Trousers", Icon: PiPants, ActiveIcon: PiPantsFill, color: "text-teal-500" },
    { type: "Cargo", Icon: PiPants, ActiveIcon: PiPantsFill, color: "text-amber-500" },
    { type: "Joggers", Icon: PiPants, ActiveIcon: PiPantsFill, color: "text-fuchsia-500" },
    { type: "TrackPant", Icon: PiPants, ActiveIcon: PiPantsFill, color: "text-cyan-500" },
    { type: "Shorts", Icon: PiPants, ActiveIcon: PiPantsFill, color: "text-lime-500" },
  ];

  // Toggle Category Filter (accepts event or string)
  const toggleCategory = (input) => {
    const value = typeof input === "string" ? input : input.target.value;
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

  // Toggle Subcategory Filter (for Tops & Bottoms)
  const toggleSubCategory = (input) => {
    const value = typeof input === "string" ? input : input.target.value;
    if (subCategory.includes(value)) {
      setSubCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setSubCategory((prev) => [...prev, value]);
    }
  };

  // Toggle Season Filter
  const toggleSeason = (season) => {
    if (selectedSeasons.includes(season)) {
      setSelectedSeasons((prev) => prev.filter((item) => item !== season));
    } else {
      setSelectedSeasons((prev) => [...prev, season]);
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
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
    }

    if (bestseller) {
      productsCopy = productsCopy.filter((item) => item.bestseller === true);
    }

    // Season filter: show matching seasonal products or, if none selected, exclude seasonal wear.
    if (selectedSeasons.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        selectedSeasons.includes(item.seasonal)
      );
    } else {
      productsCopy = productsCopy.filter((item) => !item.seasonal);
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

  // Handle "Load More"
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const visibleProducts = filterProducts.slice(0, visibleCount);

  // Initial setup & dependency effects
  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, debouncedSearch, showSearch, bestseller, selectedSeasons, products]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

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
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-gray-700 via-black to-gray-700 bg-clip-text text-transparent">
              FILTERS
            </h2>

            {/* Category Filter as Buttons */}
            <div className="border-2 border-gray-200 rounded-lg p-4 mb-6 hover:border-gray-300 transition-colors">
              <h3 className="font-bold mb-4 text-gray-800">Category</h3>
              <div className="flex flex-wrap gap-3">
                {["Men", "Women", "Bestseller"].map((item) => {
                  const isActive = item === "Bestseller" ? bestseller : category.includes(item);
                  return (
                    <motion.button
                      key={item}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleCategory(item)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                        isActive
                          ? "bg-gradient-to-r from-gray-700 via-black to-gray-700 text-slate-200"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {getCategoryIcon(item, isActive)}
                      <span>{item}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Season Filter with Icons */}
            <div className="border-2 border-gray-200 rounded-lg p-4 mb-6 hover:border-gray-300 transition-colors">
              <h3 className="font-bold mb-4 text-gray-800">Season</h3>
              <div className="flex flex-wrap gap-3">
                {["Winter", "Summer", "Autumn", "Spring"].map((season) => (
                  <motion.button
                    key={season}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleSeason(season)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                      selectedSeasons.includes(season)
                        ? "bg-gradient-to-r from-gray-700 via-black to-gray-700 text-slate-200"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {season === "Summer" &&
                      (selectedSeasons.includes("Summer") ? (
                        <FaSun className="text-2xl text-yellow-500" />
                      ) : (
                        <FaRegSun className="text-2xl text-gray-500" />
                      ))}
                    {season === "Winter" &&
                      (selectedSeasons.includes("Winter") ? (
                        <FaSnowflake className="text-2xl text-blue-500" />
                      ) : (
                        <FaRegSnowflake className="text-2xl text-gray-500" />
                      ))}
                    {season === "Autumn" &&
                      (selectedSeasons.includes("Autumn") ? (
                        <IoLeaf className="text-2xl text-orange-500" />
                      ) : (
                        <IoLeafOutline className="text-2xl text-gray-500" />
                      ))}
                    {season === "Spring" &&
                      (selectedSeasons.includes("Spring") ? (
                        <PiFlowerBold className="text-2xl text-pink-500" />
                      ) : (
                        <PiFlowerDuotone className="text-2xl text-gray-500" />
                      ))}
                    <span className="text-sm">{season}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Tops Section */}
            <div className="border-2 border-gray-200 rounded-lg p-4 mb-6 hover:border-gray-300 transition-colors">
              <h3 className="font-bold mb-4 text-gray-800">Tops</h3>
              <div className="flex flex-wrap gap-3">
                {topsOptions.map(({ type, Icon, ActiveIcon, color }) => (
                  <motion.button
                    key={type}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleSubCategory(type)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                      subCategory.includes(type)
                        ? "bg-gradient-to-r from-gray-700 via-black to-gray-700 text-slate-200"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {subCategory.includes(type) ? (
                      <ActiveIcon className={`text-2xl ${color}`} />
                    ) : (
                      <Icon className="text-2xl text-gray-500" />
                    )}
                    <span className="text-sm">{type}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Bottoms Section */}
            <div className="border-2 border-gray-200 rounded-lg p-4 mb-6 hover:border-gray-300 transition-colors">
              <h3 className="font-bold mb-4 text-gray-800">Bottoms</h3>
              <div className="flex flex-wrap gap-3">
                {bottomsOptions.map(({ type, Icon, ActiveIcon, color }) => (
                  <motion.button
                    key={type}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleSubCategory(type)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                      subCategory.includes(type)
                        ? "bg-gradient-to-r from-gray-700 via-black to-gray-700 text-slate-200"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {subCategory.includes(type) ? (
                      <ActiveIcon className={`text-2xl ${color}`} />
                    ) : (
                      <Icon className="text-2xl text-gray-500" />
                    )}
                    <span className="text-sm">{type}</span>
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
            {filterProducts.length > 0 ? (
              <>
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
              </>
            ) : (
              <div className="py-12 text-center">
                <p className="text-gray-600 text-xl">No related products available.</p>
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
            <IoFilterSharp className="text-lg text-gray-600" />
            FILTER
          </button>
          <button
            onClick={() => setShowSort(true)}
            className="flex items-center justify-center gap-2 py-4 font-medium hover:bg-gray-50"
          >
            <LuArrowUpDown className="text-lg text-gray-600" />
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
              <button onClick={() => setShowFilter(false)} className="text-gray-600">
                ✕
              </button>
            </div>
            <div className="space-y-6">
              {/* Category Section (as buttons) */}
              <div className="border-b pb-4">
                <p className="font-bold mb-3">Category</p>
                <div className="flex flex-wrap gap-3">
                  {["Men", "Women", "Bestseller"].map((item) => {
                    const isActive = item === "Bestseller" ? bestseller : category.includes(item);
                    return (
                      <motion.button
                        key={item}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleCategory(item)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                          isActive
                            ? "bg-gradient-to-r from-gray-700 via-black to-gray-700 text-slate-200"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {getCategoryIcon(item, isActive)}
                        <span>{item}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Season Section (Mobile) */}
              <div className="border-b pb-4">
                <p className="font-bold mb-3">Season</p>
                <div className="flex flex-wrap gap-3">
                  {["Winter", "Summer", "Autumn", "Spring"].map((season) => (
                    <motion.button
                      key={season}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleSeason(season)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                        selectedSeasons.includes(season)
                          ? "bg-gradient-to-r from-gray-700 via-black to-gray-700 text-slate-200"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {season === "Summer" &&
                        (selectedSeasons.includes("Summer") ? (
                          <FaSun className="text-2xl text-yellow-500" />
                        ) : (
                          <FaRegSun className="text-2xl text-gray-500" />
                        ))}
                      {season === "Winter" &&
                        (selectedSeasons.includes("Winter") ? (
                          <FaSnowflake className="text-2xl text-blue-500" />
                        ) : (
                          <FaRegSnowflake className="text-2xl text-gray-500" />
                        ))}
                      {season === "Autumn" &&
                        (selectedSeasons.includes("Autumn") ? (
                          <IoLeaf className="text-2xl text-orange-500" />
                        ) : (
                          <IoLeafOutline className="text-2xl text-gray-500" />
                        ))}
                      {season === "Spring" &&
                        (selectedSeasons.includes("Spring") ? (
                          <PiFlowerBold className="text-2xl text-pink-500" />
                        ) : (
                          <PiFlowerDuotone className="text-2xl text-gray-500" />
                        ))}
                      <span className="text-sm">{season}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Tops Section (Mobile) */}
              <div className="border-b pb-4">
                <p className="font-bold mb-3">Tops</p>
                <div className="flex flex-wrap gap-3">
                  {topsOptions.map(({ type, Icon, ActiveIcon, color }) => (
                    <motion.button
                      key={type}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleSubCategory(type)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                        subCategory.includes(type)
                          ? "bg-gradient-to-r from-gray-700 via-black to-gray-700 text-slate-200"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {subCategory.includes(type) ? (
                        <ActiveIcon className={`text-2xl ${color}`} />
                      ) : (
                        <Icon className="text-2xl text-gray-500" />
                      )}
                      <span className="text-sm">{type}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Bottoms Section (Mobile) */}
              <div className="border-b pb-4">
                <p className="font-bold mb-3">Bottoms</p>
                <div className="flex flex-wrap gap-3">
                  {bottomsOptions.map(({ type, Icon, ActiveIcon, color }) => (
                    <motion.button
                      key={type}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleSubCategory(type)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                        subCategory.includes(type)
                          ? "bg-gradient-to-r from-gray-700 via-black to-gray-700 text-slate-200"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {subCategory.includes(type) ? (
                        <ActiveIcon className={`text-2xl ${color}`} />
                      ) : (
                        <Icon className="text-2xl text-gray-500" />
                      )}
                      <span className="text-sm">{type}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
          {filterProducts.length > 0 ? (
            <>
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
            </>
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-600 text-xl">No related products available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collections;
