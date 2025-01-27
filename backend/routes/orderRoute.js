import express from 'express';
import { placeOrder, placeOrderCcavenue, placeOrderRazorpay, allOrders, userOrders, updateOrderStatus } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';


const orderRouter = express.Router();


//admin feature
orderRouter.post('/list',adminAuth ,  allOrders);
orderRouter.post('/status',adminAuth ,  updateOrderStatus);

//payment feature
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/avenue',authUser,placeOrderCcavenue);
orderRouter.post('/razorpay',authUser,placeOrderRazorpay);

//user feature
orderRouter.post('/userOrders',authUser,userOrders);

export default orderRouter;