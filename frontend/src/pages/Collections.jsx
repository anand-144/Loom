  import { useContext, useEffect, useState } from "react";
  import { debounce } from "lodash";
  import { IoIosArrowDown } from "react-icons/io";
  import { IoFilterSharp } from "react-icons/io5";
  import { LuArrowUpDown } from "react-icons/lu";
  import ProductItem from "../components/ProductItem";
  import Title from "../components/Title";
  import { ShopContext } from "../context/ShopContext";

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
      <div className="relative min-h-screen pb-20 md:pb-0">
        <div className="flex flex-col lg:flex-row gap-1 lg:gap-10 pt-10 border-t">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block min-w-60">
            <p className="my-2 text-xl">FILTERS</p>
            
            {/* Category Filter */}
            <div className="border-2 border-black rounded-md pl-5 py-3 mt-6">
              <p className="mb-3 text-sm font-bold">Category</p>
              <div className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                <label className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="w-3"
                    value="Men"
                    onChange={toggleCategory}
                    checked={category.includes("Men")}
                  />
                  Men
                </label>
                <label className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="w-3"
                    value="Women"
                    onChange={toggleCategory}
                    checked={category.includes("Women")}
                  />
                  Women
                </label>
                <label className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="w-3"
                    value="Bestseller"
                    onChange={toggleCategory}
                    checked={bestseller}
                  />
                  Bestseller
                </label>
              </div>
            </div>

            {/* Types Section */}
            <div className="border-2 border-black rounded-md pl-5 py-3 mt-6">
              <p className="mb-3 text-sm font-bold">Type</p>
              <div className="flex flex-col gap-2">
                {[
                  ["Shirt", PiShirtFoldedLight, PiShirtFoldedFill],
                  ["T-Shirt", PiTShirtBold, PiTShirtFill],
                  ["Polos", LiaTshirtSolid, GiPoloShirt],
                  ["Sweatshirts", PiHoodieLight, PiHoodieFill],
                  ["Jacket", TbJacket, GiSleevelessJacket],
                ].map(([type, Icon, ActiveIcon]) => (
                  <button
                    key={type}
                    onClick={() => toggleSubCategory(type)}
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-700"
                  >
                    {subCategory.includes(type) ? (
                      <ActiveIcon className="text-xl" />
                    ) : (
                      <Icon className="text-xl" />
                    )}
                    <span>{type}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottoms Section */}
            <div className="border-2 border-black rounded-md pl-5 py-3 mt-6">
              <p className="mb-3 text-sm font-bold">Bottoms</p>
              <div className="flex flex-col gap-2">
                {[
                  "Jeans",
                  "Trousers",
                  "Cargo",
                  "Joggers",
                  "TrackPant",
                  "Shorts",
                ].map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleSubCategory(type)}
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-700"
                  >
                    {subCategory.includes(type) ? (
                      <PiPantsFill className="text-xl text-blue-500" />
                    ) : (
                      <PiPants className="text-xl" />
                    )}
                    <span>{type}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1 px-4 lg:px-0">
            {/* Header and Sorting Option - Desktop */}
            <div className="hidden lg:flex justify-between text-2xl mb-4">
              <Title text1={"ALL"} text2={"COLLECTIONS"} className="font-open" />
              <select
                className="border-2 border-gray-300 text-sm px-2 cursor-pointer"
                onChange={(e) => setSortType(e.target.value)}
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
              </select>
            </div>

            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-6">
              <Title text1={"ALL"} text2={"COLLECTIONS"} className="font-open text-xl" />
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 gap-y-6">
              {visibleProducts.map((item, index) => (
                <ProductItem
                  key={index}
                  name={item.name}
                  id={item._id}
                  price={item.price}
                  image={item.image}
                />
              ))}
            </div>

            {/* Load More Button */}
            {visibleCount < filterProducts.length && (
              <div className="text-center mt-6 mb-20 lg:mb-6">
                <button
                  className="px-6 py-2 bg-gradient-to-r from-gray-700 via-black  to-gray-700 text-white rounded-lg hover:bg-gray-700"
                  onClick={handleLoadMore}
                >
                  Load More
                </button>
              </div>
            )}
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
                          subCategory.includes(type) ? "bg-gray-100" : ""
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
                            subCategory.includes(type) ? "bg-gray-100" : ""
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
                      sortType === type ? "bg-gray-100" : ""
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

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t lg:hidden">
          <div className="grid grid-cols-2 divide-x bg-white">
            <button
              onClick={() => setShowFilter(true)}
              className="flex items-center justify-center gap-2 py-4 text-sm font-medium"
            >
              <IoFilterSharp className="text-lg" />
              FILTER
            </button>
            <button
              onClick={() => setShowSort(true)}
              className="flex items-center justify-center gap-2 py-4 text-sm font-medium"
            >
              <LuArrowUpDown className="text-lg" />
              SORT
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default Collections;