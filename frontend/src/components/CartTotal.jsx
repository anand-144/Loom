// /frontend/src/components/CartTotal.jsx
import React from 'react';
import Title from './Title';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  // Use the discounted cart amount if applicable
  const cartSubtotal = getCartAmount();
  const cartTotal = cartSubtotal === 0 ? 0 : cartSubtotal + delivery_fee;

  // Optional: A helper to format the price without trailing ".00"
  const formatPrice = (price) => price.toFixed(2).replace(/\.00$/, '');

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency} {formatPrice(cartSubtotal)}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency} {formatPrice(delivery_fee)}
          </p>
        </div>
        <hr />

        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency} {formatPrice(cartTotal)}
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
