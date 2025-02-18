import { useState, useContext } from "react";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });
  
  const resetForm = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phone: "",
    });
    setMethod("cod");
  };

  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } =
    useContext(ShopContext);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const initPay = async (orderData, razorpayOrder) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      name: 'Order Payment',
      description: 'Order Payment with razorpay',
      order_id: razorpayOrder.id,
      handler: async (response) => {
        try {
          const verifyData = {
            ...response,
            ...orderData,
            razorpay_order_id: razorpayOrder.id
          };

          const { data } = await axios.post(
            `${backendUrl}/api/order/verifyRazorpay`,
            verifyData,
            { headers: { token } }
          );

          if (data.success) {
            toast.success("Payment successful!");
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(data.message || "Payment failed");
          }
        } catch (error) {
          console.log(error);
          toast.error("Payment verification failed");
        }
      },
      modal: {
        ondismiss: function() {
          toast.error("Payment cancelled");
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = products.find((product) => product._id === items);
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        userId: token,
        address: form,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      if (method === "cod") {
        const response = await axios.post(
          `${backendUrl}/api/order/place`,
          orderData,
          { headers: { token } }
        );
        
        if (response.data.success) {
          toast.success("Order placed successfully!");
          resetForm();
          setCartItems({});
          navigate('/orders');
        } else {
          toast.error(response.data.message);
        }
      } else if (method === "razorpay") {
        const response = await axios.post(
          `${backendUrl}/api/order/razorpay`,
          orderData,
          { headers: { token } }
        );
        
        if (response.data.success) {
          await initPay(orderData, response.data.order);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to process order");
    }
  };

  const isFormComplete = Object.values(form).every((value) => value.trim() !== "") && method !== "";

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="border border-gray-300 rounded py-2 px-3.5 w-full"
            onChange={handleInputChange}
            value={form.firstName}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="border border-gray-300 rounded py-2 px-3.5 w-full"
            onChange={handleInputChange}
            value={form.lastName}
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="E-mail Address"
          className="border border-gray-300 rounded py-2 px-3.5 w-full"
          onChange={handleInputChange}
          value={form.email}
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          className="border border-gray-300 rounded py-2 px-3.5 w-full"
          onChange={handleInputChange}
          value={form.street}
        />
        <div className="flex gap-3">
          <input
            type="text"
            name="city"
            placeholder="City"
            className="border border-gray-300 rounded py-2 px-3.5 w-full"
            onChange={handleInputChange}
            value={form.city}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            className="border border-gray-300 rounded py-2 px-3.5 w-full"
            onChange={handleInputChange}
            value={form.state}
          />
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            className="border border-gray-300 rounded py-2 px-3.5 w-full"
            onChange={handleInputChange}
            value={form.zipCode}
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            className="border border-gray-300 rounded py-2 px-3.5 w-full"
            onChange={handleInputChange}
            value={form.country}
          />
        </div>

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="border border-gray-300 rounded py-2 px-3.5 w-full"
          onChange={handleInputChange}
          value={form.phone}
        />

        <button
          type="button"
          onClick={resetForm}
          className="bg-gray-500 text-white mt-4 py-2 text-sm w-1/4 justify-center font-semibold hover:bg-gray-700"
        >
          RESET
        </button>
      </div>

      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={() => setMethod("razorpay")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "razorpay" ? "bg-green-500" : ""}`}></p>
              <img src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={() => setMethod("cod")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-500" : ""}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className={`bg-black text-white px-16 py-3 text-sm ${!isFormComplete ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={!isFormComplete}
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;