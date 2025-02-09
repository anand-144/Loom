// /admin/src/components/Login.jsx
import React, { useState, useEffect } from 'react';
import { assets } from '../assets/admin_assets/assets';
import { FaEye, FaEyeSlash, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import axios from 'axios';
import { backendUrl } from '../App'; // Adjust path as needed
import { toast } from 'react-toastify';
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your_secret_key'; // Use a strong secret key

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem('rememberedEmail');
    const storedPassword = localStorage.getItem('rememberedPassword');

    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      const decryptedPassword = CryptoJS.AES.decrypt(storedPassword, SECRET_KEY).toString(CryptoJS.enc.Utf8);
      setPassword(decryptedPassword);
      setRememberMe(true);
    }
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/user/admin/login/`, { email, password });
      
      if (response.data.success) {
        // Set the token in state and store it under the key "token"
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        toast.success('🎉 Login successful!', {
          icon: <FaCheckCircle style={{ color: 'green' }} />,
        });

        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
          const encryptedPassword = CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
          localStorage.setItem('rememberedPassword', encryptedPassword);
        } else {
          localStorage.removeItem('rememberedEmail');
          localStorage.removeItem('rememberedPassword');
        }
      } else {
        toast.error("Enter Credentials Properly 😣", {
          icon: <FaExclamationCircle style={{ color: '#fa2a55' }} />,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Enter Credentials Properly 😣", {
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
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
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
                className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none pr-12"
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

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2 cursor-pointer"
            />
            <label htmlFor="rememberMe" className="text-sm text-gray-700 cursor-pointer">
              Remember Me
            </label>
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
