import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  // Store cart amount to avoid multiple function calls
  const cartSubtotal = getCartAmount();
  const cartTotal = cartSubtotal === 0 ? 0 : cartSubtotal + delivery_fee;

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency} {cartSubtotal.toFixed(2)}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping</p>
          <p>
            {currency} {delivery_fee.toFixed(2)}
          </p>
        </div>
        <hr />

        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency} {cartTotal.toFixed(2)}
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
