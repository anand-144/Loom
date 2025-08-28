import { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { BsBox, BsPinMap, BsCreditCard2Back, BsCalendar3, BsTelephone, BsEnvelope, BsPerson, BsChevronDown } from 'react-icons/bs';
import { toast } from 'react-toastify';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(`${backendUrl}/api/order/list/`, {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status/`,
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
    }
  };

  const updateTrackingDetails = async (orderId, status, trackingId, courier) => {
    try {
      await axios.post(
        `${backendUrl}/api/order/status/`,
        { orderId, status, trackingId, courier },
        { headers: { token } }
      );
      fetchAllOrders();
    } catch (error) {
      console.error("Error updating tracking:", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-gray-900">My Orders</h3>
      <div className="grid gap-4 sm:gap-6">
        {orders.map((order, index) => (
          <div key={index} className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <div className="p-4 sm:p-6">
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <BsBox className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                  <span className="text-xs sm:text-sm text-gray-600">Order ID:</span>
                  <span className="text-xs sm:text-sm font-medium">{order._id}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
                {/* Product Image */}
                <div className="lg:col-span-3">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img
                      className="w-full h-full object-cover"
                      src={order.items[0].image[0]}
                      alt={order.items[0].name}
                    />
                  </div>
                </div>

                {/* Order Details */}
                <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Items Section */}
                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900">Order Items</h4>
                    <div className="space-y-2">
                      {order.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center gap-2 text-xs sm:text-sm">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-indigo-600"></div>
                          <span className="font-medium">{item.name}</span>
                          <span className="text-gray-600">×{item.quantity}</span>
                          {item.size && (
                            <span className="text-gray-600">({item.size})</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Details */}
                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900">Shipping Details</h4>
                    <div className="space-y-2 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <BsPerson className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                        <span>{order.address.firstName} {order.address.lastName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BsPinMap className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                        <span className="line-clamp-1">{order.address.street}, {order.address.zipCode}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BsTelephone className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                        <span>{order.address.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BsEnvelope className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                        <span>{order.address.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment + Status + Tracking Info */}
                  <div className="space-y-3 sm:space-y-4 sm:col-span-2">
                    <div className="flex flex-col gap-4">
                      {/* Payment Info */}
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                          <BsCreditCard2Back className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                          <span className="text-xs sm:text-sm">
                            {order.paymentMethod} · {order.payment ? 'Paid' : 'Pending'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BsCalendar3 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                          <span className="text-xs sm:text-sm">
                            {new Date(order.date).toLocaleDateString("en-GB")}
                          </span>
                        </div>
                      </div>

                      {/* Status + Tracking Row */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        {/* Status Dropdown */}
                        <div className="relative">
                          <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                          <select
                            onChange={(event) => statusHandler(event, order._id)}
                            value={order.status}
                            className="w-full appearance-none bg-gray-50 text-xs sm:text-sm rounded-md py-1.5 px-3 pr-8 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          >
                            <option value="Order Placed">Order Placed</option>
                            <option value="Packing">Packing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Out For delivery">Out For Delivery</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                          <BsChevronDown className="absolute right-2 top-8 w-4 h-4 text-gray-600 pointer-events-none" />
                        </div>

                        {/* Tracking ID */}
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Tracking ID</label>
                          <input
                            type="text"
                            placeholder="Tracking ID"
                            defaultValue={order.trackingId || ""}
                            onBlur={(e) =>
                              updateTrackingDetails(order._id, order.status, e.target.value, order.courier)
                            }
                            className="w-full border text-xs sm:text-sm rounded-md py-1.5 px-3 border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>

                        {/* Courier */}
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Courier</label>
                          <input
                            type="text"
                            placeholder="Courier (e.g. Bluedart)"
                            defaultValue={order.courier || ""}
                            onBlur={(e) =>
                              updateTrackingDetails(order._id, order.status, order.trackingId, e.target.value)
                            }
                            className="w-full border text-xs sm:text-sm rounded-md py-1.5 px-3 border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
