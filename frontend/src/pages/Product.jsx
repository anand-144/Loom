// frontend/src/pages/Product.jsx
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import ReadOnlyRating from "../components/ReadOnlyRating";
import RelatedProduct from "../components/RelatedProduct";
import ProductReviews from "../components/ProductReviews";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, backendUrl, discount } =
    useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [aggregatedRating, setAggregatedRating] = useState({
    averageRating: 0,
    reviewCount: 0,
  });

  const bottomWearCategories = [
    "Jeans",
    "Trousers",
    "Cargo",
    "Joggers",
    "TrackPant",
    "Shorts",
  ];
  const topWearCategories = [
    "Shirt",
    "T-Shirt",
    "Polos",
    "Sweatshirts",
    "Jacket",
  ];

  useEffect(() => {
    if (products.length > 0) {
      const product = products.find((item) => item._id === productId);
      if (product) {
        setProductData(product);
        setImage(product.image[0]);
      }
    }
  }, [productId, products]);

  // Fetch aggregated rating data
  useEffect(() => {
    if (productId && backendUrl) {
      axios
        .get(`${backendUrl}/api/review/aggregated/${productId}`)
        .then((res) => {
          const { averageRating, reviewCount } = res.data;
          setAggregatedRating({ averageRating, reviewCount });
        })
        .catch((err) =>
          console.error("Error fetching aggregated rating:", err)
        );
    }
  }, [productId, backendUrl]);

  let availableSizes = [];
  if (productData) {
    if (bottomWearCategories.includes(productData.subCategory)) {
      availableSizes =
        productData.sizes && productData.sizes.length > 0
          ? productData.sizes.map((s) => Number(s))
          : [28, 30, 32, 34, 36, 38, 40, 42, 44];
    } else {
      availableSizes =
        productData.sizes && productData.sizes.length > 0
          ? productData.sizes
          : ["XS", "S", "M", "L", "XL", "XXL"];
    }
  }

  const calculateDiscountedPrice = (price) => {
    if (discount?.active && discount?.discountPercentage > 0) {
      return price - (price * discount.discountPercentage) / 100;
    }
    return price;
  };

  const formatPrice = (price) => {
    return price.toFixed(2).replace(/\.00$/, '');
  };

  return productData ? (
    <div className="container mx-auto px-4 py-6 md:py-12 bg-white">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center text-xs sm:text-sm text-gray-700 mb-4 md:mb-8">
        <Link to="/" className="hover:text-black">Home</Link>
        <span className="mx-1">/</span>
        <Link to="/collections" className="hover:text-black">{productData.category}</Link>
        <span className="mx-1">/</span>
        <span className="text-black">{productData.name}</span>
      </nav>

      {/* Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-50 shadow-md">
            <img
              src={image}
              alt={productData.name}
              className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {productData.image.map((item, index) => (
              <button
                key={index}
                onClick={() => setImage(item)}
                className={`overflow-hidden rounded-md transition-transform duration-200 transform hover:scale-105 ${
                  item === image ? "ring-2 ring-gray-900" : "ring-1 ring-gray-300"
                }`}
              >
                <img src={item} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4 md:space-y-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
            {productData.name}
          </h1>

          <ReadOnlyRating averageRating={aggregatedRating.averageRating} reviewCount={aggregatedRating.reviewCount} />

          {/* Price Display with Discount */}
          <div>
            {discount?.active && discount?.discountPercentage > 0 ? (
              <div className="flex items-baseline space-x-2">
                <p className="text-base sm:text-lg text-gray-500 line-through">
                  {currency}{formatPrice(productData.price)}
                </p>
                <p className="text-2xl sm:text-3xl font-semibold text-black">
                  {currency}{formatPrice(calculateDiscountedPrice(productData.price))}
                </p>
              </div>
            ) : (
              <p className="text-2xl sm:text-3xl font-semibold text-black">
                {currency}{formatPrice(productData.price)}
              </p>
            )}
          </div>

          <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
            {productData.description}
          </p>

          {/* Size Selection */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm sm:text-base font-medium text-black">Select Size</span>
              <Link to={`/size-chart/${productData.category.toLowerCase()}`} className="text-xs sm:text-sm text-gray-700 hover:underline">
                View Size Chart
              </Link>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {availableSizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`py-1 sm:py-2 px-2 sm:px-3 text-xs sm:text-sm rounded border transition-colors duration-200 ${
                    size === item
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* ADD TO CART Button with Gradient */}
          <button
            onClick={() => addToCart(productData._id, size)}
            className="w-full bg-gradient-to-r from-gray-700 via-black to-gray-700 text-slate-200 py-2 sm:py-3 rounded-lg hover:opacity-90 transition-colors"
          >
            ADD TO CART
          </button>

          <hr className="border-gray-200" />
          <div className="text-xs sm:text-sm text-gray-700 space-y-1">
            <p>100% Original Product.</p>
            <p>Cash on Delivery is available.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>

          {/* Product Details */}
          <div className="mt-4 sm:mt-6">
            <h2 className="text-sm sm:text-base md:text-lg font-bold text-black flex items-center">
              PRODUCT DETAILS
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </h2>
            <p className="mt-1 text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
              {productData.subDescription}
            </p>
            <div className="mt-3">
              <h3 className="text-sm sm:text-base font-bold text-black">
                Material &amp; Care
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-700">
                {productData.material}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-700">
                {productData.care}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-8 md:mt-12 border-t pt-6">
        <ProductReviews productId={productData._id} />
      </div>

      {/* Related Products Section */}
      <div className="mt-8 md:mt-10">
        <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
      </div>
    </div>
  );
};

export default Product;
