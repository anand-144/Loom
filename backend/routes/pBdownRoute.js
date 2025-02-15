// routes/paymentBreakdownRoute.js
import express from 'express';
import orderModel from '../models/orderModels.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const year = parseInt(req.query.year) || new Date().getFullYear();

    // Aggregate payment breakdown for the given year by grouping orders by paymentMethod
    const paymentBreakdownResult = await orderModel.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(`${year}-01-01`),
            $lt: new Date(`${year + 1}-01-01`)
          }
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

    res.json({ success: true, breakdown: paymentBreakdownResult });
  } catch (error) {
    console.error("Error fetching payment breakdown:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
