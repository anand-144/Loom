import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { FaTruck } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Orders = () => {
  const { backendUrl, token, currency, discount } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

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
            item.orderId = order._id;
            item.courier = order.courier;
            item.trackingId = order.trackingId;
            allOrdersItems.push(item);
          });
        });
        setOrderData(allOrdersItems.reverse());
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load orders.");
    }
  };

  useEffect(() => {
    loadOrderData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const calculateEffectivePrice = (price) => {
    if (discount && discount.active && discount.discountPercentage > 0) {
      return price - (price * discount.discountPercentage) / 100;
    }
    return price;
  };

  // 🔹 Open courier tracking page (icon only)
  const handleTrackOrder = (courier, trackingId) => {
    if (!trackingId) {
      toast.error("Tracking ID not available for this order.");
      return;
    }

    let url = "";
    switch (courier?.toLowerCase()) {
      case "bluedart":
        url = `https://bluedart.com/tracking?trackNo=${trackingId}`;
        break;
      case "delhivery":
        url = `https://www.delhivery.com/`;
        break;
      case "shiprocket":
        url = `https://shiprocket.co/tracking/${trackingId}`;
        break;
      case "dhl":
        url = `https://www.dhl.com/in-en/home/tracking.html?tracking-id=${trackingId}`;
        break;
      default:
        toast.warning("Tracking not available for this courier.");
        return;
    }

    window.open(url, "_blank");
  };

  // 🔄 Refresh order statuses (button action)
  const refreshStatuses = async () => {
    try {
      setRefreshing(true);
      await loadOrderData();
      toast.success("Order status updated.");
    } catch (e) {
      toast.error("Could not refresh status.");
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div className="border-t pt-16">
      {/* Toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

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
              {/* Product Info */}
              <div className="flex items-center gap-6 text-sm">
                <img
                  className="w-16 sm:w-20 object-cover"
                  src={item.image?.[0] || "/fallback.jpg"}
                  alt={`${item.name} product`}
                />
                <div>
                  <p className="sm:text-base font-medium">
                    {item.name || "Unknown Product"}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                    <p className="text-lg">
                      {currency}
                      {effectivePrice.toFixed(2).replace(/\.00$/, "")}
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
                    <span className="text-gray-400 pl-1">
                      {item.paymentMethod}
                    </span>
                  </p>
                </div>
              </div>

              {/* Status + Map + Track Order */}
              <div className="md:w-1/2 grid grid-cols-3 items-center">
                {/* Status (left) */}
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>

                {/* Truck Icon (center, clickable with tooltip) */}
                <div className="flex justify-center relative group">
                  <FaTruck
                    className="text-gray-600 w-5 h-5 cursor-pointer"
                    onClick={() =>
                      handleTrackOrder(item.courier, item.trackingId)
                    }
                    aria-label="Open courier tracking page"
                    title="" // we use a custom tooltip instead
                  />
                  {/* Tooltip */}
                  {item.trackingId && item.courier && (
                    <div
                      className="absolute -top-10 left-1/2 -translate-x-1/2 
                                 hidden group-hover:block 
                                 bg-gray-800 text-white text-xs rounded px-2 py-1 
                                 shadow-md whitespace-nowrap transition-opacity duration-200"
                    >
                      Courier: {item.courier} | ID: {item.trackingId}
                    </div>
                  )}
                </div>

                {/* Track Order Button (right) – refresh statuses */}
                <div className="flex justify-end">
                  <button
                    onClick={refreshStatuses}
                    disabled={refreshing}
                    className={`border px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100
                                ${refreshing ? "opacity-60 cursor-not-allowed" : ""}`}
                  >
                    {refreshing ? "Refreshing..." : "Track Order"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
