import { useContext, useEffect, useState } from "react";
import { debounce } from "lodash";
import { IoIosArrowDown } from "react-icons/io";
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

// Import icons for new Bottoms section from react-icons/gi

import { PiPants , PiPantsFill } from "react-icons/pi";

const Collections = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [bestseller, setBestSeller] = useState(false);
  const [sortType, setSortType] = useState("relevant");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(12); // Number of products to show initially

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

  // Toggle Subcategory Filter (works for both existing and new types)
  // Accepts either an event (from checkbox clicks) or a string (from icon clicks)
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

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, debouncedSearch, showSearch, bestseller, products]);

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

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  // Debounce the search input to avoid excessive re-renders
  useEffect(() => {
    const debounced = debounce(() => setDebouncedSearch(search), 300);
    debounced();
    return () => debounced.cancel();
  }, [search]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const visibleProducts = filterProducts.slice(0, visibleCount);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Sidebar */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <IoIosArrowDown
            className={`h-3 sm:hidden ${showFilter ? "rotate-180" : ""}`}
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block rounded-md border-2 border-black`}
        >
          <p className="mb-3 text-sm font-bold">Category</p>
          <div className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Men"}
                onChange={toggleCategory}
              />{" "}
              Men
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Women"}
                onChange={toggleCategory}
              />{" "}
              Women
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Bestseller"}
                onChange={toggleCategory}
              />{" "}
              Bestseller
            </p>
          </div>
        </div>

        {/* Existing Types Section */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block rounded-md border-2 border-black`}
        >
          <p className="mb-3 text-sm font-bold">Type</p>
          <div className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            {/* Shirt */}
            <p
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => toggleSubCategory("Shirt")}
            >
              {subCategory.includes("Shirt") ? (
                <PiShirtFoldedFill className="text-xl" />
              ) : (
                <PiShirtFoldedLight className="text-xl" />
              )}
              <span>Shirt</span>
            </p>
            {/* T-Shirt */}
            <p
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => toggleSubCategory("T-Shirt")}
            >
              {subCategory.includes("T-Shirt") ? (
                <PiTShirtFill className="text-xl" />
              ) : (
                <PiTShirtBold className="text-xl" />
              )}
              <span>T-Shirt</span>
            </p>
            {/* Polo */}
            <p
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => toggleSubCategory("Polos")}
            >
              {subCategory.includes("Polos") ? (
                <GiPoloShirt className="text-xl" />
              ) : (
                <LiaTshirtSolid className="text-xl" />
              )}
              <span>Polos</span>
            </p>
            {/* Sweatshirt */}
            <p
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => toggleSubCategory("Sweatshirts")}
            >
              {subCategory.includes("Sweatshirts") ? (
                <PiHoodieFill className="text-xl" />
              ) : (
                <PiHoodieLight className="text-xl" />
              )}
              <span>Sweatshirts</span>
            </p>
            {/* Jacket */}
            <p
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => toggleSubCategory("Jacket")}
            >
              {subCategory.includes("Jacket") ? (
                <GiSleevelessJacket className="text-xl" />
              ) : (
                <TbJacket className="text-xl" />
              )}
              <span>Jacket</span>
            </p>
          </div>
        </div>

        {/* New Bottoms Section */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block rounded-md border-2 border-black`}
        >
          <p className="mb-3 text-sm font-bold">Bottoms</p>
          <div className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            {/* Jeans */}
            <p
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => toggleSubCategory("Jeans")}
            >
              {subCategory.includes("Jeans") ? (
                <PiPants className="text-xl text-blue-500" />
              ) : (
                <PiPants className="text-xl" />
              )}
              <span>Jeans</span>
            </p>
            {/* Trousers */}
            <p
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => toggleSubCategory("Trousers")}
            >
              {subCategory.includes("Trousers") ? (
                <PiPantsFill className="text-xl text-blue-500" />
              ) : (
                <PiPantsFill className="text-xl" />
              )}
              <span>Trousers</span>
            </p>
            {/* Cargo */}
            <p
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => toggleSubCategory("Cargo")}
            >
              {subCategory.includes("Cargo") ? (
                <PiPants className="text-xl text-blue-500" />
              ) : (
                <PiPantsFill className="text-xl" />
              )}
              <span>Cargo</span>
            </p>
            {/* Joggers */}
            <p
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => toggleSubCategory("Joggers")}
            >
              {subCategory.includes("Joggers") ? (
                <PiPants className="text-xl text-blue-500" />
              ) : (
                <PiPantsFill className="text-xl" />
              )}
              <span>Joggers</span>
            </p>
            {/* TrackPant */}
            <p
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => toggleSubCategory("TrackPant")}
            >
              {subCategory.includes("TrackPant") ? (
                <PiPants className="text-xl text-blue-500" />
              ) : (
                <PiPantsFill className="text-xl" />
              )}
              <span>TrackPant</span>
            </p>
            {/* Shorts */}
            <p
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => toggleSubCategory("Shorts")}
            >
              {subCategory.includes("Shorts") ? (
                <PiPants className="text-xl text-blue-500" />
              ) : (
                <PiPantsFill className="text-xl" />
              )}
              <span>Shorts</span>
            </p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="flex-1">
        {/* Header and Sorting Option */}
        <div className="flex justify-between text-base sm:text-2xl mb-4">
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

        {/* Product Grid */}
        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 gap-y-6">
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
        ) : (
          <p>No products found</p>
        )}

        {/* Load More Button */}
        {visibleCount < filterProducts.length && (
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
    </div>
  );
};

export default Collections;
