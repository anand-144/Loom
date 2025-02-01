import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import Title from '../components/Title';
import { RiDeleteBin2Fill } from "react-icons/ri";
import CartTotal from "../components/CartTotal";
import { toast } from "react-toastify";

const Cart = () => {
  const { 
    products, 
    currency, 
    cartItems, 
    updateCartItemQuantity, 
    setCartItems, 
    navigate, 
    backendUrl, 
    token  // <-- token from context to check login status
  } = useContext(ShopContext);
  
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            tempData.push({
              _id: productId,
              size: size,
              quantity: cartItems[productId][size]
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  const handleQuantityChange = async (e, itemId, size) => {
    const newQuantity = parseInt(e.target.value, 10);

    if (!isNaN(newQuantity) && newQuantity > 0) {
      await updateCartItemQuantity(itemId, size, newQuantity);

      // Fetch updated cart data
      try {
        const response = await axios.post(
          `${backendUrl}/api/cart/get`,
          {},
          { headers: { token } }
        );
        if (response.data.success) {
          setCartItems(response.data.cartData); 
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch updated cart data.");
      }
    }
  };

  const handleCheckout = () => {
    // Check if the user is logged in by verifying the token
    if (!token) {
      toast.error("Please sign up or login first");
      navigate("/login");
      return;
    }

    // Check if the cart is empty
    if (cartData.length === 0) {
      toast.error("Your cart is empty. Add something before proceeding!");
      return;
    }

    // If logged in and cart is not empty, proceed to checkout
    navigate('/place-order');
  };

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <img
                  src={productData?.image?.[0] || "/fallback.jpg"}
                  alt="product"
                  className="w-16 sm:w-20"
                />
                <div>
                  <p className="text-sm sm:text-lg font-medium">
                    {productData?.name || "Unknown Product"}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <p className="font-medium">
                      {currency}{productData?.price || "N/A"}
                    </p>
                    <p className="px-4 sm:px-3 sm:py-1 py-2 border rounded bg-gray-100">
                      Size: {item.size}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-row items-center gap-2">
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
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-10 sm:my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={handleCheckout}
              className={`text-sm my-8 px-8 py-3 transition-all duration-200 ${
                cartData.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"
              }`}
              disabled={cartData.length === 0}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
