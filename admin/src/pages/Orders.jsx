import { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { BsBox, BsPinMap, BsCreditCard2Back, BsCalendar3, BsTelephone, BsEnvelope, BsPerson } from 'react-icons/bs';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(`${backendUrl}/api/order/list/`, {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-2xl font-bold mb-8 text-gray-800">My Orders</h3>
      <div className="grid gap-6">
        {orders.map((order, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02] duration-300">
            <div className="p-6">
              {/* Order Header */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                <BsBox className="w-5 h-5 text-indigo-600" />
                <span className="text-sm text-gray-500">Order ID:</span>
                <span className="font-medium">{order._id}</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
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
                <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Items Section */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">Order Items</h4>
                    <div className="space-y-2">
                      {order.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                          <span className="font-medium">{item.name}</span>
                          <span className="text-gray-500">×{item.quantity}</span>
                          {item.size && (
                            <span className="text-gray-500">({item.size})</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Details */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">Shipping Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <BsPerson className="w-4 h-4 text-gray-500" />
                        <span>{order.address.firstName} {order.address.lastName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BsPinMap className="w-6 h-6 text-gray-500" />
                        <span>{order.address.street}, {order.address.zipCode}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BsTelephone className="w-4 h-4 text-gray-500" />
                        <span>{order.address.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BsEnvelope className="w-4 h-4 text-gray-500" />
                        <span>{order.address.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="space-y-4 md:col-span-2">
                    <div className="flex flex-wrap gap-6">
                      <div className="flex items-center gap-2">
                        <BsCreditCard2Back className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">
                          {order.paymentMethod} · {order.payment ? 'Paid' : 'Pending'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BsCalendar3 className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">
                          {new Date(order.date).toLocaleDateString("en-GB")}
                        </span>
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