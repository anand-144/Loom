import orderModel from '../models/orderModels.js';
import userModel from '../models/userModel.js';
import productModel from '../models/productModel.js';

export const getMetrics = async (req, res) => {
  try {
    // Get the year from the query parameter; default to current year if not provided
    const year = parseInt(req.query.year) || new Date().getFullYear();
    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year + 1}-01-01`);

    // Total orders in the specified year
    const totalOrders = await orderModel.countDocuments({
      date: { $gte: startDate, $lt: endDate }
    });

    // Aggregate total revenue for the specified year
    const totalRevenueResult = await orderModel.aggregate([
      {
        $match: {
          date: { $gte: startDate, $lt: endDate }
        }
      },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const totalRevenue = totalRevenueResult[0]?.total || 0;

    // Count active users for the specified year (users who placed an order)
    const activeUsersResult = await orderModel.distinct("userId", {
      date: { $gte: startDate, $lt: endDate }
    });
    const activeUsers = activeUsersResult.length;

    // Count new signups in the specified year (assuming userModel has createdAt timestamps)
    const newSignups = await userModel.countDocuments({
      createdAt: { $gte: startDate, $lt: endDate }
    });

    // Aggregate monthly revenue for the given year (using the "date" field)
    const monthlyRevenueResult = await orderModel.aggregate([
      {
        $match: {
          date: { $gte: startDate, $lt: endDate }
        }
      },
      {
        $group: {
          _id: { month: { $month: "$date" } },
          total: { $sum: "$amount" }
        }
      }
    ]);

    // Create an array with 12 elements (one per month), initializing all to 0
    const monthlyRevenue = Array(12).fill(0);
    monthlyRevenueResult.forEach(item => {
      // MongoDB returns month numbers starting at 1 (January)
      monthlyRevenue[item._id.month - 1] = item.total;
    });

    // Determine the popular product by summing quantities from each order's items in the selected year
    const popularProductAgg = await orderModel.aggregate([
      {
        $match: {
          date: { $gte: startDate, $lt: endDate }
        }
      },
      { $unwind: "$items" },
      { 
        $group: { 
          _id: "$items.productId", 
          totalQuantity: { $sum: "$items.quantity" } 
        } 
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 1 }
    ]);
    const popularProduct = popularProductAgg[0]?._id || '';

    // Count low stock alerts from products (assume low stock if stock is less than 10)
    const lowStockAlerts = await productModel.countDocuments({ stock: { $lt: 10 } });

    // Aggregate payment breakdown for the given year by grouping orders by paymentMethod
    const paymentBreakdownResult = await orderModel.aggregate([
      {
        $match: {
          date: { $gte: startDate, $lt: endDate }
        }
      },
      {
        $group: {
          _id: "$paymentMethod",
          count: { $sum: 1 },
          totalAmount: { $sum: "$amount" }
        }
      }
    ]);

    // Build the metrics object
    const metrics = {
      totalRevenue,
      totalOrders,
      activeUsers,
      newSignups,
      popularProduct,
      lowStockAlerts,
      monthlyRevenue,
      paymentBreakdown: paymentBreakdownResult,
      year,
    };

    res.json({ success: true, metrics });
  } catch (error) {
    console.error("Error fetching metrics:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
