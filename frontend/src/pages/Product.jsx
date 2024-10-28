import { useContext, useEffect, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { FaStar, FaRegStar } from "react-icons/fa";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [size, setSize] = useState(''); 

  useEffect(() => {
    if (products.length > 0) {
      const product = products.find(item => item._id === productId);
      if (product) {
        setProductData(product);
        setImage(product.image[0]);
      }
    }
  }, [productId, products]);

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleHover = (index) => {
    setHover(index + 1);
  };

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full scrollbar-hide">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border-2 border-gray-200 rounded-lg hover:scale-105 transition-transform duration-300 hover:border-gray-400"
                alt="product cloth"
              />
            ))}
          </div>

          <div className="w-full sm:w-[80%]">
            <img
              src={image}
              alt="selected product"
              className="w-full h-auto rounded-lg shadow-lg border-2 border-gray-300"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

          {/* Star Rating System */}
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, index) => (
              <span key={index}>
                {index + 1 <= (hover || rating) ? (
                  <FaStar
                    className="w-5 text-yellow-400 cursor-pointer"
                    onClick={() => handleStarClick(index)}
                    onMouseEnter={() => handleHover(index)}
                    onMouseLeave={() => setHover(null)}
                  />
                ) : (
                  <FaRegStar
                    className="w-5 text-yellow-400 cursor-pointer"
                    onClick={() => handleStarClick(index)}
                    onMouseEnter={() => handleHover(index)}
                    onMouseLeave={() => setHover(null)}
                  />
                )}
              </span>
            ))}
          </div>

          {/* Displaying the current rating */}
          <p className="mt-2 text-sm text-gray-500">Rating: {rating} out of 5</p>
          <p className="mt-2 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>

          {/* Size Selection */}
          <div className="flex flex-col gap-4 my-8">
            <p className="font-medium">Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`px-4 py-2 border rounded transition-colors duration-300 ${size === item
                    ? 'border-black bg-gray-200'
                    : 'border-gray-300 hover:bg-gray-100'
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Size Chart Button */}
            <div className="mt-4">
  <Link
    to={`/size-chart/${productData.category.toLowerCase()}`}
    className="text-blue-500 underline hover:text-blue-700 transition-colors"
  >
    View Size Chart
  </Link>
</div>

          </div>


          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product.</p>
            <p>Cash on Delivery is available.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className="mt-20">
        <div className="flex ">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm flex items-center">
            Reviews 4 <FaStar className="ml-1 text-yellow-400" />
          </p>
        </div>

        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p className="font-medium text-lg">{productData.name}</p>
          <p>{productData.bigDescription}</p>
        </div>
      </div>

      {/* Related Products Section */}
      <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
