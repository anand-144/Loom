// /admin/src/pages/DiscountSettings.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const DiscountSettings = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // Retrieve the token using the key "token"
  const token = localStorage.getItem('token');

  const [active, setActive] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/discount`);
        if (response.data && response.data.discount) {
          const disc = response.data.discount;
          setActive(disc.active);
          setDiscountPercentage(disc.discountPercentage);
          if (disc.startDate) {
            setStartDate(new Date(disc.startDate).toISOString().slice(0, 16));
          }
          if (disc.endDate) {
            setEndDate(new Date(disc.endDate).toISOString().slice(0, 16));
          }
        }
      } catch (error) {
        console.error("Error fetching discount settings:", error);
        toast.error("Failed to fetch discount settings.");
      }
    };
    fetchDiscount();
  }, [backendUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Token is missing. Please log in as admin.");
      return;
    }

    try {
      const payload = {
        active,
        discountPercentage: Number(discountPercentage),
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
      };

      const response = await axios.put(`${backendUrl}/api/discount`, payload, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success("Discount settings updated successfully!");
      } else {
        toast.error("Failed to update discount settings.");
      }
    } catch (error) {
      console.error("Error updating discount settings:", error);
      toast.error("Error updating discount settings.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Discount Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="mr-2"
            />
            Enable Discount
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Discount Percentage:</label>
          <input
            type="number"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
            className="w-full border p-2 rounded"
            min="0"
            max="100"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Start Date:</label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">End Date:</label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default DiscountSettings;
