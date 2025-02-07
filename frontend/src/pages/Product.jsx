import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import ReadOnlyRating from "../components/ReadOnlyRating";
import RelatedProduct from "../components/RelatedProduct";
import ProductReviews from "../components/ProductReviews";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, backendUrl } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  // State for aggregated rating data
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
  const topWearCategories = ["Shirt", "T-Shirt", "Polos", "Sweatshirts", "Jacket"];

  useEffect(() => {
    if (products.length > 0) {
      const product = products.find((item) => item._id === productId);
      if (product) {
        setProductData(product);
        setImage(product.image[0]);
      }
    }
  }, [productId, products]);

  // Fetch aggregated rating data when productId changes
  useEffect(() => {
    if (productId && backendUrl) {
      axios
        .get(`${backendUrl}/api/review/aggregated/${productId}`)
        .then((res) => {
          const { averageRating, reviewCount } = res.data;
          setAggregatedRating({ averageRating, reviewCount });
        })
        .catch((err) => console.error("Error fetching aggregated rating:", err));
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

  return productData ? (
    <div className="container mx-auto px-4 py-6 md:py-12">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center text-sm text-gray-500 mb-6 md:mb-8">
        <Link to="/" className="hover:text-gray-900">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link to="/collections" className="hover:text-gray-900">
          {productData.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{productData.name}</span>
      </nav>

      {/* Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
            <img
              src={image}
              alt={productData.name}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
          </div>
          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {productData.image.map((item, index) => (
              <button
                key={index}
                onClick={() => setImage(item)}
                className={`overflow-hidden rounded-md transition-transform duration-200 transform hover:scale-105 ${
                  item === image ? "ring-2 ring-black" : "ring-1 ring-gray-300"
                }`}
              >
                <img
                  src={item}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {productData.name}
          </h1>

          {/* Read-Only Aggregated Rating Display */}
          <ReadOnlyRating
            averageRating={aggregatedRating.averageRating}
            reviewCount={aggregatedRating.reviewCount}
          />

          <p className="text-3xl font-semibold text-gray-800">
            {currency}
            {productData.price}
          </p>
          <p className="text-gray-600 leading-relaxed">
            {productData.description}
          </p>

          {/* Size Selection */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-800">
                Select Size
              </span>
              <Link
                to={`/size-chart/${productData.category.toLowerCase()}`}
                className="text-sm text-blue-600 hover:underline"
              >
                View Size Chart
              </Link>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {availableSizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`py-2 px-3 text-sm rounded border transition-colors duration-200 ${
                    size === item
                      ? "bg-gray-800 text-white border-gray-800"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => addToCart(productData._id, size)}
            className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition-colors"
          >
            ADD TO CART
          </button>

          <hr className="border-gray-300" />
          <div className="text-sm text-gray-600 space-y-1">
            <p>100% Original Product.</p>
            <p>Cash on Delivery is available.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>

          {/* Product Details */}
          <div className="mt-6">
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
              PRODUCT DETAILS
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </h2>
            <p className="mt-2 text-gray-700 leading-relaxed">
              {productData.subDescription}
            </p>
            <div className="mt-4">
              <h3 className="font-bold text-gray-800">Material & Care</h3>
              <p className="text-gray-700">{productData.material}</p>
              <p className="text-gray-700">{productData.care}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12 border-t pt-8">
        <ProductReviews productId={productData._id} />
      </div>

      {/* Related Products Section */}
      <div className="mt-10">
        <RelatedProduct
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
        <div
          className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  );
};

export default Product;
