import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
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
    token,
    discount  // get discount from context
  } = useContext(ShopContext);
  
  const [cartData, setCartData] = useState([]);

  // Build a flat array of items from the cartItems object
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

      // Fetch updated cart data from backend
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
    if (!token) {
      toast.error("Please sign up or login first");
      navigate("/login");
      return;
    }
    if (cartData.length === 0) {
      toast.error("Your cart is empty. Add something before proceeding!");
      return;
    }
    navigate('/place-order');
  };

  // Helper function to format a price (remove trailing ".00")
  const formatPrice = (price) => price.toFixed(2).replace(/\.00$/, '');

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          
          // Compute effective price: if discount is active, apply discount; otherwise use original price
          const effectivePrice =
            productData && discount?.active && discount.discountPercentage > 0
              ? productData.price - (productData.price * discount.discountPercentage) / 100
              : productData?.price;

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
                      {discount?.active && discount.discountPercentage > 0 && productData?.price ? (
                        <>
                          <span className="line-through text-gray-500 mr-2">
                            {currency}{formatPrice(productData.price)}
                          </span>
                          <span>
                            {currency}{formatPrice(effectivePrice)}
                          </span>
                        </>
                      ) : (
                        <span>
                          {currency}{productData?.price ? formatPrice(productData.price) : "N/A"}
                        </span>
                      )}
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
