import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <div className="cursor-pointer">
      <Link
        className="text-gray-700 block transition-all duration-300 ease-in-out"
        to={`/product/${id}`}
      >
        {/* Image Container */}
        <div className="overflow-hidden rounded-lg">
          <img
            className="hover:scale-110 transition-transform duration-500 ease-in-out object-cover w-full"
            src={image[0]}
            alt={name}
          />
        </div>
        {/* Product Info */}
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="text-sm font-medium">
          {currency} {price}
        </p>
      </Link>
    </div>
  );
};

export default ProductItem;
