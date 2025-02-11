import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import Title from '../components/Title';

const Orders = () => {
  const { backendUrl, token, currency, discount } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;
      const response = await axios.post(
        `${backendUrl}/api/order/userOrders`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        let allOrdersItems = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item.status = order.status;
            item.payment = order.payment;
            item.paymentMethod = order.paymentMethod;
            item.date = order.date;
            allOrdersItems.push(item);
          });
        });
        setOrderData(allOrdersItems.reverse());
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const calculateEffectivePrice = (price) => {
    if (discount && discount.active && discount.discountPercentage > 0) {
      return price - (price * discount.discountPercentage) / 100;
    }
    return price;
  };

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1="ORDER" text2="VAULT" />
      </div>

      <div>
        {orderData.map((item, index) => {
          const effectivePrice = calculateEffectivePrice(item.price);
          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-center gap-6 text-sm">
                <img
                  className="w-16 sm:w-20 object-cover"
                  src={item.image?.[0] || "/fallback.jpg"}
                  alt={`${item.name} product`}
                />
                <div>
                  <p className="sm:text-base font-medium">{item.name || "Unknown Product"}</p>
                  <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                    <p className="text-lg">
                      {currency}{effectivePrice.toFixed(2).replace(/\.00$/, '')}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-1 font-semibold">
                    Date:{" "}
                    <span className="text-gray-400">
                      {new Date(item.date).toLocaleDateString("en-GB")}
                    </span>
                  </p>
                  <p className="mt-1 font-semibold">
                    Payment:
                    <span className="text-gray-400 pl-1">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
                <button onClick={loadOrderData} className="border px-4 py-2 text-sm font-medium rounded-md">
                  Track Order
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;