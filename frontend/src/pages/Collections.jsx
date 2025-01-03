import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { IoIosArrowDown } from "react-icons/io";
import ProductItem from "../components/ProductItem";
import Title from "../components/Title";
import { debounce } from "lodash";

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
      setBestSeller((prev) => !prev); // Toggle bestseller boolean
    } else {
      if (category.includes(value)) {
        setCategory((prev) => prev.filter((item) => item !== value));
      } else {
        setCategory((prev) => [...prev, value]);
      }
    }
  };

  // Toggle Subcategory Filter
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  // Apply Filters
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

    setFilterProducts(productsCopy);
  };

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, debouncedSearch, showSearch, bestseller,products]);

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
    setVisibleCount((prev) => prev + 4); // Load 4 more products
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
          <IoIosArrowDown className={`h-3 sm:hidden ${showFilter ? "rotate-180" : ""}`} />
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
              <input type="checkbox" className="w-3" value={"Men"} onChange={toggleCategory} /> Men
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Women"} onChange={toggleCategory} /> Women
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Bestseller"} onChange={toggleCategory} /> Bestseller
            </p>
          </div>
        </div>

        {/* Subcategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block rounded-md border-2 border-black`}
        >
          <p className="mb-3 text-sm font-bold">Type</p>
          <div className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Topwear"}
                onChange={toggleSubCategory}
              />{" "}
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
              />{" "}
              Bottomwear
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
