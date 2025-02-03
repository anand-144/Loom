import express from 'express';
import { placeOrder,  placeOrderRazorpay, allOrders, userOrders, updateOrderStatus, verifyRazorpay } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';


const orderRouter = express.Router();


//admin feature
orderRouter.post('/list',adminAuth ,  allOrders);
orderRouter.post('/status',adminAuth ,  updateOrderStatus);

//payment feature
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/razorpay',authUser,placeOrderRazorpay);

//user feature
orderRouter.post('/userOrders',authUser,userOrders);

//verifyPayment

orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay)

export default orderRouter;