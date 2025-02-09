// frontend/src/components/ProductItem.jsx
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency, discount } = useContext(ShopContext);

  // Helper function to format the price (remove trailing ".00")
  const formatPrice = (price) => {
    return price.toFixed(2).replace(/\.00$/, '');
  };

  // Calculate discounted price if discount is active
  const discountedPrice =
    discount?.active && discount?.discountPercentage > 0
      ? price - (price * discount.discountPercentage) / 100
      : price;

  return (
    <div className="cursor-pointer">
      <Link
        className="text-gray-700 block transition-all duration-300 ease-in-out"
        to={`/product/${id}`}
      >
        {/* Image Container */}
        <div className="overflow-hidden rounded-lg sm:h-60 md:h-72 lg:h-80 xl:h-30">
          <img
            className="hover:scale-110 transition-transform duration-500 ease-in-out object-cover w-full h-full"
            src={image[0]}
            alt={name}
          />
        </div>

        {/* Product Info */}
        <p className="pt-3 pb-1 text-sm">{name}</p>
        {discount?.active && discount?.discountPercentage > 0 ? (
          <p className="text-sm font-medium">
            <span className="line-through text-gray-500 mr-2">
              {currency}{formatPrice(price)}
            </span>
            <span>
              {currency}{formatPrice(discountedPrice)}
            </span>
          </p>
        ) : (
          <p className="text-sm font-medium">
            {currency}{formatPrice(price)}
          </p>
        )}
      </Link>
    </div>
  );
};

export default ProductItem;
