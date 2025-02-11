import express from 'express';
import { placeOrder, placeOrderRazorpay, allOrders, userOrders, updateOrderStatus, verifyRazorpay } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

// Admin routes
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateOrderStatus);

// Payment routes
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay);

// User routes
orderRouter.post('/userOrders', authUser, userOrders);

export default orderRouter;