import React, { useState } from 'react';
import { assets } from '../assets/admin_assets/assets';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const Login = ({setToken}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + '/api/user/admin/login/', { email, password });
      console.log(response);
  
      if (response.data.success) {
        setToken(response.data.token);
        toast.success('🎉 Login successful!', {
          icon: <FaCheckCircle style={{ color: 'green' }} />, 
        });
      } else {
        toast.error("Enter Credintal's Properly 😣" , {
          icon: <FaExclamationCircle style={{ color: '#fa2a55' }} />, 
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Enter Credintal's Properly 😣", {
        icon: <FaExclamationCircle style={{ color: '#fa2a55' }} />, 
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img className="w-20 mb-4" src={assets.logo} alt="brand_logo" />
          <h1 className="text-2xl font-bold text-center">Admin Panel</h1>
        </div>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Email Address</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              placeholder="your@email.com"
              value={email}
              required
            />
          </div>

          <div className="mb-4 min-w-72 relative">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <div className="relative flex items-center">
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400 pr-12"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 flex items-center h-full text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;