import { useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const [method, setMethod] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });

  const { navigate } = useContext(ShopContext);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      firstName: '',
      lastName: '',
      email: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      phone: ''
    });
    setMethod('');
  };

  const isFormComplete = Object.values(form).every(value => value.trim() !== '') && method !== '';

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className="flex gap-3">
          <input type="text" name="firstName" placeholder="First Name" className="border border-gray-300 rounded py-2 px-3.5 w-full" onChange={handleInputChange} value={form.firstName} />
          <input type="text" name="lastName" placeholder="Last Name" className="border border-gray-300 rounded py-2 px-3.5 w-full" onChange={handleInputChange} value={form.lastName} />
        </div>
        <input type="email" name="email" placeholder="E-mail Address" className="border border-gray-300 rounded py-2 px-3.5 w-full" onChange={handleInputChange} value={form.email} />
        <input type="text" name="street" placeholder="Street" className="border border-gray-300 rounded py-2 px-3.5 w-full" onChange={handleInputChange} value={form.street} />
        <div className="flex gap-3">
          <input type="text" name="city" placeholder="City" className="border border-gray-300 rounded py-2 px-3.5 w-full" onChange={handleInputChange} value={form.city} />
          <input type="text" name="state" placeholder="State" className="border border-gray-300 rounded py-2 px-3.5 w-full" onChange={handleInputChange} value={form.state} />
        </div>

        <div className="flex gap-3">
          <input type="number" name="zipCode" placeholder="ZipCode" className="border border-gray-300 rounded py-2 px-3.5 w-full" onChange={handleInputChange} value={form.zipCode} />
          <input type="text" name="country" placeholder="Country" className="border border-gray-300 rounded py-2 px-3.5 w-full" onChange={handleInputChange} value={form.country} />
        </div>

        <input type="number" name="phone" placeholder="Phone" className="border border-gray-300 rounded py-2 px-3.5 w-full" onChange={handleInputChange} value={form.phone} />

        {/* Reset Button */}
        <button
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
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-500' : ''}`}></p>
              <img src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-500' : ''}`}></p>
              <img src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-500' : ''}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              onClick={() => navigate('/orders')}
              className={`bg-black text-white px-16 py-3 text-sm ${!isFormComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!isFormComplete}
            >
              PLACE ORDER
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
