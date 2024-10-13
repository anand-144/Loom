import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from '../components/Title';
import { RiDeleteBin2Fill } from "react-icons/ri";

const Cart = () => {
  const { products, currency, cartItems, updateCartItemQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  const handleQuantityChange = (e, itemId, size) => {
    const newQuantity = parseInt(e.target.value);
    updateCartItemQuantity(itemId, size, newQuantity);
  };

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img src={productData.image[0]} alt="product" className="w-16 sm:w-20" />
                <div>
                  <p className="text-sm sm:text-lg font-medium">{productData.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p className="font-medium">
                      {currency}{productData.price}
                    </p>
                    <p className="px-4 sm:px-3 sm:py-1 py-2 border rounded bg-gray-100">
                      Size: {item.size}
                    </p>
                    <p className="px-4 sm:px-2 sm:py-1 py-2 border rounded bg-gray-100">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
              </div>
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => handleQuantityChange(e, item._id, item.size)}
                className="border px-1 py-1 rounded max-w-10 sm:max-w-20 sm:px-2"
              />
              <RiDeleteBin2Fill
                className="cursor-pointer w-5 h-5"
                onClick={() => updateCartItemQuantity(item._id, item.size, 0)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
