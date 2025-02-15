import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Get backend URL and token from environment/localStorage
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem('token') || '';

  // States for products, metrics, total users, payment breakdown, and loading
  const [products, setProducts] = useState([]);
  const [metricsData, setMetricsData] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    activeUsers: 0,
    newSignups: 0,
    popularProduct: '',
    lowStockAlerts: 0,
    monthlyRevenue: [],
  });
  const [totalUsers, setTotalUsers] = useState(0);
  const [paymentBreakdown, setPaymentBreakdown] = useState([]);
  const [loading, setLoading] = useState(true);
  // State for selected year; default to current year
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Fetch metrics data for the selected year
  const fetchMetrics = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/metrics?year=${selectedYear}`,
        { headers: { token } }
      );
      if (response.data.success) {
        setMetricsData(response.data.metrics);
      }
    } catch (error) {
      console.error("Error fetching metrics:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products list
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch user list
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/list`, {
        headers: { token },
      });
      if (response.data.success) {
        setTotalUsers(response.data.users.length);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch payment breakdown data for the selected year
  const fetchPaymentBreakdown = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/metrics/payment-breakdown?year=${selectedYear}`,
        { headers: { token } }
      );
      if (response.data.success) {
        setPaymentBreakdown(response.data.breakdown);
      }
    } catch (error) {
      console.error("Error fetching payment breakdown:", error);
    }
  };

  // Fetch all data initially and re-fetch metrics & payment breakdown when the selected year changes
  useEffect(() => {
    fetchMetrics();
    fetchProducts();
    fetchUsers();
    fetchPaymentBreakdown();
    const interval = setInterval(fetchMetrics, 30000);
    return () => clearInterval(interval);
  }, [backendUrl, token, selectedYear]);

  // Build an array of bar colors that alternates between gray-700 and red for 12 months
  const barColors = Array.from({ length: 12 }, (_, i) =>
    i % 2 === 0 ? '#FF0000' : '#FF0000'
  );

  // Configure graph data (expecting monthlyRevenue to be an array with 12 numbers)
  const graphData = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: `Monthly Revenue (${selectedYear})`,
        data: metricsData.monthlyRevenue,
        backgroundColor: barColors,
      },
    ],
  };

  // Configure graph options without a fixed y-axis limit
  const graphOptions = {
    responsive: true,
    // No fixed y-axis limit provided
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: `Monthly Revenue for ${selectedYear}` },
    },
  };

  // Build year options: for example, from (currentYear - 5) to currentYear
  const currentYearValue = new Date().getFullYear();
  const yearOptions = [];
  for (let y = currentYearValue - 5; y <= currentYearValue; y++) {
    yearOptions.push(y);
  }

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <svg className="animate-spin h-8 w-8 text-blue-600" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        <span className="mt-2 text-lg">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Year Dropdown */}
      <div className="mb-6">
        <label htmlFor="year-select" className="block text-lg font-semibold mb-2">
          Select Year:
        </label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          className="p-2 border border-gray-300 rounded"
        >
          {yearOptions.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Total Products in Stock */}
        <div className="bg-white shadow rounded-lg p-6 transform transition duration-300 hover:scale-105"
             title="Total products available in stock">
          <h3 className="text-lg font-semibold mb-2">Total Products in Stock</h3>
          <p className="text-3xl text-green-600">{products.length}</p>
        </div>

        {/* Total Revenue */}
        <div className="bg-white shadow rounded-lg p-6 transform transition duration-300 hover:scale-105"
             title="Total revenue generated">
          <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
          <p className="text-3xl text-red-600">₹{metricsData.totalRevenue.toLocaleString()}</p>
        </div>

        {/* Total Orders */}
        <div className="bg-white shadow rounded-lg p-6 transform transition duration-300 hover:scale-105"
             title="Total orders received">
          <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
          <p className="text-3xl text-yellow-600">{metricsData.totalOrders.toLocaleString()}</p>
        </div>

        {/* Active Users */}
        <div className="bg-white shadow rounded-lg p-6 transform transition duration-300 hover:scale-105"
             title="Active users on the platform">
          <h3 className="text-lg font-semibold mb-2">Active Users</h3>
          <p className="text-3xl text-blue-600">{metricsData.activeUsers}</p>
        </div>

        {/* New Signups */}
        <div className="bg-white shadow rounded-lg p-6 transform transition duration-300 hover:scale-105"
             title="New user signups">
          <h3 className="text-lg font-semibold mb-2">New Signups</h3>
          <p className="text-3xl text-indigo-600">{metricsData.newSignups}</p>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white shadow rounded-lg p-6 transform transition duration-300 hover:scale-105"
             title="Products with low stock alerts">
          <h3 className="text-lg font-semibold mb-2">Low Stock Alerts</h3>
          <p className="text-3xl text-purple-600">{metricsData.lowStockAlerts}</p>
        </div>

        {/* Total Users */}
        <div className="bg-white shadow rounded-lg p-6 transform transition duration-300 hover:scale-105"
             title="Total registered users">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-3xl text-teal-600">{totalUsers}</p>
        </div>
      </div>

      {/* Graph Section: Hidden on small devices */}
      <div className="mt-8 bg-white shadow rounded-lg p-6 hidden md:block">
        <h3 className="text-lg font-semibold mb-4">Monthly Revenue for {selectedYear}</h3>
        <Bar data={graphData} options={graphOptions} />
      </div>

      {/* Payment Breakdown Container */}
      <div className="mt-8 bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Payment Breakdown for {selectedYear}</h3>
        {paymentBreakdown.length > 0 ? (
          paymentBreakdown.map(item => (
            <div key={item._id} className="flex justify-between border-b pb-2 mb-2">
              <span className="font-medium">{item._id}</span>
              <span>
                Orders: {item.count} | Amount: ₹{item.totalAmount.toLocaleString()}
              </span>
            </div>
          ))
        ) : (
          <p>No payment data available for {selectedYear}</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
